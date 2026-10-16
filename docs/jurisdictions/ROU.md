# Romania — family-office tax dossier

Last reviewed: 2026-10-16
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Romania taxes residents' dividends at 16% from 2026 and capital gains at 16% (foreign broker) or 3% final via a Romanian broker for holdings over a year, plus a small capped health contribution. There is no inheritance or gift tax for children (succession must be completed within 2 years to avoid 1% on real estate) and no general wealth tax, only a 0.9% surcharge on residential buildings worth over RON 2.5M. Rates rose sharply in 2025-2026 under the fiscal consolidation packages.

Currency: RON. All amounts are in RON unless stated.

## Residence and eligibility

Resident if domiciled in Romania, centre of vital interests in Romania, or present more than 183 days in any 12 consecutive months ending in the calendar year. Treaty tie-breakers apply.

- **EU free movement (registration certificate)** (EU): EU/EEA/Swiss citizens may reside; register with the immigration authority after 3 months (details not separately verified).
- **Long-stay visa and temporary residence permit** (US, OTHER): Non-EU nationals need a long-stay visa and residence permit for a recognised purpose (employment, business, family, etc.). No golden-visa programme identified; requirements not verified in this research.

## Capital gains

Gains on listed securities sold through a Romanian-resident intermediary (broker) are taxed by final withholding at 3% if held at least 365 days (6% if shorter). Gains on securities sold through a foreign broker, on unlisted shares, crypto and investment gold are self-declared at 16% from 1 January 2026 (10% until 2025). A 10% health contribution (CASS) applies on top, but its base is capped at 24 minimum gross salaries (RON 97,200 for 2026), so it adds at most about RON 9,720 a year.

**Exemptions and thresholds:** CASS applies once total investment and other non-salary income reaches 6 minimum gross salaries (RON 24,300 for 2026); base capped at 24 minimum salaries (RON 97,200). Real estate: tax is charged on the transfer value (not the gain): 3% if held up to 3 years, 1% if held longer. Transfers by inheritance completed within 2 years and donations between relatives up to the third degree and spouses are exempt.

**Exceptions:** The 3%/6% rate is tied to the intermediary being Romanian-resident (or a Romanian PE), not to where the security is listed: foreign shares held through a Romanian broker appear to qualify for 3%. Real-estate tax is on gross transfer value, so the effective rate on the gain is higher than 1%. Rates were raised by Law 239/2025 effective 1 January 2026 (2025: 1%/3% and 10%).

**Holding periods:** 365-day test only for intermediary-withheld gains (3% vs 6%). Real estate: 3-year test (3% vs 1% of value).

**Foreign assets:** Residents are taxed on worldwide gains. Gains via foreign brokers are self-declared in the annual single return (Declaratia unica) by 25 May of the following year.

**Professional-trader risk:** Securities gains are investment income for individuals; Romania has no specific recharacterisation of frequent private trading reported in the sources read. Regular activity organised as a business could be treated as independent activity (not verified).

**JSON numbers:** headline 0.16; rates {"listed_securities_domestic": 0.03, "listed_securities_foreign": 0.16, "private_business_sale": 0.16, "real_estate_local": 0.01, "real_estate_foreign": null}. Domestic listed: 3% final withholding via Romanian intermediary, held >=365 days. Foreign listed: 16% assuming a foreign custodian/broker (3% if a Romanian broker is used). Private business: 16% self-declared. Real estate (local): 1% of transfer value for property held >3 years, entered as 0.01 although it is levied on proceeds, not gain. CASS is capped at RON 9,720 a year and ignored in the rates.

## Dividends

Dividends are taxed at 16% from 1 January 2026 (10% in 2025, 8% in 2023-24), final. Foreign dividends are declared at the same rate with credit for foreign withholding tax. A 10% health contribution (CASS) also applies, capped at a base of 24 minimum gross salaries (RON 97,200 for 2026).

**Exemptions and thresholds:** CASS threshold RON 24,300 for 2026; cap RON 97,200 base (max RON 9,720 CASS).

**Exceptions:** Dividends from interim 2025 financial statements keep the 10% rate (Law 141/2025 art. VII(2)).

**JSON numbers:** headline 0.16, domestic 0.16, foreign gross 0.16, relief: credit. Law 141/2025 amends Fiscal Code art. 97(7) to 16% for dividends distributed from 1 January 2026. Residents are taxed on income from any source; foreign dividends go into the single return (D212) at the same rate. Foreign tax is credited only where a double tax treaty applies, with proof of payment, per country and per source of income, up to the Romanian tax on that income (Fiscal Code art. 131 and its methodological norms point 46; ANAF guidance), so a treaty-rate 15% withholding leaves 1% to pay.

