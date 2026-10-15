# Brazil — earned income, nomad and expat dossier

Last reviewed: 2026-10-15
Tax year: 2026

## Summary

Brazilian residents pay progressive federal income tax (monthly table from January 2026: 0% to 27.5%, annualised below). From 2026 Law 15.270/2025 adds a monthly reduction that zeroes tax up to BRL 5,000 a month, phasing out at BRL 7,350, and a minimum tax on very high incomes. Employees pay progressive INSS of 7.5%-14% up to BRL 8,475.55 a month; contribuintes individuais pay 20% up to the same ceiling (11% under the simplified plan).

## Income tax and social security

Marginal rates on taxable income (BRL, resident individual):

| From | Rate |
|---|---|
| 0.00 | 0% |
| 29,145.60 | 7.5% |
| 33,919.80 | 15% |
| 45,012.60 | 22.5% |
| 55,976.16 | 27.5% |

- Personal allowance: 0.00 BRL.
- Employee social security: 11.66%, annual cap 101,706.60 BRL.
- Self-employed social security: 20%, annual cap 101,706.60.
- Self-employed notes: Contribuinte individual: 20% of income between the minimum wage (BRL 1,621.00) and the ceiling BRL 8,475.55 a month (maximum BRL 1,695.11); the simplified plan is 11% of the minimum wage only (BRL 178.31) with reduced benefits; PwC also mentions 5%, 11% or 20% depending on conditions. Self-employed income of residents is taxed through the monthly carne-leao on the same progressive table. Employee effective rate 0.1166 = maximum monthly INSS BRL 988.09 / ceiling BRL 8,475.55, computed from the progressive table. Contribuinte individual rates (5% low-income optional/MEI, 11% simplified, 20% normal) confirmed on the INSS 2026 table page.
- Local tax note: No municipal income tax on individuals (Sao Paulo levies ISS services tax on businesses, not modelled). Brackets are the January 2026 monthly table multiplied by 12.
- Confidence: medium; verification: partially_verified.

## Digital nomad visa

**Digital nomad visa (VITEM XIV)**. Temporary residence for remote workers with no Brazilian employment relationship. Requires proof of at least USD 1,500 a month from a foreign source or USD 18,000 in bank funds, health insurance and a clean record. It does not change tax: holders without a Brazilian employment contract become tax resident after 183 days of presence within 12 months and are then taxed on worldwide income at ordinary rates.

- Minimum income: 18,000 USD a year.
- Duration: 2 years. One year, renewable once for another year at the Federal Police (per the embassy page).
- Tax treatment: standard; social security applies: True.

## Expat regimes

No expat or impatriate tax regime was found or verified.

## Living costs

City: Sao Paulo (Pinheiros / Vila Madalena / Jardins).

- 1-bedroom: 3,297.73 BRL a month (2026). Numbeo average 1-bedroom apartment in city centre, Sao Paulo; range BRL 2,500-5,000; updated 9 Oct 2026; 1,709 city entries from 164 contributors in 12 months (all categories); user-contributed. Source: https://www.numbeo.com/cost-of-living/in/Sao-Paulo
- 2-bedroom: 6,500.00 BRL a month (2026). QuintoAndar listing-platform average rent for 2-bedroom apartments in Pinheiros, Sao Paulo (page version 14 Oct 2026); the page shows 2,337 listings but may include 2+ bedroom filters, and does not say whether the figure is furnished; it is an average, not a median. Source: https://www.quintoandar.com.br/alugar/imovel/pinheiros-sao-paulo-sp-brasil/2-quartos

2-bedroom rent from the QuintoAndar Pinheiros page (average of listings, low-medium confidence). Numbeo 3-bedroom city-centre average BRL 7,604.85 is not used.

## Residence routes

EU and US citizens can enter visa-free as tourists but cannot work; remote workers use the VITEM XIV digital nomad visa (USD 1,500 monthly foreign income or USD 18,000 funds), valid one year, renewable once. Skilled employees need a work visa tied to a Brazilian employer (temporary residence with work authorisation from the Ministry of Labour); permanent residence routes (family, investment, long residence) exist but were not researched. Nationals of Mercosur and associated states have a separate residence-agreement route.

## Open questions

