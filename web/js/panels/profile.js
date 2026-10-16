import { h, append, clear, extLink, displayCurrency, moneyText, fmtPct, fmtScore, fmtEur, fmtMoney } from "../dom.js";
import { state, entries, jur, toggleIn, MAX_COMPARE, metricsFor, isIncomePersona, personaCfg, personaNoun } from "../state.js";
import { loadProfile, loadDossier } from "../data.js";
import { bandFor, TAX_METRICS } from "../scoring.js";
import { renderMarkdown } from "../markdown.js";
import { scoreRgb, textOn } from "../colors.js";
import { INHERITANCE, field, sourceList } from "../labels.js";
import { renderPersonaBody, personaCard, fact } from "./persona.js";
import { immigrationSection, residenceFact } from "./immigration.js";
import { successionSection, successionFact } from "./succession.js";

const STATUS = {
  verified: ["Verified", "All four tax metrics verified against sources; at least 90% of weighted data present."],
  provisional: ["Provisional", "Tax data computable but not fully verified, or some indicators missing."],
  insufficient: ["Insufficient data", "Not enough verified data to score. Shown grey on the map."],
  knocked_out: ["Knocked out", "Fails a knock-out criterion (rule of law, corruption, conflict, violent crime, sanctions or capital controls). Shown red and excluded from rankings."],
};
const METRIC_TITLES = {
  capital_gains: "Capital gains",
  dividends: "Dividends",
  inheritance: "Inheritance and gifts to children",
  wealth_tax: "Annual wealth tax",
};
const INH_TREATMENT = {
  fully_exempt: "Children fully exempt (0%) on all asset classes",
  exempt_with_conditions: "Children exempt, subject to conditions",
  taxed_low: "Taxed at a low rate",
  taxed: "Taxed",
};
const WEALTH_TYPE = { none: "No general annual net wealth tax", limited: "Limited wealth levy on some assets", broad: "Broad annual net wealth tax" };

export function scoreChip(score, cfg, extraClass = "") {
  const b = bandFor(score, cfg);
  const rgb = scoreRgb(score);
  const chip = h("span", { class: `chip ${rgb ? "" : "unscored"} ${extraClass}`, title: b ? b.label : "Unscored" }, fmtScore(score));
  if (rgb) { // the CSP allows CSSOM styles, not style attributes
    chip.style.background = `rgb(${rgb.join(", ")})`;
    chip.style.color = textOn(rgb);
  }
  return chip;
}

/** "EU" tag for members of the European Union (and their regions and outermost regions). */
export function euBadge(e) {
  if (!e || !e.eu) return null;
  return h("span", { class: "eu-badge", title: state.cfg.eu ? state.cfg.eu.explanation : "EU member" }, "EU");
}

/** "Red flag" tag for lists: a serious risk that does not rule the place out (data/scoring_config.json red_flags). */
export function redFlagBadge(e) {
  if (!e || !e.red_flag) return null;
  return h("span", { class: "flag-badge", title: `${e.red_flag.label}. ${e.red_flag.explanation}` }, "Red flag");
}

export function statusBadge(st) {
  const [label, tip] = STATUS[st] || STATUS.insufficient;
  return h("span", { class: `badge status-${st}`, title: tip }, label);
}



function metricMeta(m) {
  return h("div", { class: "meta-line" },
    `Tax year ${m.tax_year} · verified ${m.verified_on} · confidence `, h("span", { class: `conf conf-${m.confidence}` }, m.confidence),
    ` · ${m.verification.replace("_", " ")}`);
}

