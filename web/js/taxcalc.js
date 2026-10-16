// Port of domicile/taxcalc.py (annual_taxes, transfer_taxes). Rules arrive compiled to EUR in
// each profile file. Keep the two in step: tests/test_parity.py checks them against each other.

export function applyBrackets(amount, brackets, mode = "marginal") {
  if (amount <= 0 || !brackets || brackets.length === 0) return 0;
  if (mode === "whole_amount") {
    let rate = 0;
    for (const [start, r] of brackets) if (amount > start) rate = r;
    return amount * rate;
  }
  let tax = 0;
  brackets.forEach(([start, rate], i) => {
    const end = i + 1 < brackets.length ? brackets[i + 1][0] : Infinity;
    if (amount > start) tax += (Math.min(amount, end) - start) * rate;
  });
  return tax;
}

function covers(rules, what) {
  const ls = rules.lump_sum;
  return Boolean(ls) && (ls.covers.includes(what) || ls.covers.includes("foreign_income_all"));
}

export function wealthBase(base, p) {
  const finForeign = p.portfolio * p.foreign_share;
  const map = {
    net_wealth_worldwide: p.net_wealth,
    net_wealth_local: p.real_estate_local + p.portfolio * (1 - p.foreign_share),
    financial_assets_all: p.portfolio,
    financial_assets_foreign: finForeign,
    securities_accounts: p.portfolio,
    real_estate_local: p.real_estate_local,
    real_estate_foreign: p.real_estate_foreign,
    real_estate_all: p.real_estate_local + p.real_estate_foreign,
  };
  if (!(base in map)) throw new Error(`unknown wealth base ${base}`);
  return map[base];
}

// The lump sum is allocated in proportion to the standard-regime tax it replaces (std), as in
// domicile/taxcalc.py; without std it falls back to foreign income.
export function annualTaxes(rules, p, std = null) {
  const out = {};
  const gainsF = p.realized_gains * p.foreign_share;
  const gainsD = p.realized_gains * (1 - p.foreign_share);
  const divF = p.dividends * p.foreign_share;
  const divD = p.dividends * (1 - p.foreign_share);
  const lumpCg = covers(rules, "foreign_capital_gains");
  const lumpDiv = covers(rules, "foreign_dividends");

  const c = rules.cgt || {};
  if ((c.listed_foreign == null && !lumpCg) || c.listed_domestic == null) out.capital_gains = null;
  else out.capital_gains = (lumpCg ? 0 : gainsF * c.listed_foreign) + gainsD * c.listed_domestic;

  const d = rules.div || {};
  if (d.domestic == null || (d.foreign_gross == null && !lumpDiv)) out.dividends = null;
  else {
    let foreign;
    if (lumpDiv || d.ftc === "exemption") foreign = 0;
    else if (d.ftc === "credit") foreign = divF * Math.max(0, d.foreign_gross - (d.credit_cap == null ? p.source_wht : Math.min(p.source_wht, d.credit_cap)));
    else if (d.ftc === "deduction") foreign = divF * (1 - p.source_wht) * d.foreign_gross;
    else foreign = divF * d.foreign_gross;
    out.dividends = foreign + divD * d.domestic;
  }

  if (rules.wealth == null) out.wealth_tax = null;
  else {
    let total = 0;
    for (const comp of rules.wealth) {
      if (comp.base.includes("foreign") && covers(rules, "wealth_tax_foreign")) continue;
      const s = comp.securities_share ?? 1, hs = comp.home_share ?? 1;
      const valued = s === 1 && hs === 1 ? p : { ...p, portfolio: p.portfolio * s, real_estate_local: p.real_estate_local * hs,
        net_wealth: p.net_wealth - p.portfolio * (1 - s) - p.real_estate_local * (1 - hs) };
      const base = wealthBase(comp.base, valued);
      if (base <= comp.entry) continue;
      let tax = applyBrackets(base - comp.exempt, comp.brackets, comp.mode);
      if (comp.credits_wht) tax = Math.max(0, tax - divF * p.source_wht); // a tax on deemed income in place of dividend tax
      total += tax;
    }
    const cap = rules.wealth_cap;
    if (cap && total > 0 && ![d.domestic, d.foreign_gross, c.listed_foreign, c.listed_domestic].some((v) => v == null)) {
      // Income tax before credits on the income that counts, against the cap on income plus wealth tax.
      let income, incomeTax;
      if (rules.structure) { // the family's own income is what the structure pays out to it
        income = p.annual_payout ?? 400000; // as in the structure costs below
        incomeTax = income * (rules.structure.payout_rate ?? 0);
      } else {
        income = p.dividends + (cap.gains ? p.realized_gains : 0);
        incomeTax = divF * d.foreign_gross + divD * d.domestic;
        if (cap.gains) incomeTax += gainsF * c.listed_foreign + gainsD * c.listed_domestic;
      }
      if (cap.tax_rate != null) incomeTax = income * cap.tax_rate; // only part of the income tax counts (e.g. not the federal tax)
      if (cap.min_yield) income = Math.max(income, p.net_wealth * cap.min_yield);
      const floor = Math.max(total * (1 - cap.max_reduction), p.net_wealth * (cap.min_wealth_rate || 0));
      const allowed = Math.max(cap.share * income - incomeTax, Math.min(total, floor));
      total = Math.min(total, allowed);
    }
    out.wealth_tax = total;
  }

  addStructureCosts(rules, p, out);
  const lump = rules.lump_sum ? rules.lump_sum.annual : 0;
  out.lump_sum = lump;
  if (!lump) return out;
  const keys = ["capital_gains", "dividends", "wealth_tax"];
  if (std) {
    const base = annualTaxes(std, p);
    const cut = {};
    let total = 0;
    for (const k of keys) {
      if (base[k] !== null && out[k] !== null) {
        cut[k] = Math.max(0, base[k] - out[k]);
        total += cut[k];
      }
    }
    const charge = rules.lump_sum.cap ? Math.min(lump, total) : lump; // a cap never costs more than the ordinary tax
    out.lump_sum = charge;
    if (total > 0) {
      for (const [k, v] of Object.entries(cut)) out[k] += (charge * v) / total;
      return out;
    }
    if (rules.lump_sum.cap) return out;
  }
  const replaced = (lumpCg ? gainsF : 0) + (lumpDiv ? divF : 0);
  if (replaced > 0) {
    for (const [key, amount, flag] of [
      ["capital_gains", gainsF, lumpCg],
      ["dividends", divF, lumpDiv],
    ]) {
      if (flag && out[key] !== null) out[key] += (lump * amount) / replaced;
    }
  }
  return out;
}

