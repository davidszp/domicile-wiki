# Belgium — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Belgium introduced a 10% tax on capital gains on financial assets (shares, bonds, funds, crypto, some insurance) realised from 1 January 2026, with gains accrued before 2026 excluded and an annual exemption of EUR 10,000; substantial holdings of 20% or more have a EUR 1 million exemption and rates of 1.25%-10%. Dividends and interest bear a final 30% withholding tax, with no credit for foreign withholding tax. Securities accounts above EUR 1 million pay an annual 0.15% tax. Inheritance and gift tax is regional: in Flanders (used here) a child pays 3% up to EUR 50,000, 9% to EUR 250,000 and 27% above, separately on movable and immovable assets; registered gifts of movables cost a flat 3%, and unregistered gifts escape tax if the donor survives five years.

## Residence and eligibility

Resident if domiciled in Belgium or, failing that, if the seat of wealth (centre of economic interests) is in Belgium; registration in the population register creates a rebuttable presumption; for married/cohabiting couples the family home decides.

- **EU/EEA/Swiss free movement** (EU): Registration with the commune; no permit.
- **Residence permit for third-country nationals** (US, OTHER): No residence-by-investment programme known; routes are employment, self-employment (professional card) or family reunification. Not verified in this session.

Standard regime eligibility: Domicile in Belgium, or centre of economic interests there; registration in a commune's population register creates a presumption of residence; for couples, the family home decides.

## Capital gains

Since 1 January 2026 (Law of 6 April 2026, published 21 April 2026), gains realised by private individuals on financial assets within the normal management of private wealth are taxed at 10% above an annual exemption of EUR 10,000 (statutory base EUR 4,855, indexed); an unused exemption carries forward by up to EUR 1,000 a year, with at most EUR 5,000 of carried-forward exemption in a year. Only value accrued from 1 January 2026 is taxed: assets held on 31 December 2025 are stepped up to their value on that date. Belgian banks withhold the 10% from 1 June 2026 unless the taxpayer opts out and declares. Shareholdings of 20% or more: first EUR 1 million of gain exempt, then 1.25% up to EUR 2.5 million, 2.5% to EUR 5 million, 5% to EUR 10 million and 10% above. Sales of shares to one's own controlled company ('internal gains') are taxed at 33%. Real estate: buildings sold within 5 years are taxed at 16.5% plus communal tax; land at 33% within 5 years, 16.5% from 5 to 8 years, exempt after 8; the main home is exempt.

Legal basis: Law of 6 April 2026 introducing a tax on capital gains on financial assets (Moniteur belge 21 April 2026):
CIR 92 art. 90, 9° (miscellaneous income: a) internal gains, b) substantial holdings of 20%+, c) other financial
assets), art. 96/2 (exemptions), art. 171 (separate rates, including the new 1.25% / 2.5% / 5% bands for substantial
holdings), a 10% précompte mobilier on gains under art. 90, 9°, c) collected by Belgian intermediaries, art. 35 of the law (effect 1 January 2026; withholding from
1 June 2026); step-up to the 31 December 2025 value for assets acquired before 2026.

JSON values: headline rate 33% (`0.33`); listed securities domestic 10% (`0.1`), foreign 10% (`0.1`); private business sale 10% (`0.1`); local real estate 0% (`0.0`); foreign real estate 0% (`0.0`).

