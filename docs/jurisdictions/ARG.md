# Argentina — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Argentina taxes residents on worldwide income. Gains on foreign listed shares are taxed at a flat 15% (Argentine listed shares are exempt); foreign dividends are taxed at the progressive rates up to 35%, with a foreign tax credit. There is no federal inheritance or gift tax (the Province of Buenos Aires has one; the City of Buenos Aires does not). The personal assets tax (Bienes Personales) is a broad wealth tax on worldwide gross assets: 0.5% to 0.75% in 2026, falling to 0.25% from 2027 under Law 27.743. New residents become taxable after 12 months of residence.

US citizens: US citizens remain subject to US federal tax; no US-Argentina income tax treaty, so relief depends on foreign tax credits on each side.

## Residence and eligibility

Foreign nationals become resident from the 13th month of presence in Argentina (for reasons other than work); foreign nationals assigned to work for up to five years remain non-resident. Law 27,802 clarified that citizenship by naturalisation for relevant investments does not by itself make a person tax resident (PwC Residence).

- **Mercosur residence** (OTHER): Nationals of Mercosur and associated states can obtain residence under the Mercosur residence agreement (not researched in detail).
- **Rentista / pensionado / investor residence permits** (EU, US, OTHER): Temporary residence categories exist for persons with passive income or investments; amounts not researched. A citizenship-by-investment route exists (Law 27,802 reference in PwC) but terms were not researched.

## Capital gains

### Standard regime

Gains of resident individuals on shares, bonds and fund units are taxed at a flat 15% (schedular). Gains on shares traded on a CNV-supervised Argentine market or issued in an IPO, and on Argentine government/corporate bonds and local mutual funds, are exempt. Gains on foreign securities are foreign-source and taxed at 15%. From 1 January 2026 gains on the sale of real estate by resident individuals are exempt (reform effective for transfers on or after 1 Jan 2026).

- **Important exceptions, statute references and announced changes:** Gains on digital currencies 15%. Gains computed on foreign securities in foreign currency for foreign-source rules (not verified). Provincial stamp tax (around 1%-1.5%) may apply to some contracts.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 15% (0.15); listed domestic 0% (0.0); listed foreign 15% (0.15); private business sale 15% (0.15); local real estate 0% (0.0); foreign real estate n/a (null).
- **How derived:** LIG schedular rate 15% on results from the sale of shares and securities by resident individuals (PwC Income determination; Deloitte 2026); exemption for CNV-listed shares/IPO shares. Foreign listed securities: 15% foreign-source rate. private_business_sale = unlisted shares at 15%. Local real estate exempt for transfers from 1 Jan 2026 (PwC, Significant developments).
- **Trader recharacterisation:** Habitual dealers carrying on a business are taxed on business income at progressive rates up to 35%.
- **Foreign assets:** Worldwide; foreign tax credit limited to the Argentine tax on the foreign-source income (PwC Foreign tax relief).

Open points for this tax: The 15% rate for foreign-source share gains (LIG art. 94, ex-art. 90 3rd paragraph) is confirmed only by a press article and practitioner consultations, not by the consolidated law text (infoleg page could not be opened). | Whether the 2026 real-estate exemption also covers foreign real estate held by residents is not stated; real_estate_foreign left null.

## Dividends

### Standard regime

Foreign dividends are foreign-source income taxed at the general progressive rates (top 35%). Dividends from Argentine companies out of profits from 2018 onwards bear a 7% withholding tax, which is final for individuals.

- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 35% (0.35); domestic 7% (0.07); foreign gross 35% (0.35); foreign tax relief: credit.
- **How derived:** Foreign dividends at the top progressive PIT rate 35% (PwC Taxes on personal income, FY2026 top rate 35%). Domestic dividends: 7% WHT on dividends from 2018+ profits (PwC Income determination; Deloitte 2026). Credit for foreign tax up to the Argentine tax on that income.
- **Outbound withholding:** 7% WHT on dividends to residents and non-residents (profits from 2018 onwards); 35% equalisation tax only on distributions of pre-2018 untaxed earnings. Argentine companies also pay the 0.5% personal assets tax on shares held by individuals as substitute taxpayer.
- **Treaty network:** About 30 treaties (PwC list includes Australia, Belgium, Brazil, Canada, Chile, Denmark, Finland, France, Germany, Italy, Mexico, Netherlands, Norway, Qatar, Russia, Spain, Sweden, Switzerland, Turkey, UAE, UK; Japan, Luxembourg and China pending). No treaty with the US.
- **Holding companies:** Controlled foreign entities with passive income may be looked through under transparency rules (PwC).

Open points for this tax: FY2026 brackets are indexed semi-annually; the 35% rate applied above ARS 60,750,914 of semi-annual taxable income for January-June 2026.

## Inheritance and gifts to children

### Standard regime

There is no federal inheritance or gift tax. The Province of Buenos Aires levies a gratuitous transfer tax (Impuesto a la Transmision Gratuita de Bienes) under its own conditions; the City of Buenos Aires (CABA), where the family would most likely live, does not. The JSON scores the CABA position.

- **Regional differences:** Province of Buenos Aires (not CABA) levies an inheritance and gift tax; other provinces currently do not (PwC).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** basis `none`, children `fully_exempt`, exemption 0 ARS, brackets (marginal): none; other transfer costs 0% (0.0).
- **Gifts:** No federal gift tax; Province of Buenos Aires taxes gifts under its gratuitous-transfer tax. (same as inheritance: True; tax-free after years: None)
- **Foreign assets:** No national tax on any assets.
- **Residence/domicile rules:** Provincial tax depends on domicile in the Province of Buenos Aires / situs there.
- **Business relief covers listed shares:** False

