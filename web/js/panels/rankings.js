import { h, fmtScore, fmtEur, moneyText, displayCurrency } from "../dom.js";
import { state, update, entries, jur, regimeOpts, toggleIn, MAX_COMPARE, metricsFor, taxMetrics, isIncomePersona, personaCfg, personaNoun, isSimple, FILTER_DEFAULTS, SIMPLE_FILTERS } from "../state.js";
import { rank, reweightTaxShare } from "../scoring.js";
import { scoreChip, statusBadge, euBadge, redFlagBadge, advancedLink } from "./profile.js";
import { residenceShort } from "./immigration.js";
import { evalOf, taxPerYear } from "../results.js";

// Filters live in the shared state: Guided's deal-breakers are the same switches. In Simple, the
// filters it does not show count at their defaults.
const F = () => (isSimple() ? { ...FILTER_DEFAULTS, ...Object.fromEntries(SIMPLE_FILTERS.map((k) => [k, state.filters[k]])) } : state.filters);
const setFilter = (key, value) => update({ filters: { ...state.filters, [key]: value } });

// "Tax-free" includes exemptions with conditions; the profile says which conditions.
export const TAX_FREE = ["fully_exempt", "exempt_with_conditions"];
const STATUS_ORDER = { insufficient: 0, provisional: 1, verified: 2 };

function passes(id, e, r) {
  const filters = F();
  if (filters.euOnly && !e.eu) return false;
  if (filters.mediterranean && !state.cfg.regions.mediterranean.members.includes(e.parent || id)) return false;
  if (filters.level === "countries" && e.level !== "country") return false;
  if (filters.level === "regions" && e.level !== "region") return false;
  if (filters.continent && e.continent !== filters.continent) return false;
  if (STATUS_ORDER[r.status] < STATUS_ORDER[filters.minStatus]) return false;
  if (filters.shortlistOnly && !state.shortlist.includes(id)) return false;
  if (isIncomePersona()) return !filters.lowIncomeTax || r.metrics.income_tax >= 75;
  const fl = e.flags || {};
  if (filters.noWealthTax && fl.wealth_tax_type !== "none") return false;
  if (filters.familyInheritsFree && !(TAX_FREE.includes(fl.inheritance_children) && TAX_FREE.includes(fl.inheritance_spouse))) return false;
  if (filters.lowCgt && !(r.metrics.capital_gains >= 75)) return false;
  if (filters.goodDividends && !(r.metrics.dividends >= 75)) return false;
  return true;
}

export function rankedRows(ev = evalFn) {
  const filters = F();
  const all = entries().filter(([, e]) => e.researched);
  let rows = rank(all, state.weights, state.citizenship, state.cfg, filters.sort === "tax" ? "tax" : "score", regimeOpts(), ev);
  if (filters.sort === "cost") rows = rows.filter((x) => x.e.household_cost).sort((a, b) => a.e.household_cost - b.e.household_cost);
  return rows.filter(({ id, e, r }) => passes(id, e, r));
}

function csvCell(v) {
  const s = v === null || v === undefined ? "" : String(v);
  // Neutralise spreadsheet formula injection, then quote.
  const safe = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
  return `"${safe.replaceAll('"', '""')}"`;
}

export function downloadCsv(filename, header, rows) {
  const text = [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n");
  const blob = new Blob(["﻿" + text], { type: "text/csv;charset=utf-8" });
  const a = h("a", { download: filename });
  a.href = URL.createObjectURL(blob);
  document.body.append(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(a.href);
    a.remove();
  }, 0);
}

function exportRows(rows) {
  const metrics = Object.keys(metricsFor());
  downloadCsv(`domicile-ranking-${state.persona}-${state.citizenship}.csv`,
    ["rank", "id", "name", "parent", "overall", "tax_score", "status", "completeness", "regime", ...metrics, "annual_household_cost_eur"],
    rows.map(({ id, e, r }, i) => [i + 1, id, e.name, e.parent || "", r.score, r.taxScore, r.status, r.completeness.toFixed(3),
      r.regime ? r.regime.name : "", ...metrics.map((m) => r.metrics[m] ?? ""), e.household_cost ?? ""]));
}

function control(label, el) {
  return h("label", { class: "ctl" }, h("span", null, label), el);
}

function select(options, key) {
  const s = h("select", { id: `f-${key}`, onchange: (ev) => setFilter(key, ev.target.value) }, options.map(([v, l]) => h("option", { value: v }, l)));
  s.value = F()[key];
  return s;
}

function check(label, key) {
  const c = h("input", { type: "checkbox", id: `f-${key}`, onchange: (ev) => setFilter(key, ev.target.checked) });
  c.checked = F()[key];
  return h("label", { class: "chk" }, c, label);
}

// Sensitivity needs five full re-rankings; cache them for the current weights and options.
let sensCache = { key: null, base: null, ranks: null };

