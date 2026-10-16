# Switzerland (cantons) — family-office tax dossier

Last reviewed: 2026-10-16
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

All 26 cantons. Tax figures are for the cantonal capital (plus notes for Wollerau/Freienbach SZ, Lugano TI and Baar ZG), married couple with 3 children, no church membership, tax year 2026, computed with the official ESTV tax calculator. The national file represents the City of Zurich, so the ZH unit only overrides the lump-sum regime. Private capital gains on securities are exempt everywhere; capital_gains is overridden per canton only because real estate gains tax differs.

| Canton | Town | Top dividend/income rate | Top wealth-tax rate | Wealth tax on CHF 10M | Children inheritance | Real estate gain (CHF 1M, 10 yrs) | Lump sum (CHF 1M base) |
|---|---|---|---|---|---|---|---|
| ZH | Zürich | 39.3% | 0.642% | 54,973 | exempt | 31% | no |
| BE | Bern | 40.8% | 0.564% | 56,437 | exempt | 28% | CHF 387,200 |
| LU | Luzern | 27.7% | 0.217% | 21,750 | low | 16% | CHF 317,600 |
| UR | Altdorf UR | 25.4% | 0.195% | 19,500 | exempt | 22% | CHF 291,700 |
| SZ | Schwyz | 23.4% | 0.171% | 17,100 | exempt (no tax at all) | 22% | CHF 268,075 |
| OW | Sarnen | 24.3% | 0.142% | 14,220 | exempt | 14% | CHF 256,400 |
| NW | Stans | 25.1% | 0.124% | 12,400 | exempt | 23% | CHF 275,400 |
| GL | Glarus | 32.0% | 0.362% | 36,210 | exempt | 24% | CHF 391,800 |
| ZG | Zug | 21.9% | 0.221% | 21,258 | exempt | 10% | CHF 258,029 |
| FR | Fribourg | 35.3% | 0.522% | 52,200 | exempt | 22% | CHF 372,700 |
| SO | Solothurn | 34.2% | 0.281% | 28,080 | low | 20% | CHF 397,200 |
| BS | Basel | 39.8% | 0.790% | 76,520 | exempt | 40% | no |
| BL | Liestal | 42.2% | 0.545% | 53,774 | exempt | 25% | no |
| SH | Schaffhausen | 27.2% | 0.366% | 36,570 | exempt | 18% | no |
| AR | Herisau | 30.7% | 0.407% | 40,608 | exempt | 30% | no |
| AI | Appenzell | 23.7% | 0.228% | 22,800 | low | 31% | CHF 281,400 |
| SG | St. Gallen | 32.1% | 0.413% | 41,310 | exempt | n/a | CHF 403,400 |
| GR | Chur | 31.3% | 0.306% | 30,600 | exempt | n/a | CHF 307,000 |
| AG | Aarau | 33.4% | 0.318% | 31,393 | exempt | 22% | CHF 373,400 |
| TG | Frauenfeld | 31.6% | 0.276% | 27,610 | exempt | 32% | CHF 302,300 |
| TI | Bellinzona | 38.5% | 0.483% | 48,250 | exempt | 11% | CHF 398,723 |
| VD | Lausanne | 41.5% | 0.792% | 77,632 | taxed (halved for foreign non-workers) | 14% | CHF 445,000 |
| VS | Sion | 36.5% | 0.630% | 63,000 | exempt | 23% | CHF 378,700 |
| NE | Neuchâtel | 37.7% | 0.680% | 68,040 | low | 23% | CHF 395,300 |
| GE | Genève | 43.2% | 0.858% | 81,000 | exempt (taxed 2-6% if lump-sum) | 10% | CHF 411,329 |
| JU | Delémont | 39.0% | 0.570% | 55,040 | exempt | 27% | CHF 391,300 |

Lowest overall burden on a dividend-paying portfolio: Wollerau/Freienbach (SZ: 19.3% top rate, 0.10% wealth tax), Zug
(21.9%, 0.22%), Nidwalden and Obwalden. Highest: Geneva, Vaud, Basel-Stadt (but see their burden caps).

## Residence and eligibility

Federal rules apply (see CHE.md). Cantons decide on discretionary permits for non-EU nationals under AIG art. 30
para. 1 let. b and on lump-sum taxation. Tax domicile is the commune of residence on 31 December.

## Capital gains

