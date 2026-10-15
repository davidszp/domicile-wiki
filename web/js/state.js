import { personaEntry, TAX_METRICS } from "./scoring.js";

// Small observable store. Only per-viewer conveniences go to localStorage (weights, shortlist,
// citizenship); every access is guarded because storage can be absent or throw.

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

function writeStored(s) {
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ weights: s.weightsByPersona.family_office, personaWeights: s.weightsByPersona, persona: s.persona,
        shortlist: s.shortlist, citizenship: s.citizenship, includeActivity: s.includeActivity, includeStructures: s.includeStructures }),
    );
  } catch {
    /* storage unavailable: keep working in memory */
  }
}

export const state = {
  data: null, // scores.json
  cfg: null,
  persona: "family_office", // family_office | expat | nomad (data/scoring_config.json personas)
  weights: null, // the active persona's weights
  defaultWeights: null,
  weightsByPersona: {},
  citizenship: "EU",
  includeActivity: false, // count regimes that need employment / a qualifying activity
  includeStructures: true, // count holding structures (GmbH, foundation, ...)
  view: "world",
  layer: "overall",
  showRegions: true,
  selected: null,
  compare: [],
  shortlist: [],
  tab: "profile",
};

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
  const stored = readStored();
  const pw = stored.personaWeights && typeof stored.personaWeights === "object" ? stored.personaWeights : {};
  for (const p of Object.keys(state.cfg.personas)) {
    state.weightsByPersona[p] = storedWeights(defaultWeightsFor(p), p === "family_office" ? pw[p] || stored.weights : pw[p]);
  }
  if (stored.persona in state.cfg.personas) state.persona = stored.persona;
  state.weights = state.weightsByPersona[state.persona];
  state.defaultWeights = defaultWeightsFor(state.persona);
  if (["EU", "US", "OTHER"].includes(stored.citizenship)) state.citizenship = stored.citizenship;
  state.includeActivity = stored.includeActivity === true;
  state.includeStructures = stored.includeStructures !== false;
  if (Array.isArray(stored.shortlist)) state.shortlist = stored.shortlist.filter((id) => id in data.jurisdictions);
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

/** Metric definitions (label, group, default weight) for a persona. */
export function metricsFor(persona = state.persona) {
  return isIncomePersona(persona) ? personaCfg(persona).metrics : state.cfg.metrics;
}

export function taxMetrics(persona = state.persona) {
  return isIncomePersona(persona) ? personaCfg(persona).tax_metrics : TAX_METRICS;
}

// Entries as the active persona sees them (see personaEntry), cached per persona and citizenship.
let projected = { key: null, map: null };

function projection() {
  const key = `${state.persona}|${state.citizenship}`;
  if (projected.key !== key) projected = { key, map: new Map() };
  return projected.map;
}

export function entries() {
  if (!isIncomePersona()) return Object.entries(state.data.jurisdictions);
  return Object.keys(state.data.jurisdictions).map((id) => [id, jur(id)]);
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
  if (!e || !isIncomePersona()) return e;
  const m = projection();
  if (!m.has(id)) m.set(id, personaEntry(e, state.persona, state.citizenship));
  return m.get(id);
}
