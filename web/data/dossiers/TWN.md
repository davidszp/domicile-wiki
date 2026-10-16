# Taiwan — family-office tax dossier

Last reviewed: 2026-10-16
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Taiwan taxes individuals on Taiwan-source income at up to 40%. Foreign income, including foreign capital gains and dividends, is reached only by the 20% alternative minimum tax (income basic tax), which applies when foreign income is TWD 1 million or more and basic income exceeds TWD 7.5 million; for a family of this size that is close to a flat 20%. Taiwan listed-share gains are exempt (0.3% transaction tax), and Taiwan dividends cost up to 28%. Estate and gift tax (10%-20%) reaches only Taiwan-situs property of foreign nationals. There is no wealth tax and no US tax treaty.

US citizens: No US-Taiwan income tax treaty in force (to the extent checked); US citizens credit Taiwan IBT against US tax on the same income. Taiwan estate tax on Taiwan assets is creditable against US estate tax within limits.

## Residence and eligibility

Foreign individuals: resident if present 183 days or more in a calendar year. ROC nationals with household registration are resident if domiciled and habitually residing, unless the 31-day rule applies.

- **Investment-based resident certificate (ARC), Employment Gold Card, APRC** (EU, US, OTHER): Residence through investment in a Taiwan business, employment, or the Employment Gold Card for professionals; permanent residence (APRC) after qualifying years or for major investors (thresholds not verified).

## Capital gains

### Taiwan resident (`standard`)

Taiwan taxes individuals' Taiwan-source income at 5%-40%. Gains on Taiwan securities are exempt from income tax (a 0.3% securities transaction tax applies to share sales). Foreign-source income, including gains on foreign securities and foreign property, is outside the regular income tax but enters the alternative minimum tax (income basic tax, IBT) at 20% once a resident's foreign income is TWD 1 million or more and basic income exceeds TWD 7.5 million, with a credit for foreign tax. Taiwan real estate acquired from 2016 is under the consolidated house and land income tax: 45% (2 years or less), 35% (2-5), 20% (5-10), 15% (over 10 years); a self-used home qualifies for TWD 4 million exemption and 10% above it.

- **Exemptions and thresholds:** IBT: the household deducts TWD 7.5 million once from its basic income and pays 20% of the rest (Income Basic Tax Act art. 13, whose text says TWD 6 million, raised to 7.5 million by the Ministry of Finance's CPI adjustment under art. 3(2); amount confirmed on the Ministry of Finance portal, updated 2026-04-15). A household's foreign income under TWD 1 million is left out entirely; at TWD 1 million or more all of it counts (art. 12). The art. 3(2) adjustment applies when the CPI has risen 10% or more since the last adjustment, in TWD 100,000 steps. Foreign tax paid is credited, but not beyond the increase in basic tax caused by that income (art. 13). The engine has no allowance, so its figure for a household with large foreign income is TWD 1.5 million (20% x 7.5 million) too high.
- **Important exceptions, statute references and announced changes:** IBT is payable only to the extent it exceeds regular income tax. For the family's scale (foreign income far above TWD 7.5 million) the effective rate approaches 20%. Gains on certain unlisted/privately placed securities are IBT add-back items.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-16)
- **JSON numbers:** headline 45% (0.45); listed domestic 0.6% (0.006); listed foreign 20% (0.2); private business sale 20% (0.2); local real estate 15% (0.15); foreign real estate 20% (0.2).
- **How derived:** Foreign gains: 20% IBT. Domestic listed: income-tax exempt, 0.3% securities transaction tax on proceeds = 0.6% of the gain assuming the gain is half the proceeds. Private business sale (unlisted Taiwan company): assumed to fall into IBT at 20% (low confidence). Local real estate held over 10 years: 15%. Headline 45% = short-holding house and land rate.
- **Holding period:** House and land tax rates fall with holding period (above).
- **Trader recharacterisation:** Securities gains remain exempt even for frequent traders (general knowledge); property dealing businesses are taxed under the house and land rules.
- **Foreign assets:** Foreign income is taxed only through IBT (20%) and only for residents (183 days or domiciled).

## Dividends

### Taiwan resident (`standard`)

Taiwan dividends of resident individuals are either included in consolidated income (up to 40%) with an 8.5% credit capped at TWD 80,000, or taxed separately at 28%. Foreign dividends are foreign-source income, outside regular tax but included in IBT at 20% (same thresholds as above) with credit for foreign tax.

- **Important exceptions, statute references and announced changes:** Dividend options of Income Tax Act art. 15: an 8.5% credit capped at TWD 80,000 per return on consolidated income, or a separate flat 28% (English text of the Act opened 2026-10-16).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-16)
- **JSON numbers:** headline 28% (0.28); domestic 28% (0.28); foreign gross 20% (0.2); foreign tax relief: credit.
- **How derived:** Domestic: separate 28% option (better than 40% less the capped credit for large dividends). Foreign: 20% IBT before credit; US 30% WHT (no treaty) would fully absorb it.
- **Outbound withholding:** 21% WHT on dividends to non-residents, reducible by treaty (corporate summary, not opened).
- **Treaty network:** About 35 comprehensive agreements; no income tax treaty with the US (the 2025 US legislation to extend treaty benefits was not verified as in force).
- **Holding companies:** CIT 20% plus 5% profit retention tax on undistributed earnings.

