# Chile — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Chile taxes residents on worldwide income at progressive rates up to 40%, but a foreigner who settles in Chile is taxed only on Chilean-source income for the first three years (LIR art. 3, extendable). Afterwards foreign gains and dividends are ordinary income (top 40%, credit for foreign tax). Gains on Chilean listed shares bear a 10% single tax in 2026 (repealed from 2027 by the reform promulgated on 9 Oct 2026). Inheritance tax is 1%-25% per heir above a 50 UTA exemption for children, but for a foreigner's estate foreign assets count only if acquired with Chilean funds. No wealth tax.

US citizens: The US-Chile income tax treaty is in force (PwC list). US citizens remain subject to US federal tax.

## Residence and eligibility

More than 183 days in any 12-month period; domicile (physical presence with intent to remain) can make a person taxable from the first day (Deloitte 2026; PwC Residence).

- **Temporary and permanent residence permits** (EU, US, OTHER): Temporary residence (e.g. rentista / investor subcategories) leading to definitive residence; amounts not researched.

## Capital gains

### Standard regime

Capital gains are generally ordinary income subject to the Global Complementary Tax (top 40%). Gains on Chilean shares with stock-market presence bear a 10% single tax (Law 21.420, since Sept 2022); a reform promulgated on 9 Oct 2026 (not yet published) repeals this from 1 Jan 2027, making them non-taxable. Gains on Chilean real estate by individuals are exempt up to UF 8,000 lifetime and then taxable at a 10% single tax option or the GCT.

- **Important exceptions, statute references and announced changes:** Announced (promulgated 9 Oct 2026, awaiting publication): 10% tax on listed-share gains repealed from 1 Jan 2027.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 40% (0.4); listed domestic 10% (0.1); listed foreign 40% (0.4); private business sale 40% (0.4); local real estate 10% (0.1); foreign real estate 40% (0.4).
- **How derived:** Top GCT rate 40% (Deloitte 2026: 0%-40%; PwC: maximum raised from 35% to 40% from 2020) for foreign listed shares, unlisted shares and foreign real estate. Chilean listed shares: 10% single tax in 2026. Chilean real estate: 10% single-tax option.
- **Trader recharacterisation:** Habitual share trading is business income (first category tax plus final taxes).
- **Foreign assets:** Worldwide after the 3-year period.

### New foreign resident: Chilean-source income only for three years (LIR art. 3) (special regime)

Foreign-source gains are outside Chilean tax for three years; Chilean gains taxed as standard.

- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 40% (0.4); listed domestic 10% (0.1); listed foreign 0% (0.0); private business sale 40% (0.4); local real estate 10% (0.1); foreign real estate 0% (0.0).
- **How derived:** Deloitte 2026: foreigners taxed only on Chilean-source income in their first three years. private_business_sale assumes a Chilean company.

Open points for this tax: Real-estate 10% single-tax option and UF 8,000 exemption are from memory of LIR art. 17 N8; not re-verified at source. | Treatment of foreign real estate gains assumed to be ordinary income.

## Dividends

### Standard regime

Dividends from Chilean companies are subject to the Global Complementary Tax with a credit for 65% of the 27% corporate tax (partially integrated system), giving about 30.75% personal tax on the cash dividend at the top rate. Foreign dividends are taxed at up to 40% with a credit for foreign taxes.

- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 40% (0.4); domestic 30.75% (0.3075); foreign gross 40% (0.4); foreign tax relief: credit.
- **How derived:** Domestic: gross-up 100 profit, 27 CIT, 73 dividend; GCT 40% x 100 = 40 minus credit 0.65 x 27 = 17.55 gives 22.45, i.e. 30.75% of the cash dividend. Foreign: 40% top GCT.
- **Outbound withholding:** 35% additional tax on dividends to non-residents with 65% (treaty residents 100%) credit for corporate tax.
- **Treaty network:** About 35 treaties including Argentina, Australia, Brazil, Canada, China, France, Italy, Japan, Mexico, Spain, Switzerland, UK and the US (in force).
- **Holding companies:** CFC rules attribute passive income of controlled foreign entities.

### New foreign resident: Chilean-source income only for three years (LIR art. 3) (special regime)

Foreign dividends are not taxed for three years; Chilean dividends taxed as standard.

- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 40% (0.4); domestic 30.75% (0.3075); foreign gross 0% (0.0); foreign tax relief: not_applicable.
- **How derived:** Foreign-source income excluded during the first three years (LIR art. 3).

Open points for this tax: Unilateral credit for foreign tax on dividends from non-treaty countries (LIR art. 41 A) not verified; PwC says credit requires a treaty.

## Inheritance and gifts to children

### Standard regime

Ley 16.271: progressive tax on each heir's net share, 1% up to 80 UTA rising to 25% above 1,200 UTA (marginal). Spouse, parents and children are exempt on the first 50 UTA of an inheritance (5 UTA for gifts). In the estate of a foreigner, assets abroad are included only if acquired with resources from Chile (art. 1). With UTA = CLP 865,812 (October 2026) the child exemption is CLP 43,290,600.

