import { personaEntry, TAX_METRICS } from "./scoring.js";

// Small observable store. The reader's settings (persona, passport, weights, saved weight sets,
// knock-out rules, shortlist, home) are kept in this browser's localStorage, so there is no login;
// every access is guarded because storage can be absent or throw. Settings can be exported to a file
// and imported on another device (Settings page).

const KEY = "domicile:v1";
const OLD_KEY = "wealthmap:v1"; // before the rename to domicile.wiki; read once, then saved under KEY
const listeners = new Set();

function readStored() {
  try {
    const raw = window.localStorage.getItem(KEY) ?? window.localStorage.getItem(OLD_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/** Everything worth keeping, as a plain object (also the export file format). */
export function settingsSnapshot(s = state) {
  return { weights: s.weightsByPersona.family_office, personaWeights: s.weightsByPersona, persona: s.persona,
    shortlist: s.shortlist, citizenship: s.citizenship, includeStructures: s.includeStructures,
    mode: s.mode, view: s.view, home: s.home, priorities: s.prioritiesByPersona,
    weightSets: s.weightSets, koOff: s.koOff, koExempt: s.koExempt,
    theme: globalThis.window?.domicileTheme ? window.domicileTheme.get() : "system" }; // the theme itself is stored by theme.js
}

function writeStored(s) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(settingsSnapshot(s)));
  } catch {
    /* storage unavailable: keep working in memory */
  }
}

