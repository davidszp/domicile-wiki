// C · Explorer: every researched place in a filterable table and a chart. Filters are
// the same ones Guided sets; weights are set in Settings.

import { h, fmtEur, displayCurrency, toDisplay, fromDisplay } from "../dom.js";
import { state, update, isIncomePersona } from "../state.js";
import { renderRankings, rankedRows } from "../panels/rankings.js";
import { nontaxOnly } from "../scoring.js";
import { scoreColor } from "../colors.js";
import { taxPerYear } from "../results.js";

const d3 = window.d3;
const compactMoney = (eur) => new Intl.NumberFormat("en-GB", { style: "currency", currency: displayCurrency(), notation: "compact", maximumFractionDigits: 1 }).format(toDisplay(eur));

export const VIEWS = [["table", "Table"], ["chart", "Chart"]]; // weights live in Settings, the calculator in Compare

function renderChart(body, ctx) {
  const rows = rankedRows().map((x) => ({ ...x, tax: taxPerYear(x.id), nontax: nontaxOnly(x.e, state.weights, state.cfg) }))
    .filter((x) => x.tax !== null && x.nontax !== null);
  body.append(h("h2", null, "Tax against everything else"),
    h("p", { class: "small muted" }, `Each dot is a place that passes your filters (${rows.length}). Left is less tax a year; up is a better non-tax score (safety, institutions, schools, health and the rest, with your weights). The best trade-offs sit top left. Colour is the overall score. A ring marks EU members.`));
  if (!rows.length) {
    body.append(h("p", { class: "muted" }, "No place with both figures passes the filters."));
    return;
  }
  const W = 760, H = 460, m = { t: 14, r: 18, b: 44, l: 48 };
  const x = d3.scaleSqrt().domain([0, d3.max(rows, (d) => d.tax) || 1]).nice().range([m.l, W - m.r]);
  const y = d3.scaleLinear().domain([Math.max(0, (d3.min(rows, (d) => d.nontax) ?? 0) - 5), 100]).nice().range([H - m.b, m.t]);
  const svg = d3.create("svg").attr("class", "chart-svg").attr("viewBox", `0 0 ${W} ${H}`).attr("role", "img")
    .attr("aria-label", "Scatter chart of tax a year against the non-tax score");
  svg.append("g").attr("class", "axis").attr("transform", `translate(0,${H - m.b})`)
    .call(d3.axisBottom(x).tickValues(d3.ticks(0, toDisplay(x.domain()[1]), 5).map(fromDisplay)).tickFormat(compactMoney));
  svg.append("g").attr("class", "axis").attr("transform", `translate(${m.l},0)`).call(d3.axisLeft(y).ticks(6));
  svg.append("text").attr("class", "axis-label").attr("x", W - m.r).attr("y", H - 8).attr("text-anchor", "end")
    .text(`${isIncomePersona() ? "Income tax and social security" : "Tax"} a year (${displayCurrency()}, square-root scale)`);
  svg.append("text").attr("class", "axis-label").attr("x", m.l).attr("y", m.t - 2).attr("dx", 6).text("Non-tax score");
  const g = svg.append("g").selectAll("g").data(rows).join("g").attr("class", "dot")
    .attr("transform", (d) => `translate(${x(d.tax)},${y(d.nontax)})`).on("click", (ev, d) => ctx.select(d.id));
  g.append("circle").attr("r", (d) => (d.id === state.selected ? 7 : 5)).style("fill", (d) => scoreColor(d.r.score) ?? "var(--unscored)").classed("eu", (d) => Boolean(d.e.eu)).classed("selected", (d) => d.id === state.selected);
  g.append("title").text((d) => `${d.e.name}${d.e.eu ? " (EU)" : ""}: tax ${fmtEur(d.tax)} a year, non-tax ${d.nontax.toFixed(1)}, overall ${d.r.score?.toFixed(1) ?? "–"}`);
  // Name the best places (and the selected one) so the chart reads without hovering. A label goes to
  // the first free spot around its dot (right, left, above, below) and is left out when none is free.
  // Every dot is an obstacle too, so a name never covers another place.
  const placed = rows.map((d) => ({ x0: x(d.tax) - 6, x1: x(d.tax) + 6, y0: y(d.nontax) - 6, y1: y(d.nontax) + 6, id: d.id }));
  const free = (b) => b.x0 >= 0 && b.x1 <= W && b.y0 >= 0 && b.y1 <= H - m.b + 4
    && !placed.some((o) => o.id !== b.id && b.x0 < o.x1 && b.x1 > o.x0 && b.y0 < o.y1 && b.y1 > o.y0);
  const candidates = [...rows.filter((d) => d.id === state.selected), ...rows.slice(0, 16).filter((d) => d.id !== state.selected)];
  for (const d of candidates) {
    const cx = x(d.tax), cy = y(d.nontax), w = d.e.name.length * 6.3, hgt = 12;
    const spots = [[8, 4, "start", cx + 8, cy - 8], [-8, 4, "end", cx - 8 - w, cy - 8], [0, -9, "middle", cx - w / 2, cy - 20], [0, 17, "middle", cx - w / 2, cy + 6]];
    const spot = spots.find(([, , , bx, by]) => free({ x0: bx, x1: bx + w, y0: by, y1: by + hgt, id: d.id }));
    if (!spot) continue;
    placed.push({ x0: spot[3], x1: spot[3] + w, y0: spot[4], y1: spot[4] + hgt });
    g.filter((o) => o.id === d.id).append("text").attr("x", spot[0]).attr("y", spot[1]).attr("text-anchor", spot[2]).text(d.e.name);
  }
  body.append(h("div", { class: "chart-wrap" }, svg.node()));
}

export function renderExplorer(stage, ctx) {
  stage.append(h("nav", { class: "subtabs", "aria-label": "Explorer views" }, VIEWS.map(([id, label]) =>
    h("button", { id: `tab-${id === "table" ? "rankings" : id}`, "aria-pressed": String(state.explorerView === id),
      onclick: () => update({ explorerView: id }) }, label))));
  const body = h("div", { class: "explorer-body", id: "panel" });
  stage.append(body);
  if (state.explorerView === "chart") renderChart(body, ctx);
  else renderRankings(body, ctx);
}
