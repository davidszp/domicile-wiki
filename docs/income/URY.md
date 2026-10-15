# Uruguay — earned income, nomad and expat dossier

Last reviewed: 2026-10-15
Tax year: 2026

## Summary

Uruguay taxes employment income of residents with IRPF at 0% to 36% (annual scale in UYU, as at 31 December 2025), and social security of about 18-23% of salary for employees. New tax residents can claim a tax holiday: no IRPF on foreign-source income for the year of application plus ten years. Montevideo adds no local income tax.

## Income tax and social security

Marginal rates on taxable income (UYU, resident individual):

| From | Rate |
|---|---|
| 0.00 | 0% |
| 576,576.00 | 10% |
| 823,680.00 | 15% |
| 1,235,520.00 | 24% |
| 2,471,040.00 | 25% |
| 4,118,400.00 | 27% |
| 6,177,600.00 | 31% |
| 9,472,320.00 | 36% |

- Personal allowance: 0.00 UYU.
- Employee social security: 19.6%, annual cap 3,465,912.00 UYU.
- Self-employed social security: 22.6%, annual cap 3,465,912.00.
- Self-employed notes: Self-employed (empresa unipersonal / monotributo) contribute through BPS. The 22.6% rate is the sum of the PwC 2026 components for the owner acting as both employee and employer: 15% employee retirement + 7.5% employer retirement + 0.1% labour restructuring fund (it also equals the BPS 2026 table excerpt of UYU 2,088 on a UYU 9,240 base noted in an earlier pass). Retirement rates apply only up to UYU 288,826 a month until 31 Dec 2026 (PwC), so the cap is 12 x that; health cover (FONASA, 8% of one BPC if not opting into the national health system per the earlier excerpt) is not added. The BPS page itself could not be reached, so the owner's exact base and health contribution are unverified.
- Local tax note: No local income tax. The scale is for resident employees (PwC lists it as at 31 Dec 2025; thresholds are indexed yearly). Pension contributions are capped at UYU 288,826 a month until 31 Dec 2026; employee rate 0.196 = 15% pension + 4.5% health (single, no dependants, above 2.5 BPC) + 0.1% FRL, health continues above the cap.
- Confidence: medium; verification: partially_verified.

## Digital nomad visa

**Hoja/Cedula de Identidad Provisoria - digital nomad**. Special residence permit for people who work remotely, self-employed or for foreign companies. Apply online after entering as a tourist; first permit of 180 days, extendable once by 180 days (maximum about one year). Applicants make a sworn statement of means; no minimum amount is published. Renewal needs criminal-record certificates and a Uruguayan vaccination certificate.

- Minimum income: not published.
- Duration: 1 years. Six months plus one six-month extension.
- Tax treatment: standard; social security applies: False.

## Expat regimes

**New-resident tax holiday (foreign income exempt from IRPF)** (expat_regime). New tax residents are exempt from IRPF on income earned abroad for the year of application and the ten following years (11 years). From 2026, new applicants qualify through more than 183 days of physical presence in the calendar year, or by investment (real estate above about USD 2.1 million or about USD 105,000 a year into 'Uruguay Innova'). It does not cover Uruguayan-source income, which stays taxed at the IRPF scale. Uruguay's source principle makes income from activities developed in Uruguay (PwC) Uruguayan-source, so a remote worker's pay for work done while living in Uruguay is not covered; the holiday covers income earned abroad, in practice foreign-source capital income.

- Treatment: exempt; duration: 11 years. Year of application plus ten years; those who opted before end-2025 keep their original terms.
- Covers work physically performed in the country (covers_local_work): no.
- Maximum income: none.

## Living costs

City: Montevideo (Pocitos / Punta Carretas).

- 1-bedroom: 28,350.62 UYU a month (2026). Numbeo average 1-bedroom apartment in city centre, Montevideo; range UYU 25,000-39,500; updated 2 Oct 2026; 872 city entries from 74 contributors in 12 months (all categories); user-contributed. Source: https://www.numbeo.com/cost-of-living/in/Montevideo
- 2-bedroom: 33,000.00 UYU a month (2026). Pocitos 2-bedroom reference price UYU 33,000 (range UYU 28,000-40,000) from Cuanto Me Cuesta, based on Infocasas and MercadoLibre listings, April 2026; no sample size, +/-15%. Source: https://cuantomecuesta.com/uy/alquiler-montevideo/

Montevideo rents are quoted in pesos; common expenses (gastos comunes) are extra.

## Residence routes