## Inheritance and gifts to children

### Taiwan resident (`standard`)

Estate tax applies to the estate (estate basis) at 10% up to TWD 56.21 million, 15% to TWD 112.42 million and 20% above (CPI-adjusted amounts, unchanged for 2026), after an exemption of TWD 13.33 million (Estate and Gift Tax Act art. 13, 18). For non-ROC nationals, and ROC nationals without habitual residence, only property located in Taiwan is taxed (arts. 1 and 3), and the deductions for a spouse, children, parents and others do not apply to them (art. 17, last paragraph); only the exemption does. Gift tax: 10%-20% after a TWD 2.44 million annual exemption per donor, same scope rule.

- **Exemptions and thresholds:** Estate exemption TWD 13.33 million per decedent, also for non-ROC nationals (art. 18). The family and other deductions (spouse TWD 5.53 million, TWD 560,000 per lineal descendant, parents, funeral) are for ROC nationals habitually resident in Taiwan only; art. 17 disapplies items 1-7 for non-ROC nationals and limits the funeral and debt deductions to Taiwan. Gift: TWD 2.44 million per donor per year.
- **Indexation:** art. 12-1 raises the exemption, bracket limits and deductions when the CPI has risen 10% or more since the last adjustment, from the following year; the Ministry of Finance announces them each December (2026 amounts unchanged from 2025). The JSON sets `thresholds_indexed` to true.
- **Important exceptions, statute references and announced changes:** A foreign family pays estate tax only on Taiwan-situs assets (e.g. a Taiwan home and Taiwan shares). ROC nationals are taxed worldwide if domiciled in Taiwan within two years before death or resident more than 365 days in those two years (Art. 4).
- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-16)
- **JSON numbers:** basis `estate`, children `taxed`, scope `local_assets_only`, exemption 13,330,000 TWD, brackets (marginal): 10% (0.1) from 0 TWD, 15% (0.15) from 56,210,000 TWD, 20% (0.2) from 112,420,000 TWD; other transfer costs 0% (0.0); deemed disposal 0% (0).
- **Gifts:** Gift tax 10% to TWD 28.11 million, 15% to 56.21 million, 20% above, after TWD 2.44 million per donor per year; non-nationals only on gifts of Taiwan property. (same as inheritance: False; tax-free after years: None)
- **Foreign assets:** Not taxed for non-ROC nationals (Art. 1).
- **Residence/domicile rules:** Nationality plus habitual residence (Art. 4): ROC nationals with a domicile in the two prior years or 365+ days of stay are taxed worldwide; non-nationals are always taxed on Taiwan property only.
- **Business relief covers listed shares:** False

**Surviving spouse:** For a decedent who is a non-ROC national or an ROC national living abroad, the spouse deduction (TWD 5.53 million for ROC residents) and the other family deductions of art. 17 items 1-7 do not apply (art. 17, last paragraph); the spouse is taxed like any other heir on Taiwan-situs property. Gifts between spouses are exempt, but gifts within two years of death are added back (art. 15).

## Wealth tax

### Taiwan resident (`standard`)

No net wealth tax.

- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** Land value tax 1%-5.5% of assessed land value (lower rate for owner-occupied residences, not verified) and house tax 1%-4.8% of assessed value for non-commercial buildings (PwC); luxury tax 10% on certain goods.

## Special regimes

