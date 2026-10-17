// Panels for the earned-income personas (Expat, Digital nomad): the profile body, the
// income calculator and the methodology section. The HNWI persona uses profile.js and
// calculator.js; main.js and those panels hand over here when an income persona is active.

import { h, append, clear, extLink, fmtPct, fmtEur, fmtInt, parseWhole, fmtMoney, moneyText, displayCurrency, toDisplay, fromDisplay } from "../dom.js";
import { state, entries, jur, personaCfg, metricsFor, defaultWeightsFor } from "../state.js";
import { loadProfile, loadDossier } from "../data.js";
import { normalizeWeights } from "../scoring.js";
import { personaRows } from "../earned.js";
import { renderMarkdown } from "../markdown.js";
import { scoreChip } from "./profile.js";
import { immigrationSection, residenceFact } from "./immigration.js";
import { GROUP, field, sourceList } from "../labels.js";

const COLA_LABEL = { us_dssr: "US State Department", un_icsc: "UN post adjustment", eu_cc: "EU correction coefficient", de_kaufkraft: "German Kaufkraftausgleich", de_destatis: "German Destatis parity" };
const KIND_LABEL = { employment: "employee", self_employment: "self-employed contractor" };
const TREATMENT = {
  exempt: "Qualifying income exempt from local income tax",
  flat_rate: "Flat rate on qualifying income",
  partial_exemption: "Part of the income exempt, the rest taxed normally",
  standard: "No change to taxation (residence permit only)",
};



const openQuestions = (qs) => (qs && qs.length ? h("div", { class: "open-q" }, h("strong", null, "Open questions: "), h("ul", null, qs.map((q) => h("li", null, q)))) : null);

export function usCitizenNote() {
  return state.citizenship === "US"
    ? h("p", { class: "notice small" }, h("strong", null, "US citizens: "),
      "the United States taxes its citizens wherever they live. The foreign earned income exclusion, foreign tax credits and US self-employment tax are not modelled here, so for a US citizen the figures show local tax only.")
    : null;
}

function metricsTable(r) {
  const metrics = metricsFor();
  const w = normalizeWeights(state.weights);
  return h("div", { class: "table-wrap" }, h("table", { class: "grid" },
    h("thead", null, h("tr", null, h("th", null, "Metric"), h("th", null, "Score"), h("th", { class: "num" }, "Weight"))),
    h("tbody", null, Object.entries(metrics).map(([k, m]) => h("tr", null, h("th", { scope: "row" }, m.label),
      h("td", null, scoreChip(r.metrics[k] ?? null, state.cfg)), h("td", { class: "num small" }, fmtPct(w[k], 0)))))));
}

function costSection(block, inc) {
  const hc = block.household_cost_detail;
  const c = inc && inc.costs;
  const items = [];
  if (c) {
    const it = (label, x) => x && items.push(h("li", { title: x.description }, `${label}: ${fmtMoney(x.value.amount, x.value.currency)} a month `, extLink(x.source.url, "source")));
    it("1-bedroom rent", c.rent_1bed_monthly);
    it("2-bedroom rent", c.rent_2bed_monthly);
    it("Coworking desk", c.coworking_monthly);
  }
  const parts = hc ? Object.entries(hc.parts).map(([k, v]) => `${k.replace("_", " ")} ${fmtEur(v)}`).join(", ") : "";
  return h("details", { class: "fold" }, h("summary", null, h("h3", null, "Annual Household Cost", c ? ` — ${c.city}` : "", hc ? `: ${fmtEur(hc.total_eur)}` : "")),
    hc ? h("p", null, parts, ".") : h("p", { class: "muted" }, "Not scored: no rent sourced yet."),
    items.length ? h("ul", { class: "small" }, items) : null);
}

async function showDossier(container, iso) {
  clear(container).append(h("p", { class: "muted" }, "Loading dossier…"));
  try {
    const md = await loadDossier(`income/${iso}`);
    clear(container).append(md ? renderMarkdown(md) : h("p", { class: "muted" }, "No dossier has been written for this country yet."));
  } catch (err) {
    clear(container).append(h("p", { class: "error" }, `Dossier could not be loaded: ${err.message}`));
  }
}

