# Italy — earned income, nomad and expat dossier

Last reviewed: 2026-10-15
Tax year: 2026

## Summary

Milan marginal income tax runs from roughly 25% to 45.5%. Employees pay about 9.19% and the self-employed 26.07% up to EUR 122,295. The impatriati regime exempts 50% of Italian-source income up to EUR 600,000 for five years. A digital nomad visa (about EUR 28,000 a year) opened in March 2026. Milan median asking rents: EUR 1,450 for one bedroom, EUR 1,840 for two.

## Income tax and social security

Marginal rates on taxable income (EUR):

- from 0.00: 25.03%
- from 15,000.00: 25.38%
- from 28,000.00: 35.52%
- from 50,000.00: 45.53%

Personal allowance deducted before the brackets: 0.00 EUR.

Employee social security: 9.19% (cap: none stated). Self-employed: 26.07% (cap: 122,295.00).

National IRPEF is 23% to EUR 28,000, 33% to EUR 50,000 and 43% above. With the Lombardy regional surtax (1.23% to 1.73% by income) and the Milan municipal surtax (0.8%, exempt below EUR 23,000) the marginal rates in Milan are about 25% to 45.5%. Employees pay 9.19% pension contributions; the self-employed (Gestione Separata, VAT number, no other cover) pay 26.07% up to a cap of EUR 122,295.

Self-employed notes: Gestione Separata 2026 (PwC): 26.07% for VAT-number holders enrolled only there (24% if covered elsewhere), income ceiling EUR 122,295, minimum income for a contribution credit EUR 18,808. Under the forfettario regime contributions are due on the deemed profit (revenue x 78% for professional services), so the effective rate on gross revenue is about 26.07% x 78% = 20.3% (not modelled in the rate field). Forfettario eligibility and rates are modelled as separate regimes below.

Local tax: Brackets add the Lombardy regional surtax and the Milan municipal surtax (0.8%) to the national rate. Both surtaxes are in fact levied on the whole taxable income at the rate for the income band, not as marginal rates, so the combined figures are approximations. The Milan figure on the source page is the 2025 rate carried forward.

## Digital nomad visa

Visa for non-EU remote workers with about EUR 28,000 of foreign income, valid one year, renewable to five. Tax residents then choose between normal IRPEF, the forfettario regime (sole traders under EUR 85,000) and the impatriati regime.

## Expat regimes

Impatriati regime: 50% exemption (60% with a minor child), EUR 600,000 cap, five years; three years of prior non-residence and a four-year residence commitment. Also in PwC: the new-resident lump-sum regime (EUR 300,000 a year from 2026) is for the wealthy and not modelled here.

Regimes recorded in the JSON file:

