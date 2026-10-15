# Kosovo — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Kosovo (uses the euro) taxes residents on foreign and Kosovo income at progressive rates of 0/8/10%. Capital gains are taxed at these rates (10% at the top). Dividends received by residents are exempt. No net wealth tax. There is no separate inheritance tax: inheritances and gifts between parents and children are exempt from income tax. No special regime for wealthy arrivals.

## Residence and eligibility

Resident if any applies: temporary, usual or main residence in Kosovo; at least 183 days in Kosovo in the tax period; or personal, financial or social ties centred in Kosovo. Treaty rules prevail.

- **Residence permit** (EU, US, OTHER): Kosovo is not in the EU; foreigners staying long term need a residence permit. Not researched in this pass.

Standard regime eligibility: Resident with a usual or main residence in Kosovo, 183+ days in the tax year, or centre of vital interests in Kosovo. Foreigners need a residence permit.

## Capital gains

Gains from selling capital assets, including real estate and securities, are taxable income at the ordinary PIT rates (0% up to EUR 3,000, 8% to EUR 5,400, 10% above). For a large gain the effective rate approaches 10%.

JSON values: headline rate 10% (`0.1`); listed securities domestic 10% (`0.1`), foreign 10% (`0.1`); private business sale 10% (`0.1`); local real estate 10% (`0.1`); foreign real estate 10% (`0.1`).

