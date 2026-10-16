# Immigration research guide

One file per country: `data/immigration/<ISO3>.json`, validated by `ImmigrationFile` in
`domicile/schema.py`. It answers: **how can someone with this passport get the right to live here,
what does it cost, and does it lead to permanent residence or citizenship?** The site shows it on
each country page and picks the cheapest open route for the reader's passport.

Check a file with: `uv run python -m domicile.validate data/immigration/<ISO3>.json`

## Citizenship groups

The site has three groups. Every route lists the groups that can use it.

- `EU`: a citizen of an EU member state.
- `US`: a US citizen.
- `OTHER`: any other passport (UK, Swiss, Indian, Chinese, Brazilian, Russian, Emirati, ...).

When a route treats some nationalities in a group differently (Russians and Belarusians excluded,
UK citizens visa-free, Swiss and EEA citizens on free movement terms, a bilateral treaty such as the
US-Panama Friendly Nations visa or the US E-2 treaty list), keep the route on the group and say so in
`requirements`. Do not invent a fourth group. When only **some** nationalities of a group can use a
route at all (Irish citizens under the UK-Ireland Common Travel Area, UK citizens in Ireland, a treaty
list such as the Dutch-American Friendship Treaty, Panama's Friendly Nations list for OTHER, a
digital nomad visa limited to listed countries), set `only_some_nationalities: true`. Such a route
is never shown as "the route" for the whole group. Free movement under the Common Travel Area is
kind `other`, not `free_movement` (that kind is for EU/EEA/Swiss free movement only).

## Which routes to include

All routes a wealthy family, a retiree, or a remote worker would realistically use:

| kind | Examples |
|---|---|
| `free_movement` | EU citizens in any EU state (registration certificate after 3 months); EEA/Swiss free movement; Common Travel Area (GBR/IRL) |
| `investor_residence` | Golden visas, investor permits, residence by property or fund investment |
| `citizenship_by_investment` | Passports for a donation or investment (Caribbean, Vanuatu, Türkiye, ...) |
| `passive_income` | Non-lucrative visa, financially independent person, retiree visas, D7 |
| `digital_nomad` | Remote-worker visas |
| `entrepreneur` | Start-up and business-owner permits |
| `work` | One entry for ordinary employment permits, summarised |
| `other` | Anything else important (e.g. lump-sum taxation residence permits tied to a status) |

**Include closed and changed programmes** that readers still search for, with `status`
`closed_to_new` or `suspended` and a dated `status_note` (e.g. Spain's golden visa abolished
3 April 2025; Ireland's Immigrant Investor Programme closed to new applications February 2023;
Cyprus citizenship by investment ended 2020; Malta's citizenship by investment after the EU Court of
Justice judgment of 29 April 2025). Verify each such fact from a source; these examples are pointers,
not data.

## Fields

- `summary` (file): the gist in plain words, per group. Example of the tone, not of the facts:
  "EU citizens only register. Others need a permit: the cheapest is the X visa (income of ...), or Y
  for an investment of ...".
- `naturalisation`: ordinary years of residence for citizenship, language and other tests.
- `dual_citizenship`: `allowed`, `restricted` (e.g. only for some nationalities, or by permission),
  or `not_allowed`; explain restrictions in `dual_citizenship_note`.
- Per route:
  - `id`: short snake_case, unique in the file (e.g. `golden_visa_fund`).
  - `summary`: one or two sentences for a non-lawyer.
  - `requirements`: the conditions, with statute or programme references where available.
  - `minimum_investment`: the lowest qualifying investment or donation for the main applicant, in the
    currency the law states. For citizenship by investment use the lowest option (often a donation)
    and give the other options in `investment_options`. `null` when the route needs no investment.
  - `minimum_income`: income or proof of funds required **per year** for the main applicant
    (convert a monthly figure to a year and say so in `requirements`). `null` when none.
  - `government_fees`: government fees for the main applicant's first permit (application, permit
    card, due diligence for CBI). Excludes lawyers and agents. `null` if you cannot source it.
  - `physical_presence`: what keeps the permit alive ("7 days a year", "183 days a year", "none").
  - `path_to_permanent_years`, `path_to_citizenship_years`: years on this route until eligible,
    `null` if the route does not lead there or it is unclear (then add an open question).
  - `grants`: what the route gives on approval.
  - `tax_note`: e.g. "A residence permit does not make you tax resident"; link to special tax regimes
    when they come with the permit.
  - `sources`: at least one per route.

## Sources

Prefer, in order: the immigration authority or ministry page, the law or regulation, the official
programme page, then reputable professional sources (Big Four, law firms, Henley & Partners,
Fragomen). Never rely on a blog or an agent's marketing page alone. Set `accessed` to the date you
opened it. `kind` is one of legislation, government, tax_authority, intergovernmental, professional,
other.

## Rules

- Never invent a figure. If a fee, threshold or processing time cannot be sourced, leave it `null`
  (or the text empty) and add an `open_questions` entry.
- Figures must be the rules **in force on `researched_on`**. Mention announced changes in
  `requirements` or `status_note` with the date they take effect.
- Keep text short and concrete. Amounts with their currency, dates in full.
- Edit only the files you were asked to write.
