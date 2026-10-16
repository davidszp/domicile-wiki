// The guide on the left: the four modes, "Your situation" (persona, passport, structures, weights),
// search, the theme switch, and the globe with its caption and "My location".

import { h, append, clear, fmtScore } from "./dom.js";
import { state, update, entries, jur, taxMetrics, isIncomePersona, personaCfg } from "./state.js";
import { loadDetail } from "./data.js";
import { normalizeWeights } from "./scoring.js";
import { evalOf } from "./results.js";
import { createGlobe } from "./globe.js";
import { colorOf } from "./layers.js";
import { onThemeChange } from "./colors.js";

const $ = (sel) => document.querySelector(sel);

/**
 * Builds the guide. `nav` gives { modes, go, select }: the mode list and the navigation functions.
 * Returns { onPatch } for main.js to call after every state change.
 */
export function createGuide({ world, modes, go, select }) {
  // ------------------------------------------------------------------ modes and "Your situation"

  function renderModes() {
    const navEl = $("#modes");
    clear(navEl);
    for (const [id, m] of Object.entries(modes)) {
      navEl.append(h("button", { type: "button", class: "mode", "data-mode": id, "aria-current": state.mode === id ? "page" : null, onclick: () => go({ mode: id }) },
        h("span", { class: "mode-letter", "aria-hidden": "true" }, m.letter),
        h("span", { class: "mode-text" }, h("strong", null, m.label), h("span", { class: "small" }, m.hint))));
    }
    $("#open-settings").setAttribute("aria-pressed", String(state.mode === "settings"));
  }

  /** "Weights: default · tax 36% · Adjust"; weights change every score, so they stay in view. */
  function renderWeightsLine() {
    const el = $("#weights-line");
    clear(el);
    const norm = normalizeWeights(state.weights);
    const tax = taxMetrics().reduce((a, m) => a + (norm[m] || 0), 0);
    const custom = JSON.stringify(state.weights) !== JSON.stringify(state.defaultWeights);
    append(el, [h("span", { class: "muted" }, "Weights: "), custom ? "your own" : "default",
      h("span", { class: "muted" }, ` · tax ${Math.round(tax * 100)}% · `),
      h("button", { type: "button", class: "linklike", id: "adjust-weights", onclick: () => go({ mode: "settings" }) }, "Adjust")]);
  }

  function markPersona() {
    for (const b of document.querySelectorAll("#persona [data-persona]")) b.setAttribute("aria-pressed", String(b.dataset.persona === state.persona));
    $("#structures-wrap").hidden = isIncomePersona(); // only the HNWI persona's investment regimes use structures
    $("#persona-summary").textContent = personaCfg().summary;
  }

  function buildSituation() {
    const ps = $("#persona");
    for (const [pid, p] of Object.entries(state.cfg.personas)) {
      ps.append(h("button", { type: "button", "data-persona": pid, title: p.summary,
        onclick: () => pid !== state.persona && update({ persona: pid }, { persist: true }) }, p.label));
    }
    $("#open-settings").addEventListener("click", () => go({ mode: "settings" }));
    const cz = $("#citizenship");
    cz.value = state.citizenship;
    cz.addEventListener("change", () => update({ citizenship: cz.value }, { persist: true }));
    const st = $("#structures");
    st.checked = state.includeStructures;
    st.addEventListener("change", () => update({ includeStructures: st.checked }, { persist: true }));
  }

  // Theme buttons anywhere on the page (the guide, Settings): one click handler, re-marked on every change.
  function buildTheme() {
    const mark = () => {
      const current = window.domicileTheme ? window.domicileTheme.get() : "system";
      for (const b of document.querySelectorAll("[data-theme-choice]")) b.setAttribute("aria-pressed", String(b.dataset.themeChoice === current));
    };
    document.addEventListener("click", (ev) => {
      const b = ev.target.closest && ev.target.closest("[data-theme-choice]");
      if (b) window.domicileTheme?.set(b.dataset.themeChoice);
    });
    window.addEventListener("domicile:theme", mark);
    mark();
  }

  // ------------------------------------------------------------------ search

  // An accessible way to reach every jurisdiction, including the tiny ones.
  function buildSearch() {
    const input = $("#search");
    const list = $("#search-results");
    const all = entries().map(([id, e]) => ({ id, name: e.name, region: e.level === "region", label: e.parent && !e.territory ? `${e.name} (${jur(e.parent)?.name ?? e.parent})` : e.name }));
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
      // Best first: the exact name, then names starting with the text, then countries before regions,
      // so "Italy" opens Italy rather than "Abruzzo (Italy)".
      const rank = (x) => {
        const name = x.name.toLowerCase();
        return (name === q || x.id.toLowerCase() === q ? 0 : name.startsWith(q) ? 1 : x.label.toLowerCase().includes(q) ? 2 : 9) * 2 + (x.region ? 1 : 0);
      };
      const hits = all.filter((x) => rank(x) < 18).sort((a, b) => rank(a) - rank(b) || a.label.localeCompare(b.label)).slice(0, 12);
      // mousedown + preventDefault keeps focus in the input, so no blur timeout is needed.
      hits.forEach((x, i) => list.append(h("li", { role: "option", id: `opt-${i}`, dataset: { id: x.id },
        onmousedown: (e) => { e.preventDefault(); choose(x.id); } }, x.label, jur(x.id)?.eu ? h("span", { class: "eu-badge" }, "EU") : null)));
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

  // ------------------------------------------------------------------ globe

  // The globe follows the place the reader touched last: opened, added to the comparison or the
  // shortlist, or chosen as home in Compare.
  let focused = { id: state.selected, why: null };
  const seen = { compare: [...state.compare], shortlist: [...state.shortlist] };
  const WHY = { compare: "Added to comparison", shortlist: "Shortlisted", home: "Your home" };
  /** The globe points at the country (a region turns it to its country). */
  const target = (id) => (id ? jur(id)?.parent || id : null);

  function focusFrom(patch) {
    let next = null;
    if ("selected" in patch && state.selected) next = { id: state.selected, why: null };
    for (const key of ["compare", "shortlist"]) {
      if (!(key in patch)) continue;
      const added = state[key].filter((id) => !seen[key].includes(id));
      if (added.length) next = { id: added[added.length - 1], why: WHY[key] };
      seen[key] = [...state[key]];
    }
    if ("home" in patch && state.home) next = { id: state.home, why: WHY.home };
    return next;
  }

  function caption() {
    const cap = $("#globe-caption");
    clear(cap);
    const e = focused.id && jur(focused.id);
    if (!e) {
      cap.append(focused.why === "You are here" ? "You are here." : "Click a country to open it, drag to turn, scroll or pinch to zoom.");
      return;
    }
    const r = evalOf(focused.id);
    append(cap, [focused.why ? h("span", { class: "muted" }, `${focused.why}: `) : null, h("strong", null, e.name), e.eu ? h("span", { class: "eu-badge" }, "EU") : null,
      h("span", { class: "muted" }, r.status === "knocked_out" ? " · ruled out" : r.score !== null ? ` · score ${fmtScore(r.score)}` : " · unscored")]);
  }

  let detailFeatures = null;
  const countryIn = (topo, point) => {
    detailFeatures ??= window.topojson.feature(topo, topo.objects.countries).features;
    const f = detailFeatures.find((x) => window.d3.geoContains(x, point));
    return f ? f.properties.id : null;
  };

  /**
   * "My location": the browser's position, used only to turn the globe; it is never stored or sent.
   * Without permission (or support) it falls back to the home chosen in Compare.
   */
  function locate() {
    const btn = $("#globe-locate");
    const fallback = (why) => {
      if (state.home && jur(state.home)) {
        focused = { id: state.home, why: WHY.home };
        globe.select(target(state.home));
        caption();
      } else clear($("#globe-caption")).append(`${why} Set where you live in Compare to use that instead.`);
    };
    if (!navigator.geolocation) return fallback("This browser cannot share a location.");
    btn.disabled = true;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      btn.disabled = false;
      const point = [pos.coords.longitude, pos.coords.latitude];
      globe.showHere(point);
      let id = globe.countryAt(point);
      try { // the finer outline gets coasts and borders right; the globe's own is simplified
        id = countryIn(await loadDetail(), point) ?? id;
      } catch { /* keep the coarse answer */ }
      if (id && jur(id)?.territory) id = jur(id).parent; // an occupied area or buffer zone is part of a state
      focused = { id, why: "You are here" };
      caption();
    }, () => {
      btn.disabled = false;
      fallback("Location not shared.");
    }, { maximumAge: 600000, timeout: 10000 });
  }

  const globe = createGlobe($("#globe"), {
    world, colorOf, isEu: (id) => Boolean(jur(id)?.eu), nameOf: (id) => jur(id)?.name,
    pointOf: (id) => jur(id)?.label || null, onSelect: (id) => select(id), onLocate: locate,
  });
  onThemeChange(() => globe.recolor()); // the spectrum has different stops per theme

  renderModes();
  buildSituation();
  markPersona();
  renderWeightsLine();
  buildTheme();
  buildSearch();
  globe.select(target(focused.id));
  caption();

  return {
    /** Keep the guide in step after a state change; `recolor` when scores or the layer changed. */
    onPatch(patch, { recolor }) {
      if ("citizenship" in patch) $("#citizenship").value = state.citizenship;
      if ("includeStructures" in patch) $("#structures").checked = state.includeStructures;
      if ("persona" in patch) markPersona();
      if ("weights" in patch || "persona" in patch) renderWeightsLine();
      if ("mode" in patch) renderModes();
      if (recolor) globe.recolor();
      const next = focusFrom(patch);
      if (next) {
        focused = next;
        globe.select(target(focused.id));
      }
      if (next || recolor) caption();
    },
  };
}
