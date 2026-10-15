# Research guide for jurisdiction data files

This guide is binding for anyone (human or agent) writing `data/jurisdictions/<ISO3>.json` or
`data/subnational/<ISO3>.json`. The schema is `domicile/schema.py`; read it first. Validate every
file you write with:

```
cd ~/Projects/domicile && uv run python -m domicile.validate data/jurisdictions/XXX.json
```

A file is not finished until it validates with 0 errors.

## The reader

A wealthy family of five (two parents, three children) running a family office is choosing where to
live long-term. Their wealth is mostly a **globally diversified portfolio of listed shares and bonds
held directly** (mostly foreign, i.e. non-domestic, securities), plus a family home, possibly a private
business stake. They care first about: capital gains tax, dividend tax, inheritance/gift tax on
transfers **from parents to children**, and annual wealth tax. Citizenship varies: `EU`, `US`, `OTHER`.

The results are published as a public tool. **Accuracy beats coverage.** Never invent a number. If you
cannot verify something, use `null` (where the schema allows it), set `confidence: "low"` and
`verification: "unverified"`, and write the gap in `open_questions`.

## Date and law in force

Today is **2026-10-15**. Record the law in force for tax year **2026** (or 2026/27 for split years).
Search for **2025 and 2026 reforms**: many countries changed rules recently (e.g. UK non-dom abolition
from April 2025 and IHT residence test, Cyprus 2026 tax reform, Italy flat tax raised to €300k for
new arrivals from 2026?, Portugal NHR → IFICI, Greece, Spain's solidarity wealth tax, Hungary wealth
tax proposals after the April 2026 election, US estate exemption under the 2025 OBBBA). Verify; do not
assume any of these from this list. Do not silently use an older rule; if a change is announced but
not in force, describe it in `open_questions` and `important_exceptions`, and score the law in force.

Prefer, in order: legislation, tax authority, government, OECD/EU (`intergovernmental`), then reputable
professional summaries (PwC Worldwide Tax Summaries, EY, KPMG, Deloitte, Big-4 or law-firm
guides) as `professional`. Each metric needs at least one source; aim for one official plus one
professional. Every URL must be one you actually opened. `verified_on` is the date you checked (today).

Some prior research exists in `~/Builds/portax/docs/*.md` (Cyprus, Germany, Luxembourg, Switzerland,
Dubai, USA, Hungary; written April 2026). Use it as a lead, re-verify every claim, cite primary sources
rather than portax.

## Field semantics

All rates are decimals (`0.2` = 20%). Amounts are in the **jurisdiction's own currency** (`currency` at
top level), including bracket `from_amount`, exemptions and thresholds. Cost items carry their own
`Money` currency.

### regimes

- `regimes[0]` is the single `standard` regime (ordinary tax residence) and must define all four
  metrics: `capital_gains`, `dividends`, `wealth_tax`, `inheritance`.
- Add one `special` regime per realistic option for a newly arriving wealthy foreign family (Italy
  lump-sum regime, Swiss lump-sum taxation, Cyprus non-dom, Greece €100k regime, Malta non-dom/GRP,
  Portugal IFICI, Monaco ordinary residence is standard, etc.). A special regime only lists the metrics
  that differ; missing ones inherit from `standard`.
- `eligible_citizenships`: who can use it. EU free movement matters for `OTHER` (they need a permit,
  which you describe in `residency.routes`). US citizens remain US-taxed everywhere; the app adds the US
  federal layer itself, so record **local** taxes only and use `us_citizen_notes` for anything special
  (e.g. treaty saving clause, Puerto Rico Act 60).
- `duration_years`: how long the regime lasts for a new arrival (null = indefinite).
- `lump_sum`: for forfait regimes. `annual` = typical yearly amount for one person (if family members
  pay extra, explain in `notes`; for Swiss expenditure-based tax give a realistic estimate of the total
  annual tax for a wealthy family in that canton and cite it). `covers` = what it replaces.

### capital_gains

`rates` are the **effective top-end rates for a large gain realised by a resident private investor**
(not a trader), held longer than any holding period, under that regime:
`listed_securities_domestic`, `listed_securities_foreign`, `private_business_sale` (substantial
shareholding in a private company), `real_estate_local` (not the main home), `real_estate_foreign`.
Put surcharges (solidarity, church tax excluded, local surtaxes) in. Explain in `rate_basis`.
`headline_rate` = the top statutory CGT rate. Explain professional-trader recharacterisation risk in
`professional_trader`. "No general CGT" does not mean every gain is exempt: check real estate, shares
in property-rich companies, trading income, deemed disposals and exit taxes.

### dividends

`domestic_rate`: residence tax on dividends from domestic companies (after imputation/participation
relief for an individual). `foreign_gross_rate`: residence rate on foreign dividends before credit.
`foreign_tax_credit`: how source WHT is relieved. Describe in `withholding_outbound` what this country
withholds on dividends its companies pay out (relevant for holding companies), and summarise the treaty
network size/quality in `treaty_network` (treaty access affects US/EU source WHT on the family's
portfolio). Personal tax only here; company tax goes in `corporate`.

### wealth_tax

