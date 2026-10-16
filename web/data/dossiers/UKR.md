# Ukraine — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Ukraine is under martial law. Residents are taxed on worldwide income: investment profit (gains on securities) at 18% PIT plus a 5% military levy (23%); Ukrainian dividends at 5% + 5%; foreign dividends at 9% + 5%. One real-estate sale per year held over three years is exempt. There is no wealth tax. Inheritances and gifts from close family (spouse, children, parents, siblings, grandparents, grandchildren) are taxed at 0% with no military levy when the family member is a Ukrainian tax resident. The war, martial-law restrictions and security risk dominate any relocation decision.

## Residence and eligibility

Cascade: permanent home in Ukraine; if homes in two countries, centre of vital interests; otherwise 183+ days in the calendar year; finally Ukrainian citizenship.

- **Residence permit** (EU, US, OTHER): Ukraine is not in the EU; foreigners need a temporary or permanent residence permit. Martial law affects entry and exit. Not researched.

Standard regime eligibility: Resident under the permanent home / centre of vital interests / 183-day / citizenship cascade. Foreigners need a residence permit.

## Capital gains

Investment profit (gains on securities and corporate rights) is passive income taxed at 18% PIT plus the 5% military levy, 23% in total. Real estate: the first sale in a calendar year of property held more than three years is exempt; further sales in the year are taxed at 5% PIT plus 5% military levy (10%) for residents.

JSON values: headline rate 23% (`0.23`); listed securities domestic 23% (`0.23`), foreign 23% (`0.23`); private business sale 23% (`0.23`); local real estate 10% (`0.1`); foreign real estate not known (null).