Private gains on securities are exempt in every canton (DBG art. 16 para. 3 and the harmonised cantonal laws; ESTV Steuermäppchen). Each
canton's `capital_gains` override differs only in `real_estate_local`, an approximate effective cantonal/communal real
estate gains tax for a CHF 1,000,000 gain on a property held exactly 10 full years and not owner-occupied, computed
from the ESTV Steuermäppchen 2025 tariff table (Grundstückgewinnsteuer). SG and GR are left null because the combined
cantonal/communal multiplier could not be confirmed.

- BE: 28.0% — Simple tax up to 8.10% times canton+commune multiplier (2.975+1.54); gain reduced 2% per year from year 5 (max 70%).
- LU: 16.0% — Income-tax tariff on the gain alone (simple tax up to ~5.8%) times canton+commune units (1.45+1.45); 1% reduction per year above 8 years (max 25%).
- UR: 22.0% — Holding-period tariff: 31% (<1 yr) falling to 11% (>20 yrs); 22% at 10 years; CHF 10,000 allowance.
- SZ: 22.0% — Tariff up to 30%; 25% reduction after 10 full years (70% after 25).
- OW: 14.0% — Simple tax 2% times canton+commune units (3.25+3.86); no long-holding reduction.
- NW: 23.0% — Holding-period tariff: 36% (<1 yr) falling to 12% (>30 yrs); 23% at 10 years.
- GL: 24.0% — Tariff up to 30%; 20% reduction after 10 full years (90% after 30).
- ZG: 10.0% — Rate equals the annualised gain/cost percentage, minimum 10%, maximum 60%; reductions from 12 years. 10% applies if the property roughly doubled over 10 years; faster appreciation raises the rate.
- FR: 22.0% — Holding-period tariff 22% (<2 yrs) to 10% (>15 yrs), 14% at 10 years, plus communal additional centimes of 60 centimes per franc.
- SO: 20.0% — Single-person income tariff on the gain alone (10.5% simple rate above CHF 310,000) times canton+commune multiplier (1.04+1.12); 2% reduction per year after 5 years (max 50%).
- BS: 40.5% — 60% for 0-5 years, reduced 3.9 points per begun year from year 6; 40.5% at 10 years; 12% from 25 years. Owner-occupied homes: 30% falling to 12%.
- BL: 25.0% — Rate rises with the gain to 25% from CHF 120,000; no long-holding reduction except for owner-occupied homes.
- SH: 18.0% — Simple tax 15% (uniform above CHF 100,000) times canton+commune multiplier (0.76+0.83); 25% reduction after 10 years (max 60%); cap 50%.
- AR: 30.0% — 30% of the gain; 2.5% reduction per year after 10 full years (max 50%).
- AI: 31.0% — Tariff up to 40%; 20% reduction after 10 full years (50% after 20).
- SG: n/a — Simple tax up to 10% on gains above CHF 600,000 with a cantonal surcharge of 220% and communal share; reductions after 15 years. The combined multiplier could not be confirmed, so no effective rate is given.
- GR: n/a — Cantonal tariff up to 25% (15% uniform above CHF 208,299) with 1.5% reduction per year after 10 years; communes also levy the tax. The combined burden could not be confirmed, so no effective rate is given.
- AG: 22.0% — Holding-period tariff 40% (1st year) falling to 5% (from 25 years); 22% up to the 10th full year.
- TG: 32.0% — 40% of the gain, reduced 4% per year from year 6 (max 72%).
- TI: 11.0% — Holding-period tariff 31% (<1 yr) falling to 4% (30+ yrs); 11% for 10-11 years.
- VD: 14.0% — Holding-period tariff 30% (<1 yr) falling to 7% (24+ yrs); 14% for 10-11 years; years of owner-occupation count double.
- VS: 23.0% — 12% / 18% / 24% by gain size (24% above CHF 100,000); surcharges in first 5 years; reductions only after 25 years.
- NE: 23.0% — Tariff up to 40% (33% on gains of CHF 135,000+), reduced 6% per year from year 6 (60% after 14 years); 30% reduction at 10 full years.
- GE: 10.0% — Holding-period tariff: 50% (<2 yrs), 40%, 30%, 20%, 15% (8-10 yrs), 10% (10-25 yrs), 2% from 25 years.
- JU: 27.0% — Simple tax 3.5-6% times canton+commune units (2.85+1.90); reduction 1% per year after 10 years (max 50%).

## Dividends

`headline_rate` = `domestic_rate` = `foreign_gross_rate` per canton is the ESTV calculator marginal rate at CHF 5M
taxable income (married, 3 children, no church tax) in the cantonal capital; it includes 11.5% federal tax. Partial
taxation for 10%+ holdings (cantonal share taxed, ESTV Steuermäppchen 2025): ZH, BE, UR, SZ, OW, NW, ZG, AI, GR, AG 50%;
LU, BL, SH, AR, TG, VS, NE 60%; GL, FR, SO, SG, TI, VD, GE, JU 70%; BS 80%; federal 70%.