EU, US and other nationals can enter as tourists and apply online for the digital nomad provisional identity (180 + 180 days). Longer-term legal residence is available to Mercosur-associated nationals with a simplified route, and to others via employment, investment or family routes; a skilled employee needs a Uruguayan employer. Tax residency begins at 183 days or on substantial ties.

## Open questions

- Official income requirement for the nomad permit not found (sworn statement only).
- Territorial treatment: work done in Uruguay is Uruguayan-source (PwC); the tax holiday does not help a remote worker living in Uruguay.
- Territoriality: PwC (opened 2026-10-15) says Uruguayan source covers income from activities developed in Uruguay, so services physically performed in Uruguay for foreign clients are Uruguayan-source and taxed under IRPF; foreign-source capital income of residents is taxed at a flat 12% (it is that income the tax holiday exempts).
- Employee health rate varies 3%-8% by family situation (PwC); 4.5% assumed for a single person without dependants above 2.5 BPC.
- Self-employed rate 22.6% is consistent with the PwC components but the BPS page for sole proprietors was not reached; base and health contribution unverified.
- Family-unit filing scale not modelled. The IRPF scale is as at 31 Dec 2025 (PwC); a mid-2026 indexation of thresholds was not seen for individuals.
- Permit itself gives no tax change; staying more than 183 days makes the person tax resident and may allow the new-resident tax holiday.
- Treatment is standard, so covers_local_work does not apply.
- covers_local_work=false: PwC says the source principle covers income from activities developed in Uruguay, and Forvis Mazars describes the holiday only as 'no IRPF on income earned abroad'; Law 20.446 / Decreto 95/026 text not read, and no tax-authority page states the point directly.
- A 7% option and the post-holiday options (50% reduction, USD 200,000-315,000 fixed payment) are reported by Forvis Mazars, not modelled.
- Uruguay: social_security_deductible left null. DGI's IRPF guide (category II) lists BPS retirement, FONASA and FRL contributions among the 'deducciones', but they do not reduce the taxed base: IRPF on the deductions (14% if nominal income is up to 180 BPC, otherwise 8%) is subtracted from the tax computed on income. The field cannot express a credit; as a deduction-equivalent it is about 0.25 at the marginal rate of a USD 60k earner, which has not been verified.

## Sources

- [PwC Worldwide Tax Summaries - Uruguay: Taxes on personal income](https://taxsummaries.pwc.com/uruguay/individual/taxes-on-personal-income) (PwC)
- [PwC Worldwide Tax Summaries - Uruguay: Other taxes](https://taxsummaries.pwc.com/uruguay/individual/other-taxes) (PwC)
- [PwC Worldwide Tax Summaries - Uruguay: Residence](https://taxsummaries.pwc.com/uruguay/individual/residence) (PwC)
- [gub.uy - Permiso especial de residencia legal (nomada digital)](https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/comunicacion/noticias/permiso-especial-residencia-legal) (Gobierno de Uruguay)
- [Forvis Mazars Uruguay - Regimen migratorio para nomadas digitales](https://www.forvismazars.com/uy/en/insights/our-publications/accounting-outsourcing-services-aos/regimen-migratorio-para-nomades-digitales) (Forvis Mazars)
- [Forvis Mazars Uruguay - Uruguay 2026: residencia fiscal e inversores](https://www.forvismazars.com/uy/en/insights/our-publications/tax/uruguay-2026-residencia-fiscal-e-inversores) (Forvis Mazars)
- [Numbeo - Cost of Living in Montevideo](https://www.numbeo.com/cost-of-living/in/Montevideo) (Numbeo)
- [Cuanto Me Cuesta - Alquiler en Montevideo (abril 2026)](https://cuantomecuesta.com/uy/alquiler-montevideo/) (Cuanto Me Cuesta)
- [DGI - Impuesto a las Rentas de las Personas Fisicas (IRPF) e IASS guide](https://www.gub.uy/direccion-general-impositiva/sites/direccion-general-impositiva/files/2025-03/DOCUMENTO%20IRPF%20-%20IASS%20-%202024.pdf) (Direccion General Impositiva (DGI))

## Change log
- 2026-10-15: initial research.
- 2026-10-15: check pass: tax holiday covers_local_work=false (PwC: source principle covers activities developed in Uruguay; holiday exempts income earned abroad); self-employed rate reconciled to PwC components (15%+7.5%+0.1%) with retirement cap UYU 288,826/month; IRPF scale re-checked.
- 2026-10-15: social security deductibility: left null (not established; see open questions).
