# Malta — earned income, nomad and expat dossier

Last reviewed: 2026-10-15
Tax year: 2026

## Summary

Malta's resident rates are 0%, 15%, 25% and 35%; social security is only 10% (15% self-employed) and capped at about EUR 29,084 of income. The Highly Skilled Individuals Rules give a flat 15% on eligible roles paying over EUR 65,000, for up to 15 years. The Nomad Residence Permit needs EUR 42,000 a year and is taxed at 10%. Island-wide median asking rents: EUR 750 for one bedroom, EUR 1,000 for two.

## Income tax and social security

Marginal rates on taxable income (EUR):

- from 0.00: 0.00%
- from 12,000.00: 15.00%
- from 16,000.00: 25.00%
- from 60,000.00: 35.00%

Personal allowance deducted before the brackets: 0.00 EUR.

Employee social security: 10.00% (cap: 29,084.00). Self-employed: 15.00% (cap: 29,084.00).

Single resident rates for 2026: 0% to EUR 12,000, 15% to 16,000, 25% to 60,000 and 35% above. Employees pay 10% social security, self-employed 15%, both capped at about EUR 29,084 of annual income (maximum weekly contribution EUR 55.93 and EUR 83.89).

Self-employed notes: Self-employed pay 15% of last year's net income, maximum EUR 83.89 a week for people born on or after 1 January 1962 (PwC). Cross-check: the employee fixed amount EUR 55.93 a week is 10% of a maximum weekly wage of EUR 559.30 (EUR 29,084 a year), and 15% of EUR 559.30 is EUR 83.90, so both maxima correspond to the same EUR 29,084 annual income; the recorded cap is therefore consistent, though PwC's wording is ambiguous. Part-time self-employment can qualify for 10% income tax capped at EUR 12,000.

Local tax: No local income tax. The 0% band to EUR 12,000 stands in for the tax-free amount.

## Digital nomad visa

Nomad Residence Permit (non-EU only): gross income of at least EUR 42,000 a year from a foreign employer or foreign clients; one year, renewable three times (4 years), with 5 of every 12 months in Malta. Under S.L. 123.210 the holder pays a flat 10% on income from 'authorised work' (work done remotely for non-resident employers or clients), and nothing on it for the first 12 months, so the average over a 2-year stay is 5% (flat_rate 0.05; 7.5% over four years). The relief expressly covers remote work done from Malta (covers_local_work true).

## Expat regimes

Highly Skilled Individuals Rules (L.N. 20 of 2026): 15% up to EUR 7 million, minimum EUR 65,000, eligible regulated offices, 5+5+5 years to 2040. The older Highly Qualified Persons rules give no further benefit after 2030. The Individual Tax Programme Rules (L.N. 195 of 2026, from 1 January 2027) concern wealthy remittance-based residents and are not earned-income regimes.

Regimes recorded in the JSON file:

- **Nomad Residence Permit** (digital_nomad_visa, treatment: flat_rate 0.05): Permit for non-EU remote workers with minimum gross income of EUR 42,000 a year (about EUR 3,500 a month; EUR 32,400 for applicants before 1 April 2024), either employed by a foreign-registered employer, running a business for a foreign company they co-own, or freelancing for foreign clients with no fixed place of business in Malta. Tax (S.L. 123.210, L.N. 277/2023): the holder is chargeable at 10% on income from 'authorised work', defined as services provided REMOTELY for a non-resident employer or non-resident clients under a nomad residence permit that licenses work in Malta, so pay for work done while living in Malta is exactly the covered income (covers_local_work true). Rule 3(3): no tax on that income before the end of 12 months from permit issue (or 1 January 2024 if later) unless the holder declares his residence is not casual; the holder must still register for tax. Two-phase modelling: year 1 at 0% and year 2 onward at 10% gives an average of 5% over a 2-year stay, so flat_rate is 0.05 (7.5% over the full 4 years). Social security still treated as applying (not stated in the Rules). Minimum income: 42,000 EUR. Maximum income: none. Duration (years): 4. Permit valid 1 year, renewable three times, 4 years in total (Residency Malta FAQ); renewal needs at least 5 of the previous 12 months in Malta. Tax: 0% in the first 12 months, 10% afterwards, so flat_rate 0.05 is the average over a 2-year stay (the persona horizon); over all 4 years the average would be 7.5%. Foreign income required: True. Local employment required: False. Covers work done locally: True. Social security still applies: True.
- **Highly Skilled Individuals Rules 2026 (15% rate)** (expat_regime, treatment: flat_rate 0.15): Employment income from eligible offices (roles regulated or licensed by MFSA, MGA, Transport Malta, Malta Enterprise or the Chief Medical Officer) is taxed at 15% up to EUR 7,000,000 a year and at 35% above. Requires emoluments of at least EUR 65,000 a year (rising by EUR 10,000 every five years), relevant qualifications or five years of experience, non-domicile in Malta, suitable accommodation and medical insurance. Initial five years plus two five-year extensions; no benefit beyond 31 December 2040. In force from 1 January 2026, replacing the Highly Qualified Persons and sector rules. Minimum income: 65,000 EUR. Maximum income: 7,000,000 EUR. Duration (years): 15. 5 + 5 + 5 years, ending no later than 31 December 2040. Foreign income required: False. Local employment required: True. Covers work done locally: None. Social security still applies: True.

