import { h, clear, fmtScore, fmtEur, setDisplayCurrency } from "./dom.js";
import { state, initState, update, subscribe, entries, jur, regimeOpts, metricsFor, taxMetrics, isIncomePersona, personaCfg, personaNoun } from "./state.js";
import { loadScores, loadWorld, loadDetail, loadRegions, loadViews, DataError } from "./data.js";
import { evaluate, nontaxOnly, bandFor, bandRange } from "./scoring.js";
import { createMap } from "./map.js";
import { renderProfile } from "./panels/profile.js";
import { renderRankings } from "./panels/rankings.js";
import { renderCompare } from "./panels/compare.js";
import { renderWeights } from "./panels/weights.js";
import { renderCalculator } from "./panels/calculator.js";
import { renderMethodology } from "./panels/methodology.js";
import { renderSources } from "./panels/sources.js";

const $ = (sel) => document.querySelector(sel);
const STATUS_LABEL = { verified: "Verified", provisional: "Provisional", insufficient: "Insufficient data", knocked_out: "Knocked out" };
const SCORING_KEYS = ["persona", "weights", "citizenship", "includeActivity", "includeStructures"];

let map = null;
let views = null;
let detailLoaded = false;
let detailReady = Promise.resolve();

// ------------------------------------------------------------------ scores per jurisdiction (cached)

let evalCache = new Map();
let layerCache = new Map();

function evalOf(id) {
  if (!evalCache.has(id)) evalCache.set(id, evaluate(jur(id), state.weights, state.citizenship, state.cfg, regimeOpts()));
  return evalCache.get(id);
}

/** Value shown on the map for the current layer; `status` is null where provisional does not apply. */
function layerValue(id) {
  if (layerCache.has(id)) return layerCache.get(id);
  const e = jur(id);
  let out;
  if (!e) out = { value: null, status: "insufficient" };
  else {
    const r = evalOf(id);
    if (state.layer === "overall") out = { value: r.score, status: r.status };
    else if (state.layer === "tax") out = { value: r.taxScore, status: r.taxScore === null ? "insufficient" : r.status };
    else if (state.layer === "nontax") out = { value: nontaxOnly(e, state.weights, state.cfg), status: null };
    else {
      const v = r.metrics[state.layer] ?? null;
      out = { value: v, status: v === null ? "insufficient" : taxMetrics().includes(state.layer) ? r.status : null };
    }
  }
  layerCache.set(id, out);
  return out;
}

function colorOf(id) {
  const e = jur(id);
  const knockedOut = e && e.ko && e.ko.length && state.layer !== "tax" && !taxMetrics().includes(state.layer);
  if (knockedOut) return "var(--band-red)";
  const b = bandFor(layerValue(id).value, state.cfg);
  return b ? `var(--band-${b.color})` : "var(--unscored)";
}

const statusOf = (id) => layerValue(id).status;

function tooltipOf(id) {
  const e = jur(id);
  if (!e) return null;
  const r = evalOf(id);
  const rows = [];
  if (r.status === "knocked_out") rows.push(`Knocked out: ${[...new Set(e.ko.map((k) => k.label))].join("; ")}`);
  else if (r.status === "insufficient" && r.taxScore === null) rows.push(e.researched ? "Insufficient data" : isIncomePersona() ? "Earned-income tax not researched: unscored" : "Tax rules not researched: unscored");
  else {
    rows.push(`Overall ${fmtScore(r.score)} · Tax ${fmtScore(r.taxScore)}`);
    rows.push(`${STATUS_LABEL[r.status]} · ${Math.round(r.completeness * 100)}% data`);
    if (r.regime && r.regime.type !== "standard") rows.push(`${r.regime.type === "structure" ? "Via structure" : "Best regime"}: ${r.regime.name}`);
    if (isIncomePersona() && r.regime?.cost != null) rows.push(`Income tax + social security ≈ ${fmtEur(r.regime.cost)}/yr`);
  }
  if (e.red_flag) rows.push(`Red flag: ${e.red_flag.label}`);
  if (e.flags?.pro_forma?.length) rows.push(`Pro forma: draft ${e.flags.pro_forma.join(", ").replaceAll("_", " ")} scored as if enacted`);
  if (e.inherited) rows.push("Uses national rules (region not separately researched)");
  return { title: e.parent ? `${e.name}, ${jur(e.parent)?.name ?? e.parent}` : e.name, rows };
}

function markersOf() {
  const out = [];
  for (const [id, e] of entries()) for (const m of e.markers || []) out.push({ ...m, owner: id });
  return out;
}

// ------------------------------------------------------------------ view selection

