// Succession: can a family leave its estate as it wishes (forced heirship, and whether a foreign resident
// can choose the law of their nationality), and can it use a trust or a foundation.
// Data: data/succession/<ISO3>.json (full, on profiles) and a compact summary on scores.json entries.

import { h, append } from "../dom.js";
import { field, sourceList } from "../labels.js";

const CHOICE = { yes: "foreigners can choose their home law", limited: "a foreigner's home law applies only in part", no: "local law applies to foreigners too", unclear: "whether foreigners can choose their home law is unclear" };
const AVAIL = { yes: "yes", limited: "limited", no: "no", unclear: "unclear" };

/** Short line for key facts: can the estate be left freely? */
export function successionFact(e) {
  const s = e?.succession;
  if (!s) return null;
  if (s.forced_heirship === "no") return "free to leave as you wish";
  return `forced heirship · ${CHOICE[s.foreign_law_choice]}`;
}

/** One-sentence warning for Simple's "Worth knowing"; null without forced heirship. */
export function successionWarning(e) {
  const s = e?.succession;
  if (!s || s.forced_heirship === "no") return null;
  return `Forced heirship: by law part of the estate goes to the family; ${CHOICE[s.foreign_law_choice]}.`;
}

/** Compare cell text, and a rank (higher is freer) for colouring. */
export function successionShort(e) {
  const s = e?.succession;
  if (!s) return { text: "not researched", rank: undefined };
  if (s.forced_heirship === "no") return { text: "No", rank: 3 };
  if (s.foreign_law_choice === "yes") return { text: "Yes, foreigners can opt out", rank: 2 };
  if (s.foreign_law_choice === "limited") return { text: "Yes, partial opt-out", rank: 1 };
  return { text: "Yes", rank: 0 };
}

/** "Succession and trusts" section of a country page. */
export function successionSection(f) {
  const sec = h("details", { class: "fold" }, h("summary", null, h("h3", null, "Succession and trusts")));
  if (!f) {
    append(sec, [h("p", { class: "muted" }, "Not researched for this country yet.")]);
    return sec;
  }
  append(sec, [
    f.confidence !== "high" ? h("p", { class: "notice small" }, h("strong", null, "Draft research. "),
      "Not yet checked against the statute text; treat the details as a starting point for your lawyer, not as settled.") : null,
    h("p", null, f.summary),
    h("dl", { class: "small" },
      field("Forced heirship", f.forced_heirship === "yes" ? `yes${f.reserved_share ? `: ${f.reserved_share}` : ""}` : "no"),
      f.forced_heirship === "no" ? field("Family claims", f.family_claims) : null,
      field("Foreign residents", `${CHOICE[f.foreign_law_choice]}. ${f.foreign_law_note}`),
      field("EU Succession Regulation", f.eu_succession_regulation ? "applies (a choice of the law of your nationality is possible)" : null),
      field("Trusts", `${AVAIL[f.domestic_trusts]} under local law; Hague Trusts Convention ${f.hague_trusts_convention ? "in force" : "not in force"}`),
      field("Private foundations", AVAIL[f.private_foundations]),
      field("Notes", f.trust_note)),
    f.open_questions.length ? h("div", { class: "open-q" }, h("strong", null, "Open questions: "), h("ul", null, f.open_questions.map((q) => h("li", null, q)))) : null,
    sourceList(f.sources),
    h("p", { class: "small muted" }, `Researched ${f.researched_on}. Not legal advice.`),
  ]);
  return sec;
}
