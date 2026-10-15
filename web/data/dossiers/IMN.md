# Isle of Man — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026/27
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Self-governing Crown Dependency outside the UK and EU. No capital gains tax, no inheritance or gift tax, no wealth tax. Income, including dividends, is taxed at 10%/21%; residents can fix their total income tax at £220,000 a year (£440,000 per couple) for 5 or 10 years.

## Residence and eligibility

No statutory definition; the Assessor decides on the facts. Individuals arriving with the intention of establishing residence are generally resident from arrival (PwC). Day-count guidance from the Income Tax Division was not verified here.

- **British/Irish citizens (Common Travel Area)** (OTHER): British and Irish citizens can live in the Isle of Man without permission; work permits may still apply to some employment.
- **Isle of Man Tier 1 (Investor) or other immigration permission** (EU, US, OTHER): Non-British, non-Irish nationals (including EU citizens since Brexit) need immigration permission under Isle of Man immigration rules, which broadly follow the UK system. Routes and thresholds were not verified in this research.

Standard regime eligibility: Tax residence in the Isle of Man (see residency test). Living there requires a right of abode / immigration permission for non-British, non-Irish nationals.

## Capital gains

The Isle of Man has no capital gains tax. Gains by a resident private investor on listed shares, bonds, a private business or real estate are not taxed. Gains that amount to trading (frequent dealing, property development) are taxed as income at up to 21%.

- **rate basis**: No capital gains tax exists. PwC lists income tax as the only tax on income ('There are no other taxes on income'); capital gains are outside the income tax charge unless they are trading profits.
- **professional trader**: Profits from a trade in shares or land (badges of trade: frequency, financing, intention) are income taxed at 10%/21%. A buy-and-hold family portfolio is not normally a trade.
- **holding period rules**: None.
- **foreign assets**: Foreign gains are equally untaxed.
- **JSON values**: `{"headline_rate": 0.0, "rates": {"listed_securities_domestic": 0.0, "listed_securities_foreign": 0.0, "private_business_sale": 0.0, "real_estate_local": 0.0, "real_estate_foreign": 0.0}}`
- **Confidence / verification**: high / partially_verified (tax year 2026/27)
- **Open question**: The PwC 'other taxes' page does not state 'no CGT' in terms; confirm with the Income Tax Division's own statement if precision on land-development profits is needed.

## Dividends

Dividends are taxed as ordinary income: 10% on the first £6,500 of taxable income (single), 21% above. A large dividend income is therefore taxed at 21% (personal allowance £17,000 is withdrawn above £100,000). Residents can elect a tax cap of £220,000 a year (see special regime).

- **rate basis**: Top marginal income tax rate 21% for 2026/27 (gov.im rates table). Manx companies are mostly taxed at 0%, so there is no imputation credit on domestic dividends.
- **exemptions thresholds**: Personal allowance £17,000 single / £34,000 jointly assessed, reduced by £1 per £2 of income above £100,000 / £200,000. 10% band £6,500 / £13,000.
- **withholding outbound**: No withholding tax on dividends paid by Isle of Man companies (PwC).
- **treaty network**: Small network of double tax agreements (UK, Guernsey, Jersey and a handful of others); no income tax treaty with the United States, so US-source dividends suffer 30% US withholding. Relief for foreign withholding tax is by credit against Manx tax.
- **JSON values**: `{"headline_rate": 0.21, "domestic_rate": 0.21, "foreign_gross_rate": 0.21, "foreign_tax_credit": "credit"}`
- **Confidence / verification**: high / verified (tax year 2026/27)
- **Open question**: Credit relief mechanics (unilateral relief for non-treaty source countries) and exact treaty count not verified from an official list.

## Inheritance and gifts to children

No inheritance tax, estate duty or gift tax. Only a court probate fee on Isle of Man assets is payable, capped at £9,422.50 for estates over £1 million (2024 schedule).

