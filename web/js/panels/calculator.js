import { h, clear, fmtEur, fmtPct, fmtInt, parseWhole, displayCurrency, toDisplay, fromDisplay } from "../dom.js";
import { state, entries, jur, isIncomePersona } from "../state.js";
import { renderIncomeCalculator } from "./persona.js";
import { loadProfile } from "../data.js";
import { annualTaxes, transferTaxes, usFederalExtra, usEstateExtra, unrelievedUsWht } from "../taxcalc.js";

// Inputs persist for the session only (they describe the family's finances; never stored).
// Defaults come from the scoring config's reference family on first render.
let inputs = null;
const initInputs = (ref) => ({
  realized_gains: ref.realized_gains,
  dividends: ref.dividends,
  portfolio: ref.portfolio,
  net_wealth: ref.net_wealth,
  estate: ref.estate,
  annual_payout: ref.annual_payout,
  children: ref.children,
  real_estate_local: ref.real_estate_local,
  real_estate_foreign: ref.real_estate_foreign,
  foreign_share: ref.foreign_share,
  us_share: state.cfg.us_dividend_withholding.us_share_of_foreign_dividends,
  unrealized_gain_share: ref.unrealized_gain_share,
  source_wht: ref.source_wht,
  current: "",
  targets: [],
});

const NUM_FIELDS = [
  ["realized_gains", "Annual realised capital gains", 0, 1e10],
  ["dividends", "Annual dividends", 0, 1e10],
  ["portfolio", "Investment portfolio value", 0, 1e11],
  ["net_wealth", "Annual net wealth", 0, 1e11],
  ["real_estate_local", "Real estate in the country of residence", 0, 1e11],
  ["real_estate_foreign", "Real estate abroad", 0, 1e11],
  ["estate", "Estate to pass to the children", 0, 1e11],
  ["annual_payout", "Annual payout from a holding structure", 0, 1e9],
  ["children", "Number of children", 1, 20],
];

function clampNum(v, lo, hi) {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : lo;
}

function profileFor(citizenship) {
  return {
    portfolio: inputs.portfolio, foreign_share: inputs.foreign_share, realized_gains: inputs.realized_gains,
    dividends: inputs.dividends, real_estate_local: inputs.real_estate_local, real_estate_foreign: inputs.real_estate_foreign,
    net_wealth: inputs.net_wealth, estate: inputs.estate, children: Math.round(inputs.children), source_wht: inputs.source_wht,
    citizenship, us_share: inputs.us_share, unrealized_gain_share: inputs.unrealized_gain_share,
    annual_payout: inputs.annual_payout,
  };
}

function jurisdictionOptions(selected, placeholder) {
  const opts = entries().filter(([, e]) => e.researched && !e.inherited)
    .map(([id, e]) => [id, e.parent ? `${e.name} (${jur(e.parent).name})` : e.name])
    .sort((a, b) => a[1].localeCompare(b[1]));
  const s = h("select", null, h("option", { value: "" }, placeholder), opts.map(([v, l]) => h("option", { value: v }, l)));
  s.value = selected;
  return s;
}

