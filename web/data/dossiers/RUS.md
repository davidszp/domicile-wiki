# Russia — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Not a realistic option: sanctions, capital controls and suspended tax treaties make holding or moving a global portfolio from Russia impractical. On paper (from 2025), residents pay 13% on investment income (dividends, securities gains, property sales) up to RUB 2.4 million a year and 15% above. Property held more than the minimum period (3 or 5 years) is exempt on sale. Inheritances are not taxed, nor are gifts from family members and close relatives. There is no wealth tax.

## Residence and eligibility

Generally reported: resident after 183 days in Russia within 12 consecutive months. Not confirmed from the FNS page read.

- **Residence permit** (EU, US, OTHER): Not researched; sanctions and travel advisories apply.

Standard regime eligibility: Tax resident after 183 days in Russia within 12 consecutive months (generally reported; not confirmed on the FNS page read). Foreigners need a residence permit.

## Capital gains

Income from the sale of securities and property is taxed at 13% up to RUB 2.4 million of such income a year and 15% above. Property (other than securities) owned longer than the minimum holding period, three years (five in some cases), is exempt. A long-term ownership exemption exists for certain securities held over five years (details not verified).

JSON values: headline rate 15% (`0.15`); listed securities domestic 15% (`0.15`), foreign 15% (`0.15`); private business sale 15% (`0.15`); local real estate 0% (`0.0`); foreign real estate not known (null).