- Minimum tax (art. 16-A, Law 15.270) read in the statute: a floor of at most 10% of receipts, not reflected in the brackets (see income tax open questions).
- No impatriate regime found.
- 2-bedroom rent is a listing-platform average with an unclear bedroom filter.
- Brackets are on taxable income after INSS and the simplified deduction. Law 15.270/2025 (art. 3-A reduction, read on the Receita 2026 tables page) zeroes annual tax up to BRL 60,000 of taxable income and phases out linearly (BRL 8,429.73 - 0.095575 x income) to zero at BRL 88,200; it is not in the brackets because it affects only incomes below BRL 88,200, well under both personas (nomad USD 60k, expat USD 150k).
- Minimum tax (art. 16-A of Law 15.270, read in the Planalto text 2026-10-15): from tax year 2026, individuals with total receipts above BRL 600,000 owe at least a rate on all receipts (including exempt and exclusively-taxed income) that rises linearly from 0% at BRL 600,000 to 10% at BRL 1,200,000 (rate = receipts/60,000 - 10), less ordinary IRPF, withholding and the art. 16-B reducer. It is a floor of at most 10% of receipts, below the ordinary 27.5% marginal scale on salary or professional income, so it does not change the brackets for the expat (USD 150k) or the nomad; it bites only when much of the income is exempt or taxed separately (dividends, financial income).
- 13th salary and dividend withholding (10% above BRL 50,000/month) not modelled.
- Employee rate 0.1166 is an effective rate at the ceiling: maximum INSS BRL 988.09 (7.5/9/12/14% progressive table, Portaria MPS/MF 13 of 9 Jan 2026, read on gov.br/inss) / ceiling BRL 8,475.55; below the ceiling the effective rate is lower.
- Consular fee (EUR 100 at the Finnish embassy) varies by country.
- Whether a nomad contributes to INSS as contribuinte individual is not stated; social_security_applies reflects ordinary resident rules.
- Treatment is standard (visa does not change tax), so covers_local_work does not apply.
- PwC (deductions page, 2026): taxpayers may instead take a standard deduction of 20% of gross taxable income capped at BRL 17,640 from January 2026, 'in lieu of the above itemised deductions' (including INSS). Above about BRL 88,200 a year it exceeds the maximum INSS (about BRL 11,860), so social_security_deductible = 1 and a bracket base 'after INSS and the simplified deduction' must not apply both; check how the model combines them.

## Sources

- [PwC Worldwide Tax Summaries - Brazil: Taxes on personal income](https://taxsummaries.pwc.com/brazil/individual/taxes-on-personal-income) (PwC)
- [PwC Worldwide Tax Summaries - Brazil: Other taxes](https://taxsummaries.pwc.com/brazil/individual/other-taxes) (PwC)
- [PwC Worldwide Tax Summaries - Brazil: Residence](https://taxsummaries.pwc.com/brazil/individual/residence) (PwC)
- [Receita Federal - Tabelas do imposto de renda 2026](https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026) (Receita Federal)
- [INSS - Tabela de contribuicao mensal (2026)](https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal) (INSS)
- [Planalto - Lei 15.270/2025 (full text)](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15270.htm) (Presidencia da Republica)
- [Embaixada do Brasil em Helsinque - Digital nomad visa (VITEM XIV)](https://www.gov.br/mre/pt-br/embaixada-helsinque/consular-services/digital-nomad-visa-vitem-xiv) (Ministerio das Relacoes Exteriores)
- [Numbeo - Cost of Living in Sao Paulo](https://www.numbeo.com/cost-of-living/in/Sao-Paulo) (Numbeo)
- [QuintoAndar - Apartments with 2 bedrooms for rent in Pinheiros](https://www.quintoandar.com.br/alugar/imovel/pinheiros-sao-paulo-sp-brasil/2-quartos) (QuintoAndar)
- [PwC Worldwide Tax Summaries - Brazil: Deductions](https://taxsummaries.pwc.com/brazil/individual/deductions) (PwC)

## Change log
- 2026-10-15: initial research.
- 2026-10-15: check pass: Law 15.270 reduction and minimum tax (art. 16-A) read from the statute and Receita table and documented (no bracket change: reduction applies below BRL 88,200, minimum tax is a floor of at most 10%); INSS 2026 tables re-checked; added 2-bedroom rent (QuintoAndar Pinheiros average BRL 6,500).
- 2026-10-15: social security deductibility: 1 (PwC: official social security (INSS) contributions are an itemised deduction, no cap; the alternative 20% standard deduction replaces them).