/**
 * "Becoming tax resident": the country's own residence test (from the tax research) and the traps that
 * catch people who move for work or work remotely. The traps are general rules of the OECD Model Tax
 * Convention (art. 4 residence, art. 5 permanent establishment), not country findings.
 */
function taxResidenceSection(p) {
  const test = p.data?.residency?.tax_residency_test;
  const nomad = state.persona === "nomad";
  return foldSection("Becoming tax resident",
    test ? h("p", null, test) : h("p", { class: "muted" }, "This country's residence test has not been researched yet."),
    test ? sourceList(p.data.residency.sources) : null,
    h("div", { class: "notice small trap-note" },
      h("strong", null, "Common traps. "),
      h("ul", null,
        h("li", null, "Day counts are not the only test. A home available to you, your family or your main interests can make you resident with fewer days, or keep you resident where you came from."),
        h("li", null, "If two countries both treat you as resident, a tax treaty between them decides who taxes you (permanent home first, then centre of vital interests, usual abode, nationality). Without a treaty you can be taxed twice."),
        h("li", null, "Leaving can cost too: some countries tax unrealised gains when you go, or keep taxing former residents for some years."),
        nomad ? h("li", null, "Working for clients from a country, or from a fixed office there, can create a taxable business presence or make the income local even if you are not resident.") : null,
        nomad ? h("li", null, "A digital nomad visa gives the right to stay, not a tax status: whether you become tax resident, and how you are taxed, follows the rules above.") : null),
      h("p", null, "Check both countries' rules before you move; this is research, not tax advice.")));
}

/** Best placing in the published nomad rankings, with every placing in the tooltip. */
function nomadPlacings(ns) {
  const placed = Object.values(ns.named_in);
  const text = (n) => `${n.city}${n.rank ? `, ${ordinal(n.rank)}${n.length ? ` of ${n.length}` : ""}` : ""} in ${n.title}`;
  const best = placed.reduce((a, b) => ((b.rank ?? 99) / (b.length ?? 99) < (a.rank ?? 99) / (a.length ?? 99) ? b : a));
  return h("span", { class: "muted", title: placed.map(text).join("\n") }, ` · best: ${text(best)}${placed.length > 1 ? " (hover for all)" : ""}`);
}

const ordinal = (n) => `${n}${n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th"}`;

/** One line of the key-facts block at the top of a profile. */
export function fact(label, ...value) {
  return h("div", { class: "fact" }, h("dt", null, label), h("dd", null, ...value));
}