function taxCard(metric, m, detail, regimeName, currency) {
  if (!m) return h("section", { class: "card" }, h("h4", null, METRIC_TITLES[metric]), h("p", { class: "muted" }, "Not researched."));
  const d = detail || {};
  const head = [];
  if (metric === "capital_gains") {
    head.push(field("Headline rate", fmtPct(m.headline_rate)));
    const r = m.rates;
    head.push(field("Listed shares (foreign / domestic)", `${fmtPct(r.listed_securities_foreign)} / ${fmtPct(r.listed_securities_domestic)}`));
    head.push(field("Private business sale", fmtPct(r.private_business_sale)));
    head.push(field("Local real estate", fmtPct(r.real_estate_local)));
  } else if (metric === "dividends") {
    head.push(field("Headline rate", fmtPct(m.headline_rate)));
    head.push(field("Domestic / foreign (before credit)", `${fmtPct(m.domestic_rate)} / ${fmtPct(m.foreign_gross_rate)}`));
    head.push(field("Relief for foreign withholding", m.foreign_tax_credit.replace("_", " ")));
  } else if (metric === "wealth_tax") {
    head.push(field("Type", WEALTH_TYPE[m.type]));
    for (const c of m.components || []) {
      head.push(field(c.name, `${c.base.replaceAll("_", " ")}; ${c.brackets.map((b) => `${fmtPct(b.rate, 2)} from ${fmtMoney(b.from_amount, currency)}`).join(", ")}` +
        (c.exempt_amount ? `; allowance ${fmtMoney(c.exempt_amount, currency)}` : "")));
    }
  } else if (metric === "inheritance") {
    head.push(field("Children", INH_TREATMENT[m.children_treatment]));
    head.push(field("Spouse", m.spouse_treatment ? `${INHERITANCE[m.spouse_treatment]}${m.spouse_note ? `: ${m.spouse_note}` : ""}` : m.basis === "none" ? "tax-free" : "not researched yet"));
    head.push(field("Basis", { none: "No inheritance/gift tax", beneficiary: "Tax on each heir", estate: "Tax on the estate" }[m.basis]));
    if (m.scope === "local_assets_only") head.push(field("Scope", "Only assets situated in this jurisdiction are taxed (foreign assets outside the tax)"));
    if (m.exemption) head.push(field(m.basis === "estate" ? "Exemption per estate" : "Exemption per child", fmtMoney(m.exemption, currency)));
    if (m.brackets.length) head.push(field("Rates", m.brackets.map((b) => `${fmtPct(b.rate)} from ${fmtMoney(b.from_amount, currency)}`).join(", ")));
    if (m.other_transfer_cost_rate) head.push(field("Other transfer costs", fmtPct(m.other_transfer_cost_rate, 2)));
    if (m.deemed_disposal_rate) head.push(field("Tax on unrealised gains at death", `${fmtPct(m.deemed_disposal_rate)} of the gain (deemed disposal)`));
  }
  const eff = d.effective_rate !== undefined ? h("div", { class: "eff" },
    `Effective for the reference family: ${fmtPct(d.effective_rate, metric === "wealth_tax" ? 3 : 1)}` +
      (metric === "wealth_tax" ? " of net wealth a year" : metric === "inheritance" ? " of the estate (one-off)" : ""),
    d.us_wht_extra_rate ? ` (includes ${fmtPct(d.us_wht_extra_rate)} extra US withholding: no US tax treaty)` : "",
    d.blend_factor !== undefined && d.blend_factor < 1 ? ` · time-limited regime blended ${Math.round(d.blend_factor * 100)}% with standard rules` : "") : null;

  const extra = [];
  const add = (label, key) => extra.push(field(label, m[key]));
  add("Exemptions and thresholds", "exemptions_thresholds");
  add("Eligibility", "eligibility_conditions");
  add("Regional differences", "regional_differences");
  add("Important exceptions", "important_exceptions");
  if (metric === "capital_gains") { add("Rate basis", "rate_basis"); add("Holding periods", "holding_period_rules"); add("Professional traders", "professional_trader"); add("Foreign assets", "foreign_assets"); }
  if (metric === "dividends") { add("Rate basis", "rate_basis"); add("Withholding on outbound dividends", "withholding_outbound"); add("Treaty network", "treaty_network"); add("Holding companies", "holding_company_notes"); }
  if (metric === "wealth_tax") add("Ordinary property taxes (not a wealth tax)", "property_tax_note");
  if (metric === "inheritance") { add("Gift tax", "gift_tax"); add("Business relief", "business_relief"); add("Foreign assets", "foreign_assets"); add("Residence and domicile", "domicile_rules"); }

  return h("section", { class: "card tax-card" },
    h("div", { class: "card-head" }, h("h4", null, METRIC_TITLES[metric]), scoreChip(d.score ?? null, state.cfg)),
    regimeName ? h("div", { class: "muted small" }, `Under: ${regimeName}`) : null,
    m.basis === "pro_forma_draft" ? h("p", { class: "notice" }, h("strong", null, "Pro forma: "), "this metric scores a published draft as if it were enacted. It is not yet law.") : null,
    h("p", null, m.summary),
    eff,
    h("dl", null, head),
    h("details", null, h("summary", null, "Rules, conditions and sources"), h("dl", null, extra),
      m.open_questions.length ? h("div", { class: "open-q" }, h("strong", null, "Open questions: "), h("ul", null, m.open_questions.map((q) => h("li", null, q)))) : null,
      sourceList(m.sources)),
    metricMeta(m));
}