- **Digital nomad visa** (digital_nomad_visa, treatment: standard): Visa for non-EU highly qualified remote workers with annual income of about EUR 28,000 from foreign sources (three times the healthcare exemption threshold), six months of prior experience, a degree or equivalent experience, a one-year lease and EUR 30,000 of health cover. Consulates have accepted applications since 18 March 2026. The visa does not change tax: residents are taxed on worldwide income at the normal scale, with the forfettario or impatriati regimes as options. Minimum income: 28,000 EUR. Maximum income: none. Duration (years): 5. One year, renewable annually up to five years. Foreign income required: True. Local employment required: False. Covers work done locally: None. Social security still applies: True.
- **Impatriati regime (Legislative Decree 209/2023, art. 5)** (expat_regime, treatment: partial_exemption 0.5): Art. 5 D.Lgs. 209/2023 (Normattiva): employment, assimilated and SELF-EMPLOYMENT income (lavoro dipendente, assimilati e lavoro autonomo) produced in Italy counts for only 50% of taxable income (so 50% is exempt), up to EUR 600,000 a year, for five tax periods (arrival year plus four); the taxable share falls to 40% (60% exempt) with a minor child. Requires no Italian tax residence in the previous three periods (six or seven if working for the same employer or group), a commitment to stay resident for four years (benefit clawed back with interest otherwise), work mainly performed in Italy, and high qualification or specialisation. No Italian employer is required, so remote work from Italy for a foreign employer or foreign clients is covered by the text. Normattiva flags art. 5 as repealed by D.Lgs. 19 June 2026 n. 117 from 1 January 2027 (presumably moved into the new income-tax code); successor rules not opened. Minimum income: none stated. Maximum income: 600,000 EUR. Duration (years): 5. Five tax periods from the first year of residence. Foreign income required: False. Local employment required: False. Covers work done locally: None. Social security still applies: True.
- **Forfettario flat-tax regime for sole traders (15% on 78% of revenue)** (other, treatment: flat_rate 0.117): Legge 190/2014 art. 1 commi 54-89 (Normattiva): sole traders and professionals with revenue up to EUR 85,000 pay a 15% substitute tax on deemed profit instead of IRPEF, surtaxes and IRAP; the regime ends in the year revenue exceeds EUR 100,000. Deemed profit = revenue x a coefficient set by ATECO code; for professional, scientific, technical and similar services the coefficient is 78% (Remote Work Europe; Allegato 4 not reached). Arithmetic: flat_rate on revenue = 15% x 78% = 11.7%, the value recorded in flat_rate (it is the rate on gross revenue). No deduction of actual expenses and no VAT charged. Social contributions are due on the deemed profit (about 20.3% of revenue at the 26.07% Gestione Separata rate). A tax resident nomad with revenue below EUR 85,000 can use it. Minimum income: none stated. Maximum income: 85,000 EUR. Duration (years): None. Open-ended while revenue stays at or below EUR 85,000 (the regime ends the year revenue exceeds EUR 100,000 and the following year if above EUR 85,000). Foreign income required: False. Local employment required: False. Covers work done locally: None. Social security still applies: True.
- **Forfettario start-up rate (5% on 78% of revenue, first five years)** (other, treatment: flat_rate 0.039): Same regime with a 5% substitute tax on deemed profit for the period the activity starts and the four following (art. 1 comma 65 L. 190/2014, Normattiva), if the person has not carried on a self-employed activity in the previous three years, the activity is not a mere continuation of a previous one, and, if it continues an activity of a third party, revenue is below EUR 85,000. Arithmetic: 5% x 78% = 3.9% of revenue. A newly arrived nomad starting a freelance activity in Italy can plausibly meet this; the conditions (a)-(c) of comma 65 were not read in full. Minimum income: none stated. Maximum income: 85,000 EUR. Duration (years): 5. Period in which the activity starts plus the four following periods; then 15% (11.7% of revenue). Foreign income required: False. Local employment required: False. Covers work done locally: None. Social security still applies: True.

## Living costs

Milan: 1-bedroom EUR 1,450 a month, 2-bedroom EUR 1,840 (Global Property Guide median asking rents, all locations).

## Residence routes

EU citizens register as residents. US and other non-EU remote workers can use the new digital nomad visa (about EUR 28,000 a year, valid one year, renewable to five). Skilled employees from outside the EU come in under the annual decreto flussi quotas or an EU Blue Card sponsored by an Italian employer, which were not researched; the impatriati regime applies to any new resident.

## Open questions

