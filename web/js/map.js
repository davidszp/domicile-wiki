// D3 map: projections per view, zoom/pan, small-jurisdiction proxies, insets, labels with
// collision avoidance and leader lines, city markers. Geometry comes from Natural Earth via
// data/*.topo.json; nothing is drawn by hand.
//
// Rendering: country and region shapes are drawn on a <canvas> at device-pixel resolution and
// redrawn every frame, so zooming is always sharp (an SVG of this size makes browsers show a
// scaled, blurry bitmap for seconds while they re-rasterise). Small interactive overlays (labels,
// island circles, city markers, close-up boxes, insets) stay in an SVG layer on top. Clicks and
// hover are hit-tested against the same Path2D shapes.

import { h, clear } from "./dom.js";

const d3 = window.d3;
const topojson = window.topojson;

const PROXY_MAX_PX = 9; // features smaller than this on screen get a clickable circle
const PROXY_MIN_AREA = 90; // px²
const PROXY_R = 4.8;
// Label positions tried around an anchor: close by first, then further out with a leader line.
const NEAR = [[8, 0, "start"], [-8, 0, "end"], [0, -10, "middle"], [0, 14, "middle"], [7, -8, "start"], [-7, -8, "end"], [7, 11, "start"], [-7, 11, "end"]];
const FAR = [[26, -18, "start"], [-26, -18, "end"], [26, 22, "start"], [-26, 22, "end"], [40, 0, "start"], [-40, 0, "end"]];
const LOD_FINE_K = 2.5; // world view switches to detailed boundaries beyond this zoom
const LABEL_FONT = "600 11px Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"; // matches .labels .label in app.css