- **exemptions thresholds**: Probate court fee on the gross value of Isle of Man estate only: £31.50 up to £10,000 rising to a flat £9,422.50 above £1,000,000 (fees as at 2024). Negligible relative to a large estate, hence 0.
- **foreign assets**: No tax on foreign assets; foreign assets are not counted for the probate fee.
- **gift tax**: No gift tax.
- **domicile rules**: No domicile or residence test applies because there is no tax. A family arriving from the UK should check the UK's residence-based inheritance tax (from 6 April 2025: long-term UK residents remain within UK IHT for up to 10 years after leaving).
- **JSON values**: `{"basis": "none", "children_treatment": "fully_exempt", "exemption": 0, "other_transfer_cost_rate": 0.0, "gifts_same_as_inheritance": true}`
- **Confidence / verification**: high / verified (tax year 2026/27)
- **Open question**: Probate fee table is a 2024 law-firm reproduction, not the official Courts schedule; the 2026 amounts may be slightly higher.

## Wealth tax

No wealth tax or net worth tax.

- **property tax note**: Local rates (property tax) are charged on occupied property; amounts are modest and not a wealth tax.
- **JSON values**: `{"type": "none"}`
- **Confidence / verification**: high / verified (tax year 2026/27)

## Special regimes

### Income tax cap election (`tax_cap`)

A resident individual may elect to cap total Isle of Man income tax at £220,000 a year (£440,000 for a jointly assessed couple) for 2026/27 elections. The cap amount in the first year applies for the whole 5- or 10-year election period, and it is payable each year even if normal tax would have been lower.

- **Eligibility**: Must be, or be about to become, Isle of Man tax resident. Election in writing with details of wealth and income, approved by the Assessor; new residents must elect within 60 days of starting residence. Fixed period of 5 or 10 consecutive tax years, renewable.
- **Duration (years)**: indefinite
- **Why it does not expire**: Each election fixes the cap for 5 or 10 consecutive tax years (Income Tax Division guidance note GN51) and can be renewed by a further election, with no limit on renewals, so the cap is available for as long as the person stays resident. It ends if the person leaves or does not renew; the cap amount is fixed at the first-year figure for each election period.
- **Lump sum / cap in JSON**: 220,000 GBP a year, covers foreign_dividends, foreign_capital_gains, foreign_income_all, domestic_income. £220,000 single / £440,000 jointly assessed couple (2026/27). Payable each year of the 5- or 10-year election regardless of actual income (GN51 s3.2). Capital gains are untaxed anyway. Renewable, so treated as indefinite.

**Dividends under this regime:** Under the cap, the whole income tax bill is fixed at £220,000 (single) or £440,000 (couple) a year, so additional dividends carry no extra Manx tax once ordinary tax at 21% would exceed the cap (roughly £1.05m of taxable income for a single person).

- **rate basis**: Marginal rate above the cap is 0; the fixed annual cap is modelled as the lump sum. Only worthwhile if 21% of taxable income would exceed £220,000.
- **withholding outbound**: No withholding tax on dividends paid by Isle of Man companies.
- **treaty network**: As standard regime; foreign withholding tax is a final cost once the cap binds.
- **JSON values**: `{"headline_rate": 0.0, "domestic_rate": 0.0, "foreign_gross_rate": 0.0, "foreign_tax_credit": "not_applicable"}`
- **Confidence / verification**: high / verified (tax year 2026/27)

## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 0.0.

Standard corporate income tax rate 0%. 10% applies to deposit-taking banking and to retail profits above £500,000; 20% applies to Isle of Man land and property income. No withholding tax on dividends. Economic substance rules apply to relevant activities.

## Cost of living notes

City: Douglas.

