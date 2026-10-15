// Unit tests for the browser-side scoring and tax helpers: `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeWeights, reweightTaxShare, nontaxOnly, bestRegime, bandRange, bandFor, statusOf, TAX_METRICS } from "../../web/js/scoring.js";
import { applyBrackets, annualTaxes, transferTaxes, usFederalExtra, usEstateExtra, unrelievedUsWht } from "../../web/js/taxcalc.js";

const cfg = {
  bands: [{ min: 75, color: "blue" }, { min: 63, color: "green" }, { min: 0, color: "red" }],
  status_rules: { verified_min_completeness: 0.9, provisional_min_completeness: 0.6 },
  nontax_layer_max_missing: 0.4,
};
const weights = { capital_gains: 15, dividends: 5, inheritance: 10, wealth_tax: 10, safety: 8, legal: 15 };

test("weights normalise to 1 and tax share can be retargeted", () => {
  const n = normalizeWeights(weights);
  assert.ok(Math.abs(Object.values(n).reduce((a, b) => a + b, 0) - 1) < 1e-12);
  const r = reweightTaxShare(weights, 0.8);
  const tax = TAX_METRICS.reduce((a, m) => a + r[m], 0);
  assert.ok(Math.abs(tax - 0.8) < 1e-12);
  assert.throws(() => normalizeWeights({ a: 0 }));
});

test("bands and band labels", () => {
  assert.equal(bandFor(80, cfg).color, "blue");
  assert.equal(bandFor(null, cfg), null);
  assert.equal(bandRange(cfg, 0), "75+");
  assert.equal(bandRange(cfg, 1), "63–75");
});

test("status thresholds and knock-outs in the non-tax layer", () => {
  assert.equal(statusOf([["verified", "high"]], 0.9, true, cfg), "verified");
  assert.equal(statusOf(null, 0.59, true, cfg), "insufficient");
  assert.equal(nontaxOnly({ ko: [{}], nontax: { safety: 90 } }, weights, cfg), null);
  assert.equal(nontaxOnly({ nontax: { safety: 90, legal: null } }, weights, cfg), null); // 65% missing
});

test("regime choice: cheapest wins; activity and structure regimes follow the options", () => {
  const full = (v) => Object.fromEntries(TAX_METRICS.map((m) => [m, v]));
  const rows = [
    { id: "standard", cost: 500, scores: full(50) },
    { id: "work", activity: true, cost: 100, scores: full(90) },
    { id: "gmbh", structure: true, cost: 300, scores: full(70) },
  ];
  assert.equal(bestRegime(rows, weights).id, "gmbh");
  assert.equal(bestRegime(rows, weights, { includeActivity: true }).id, "work");
  assert.equal(bestRegime(rows, weights, { includeStructures: false }).id, "standard");
});

test("brackets, structures and transfers", () => {
  assert.equal(applyBrackets(250, [[0, 0.1], [100, 0.2], [200, 0.3]]), 10 + 20 + 15);
  assert.equal(applyBrackets(250, [[0, 0.1], [100, 0.2], [200, 0.3]], "whole_amount"), 75);
  const p = { portfolio: 30e6, foreign_share: 1, realized_gains: 1.2e6, dividends: 0.6e6, real_estate_local: 5e6,
    real_estate_foreign: 0, net_wealth: 35e6, estate: 30e6, children: 3, source_wht: 0.15, citizenship: "EU", us_share: 0.6,
    annual_payout: 400000, unrealized_gain_share: 0.4 };
  const gmbh = { cgt: { listed_domestic: 0.015, listed_foreign: 0.015 }, div: { domestic: 0.3, foreign_gross: 0.3, ftc: "none" },
    wealth: [], inh: null, lump_sum: null, structure: { payout_rate: 0.26375, running_cost: 0 } };
  const a = annualTaxes(gmbh, p);
  assert.equal(a.payout_tax, 400000 * 0.26375);
  const inh = { basis: "beneficiary", exemption: 0, brackets: [[0, 0.1]], mode: "marginal", other_cost: 0, scope: "local_assets_only" };
  assert.equal(transferTaxes({ inh }, { ...p, foreign_share: 0.9, estate: 35e6 }), 0.1 * (5e6 + 3e6));
});

test("US layer: federal top-up after credits, estate above the exemption, treaty withholding", () => {
  const p = { realized_gains: 1e6, dividends: 0, foreign_share: 1, source_wht: 0.15, estate: 50e6, children: 2, citizenship: "US", us_share: 0.6 };
  const overlay = { capital_gains_rate: 0.238, dividends_rate: 0.238, estate_rate: 0.4, estate_exemption_usd: 30e6, exempt_metrics: { PRI: { metrics: ["capital_gains"] } } };
  const local = { capital_gains: 0, dividends: 0, lump_sum: 0 };
  assert.ok(Math.abs(usFederalExtra({}, p, local, overlay, "ARE").capital_gains - 238000) < 1e-6);
  assert.equal(usFederalExtra({}, p, local, overlay, "PRI").capital_gains, 0);
  assert.ok(Math.abs(usEstateExtra(0, p, overlay, 1, { inh: null }) - 0.4 * 20e6) < 1e-6);
  const wht = { statutory_rate: 0.3, treaty_rate: 0.15 };
  assert.equal(unrelievedUsWht({ ...p, citizenship: "EU", dividends: 100 }, false, wht), 100 * 1 * 0.6 * 0.15);
  assert.equal(unrelievedUsWht({ ...p, dividends: 100 }, false, wht), 0); // US citizens: no WHT on their own country
});
