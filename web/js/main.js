// The app: the four modes (and Settings) in the stage on the right, the guide on the left, and the
// wiring between them. Every view reads the one store in state.js; this file decides what to redraw
// after each change.
//
//   guide.js   the left column: modes, "Your situation", search, theme, globe
//   router.js  the address bar and Back/Forward
//   layers.js  colours for the globe
//   modes/*    the content of each mode

import { h, clear, setDisplayCurrency } from "./dom.js";
import { state, initState, update, subscribe, jur, MODES } from "./state.js";
import { loadScores, loadWorld, DataError } from "./data.js";
import { evalOf, clearEvaluations } from "./results.js";
import { readHash, syncHash, startRouting } from "./router.js";
import { createGuide } from "./guide.js";
import { renderGuided } from "./modes/guided.js";
import { renderFactbook } from "./modes/factbook.js";
import { renderExplorer } from "./modes/explorer.js";
import { renderCompare } from "./modes/compare.js";
import { renderSettings } from "./modes/settings.js";

const $ = (sel) => document.querySelector(sel);
const SCORING_KEYS = ["persona", "weights", "citizenship", "includeActivity", "includeStructures", "koOff", "koExempt"];

// The four ways through the site, in the order of the guide on the left.
const MODE_INFO = {
  guided: { letter: "A", label: "Guided", hint: "Four questions, a shortlist", render: renderGuided },
  factbook: { letter: "B", label: "Factbook", hint: "Read about one country", render: renderFactbook },
  explorer: { letter: "C", label: "Explorer", hint: "Table, chart and map", render: renderExplorer },
  compare: { letter: "D", label: "Compare", hint: "What changes if you move", render: renderCompare },
};
// Pages outside the four modes (reached from the guide, not listed with A-D).
const PAGES = { ...MODE_INFO, settings: { label: "Settings", render: renderSettings } };

let guide = null;
let returnTo = null; // the mode a reader came from when a place opened in the Factbook

// ------------------------------------------------------------------ navigation

/** Change mode or view (remembered, and in the address so a link reopens the same page). */
function go(patch) {
  if (patch.mode && patch.mode !== "factbook") returnTo = null;
  update(patch, { persist: "mode" in patch });
}

/** Open a place: it opens in the Factbook, with a way back to where the reader came from. */
function select(id) {
  if (!jur(id)) return;
  if (state.mode !== "factbook") returnTo = state.mode;
  update({ selected: id, mode: "factbook", factbookPage: "article" });
  $("#stage").scrollTo?.(0, 0);
  window.scrollTo(0, 0);
}

// ------------------------------------------------------------------ the stage (the mode's content)

const ctx = { select, evalOf, go, refresh: () => renderStage() };

/** State keys each mode (and view) reads; the stage re-renders only when one of them changes. */
function depsOf() {
  const base = ["mode", "explorerView", "factbookPage", "compareView"];
  const scoring = [...SCORING_KEYS, "filters"];
  switch (state.mode) {
    case "guided": return [...base, ...scoring, "compare", "prioritiesByPersona"];
    case "factbook": return [...base, ...SCORING_KEYS, "selected", ...(state.factbookPage === "index" ? ["filters"] : [])];
    case "compare":
      if (state.compareView === "calculator") return [...base, "persona", "citizenship", "includeActivity", "includeStructures"];
      return [...base, ...scoring, "compare", "home"];
    // Not "weights": the sliders update in place and keep keyboard focus while they move.
    case "settings": return [...base, "persona", "citizenship", "koOff", "koExempt", "weightSets"];
    default:
      return [...base, ...scoring, "selected", "shortlist", "compare"];
  }
}

function renderStage() {
  const stage = $("#stage");
  const focusedId = stage.contains(document.activeElement) ? document.activeElement.id : null;
  const scroll = stage.scrollTop;
  clear(stage);
  document.body.dataset.page = state.mode;
  document.body.dataset.explorerView = state.explorerView;
  if (state.mode === "factbook" && returnTo && PAGES[returnTo]) {
    stage.append(h("button", { class: "linklike back", onclick: () => go({ mode: returnTo }) }, `← Back to ${PAGES[returnTo].label}`));
  }
  try {
    PAGES[state.mode].render(stage, ctx);
  } catch (e) {
    console.error(e);
    stage.append(h("div", { class: "error" }, `This view failed to render: ${e.message}`));
  }
  if (focusedId) document.getElementById(focusedId)?.focus();
  stage.scrollTop = scroll;
}

// ------------------------------------------------------------------ state changes

/** US citizens see USD, everyone else EUR (amounts are computed in EUR; see dom.js). */
function applyCurrency() {
  setDisplayCurrency(state.citizenship === "US" ? "USD" : "EUR", state.data.meta.fx_usd_per_eur);
}

function onStateChange(patch) {
  if ("citizenship" in patch) applyCurrency();
  const scoringChanged = SCORING_KEYS.some((k) => k in patch);
  if (scoringChanged) clearEvaluations();
  const recolor = scoringChanged;
  guide.onPatch(patch, { recolor });
  syncHash(patch);
  if (depsOf().some((k) => k in patch)) renderStage();
}

function showFatal(msg) {
  const el = $("#fatal");
  el.hidden = false;
  clear(el).append(h("strong", null, "The data could not load. "), msg, " ", h("button", { onclick: () => window.location.reload() }, "Retry"));
}

async function boot() {
  try {
    const [scores, world] = await Promise.all([loadScores(), loadWorld()]);
    initState(scores);
    Object.assign(state, readHash() || {});
    if (!MODES.includes(state.mode)) state.mode = "guided";
    applyCurrency();
    $("#built").textContent = `Data built ${scores.meta.built}.`;
    guide = createGuide({ world, modes: MODE_INFO, go, select });
    $("#loading").remove();
    renderStage();
    startRouting();
    subscribe(onStateChange);
    window.domicileReady = true; // used by tests
  } catch (e) {
    console.error(e);
    showFatal(e instanceof DataError ? e.message : `Unexpected error (${e && e.message ? e.message : e}). Try a hard reload (Ctrl+Shift+R).`);
  }
}

boot();