- **Prime rent (monthly):** 3,000 GBP (2026). Median asking rent of the 7 4-5 bedroom homes to let on the Isle of Man on Rightmove on 2026-10-15 (£1,850-£4,500 pcm; 3 in Douglas at £1,850-£3,250). Very thin market; not limited to prime homes. Source: [Rightmove - 4-5 bedroom property to rent in the Isle of Man](https://www.rightmove.co.uk/property-to-rent/find.html?locationIdentifier=REGION%5E706&minBedrooms=4&maxBedrooms=5&sortType=6).
- **International school fee (annual, per child):** 33,900 GBP (2026). King William's College (IB school, Castletown), Years 12-13 day fee 2026-27, including VAT, from the school's admissions page. Source: [King William's College - Admissions, fees](https://kwc.im/admissions/).
- Health insurance, housekeeper and price per m² not sourced. No World Bank price level for the Isle of Man, so the app cannot compute the household-cost estimate even with rent and school fee.

**Indicator overrides (non-tax scoring).** Used because the automatic World Bank/UNDP feeds have no value for this jurisdiction:
- `homicide_rate` = 1.18 (2025): One murder investigation in the year April 2025-March 2026 (report p. 5 and serious-violence section), divided by the 2024 population estimate of 84,523 (Isle of Man in Numbers 2025, Statistics Isle of Man): 1/84,523 x 100,000 = 1.18. Single-year count of a very small number; the 2024-25 report records none. Same definition as UNODC intentional homicides per 100,000. Source: [Isle of Man Constabulary Annual Report 2025-26](https://www.iompolice.im/media/mkobljkr/20252026-annual-report-updated-230726.pdf).

US citizens: No US-Isle of Man income tax treaty, so no treaty relief and no saving-clause issues; US federal tax applies on worldwide income with credit for Manx income tax paid. The fixed tax-cap payment may be creditable only to the extent it is an income tax on the year's income.

## Open questions

- Immigration routes and thresholds for non-British nationals not researched in detail.
- Whether the Isle of Man Income Tax Division publishes a day-count residence test (PwC says there is no general definition).
- Cost-of-living items not sourced (no reliable published 2026 figures found; King William's College fee schedule year unclear).

## Sources

- Isle of Man - Individual - Taxes on personal income: <https://taxsummaries.pwc.com/isle-of-man/individual/taxes-on-personal-income>
- Isle of Man - Individual - Other taxes: <https://taxsummaries.pwc.com/isle-of-man/individual/other-taxes>
- Rates and allowances (2026/27): <https://www.gov.im/categories/tax-vat-and-your-money/income-tax-and-national-insurance/individuals/residents/rates-and-allowances/>
- Isle of Man - Corporate - Withholding taxes: <https://taxsummaries.pwc.com/isle-of-man/corporate/withholding-taxes>
- How do I obtain a Grant of Probate in the Isle of Man? (fees as at 2024): <https://www.mplegal.im/info-centre/news/how-do-i-obtain-a-grant-of-probate-in-the-isle-of-man>
- Guidance Note GN51: Income Tax Cap: <https://gov.im/media/1384454/gn51-income-tax-cap-uploaded-270624.pdf>
- Isle of Man - Individual - Residence: <https://taxsummaries.pwc.com/isle-of-man/individual/residence>
- Isle of Man - Corporate - Taxes on corporate income: <https://taxsummaries.pwc.com/isle-of-man/corporate/taxes-on-corporate-income>
- Isle of Man Constabulary Annual Report 2025-26: <https://www.iompolice.im/media/mkobljkr/20252026-annual-report-updated-230726.pdf>
- King William's College - Admissions, fees: <https://kwc.im/admissions/>
- Rightmove - 4-5 bedroom property to rent in the Isle of Man: <https://www.rightmove.co.uk/property-to-rent/find.html?locationIdentifier=REGION%5E706&minBedrooms=4&maxBedrooms=5&sortType=6>

## Change log

- 2026-10-15: initial research.
- 2026-10-15: data-quality pass: added rent (Rightmove, Isle of Man 4-5 bedrooms, £3,000/month) and King William's College fee (£33,900, Years 12-13, 2026-27); added duration_note to the tax cap; added a homicide-rate indicator override (1.18 per 100,000, Isle of Man Constabulary 2025-26).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
