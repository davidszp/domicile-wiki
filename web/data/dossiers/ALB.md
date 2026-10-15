# Albania — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Albania taxes residents on worldwide income. Capital gains on shares and real estate are taxed at a flat 15% and dividends at a flat 8%. There is no net wealth tax. Inheritances and gifts between first- and second-order legal heirs (which covers parents to children) are exempt from the 15% inheritance and gift tax. No special tax regime for wealthy arrivals was found. Confidence is medium: this rests mainly on PwC (reviewed July 2026), and the new Income Tax Law No. 29/2023 (in force 1 January 2024) was not read in the original.

## Residence and eligibility

Resident if the individual has a permanent home in Albania or stays more than 183 days in a calendar year (consecutively or not). Treaty rules prevail.

- **Residence permit** (EU, US, OTHER): Albania is not in the EU. Foreigners need a residence permit; US citizens historically could stay one year visa-free (not re-verified). Permit grounds were not researched in this pass.

Standard regime eligibility: Tax resident with a permanent home in Albania or presence of more than 183 days in the calendar year. Non-citizens need a residence permit.

## Capital gains

Capital gains on shares are taxed at 15% (sale price minus purchase price or nominal value). Gains on the sale of land or buildings are also taxed at 15%. Residents are taxed on worldwide income, so gains on foreign securities are in scope.

JSON values: headline rate 15% (`0.15`); listed securities domestic 15% (`0.15`), foreign 15% (`0.15`); private business sale 15% (`0.15`); local real estate 15% (`0.15`); foreign real estate 15% (`0.15`).