async function compute(out) {
  clear(out);
  const ids = [inputs.current, ...inputs.targets].filter(Boolean);
  if (!ids.length) {
    out.append(h("p", { class: "muted" }, "Choose a current residence and up to four candidate jurisdictions."));
    return;
  }
  out.append(h("p", { class: "muted" }, "Calculating…"));
  let profiles;
  try {
    profiles = await Promise.all(ids.map((id) => loadProfile(id)));
  } catch (e) {
    clear(out).append(h("p", { class: "error" }, `Could not load rules: ${e.message}`));
    return;
  }
  const cz = state.citizenship;
  const p = profileFor(cz);
  const overlay = state.cfg.us_citizen_overlay;
  const wht = state.cfg.us_dividend_withholding;
  const usdPerEur = state.data.meta.fx_usd_per_eur;
  const rows = [];
  profiles.forEach((pr, idx) => {
    const id = ids[idx];
    const e = jur(id);
    // Same eligibility as the scores: structures and work-based regimes follow the top-bar options.
    const regimes = (pr.data.regimes || []).filter((r) => r.eligible_citizenships.includes(cz)
      && (state.includeStructures || r.type !== "structure") && (state.includeActivity || !r.requires_qualifying_activity));
    for (const reg of regimes) {
      const rules = pr.rules[reg.id];
      const a = annualTaxes(rules, p, reg.type !== "standard" ? pr.rules[pr.data.regimes[0].id] : null);
      const inh = transferTaxes(rules, p);
      const usExtra = cz === "US" ? usFederalExtra(rules, p, a, overlay, id) : null;
      const usEstate = cz === "US" && usdPerEur ? usEstateExtra(inh, p, overlay, usdPerEur, rules) : null;
      const hasTreaty = e.flags ? e.flags.us_treaty : true;
      const whtExtra = unrelievedUsWht(p, hasTreaty, wht);
      const vals = [a.capital_gains, a.dividends, a.wealth_tax];
      // The lump sum is already allocated inside capital gains and dividends, so it is not added again.
      const annual = vals.some((v) => v === null) ? null : vals.reduce((x, y) => x + y, 0);
      rows.push({ id, e, reg, a, inh, usExtra, usEstate, whtExtra, annual, current: idx === 0 && inputs.current === id, std: pr.data.regimes[0], data: pr.data });
    }
  });

  clear(out);
  const t = h("table", { class: "grid calc" },
    h("thead", null, h("tr", null, ["Jurisdiction / regime", "Capital gains", "Dividends", "Wealth tax", "of which lump sum / payout tax", "Annual total (residence)", "Extra US withholding (no treaty)",
      ...(cz === "US" ? ["US federal top-up (approx.)"] : []), "Inheritance to children (one-off)"].map((x) => h("th", null, x)))),
    h("tbody", null, rows.map((r) => h("tr", { class: r.current ? "current" : "" },
      h("td", null, h("strong", null, r.e.name), r.current ? " (current)" : "", h("div", { class: "small muted" }, r.reg.type === "structure" ? "via " : "", r.reg.name, r.reg.duration_years ? ` · ${r.reg.duration_years} yrs` : "")),
      h("td", { class: "num" }, fmtEur(r.a.capital_gains)),
      h("td", { class: "num" }, fmtEur(r.a.dividends)),
      h("td", { class: "num" }, fmtEur(r.a.wealth_tax)),
      h("td", { class: "num" }, r.a.lump_sum ? fmtEur(r.a.lump_sum) : r.a.payout_tax ? `${fmtEur(r.a.payout_tax)} payout tax${r.a.running_cost ? ` + ${fmtEur(r.a.running_cost)} running cost` : ""}` : "–"),
      h("td", { class: "num" }, h("strong", null, fmtEur(r.annual)), r.annual !== null && p.portfolio ? h("div", { class: "small muted" }, `${fmtPct(r.annual / p.portfolio, 2)} of portfolio`) : null),
      h("td", { class: "num" }, r.whtExtra ? fmtEur(r.whtExtra) : "–"),
      ...(cz === "US" ? [h("td", { class: "num" }, r.usExtra ? fmtEur(r.usExtra.capital_gains + r.usExtra.dividends) : "–", r.usEstate ? h("div", { class: "small" }, `+ estate ${fmtEur(r.usEstate)}`) : null)] : []),
      h("td", { class: "num" }, fmtEur(r.inh), r.inh !== null && p.estate ? h("div", { class: "small muted" }, fmtPct(r.inh / p.estate)) : null)))));
  out.append(h("div", { class: "table-wrap" }, t));

  const notes = rows.filter((r) => r.reg.type === "standard").map((r) => {
    const m = ["capital_gains", "dividends", "wealth_tax", "inheritance"].map((k) => r.std[k]);
    const low = m.filter((x) => x.confidence === "low" || x.verification === "unverified").length;
    return h("li", null, `${r.e.name}: tax year ${m[0].tax_year}, researched ${r.data.researched_on}` + (low ? `; ${low} of 4 tax metrics low-confidence or unverified` : ""));
  });
  out.append(h("h3", null, "Data behind these numbers"), h("ul", { class: "small" }, notes));
}

