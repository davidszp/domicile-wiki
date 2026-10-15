# Italy — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Ordinary residents pay:

- 26% substitute tax on capital gains and on dividends. Foreign dividends are taxed on the amount after foreign
  withholding tax, with no credit.
- IVAFE of 0.2% a year on foreign financial assets.
- IVIE of 1.06% on foreign real estate.

Inheritance and gifts to each child are tax-free up to EUR 1 million, then a flat 4%.

New residents can choose the Art. 24-bis TUIR lump sum instead. For moves from 2026 it is EUR 300,000 a year, plus
EUR 50,000 per family member, for up to 15 years.

This file covers the national level only. Regional and municipal rules are in a separate regions file.

## Residence and eligibility

- D.Lgs. 209/2023: a person is resident if, for more than 183 days (fractions of days count), they have physical
  presence, a habitual abode or a domicile (centre of personal and family relationships) in Italy. Registration in
  the population register creates a rebuttable presumption of residence (PwC).
- EU citizens move freely.
- Non-EU citizens can use the elective residence visa or the investor visa (thresholds not verified).

## Capital gains

- 26% substitute tax on gains from financial assets, qualified holdings included (PwC).
- Crypto gains are taxed at 33% from 2026.
- Real estate is exempt after 5 years, or if it was the principal residence for most of the holding period.
- Government bonds are taxed at 12.5% (general knowledge, unverified).
- JSON: 0.26 for all securities and private business; 0 for real estate held more than 5 years.

## Dividends

- 26% substitute tax, which PwC confirms only as a "flat tax".
- Foreign dividends: the 26% is charged on the amount after foreign withholding tax, with no credit (general
  knowledge). With a 15% withholding tax the total burden is 37.1%.
- JSON: 0.26 domestic and foreign, foreign_tax_credit none.

## Inheritance and gifts to children

D.Lgs. 346/1990, as amended by D.Lgs. 139/2024 (PwC):

- Children: 4% above EUR 1 million per beneficiary. Gifts are taxed the same way.
- Self-assessment applies from 2025.
- Worldwide assets are taxed if the deceased was resident in Italy.
- Italian real estate also pays a 2% mortgage tax and a 1% cadastral tax (general knowledge).
- Family business exemption: control must be held for 5 years (general knowledge).
- JSON: beneficiary basis, exemption 1,000,000, a single 4% bracket, children_treatment taxed_low.

## Wealth tax

Recorded as limited (PwC):

- IVAFE: 0.2% on foreign financial assets. The rate is 0.4% in privileged-tax states; Switzerland is excluded from
  the higher rate from 2024. Bank accounts pay EUR 34.20 each.
- IVIE: 1.06% on foreign real estate, with a credit for foreign property tax. Not due below EUR 200.
- Italian-custodied securities pay a 0.2% stamp duty (general knowledge).
- IMU, the municipal property tax, is a property tax and is not counted as wealth tax.

## Special regimes

- **Art. 24-bis TUIR** (text as amended by L. 199/2025, read on Brocardi.it 2026-10-15):
  - Art. 24-bis(2): EUR 300,000 per tax period, whatever the foreign income, for those transferring residence from
    1 Jan 2026 (EUR 200,000 for transfers from 11 Aug 2024, EUR 100,000 before). Each included family member pays
    EUR 50,000, so a family of five pays EUR 500,000 a year.
  - Covers foreign income and gains, IVAFE, IVIE and foreign asset reporting. Gains on qualified holdings sold in the
    first 5 tax periods are excluded.
  - Art. 24-bis(1): not Italian resident in at least 9 of the 10 previous tax periods.
  - Art. 24-bis(3): exercised after a favourable ruling (interpello) from the Agenzia delle Entrate, requested by the
    return deadline for the year of transfer.
  - Art. 24-bis(4): revocable; ceases 15 years after the first tax period of validity.
  - Inheritance and gifts: art. 1(158) L. 232/2016 limits inheritance and gift tax, for successions opened and gifts
    made while the option is valid, to "beni e diritti esistenti nello Stato". Read via a Notariato study summary
    (Edotto), not on Normattiva. Applies where the opting person (or an included family member) is the deceased or
    donor; assets in states excluded from the option stay taxable. Inheritance raised to high, partially_verified.
- **New TUIR from 2027 (not scored):** D.Lgs. 19 June 2026 n. 117 (G.U. n. 132 of 3 July 2026, S.O. 26) replaces DPR
  917/1986 from 1 Jan 2027 and repeals its arts. 1-191. Commentators describe a consolidation that carries the old
  provisions over unchanged except for coordination, with no new taxes or rates. The new article number for the flat
  tax, and whether the 26% substitute tax (D.Lgs. 461/1997) and IVAFE/IVIE (DL 201/2011) are absorbed into the new
  text, were not confirmed. Recorded in `important_exceptions`; 2026 law is scored.

