# North Macedonia — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

North Macedonia taxes residents on worldwide income at a flat 10%. Capital gains are taxed on 90% of the gain (9% effective), but gains on securities and investment fund shares held more than two years are taxed at 0%, and real estate held more than five years is exempt. Dividends are taxed at 10%. There is no net wealth tax, and heirs and donees of the first order of succession are exempt from inheritance and gift tax. No special regime for wealthy arrivals.

## Residence and eligibility

Resident if permanent or temporary residence in North Macedonia; temporary residence means 183 days or more in any 12-month period. Treaty rules prevail.

- **Residence permit** (EU, US, OTHER): Not in the EU; all foreigners need a residence permit. Routes not researched in this pass.

Standard regime eligibility: Resident with permanent or temporary residence in North Macedonia, the latter meaning 183 days or more within any 12-month period. Non-citizens need a residence permit.

## Capital gains

Capital gains are taxed at the flat 10% rate on 90% of the realised gain. Gains on securities and investment fund shares held for more than two years are taxed at 0% (since 1 January 2023). Real estate sold more than five years after purchase is exempt (three years if lived in for at least one year).

JSON values: headline rate 10% (`0.1`); listed securities domestic 0% (`0.0`), foreign 0% (`0.0`); private business sale 9% (`0.09`); local real estate 0% (`0.0`); foreign real estate not known (null).