export function renderCalculator(panel) {
  if (isIncomePersona()) return renderIncomeCalculator(panel);
  inputs ??= initInputs(state.cfg.reference_family);
  panel.append(h("h2", null, "Family tax scenario calculator"),
    h("p", { class: "small muted" }, "Illustrative, simplified top-end rates; not tax advice. Assumptions under Method."));
  const form = h("form", { class: "calc-form", onsubmit: (e) => e.preventDefault() });
  for (const [k, label, lo, hi] of NUM_FIELDS) {
    // Money fields are shown and typed in the display currency; inputs stay in EUR.
    const money = k !== "children";
    // Money is a text field so it can show thousands separators (1.200.000); any separators are accepted.
    const shown = (v) => (money ? fmtInt(toDisplay(v)) : v);
    const inp = money
      ? h("input", { type: "text", value: shown(inputs[k]), inputmode: "numeric", autocomplete: "off", id: `c-${k}` })
      : h("input", { type: "number", min: lo, max: hi, step: 1, value: shown(inputs[k]), inputmode: "numeric", id: `c-${k}` });
    inp.addEventListener("change", () => {
      inputs[k] = money ? clampNum(fromDisplay(parseWhole(inp.value)), lo, hi) : clampNum(inp.value, lo, hi);
      inp.value = shown(inputs[k]);
      run();
    });
    form.append(h("label", { class: "ctl", for: `c-${k}` }, h("span", null, money ? `${label} (${displayCurrency()})` : label), inp));
  }
  const fs = h("input", { type: "range", min: 0, max: 100, step: 5, value: inputs.foreign_share * 100, id: "c-fs" });
  const fsOut = h("output", { for: "c-fs" }, `${Math.round(inputs.foreign_share * 100)}%`);
  fs.addEventListener("input", () => { fsOut.textContent = `${fs.value}%`; });
  fs.addEventListener("change", () => { inputs.foreign_share = Number(fs.value) / 100; run(); });
  form.append(h("label", { class: "ctl", for: "c-fs" }, h("span", null, "Share invested abroad"), fs, fsOut));
  const us = h("input", { type: "range", min: 0, max: 100, step: 5, value: inputs.us_share * 100, id: "c-us" });
  const usOut = h("output", { for: "c-us" }, `${Math.round(inputs.us_share * 100)}%`);
  us.addEventListener("input", () => { usOut.textContent = `${us.value}%`; });
  us.addEventListener("change", () => { inputs.us_share = Number(us.value) / 100; run(); });
  form.append(h("label", { class: "ctl", for: "c-us" }, h("span", null, "US share of foreign dividends"), us, usOut));
  const ug = h("input", { type: "range", min: 0, max: 100, step: 5, value: inputs.unrealized_gain_share * 100, id: "c-ug" });
  const ugOut = h("output", { for: "c-ug" }, `${Math.round(inputs.unrealized_gain_share * 100)}%`);
  ug.addEventListener("input", () => { ugOut.textContent = `${ug.value}%`; });
  ug.addEventListener("change", () => { inputs.unrealized_gain_share = Number(ug.value) / 100; run(); });
  form.append(h("label", { class: "ctl", for: "c-ug" }, h("span", null, "Unrealised gains in the estate"), ug, ugOut));

  if (!inputs.targets.length && state.selected && jur(state.selected)?.researched && !jur(state.selected).inherited) inputs.targets = [state.selected];
  const cur = jurisdictionOptions(inputs.current, "Current tax residence…");
  cur.addEventListener("change", () => { inputs.current = cur.value; run(); });
  form.append(h("label", { class: "ctl" }, h("span", null, "Current tax residence"), cur));
  for (let i = 0; i < 4; i++) {
    const s = jurisdictionOptions(inputs.targets[i] || "", `Candidate ${i + 1}…`);
    s.addEventListener("change", () => { inputs.targets[i] = s.value; run(); });
    form.append(h("label", { class: "ctl" }, h("span", null, `Intended residence ${i + 1}`), s));
  }
  const out = h("div", { class: "calc-out", "aria-live": "polite" });
  panel.append(form, out);
  function run() {
    compute(out);
  }
  run();
}

/** The HNWI calculator's assumptions, shown on the Method page. */
export function calculatorAssumptions() {
  return h("ul", { class: "small" },
    h("li", null, "Gains, dividends and wealth tax recur every year; inheritance tax is a one-off when assets pass to the children and is shown separately."),
    h("li", null, "Researched top-end rates for a private investor holding assets directly. Holding-structure rows add the structure's own taxes, tax on the payout you enter and running costs; tax deferred inside the structure is not shown."),
    h("li", null, "Foreign dividends suffer 15% withholding, credited where the country allows. Without a US tax treaty, US dividends suffer 30%; the extra is shown separately."),
    h("li", null, "The estate passes in equal shares to the children, without business relief or lifetime gifts."),
    h("li", null, "US citizens: a US top-up approximates US federal tax after foreign tax credits (lump sums are not creditable)."));
}
