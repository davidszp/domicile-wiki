# Gibraltar — family-office tax dossier

Last reviewed: 2026-10-16
Tax year: 2025/26
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

- No capital gains tax. Since 2025 there is one exception: property dealing by owners of five or more taxable
  Gibraltar properties (Income Tax Act 2010, Sch. 1 Part 2).
- No tax on interest, no inheritance, estate, gift or wealth tax (PwC).
- An ordinarily resident individual is taxed on foreign Table B and C income (s. 11(2)), but dividends from companies
  listed on a Recognised Stock Exchange, or paid out of profits Gibraltar did not tax, are excluded (Sch. 1 Table C
  Class 1(a)(iii)-(iv)). A foreign share portfolio therefore bears no Gibraltar tax.
- Category 2 (Qualifying Individuals Rules 2004): foreign dividends are outside assessable income (Rule 10(1)),
  assessable income is capped at GBP 118,000, minimum tax GBP 37,000 a year (Rule 9(4)(b)), maximum GBP 42,380. One
  election covers spouse and children (Rule 11). New applicants need GBP 5 million of net assets from June 2026
  (announced 18 June 2026; GBP 2 million before).

## Residence and eligibility

- Resident at 183 days in a tax year, or more than 300 days over three consecutive years (PwC).
- Routes: Category 2, or an ordinary permit. Post-Brexit rules for EU nationals are not researched.

## Capital gains

- PwC: "There is no tax on capital gains in Gibraltar."
- From 1 Jan 2025, property disposal profits are taxable for holders of five or more taxable properties. The primary
  residence and estate disposals are excluded.
- JSON: all rates 0.

## Dividends

Under s. 11(2) of the Income Tax Act 2010 an ordinarily resident individual is chargeable on Table B and Table C income arising or received outside Gibraltar. Table C Class 1(a) charges dividends except those paid (i) by a company to another company, (ii) to a person not ordinarily resident, (iii) by a company whose shares are listed on a Recognised Stock Exchange, or (iv) out of profits or gains on which no tax has been charged under the Act, to the extent of those profits. Dividends from foreign listed companies, and from foreign companies whose profits Gibraltar never charged, are therefore untaxed. Income from funds marketed to the public is not charged (Class 2(a)); interest is not a head of charge. Dividends from unlisted Gibraltar companies are taxed to the extent of taxable underlying profits, with a tax credit.

- The Commissioner designates Recognised Stock Exchanges by Gazette notice; the notice was not found, so listing on a given exchange is not confirmed (limb (iv) would still exempt dividends from foreign profits that Gibraltar did not tax). Dividends from private foreign companies or from non-public funds follow the entity rules.
- JSON: foreign 0, `not_applicable`. Domestic is null, because it depends on the underlying taxable profits.
- Source: Income Tax Act 2010 consolidated to 23 March 2026 (s. 11, Sch. 1 Table C Class 1, Class 2), read in full for those provisions.

## Inheritance and gifts to children

- PwC: no inheritance tax, no estate duty, no gift tax.
- Stamp duty on property transfers: 0% up to GBP 200,000, rising to 4.5% on the excess over GBP 800,000.
- JSON: basis none, fully_exempt.

## Wealth tax

None (PwC). General rates (municipal property rates) apply but are not researched.

## Special regimes

- **Category 2** (`category_2`; Qualifying (Category 2) Individuals Rules 2004, LN 2004/070 as consolidated to 1 Aug 2024; Income Tax Office Q&A; PwC):
  - Tax: Assessable income is capped at GBP 118,000 a year (Rule 9(4)(a)) and charged only under the Allowances Based System (Rule 9(3), 9(5)); minimum tax GBP 37,000 a year (Rule 9(4)(b)); maximum tax GBP 42,380 at current rates (Income Tax Office). Dividends, pensions and emoluments from outside Gibraltar are not taken into account (Rule 10(1)); Gibraltar rents and permitted Gibraltar business or employment income are assessable (Rule 10(3)-(4)). For a passive foreign portfolio the tax is therefore the GBP 37,000 minimum: the regime buys a residence route and certainty, not a saving over ordinary residence, where the same portfolio is untaxed.
  - Conditions: Not present in Gibraltar more than 183 days in any of the last five years or on average 90 days in any three, and no trade, business or employment there in that period (Rule 4); approved residential accommodation in Gibraltar for exclusive use for the whole year (Rule 3); the Finance Centre Director must be satisfied of substantial and sound financial standing and good character (Rule 6). Net assets of GBP 5 million for new applicants from June 2026 (GBP 2 million before): announced by the government on 18 June 2026; the Rules themselves set no figure, and existing holders are grandfathered.
  - Modelled as `lump_sum` GIP 37,000 (minimum tax). Minimum tax GBP 37,000 for every year after the year of application (Rule 9(4)(b); GBP 3,083.33 a month in the first and last year, 9(4)(c)-(d)). The tax is the greater of the minimum and the Allowances Based tax on the first GBP 118,000 of assessable income, which is GBP 42,380 at the cap (Income Tax Office). Foreign dividends, pensions and emoluments are outside assessable income unless the holder elects to include them (Rule 10(1)-(2)); capital gains are not taxed in Gibraltar. Gibraltar rents and permitted Gibraltar work are assessable on top (Rule 10(3)-(5)); the lump_sum 'covers' list therefore no longer includes domestic income (earlier version of this file did). A spouse and children can be treated as part of the holder's income by an election (Rule 11(1)), or apply for their own certificate (Rule 11(5)), so one certificate and one minimum can cover the family. An advance payment equal to the maximum tax under Rule 9(4)(a) is due by 30 November and is refundable on surrender (Rule 8); the application fee is GBP 1,233, rising to GBP 5,000 (press release 469/2026). Not indexed by law: amounts changed only by Legal Notice (last LN 2022/173).
  - Duration: The certificate is effective for an indefinite period (Rule 6) while the holder keeps meeting the conditions of Rules 3, 5 and 7 (accommodation, good standing, taxes and the minimum paid) and submits it for endorsement every three years (Rule 7(3)). It lapses if the holder declares no Gibraltar tax liability (Rule 7(4)).
  - Not a remittance-basis regime: Gibraltar taxes on a source basis, so the 0% on foreign portfolio income does not depend on keeping it offshore.