- **How the JSON numbers were derived:** Listed securities (domestic and foreign) held >2 years: 0%. Private company share (udel/LLC interest, not a security): 10% x 90% = 9%. Local real estate held >5 years: exempt. Foreign real estate left null: application of the holding-period exemption to foreign property not confirmed.
- **Holding periods:** Securities and fund shares: 0% after more than 2 years. Real estate: exempt after 5 years, or 3 years if lived in for at least one year before sale.
- **Professional-trader risk:** No specific guidance found.
- **Foreign assets:** Residents taxed on worldwide income with treaty relief (49 treaties).
- **Exemptions and thresholds:** Exempt: IPO securities, inherited/gifted securities sold after two years, long-term state/municipal bonds, inherited/gifted real estate after 5 years (3 if lived in).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [North Macedonia – Individual – Income determination](https://taxsummaries.pwc.com/north-macedonia/individual/income-determination); [North Macedonia – Individual – Taxes on personal income](https://taxsummaries.pwc.com/north-macedonia/individual/taxes-on-personal-income); [North Macedonia – Individual – Significant developments](https://taxsummaries.pwc.com/north-macedonia/individual/significant-developments)

## Dividends

Dividends are taxed at a flat 10% on the gross amount, withheld by a domestic payer. Residents are taxed on worldwide income, so foreign dividends are taxed at 10% with relief for foreign tax.

JSON values: headline 10% (`0.1`); domestic 10% (`0.1`); foreign gross 10% (`0.1`); foreign tax relief: credit.

- **How the JSON numbers were derived:** Flat 10% on gross dividends per PwC Income determination (reviewed 23 Jul 2026).
- **Outbound withholding:** 10% WHT on dividends paid abroad, reducible under treaty (0%–15%) with prior approval of the tax authority.
- **Treaty network:** 49 treaties (PwC). No treaty with the United States in the PwC list was confirmed.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [North Macedonia – Individual – Income determination](https://taxsummaries.pwc.com/north-macedonia/individual/income-determination); [North Macedonia – Individual – Taxes on personal income](https://taxsummaries.pwc.com/north-macedonia/individual/taxes-on-personal-income); [North Macedonia – Corporate – Withholding taxes](https://taxsummaries.pwc.com/north-macedonia/corporate/withholding-taxes)

## Inheritance and gifts to children

Inheritance and gift tax is levied by municipalities under the Law on Property Taxes. The heir or donee in the first order of succession (children, spouse) is exempt. Second order pays 2–3%, third order or unrelated 4–5%.

JSON values: basis `beneficiary`, bracket mode `marginal`, children `fully_exempt`, exemption MKD 0, marginal brackets above the exemption: none; other transfer costs 0% (`0`); gifts same as inheritance: True; tax-free after years: None.

- **Gifts:** Gifts follow the same rules; first-order donees are exempt.
- **Business relief:** No business relief relevant (children exempt or not researched). Covers listed portfolios: no.
- **Exemptions and thresholds:** Cash, securities and movables are taxed only above the prior year's average annual salary (relevant only to non-exempt heirs).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [North Macedonia – Individual – Other taxes](https://taxsummaries.pwc.com/north-macedonia/individual/other-taxes)

## Wealth tax

No net wealth tax. Municipal property tax applies to real estate (rates not verified in this pass).

JSON type: `none`.

- **Property tax (not a wealth tax):** Municipal property tax on real estate under the Law on Property Taxes; rates not verified.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [North Macedonia – Individual – Other taxes](https://taxsummaries.pwc.com/north-macedonia/individual/other-taxes)

## Special regimes

None modelled; see the summary and open questions for regimes considered and rejected.

## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 10% (`0.1`).

CIT 10% on accounting profit adjusted for non-deductibles. Dividends from domestic taxpayers are exempt. 10% WHT on outbound dividends.

Special zones: Technological Industrial Development Zones offer incentives (not researched).

## Cost of living notes

City: Skopje.

- **Prime rent (monthly):** EUR 2,400 (2026). Median asking rent (EUR 2,400/month, about MKD 148,000) of 49 houses for rent of at least 200 m² in Skopje's Centar and Karpoš municipalities (which include Vodno, Crniče, Kozle, Zhdanec and the Bardovci villa area; range EUR 1,000–11,200), from the detail pages of the 122 Centar/Karpoš listings among the first six pages (300 listings) of Pazar3.mk's Skopje houses/villas-for-rent search on 2026-10-15. Listings with a placeholder price (EUR 1) and two explicitly for business use were excluded. Rooms are given as total rooms, so floor area is the size filter. Asking prices on a listing portal. Checked 2026-10-15 against the upper-middle-class standard. Source: [Куќи/Вили – Издавање – Скопје (houses/villas for rent, Skopje)](https://www.pazar3.mk/oglasi/zivealista/kukji-vili/izdavanje/skopje)
- **International school (annual, per child):** EUR 15,600 (2026). NOVA International School Skopje (IB World School, PreK–12), 2026–27 'regular tuition' for international citizens, Grades 11–12 (IB Diploma years): EUR 15,600 a year. Citizens of North Macedonia pay a reduced EUR 8,300. Extra: EUR 450 enrolment fee and EUR 500–3,000 capital fee a year (EUR 3,000 for families on regular tuition), EUR 1,000 tuition deposit and EUR 150 application fee for new students, IB DP exams about EUR 102 per exam. The school notes the higher Early Education rate applies when an employer pays; for Grades 11–12 the international rate is the only one shown for foreigners. Source: [Tuition and Fees 2026–2027](https://www.nova.edu.mk/admissions/tuition-and-fees)

Rent from Pazar3.mk listing detail pages (Centar and Karpoš); school fee from NOVA's own 2026–27 fee page. QSI International School of Skopje does not publish tuition (only a USD 600 registration fee).

## Open questions

- (standard / capital_gains) Whether interests in a limited liability company count as 'securities/shares of capital' for the 2-year 0% rule (the 90% base explicitly covers 'shares of capital') was not confirmed.
- (standard / capital_gains) Whether the 5-year real estate exemption applies to foreign real estate was not confirmed.
- (standard / dividends) Mechanism for crediting foreign WHT on foreign dividends was not verified from statute.
- (standard / inheritance) PwC does not name children explicitly; under Macedonian succession law the first order comprises descendants and the spouse (not re-verified).

US citizens: No US treaty confirmed; US citizens rely on the US foreign tax credit.

## Sources

- [North Macedonia – Individual – Income determination](https://taxsummaries.pwc.com/north-macedonia/individual/income-determination) — PwC Worldwide Tax Summaries (professional)
- [North Macedonia – Individual – Taxes on personal income](https://taxsummaries.pwc.com/north-macedonia/individual/taxes-on-personal-income) — PwC Worldwide Tax Summaries (professional)
- [North Macedonia – Individual – Significant developments](https://taxsummaries.pwc.com/north-macedonia/individual/significant-developments) — PwC Worldwide Tax Summaries (professional)
- [North Macedonia – Corporate – Withholding taxes](https://taxsummaries.pwc.com/north-macedonia/corporate/withholding-taxes) — PwC Worldwide Tax Summaries (professional)
- [North Macedonia – Individual – Other taxes](https://taxsummaries.pwc.com/north-macedonia/individual/other-taxes) — PwC Worldwide Tax Summaries (professional)
- [North Macedonia – Individual – Residence](https://taxsummaries.pwc.com/north-macedonia/individual/residence) — PwC Worldwide Tax Summaries (professional)
- [North Macedonia – Corporate – Taxes on corporate income](https://taxsummaries.pwc.com/north-macedonia/corporate/taxes-on-corporate-income) — PwC Worldwide Tax Summaries (professional)
- [Куќи/Вили – Издавање – Скопје (houses/villas for rent, Skopje)](https://www.pazar3.mk/oglasi/zivealista/kukji-vili/izdavanje/skopje) — Pazar3.mk (other)
- [Tuition and Fees 2026–2027](https://www.nova.edu.mk/admissions/tuition-and-fees) — NOVA International School Skopje (other)

## Change log

- 2026-10-15: initial research.
- 2026-10-15: cost-of-living pass: added Skopje prime rent (EUR 2,400/month, median of 49 houses of 200 m² or more in Centar/Karpoš on Pazar3.mk) and NOVA International School Grades 11–12 fee (EUR 15,600, 2026–27).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