Re-derived from the statutes on 2026-10-16 (GE, VD, TI, SZ): Schwyz 23.3875% = 11.5% + canton 5% x 110% (StG SZ para. 36a) + district and commune 3.65% x 175% (para. 36), exact above CHF 433,500 of taxable income (rate set at income / 1.9; Wollerau 19.34%); Ticino 38.52% = 11.5% + 14% x 193% (top category rate 14% for 2026, LT art. 309h; Bellinzona 93%); Vaud 41.5% = 11.5% + the 30% ceiling of LICom art. 8 (the barème would give about 35% at the margin); Geneva 43.2106% = 11.5% + 18% x (1.485 x 0.88 + 0.4549), the 0.02-point difference from the ESTV figure (43.23%) being unexplained. Geneva's and Ticino's scales are progressive below the top band, so the flat rate overstates the tax on a CHF 2M income by CHF 53,913 and CHF 10,602.

## Inheritance and gifts to children

Children are fully exempt from inheritance and gift tax in ZH, BE, UR, NW, GL, ZG, FR, BS, BL, SH, AR, SG, GR, AG,
TG, TI, VS, GE and JU; SZ and OW have no inheritance or gift tax at all (ESTV Steuermäppchen 2025; ESTV calculator
2026 confirms 0 for children in each capital). Exceptions:

- **Luzern**: No cantonal tax for descendants, but communes may levy a descendants' inheritance tax (Nachkommenerbschaftssteuer) on shares above CHF 100,000: basic rate max 1% plus the cantonal surcharge (up to +100% above CHF 500,000), i.e. up to 2% of the whole share. The City of Lucerne levies it: 1.6% on CHF 200,000, 2.0% from CHF 600,000. No gift tax in Lucerne. Gifts: No gift tax in canton Lucerne (gifts within 5 years before death are added to the estate for the communal descendants' tax).
- **Solothurn**: Descendants are exempt from the inheritance tax, but Solothurn levies an estate duty (Nachlasstaxe) on the whole net estate regardless of heirs: 0.8% up to CHF 500,000, rising to 1.2% of the whole estate above CHF 2M. Gifts to children are exempt. Gifts: Gifts to descendants are exempt from gift tax.
- **Appenzell Innerrhoden**: Appenzell Innerrhoden taxes inheritances and gifts to children at a flat 1% on the amount above CHF 300,000 per child. Gifts: Same 1% rate and CHF 300,000 allowance for gifts.
- **Vaud**: Vaud taxes inheritances to children. Since 2025 each stirp deducts CHF 1,000,000, falling by 1/100 per CHF 1,000 above it and gone at CHF 1.1M. The cantonal rate for the direct line is the general barème of art. 34 LMSD (3.426% at CHF 1.1M, 3.5% on the whole share from CHF 1,302,000), and Lausanne adds 'fr. 1.00 par franc de l'Etat' (arrêté d'imposition 2025-2029, chiffre VI), so 7% in all. **The tax is halved** for the estate of a foreigner who never exercised gainful activity in Switzerland, for the part wholly taxable in Vaud (LMSD art. 36; verified 2026-10-16, no restriction to other heirs than descendants in the text), so a child inheriting more than CHF 1.3M pays about 3.5% of the whole share for this family. Gifts: exempt up to CHF 300,000 per child per calendar year; above that the whole gift is taxed on the same barème (also halved for a foreign donor).
- **Neuchâtel**: Neuchâtel taxes inheritances to children at a flat 3% after a CHF 50,000 deduction per child; gifts to children are taxed at 3% on the whole amount once they exceed CHF 10,000. Gifts: 3% on the whole gift if it exceeds CHF 10,000 (no CHF 50,000 deduction).

Vaud encoding: the deduction phase-out between CHF 1,000,000 and CHF 1,100,000 is represented by a steep marginal slice
(37.686%, after the halving of LMSD art. 36) so that the bracket totals reproduce the barème (CHF 37,686 = 3.426% x 1.1M at 1.1M, the ESTV calculator's CHF 75,372 before the halving); a second slice to CHF 1,302,000 (3.90%) and 3.5% above. Lucerne uses `bracket_mode: whole_amount` (proportional rate on the whole share above the CHF 100,000
threshold). Solothurn's Nachlasstaxe is on the whole estate (`basis: estate`).

