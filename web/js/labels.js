// Wording and small view helpers shared by every mode and panel, so the same thing is always said the
// same way ("tax-free, with conditions", "other passports").

import { h, extLink } from "./dom.js";

/** Citizenship groups as a reader thinks of them. */
export const GROUP = { EU: "EU citizens", US: "US citizens", OTHER: "other passports" };
export const GROUP_SHORT = { EU: "EU", US: "US", OTHER: "Other" };

/** Inheritance treatment of an heir (children_treatment / spouse_treatment). */
export const INHERITANCE = { fully_exempt: "tax-free", exempt_with_conditions: "tax-free, with conditions", taxed_low: "low tax", taxed: "taxed" };
/** Higher is better; used to colour Compare. */
export const INHERITANCE_RANK = { fully_exempt: 3, exempt_with_conditions: 2, taxed_low: 1, taxed: 0 };

/** Annual wealth tax type (wealth_tax.type). */
export const WEALTH_TAX = { none: "none", limited: "limited", broad: "yes" };

export const capitalise = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

/** One row of a definition list; nothing at all when there is no value. */
export function field(label, value) {
  if (value === null || value === undefined || value === "") return null;
  return h("div", { class: "field" }, h("dt", null, label), h("dd", null, value));
}

/** Linked sources: title, publisher and, where known, the kind of source. */
export function sourceList(sources) {
  if (!sources || !sources.length) return null;
  return h("ul", { class: "sources" }, sources.map((s) => h("li", null, extLink(s.url, s.title),
    s.publisher ? ` — ${s.publisher}${s.kind ? ` (${s.kind.replace("_", " ")})` : ""}` : "")));
}