- **How the JSON numbers were derived:** Flat 15% on the gain for shares and real estate per PwC (reviewed 22 Jul 2026). PwC does not distinguish listed/foreign shares; worldwide taxation is assumed to apply the same rate to foreign gains and foreign real estate.
- **Professional-trader risk:** Regular trading could be treated as business income (15% up to ALL 14 million, 23% above, 0% for small businesses with turnover up to ALL 14 million until 2029). No specific guidance found.
- **Foreign assets:** Residents are taxed on all sources of income in and outside Albania; relief for foreign tax under treaties (42 in force).
- **Important exceptions / announced changes:** Law No. 29/2023 'On Income Tax' replaced Law 8438/1998 from 1 January 2024; PwC lists no 2025 changes to capital gains.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Albania – Individual – Income determination](https://taxsummaries.pwc.com/albania/individual/income-determination); [Albania – Individual – Taxes on personal income](https://taxsummaries.pwc.com/albania/individual/taxes-on-personal-income); [Albania – Individual – Significant developments](https://taxsummaries.pwc.com/albania/individual/significant-developments)

## Dividends

Dividends received by individuals are taxed at a flat 8%. Residents are taxed on worldwide income, so foreign dividends are in scope.

JSON values: headline 8% (`0.08`); domestic 8% (`0.08`); foreign gross 8% (`0.08`); foreign tax relief: credit.

- **How the JSON numbers were derived:** Flat 8% dividend rate per PwC Taxes on personal income (reviewed 22 Jul 2026), applied to foreign dividends on the assumption that the same rate applies under worldwide taxation.
- **Outbound withholding:** 8% domestic WHT on dividends to non-residents, reduced by treaty to 5% in many cases.
- **Treaty network:** 46 treaties signed, 42 in force (PwC), mainly European states plus China, India, Turkey, UAE, Qatar, Singapore, UK. No treaty with the United States.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Albania – Individual – Taxes on personal income](https://taxsummaries.pwc.com/albania/individual/taxes-on-personal-income); [Albania – Corporate – Withholding taxes](https://taxsummaries.pwc.com/albania/corporate/withholding-taxes)

## Inheritance and gifts to children

Inheritances and gifts are taxed at 15% without deduction of costs, but transfers to and between legal heirs of the first and second order (which includes children) and between siblings are exempt. Children therefore inherit and receive gifts tax-free.

JSON values: basis `beneficiary`, bracket mode `marginal`, children `fully_exempt`, exemption ALL 0, marginal brackets above the exemption: none; other transfer costs 0% (`0`); gifts same as inheritance: True; tax-free after years: None.

- **Gifts:** Gifts follow the same rules: 15% in general, exempt between first- and second-order legal heirs.
- **Business relief:** No business relief relevant (children exempt or not researched). Covers listed portfolios: no.
- **Foreign assets:** Not specified by PwC.
- **Domicile / residence rules:** Not specified by PwC.
- **Exemptions and thresholds:** Exempt: transfers from or between first- and second-order legal heirs and siblings; otherwise up to ALL 5 million of immovable and ALL 1 million of movable assets exempt.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Albania – Individual – Other taxes](https://taxsummaries.pwc.com/albania/individual/other-taxes)

## Wealth tax

Albania has no net wealth tax. Buildings are subject to an annual property tax (residential 0.05% of value per PwC).

JSON type: `none`.

- **Property tax (not a wealth tax):** Annual building tax: residential 0.05% of property value, commercial 0.2% (PwC).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Albania – Individual – Other taxes](https://taxsummaries.pwc.com/albania/individual/other-taxes)

## Special regimes

None modelled; see the summary and open questions for regimes considered and rejected.

## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 15% (`0.15`).

Standard CIT 15%. Reduced 5% for certain software producers (to end-2025) and agricultural co-operatives/agro-tourism (to end-2029). 8% WHT on outbound dividends.

## Cost of living notes

City: Tirana.

- **Prime rent (monthly):** EUR 2,500 (2026). Median asking rent (EUR 2,500/month) of the 25 villas for rent in Tirana whose agency reference codes indicate a 2025–26 listing date (range EUR 1,000–10,000), out of 176 villa rentals listed in Real Estate Albania's 'Villa for rent in Tirana' section (12 pages) on 2026-10-15; the median of all 176, including older listings, is EUR 2,000. Bedroom counts are not consistently given, so the sample is villas generally (typically 200–500 m² built, often in Lundër/Long Hill, TEG, Sauk, Farka); some are offered for office use. Agency asking prices, not achieved rents. The reading of reference codes as month-year is our inference. Source: [Villa for rent in Tirana](https://www.realestate.al/en/villa-for-rent-in-Tirana)
- **International school (annual, per child):** EUR 14,950 (2026). World Academy of Tirana (IB, Orbital Education), 2026–27: DP1 (age 16) tuition EUR 13,950 plus a EUR 1,000 yearly guarantee fee = EUR 14,950 (DP2 EUR 14,370 + 1,000; MYP EUR 11,350–11,500 + 1,000). One-off EUR 550 registration fee. Meals not included for DP. Source: [WAT Fee Schedule 2026–2027](https://oe-wat.files.svdcdn.com/production/documents/Fees-2026-27/WAT-Fee-Schedule-2026-2027.pdf?dm=1774355038)

Rent from Real Estate Albania's villa-rental listings (agency site); Century 21 Albania, Merrjep.al and Indomio could not be read. Tirana International School (QSI) does not publish fees.

## Open questions

- Law No. 29/2023 was not read in the original; rates rely on PwC (reviewed July 2026).
- (standard / capital_gains) Whether gains on foreign listed securities are taxed at 15% as 'investment income' or under another category of Law 29/2023 was not confirmed from the statute.
- (standard / capital_gains) Whether any holding-period or main-residence exemption exists under Law 29/2023 was not verified.
- (standard / dividends) Whether foreign dividends are taxed at 8% or as 'other investment income' at 15% was not confirmed from Law 29/2023.
- (standard / inheritance) The exact statutory article and whether the exemption depends on the heir's residence or registration were not verified.

US citizens: No US–Albania income tax treaty was found in the PwC treaty list, so US citizens rely on the US foreign tax credit for Albanian tax.

## Sources

- [Albania – Individual – Income determination](https://taxsummaries.pwc.com/albania/individual/income-determination) — PwC Worldwide Tax Summaries (professional)
- [Albania – Individual – Taxes on personal income](https://taxsummaries.pwc.com/albania/individual/taxes-on-personal-income) — PwC Worldwide Tax Summaries (professional)
- [Albania – Individual – Significant developments](https://taxsummaries.pwc.com/albania/individual/significant-developments) — PwC Worldwide Tax Summaries (professional)
- [Albania – Corporate – Withholding taxes](https://taxsummaries.pwc.com/albania/corporate/withholding-taxes) — PwC Worldwide Tax Summaries (professional)
- [Albania – Individual – Other taxes](https://taxsummaries.pwc.com/albania/individual/other-taxes) — PwC Worldwide Tax Summaries (professional)
- [Albania – Individual – Residence](https://taxsummaries.pwc.com/albania/individual/residence) — PwC Worldwide Tax Summaries (professional)
- [Albania – Corporate – Taxes on corporate income](https://taxsummaries.pwc.com/albania/corporate/taxes-on-corporate-income) — PwC Worldwide Tax Summaries (professional)
- [WAT Fee Schedule 2026–2027](https://oe-wat.files.svdcdn.com/production/documents/Fees-2026-27/WAT-Fee-Schedule-2026-2027.pdf?dm=1774355038) — World Academy of Tirana (other)
- [Villa for rent in Tirana](https://www.realestate.al/en/villa-for-rent-in-Tirana) — Real Estate Albania (realestate.al) (other)

## Change log

- 2026-10-15: initial research.
- 2026-10-15: phase 2 data-quality pass: added World Academy of Tirana 2026-27 IB Diploma fee (EUR 14,950 incl. guarantee fee). Prime rent not sourced (listing portals not machine-readable), so the cost metric stays unscored.
- 2026-10-15: cost-of-living pass: added Tirana prime rent (EUR 2,500/month, median of 25 recent villa-rental listings on Real Estate Albania), so the household cost metric is now scorable.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