function viewFor(id) {
  const e = jur(id);
  if (!e) return "world";
  const country = e.parent || id;
  const vs = Object.entries(views).filter(([vid]) => vid !== "world");
  if (e.parent) for (const [vid, v] of vs) if ((v.regions || []).includes(country)) return vid;
  for (const [vid, v] of vs) if ((v.must_include || []).includes(country)) return vid;
  for (const [vid, v] of vs) if ((v.insets || []).some((i) => i.must_include.includes(country))) return vid;
  const label = jur(country)?.label;
  if (label) {
    const [x, y] = label;
    for (const [vid, v] of vs) {
      if (!v.bbox) continue;
      const [x0, y0, x1, y1] = v.bbox;
      if (x >= x0 && x <= x1 && y >= y0 && y <= y1) return vid;
    }
  }
  return "world";
}

function select(id, { zoom = true } = {}) {
  if (!jur(id)) return;
  update({ selected: id, tab: "profile" });
  if (!zoom) return;
  const target = viewFor(id);
  // Regional views need the detailed boundaries; wait for them instead of rendering half a map.
  if (target !== "world" && !detailLoaded) {
    detailReady.then(() => detailLoaded && state.selected === id && focusOn(id, target));
    return;
  }
  focusOn(id, target);
}

function focusOn(id, target) {
  if (map.view !== target && (target !== "world" || map.view === "world" || !map.hasFeature(id))) switchView(target);
  if (jur(id).parent && !state.showRegions && views[target].regions_toggle) {
    update({ showRegions: true });
    $("#regions-toggle").checked = true;
    map.setShowRegions(true);
  }
  map.zoomToFeature(id);
}

function switchView(vid) {
  if (vid !== "world" && !detailLoaded) return;
  update({ view: vid });
  map.render(vid);
  for (const b of document.querySelectorAll("[data-view]")) b.setAttribute("aria-pressed", String(b.dataset.view === vid));
  $("#regions-toggle-wrap").hidden = !views[vid].regions_toggle;
}

// ------------------------------------------------------------------ panels

// Each panel re-renders only when the state it reads changes (so sliders and filters keep focus).
const PANELS = {
  profile: { label: "Profile", render: renderProfile, deps: [...SCORING_KEYS, "selected"] },
  rankings: { label: "Rankings", render: renderRankings, deps: [...SCORING_KEYS, "selected", "shortlist", "compare"] },
  compare: { label: "Compare", render: renderCompare, deps: [...SCORING_KEYS, "compare", "shortlist"] },
  weights: { label: "Weights", render: renderWeights, deps: ["persona"] },
  calculator: { label: "Calculator", render: renderCalculator, deps: ["persona", "citizenship", "includeActivity", "includeStructures"] },
  methodology: { label: "Method", render: renderMethodology, deps: ["persona"] },
  sources: { label: "Sources", render: renderSources, deps: [] },
};

const ctx = { select, evalOf, refresh: () => renderPanel() };

function renderTabs() {
  const tabs = $("#tabs");
  clear(tabs);
  for (const [id, p] of Object.entries(PANELS)) {
    const extra = id === "compare" && state.compare.length ? ` (${state.compare.length})` : "";
    tabs.append(h("button", {
      role: "tab", id: `tab-${id}`, "aria-selected": String(state.tab === id), "aria-controls": "panel",
      class: state.tab === id ? "tab active" : "tab", onclick: () => update({ tab: id }),
    }, p.label + extra));
  }
}

function renderPanel() {
  const panel = $("#panel");
  const focusedId = panel.contains(document.activeElement) ? document.activeElement.id : null;
  clear(panel);
  panel.setAttribute("aria-labelledby", `tab-${state.tab}`);
  try {
    PANELS[state.tab].render(panel, ctx);
  } catch (e) {
    console.error(e);
    panel.append(h("div", { class: "error" }, `This panel failed to render: ${e.message}`));
  }
  if (focusedId) document.getElementById(focusedId)?.focus();
}

function renderLegend() {
  const lg = $("#legend");
  clear(lg);
  state.cfg.bands.forEach((b, i) => {
    lg.append(h("span", { class: "legend-item", title: `${b.label}: ${bandRange(state.cfg, i)}` },
      h("i", { class: `swatch band-${b.color}` }), `${b.label} ${bandRange(state.cfg, i)}`));
  });
  lg.append(h("span", { class: "legend-item" }, h("i", { class: "swatch unscored" }), "No data"));
  lg.append(h("span", { class: "legend-item", title: "Provisional: not every tax metric is fully verified" },
    h("i", { class: "swatch provisional" }), "Provisional"));
  lg.append(h("span", { class: "legend-item legend-note", title: "Knocked out on the persona's criteria (rule of law, corruption, conflict, violent crime, sanctions or capital controls)" },
    "Red also marks knock-outs"));
}

