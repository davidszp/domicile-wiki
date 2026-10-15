# Singapore — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Singapore has no capital gains tax on investment gains, no tax on Singapore one-tier dividends, does not tax foreign-sourced investment income received by individuals (dividends, interest, gains), has had no estate duty since 15 February 2008, and has no gift or wealth tax. The main costs for a wealthy family are high stamp duties on buying residential property as foreigners (additional buyer's stamp duty, ABSD, of up to 65% depending on buyer status and number of properties), progressive property tax on homes, and the high cost of living. Residence for a non-citizen investor normally runs through the EDB Global Investor Programme (PR) or an employment pass via a family office.

US citizens: US citizens stay taxed by the US on worldwide income and estates. Singapore has no comprehensive income tax treaty with the US; since Singapore does not tax foreign investment income, the US layer is the full cost. Singapore company or fund structures may be CFCs/PFICs for a US person.

## Residence and eligibility

Resident if the individual ordinarily resides in Singapore (apart from reasonable temporary absences) or is physically present or works in Singapore for 183 days or more in the calendar year before the year of assessment. Foreigners staying over three consecutive calendar years are treated as resident for all three years by concession.

- **Global Investor Programme (permanent residence) - Option A, business** (EU, US, OTHER): Invest at least SGD 10 million in a new or existing Singapore business, with a substantial business track record. Grants PR to the investor and immediate family. Thresholds per a 2026 professional summary of EDB's May 2025 factsheet; confirm with EDB. Minimum investment: 10,000,000 SGD.
- **Global Investor Programme - Option C, single family office** (EU, US, OTHER): Set up a Singapore single family office with at least SGD 200 million AUM and deploy at least SGD 50 million into specified Singapore investment categories; PR for the principal and immediate family. Option B (SGD 25 million into a GIP-select fund) also exists. Minimum investment: 50,000,000 SGD.
- **Employment pass via own family office (13O/13U fund manager)** (EU, US, OTHER): Family members employed as investment professionals by a single family office can hold employment passes; dependants' passes for spouse and children. Requirements are set by MOM/MAS and were not verified in detail.

## Capital gains

### Standard regime

No capital gains tax. IRAS states gains from the sale of property, shares and financial instruments are generally not taxable for individuals. Only gains that amount to trading (badges of trade) are taxed as income at progressive rates up to 24%.

- **Exemptions and thresholds:** No tax on capital gains of any amount; no holding period required.
- **Important exceptions, statute references and announced changes:** Gains are taxable as income if IRAS treats the activity as a trade (frequency, intention, financing, holding period). Seller's stamp duty (SSD) of up to 16% applies to residential property sold within the SSD holding period (rate up to 16% for properties bought from 4 July 2025, per PwC; the length of the holding period was not verified from an opened source). Section 10L (foreign disposal gains of entities without economic substance, from 2024) applies to entities, not to individuals holding directly.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **JSON numbers:** headline 0% (0.0); listed domestic 0% (0.0); listed foreign 0% (0.0); private business sale 0% (0.0); local real estate 0% (0.0); foreign real estate 0% (0.0).
- **How derived:** No capital gains tax for a private investor holding for investment. Local real estate 0% assumes a sale after the seller's stamp duty holding period; inside it SSD of up to 16% of price applies.
- **Holding period:** None for securities. SSD on residential property sold within the SSD holding period.
- **Trader recharacterisation:** If IRAS concludes an individual is trading (frequent short-term dealing, intention to profit from resale, borrowed money), gains become income taxed at resident rates up to 24% (above SGD 1,000,000). Long-term portfolio investment is ordinarily capital.
- **Foreign assets:** Gains on foreign assets are not taxed; foreign-sourced income received by individuals is exempt (except through a Singapore partnership).

## Dividends

### Standard regime

Dividends from Singapore companies are exempt under the one-tier system. Foreign dividends received by individuals (other than through a Singapore partnership) are not taxable, so foreign source withholding tax is the final cost and is not credited.

- **Exemptions and thresholds:** All one-tier dividends exempt; foreign-sourced investment income exempt for individuals.
- **Important exceptions, statute references and announced changes:** Foreign income received through a Singapore partnership is taxable. Singapore has no comprehensive income tax treaty with the United States, so US-source dividends paid to a Singapore-resident non-US person bear the 30% US statutory withholding tax.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **JSON numbers:** headline 0% (0.0); domestic 0% (0.0); foreign gross 0% (0.0); foreign tax relief: exemption.
- **How derived:** One-tier dividends are exempt in shareholders' hands; foreign-sourced dividends received by a resident individual are exempt, so the Singapore rate is 0% and only source-country withholding remains.
- **Outbound withholding:** Singapore levies no withholding tax on dividends paid to non-residents (0% under domestic law and all treaties).
- **Treaty network:** Large network (PwC lists about 98 partners), but the treaties with the United States, Hong Kong, Chile and Bermuda are limited (shipping/air transport or information exchange only). US dividends therefore bear 30% US WHT for a Singapore resident, a real cost for a US-heavy portfolio.
- **Holding companies:** Singapore companies pay 17% CIT; a family office fund vehicle can obtain exemptions under sections 13O/13U (MAS-approved) for specified investment income.

