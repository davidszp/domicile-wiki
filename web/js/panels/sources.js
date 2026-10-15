import { h, clear, extLink } from "../dom.js";
import { state, jur } from "../state.js";
import { loadSources } from "../data.js";
import { downloadCsv } from "./rankings.js";

let query = "";

export function renderSources(panel) {
  panel.append(h("h2", null, "Source register"),
    h("p", { class: "small muted" }, "Every tax claim links to its source, tax year, verification date and confidence. Indicator datasets are listed under Method."));
  const box = h("div", null, h("p", { class: "muted" }, "Loading sources…"));
  panel.append(box);
  loadSources().then((src) => {
    clear(box);
    const input = h("input", { type: "search", placeholder: "Filter by jurisdiction, metric, publisher…", value: query, "aria-label": "Filter sources" });
    const list = h("div");
    const draw = () => {
      clear(list);
      const q = query.trim().toLowerCase();
      const rows = src.tax.filter((s) => !q || [s.jurisdiction, jur(s.jurisdiction)?.name, s.metric, s.publisher, s.title, s.kind].join(" ").toLowerCase().includes(q));
      list.append(h("p", { class: "small" }, `${rows.length} of ${src.tax.length} tax sources`),
        h("div", { class: "table-wrap" }, h("table", { class: "grid small" },
          h("thead", null, h("tr", null, ["Jurisdiction", "Metric", "Source", "Type", "Tax year", "Verified", "Confidence"].map((x) => h("th", null, x)))),
          h("tbody", null, rows.slice(0, 400).map((s) => h("tr", null,
            h("td", null, jur(s.jurisdiction)?.name ?? s.jurisdiction, s.regime !== "standard" ? h("div", { class: "muted" }, s.regime.replaceAll("_", " ")) : null),
            h("td", null, s.metric.replace("_", " ")),
            h("td", null, extLink(s.url, s.title), h("div", { class: "muted" }, s.publisher)),
            h("td", null, s.kind.replace("_", " ")), h("td", null, s.tax_year), h("td", null, s.verified_on),
            h("td", null, h("span", { class: `conf conf-${s.confidence}` }, s.confidence))))))),
        rows.length > 400 ? h("p", { class: "small muted" }, "Showing the first 400; refine the filter or export.") : null);
    };
    input.addEventListener("input", () => { query = input.value; draw(); });
    box.append(input,
      h("button", { onclick: () => downloadCsv("domicile-sources.csv", ["jurisdiction", "regime", "metric", "title", "url", "publisher", "kind", "tax_year", "verified_on", "confidence", "verification"],
        src.tax.map((s) => [s.jurisdiction, s.regime, s.metric, s.title, s.url, s.publisher, s.kind, s.tax_year, s.verified_on, s.confidence, s.verification])) }, "Export CSV"),
      list);
    draw();
  }).catch((e) => clear(box).append(h("p", { class: "error" }, `Sources could not be loaded: ${e.message}`)));
}
