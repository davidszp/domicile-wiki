# Spain — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Spain taxes resident individuals on worldwide income and wealth. Capital gains and dividends are savings income taxed at 19% to 30% (30% above EUR 300,000 of savings income since 2025). Spain has an annual wealth tax (Impuesto sobre el Patrimonio, IP) and a complementary state solidarity tax on large fortunes (ITSGF) above EUR 3m. Inheritance and gift tax (ISD) is paid by the heir or donee. The 15 common-regime regions set the wealth-tax allowance, scale and rebates and almost all ISD parameters, so the region of residence decides much of the result. Navarra and the Basque Country have their own foral tax systems. All regional detail is in `ESP-regions.md` and `data/subnational/ESP.json`; this file records the state rules, which the JSON uses as the national standard.

Newcomers who take a Spanish job, a directorship or an approved entrepreneurial activity can elect the Beckham regime (art. 93 LIRPF) for 6 tax years: foreign investment income is then untaxed and wealth tax applies only to Spanish assets.

## Residence and eligibility

- Tax residence (art. 9 LIRPF; PwC Residence, reviewed 30 June 2026): more than 183 days in Spain in the calendar year (sporadic absences count unless foreign residence is proven), or Spain as the main centre of economic interests; rebuttable presumption if the non-separated spouse and minor children live in Spain. Nationals moving to a tax haven remain resident for that year and the next 4.
- Region of residence (art. 28 Ley 22/2009): for IRPF and IP the region where most days of the tax year are spent; for ISD the region where the deceased (or the donee, for gifts of movables) spent most days of the previous 5 years.
- Routes: EU/EEA citizens register (certificado de registro). US and other citizens: non-lucrative residence visa (passive means, private health insurance, no work), international teleworker, highly qualified professional or entrepreneur permits (Ley 14/2013). The investor "golden visa" (art. 63 Ley 14/2013) was left without content from 3 April 2025 by Ley Orgánica 1/2025 (BOE consolidated text checked).

## Capital gains

- Rule: gains on the transfer of assets are savings income (arts. 46, 49 LIRPF). Combined state + regional savings scale (arts. 66 and 76 LIRPF, as amended by Ley 7/2024 from 2025): 19% to EUR 6,000; 21% to 50,000; 23% to 200,000; 27% to 300,000; 30% above. Regions cannot alter this scale, so it is national in the common regime.
- JSON: `headline_rate` 0.30; all `rates` 0.30 (top marginal rate for a large gain; no holding period).
- Real estate: same scale; the municipal land-value tax (IIVTNU) on Spanish land is extra and not included.
- Main home: exempt if reinvested in a new main home, or for sellers aged 65+.
- Exit tax (art. 95 bis): residents for 10 of the last 15 years leaving Spain are taxed on unrealised gains on shares worth more than EUR 4m (or EUR 1m with a stake above 25%); deferral for EU/EEA moves.
- Funds (IIC) can be switched tax-free (traspasos).
- Professional trader: securities gains stay savings income for a private investor; only an organised business would move income into the general base (up to about 45-54%).
- Foreign assets: worldwide taxation with a foreign tax credit (art. 80); Modelo 720 reporting above EUR 50,000 per asset class.

## Dividends

- Rule: dividends are savings income at 19%-30%, domestic and foreign alike; no exemption for individuals.
- JSON: `headline_rate`, `domestic_rate`, `foreign_gross_rate` 0.30; `foreign_tax_credit` "credit" (art. 80, limited to the treaty rate and the Spanish tax on that income).
- Outbound WHT (PwC Withholding taxes, reviewed 30 June 2026): 19% to non-residents; 0% to qualifying EU parents (5% for one year); treaty rates mostly 0-15%. PwC's table lists 92 treaty entries.

## Inheritance and gifts to children

- Rule (Ley 29/1987, state rules): tax on each heir. Group II (descendants aged 21+, spouse, ascendants) reduction EUR 15,956.87 (art. 20.2.a); state scale 7.65% to 34% above EUR 797,555.08 (art. 21.2); multiplier 1.0 to 1.2 by the heir's own pre-existing wealth (1.2 above EUR 4,020,770.98) (art. 22).
- JSON: `basis` beneficiary, `children_treatment` taxed, `exemption` 15,956.87, `brackets` = the state scale (multiplier 1.0). A EUR 10m inheritance costs about 33.2% under the state rules.
- Gifts: same scale and multipliers, without the parent-child reduction; gifts within 3 years accumulate. `gifts_same_as_inheritance` false.
- Business relief: 95% reduction for qualifying family businesses (art. 20.2.c, 20.6); not for listed portfolios.
- Scope: Spanish-resident heirs are taxed on worldwide acquisitions with credit for foreign inheritance tax (art. 23). Non-resident heirs pay only on Spanish-situs assets and can apply the rules of the region where the deceased lived (DA 2ª, after CJEU C-127/12). No tail after leaving Spain.
- Regional rules matter most here: 99-100% rebates in Madrid, Andalucía, Valencia, Murcia, La Rioja, Castilla y León, Extremadura, Canarias (99.9%), Cantabria and Baleares (100%); heavy tax for children in Catalonia, Asturias, Aragón, Galicia and Navarra; flat 1.5% in the Basque Country. Ceuta and Melilla: 99% rebate if the deceased lived there for 5 years (art. 23 bis).

