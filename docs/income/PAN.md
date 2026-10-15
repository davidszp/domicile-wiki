# Panama — earned income, nomad and expat dossier

Last reviewed: 2026-10-15
Tax year: 2026

## Summary

Panama taxes only Panamanian-source income: 0% to USD 11,000, 15% to USD 50,000, 25% above. Employees pay 9.75% social security plus 1.25% educational insurance, uncapped; independents 9% to 13.5%. The Short Stay Remote Worker visa (USD 36,000 a year, 9 + 9 months) has no tax clause; the territorial system does not clearly reach pay for work done in Panama, so it is not scored as relief. Rents (Encuentra24 asks): 1-bed median USD 1,300 (13 units), 2-bed USD 1,500 (28 units).

## Income tax and social security

Deloitte and PwC 2026: first USD 11,000 exempt, 15% on USD 11,001 to 50,000, USD 5,850 plus 25% above USD 50,000. Employee CSS 9.75% plus educational insurance 1.25% with no maximum; employer 13.25% rising to 14.25% (Mar 2027). Independent contractors and professionals 9% to 13.5% of fees.

## Digital nomad visa

Executive Decree 198 of 2021: contract with a foreign company or autonomous remote work, foreign-source income of at least USD 36,000 a year, health insurance, sworn declaration of no local work. 9 months, extendable once for 9 months (Kraemer Law). No tax clause in the source. Panama taxes only Panamanian-source income (Deloitte, PwC), but that territorial rule does not exempt pay for work physically done in Panama, so covers_local_work is false (low confidence: neither source defines the source rule for remote work).

## Expat regimes

None verified. The multinational headquarters (SEM) regime exists but was not researched.

## Living costs

Encuentra24 Panama apartments for rent (120 listings read on 4 results pages of 9,757, asking rents in USD, furnishing mixed, relevance order): 1-bed median USD 1,300 from 13 units (range 750 to 2,800); 2-bed median USD 1,500 from 28 units (range 700 to 3,500) in Bella Vista, Avenida Balboa, Punta Pacifica, Costa del Este, San Francisco, Marbella, Obarrio, Coco del Mar and similar central districts.

## Residence routes

Remote workers of any citizenship can use the Short Stay Remote Worker visa (USD 36,000 a year, 9 months + 9 months). Employees of a Panamanian employer need a work permit/visa (not researched). The earlier repo research (data/jurisdictions/PAN.json) lists residence visas (Qualified Investor, Friendly Nations, Pensionado) without verified thresholds. EU, US and other citizens use the same routes. US citizens remain taxable in the US on worldwide income; Panama levies no tax on foreign-source income, so there is nothing to credit.

## Open questions

- Self-employed contribution tier not verified: Deloitte gives 9% to 13.5% of fees for independents and the top is shown.
- Employer rate increases from March 2027 (13.25% to 14.25%) do not affect employee rates.
- Kraemer Law does not discuss tax; the 'exempt' treatment follows from Panama's territorial system as described by Deloitte and PwC, not from a visa clause. Neither source defines when remote work done in Panama for a foreign employer is Panamanian-source, so covers_local_work false rests on the general source rule and on there being no statutory exemption; a DGI ruling could change this.
- Government fees and the need for a lawyer to file were not verified.
- Panama's SEM (multinational headquarters) employee regime is not researched.
- Rents come from asking prices on one portal's first 4 pages.
- Work-permit and Friendly Nations thresholds not verified.
- Panama: social_security_deductible = 0 follows from the DGI instruction sheet listing no social security deduction; PwC's deductions page is silent, and the Gaceta Oficial text of Ley 8 of 2010 (which repealed numerals of art. 709) could not be opened.

## Sources

- [Deloitte International Tax: Panama Highlights 2026](https://www.deloitte.com/content/dam/assets-shared/docs/services/tax/2026/dttl-tax-panamahighlights-2026.pdf) — Deloitte, accessed 2026-10-15
- [PwC Worldwide Tax Summaries: Panama, Individual - Taxes on personal income](https://taxsummaries.pwc.com/panama/individual/taxes-on-personal-income) — PwC, accessed 2026-10-15
- [PwC Worldwide Tax Summaries: Panama, Individual - Other taxes](https://taxsummaries.pwc.com/panama/individual/other-taxes) — PwC, accessed 2026-10-15
- [Kraemer Law: Visa for Remote Workers (Executive Decree 198 of May 7 2021)](https://kraemerlaw.com/en/articles/visa-for-remote-workers-digital-nomads-executive-decree-198-of-may-7-2021/) — Kraemer Law, accessed 2026-10-15
- [Encuentra24 Panama: apartments for rent (4 results pages)](https://www.encuentra24.com/panama-en/real-estate-for-rent-apartments) — Encuentra24, accessed 2026-10-15
- [Direccion General de Ingresos (Panama) - Renta, asalariados: return instructions](https://dgi.mef.gob.pa/DInforme/pdf/RENTA%20-%20ASALARIADOS.pdf) — Direccion General de Ingresos, Ministerio de Economia y Finanzas, accessed 2026-10-15

## Change log
- 2026-10-15: initial research.
- 2026-10-15: check pass: Panama checked: brackets, employee 9.75% + 1.25% and territorial basis re-read against PwC (4 Aug 2026) and Deloitte 2026; self-employed 9-13.5% tier still unverified; Short Stay Remote Worker covers_local_work set false (no tax clause; the territorial system does not clearly reach pay for work done in Panama), confidence low; rents added from Encuentra24 (1-bed USD 1,300 from 13 units, 2-bed USD 1,500 from 28).
- 2026-10-15: social security deductibility: 0 (the DGI instructions for the employee income tax return list the personal deductions (spouse 800, medical, mortgage and education interest, school expenses, retirement fund) and none for Seguro Social or Seguro Educativo contributions).
