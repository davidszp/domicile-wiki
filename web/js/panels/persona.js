// Panels for the earned-income personas (Expat, Digital nomad): the profile body, the
// income calculator and the methodology section. The HNWI persona uses profile.js and
// calculator.js; main.js and those panels hand over here when an income persona is active.

import { h, append, clear, extLink, fmtPct, fmtEur, fmtMoney, moneyText, displayCurrency, toDisplay, fromDisplay } from "../dom.js";
import { state, entries, jur, personaCfg, metricsFor, defaultWeightsFor } from "../state.js";
import { loadProfile, loadDossier } from "../data.js";
import { normalizeWeights } from "../scoring.js";
import { personaRows } from "../earned.js";
import { renderMarkdown } from "../markdown.js";
import { scoreChip } from "./profile.js";

const COLA_LABEL = { us_dssr: "US State Department", un_icsc: "UN post adjustment", eu_cc: "EU correction coefficient", de_kaufkraft: "German Kaufkraftausgleich", de_destatis: "German Destatis parity" };
const CZ_LABEL = { EU: "EU citizens", US: "US citizens", OTHER: "other nationals" };
const KIND_LABEL = { employment: "employee", self_employment: "self-employed contractor" };
const TREATMENT = {
  exempt: "Qualifying income exempt from local income tax",
  flat_rate: "Flat rate on qualifying income",
  partial_exemption: "Part of the income exempt, the rest taxed normally",
  standard: "No change to taxation (residence permit only)",
};

function sourceList(sources) {
  if (!sources || !sources.length) return null;
  return h("ul", { class: "sources" }, sources.map((s) => h("li", null, extLink(s.url, s.title), ` — ${s.publisher}`)));
}

function field(label, value) {
  if (value === null || value === undefined || value === "") return null;
  return h("div", { class: "field" }, h("dt", null, label), h("dd", null, value));
}

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
  const persona = personaCfg();
  const hc = block.household_cost_detail;
  const c = inc && inc.costs;
  const items = [];
  if (c) {
    const it = (label, x) => x && items.push(h("li", null, `${label}: ${fmtMoney(x.value.amount, x.value.currency)} (${x.year}) — ${x.description} `, extLink(x.source.url, x.source.publisher)));
    it("1-bedroom rent / month", c.rent_1bed_monthly);
    it("2-bedroom rent / month", c.rent_2bed_monthly);
    it("Coworking desk / month", c.coworking_monthly);
  }
  const parts = hc ? Object.entries(hc.parts).map(([k, v]) => `${k.replace("_", " ")} ${fmtEur(v)}`).join(", ") : "";
  return h("details", { class: "fold" }, h("summary", null, h("h3", null, "Annual Household Cost", c ? ` — ${c.city}` : "", hc ? `: ${fmtEur(hc.total_eur)}` : "")),
    hc ? h("p", null, h("strong", null, `Annual Household Cost (estimate, not taxes): ${fmtEur(hc.total_eur)}`), ` (${parts}).`,
      hc.estimated_from_price_level.length ? ` Estimated from the price level: ${hc.estimated_from_price_level.join(", ")}.` : "")
      : h("p", { class: "muted" }, "Not scored: the rent has not been sourced or no price level is available."),
    h("p", { class: "small muted" }, moneyText(persona.cost.description)),
    items.length ? h("ul", { class: "small" }, items) : null,
    c && c.notes ? h("p", { class: "small" }, c.notes) : null);
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

