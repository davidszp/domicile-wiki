// "Wealth over 60 years": the family's portfolio year by year under each way of holding it in this
// country (personally, a company, a foundation), with the inheritance tax at each death.
// Data: profiles[<ID>].projection, built by domicile/projection.py from data/recipes/<ID>.json.

import { h, append, fmtEur, displayCurrency, toDisplay, fromDisplay } from "../dom.js";

const d3 = window.d3;
const SERIES = 4; // .proj-s0 … .proj-s3 in app.css
const compactMoney = (eur) => new Intl.NumberFormat("en-GB", { style: "currency", currency: displayCurrency(), notation: "compact", maximumFractionDigits: 0 }).format(toDisplay(eur));
const pct = (x) => `${Math.round(x * 1000) / 10}%`;

/** Wealth (EUR) at the end of each year, with the start value as year 0. In a year with a death the line
 * reaches the wealth before inheritance tax, then drops straight down to what the heirs keep. */
function series(path, start) {
  return [[0, start], ...path.years.flatMap(([w, , inh], i) => (inh ? [[i + 1, (w + inh) * 1e3], [i + 1, w * 1e3]] : [[i + 1, w * 1e3]]))];
}

/** Line chart of wealth per year. ``lines``: [{ name, years, cls?, dashed? }]; a line without ``cls`` gets the
 * next series colour. Returns [chart, legend]. */
export function chart(lines, a, label = `Portfolio over ${a.years} years for each way of holding it; the table below gives the figures`) {
  const W = 760, H = 360, m = { t: 16, r: 16, b: 40, l: 56 };
  lines = lines.map((p, i) => ({ ...p, cls: p.cls || `proj-s${i % SERIES}`, pts: series(p, a.portfolio) }));
  const max = d3.max(lines, (l) => d3.max(l.pts, (d) => d[1])) || 1;
  const x = d3.scaleLinear().domain([0, a.years]).range([m.l, W - m.r]);
  const y = d3.scaleLinear().domain([0, max]).nice().range([H - m.b, m.t]);
  const svg = d3.create("svg").attr("class", "chart-svg proj-chart").attr("viewBox", `0 0 ${W} ${H}`).attr("role", "img").attr("aria-label", label);
  svg.append("g").attr("class", "axis").attr("transform", `translate(0,${H - m.b})`).call(d3.axisBottom(x).ticks(6).tickFormat((t) => `${t}`));
  svg.append("g").attr("class", "axis").attr("transform", `translate(${m.l},0)`)
    .call(d3.axisLeft(y).tickValues(d3.ticks(0, toDisplay(y.domain()[1]), 5).map(fromDisplay)).tickFormat(compactMoney));
  svg.append("text").attr("class", "axis-label").attr("x", W - m.r).attr("y", H - 6).attr("text-anchor", "end").text("Years from now");
  svg.append("text").attr("class", "axis-label").attr("x", m.l).attr("y", m.t - 4).attr("dx", 6).text("Portfolio value, inflation adjusted");
  a.deaths.forEach((yr, i) => {
    svg.append("line").attr("class", "proj-death").attr("x1", x(yr)).attr("x2", x(yr)).attr("y1", m.t).attr("y2", H - m.b);
    svg.append("text").attr("class", "axis-label").attr("x", x(yr)).attr("y", H - m.b - 6).attr("dx", -4).attr("text-anchor", "end")
      .text(i === 0 ? "parents' death" : "next generation");
  });
  const line = d3.line().x((d) => x(d[0])).y((d) => y(d[1]));
  for (const l of lines) {
    svg.append("path").attr("class", `proj-line ${l.cls}${l.dashed ? " proj-dashed" : ""}`).attr("d", line(l.pts))
      .append("title").text(`${l.name}: ${fmtEur(l.pts.at(-1)[1])} after ${a.years} years`);
  }
  const legend = h("ul", { class: "proj-legend small" }, lines.map((l) => h("li", null,
    h("span", { class: `proj-key ${l.cls}${l.dashed ? " proj-dashed" : ""}`, "aria-hidden": "true" }), l.name)));
  return [h("div", { class: "chart-wrap" }, svg.node()), legend];
}

