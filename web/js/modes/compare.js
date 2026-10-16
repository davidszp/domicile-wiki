// D · Compare: where you live now against up to four places, every figure shown as the change
// from home (better is blue, worse is orange), and the tax calculator for your own figures.

import { h, fmtEur, fmtScore, displayCurrency } from "../dom.js";
import { state, update, entries, jur, toggleIn, MAX_COMPARE, metricsFor, isIncomePersona } from "../state.js";
import { rankedRows, downloadCsv } from "../panels/rankings.js";
import { statusBadge, euBadge, redFlagBadge } from "../panels/profile.js";
import { evalOf, taxPerYear } from "../results.js";
import { residenceShort } from "../panels/immigration.js";
import { renderCalculator } from "../panels/calculator.js";
import { successionShort } from "../panels/succession.js";
import { INHERITANCE, INHERITANCE_RANK, capitalise } from "../labels.js";
import { loadProfile } from "../data.js";
import { chart as projectionChart } from "../panels/projection.js";

const MAX_PLACES = MAX_COMPARE - 1; // home takes one of the five columns
const NEUTRAL_POINTS = 2; // score differences smaller than this are shown without colour
const WEALTH = { none: "None", limited: "Limited", broad: "Yes" };

/** Wealth after the projection's horizon under the place's best way of holding the portfolio (data/recipes). */
const bestProjection = (id) => {
  const ends = Object.entries(jur(id).projection || {}).filter(([k, v]) => k !== "no_tax" && v !== null).map(([, v]) => v);
  return ends.length ? Math.max(...ends) : null;
};
const signed = (v, fmt) => (v > 0 ? "+" : v < 0 ? "−" : "±") + fmt(Math.abs(v));

/** Row definitions: value(id) for display, num(id) for the delta, and which direction is better. */
function rowDefs() {
  const rows = [
    { label: "Overall score", num: (id) => evalOf(id).score, show: (v) => fmtScore(v), better: "higher", points: true },
    { label: isIncomePersona() ? "Income tax and social security a year" : "Tax a year", num: taxPerYear, show: fmtEur, better: "lower" },
    { label: "Annual Household Cost", num: (id) => jur(id).household_cost ?? null, show: fmtEur, better: "lower" },
    { label: "Tax regime used", text: (id) => evalOf(id).regime?.name ?? "–" },
    { label: "EU member", text: (id) => (jur(id).eu ? "Yes" : "No") },
    { label: "Residence route for you", text: (id) => residenceShort(jur(id)), skipHome: true },
  ];
  if (!isIncomePersona()) {
    rows.splice(2, 0, { label: "Wealth after 60 years", num: bestProjection, show: fmtEur, better: "higher" });
    rows.push(
      { label: "Forced heirship", text: (id) => successionShort(jur(id)).text, rank: (id) => successionShort(jur(id)).rank },
      { label: "Spouse inherits", text: (id) => (jur(id).flags?.inheritance_spouse ? capitalise(INHERITANCE[jur(id).flags.inheritance_spouse]) : "not researched"), rank: (id) => INHERITANCE_RANK[jur(id).flags?.inheritance_spouse] },
      { label: "Children inherit", text: (id) => capitalise(INHERITANCE[jur(id).flags?.inheritance_children]) ?? "–", rank: (id) => INHERITANCE_RANK[jur(id).flags?.inheritance_children] },
      { label: "Wealth tax", text: (id) => WEALTH[jur(id).flags?.wealth_tax_type] ?? "–", rank: (id) => ({ none: 2, limited: 1, broad: 0 })[jur(id).flags?.wealth_tax_type] });
  }
  for (const [k, m] of Object.entries(metricsFor())) {
    if (["capital_gains", "dividends", "wealth_tax", "inheritance", "income_tax"].includes(k)) continue; // already in money above
    rows.push({ label: m.label, num: (id) => evalOf(id).metrics[k] ?? null, show: fmtScore, better: "higher", points: true, group: "score" });
  }
  return rows;
}

function deltaClass(row, d) {
  if (d === null || d === 0) return "";
  if (row.points && Math.abs(d) < NEUTRAL_POINTS) return "";
  const good = row.better === "higher" ? d > 0 : d < 0;
  return good ? "better" : "worse";
}

function cell(row, id, home) {
  if (row.text) {
    if (row.skipHome && id === home) return h("td", { class: "muted" }, "–");
    const t = row.text(id);
    if (!home || id === home || !row.rank) return h("td", null, t);
    const a = row.rank(id), b = row.rank(home);
    return h("td", { class: a === undefined || b === undefined || a === b ? "" : a > b ? "better" : "worse" }, t);
  }
  const v = row.num(id);
  if (v === null || v === undefined) return h("td", { class: "muted" }, "–");
  const base = home && id !== home ? row.num(home) : null;
  if (base === null || base === undefined) return h("td", { class: "num" }, row.show(v));
  const d = v - base;
  return h("td", { class: `num ${deltaClass(row, d)}` }, row.show(v), h("span", { class: "delta" }, signed(d, row.points ? (x) => x.toFixed(1) : fmtEur)));
}