## Holding structures

### Family holding company S.r.l. (`holding_srl`, structure)

An Italian S.r.l. holds the directly held shares. It is scored because it gives the largest advantage among the
Italian options: about EUR 260,000 a year against about EUR 520,000 personally on the app profile, payout included.
The 1.2% only holds for a buy-and-hold share book in a company that passes the non-operating company test (below).
Re-verified against the statute texts on 2026-10-15.

- **Participation exemption after the 2026 round trip:** the 2026 Budget Law (L. 199/2025, art. 1 c. 51-55) limited
  both the 95% dividend exclusion (art. 89 TUIR, new c. 2.1) and the PEX (art. 87 TUIR, new c. 1.1) to a direct stake
  of at least 5% or a tax value of at least EUR 500,000 (Andersen). Art. 11 of DL 27 March 2026 n. 38 ("Ripristino
  regime esclusione dividendi e regime PEX", read on Normattiva) abrogates art. 87 c. 1.1 and art. 89 c. 2.1, restores
  "per il 95 per cento" in art. 89 c. 2, restores the 1.2% withholding on EU/EEA company shareholders, and repeals
  art. 1 c. 51-55 L. 199/2025 (c. 4); c. 5: "si applicano a decorrere dal 1° gennaio 2026". Converted by L. 22 May 2026
  n. 88 (G.U. n. 117 of 22 May 2026); Normattiva marks commi 51-55 of L. 199/2025 as abrogated by DL 38/2026. So there
  is no minimum stake for 2026.
- **PEX conditions (art. 87 TUIR, text updated 26/09/2026 on Brocardi):** (a) uninterrupted holding from the first day
  of the twelfth month before the sale; (b) classification as financial fixed assets (immobilizzazioni finanziarie) in
  the first balance sheet closed during the holding period; (c) issuer not resident in a privileged-tax state, required
  since the first holding period (c. 2); (d) a commercial activity, which under c. 4 "non rileva" for companies listed
  on regulated markets. **Does it work for an actively managed portfolio?** Only for the part kept as a long-term
  book: positions booked as current assets or sold within 12 months are fully taxable at 24%; losses on PEX shares are
  not deductible; fund/ETF units are not shareholdings and get no PEX (general knowledge). The scored 1.2% assumes the
  "held longer than any holding period" case the app scores.
- **Non-operating company (società di comodo, art. 30 L. 724/1994, version in force 20/12/2025-31/12/2026 read on
  Normattiva):** presumed revenue is 1% of the value of securities and shareholdings (c. 1 lett. a, "anche se ...
  costituiscono immobilizzazioni finanziarie"), plus receivables, compared with the three-year average of revenues and
  ordinary income items (c. 2). The coefficients were halved from 2% (test) and 1.5% (minimum income) by art. 20
  D.Lgs. 192/2024 from tax year 2024 (Studio Pizzano). A company that fails declares at least 0.75% of the securities'
  value (c. 3 lett. a) and pays IRES with the 10.5-point surcharge (art. 2 c. 36-quinquies DL 138/2011) on its whole
  taxable income: 34.5% (Edotto, written when IRES was 27.5%, giving 38%). The exclusion in c. 1 n. 4 covers listed
  companies, their subsidiaries and companies that **control** a listed company; a holder of small listed stakes is not
  excluded. On EUR 30m: presumed revenue EUR 300,000; a 1.5-2% dividend yield (EUR 450,000-600,000) passes, a
  low-dividend growth portfolio might not. Whether PEX gains count as revenue was not confirmed. If it fails: 1.725% on
  dividends and gains, and a floor of about EUR 225,000 taxable income (about EUR 78,000 IRES) a year. A disapplication
  ruling (c. 4-bis) needs objective circumstances. The systematic-loss rule was repealed from 2022.
- **IRAP:** a company whose shareholdings exceed 50% of assets is a non-financial holding (art. 162-bis TUIR) and computes
  IRAP under art. 6 c. 9 D.Lgs. 446/1997 (production value plus interest income, 96% of interest expense), at increased
  regional rates (about 4.65-5.57% in 2022). Dividends and share gains are in section C of the income statement and are
  excluded, so a static share holding usually has a nil IRAP base (Euroconference News). Bond interest is included.
- **Gains:** JSON listed `0.012`, private business `0.012`, local real estate `0.279` (24% IRES + 3.9% IRAP; no 5-year
  exemption for companies). Bonds, funds/ETFs and shares sold within 12 months pay the full 24% (IRAP possibly on
  interest), so the scored rate is for the direct-share part of the portfolio. Confidence medium, verification verified
  (statute texts read), because the comodo revenue test and the fixed-asset booking of a rebalanced book carry risk.
- **Dividends:** 95% excluded, so 1.2%; dividends from privileged-tax states fully taxable. The foreign tax credit is
  limited to the Italian tax on the taxable 5%, so source withholding is mostly a final cost. JSON `0.012`, `none`.
- **Wealth tax:** IVAFE (0.2%) is charged on individuals, not on companies. Securities with Italian intermediaries bear
  0.2% stamp duty on statements of financial products, capped at EUR 14,000 a year for clients other than individuals
  (Agenzia delle Entrate, Ris. 84/E 2014; art. 13 c. 2-ter Tariffa DPR 642/1972). Modelled as 0.2% on the first EUR 7m
  of the portfolio.
- **Payout:** 26% final withholding on dividends to individuals (`0.26`).
- **Inheritance:** unchanged. The children inherit the shares at 4% above EUR 1m each. The art. 3 c. 4-ter exemption
  for controlling stakes might apply if control passes as a block; not modelled. Inherits the standard regime.
- **Comparison:** with 1.2% inside the company and 26% on payout, the holding beats personal holding while profits stay
  inside; for a family distributing everything it saves little on dividends (1.2% + 26% x 98.8% = 26.9% vs 26%). It is an
  alternative to, not a combination with, the art. 24-bis lump sum. Contributing appreciated securities is taxable for
  the individual at 26%.
- **From 2027:** D.Lgs. 117/2026 (new TUIR) repeals arts. 87, 89 TUIR and art. 30 L. 724/1994 as of 1 January 2027 and
  re-enacts them in the new code (renumbering, not scored).
- **Costs:** EUR 10,000 a year and EUR 3,000 setup (estimates).
- **Exit:** no exit tax for individuals. On liquidation, the surplus is taxed at 26%.

## Company taxation (kept separate from personal tax)

- IRES 24%, plus IRAP 3.9% (regions vary it by up to 0.92 points).
- A reduced 20% IRES applied in FY2025 to reinvested profits.
- Pillar Two applies.

## Cost of living notes

Milan.

- School: American School of Milan, Grades 11-12 EUR 24,300 a year at the private rate (2026-27, IB exam fees
  included), plus EUR 1,350 annual enrolment, EUR 5,000 one-time new-student fee and EUR 2,500 building fund.
- Prime rent: not sourced. immobiliare.it, idealista.it, casa.it and wikicasa.it block automated access. The open
  portals sampled (Gabetti, Tecnocasa, realtor.com international) had too few whole-home 4-5 bedroom listings or were
  dominated by room lets. Without rent the cost metric stays unscored.
- Purchase price, health insurance and housekeeper costs are not sourced.

## Open questions

- Read art. 1(158) L. 232/2016 and Circular 17/E/2017 directly (24-bis text itself now read).
- New TUIR (D.Lgs. 117/2026, from 2027): new article numbers and placement of the 26% substitute tax and IVAFE/IVIE.
- Confirm the foreign dividend rule and the 12.5% bond rate.
- Visa thresholds.
- Milan prime rent, purchase price, health insurance and housekeeper costs.
- `holding_srl`: whether PEX gains count as revenue in the non-operating company test; Agenzia practice on fixed-asset booking of a rebalanced minority portfolio; ETF units outside PEX (general knowledge); conversion-law changes to art. 11 DL 38/2026.

## Sources

- PwC, Italy taxes on personal income: https://taxsummaries.pwc.com/italy/individual/taxes-on-personal-income
- PwC, Italy other taxes: https://taxsummaries.pwc.com/italy/individual/other-taxes
- PwC, Italy income determination: https://taxsummaries.pwc.com/italy/individual/income-determination
- PwC, Italy residence: https://taxsummaries.pwc.com/italy/individual/residence
- PwC, Italy corporate taxes on income: https://taxsummaries.pwc.com/italy/corporate/taxes-on-corporate-income
- Brocardi.it, Art. 24-bis TUIR: https://www.brocardi.it/testo-unico-imposte-redditi/titolo-i/capo-i/art24bis.html
- Edotto, Benefici tributari per i neo residenti (Notariato study, art. 1 c. 158 L. 232/2016): https://edotto.com/articolo/benefici-tributari-per-i-neo-residenti-con-elevato-patrimonio-in-uno-studio-del-notariato
- Euroconference News, In Gazzetta il nuovo TUIR, in vigore dal 1 gennaio 2027: https://www.ecnews.it/lavoro/imposte-contributi-e-premi/tassazione-e-redditi-di-lavoro/in-gazzetta-il-nuovo-tuir-in-vigore-dal-1-gennaio-2027/
- American School of Milan, Tuition and Fees 2026-27: https://www.asmilan.org/admissions/tuition-and-fees/
- LuxuryEstate.com - Luxury properties for rent in Milan (LuxuryEstate.com): https://www.luxuryestate.com/rent/italy/lombardy/milan/milan
- [Approfondimento D.L. 27 marzo 2026 n. 38: ripristino regime dividendi e PEX](https://it.andersen.com/wp-content/uploads/2026/04/2026.04.02_Andersen-Italia-Approfondimento_D.L.-27-marzo-2026-n.38.pdf) — Andersen Italia (professional)
- [Participation Exemption 2026: il decreto fiscale ripristina il regime PEX](https://fiscomania.com/ripristinata-pex/) — Fiscomania (other)
- [Risoluzione n. 84/E del 16 settembre 2014 (imposta di bollo su comunicazioni relative a prodotti finanziari)](https://agenziaentrate.gov.it/portale/documents/20143/303732/Risoluzione+84E+del+16+settembre+2014_RIS+84e+del+16+09+14.pdf/e2373152-d447-28cc-86e7-2a809e677fc7) — Agenzia delle Entrate (tax_authority)
- Normattiva, D.L. 27 marzo 2026, n. 38, art. 11 (Ripristino regime esclusione dividendi e regime PEX): https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legge:2026-03-27;38~art11
- Normattiva, L. 30 dicembre 2025, n. 199, art. 1 commi 51-55 (abrogated): https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2025-12-30;199~art1-com51
- Brocardi.it, Art. 87 TUIR (plusvalenze esenti): https://www.brocardi.it/testo-unico-imposte-redditi/titolo-ii/capo-ii/sezione-i/art87.html
- Normattiva, L. 23 dicembre 1994, n. 724, art. 30 (società non operative), in force 2026: https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:1994-12-23;724~art30!vig=2026-10-15
- Studio Pizzano, Società di comodo: nuovi coefficienti di calcolo dal 2024: https://www.studiopizzano.it/societa-di-comodo-nuovi-coefficienti-di-calcolo-dal-2024/
- Edotto, Penalizzazioni per le società di comodo: https://edotto.com/articolo/penalizzazioni-per-le-societa-di-comodo
- Euroconference News, Irap più gravosa per le holding industriali: https://www.ecnews.it/fiscale/fisco-e-patrimonio/reddito-impresa-e-irap/irap-piu-gravosa-per-le-holding-industriali/

## Change log
- 2026-10-15: initial research.
- 2026-10-15 (data-quality pass): verified art. 24-bis text (EUR 300,000 / EUR 50,000, 9-of-10 years, interpello, 15 years); inheritance relief under art. 1(158) L. 232/2016 confirmed via Notariato summary (high, partially_verified); recorded the new TUIR (D.Lgs. 117/2026, from 2027) as announced-not-scored; added American School of Milan fee (EUR 24,300). Milan rent not sourced.
- 2026-10-15: added the Milan prime rent (EUR 8,250/month, LuxuryEstate.com) from the Lombardy regional file so the national cost metric can be scored.
- 2026-10-15: inheritance scope set to local assets only for flat_tax_24bis in the structured data (art. 1(158) L. 232/2016: only assets existing in Italy are taxed while the option is valid); previously the scoring applied the 4% to the worldwide estate.
- 2026-10-15: added structure regime `holding_srl` (S.r.l. with 95% dividend exclusion and PEX, 1.2%; DL 38/2026 repealed the 2026 Budget Law 5%/EUR 500,000 thresholds retroactively; stamp duty capped at EUR 14,000; 26% on payouts) and a Holding structures section.
- 2026-10-15: re-verified `holding_srl` against statute texts: art. 11 DL 38/2026 (conv. L. 88/2026) repeals the L. 199/2025 5%/EUR 500,000 thresholds from 1 Jan 2026 (read on Normattiva); art. 87 TUIR conditions read; added the non-operating company test (art. 30 L. 724/1994: 1% presumed revenue, 0.75% minimum income, IRES 34.5%; no exclusion for minority holders of listed shares) and IRAP for holdings (dividends and share gains outside the base). Rates unchanged at 1.2% but now explicitly conditional; verification raised to verified, confidence kept medium.