Geneva lump-sum regime override: children are taxed 2%-6% if the deceased/donor was lump-sum taxed in any of the last
three final assessments (LDS; ESTV Steuermäppchen).

**Surviving spouse:** the spouse (and registered partner) is exempt from cantonal inheritance and gift tax in every canton with an inheritance override, and SZ and OW levy no such tax at all (ESTV Steuermäppchen 2025). Two exceptions: Solothurn's Nachlasstaxe falls on the whole estate whatever the heirs (StG §§ 217-222; about 1.2% for a large estate, so `taxed_low`), and Geneva's spouse exemption is lost, like the children's, when the deceased was lump-sum taxed in any of the last three assessments (2%-6%, `taxed_low` in the `lump_sum` override). Neuchâtel exempts a registered partner only after two years; Zürich carries no inheritance override.

## Wealth tax

Each canton's `wealth_tax` component lists combined cantonal + communal marginal rates on taxable wealth in the capital,
derived from the ESTV calculator (2026) by evaluating the tax at each tariff breakpoint of the official cantonal scale
(piecewise-linear; totals at breakpoints match the calculator; low-end bands of some cantons with thresholds are
approximations). GE, VD, TI and SZ were re-derived from the 2026 statute scales on 2026-10-16 and reproduce the earlier figures (CHF 81,000 / 77,632 / 48,250 / 17,100 on CHF 10M taxable): Geneva's rates are the 2026 barème (LIPP art. 59 paras. 1-2, RCEPF art. 18) x (1 + 0.485 + 0.4549) plus the supplementary tax without centimes, Vaud's the 2026 tariff (LI art. 59) x 233.5%, Ticino's LT art. 49 x 193% and Schwyz's 0.6 per mille x 285%.
`thresholds_indexed` is true where the law adjusts the wealth tariff or deductions to prices: Geneva (LIPP art. 67) and Vaud (LI art. 60); false for Ticino (LT art. 39 indexes income only) and Schwyz (StG SZ para. 49 does not cover para. 47). `exempt_amount` = social deductions for a married couple with 3 children from the ESTV deduction data
(e.g. ZG CHF 714,000, TG CHF 500,000, SZ CHF 340,000; ZH, VD, NE, FR build the tax-free amount into the tariff).

Burden caps (ESTV Steuermäppchen "Belastungsobergrenze"); GE, VD and TI are in `income_cap`, the others not modelled:

- **Bern**: Cap (Steuerbremse): if wealth tax exceeds 25% of the gross wealth yield, it is reduced to that amount, but not below 2.4 per mille (0.24%) of taxable wealth. For a low-yield portfolio (e.g. 2% yield) this lowers the effective wealth tax from about 0.56-0.61% to about 0.5%; at a 1% yield to 0.25%.
- **Luzern**: Caps: total wealth tax (canton, commune, church) may not exceed 3 per mille of taxable wealth (not binding at the 2026 rate of about 2.2 per mille), and total income tax may not exceed 22.4% (married tariff) of taxable income.
- **Basel-Stadt**: Cap: if wealth tax plus income tax on the wealth yield exceed 50% of that yield, wealth tax is reduced on request, but a minimum wealth tax of 5 per mille (0.5%) of taxable wealth is always due. For low-yield portfolios the effective wealth tax can therefore fall from 0.79% to about 0.5%.
- **Aargau**: Cap: on request, cantonal/communal/church income and wealth taxes are reduced to 70% of net income, but the wealth tax can at most be halved.
- **Vaud**: Caps (bouclier fiscal, LICom art. 8, verified in the Feuille cantonale 2026): cantonal+communal income tax max 30% of income (this cap is built into the dividend rate: 11.5% + 30% = 41.5%) and wealth tax max 10 per mille; income+wealth tax together max 60% of net income, with the net wealth yield counted at least 1% (LA 2026 art. 7); wealth tax never below 3 per mille (0.3%) after the cap. For a large low-yield portfolio the 60% cap can reduce the wealth tax towards the 0.3% floor. On 27 September 2026 Vaud voters accepted the '12%' initiative (a 12% cut of the cantonal coefficient, from the 2027 tax year), so the 2022 version of the bouclier fiscal stays (the 2024 revision was tied to its rejection by a 'clause guillotine'); on 6 October 2026 the Grand Conseil majority asked the Conseil d'Etat to revive the 2024 changes (76 to 57), and the left announced a referendum.
- **Ticino**: Cap (freno, LT art. 49a): on request, cantonal and communal income and wealth taxes are reduced to 60% of total taxable income; the net wealth yield counts at least 1% of net wealth and total taxable income at least 1% of net wealth; the relief is taken off the wealth tax and shared between canton and commune.
- **Valais**: Cap: if cantonal/communal taxes on wealth and on the net wealth yield exceed 20% of taxable income, a reduction applies (difference to 50% of the net yield, less a CHF 10,000 franchise); at least half of the wealth tax remains due in all cases.
- **Geneva**: Cap (bouclier fiscal, LIPP art. 60, verified): income + wealth taxes (cantonal and communal, including additional centimes; federal tax excluded) may not exceed 60% of net taxable income; the net wealth yield is deemed to be at least 1% of net wealth; any reduction is applied to wealth tax only, with no floor in the text. For a large portfolio yielding ~1-2% this cap typically binds and cuts the effective wealth tax well below the 0.86% top rate.