function fillLayers() {
  const layerSel = $("#layer");
  clear(layerSel);
  const label = personaNoun();
  const groups = { Summary: [["overall", `Overall ${label} score`], ["tax", "Tax score only"], ["nontax", "Non-tax score only"]] };
  groups["Single metric"] = Object.entries(metricsFor()).map(([k, m]) => [k, m.label]);
  for (const [g, opts] of Object.entries(groups)) {
    const og = h("optgroup", { label: g });
    for (const [v, l] of opts) og.append(h("option", { value: v }, l));
    layerSel.append(og);
  }
  layerSel.value = state.layer;
}

function markPersona() {
  for (const b of document.querySelectorAll("[data-persona]")) b.setAttribute("aria-pressed", String(b.dataset.persona === state.persona));
  // The activity and structure options only concern the HNWI persona's investment regimes.
  for (const id of ["#activity-wrap", "#structures-wrap"]) $(id).hidden = isIncomePersona();
  $("#persona-summary").textContent = personaCfg().summary;
}

function buildControls() {
  const layerSel = $("#layer");
  fillLayers();
  layerSel.addEventListener("change", () => update({ layer: layerSel.value }));

  const ps = $("#persona");
  for (const [pid, p] of Object.entries(state.cfg.personas)) {
    ps.append(h("button", { type: "button", "data-persona": pid, title: p.summary,
      onclick: () => {
        if (pid === state.persona) return;
        const layer = ["overall", "tax", "nontax"].includes(state.layer) || state.layer in metricsFor(pid) ? state.layer : "overall";
        update({ persona: pid, layer }, { persist: true });
      } }, p.label));
  }
  markPersona();

  const bindCheckbox = (sel, key) => {
    const el = $(sel);
    el.checked = state[key];
    el.addEventListener("change", () => update({ [key]: el.checked }, { persist: true }));
  };
  const cz = $("#citizenship");
  cz.value = state.citizenship;
  cz.addEventListener("change", () => update({ citizenship: cz.value }, { persist: true }));
  bindCheckbox("#activity", "includeActivity");
  bindCheckbox("#structures", "includeStructures");

  const vb = $("#views");
  for (const [vid, v] of Object.entries(views)) {
    vb.append(h("button", { "data-view": vid, "aria-pressed": String(vid === state.view), disabled: vid !== "world", onclick: () => switchView(vid) }, v.label));
  }
  const rt = $("#regions-toggle");
  rt.checked = state.showRegions;
  rt.addEventListener("change", () => { update({ showRegions: rt.checked }); map.setShowRegions(rt.checked); });

  const themeButtons = [...document.querySelectorAll("[data-theme-choice]")];
  const markTheme = () => {
    const current = window.domicileTheme ? window.domicileTheme.get() : "system";
    for (const b of themeButtons) b.setAttribute("aria-pressed", String(b.dataset.themeChoice === current));
  };
  for (const b of themeButtons) {
    b.addEventListener("click", () => {
      window.domicileTheme?.set(b.dataset.themeChoice);
      markTheme();
    });
  }
  markTheme();

  $("#zoom-in").addEventListener("click", () => map.zoomBy(1.6));
  $("#zoom-out").addEventListener("click", () => map.zoomBy(1 / 1.6));
  $("#zoom-reset").addEventListener("click", () => map.resetZoom());
  buildSearch();
}

// Search: an accessible way to reach every jurisdiction, including the tiny ones.
function buildSearch() {
  const input = $("#search");
  const list = $("#search-results");
  const all = entries().map(([id, e]) => ({ id, label: e.parent ? `${e.name} (${jur(e.parent)?.name ?? e.parent})` : e.name }))
    .sort((a, b) => a.label.localeCompare(b.label));
  let active = -1;
  const setActive = (i) => {
    active = i;
    [...list.children].forEach((li, j) => li.setAttribute("aria-selected", String(j === i)));
    if (i >= 0 && list.children[i]) input.setAttribute("aria-activedescendant", list.children[i].id);
    else input.removeAttribute("aria-activedescendant");
  };
  const close = () => {
    list.hidden = true;
    input.setAttribute("aria-expanded", "false");
    setActive(-1);
  };
  const choose = (id) => {
    input.value = "";
    close();
    select(id);
  };
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    clear(list);
    setActive(-1);
    if (q.length < 2) return close();
    const hits = all.filter((x) => x.label.toLowerCase().includes(q) || x.id.toLowerCase() === q).slice(0, 12);
    // mousedown + preventDefault keeps focus in the input, so no blur timeout is needed.
    hits.forEach((x, i) => list.append(h("li", { role: "option", id: `opt-${i}`, dataset: { id: x.id },
      onmousedown: (e) => { e.preventDefault(); choose(x.id); } }, x.label)));
    list.hidden = hits.length === 0;
    input.setAttribute("aria-expanded", String(hits.length > 0));
  });
  input.addEventListener("keydown", (e) => {
    const n = list.children.length;
    if ((e.key === "ArrowDown" || e.key === "ArrowUp") && n) {
      e.preventDefault();
      setActive((active + (e.key === "ArrowDown" ? 1 : -1) + n) % n);
    } else if (e.key === "Enter" && n) {
      e.preventDefault();
      choose(list.children[Math.max(0, active)].dataset.id);
    } else if (e.key === "Escape") close();
  });
  input.addEventListener("blur", close);
}

