# Georgia — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Georgia is close to territorial for individuals. Income of a resident that does not have a Georgian source is exempt (Tax Code Art. 82(1)(u)), so foreign dividends and gains on foreign securities are untaxed. Georgian dividends bear a final 5% withholding. Gains on assets held more than two years (not used in business) are exempt; otherwise the rate is 20% (5% for a home or car). Property received as a gift or inheritance by first- and second-line heirs (children included) is exempt. No wealth tax. Residence comes from 183 days in a 12-month period, or by application as a 'high net worth individual'.

## Residence and eligibility

Resident for the tax year if physically present 183+ days in any continuous 12-month period ending in that year (Art. 34(2)). Art. 34(6): residency may also be granted to a high net worth individual (as defined in the Law on Securities Market) under rules of the Minister of Finance; Art. 34(6^2) allows other foreigners to be granted residency by the Minister's rules.

- **High net worth individual tax residency (Art. 34(6))** (EU, US, OTHER): Status granted on application to a high net worth individual as defined in the Law on Securities Market; commonly reported thresholds (assets over GEL 3 million or income over GEL 200,000 a year for three years) were not verified.
- **Visa-free stay / residence permit** (EU, US, OTHER): EU and US citizens can stay visa-free for long periods (commonly reported as one year; not verified); residence permits on investment in real estate are available (amount not verified).

Standard regime eligibility: 183+ days in Georgia in any continuous 12-month period ending in the tax year (Art. 34(2)), or residency granted as a high net worth individual (Art. 34(6)).

## Capital gains

Gains from selling assets owned more than two years are exempt unless the asset was used in economic activity (Art. 82(1)(f.c)); merely holding shares for dividends is not economic activity. A home with its land held over two years is exempt (Art. 82(1)(f.a)). Otherwise gains are taxed at 20%, or 5% for a residential apartment/house or vehicle (Art. 81(3)). Gains without a Georgian source (e.g. foreign listed shares, foreign real estate) are exempt for residents (Art. 82(1)(u)).

JSON values: headline rate 20% (`0.2`); listed securities domestic 0% (`0.0`), foreign 0% (`0.0`); private business sale 0% (`0.0`); local real estate 0% (`0.0`); foreign real estate 0% (`0.0`).

