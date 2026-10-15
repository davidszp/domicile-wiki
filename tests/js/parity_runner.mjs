// Runs the browser modules under Node on the built data and prints JSON results, which
// tests/test_parity.py compares against the Python implementation.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { evaluate, personaEntry } from "../../web/js/scoring.js";
import { personaRows } from "../../web/js/earned.js";
import { annualTaxes, transferTaxes } from "../../web/js/taxcalc.js";

const web = new URL("../../web/data/", import.meta.url).pathname;
const scores = JSON.parse(readFileSync(join(web, "scores.json")));
const cfg = scores.meta.config;
const weights = Object.fromEntries(Object.entries(cfg.metrics).map(([k, m]) => [k, m.weight]));
const profiles = JSON.parse(process.argv[2]);

// Scenarios: default weights and options, a tax-heavy custom weighting, and both regime toggles flipped.
const custom = { ...weights, capital_gains: 30, wealth_tax: 25, culture: 0, cost: 12 };
const scenarios = {
  default: { weights, opts: {} },
  custom: { weights: custom, opts: {} },
  toggles: { weights, opts: { includeActivity: true, includeStructures: false } },
};
const evals = {};
for (const [name, sc] of Object.entries(scenarios)) {
  evals[name] = {};
  for (const [id, e] of Object.entries(scores.jurisdictions)) {
    evals[name][id] = {};
    for (const cz of ["EU", "US", "OTHER"]) {
      const r = evaluate(e, sc.weights, cz, cfg, sc.opts);
      evals[name][id][cz] = { score: r.score, tax_score: r.taxScore, status: r.status, regime: r.regime ? r.regime.id : null };
    }
  }
}
evals.customWeights = custom;

const calcs = {};
for (const f of readdirSync(join(web, "profiles"))) {
  const p = JSON.parse(readFileSync(join(web, "profiles", f)));
  if (!p.rules) continue;
  for (const [rid, rules] of Object.entries(p.rules)) {
    const std = rid === "standard" ? null : p.rules.standard;
    calcs[`${p.id}/${rid}`] = profiles.map((prof) => ({ annual: annualTaxes(rules, prof, std), transfer: transferTaxes(rules, prof) }));
  }
}
// Earned-income personas: overall evaluation on the projected entries, and the calculator's rows
// for several incomes and both kinds of work.
const personas = {};
for (const [pid, persona] of Object.entries(cfg.personas)) {
  if (!persona.income_kind) continue;
  const pw = Object.fromEntries(Object.entries(persona.metrics).map(([k, m]) => [k, m.weight]));
  personas[pid] = {};
  for (const [id, e] of Object.entries(scores.jurisdictions)) {
    personas[pid][id] = {};
    for (const cz of ["EU", "US", "OTHER"]) {
      const r = evaluate(personaEntry(e, pid, cz), pw, cz, cfg, { taxMetrics: persona.tax_metrics });
      personas[pid][id][cz] = { score: r.score, tax_score: r.taxScore, status: r.status, regime: r.regime ? r.regime.id : null };
    }
  }
}
const INCOMES = [20000, 60000, 150000, 700000];
const earned = {};
for (const f of readdirSync(join(web, "profiles"))) {
  const p = JSON.parse(readFileSync(join(web, "profiles", f)));
  if (!p.income_rules || p.level !== "country") continue;
  earned[p.id] = [];
  for (const income of INCOMES)
    for (const kind of ["employment", "self_employment"])
      for (const cz of ["EU", "US", "OTHER"])
        earned[p.id].push(personaRows(p.income_rules, kind, 3, cz, income, cfg).map((r) => ({ id: r.id, cost: r.cost, score: r.scores.income_tax, total: r.detail.total })));
}
process.stdout.write(JSON.stringify({ evals, calcs, personas, earned, incomes: INCOMES }));