function showFatal(msg) {
  const el = $("#fatal");
  el.hidden = false;
  clear(el).append(h("strong", null, "The map could not load. "), msg, " ", h("button", { onclick: () => window.location.reload() }, "Retry"));
}

/** US citizens see USD, everyone else EUR (amounts are computed in EUR; see dom.js). */
function applyCurrency() {
  setDisplayCurrency(state.citizenship === "US" ? "USD" : "EUR", state.data.meta.fx_usd_per_eur);
}

function onStateChange(patch) {
  if ("citizenship" in patch) applyCurrency();
  if ("persona" in patch) {
    fillLayers();
    markPersona();
  }
  const scoringChanged = SCORING_KEYS.some((k) => k in patch);
  if (scoringChanged) evalCache = new Map();
  if (scoringChanged || "layer" in patch) {
    layerCache = new Map();
    map.recolor();
  }
  if ("selected" in patch) map.setSelected(state.selected);
  if ("tab" in patch || "compare" in patch) renderTabs();
  if ("tab" in patch || PANELS[state.tab].deps.some((k) => k in patch)) renderPanel();
}

async function boot() {
  try {
    const [scores, world, viewsJson] = await Promise.all([loadScores(), loadWorld(), loadViews()]);
    views = viewsJson;
    initState(scores);
    applyCurrency();
    $("#built").textContent = `Data built ${scores.meta.built} · FX ${scores.meta.fx_date}`;
    const topo = { world, detail: null, regions: null };
    const mapRoot = $("#map");
    map = createMap(mapRoot, {
      views, topo, colorOf, statusOf, tooltipOf, markersOf, showRegions: state.showRegions, isResearched: (id) => Boolean(jur(id)?.researched),
      // Keep the zoomed-out maps readable: researched jurisdictions are always labelled, others
      // (and regions that only inherit national rules) once the user zooms in.
      labelOf: (id, k) => {
        const e = jur(id);
        if (!e) return null;
        if (state.view === "world") return e.researched && !e.parent && k >= 2.5 ? e.name : null;
        if (!e.researched || e.inherited) return k >= 2 ? e.name : null;
        return e.name;
      },
      onSelect: (id) => select(id, { zoom: false }),
      onView: (vid) => switchView(vid),
    });
    window.domicileMap = { pointOf: (id) => map.pointOf(id), hasFeature: (id) => map.hasFeature(id) }; // used by tests
    buildControls();
    renderLegend();
    map.render("world");
    renderTabs();
    renderPanel();
    $("#loading").hidden = true;
    subscribe(onStateChange);

    // Detailed boundaries and regions arrive in the background; regional views wait for them.
    detailReady = Promise.all([loadDetail(), loadRegions()]).then(([detail, regions]) => {
      topo.detail = detail;
      topo.regions = regions;
      detailLoaded = true;
      for (const b of document.querySelectorAll("[data-view]")) b.disabled = false;
      map.render(state.view, { keepZoom: true });
    }).catch((e) => {
      console.error(e);
      $("#views-note").textContent = "Regional close-ups are unavailable (boundary data failed to load).";
    });

    let size = [mapRoot.clientWidth, mapRoot.clientHeight];
    let resizeTimer = null;
    new ResizeObserver(() => {
      const next = [mapRoot.clientWidth, mapRoot.clientHeight];
      if (next[0] === size[0] && next[1] === size[1]) return; // also skips the observer's initial callback
      size = next;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => map.render(state.view, { keepZoom: true }), 150);
    }).observe(mapRoot);
  } catch (e) {
    console.error(e);
    showFatal(e instanceof DataError ? e.message : `Unexpected error (${e && e.message ? e.message : e}). Try a hard reload (Ctrl+Shift+R).`);
  }
}

boot();