**Outbound withholding:** 16% on dividends paid to non-residents (treaty reductions available). Exempt for EU/EEA parent companies holding at least 10% for at least one year.

**Treaties:** About 89 tax treaties (count of PwC treaty table), including the US (an old 1973 treaty) and all major EU states.

## Inheritance and gifts to children

Romania has no inheritance or gift tax. The only charge is on real estate: if the succession is not completed before a notary within 2 years of death, a 1% tax applies to the value of the inherited real estate. Gifts of money or securities are untaxed; donations of real estate between relatives up to the third degree and spouses are exempt from the property-transfer tax.

**Exemptions and thresholds:** Succession finalised within 2 years: no tax. Gifts: no gift tax.

**Exceptions:** Notary fees for the succession procedure apply but were not quantified (other_transfer_cost_rate set to 0 pending verification).

**Gifts:** No gift tax. Real estate donated to relatives up to the third degree or a spouse is exempt from the transfer tax; to others 3%/1% of value.

**Foreign assets:** No tax on inherited securities wherever held; the 1% late-succession charge concerns real estate.

**Scope/domicile:** Not relevant in practice since transfers to children are untaxed (subject to the 2-year rule for real estate).

**JSON numbers:** basis `beneficiary`, children `exempt_with_conditions`, exemption 0, brackets [], other transfer cost 0, gifts same as inheritance: False.
- Surviving spouse (`spouse_treatment` `exempt_with_conditions`): Same as children: nil if the succession is finalised within 2 years, otherwise 1% on real estate; no spouse exemption from the 1% was found.

## Wealth tax

No general net wealth tax. Since 2023 a special tax on high-value assets applies: residential buildings owned by individuals with a tax value above RON 2,500,000 pay a yearly tax on the excess, raised from 0.3% to 0.9% from 1 January 2026; cars costing over RON 375,000 pay the same rate on the excess for 5 years after acquisition. Financial assets are not taxed.

**Exceptions:** Applies only to Romanian residential buildings (and cars); a portfolio of securities is not touched.

**JSON type:** `limited`.
- Special tax on high-value residential buildings: base `real_estate_local`, allowance 2500000, brackets [{'from_amount': 0, 'rate': 0.009}]. 0.9% of the tax value above RON 2,500,000 (0.3% until 2025). Cars over RON 375,000 also pay 0.9% on the excess for 5 years; not modelled.

**Property tax (not a wealth tax):** Ordinary local building tax: residential 0.08%-0.2% of taxable value (minimum 0.1% under new rules from 2025), non-residential 0.2%-1.3%, set by municipalities.

## Special regimes

No special regime for newly arriving wealthy individuals was identified; only ordinary residence is modelled.

## Company taxation (kept separate from personal tax)

CIT rate 0.16. CIT 16%. Micro-company regime: 1% of revenue, limited to revenue up to EUR 100,000 from 2026 (was EUR 250,000). Minimum turnover tax 0.5% for large companies (turnover > EUR 50M) until abolished from 2027. Dividends paid to EU parents (>=10%, 1 year) exempt from WHT.

## Cost of living notes

City: Bucharest.
- Prime family-home rent (monthly): EUR 3,500 (2026). Median asking rent of 77 villa/house listings of 200-400 m² in Bucharest's northern family districts and the adjoining Voluntari/Pipera area (Pipera, Iancu Nicolae, Băneasa, Herăstrău, Dorobanți, Primăverii, Domenii, Kiseleff/Aviatorilor, Floreasca), from Storia.ro searches for Bucharest and Voluntari on 15 Oct 2026; office and commercial listings excluded; a few properties appear more than once. Range EUR 1,350-8,000. Source: Case de închiriat: Bucuresti (200-400 m²), https://www.storia.ro/ro/rezultate/inchiriere/casa/bucuresti?areaMin=200&areaMax=400&limit=72
- International school (annual, per child): EUR 29,050 (2026). American International School of Bucharest, Grades 11-12, 2026-2027: tuition EUR 28,050 plus annual building fee EUR 1,000. New students also pay a one-time registration fee (EUR 3,500 for the first child, EUR 2,000 second, EUR 1,000 third) and a EUR 250 application fee. Source: Tuition & Fees - American International School of Bucharest, https://www.aisb.ro/future-families/admissions/fees/

