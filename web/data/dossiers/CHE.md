# Switzerland — family-office tax dossier

Last reviewed: 2026-10-16
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

No tax on private capital gains from securities (federal law, all cantons), but dividends are taxed as ordinary income (up to about 39% in the City of Zurich, 22% in Zug, 43% in Geneva) and every canton levies an annual net wealth tax (top marginal 0.10%-0.86% depending on commune). Children are exempt from inheritance and gift tax in most cantons (not VD, NE, AI, partly LU and SO). National figures represent the City of Zurich; lump-sum taxation is available to non-Swiss newcomers without Swiss work in 21 cantons, not in Zurich.

The national numbers represent the **City of Zurich** (canton ZH), for a married couple with three children and no
church membership. All cantonal figures were computed with the official ESTV tax calculator for tax year 2026
(swisstaxcalculator.estv.admin.ch), so they are consistent across cantons. The canton-by-canton detail is in
`CHE-regions.md` and `data/subnational/CHE.json`.

## Residence and eligibility

- Tax residence (DBG art. 3): domicile (intent to stay, centre of vital interests) or a stay of 30 days with work / 90
  days without work, ignoring short interruptions. Worldwide income and wealth are taxed; foreign real estate and
  foreign permanent establishments are exempt but count for the rate. No exit tax on private assets.
- EU/EFTA citizens: B permit as non-active persons with sufficient means and health/accident insurance (SEM).
- US/other citizens: discretionary cantonal permit for important public (in practice fiscal) interests, AIG art. 30
  para. 1 let. b, usually tied to lump-sum taxation or a substantial expected tax bill; or AIG art. 28 for retirees
  (minimum age 55, personal ties, sufficient means).

## Capital gains

- Rule: capital gains on private movable assets are tax-free (DBG art. 16 para. 3); the cantons apply the same
  exemption (PwC: "normally tax-exempt throughout Switzerland"). Private losses are not deductible.
- JSON: listed securities (domestic and foreign) 0, private business sale 0, foreign real estate 0.
- Real estate: cantonal real estate gains tax (Grundstückgewinnsteuer). Zurich: communal tax, fixed tariff 10%-40%
  (40% on gain above CHF 100,000), +50%/+25% surcharge for holdings under 1/2 years, reduction 5% (5 years) rising to
  50% (20 years). JSON `real_estate_local` = 0.31: CHF 1M gain, 10 full years: (CHF 29,400 + 900,000 x 40%) x 0.8 =
  CHF 311,520.
- Professional securities dealer risk (ESTV Circular 36, safe harbour, all five must be met): holding period at least
  6 months; yearly transaction volume at most 5x the portfolio at the start of the year; gains under 50% of net income
  (not needed for living); no debt financing, or taxable investment income above interest paid; derivatives only to
  hedge own positions. Outside the safe harbour: facts-and-circumstances test; reclassification makes all gains
  taxable income (plus AHV social security) but losses deductible. A family office managing only its own money with
  modest leverage normally stays private, but a ruling is advisable.
- Other recharacterisation: indirect partial liquidation (DBG art. 20a para. 1 let. a: sale of at least 20% to a
  company that distributes pre-existing reserves within 5 years), transposition (art. 20a para. 1 let. b),
  liquidation surpluses and buybacks taxed as dividends.

## Dividends

- Rule: dividends are ordinary income (DBG art. 20 para. 1 let. c). Federal top rate 11.5% (married from CHF
  941,300). Partial taxation only for holdings of at least 10%: federal 70% (art. 20 para. 1bis), Zurich 50%.
- JSON: `headline_rate` = `domestic_rate` = `foreign_gross_rate` = 0.3932 — ESTV calculator marginal
  rate at CHF 5M taxable income, City of Zurich (11.5% federal + 13% x (0.95 canton + 1.19 city) = 39.32%).
- Foreign WHT: non-recoverable treaty-rate WHT is credited (flat-rate credit, up to the Swiss tax on that income); no
  credit without a treaty (deduction instead). ~100 treaties.
- Outbound: Swiss companies withhold 35% (refundable to residents who declare; treaty residual 0-20%).
- Holding-company notes (JSON `holding_company_notes`): company-level participation reduction for holdings of 10% or
  CHF 1M (DBG art. 69). No structure is modelled; see Holding structures.

## Inheritance and gifts to children