function nontaxTable(p) {
  const cfg = state.cfg;
  const rows = [];
  for (const [k, spec] of Object.entries(cfg.nontax_transforms)) {
    const d = p.nontax_detail[k] || {};
    const comps = Object.entries(d.components || {}).map(([c, v]) => `${c.replaceAll("_", " ")}: ${v === null ? "missing" : v.toFixed(0)}`).join(" · ");
    rows.push(h("tr", null, h("th", { scope: "row" }, cfg.metrics[k].label), h("td", null, scoreChip(d.score ?? null, cfg)),
      h("td", { class: "small" }, comps, d.partial ? " (partial)" : "", h("div", { class: "muted" }, moneyText(spec.description)))));
  }
  return h("div", { class: "table-wrap" }, h("table", { class: "grid" }, h("thead", null, h("tr", null, h("th", null, "Metric"), h("th", null, "Score"), h("th", null, "Components and method"))), h("tbody", null, rows)));
}

function indicatorTable(p) {
  const man = state.data.meta.indicators;
  const rows = Object.entries(p.indicators || {}).sort().map(([k, v]) => h("tr", null,
    h("td", null, man[k]?.description || k), h("td", { class: "num" }, Number(v.value).toLocaleString("en-GB", { maximumFractionDigits: 3 })),
    h("td", null, String(v.year)), h("td", { class: "small" }, v.url ? extLink(v.url, v.source) : man[k] ? extLink(man[k].url, man[k].source) : "")));
  if (!rows.length) return h("p", { class: "muted" }, "No indicator data available for this jurisdiction.");
  return h("details", null, h("summary", null, `Raw indicators (${rows.length})`),
    h("div", { class: "table-wrap" }, h("table", { class: "grid small" }, h("thead", null, h("tr", null, h("th", null, "Indicator"), h("th", null, "Value"), h("th", null, "Year"), h("th", null, "Source"))), h("tbody", null, rows))));
}

function costSection(p) {
  const hc = p.household_cost_detail;
  const col = p.data?.cost_of_living;
  const items = [];
  if (col) {
    // Short lines; how each figure was sourced is in its tooltip and the dossier.
    const it = (label, x, per) => x && items.push(h("li", { title: x.description }, `${label}: ${fmtMoney(x.value.amount, x.value.currency)}${per} `, extLink(x.source.url, "source")));
    it("Family home rent", col.prime_rent_monthly, " a month");
    it("International school", col.intl_school_annual_fee, " a year per child");
    it("Health insurance", col.family_health_insurance_annual, " a year");
    it("Housekeeper", col.housekeeper_monthly, " a month");
  }
  const parts = hc ? `Rent ${fmtEur(hc.parts.rent)}, schools ${fmtEur(hc.parts.schools)}, health ${fmtEur(hc.parts.health_insurance)}, housekeeper ${fmtEur(hc.parts.housekeeper)}, other ${fmtEur(hc.parts.other_spending)}.` : null;
  return h("details", { class: "fold" }, h("summary", null, h("h3", null, "Annual Household Cost", hc ? `: ${fmtEur(hc.total_eur)}` : "")),
    p.cost_from_parent ? h("p", { class: "small muted" }, `National figures (${p.cost_from_parent}).`) : null,
    hc ? h("p", { title: [hc.estimated_from_price_level.length ? `Estimated from the price level: ${hc.estimated_from_price_level.join(", ")}.` : "", hc.price_level_note || ""].join(" ").trim() || null }, parts)
      : h("p", { class: "muted" }, "Not scored: rent or school fee not sourced yet."),
    items.length ? h("ul", { class: "small" }, items) : null);
}

