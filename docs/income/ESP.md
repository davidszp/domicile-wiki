# Spain — earned income, nomad and expat dossier

Last reviewed: 2026-10-15
Tax year: 2026

## Summary

Madrid combined marginal income tax runs from 18% to 45%; employees pay 6.5% social security up to about EUR 61,200 and autonomos 31.5% on a chosen base. The Beckham regime (24% up to EUR 600,000, six years) is the main expat tool; employees of foreign firms on the teleworker visa are deemed eligible (modelled separately), the self-employed are not named in the statute. The nomad visa needs about EUR 34,188 a year of mostly foreign income. Median asking rents in Madrid: EUR 1,500 for one bedroom, EUR 2,000 for two.

## Income tax and social security

Marginal rates on taxable income (EUR):

- from 0.00: 18.00%
- from 12,450.00: 20.50%
- from 13,362.00: 22.70%
- from 19,004.00: 24.80%
- from 20,200.00: 27.80%
- from 35,200.00: 31.30%
- from 35,425.00: 35.90%
- from 57,320.00: 39.00%
- from 60,000.00: 43.00%
- from 300,000.00: 45.00%

Personal allowance deducted before the brackets: 5,550.00 EUR.

Employee social security: 6.50% (cap: 61,214.40). Self-employed: 31.50% (cap: 61,214.40).

Resident income tax is the sum of a state and a regional scale. For Madrid the combined marginal rates on the general base run 18% to 45% (43% from EUR 60,000, 45% above EUR 300,000). Employee social security is 6.5% (capped at the maximum monthly base EUR 5,101.20, EUR 61,214.40 a year); autonomos pay 31.5% on a chosen base within the same maximum. The recorded personal allowance is the EUR 5,550 personal minimum; strictly it is taxed at the lowest rates rather than deducted, and employees also get a EUR 2,000 expenses deduction (not modelled).

Self-employed notes: Autonomos (RETA) pay 31.5% in 2026 (common contingencies 28.30%, professional 1.30%, cessation 0.90%, training 0.10%, MEI 0.90%; Seguridad Social page) on a monthly base they choose within the band set by their net monthly income (12 general brackets; maximum base EUR 5,101.20, so at most EUR 19,283 a year in contributions). For net income of about EUR 4,500 a month (EUR 54k) bracket 11 applies: base EUR 1,732.03 to 5,101.20, i.e. EUR 545.59 to 1,606.88 a month, EUR 6,547 to 19,283 a year (12% to 36% of EUR 54k). The 31.5% flat rate used in the model is therefore a ceiling for incomes below the cap. Business income is reduced by a flat EUR 2,000 deduction; health premiums are deductible up to EUR 500 per person. Employees above the maximum base also pay a solidarity contribution (1.15% to 1.46% on the excess, 16.61% of it borne by the employee).

Local tax: Madrid autonomous-community scale (8.5% to 20.5%; thresholds EUR 13,362 / 19,005 / 35,426 / 57,320, Decreto Legislativo 1/2010 as deflated by Ley 13/2023, per Guia Fiscal and Taxdown) is combined with the state scale (9.5% to 24.5%) in the brackets. Other regions differ (Catalonia is higher). Both Madrid tables are tax-advice sites that agree with each other; the BOCM was not opened.

## Digital nomad visa

The international teleworker visa (non-EU only) requires income of 200% of the minimum wage (2026 SMI EUR 1,221 x 14 = EUR 17,094, so EUR 34,188 a year or about EUR 2,849 a month; BOE RD 126/2026), a degree or three years of experience, a three-month relationship with the foreign company (which must be a year old), and for the self-employed at most 20% Spanish clients. The visa itself does not alter tax; holders taxed as residents pay normal IRPF, or the Beckham regime if they qualify (employees only).

## Expat regimes

Beckham law: 24% flat up to EUR 600,000 (47% above) on Spanish-source employment income for the arrival year plus five years; five years of prior non-residence; remote employees of foreign firms holding a teleworker visa are deemed eligible (art. 93.1.b.1 LIRPF); the self-employed are not named. Social security still applies.

Regimes recorded in the JSON file:

- **International teleworker visa (digital nomad visa)** (digital_nomad_visa, treatment: standard): Residence visa for non-EU remote workers (Ley 14/2013 art. 74 as amended by the Startups Law 28/2022). Requires funds of at least 200% of the monthly minimum wage (2026 SMI EUR 1,221 x 14 = EUR 17,094 a year, so EUR 34,188 a year; BOE RD 126/2026 and the New York consulate page), a degree or 3 years of experience, 3 months of relationship with the foreign employer or clients, and for the self-employed at most 20% of activity for Spanish clients. Tax treatment is not changed by the visa: holders who become resident pay normal IRPF, but employees (not self-employed) holding the visa may opt for the Beckham regime (esp_beckham_teleworker). Minimum income: 34,188 EUR. Maximum income: none. Duration (years): 5. Visa valid 1 year from a consulate; from inside Spain a permit of up to 3 years, renewable in 2-year steps to a maximum of 5 years. Social security still applies: True.
- **Special regime for displaced workers (Beckham law) - employee with a Spanish contract** (expat_regime, treatment: flat rate 0.24): Art. 93 LIRPF (Ley 35/2006, consolidated BOE text): optional taxation under the non-resident (IRNR) rules while staying IRPF-resident: 24% flat on Spanish-source work income up to EUR 600,000 and 47% above; foreign-source income is outside Spanish tax (savings income at 19-30%). Applies for the arrival year plus five years. Conditions: not Spanish resident in the previous five tax years and a move because of an employment contract in Spain (or a posting letter), appointment as company director, entrepreneurial activity certified under art. 70 Ley 14/2013, or work as a highly qualified professional for start-ups/R&D with over 40% of income from it. Application within six months of starting work (Modelo 149). Remote employees of foreign firms with the teleworker visa are modelled separately (esp_beckham_teleworker). Minimum income: none stated EUR. Maximum income: 600,000 EUR. Duration (years): 6. Arrival year plus the five following tax years. Local employment required: True. Covers work done in Spain: None. Social security still applies: True.
- **Beckham law for teleworker-visa employees of foreign companies** (expat_regime, treatment: flat rate 0.24): Since the Startups Law (Ley 28/2022) art. 93.1.b.1 LIRPF says the displacement condition is met when the work is done remotely using exclusively IT/telecoms systems, and 'in particular' for employees (trabajadores por cuenta ajena) holding the international teleworker visa of Ley 14/2013. They can opt for the IRNR-style regime: 24% flat on their work income up to EUR 600,000 (47% above); art. 93.2.b deems all work income earned during the regime to be Spanish-source, so pay for work done in Spain is covered. The statute names employees only: a self-employed teleworker visa holder is not named (applies_to is therefore employment only). Needs no prior Spanish residence in five years and the visa's own conditions (funds of EUR 34,188 a year). Minimum income: 34188 EUR. Maximum income: 600,000 EUR. Duration (years): 5. Regime lasts the arrival year plus five years (6 tax years); the teleworker permit itself runs to 5 years with renewals, so 5 is used. Local employment required: False. Covers work done in Spain: True. Social security still applies: True.

## Living costs

Madrid: 1-bedroom EUR 1,500 a month, 2-bedroom EUR 2,000 (Global Property Guide Q3 2026, median asking rents of apartments, all locations). No coworking source was opened. A second rent source could not be opened (Idealista 403, Numbeo 429).

## Residence routes

EU citizens live and work freely and register as residents. US and other non-EU remote workers can use the international teleworker visa (200% of the minimum wage, at most 20% Spanish clients for the self-employed, degree or 3 years of experience), valid up to five years with renewals. Skilled employees from outside the EU need a work-residence authorisation sponsored by a Spanish employer, which is not researched here; the Beckham regime applies to either group once resident.

## Open questions

