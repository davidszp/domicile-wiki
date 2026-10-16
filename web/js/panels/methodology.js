import { h, extLink, fmtPct, fmtEur, moneyText } from "../dom.js";
import { state, isIncomePersona } from "../state.js";
import { personaMethodology, personaCard } from "./persona.js";
import { calculatorAssumptions } from "./calculator.js";
import { normalizeWeights, bandRange } from "../scoring.js";

/** Folds the page: each h3 and the nodes after it (up to the next h3) become one closed section. */
function foldSections(panel) {
  let fold = null;
  for (const node of [...panel.childNodes]) {
    if (node.nodeName === "H3") {
      fold = h("details", { class: "fold" }, h("summary", null, h("h3", null, node.textContent)));
      node.replaceWith(fold);
    } else if (fold && !(node.classList && node.classList.contains("disclaimer"))) {
      fold.append(node);
    }
  }
}

export function renderMethodology(panel) {
  renderMethodologyContent(panel);
  foldSections(panel);
}

function renderMethodologyContent(panel) {
  if (isIncomePersona()) {
    panel.append(h("h2", null, "Methodology"), personaCard(), ...personaMethodology(),
      h("p", { class: "small muted" }, "Switch to HNWI on the left for the investment-tax methodology, the indicator datasets, colour bands and missing-data rules, which apply to every persona."));
    return;
  }
  const cfg = state.cfg;
  const meta = state.data.meta;
  const w = normalizeWeights(state.defaultWeights);
  const ref = cfg.reference_family;
  panel.append(h("h2", null, "Methodology"),
    h("p", null, "Every map colour, ranking and profile score is produced by a documented pipeline: researched tax rules (one dated dossier and one structured file per jurisdiction), public indicator datasets, and a scoring configuration. The same configuration drives the Python build and this page."),

    h("h3", null, "1. Maps"),
    h("ul", null,
      h("li", null, "Boundaries: ", extLink("https://www.naturalearthdata.com/", "Natural Earth"), " 1:10m admin-0 countries and admin-1 states/provinces (public domain), simplified with shared topology by mapshaper so neighbouring borders stay gap-free."),
      h("li", null, "Borders follow the United Nations, not who controls an area: Crimea is shown as part of Ukraine (UN General Assembly resolution 68/262), the Golan Heights as part of Syria (Security Council resolution 497), and East Jerusalem as occupied Palestinian territory (resolutions 478 and 2334). Only UN member states are countries: Natural Earth's other units (Northern Cyprus, the UN buffer zone in Cyprus, Somaliland, the occupied Palestinian territory, Western Sahara, leased and disputed areas, Antarctica) are shown striped as territories and never ranked. Dependencies of member states, such as Jersey or Gibraltar, keep their own tax rules and are ranked, and so do Taiwan and Kosovo, which are not UN members but have their own tax systems; their pages say so."),
      h("li", null, "Projections: Natural Earth for the world, Lambert conformal conic for Europe, Mercator for the UAE and Caribbean close-ups (with a separate Bermuda inset), Albers USA for US states."),
      h("li", null, "Small jurisdictions (Monaco, Andorra, Liechtenstein, Malta, Caribbean islands…) get a clickable circle at Natural Earth's official label point when their outline is too small to click. Labels use collision avoidance and leader lines."),
      h("li", null, "Automated tests check that every marker lies inside its jurisdiction, that labels reference the right feature, that each scored jurisdiction exists in the boundary data, and that the close-ups contain the jurisdictions they promise.")),

    h("h3", null, "2. Weights"),
    h("p", null, "Default weights are points, converted to percentages:"),
    h("div", { class: "table-wrap" }, h("table", { class: "grid small" },
      h("thead", null, h("tr", null, h("th", null, "Metric"), h("th", null, "Points"), h("th", null, "Share"), h("th", null, "Transformation to 0–100"))),
      h("tbody", null, Object.entries(cfg.metrics).map(([k, m]) => h("tr", null, h("td", null, m.label), h("td", { class: "num" }, String(m.weight)),
        h("td", { class: "num" }, fmtPct(w[k])), h("td", null, moneyText((cfg.tax_transforms[k] || cfg.nontax_transforms[k]).description))))))),
    h("p", null, "Overall score = Σ (metric score × normalised weight). The tax-only score uses the four tax metrics alone."),

    h("h3", null, "3. How taxes are scored"),
    h("p", null, h("strong", null, "Personal holding and holding structures. "), cfg.holding_assumption),
    h("p", null, `Each tax metric is computed for an illustrative family: a ${fmtEur(ref.portfolio)} portfolio (${ref.foreign_share * 100}% foreign), ${fmtEur(ref.dividends)} dividends and ${fmtEur(ref.realized_gains)} realised gains a year (a ${cfg.market.dividend_yield * 100}% yield and a ${cfg.market.price_growth * 100}% price return, of which ${cfg.market.realisation * 100}% is sold each year), ${fmtEur(ref.real_estate_local)} home, ${fmtEur(ref.net_wealth)} net wealth, and a ${fmtEur(ref.estate)} estate passing to ${ref.children} children. A zero headline rate therefore does not guarantee 100: real-estate gains, business-sale gains, transfer duties and treaty access all count.`),
    h("p", null, moneyText(cfg.tax_transforms.time_limited_regimes.description)),
    h("p", null, "Special regimes: each jurisdiction is scored under the best regime the selected citizenship can use (for example Italy's lump-sum regime or Cyprus non-dom), with the standard regime shown alongside it. The regime used is the one a family would actually pick: the lowest expected tax cost in euros (annual capital gains, dividend and wealth taxes plus inheritance tax once per generation, over a 60-year, two-generation horizon, with time-limited regimes blended with the standard rules). The weights then compare countries, not regimes. Regimes that require employment, a directorship or another qualifying activity (Spain's Beckham law, Portugal's IFICI, France's impatriate regime, Barbados's Welcome Stamp) are not counted for a passive investor family unless “Family will work locally” is ticked."),
    h("p", null, "Lump sums (Italy, Greece, Swiss forfait, …) are fixed amounts, so their value depends on income: they are allocated across the metrics in proportion to the standard-regime taxes they replace, so a lump-sum regime scores better only when it actually costs less. Use the calculator to test larger or smaller incomes."),
    h("p", null, h("strong", null, "US citizens. "), moneyText(cfg.us_citizen_overlay.description)),
    h("p", null, h("strong", null, "US dividend withholding. "), cfg.us_dividend_withholding.description, " ", cfg.us_dividend_withholding.exclusions_note, " Source: ",
      extLink(cfg.us_dividend_withholding.source.url, cfg.us_dividend_withholding.source.title), "."),

    h("h3", null, "4. Knock-outs"),
    h("p", null, cfg.knockout.description),
    h("ul", null, cfg.knockout.criteria.map((c) => h("li", null, h("strong", null, `${c.label}: `), c.explanation)),
      ["sanctions", "capital_controls", "security_state_courts"].filter((k) => cfg.knockout[k]).map((k) => h("li", null, h("strong", null, `${cfg.knockout[k].label}: `), cfg.knockout[k].explanation, " ",
        Object.keys(cfg.knockout[k].countries).join(", "), ". Sources: ",
        cfg.knockout[k].sources.map((s, i) => [i ? ", " : "", extLink(s.url, s.title)])))),
    ...(cfg.red_flags && Object.keys(cfg.red_flags.countries).length ? [h("h3", null, "Red flags"), h("p", null, cfg.red_flags.description),
      h("ul", null, Object.entries(cfg.red_flags.countries).map(([id, f]) => h("li", null, h("strong", null, `${state.data.jurisdictions[id]?.name ?? id} — ${f.label}: `), f.explanation)))] : []),
    h("h3", null, "Spouses"),
    h("p", null, "The score models the estate passing to the children. What a surviving spouse pays is recorded separately for every country with an inheritance or estate tax (where there is none, nobody pays), shown on each country page and in Compare, and usable as a filter (“No inheritance tax for spouse or children”). It does not change the score. “Tax-free, with conditions” covers exemptions such as the US marital deduction, which applies in full only to a US-citizen spouse."),
    h("h3", null, "Residence routes"),
    h("p", null, "Each researched country lists its ways to get the right to live there: EU free movement, residence by investment (golden visas), citizenship by investment, passive-income and retiree permits, digital nomad visas, entrepreneur and work permits, with closed programmes kept and marked. Each route records who can use it (EU, US or other passports), the minimum investment and income, government fees, the stay required, and the years to permanent residence and citizenship, with sources."),
    h("p", null, "“Residence for you” is the open route with the lowest investment for the passport chosen on the left; a route with no investment (free movement, a passive-income permit) comes first, and the income it needs is shown. Residence routes do not change any score: they are information, because the right route depends on the family."),
    h("h3", null, "5. Missing data"),
    h("p", null, cfg.status_rules.description),
    h("p", null, cfg.missing_data_policy),
    h("p", null, "Jurisdictions whose tax rules have not been researched are grey on the overall and tax layers. Their non-tax indicators are still available under the “Non-tax score only” layer."),

    h("h3", null, "6. Colour bands"),
    h("ul", null, cfg.bands.map((b, i) => h("li", null, h("i", { class: `swatch band-${b.color}` }), ` ${b.label}: ${bandRange(cfg, i)}`))),

    h("h3", null, "7. Data sources"),
    h("div", { class: "table-wrap" }, h("table", { class: "grid small" },
      h("thead", null, h("tr", null, h("th", null, "Indicator"), h("th", null, "Source"), h("th", null, "Coverage"), h("th", null, "Fetched"))),
      h("tbody", null, Object.entries(meta.indicators).map(([, m]) => h("tr", null, h("td", null, m.description), h("td", null, extLink(m.url, m.source)),
        h("td", { class: "num" }, String(m.count)), h("td", null, m.fetched)))))),
    h("p", { class: "small" }, "Datasets measure different things and refer to different years (each value's year is shown in the profile). Values older than ten years are discarded rather than presented as current."),

    h("h3", null, "8. Calculator"),
    calculatorAssumptions(),

    h("h3", null, "9. Limitations"),
    h("ul", null,
      h("li", null, "Rules are summarised at the top end for a large private investor; personal circumstances, anti-avoidance rules, exit taxes and treaty tie-breakers can change outcomes."),
      h("li", null, "Research was carried out with AI assistance against official and professional sources and has not been reviewed by a licensed tax adviser. Confidence and open questions are shown for every metric."),
      h("li", null, "“Cultural fit” is a proxy for an international, English-speaking environment, not a judgement of culture."),
      h("li", null, `Build ${meta.built}; FX ${meta.fx_date} (ECB reference rates, with official pegs where applicable).`)),
    h("p", { class: "disclaimer" }, "Not tax, legal or investment advice."));
}