`type`: `none` = no general annual net wealth tax and no recurring levy on financial assets;
`limited` = a levy on some asset classes only (e.g. France IFI on real estate, Italy IVAFE/IVIE on
foreign assets, Belgium securities account tax, Spain's regional tax with high exemption is `broad`);
`broad` = general net wealth tax. Each component: `base`, `exempt_amount` (allowance deducted),
`entry_threshold` (cliff: no tax at all below it), `brackets` (marginal rates on base after allowance).
Ordinary municipal property tax is **not** a wealth tax: describe it in `property_tax_note`.

### inheritance (parents → children)

- `basis`: `estate` (tax on the estate, e.g. US, UK), `beneficiary` (tax on each heir, e.g. Germany),
  `none` (no inheritance or gift tax at all).
- `children_treatment`: `fully_exempt` (0% on any asset class, gifts and inheritances), 
  `exempt_with_conditions` (0% but only under conditions, e.g. registration, residence of heir),
  `taxed_low` (≤5% effective for a large estate), `taxed`.
- `exemption`: per child (beneficiary basis) or per estate (estate basis). `brackets`: rates on the
  taxable amount above the exemption for **a child**. `[]` if untaxed.
- `other_transfer_cost_rate`: unavoidable registration/notary/probate/stamp costs as share of value
  (e.g. 0.01), 0 if negligible.
- `gift_tax`, `gifts_same_as_inheritance`, `lifetime_gift_tax_free_after_years` (e.g. UK 7).
- `business_relief`, `business_relief_covers_public_shares` (portfolio of listed shares: usually false).
- `foreign_assets`, `domicile_rules`: scope (worldwide vs situs), residence/domicile/citizenship tests
  and tails after leaving.
- Distinguish gifts from inheritances; Hungary, Czech Republic and Cyprus must each be checked, not
  assumed to be the same.

### residency, corporate, cost_of_living

- `residency.tax_residency_test` (day counts, centre of vital interests, special 60-day rules) and
  `routes` (EU free movement, golden visas, residence by investment, permit requirements per citizenship).
- `corporate`: headline CIT rate and a summary of company-level rules (participation exemption, free
  zones, substance). Keep it separate from personal taxation.
- `cost_of_living` for the city a wealthy family would most likely live in: monthly rent for a prime
  4–5 bedroom family home, prime purchase price per m², annual fee of a leading international secondary
  school (per child), annual family private health insurance, monthly full-time housekeeper. Each item
  needs a source (agency report, school fee page, Knight Frank, Savills, Numbeo as a last resort
  marked in description). Omit an item rather than guess.

### indicator_overrides

The pipeline pulls World Bank/WGI/UNDP/TI data automatically. Only add an override when a small
jurisdiction is missing from those datasets **and** you find an authoritative published value for the
same indicator definition (e.g. official homicide statistics for the Cayman Islands). Keys are listed in
`INDICATOR_KEYS` in the schema.

### markers

The main city and financial centre(s), with coordinates from GeoNames, Wikipedia/Wikidata or the
national mapping agency (`coordinate_source`, e.g. "GeoNames 146268"). These are tested
programmatically against country boundaries: be precise, lon first.

## Subnational files

`data/subnational/<ISO3>.json` contains `units`, each with its ISO 3166-2 `code` and
`regime_overrides` keyed by the **parent regime id** (`standard`, or a special regime id). Only give
metrics that differ from the national file, but give each overriding metric **in full** (it replaces
the parent's metric object). Set `available: false` to remove a regime in that unit (e.g. Swiss
lump-sum taxation abolished in Zurich).

## Tone

`summary` fields are read by the family. Be precise and plain: state the rule, the number, the
condition. No marketing language. Flag uncertainty openly.

## The dated markdown dossier (required for every file you write)

Alongside each JSON file, write `docs/jurisdictions/<ISO3>.md` (for subnational files:
`docs/jurisdictions/<ISO3>-regions.md`). The JSON holds the numbers the app scores; the markdown is the
human-readable legal dossier that lets the family update the tool over time. They must agree.

Exact structure:

```markdown
# <Name> — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary
## Residence and eligibility
## Capital gains
## Dividends
## Inheritance and gifts to children
## Wealth tax
## Special regimes
## Company taxation (kept separate from personal tax)
## Cost of living notes
## Open questions
## Sources
## Change log
- 2026-10-15: initial research.
```

In each tax section: the rule in force, statute/article references, rates and thresholds in the local
currency, conditions, how you turned it into the JSON numbers (e.g. "effective rate 0.2 = …"), and any
announced-but-not-in-force change. `Sources` lists every URL cited in the JSON, with title. The
`Last reviewed:` line must equal the JSON `researched_on` date (a test enforces this). On any later
update, change both files, bump the date, and add a dated Change log line saying what changed and why.

## Addendum: bracket_mode

Brackets default to **marginal** rates (each rate applies only to the slice above its `from_amount`).
Where the law applies the rate of the band reached to the **entire** taxable amount (e.g. Germany's
ErbStG §19 Stufentarif, some Swiss cantons' proportional rates), set `"bracket_mode": "whole_amount"`
on that inheritance object or wealth-tax component, and mention any smoothing rule (Härteausgleich)
in the text fields.

## Addendum: duration_note

A `special` regime with `duration_years: null` is scored as permanent. It must then carry a
`duration_note` (at least a sentence) saying why it does not expire, or what ends it (e.g. "Tax cap
applies for as long as the individual is resident; no statutory time limit (Income Tax Act s. X)").
Regimes that last only while a visa or permit is held must use the realistic visa term instead.

## Addendum: personal holding only

Every scored rate must be for assets held **directly by resident private individuals**. Never assume a
company (LLC, GmbH, holding company), foundation or trust wrapper, even where one is commonly used to defer
or shield tax. Describe such structures in `holding_company_notes` (dividends) or the free-text fields; they
must not change a rate.

## Addendum: placeholders

If a metric cannot be verified and you would otherwise have to guess (e.g. "no law found, assumed untaxed",
or rates borrowed from a neighbouring jurisdiction), set that metric's `"status": "not_researched"`. The
scorer then treats it as missing, which lowers completeness instead of awarding an invented value. Keep
whatever you did find in the text fields.