The Geneva, Vaud and Ticino caps are modelled with `wealth_tax.income_cap` (2026-10-16): share of income 60%, max_reduction 1 (no floor in the text), 1% minimum income yield (GE LIPP art. 60, VD LICom art. 8 para. 3 with LA 2026 art. 7, TI LT art. 49a), Vaud's 3 per mille floor as `min_wealth_tax_rate`, and `counted_income_tax_rate` = the cantonal and communal share of the top marginal rate (GE 31.71%, VD 30%, TI 27.02%; federal tax is not counted). The flat counted rate overstates the true average rate at CHF 600,000 of income (24%, 24-27%, 25%); the recipes show the cap binding for the family's real case (CHF 600,000 of dividends: law 333,880 on CHF 30M of wealth in GE and VD, CHF 50M in TI).

## Special regimes

Lump-sum taxation (Besteuerung nach dem Aufwand). Not available: ZH, SH, AR, BS; BL only transitionally on arrival
(treated as unavailable). Estimates computed with the ESTV calculator (2026, ordinary tariffs on the base; federal tax
at CHF 435,000 for the minimum case and CHF 1M for the realistic case; deemed wealth per cantonal rule):

| Canton | Cantonal minimum base used (CHF) | Deemed wealth at minimum (CHF) | Total tax at minimum (CHF) | Total tax at CHF 1M base (CHF) |
|---|---|---|---|---|
| BE | 400,000 | 0 | 138,916 | 387,184 |
| LU | 646,700 | 12,934,000 | 170,279 | 317,643 |
| UR | 434,700 | 8,694,000 | 118,779 | 291,661 |
| SZ | 600,000 | 12,000,000 | 128,560 | 267,285 |
| SZ:Wollerau | 600,000 | 12,000,000 | 96,260 | 213,451 |
| OW | 400,000 | 4,000,000 | 98,521 | 256,411 |
| NW | 400,000 | 8,000,000 | 106,085 | 275,375 |
| GL | 434,700 | 8,694,000 | 151,718 | 391,827 |
| ZG | 500,000 | 10,000,000 | 110,569 | 258,029 |
| FR | 250,000 | 1,000,000 | 97,608 | 372,691 |
| SO | 400,000 | 8,000,000 | 150,341 | 397,175 |
| AI | 400,000 | 8,000,000 | 108,521 | 281,411 |
| SG | 600,000 | 12,000,000 | 215,163 | 403,401 |
| GR | 434,700 | 0 | 118,143 | 306,989 |
| AG | 400,000 | 8,000,000 | 134,348 | 373,428 |
| TI | 434,700 | 2,173,500 | 154,856 | 397,907 |
| TI:Lugano | 434,700 | 2,173,500 | 145,470 | 374,388 |
| VD | 415,000 | 0 | 138,380 | 459,211 |
| VS | 250,000 | 1,000,000 | 95,881 | 378,741 |
| NE | 400,000 | 1,600,000 | 151,996 | 395,326 |
| GE | 467,713 | 0 | 149,155 | 410,742 |
| JU | 200,000 | 800,000 | 82,134 | 391,302 |
| TG | 400,000 | 0 | 109,215 | 302,265 |