/** What the family keeps or loses each year: tax plus household cost, against home. */
function netChange(id, home) {
  const t = taxPerYear(id), c = jur(id).household_cost, th = taxPerYear(home), ch = jur(home).household_cost;
  if ([t, c, th, ch].some((v) => v === null || v === undefined)) return null;
  return th + ch - (t + c);
}

function placeSelect(label, id, value, options, onchange) {
  const s = h("select", { id, onchange: (ev) => ev.target.value && onchange(ev.target.value) },
    h("option", { value: "" }, label), options.map(([oid, e]) => h("option", { value: oid }, e.parent ? `${e.name} (${jur(e.parent)?.name ?? e.parent})` : e.name)));
  s.value = value || "";
  return s;
}

export function renderCompare(stage, ctx) {
  stage.append(h("nav", { class: "subtabs", "aria-label": "Compare views" },
    h("button", { id: "cmp-tab-side", "aria-pressed": String(state.compareView !== "calculator"), onclick: () => update({ compareView: "side" }) }, "Side by side"),
    h("button", { id: "cmp-tab-calculator", "aria-pressed": String(state.compareView === "calculator"), onclick: () => update({ compareView: "calculator" }) }, "Tax calculator")));
  if (state.compareView === "calculator") {
    const body = h("div", { class: "explorer-body", id: "panel" });
    stage.append(body);
    renderCalculator(body);
    return;
  }
  renderSideBySide(stage, ctx);
}

function renderSideBySide(stage, ctx) {
  const home = state.home && jur(state.home) ? state.home : null;
  const places = state.compare.filter((id) => id !== home && jur(id)).slice(0, MAX_PLACES);
  const pool = entries().filter(([, e]) => e.researched).sort((a, b) => a[1].name.localeCompare(b[1].name));
  // Home can be any country: someone in Lebanon still wants to compare. Without tax research its tax
  // and cost cells stay empty, but safety, institutions and the rest still compare.
  const homes = entries().filter(([, e]) => e.level === "country").sort((a, b) => a[1].name.localeCompare(b[1].name));

  stage.append(h("header", { class: "stage-head" },
    h("h2", null, home ? `You live in ${jur(home).name}. What changes if you move?` : "What changes if you move?"),
    h("p", { class: "muted" }, "Every figure is shown next to where you live now. ", h("span", { class: "better" }, "Blue is better"), ", ", h("span", { class: "worse" }, "orange is worse"), ".")));

  const full = places.length >= MAX_PLACES;
  const add = placeSelect(full ? `${MAX_PLACES} places chosen: remove one to add another` : "+ Add a place…", "cmp-add", "", pool.filter(([id]) => id !== home && !places.includes(id)), (id) => toggleIn("compare", id, { max: MAX_COMPARE }));
  add.disabled = full;
  const top = rankedRows().map((x) => x.id).filter((id) => id !== home && !places.includes(id)).slice(0, MAX_PLACES - places.length);
  stage.append(h("div", { class: "row-actions compare-pick" },
    h("label", { class: "ctl" }, h("span", null, "Where you live now"), placeSelect("Choose your home…", "cmp-home", home, homes, (id) => update({ home: id }, { persist: true }))),
    h("label", { class: "ctl" }, h("span", null, `Add a place to compare (up to ${MAX_PLACES})`), add),
    places.length ? h("ul", { class: "cmp-places", "aria-label": "Places you are comparing" }, places.map((id) => h("li", null,
      h("button", { class: "cmp-place", "aria-label": `Remove ${jur(id).name}`, title: "Remove from the comparison",
        onclick: () => update({ compare: state.compare.filter((x) => x !== id) }) }, jur(id).name, h("span", { "aria-hidden": "true" }, " ×"))))) : null,
    top.length && places.length < MAX_PLACES ? h("button", { onclick: () => update({ compare: [...places, ...top] }) }, top.length === 1 ? "Add your best match" : `Add your ${top.length} best matches`) : null));

  if (!places.length) {
    stage.append(h("p", { class: "notice" }, "Add places with the menu above, with “+ Compare” in Guided, or from any country page."));
    if (!home) return;
  }
  const cols = home ? [home, ...places] : places;
  const rows = rowDefs();
  const nets = home ? places.map((id) => netChange(id, home)) : [];

  const head = h("tr", null, h("th", null, ""), cols.map((id) => h("th", { scope: "col", class: id === home ? "home-col" : "" },
    h("div", { class: "small muted" }, id === home ? "Now" : "If you move"),
    h("button", { class: "linklike", onclick: () => ctx.select(id) }, jur(id).name), " ", euBadge(jur(id)), redFlagBadge(jur(id)),
    id !== home ? h("button", { class: "icon col-remove", "aria-label": `Remove ${jur(id).name}`, onclick: () => update({ compare: state.compare.filter((x) => x !== id) }) }, "×") : null)));
  const netRow = home ? h("tr", { class: "net-row" }, h("th", { scope: "row" }, "You would keep each year", h("div", { class: "small muted" }, "Less tax and living costs than now; negative means it costs more")),
    cols.map((id, i) => (id === home ? h("td", { class: "muted" }, "–") : (() => {
      const n = nets[i - 1];
      return n === null ? h("td", { class: "muted" }, "missing data") : h("td", { class: `num big ${n > 0 ? "better" : n < 0 ? "worse" : ""}` }, signed(n, fmtEur));
    })()))) : null;
  const body = h("tbody", null, netRow, rows.map((row) => h("tr", { class: row.group === "score" ? "score-row-c" : "" }, h("th", { scope: "row" }, row.label), cols.map((id) => cell(row, id, home)))),
    h("tr", null, h("th", { scope: "row" }, "Data status"), cols.map((id) => h("td", null, statusBadge(evalOf(id).status)))));
  if (!isIncomePersona()) stage.append(projectionCompare(cols, home) || "");
  stage.append(h("div", { class: "table-wrap compare-wrap" }, h("table", { class: "grid compare-home" }, h("thead", null, head), body)));

  stage.append(h("div", { class: "row-actions" },
    h("button", { onclick: () => downloadCsv("domicile-comparison.csv", ["metric", ...cols.map((id) => jur(id).name)],
      rows.map((row) => [row.label, ...cols.map((id) => (row.text ? row.text(id) : row.num(id) ?? ""))])) }, "Download CSV"),
    places.length ? h("button", { onclick: () => update({ compare: [] }) }, "Clear places") : null),
    h("p", { class: "small muted" }, `Amounts in ${displayCurrency()} a year. Scores run from 0 to 100; differences under ${NEUTRAL_POINTS} points are left uncoloured. Missing data are shown as missing, never as zero tax. Tax is the expected amount for the person chosen on the left, under the cheapest regime counted.`));
}