/** A section folded under its heading, closed by default: detail most readers can skip. */
function fold(parent, title, ...children) {
  const sec = h("details", { class: "fold" }, h("summary", null, h("h3", null, title)));
  append(sec, children); // the helper skips null children instead of printing "null"
  parent.append(sec);
  return sec;
}

function subRegions(id, ctx) {
  const subs = entries().filter(([, e]) => e.parent === id && !e.territory);
  if (!subs.length) return null;
  const rows = subs.map(([sid, e]) => ({ sid, e })).sort((a, b) => a.e.name.localeCompare(b.e.name));
  return h("section", null, h("h3", null, "Regional drill-down"),
    h("p", { class: "small muted" }, "Regional tax rules are applied where they differ. Regions marked 'national rules' were not separately researched."),
    h("ul", { class: "region-list" }, rows.map(({ sid, e }) => h("li", null,
      h("button", { class: "linklike", onclick: () => ctx.select(sid) }, e.name),
      e.inherited ? h("span", { class: "muted small" }, " (national rules)") : null))));
}

async function showDossier(container, id) {
  const e = jur(id);
  const name = e.parent && !e.inherited ? `${e.parent}-regions` : e.parent || id;
  clear(container).append(h("p", { class: "muted" }, "Loading dossier…"));
  try {
    const md = await loadDossier(name);
    clear(container).append(md ? renderMarkdown(md) : h("p", { class: "muted" }, "No dossier has been written for this jurisdiction yet."));
  } catch (err) {
    clear(container).append(h("p", { class: "error" }, `Dossier could not be loaded: ${err.message}`));
  }
}