None modelled; see Residence and eligibility. Considered for the recipe and not added (2026-10-16): the Foreign Special Professionals 50% income relief and the Gold Card are tied to Taiwan employment (from general knowledge, not checked in an opened source); a Taiwan holding company pays 20% CIT on foreign dividends and gains (Income Tax Act art. 3, worldwide income, with credit for foreign tax) and the 5% undistributed-earnings tax, then the owners pay 28% or the consolidated rate on payouts, which is worse than the 20% income basic tax on direct holding; a family trust is passed through to the beneficiary (Income Tax Act art. 3-4), so it changes no rate, and a non-ROC national's foreign assets are outside estate tax in any case.

## Company taxation (kept separate from personal tax)

Headline CIT rate: 20% (0.2). 20% CIT (income up to TWD 120,000 exempt); 5% profit retention tax on undistributed earnings; 12% corporate IBT, with proposals to raise it to 15% for Pillar Two groups.

## Cost of living notes

Not researched in this pass (no quickly verifiable sources).

### Indicator overrides

- `wgi_va` = 1.0469534 (2025), World Bank: Same WGI series the pipeline uses (WGI covers 'Taiwan, China'); the World Bank API returns it with an empty ISO3 code, so the automatic fetch drops it.
- `wgi_pv` = 0.9986707 (2025), World Bank: Same WGI series the pipeline uses (WGI covers 'Taiwan, China'); the World Bank API returns it with an empty ISO3 code, so the automatic fetch drops it.
- `wgi_ge` = 1.5111702 (2025), World Bank: Same WGI series the pipeline uses (WGI covers 'Taiwan, China'); the World Bank API returns it with an empty ISO3 code, so the automatic fetch drops it.
- `wgi_rq` = 1.1954985 (2025), World Bank: Same WGI series the pipeline uses (WGI covers 'Taiwan, China'); the World Bank API returns it with an empty ISO3 code, so the automatic fetch drops it.
- `wgi_rl` = 1.2009747 (2025), World Bank: Same WGI series the pipeline uses (WGI covers 'Taiwan, China'); the World Bank API returns it with an empty ISO3 code, so the automatic fetch drops it.
- `wgi_cc` = 1.1826295 (2025), World Bank: Same WGI series the pipeline uses (WGI covers 'Taiwan, China'); the World Bank API returns it with an empty ISO3 code, so the automatic fetch drops it.
- `life_expectancy` = 80.77 (2024), Ministry of the Interior, Department of Statistics: Life expectancy at birth, both sexes, 2024 abridged life table (male 77.42, female 84.30). A 2025 table may have been published in August 2026 but was not found.
- `homicide_rate` = 0.68 (2025), National Police Agency, Ministry of the Interior: 158 intentional homicide (故意殺人, 'murder') offences known to the police in 2025, divided by 23.35 million population implied by Table 1 (608,717 criminal cases at 2,606.96 per 100,000). Counts offences, not victims, and Taiwan's category may include attempted murder, so it is not exactly the UNODC victim-based definition (2024: 136 offences, about 0.58).

## Open questions

- The Income Basic Tax Act (Chinese text, via the Ministry of Justice database) and the Ministry of Finance portal page on the income basic tax were opened 2026-10-16; the Enforcement Rules' formula for the foreign tax credit cap was not read (the family's case is not limited by it).
- The family's Taiwan home is Taiwan-situs property taxed at 10%-20% above the TWD 13.33 million exemption; the recipe's inheritance check covers the foreign portfolio only.
- Residence and investment-immigration thresholds not verified.
- (standard.capital_gains) Treatment of gains on unlisted Taiwan shares under IBT not verified.
- (standard.capital_gains) The 2026 IBT deduction of TWD 7.5 million was confirmed from the Ministry of Finance portal text (updated 2026-04-15), not from a 2026 announcement.

## Sources