## Living costs

Malta mainland: 1-bedroom EUR 750 a month, 2-bedroom EUR 1,000 (Global Property Guide, median asking rents, all locations).

## Residence routes

EU citizens can live and work freely with a registration. US and other non-EU remote workers use the Nomad Residence Permit (EUR 42,000 a year, one year renewable). Skilled non-EU employees get a single permit through a Maltese employer (Identità), which was not researched; the Highly Skilled Individuals Rules give the 15% rate for eligible roles for any nationality.

## Open questions

- Single-permit rules for skilled employees not researched.
- The Sliema and St Julian's rent premium over the island-wide median is not quantified from an opened source.
- Rents rest on one aggregator (island-wide medians); Sliema/St Julian's-specific rents not obtained from any opened source.
- PwC's wording ('EUR 55.93 per week for annual salaries exceeding EUR 29,084') is ambiguous; the arithmetic (10% x EUR 559.30 = 55.93; 15% x 559.30 = 83.90) supports reading it as the maximum contribution reached at EUR 29,084. The Maltese social security page returned 403.
- Nomad Residence Permit: Social security treatment of nomad permit holders is not stated in the Rules or on the Residency Malta pages (the FAQ says only that holders have no entitlement to a pension or social benefits); recorded as applying.
- Nomad Residence Permit: The 12-month exemption can be lost if the holder files a declaration that residence is not merely casual; a tax resident staying 2 years may need that declaration, in which case the first year is taxed at 10% too (not modelled; average would then be 10%).
- Nomad Residence Permit: The Residency Malta pages do not mention tax; the 10% and first-year rule come from S.L. 123.210.
- Highly Skilled Individuals Rules 2026 (15% rate): Whether self-employed individuals qualify is not covered; the sources mention employment income only.
- Highly Skilled Individuals Rules 2026 (15% rate): Social security treatment is not covered; recorded as applying.

## Sources

- PwC Worldwide Tax Summaries - Malta, taxes on personal income: https://taxsummaries.pwc.com/malta/individual/taxes-on-personal-income
- PwC Worldwide Tax Summaries - Malta, other taxes (social security): https://taxsummaries.pwc.com/malta/individual/other-taxes
- Malta digital nomad visa (Remote Work Europe): https://remoteworkeurope.eu/insights/malta-digital-nomad-visa
- Highly Skilled Individuals Rules (L.N. 20 of 2026), Deloitte Malta: https://www.deloitte.com/mt/en/services/tax/perspectives/tax-alerts/2026/Highly-Skilled-Individuals-Rules.html
- Global Property Guide - Malta rental yields (median asking rents): https://globalpropertyguide.com/Europe/Malta/Rental-Yields
- S.L. 123.210 Nomad Residence Permits (Income Tax) Rules (L.N. 277 of 2023), Malta legislation: https://legislation.mt/getpdf/65815fd48a3ed618b0827fe2
- Residency Malta - Nomad Residence Permit eligibility: https://nomad.residencymalta.gov.mt/nomad-eligibility/
- Residency Malta - Nomad Residence Permit FAQs: https://nomad.residencymalta.gov.mt/new-faqs/
- PwC Worldwide Tax Summaries - Malta - Individual - Deductions: https://taxsummaries.pwc.com/malta/individual/deductions

## Change log

- 2026-10-15: initial research.
- 2026-10-15: check pass: Nomad Residence Permit tax read in the primary text (S.L. 123.210, L.N. 277/2023): 10% on authorised (remote) work income, nil for the first 12 months, so covers_local_work set to true and flat_rate set to the 2-year average of 5% (was 10%); EUR 42,000 threshold, 1+3 year duration and 5-months presence confirmed on nomad.residencymalta.gov.mt; social-security cap cross-checked by arithmetic (10% x 559.30 = 55.93; 15% x 559.30 = 83.90); Sliema/St Julian's rent and second rent source not obtainable (403/404).
- 2026-10-15: social security deductibility: not established (left null; see open question).