/** Profile body for an income persona, once the profile JSON `p` has loaded. ``simple``: key facts only. */
export function renderPersonaBody(body, p, id, r, { simple = false } = {}) {
  const block = p.persona_detail && p.persona_detail[state.persona];
  const inc = p.income;
  const e = jur(id);
  const reg = p.income_region;
  if (e.parent && inc) body.append(h("p", { class: "small muted" }, reg ? `Includes ${reg.name} state and ${reg.city} taxes and costs.` : `National figures (${inc.costs?.city ?? "main city"}).`));
  if (!inc || !block) {
    body.append(h("p", { class: "notice" }, "Not researched for this persona yet, so it is unscored (grey)."), foldSection("All metrics", metricsTable(r)));
    return;
  }
  const it = inc.income_tax;
  const rows = block.tax[state.citizenship] || [];
  const best = r.regime;
  const bestRow = rows.find((x) => best && x.id === best.id) || rows[0];
  const income = block.income_eur;
  const sm = block.salary_multiplier;
  const lo = block.leftover ? block.leftover[state.citizenship] : null;
  const ns = block.nomad_scene;
  append(body, [usCitizenNote()]);

  // Key facts first; how each is worked out lives in tooltips and on the Method page.
  const salaryTip = sm && (sm.estimated ? "Estimated from the World Bank price level (no posting-allowance table lists this country)"
    : Object.entries(sm.sources).map(([k, v]) => `${COLA_LABEL[k] || k} ${v.toFixed(2)}`).join(" · "));
  append(body, [h("dl", { class: "facts" },
    fact(sm ? "Salary" : "Income", `${fmtEur(income)} a year`,
      sm && Math.abs(sm.multiplier - 1) >= 0.005 ? h("span", { class: "muted", title: salaryTip }, ` · ×${sm.multiplier.toFixed(2)} for local costs`) : null),
    bestRow ? fact("Tax + social security", fmtPct(bestRow.detail.rate),
      h("span", { class: "muted" }, ` · ${fmtEur(bestRow.cost)} a year${bestRow.type !== "standard" ? ` · ${bestRow.name}` : ""}`)) : null,
    fact("Living costs", block.household_cost ? `${fmtEur(block.household_cost)} a year` : "not sourced"),
    lo && lo.eur !== null && lo.eur !== undefined ? fact("Left over", `${fmtEur(lo.eur)} a year`) : null,
    ns ? fact("Nomad scene", ns.lists_named ? `named in ${ns.lists_named} of ${ns.lists_total} published nomad rankings` : `not named in any of ${ns.lists_total} published nomad rankings`,
      ns.lists_named ? nomadPlacings(ns) : null) : null,
    residenceFact(e) ? fact("Residence for you", residenceFact(e)) : null)]);
  if (simple) return;
  body.append(immigrationSection(p.immigration));

  body.append(taxResidenceSection(p));
  body.append(foldSection("Tax regimes compared",
    h("div", { class: "table-wrap" }, h("table", { class: "grid" },
      h("thead", null, h("tr", null, h("th", null, "Regime"), h("th", { class: "num" }, "Rate"), h("th", { class: "num", title: "Average a year over the stay" }, "A year"), h("th", null, "Score"))),
      h("tbody", null, rows.map((row) => h("tr", { class: best && best.id === row.id ? "best" : "" },
        h("td", null, row.name, best && best.id === row.id ? h("div", null, h("span", { class: "badge" }, "used for score")) : null,
          row.duration ? h("div", { class: "small muted" }, `${row.duration} years`) : null),
        h("td", { class: "num", title: `${fmtEur(row.detail.tax)} tax + ${fmtEur(row.detail.ssc)} social security` }, fmtPct(row.detail.rate)),
        h("td", { class: "num" }, fmtEur(row.cost)),
        h("td", null, scoreChip(row.scores.income_tax, state.cfg)))))))));
  if (inc.regimes.length) {
    const regSec = h("details", { class: "fold" }, h("summary", null, h("h3", null, "Nomad visas and expat regimes")));
    body.append(regSec);
    for (const reg of inc.regimes) {
      const ok = reg.eligible_citizenships.includes(state.citizenship);
      regSec.append(h("details", { class: "regime" },
        h("summary", null, reg.kind === "digital_nomad_visa" ? "Nomad visa: " : reg.kind === "expat_regime" ? "Expat regime: " : "", reg.name,
          reg.duration_years ? ` (${reg.duration_years} years)` : "", ok ? "" : ` — not open to ${GROUP[state.citizenship]}`),
        h("p", null, reg.description),
        h("dl", { class: "small" },
          field("Tax treatment", TREATMENT[reg.treatment] + (reg.flat_rate !== null ? `: ${fmtPct(reg.flat_rate)}` : "") + (reg.exempt_share !== null ? `: ${fmtPct(reg.exempt_share, 0)} exempt` : "")),
          field("Applies to", reg.applies_to.map((k) => KIND_LABEL[k]).join(", ")),
          field("Needs", [reg.requires_foreign_income ? "income from foreign employers or clients" : null, reg.requires_local_employment ? "a local employer or assignment" : null].filter(Boolean).join("; ") || null),
          field("Minimum income", reg.min_income ? `${fmtMoney(reg.min_income.amount, reg.min_income.currency)} a year` : null),
          field("Income cap", reg.max_income ? fmtMoney(reg.max_income.amount, reg.max_income.currency) : null),
          field("Exempt share applies above", reg.exemption_threshold ? fmtMoney(reg.exemption_threshold.amount, reg.exemption_threshold.currency) : null),
          reg.requires_foreign_income ? field("Covers work done while living there", reg.covers_local_work === true ? "yes"
            : reg.covers_local_work === false ? "no: pay for work done in the country is locally sourced, so this relief is not counted"
              : "not established: not counted in the scores") : null,
          field("Social security", reg.social_security_applies ? "still due" : "not due"),
          field("Duration", reg.duration_note || null),
          field("Open to", reg.eligible_citizenships.join(", "))),
        openQuestions(reg.open_questions), sourceList(reg.sources),
        h("div", { class: "meta-line" }, "Confidence ", h("span", { class: `conf conf-${reg.confidence}` }, reg.confidence), ` · ${reg.verification.replace("_", " ")}`)));
    }
  }

  body.append(foldSection("Standard income tax", h("p", null, it.summary),
    h("dl", { class: "small" },
      field("Rates", it.brackets.map((b) => `${fmtPct(b.rate)} from ${fmtMoney(b.from_amount, inc.currency)}`).join(", ")),
      field("Personal allowance", it.personal_allowance ? fmtMoney(it.personal_allowance, inc.currency) : null),
      field("Employee social security", `${fmtPct(it.employee_social_security_rate)}${it.employee_social_security_cap !== null ? ` up to ${fmtMoney(it.employee_social_security_cap, inc.currency)}` : ", uncapped"}`),
      field("Self-employed social security", `${fmtPct(it.self_employed_social_security_rate)}${it.self_employed_social_security_cap !== null ? ` up to ${fmtMoney(it.self_employed_social_security_cap, inc.currency)}` : ", uncapped"}`),
      field("Employees' standard expense deduction", it.employment_deduction ? it.employment_deduction.note : null),
      field("Social security deducted before income tax", it.social_security_deductible === null || it.social_security_deductible === undefined ? "not researched (treated as not deductible)" : fmtPct(it.social_security_deductible, 0)),
      field("Self-employed notes", it.self_employed_notes),
      field("Local taxes", it.local_tax_note),
      p.income_region ? field("State and city tax", p.income_region.income_tax.note) : null),
    openQuestions(it.open_questions), sourceList(it.sources),
    h("div", { class: "meta-line" }, `Tax year ${it.tax_year} · verified ${it.verified_on} · confidence `, h("span", { class: `conf conf-${it.confidence}` }, it.confidence), ` · ${it.verification.replace("_", " ")}`)));

  body.append(foldSection("All metrics", metricsTable(r)));
  body.append(costSection(block, inc));
  // The researched immigration paths replace this older summary where they exist.
  if (!p.immigration) body.append(foldSection("Residence and work rights", h("p", null, inc.residence_routes)));
  if (inc.open_questions.length) body.append(foldSection(`Open questions (${inc.open_questions.length})`, h("ul", null, inc.open_questions.map((q) => h("li", null, q)))));
  body.append(h("p", { class: "small muted" }, `Researched ${inc.researched_on} · ${displayCurrency()} at ECB rates of ${state.data.meta.fx_date}`));
  const dossier = h("div", { class: "dossier" });
  body.append(h("section", null, h("button", { onclick: () => showDossier(dossier, inc.id) }, "Show the full dossier"), dossier));
}

