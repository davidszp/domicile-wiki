# San Marino — family-office tax dossier

Last reviewed: 2026-10-16
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary
These are the 2026 rules under the IGR reform (Law 12 November 2025 n.141):
- Gains on securities are taxed at a flat 10%.
- Domestic dividends bear a 5% final withholding.
- Foreign dividends can, by option, be taxed at 3% of the amount after foreign WHT.
- Residents of more than ten continuous years who are not under a special regime pay IRAFE, 0.2% a year on financial assets held abroad above EUR 20,000. There is no other wealth tax.
- Succession tax applies only to San Marino-situs assets and is a fixed EUR 100 per child. This comes from a low-confidence source.

San Marino is not in the EU, so every arrival needs a permit. An "atypical residence" regime (art. 16-ter Law 118/2010) taxes foreign income at 7% of the amount net of foreign tax, with a minimum of EUR 10,000 and a maximum of EUR 100,000 a year, for up to 15 years, and exempts the holder from IRAFE. It is not a fixed lump sum.

## Residence and eligibility
A person is resident if, for most of the tax period, they have registered residence, a dwelling or their centre of vital interests in San Marino (Toccaceli Bronzetti, Dec 2025). Permits come through elective residence (EUR 500,000 property or a 10-year government bond deposit, EUR 10,000 fee), entrepreneur residence (51% of a company employing local staff), or atypical residence. All need Congress of State approval and are subject to annual quotas. These details come from IMI Daily (Oct 2024) and were not verified against the statute.

## Capital gains
Art. 41 of Law 166/2013 (text from Decreto Delegato 213/2014) covers disposals of shares, participations, financial instruments and businesses. Real estate is covered only if held 5 years or less; the main home and inherited property are exempt. Art. 13(1)(b) and 13(2)(b), as replaced by art. 4 of Law 141/2025 (from tax period 2026), set a separate 10% tax. Through a San Marino intermediary the 10% is withheld as a final tax on 31 December. For foreign-source gains the taxpayer may opt for progressive IGR instead. Losses offset gains only within the same year.

JSON: 0.10 for securities and business sales, and 0 for real estate held more than 5 years.

Secondary sources that call individuals' gains on shares held 12+ months exempt are describing the corporate participation exemption. Pre-2026 return forms show a 2% substitute tax on financial instruments, but the pre-2026 regime was not fully traced.

## Dividends
Domestic dividends bear a 5% final WHT for individuals, resident or not (art. 103(6) Law 166/2013; Tayros 2025). Foreign dividends can, by option, be taxed at 3% on the "netto frontiera", meaning the amount after source tax (art. 13(1)(g), (2)(e) and (3) as replaced in 2026; text of Law 141/2025 art. 4 read 2026-10-16). There is no credit under that option. Otherwise they enter progressive IGR (9%–35%, 35% above EUR 80,000) with a credit.

JSON: domestic 0.05, foreign_gross 0.03, foreign_tax_credit "deduction" (changed 2026-10-16 from "none": the 3% is charged on the dividend net of the foreign tax, which is what "deduction" means in the engine; "none" would charge 3% of the gross). For a US dividend: no treaty, so 30% US WHT plus 2.1% here.

## Inheritance and gifts to children
Law 84/1981 taxes transfers on death of assets located in San Marino (locus rei sitae), whatever the residence or nationality of the deceased or the heirs. Its 1981 tariff, in lire, ran from 1% to 20% for the direct line. The head of the Ufficio Registro e Conservatoria wrote in 2015 that the tax on shares passing to a spouse, direct-line relatives and siblings is a symbolic EUR 100 each, regardless of value. On top of that come 0.10% stamp duty on the net estate and, for real estate, 1% transcription plus 0.40% cadastral transfer tax. The amending act was not found.

Statute read on 2026-10-15: art. 3 of Law 84/1981 taxes San Marino real estate whatever the domicile or nationality of the deceased, and art. 4 exempts movable and immovable assets located outside San Marino and credits not enforceable there. A foreign portfolio passing to the children is therefore outside the tax by statute (art. 4 no. 1 read again on 2026-10-16; the JSON scope is `local_assets_only`); only the EUR 100 figure for San Marino assets still rests on the 2015 article (confidence raised from low to medium).