// Holding structures: payout tax on what the family withdraws plus running costs, allocated to
// capital gains and dividends by income (as in domicile/taxcalc.py).
function addStructureCosts(rules, p, out) {
  out.payout_tax = 0;
  out.running_cost = 0;
  const st = rules.structure;
  if (!st) return;
  if (st.payout_rate === null || st.payout_rate === undefined) {
    out.capital_gains = null;
    out.dividends = null;
    return;
  }
  const income = p.realized_gains + p.dividends;
  const payoutAmount = p.annual_payout ?? 400000;
  const payout = income > 0 ? Math.min(payoutAmount, income) : payoutAmount;
  out.payout_tax = payout * st.payout_rate;
  out.running_cost = st.running_cost;
  // Deductible costs lower the structure's own tax, never below nothing.
  const relief = Math.min(st.running_cost * (st.cost_relief ?? 0), (out.capital_gains ?? 0) + (out.dividends ?? 0));
  const extra = out.payout_tax + out.running_cost - relief;
  if (income <= 0) return;
  for (const [key, amount] of [["capital_gains", p.realized_gains], ["dividends", p.dividends]]) {
    if (out[key] !== null) out[key] += (extra * amount) / income;
  }
}

// Share of net wealth situated in the country of residence (local home + domestic securities).
export function localShare(p) {
  if (p.net_wealth <= 0) return 1;
  const local = p.real_estate_local + p.portfolio * (1 - p.foreign_share);
  return Math.max(0, Math.min(1, local / p.net_wealth));
}

export function transferTaxes(rules, p) {
  const ih = rules.inh;
  if (!ih) return null;
  let tax = 0;
  const taxable = ih.scope === "local_assets_only" ? p.estate * localShare(p) : p.estate;
  if (ih.basis === "beneficiary") {
    const share = taxable / p.children;
    tax = p.children * applyBrackets(share - ih.exemption, ih.brackets, ih.mode);
  } else if (ih.basis === "estate") {
    tax = applyBrackets(taxable - ih.exemption, ih.brackets, ih.mode);
  }
  const deemed = p.estate * (p.unrealized_gain_share ?? 0.4) * (ih.deemed_disposal || 0);
  return tax + deemed + taxable * ih.other_cost; // transfer costs reach what the tax reaches
}

// US federal layer for US citizens (approximation documented in the methodology panel):
// foreign taxes are creditable, lump sums are not.
export function usFederalExtra(rules, p, local, overlay, jurisdictionId) {
  const exempt = new Set(((overlay.exempt_metrics || {})[jurisdictionId] || {}).metrics || []);
  const lumpCg = covers(rules, "foreign_capital_gains");
  const lumpDiv = covers(rules, "foreign_dividends");
  const replaced = (lumpCg ? p.realized_gains * p.foreign_share : 0) + (lumpDiv ? p.dividends * p.foreign_share : 0);
  const lumpShare = (amount) => (local.lump_sum && replaced > 0 ? (local.lump_sum * amount) / replaced : 0);
  const out = { capital_gains: 0, dividends: 0, estate: 0 };
  if (!exempt.has("capital_gains") && local.capital_gains !== null) {
    const creditable = local.capital_gains - (lumpCg ? lumpShare(p.realized_gains * p.foreign_share) : 0);
    out.capital_gains = Math.max(0, overlay.capital_gains_rate * p.realized_gains - creditable);
  }
  if (!exempt.has("dividends") && local.dividends !== null) {
    const creditable =
      local.dividends - (lumpDiv ? lumpShare(p.dividends * p.foreign_share) : 0) + p.source_wht * p.dividends * p.foreign_share;
    out.dividends = Math.max(0, overlay.dividends_rate * p.dividends - creditable);
  }
  return out;
}

export function usEstateExtra(localTransfer, p, overlay, usdPerEur, rules) {
  if (localTransfer === null) return null;
  const exemptionEur = overlay.estate_exemption_usd / usdPerEur;
  const usTax = overlay.estate_rate * Math.max(0, p.estate - exemptionEur);
  const ih = rules.inh;
  const other = ih ? (ih.scope === "local_assets_only" ? p.estate * localShare(p) : p.estate) * ih.other_cost : 0;
  return Math.max(0, usTax - (localTransfer - other));
}

// Extra US withholding (EUR/yr) suffered when the country of residence has no US treaty.
// Levied by the US as source country, so it is shown separately from residence taxes.
export function unrelievedUsWht(p, hasUsTreaty, cfgWht) {
  if (hasUsTreaty || p.citizenship === "US") return 0;
  return p.dividends * p.foreign_share * p.us_share * (cfgWht.statutory_rate - cfgWht.treaty_rate);
}
