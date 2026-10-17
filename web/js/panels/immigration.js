// Immigration: how someone with the reader's passport gets the right to live in a country.
// Data: data/immigration/<ISO3>.json, merged by the build into profiles (full) and scores.json
// (`residence`: the cheapest open route per citizenship group).

import { h, append, fmtEur, fmtMoney } from "../dom.js";
import { state } from "../state.js";
import { GROUP, GROUP_SHORT, field, sourceList } from "../labels.js";

const KIND = {
  free_movement: "Free movement", investor_residence: "Residence by investment", citizenship_by_investment: "Citizenship by investment",
  passive_income: "Passive income or retirement", digital_nomad: "Digital nomad", work: "Work permit", entrepreneur: "Entrepreneur", other: "Other",
};
const GRANTS = { temporary_residence: "Temporary residence", permanent_residence: "Permanent residence", citizenship: "Citizenship" };
const STATUS = { open: null, closed_to_new: "Closed to new applicants", suspended: "Suspended", announced: "Announced, not yet in force" };
const DUAL = { allowed: "allowed", restricted: "restricted", not_allowed: "not allowed" };

/** The route to show: researched, or EU free movement, which needs no research for an EU citizen in the EU. */
function routeFor(e) {
  const r = e.residence?.[state.citizenship];
  if ((!r || r.kind === "none") && state.citizenship === "EU" && e.eu) return { kind: "free_movement" };
  return e.residence ? r : undefined;
}

/** Short text for the key-facts line: the cheapest open route for the reader's passport. */
export function residenceFact(e) {
  const text = residenceText(e);
  const r = text && routeFor(e);
  return r?.limited ? `${text} · limited places: ${r.limited}` : text;
}

function residenceText(e) {
  if (!e) return null;
  const r = routeFor(e);
  if (r === undefined) return null;
  if (!r || r.kind === "none") return state.persona === "expat" ? `no work permit recorded for ${GROUP[state.citizenship]}` : `only work or business permits for ${GROUP[state.citizenship]}`;
  if (r.kind === "citizen") return "you are a citizen";
  if (r.kind === "free_movement") return "free: register as an EU citizen";
  if (r.kind === "work") return `${r.name}${r.income_eur ? ` · salary from ${fmtEur(r.income_eur)} a year` : ""}`;
  if (r.investment_eur) return `from ${fmtEur(r.investment_eur)} · ${r.name}`;
  if (r.income_eur) return `income of ${fmtEur(r.income_eur)} a year · ${r.name}`;
  return r.name;
}

/** A warning for the 60-year projection, which assumes the family lives in the country: null when residence
 * is a right (or not researched), otherwise why it may not be available to the reader's passport. */
export function residenceCaveat(e) {
  const r = e && routeFor(e);
  if (!r || r.kind === "free_movement" || r.kind === "citizen") return null;
  if (r.kind === "none") return `Residence is the hurdle: ${GROUP[state.citizenship]} have no permit here for living on their own money; the routes need a job, a business or a family tie (see Immigration paths). The projection assumes the family can live here anyway.`;
  if (r.limited) return `Residence is not assured: the route for ${GROUP[state.citizenship]} (${r.name}) has ${r.limited}. The projection assumes the family gets a permit.`;
  return null;
}

/** Same, as a short value for tables (Compare). */
export function residenceShort(e) {
  const text = residenceShortText(e);
  return routeFor(e || {})?.limited ? `${text} (limited places)` : text;
}

function residenceShortText(e) {
  if (!e) return "not researched";
  const r = routeFor(e);
  if (r === undefined) return "not researched";
  if (!r || r.kind === "none") return state.persona === "expat" ? "No work permit recorded" : "Work or business permit only";
  if (r.kind === "citizen") return "Citizen";
  if (r.kind === "free_movement") return "Free (EU)";
  if (r.kind === "work") return r.income_eur ? `Work permit, salary from ${fmtEur(r.income_eur)}` : "Work permit";
  if (r.investment_eur) return `${fmtEur(r.investment_eur)} investment`;
  if (r.income_eur) return `${fmtEur(r.income_eur)} a year income`;
  return KIND[r.kind];
}