function sensitivity() {
  const shares = state.cfg.sensitivity_tax_shares;
  const key = JSON.stringify([state.persona, state.weights, state.citizenship, regimeOpts()]);
  if (sensCache.key !== key) {
    const all = entries().filter(([, e]) => e.researched && e.level === "country");
    sensCache = {
      key,
      base: rank(all, state.weights, state.citizenship, state.cfg, "score", regimeOpts(), evalFn),
      ranks: shares.map((s) => {
        const w = reweightTaxShare(state.weights, s, taxMetrics());
        return new Map(rank(all, w, state.citizenship, state.cfg, "score", regimeOpts()).map((x, i) => [x.id, { pos: i + 1, score: x.value }]));
      }),
    };
  }
  const { base, ranks } = sensCache;
  const top = base.slice(0, 20);
  const taxNow = taxMetrics().reduce((a, m) => a + state.weights[m], 0) / Object.values(state.weights).reduce((a, b) => a + b, 0);
  return h("section", null, h("h3", null, "Sensitivity"),
    h("p", { class: "small muted" }, `Rank if taxes carried more weight (now ${(taxNow * 100).toFixed(0)}%). Countries only.`),
    h("div", { class: "table-wrap" }, h("table", { class: "grid small" },
      h("thead", null, h("tr", null, h("th", null, "Jurisdiction"), h("th", null, "Now"), ...shares.map((s) => h("th", null, `Tax ${s * 100}%`)))),
      h("tbody", null, top.map((x, i) => h("tr", null, h("td", null, x.e.name), h("td", null, `#${i + 1}`),
        ...ranks.map((m) => {
          const v = m.get(x.id);
          const delta = v ? i + 1 - v.pos : 0;
          return h("td", { class: delta > 0 ? "up" : delta < 0 ? "down" : "" }, v ? `#${v.pos} (${fmtScore(v.score)})` : "–");
        })))))));
}

const evalFn = (id) => evalOf(id); // cached evaluation for the current settings

export function renderRankings(panel, ctx) {
  const continents = [...new Set(entries().filter(([, e]) => e.researched).map(([, e]) => e.continent))].sort();
  const persona = personaCfg();
  const familyFilters = isIncomePersona()
    ? [check("Low income tax and social security (score ≥ 75)", "lowIncomeTax")]
    : [check("No general wealth tax", "noWealthTax"),
      check("No inheritance tax for spouse or children", "familyInheritsFree"),
      check("Low capital-gains tax (score ≥ 75)", "lowCgt"),
      check("Favourable dividend tax (score ≥ 75)", "goodDividends")];
  panel.append(h("h2", null, `Rankings: ${persona.label}`),
    h("p", { class: "small muted" }, "Researched places only."),
    h("div", { class: "filters" },
      control("Rank by", select([["score", `Overall ${personaNoun()} score`], ["tax", "Tax score only"], ["cost", "Annual Household Cost (lowest first)"]], "sort")),
      control("Show", select([["countries", "Countries"], ["regions", "Regions (cantons, communities, emirates, states)"], ["all", "All"]], "level")),
      control("Continent", select([["", "All"], ...continents.map((c) => [c, c])], "continent")),
      control("Minimum confidence", select([["provisional", "Provisional or verified"], ["verified", "Verified only"]], "minStatus")),
      check("EU members only", "euOnly"),
      check("Country on the Mediterranean", "mediterranean"),
      ...familyFilters,
      check("Shortlist only", "shortlistOnly")));

  const rows = rankedRows();
  panel.append(h("div", { class: "row-actions" },
    h("span", { class: "small" }, `${rows.length} jurisdictions`),
    h("button", { onclick: () => exportRows(rows) }, "Export CSV")));
  const table = h("table", { class: "grid rank-table" },
    h("thead", null, h("tr", null, h("th", null, "#"), h("th", null, "Jurisdiction"), h("th", null, "Overall"), h("th", null, "Tax"),
      h("th", null, "Status"), h("th", { class: "num", title: isIncomePersona() ? "Income tax and social security a year" : "Expected tax a year on the reference portfolio, under the cheapest regime counted" }, `Tax a year (${displayCurrency()})`), h("th", { title: isIncomePersona() ? `Annual Household Cost: ${moneyText(persona.cost.description)} Not taxes.` : "Annual Household Cost: estimate for a family of five (prime rent, three international-school places, health insurance, housekeeper, other spending). Not taxes." }, `Annual Household Cost (${displayCurrency()})`), h("th", null, h("span", { class: "sr-only" }, "Actions")))),
    h("tbody", null, rows.map(({ id, e, r }, i) => h("tr", { class: state.selected === id ? "sel" : "" },
      h("td", null, String(i + 1)),
      h("td", null, h("button", { class: "linklike", onclick: () => ctx.select(id) }, e.name),
        e.parent ? h("span", { class: "muted small" }, ` ${jur(e.parent)?.name ?? ""}`) : null, euBadge(e), redFlagBadge(e),
        r.regime && r.regime.type !== "standard" ? h("div", { class: "small muted" }, r.regime.type === "structure" ? `via ${r.regime.name}` : r.regime.name) : null),
      h("td", null, scoreChip(r.score, state.cfg)),
      h("td", null, scoreChip(r.taxScore, state.cfg)),
      h("td", null, statusBadge(r.status)),
      h("td", { class: "num small" }, taxPerYear(id) === null ? "–" : fmtEur(taxPerYear(id))),
      h("td", { class: "num small", title: e.cost_from_parent ? `National figures (${e.cost_from_parent})` : null }, e.household_cost ? fmtEur(e.household_cost) + (e.cost_from_parent ? "*" : "") : "–"),
      h("td", null,
        h("button", { class: "icon", title: "Shortlist", "aria-label": `Shortlist ${e.name}`, "aria-pressed": String(state.shortlist.includes(id)),
          onclick: () => toggleIn("shortlist", id, { persist: true }) },
          state.shortlist.includes(id) ? "★" : "☆"),
        h("button", { class: "icon", title: "Compare", "aria-label": `Compare ${e.name}`, "aria-pressed": String(state.compare.includes(id)),
          disabled: !state.compare.includes(id) && state.compare.length >= MAX_COMPARE,
          onclick: () => toggleIn("compare", id, { max: MAX_COMPARE }) },
          state.compare.includes(id) ? "⊖" : "⊕"))))));
  panel.append(h("div", { class: "table-wrap" }, table));
  panel.append(sensitivity());
}