- Decreto flussi and Blue Card routes were not researched.
- Health-service registration costs for nomads not researched.
- Rents rest on one aggregator (Global Property Guide); no second source obtained.
- The 9.19% employee pension rate comes from a news site, not INPS (INPS pages not reachable); the employee contribution ceiling and the extra 1% above the first income threshold were not found.
- Employee deductions (detrazioni) are not modelled.
- IRPEF 2026 brackets (23/33/43) re-checked on PwC; regional/municipal surtax figures come from the original source and were not re-opened.
- Digital nomad visa: Decree of 29 February 2024 (G.U. 4 April 2024) not opened and no Italian consulate or ministry page was reachable; the EUR 28,000 (three times the healthcare-exemption threshold), duration (1 year renewable to 5) and requirements rest on Remote Work Europe, which itself cites no links.
- Digital nomad visa: A dedicated nomad tax incentive was proposed but not enacted as of April 2026.
- Impatriati regime (Legislative Decree 209/2023, art. 5): Art. 5 is marked repealed by D.Lgs. 117/2026 from 1 January 2027; the replacement text and any changes were not opened.
- Impatriati regime (Legislative Decree 209/2023, art. 5): The 'ruling 2/2026' on remote work claimed by Taxing.it was not verified; the statute itself requires only that the activity be performed mainly in Italy.
- Impatriati regime (Legislative Decree 209/2023, art. 5): Agenzia delle Entrate page not reachable; the statute was read on Normattiva.
- Forfettario flat-tax regime for sole traders (15% on 78% of revenue): The 78% coefficient for professional services (Allegato 4) is from Remote Work Europe only; the Allegato was not reached on Normattiva. It depends on the activity's ATECO code.
- Forfettario flat-tax regime for sole traders (15% on 78% of revenue): Applies to the self-employed who are Italian tax residents; whether the nomad's foreign clients affect eligibility (none under the statute read) was not checked against Agenzia delle Entrate guidance.
- Forfettario start-up rate (5% on 78% of revenue, first five years): Conditions (a)-(c) of comma 65 (no self-employment in the last three years, not a continuation) were not quoted in full; whether prior freelancing abroad counts as prior self-employment was not checked.
- Forfettario start-up rate (5% on 78% of revenue, first five years): 78% coefficient from Remote Work Europe only.

## Sources

- PwC Worldwide Tax Summaries - Italy, taxes on personal income: https://taxsummaries.pwc.com/italy/individual/taxes-on-personal-income
- PwC Worldwide Tax Summaries - Italy, other taxes (social security): https://taxsummaries.pwc.com/italy/individual/other-taxes
- Milano - Aliquote 2026 (addizionali comunale e regionale): https://tuttocalcolato.it/calcolo/irpef/milano/
- Contributi in busta paga: quanto versa il lavoratore dipendente: https://www.money.it/Contributi-busta-paga-quanto-versa-lavoratore-dipendente
- Italy digital nomad visa complete guide 2026 (Remote Work Europe): https://remoteworkeurope.eu/insights/italy-digital-nomad-visa-complete-guide-2026/
- Italian impatriates regime 2024 (Taxing.it): https://taxing.it/italian-impatriates-regime-2024
- Global Property Guide - Italy rental yields (median asking rents): https://globalpropertyguide.com/Europe/Italy/Rental-Yields
- D.Lgs. 209/2023 art. 5 (impatriati), Normattiva, text in force 2026-10-15: https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2023-12-27;209~art5!vig=2026-10-15
- Legge 190/2014 art. 1 commi 54-89 (regime forfetario), Normattiva: https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2014-12-23;190~art1!vig=2026-10-15
- PwC Worldwide Tax Summaries - Italy - Individual - Deductions: https://taxsummaries.pwc.com/italy/individual/deductions

## Change log

- 2026-10-15: initial research.
- 2026-10-15: check pass: Impatriati art. 5 read on Normattiva (50% exempt on employment AND self-employment income produced in Italy, cap EUR 600k, no Italian employer needed; marked repealed by D.Lgs. 117/2026 from 2027); forfettario re-sourced to L. 190/2014 and split into 15% x 78% = 11.7% of revenue (flat_rate corrected from the headline 15%) and a start-up 5% x 78% = 3.9% regime; Gestione Separata 26.07% and cap EUR 122,295 confirmed on PwC; nomad visa EUR 28,000 still only on a secondary source, set to low/unverified; rent second source not obtained.
- 2026-10-15: social security deductibility: 1 (PwC: mandatory employee social security contributions are fully deductible).