## Wealth tax

- IP (Ley 19/1991): annual tax on worldwide net wealth at 31 December. State allowance EUR 700,000 (art. 28); main home exempt up to EUR 300,000 (art. 4.Nueve); qualifying family-business shares exempt (art. 4.Ocho). State scale (art. 30): 0.2% to EUR 167,129.45; 0.3%; 0.5%; 0.9%; 1.3%; 1.7%; 2.1%; 3.5% above EUR 10,695,996.06.
- Joint limit (art. 31): IRPF + IP capped at 60% of the IRPF base (long-term gains excluded), but the IP may be cut by at most 80%. For a low-yield portfolio this can reduce the IP substantially; the JSON ignores it.
- ITSGF (art. 3 Ley 38/2022): complementary state tax on net wealth above EUR 3m; EUR 700,000 allowance; 0% on the first EUR 3m of base, 1.7% to EUR 5,347,998.03, 2.1% to EUR 10,695,996.06, 3.5% above; regional IP actually paid is deducted. Originally for 2022-2023; extended "until the review of wealth taxation in the regional-financing reform" (RDL 8/2023). Not applied in Navarra and the Basque Country, which exact it under their own rules (Convenio DA 8ª, Concierto DA 5ª).
- JSON: `type` broad; one component, `net_wealth_worldwide`, `exempt_amount` 700,000, brackets = state scale. Under the state scale the IP always exceeds the ITSGF, so the ITSGF adds nothing. The state rules apply as such in Castilla-La Mancha, Castilla y León, Aragón, Canarias (state scale and allowance), Ceuta and Melilla (75% rebate only for assets located there, art. 33).
- Municipal property tax (IBI) and IIVTNU are ordinary local taxes, not modelled as wealth tax.

## Special regimes

**Beckham regime (art. 93 LIRPF)** — `beckham_art93`:
- Eligibility: not resident in the previous 5 years; moving because of a Spanish employment contract (including remote work under the international telework visa), becoming a company director (for a holding/patrimonial company only without a stake of 25% or more), an approved entrepreneurial activity, or highly qualified start-up/R&D work. Election within 6 months. Spouse and children under 25 can join. A pure investor without a job or directorship does not qualify.
- Duration: year of arrival plus 5 (JSON `duration_years` 6).
- Taxation: taxed under non-resident rules: employment income 24% to EUR 600,000 and 47% above (worldwide); other Spanish-source income: savings income 19%-30% (art. 93.2.e).2º: 19% to EUR 6,000, 21% to 50,000, 23% to 200,000, 27% to 300,000, 30% above). Resolved 2026-10-15 from the BOE consolidated LIRPF: the 30% top band was added by disposición final 7.3 of Ley 7/2024 (BOE-A-2024-26694) with effect from 1 January 2025; PwC's page (reviewed June 2026) still shows the old 28% and is out of date. Foreign dividends and gains are not taxed: JSON foreign rates 0, domestic 0.30.
- Wealth tax: real obligation, Spanish assets only (state scale, EUR 700,000 allowance), plus ITSGF on Spanish assets above about EUR 3.7m.
- Inheritance: unchanged (the person remains IRPF-resident; ISD personal obligation).
- Not available in Navarra or the Basque Country (own impatriate regimes, not modelled).

## Holding structures

No holding structure is scored for Spain. A Spanish company holding the listed portfolio:

- pays 25% on portfolio gains and dividends. The 95% exemption of art. 21 LIS needs a stake of at least 5% held one
  year (PwC Spain, corporate income determination); the old EUR 20m alternative no longer applies;
- as an asset-holding entidad patrimonial, cannot use the reduced SME rates;
- gives no wealth-tax business exemption, because the art. 4.Ocho.Dos LIP exemption excludes asset-management
  companies;
- adds up to 30% savings tax on distributions.

With EUR 400,000 a year withdrawn, it costs more than personal holding (rough app-style estimate: about EUR 490,000
against EUR 460,000 a year before running costs). Since Ley 11/2021, a SICAV's 1% rate requires a real spread of
shareholders, which one family cannot meet. The wealth-tax and SICAV points are from general knowledge and were not
re-verified.

## Company taxation (kept separate from personal tax)

CIT 25%; SMEs 23% in 2026 (falling to 20% by 2029); start-ups 15% (PwC, reviewed 30 June 2026). Participation exemption: 95% of qualifying dividends and gains (at least 5% held one year) — not re-verified in this pass. Canary Islands ZEC 4% for qualifying substance; ETVE holding regime; SICAV 1% regime with stricter investor requirements since 2022. A company does not shelter a family portfolio from the 30% personal rate on distribution.