- No federal inheritance or gift tax. Zurich exempts children, grandchildren (and the spouse) from inheritance and
  gift tax without limit. JSON: basis `beneficiary`, `fully_exempt`, no brackets.
- Cantonal exceptions (see regions dossier): Vaud ~7% above CHF 1M per child (Lausanne; halved to ~3.5% for foreigners who never worked in Switzerland, LMSD art. 36), Neuchâtel 3%, Appenzell
  Innerrhoden 1% above CHF 300,000, Lucerne communes up to 2% (inheritance only), Solothurn estate duty 0.8-1.2%;
  Schwyz and Obwalden have no inheritance or gift tax at all; Geneva withdraws the descendant exemption when the
  deceased was lump-sum taxed.
- Scope: canton of last domicile taxes worldwide movable assets; Swiss real estate is taxed where it lies; foreign real
  estate is not taxed. No tail after emigration.

- Federal vote of 30 November 2025: the JUSO "Initiative für eine Zukunft" (50% federal inheritance and gift tax above
  CHF 50 million) was rejected with 21.7% yes and by all 26 cantons (official BFS result). No federal inheritance tax.
- Surviving spouse (`spouse_treatment` `fully_exempt`): Spouse: exempt in the cantonal tariffs (ESTV Steuermäppchen 2025) and per PwC's inheritance and gift tax chart (cantonal and communal level), even in Vaud and Neuchâtel where children are taxed; registered partners too.

## Wealth tax

- Rule: cantonal and communal net wealth tax on worldwide net assets (ESTV, Die Vermögenssteuer natürlicher Personen, 2026); no federal wealth tax.
  Securities at 31 December market value; debts deductible.
- Zurich 2026 basic tariff (married): 0% to CHF 161,000, then 0.05%-0.30% (PwC table), multiplied by 0.95 (canton) +
  1.19 (City of Zurich) = 2.14. JSON brackets (combined marginal, on taxable wealth):

| From CHF | Marginal rate |
|---|---|
| 0 | 0.000% |
| 161,000 | 0.107% |
| 403,000 | 0.214% |
| 805,000 | 0.321% |
| 1,451,000 | 0.428% |
| 2,418,000 | 0.535% |
| 3,385,000 | 0.642% |

- CHF 10M taxable wealth: CHF 54,973; CHF 50M: CHF 311,773 (0.62%). Zurich has no burden cap.
- Other cantons range from 0.10% (Wollerau/Freienbach SZ) to 0.86% (Geneva) top marginal; caps exist in BE, LU, BS, AG,
  VD, VS and GE (ESTV) and are explained per canton.

## Special regimes

**Lump-sum taxation** (DBG art. 14, StHG art. 6): for non-Swiss newcomers (or returnees after 10 years) without Swiss
gainful activity; both spouses must qualify. Base = worldwide living costs, at least the highest of CHF 435,000
(federal, 2026), 7x annual rent/rental value, and the control calculation on Swiss-source income/assets and treaty-
relieved foreign income. Ordinary tariffs apply to the base; cantons tax deemed wealth (4x-20x the base, or a surcharge).
Not available in ZH, SH, AR, BS (abolished) and effectively not in BL.

National JSON representative = Vaud (Lausanne): CHF 445,000/yr on a CHF 1M rent multiple
(federal CHF 115,000, with no per-child reduction under DBG art. 14 para. 4, + cantonal/communal CHF 330,000
= the 30% ceiling of LICom art. 8 on a CHF 1.1M base, 7x rent + 10% per LI art. 15 para. 3 b); about CHF 138,380 at the CHF 415,000 cantonal minimum.
Foreign dividends: marginal 0 unless treaty relief is claimed (modified lump sum). Per-canton estimates are in
`CHE-regions.md`.

Duration: No time limit in law: lump-sum taxation continues for as long as the person keeps meeting the conditions of DBG art. 14 / StHG art. 6, i.e. remains a non-Swiss citizen with unlimited tax liability and takes up no gainful activity in Switzerland. It ends on naturalisation, on starting gainful work in Switzerland, or if the canton abolishes it (as Zurich, Schaffhausen, Appenzell Ausserrhoden and Basel-Stadt did); the taxpayer may also switch to ordinary taxation. The tax base is reassessed annually and the cantonal minimums are indexed.

## Holding structures