JSON: beneficiary basis, taxed_low, no brackets, other_transfer_cost_rate 0.001, bracket_mode marginal (unused). A foreign portfolio is outside the scope. The "imposta di cinquina" on real estate left to foreigners (5% in the direct line) has unknown current status. Gift tax is unverified; Studio Allievi (Oct 2025) states there is no gift or inheritance tax.
- Surviving spouse (`spouse_treatment` `taxed_low`): Spouse pays a fixed EUR 100 per heir (Law 84/1981 as reported in 2015) plus small stamp and transfer duties, and foreign assets are outside scope.

## Wealth tax
IRAFE (imposta per il riequilibrio delle attività finanziarie estere), art. 4 of Law 22 December 2021 n.207, as amended by art. 17 of Law 24 June 2022 n.94 (both read 2026-10-16):
- Taxpayer: an individual resident for more than ten continuous years (the original text said five) and not under a special regime on foreign income. The amended text reads "o" (or) between the two conditions; the Ufficio Tributario circular of March 2022 (before the amendment) reads them cumulatively ("e"), and that reading is used. A new arrival therefore pays nothing for ten years, and an atypical resident never pays it.
- Base: market value at 31 December of financial assets held abroad, directly or indirectly: securities, financial instruments and products, and money on accounts and savings books. Excluded: non-financial assets, foreign unlisted shareholdings, shareholder loans, precious metals, banknotes, life/accident/health policies, pension funds, and the first EUR 20,000 of financial assets abroad (the circular Prot. 61702/2022 says the 0.2% is computed on the excess over EUR 20,000).
- Rate: 0.2% (art. 4 para. 4; changeable by delegated decree). No tax if the amount is EUR 10 or less (para. 5-bis). Self-assessed in the DAPEF declaration. The payment deadline for tax year 2023 was 2 October 2024 (circular of 27 May 2024).
- Not verified: that it is still levied for 2026 (no repeal found in Law 141/2025, but the budget laws were not searched line by line); whether the EUR 20,000 is per spouse.

JSON: wealth_tax type "limited", one component on "financial_assets_foreign", exempt amount 20,000, rate 0.002. `thresholds_indexed` false: the EUR 20,000 is fixed in the statute. The engine charges it from year 1; the law starts it in year 11 (open question).

Before 2026-10-16 the file said "None" for wealth tax, on the strength of a firm summary (Studio Allievi) that does not mention IRAFE.

Residents must also declare their financial assets and company holdings held abroad (DAPEF; D.D. 29/2022). Whether there is any recurring property levy was not verified.

## Special regimes
Residenza atipica: art. 16-ter Law 118/2010, as introduced by art. 69 Law 223/2020 (text read 2026-10-16; Ufficio Tributario circular prot. 53134, 27 May 2024, section 3.6).
- Who: a natural person who has never been tax resident in San Marino (or whose residence was not yet consolidated when the article took effect) and who produces income abroad. The spouse and the family members of art. 16 para. 3-bis can be included on request.
- Tax: a substitute tax on income produced abroad of 7% of the "netto frontiera" (art. 13 para. 3 Law 166/2013: income as received net of tax paid at source), at least EUR 10,000 and at most EUR 100,000 for each fiscal year, paid in one instalment with the IGR balance, not deductible from any other tax (para. 2). It covers all foreign income, including gains. San Marino-source income stays in the ordinary regime.
- Duration: 15 years from the first tax period of validity (para. 8). It is revocable, and ends on any missed or partial payment. A revoked or lapsed holder cannot apply again. The revocation extends to family members, but a family member's lapse does not remove the holder.
- Process: application to the Department of Foreign Affairs (EUR 1,000 fee, a purchase or lease contract for a dwelling, certificates from the country of last residence, proof of resources); the Congress of State decides within 60 days and its decision cannot be challenged; at most 100 permits a year, not counting extended family members (para. 13). Until residence is consolidated (ten years from registration) the holder has no access to public-sector employment or residence-linked benefits and must cover health costs privately or through the ISS (paras. 7 and 14).
- IRAFE: not due while under the regime (art. 4 para. 2 Law 207/2021).