## Cost of living notes

City: Madrid.

- **School:** Runnymede College Sixth Form EUR 7,900 per term for 2026-27 (EUR 23,700 a year, plus a EUR 3,500 enrolment fee).
- Prime family rent: EUR 5,200/month. Estimate for an upper-middle-class 4-bedroom family flat (about 215 m2, midpoint of 180-250 m2) in Madrid: the mean of the Q2-2026 asking rents per m2 per month in Chamartin (EUR 24.29), Chamberi (26.51), Retiro (25.37) and Moncloa-Aravaca (19.86), i.e. EUR 24.0/m2, times 215 m2 = about EUR 5,160, rounded to EUR 5,200. Derived from a district report, not from 4-bedroom listings (idealista, fotocasa and pisos.com could not be read automatically). Replaces the earlier LuxuryEstate.com median of EUR 8,000, which included La Moraleja villas. Source: Brains Real Estate: Alquiler de pisos en Madrid, Q2-2026 (updated 1 Oct 2026).
- **Prime price per m²: EUR 7,816.** Median asking price per m² of 71 homes for sale in Madrid on LuxuryEstate.com (first five result pages, EUR 500,000+ and 80 m²+; interquartile range EUR 5,833-11,714).
- Health insurance and housekeeper costs were not sourced and are omitted rather than guessed.

Regional cities (Barcelona, Marbella, Palma, Valencia, Tenerife, San Sebastián) are in `ESP-regions.md`.

## Open questions

- ITSGF has no end date; a reform of regional financing could replace or end it.
- New arrivals: regional ISD benefits depend on the deceased having spent most days of the prior 5 years in that region; days abroad count for no region. Practical application for a family that arrived recently should be confirmed with an adviser.
- Whether Beckham taxpayers can use regional IP allowances/rebates was not verified.
- Participation exemption (art. 21 LIS) not re-verified.
- Family rent (EUR 5,200) is derived from district asking rents per m2 times 215 m2, not from 4-bedroom listings; check against idealista or fotocasa listings in Chamberi/Chamartin.

## Sources

- Ley 35/2006 del IRPF (consolidated) — https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764
- Ley 19/1991 del Impuesto sobre el Patrimonio (consolidated) — https://www.boe.es/buscar/act.php?id=BOE-A-1991-14392
- Ley 38/2022, art. 3, ITSGF (consolidated) — https://www.boe.es/buscar/act.php?id=BOE-A-2022-22684
- Ley 29/1987 del ISD (consolidated) — https://www.boe.es/buscar/act.php?id=BOE-A-1987-28141
- Ley 22/2009, art. 28 — https://www.boe.es/buscar/act.php?id=BOE-A-2009-20375
- Ley 14/2013, art. 63 — https://www.boe.es/buscar/act.php?id=BOE-A-2013-10074
- PwC, Spain individual other taxes — https://taxsummaries.pwc.com/spain/individual/other-taxes
- PwC, Spain taxes on personal income — https://taxsummaries.pwc.com/spain/individual/taxes-on-personal-income
- PwC, Spain other issues (expatriate regime) — https://taxsummaries.pwc.com/spain/individual/other-issues
- PwC, Spain residence — https://taxsummaries.pwc.com/spain/individual/residence
- PwC, Spain corporate income taxes — https://taxsummaries.pwc.com/spain/corporate/taxes-on-corporate-income
- PwC, Spain withholding taxes — https://taxsummaries.pwc.com/spain/corporate/withholding-taxes
- Runnymede College Madrid fees 2026-2027 — https://www.runnymede-college.com/admissions/fees
- LuxuryEstate.com, luxury properties for rent in Madrid — https://www.luxuryestate.com/rent/spain/community-of-madrid/province-of-madrid/madrid
- LuxuryEstate.com, luxury properties for sale in Madrid — https://www.luxuryestate.com/spain/community-of-madrid/province-of-madrid/madrid
- [Spain - Corporate - Income determination](https://taxsummaries.pwc.com/spain/corporate/income-determination) — PwC Worldwide Tax Summaries (professional)
- Brains Real Estate: Alquiler de pisos en Madrid, Q2-2026: https://brainsre.news/alquiler-pisos-madrid/

## Change log
- 2026-10-15: initial research.
- 2026-10-15 (data-quality pass): added Madrid prime rent (EUR 8,000/month) and prime price per m² (EUR 7,816) from a LuxuryEstate.com listing sample; resolved the Beckham-regime top savings rate (30% from 2025 per BOE, DF 7.3 Ley 7/2024; PwC's 28% is out of date) and removed that open question.
- 2026-10-15: flagged `beckham_art93` as requiring employment or a qualifying activity (`requires_qualifying_activity`), so it is no longer used as the best regime for a passive investor family unless the user opts in.
- 2026-10-15: added a Holding structures section and a holding_company_notes sentence explaining why no holding structure is scored.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: changed from EUR 8,000 to EUR 5,200 (Chamartin, Chamberi, Retiro, Moncloa-Aravaca).