- **How the JSON numbers were derived:** Top investment-income rate 15% for securities and private company shares (long-term ownership exemption ignored as unverified). Local real estate held longer than the 3/5-year minimum: exempt (0). Foreign real estate left null.
- **Holding periods:** Property: exempt after 3 years (5 years in other cases) of ownership.
- **Foreign assets:** Residents taxed on worldwide income; treaty relief limited by the 2023 suspension of treaties with 'unfriendly' states (unverified).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Налог на доходы физических лиц (НДФЛ)](https://www.nalog.gov.ru/rn77/taxation/taxes/ndfl/); [Налоговые вычеты (НДФЛ)](https://www.nalog.gov.ru/rn77/taxation/taxes/ndfl/nalog_vichet/)

## Dividends

Resident individuals pay 13% on dividends up to RUB 2.4 million a year of investment income and 15% above. Foreign dividends are taxed at the same rates, with a credit for foreign tax where a treaty applies.

JSON values: headline 15% (`0.15`); domestic 15% (`0.15`); foreign gross 15% (`0.15`); foreign tax relief: credit.

- **How the JSON numbers were derived:** FNS: 13% up to RUB 2.4 million, 15% above for investment income including dividends (resident dividend rate not stated explicitly on the FNS page; inferred from the investment-income scale).
- **Outbound withholding:** Non-resident individuals: 15% on dividends from Russian companies; foreign companies: 20% profit tax on Russian dividends per FNS profit-tax page (15% is the usual WHT rate for dividends; not reconciled).
- **Treaty network:** Large historical network, but provisions with many 'unfriendly' states suspended since 2023 (unverified).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Налог на доходы физических лиц (НДФЛ)](https://www.nalog.gov.ru/rn77/taxation/taxes/ndfl/)

## Inheritance and gifts to children

Russia has no inheritance tax: income received by inheritance is not taxable. Gifts from family members and close relatives (spouses, parents, children, grandparents, grandchildren, full and half siblings) are also exempt. Gifts of real estate, vehicles or shares from others are taxable income.

JSON values: basis `beneficiary`, bracket mode `marginal`, children `fully_exempt`, exemption RUB 0, marginal brackets above the exemption: none; other transfer costs 0% (`0`); gifts same as inheritance: False; tax-free after years: None.

- **Gifts:** Gifts from family members/close relatives (Family Code definition) are exempt; gifts of real estate, vehicles, shares from others are taxable at PIT rates.
- **Business relief:** No business relief relevant (children exempt or not researched). Covers listed portfolios: no.
- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **Sources:** [Налог на доходы физических лиц (НДФЛ)](https://www.nalog.gov.ru/rn77/taxation/taxes/ndfl/)

## Wealth tax

Russia has no net wealth tax; property tax on real estate is local.

JSON type: `none`.

- **Property tax (not a wealth tax):** Local property tax on cadastral value (rates not researched).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Налог на доходы физических лиц (НДФЛ)](https://www.nalog.gov.ru/rn77/taxation/taxes/ndfl/)

## Special regimes

None modelled; see the summary and open questions for regimes considered and rejected.

## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 25% (`0.25`).

Profit tax 25% from 2025 (8% federal + 17% regional for 2025–2030). Dividends received by Russian companies 15% (0% with 50%/365-day holding).

## Cost of living notes

City: Moscow.

- **Prime rent (monthly):** RUB 465,000 (2026). Median asking rent of 360 distinct long-term listings of 4-5 room flats in the Central Administrative Okrug (Khamovniki, Presnensky, Tverskoy, Arbat and others) on Cian, snapshot 2026-10-15; interquartile range RUB 328,000-700,000. Cian reported 839 matches, 441 could be read, duplicates removed. Russian room counts include the living room (5 rooms is about 4 bedrooms). Flats only; villas in the Rublyovka suburbs are outside the sample.
- **International school fee (annual, per child):** EUR 47,900 (2026-27). International School of Moscow (Nord Anglia), Year 12 full-year tuition; the table groups Year 12 with Year 13 (IB Diploma). Payable in RUB at the Central Bank rate, at no less than 90 RUB/EUR; plus compulsory lunch EUR 1,970 a year, one-off enrolment fee RUB 600,000 and application fee RUB 50,000. The Anglo-American School of Moscow closed in 2023.
- Health insurance, housekeeper and price per m² not sourced.

## Open questions

- Russia is subject to extensive EU, US, UK and other sanctions; Western brokers and banks generally will not service Russia-resident clients, Russian capital controls apply to residents of 'unfriendly' states, and Russia suspended key provisions of its tax treaties with many 'unfriendly' states in 2023 (Presidential Decree No. 585 of 8 Aug 2023 as widely reported; not verified here). A family holding a global portfolio cannot realistically relocate there.
- PwC no longer publishes a Russia summary; figures rely on the FNS website.
- Cost of living: health insurance, housekeeper and prime price per m2 not sourced; the rent is a listing-portal sample of central flats, not an agency report.
- (standard / capital_gains) Scope and caps of the long-term ownership exemption for securities (LDV) and any 2025 cap on the property-sale exemption were not verified.
- (standard / capital_gains) Whether the minimum-holding-period exemption applies to foreign real estate was not verified.
- (standard / capital_gains) Russia is subject to extensive EU, US, UK and other sanctions; Western brokers and banks generally will not service Russia-resident clients, Russian capital controls apply to residents of 'unfriendly' states, and Russia suspended key provisions of its tax treaties with many 'unfriendly' states in 2023 (Presidential Decree No. 585 of 8 Aug 2023 as widely reported; not verified here). A family holding a global portfolio cannot realistically relocate there.
- (standard / dividends) Russia is subject to extensive EU, US, UK and other sanctions; Western brokers and banks generally will not service Russia-resident clients, Russian capital controls apply to residents of 'unfriendly' states, and Russia suspended key provisions of its tax treaties with many 'unfriendly' states in 2023 (Presidential Decree No. 585 of 8 Aug 2023 as widely reported; not verified here). A family holding a global portfolio cannot realistically relocate there.
- (standard / inheritance) Notarial fees on inheritance (state duty) were not quantified.

US citizens: US sanctions apply; the US–Russia treaty status after Russia's 2023 suspension was not verified.

## Sources

- [Налог на доходы физических лиц (НДФЛ)](https://www.nalog.gov.ru/rn77/taxation/taxes/ndfl/) — Federal Tax Service of Russia (ФНС России) (tax_authority)
- [Налоговые вычеты (НДФЛ)](https://www.nalog.gov.ru/rn77/taxation/taxes/ndfl/nalog_vichet/) — Federal Tax Service of Russia (ФНС России) (tax_authority)
- [Налог на прибыль организаций](https://www.nalog.gov.ru/rn77/taxation/taxes/profitul/) — Federal Tax Service of Russia (ФНС России) (tax_authority)
- [Cian - Снять 4, 5-комнатную квартиру в ЦАО Москвы (long-term rentals)](https://www.cian.ru/cat.php?deal_type=rent&engine_version=2&offer_type=flat&region=1&room4=1&room5=1&type=4&district%5B0%5D=4) — Cian (cian.ru) (other)
- [International School of Moscow - School fees 2026-27](https://www.nordangliaeducation.com/our-schools/russia/moscow/international/admissions/school-fees) — Nord Anglia Education / International School of Moscow (other)

## Change log

- 2026-10-15: initial research.
- 2026-10-15 (household cost pass): added Moscow cost of living: prime rent RUB 465,000 a month (Cian, central Moscow 4-5 room flats, n=360) and International School of Moscow Year 12 fee EUR 47,900 (2026-27).
