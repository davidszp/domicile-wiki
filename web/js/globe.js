// Small orthographic globe for the left-hand guide. It is a pointer, not the main tool: it turns to
// whichever place is selected anywhere on the site, so a reader in Asia or the Americas sees where a
// country is. Drag to turn it, scroll or pinch to zoom, click a country to open it; the toolbar zooms,
// shows the whole globe, and turns to the reader's own location. EU members carry a dotted outline.
//
// SVG is fine at this size (~250 px, simplified world boundaries). Colours are CSS variables set
// through the CSSOM (allowed by the CSP, unlike style attributes).

const d3 = window.d3;
const topojson = window.topojson;

const TURN_MS = 750;
const MAX_ZOOM = 4; // automatic zoom: a tiny state still shows its neighbours
const MAX_USER_ZOOM = 14; // scroll, pinch and the + button go further
const STEP = 1.6; // + and - buttons
const ZOOM_RADIUS = 0.18; // a selected country fills about this angular radius (radians) of the view
const DOT_MAX_PX = 5; // countries smaller than this on screen get a dot when selected

export function createGlobe(root, { world, colorOf, isEu, nameOf, pointOf, onSelect, onLocate }) {
  const features = topojson.feature(world, world.objects.countries).features;
  const byId = new Map(features.map((f) => [f.properties.id, f]));
  const size = () => Math.max(150, Math.min(root.clientWidth || 220, 230));

  const svg = d3.select(root).append("svg").attr("class", "globe-svg").attr("role", "img").attr("aria-label", "Globe");
  // Stripes for occupied and other non-state areas (colours from CSS, so both themes work).
  const pat = svg.append("defs").append("pattern").attr("id", "globe-hatch").attr("patternUnits", "userSpaceOnUse")
    .attr("width", 5).attr("height", 5).attr("patternTransform", "rotate(45)");
  pat.append("rect").attr("class", "hatch-bg").attr("width", 5).attr("height", 5);
  pat.append("line").attr("class", "hatch-line").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 5);
  const sphere = svg.append("path").attr("class", "globe-sphere");
  const grat = svg.append("path").attr("class", "globe-graticule");
  const land = svg.append("g");
  const euLayer = svg.append("g").attr("class", "globe-eu");
  const selLayer = svg.append("path").attr("class", "globe-selected");
  const dot = svg.append("circle").attr("class", "globe-dot").attr("r", 4).attr("hidden", true);
  const hereMark = svg.append("circle").attr("class", "globe-here").attr("r", 4.5).attr("hidden", true);

  // Toolbar along the top: zoom in, zoom out, whole globe, my location.
  const tool = (label, title, onclick) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.title = title;
    b.setAttribute("aria-label", title);
    b.addEventListener("click", onclick);
    return b;
  };
  const tools = document.createElement("div");
  tools.className = "globe-tools";
  const btnIn = tool("+", "Zoom in", () => animate(projection.rotate(), Math.min(MAX_USER_ZOOM, zoom * STEP)));
  const btnOut = tool("−", "Zoom out", () => animate(projection.rotate(), Math.max(1, zoom / STEP)));
  const btnWhole = tool("⟲", "Whole globe", () => animate(projection.rotate(), 1));
  const btnMe = tool("◎", "My location (stays in your browser)", () => onLocate && onLocate());
  btnMe.id = "globe-locate";
  tools.append(btnIn, btnOut, btnWhole, btnMe);
  root.append(tools);
  const markTools = () => {
    btnOut.disabled = btnWhole.disabled = zoom <= 1.01;
    btnIn.disabled = zoom >= MAX_USER_ZOOM - 0.01;
  };

  const projection = d3.geoOrthographic().clipAngle(90).rotate([-15, -30]);
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule10();
  let selected = null;
  let movedByHand = false; // dragged or zoomed since the last automatic turn
  let zoom = 1;
  let base = 100; // scale at zoom 1, set by resize()
  let here = null; // the reader's location, [lon, lat], once they ask for it

  const shapes = land.selectAll("path").data(features).join("path")
    .attr("class", "globe-land")
    .on("click", (ev, f) => onSelect(f.properties.id));
  shapes.append("title").text((f) => nameOf(f.properties.id) || f.properties.name);
  const euShapes = euLayer.selectAll("path").data(features.filter((f) => isEu(f.properties.id))).join("path");

  // Each country is projected once per frame; the EU outlines reuse the same path strings.
  const drawn = new Map();
  function draw() {
    sphere.attr("d", path({ type: "Sphere" }));
    grat.attr("d", path(graticule));
    drawn.clear();
    shapes.attr("d", (f) => {
      const d = path(f);
      drawn.set(f, d);
      return d;
    });
    euShapes.attr("d", (f) => drawn.get(f));
    const f = selected && byId.get(selected);
    selLayer.attr("d", f ? path(f) : null);
    // Tiny states (Monaco, Malta, the Caribbean) vanish at this scale: mark them with a dot.
    const p = selected && pointOf(selected);
    const visible = p && d3.geoDistance(p, [-projection.rotate()[0], -projection.rotate()[1]]) < Math.PI / 2;
    const small = !f || (() => { const [[x0, y0], [x1, y1]] = path.bounds(f); return Math.max(x1 - x0, y1 - y0) < DOT_MAX_PX; })();
    if (visible && small) {
      const [x, y] = projection(p);
      dot.attr("cx", x).attr("cy", y).attr("hidden", null);
    } else dot.attr("hidden", true);
    if (here && d3.geoDistance(here, [-projection.rotate()[0], -projection.rotate()[1]]) < Math.PI / 2) {
      const [x, y] = projection(here);
      hereMark.attr("cx", x).attr("cy", y).attr("hidden", null);
    } else hereMark.attr("hidden", true);
  }

  function resize() {
    const s = size();
    svg.attr("viewBox", `0 0 ${s} ${s}`).attr("width", s).attr("height", s);
    base = s / 2 - 3;
    projection.scale(base * zoom).translate([s / 2, s / 2]).clipExtent([[0, 0], [s, s]]);
    draw();
  }

  function recolor() {
    shapes.style("fill", (f) => {
      const c = colorOf(f.properties.id);
      return c === "hatch" ? "url(#globe-hatch)" : c;
    });
  }

  // One d3.zoom handles everything the pointer does: a change of scale (wheel, pinch) zooms, a pan
  // (drag, one finger) turns the globe; latitude is clamped so it never flips over. A drag that moves
  // suppresses the click, so turning never opens a country by accident.
  let prev = d3.zoomIdentity;
  let syncing = false;
  const zoomer = d3.zoom().scaleExtent([1, MAX_USER_ZOOM]).on("zoom", (ev) => {
    if (syncing) return;
    movedByHand = true;
    const t = ev.transform;
    if (Math.abs(t.k - prev.k) > 1e-6) {
      zoom = t.k;
      projection.scale(base * zoom);
    } else {
      const [l, p] = projection.rotate();
      const k = 75 / projection.scale();
      projection.rotate([l + (t.x - prev.x) * k, Math.max(-80, Math.min(80, p - (t.y - prev.y) * k))]);
    }
    prev = t;
    markTools();
    draw();
  });
  svg.call(zoomer).on("dblclick.zoom", null);
  /** Tell d3.zoom about a zoom level set elsewhere (animations, buttons), without moving anything. */
  const syncZoomer = () => {
    syncing = true;
    svg.call(zoomer.transform, d3.zoomIdentity.scale(zoom));
    syncing = false;
    prev = d3.zoomIdentity.scale(zoom);
  };

  /** Zoom that makes a country fill about ZOOM_RADIUS: big countries stay at 1, small ones go up to MAX_ZOOM. */
  function zoomFor(id) {
    const f = byId.get(id);
    if (!f) return MAX_ZOOM;
    const r = Math.sqrt(d3.geoArea(f) / Math.PI); // angular radius of a disc with the same area
    return Math.max(1, Math.min(MAX_ZOOM, ZOOM_RADIUS / r));
  }

  function animate(to, k) {
    movedByHand = false;
    const from = projection.rotate();
    // Take the short way round.
    to = [...to];
    while (to[0] - from[0] > 180) to[0] -= 360;
    while (to[0] - from[0] < -180) to[0] += 360;
    const rot = d3.interpolate(from, to);
    // Zoom out part of the way first when moving far, so the reader sees where the view travels.
    const far = d3.geoDistance([-from[0], -from[1]], [-to[0], -to[1]]) > 0.6;
    const z0 = zoom;
    const zMid = far ? Math.min(z0, k, 1.3) : null;
    const zoomAt = (t) => (zMid === null ? z0 + (k - z0) * t : t < 0.5 ? z0 + (zMid - z0) * (t * 2) : zMid + (k - zMid) * ((t - 0.5) * 2));
    svg.interrupt().transition().duration(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : far ? TURN_MS * 1.4 : TURN_MS)
      .tween("move", () => (t) => {
        projection.rotate(rot(t));
        zoom = zoomAt(t);
        projection.scale(base * zoom);
        draw();
      })
      .on("end", () => { syncZoomer(); markTools(); });
  }

  function turnTo(id) {
    const p = pointOf(id);
    if (!p) return;
    const k = zoomFor(id);
    // Zoomed in, the view may centre on high latitudes; the whole globe keeps the poles off centre.
    const maxLat = k > 1.5 ? 80 : 60;
    animate([-p[0], -Math.max(-maxLat, Math.min(maxLat, p[1]))], k);
  }

  resize();
  recolor();
  markTools();
  new ResizeObserver(() => resize()).observe(root);

  return {
    recolor,
    select(id) {
      const same = id === selected;
      selected = id;
      shapes.classed("selected", (f) => f.properties.id === id);
      if (same && !movedByHand) return; // already there: no redraw, no animation
      draw();
      if (id) turnTo(id);
      else if (zoom > 1.01) animate(projection.rotate(), 1); // back to the whole globe only if zoomed in
    },
    /** Mark the reader's location and turn to it (zoomed to country level). */
    showHere(point) {
      here = point;
      animate([-point[0], -Math.max(-80, Math.min(80, point[1]))], MAX_ZOOM);
    },
    /** The country (map unit id) containing a point, or null (sea, or a unit not on the world map). */
    countryAt(point) {
      const f = features.find((x) => d3.geoContains(x, point));
      return f ? f.properties.id : null;
    },
  };
}