JSON: a special regime, 15 years, with foreign gains and foreign dividends at 0.07 and foreign_tax_credit "deduction" (7% of the net amount). The earlier `lump_sum` of EUR 100,000 was removed on 2026-10-16: EUR 100,000 is the cap, not the tax. The EUR 10,000 minimum and EUR 100,000 maximum cannot be written in the tax file (open question). `wealth_tax` is set to "none" for this regime so that it does not inherit IRAFE from the standard regime. Not verified: whether Law 141/2025 changed art. 16-ter, or whether an atypical resident can instead elect the ordinary 3% foreign-dividend option. A pensioner variant (6%, or 3% for former international officials, art. 16-quater) is not relevant here.

## Company taxation (kept separate from personal tax)
IGR on companies is 17%, with a transitional 18% for 2026–2030 (art. 54(6) Law 141/2025). Foreign dividends from qualifying holdings get a 95% participation exemption. There is no VAT; a single-stage import tax applies instead.

## Cost of living notes

City: San Marino (Città di San Marino / Borgo Maggiore).

- **International school (annual, per child):** EUR 21,870 (2026). San Marino has no international school; this is the International School of Bologna (IB Continuum school, about 135 km by road from San Marino, the nearest verified IB school a San Marino family would realistically use), 2026–27 annual tuition for Grades 11–12: EUR 21,870, plus an annual registration fee of EUR 1,000 (Grades 11–12) and a one-off EUR 1,500 admission fee. IB exam fees, books and insurance are included; lunch is extra. Daily commuting from San Marino is not realistic, so in practice this implies boarding/relocation or an Italian or Sammarinese private school instead. Source: [ISB Tuition Fees 2026-2027 (fee schedule embedded in the Tuition Fees page)](https://www-isbologna-com.filesusr.com/html/275586_8c241b6ba964fa209f046da9c44ea3f7.html)

School fee is for the International School of Bologna (Italy), because San Marino has no international school. - **Prime rent (monthly):** EUR 2,150 (2026). Median of the two largest long-term rentals in the Republic on Mioaffitto.it on 2026-10-15: a furnished 220 m² detached villa in Torraccia (Domagnano), 3 double bedrooms, EUR 2,300; and a furnished 260 m² detached villa in Casole (Città), 3 bedrooms on a 1,000 m² plot, EUR 2,000 (its text also says 'in vendita'). 11 San Marino rentals were listed; none had 4–5 bedrooms, and the other large units were 110–168 m² flats at EUR 1,000–1,500. Very thin sample. immobiliare.sm and smimmobiliare.sm do not resolve; Immobiliare.it, Idealista and Casa.it block automated access. Source: [Mioaffitto.it — Case affitto Faetano](https://mioaffitto.it/case-affitto-faetano-111-1-0-77300.html)

## Open questions
- IRAFE: confirm it is still levied for 2026, whether "or" or "and" governs the ten-year and special-regime conditions, and whether the EUR 20,000 is per spouse. The engine charges it from year 1 but the law starts it after ten years of residence.
- Atypical residence: whether the EUR 10,000 minimum is charged on each extended family member, and the EUR 100,000 cap per person. The tax file cannot hold a minimum and a maximum.
- The legal basis and 2026 validity of the EUR 100 direct-line succession tax on San Marino assets (foreign assets
  are exempt under art. 4 of Law 84/1981).
- Gift tax.
- The pre-2026 treatment of securities gains.
- Whether any 2026 decreto delegato changed the rates.
- Residence-by-investment terms.
- The treaty list (no US treaty assumed).
- Prime rent (San Marino or the Rimini hills) not sourced: the main Italian portals (Immobiliare.it, Idealista, Casa.it) blocked automated access on 2026-10-15 and no Sammarinese agency site with long-let listings was found; the school fee (International School of Bologna) is sourced, so only rent is missing.

## Sources
- Legge 12 novembre 2025 n.141, Consiglio Grande e Generale: https://www.consigliograndeegenerale.sm/on-line/home/archivio-leggi-decreti-e-regolamenti/documento17155359.html
- Decreto Delegato 5 dicembre 2014 n.213, Consiglio Grande e Generale: https://www.consigliograndeegenerale.sm/on-line/home/in-evidenza-in-home-page/documento17070806.html
- Legge 29 ottobre 1981 n.84 (succession tax), Consiglio Grande e Generale: https://www.consigliograndeegenerale.sm/on-line/home/archivio-leggi-decreti-e-regolamenti/documento17019790.html
- Raccolta delle principali circolari IGR (prot. 53134/2024), Ufficio Tributario: https://gov.sm/pub2/GovSM/dam/jcr:f3a4343c-3454-498c-805d-d000eac2412d/Raccolta%20delle%20principali%20circolari%20in%20materia%20di%20imposta%20IGRprot.pdf
- Successione ereditaria nel diritto sammarinese (V. Ciavatta, 2015), Dante Alighieri San Marino: https://dantealighierirsm.org/wp-content/uploads/2017/05/2015-6.pdf
- Legge 22 dicembre 2021 n.207 (art. 4, IRAFE), text: https://www.hlbsanmarino.com/wp-content/uploads/2022/01/Legge-nr-207-22-12-21.pdf
- Legge 24 giugno 2022 n.94 (art. 17, amends the IRAFE), Consiglio Grande e Generale: https://www.consigliograndeegenerale.sm/on-line/home/archivio-leggi-decreti-e-regolamenti/documento17133084.html
- Legge 22 dicembre 2020 n.223 (art. 69, atypical residence), text: https://www.osla.sm/sites/default/files/field_files/L223-2020.pdf
- Taxation in San Marino, Studio Toccaceli Bronzetti: https://toccacelibronzetti.sm/en/taxation-in-san-marino/
- San Marino: la tassazione sui dividendi, Tayros: https://tayros.bg/index.php/2025/10/29/san-marino-la-tassazione-sui-dividendi/
- Fiscalità a San Marino, Studio Allievi: https://www.studioallievi.com/fiscalita-a-san-marino/
- 4 Ways to Get Residency in San Marino, IMI Daily: https://www.imidaily.com/europe/4-ways-to-get-residency-in-san-marino-single-digit-tax-in-the-worlds-oldest-republic/
- ISB Tuition Fees 2026-2027 (fee schedule embedded in the Tuition Fees page), International School of Bologna: https://www-isbologna-com.filesusr.com/html/275586_8c241b6ba964fa209f046da9c44ea3f7.html
- Case affitto Faetano (San Marino rentals within 10 km) (Mioaffitto.it, other): https://mioaffitto.it/case-affitto-faetano-111-1-0-77300.html

## Change log
- 2026-10-15: initial research.
- 2026-10-15 (data-quality pass): read Law 84/1981 arts. 3-4 (foreign assets exempt by statute); inheritance confidence low -> medium; cost of living still unsourced (no international school, no rental listings found).
- 2026-10-15 (cost-of-living pass): added the International School of Bologna Grades 11–12 fee (EUR 21,870, 2026–27) as the nearest international school; prime rent still not sourced, so the metric stays unscored.
- 2026-10-15 (household cost pass): added prime rent EUR 2,150/month (median of two 3-bedroom villas on Mioaffitto.it; no 4–5 bedroom long-let listed, thin sample); with the Bologna school fee the metric can now be scored.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
- 2026-10-16: added surviving-spouse treatment.
- 2026-10-16 (recipe pass): added IRAFE (0.2% on financial assets abroad above EUR 20,000, after ten years of residence, not for atypical residents) as the standard regime's wealth tax, from art. 4 Law 207/2021, art. 17 Law 94/2022 and the 2024 Ufficio Tributario circular; read art. 16-ter Law 118/2010 in Law 223/2020 art. 69 and removed the EUR 100,000 lump sum (it is the cap of a 7% tax with a EUR 10,000 minimum), set foreign dividends to "deduction" (3% and 7% are charged on the net-of-source-tax amount), gave the atypical regime its own wealth_tax none, and scored succession tax as local_assets_only (Law 84/1981 art. 4 no. 1).