export function storageAvailable() {
  try {
    const k = "domicile:probe";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

// Explorer filters (Guided's deal-breakers are the same switches). Simple shows only SIMPLE_FILTERS;
// the others then count at these defaults, so nothing filters the list without being on screen.
export const FILTER_DEFAULTS = {
  sort: "score", continent: "", level: "countries", minStatus: "provisional", euOnly: false, mediterranean: false, noWealthTax: false,
  familyInheritsFree: false, lowCgt: false, goodDividends: false, shortlistOnly: false, lowIncomeTax: false,
};
export const SIMPLE_FILTERS = ["euOnly", "noWealthTax", "familyInheritsFree", "lowIncomeTax", "shortlistOnly"];

export const state = {
  data: null, // scores.json
  cfg: null,
  persona: "family_office", // family_office | expat | nomad (data/scoring_config.json personas)
  weights: null, // the active persona's weights
  defaultWeights: null,
  weightsByPersona: {},
  citizenship: "EU",
  includeActivity: false, // regimes that need local employment or business are not counted (no switch in the UI)
  includeStructures: true, // count holding structures (GmbH, foundation, ...)
  selected: null,
  compare: [],
  shortlist: [],
  // The four ways through the site. All of them read this one store, so a change made in one
  // (persona, passport, weights, filters, selection) shows up in every other.
  mode: "guided", // guided | factbook | explorer | compare | settings
  // Simple shows each mode's main answers only; Advanced is everything. Same data and scores either way.
  view: "simple", // simple | advanced
  explorerView: "table", // table | chart
  compareView: "side", // side | calculator
  factbookPage: "article", // article | index | method | sources
  home: null, // where the user lives now (Compare)
  prioritiesByPersona: {}, // Guided: indexes of the persona's priorities that count double
  weightSets: [], // saved weight sets: { name, persona, weights }
  koOff: {}, // knock-out rules switched off, per persona: { family_office: ["rule_of_law", ...] }
  koExempt: [], // countries never ruled out, whatever the rules
  filters: { ...FILTER_DEFAULTS },
};

export const MODES = ["guided", "factbook", "explorer", "compare", "settings"];
export const isSimple = () => state.view === "simple";

export function defaultWeightsFor(persona) {
  return Object.fromEntries(Object.entries(metricsFor(persona)).map(([k, m]) => [k, m.weight]));
}

function storedWeights(defaults, stored) {
  const w = { ...defaults };
  if (stored && typeof stored === "object") {
    for (const k of Object.keys(w)) {
      const v = Number(stored[k]);
      if (Number.isFinite(v) && v >= 0 && v <= 100) w[k] = v;
    }
    if (Object.values(w).every((v) => v === 0)) return { ...defaults };
  }
  return w;
}

export function initState(data) {
  state.data = data;
  state.cfg = data.meta.config;
  applySettings(readStored());
}

/** The knock-out rule ids a persona uses (data/scoring_config.json personas.<p>.knockout). */
export const koRules = (persona = state.persona) => personaCfg(persona).knockout;

/**
 * Applies a stored or imported settings object to the state, keeping only valid values (it may come
 * from an old version of the site or from a file someone edited). Unknown keys are ignored.
 */
export function applySettings(stored) {
  const data = state.data;
  if (!stored || typeof stored !== "object") stored = {};
  const pw = stored.personaWeights && typeof stored.personaWeights === "object" ? stored.personaWeights : {};
  for (const p of Object.keys(state.cfg.personas)) {
    state.weightsByPersona[p] = storedWeights(defaultWeightsFor(p), p === "family_office" ? pw[p] || stored.weights : pw[p]);
  }
  if (stored.persona in state.cfg.personas) state.persona = stored.persona;
  state.weights = state.weightsByPersona[state.persona];
  state.defaultWeights = defaultWeightsFor(state.persona);
  if (["EU", "US", "OTHER"].includes(stored.citizenship)) state.citizenship = stored.citizenship;
  state.includeStructures = stored.includeStructures !== false;
  if (MODES.includes(stored.mode)) state.mode = stored.mode;
  state.view = stored.view === "advanced" ? "advanced" : "simple";
  if (typeof stored.home === "string" && stored.home in data.jurisdictions) state.home = stored.home;
  if (stored.priorities && typeof stored.priorities === "object") {
    for (const [p, list] of Object.entries(stored.priorities)) {
      if (p in state.cfg.personas && Array.isArray(list)) state.prioritiesByPersona[p] = list.filter((i) => Number.isInteger(i) && i >= 0 && i < state.cfg.personas[p].profile.priorities.length);
    }
  }
  if (Array.isArray(stored.shortlist)) state.shortlist = stored.shortlist.filter((id) => id in data.jurisdictions);
  state.weightSets = Array.isArray(stored.weightSets)
    ? stored.weightSets.filter((w) => w && typeof w.name === "string" && w.name.trim() && w.persona in state.cfg.personas)
      .map((w) => ({ name: w.name.trim().slice(0, 60), persona: w.persona, weights: storedWeights(defaultWeightsFor(w.persona), w.weights) }))
      .slice(0, 50)
    : [];
  state.koOff = {};
  if (stored.koOff && typeof stored.koOff === "object") {
    for (const [p, list] of Object.entries(stored.koOff)) {
      if (p in state.cfg.personas && Array.isArray(list)) state.koOff[p] = [...new Set(list.filter((r) => koRules(p).includes(r)))];
    }
  }
  state.koExempt = Array.isArray(stored.koExempt) ? [...new Set(stored.koExempt.filter((id) => id in data.jurisdictions))] : [];
}

/** Persist the current settings (e.g. after an import or a reset). */
export function saveSettings() {
  writeStored(state);
}

export function update(patch, { persist = false } = {}) {
  if ("persona" in patch && patch.persona !== state.persona) {
    patch = { ...patch, weights: state.weightsByPersona[patch.persona], defaultWeights: defaultWeightsFor(patch.persona) };
  }
  Object.assign(state, patch);
  if ("weights" in patch) state.weightsByPersona[state.persona] = state.weights;
  if (persist) writeStored(state);
  for (const fn of listeners) fn(patch);
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export const MAX_COMPARE = 5;

/** Add or remove an id from a list in the state (shortlist, compare). Returns false if the list is full. */
export function toggleIn(key, id, { persist = false, max = Infinity } = {}) {
  const list = state[key];
  if (list.includes(id)) update({ [key]: list.filter((x) => x !== id) }, { persist });
  else if (list.length >= max) return false;
  else update({ [key]: [...list, id] }, { persist });
  return true;
}

// Personas -------------------------------------------------------------------------------

export const isIncomePersona = (persona = state.persona) => persona !== "family_office";

export function personaCfg(persona = state.persona) {
  return state.cfg.personas[persona];
}

/** The persona's name for use inside a sentence: lower case, except acronyms such as "HNWI". */
export function personaNoun(persona = state.persona) {
  const label = personaCfg(persona).label;
  return label === label.toUpperCase() ? label : label.toLowerCase();
}

/** Metric definitions (label, group, default weight) for a persona. */
export function metricsFor(persona = state.persona) {
  return isIncomePersona(persona) ? personaCfg(persona).metrics : state.cfg.metrics;
}

export function taxMetrics(persona = state.persona) {
  return isIncomePersona(persona) ? personaCfg(persona).tax_metrics : TAX_METRICS;
}

// Entries as the reader sees them: the active persona's view (see personaEntry), with knock-outs the
// reader has switched off removed. Every mode, the globe and the map read entries through jur(), so a
// knock-out setting applies everywhere at once. Cached per persona, citizenship and knock-out settings.
let projected = { key: null, map: null };

function projection() {
  const key = `${state.persona}|${state.citizenship}|${(state.koOff[state.persona] || []).join(",")}|${state.koExempt.join(",")}`;
  if (projected.key !== key) projected = { key, map: new Map() };
  return projected.map;
}

export function entries() {
  return Object.keys(state.data.jurisdictions).map((id) => [id, jur(id)]);
}

/** Knock-outs as the data has them for the active persona, before the reader's settings. */
export function defaultKo(id) {
  const e = state.data.jurisdictions[id];
  if (!e) return [];
  return (isIncomePersona() ? personaEntry(e, state.persona, state.citizenship).ko : e.ko) || [];
}

function applyKoSettings(e, id) {
  if (!e.ko || !e.ko.length) return e;
  const off = state.koOff[state.persona] || [];
  const exempt = state.koExempt.includes(id) || (e.parent && state.koExempt.includes(e.parent));
  const kept = exempt ? [] : e.ko.filter((k) => !off.includes(k.id));
  if (kept.length === e.ko.length) return e;
  return { ...e, ko: kept, koWaived: e.ko.filter((k) => !kept.includes(k)), koExempt: Boolean(exempt) };
}

export function regimeOpts() {
  if (isIncomePersona()) return { taxMetrics: taxMetrics() };
  return { includeActivity: state.includeActivity, includeStructures: state.includeStructures };
}

/** The raw entry from scores.json, whatever the persona. */
export function rawJur(id) {
  return state.data.jurisdictions[id];
}

export function jur(id) {
  const e = state.data.jurisdictions[id];
  if (!e) return e;
  const m = projection();
  if (!m.has(id)) m.set(id, applyKoSettings(isIncomePersona() ? personaEntry(e, state.persona, state.citizenship) : e, id));
  return m.get(id);
}