const money = (m) => (m ? fmtMoney(m.amount, m.currency) : null);
const years = (n) => (n === null || n === undefined ? null : n === 0 ? "on approval" : `${n} year${n === 1 ? "" : "s"}`);

function routeBlock(r) {
  const forYou = r.citizenships.includes(state.citizenship);
  const status = STATUS[r.status];
  const keyNumbers = [
    r.minimum_investment ? `investment ${money(r.minimum_investment)}` : null,
    r.minimum_income ? `${r.kind === "work" ? "salary from" : "income"} ${money(r.minimum_income)} a year` : null,
  ].filter(Boolean).join(" · ");
  const sec = h("details", { class: `route${forYou ? "" : " not-for-you"}${r.status === "open" ? "" : " closed"}` },
    h("summary", null,
      h("span", { class: "route-name" }, r.name),
      h("span", { class: "route-tags" },
        h("span", { class: "tag" }, KIND[r.kind]),
        status ? h("span", { class: "tag tag-closed" }, status) : null,
        ...r.citizenships.map((c) => h("span", { class: `tag tag-cz${c === state.citizenship ? " you" : ""}`, title: `Open to ${GROUP[c]}` }, GROUP_SHORT[c])),
        r.only_some_nationalities ? h("span", { class: "tag", title: "Only some nationalities in these groups qualify; see the requirements" }, "some nationalities") : null),
      keyNumbers ? h("span", { class: "route-key small" }, keyNumbers) : null),
    h("p", null, r.summary),
    status && r.status_note ? h("p", { class: "notice small" }, r.status_note) : null,
    h("dl", { class: "small" },
      field("Gives", GRANTS[r.grants]),
      field("Requirements", r.requirements),
      field("Investment options", r.investment_options),
      field("Government fees", [money(r.government_fees), r.fees_note].filter(Boolean).join(". ")),
      field("Stay needed", r.physical_presence),
      field("Permanent residence after", years(r.path_to_permanent_years)),
      field("Citizenship after", years(r.path_to_citizenship_years)),
      field("Processing time", r.processing_time),
      field("Family", r.family),
      field("Tax", r.tax_note)),
    sourceList(r.sources));
  return sec;
}

/** "Immigration paths": routes for the reader's passport first, then the ones for other passports. */
export function immigrationSection(imm) {
  const sec = h("details", { class: "fold" }, h("summary", null, h("h3", null, "Immigration paths")));
  if (!imm) {
    append(sec, [h("p", { class: "muted" }, "Residence routes have not been researched for this country yet.")]);
    return sec;
  }
  const order = { open: 0, announced: 1, suspended: 2, closed_to_new: 3 };
  const sorted = (list) => [...list].sort((a, b) => order[a.status] - order[b.status]);
  const mine = sorted(imm.routes.filter((r) => r.citizenships.includes(state.citizenship)));
  const others = sorted(imm.routes.filter((r) => !r.citizenships.includes(state.citizenship)));
  append(sec, [
    h("p", null, imm.summary),
    h("h4", null, `For ${GROUP[state.citizenship]} (${mine.length})`),
    mine.length ? mine.map(routeBlock) : h("p", { class: "muted" }, "No route recorded for this passport."),
    others.length ? h("details", { class: "others" }, h("summary", null, `Routes for other passports only (${others.length})`), others.map(routeBlock)) : null,
    h("dl", { class: "small" },
      field("Citizenship by naturalisation", imm.naturalisation),
      field("Dual citizenship", [DUAL[imm.dual_citizenship] ?? "not verified", imm.dual_citizenship_note].filter(Boolean).join(": "))),
    imm.open_questions.length ? h("div", { class: "open-q" }, h("strong", null, "Open questions: "), h("ul", null, imm.open_questions.map((q) => h("li", null, q)))) : null,
    h("p", { class: "small muted" }, `Researched ${imm.researched_on}. Amounts as the law states them. Not legal advice: rules and fees change often.`),
  ]);
  return sec;
}