**No structure modelled.** A private investor in Switzerland pays no tax on gains from movable private assets, so a company can only make things worse: a company pays profit tax of about 19.5% (City of Zurich) on gains from stakes below 10%, the participation reduction for dividends (DBG art. 69-70) needs a stake of 10% or a market value of CHF 1 million, payouts bear 35% withholding tax and income tax (partial taxation only for stakes of 10%+), and both company capital tax and wealth tax on the shares apply. Holding companies have had no special cantonal status since 2020 (STAF). The main risk to watch for a private investor is recharacterisation as a professional securities dealer (see Capital gains), not the absence of a structure.

## Company taxation (kept separate from personal tax)

Federal 8.5% on profit after tax plus cantonal/communal tax. ESTV calculator, CHF 1M pre-tax profit, 2026: City of
Zurich 19.5% (JSON `cit_rate` 0.1947), Geneva 14.7%, Zug 11.7%. Participation reduction for holdings of 10% or CHF 1M
(DBG art. 69). Pillar Two QDMTT from 2024, IIR from 2025.

## Cost of living notes

Zurich.

- Prime family rent: CHF 6,435/month, the median of 8 distinct houses with 5.5+ rooms and 180 m² or more for rent in
  the city of Zurich on ImmoStreet.ch on 15 October 2026 (range CHF 4,000-9,800). Thin market; the Gold Coast
  (Küsnacht, Zollikon) is dearer.
- Price per m²: city-centre apartment about CHF 22,800/m² (Numbeo, last resort).
- International school: Zurich International School, Grades 11-12, CHF 39,700 (2026/27).
- Housekeeper: federal minimum wage CHF 22.30/h (experienced unskilled, NAV Hauswirtschaft 2026), about
  CHF 4,059/month for 42 h/week before employer charges.
- Not sourced: family health insurance. Per-canton rents are in `CHE-regions.md`.

## Open questions

- Imputed rental value (Eigenmietwert) abolition was approved on 28 September 2025 (57.7% yes); the Federal Council had not fixed the entry-into-force date on the EFD page checked. It will also abolish mortgage-interest deductions and allow cantons a tax on second homes.
- Individual taxation (Individualbesteuerung) was approved on 8 March 2026 and enters into force by 1 January 2032 at the latest; married couples' tariffs used here will change then.
- Cantonal tables used (partial taxation, burden caps, lump-sum minimums) are the ESTV Steuermäppchen for tax period 2025 (published 26 November 2025); 2026 changes in cantonal minimum lump-sum bases indexed to the federal CHF 435,000 were not checked individually.
- Burden caps (BE, BS, VD, VS, GE, AG) can substantially lower the wealth tax for large low-yield portfolios and are not modelled in the brackets.

## Sources