- The skilled-employee work permit routes (Highly Qualified Professional, EU Blue Card) were not researched.
- Rents are from one aggregator (Global Property Guide); second-source checks (Idealista, Numbeo) were blocked (403/429) and not obtained.
- Madrid autonomic scale confirmed on two tax-advice sites (Taxdown, Guia Fiscal) that agree; the BOCM/AEAT text itself was not opened.
- The model uses the 31.5% headline on income up to the cap; real autonomo contributions depend on the chosen base within the bracket (12% to 36% of EUR 54k). Seguridad Social page notes the table is 'in process of update' (Orden PJC/297/2026).
- International teleworker visa (digital nomad visa): The 200%-of-SMI test is stated by the consulate; the EUR 34,188 a year (EUR 2,849 a month over 12) is our arithmetic from the BOE SMI of EUR 1,221 x 14. Remote Work Europe quotes the same figure.
- International teleworker visa (digital nomad visa): Employees need a social security registration or an A1 certificate; autonomos register in RETA.
- International teleworker visa (digital nomad visa): Duration: consulate page says visa 1 year, permit up to 3 years from inside Spain; the 5-year maximum with renewals rests on Remote Work Europe.
- Special regime for displaced workers (Beckham law) - employee with a Spanish contract: Self-employed professionals qualify only through the entrepreneur-activity (art. 70 Ley 14/2013) or highly-qualified start-up/R&D routes (art. 93.1.b.3-4), which need certification; not modelled as a general self-employment route.
- Beckham law for teleworker-visa employees of foreign companies: Self-employed visa holders: art. 93.1.b.1 names 'trabajadores por cuenta ajena' only and the work-from-abroad wording refers to 'actividad laboral'; the self-employed are not covered unless they meet the entrepreneur or start-up routes. No tax-authority (DGT) ruling was opened.

## Sources

- PwC Worldwide Tax Summaries - Spain, taxes on personal income: https://taxsummaries.pwc.com/spain/individual/taxes-on-personal-income
- PwC Worldwide Tax Summaries - Spain, other taxes: https://taxsummaries.pwc.com/spain/individual/other-taxes
- PwC Worldwide Tax Summaries - Spain, deductions: https://taxsummaries.pwc.com/spain/individual/deductions
- Tramos del IRPF en Madrid para la Renta 2025/2026: https://taxdown.es/irpf/tramos-tablas-irpf-madrid
- Visado de teletrabajo (Spanish consulate in New York): https://www.exteriores.gob.es/Consulados/nuevayork/en/ServiciosConsulares/Paginas/Consular/Visado-de-teletrabajo.aspx
- Spain digital nomad visa 2026 (Remote Work Europe): https://remoteworkeurope.eu/insights/spain-digital-nomad-visa-2026/
- Ley 35/2006 del IRPF, art. 93 (consolidated text): https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764
- PwC Worldwide Tax Summaries - Spain, other issues (special expatriate regime): https://taxsummaries.pwc.com/spain/individual/other-issues
- Global Property Guide - Spain rental yields (median asking rents): https://globalpropertyguide.com/Europe/Spain/Rental-Yields
- Real Decreto 126/2026 fixing the SMI for 2026 (BOE-A-2026-3815): https://www.boe.es/buscar/act.php?id=BOE-A-2026-3815
- Escala autonomica IRPF Comunidad de Madrid 2026 (Guia Fiscal): https://guiafiscal.es/irpf/madrid/
- Seguridad Social - cotizacion autonomos 2026 (tipos y tramos): https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/CotizacionRecaudacionTrabajadores/36537

## Change log

- 2026-10-15: initial research.
- 2026-10-15: check pass: SMI 2026 (EUR 1,221 x 14) confirmed from BOE, so the nomad threshold EUR 34,188 is verified by arithmetic; autonomo rate corrected 31.4% -> 31.5% with the 2026 Seguridad Social bracket table; Madrid scale cross-checked on Guia Fiscal; Beckham split into an expat version (Spanish contract, requires_local_employment true) and a teleworker version for employees of foreign firms on the visa (covers_local_work true, art. 93.1.b.1 and 93.2.b LIRPF, employment only, self-employed not named); rent second source not obtainable.
- 2026-10-15: social security deductibility: 1 (PwC: employee social security contributions are deductible from gross employment income).
- 2026-10-15: employment-expense deduction modelled (new employment_deduction field): 'Other expenses' deduction for employment income of EUR 2,000 a year (the extra reduction below EUR 19,747.50 is not modelled).
