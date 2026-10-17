// Evaluations for the current settings, shared by every mode and the globe: one cache,
// cleared whenever anything that changes a score changes (see main.js).
import { state, jur, regimeOpts } from "./state.js";
import { evaluate } from "./scoring.js";

let cache = new Map();

export function evalOf(id) {
  if (!cache.has(id)) cache.set(id, evaluate(jur(id), state.weights, state.citizenship, state.cfg, regimeOpts()));
  return cache.get(id);
}

export function clearEvaluations() {
  cache = new Map();
}

/** Expected tax a year (EUR) under the regime used for the score, or null. */
export function taxPerYear(id) {
  const c = evalOf(id).regime?.cost;
  return c === null || c === undefined ? null : c;
}

export const isEu = (id) => Boolean(jur(id)?.eu);
