# Gibraltar — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2025/26
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

- No capital gains tax. Since 2025 there is one exception: property dealing by owners of five or more taxable
  Gibraltar properties.
- No tax on interest.
- No inheritance, estate, gift or wealth tax.
- Dividends are taxable only to the extent the company's underlying income is taxable in Gibraltar, so foreign
  portfolio dividends are effectively untaxed.
- Category 2 status caps taxable income at GBP 118,000, with a GBP 37,000 minimum tax. New applicants need
  GBP 5 million of net assets from June 2026.

## Residence and eligibility

- Resident at 183 days in a tax year, or more than 300 days over three consecutive years (PwC).
- Routes: Category 2, or an ordinary permit. Post-Brexit rules for EU nationals are not researched.

## Capital gains

- PwC: "There is no tax on capital gains in Gibraltar."
- From 1 Jan 2025, property disposal profits are taxable for holders of five or more taxable properties. The primary
  residence and estate disposals are excluded.
- JSON: all rates 0.

## Dividends

- Taxable only to the extent the underlying company income is taxable in Gibraltar (PwC).
- Interest is not taxed.
- JSON: foreign 0, not_applicable. Domestic is null, because it depends on the underlying taxable profits.

## Inheritance and gifts to children

- PwC: no inheritance tax, no estate duty, no gift tax.
- Stamp duty on property transfers: 0% up to GBP 200,000, rising to 4.5% on the excess over GBP 800,000.
- JSON: basis none, fully_exempt.

## Wealth tax

None (PwC). General rates (municipal property rates) apply but are not researched.

## Special regimes

- **Category 2** (Income Tax Office Q&A, read 2026-10-15; PwC):
  - Condition: no Gibraltar residence in the previous 5 years.
  - Net assets of GBP 5 million (GBP 2 million for applications before June 2026).
  - Approved accommodation for exclusive use.
  - Taxed only under the Allowances Based System on income capped at GBP 118,000. The Income Tax Office states the
    minimum annual tax is GBP 37,000 and the maximum GBP 42,380 at current rates. PwC's example (GBP 42,380 on
    GBP 105,000) reflects an older cap. Modelled as `lump_sum` GIP 37,000 (minimum).
  - Duration: no time limit; status lasts while the Category 2 certificate is held and its conditions are met
    (`duration_note`). Family coverage not verified.
  - Not a remittance-basis regime: Gibraltar taxes on a source basis, so the 0% on foreign portfolio income does not
    depend on keeping it offshore.
- HEPSS (taxed on the first GBP 160,000 of income) is for executives with specialist skills. It is not modelled.

## Company taxation (kept separate from personal tax)

Territorial. The rate was not verified in this research.

## Cost of living notes

- Prime rent: GBP 7,000 a month = median asking rent of 13 lettings with 4+ bedrooms on PropertyGibraltar.com on
  2026-10-15 (14 listed; one at GBP 895, evidently a room let, excluded). Range GBP 3,350-14,000; South District and
  Westside villas GBP 6,700-14,000.
- School: Prior Park School Gibraltar, Years 12-13 GBP 20,994 a year (2026-27); Years 10-11 GBP 18,894.
- Amounts in GBP, entered as GIP at par.
- Property stamp duty: 0% up to GBP 200,000; above GBP 800,000: 3% on the first 350,000, 3.5% on the next 450,000,
  4.5% on the balance.
- Purchase price, health insurance and housekeeper costs are not sourced.

## Open questions

- Category 2 family coverage (maximum tax now confirmed: GBP 42,380).
- The foreign dividend rule for ordinarily resident individuals.
- The corporate tax rate.
- The treaty network.
- Purchase price, health insurance and housekeeper costs.

## Sources

- PwC, Gibraltar taxes on personal income: https://taxsummaries.pwc.com/gibraltar/individual/taxes-on-personal-income
- PwC, Gibraltar other taxes: https://taxsummaries.pwc.com/gibraltar/individual/other-taxes
- PwC, Gibraltar income determination: https://taxsummaries.pwc.com/gibraltar/individual/income-determination
- PwC, Gibraltar residence: https://taxsummaries.pwc.com/gibraltar/individual/residence
- PwC, Gibraltar other tax credits and incentives: https://taxsummaries.pwc.com/gibraltar/individual/other-tax-credits-and-incentives
- HM Government of Gibraltar, Income Tax Office, Qualifying Individuals Q&A: https://www.gibraltar.gov.gi/income-tax-office/individuals-and-employees/qualifying-individuals
- PropertyGibraltar.com, rentals with 4+ beds: https://www.propertygibraltar.com/rentals?sale=0&category=1&beds=4&order=price_desc&np=1
- Prior Park School Gibraltar, School Fees 2026-2027: https://www.priorparkgibraltar.com/school-fees

## Change log
- 2026-10-15: initial research.
- 2026-10-15 (data-quality pass): confirmed Category 2 cap (GBP 118,000), minimum (GBP 37,000) and maximum tax (GBP 42,380) from the Income Tax Office; added duration_note; added prime rent (GBP 7,000) and Prior Park fee (GBP 20,994).
