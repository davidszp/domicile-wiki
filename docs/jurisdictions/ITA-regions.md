# Italy (regions) — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

All 20 Italian regions are listed in `data/subnational/ITA.json` with ISO 3166-2 region codes. None of them has `regime_overrides`. The taxes that matter to the family are national and identical in every region: the 26% substitute tax on capital gains and dividends, the flat-tax regime for new residents, IVAFE/IVIE on foreign assets, and inheritance and gift tax. The national rules are in `ITA.json`, which another agent maintains.

The only regional tax lever on individuals is the regional IRPEF surcharge (addizionale regionale), plus the municipal surcharge. Both are charged on the progressive IRPEF base (reddito complessivo), so they do not touch investment income taxed under the 26% substitute tax.

## Residence and eligibility

These rules are national. Regional residence only decides which addizionale rates apply to ordinary income.

## Capital gains

These rules are national: the 26% imposta sostitutiva applies in every region. Regions have no power over it, so the JSON has no overrides.

## Dividends

These rules are national: 26% applies to the dividends of a private investor. The regional and municipal surcharges do not apply to this income. Under art. 50 D.Lgs. 446/1997, the addizionale regionale is calculated on the income that makes up the IRPF base. Income taxed by a final withholding or by a substitute tax is outside that base.

## Inheritance and gifts to children

These rules are national. There are no regional inheritance taxes.

## Wealth tax

These rules are national: IVAFE and IVIE. There is no regional wealth tax. IRAP is a regional tax on productive activities, and it falls on businesses, not on private wealth.

## Special regimes

These are national: the flat tax for new residents and the impatriate regime. No region changes them.

## Company taxation (kept separate from personal tax)

Corporate tax (IRES) is national. IRAP is regional, with a base rate of 3.9% (not re-verified here) that regions can vary within limits. Regional IRAP rates were not researched.

## Cost of living notes

Method for rent and price per m²: a snapshot of LuxuryEstate.com taken on 2026-10-15. Rent = median asking rent of distinct listings with 4-6 bedrooms priced per month or with no period stated (duplicates removed). Price per m² = median asking price per m² over the first five sale result pages (EUR 500,000+, 80 m²+, offices and land excluded). These are luxury-portal asking prices, not agency-report or transaction figures, and Italian listings often do not state whether a let is long-term, so furnished short lets can inflate the rent. Health insurance and housekeeper costs were not sourced.

- **Lombardia (Milan):** rent EUR 8,250 a month (12 listings; interquartile range EUR 5,533-15,000); price EUR 9,175/m² (53). School: International School of Milan, Grade 12/13, 2026-27, EUR 26,950, plus a EUR 900 annual registration fee and, for Grades 10-13, a one-off EUR 3,600 admission fee (school's official fee PDF).
  - Lake Como (note only, not scored): Como-province villa listings on 2026-10-15 ranged from EUR 4,000 a month (inland and smaller lakeside villas) to EUR 24,000-90,000 a month for Cernobbio/Tremezzina lakefront villas, which are mostly seasonal lets.
- **Lazio (Rome):** rent EUR 10,000 a month (18; interquartile range EUR 5,500-13,875); price EUR 6,208/m² (66). School: St. George's British International School, Years 12-13 (IB Diploma), 2026-27, EUR 27,000 paid by parents, lunch included, plus a one-off EUR 4,000 registration fee and EUR 350 a year re-enrolment.
- **Toscana (Florence):** rent EUR 12,000 a month (13; interquartile range EUR 8,000-20,000; several centre flats at EUR 20,000 are evidently furnished short lets, so a year-round family let is probably nearer EUR 8,000); price EUR 7,344/m² (60). School: International School of Florence, IB Diploma (Grades 11-12), 2026-27, EUR 26,420 standard rate (corporate EUR 30,370), plus a one-off EUR 7,800 entrance fee and a EUR 500 application fee. The fee page that refused access before now loads.
- **Liguria (Genoa / Tigullio coast):** the family would most likely live in Portofino, Santa Margherita Ligure or Rapallo. Rent EUR 15,000 a month (7 listings, almost all villas in Santa Margherita and Rapallo, EUR 2,500-20,000; small and probably dominated by summer lets; Genoa city had no 4+ bedroom listings); price EUR 9,092/m² (48, Santa Margherita Ligure). School: International School in Genoa, Grades 11-12, EUR 19,069. Its English and Italian fee pages were re-checked on 2026-10-15: both still carry the 2023-24 secondary table under a 2026-27 heading, and no 2025/26 or 2026/27 table exists, so the fee is kept with year 2023.

## Open questions

- The per-region addizionale regionale rates for 2026 were not tabulated. They affect only ordinary income.
- Normattiva shows the TUIR (DPR 917/1986) repealed by D.Lgs. 19 June 2026 n. 117 from 1 January 2027, as part of a recodification. This is for the national file to assess. Tax year 2026 is unaffected.
- Rents are luxury-portal asking-rent medians from small samples (7-18 listings); Florence and Liguria are probably inflated by short or seasonal lets. An agency report (e.g. Knight Frank, Engel & Völkers) would be a better source.
- The International School in Genoa fee (2023-24 table) is probably out of date.
- No health insurance or housekeeper figures for any city.

## Sources

- D.Lgs. 446/1997, art. 50 (addizionale regionale all'IRPEF, testo vigente) — https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:1997-12-15;446~art50
- International School of Milan, Annual school fees 2026-2027 — https://www.internationalschoolofmilan.it/sites/school103/files/2026-01/ISMilan_School_Fees_2026_2027.pdf
- St. George's British International School Rome, Fees — https://www.stgeorge.school.it/admissions/fees
- International School in Genoa, Fees — https://www.isgenoa.it/admissions/fees
- International School of Florence, Tuition & Fees 2026-2027 — https://www.isfitaly.org/tuition-fees/
- LuxuryEstate.com rental listings: Milan — https://www.luxuryestate.com/rent/italy/lombardy/milan/milan ; Rome — https://www.luxuryestate.com/rent/italy/latium/rome/rome ; Florence — https://www.luxuryestate.com/rent/italy/tuscany/florence/florence ; Liguria — https://www.luxuryestate.com/rent/italy/liguria
- LuxuryEstate.com sale listings: Milan — https://www.luxuryestate.com/italy/lombardy/milan/milan ; Rome — https://www.luxuryestate.com/italy/latium/rome/rome ; Florence — https://www.luxuryestate.com/italy/tuscany/florence/florence ; Santa Margherita Ligure — https://www.luxuryestate.com/italy/liguria/province-of-genoa/santa-margherita-ligure

## Change log
- 2026-10-15: initial research.
- 2026-10-15 (data-quality pass): added prime rent and price per m² for Milan, Rome, Florence and the Ligurian Tigullio coast from LuxuryEstate.com listing samples; added the International School of Florence 2026-27 fee (EUR 26,420); re-checked the Genoa school (no newer fee table, kept); added a Lake Como note under Lombardia.
