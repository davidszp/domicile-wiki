// Final scoring step in the browser: weights x metric scores. Metric scores themselves come
// precomputed from the Python pipeline (domicile/scoring.py); this file mirrors only
// overall(), tax_only(), status() and the best-regime choice, and is tested for parity.

export const TAX_METRICS = ["capital_gains", "dividends", "wealth_tax", "inheritance"];
const DEFAULT_TAX = TAX_METRICS;

/**
 * An entry as one of the earned-income personas (Expat, Digital nomad) sees it: its tax rows carry
 * `income_tax` only, the non-tax metrics are the persona's (its own Annual Household Cost, plus visa
 * access for the citizenship), and knock-outs are the persona's. Mirrors summarize_persona() in
 * domicile/build.py.
 */
export function personaEntry(entry, persona, citizenship) {
  const p = entry.personas && entry.personas[persona];
  const base = { name: entry.name, level: entry.level, parent: entry.parent, continent: entry.continent, region: entry.region, eu: entry.eu, non_member: entry.non_member, territory: entry.territory, succession: entry.succession, residence: persona === "nomad" ? entry.residence_nomad : persona === "expat" ? entry.residence_work : entry.residence,
    label: entry.label, inherited: entry.inherited, markers: [], persona, red_flag: entry.red_flag };
  if (!p) return { ...base, researched: false, tax: null, nontax: {}, ko: entry.ko || [], verification: null, household_cost: null };
  return {
    ...base,
    researched: p.researched,
    tax: p.tax,
    nontax: { ...p.nontax, ...(p.visa ? { visa: p.visa[citizenship] } : {}), ...(p.leftover ? { leftover: p.leftover[citizenship] } : {}) },
    ko: p.ko,
    verification: p.verification,
    household_cost: p.household_cost,
    income_eur: p.income_eur,
    salary_multiplier: p.salary_multiplier,
  };
}

export function normalizeWeights(weights) {
  const total = Object.values(weights).reduce((a, b) => a + Math.max(0, b), 0);
  if (total <= 0) throw new Error("at least one weight must be positive");
  return Object.fromEntries(Object.entries(weights).map(([k, w]) => [k, Math.max(0, w) / total]));
}

// opts.includeActivity: count regimes needing employment / a qualifying activity (default off:
// the family is assumed to be passive investors). opts.includeStructures: count holding
// structures (default on). Mirrors best_regime() in domicile/build.py.
export function bestRegime(rows, weights, opts = {}) {
  if (!rows) return null;
  const { includeActivity = false, includeStructures = true, taxMetrics: TAX_METRICS = DEFAULT_TAX } = opts;
  rows = rows.filter((r) => (includeActivity || !r.activity) && (includeStructures || !r.structure));
  if (rows.length === 0) return null;
  // The family picks the cheapest regime (expected EUR cost a year, see domicile/scoring.py
  // regime_cost); ties keep the earlier (standard) one. Weights are only a fallback.
  const priced = rows.filter((r) => r.cost !== null && r.cost !== undefined && TAX_METRICS.every((m) => r.scores[m] !== null));
  if (priced.length) return priced.reduce((a, b) => (b.cost < a.cost ? b : a));
  let best = null;
  let bestValue = -Infinity;
  for (const r of rows) {
    const complete = TAX_METRICS.every((m) => r.scores[m] !== null && r.scores[m] !== undefined);
    const value = complete ? TAX_METRICS.reduce((a, m) => a + weights[m] * r.scores[m], 0) : -1;
    if (value > bestValue) {
      best = r;
      bestValue = value;
    }
  }
  return best;
}

export function round2(x) {
  return Math.round(x * 100) / 100;
}

