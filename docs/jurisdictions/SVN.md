# Slovenia — family-office tax dossier

Last reviewed: 2026-10-16
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Personal Income Tax Act (ZDoh-2). Capital income (interest, dividends, capital gains) is taxed separately
from other income as a final tax at 25% (Art. 132). Capital gains get holding-period reductions to 0% after 15 years.
Children are fully exempt from inheritance and gift tax (ZDDD Art. 9). No wealth tax. No special regime for
wealthy arrivals.

## Residence and eligibility

Resident with a registered permanent residence, a habitual abode, a centre of personal and economic interests, or
more than 183 days of presence in the tax year (PwC). EU citizens: free movement and registration. US/other: a
temporary residence permit for a purpose (employment, business, family). No investor-visa route was found (not verified).

## Capital gains

- Rate (Art. 132 ZDoh-2, FURS guide of 4 Aug 2026): 25% for 0–5 years of holding, 20% after 5, 15% after 10, and
  exempt after 15 years (20 years until 31 Dec 2021). Applies to securities, company shares, fund units and real
  estate, domestic or foreign.
- Main home exempt if owned, registered as permanent residence and lived in for the last 3 years (Art. 96).
- FIFO per identical security (Art. 103). Losses only offset gains of the same year. 30-day wash-sale rule.
- Gift of capital = disposal for the donor. For gifts to a spouse or child, the gain can be deferred to the
  child's later sale (notify within 15 days). Inheritance is not a disposal.
- INR (individual investment account, ZINR, from 5 Mar 2026): 15% only on withdrawal, first withdrawal after 15
  years exempt. Contribution cap is EUR 20,000 in year one, then EUR 5,000/yr (+5,000 for Slovenian
  instruments), EUR 150,000 lifetime. Immaterial at family-office scale.
- JSON: all long-term rates 0.0 (held >15 years); `headline_rate = 0.25`. A rebalanced portfolio will in practice
  pay 25% on most realised gains.
- Professional trading carried on as a business activity is taxed as business income at progressive rates.
- No individual exit tax is described in the FURS guide (open question).

## Dividends

Flat 25% final tax on domestic and foreign dividends (Arts 91, 132). Foreign withholding tax is credited. JSON:
`domestic_rate = foreign_gross_rate = 0.25`, credit. Outbound WHT: 15% standard to non-residents (PwC), 0% to
qualifying EU parents. 59 treaties in force, including the US.

## Inheritance and gifts to children

ZDDD (Uradni list RS 117/2006). The tax is on the recipient. Under Art. 9, the first inheritance order is fully
exempt for both inheritances and gifts: children, adopted children and their descendants, spouse, unmarried
partner, plus sons/daughters-in-law and stepchildren (FURS; Uradni list 2016). Others (Art. 8) pay 5–14% (parents,
siblings), 8–17% (grandparents) or 12–39%. Movables-only transfers below EUR 5,000 are not taxed. JSON:
`fully_exempt`, no brackets, gifts same as inheritance.
- Surviving spouse (`spouse_treatment` `fully_exempt`): Spouse and unmarried partner are exempt as first-order heirs (ZDDD Art. 9, FURS).

## Wealth tax

None. Municipal building-land use charge (NUSZ) on real estate. JSON: `type = none`. Status of any national real
property tax proposal not verified.

## Special regimes

None relevant. INR is a small retail account, not a regime.

Structure regime `holding_doo` (family d.o.o.), added 2026-10-16 for the 60-year projection: gains 22%, dividends 1.1% effective
(22% x 5%), payout to the family 25% (Art. 132 ZDoh-2), wealth tax and inheritance inherited from the standard regime. Not
a special regime for arrivals: any resident can found a d.o.o. Private foundation and trust were considered and not added: Slovenian
law reportedly allows private foundations only for public-benefit purposes and does not regulate a family foundation (University of Ljubljana
thesis abstract, 2018; not checked against the Ustanove Act).

## Company taxation (kept separate from personal tax)

CIT 22% for 2024-2028 (Art. 64 ZORZFS; general rate 19%) (FURS). Dividends received are excluded from the tax base
(Art. 24 ZDDPO-2) but 5% of them counts as a non-deductible expense, so the effective rate is 1.1%; there is no minimum
holding, the payer must be subject to a comparable profit tax, and non-EU payers resident in countries with a profit tax
below 12.5% on the Ministry of Finance list are excluded (PwC). Gains on shares: 50% exempt only for stakes of at least 8%
held 6 months where the company employs at least one person (FURS guide, section 5.1). A portfolio company with listed minority
stakes therefore pays 22% on every realised gain. Foreign withholding on an excluded dividend is not credited (FURS 0920-13147/2022-3).

## Cost of living notes

Ljubljana.