- Taiwan - Individual - Taxes on personal income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/taiwan/individual/taxes-on-personal-income
- Taiwan - Individual - Income determination (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/taiwan/individual/income-determination
- Amendments to the consolidated house and land income tax (House and Land Tax 2.0) (Lee and Li, Attorneys-at-Law, professional): https://www.leeandli.com/EN/Newsletters/6742.htm
- Taiwan - Individual - Foreign tax relief and tax treaties (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/taiwan/individual/foreign-tax-relief-and-tax-treaties
- Taiwan - Individual - Other taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/taiwan/individual/other-taxes
- Estate and Gift Tax Act (English translation) (Ministry of Justice, Laws & Regulations Database of the Republic of China (Taiwan), legislation): https://law.moj.gov.tw/ENG/LawClass/LawAll.aspx?pcode=G0340072
- Taiwan - Individual - Residence (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/taiwan/individual/residence
- Taiwan - Corporate - Taxes on corporate income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/taiwan/corporate/taxes-on-corporate-income
- Worldwide Governance Indicators, Voice and Accountability estimate, Taiwan, China (World Bank, intergovernmental): https://api.worldbank.org/v2/country/TWN/indicator/GOV_WGI_VA.EST?format=json&mrnev=1
- Worldwide Governance Indicators, Political Stability and Absence of Violence/Terrorism estimate, Taiwan, China (World Bank, intergovernmental): https://api.worldbank.org/v2/country/TWN/indicator/GOV_WGI_PV.EST?format=json&mrnev=1
- Worldwide Governance Indicators, Government Effectiveness estimate, Taiwan, China (World Bank, intergovernmental): https://api.worldbank.org/v2/country/TWN/indicator/GOV_WGI_GE.EST?format=json&mrnev=1
- Worldwide Governance Indicators, Regulatory Quality estimate, Taiwan, China (World Bank, intergovernmental): https://api.worldbank.org/v2/country/TWN/indicator/GOV_WGI_RQ.EST?format=json&mrnev=1
- Worldwide Governance Indicators, Rule of Law estimate, Taiwan, China (World Bank, intergovernmental): https://api.worldbank.org/v2/country/TWN/indicator/GOV_WGI_RL.EST?format=json&mrnev=1
- Worldwide Governance Indicators, Control of Corruption estimate, Taiwan, China (World Bank, intergovernmental): https://api.worldbank.org/v2/country/TWN/indicator/GOV_WGI_CC.EST?format=json&mrnev=1
- 113年國人平均壽命80.77歲，較上年增加0.54歲 (2024 abridged life table press release, 23 August 2025) (Ministry of the Interior, Department of Statistics, government): https://www.moi.gov.tw/News_Content.aspx?n=4&s=330934
- Statistical Tables (Yearbook): Table 4 Criminal cases known to the police by classification; Table 1 crime rate per 100,000 (National Police Agency, Ministry of the Interior, government): https://www.npa.gov.tw/en/app/data/view?module=wg055&id=8026&serno=6f85cc4f-cd02-40d9-b4ea-2c0cc066c17b
- EY Worldwide Personal Tax and Immigration Guide 2025-26 (March 2026 edition): https://www.ey.com/content/dam/ey-unified-site/ey-com/en-gl/technical/tax-guides/documents/ey-gl-worldwide-personal-immigration-tax-guide-03-2026.pdf
- Income Basic Tax Act (所得基本稅額條例), arts. 3, 12, 12-1, 13 (Ministry of Justice, legislation): https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=G0340115
- Chapter 11 Income basic tax (最低稅負制), Ministry of Finance Tax Portal, updated 2026-04-15 (tax_authority): https://www.etax.nat.gov.tw/etwmain/tax-info/understanding/tax-saving-manual/national/individual-income-tax/6xKrvGR
- Estate and Gift Tax Act art. 12-1 (Ministry of Justice, legislation): https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=12-1
- Estate and Gift Tax Act art. 17 (Ministry of Justice, legislation): https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=17
- Estate and Gift Tax Act art. 18 (Ministry of Justice, legislation): https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=G0340072&flno=18
- 115年遺產稅及贈與稅免稅額、扣除額及課稅級距 (UAnalyze, reporting the Ministry of Finance announcement of 27 Nov 2025, other): https://uanalyze.com.tw/articles/8092840298
- Income Tax Act (English), arts. 3, 3-4, 4-1, 5, 15 (Ministry of Justice, legislation): https://law.moj.gov.tw/ENG/LawClass/LawAll.aspx?pcode=G0340003

## Change log

- 2026-10-15: initial research.
- 2026-10-16: added surviving-spouse treatment.
- 2026-10-16: recipe pass: inheritance `thresholds_indexed` set to true (Estate and Gift Tax Act art. 12-1, CPI adjustment); corrected the inheritance summary and thresholds (art. 17 disapplies the spouse, children and other family deductions for non-ROC nationals; only the exemption of art. 18 applies); IBT deduction (TWD 7.5 million, household, CPI-adjusted under Income Basic Tax Act art. 3(2) and 13) and dividend options (Income Tax Act art. 15) now verified against the statutes; sources added. No rate changed.