// ------------------------------------------------------------------ Simple

const SIMPLE_FIRST = 10, SIMPLE_MORE = 25;
let simpleShown = SIMPLE_FIRST;

/** Simple's filters as toggle chips: "All" clears them. The same switches as Guided's deal-breakers. */
function chips() {
  const keys = isIncomePersona()
    ? [["euOnly", "EU only"], ["lowIncomeTax", "Low income tax"], ["shortlistOnly", "My shortlist"]]
    : [["euOnly", "EU only"], ["noWealthTax", "No wealth tax"], ["familyInheritsFree", "Family inherits tax-free"], ["shortlistOnly", "My shortlist"]];
  const none = keys.every(([k]) => !F()[k]);
  return h("div", { class: "chips", role: "group", "aria-label": "Filters" },
    h("button", { type: "button", class: "chip-btn", "aria-pressed": String(none), onclick: () => update({ filters: { ...state.filters, ...Object.fromEntries(keys.map(([k]) => [k, false])) } }) }, "All"),
    keys.map(([k, label]) => h("button", { type: "button", class: "chip-btn", id: `sf-${k}`, "aria-pressed": String(Boolean(F()[k])), onclick: () => setFilter(k, !F()[k]) }, label)));
}

/** Simple Explorer: the ranked list with five columns, a few filters and paging. */
export function renderSimpleRankings(panel, ctx) {
  const rows = rankedRows();
  const shown = rows.slice(0, simpleShown);
  panel.append(h("h2", null, "Every place, ranked for you"), chips());
  if (!rows.length) {
    panel.append(h("p", { class: "muted" }, "No place passes these filters."));
    return;
  }
  const table = h("table", { class: "grid rank-table simple-rank" },
    h("thead", null, h("tr", null, h("th", null, "#"), h("th", null, "Place"), h("th", null, "Score"),
      h("th", { class: "num" }, isIncomePersona() ? "Income tax and social security a year" : "Tax a year"), h("th", { class: "num" }, "Living costs a year"),
      h("th", null, "To live there"), h("th", null, h("span", { class: "sr-only" }, "Actions")))),
    h("tbody", null, shown.map(({ id, e, r }, i) => h("tr", null,
      h("td", null, String(i + 1)),
      h("td", null, h("button", { class: "linklike", onclick: () => ctx.select(id) }, e.name), " ", euBadge(e), redFlagBadge(e)),
      h("td", null, scoreChip(r.score, state.cfg)),
      h("td", { class: "num" }, taxPerYear(id) === null ? "–" : fmtEur(taxPerYear(id))),
      h("td", { class: "num" }, e.household_cost ? fmtEur(e.household_cost) : "–"),
      h("td", null, residenceShort(e)),
      h("td", null,
        h("button", { class: "icon", title: "Shortlist", "aria-label": `Shortlist ${e.name}`, "aria-pressed": String(state.shortlist.includes(id)),
          onclick: () => toggleIn("shortlist", id, { persist: true }) }, state.shortlist.includes(id) ? "★" : "☆"),
        h("button", { class: "icon", title: "Compare", "aria-label": `Compare ${e.name}`, "aria-pressed": String(state.compare.includes(id)),
          disabled: !state.compare.includes(id) && state.compare.length >= MAX_COMPARE,
          onclick: () => toggleIn("compare", id, { max: MAX_COMPARE }) }, state.compare.includes(id) ? "⊖" : "⊕"))))));
  panel.append(h("div", { class: "table-wrap" }, table),
    h("div", { class: "row-actions" }, h("span", { class: "small" }, `${shown.length} of ${rows.length} places.`),
      rows.length > shown.length ? h("button", { id: "simple-more", onclick: () => { simpleShown += SIMPLE_MORE; ctx.refresh(); } }, `Show ${Math.min(SIMPLE_MORE, rows.length - shown.length)} more`) : null),
    advancedLink(ctx, "Regions, every filter, other rankings, the chart and CSV"));
}