/** "Wealth over 60 years" for the family: one line per place, each under its best way of holding the
 * portfolio, home dashed. Only places with a projection recipe have a line; the others are named below. */
function projectionCompare(cols, home) {
  const have = cols.filter((id) => bestProjection(id) !== null);
  if (!have.length) return null;
  const without = cols.filter((id) => !have.includes(id));
  const sec = h("details", { class: "fold proj-compare", open: "" }, h("summary", null, h("h3", null, "Wealth over 60 years")));
  const slot = h("p", { class: "small muted" }, "Loading…");
  sec.append(slot);
  Promise.all(have.map((id) => loadProfile(id).then((p) => [id, p.projection]))).then((list) => {
    const a = list[0][1].assumptions;
    let n = 0;
    const lines = list.map(([id, pr]) => {
      const best = pr.paths.filter((x) => x.id !== "no_tax" && !x.missing).reduce((b, x) => (!b || x.years.at(-1)[0] > b.years.at(-1)[0] ? x : b), null);
      const home_ = id === home;
      return { ...best, name: `${jur(id).name}${home_ ? " (now)" : ""}: ${best.name}`, cls: home_ ? "proj-home" : `proj-s${n++ % 4}`, dashed: home_ };
    });
    slot.replaceWith(
      h("p", null, `What the family's ${fmtEur(a.portfolio)} portfolio becomes over ${a.years} years, spending ${fmtEur(a.spending)} a year, in each place under its best way of holding it.`
        + ` Inheritance tax is paid when the parents die (year ${a.deaths[0]}) and again a generation later.`),
      ...projectionChart(lines, a, `Portfolio over ${a.years} years in each place compared; the row "Wealth after 60 years" in the table gives the figures`),
      without.length ? h("p", { class: "small muted proj-missing" }, `No projection yet for ${without.map((id) => jur(id).name).join(", ")}: it is being added country by country.`) : "",
      h("p", { class: "small muted" }, "Every way of holding the portfolio, with the assumptions, is on each country's page. An illustration under steady assumptions, not a forecast or tax advice."));
  }).catch(() => slot.replaceWith(h("p", { class: "small muted" }, "The projection could not be loaded.")));
  return sec;
}
