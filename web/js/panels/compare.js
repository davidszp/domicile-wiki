import { h, fmtScore, fmtEur } from "../dom.js";
import { state, update, jur, MAX_COMPARE, metricsFor, isIncomePersona } from "../state.js";
import { scoreChip, statusBadge } from "./profile.js";
import { downloadCsv } from "./rankings.js";

export function renderCompare(panel, ctx) {
  panel.append(h("h2", null, "Compare up to five jurisdictions"));
  const ids = state.compare.filter((id) => jur(id));
  if (!ids.length) {
    panel.append(h("p", null, "Add jurisdictions with “+ Compare” in a profile or ⊕ in the rankings."));
    if (state.shortlist.length) {
      panel.append(h("button", { onclick: () => update({ compare: state.shortlist.slice(0, MAX_COMPARE) }) }, "Compare my shortlist (first five)"));
    }
    return;
  }
  const evals = ids.map((id) => ({ id, e: jur(id), r: ctx.evalOf(id) }));
  const metrics = Object.entries(metricsFor());
  const rows = [
    ["Overall score", (x) => scoreChip(x.r.score, state.cfg), (x) => x.r.score],
    ["Tax score", (x) => scoreChip(x.r.taxScore, state.cfg), (x) => x.r.taxScore],
    ["Status", (x) => statusBadge(x.r.status), (x) => x.r.status],
    ["Data completeness", (x) => `${Math.round(x.r.completeness * 100)}%`, (x) => x.r.completeness.toFixed(3)],
    ["Regime used", (x) => (x.r.regime ? x.r.regime.name : "–"), (x) => (x.r.regime ? x.r.regime.name : "")],
    ["Annual Household Cost (not taxes)", (x) => (x.e.household_cost ? fmtEur(x.e.household_cost) : "not sourced"), (x) => x.e.household_cost ?? ""],
    ...(isIncomePersona() ? [] : [["Wealth tax", (x) => (x.e.flags ? x.e.flags.wealth_tax_type : "–"), (x) => (x.e.flags ? x.e.flags.wealth_tax_type : "")],
    ["Inheritance to children", (x) => (x.e.flags ? x.e.flags.inheritance_children.replaceAll("_", " ") : "–"), (x) => (x.e.flags ? x.e.flags.inheritance_children : "")],
    ["US tax treaty (dividend WHT)", (x) => (x.e.flags ? (x.e.flags.us_treaty ? "yes / n.a." : "no: 30% on US dividends") : "–"), (x) => (x.e.flags ? x.e.flags.us_treaty : "")]]),
    ...metrics.map(([k, m]) => [m.label, (x) => bar(x.r.metrics[k]), (x) => x.r.metrics[k] ?? ""]),
  ];
  const table = h("table", { class: "grid compare" },
    h("thead", null, h("tr", null, h("th", null, ""), evals.map((x) => h("th", null,
      h("button", { class: "linklike", onclick: () => ctx.select(x.id) }, x.e.name),
      h("button", { class: "icon", "aria-label": `Remove ${x.e.name}`, onclick: () => update({ compare: state.compare.filter((i) => i !== x.id) }) }, "×"))))),
    h("tbody", null, rows.map(([label, cell]) => h("tr", null, h("th", { scope: "row" }, label), evals.map((x) => h("td", null, cell(x)))))));
  panel.append(h("div", { class: "table-wrap" }, table),
    h("div", { class: "row-actions" },
      h("button", { onclick: () => downloadCsv("domicile-comparison.csv", ["metric", ...evals.map((x) => x.e.name)], rows.map(([label, , raw]) => [label, ...evals.map(raw)])) }, "Export CSV"),
      h("button", { onclick: () => update({ compare: [] }) }, "Clear")),
    h("p", { class: "small muted" }, "Bars show each metric's 0–100 score; missing data are shown as missing, never as zero tax."));
}

function bar(v) {
  if (v === null || v === undefined) return h("span", { class: "muted" }, "missing");
  const b = h("span", { class: "bar" }, h("span", { class: "bar-fill" }));
  b.firstChild.style.setProperty("width", `${Math.max(0, Math.min(100, v))}%`);
  return h("span", { class: "bar-cell" }, b, h("span", { class: "num" }, fmtScore(v)));
}
