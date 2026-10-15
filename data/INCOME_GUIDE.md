# Research guide: earned income, nomad and expat regimes, persona living costs

Binding for anyone writing `data/income/<ISO3>.json` and `docs/income/<ISO3>.md`. The schema is the
`IncomeFile` model at the end of `domicile/schema.py`; read it first. Validate every file with:

```
cd ~/Projects/domicile && uv run python -m domicile.validate data/income/XXX.json
```

## Who reads this

Two personas use these files (the family-office persona uses `data/jurisdictions/`):

- **Digital nomad:** independent contractor, about USD 5,000 a month (USD 60,000 a year) from foreign
  clients, single, stays 2 years, becomes tax-resident. Cares about income tax + social security,
  rent, internet, visa access.
- **Expat:** employee, about USD 150,000 a year, single or a couple without children, highly educated,
  internationally mobile, 5-year horizon. Cares about income tax + social security, rent, career.

Today is **2026-10-15**; record the law for tax year 2026. Never invent numbers: if something cannot be
verified, use `null` where allowed, `confidence: "low"`, `verification: "unverified"`, and an open
question. PwC Worldwide Tax Summaries (`https://taxsummaries.pwc.com/<country>/individual/taxes-on-personal-income`,
`.../other-taxes` for social security, `.../residence`) is an acceptable main source; add the tax
authority or government visa page where reachable. Every URL must be one you opened.

Existing research for the same country may be in `data/jurisdictions/<ISO3>.json` and
`docs/jurisdictions/<ISO3>.md` (residency routes, special regimes): reuse what helps, but re-verify.

## Fields

- `income_tax.brackets`: marginal rates on **taxable income** for a resident individual, in local
  currency, with the main city's local/municipal surtax folded in where it is a percentage of income
  (say so in `local_tax_note`). If tax is levied on the tax amount (e.g. a surcharge of 5.5% of the
  tax), convert it into the marginal rates. `personal_allowance`: the basic deduction applied before
  the brackets, if it applies to everyone.
- Social security: the **employee's own** rate and annual income cap, and the **self-employed**
  rate and cap (state flat or minimum contributions in `self_employed_notes`). Include mandatory health
  contributions. Employer contributions are not counted.
- `regimes`: every **digital nomad visa** (how its holders' foreign income is taxed: many exempt it
  if the stay or permit meets conditions; some tax it normally once resident) and every **expat or
  impatriate regime** (e.g. Netherlands 30% ruling, Italy impatriati, Spain Beckham, Portugal IFICI,
  Greece 5C, Denmark researcher scheme, Sweden expert relief, Finland key employee, Israel new
  immigrant). Give `treatment`, `flat_rate` or `exempt_share`, `min_income` (annual, local or stated
  currency), `max_income` where the regime is capped, `duration_years` (realistic including renewals:
  e.g. a 1-year visa renewable once = 2), whether it needs foreign income or a local employer, and
  whether social security still applies. A visa that does not change tax at all can still be listed
  with `treatment: "standard"` (it matters for access).
- `costs`: for the city a professional would most likely live in: `rent_1bed_monthly` and
  `rent_2bed_monthly` (city centre or popular expat area; median of described listings or a market
  report), optional `coworking_monthly`. Each `CostItem` needs value, year, description (sample size,
  area, furnished or not) and a real source.
- `residence_routes`: one paragraph per citizenship group (EU, US, other) on how a remote worker and a
  skilled employee get the right to live and work there.

## Dossier

Write `docs/income/<ISO3>.md`:

```markdown
# <Name> — earned income, nomad and expat dossier

Last reviewed: 2026-10-15
Tax year: 2026

## Summary
## Income tax and social security
## Digital nomad visa
## Expat regimes
## Living costs
## Residence routes
## Open questions
## Sources
## Change log
- 2026-10-15: initial research.
```

`Last reviewed:` must equal `researched_on`. List every URL from the JSON under Sources.

## Addendum (2026-10-15): local work and exemption thresholds

- `covers_local_work` (required for every regime with `requires_foreign_income: true`): does the relief
  reach pay for work **physically performed in the country** while living there? A remote worker's
  fees from foreign clients, or salary from a foreign employer, are in most systems **locally
  sourced** when the work is done in the country, so foreign-income, remittance-basis and territorial
  exemptions usually do **not** cover them (`false`). Nomad visas that expressly exempt the holder's
  remote-work income (e.g. by statute or decree) are `true`. Cite the provision. If it cannot be
  established, leave `null`: the regime is then shown but not counted in the scores.
- `exemption_threshold`: for `partial_exemption` regimes whose exempt share only applies above an
  amount (e.g. Taiwan Gold Card: 50% of salary above TWD 3 million).
- `social_security_deductible`: the share (0-1) of the individual's own social security contributions that is
  deducted from taxable income before the brackets. Most of Europe deducts them fully (1); some countries only the
  pension part, or not at all (0). Cite the provision or PwC's "Deductions" page.