## Inheritance and gifts to children

### Standard regime

No inheritance tax: estate duty was removed for deaths on and after 15 February 2008. No gift tax. Transfers of Singapore shares or property to children can attract stamp duty, and a gift of residential property attracts buyer's stamp duty (and ABSD) on market value.

- **Exemptions and thresholds:** No tax of any amount on inheritances or gifts to children.
- **Important exceptions, statute references and announced changes:** Stamp duty applies to transfers of Singapore real estate (BSD/ABSD on market value) and to transfers of Singapore shares by instrument; the share stamp duty rate was not verified. Income of the estate after death remains subject to income tax.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **JSON numbers:** basis `none`, children `fully_exempt`, exemption 0 SGD, brackets (marginal): none; other transfer costs 0% (0.0).
- **Gifts:** None. Stamp duty applies to gifts of Singapore shares and real estate. (same as inheritance: True; tax-free after years: None)
- **Foreign assets:** No tax on foreign assets either.
- **Residence/domicile rules:** Not applicable; there is no estate duty for any decedent dying on or after 15 February 2008.
- **Business relief covers listed shares:** False

## Wealth tax

### Standard regime

No net wealth tax and no levy on financial assets.

- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** Annual property tax on the property's annual value: owner-occupied residential 0% to 32% (progressive), non-owner-occupied residential 12% to 36%, non-residential 10%. Buying residential property: BSD up to 6% plus ABSD up to 65% depending on residency status and number of properties (highest for foreigners and entities); nationals of certain FTA countries are treated like Singapore citizens.

## Special regimes

None modelled; see Residence and eligibility.

## Company taxation (kept separate from personal tax)

Headline CIT rate: 17% (0.17). 17% flat CIT with partial exemption on the first SGD 200,000 of chargeable income; one-tier system (no tax on dividends paid out, no dividend WHT). For YA2026 a 50% CIT rebate (capped at SGD 40,000, or SGD 38,000 plus a SGD 2,000 grant) applies. Pillar Two: Multinational Enterprise (Minimum Tax) Act 2024 introduces the domestic top-up tax (DTT) and MTT from financial years starting 1 January 2025; UTPR not adopted.
Special zones/regimes: Fund tax incentives under sections 13O (onshore fund) and 13U (enhanced-tier fund) exempt specified income of family office vehicles, subject to MAS approval, minimum AUM, local spending and investment professionals.

## Cost of living notes

City: Singapore.
- International school, annual per child: 49,926 SGD (2026). UWCSEA Grade 11-12 tuition 2026/27, per student; plus a development levy of SGD 9,537 in the first year and SGD 5,166 after. Source: UWCSEA Fee Schedule 2026/2027.
- Prime rent, monthly: 10,649 EUR (2026). Derived from Savills' average prime residential rent for Singapore as at June 2026, EUR 9.83 per m2 per week (USD 1.06 per sq ft per week; joint 8th of 30 cities, rents +1.7% in H1 2026). Savills' figure is a city-wide prime average, not a quote for a specific 4-5 bedroom home. Converted for a stated 250 m2 (about 2,690 sq ft) large prime condo or small landed home: 9.83 x 250 x 52 / 12 = EUR 10,649 a month (USD equivalent 1.06 x 2,691 x 52 / 12 = about USD 12,360). Kept in EUR as published, so no separate SGD exchange rate is assumed. Landed houses in Districts 10/11 (Holland, Bukit Timah, Nassim) are usually larger and rent for more. Source: Savills Prime Residential World Cities Index H1 2026 (report PDF, 'Prime residential rents as at June 2026').
- Housekeeper, monthly: 920 SGD (2026). Live-in migrant domestic worker employed by a foreign (non-citizen) family: MOM monthly levy SGD 300 for the first helper (2026 rate; the SGD 60 concession needs a Singapore-citizen child under 16, or a citizen/qualifying PR aged 67+ or with a disability, so it does not apply to a foreign family; a second helper costs SGD 450) plus salary SGD 620, MOM's latest published average monthly salary of a new helper hired from overseas (September 2021; transfer helpers about SGD 40 more). Singapore has no statutory minimum wage for domestic workers. Excludes food, lodging, mandatory insurance and agency fees; experienced helpers in 2026 are often paid more, so treat as a floor. Sources: MOM, Paying levy for a migrant domestic worker; MOM written answer to PQ on market salaries of MDWs, 3 Nov 2021.

