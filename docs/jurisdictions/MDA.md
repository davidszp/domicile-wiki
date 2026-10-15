# Moldova — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Moldova has a flat 12% income tax. Only 50% of a capital gain is taxable, so gains are taxed at an effective 6%. Moldovan dividends bear a final 6%; foreign dividends are taxed at 12%. There is no inheritance or gift tax (KPMG; PwC confirms inheritances received by Moldovan citizens are not taxed). A 0.8% annual 'wealth tax' applies only to residential buildings worth at least 200 average monthly salaries (about MDL 3.48 million in 2026) and at least 120 m2. Whether foreign-national residents are taxed on foreign investment income at all is unclear from the sources.

## Residence and eligibility

Resident if permanent domicile address in Moldova or present more than 183 days in the fiscal (calendar) year. Treaty rules may override.

- **Residence permit** (EU, US, OTHER): Moldova is an EU candidate, not a member; foreigners need a residence permit. Routes not researched.

Standard regime eligibility: Resident with a permanent domicile in Moldova or more than 183 days in the calendar year. Foreigners need a residence permit.

## Capital gains

There is no separate capital gains tax: 50% of the gain (sale price minus purchase price) is added to taxable income and taxed at 12%, so the effective rate is 6%. Gains on the sale of a permanent abode can be exempt; gains from donations between first-degree relatives are exempt.

JSON values: headline rate 12% (`0.12`); listed securities domestic 6% (`0.06`), foreign 6% (`0.06`); private business sale 6% (`0.06`); local real estate 6% (`0.06`); foreign real estate 6% (`0.06`).