- **Important exceptions, statute references and announced changes:** Brackets are in UTA and move monthly with inflation.
- **Tax year / confidence / verification:** 2026 / medium / verified (checked 2026-10-15)
- **JSON numbers:** basis `beneficiary`, children `taxed`, exemption 43,290,600 CLP, brackets (marginal): from 0 CLP: 1% (0.01); from 69,264,960 CLP: 2.5% (0.025); from 138,529,920 CLP: 5% (0.05); from 277,059,840 CLP: 7.5% (0.075); from 415,589,760 CLP: 10% (0.1); from 554,119,680 CLP: 15% (0.15); from 692,649,600 CLP: 20% (0.2); from 1,038,974,400 CLP: 25% (0.25); other transfer costs 0% (0.0).
- **Gifts:** Gifts taxed on the same scale; exemption for children only 5 UTA per gift. The reform promulgated on 9 Oct 2026 grants a one-year 50% reduction of gift tax (not yet in force). (same as inheritance: False; tax-free after years: None)
- **Foreign assets:** Art. 1: assets abroad are included in the inventory; in the estate of a foreigner they are included only if acquired with resources from Chile. Foreign tax paid is creditable. Scored as local_assets_only for a foreign family whose wealth was built abroad.
- **Residence/domicile rules:** Tax applies to Chilean estates; SII rulings (Ord. 1619/2013) confirm no tax for a foreign non-resident estate with no Chilean assets.
- **Business relief covers listed shares:** False

Open points for this tax: Ley 16.271 text on SII is updated to Law 21.210 (2020); later changes (Law 21.420 2022 gift rules) and the temporary 50% gift-tax cut in the 2026 reform are not reflected. | What counts as foreign assets 'acquired with resources from Chile' for a long-resident foreigner (e.g. reinvested gains) is not settled.

**Surviving spouse:** The surviving spouse sits in the same group as children: the first 50 UTA of the inheritance is exempt, then the same 1%-25% scale applies, with no marital relief beyond that (Ley 16.271 art. 2 and the table instructions, group I).

## Wealth tax

### Standard regime

No net wealth tax.

- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** Real property tax (contribuciones) on cadastral value: 1.4% non-rural (residential exempt up to about CLP 58 million) and 1% rural, with a surcharge for high total property holdings (Deloitte 2026).

## Special regimes

- **New foreign resident: Chilean-source income only for three years (LIR art. 3)** (`foreigner_first_three_years`; EU, US, OTHER; duration 3 years): A foreigner who takes up domicile or residence in Chile is taxed only on Chilean-source income during the first three years from arrival; the period can be extended by the Regional Director. Eligibility: Foreign nationals establishing residence or domicile in Chile; applies automatically from entry (Deloitte 2026; PwC). Extension at the tax authority's discretion.
  - Metrics that differ from standard: capital_gains, dividends (details in the tax sections above).

## Company taxation (kept separate from personal tax)

Headline CIT rate: 27% (0.27). First category tax 27% (partially integrated system); 12.5% for SMEs in 2025-2027. The reform promulgated on 9 Oct 2026 cuts the general rate to 25.5% (2027), 24% (2028) and 23% (from 2029).

## Cost of living notes

Not researched.

## Open questions

- The 'Ley de Reconstruccion Nacional' was promulgated on 9 Oct 2026 but not yet published; its changes (listed-share gains, gift tax, CIT) are not scored.

## Sources

- PwC Worldwide Tax Summaries: Chile - Individual - Income determination (PwC, professional): https://taxsummaries.pwc.com/chile/individual/income-determination
- PwC Worldwide Tax Summaries: Chile - Individual - Taxes on personal income (PwC, professional): https://taxsummaries.pwc.com/chile/individual/taxes-on-personal-income
- Deloitte International Tax: Chile Highlights 2026 (Deloitte, professional): https://www.deloitte.com/content/dam/assets-shared/docs/services/tax/2026/dttl-tax-chilehighlights-2026.pdf
- Finclaro: Beneficio tributario art. 107 LIR (10% single tax on listed share gains; repeal from 2027) (Finclaro, other): https://finclaro.cl/guias/beneficio-tributario-107-lir
- Megarreforma: primeras normas que entran en vigencia tras la promulgacion (CNN Chile, Oct 2026) (CNN Chile, other): https://www.cnnchile.com/negocios/megareforma-kast-primeras-normas-vigencia-tras-promulgacion/
- PwC Worldwide Tax Summaries: Chile - Corporate - Taxes on corporate income (PwC, professional): https://taxsummaries.pwc.com/chile/corporate/taxes-on-corporate-income
- PwC Worldwide Tax Summaries: Chile - Individual - Foreign tax relief and tax treaties (PwC, professional): https://taxsummaries.pwc.com/chile/individual/foreign-tax-relief-and-tax-treaties
- PwC Worldwide Tax Summaries: Chile - Individual - Other taxes (PwC, professional): https://taxsummaries.pwc.com/chile/individual/other-taxes
- Ley No 16.271 sobre Impuesto a las Herencias, Asignaciones y Donaciones (texto refundido, actualizado a Ley 21.210) (Servicio de Impuestos Internos (SII), legislation): https://www.sii.cl/normativa_legislacion/ley16271.pdf
- SII: UTM - UTA - IPC 2026 (Servicio de Impuestos Internos (SII), tax_authority): https://www.sii.cl/valores_y_fechas/utm/utm2026.htm
- PwC Worldwide Tax Summaries: Chile - Individual - Residence (PwC, professional): https://taxsummaries.pwc.com/chile/individual/residence
- SII: exenciones del impuesto a las herencias (Ley 21.210): https://www.sii.cl/preguntas_frecuentes/herencias/001_160_0334.htm

## Change log

- 2026-10-15: initial research.
- 2026-10-16: added surviving-spouse treatment.