- **How the JSON numbers were derived:** Securities and private business: 18% + 5% military levy = 23%. Local real estate: 0% for the first qualifying sale each year, 10% (5% + 5%) for further sales; 10% used as the top-end rate. Foreign real estate left null (treatment as foreign-source income at 18% + 5% not confirmed).
- **Holding periods:** Real estate: exempt if first sale in the year and held >3 years (not required for inherited property). No holding-period relief for securities found.
- **Professional-trader risk:** No specific guidance found.
- **Foreign assets:** Residents taxed on worldwide income with treaty relief.
- **Important exceptions / announced changes:** Military levy (військовий збір) raised from 1.5% to 5% from 1 December 2024 (Law 4015-IX) while martial law lasts; it returns to 1.5% from 1 January of the year after martial law ends.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Ukraine – Individual – Taxes on personal income](https://taxsummaries.pwc.com/ukraine/individual/taxes-on-personal-income); [Ukraine – Individual – Income determination](https://taxsummaries.pwc.com/ukraine/individual/income-determination); [Ukraine – Individual – Significant developments](https://taxsummaries.pwc.com/ukraine/individual/significant-developments)

## Dividends

Dividends from Ukrainian CIT-paying companies: 5% PIT + 5% military levy (10%). Dividends from non-residents, mutual funds and non-CIT payers: 9% + 5% (14%). 'Not ordinary' dividends: 18% + 5%.

JSON values: headline 23% (`0.23`); domestic 10% (`0.1`); foreign gross 14% (`0.14`); foreign tax relief: credit.

- **How the JSON numbers were derived:** Domestic 5% + 5% = 10%; foreign 9% + 5% = 14% (PwC, reviewed 30 Jun 2026). Headline = 23% for non-ordinary dividends.
- **Outbound withholding:** 15% WHT on dividends to non-resident companies (treaty 0/5/10%); 5% (or 18%) to non-resident individuals plus military levy.
- **Treaty network:** About 71 treaties listed by PwC, including the United States and most EU states.
- **Important exceptions / announced changes:** Military levy (військовий збір) raised from 1.5% to 5% from 1 December 2024 (Law 4015-IX) while martial law lasts; it returns to 1.5% from 1 January of the year after martial law ends.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Ukraine – Individual – Taxes on personal income](https://taxsummaries.pwc.com/ukraine/individual/taxes-on-personal-income); [Ukraine – Individual – Income determination](https://taxsummaries.pwc.com/ukraine/individual/income-determination); [Ukraine – Individual – Significant developments](https://taxsummaries.pwc.com/ukraine/individual/significant-developments)

## Inheritance and gifts to children

No separate inheritance or gift tax; inheritances and gifts are PIT income. From resident family members of the first and second degree (spouse, children, parents, siblings, grandparents, grandchildren) the rate is 0% and no military levy is due (dtkt.ua, May 2026). From other resident persons: 5% PIT + 5% military levy. From or to a non-resident: 18% PIT (plus military levy).

JSON values: basis `beneficiary`, bracket mode `marginal`, children `exempt_with_conditions`, exemption UAH 0, marginal brackets above the exemption: none; other transfer costs 0% (`0`); gifts same as inheritance: True; tax-free after years: None.

- **Gifts:** Gifts follow the same rules as inheritances (0% from close family who are Ukrainian tax residents).
- **Business relief:** No business relief relevant (children exempt or not researched). Covers listed portfolios: no.
- **Domicile / residence rules:** Residence of testator and heir decides between 0% and 18%.
- **Eligibility conditions:** 0% only if both the family member and the recipient are Ukrainian tax residents; a non-resident testator/donor or heir triggers 18%.
- **Important exceptions / announced changes:** Military levy (військовий збір) raised from 1.5% to 5% from 1 December 2024 (Law 4015-IX) while martial law lasts; it returns to 1.5% from 1 January of the year after martial law ends. Law 4113 (4 Dec 2024) applies the 5% levy to taxable inherited/gifted property.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Ukraine – Individual – Other taxes](https://taxsummaries.pwc.com/ukraine/individual/other-taxes); [Оподаткування подарунка та спадщини у 2026 році: правила для не родичів (22.05.2026)](https://news.dtkt.ua/taxation/pdfo/111281-opodatkuvannia-podarunka-ta-spadshhini-2026-pravila-dlia-ne-rodiciv); [Ukraine – Individual – Significant developments](https://taxsummaries.pwc.com/ukraine/individual/significant-developments)
- Surviving spouse (`spouse_treatment` `exempt_with_conditions`): Spouse pays 0% only on inheritance from a resident decedent; from a non-resident the rate is 18% (PwC).

## Wealth tax

Ukraine has no net wealth tax. Real estate tax is charged per square metre above exempt areas, plus UAH 25,000 a year for large residences.

JSON type: `none`.

- **Property tax (not a wealth tax):** Real estate tax set locally, capped at 1.5% of the minimum wage per m2 (max UAH 129.71/m2 in 2026) above 60 m2 (flat) or 120 m2 (house); plus UAH 25,000 a year per apartment over 300 m2 or house over 500 m2.
- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **Sources:** [Ukraine – Individual – Other taxes](https://taxsummaries.pwc.com/ukraine/individual/other-taxes)

## Special regimes

None modelled; see the summary and open questions for regimes considered and rejected.

## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 18% (`0.18`).

CIT 18%; financial institutions (except insurers) 25% from 2025; banks a temporary 50%. 15% WHT on dividends to non-resident companies.

## Cost of living notes

City: Kyiv.

- **Prime rent (monthly):** USD 3,200 (about UAH 144,000) (2026). Median asking rent of 224 distinct long-term listings of flats with 4+ rooms and at least 120 m² in the Pechersk district (Lipky, Pechersk, Chorna Hora, Zvirynets) on DOM.RIA, snapshot 2026-10-15; interquartile range USD 2,200-4,500. DOM.RIA reported 688 matches; duplicates removed. Prices as converted to USD by DOM.RIA (most quoted in USD; NBU rate 15 Oct 2026: USD 1 = UAH 44.98). Wartime market.
- **International school fee (annual, per child):** USD 19,600 (2026-27). Kyiv International School (QSI), one tuition band for ages 5 and up through Grade 12; plus Capital Fund USD 1,600 a year and a one-off USD 600 application fee. Pechersk School International's website returned 504 errors, so its fees were not read.
- Health insurance, housekeeper and price per m² not sourced.

## Open questions

- Martial law and the ongoing war make long-term relocation impractical for most families; the tool should flag this beyond tax.
- The 5% military levy reverts to 1.5% only after martial law ends.
- Cost of living: Pechersk School International's fees (psi.kiev.ua was unreachable) not checked; health insurance, housekeeper and price per m2 not sourced.
- (standard / capital_gains) The PwC pages do not set out a separate capital gains section for securities; the 18% rate relies on 'investment profit' being passive income at 18%.
- (standard / capital_gains) Treatment of a sale of foreign real estate not confirmed.
- (standard / dividends) Whether foreign WHT can be credited against the military levy as well as PIT was not verified.
- (standard / inheritance) Exact state duty / notarial costs on inheritance of real estate were not quantified.
- (standard / inheritance) Whether a non-resident parent leaving assets to a resident child triggers 18% (PwC wording: 'from or by a non-resident') was not confirmed against the Tax Code.

US citizens: US–Ukraine income tax treaty exists (listed by PwC); saving clause means US tax still applies.

## Sources

- [Ukraine – Individual – Taxes on personal income](https://taxsummaries.pwc.com/ukraine/individual/taxes-on-personal-income) — PwC Worldwide Tax Summaries (professional)
- [Ukraine – Individual – Income determination](https://taxsummaries.pwc.com/ukraine/individual/income-determination) — PwC Worldwide Tax Summaries (professional)
- [Ukraine – Individual – Significant developments](https://taxsummaries.pwc.com/ukraine/individual/significant-developments) — PwC Worldwide Tax Summaries (professional)
- [Ukraine – Individual – Other taxes](https://taxsummaries.pwc.com/ukraine/individual/other-taxes) — PwC Worldwide Tax Summaries (professional)
- [Оподаткування подарунка та спадщини у 2026 році: правила для не родичів (22.05.2026)](https://news.dtkt.ua/taxation/pdfo/111281-opodatkuvannia-podarunka-ta-spadshhini-2026-pravila-dlia-ne-rodiciv) — Дебет-Кредит (dtkt.ua) (professional)
- [Ukraine – Individual – Residence](https://taxsummaries.pwc.com/ukraine/individual/residence) — PwC Worldwide Tax Summaries (professional)
- [Ukraine – Corporate – Taxes on corporate income](https://taxsummaries.pwc.com/ukraine/corporate/taxes-on-corporate-income) — PwC Worldwide Tax Summaries (professional)
- [Ukraine – Corporate – Withholding taxes](https://taxsummaries.pwc.com/ukraine/corporate/withholding-taxes) — PwC Worldwide Tax Summaries (professional)
- [DOM.RIA - Оренда квартир у Києві, Печерський район, 4+ кімнати (search API)](https://dom.ria.com/node/searchEngine/v2/?category=1&realty_type=2&operation=3&state_id=10&city_id=10&characteristic%5B209%5D%5Bfrom%5D=4&district_id=15189) — DOM.RIA (other)
- [Kyiv International School - Fees 2026-2027](https://kyiv.qsi.org/join-kis/fees-2026-2027) — Kyiv International School (QSI) (other)
- [NBU official exchange rates, 15 Oct 2026](https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=20261015&json) — National Bank of Ukraine (government)

## Change log

- 2026-10-15: initial research.
- 2026-10-15 (household cost pass): added Kyiv prime rent USD 3,200 a month (DOM.RIA, Pechersk 4+ room flats of 120 m²+, n=224) and Kyiv International School fee USD 19,600 (2026-27).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept (USD 3,200).
- 2026-10-16: added surviving-spouse treatment.