Notes: GE base includes the +10% wealth surcharge (425,194 x 1.1); VD minimum CHF 415,000 already includes its 15%
wealth surcharge and the CHF 1M case uses 1.15M; TG has no fixed minimum but a minimum cantonal+communal tax of CHF
150,000 (so the minimum case is CHF 150,000 + federal); BE and GR estimates exclude wealth tax (BE taxes only Bernese
real estate; GR's capitalisation rule was not quantified). The JSON `lump_sum.annual` uses the CHF 1M-base estimate
(about 7x the rent of a CHF 12,000/month family home), which is more realistic for this family than the minimum.

Corrections of 2026-10-16 for GE, VD, TI and SZ (derived from the statutes, not the ESTV calculator): (1) the federal share of the lump sum is CHF 115,000 on a CHF 1M base, not 115,000: DBG art. 14 para. 4 withholds the CHF 263 per-child reduction of art. 36 para. 2bis from lump-sum taxpayers (the 'Total tax at minimum' column above still carries the CHF 789 reduction). (2) Geneva: the cantonal base is the expenditure plus 10% for the wealth tax (LIPP art. 14 para. 4), the 2026 minimum expenditure is CHF 426,357 (RCEPF art. 4; CHF 468,993 with the 10%), total CHF 411,329 on a CHF 1M expenditure. (3) Vaud: 7x the rent is increased by 10% (LI art. 15 para. 3 b), not 15% (the 15% is inside the CHF 415,000 minimum), so a CHF 1M rent multiple gives a CHF 1.1M base, taxed at the 30% ceiling of LICom art. 8: CHF 330,000 + 115,000 = CHF 445,000. (4) Ticino: CHF 259,597.55 income tax (14% top category rate for 2026, art. 309h LT) + CHF 24,125 on a deemed CHF 5M of wealth (5 x the base, art. 13 para. 5) + federal 115,000 = CHF 398,722.55. (5) Schwyz: the canton tariff (5%, para. 36a) and the district and commune tariff (3.65%, para. 36) differ, CHF 118,875 of income tax + CHF 34,200 on a deemed CHF 20M of wealth + federal 115,000 = CHF 268,075; the minimum base is CHF 600,000 (para. 15a, indexed every three years, para. 49). The same federal rule corrected the Zug figure from CHF 257,239.69 to CHF 258,028.69 (recipe CH-ZG and the ZG unit); the national lump-sum representative (Vaud) is now CHF 445,000.

## Company taxation (kept separate from personal tax)

Not overridden per canton (schema has no subnational corporate field). ESTV calculator, CHF 1M profit, 2026: Zurich
19.5%, Bern ~20.2% (incl. church tax levied on companies), Geneva 14.7%, Vaud ~14.0%, Ticino ~16.0%, Basel ~13.0%, Schwyz ~13.3%, Lucerne ~11.7%, Zug 11.7%.

## Cost of living notes

Price per m² (Numbeo, city-centre apartments, last-resort source): Zug 25,647; Zurich 22,808; Geneva 18,217; Lucerne
17,703; Lausanne 15,139; Basel 15,002; Lugano 12,914. School fees 2026/27 (upper secondary, day): ISZL 39,700 (Zug, SZ,
LU), Ecolint 36,540 (GE), Brillantmont 38,000 (VD), TASIS 55,000 (TI), ISB 38,000 (BS). Health insurance and
housekeepers not sourced per canton.

Prime family rents (added 2026-10-15; median monthly asking rent of large houses on one listing portal per canton,
small samples, see the JSON descriptions for the filters and ranges):

- CH-LU Luzern: CHF 4,700/month (ImmoStreet.ch, 15 October 2026)
- CH-SZ Schwyz: CHF 5,890/month (ImmoStreet.ch, 15 October 2026)
- CH-ZG Zug: CHF 6,500/month (ImmoStreet.ch, 15 October 2026)
- CH-BS Basel-Stadt: CHF 6,300/month (ImmoStreet.ch, 15 October 2026)
- CH-TI Ticino: CHF 4,300/month (ImmoStreet.ch, Lugano flats of 5+ rooms, 15 October 2026)
- CH-VD Vaud: CHF 9,800/month (immobilier.ch, 15 October 2026)
- CH-GE Geneva: CHF 7,200/month (immobilier.ch, detached houses excluding Cologny and estate-size homes, 15 October 2026)
- CH-ZH (national file): CHF 6,435/month (ImmoStreet.ch, city of Zurich).

## Open questions

- Burden caps (BE, BS, AG, VS) are not modelled in the brackets; for low-yield portfolios they lower the
  effective wealth tax materially. GE, VD and TI are modelled with income_cap (see Wealth tax).
- Real estate gains tax effective rates are approximations for one scenario; SG and GR left null.
- Cantonal lump-sum minimums are from the ESTV 2025 tables; cantons that index to the federal minimum (UR, GL, GR, TI
  listed CHF 434,700) probably use CHF 435,000 in 2026 (not checked).
- Vaud: the halving of the inheritance tax for non-working foreigners (LMSD art. 36) was verified on 2026-10-16 and applies to all heirs in the text; a motion (25_MOT_65) asks to remove it for lump-sum taxpayers, outcome not found. The 12% cut of the cantonal coefficient from 2027 and the bouclier fiscal revision (Grand Conseil motion of 6 October 2026) are not in the tax file.
- Ticino: the top category rate of the income tax falls 0.5 point a year from 14.0% (2026) to 13.5%, 13.0%, 12.5% and a 12% effective maximum from 2030 (LT art. 309g-h); the tax file holds 2026. Lugano's 2026 multiplier (about 80%, coordinated 81%) was not confirmed, so Bellinzona (93%) is kept.
- GE, VD, TI, SZ: the engine charges a flat top marginal rate on dividends; Geneva's and Ticino's scales are progressive (differences CHF 53,913 and CHF 10,602 on CHF 2M of dividends, recipes CH-GE and CH-TI).
- Lucerne: only the City of Lucerne's communal descendants' tax was checked; other communes may not levy it.
- Church tax excluded throughout; members of a recognised church pay roughly 1-3 points more on income.

## Sources

- [ESTV Steuermäppchen 2025: Besteuerung nach dem Aufwand (lump-sum taxation bases by canton)](https://www.estv2.admin.ch/stp/sm/aufwand-de-fr.pdf)
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
- [Steuergesetz des Kantons Schwyz (SRSZ 172.200), Stand 1. Februar 2026](https://www.sz.ch/public/upload/assets/29694/172_200.pdf?fp=13)
- [Kantonsblatt Schwyz (ESTV, Stand Februar 2026)](https://www.estv2.admin.ch/stp/kb/sz-de.pdf) and [Steuerfusstabelle 2026 Schwyz](https://www.sz.ch/public/upload/assets/90947/Steuerfusstabelle_2026.pdf?fp=4)
- [Feuille cantonale Genève (ESTV, 2026)](https://www.estv2.admin.ch/stp/kb/ge-fr.pdf); [LIPP, D 3 08](https://silgeneve.ch/legis/data/rsg_D3_08.htm); [ArCA-2026, D 3 05.30](https://silgeneve.ch/legis/data/rsg_D3_05p30.htm); [LDS, D 3 25](https://silgeneve.ch/legis/data/rsg_D3_25.htm)
- [Feuille cantonale Vaud (ESTV, 2026)](https://www.estv2.admin.ch/stp/kb/vd-fr.pdf); [Tableau des déductions 2026 (ACI Vaud)](https://www.vd.ch/fileadmin/user_upload/organisation/dfin/aci/fichiers_pdf/Tableau_des_d%C3%A9ductions_2026.pdf); [Arrêté d'imposition de Lausanne 2025-2029](https://www.lausanne.ch/apps/actualites/Next/serve.php?id=14899); [LMSD barème général](https://www.vd.ch/fileadmin/user_upload/organisation/dfin/aci/fichiers_pdf/Bareme_general_2005.pdf); [art. 36 LMSD](https://www.vd.ch/etat-droit-finances/impots/impots-pour-les-individus/les-impots-les-differents-types-dimpots/autres-impots/successions-et-donations/la-loi/articles-de-la-loi-commentes/article-36-lmsd)
- [RTS: Bouclier fiscal vaudois, la réforme divise droite et gauche (2026)](https://www.rts.ch/info/regions/vaud/2026/article/bouclier-fiscal-vaudois-la-reforme-divise-droite-et-gauche-29377018.html); [Berney Associés: initiative « 12% » (août 2026)](https://berneyassocies.com/wp-content/uploads/2026/09/Initiative-populaire_12.pdf)
- [Foglio cantonale Ticino (ESTV, 2026)](https://www.estv2.admin.ch/stp/kb/ti-it.pdf); [Legge tributaria (LT, 640.100), stato 1.1.2026](https://m3.ti.ch/CAN/RLeggi/public/index.php/raccolta-leggi/pdfatto/atto/12885); [Moltiplicatore comunale coordinato 2026](https://www4.ti.ch/fileadmin/DI/DI_DI/SEL/Comuni/Perequazione/FU-MCC2026.pdf)
- [Numbeo: Property prices in Lucerne (crowd-sourced; last-resort source)](https://www.numbeo.com/property-investment/in/Lucerne)
- [International School of Zug and Luzern (ISZL): Fees 2026-27](https://www.iszl.ch/admissions/fees)
- [Numbeo: Property prices in Zug (crowd-sourced; last-resort source)](https://www.numbeo.com/property-investment/in/Zug)
- [Numbeo: Property prices in Basel (crowd-sourced; last-resort source)](https://www.numbeo.com/property-investment/in/Basel)
- [International School Basel: Fees 2026/27](https://www.isbasel.ch/join/fees)
- [Numbeo: Property prices in Lugano (crowd-sourced; last-resort source)](https://www.numbeo.com/property-investment/in/Lugano)
- [TASIS The American School in Switzerland: Tuition and fees 2026-2027](https://www.tasis.ch/admissions/tuition-and-fees)
- [Numbeo: Property prices in Lausanne (crowd-sourced; last-resort source)](https://www.numbeo.com/property-investment/in/Lausanne)
- [Brillantmont International School (Lausanne): Fees 2026-2027](https://www.brillantmont.ch/admissions/fees)
- [Numbeo: Property prices in Geneva (crowd-sourced; last-resort source)](https://www.numbeo.com/property-investment/in/Geneva)
- [International School of Geneva (Ecolint): Tuition fees 2026-2027](https://www.ecolint.ch/en/tuition-fees)
- [ImmoStreet.ch: Haus mieten, Kanton Luzern (listing sample)](https://www.immostreet.ch/de/mieten/haus/kanton-luzern) — ImmoStreet.ch (other)
- [ImmoStreet.ch: Haus mieten, Kanton Schwyz (listing sample)](https://www.immostreet.ch/de/mieten/haus/kanton-schwyz) — ImmoStreet.ch (other)
- [ImmoStreet.ch: Haus mieten, Kanton Zug (listing sample)](https://www.immostreet.ch/de/mieten/haus/kanton-zug) — ImmoStreet.ch (other)
- [ImmoStreet.ch: Haus mieten, Kanton Basel-Stadt (listing sample)](https://www.immostreet.ch/de/mieten/haus/kanton-basel-stadt) — ImmoStreet.ch (other)
- [ImmoStreet.ch: Haus mieten, Lugano (listing sample)](https://www.immostreet.ch/de/mieten/haus/lugano) — ImmoStreet.ch (other)
- [ImmoStreet.ch: Wohnung & Haus mieten, Lugano (listing sample)](https://www.immostreet.ch/de/mieten/wohnung_und_haus/in-lugano) — ImmoStreet.ch (other)
- [immobilier.ch: houses to rent, canton of Vaud (listing sample)](https://www.immobilier.ch/en/rent/house/vaud) — immobilier.ch (other)
- [immobilier.ch: houses to rent, canton of Geneva (listing sample)](https://www.immobilier.ch/en/rent/house/geneva) — immobilier.ch (other)
- [Solothurn Steuergesetz (BGS 614.11), Nachlasstaxe §§ 217-222](https://bgs.so.ch/app/de/texts_of_law/614.11)
- [RSI: La giungla delle imposte sulle successioni (Ticino spouse exemption, Legge tributaria art. 154)](https://www.rsi.ch/info/dialogo/La-giungla-delle-imposte-sulle-successioni--3266972.html)

## Change log
- 2026-10-15: initial research.
- 2026-10-15: added prime_rent_monthly for ZG, GE, VD, TI, SZ, BS and LU from listing-portal samples (ImmoStreet.ch, immobilier.ch) of 15 October 2026.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept (CH-LU).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept (CH-SZ).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept (CH-ZG).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept (CH-BS).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept (CH-VD).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: changed from CHF 9,500 to CHF 4,300 for CH-TI (Lugano villas of 300-600 m² to 5-7.5 room flats of 150-251 m²).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: changed from CHF 9,000 to CHF 7,200 for CH-GE (Cologny and 350-600 m² estate houses excluded).
- 2026-10-16: added surviving-spouse treatment.
- 2026-10-16: re-derived GE, VD, TI and SZ from the statutes (recipes CH-GE, CH-VD, CH-TI, CH-SZ): dividend rates (SZ 23.3875%, GE 43.2106%), exact wealth-tax brackets for GE, VD and TI (VD with the CHF 120,000 cliff, TI with the CHF 200,000 cliff), `thresholds_indexed` (GE and VD true), `indexed_to_inflation` on the four lump sums, lump-sum amounts (GE 411,329.19, VD 445,000, TI 398,722.55, SZ 268,075; federal part 115,000 per DBG art. 14 para. 4), Vaud inheritance halved (LMSD art. 36), Vaud 2026-10 developments (12% initiative, bouclier fiscal).
- 2026-10-16: income_cap added for GE, VD and TI (bouclier fiscal / freno) with an annual check each where the cap binds; ZG lump sum corrected to CHF 258,028.69 (no federal child reduction, DBG art. 14 para. 4).