- School: British International School of Ljubljana, Sixth Form (Years 12-13) EUR 19,300 a year (2025-26, from the
  school's own fee schedule); Years 10-11 EUR 18,300. The 2026-27 schedule was not found.
- Prime rent: EUR 3,750 a month = median of the 3 houses of 250 m2 or more listed for rent in Ljubljana on Bolha.com on
  2026-10-15 (EUR 3,000, 3,750 and 4,950). All 5 Ljubljana house listings: EUR 2,900-4,950, median EUR 3,000. Very
  small sample; nepremicnine.net blocked automated access.
- Purchase price, health insurance and housekeeper costs are not sourced.

## Open questions

- ZIURS (adopted 11 May 2026) cut rental income tax from 25% to 15% (5% for some long-term lets) retroactive to
  2026. Its referendum status was reported as contested in Aug 2026 (not verified). No capital gains or dividend
  changes were found.
- 2026 press headlines mentioned a proposal for capital gains at 30% for 5 years and 0 after 20 years, reportedly
  dropped. Not verified; not in force.
- No exit tax confirmed against the full ZDoh-2 text.
- Real property tax proposals: status not verified.
- Rent rests on 3-5 listings; BISL 2026-27 fees not found.
- Structure `holding_doo`: ZDDPO-2 statute text could not be read (PisRS); article numbers rest on the FURS guide and PwC. Treatment of foreign withholding on excluded dividends, ETF dividends, contributions in kind and liquidation proceeds not researched.

## Sources

- Dohodek iz kapitala (income from capital) overview: https://www.fu.gov.si/davki_in_druge_dajatve/podrocja/dohodnina/dohodnina_dohodek_iz_kapitala/
- Obresti, dividende, dobiček iz kapitala in dohodek z INR (detailed guide, version of 4 Aug 2026): https://www.fu.gov.si/fileadmin/Internet/Davki_in_druge_dajatve/Podrocja/Dohodnina/Dohodek_iz_kapitala/Opis/Obresti_dividende_in_dobicek_iz_kapitala.doc
- Dobiček iz kapitala – pravilo navidezne odsvojitve kapitala: https://www.fu.gov.si/fileadmin/Internet/Davki_in_druge_dajatve/Podrocja/Dohodnina/Dohodek_iz_kapitala/Opis/Dobicek_iz_kapitala_-_pravilo_navidezne_odsvojitve_kapitala.docx
- Slovenia – Individual – Income determination: https://taxsummaries.pwc.com/slovenia/individual/income-determination
- Slovenia – Corporate – Withholding taxes: https://taxsummaries.pwc.com/slovenia/corporate/withholding-taxes
- Slovenia – Individual – Significant developments: https://taxsummaries.pwc.com/slovenia/individual/significant-developments
- Življenjski dogodki: Dedoval sem (I have inherited): https://www.fu.gov.si/zivljenjski_dogodki_prebivalci/dedoval_sem/
- Davek na dediščine in darila (inheritance and gift tax): https://www.fu.gov.si/davki_in_druge_dajatve/podrocja/davek_na_dediscine_in_darila
- Kdaj in v katerih primerih ste kot dedič upravičeni do davčne oprostitve?: https://www.uradni-list.si/novice/pogled/kdaj-in-v-katerih-primerih-ste-kot-dedic-upraviceni-do-davcne-oprostitve
- Zakon o davku na dediščine in darila (ZDDD), consolidated text (Arts 1–8): https://www.racunovodstvo.net/zakonodaja/zddd
- Davčne novice – Junij 2026 (ZIURS): https://www.forvismazars.com/si/sl/vpogledi/newsletters/davcne-novice/davcne-novice-junij-2026
- Odprtih že 10.000 individualnih naložbenih računov (INR): https://www.gov.si/novice/2026-05-26-odprtih-ze-10-000-individualnih-nalozbenih-racunov-inr/
- EY Slovenia Tax News, May 2025 (Act on Individual Investment Accounts, ZINR): https://www.ey.com/en_si/technical/ey-slovenia-tax-alerts/tax-news-may-2025
- Slovenia – Individual – Residence: https://taxsummaries.pwc.com/slovenia/individual/residence
- Slovenia – Corporate – Taxes on corporate income: https://taxsummaries.pwc.com/slovenia/corporate/taxes-on-corporate-income
- Bolha.com, oddaja hiš Osrednjeslovenska: https://www.bolha.com/oddaja-hise/osrednjeslovenska
- BISL, Schedule of Fees and Charges AY 2025-26: https://dazzling-seal.files.svdcdn.com/production/images/Schedule-of-Fees-and-Charges-AY25-26-FIN.pdf?dm=1747424681
- Splosno o DDPO (FURS guide to corporate income tax: rate, sections 4.0 and 5.1): https://www.fu.gov.si/fileadmin/Internet/Davki_in_druge_dajatve/Podrocja/Davek_od_dohodkov_pravnih_oseb/Opis/Splosno_o_DDPO.doc
- Davek od dohodkov pravnih oseb (DDPO) (22% for 2024-2028, Art. 64 ZORZFS): https://www.fu.gov.si/davki_in_druge_dajatve/podrocja/davek_od_dohodkov_pravnih_oseb_ddpo
- Pojasnilo FURS 0920-13147/2022-3: Izvzem dividend po 24. clenu ZDDPO-2, ki so bile obdavcene na viru: https://www.fu.gov.si/fileadmin/Internet/Davki_in_druge_dajatve/Poslovanje_z_nami/Novodila_in_pojasnila/2022/0920-13147_2022-3_Izvzem_dividend_po_24_clenu_ZDDPO-2_ki_so_bile_obdavcene_na_viru.docx
- Slovenia - Corporate - Income determination: https://taxsummaries.pwc.com/slovenia/corporate/income-determination
- Private foundations in Slovenia (University of Ljubljana repository, thesis abstract): https://repozitorij.uni-lj.si/IzpisGradiva.php?id=100205

## Change log

- 2026-10-15: initial research.
- 2026-10-15 (data-quality pass): added BISL fee (EUR 19,300, 2025-26, school's own schedule) and prime rent (Bolha.com, EUR 3,750/month, thin sample).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept (EUR 3,750).
- 2026-10-16: added surviving-spouse treatment.
- 2026-10-16: added structure regime `holding_doo` (family d.o.o.) with sourced capital gains (22%), dividends (1.1% effective) and payout (25%) terms; corporate summary now states the dividend exclusion, the 5% add-back and the gains-exemption conditions (FURS guide, PwC). Recipe `data/recipes/SVN.json` added.
