// B · Factbook: one page per place, an A–Z index by continent, and the method and sources pages.
// Simple shows the index and the country page only (method and sources are a link away in Advanced).

import { h } from "../dom.js";
import { state, update, entries, jur, isSimple } from "../state.js";
import { renderProfile, scoreChip, euBadge } from "../panels/profile.js";
import { renderMethodology } from "../panels/methodology.js";
import { renderSources } from "../panels/sources.js";
import { evalOf } from "../results.js";

const PAGES = [["index", "All countries"], ["article", "Country page"], ["method", "How scores work"], ["sources", "Sources"]];
let indexQuery = "";

function renderIndex(stage, ctx) {
  stage.append(h("h2", null, "All countries"),
    h("p", { class: "small muted" }, "Grouped by continent. The score is for the person and passport chosen on the left; grey means the tax rules are not researched yet. EU marks members of the European Union."));
  const input = h("input", { type: "search", id: "index-filter", placeholder: "Filter by name…", value: indexQuery, "aria-label": "Filter countries" });
  const onlyEu = h("input", { type: "checkbox", id: "index-eu" });
  onlyEu.checked = state.filters.euOnly;
  const list = h("div", { class: "index" });
  const draw = () => {
    list.replaceChildren();
    const q = indexQuery.trim().toLowerCase();
    const rows = entries().filter(([, e]) => e.level === "country" && (!q || e.name.toLowerCase().includes(q)) && (!onlyEu.checked || e.eu));
    const byContinent = new Map();
    for (const [id, e] of rows) {
      if (!byContinent.has(e.continent)) byContinent.set(e.continent, []);
      byContinent.get(e.continent).push([id, e]);
    }
    for (const [continent, items] of [...byContinent].sort()) {
      items.sort((a, b) => a[1].name.localeCompare(b[1].name));
      list.append(h("section", null, h("h3", null, `${continent} (${items.length})`),
        h("ul", { class: "index-list" }, items.map(([id, e]) => h("li", null,
          h("span", { class: "index-score" }, e.researched ? scoreChip(evalOf(id).score, state.cfg) : h("span", { class: "chip unscored", title: "Not researched" }, "–")),
          h("button", { class: "linklike", onclick: () => ctx.select(id) }, e.name), euBadge(e))))));
    }
    if (!rows.length) list.append(h("p", { class: "muted" }, "No country matches."));
  };
  input.addEventListener("input", () => { indexQuery = input.value; draw(); });
  onlyEu.addEventListener("change", () => update({ filters: { ...state.filters, euOnly: onlyEu.checked } }));
  stage.append(h("div", { class: "row-actions" }, input, h("label", { class: "chk" }, onlyEu, "EU members only")), list);
  draw();
}

export function renderFactbook(stage, ctx) {
  const page = state.factbookPage === "article" && !state.selected ? "index" : state.factbookPage;
  const tabs = isSimple() ? PAGES.filter(([id]) => id === "index" || id === "article" || id === page) : PAGES;
  stage.append(h("nav", { class: "subtabs", "aria-label": "Factbook pages" }, tabs.map(([id, label]) =>
    h("button", { id: `fb-${id}`, "aria-pressed": String(page === id), disabled: id === "article" && !state.selected,
      onclick: () => update({ factbookPage: id }) }, id === "article" && state.selected ? jur(state.selected)?.name ?? label : label))));
  const body = h("div", { class: "article", id: "panel" });
  stage.append(body);
  if (page === "article") renderProfile(body, ctx);
  else if (page === "index") renderIndex(body, ctx);
  else if (page === "method") renderMethodology(body);
  else renderSources(body);
}
