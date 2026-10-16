// A · Guided: four plain questions, then a short ranked list with the reasons in words.
// Every answer writes to the shared state (persona, passport, weights, filters), so the
// Factbook, Explorer and Compare show the same results.

import { h, fmtEur, displayCurrency } from "../dom.js";
import { state, update, entries, toggleIn, MAX_COMPARE, personaCfg, isIncomePersona, defaultWeightsFor } from "../state.js";
import { rankedRows, TAX_FREE } from "../panels/rankings.js";
import { scoreChip, euBadge, redFlagBadge } from "../panels/profile.js";
import { taxPerYear } from "../results.js";
import { residenceShort } from "../panels/immigration.js";

const SHOW = 10;
const BOOST = 2; // a chosen priority's metrics count double

const CZ = [["EU", "EU citizen", "A passport of an EU member state"], ["US", "US citizen", "Taxed by the US wherever you live; amounts shown in dollars"], ["OTHER", "Another passport", "Neither EU nor US"]];
const INHERIT = { fully_exempt: "children inherit tax-free", exempt_with_conditions: "children inherit tax-free, with conditions", taxed_low: "low inheritance tax", taxed: "inheritance is taxed" };
const WEALTH = { none: "no wealth tax", limited: "a limited wealth levy", broad: "an annual wealth tax" };

/** Weights for the chosen priorities: the persona's defaults, with each chosen group's metrics doubled. */
export function weightsForPriorities(persona, chosen) {
  const w = defaultWeightsFor(persona);
  const groups = state.cfg.personas[persona].profile.priorities;
  for (const i of chosen) for (const m of groups[i].metrics) if (m in w) w[m] *= BOOST;
  return w;
}

function step(n, title, hint, ...body) {
  return h("section", { class: "step" }, h("div", { class: "step-num", "aria-hidden": "true" }, String(n)),
    h("div", { class: "step-body" }, h("h3", null, title), hint ? h("p", { class: "small muted" }, hint) : null, ...body));
}

function choice(label, desc, pressed, onclick, attrs = {}) {
  return h("button", { type: "button", class: "choice", "aria-pressed": String(pressed), onclick, ...attrs },
    h("strong", null, label), desc ? h("span", { class: "small muted" }, desc) : null);
}

function dealBreaker(label, key) {
  const c = h("input", { type: "checkbox", id: `g-${key}`, onchange: (ev) => update({ filters: { ...state.filters, [key]: ev.target.checked } }) });
  c.checked = state.filters[key];
  return h("label", { class: "chk big" }, c, label);
}

function verifiedOnly() {
  const c = h("input", { type: "checkbox", id: "g-verified", onchange: (ev) => update({ filters: { ...state.filters, minStatus: ev.target.checked ? "verified" : "provisional" } }) });
  c.checked = state.filters.minStatus === "verified";
  return h("label", { class: "chk big" }, c, "Only fully verified tax data");
}

/** One line in words: what makes this place cheap or expensive. */
function reason(e, r) {
  const parts = [];
  if (r.regime && r.regime.type !== "standard") parts.push(r.regime.type === "structure" ? `via ${r.regime.name}` : r.regime.name);
  if (!isIncomePersona() && e.flags) {
    if (WEALTH[e.flags.wealth_tax_type]) parts.push(WEALTH[e.flags.wealth_tax_type]);
    const kids = e.flags.inheritance_children, spouse = e.flags.inheritance_spouse;
    if (TAX_FREE.includes(kids) && TAX_FREE.includes(spouse)) parts.push(kids === "fully_exempt" && spouse === "fully_exempt" ? "spouse and children inherit tax-free" : "spouse and children inherit tax-free, with conditions");
    else if (INHERIT[kids]) parts.push(INHERIT[kids]);
  }
  return parts.join(" · ");
}

function resultCard(i, { id, e, r }, ctx) {
  const tax = taxPerYear(id);
  return h("li", { class: "result" },
    h("div", { class: "result-rank" }, String(i + 1)),
    h("div", { class: "result-main" },
      h("h4", null, h("button", { class: "linklike", onclick: () => ctx.select(id) }, e.name), " ", euBadge(e), redFlagBadge(e)),
      e.red_flag ? h("p", { class: "small flag-line" }, `Red flag: ${e.red_flag.label.toLowerCase()}. Read the page before deciding.`) : null,
      h("p", { class: "small muted" }, reason(e, r) || "Standard rules"),
      h("dl", { class: "result-figures" },
        h("div", null, h("dt", null, isIncomePersona() ? "Income tax and social security" : "Tax a year"), h("dd", null, tax === null ? "–" : fmtEur(tax))),
        h("div", null, h("dt", null, "Annual Household Cost"), h("dd", null, e.household_cost ? fmtEur(e.household_cost) : "not sourced")),
        residenceShort(e) !== "not researched" ? h("div", null, h("dt", null, "Residence for you"), h("dd", null, residenceShort(e))) : null)),
    h("div", { class: "result-side" }, scoreChip(r.score, state.cfg, "big"),
      h("button", { class: "small", "aria-pressed": String(state.compare.includes(id)), disabled: !state.compare.includes(id) && state.compare.length >= MAX_COMPARE,
        onclick: () => toggleIn("compare", id, { max: MAX_COMPARE }) }, state.compare.includes(id) ? "In comparison" : "+ Compare")));
}