- **How the JSON numbers were derived:** Listed securities: 10% on gains above EUR 10,000 a year (no communal surcharge reported). Private business sale (>= 20%): top bracket 10% above the EUR 1 million exemption (33% applies only to sales to one's own company). Real estate: 0 because held longer than 5 years (buildings) / 8 years (land). Headline 33% = rate for internal gains and gains outside normal private management.
- **Holding periods:** None for financial assets. Real estate: 5 years for buildings, 8 years for land.
- **Professional-trader risk:** Transactions outside the normal management of private wealth (speculation, leverage, short-term trading resembling a professional activity) are taxed as miscellaneous income at 33% plus communal tax, or as professional income at progressive rates up to 50%.
- **Foreign assets:** Worldwide gains taxed the same way; foreign real estate gains generally exempt with progression under treaties.
- **Exemptions and thresholds:** EUR 10,000 per taxpayer per year for ordinary financial assets (CIR art. 96/2, 2°: EUR 4,855 before indexation); carry-forward EUR 1,000 a year (base EUR 480), capped at EUR 5,000 a year (base EUR 2,426); EUR 1 million for substantial holdings (deducted from the exemptions used in the previous four years); exits from joint ownership within three years after a death or divorce exempt; real estate exempt after 5 years (buildings) or 8 years (land).
- **Eligibility conditions:** Resident individual acting within normal management of private wealth.
- **Regional differences:** None for income tax; communal surcharges (0%-9% of income tax, average 7%) apply to real estate gains.
- **Important exceptions / announced changes:** Speculative transactions or operations outside normal private management are taxed at 33% plus communal tax. Withholding by Belgian intermediaries starts 1 June 2026 (Law of 6 April 2026, art. 35); the law takes effect on 1 January 2026. Foreign accounts and opted-out accounts are declared. The personal income tax reform Law of 15 July 2026 (published 29 July 2026) changes the tax-free allowance and other items but was not found to alter the capital gains rates.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **Sources:** [Belgium - Individual - Significant developments](https://taxsummaries.pwc.com/belgium/individual/significant-developments); [Belgium - Individual - Income determination](https://taxsummaries.pwc.com/belgium/individual/income-determination); [Loi du 6 avril 2026 introduisant un impôt sur les plus-values sur les actifs financiers (Moniteur belge 21 avril 2026, numac 2026002780)](https://www.ejustice.just.fgov.be/cgi/article_body.pl?language=fr&caller=summary&pub_date=26-04-21&numac=2026002780)

## Dividends

Dividends are taxed at a flat 30% withholding tax, final when paid through a Belgian bank; foreign dividends received abroad are declared and taxed at 30%. The first EUR 859 of dividends (income year 2025) is exempt. Foreign withholding tax is not credited for individuals, so a 15% US withholding plus 30% Belgian tax on the net amount gives about 40.5% in total. Interest is also taxed at 30% (savings account interest above EUR 1,050 at 15%).

JSON values: headline 30% (`0.3`); domestic 30% (`0.3`); foreign gross 30% (`0.3`); foreign tax relief: none.

- **How the JSON numbers were derived:** 30% flat rate on movable income. Foreign dividends: 30% Belgian rate; no credit for source-country withholding (the Belgian tax is levied on the net amount after foreign tax).
- **Outbound withholding:** 30% on dividends paid by Belgian companies, reduced by treaties (often 15%) and to 0% for EU parent companies; reduced rates for some SME dividends.
- **Treaty network:** About 95 income tax treaties including the US and all EU states (count from general knowledge).
- **Holding-company notes:** A Belgian company pays 25% (20% on the first EUR 100,000 for SMEs); dividends received deduction and exemption of gains on qualifying shares (at least 10% or EUR 2.5 million); distributions to individuals bear 30% withholding. No structure is modelled: a company pays 25% on portfolio dividends and on gains from shares below 10% or EUR 2.5 million (versus 10% CGT for an individual), plus 30% withholding on payouts and the same securities-account tax, and a private foundation is caught by the 2026 capital gains tax through the legal-entities tax.
- **Exemptions and thresholds:** Dividend exemption EUR 859 per taxpayer (income year 2025; 2026 amount not verified).
- **Eligibility conditions:** Resident individual.
- **Regional differences:** None; no communal surcharge on movable income withheld at source.
- **Important exceptions / announced changes:** Belgian tax on foreign dividends is computed on the amount net of foreign withholding when collected by a Belgian bank (from general knowledge).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Belgium - Individual - Income determination](https://taxsummaries.pwc.com/belgium/individual/income-determination); [Belgium - Individual - Taxes on personal income](https://taxsummaries.pwc.com/belgium/individual/taxes-on-personal-income)

## Inheritance and gifts to children

Inheritance tax is regional and depends on where the deceased lived for most of the last five years. In Flanders (used as the standard here), each child pays 3% on the first EUR 50,000, 9% from EUR 50,000 to 250,000 and 27% above, calculated separately for movable and immovable assets. A child inheriting a EUR 20 million portfolio pays about 26.6%. There is no general tax-free amount for adult children. Gifts are much cheaper: registered gifts of movables cost a flat 3%, and gifts that are not registered (e.g. bank transfers) are tax-free if the donor survives five years.

JSON values: basis `beneficiary`, bracket mode `marginal`, children `taxed`, exemption EUR 0, marginal brackets above the exemption: 3% (`0.03`) from EUR 0, 9% (`0.09`) from EUR 50,000, 27% (`0.27`) from EUR 250,000; other transfer costs 0% (`0`); gifts same as inheritance: False; tax-free after years: 5.

- **Gifts:** Registered gifts of movables (notarial deed or registration of a gift document) in the direct line: flat 3% in Flanders and Brussels. Unregistered gifts (hand gifts, bank transfers) are not taxed but are added back to the estate if the donor dies within five years. Gifts of real estate pay progressive regional gift duties.
- **Business relief:** Regional reduced rates for family businesses and companies (Flanders: new rules from 1 January 2026) with continuation conditions; holding companies of listed portfolios do not qualify. Covers listed portfolios: no.
- **Foreign assets:** Worldwide estate of a resident deceased; foreign real estate tax credited (Belgium has very few estate tax treaties).
- **Domicile / residence rules:** Liability depends on the deceased's residence (domicile or seat of wealth) in Belgium at death; the region is where the deceased lived longest in the five years before death. Non-residents are taxed only on Belgian real estate (estate duty).
- **Exemptions and thresholds:** No general allowance for adult children in Flanders; reductions for children under 21. Family home exempt for the surviving partner.
- **Eligibility conditions:** Belgian inheritance tax applies to the worldwide estate of a deceased Belgian resident; the region is the one where the deceased lived longest in the last five years.
- **Regional differences:** Brussels-Capital: direct-line rates rise from 3% to 30% (top rate above EUR 500,000, from general knowledge), with a small allowance for children; Wallonia has its own scale (reformed rates from 2028 announced; not verified). The Flemish government plans to reform and lower inheritance tax (2024-2029 coalition agreement) but no decision is in force. Regional files would be needed to score Brussels and Wallonia separately.
- **Important exceptions / announced changes:** Reduced rate for family businesses (Flanders, new rules from 1 January 2026) does not cover listed portfolios. Flemish tax regularisation programme 2026-2029 for evaded inheritance tax.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Algemeen tarief in de erfbelasting](https://www.vlaanderen.be/belastingen-en-begroting/vlaamse-belastingen/erfbelasting/tarieven-in-de-erfbelasting/algemeen-tarief-in-de-erfbelasting); [Erfbelasting](https://www.vlaanderen.be/belastingen-en-begroting/vlaamse-belastingen/erfbelasting); [Belgium - Individual - Other taxes](https://taxsummaries.pwc.com/belgium/individual/other-taxes)
- Surviving spouse: taxed on the same Flemish 3% / 9% / 27% scale as children (partners are married, legally cohabiting, or factually cohabiting for at least one year); the family home is exempt for the surviving partner.

## Wealth tax

Belgium has no general wealth tax, but an annual tax on securities accounts of 0.15% applies when the average value of a securities account (shares, bonds, funds, certificates held in an account, in Belgium or abroad for residents) reaches EUR 1 million over the reference period. The tax cannot exceed 10% of the amount above EUR 1 million, which smooths the threshold.

JSON type: `limited`.

- **Component Annual tax on securities accounts** (base `securities_accounts`, bracket mode `marginal`): allowance EUR 0, entry threshold EUR 1,000,000; brackets: 0.15% (`0.0015`) from EUR 0. 0.15% of the whole average account value once it reaches EUR 1 million, capped at 10% of the excess above EUR 1 million (smoothing up to about EUR 1.015 million).
- **Property tax (not a wealth tax):** Annual withholding tax on real estate (onroerende voorheffing / précompte immobilier) on the indexed cadastral income, set regionally and locally.
- **Exemptions and thresholds:** Entry threshold EUR 1 million average value per account; above it the whole value is taxed at 0.15%, capped at 10% of the excess over EUR 1 million.
- **Eligibility conditions:** Per account (all holders together); applies to residents' accounts worldwide.
- **Regional differences:** None.
- **Important exceptions / announced changes:** Directly registered shares (held in a company's share register rather than in a securities account) are outside the tax; an anti-abuse rule targets splitting or conversion into registered shares.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Belgium - Individual - Other taxes](https://taxsummaries.pwc.com/belgium/individual/other-taxes)

## Special regimes

None modelled; see the summary and open questions for regimes considered and rejected.

## Holding structures

**No structure modelled.** The 2026 capital gains tax does not make a holding attractive:

- A Belgian company is outside the new 10% capital gains tax (KPMG), but pays 25% corporate tax on portfolio dividends and on gains from shares that fail the participation conditions (at least 10% or EUR 2.5 million acquisition value, one-year holding, subject-to-tax). A diversified portfolio fails them, so gains go from 10% (individual) to 25%, dividends stay taxed, and payouts bear 30% withholding. The securities-account tax also applies to accounts held by companies.
- A private foundation (private stichting) is subject to the legal-entities tax, which the 2026 capital gains tax also covers (KPMG), so it offers no income-tax advantage; it is used for control and succession, not tax saving.
- Gifts of movables to children are already cheap without a structure (see Inheritance).

## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 25% (`0.25`).

Corporate income tax 25%; 20% on the first EUR 100,000 for qualifying SMEs. Gains on qualifying shares are exempt; dividends received deduction for qualifying participations; minimum tax base rules for large profits.

Special zones: None.

## Cost of living notes

Brussels (Uccle, Ixelles, Woluwe).

- Prime family rent: EUR 7,950/month, the median of 22 distinct 4+ bedroom houses for rent in the Brussels-Capital
  Region on LuxuryEstate.com on 15 October 2026 (range EUR 3,400-20,000). Agency asking rents.
- International school: International School of Brussels, Grades 10-12, EUR 51,105 a year for 2026-27; application
  fee EUR 2,000 per family.
- Not sourced: price per m², family health insurance, housekeeper.

## Open questions

- Special expatriate regime (2022 regime for impatriate taxpayers and researchers) concerns employment income only (30% tax-free allowance) and does not change passive income taxation; not modelled.
- National file uses Flanders for inheritance; Brussels and Wallonia need a subnational file.
- (standard / capital_gains) The EUR 10,000 and EUR 1,000 figures are the indexed amounts of the statutory EUR 4,855 and EUR 480 as reported by PwC; the indexation coefficient for income year 2026 was not checked on an official page.
- (standard / capital_gains) Treatment of investment funds (new CIR art. 95/1 exemption for certain undertakings for collective investment) was not analysed.
- (standard / capital_gains) Whether the EUR 10,000 exemption is indexed for 2026 was not verified.
- (standard / dividends) The absence of a credit for foreign withholding tax on portfolio dividends and the 'net of foreign tax' base were not verified on an official page.
- (standard / wealth_tax) The 10% smoothing cap and the anti-abuse rule are from general knowledge; PwC confirms only the 0.15% rate and EUR 1 million threshold. Proposals in the 2025 federal coalition agreement to change the tax were not checked.
- (standard / inheritance) Brussels and Wallonia scales were not verified (Brussels Fiscalité site redirected); subnational file data/subnational/BEL.json not written.
- (standard / inheritance) Flemish reduced rate for family businesses from 2026 not read in detail.

US citizens: US-Belgium income tax treaty applies; no estate tax treaty. Belgium's securities account tax is not an income tax and not creditable in the US.

## Sources

- [Belgium - Individual - Significant developments](https://taxsummaries.pwc.com/belgium/individual/significant-developments) — PwC Worldwide Tax Summaries (professional)
- [Belgium - Individual - Income determination](https://taxsummaries.pwc.com/belgium/individual/income-determination) — PwC Worldwide Tax Summaries (professional)
- [Belgium - Individual - Taxes on personal income](https://taxsummaries.pwc.com/belgium/individual/taxes-on-personal-income) — PwC Worldwide Tax Summaries (professional)
- [Belgium - Individual - Other taxes](https://taxsummaries.pwc.com/belgium/individual/other-taxes) — PwC Worldwide Tax Summaries (professional)
- [Algemeen tarief in de erfbelasting](https://www.vlaanderen.be/belastingen-en-begroting/vlaamse-belastingen/erfbelasting/tarieven-in-de-erfbelasting/algemeen-tarief-in-de-erfbelasting) — Vlaamse overheid (Vlaamse Belastingdienst) (tax_authority)
- [Erfbelasting](https://www.vlaanderen.be/belastingen-en-begroting/vlaamse-belastingen/erfbelasting) — Vlaamse overheid (Vlaamse Belastingdienst) (tax_authority)
- [Belgium - Individual - Residence](https://taxsummaries.pwc.com/belgium/individual/residence) — PwC Worldwide Tax Summaries (professional)
- [Belgium - Corporate - Taxes on corporate income](https://taxsummaries.pwc.com/belgium/corporate/taxes-on-corporate-income) — PwC Worldwide Tax Summaries (professional)
- [LuxuryEstate.com: luxury properties for rent in the Brussels-Capital Region (listing sample)](https://www.luxuryestate.com/rent/belgium/brussels-capital-region) — LuxuryEstate.com (other)
- [The International School of Brussels: Tuition & Fees, School Fees 2026-27](https://www.isb.be/admissions/tuition) — The International School of Brussels (other)
- [Loi du 6 avril 2026 introduisant un impôt sur les plus-values sur les actifs financiers (Moniteur belge 21 avril 2026, numac 2026002780)](https://www.ejustice.just.fgov.be/cgi/article_body.pl?language=fr&caller=summary&pub_date=26-04-21&numac=2026002780) — Moniteur belge (Belgian Official Gazette) (legislation)
- [De nieuwe meerwaardebelasting op financiële activa](https://kpmg.com/be/nl/home/insights/2025/09/ctx-de-nieuwe-meerwaardebelasting-op-financiele-activa.html) — KPMG Belgium (professional)

## Change log

- 2026-10-15: initial research.
- 2026-10-15: capital gains re-verified against the Law of 6 April 2026 (Moniteur belge 21 April 2026): 10% rate, EUR 10,000 indexed exemption (base EUR 4,855), effect 1 January 2026, withholding from 1 June 2026, 31 December 2025 step-up, substantial-holding bands; confidence raised to high/verified. Added prime rent (LuxuryEstate sample, EUR 7,950/month) and ISB fee (EUR 51,105, 2026-27).
- 2026-10-15: Holding structures section: no structure modelled (company 25% on portfolio income; private foundations covered by the 2026 capital gains tax).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
- 2026-10-16: added surviving-spouse treatment.