Prime purchase price per m², family health insurance and housekeeper cost were not sourced in this round and are omitted rather than guessed. Rent sample also used the Voluntari search: https://www.storia.ro/ro/rezultate/inchiriere/casa/ilfov/voluntari?areaMin=200&areaMax=400&limit=72

## Open questions

- Primary text of Law 239/2025 (CGT rate increases) not read; relied on PwC and Kinstellar summaries.
- Confirm that foreign-listed securities held through a Romanian broker get the 3% final withholding, and whether 16%-regime losses can be carried forward.
- Tax treatment of a Romanian resident's gain on foreign real estate not verified (real_estate_foreign left null).
- Notary/registration costs on Romanian real estate sales not quantified.
- Foreign tax credit read through ANAF guidance (art. 131, per country and source of income, treaty required), not the consolidated Code; the 16% rate on foreign-source dividends rests on Fiscalitatea.ro and PwC (art. 97(7) not opened).
- Scope of the 1% charge on a succession not finalised within 2 years (art. 111(3)): real estate only, or the whole estate? Sources disagree. A one-off derogation (Law 170/2026) was reported by one source only.
- Whether the RON 2.5M threshold applies per building or per owner's total, and the primary statute (Fiscal Code local-tax title) not read.
- Classified as a 'limited' wealth tax because it is a recurring surcharge on high-value property above a threshold, separate from the ordinary building tax.
- Notary succession fees as a share of estate value not verified.
- Whether a Romanian succession procedure is needed (and taxed) for foreign assets of a resident decedent not verified.
- Primary text of Law 239/2025 not read; CGT and high-value-asset rate increases rely on PwC and Kinstellar.
- Romania changed investment-income rates in 2023, 2025 and 2026; re-check annually.

## Sources

- [Romania - Individual - Income determination](https://taxsummaries.pwc.com/romania/individual/income-determination)
- [Romania - Individual - Significant developments](https://taxsummaries.pwc.com/romania/individual/significant-developments)
- [Major Tax And Procedural Changes In Romania (Law 239/2025)](https://webiis08.mondaq.com/tax-authorities/1722226/major-tax-and-procedural-changes-in-romania)
- [Legea nr. 141/2025 privind unele masuri fiscal-bugetare (text published by ANAF)](https://static.anaf.ro/static/10/Anaf/legislatie/L_141_2025.pdf)
- [New fiscal measures effective from 1 August 2025](https://kpmg.com/ro/ro/publicatii/2025/08/New-Fiscal-Measures-Effective-from-1-August-2025.html)
- [Romania - Corporate - Withholding taxes](https://taxsummaries.pwc.com/romania/corporate/withholding-taxes)
- [Romania - Individual - Other taxes](https://taxsummaries.pwc.com/romania/individual/other-taxes)
- [Romania - Individual - Residence](https://taxsummaries.pwc.com/romania/individual/residence)
- [Romania - Corporate - Taxes on corporate income](https://taxsummaries.pwc.com/romania/corporate/taxes-on-corporate-income)
- Case de închiriat: Bucuresti (200-400 m²): https://www.storia.ro/ro/rezultate/inchiriere/casa/bucuresti?areaMin=200&areaMax=400&limit=72
- Tuition & Fees - American International School of Bucharest: https://www.aisb.ro/future-families/admissions/fees/
- [Obtii dividende din strainatate? Ce taxe trebuie sa platesti (Fiscalitatea.ro, 23 Feb 2026)](https://www.fiscalitatea.ro/obtii-dividende-din-strainatate-ce-taxe-trebuie-sa-platesti-24711/)
- [ANAF guidance: pensions from abroad, declaration and double-taxation method (arts. 130-131 Fiscal Code)](https://static.anaf.ro/static/10/Brasov/Brasov/pensii_strainatate.pdf)
- [Fiscalitatea.ro: Art. 111 Fiscal Code, transfer of real estate (1% on successions not finalised within 2 years)](https://www.fiscalitatea.ro/venituri-din-transferul-proprietatilor-imobiliare-din-patrimoniul-personal-partea-a-3-a-1838/)

## Change log

- 2026-10-15: initial research.
- 2026-10-15: added Bucharest cost of living (Storia.ro rent sample, AISB 2026-27 fees).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
- 2026-10-16: added surviving-spouse treatment.
- 2026-10-16: 60-year recipe pass. Dividends: added the foreign tax credit rule (art. 131: treaty required, per country and source, capped at the Romanian tax) and the CASS base detail (6/12/24 salaries, dividends count net of tax); inheritance: recorded the dispute over the scope of the 1% late-succession charge. No rate changed. No holding-company regime added (an SRL would bear 16% corporate tax plus 16% on payouts).