/** A section folded under its heading, closed by default. */
function foldSection(title, ...children) {
  return append(h("details", { class: "fold" }, h("summary", null, h("h3", null, title))), children);
}

// ------------------------------------------------------------------ calculator

// Session-only inputs, per persona (never stored).
const calcInputs = {};

function countryOptions(selected, placeholder) {
  const opts = entries().filter(([, e]) => e.researched && !e.parent).map(([id, e]) => [id, e.name]).sort((a, b) => a[1].localeCompare(b[1]));
  const s = h("select", null, h("option", { value: "" }, placeholder), opts.map(([v, l]) => h("option", { value: v }, l)));
  s.value = selected;
  return s;
}

async function computeIncome(out, inp) {
  clear(out);
  const ids = inp.targets.filter(Boolean);
  if (!ids.length) {
    out.append(h("p", { class: "muted" }, "Choose up to five countries."));
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
  const rows = [];
  profiles.forEach((p, i) => {
    if (!p.income_rules) return;
    const sm = p.persona_detail?.[state.persona]?.salary_multiplier;
    const income = inp.scale && sm ? inp.income * sm.multiplier : inp.income;
    const rs = personaRows(p.income_rules, inp.kind, inp.horizon, state.citizenship, income, state.cfg);
    const best = rs.reduce((a, b) => (b.cost < a.cost ? b : a));
    const hc = p.persona_detail?.[state.persona]?.household_cost ?? null;
    for (const row of rs) rows.push({ id: ids[i], name: p.name, row, best: row === best, hc, income, mult: inp.scale && sm ? sm.multiplier : null });
  });
  clear(out);
  out.append(h("div", { class: "table-wrap" }, h("table", { class: "grid calc" },
    h("thead", null, h("tr", null, ["Country / regime", "Salary", "Income tax", "Social security", "Effective rate (first year)", "Average a year over the stay", "Annual Household Cost", "Left over a year"].map((x) => h("th", null, x)))),
    h("tbody", null, rows.map(({ name, row, best, hc, income, mult }) => {
      const left = hc !== null ? income - row.cost - hc : null;
      return h("tr", { class: best ? "best" : "" },
        h("td", null, h("strong", null, name), h("div", { class: "small muted" }, row.name, row.duration ? ` · ${row.duration} yrs` : "", best ? " · cheapest" : "")),
        h("td", { class: "num" }, fmtEur(income), mult !== null ? h("div", { class: "small muted" }, `× ${mult.toFixed(2)}`) : null),
        h("td", { class: "num" }, fmtEur(row.detail.tax)),
        h("td", { class: "num" }, fmtEur(row.detail.ssc)),
        h("td", { class: "num" }, fmtPct(row.detail.rate)),
        h("td", { class: "num" }, h("strong", null, fmtEur(row.cost))),
        h("td", { class: "num" }, hc !== null ? fmtEur(hc) : "not sourced"),
        h("td", { class: "num" }, left !== null ? h("strong", { class: left < 0 ? "neg" : "" }, fmtEur(left)) : "–"));
    })))));
  const missing = profiles.map((p, i) => (p.income_rules ? null : jur(ids[i])?.name)).filter(Boolean);
  if (missing.length) out.append(h("p", { class: "small muted" }, `Not researched for earned income: ${missing.join(", ")}.`));
}

export function renderIncomeCalculator(panel) {
  const persona = personaCfg();
  const usdPerEur = state.data.meta.fx_usd_per_eur;
  const inp = (calcInputs[state.persona] ??= {
    income: Math.round(persona.income_usd / usdPerEur / 1000) * 1000, kind: persona.income_kind,
    horizon: persona.horizon_years, targets: [], scale: Boolean(persona.salary_multiplier),
  });
  if (!inp.targets.length && state.selected) {
    const e = jur(state.selected);
    const cid = e?.parent || state.selected;
    if (jur(cid)?.researched) inp.targets = [cid];
  }
  panel.append(h("h2", null, `${persona.label}: income tax calculator`),
    h("p", { class: "small muted" }, "Illustrative; not tax advice. Assumptions under Method."));
  append(panel, [usCitizenNote()]);
  const form = h("form", { class: "calc-form", onsubmit: (e) => e.preventDefault() });
  const out = h("div", { class: "calc-out", "aria-live": "polite" });
  const run = () => computeIncome(out, inp);
  const num = (key, label, lo, hi, step, money = false) => {
    // Money is shown and typed in the display currency; inp keeps EUR.
    // Money is a text field so it can show thousands separators; any separators are accepted.
    const shown = (v) => (money ? fmtInt(toDisplay(v)) : v);
    const el = money
      ? h("input", { type: "text", value: shown(inp[key]), inputmode: "numeric", autocomplete: "off", id: `ic-${key}` })
      : h("input", { type: "number", min: lo, max: hi, step, value: shown(inp[key]), inputmode: "numeric", id: `ic-${key}` });
    el.addEventListener("change", () => {
      const n = money ? fromDisplay(parseWhole(el.value)) : Number(el.value);
      inp[key] = Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : lo;
      el.value = shown(inp[key]);
      run();
    });
    form.append(h("label", { class: "ctl", for: `ic-${key}` }, h("span", null, label), el));
  };
  num("income", `${persona.salary_multiplier ? "Gross salary a year in an average euro-area capital" : "Gross income a year"} (${displayCurrency()})`, 1000, 1e8, 1000, true);
  if (persona.salary_multiplier) {
    const cb = h("input", { type: "checkbox", id: "ic-scale" });
    cb.checked = inp.scale;
    cb.addEventListener("change", () => { inp.scale = cb.checked; run(); });
    form.append(h("label", { class: "chk", for: "ic-scale" }, cb, "Scale the salary by each country's cost-of-living multiplier"));
  }
  num("horizon", "Length of stay (years)", 1, 60, 1);
  const kind = h("select", { id: "ic-kind" }, h("option", { value: "employment" }, "Employee of a local employer"), h("option", { value: "self_employment" }, "Self-employed, foreign clients"));
  kind.value = inp.kind;
  kind.addEventListener("change", () => { inp.kind = kind.value; run(); });
  form.append(h("label", { class: "ctl", for: "ic-kind" }, h("span", null, "Work"), kind));
  for (let i = 0; i < 5; i++) {
    const s = countryOptions(inp.targets[i] || "", `Country ${i + 1}…`);
    s.addEventListener("change", () => { inp.targets[i] = s.value; run(); });
    form.append(h("label", { class: "ctl" }, h("span", null, `Country ${i + 1}`), s));
  }
  panel.append(form, out);
  run();
}

/** The earned-income calculator's assumptions, shown on the Method page. */
export function incomeCalculatorAssumptions() {
  return h("ul", { class: "small" },
    h("li", null, "Resident rates, the basic allowance, the person's own social security and standard deductions, applied to gross income."),
    h("li", null, "Not included: deductible expenses, family allowances, other tax credits, double-tax relief, and the tax position in the country being left."),
    h("li", null, "A time-limited regime is averaged with the standard rules over the stay. Left over = income − that average − the Annual Household Cost."));
}

// ------------------------------------------------------------------ methodology

export function personaMethodology() {
  const persona = personaCfg();
  const w = normalizeWeights(state.defaultWeights);
  const cfg = state.cfg;
  const cola = state.data.meta.config.personas.expat.salary_multiplier;
  const describe = (k) => moneyText(k === "income_tax" ? cfg.income_tax_transform.description : k === "cost" ? persona.cost.description
    : k === "leftover" ? persona.leftover.description : k === "scene" ? persona.scene.description
      : k === "visa" ? persona.visa.description : (cfg.nontax_transforms[k] || {}).description || "");
  return [
    h("h3", null, "Metrics and weights"),
    h("div", { class: "table-wrap" }, h("table", { class: "grid small" },
      h("thead", null, h("tr", null, h("th", null, "Metric"), h("th", { class: "num" }, "Share"), h("th", null, "How it is scored"))),
      h("tbody", null, Object.entries(persona.metrics).map(([k, m]) => h("tr", null, h("td", null, m.label),
        h("td", { class: "num" }, fmtPct(w[k], 0)), h("td", null, describe(k))))))),
    h("h3", null, "Income tax"),
    h("p", null, "One researched file per country: resident rates (with the main city's local tax), the basic allowance, the person's own social security and standard deductions where the law allows, and every nomad visa and expat regime with its conditions. A regime counts only if it fits: nomad visas need foreign clients, expat regimes a local employer, and income thresholds must be met. A regime that runs out before the stay ends is averaged with the standard rules."),
    h("p", null, "Foreign-income exemptions count for the nomad only where a source shows they cover work done while living in the country; most do not."),
    h("p", null, "US states add their own income tax (and the main city's, e.g. New York City or Philadelphia) on top of federal tax, with the state's main-city rents and price level. The national US figures use Austin, Texas. Other countries' regions use national rules."),
    persona.salary_multiplier ? [h("h3", null, "Salary by location"), h("p", null, moneyText(cola.description)),
      h("p", { class: "small" }, "Tables used: US State Department post allowance, UN post adjustment, EU correction coefficients, German Kaufkraftausgleich (sources in ATTRIBUTION.md). Hover the salary in a profile to see each table's value.")] : null,
    "scene" in persona.metrics ? [h("h3", null, "Digital nomad scene"), h("p", null, moneyText(persona.scene.description))] : null,
    h("h3", null, "Knock-outs"),
    h("p", null, `Ruled out for this persona: ${knockoutLabels(persona).join(", ").toLowerCase()}. Rule-of-law and corruption knock-outs apply to the HNWI only: they matter for wealth held for generations, less for a ${persona.horizon_years}-year stay.`),
    h("h3", null, "Not modelled"),
    h("ul", { class: "small" }, persona.profile.not_modelled.map((t) => h("li", null, t))),
    h("h3", null, "Calculator"),
    incomeCalculatorAssumptions(),
  ].flat().filter(Boolean);
}

// ------------------------------------------------------------------ "Who is this for?" card

const pct = (x) => `${Math.round(x * 100)}%`;
const usd = (x) => `USD ${fmtInt(x)}`;

function knockoutLabels(persona) {
  const ko = state.cfg.knockout;
  const labels = { ...Object.fromEntries(ko.criteria.map((c) => [c.id, c.label])) };
  for (const k of ["sanctions", "capital_controls", "security_state_courts"]) if (ko[k]) labels[k] = ko[k].label;
  return [...new Set(persona.knockout.map((id) => labels[id] || id.replaceAll("_", " ")))];
}

/** The money assumptions behind a persona in a few short lines, from the live config. */
function moneyLines(pid) {
  const cfg = state.cfg;
  const p = cfg.personas[pid];
  if (pid === "family_office") {
    const rf = cfg.reference_family;
    const horizon = cfg.tax_transforms.time_limited_regimes;
    return [
      `${fmtEur(rf.portfolio)} portfolio, mostly invested abroad`,
      `${pct(cfg.market.dividend_yield)} dividends and ${pct(cfg.market.price_growth)} price return a year; ${pct(cfg.market.realisation)} of gains sold and taxed each year`,
      `Spends about ${fmtEur(rf.annual_payout)} a year`,
      `${fmtEur(rf.estate)} estate to ${rf.children} children · ${horizon.horizon_years}-year horizon`,
    ];
  }
  if (pid === "expat") {
    const m = (id) => state.data.jurisdictions[id]?.personas?.expat?.salary_multiplier;
    const ex = [["GBR", "London"], ["ROU", "Bucharest"]].filter(([id]) => m(id)).map(([id, city]) => `×${m(id).toFixed(2)} ${city}`);
    return [
      `${usd(p.income_usd)} salary in an average euro-area city, adjusted for local costs${ex.length ? ` (${ex.join(", ")})` : ""}`,
      `Local employer · ${p.horizon_years} years · 2-bedroom city flat`,
    ];
  }
  return [
    `${usd(p.income_usd / 12)} a month from clients abroad, the same everywhere`,
    `${p.horizon_years} years · 1-bedroom flat and a coworking desk`,
  ];
}

/** "Who is this for?": the persona's money, priorities (with default weights), knock-outs and gaps. */
export function personaCard(pid = state.persona) {
  const p = state.cfg.personas[pid];
  const prof = p.profile;
  const w = normalizeWeights(defaultWeightsFor(pid));
  const metrics = metricsFor(pid);
  return h("section", { class: "persona-card" },
    h("h3", null, `${p.label}: who this is for`),
    h("p", null, prof.headline),
    h("h4", null, "Money"),
    h("ul", null, moneyLines(pid).map((t) => h("li", null, t))),
    h("h4", null, "What matters most (default weights)"),
    h("ul", { class: "priorities" }, prof.priorities.map((pr) => h("li", null,
      h("span", { class: "share", title: pr.metrics.map((m) => metrics[m]?.label).filter(Boolean).join(", ") }, pct(pr.metrics.reduce((a, m) => a + (w[m] || 0), 0))),
      " ", pr.text))),
    h("p", { class: "small muted" }, `Ruled out: ${knockoutLabels(p).join(", ").toLowerCase()}. Details under Method.`));
}