export function evaluate(entry, weights, citizenship, cfg, opts = {}) {
  const TAX_METRICS = opts.taxMetrics || DEFAULT_TAX;
  const w = normalizeWeights(weights);
  const rows = entry.tax ? entry.tax[citizenship] || [] : [];
  const regime = bestRegime(rows, weights, opts);
  const metrics = { ...entry.nontax };
  let taxComputable = false;
  for (const m of TAX_METRICS) metrics[m] = regime ? regime.scores[m] : null;
  if (regime) taxComputable = TAX_METRICS.every((m) => regime.scores[m] !== null);

  let score = 0;
  let missingWeight = 0;
  const missing = [];
  for (const m of Object.keys(w)) {
    const v = metrics[m];
    if (v === null || v === undefined) {
      missingWeight += w[m];
      missing.push(m);
    } else score += w[m] * v;
  }
  const completeness = 1 - missingWeight;
  // Earned-income personas: the regime used must be verified too (mirrors summarize_persona).
  const verification = entry.persona && regime && regime.verification ? [...(entry.verification || []), regime.verification] : entry.verification;
  const st = entry.ko && entry.ko.length ? "knocked_out" : statusOf(verification, completeness, taxComputable, cfg);
  return {
    score: st === "insufficient" || st === "knocked_out" ? null : round2(score),
    rawScore: round2(score),
    maxIfMissingPerfect: round2(score + 100 * missingWeight),
    taxScore: taxOnly(metrics, weights, TAX_METRICS),
    status: st,
    regime,
    completeness,
    missing,
    metrics,
  };
}

export function taxOnly(metrics, weights, TAX_METRICS = DEFAULT_TAX) {
  if (TAX_METRICS.some((m) => metrics[m] === null || metrics[m] === undefined)) return null;
  const tw = Object.fromEntries(TAX_METRICS.map((m) => [m, weights[m]]));
  const total = Object.values(tw).reduce((a, b) => a + b, 0);
  if (total <= 0) return null;
  return round2(TAX_METRICS.reduce((a, m) => a + (tw[m] / total) * metrics[m], 0));
}

/** Non-tax score alone; null for knocked-out jurisdictions or when too much non-tax data is missing. */
export function nontaxOnly(entry, weights, cfg) {
  if (entry.ko && entry.ko.length) return null;
  const keys = Object.keys(entry.nontax || {});
  const total = keys.reduce((a, k) => a + weights[k], 0);
  if (total <= 0) return null;
  let s = 0;
  let missing = 0;
  for (const k of keys) {
    const v = entry.nontax[k];
    if (v === null || v === undefined) missing += weights[k] / total;
    else s += (weights[k] / total) * v;
  }
  return missing > cfg.nontax_layer_max_missing ? null : round2(s);
}

export function statusOf(verification, completeness, taxComputable, cfg) {
  const r = cfg.status_rules;
  if (!taxComputable || completeness < r.provisional_min_completeness - 1e-9) return "insufficient";
  if (
    verification &&
    verification.every(([v, c]) => v === "verified" && c !== "low") &&
    completeness >= r.verified_min_completeness - 1e-9
  )
    return "verified";
  return "provisional";
}

export function bandFor(score, cfg) {
  if (score === null || score === undefined) return null;
  return cfg.bands.find((b) => score >= b.min) || cfg.bands[cfg.bands.length - 1];
}

/** "63–75" style range text for band i (bands are ordered from best to worst). */
export function bandRange(cfg, i) {
  const upper = cfg.bands[i - 1]?.min;
  return `${cfg.bands[i].min}${upper !== undefined ? `–${upper}` : "+"}`;
}

export function reweightTaxShare(weights, share, TAX_METRICS = DEFAULT_TAX) {
  const tax = TAX_METRICS.reduce((a, m) => a + weights[m], 0);
  const rest = Object.entries(weights).filter(([k]) => !TAX_METRICS.includes(k)).reduce((a, [, v]) => a + v, 0);
  const out = {};
  for (const [k, v] of Object.entries(weights)) {
    out[k] = TAX_METRICS.includes(k) ? (tax ? (share * v) / tax : 0) : rest ? ((1 - share) * v) / rest : 0;
  }
  return out;
}

/**
 * Rank jurisdictions by overall or tax score. `evalFn(id, entry)` returns the evaluation; pass a cached
 * one for the current weights, or omit it to evaluate with the given weights (e.g. sensitivity runs).
 */
export function rank(entries, weights, citizenship, cfg, key = "score", opts = {}, evalFn = null) {
  const ev = evalFn || ((id, e) => evaluate(e, weights, citizenship, cfg, opts));
  const rows = [];
  for (const [id, e] of entries) {
    const r = ev(id, e);
    const v = key === "score" ? r.score : r.taxScore;
    if (v !== null && r.status !== "insufficient" && r.status !== "knocked_out") rows.push({ id, e, r, value: v });
  }
  rows.sort((a, b) => b.value - a.value || a.e.name.localeCompare(b.e.name));
  return rows;
}