- [Bundesgesetz über die direkte Bundessteuer (DBG), SR 642.11, consolidated version as of 1 January 2026](https://www.fedlex.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1991/1184_1184_1184/20260101/de/html/fedlex-data-admin-ch-eli-cc-1991-1184_1184_1184-20260101-de-html.html)
- [ESTV Kreisschreiben Nr. 36: Gewerbsmässiger Wertschriftenhandel (27 July 2012)](https://www.estv.admin.ch/dam/de/sd-web/oOz28af293pZ/dbst-ks-2012-1-036-d-de.pdf)
- [ESTV Steuermäppchen 2025: Grundstückgewinnsteuer (cantonal real estate gains tax tariffs)](https://www.estv2.admin.ch/stp/sm/grundstueckgewinnsteuer-de-fr.pdf)
- [PwC Worldwide Tax Summaries: Switzerland, Individual - Income determination (last reviewed 1 July 2026)](https://taxsummaries.pwc.com/switzerland/individual/income-determination)
- [ESTV Steuerrechner / tax calculator (income & wealth, inheritance & gift, legal entities), tax year 2026](https://swisstaxcalculator.estv.admin.ch/)
- [ESTV Steuermäppchen 2025: Teilbesteuerung der Einkünfte aus Beteiligungen (cantonal partial-taxation percentages)](https://www.estv2.admin.ch/stp/sm/teilbesteuerung-ev-de-fr.pdf)
- [PwC Worldwide Tax Summaries: Switzerland, Individual - Foreign tax relief and tax treaties (last reviewed 1 July 2026)](https://taxsummaries.pwc.com/switzerland/individual/foreign-tax-relief-and-tax-treaties)
- [ESTV Steuerinformationen: Die Vermögenssteuer natürlicher Personen (September 2026, law as of 1 January 2026)](https://www.estv2.admin.ch/stp/ds/d-vermoegenssteuer-np-de.pdf)
- [ESTV Steuermäppchen 2025: Belastungsobergrenze (cantonal tax burden caps)](https://www.estv2.admin.ch/stp/sm/belastungsobergrenze-ev-de-fr.pdf)
- [ESTV Steuermäppchen 2025: Erbschafts- und Schenkungssteuer (cantonal tariffs and exemptions)](https://www.estv2.admin.ch/stp/sm/erbschafts-schenkungssteuer-de-fr.pdf)
- [ESTV Steuerinformationen: Die Erbschafts- und Schenkungssteuern (December 2024, law as of 1 January 2025)](https://www.estv2.admin.ch/stp/ds/d-erbschaft-schenkung-de.pdf)
- [ESTV Steuermäppchen 2025: Besteuerung nach dem Aufwand (lump-sum taxation bases by canton)](https://www.estv2.admin.ch/stp/sm/aufwand-de-fr.pdf)
- [Ausländer- und Integrationsgesetz (AIG), SR 142.20, consolidated version of 12 June 2026 (Art. 28, Art. 30)](https://www.fedlex.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2007/758/20260612/de/html/fedlex-data-admin-ch-eli-cc-2007-758-20260612-de-html.html)
- [PwC Worldwide Tax Summaries: Switzerland, Individual - Residence (last reviewed 1 July 2026)](https://taxsummaries.pwc.com/switzerland/individual/residence)
- [SEM: Permit B EU/EFTA (residence permit)](https://www.sem.admin.ch/sem/en/home/themen/aufenthalt/eu_efta/ausweis_b_eu_efta.html)
- [PwC Worldwide Tax Summaries: Switzerland, Corporate - Taxes on corporate income (last reviewed 1 July 2026)](https://taxsummaries.pwc.com/switzerland/corporate/taxes-on-corporate-income)
- [PwC Worldwide Tax Summaries: Switzerland, Corporate - Withholding taxes (last reviewed 1 July 2026)](https://taxsummaries.pwc.com/switzerland/corporate/withholding-taxes)
- [Numbeo: Property prices in Zurich (crowd-sourced; last-resort source)](https://www.numbeo.com/property-investment/in/Zurich)
- [Zurich International School: Fees 2026/27](https://www.zis.ch/how-to-apply/fees)
- [Verordnung über den Normalarbeitsvertrag für Arbeitnehmer in der Hauswirtschaft (NAV Hauswirtschaft), SR 221.215.329.4, as of 1 January 2026](https://www.fedlex.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/2010/724/20260101/de/html/fedlex-data-admin-ch-eli-cc-2010-724-20260101-de-html.html)
- [ImmoStreet.ch: Haus mieten, Zürich (listing sample)](https://www.immostreet.ch/de/mieten/haus/zuerich) — ImmoStreet.ch (other)
- [Eidgenössische Volksabstimmung vom 30. November 2025: Resultate (OGD, Bundesamt für Statistik / opendata.swiss)](https://ogd-static.voteinfo-app.ch/v1/ogd/sd-t-17-02-20251130-eidgAbstimmung.json) — Swiss Federal Statistical Office (BFS) (government)
- [PwC Worldwide Tax Summaries: Inheritance and gift tax rates (quick chart; Switzerland spouse exempt)](https://taxsummaries.pwc.com/quick-charts/inheritance-and-gift-tax-rates)

## Change log
- 2026-10-15: initial research.
- 2026-10-15: added duration_note to the lump-sum regime (no statutory limit; ends on naturalisation, Swiss gainful activity or cantonal abolition); recorded the official result of the 30 November 2025 vote on the JUSO inheritance-tax initiative (rejected, 21.7% yes, all cantons); added Zurich prime rent (ImmoStreet sample, CHF 6,435/month).
- 2026-10-15: Holding structures section: no structure modelled (private capital gains already untaxed).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
- 2026-10-16: added surviving-spouse treatment.
- 2026-10-16: national lump-sum representative corrected from CHF 459,200 to CHF 445,000 (Vaud base is 7x rent + 10%, not +15%; federal part CHF 115,000, DBG art. 14 para. 4); Vaud inheritance note updated for the LMSD art. 36 halving.
