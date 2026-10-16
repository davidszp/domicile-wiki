# Succession research guide

One file per country: `data/succession/<ISO3>.json`, validated by `SuccessionFile` in
`domicile/schema.py`. It answers two questions a wealthy family asks before moving:

1. **Can I leave my estate as I wish?** Forced heirship: do children (or a spouse) get a share that a
   will cannot take away, and can a foreign resident escape it by choosing the law of their nationality?
2. **Can I use a trust or a foundation?** Does the country have its own trust law, is the Hague Trusts
   Convention in force, and can a private (family) foundation be set up?

Check a file with: `uv run python -m domicile.validate data/succession/<ISO3>.json`

## Fields

- `summary`: two or three plain sentences for a family, e.g. "Children are guaranteed half to three
  quarters of the estate. A foreign resident can choose the law of their nationality instead (EU
  Succession Regulation), but France adds a compensatory levy … Trusts are not part of French law but
  are taxed; there is no private foundation."
- `forced_heirship`: `yes` when a protected share exists that a will cannot override (civil-law
  *réserve*, *Pflichtteil*, *legítima*, Islamic fixed shares); `no` otherwise.
- `reserved_share`: who and how much, with the article (empty when `no`).
- `family_claims`: for `no` countries, any court-ordered provision for family or dependants (England's
  Inheritance (Provision for Family and Dependants) Act 1975 and its equivalents); empty if none.
- `foreign_law_choice`: can a foreign national resident here have the estate governed by the law of
  their nationality? `yes` (e.g. EU Succession Regulation art. 22), `limited` (only some assets, e.g.
  movables but not local real estate, or with a clawback), `no`, or `unclear`. Explain in
  `foreign_law_note`. For a `no`-forced-heirship country this is about whether foreign law would be applied
  at all; still answer it.
- `eu_succession_regulation`: true for EU members except Denmark and Ireland (Regulation 650/2012).
- `hague_trusts_convention`: true only if the 1985 Convention is **in force** for this jurisdiction:
  check the HCCH status table (https://www.hcch.net/en/instruments/conventions/status-table/?cid=59).
  The UK's ratification extends to several Crown Dependencies and Overseas Territories; China's covers
  Hong Kong and Macau only. Record what the table says for this jurisdiction.
- `domestic_trusts`: `yes` (common-law trusts or a full trust statute), `limited` (e.g. a statutory
  fiducie with narrow uses), `no` (the law excludes them), `unclear` (no source settles it: not finding a
  statute is not evidence that there is none).
- `private_foundations`: `yes` if family/private foundations can be set up (e.g. Austria Privatstiftung,
  Liechtenstein Stiftung, Malta, Panama), `limited`
  (charitable only, or heavy restrictions), `no`, `unclear` (as for trusts).
- `trust_note`: how foreign trusts are treated (recognised? taxed as transparent, or a special trust
  tax?), and the foundation law's name.
- `confidence`: `high` only when you read the statute text and the live HCCH status table yourself;
  `medium` when official secondary sources (e.g. e-Justice country pages) confirm the main points; `low`
  otherwise. The site labels anything below `high` as draft research.
- `sources`: the civil code or succession act, the official HCCH status table, government or court
  pages; then Big Four or law-firm guides (e.g. EY Worldwide Estate and Inheritance Tax Guide, the
  European e-Justice "Successions" country pages: https://e-justice.europa.eu).

## Rules

- Never guess. If a point cannot be sourced, write `unclear` (where allowed) and add an open question.
- Describe the law in force on `researched_on`; announced reforms go in `open_questions` with dates.
- Short sentences, figures with their article numbers.
- Countries with several legal systems (Spain's foral regions, US states, UK nations, Switzerland's
  cantons are federal-law here, Canada's Quebec, the UAE's DIFC/ADGM wills regimes) get the national
  rule plus a sentence on the main regional differences.
- Edit only the files you were asked to write.