- **How the JSON numbers were derived:** 12% x 50% taxable portion = 6% for all asset classes. Foreign gains assumed in scope (KPMG 2022: worldwide taxation), but see open question on scope for foreign nationals.
- **Foreign assets:** PwC (reviewed June 2026) says residents are taxed on Moldovan-source income and foreign income for work performed in Moldova, and that Moldovan citizens are also taxed on foreign investment and financial income. Read literally, foreign-national residents would not be taxed on foreign dividends and gains; KPMG (2022) instead describes worldwide taxation for residents. Not resolved; the scope article of the Tax Code (Art. 15/18) was not read.
- **Important exceptions / announced changes:** From 2024 certain transfers (divorce, bond redemptions, option exercises) are not recognised as gains; from 1 Jan 2025 a basis rule for stock-option shares applies (PwC).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Moldova – Individual – Income determination](https://taxsummaries.pwc.com/moldova/individual/income-determination); [Moldova – Individual – Taxes on personal income](https://taxsummaries.pwc.com/moldova/individual/taxes-on-personal-income); [Moldova – Taxation of International Executives (August 2022)](https://assets.kpmg.com/content/dam/kpmg/xx/pdf/2023/01/TIES-Moldova.pdf)

## Dividends

Dividends from Moldovan companies are taxed at a final 6% withheld at source. Foreign dividends received by a resident are declared and taxed at 12% (KPMG 2022).

JSON values: headline 12% (`0.12`); domestic 6% (`0.06`); foreign gross 12% (`0.12`); foreign tax relief: credit.

- **How the JSON numbers were derived:** Domestic 6% final (PwC 2026). Foreign 12% per KPMG (2022 edition; not re-verified for 2026). Relief method for foreign WHT not confirmed.
- **Outbound withholding:** 6% WHT on dividends to residents and non-residents (15% for 2008–2011 profits); treaty rates may be lower.
- **Treaty network:** About 50 operational treaties (PwC).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Moldova – Individual – Taxes on personal income](https://taxsummaries.pwc.com/moldova/individual/taxes-on-personal-income); [Moldova – Corporate – Withholding taxes](https://taxsummaries.pwc.com/moldova/corporate/withholding-taxes); [Moldova – Taxation of International Executives (August 2022)](https://assets.kpmg.com/content/dam/kpmg/xx/pdf/2023/01/TIES-Moldova.pdf)

## Inheritance and gifts to children

There are no inheritance or gift taxes in Moldova (KPMG). PwC: 'Patrimony received by Moldovan citizens by inheritance is not taxable'; gifts have no separate tax and fall under general rules, with donations between first-degree relatives exempt from capital-gains treatment.

JSON values: basis `none`, bracket mode `marginal`, children `fully_exempt`, exemption MDL 0, marginal brackets above the exemption: none; other transfer costs 0% (`0`); gifts same as inheritance: True; tax-free after years: None.

- **Gifts:** No separate gift tax; gifts may fall under capital-gains rules, but donations between first-degree relatives are exempt.
- **Business relief:** No business relief relevant (children exempt or not researched). Covers listed portfolios: no.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Moldova – Individual – Other taxes](https://taxsummaries.pwc.com/moldova/individual/other-taxes); [Moldova – Taxation of International Executives (August 2022)](https://assets.kpmg.com/content/dam/kpmg/xx/pdf/2023/01/TIES-Moldova.pdf); [Moldova – Individual – Income determination](https://taxsummaries.pwc.com/moldova/individual/income-determination)

## Wealth tax

Moldova's 'impozit pe avere' (introduced 2016) is a 0.8% annual tax on residential real estate (not land) owned by individuals whose estimated cadastral value is at least 200 average monthly salaries (forecast for the year) and whose area is at least 120 m2. With the 2026 forecast wage of MDL 17,400 (draft government decision), the threshold is MDL 3,480,000.

JSON type: `limited`.

- **Component Wealth tax on large residential real estate** (base `real_estate_local`, bracket mode `marginal`): allowance MDL 0, entry threshold MDL 3,480,000; brackets: 0.8% (`0.008`) from MDL 0. 0.8% of the full cadastral value once value >= 200 x forecast average monthly wage AND area >= 120 m2. Financial assets are not taxed.
- **Property tax (not a wealth tax):** Ordinary local real estate tax: minimum 0.05% for housing, rates set annually by local authorities (KPMG 2022: 0.05–0.4%).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Moldova – Individual – Other taxes](https://taxsummaries.pwc.com/moldova/individual/other-taxes); [Moldova – Taxation of International Executives (August 2022)](https://assets.kpmg.com/content/dam/kpmg/xx/pdf/2023/01/TIES-Moldova.pdf); [Proiect HG: cuantumul salariului mediu lunar pe economie prognozat pentru anul 2026 (17 400 lei)](https://gov.md/sites/default/files/media/documents/sedinte-de-guvern/2025-11/916-MMPS-2025.pdf)

## Special regimes

None modelled; see the summary and open questions for regimes considered and rejected.

## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 12% (`0.12`).

CIT 12% on worldwide income; optional 4% regime for qualifying non-VAT SMEs; 6% dividend WHT.

Special zones: Free economic zones and IT parks exist (not researched).

## Cost of living notes

City: Chișinău.

- **Prime rent (monthly):** EUR 3,500 (2026). Median asking rent (EUR 3,500/month, about MDL 70,000) of 277 houses for rent of at least 200 m² in Chișinău municipality (range EUR 800–9,600; the 214 in the prime Centru, Telecentru and Buiucani sectors have the same median), from all 635 house-rental listings ('De închiriat lunar') on 999.md retrieved on 2026-10-15. All were priced in EUR. 999.md does not show bedrooms on the results list, so floor area is the size filter; some houses are offered for office use and some agencies repeat the same house. Asking prices on a listing portal. Checked 2026-10-15 against the upper-middle-class standard. Source: [Case de închiriat lunar (houses for monthly rent)](https://999.md/ro/list/real-estate/house-and-garden?o_16_1=912&applied=1)
- **International school (annual, per child):** EUR 13,500 (2026). Heritage International School, Chișinău (Cambridge A Level in the Lyceum), Tier 2 fee (dependants of foreign nationals or temporary residents), Cambridge Pathway Grades 11–12: EUR 13,500 annual tuition plus EUR 450 registration fee (Tier 1 for Moldovan citizens: EUR 7,700 + 350). The page sets the first instalment deadline at 15 June 2026, so this is the 2026–27 schedule. Tuition includes academic expenses; paid in MDL at the bank's sell rate. QSI International School of Chișinău does not publish fees. Source: [Tuition fees and due dates](https://www.heritage.md/en/admissions/tuition-fees-and-due-dates)

Rent from 999.md (Moldova's main classifieds portal); school fee from Heritage International School's own fee table. QSI Chișinău does not publish fees.

## Open questions

- PwC (reviewed June 2026) says residents are taxed on Moldovan-source income and foreign income for work performed in Moldova, and that Moldovan citizens are also taxed on foreign investment and financial income. Read literally, foreign-national residents would not be taxed on foreign dividends and gains; KPMG (2022) instead describes worldwide taxation for residents. Not resolved; the scope article of the Tax Code (Art. 15/18) was not read.
- Transnistria is outside government control; the figures apply to government-controlled territory.
- (standard / capital_gains) PwC (reviewed June 2026) says residents are taxed on Moldovan-source income and foreign income for work performed in Moldova, and that Moldovan citizens are also taxed on foreign investment and financial income. Read literally, foreign-national residents would not be taxed on foreign dividends and gains; KPMG (2022) instead describes worldwide taxation for residents. Not resolved; the scope article of the Tax Code (Art. 15/18) was not read.
- (standard / dividends) PwC (reviewed June 2026) says residents are taxed on Moldovan-source income and foreign income for work performed in Moldova, and that Moldovan citizens are also taxed on foreign investment and financial income. Read literally, foreign-national residents would not be taxed on foreign dividends and gains; KPMG (2022) instead describes worldwide taxation for residents. Not resolved; the scope article of the Tax Code (Art. 15/18) was not read.
- (standard / wealth_tax) The 2026 average wage figure (MDL 17,400) is from a draft government decision; the adopted figure was not confirmed.
- (standard / inheritance) PwC's wording refers to Moldovan citizens; whether inheritances received by foreign-national residents are equally untaxed was not confirmed.

US citizens: US–Moldova treaty status (the 1973 US–USSR treaty) not verified.

## Sources

- [Moldova – Individual – Income determination](https://taxsummaries.pwc.com/moldova/individual/income-determination) — PwC Worldwide Tax Summaries (professional)
- [Moldova – Individual – Taxes on personal income](https://taxsummaries.pwc.com/moldova/individual/taxes-on-personal-income) — PwC Worldwide Tax Summaries (professional)
- [Moldova – Taxation of International Executives (August 2022)](https://assets.kpmg.com/content/dam/kpmg/xx/pdf/2023/01/TIES-Moldova.pdf) — KPMG (professional)
- [Moldova – Corporate – Withholding taxes](https://taxsummaries.pwc.com/moldova/corporate/withholding-taxes) — PwC Worldwide Tax Summaries (professional)
- [Moldova – Individual – Other taxes](https://taxsummaries.pwc.com/moldova/individual/other-taxes) — PwC Worldwide Tax Summaries (professional)
- [Proiect HG: cuantumul salariului mediu lunar pe economie prognozat pentru anul 2026 (17 400 lei)](https://gov.md/sites/default/files/media/documents/sedinte-de-guvern/2025-11/916-MMPS-2025.pdf) — Government of the Republic of Moldova (Ministry of Labour and Social Protection) (government)
- [Moldova – Individual – Residence](https://taxsummaries.pwc.com/moldova/individual/residence) — PwC Worldwide Tax Summaries (professional)
- [Moldova – Corporate – Taxes on corporate income](https://taxsummaries.pwc.com/moldova/corporate/taxes-on-corporate-income) — PwC Worldwide Tax Summaries (professional)
- [Case de închiriat lunar (houses for monthly rent)](https://999.md/ro/list/real-estate/house-and-garden?o_16_1=912&applied=1) — 999.md (Simpals) (other)
- [Tuition fees and due dates](https://www.heritage.md/en/admissions/tuition-fees-and-due-dates) — Heritage International School (other)

## Change log

- 2026-10-15: initial research.
- 2026-10-15: cost-of-living pass: added Chișinău prime rent (EUR 3,500/month, median of 277 houses of 200 m² or more on 999.md) and Heritage International School Tier 2 Grades 11–12 tuition (EUR 13,500, 2026–27).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
