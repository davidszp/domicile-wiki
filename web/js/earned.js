// Earned-income tax for the Expat and Digital nomad personas. Mirrors domicile/earned.py
// (earned_tax, eligible, rate_score, persona_rows); tests/test_parity.py keeps the two in step.
// Rules come compiled in EUR from the build (profile `income_rules`).

import { round2 } from "./scoring.js";

function applyBrackets(amount, brackets) {
  if (amount <= 0 || !brackets.length) return 0;
  let tax = 0;
  brackets.forEach(([start, rate], i) => {
    const end = i + 1 < brackets.length ? brackets[i + 1][0] : Infinity;
    if (amount > start) tax += (Math.min(amount, end) - start) * rate;
  });
  return tax;
}

function standardTax(rules, income, kind, deduction = 0) {
  const brackets = kind === "self_employment" && rules.brackets_self ? rules.brackets_self : rules.brackets;
  return applyBrackets(Math.max(0, income - rules.allowance - deduction), brackets);
}

function employmentDeduction(rules, income, kind) {
  const e = rules.employment_deduction;
  if (kind !== "employment" || !e) return 0;
  let d = Math.max(e.min, e.base + applyBrackets(income, e.schedule));
  if (e.max !== null) d = Math.min(d, e.max);
  return Math.min(d, income);
}

function ssc(rules, income, kind) {
  const [rate, cap] = kind === "employment" ? rules.ssc_employment : rules.ssc_self;
  return rate * (cap !== null ? Math.min(income, cap) : income);
}

/** Income tax and own social security on `income` (EUR) for `kind` (employment / self_employment). */
/** State and city income tax on top of national tax; national regimes do not change it. */
function regionalTax(rules, income) {
  const r = rules.regional;
  if (!r) return 0;
  return applyBrackets(Math.max(0, income - r.allowance), r.brackets) + applyBrackets(Math.max(0, income - r.local_allowance), r.local_brackets);
}

function earnedTax(rules, income, kind, regime = null) {
  let s = ssc(rules, income, kind);
  if (regime && !regime.ssc) s = 0;
  // Own contributions (where the law allows) and an employee's standard work-expense deduction come off taxable income.
  const d = s * rules.ssc_deductible + employmentDeduction(rules, income, kind);
  const treatment = regime ? regime.treatment : "standard";
  let tax;
  if (treatment === "exempt") tax = 0;
  else if (treatment === "flat_rate") {
    const capped = regime.max_income !== null ? Math.min(income, regime.max_income) : income;
    tax = capped * regime.flat_rate + (standardTax(rules, income, kind, d) - standardTax(rules, capped, kind, d));
  } else if (treatment === "partial_exemption") {
    const top = regime.max_income !== null ? Math.min(income, regime.max_income) : income;
    const above = Math.max(0, top - (regime.exempt_above ?? 0));
    tax = standardTax(rules, income - above * regime.exempt_share, kind, d);
  } else tax = standardTax(rules, income, kind, d);
  tax += regionalTax(rules, income);
  const total = tax + s;
  return { tax: round2(tax), ssc: round2(s), total: round2(total), rate: income ? total / income : 0 };
}

function eligible(regime, kind, citizenship, income) {
  if (!regime.applies_to.includes(kind) || !regime.eligible.includes(citizenship)) return false;
  if (kind === "self_employment" && regime.requires_local_employment) return false;
  if (kind === "employment" && regime.requires_foreign_income) return false;
  if (regime.min_income !== null && income < regime.min_income) return false;
  if (regime.requires_foreign_income && regime.covers_local_work !== true) return false;
  return true;
}

function rateScore(rate, cfg) {
  return round2(Math.max(0, Math.min(100, 100 * (1 - rate / cfg.income_tax_transform.zero_score_rate))));
}

/** Standard rules plus each eligible regime, blended over `horizon` years. */
export function personaRows(rules, kind, horizon, citizenship, income, cfg) {
  const std = earnedTax(rules, income, kind);
  const rows = [{ id: "standard", name: "Standard resident taxation", type: "standard", duration: null,
    cost: Math.round(std.total), scores: { income_tax: rateScore(std.rate, cfg) }, detail: std }];
  for (const r of rules.regimes) {
    if (r.treatment === "standard" || !eligible(r, kind, citizenship, income)) continue;
    const res = earnedTax(rules, income, kind, r);
    const f = r.duration === null ? 1 : Math.min(1, r.duration / horizon);
    rows.push({ id: r.id, name: r.name, type: "special", duration: r.duration,
      cost: Math.round(f * res.total + (1 - f) * std.total),
      scores: { income_tax: rateScore(f * res.rate + (1 - f) * std.rate, cfg) },
      detail: { ...res, blend_factor: Math.round(f * 1000) / 1000 }, verification: r.verification });
  }
  return rows;
}
