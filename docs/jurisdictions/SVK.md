# Slovakia — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Income Tax Act No. 595/2003 Coll. (ZDP), time version effective 1.1.2026. Listed securities held over one
year: exempt. Dividends: 7%. No inheritance, gift or wealth tax. Private business sales and short-term gains:
progressive up to 35% (new 2026 brackets) plus health insurance.

## Residence and eligibility

Resident with permanent residence, a habitual home with intent to stay permanently, or 183+ days in a
calendar year (PwC). EU: free movement. US/other: purpose-based temporary residence; no investor programme
found (unverified).

## Capital gains

- Gains on securities and company stakes are "other income" (§8(1)(e)-(f)) in the general base (§4(1)(a))
  taxed under §15(a)(1): 19% up to 154.8x, 25% to 212.4x, 30% to 264x, 35% above 264x the subsistence
  minimum (2026; the 30% and 35% bands are new for 2026). PwC says capital gains are in a separate 19%
  base; the law text puts them in the general base, so we follow the law.
- Exempt (§9(1)(k)): securities admitted to an EU regulated market or a comparable foreign regulated market,
  held more than one year (and listed more than one year before sale); not for business assets.
- Real estate held over 5 years: exempt (§9(1)(a)). EUR 500 a year allowance for net other income (§9(1)(i)).
- Health insurance: 15% on taxable §8 income, uncapped (Act 580/2004 §10b(1)(d), §13(7), §12(1)(b)).
- JSON: listed securities 0.0; real estate 0.0; `private_business_sale = 0.50` (35% tax + 15% health insurance); headline 0.35.

Re-verified 2026-10-15 from the law text: §8(1)(e)-(f) gains are part of the general base under §4(1)(a), taxed at 19/25/30/35% (§15(a)(1)); the 19% separate base (§15(a)(4)) is for §7 capital income only. Health insurance: Act 580/2004 §10b(1)(d), §13(7), §12(1)(b): 15% on the §8 tax base, uncapped (the 60x cap in §13(6) applies only to dividends). JSON private_business_sale raised from 0.35 to 0.50 (35% + 15%).

## Dividends

- §15(a)(5): 7% on dividends from 2025+ profits (10% for 2024 profits; 7% for 2017-2023; 2004-2016 profits
  untaxed); withheld by Slovak payers, separate base for foreign dividends (§51e). 35% from non-cooperative
  states (§15(a)(6)). No health insurance on dividends from 2017+ profits.
- JSON: domestic and foreign 0.07, `credit`.

## Inheritance and gifts to children

No inheritance or gift tax (PwC). Income from gifts and inheritance is outside the income tax (§3(2)(b)).
JSON: `basis = none`, `fully_exempt`.

## Wealth tax

None (PwC). Local real estate tax is a municipal property tax.

## Special regimes

None.

## Company taxation (kept separate from personal tax)

§15(b): 10% (revenue up to EUR 100,000), 21% standard, 24% (revenue above EUR 5m). Minimum tax rules.

## Cost of living notes

City: Bratislava.
- Prime family-home rent (monthly): EUR 3,000 (2026). Median asking rent of 71 houses of 180-450 m² for rent in Bratislava (all districts; mostly Koliba, Záhorská Bystrica, Rusovce, Ahoj, Horský park, castle hill), read from all six result pages of Nehnutelnosti.sk on 15 Oct 2026 (about 155 listings; range EUR 1,290-8,500; offices excluded). Asking rents, utilities extra. Source: Domy Bratislava - ponuka domov na prenájom, https://www.nehnutelnosti.sk/vysledky/domy/bratislava/prenajom
- International school (annual, per child): EUR 27,530 (2026). The British International School Bratislava (Nord Anglia), Year 13 (IB Diploma), school year 2026/27: EUR 27,530 tuition (includes IBDP exam fees; no capital fee). New students pay a one-off EUR 900 registration fee and a refundable EUR 1,200 deposit. Source: BISB tuition fees 2026-27 (Schedule of Fee 2026/2027), https://www.nordangliaeducation.com/bisb-bratislava/admissions/tuition-fees

Prime purchase price per m², family health insurance and housekeeper cost were not sourced in this round and are omitted rather than guessed.

## Open questions

- PwC describes capital gains as falling in a separate 19% base; the law (§8(1)(e)-(f), §4(1)(a), §15(a)(1)-(4) ZDP, version effective 1 Jan 2026) puts gains on securities and company stakes in the general progressive base and reserves the separate 19% base for §7 capital income. We follow the law text.
- Euro amounts of the 2026 bracket thresholds (multiples of the subsistence minimum valid on 1 Jan 2026) not computed here.
- Whether a 15% foreign WHT fully extinguishes the 7% Slovak tax under the credit method for every treaty (expected yes).
- Notary probate fees not quantified; treated as negligible.

## Sources

- Zákon č. 595/2003 Z. z. o dani z príjmov (version effective 1.1.2026): https://www.slov-lex.sk/static/pdf/2003/595/ZZ_2003_595_20260101.pdf
- PwC, Slovak Republic - Individual - Income determination: https://taxsummaries.pwc.com/slovak-republic/individual/income-determination
- PwC, Slovak Republic - Individual - Taxes on personal income: https://taxsummaries.pwc.com/slovak-republic/individual/taxes-on-personal-income
- PwC, Slovak Republic - Individual - Other taxes: https://taxsummaries.pwc.com/slovak-republic/individual/other-taxes
- PwC, Slovak Republic - Individual - Residence: https://taxsummaries.pwc.com/slovak-republic/individual/residence
- PwC, Slovak Republic - Corporate - Taxes on corporate income: https://taxsummaries.pwc.com/slovak-republic/corporate/taxes-on-corporate-income
- Zákon č. 580/2004 Z. z. o zdravotnom poistení (consolidated, effective 1.7.2026): https://www.slov-lex.sk/static/pdf/2004/580/ZZ_2004_580_20260701.pdf
- Domy Bratislava - ponuka domov na prenájom: https://www.nehnutelnosti.sk/vysledky/domy/bratislava/prenajom
- BISB tuition fees 2026-27 (Schedule of Fee 2026/2027): https://www.nordangliaeducation.com/bisb-bratislava/admissions/tuition-fees

## Change log
- 2026-10-15: initial research.
- 2026-10-15: resolved capital-gains base from the law text (general progressive base, not the separate 19% base) and added 15% uncapped health insurance to private_business_sale (0.35 -> 0.50); capital_gains now high/verified; added Bratislava cost of living (Nehnutelnosti.sk rent sample, BISB 2026/27 fee).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