export function renderProfile(panel, ctx) {
  const id = state.selected;
  if (!id) {
    panel.append(h("div", { class: "intro" },
      h("h2", null, "Where should you make your home?"),
      h("p", null, "Pick who is moving on the left, then search for a country or click one on the globe."),
      personaCard(),
      h("p", { class: "disclaimer" }, "Research, not tax or legal advice.")));
    return;
  }
  const e = jur(id);
  if (e.territory) return renderTerritory(panel, e, ctx);
  const r = ctx.evalOf(id);
  const inCompare = state.compare.includes(id);
  const head = h("header", { class: "profile-head" },
    h("h2", null, e.name, e.parent ? h("span", { class: "muted" }, `, ${jur(e.parent)?.name ?? e.parent}`) : null),
    h("div", { class: "muted small" }, [e.continent, e.region, e.level === "region" ? "region" : null].filter(Boolean).join(" · "), " ",
      e.eu ? euBadge(e) : e.level === "country" && e.continent === "Europe" ? h("span", { class: "not-eu", title: "In Europe, but not a member of the European Union" }, "Not in the EU") : null),
    h("div", { class: "score-row" },
      h("div", { class: "big-score" }, scoreChip(r.score, state.cfg, "big"), h("span", null, "overall")),
      h("div", { class: "big-score" }, scoreChip(r.taxScore, state.cfg, "big"), h("span", null, "tax only")),
      h("div", null, statusBadge(r.status), h("div", { class: "small" }, `${Math.round(r.completeness * 100)}% data`),
        r.missing.length ? h("div", { class: "small muted", title: `Score range if the missing data were perfect: ${fmtScore(r.rawScore)}–${fmtScore(r.maxIfMissingPerfect)}` },
          `Missing: ${r.missing.map((m) => metricsFor()[m].label.toLowerCase()).join(", ")}`) : null)),
    h("div", { class: "actions" },
      // These buttons relabel themselves instead of re-rendering the whole profile.
      h("button", { onclick: (e) => { toggleIn("shortlist", id, { persist: true }); e.currentTarget.textContent = shortlistLabel(id); } }, shortlistLabel(id)),
      h("button", { disabled: !inCompare && state.compare.length >= MAX_COMPARE,
        onclick: (e) => { toggleIn("compare", id, { max: MAX_COMPARE }); e.currentTarget.textContent = compareLabel(id); } }, compareLabel(id)),
    ));
  panel.append(head);
  panel.append(h("details", { class: "persona-fold" }, h("summary", null, `Who is this scored for? (${personaCfg().label})`), personaCard()));
  if (e.ko && e.ko.length) {
    panel.append(h("div", { class: "ko-box", role: "note" },
      h("strong", null, "Ruled out: "), [...new Set(e.ko.map((k) => k.label))].map((label, i) => [i ? ", " : "",
        h("span", { title: e.ko.filter((k) => k.label === label).map((k) => `${k.value !== null ? `${k.value} (threshold ${k.threshold}). ` : ""}${k.explanation}`).join(" ") }, label.toLowerCase())]),
      ". Hover for the evidence; criteria under Method."));
  }
  if (e.koWaived && e.koWaived.length) {
    panel.append(h("div", { class: "ko-waived", role: "note" },
      h("strong", null, "Kept in by your settings. "),
      `By default it is ruled out for: ${[...new Set(e.koWaived.map((k) => k.label))].join("; ").toLowerCase()}. `,
      h("button", { class: "linklike", onclick: () => ctx.go?.({ mode: "settings" }) }, "Change in Settings")));
  }
  if (e.non_member) {
    panel.append(h("details", { class: "persona-fold" }, h("summary", null, e.non_member.label),
      h("p", { class: "small" }, e.non_member.explanation),
      h("ul", { class: "sources" }, e.non_member.sources.map((s) => h("li", null, extLink(s.url, s.title), ` — ${s.publisher}`)))));
  }
  if (e.red_flag) {
    panel.append(h("div", { class: "ko-box red-flag", role: "note" },
      h("strong", null, `Red flag: ${e.red_flag.label}. `), e.red_flag.explanation,
      h("p", { class: "small muted" }, "Ranked, because the rest of the evidence is strong, but this weighs on any decision. It does not change the score."),
      e.red_flag.sources ? h("ul", { class: "sources" }, e.red_flag.sources.map((s) => h("li", null, extLink(s.url, s.title)))) : null));
  }
  if (e.inherited && !isIncomePersona()) panel.append(h("p", { class: "small muted" }, `Uses ${jur(e.parent)?.name}'s national rules.`));
  const body = h("div", null, h("p", { class: "muted" }, "Loading details…"));
  panel.append(body);

  loadProfile(id).then((p) => {
    if (state.selected !== id) return;
    clear(body);
    if (isIncomePersona()) {
      renderPersonaBody(body, p, id, r);
      return;
    }
    if (!e.researched) {
      body.append(h("p", { class: "notice" }, "Tax rules not researched yet, so it is unscored (grey)."));
      if (p.immigration) body.append(immigrationSection(p.immigration));
      fold(body, "Other indicators", nontaxTable(p), indicatorTable(p));
      return;
    }
    const d = p.data;
    const rows = p.tax_detail[state.citizenship] || [];
    const best = r.regime;
    // Key facts first; the reasoning sits in the folds below and on the Method page.
    const bestRow = rows.find((x) => best && x.id === best.id);
    const hc = p.household_cost_detail;
    append(body, [h("dl", { class: "facts" },
      bestRow && bestRow.cost !== null ? fact("Tax on the investments", `${fmtEur(bestRow.cost)} a year`,
        h("span", { class: "muted", title: "Capital gains, dividends and wealth tax, plus inheritance tax spread over the horizon" }, bestRow.type !== "standard" ? ` · ${bestRow.name}` : "")) : null,
      fact("Wealth tax", { none: "none", limited: "limited", broad: "yes" }[d.regimes[0].wealth_tax.type] || "–"),
      fact("Spouse inherits", e.flags?.inheritance_spouse ? INHERITANCE[e.flags.inheritance_spouse] : "not researched yet"),
      fact("Children inherit", INHERITANCE[d.regimes[0].inheritance.children_treatment] || "–"),
      fact("Living costs", hc ? `${fmtEur(hc.total_eur)} a year` : "not sourced"),
      residenceFact(e) ? fact("Residence for you", residenceFact(e)) : null,
      successionFact(e) ? fact("Leaving your estate", successionFact(e)) : null)]);
    body.append(h("p", null, d.summary));
    body.append(immigrationSection(p.immigration));
    body.append(successionSection(p.succession));
    if (state.citizenship === "US" && d.us_citizen_notes) fold(body, "US citizens", h("p", null, d.us_citizen_notes));

    // Regimes
    const regSec = fold(body, ["Tax regimes available to ", { EU: "EU citizens", US: "US citizens", OTHER: "other nationals" }[state.citizenship]]);
    if (!rows.length) regSec.append(h("p", { class: "muted" }, "No regime recorded as available to this citizenship."));
    regSec.append(h("div", { class: "table-wrap" }, h("table", { class: "grid" },
      h("thead", null, h("tr", null, h("th", null, "Regime"), h("th", null, "Duration"), ...TAX_METRICS.map((m) => h("th", null, state.cfg.metrics[m].label.replace(" tax", "").replace(" taxation", ""))))),
      h("tbody", null, rows.map((row) => h("tr", { class: best && best.id === row.id ? "best" : "" },
        h("td", null, row.name, best && best.id === row.id ? h("span", { class: "badge" }, "used for score") : null,
          row.activity ? h("div", { class: "small muted" }, state.includeActivity ? "needs local work" : "needs local work: not counted") : null,
          row.structure ? h("div", { class: "small muted" }, state.includeStructures ? "holding structure" : "holding structure: not counted") : null),
        h("td", null, row.duration ? `${row.duration} years` : "indefinite",
          row.cost !== null && row.cost !== undefined ? h("div", { class: "small muted", title: "Expected tax cost a year: capital gains, dividends and wealth tax, plus inheritance tax once per generation over 60 years" }, `≈ ${fmtEur(row.cost)}/yr`) : null),
        ...TAX_METRICS.map((m) => h("td", null, scoreChip(row.scores[m], state.cfg)))))))));
    for (const reg of d.regimes.slice(1)) {
      regSec.append(h("details", { class: "regime" }, h("summary", null, reg.type === "structure" ? "Structure: " : "", reg.name, reg.duration_years ? ` (${reg.duration_years} years)` : ""),
        h("p", null, reg.description), h("p", { class: "small" }, h("strong", null, "Eligibility: "), reg.eligibility),
        reg.structure ? h("dl", { class: "small" },
          field("Vehicle", `${reg.structure.entity} (${reg.structure.kind})`),
          field("Tax on payouts to the family", `${fmtPct(reg.structure.payout_tax_rate)}: ${reg.structure.payout_notes}`),
          reg.structure.annual_running_cost ? field("Running cost", `${fmtMoney(reg.structure.annual_running_cost.amount, reg.structure.annual_running_cost.currency)} a year`) : null,
          reg.structure.setup_cost ? field("Set-up cost", fmtMoney(reg.structure.setup_cost.amount, reg.structure.setup_cost.currency)) : null,
          field("Substance and anti-avoidance", reg.structure.substance_and_anti_avoidance),
          field("Exit and liquidation", reg.structure.exit_and_liquidation),
          sourceList(reg.structure.sources)) : null,
        reg.lump_sum ? h("p", { class: "small" }, h("strong", null, "Lump sum: "), `${fmtMoney(reg.lump_sum.annual.amount, reg.lump_sum.annual.currency)} a year, covering ${reg.lump_sum.covers.join(", ").replaceAll("_", " ")}. ${reg.lump_sum.notes}`) : null,
        sourceList(reg.sources)));
    }

    // Tax metric cards for the regime used in the score
    const regData = best ? d.regimes.find((x) => x.id === best.id) : d.regimes[0];
    const std = d.regimes[0];
    const det = best ? (rows.find((x) => x.id === best.id) || {}).detail || {} : {};
    const viaStructure = regData && regData.type === "structure";
    const taxSec = fold(body, viaStructure ? `Taxation via ${regData.structure.entity}` : "Personal taxation",
      h("p", { class: "small muted" }, viaStructure
        ? `Taxes inside the structure, plus ${fmtPct(regData.structure.payout_tax_rate)} on what the family takes out.`
        : "Investments held personally, without a company or trust."));
    for (const m of ["capital_gains", "dividends", "inheritance", "wealth_tax"]) {
      const own = regData && regData[m];
      taxSec.append(taxCard(m, own || std[m], det[m], own && regData.type !== "standard" ? regData.name : null, d.currency));
    }

    // When does a mover become tax resident? The routes to residence are under "Immigration paths";
    // the older route list is shown only where those are not researched yet.
    fold(body, p.immigration ? "Becoming tax resident" : "Residency and eligibility", h("p", null, d.residency.tax_residency_test),
      !p.immigration && d.residency.routes.length ? h("ul", null, d.residency.routes.map((rt) => h("li", null, h("strong", null, rt.name), ` (${rt.citizenships.join(", ")}): ${rt.requirements}`,
        rt.minimum_investment ? ` Minimum ${fmtMoney(rt.minimum_investment.amount, rt.minimum_investment.currency)}.` : ""))) : null,
      sourceList(d.residency.sources));
    fold(body, "Company taxation", h("p", { class: "small muted" }, "Shown separately: company tax does not enter the personal tax scores."),
      h("p", null, `Headline corporate income tax: ${fmtPct(d.corporate.cit_rate)}. ${d.corporate.summary}`),
      d.corporate.special_zones ? h("p", { class: "small" }, d.corporate.special_zones) : null, sourceList(d.corporate.sources));

    fold(body, "Safety, stability, institutions and quality of life", nontaxTable(p), indicatorTable(p));
    body.append(costSection(p));
    const sub = subRegions(e.parent ? e.parent : id, ctx);
    if (sub && !e.parent) body.append(sub);
    if (d.open_questions && d.open_questions.length) body.append(h("details", { class: "fold" }, h("summary", null, h("h3", null, `Open questions (${d.open_questions.length})`)), h("ul", null, d.open_questions.map((q) => h("li", null, q)))));
    body.append(h("p", { class: "small muted" }, `Researched ${d.researched_on} · ${displayCurrency()} at ECB rates of ${state.data.meta.fx_date}`));
    const dossier = h("div", { class: "dossier" });
    body.append(h("section", null, h("button", { onclick: () => showDossier(dossier, id) }, "Show the full dossier"), dossier));
  }).catch((err) => {
    if (state.selected !== id) return;
    clear(body).append(h("p", { class: "error" }, `Details could not be loaded: ${err.message}`));
  });
}

/** An occupied area or buffer zone: not a state, so no score, only what it is and whose it is. */
function renderTerritory(panel, e, ctx) {
  const t = e.territory;
  append(panel, [h("header", { class: "profile-head" }, h("h2", null, e.name), h("div", { class: "muted small" }, t.label)),
    h("div", { class: "ko-box", role: "note" }, h("p", null, t.explanation),
      h("ul", { class: "sources" }, t.sources.map((s) => h("li", null, extLink(s.url, s.title), ` — ${s.publisher}`)))),
    h("p", null, "For tax, residence and everything else, see ", h("button", { class: "linklike", onclick: () => ctx.select(e.parent) }, jur(e.parent)?.name ?? e.parent), ".")]);
}

const shortlistLabel = (id) => (state.shortlist.includes(id) ? "★ On shortlist" : "☆ Add to shortlist");
const compareLabel = (id) => (state.compare.includes(id) ? "− Remove from comparison" : "+ Compare");