/** Profile body for an income persona, once the profile JSON `p` has loaded. */
export function renderPersonaBody(body, p, id, r) {
  const persona = personaCfg();
  const block = p.persona_detail && p.persona_detail[state.persona];
  const inc = p.income;
  const e = jur(id);
  body.append(h("p", { class: "small muted" }, h("strong", null, `${persona.label}: `), persona.summary));
  if (e.parent && inc) body.append(h("p", { class: "notice small" }, `Earned-income rules are national: ${jur(e.parent)?.name ?? e.parent}'s figures (${inc.costs?.city ?? "main city"}) are used for this region.`));
  if (!inc || !block) {
    body.append(h("p", { class: "notice" }, "Earned-income taxation, expat and nomad regimes and rents have not been researched for this country yet, so it is unscored (grey) for this persona."),
      h("h3", null, "Other metrics"), metricsTable(r));
    return;
  }
  const it = inc.income_tax;
  const rows = block.tax[state.citizenship] || [];
  const best = r.regime;
  const income = block.income_eur;
  const sm = block.salary_multiplier;
  const lo = block.leftover ? block.leftover[state.citizenship] : null;
  append(body, [usCitizenNote()]);

  // append() (not the native method) so the optional salary line can be null without printing "null".
  append(body, [h("h3", null, `Income tax and social security for a ${KIND_LABEL[persona.income_kind]} earning ${fmtEur(income)} a year`),
    sm ? h("p", { class: "small" }, h("strong", null, `Salary ${fmtEur(income)}: `),
      `USD ${persona.income_usd.toLocaleString("en-GB")} in an average euro-area capital × ${sm.multiplier.toFixed(2)} for the cost of living here`,
      sm.estimated ? " (no posting allowance table lists this country: estimated from the World Bank price level)."
        : ` (average of ${Object.entries(sm.sources).map(([k, v]) => `${COLA_LABEL[k] || k} ${v.toFixed(2)}`).join(", ")}).`) : null,
    h("p", { class: "small muted" }, `${sm ? "" : `USD ${persona.income_usd.toLocaleString("en-GB")} at the build's exchange rate. `}Each regime is blended with the standard rules over the ${persona.horizon_years}-year stay when it runs out sooner; the cheapest one available to ${CZ_LABEL[state.citizenship]} is used for the score.`),
    h("div", { class: "table-wrap" }, h("table", { class: "grid" },
      h("thead", null, h("tr", null, h("th", null, "Regime"), h("th", { class: "num" }, "Tax + social security"), h("th", { class: "num", title: "Average a year over the stay" }, "A year"), h("th", null, "Score"))),
      h("tbody", null, rows.map((row) => h("tr", { class: best && best.id === row.id ? "best" : "" },
        h("td", null, row.name, best && best.id === row.id ? h("div", null, h("span", { class: "badge" }, "used for score")) : null,
          h("div", { class: "small muted" }, row.duration ? `${row.duration} years` : "indefinite",
            row.detail.blend_factor !== undefined && row.detail.blend_factor < 1 ? `: ${Math.round(row.detail.blend_factor * 100)}% of the stay, then standard rules` : "")),
        h("td", { class: "num" }, fmtPct(row.detail.rate), h("div", { class: "small muted" }, `${fmtEur(row.detail.tax)} tax + ${fmtEur(row.detail.ssc)} social security`)),
        h("td", { class: "num" }, h("strong", null, fmtEur(row.cost))),
        h("td", null, scoreChip(row.scores.income_tax, state.cfg)))))))]);
  if (inc.regimes.length) {
    const regSec = h("details", { class: "fold" }, h("summary", null, h("h3", null, "Nomad visas and expat regimes")));
    body.append(regSec);
    for (const reg of inc.regimes) {
      const ok = reg.eligible_citizenships.includes(state.citizenship);
      regSec.append(h("details", { class: "regime" },
        h("summary", null, reg.kind === "digital_nomad_visa" ? "Nomad visa: " : reg.kind === "expat_regime" ? "Expat regime: " : "", reg.name,
          reg.duration_years ? ` (${reg.duration_years} years)` : "", ok ? "" : ` — not open to ${CZ_LABEL[state.citizenship]}`),
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
      field("Local taxes", it.local_tax_note)),
    openQuestions(it.open_questions), sourceList(it.sources),
    h("div", { class: "meta-line" }, `Tax year ${it.tax_year} · verified ${it.verified_on} · confidence `, h("span", { class: `conf conf-${it.confidence}` }, it.confidence), ` · ${it.verification.replace("_", " ")}`)));

  body.append(h("h3", null, "All metrics"), metricsTable(r));
  const ns = block.nomad_scene;
  if (ns) {
    body.append(h("p", { class: "small" }, h("strong", null, "Digital nomad scene: "),
      ns.lists_named ? `named in ${ns.lists_named} of ${ns.lists_total} published nomad rankings` : `not named in any of the ${ns.lists_total} published nomad rankings used`,
      ns.hub ? `; best-placed city ${ns.hub}` : "", ".",
      ns.coworking_osm ? h("span", { class: "muted" }, ` OpenStreetMap lists ${ns.coworking_osm.spaces} coworking spaces within 15 km of ${ns.coworking_osm.city} (reference only: coverage depends on local mappers, so it is not scored).`) : null));
  } else if ("scene" in personaCfg().metrics) {
    body.append(h("p", { class: "small muted" }, "Digital nomad scene: no data."));
  }
  body.append(costSection(block, inc));
  if (lo && lo.eur !== null && lo.eur !== undefined) {
    body.append(h("p", null, h("strong", null, `Money left over a year: ${fmtEur(lo.eur)}`),
      ` = salary ${fmtEur(income)} − tax and social security ${fmtEur(best ? best.cost : null)} − Annual Household Cost ${fmtEur(block.household_cost)}.`));
  }
  body.append(foldSection("Residence and work rights", h("p", null, inc.residence_routes)));
  if (inc.open_questions.length) body.append(h("details", { class: "fold" }, h("summary", null, h("h3", null, `Open questions (${inc.open_questions.length})`)), h("ul", null, inc.open_questions.map((q) => h("li", null, q)))));
  body.append(h("p", { class: "small muted" }, `Researched ${inc.researched_on}. Amounts converted to ${displayCurrency()} at ECB reference rates of ${state.data.meta.fx_date}.`));
  const dossier = h("div", { class: "dossier" });
  body.append(h("section", null, h("h3", null, "Earned-income dossier"),
    h("button", { onclick: () => showDossier(dossier, inc.id) }, "Show the dated dossier"), dossier));
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
    h("p", { class: "disclaimer" }, "Illustrative only. Applies the researched resident rates, the basic allowance and the individual's own social security to gross income. It ignores deductible expenses, family allowances, tax credits beyond the basic allowance, double-tax relief and the tax position in the country being left."));
  append(panel, [usCitizenNote()]);
  const form = h("form", { class: "calc-form", onsubmit: (e) => e.preventDefault() });
  const out = h("div", { class: "calc-out", "aria-live": "polite" });
  const run = () => computeIncome(out, inp);
  const num = (key, label, lo, hi, step, money = false) => {
    // Money is shown and typed in the display currency; inp keeps EUR.
    const shown = (v) => (money ? Math.round(toDisplay(v)) : v);
    const el = h("input", { type: "number", min: lo, max: hi, step, value: shown(inp[key]), inputmode: "numeric", id: `ic-${key}` });
    el.addEventListener("change", () => {
      const n = money ? fromDisplay(Number(el.value)) : Number(el.value);
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
  form.append(h("p", { class: "small" }, `Citizenship: ${{ EU: "EU", US: "US", OTHER: "other" }[state.citizenship]} (change it in the top bar).`));
  for (let i = 0; i < 5; i++) {
    const s = countryOptions(inp.targets[i] || "", `Country ${i + 1}…`);
    s.addEventListener("change", () => { inp.targets[i] = s.value; run(); });
    form.append(h("label", { class: "ctl" }, h("span", null, `Country ${i + 1}`), s));
  }
  panel.append(form, out,
    h("h3", null, "How to read it"),
    h("ul", { class: "small" },
      h("li", null, "Effective rate: income tax plus own social security in a year the regime applies, as a share of gross income."),
      h("li", null, "Average a year over the stay: a time-limited regime is blended with the standard rules for the years after it ends."),
      h("li", null, "Left over a year: gross income minus that average and the persona's Annual Household Cost (rent and everyday spending in the main city).")));
  run();
}

// ------------------------------------------------------------------ methodology

export function personaMethodology() {
  const persona = personaCfg();
  const w = normalizeWeights(state.defaultWeights);
  const cfg = state.cfg;
  return [
    h("h3", null, `Persona: ${persona.label}`),
    h("p", null, persona.summary),
    h("div", { class: "table-wrap" }, h("table", { class: "grid small" },
      h("thead", null, h("tr", null, h("th", null, "Metric"), h("th", null, "Points"), h("th", null, "Share"), h("th", null, "Transformation to 0–100"))),
      h("tbody", null, Object.entries(persona.metrics).map(([k, m]) => h("tr", null, h("td", null, m.label), h("td", { class: "num" }, String(m.weight)),
        h("td", { class: "num" }, fmtPct(w[k])),
        h("td", null, moneyText(k === "income_tax" ? cfg.income_tax_transform.description : k === "cost" ? persona.cost.description
          : k === "leftover" ? persona.leftover.description
          : k === "scene" ? persona.scene.description
          : k === "visa" ? persona.visa.description : (cfg.nontax_transforms[k] || {}).description || ""))))))),
    h("p", null, "Income tax and social security come from one researched file per country (", h("code", null, "data/income/"), "): resident rates with the main city's local surtax, the basic allowance, the employee's or self-employed person's own social security (employer contributions are not counted; where the law deducts those contributions from taxable income, they are deducted before the brackets), and every digital nomad visa and expat regime with its conditions. A regime counts only when its conditions fit the persona: nomad visas need foreign clients, expat regimes a local employer, and income thresholds must be met."),
    h("p", null, `Knock-outs for this persona: ${persona.knockout.join(", ").replaceAll("_", " ")}. Rule-of-law and corruption thresholds apply to the HNWI persona only: they matter for wealth held for generations, less for a ${persona.horizon_years}-year stay, and remain visible in the scores.`),
    persona.salary_multiplier ? h("p", null, h("strong", null, "Salary by location. "), moneyText(persona.salary_multiplier.description)) : null,
    h("p", null, "Not modelled: US citizenship-based taxation (foreign earned income exclusion, self-employment tax), deductible expenses, family allowances and the exit position in the country being left."),
    h("p", null, `Regions use their country's earned-income rules and main-city costs. Scores for the HNWI persona are unchanged by this persona.`),
    h("p", { class: "small muted" }, `Reference income: USD ${persona.income_usd.toLocaleString("en-GB")} a year, ${fmtEur(persona.income_usd / state.data.meta.fx_usd_per_eur)} at the build rate.`),
  ].filter(Boolean);
}

// ------------------------------------------------------------------ "Who is this for?" card

const pct = (x) => `${Math.round(x * 100)}%`;
const usd = (x) => `USD ${Math.round(x).toLocaleString("en-GB")}`;

function knockoutLabels(persona) {
  const ko = state.cfg.knockout;
  const labels = { ...Object.fromEntries(ko.criteria.map((c) => [c.id, c.label])) };
  for (const k of ["sanctions", "capital_controls", "security_state_courts"]) if (ko[k]) labels[k] = ko[k].label;
  return [...new Set(persona.knockout.map((id) => labels[id] || id.replaceAll("_", " ")))];
}

/** The money assumptions behind a persona, worded from the live config so they cannot drift. */
function moneyLines(pid) {
  const cfg = state.cfg;
  const p = cfg.personas[pid];
  const usdPerEur = state.data.meta.fx_usd_per_eur;
  if (pid === "family_office") {
    const rf = cfg.reference_family;
    const hc = cfg.household_cost;
    const horizon = cfg.tax_transforms.time_limited_regimes;
    return [
      `${fmtEur(rf.portfolio)} investment portfolio (${pct(rf.foreign_share)} invested abroad), a ${fmtEur(rf.real_estate_local)} home, ${fmtEur(rf.net_wealth)} net wealth.`,
      `Every year: ${fmtEur(rf.realized_gains)} of realised capital gains and ${fmtEur(rf.dividends)} of dividends (foreign dividends arrive after ${pct(rf.source_wht)} withholding, credited where the country allows).`,
      `Spends about ${fmtEur(rf.annual_payout)} a year, taken from the portfolio (or paid out by a holding structure where one is used).`,
      `The local Annual Household Cost (a 4-bedroom family home in a good, upper-middle-class area, three international-school places, family health insurance, a housekeeper and ${fmtEur(hc.other_spending_eur)} of other spending, scaled to local prices) is estimated for each country and scored separately.`,
      `Leaves a ${fmtEur(rf.estate)} estate to ${rf.children} children. Horizon: ${horizon.horizon_years} years, ${horizon.generations} generations, so a 10-year tax holiday counts for a sixth of the time.`,
      "Holds investments personally by default; holding structures (company, foundation, trust) can be included or left out in the top bar.",
    ];
  }
  const income = p.income_usd / usdPerEur;
  if (pid === "expat") {
    const m = (id) => state.data.jurisdictions[id]?.personas?.expat?.salary_multiplier;
    const ex = [["GBR", "London"], ["CHE", "Zurich"], ["ROU", "Bucharest"]].filter(([id]) => m(id)).map(([id, city]) => `${m(id).toFixed(2)}× in ${city}`);
    return [
      `Earns ${usd(p.income_usd)} (about ${fmtEur(income)}) gross a year in an average euro-area capital, as an employee of a local employer.`,
      `Elsewhere the salary follows local living costs, using the multipliers governments and the UN apply to staff posted abroad${ex.length ? `: for example ${ex.join(", ")}` : ""}.`,
      `Stays ${p.horizon_years} years. Lives in a city-centre 2-bedroom flat, plus ${fmtEur(p.cost.other_spending_eur)} a year of other spending scaled to local prices.`,
    ];
  }
  return [
    `Earns ${usd(p.income_usd / 12)} a month (${usd(p.income_usd)}, about ${fmtEur(income)} a year) as a self-employed contractor with clients abroad. The income is the same wherever they live, so cheaper places stretch it further.`,
    `Stays ${p.horizon_years} years and becomes tax-resident, using a digital nomad visa where one exists.`,
    `Lives in a city-centre 1-bedroom flat with a coworking desk, plus ${fmtEur(p.cost.other_spending_eur)} a year of other spending scaled to local prices.`,
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
    h("h4", null, "What matters most"),
    h("ul", { class: "priorities" }, prof.priorities.map((pr) => h("li", null,
      h("span", { class: "share", title: pr.metrics.map((m) => metrics[m]?.label).filter(Boolean).join(", ") }, pct(pr.metrics.reduce((a, m) => a + (w[m] || 0), 0))),
      " ", pr.text))),
    h("p", { class: "small muted" }, "Shares are the default weights; change them under Weights."),
    h("h4", null, "Ruled out (shown red)"),
    h("p", { class: "small" }, knockoutLabels(p).join(" · ")),
    h("h4", null, "Not modelled"),
    h("ul", { class: "small" }, prof.not_modelled.map((t) => h("li", null, t))));
}