- HEPSS (taxed on the first GBP 160,000 of income) is for executives with specialist skills. It is not modelled.

## Company taxation (kept separate from personal tax)

Territorial. The rate was not verified in this research.

## Cost of living notes

- Prime rent: GBP 7,000 a month = median asking rent of 13 lettings with 4+ bedrooms on PropertyGibraltar.com on
  2026-10-15 (14 listed; one at GBP 895, evidently a room let, excluded). Range GBP 3,350-14,000; South District and
  Westside villas GBP 6,700-14,000.
- School: Prior Park School Gibraltar, Years 12-13 GBP 20,994 a year (2026-27); Years 10-11 GBP 18,894.
- Amounts in GBP, entered as GIP at par.
- Property stamp duty: 0% up to GBP 200,000; above GBP 800,000: 3% on the first 350,000, 3.5% on the next 450,000,
  4.5% on the balance.
- Purchase price, health insurance and housekeeper costs are not sourced.

## Open questions

- The Gazette notice designating Recognised Stock Exchanges was not found; the foreign-dividend exclusion rests also on limb (iv) (profits not charged to Gibraltar tax).
- Corporate tax rate, treaty network and post-Brexit residence rules for EU nationals not verified.
- Category 2 net-assets requirement: GBP 5 million is government policy announced 18 June 2026 (existing holders grandfathered); the Rules contain no figure, and the Finance Centre page was not updated when checked by other sources.
- Category 2 first-year advance payment (maximum tax under Rule 9(4)(a)) and the application fee (GBP 1,233, to rise to GBP 5,000) are one-off and not in the lump_sum amount.
- Purchase price per m2, health insurance and housekeeper costs not sourced.

## Sources

- PwC, Gibraltar taxes on personal income: https://taxsummaries.pwc.com/gibraltar/individual/taxes-on-personal-income
- PwC, Gibraltar other taxes: https://taxsummaries.pwc.com/gibraltar/individual/other-taxes
- PwC, Gibraltar income determination: https://taxsummaries.pwc.com/gibraltar/individual/income-determination
- PwC, Gibraltar residence: https://taxsummaries.pwc.com/gibraltar/individual/residence
- PwC, Gibraltar other tax credits and incentives: https://taxsummaries.pwc.com/gibraltar/individual/other-tax-credits-and-incentives
- HM Government of Gibraltar, Income Tax Office, Qualifying Individuals Q&A: https://www.gibraltar.gov.gi/income-tax-office/individuals-and-employees/qualifying-individuals
- PropertyGibraltar.com, rentals with 4+ beds: https://www.propertygibraltar.com/rentals?sale=0&category=1&beds=4&order=price_desc&np=1
- Prior Park School Gibraltar, School Fees 2026-2027: https://www.priorparkgibraltar.com/school-fees
- Income Tax Act 2010 (Act 2010-21), consolidated to 23 March 2026: https://www.gibraltarlaws.gov.gi/legislations/income-tax-act-2010-2627/download
- Qualifying (Category 2) Individuals Rules 2004, consolidated 1 Aug 2024: https://www.gibraltarlaws.gov.gi/uploads/legislations/income-tax/2004s070/2004s070(01-08-24).pdf
- HM Government of Gibraltar, press release 469/2026 (18 June 2026), Category 2 changes: https://www.gibraltar.gov.gi/press-releases/government-announces-changes-to-category-2-regime-4692026-12107

## Change log
- 2026-10-15: initial research.
- 2026-10-15 (data-quality pass): confirmed Category 2 cap (GBP 118,000), minimum (GBP 37,000) and maximum tax (GBP 42,380) from the Income Tax Office; added duration_note; added prime rent (GBP 7,000) and Prior Park fee (GBP 20,994).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
- 2026-10-16: recipe pass. Foreign dividends: replaced the inferred rule with the statute (s. 11(2); Sch. 1 Table C Class 1(a)(iii)-(iv)). Category 2: read the Rules (cap GBP 118,000 and minimum GBP 37,000 in Rule 9(4), foreign dividends excluded by Rule 10(1), family election in Rule 11, indefinite certificate in Rule 6). Corrected `covers`: Gibraltar rents and permitted Gibraltar work are assessable on top (Rule 10(3)-(4)), so `domestic_income` was removed; family coverage question closed. Net assets GBP 5 million recorded as announced policy (press release), not in the Rules.