function table(paths, ref, a) {
  const at = (p, yr) => (p.years[yr - 1] ? Math.max(0, p.years[yr - 1][0]) * 1e3 : 0); // a path that ran out stays at 0
  const sum = (p, k) => p.years.reduce((s, y) => s + y[k], 0) * 1e3;
  const mid = a.deaths[0];
  const row = (p, cls) => h("tr", { class: cls || "" }, h("td", null, p.name),
    h("td", { class: "num" }, fmtEur(at(p, mid))), h("td", { class: "num" }, fmtEur(at(p, a.years))),
    h("td", { class: "num" }, fmtEur(sum(p, 1))), h("td", { class: "num" }, fmtEur(sum(p, 2))));
  return h("div", { class: "table-wrap" }, h("table", { class: "grid small" },
    h("thead", null, h("tr", null, h("th", null, "Way of holding it"), h("th", null, `After ${mid} years`), h("th", null, `After ${a.years} years`),
      h("th", null, "Taxes and costs paid"), h("th", null, "Inheritance tax"))),
    h("tbody", null, paths.map((p) => row(p)), ref ? row(ref, "muted") : null)));
}

const REASON = {
  remittance_basis: "Remittance basis: foreign income (and in some countries foreign gains) is taxed only when it is brought into the country."
    + " The family's spending here has to be brought in, so the tax depends on whether that money counts as income or as capital,"
    + " which the projection cannot follow year by year. The regime is therefore not drawn.",
};

/** Regimes the family could use that the chart does not draw, with why. */
function leftOut(list) {
  if (!list.length) return null;
  const reasons = [...new Set(list.map((x) => x.reason))].filter((r) => REASON[r]);
  return h("div", { class: "open-q small" }, h("strong", null, "Not drawn: "),
    h("ul", null, list.map((x) => h("li", null, h("strong", null, `${x.name}. `), x.note))),
    reasons.map((r) => h("p", { class: "muted" }, REASON[r])));
}

/** Section for the HNWI country page; null when the country has no recipe yet. ``caveat``: a warning shown above
 * the chart, e.g. that residence is hard to get. */
export function projectionSection(p, caveat = null) {
  const pr = p?.projection;
  if (!pr) return null;
  const a = pr.assumptions;
  const runsOut = (x) => x.missing === "the portfolio runs out" && x.years.length;
  const ok = pr.paths.filter((x) => x.id !== "no_tax" && (!x.missing || runsOut(x)));
  const missing = pr.paths.filter((x) => x.missing && !runsOut(x));
  const ref = pr.paths.find((x) => x.id === "no_tax");
  const sec = h("details", { class: "fold", open: "" }, h("summary", null, h("h3", null, `Wealth over ${a.years} years`)));
  append(sec, [
    h("p", null, `What the family's ${fmtEur(a.portfolio)} portfolio becomes if it lives here for ${a.years} years, spending ${fmtEur(a.spending)} a year,`
      + ` for each way of holding it. Inheritance tax is paid when the parents die (year ${a.deaths[0]}) and again a generation later.`),
    caveat ? h("p", { class: "open-q small" }, caveat) : null,
    ok.length ? chart(ok, a) : null,
    ok.length ? table(ok, ref, a) : null,
    missing.map((x) => h("p", { class: "small muted" }, `${x.name}: not computable (${x.missing}).`)),
    leftOut(pr.recipe.left_out || []),
    ok.filter(runsOut).map((x) => h("p", { class: "small muted" }, `${x.name}: the money runs out in year ${x.years.length}: taxes and spending outgrow the portfolio.`)),
    h("ul", { class: "small" }, ok.filter((x) => x.note).map((x) => h("li", null, h("strong", null, `${x.name}. `), x.note))),
    h("details", { class: "small" }, h("summary", null, "Assumptions"),
      h("ul", null,
        h("li", null, `${pct(a.dividend_yield)} dividends and ${pct(a.price_growth)} price return a year, ${pct(a.inflation)} inflation; all figures in today's money.`),
        h("li", null, `${pct(a.realisation)} of each year's price gain is sold and taxed that year; the rest stays unrealised and is only taxed if the country taxes gains at death.`),
        h("li", null, `${pct(a.foreign_share)} invested abroad, ${pct(a.source_wht)} withholding on foreign dividends (30% on US dividends without a US tax treaty).`),
        h("li", null, `A ${fmtEur(a.home)} home here counts for wealth and inheritance tax; ${a.children} children inherit equally. Steady returns, no market cycles.`),
        h("li", null, "Spending is paid from income; a structure's payout is grossed up for its payout tax."),
        pr.recipe.assumptions.map((x) => h("li", null, x)))),
    pr.recipe.open_questions.length ? h("div", { class: "open-q small" }, h("strong", null, "Open questions: "),
      h("ul", null, pr.recipe.open_questions.map((q) => h("li", null, q)))) : null,
    h("p", { class: "small muted" }, `Recipe checked ${pr.recipe.researched_on}. An illustration under steady assumptions, not a forecast or tax advice.`),
  ]);
  return sec;
}