- **How the JSON numbers were derived:** Top PIT rate 10% applied to the whole gain (bands are tiny). Foreign gains in scope because residents are taxed on foreign-source income.
- **Foreign assets:** Residents taxed on foreign and Kosovo-source income; 22 treaties.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Kosovo – Individual – Income determination](https://taxsummaries.pwc.com/kosovo/individual/income-determination); [Kosovo – Individual – Taxes on personal income](https://taxsummaries.pwc.com/kosovo/individual/taxes-on-personal-income)

## Dividends

Dividends received by resident and non-resident taxpayers are exempt from PIT; there is no WHT on dividends.

JSON values: headline 0% (`0.0`); domestic 0% (`0.0`); foreign gross 0% (`0.0`); foreign tax relief: not_applicable.

- **How the JSON numbers were derived:** PwC: 'Dividends received by resident and non-resident taxpayers are exempt from PIT.' Applied to foreign dividends as well (the exemption is not stated to be limited to Kosovo companies; low-to-medium confidence).
- **Outbound withholding:** No WHT on dividends (PwC).
- **Treaty network:** 22 treaties (Albania, Austria, Belgium, Croatia, Czech Republic, Finland, Germany, Hungary, Ireland, Italy, Latvia, Lithuania, Luxembourg, Malta, Netherlands, North Macedonia, Saudi Arabia, Slovenia, Switzerland, Turkey, UAE, UK).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Kosovo – Individual – Income determination](https://taxsummaries.pwc.com/kosovo/individual/income-determination); [Kosovo – Corporate – Withholding taxes](https://taxsummaries.pwc.com/kosovo/corporate/withholding-taxes)

## Inheritance and gifts to children

No separate inheritance tax. Inherited assets are handled under PIT: assets inherited by a spouse, child or parent are exempt regardless of value; for other heirs the part above EUR 5,000 is taxed at 0–10%. Gifts between parents and children (either direction) are exempt regardless of amount.

JSON values: basis `beneficiary`, bracket mode `marginal`, children `fully_exempt`, exemption EUR 0, marginal brackets above the exemption: none; other transfer costs 0% (`0`); gifts same as inheritance: True; tax-free after years: None.

- **Gifts:** Gifts above EUR 5,000 a year are taxable income except between spouses and between parents and children, which are exempt regardless of amount.
- **Business relief:** No business relief relevant (children exempt or not researched). Covers listed portfolios: no.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Kosovo – Individual – Other taxes](https://taxsummaries.pwc.com/kosovo/individual/other-taxes)

## Wealth tax

Kosovo has no net wealth tax (PwC).

JSON type: `none`.

- **Property tax (not a wealth tax):** Municipal immovable property tax applies (rates not researched).
- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **Sources:** [Kosovo – Individual – Other taxes](https://taxsummaries.pwc.com/kosovo/individual/other-taxes)

## Special regimes

None modelled; see the summary and open questions for regimes considered and rejected.

## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 10% (`0.1`).

CIT 10% on worldwide income; small taxpayers (turnover up to EUR 30,000) pay gross-receipts tax instead. No dividend WHT.

## Cost of living notes

City: Prishtina.

- **Prime rent (monthly):** EUR 1,100 (2026). Median asking rent (EUR 1,100/month) of 75 houses for rent of at least 200 m² in Prishtina municipality (range EUR 350–5,700), from the detail pages of the 158 listings on the first three pages of MerrJep.com's 'Shtëpi – me qera – Prishtinë' search on 2026-10-15. The sample mixes whole houses and floors of houses and includes some offered for office use; the expat and prime neighbourhoods (Marigona Hill/Residence, Fshati Ndërkombëtar, Veternik, Qëndresa, Dragodan) mostly ask EUR 1,200–2,500. Rooms are given as total rooms, so floor area is the size filter. Asking prices on a listing portal. Source: [Shtëpi me qera – Prishtinë (houses for rent, Prishtina)](https://www.merrjep.com/shpallje/patundshmeri/shtepi/me-qera/prishtine)
- **International school (annual, per child):** EUR 16,500 (2026). Prishtina High School (American-curriculum international school, Oasis International Schools network), 2026–27 International Tuition, High School: EUR 16,500 a year (marked as applicable where the employer does not provide a tuition allowance; national tuition is EUR 7,500). Mandatory extras for high school: MAP/IT/science EUR 145, capital fee EUR 200, registration EUR 50, payment fee EUR 395. QSI International School of Kosovo does not publish fees. Source: [Tuition Fees (Tuition policy for the 2026–2027 academic year)](https://www.prishtinahighschool.org/tuition-fees/)

Rent from MerrJep.com listing detail pages (Prishtina); school fee from Prishtina High School's own 2026–27 tuition page. QSI Kosovo does not publish fees.

## Open questions

- Kosovo is not a UN member; some international indicator datasets may be missing.
- (standard / capital_gains) Whether any holding-period or main-residence exemption applies was not verified.
- (standard / dividends) Whether foreign-source dividends are covered by the exemption was not confirmed from the PIT law.

US citizens: No US–Kosovo income tax treaty in the PwC list; US citizens rely on the foreign tax credit. Kosovo's low tax means little creditable tax.

## Sources

- [Kosovo – Individual – Income determination](https://taxsummaries.pwc.com/kosovo/individual/income-determination) — PwC Worldwide Tax Summaries (professional)
- [Kosovo – Individual – Taxes on personal income](https://taxsummaries.pwc.com/kosovo/individual/taxes-on-personal-income) — PwC Worldwide Tax Summaries (professional)
- [Kosovo – Corporate – Withholding taxes](https://taxsummaries.pwc.com/kosovo/corporate/withholding-taxes) — PwC Worldwide Tax Summaries (professional)
- [Kosovo – Individual – Other taxes](https://taxsummaries.pwc.com/kosovo/individual/other-taxes) — PwC Worldwide Tax Summaries (professional)
- [Kosovo – Individual – Residence](https://taxsummaries.pwc.com/kosovo/individual/residence) — PwC Worldwide Tax Summaries (professional)
- [Kosovo – Corporate – Taxes on corporate income](https://taxsummaries.pwc.com/kosovo/corporate/taxes-on-corporate-income) — PwC Worldwide Tax Summaries (professional)
- [Shtëpi me qera – Prishtinë (houses for rent, Prishtina)](https://www.merrjep.com/shpallje/patundshmeri/shtepi/me-qera/prishtine) — MerrJep.com (other)
- [Tuition Fees (Tuition policy for the 2026–2027 academic year)](https://www.prishtinahighschool.org/tuition-fees/) — Prishtina High School (other)

## Change log

- 2026-10-15: initial research.
- 2026-10-15: cost-of-living pass: added Prishtina prime rent (EUR 1,100/month, median of 75 houses of 200 m² or more on MerrJep.com) and Prishtina High School international high-school tuition (EUR 16,500, 2026–27).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept (EUR 1,100).