Open points for this tax: Province of Buenos Aires gratuitous-transfer tax rates and scope (whether it reaches foreign assets of a PBA domiciliary) not researched. | PwC notes that the federal government and other provinces may introduce similar taxes.

## Wealth tax

### Standard regime

The Impuesto sobre los Bienes Personales taxes resident individuals on worldwide assets (no deduction for liabilities) above the non-taxable minimum (ARS 384,728,044.57 for FY2025, indexed annually). Law 27.743 sets the 2026 scale at 0.50% up to ARS 13,688,704.13 (2023 base, indexed) and 0.75% above; from 2027 the rate is a flat 0.25%. Argentine bank deposits and government bonds are exempt; the owner-occupied home is exempt up to ARS 1,346,548,155.99 (FY2025).

- **Important exceptions, statute references and announced changes:** Law 27.743 rate path: 2023 0.5%-1.5%, 2024 0.5%-1.25%, 2025 0.5%-1.0%, 2026 0.5%-0.75%, 2027 onwards 0.25%. Individuals working in Argentina for up to five years are taxed only on Argentine assets (requires employment).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON type:** `broad`
- **Component Impuesto sobre los Bienes Personales (FY2026 scale, FY2025 indexed amounts):** base `net_wealth_worldwide`, allowance 384,728,045 ARS, entry threshold 0 ARS, brackets (marginal): from 0 ARS: 0.5% (0.005); from 52,664,283 ARS: 0.75% (0.0075). Base is gross assets (liabilities generally not deductible), so net_wealth_worldwide overstates the deduction. Bracket threshold ARS 52,664,283 is the FY2025 indexed value of the 2023 base ARS 13,688,704.13. Rate falls to 0.25% flat from FY2027 (Law 27.743 art. 25(e)). Foreign wealth taxes on foreign assets are creditable. Argentine shares are taxed at 0.5% via the company (substitute taxpayer), not in the individual's return.
- **Property tax (not a wealth tax):** Provincial/municipal real estate tax (e.g. ABL in Buenos Aires City) on fiscal value; 0.6% tax on bank account debits and credits; provincial stamp tax.

Open points for this tax: Indexed 2026 amounts (non-taxable minimum, bracket threshold, home exemption) are published only after year-end; FY2025 values are used in the JSON. | The REIBP advance-payment regime (fiscal stability to 2038) is open only to persons resident at 31 Dec 2023 and does not help a new arrival.

## Special regimes

None modelled; see Residence and eligibility.

## Company taxation (kept separate from personal tax)

Headline CIT rate: 35% (0.35). Progressive CIT 25%/30%/35% (indexed brackets; 35% above ARS 1,335,141,857 for 2026). 7% WHT on dividends. Worldwide taxation with foreign tax credit. RIGI large-investment incentive regime.

## Cost of living notes

Not researched.

## Open questions

- Consolidated text of LIG art. 94 (15% on foreign-source securities gains) not opened.
- 2026 indexed amounts for Bienes Personales not yet published.

## Sources

- PwC Worldwide Tax Summaries: Argentina - Individual - Income determination (PwC, professional): https://taxsummaries.pwc.com/argentina/individual/income-determination
- Deloitte International Tax: Argentina Highlights 2026 (Deloitte, professional): https://www.deloitte.com/content/dam/assets-shared/docs/services/tax/2026/dttl-tax-argentinahighlights-2026.pdf
- iProfesional: Impuesto a las Ganancias - renta financiera de fuente extranjera (15% on purchase-sale results, LIG art. 90 3rd paragraph, now art. 94) (iProfesional, other): https://www.iprofesional.com/impuestos/291480-Impuesto-a-las-Ganancias-Renta-financiera-de-fuente-extranjera
- PwC Worldwide Tax Summaries: Argentina - Individual - Significant developments (PwC, professional): https://taxsummaries.pwc.com/argentina/individual/significant-developments
- PwC Worldwide Tax Summaries: Argentina - Individual - Taxes on personal income (PwC, professional): https://taxsummaries.pwc.com/argentina/individual/taxes-on-personal-income
- PwC Worldwide Tax Summaries: Argentina - Individual - Foreign tax relief and tax treaties (PwC, professional): https://taxsummaries.pwc.com/argentina/individual/foreign-tax-relief-and-tax-treaties
- Ley 27.743 (2024), Title on Impuesto sobre los Bienes Personales: art. 25 scale of Law 23.966 for fiscal periods 2023-2027 and REIBP (InfoLEG (Ministerio de Justicia, Argentina), legislation): https://servicios.infoleg.gob.ar/infolegInternet/anexos/400000-404999/401268/norma.htm
- PwC Worldwide Tax Summaries: Argentina - Individual - Other taxes (PwC, professional): https://taxsummaries.pwc.com/argentina/individual/other-taxes
- PwC Worldwide Tax Summaries: Argentina - Individual - Residence (PwC, professional): https://taxsummaries.pwc.com/argentina/individual/residence
- PwC Worldwide Tax Summaries: Argentina - Corporate - Taxes on corporate income (PwC, professional): https://taxsummaries.pwc.com/argentina/corporate/taxes-on-corporate-income

## Change log

- 2026-10-15: initial research.