- **How the JSON numbers were derived:** Held longer than 2 years: Georgian shares and private company shares 0% (Art. 82(1)(f.c)); Georgian residential property 0% (f.a); foreign securities and foreign real estate 0% (non-Georgian source, Art. 82(1)(u)). Within 2 years: 20% (5% residential). Headline = 20% general PIT rate.
- **Holding periods:** 2 years (Art. 82(1)(f)); holding periods of a parent/testator are added for a first-line heir (Art. 82(4)(a1)).
- **Professional-trader risk:** Assets used in economic activity do not get the 2-year exemption; frequent trading could be treated as economic activity (no guidance checked).
- **Foreign assets:** Non-Georgian-source income of resident individuals exempt (Art. 82(1)(u)).
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **Sources:** [Tax Code of Georgia (Law No. 3591, consolidated version 30/09/2026)](https://matsne.gov.ge/en/document/view/1043717); [Georgia – Individual – Income determination](https://taxsummaries.pwc.com/georgia/individual/income-determination); [Georgia – Individual – Taxes on personal income](https://taxsummaries.pwc.com/georgia/individual/taxes-on-personal-income)

## Dividends

Dividends paid by a Georgian company to an individual are taxed at source at 5% (Art. 130(1)), final. Foreign dividends are non-Georgian-source income and exempt for resident individuals (Art. 82(1)(u)).

JSON values: headline 5% (`0.05`); domestic 5% (`0.05`); foreign gross 0% (`0.0`); foreign tax relief: exemption.

- **How the JSON numbers were derived:** Domestic 5% final WHT; foreign 0% because exempt as non-Georgian-source income.
- **Outbound withholding:** 5% on dividends to non-residents (treaty 0–15%). Companies pay 15% profit tax on distributed profit.
- **Treaty network:** 58 treaties (PwC).
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **Sources:** [Tax Code of Georgia (Law No. 3591, consolidated version 30/09/2026)](https://matsne.gov.ge/en/document/view/1043717); [Georgia – Corporate – Withholding taxes](https://taxsummaries.pwc.com/georgia/corporate/withholding-taxes); [Georgia – Individual – Taxes on personal income](https://taxsummaries.pwc.com/georgia/individual/taxes-on-personal-income)

## Inheritance and gifts to children

No separate inheritance or gift tax. The value of property received as a gift or inheritance by first-line heirs (spouse, children, grandchildren, parents) and second-line heirs (siblings, nieces/nephews) is exempt from income tax (Art. 82(1)(g)). Third and fourth-line heirs are exempt up to GEL 150,000 a year; other gifts above GEL 1,000 are taxable at 20%.

JSON values: basis `beneficiary`, bracket mode `marginal`, children `fully_exempt`, exemption GEL 0, marginal brackets above the exemption: none; other transfer costs 0% (`0`); gifts same as inheritance: True; tax-free after years: None.

- **Gifts:** Gifts follow the same exemption (first/second-line heirs fully exempt).
- **Business relief:** No business relief relevant (children exempt or not researched). Covers listed portfolios: no.
- **Domicile / residence rules:** Income-tax based; applies to residents and to Georgian-source property for non-residents.
- **Exemptions and thresholds:** First/second-line heirs: fully exempt; third/fourth-line: GEL 150,000 a year; others: GEL 1,000 a year.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **Sources:** [Tax Code of Georgia (Law No. 3591, consolidated version 30/09/2026)](https://matsne.gov.ge/en/document/view/1043717); [Georgia – Individual – Other taxes](https://taxsummaries.pwc.com/georgia/individual/other-taxes)

## Wealth tax

No net wealth tax. Property tax applies to individuals whose annual family income exceeds GEL 40,000 (on real estate, yachts, aircraft, cars) plus land tax.

JSON type: `none`.

- **Property tax (not a wealth tax):** Property tax for families with annual income above GEL 40,000 (rates not stated by PwC; up to about 1% of market value, unverified); separate land tax.
- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **Sources:** [Georgia – Individual – Other taxes](https://taxsummaries.pwc.com/georgia/individual/other-taxes)

## Special regimes

None modelled; see the summary and open questions for regimes considered and rejected.

## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 15% (`0.15`).

Profit tax 15% (Art. 98(1)), levied on distributed profit (Estonian-style; Art. 97) rather than retained earnings; 20% for banks and lenders. 5% WHT on dividends.

## Cost of living notes

City: Tbilisi (Vake, Mtatsminda, Tskneti, Lisi Lake, Okrokana, Shindisi, Kaklebi).

- **Prime rent (monthly):** USD 3,300 (2026). Median asking rent (USD 3,300, about GEL 8,580 at the portal's conversion) of 26 private houses for rent with 4–5 bedrooms and at least 200 m² in the prime/expat districts listed (range USD 1,000–9,000), from the first six pages (144 listings) of Myhome.ge's Tbilisi houses-for-rent search on 2026-10-15. Listings are mostly quoted in USD. Asking prices on a listing portal. Source: [Private houses for rent in Tbilisi](https://www.myhome.ge/en/s/House-for-rent-Tbilisi/?deal_types=2&real_estate_types=2&cities=1)

- **School (annual, per child):** GEL 31,000 (2026). The Guivy Zaldastanishvili American Academy in Tbilisi (GZAAT), a selective private American-style high school (grades 8–12), 2026–2027 tuition for Grades 9–12 (Grade 8: GEL 19,500), plus a GEL 600 security deposit. From the school's own fee page; the International Schools Database lists the same 19,500–31,000 GEL range for 2026/2027. Source: [GZAAT — Tuition Fee](https://gzaat.org/admission/tuition-and-financial-assistance)

QSI International School of Tbilisi, BIST and the European School still do not publish tuition, so the main expat schools may cost more than GZAAT.

## Open questions

- Abkhazia and South Ossetia are outside government control.
- International school fee not published online by QSI Tbilisi, BIST (fee schedule supplied to applicants only) or the European School; only rent is sourced, so the cost metric is unscored. A fee schedule obtained from an admissions office would close this.
- (standard / capital_gains) How the source rules classify a gain on foreign shares held through a Georgian broker or custodian was not checked (source is generally the issuer's/asset's location).

US citizens: US citizens remain US-taxed; Georgia's near-zero tax on foreign income leaves nothing to credit. US–Georgia treaty status (1973 US–USSR treaty) not verified.

## Sources

- [Tax Code of Georgia (Law No. 3591, consolidated version 30/09/2026)](https://matsne.gov.ge/en/document/view/1043717) — Legislative Herald of Georgia (Matsne) (legislation)
- [Georgia – Individual – Income determination](https://taxsummaries.pwc.com/georgia/individual/income-determination) — PwC Worldwide Tax Summaries (professional)
- [Georgia – Individual – Taxes on personal income](https://taxsummaries.pwc.com/georgia/individual/taxes-on-personal-income) — PwC Worldwide Tax Summaries (professional)
- [Georgia – Corporate – Withholding taxes](https://taxsummaries.pwc.com/georgia/corporate/withholding-taxes) — PwC Worldwide Tax Summaries (professional)
- [Georgia – Individual – Other taxes](https://taxsummaries.pwc.com/georgia/individual/other-taxes) — PwC Worldwide Tax Summaries (professional)
- [Georgia – Individual – Residence](https://taxsummaries.pwc.com/georgia/individual/residence) — PwC Worldwide Tax Summaries (professional)
- [Private houses for rent in Tbilisi](https://www.myhome.ge/en/s/House-for-rent-Tbilisi/?deal_types=2&real_estate_types=2&cities=1) — Myhome.ge (TNET) (other)
- GZAAT — Tuition Fee, 2026-2027 (The Guivy Zaldastanishvili American Academy in Tbilisi, other): https://gzaat.org/admission/tuition-and-financial-assistance
- International Schools Database — Tbilisi (International Schools Database, other): https://www.international-schools-database.com/in/tbilisi

## Change log

- 2026-10-15: initial research.
- 2026-10-15: phase 2 data-quality pass: added Tbilisi prime house rent (USD 3,300/month median of 26 prime-district 4-5 bedroom listings on Myhome.ge). International school fees are not published online (QSI, BIST), so the cost metric stays unscored.
- 2026-10-15: cost-of-living pass: re-tried school fees (QSI Tbilisi, BIST incl. its policy PDFs, European School, New School); none published online. Rent unchanged; metric still unscored.
- 2026-10-15 (household cost pass): added the GZAAT Grades 9–12 tuition (GEL 31,000, 2026–27, school's own page) as the school fee; with rent already sourced the metric can now be scored.