Prime rent uses Savills' published June 2026 prime rent (EUR/m2/week) for a stated 250 m2 home, because listing portals (PropertyGuru, 99.co, SRX) refuse automated access. Cross-check: URA's 'Rentals of Non-Landed Residential Buildings, Quarterly' dataset on data.gov.sg (d_149ac00a2734bb0a03867bbe2ec0e7b0, 2026-Q2) gives a median of project medians of 5.76 across 154 projects (3,063 contracts) in postal districts 9, 10 and 11 (D9 5.94, D10 5.58, D11 5.19; 75th percentile of projects 6.72); the dataset metadata does not state the unit; read as SGD per sq ft per month (the unit agencies use for URA rents, e.g. Knight Frank's Q1 2026 update charts URA Realis rents in S$ per sq ft per month), it would give roughly SGD 15,500 for 2,690 sq ft, the same order as the Savills figure. Not used for the score because the unit is not confirmed in the dataset. The URA figures cover all unit sizes, and smaller units rent at higher psf. Housekeeper salary source: MOM written answer to PQ, 3 Nov 2021 (https://www.mom.gov.sg/newsroom/parliament-questions-and-replies/2021/1103-written-answer-to-pq-on-data-on-employer-types-and-market-salaries-for-the-existing-mdws). Purchase prices and family health insurance were not sourced. Foreign buyers face high ABSD on residential purchases (up to 65% depending on status), so most foreign families rent until they obtain PR.

## Open questions

- GIP thresholds (SGD 10m / 25m / 200m AUM with SGD 50m deployment) are from a professional summary of EDB's 2025 factsheet; EDB's own page did not show the figures.
- Purchase price per m2 and family private health insurance not sourced. Prime rent is a Savills city-wide prime average converted to a stated 250 m2 home, not a sample of 4-5 bedroom leases; helper salary is MOM's 2021 average (no newer official figure found).

## Sources

- Gains from sale of property, shares and financial instruments (Inland Revenue Authority of Singapore, tax_authority): https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/what-is-taxable-what-is-not/gains-from-sale-of-property-shares-and-financial-instruments
- Singapore - Individual - Income determination (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/singapore/individual/income-determination
- Singapore - Individual - Other taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/singapore/individual/other-taxes
- Income received from overseas (Inland Revenue Authority of Singapore, tax_authority): https://www.iras.gov.sg/taxes/individual-income-tax/basics-of-individual-income-tax/what-is-taxable-what-is-not/income-received-from-overseas
- Singapore - Corporate - Withholding taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/singapore/corporate/withholding-taxes
- Estate Duty (Inland Revenue Authority of Singapore, tax_authority): https://www.iras.gov.sg/taxes/other-taxes/estate-duty/estate-duty
- Singapore - Individual - Residence (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/singapore/individual/residence
- Global Investor Programme (Singapore Economic Development Board, government): https://www.edb.gov.sg/en/how-we-help/global-investor-programme.html
- Singapore Global Investor Programme (2026 rules) (VCC Singapore (advisory site), other): https://vccsingapore.com/singapore-global-investor-programme/
- Singapore - Corporate - Taxes on corporate income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/singapore/corporate/taxes-on-corporate-income
- UWCSEA Fee Schedule 2026/2027 (United World College of South East Asia, other): https://www.uwcsea.edu.sg/fs/pages/4572
- Savills Prime Residential World Cities Index H1 2026, report PDF (Savills Research, professional): https://pdf.savills.com/Savills+Prime+Residential+World+Cities+H1+2026.pdf
- Paying levy for a migrant domestic worker (MDW) (Ministry of Manpower, government): https://www.mom.gov.sg/passes-and-permits/work-permit-for-foreign-domestic-worker/foreign-domestic-worker-levy/paying-levy
- Levy concession for a migrant domestic worker (MDW) (Ministry of Manpower, government): https://www.mom.gov.sg/passes-and-permits/work-permit-for-foreign-domestic-worker/foreign-domestic-worker-levy/levy-concession
- Written answer to PQ on data on employer types and market salaries for the existing MDWs, 3 Nov 2021 (Ministry of Manpower, government): https://www.mom.gov.sg/newsroom/parliament-questions-and-replies/2021/1103-written-answer-to-pq-on-data-on-employer-types-and-market-salaries-for-the-existing-mdws
- Rentals of Non-Landed Residential Buildings, Quarterly (Urban Redevelopment Authority via data.gov.sg, government; cross-check only): https://data.gov.sg/datasets/d_149ac00a2734bb0a03867bbe2ec0e7b0/view
- Singapore Residential Market Update Q1 2026 (Knight Frank, professional; unit reference only): https://content.knightfrank.com/research/535/documents/en/singapore-residential-market-update-q1-2026-residential-12800.pdf

## Change log

- 2026-10-15: initial research.
- 2026-10-15: reviewed special-regime durations: no special regime.
- 2026-10-15 (data-quality pass): tried to add a prime rent; portals refused automated access and URA rental data needs an API key, so rent is still unsourced and the cost score stays unscored. Notes and open questions updated.
- 2026-10-15 (cost pass): added prime rent (Savills H1 2026 prime rent EUR 9.83/m2/week converted for a 250 m2 home = EUR 10,649/month; URA 2026-Q2 Districts 9-11 project medians as a cross-check) and housekeeper cost (MOM levy SGD 300 + MOM 2021 average salary SGD 620 = SGD 920/month), so the cost score can be computed. Purchase prices and family health insurance still unsourced.