function leftOut(ctx) {
  const ko = entries().filter(([, e]) => e.level === "country" && e.ko && e.ko.length);
  const byReason = new Map();
  for (const [, e] of ko) for (const label of new Set(e.ko.map((k) => k.label))) {
    if (!byReason.has(label)) byReason.set(label, []);
    byReason.get(label).push(e.name);
  }
  const unresearched = entries().filter(([, e]) => e.level === "country" && !e.researched).length;
  return h("details", { class: "fold" }, h("summary", null, h("h3", null, `Left out, and why (${ko.length} countries)`)),
    h("p", { class: "small muted" }, "These fail a knock-out rule for this group, whatever the weights, and show red on the globe. The evidence is on each country's page and under Method. ",
      h("button", { class: "linklike", onclick: () => ctx.go({ mode: "settings" }) }, "Change the rules in Settings")),
    h("ul", { class: "leftout" }, [...byReason].sort((a, b) => b[1].length - a[1].length).map(([label, names]) =>
      h("li", null, h("strong", null, label), `: ${names.sort().join(", ")}`))),
    h("p", { class: "small muted" }, `Another ${unresearched} countries have no researched tax rules yet, so they are not ranked.`));
}

export function renderGuided(stage, ctx) {
  const p = personaCfg();
  const chosen = state.prioritiesByPersona[state.persona] || [];
  const custom = JSON.stringify(state.weights) !== JSON.stringify(weightsForPriorities(state.persona, chosen));
  const setPriorities = (list) => update({ prioritiesByPersona: { ...state.prioritiesByPersona, [state.persona]: list }, weights: weightsForPriorities(state.persona, list) }, { persist: true });

  stage.append(h("header", { class: "stage-head" },
    h("h2", null, "Find a place in four questions"),
    h("p", { class: "muted" }, "Answer what you can. The list below updates as you go.")));

  stage.append(
    step(1, "I am…", null, h("div", { class: "choices" }, Object.entries(state.cfg.personas).map(([pid, pc]) =>
      choice(pc.label, pc.profile.headline, pid === state.persona, () => update({ persona: pid }, { persist: true }), { "data-guided-persona": pid })))),
    step(2, "Which passport?", "Visas, special tax regimes and US citizenship-based tax depend on it.", h("div", { class: "choices three" }, CZ.map(([v, label, desc]) =>
      choice(label, desc, state.citizenship === v, () => update({ citizenship: v }, { persist: true }))))),
    step(3, "What matters most?", `Pick up to three. Each one counts double in the score.${custom ? " You have also set weights by hand in Settings; picking here replaces them." : ""}`,
      h("div", { class: "choices" }, p.profile.priorities.map((pr, i) => choice(pr.text, null, chosen.includes(i), () => {
        const next = chosen.includes(i) ? chosen.filter((x) => x !== i) : [...chosen, i].slice(-3);
        setPriorities(next);
      }))),
      h("p", { class: "small" }, h("button", { class: "linklike", onclick: () => ctx.go({ mode: "settings" }) }, "Or set every weight yourself"))),
    step(4, "Any deal-breakers?", "Places that fail one are hidden from the list, not scored down.", h("div", { class: "dealbreakers" },
      dealBreaker("Must be in the EU", "euOnly"),
      ...(isIncomePersona()
        ? [dealBreaker("Low income tax and social security", "lowIncomeTax")]
        : [dealBreaker("No wealth tax", "noWealthTax"), dealBreaker("Spouse and children inherit tax-free", "familyInheritsFree")]),
      verifiedOnly())));

  const rows = rankedRows();
  const results = h("section", { class: "results" },
    h("h3", null, rows.length ? `Your top ${Math.min(SHOW, rows.length)}` : "Nothing passes these deal-breakers"),
    h("p", { class: "small muted" }, `${rows.length} places pass. Scores run from 0 to 100; amounts in ${displayCurrency()}. Click a name to read about it.`),
    h("ol", { class: "result-list" }, rows.slice(0, SHOW).map((row, i) => resultCard(i, row, ctx))),
    rows.length > SHOW ? h("button", { onclick: () => ctx.go({ mode: "explorer", explorerView: "table" }) }, `See all ${rows.length} in Explorer`) : null,
    state.compare.length ? h("button", { onclick: () => ctx.go({ mode: "compare" }) }, `Compare ${state.compare.length} side by side`) : null);
  stage.append(results, leftOut(ctx));
}