export function createMap(root, opts) {
  const { views, topo, colorOf, statusOf, labelOf, tooltipOf, markersOf, onSelect, onView, isResearched } = opts;
  const canvas = d3.select(root).append("canvas").attr("class", "map-canvas").attr("aria-hidden", "true");
  const svg = d3.select(root).append("svg").attr("class", "map-svg").attr("role", "img");
  const tooltip = h("div", { class: "map-tooltip", role: "tooltip", hidden: true });
  root.append(tooltip);
  const measure = document.createElement("canvas").getContext("2d");
  measure.font = LABEL_FONT;
  const textWidth = new Map();
  const hitCtx = document.createElement("canvas").getContext("2d");

  let current = null;
  let selected = null;
  let hovered = null;
  let showRegions = opts.showRegions ?? false; // cantons and Spanish/Italian regions start hidden

  // Keyed by the topology object itself, so a later-loaded file can never be served from a stale entry.
  const featureCache = new WeakMap();
  const featuresOf = (t, object) => {
    if (!featureCache.has(t)) featureCache.set(t, topojson.feature(t, t.objects[object]).features);
    return featureCache.get(t);
  };
  const features = (name) => featuresOf(topo[name], "countries");
  const regionFeatures = () => (topo.regions ? featuresOf(topo.regions, "regions") : []);

  // ------------------------------------------------------------------ theme colours for the canvas

  const colorCache = new Map();
  function css(value) {
    if (!value.startsWith("var(")) return value;
    if (!colorCache.has(value)) {
      const name = value.slice(4, -1).trim();
      colorCache.set(value, getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#999");
    }
    return colorCache.get(value);
  }
  const themeChanged = () => {
    colorCache.clear();
    if (current) {
      for (const s of current.shapes) s.color = css(colorOf(s.id));
      requestDraw();
    }
  };
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", themeChanged);
  new MutationObserver(themeChanged).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // ------------------------------------------------------------------ projection

  function bboxGeometry(b) {
    const [x0, y0, x1, y1] = b;
    const pts = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      pts.push([x0 + (x1 - x0) * t, y0], [x0 + (x1 - x0) * t, y1], [x0, y0 + (y1 - y0) * t], [x1, y0 + (y1 - y0) * t]);
    }
    return { type: "MultiPoint", coordinates: pts };
  }

  function makeProjection(v, w, hgt, target) {
    const pad = 12;
    let p;
    switch (v.projection) {
      case "naturalEarth1":
        p = d3.geoNaturalEarth1();
        break;
      case "equalEarth":
        p = d3.geoEqualEarth();
        break;
      case "conicConformal":
        p = d3.geoConicConformal().rotate(v.rotate).parallels(v.parallels);
        break;
      case "mercator":
        p = d3.geoMercator();
        break;
      case "albersUsa":
        p = d3.geoAlbersUsa();
        break;
      default:
        throw new Error(`unknown projection ${v.projection}`);
    }
    p.fitExtent([[pad, pad], [w - pad, hgt - pad]], target);
    // Draw (and allow panning) a margin beyond the initial frame so zooming near an edge never shows a void.
    if (v.projection !== "albersUsa") p.clipExtent([[-w * 0.5, -hgt * 0.5], [w * 1.5, hgt * 1.5]]);
    return p;
  }

  // ------------------------------------------------------------------ render a view

  function render(viewId, { keepZoom = false } = {}) {
    const previous = keepZoom && current && current.id === viewId ? current.transform : null;
    const v = views[viewId];
    if (!v) throw new Error(`unknown view ${viewId}`);
    const w = root.clientWidth || 800;
    const hgt = root.clientHeight || 500;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.attr("width", Math.round(w * dpr)).attr("height", Math.round(hgt * dpr))
      .style("width", `${w}px`).style("height", `${hgt}px`);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${w} ${hgt}`).attr("width", w).attr("height", hgt).attr("aria-label", `${v.label} map`);

    const regions = v.regions.length ? regionFeatures().filter((f) => v.regions.includes(f.properties.parent)) : [];
    let target;
    if (v.projection === "albersUsa") target = { type: "FeatureCollection", features: regions };
    else if (v.bbox) target = bboxGeometry(v.bbox);
    else if (v.fit_bbox) target = bboxGeometry(v.fit_bbox);
    else target = { type: "Sphere" };
    const projection = makeProjection(v, w, hgt, target);
    const path = d3.geoPath(projection);
    // Level of detail: the zoomed-out world view uses the light boundaries; detailed ones are prepared
    // in the background and used once zoomed in. Regional views always use the detailed boundaries.
    const hasDetail = Boolean(topo.detail);
    const topoName = viewId === "world" ? "world" : hasDetail ? "detail" : v.topology;
    const countries = v.projection === "albersUsa" ? [] : features(topoName).filter((f) => !(v.exclude || []).includes(f.properties.id));

    const inFrame = (b) => Number.isFinite(b[0][0]) && b[1][0] >= -w * 0.5 && b[0][0] <= w * 1.5 && b[1][1] >= -hgt * 0.5 && b[0][1] <= hgt * 1.5;
    const shapes = [];
    for (const f of countries) {
      if (!f.geometry) continue;
      const b = path.bounds(f);
      if (!inFrame(b)) continue;
      shapes.push({ id: f.properties.id, f, b, p2d: new Path2D(path(f)), region: false });
    }
    const regionsShown = showRegions || v.always_show_regions ? regions : [];
    for (const f of regionsShown) {
      const d = path(f);
      if (d) shapes.push({ id: f.properties.id, f, b: path.bounds(f), p2d: new Path2D(d), region: true });
    }
    for (const s of shapes) {
      s.color = css(colorOf(s.id));
      s.provisional = statusOf(s.id) === "provisional";
    }

    const sphere = v.projection !== "albersUsa" && !v.bbox ? new Path2D(path({ type: "Sphere" })) : null;
    const graticule = v.projection !== "albersUsa" ? new Path2D(path(d3.geoGraticule10())) : null;

    // SVG overlay: a transparent hit surface first, then the interactive layers.
    svg.append("rect").attr("class", "hit-surface").attr("width", w).attr("height", hgt);
    const zoomLayer = svg.append("g").attr("class", "zoom-layer");
    const gHot = zoomLayer.append("g").attr("class", "hotspots");
    const gProxy = zoomLayer.append("g").attr("class", "proxies");
    const gMarkers = zoomLayer.append("g").attr("class", "markers");
    const gLabels = svg.append("g").attr("class", "labels")
      .on("click", (e) => { const id = e.target.dataset?.id; if (id) onSelect(id); });
    const gInsets = svg.append("g").attr("class", "insets");

    // Small jurisdictions: a clickable circle at Natural Earth's label point.
    const proxies = [];
    for (const s of shapes) {
      if (s.region) continue;
      const f = s.f, b = s.b;
      const size = Math.max(b[1][0] - b[0][0], b[1][1] - b[0][1]);
      // Island groups can span a wide box yet have almost no clickable area.
      if (size >= PROXY_MAX_PX && path.area(f) >= PROXY_MIN_AREA) continue;
      const id = f.properties.id;
      const important = isResearched(id) || (v.must_include || []).includes(id);
      if (!important) continue;
      // On the world map, small states inside a close-up box are reached through that box.
      const inHotspot = (v.hotspots || []).some((hid) => {
        const [x0, y0, x1, y1] = views[hid].bbox;
        return f.properties.lx >= x0 && f.properties.lx <= x1 && f.properties.ly >= y0 && f.properties.ly <= y1;
      });
      if (inHotspot) continue;
      const pt = projection([f.properties.lx, f.properties.ly]);
      if (!pt || pt[0] < 0 || pt[0] > w || pt[1] < 0 || pt[1] > hgt) continue;
      proxies.push({ id, x: pt[0], y: pt[1], f, size });
    }
    gProxy.selectAll("circle").data(proxies, (d) => d.id).join("circle")
      .attr("cx", (d) => d.x).attr("cy", (d) => d.y).attr("r", PROXY_R)
      .attr("class", "proxy").attr("data-id", (d) => d.id)
      .on("click", (e, d) => { e.stopPropagation(); onSelect(d.id); })
      .on("mousemove", (e, d) => showTip(e, d.id)).on("mouseleave", hideTip);

    // World view: outline the regional close-ups and make them clickable.
    for (const hid of v.hotspots || []) {
      const hv = views[hid];
      const [x0, y0, x1, y1] = hv.bbox;
      const corners = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]].map((c) => projection(c)).filter(Boolean);
      if (corners.length < 4) continue;
      const xs = corners.map((c) => c[0]);
      const ys = corners.map((c) => c[1]);
      const g = gHot.append("g").attr("class", "hotspot").attr("tabindex", 0).attr("role", "button")
        .attr("aria-label", `Open ${hv.label} close-up`)
        .on("click", (e) => { e.stopPropagation(); onView(hid); })
        .on("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onView(hid); } });
      const minX = Math.min(...xs), minY = Math.min(...ys);
      g.append("rect").attr("x", minX).attr("y", minY).attr("rx", 6).attr("ry", 6)
        .attr("width", Math.max(...xs) - minX).attr("height", Math.max(...ys) - minY);
      g.append("text").attr("x", minX + 3).attr("y", minY - 4).text(`${hv.label} ›`);
    }

    // City / financial-centre markers.
    const markers = v.labels ? markersOf().map((m) => ({ ...m, xy: projection([m.lon, m.lat]) }))
      .filter((m) => m.xy && m.xy[0] >= 0 && m.xy[0] <= w && m.xy[1] >= 0 && m.xy[1] <= hgt) : [];
    gMarkers.selectAll("path").data(markers).join("path")
      .attr("class", "marker").attr("d", d3.symbol(d3.symbolDiamond, 34))
      .attr("transform", (d) => `translate(${d.xy[0]},${d.xy[1]})`)
      .on("click", (e, d) => { e.stopPropagation(); zoomToPoint(d.xy, 8); onSelect(d.owner); })
      .on("mousemove", (e, d) => showTip(e, d.owner, `${d.name} (${d.kind.replace("_", " ")})`))
      .on("mouseleave", hideTip);

    for (const ins of v.insets || []) drawInset(gInsets, ins, w, hgt);

    const margin = v.bbox ? 0.5 : 0;
    const zoom = d3.zoom().scaleExtent([1, 80])
      .translateExtent([[-w * margin, -hgt * margin], [w * (1 + margin), hgt * (1 + margin)]])
      .extent([[0, 0], [w, hgt]])
      .on("zoom", (e) => {
        current.transform = e.transform;
        zoomLayer.attr("transform", e.transform);
        const k = e.transform.k;
        // Proxies shrink with zoom and disappear once the real outline is big enough to click.
        gProxy.selectAll("circle").attr("r", PROXY_R / k).attr("display", (d) => (d.size * k >= 3 * PROXY_MAX_PX ? "none" : null));
        gMarkers.selectAll("path").attr("transform", (d) => `translate(${d.xy[0]},${d.xy[1]}) scale(${1 / k})`);
        gHot.selectAll("text").style("font-size", `${12 / k}px`); // a style, so the stylesheet's size does not win
        requestDraw();
        scheduleLabels();
      });
    svg.call(zoom).on("dblclick.zoom", null);
    svg.on("dblclick", (e) => {
      const [x, y] = d3.pointer(e);
      svg.transition().duration(400).ease(d3.easeCubicOut).call(zoom.scaleBy, 2, [x, y]);
    });
    // Clicks and hover on the canvas shapes (d3.zoom already swallows the click that ends a drag).
    svg.select(".hit-surface")
      .on("click", (e) => {
        const id = hitTest(e);
        if (id) {
          onSelect(id);
          zoomToFeature(id, { gentle: true });
        } else hideTip();
      })
      .on("mousemove", (e) => scheduleHover(e))
      .on("mouseleave", () => { setHover(null); hideTip(); });

    // Label geometry is computed once per view; placeLabels runs every zoom frame and must stay cheap.
    const proxyById = new Map(proxies.map((p) => [p.id, p]));
    const parents = new Set(regionsShown.map((r) => r.properties.parent));
    const labelGeo = [];
    for (const s of shapes) {
      if (!s.region && parents.has(s.id)) continue; // regions carry their own labels
      const px = proxyById.get(s.id);
      let anchor;
      if (px) anchor = [px.x, px.y];
      // Natural Earth's label point, not the centroid: a crescent like Croatia has its centroid in Bosnia.
      else if (!s.region && s.f.properties.lx !== undefined) anchor = projection([s.f.properties.lx, s.f.properties.ly]);
      else anchor = path.centroid(s.f);
      if (!anchor || !Number.isFinite(anchor[0])) continue;
      labelGeo.push({ id: s.id, anchor, width: s.b[1][0] - s.b[0][0], isProxy: Boolean(px) });
    }

    current = { id: viewId, view: v, projection, path, zoom, transform: d3.zoomIdentity, w, hgt, dpr, regionsShown,
      shapes, sphere, graticule, proxies, markers, gProxy, gLabels, gInsets, labelGeo, ctx: canvas.node().getContext("2d"),
      fineReady: false };
    hovered = null;
    if (viewId === "world" && hasDetail) prepareFine(current);
    recolor();
    if (previous) svg.call(zoom.transform, previous); // re-render of the same view keeps the user's zoom
    else placeLabels();
  }

  // Detailed world boundaries, built in small idle chunks so the first paint stays instant.
  function prepareFine(view) {
    const byId = new Map(features("detail").map((f) => [f.properties.id, f]));
    const queue = view.shapes.filter((s) => !s.region);
    const idle = window.requestIdleCallback || ((fn) => setTimeout(() => fn({ timeRemaining: () => 8 }), 16));
    const step = (deadline) => {
      if (current !== view) return;
      while (queue.length && deadline.timeRemaining() > 2) {
        const s = queue.shift();
        const f = byId.get(s.id);
        const d = f && view.path(f);
        if (d) s.fine = new Path2D(d);
      }
      if (queue.length) idle(step);
      else {
        view.fineReady = true;
        if (view.transform.k >= LOD_FINE_K) requestDraw();
      }
    };
    idle(step);
  }

  function drawInset(g, ins, w, hgt) {
    const iw = Math.min(220, w * 0.3), ih = iw * 0.62;
    const x = w - iw - 10, y = 10;
    const box = g.append("g").attr("class", "inset").attr("transform", `translate(${x},${y})`);
    box.append("rect").attr("width", iw).attr("height", ih).attr("class", "inset-frame");
    const p = d3.geoMercator().fitExtent([[8, 18], [iw - 8, ih - 8]], bboxGeometry(ins.bbox)).clipExtent([[0, 0], [iw, ih]]);
    const ip = d3.geoPath(p);
    const feats = features("detail").filter((f) => ins.must_include.includes(f.properties.id));
    box.selectAll("path.shape").data(feats).join("path").attr("class", "shape").attr("d", ip)
      .attr("data-id", (d) => d.properties.id)
      .on("click", (e, d) => { e.stopPropagation(); onSelect(d.properties.id); })
      .on("mousemove", (e, d) => showTip(e, d.properties.id)).on("mouseleave", hideTip);
    box.append("text").attr("x", 6).attr("y", 13).attr("class", "inset-label").text(ins.label);
  }

  // ------------------------------------------------------------------ canvas drawing

  let drawQueued = false;
  function requestDraw() {
    if (drawQueued) return;
    drawQueued = true;
    requestAnimationFrame(() => {
      drawQueued = false;
      draw();
    });
  }

  function draw() {
    const c = current;
    if (!c) return;
    const { ctx, dpr, transform: t } = c;
    const px = 1 / t.k; // one screen pixel in map units
    const fine = c.fineReady && t.k >= LOD_FINE_K;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = css("var(--ocean)");
    ctx.fillRect(0, 0, c.w, c.hgt);
    ctx.setTransform(dpr * t.k, 0, 0, dpr * t.k, dpr * t.x, dpr * t.y);

    // Ocean: a soft radial gradient, inside the sphere on the world view.
    const cx = c.w / 2, cy = c.hgt * 0.42, r = Math.max(c.w, c.hgt) * 0.75;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, css("var(--ocean-a)"));
    grad.addColorStop(1, css("var(--ocean-b)"));
    ctx.fillStyle = grad;
    if (c.sphere) ctx.fill(c.sphere);
    else ctx.fillRect(-c.w, -c.hgt, c.w * 3, c.hgt * 3);
    if (c.graticule) {
      ctx.strokeStyle = css("var(--graticule)");
      ctx.lineWidth = 0.6 * px;
      ctx.stroke(c.graticule);
    }

    // Only shapes intersecting the viewport are drawn.
    const [vx0, vy0] = t.invert([0, 0]);
    const [vx1, vy1] = t.invert([c.w, c.hgt]);
    const visible = c.shapes.filter((s) => !(s.b[1][0] < vx0 || s.b[0][0] > vx1 || s.b[1][1] < vy0 || s.b[0][1] > vy1));
    const geom = (s) => (fine && s.fine) || s.p2d;
    for (const s of visible) {
      ctx.globalAlpha = (s.provisional ? 0.68 : 1) * (s.id === hovered ? 0.86 : 1);
      ctx.fillStyle = s.color;
      ctx.fill(geom(s));
    }
    ctx.globalAlpha = 1;
    ctx.lineJoin = "round";
    ctx.strokeStyle = css("var(--land-stroke)");
    ctx.lineWidth = 0.5 * px;
    for (const s of visible) if (!s.region) ctx.stroke(geom(s));
    ctx.setLineDash([2 * px, 1.5 * px]);
    ctx.lineWidth = 0.45 * px;
    for (const s of visible) if (s.region) ctx.stroke(geom(s));
    ctx.setLineDash([]);
    if (c.sphere) {
      ctx.strokeStyle = css("var(--sphere-stroke)");
      ctx.lineWidth = px;
      ctx.stroke(c.sphere);
    }
    ctx.strokeStyle = css("var(--text)");
    for (const s of visible) {
      if (s.id === hovered && s.id !== selected) {
        ctx.lineWidth = px;
        ctx.stroke(geom(s));
      }
    }
    for (const s of visible) {
      if (s.id === selected) {
        ctx.lineWidth = 2.2 * px;
        ctx.stroke(geom(s));
      }
    }
  }

  // ------------------------------------------------------------------ hit testing and hover

  function hitTest(e) {
    const c = current;
    if (!c) return null;
    const [mx, my] = d3.pointer(e, svg.node());
    const [x, y] = c.transform.invert([mx, my]);
    const fine = c.fineReady && c.transform.k >= LOD_FINE_K;
    for (let i = c.shapes.length - 1; i >= 0; i--) {
      const s = c.shapes[i];
      if (x < s.b[0][0] || x > s.b[1][0] || y < s.b[0][1] || y > s.b[1][1]) continue;
      if (hitCtx.isPointInPath((fine && s.fine) || s.p2d, x, y)) return s.id;
    }
    return null;
  }

  let hoverEvent = null;
  function scheduleHover(e) {
    const pending = hoverEvent !== null;
    hoverEvent = e;
    if (pending) return;
    requestAnimationFrame(() => {
      const ev = hoverEvent;
      hoverEvent = null;
      const id = hitTest(ev);
      setHover(id);
      if (id) showTip(ev, id);
      else hideTip();
    });
  }

  function setHover(id) {
    if (id === hovered) return;
    hovered = id;
    svg.select(".hit-surface").classed("pointer", Boolean(id));
    requestDraw();
  }

  // ------------------------------------------------------------------ colours

  function recolor() {
    if (!current) return;
    for (const s of current.shapes) {
      s.color = css(colorOf(s.id));
      s.provisional = statusOf(s.id) === "provisional";
    }
    const apply = (sel) => sel.each(function (d) {
      const id = d.id || (d.properties && d.properties.id);
      this.style.setProperty("fill", colorOf(id));
      this.classList.toggle("provisional", statusOf(id) === "provisional");
      this.classList.toggle("selected", id === selected);
    });
    apply(current.gProxy.selectAll("circle"));
    apply(current.gInsets.selectAll("path.shape"));
    requestDraw();
  }

  // ------------------------------------------------------------------ labels

  let labelTimer = null;
  function scheduleLabels() {
    if (labelTimer) return;
    labelTimer = requestAnimationFrame(() => {
      labelTimer = null;
      placeLabels();
    });
  }

  function placeLabels() {
    const c = current;
    const t = c.transform;
    const out = [];
    if (c.view.labels || t.k >= 2.5) {
      const placed = [];
      const W = c.w, H = c.hgt;
      const overlaps = (b) => b.x0 < 0 || b.y0 < 0 || b.x1 > W || b.y1 > H || placed.some((p) => !(b.x1 < p.x0 || b.x0 > p.x1 || b.y1 < p.y0 || b.y0 > p.y1));
      for (const p of c.proxies) { // proxies occupy space too
        const [x, y] = t.apply([p.x, p.y]);
        placed.push({ x0: x - PROXY_R, y0: y - PROXY_R, x1: x + PROXY_R, y1: y + PROXY_R });
      }
      const candidates = [];
      for (const lg of c.labelGeo) {
        const text = labelOf(lg.id, t.k);
        if (!text) continue;
        const sw = lg.width * t.k;
        if (!lg.isProxy && sw < 18) continue;
        const [x, y] = t.apply(lg.anchor);
        if (x < 0 || x > W || y < 0 || y > H) continue;
        candidates.push({ id: lg.id, text, x, y, isProxy: lg.isProxy,
          priority: (lg.id === selected ? 1e6 : 0) + (isResearched(lg.id) ? 1e3 : 0) + (lg.isProxy ? 500 : sw) });
      }
      candidates.sort((a, b) => b.priority - a.priority);
      for (const cnd of candidates) {
        let tw = textWidth.get(cnd.text);
        if (tw === undefined) textWidth.set(cnd.text, (tw = measure.measureText(cnd.text).width));
        const opts = cnd.isProxy ? [...NEAR, ...FAR] : [[0, 4, "middle"], ...NEAR];
        for (const [dx, dy, anchor] of opts) {
          const lx = cnd.x + dx, ly = cnd.y + dy;
          const x0 = anchor === "start" ? lx : anchor === "end" ? lx - tw : lx - tw / 2;
          const box = { x0: x0 - 2, y0: ly - 10, x1: x0 + tw + 2, y1: ly + 3 };
          if (overlaps(box)) continue;
          placed.push(box);
          const leader = Math.hypot(dx, dy) > 20 ? { x1: cnd.x, y1: cnd.y, x2: anchor === "end" ? box.x1 - 2 : box.x0 + 2, y2: ly - 4 } : null;
          out.push({ ...cnd, lx, ly, anchor, leader });
          break;
        }
      }
    }
    // Keyed joins update existing nodes in place instead of recreating every label each frame.
    c.gLabels.selectAll("line.leader").data(out.filter((d) => d.leader), (d) => d.id).join("line")
      .attr("class", "leader").attr("x1", (d) => d.leader.x1).attr("y1", (d) => d.leader.y1)
      .attr("x2", (d) => d.leader.x2).attr("y2", (d) => d.leader.y2);
    c.gLabels.selectAll("text.label").data(out, (d) => d.id).join("text")
      .attr("class", (d) => (d.id === selected ? "label selected" : "label")).attr("data-id", (d) => d.id)
      .attr("x", (d) => d.lx).attr("y", (d) => d.ly).attr("text-anchor", (d) => d.anchor).text((d) => d.text);
  }

  // ------------------------------------------------------------------ tooltip

  let tipKey = null;
  function showTip(e, id, extra) {
    const key = `${id}|${extra || ""}`;
    if (key !== tipKey || tooltip.hidden) {
      const lines = tooltipOf(id);
      if (!lines) return;
      clear(tooltip);
      if (extra) tooltip.append(h("div", { class: "tip-extra" }, extra));
      tooltip.append(h("strong", null, lines.title));
      for (const l of lines.rows) tooltip.append(h("div", null, l));
      tipKey = key;
    }
    const r = root.getBoundingClientRect();
    tooltip.hidden = false;
    const x = Math.min(e.clientX - r.left + 14, r.width - tooltip.offsetWidth - 4);
    const y = Math.min(e.clientY - r.top + 14, r.height - tooltip.offsetHeight - 4);
    tooltip.style.setProperty("left", `${Math.max(4, x)}px`);
    tooltip.style.setProperty("top", `${Math.max(4, y)}px`);
  }
  function hideTip() {
    tooltip.hidden = true;
    tipKey = null;
  }

  // ------------------------------------------------------------------ navigation

  function zoomToPoint(xy, k) {
    const c = current;
    const tr = d3.zoomIdentity.translate(c.w / 2, c.hgt / 2).scale(k).translate(-xy[0], -xy[1]);
    svg.transition().duration(700).ease(d3.easeCubicInOut).call(c.zoom.transform, tr);
  }

  function shapeById(id) {
    return current ? current.shapes.find((s) => s.id === id) : null;
  }

  function zoomToFeature(id, { gentle = false } = {}) {
    const s = shapeById(id);
    if (!s) return false;
    const c = current;
    const [[x0, y0], [x1, y1]] = s.b;
    // Fit the feature; a click on the map zooms more gently (never past 6x, never out).
    let k = Math.max(1, Math.min(24, 0.42 / Math.max((x1 - x0) / c.w, (y1 - y0) / c.hgt)));
    if (gentle) k = Math.max(c.transform.k, Math.min(k, 6, c.transform.k * 2.5));
    zoomToPoint([(x0 + x1) / 2, (y0 + y1) / 2], k);
    return true;
  }

  return {
    render(viewId, options) {
      render(viewId, options);
    },
    get view() {
      return current && current.id;
    },
    recolor,
    setSelected(id) {
      selected = id;
      if (!current) return;
      current.gProxy.selectAll("circle").classed("selected", (d) => d.id === id);
      current.gInsets.selectAll("path.shape").classed("selected", (d) => d.properties.id === id);
      requestDraw();
      placeLabels();
    },
    setShowRegions(on) {
      showRegions = on;
      if (current) render(current.id, { keepZoom: true });
    },
    zoomToFeature,
    resetZoom() {
      if (current) svg.transition().duration(400).call(current.zoom.transform, d3.zoomIdentity);
    },
    zoomBy(f) {
      if (current) svg.transition().duration(250).call(current.zoom.scaleBy, f);
    },
    hasFeature(id) {
      return Boolean(shapeById(id));
    },
    // Screen position of a shape's label point (used by the end-to-end tests to click a country).
    pointOf(id) {
      const s = shapeById(id);
      if (!s) return null;
      const c = current;
      const lg = c.labelGeo.find((l) => l.id === id);
      const p = lg ? lg.anchor : c.path.centroid(s.f);
      return c.transform.apply(p);
    },
  };
}
