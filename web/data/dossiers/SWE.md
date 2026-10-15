# Sweden — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Shares held directly are taxed at 30% on gains and dividends. Most investors with listed portfolios use
an investment savings account (ISK) instead. An ISK replaces income tax with an annual standardised tax
of 1.065% (2026) on the account value above SEK 300,000. Sweden has had no wealth tax since 2007 and no
inheritance or gift tax since 2005. There is no exit tax, but gains on Swedish shares stay taxable for ten
years after leaving.

## Residence and eligibility

- **Tax residence:** domicile (permanent stay), a continuous stay of more than six months, or an
  essential connection after earlier residence.
- **After leaving:** Swedish citizens, and foreigners with ten years of residence, remain resident until
  they prove all important ties are broken. After five years the burden of proof shifts to the tax
  agency.
- **Proposed day-count test (not law):** more than 160 days in a calendar year, or more than 120 days in
  each of two consecutive years. (PwC, Residence.)
- **EU citizens:** right of residence with sufficient means.
- **US and other citizens:** need a permit for work, own business, family or study; there is no investor
  visa.
- These immigration routes were not verified on Migrationsverket.

## Capital gains

- **Rule:** capital income is taxed at a flat **30%** (Skatteverket, "Kvittning och kvotering").
  - Losses on listed securities offset gains in full.
  - Excess losses are deductible at 70%.
  - A deficit gives a 30% tax reduction up to SEK 100,000, and 21% above that.
- **Unlisted shares that are not qualified:** 5/6 of the gain is taxable, an effective 25% (PwC; and
  Skatteverket on the 5/6 offset).
- **Private dwelling:** 22/30 of the gain is taxable, an effective 22% (Skatteverket, sale of a home).
- **JSON:**

  | Field | Value | Derivation |
  |---|---|---|
  | listed domestic and foreign | 0.30 | 30% flat |
  | private business sale | 0.25 | 30% × 5/6, for a passive stake |
  | real estate (local) | 0.22 | 30% × 22/30 |
  | real estate (foreign) | null | not verified |

- **Qualified shares (3:12):** shares in a closely held company where the owner is active follow the 3:12
  rules, reformed from 1 January 2026. Amounts within the limit amount are taxed at 20%, and amounts above
  it as salary, so an active family owner can pay more than 25%. The detailed rules for sale gains were
  not verified.
- **No exit tax.** Former residents remain taxable on gains on Swedish shares for ten years after leaving
  (PwC), often limited by treaty.

## Dividends

- **Rule:** dividends from listed Swedish and foreign companies are taxed at **30%**. JSON: 0.30
  domestic, 0.30 foreign.
- **Foreign withholding tax:** credited against Swedish tax.
- **Unlisted non-qualified shares:** dividends are taxed at 25%. This is general knowledge and was not
  confirmed on an opened official page.
- **Outbound withholding (kupongskatt):** 30% on dividends to non-residents, reduced by treaty
  (Skatteverket). EU parent companies can be exempt. The Russia treaty has been suspended since 10 February
  2025.

## Inheritance and gifts to children

- **Rule:** no inheritance, estate or gift tax (PwC: "There are no inheritance, estate, or gift taxes in
  Sweden"). It was abolished from 2005.
- **Cost basis:** heirs take over the cost basis, so the 30% gain tax is deferred. This is general
  knowledge and was not re-verified.
- **JSON:** basis `none`, `fully_exempt`.

## Wealth tax

- **Rule:** there is no net wealth tax; it was abolished on 1 January 2007 (PwC). JSON type `none` in the
  standard regime.
- **Property fee:** the municipal property fee on homes is SEK 9,287 or 0.75% of the taxable value,
  whichever is lower (PwC wording). It does not apply to foreign property.

## Special regimes

### Investment savings account (ISK) — modelled as special regime `isk`

An ISK is a statutory account wrapper, not a residence regime. Any Swedish resident can open one.

- **No income tax inside:** gains and dividends inside the ISK are untaxed.
- **Standardised tax for 2026** (Skatteverket):
  - Deemed yield = government bond rate on 30 November 2025 (2.55%) + 1 point = **3.55%**, with a floor
    of 1.25%.
  - That yield is taxed at 30%, which is **1.065% of the capital base** a year.
  - The capital base is the average of the four quarter-start values plus all deposits during the year.
- **Tax-free basic level:** **SEK 300,000** per person from 1 January 2026 (SEK 150,000 in 2025). It is
  shared across ISK, endowment insurance (kapitalförsäkring) and PEPP.
- **Permitted assets:**
  - Securities listed on a regulated market anywhere in the world.
  - Securities traded on an MTF within the EEA.
  - Fund units and cash.
  - Holdings of 10% or more, and qualified shares, are not allowed.
- **Foreign withholding tax:** credited automatically against the ISK tax.
- **JSON:**
  - Capital gains on listed shares 0.0.
  - Dividend rates 0.0.
  - Wealth tax `limited`, base `securities_accounts`, exempt_amount 300,000, rate 0.01065.
  - Private business and real estate keep the standard rates, because those assets cannot be held in an
    ISK.
- **Not verified:** moving existing holdings into an ISK counts as a sale at market value; this is
  general knowledge.
- **Outlook:** the rate changes every year. A forecast for 2027 is about 1.2% (ISK-guiden, not official
  and not cited in the JSON). Whether the post-election government will change the rules is unknown.

**Duration:** ISK is a permanent statutory account type (Inkomstskattelagen 1999:1229, chapter 42 rules on the standardised yield (schablonintäkt)): there is no time limit, and it applies for as long as the holder keeps the account. The yield parameters (government borrowing rate plus 1 point, and the tax-free allowance) are set each year, so the effective annual charge changes.

## Holding structures

**No structure modelled.** A Swedish AB holding listed portfolio shares gets no participation exemption: listed
shares are business-related only with at least 10% of the votes held for a year, so portfolio gains and dividends are
taxed at 20.6% in the company (PwC, Corporate income determination). Paying out to a passive owner then costs about
25% (5/6 of a dividend on unlisted shares taxed at 30%; 3:12 rules if the shares are qualified), about 40% in total.
The investment savings account (ISK, regime `isk`) is already better: for 2026 the standardised yield is 3.55% of
the capital base (government bond rate of 2.55% on 30 November 2025 + 1 point), taxed at 30% = **1.065%** of the
account value a year above a SEK 300,000 tax-free level, with no tax on gains, dividends or withdrawals
(Skatteverket). On this family's EUR 30m portfolio that is about EUR 320k a year against roughly EUR 370k of company
tax before any payout tax in an AB. Swedish investment companies (investmentföretag) need a broad shareholder base
and are not available to a family. Recorded in `holding_company_notes`.

## Company taxation (kept separate from personal tax)

- **Rate:** 20.6% flat; there are no local corporate taxes (PwC).
- **Outbound withholding:** 30% on dividends, reduced by treaty or the EU directive.
- **Participation exemption:** not verified here. Portfolio holdings in a company are taxed at the company
  level.

## Cost of living notes

City: Stockholm.

- **Prime rent (monthly):** 55,000 SEK (2026). Median asking rent of 5 whole-house lettings with 6+ rooms (about 4-5 bedrooms; Swedish room counts include the living room) in Danderyd (Djursholm, Stocksund, Nora) and Lidingö, the prime family suburbs, listed on Qasa on 2026-10-15 (SEK 33,000-59,000; one duplicate listing removed). Across Stockholm, Danderyd, Lidingö, Nacka and Solna the 29 such houses had a median of about SEK 33,300. Small sample. Source: [Qasa - houses for rent, Stockholm area](https://qasa.com/se/en/find-home?homeTypes=house&minRoomCount=5&searchAreas=Stockholm%7E%7Ese).
- **International school fee (annual, per child):** 191,500 SEK (2026). Stockholm International School, Grades 11-12 (IB Diploma) annual tuition 2026-27, from the school's own fee page. Excludes the one-off SEK 60,000 enrolment fee and SEK 3,000 application fee. The listed tuition assumes the municipality pays school funding (skolpeng); a pupil who does not qualify pays the full amount on top. Source: [Stockholm International School - School fees](https://stockholmis.se/admissions/school-fees/).
- Health insurance, housekeeper and price per m² not sourced. Stockholm's rental market for large villas is thin; most are owner-occupied.

## Open questions

- Changes to ISK and capital taxation in the 2027 budget or by the post-election government.
- How the 3:12 reform taxes sale gains on qualified shares.
- How gains on foreign real estate are taxed.
- The 25% dividend rate on unlisted shares and the inherited cost basis, neither confirmed on an official
  page.
- The migration routes.

## Sources

- [Investeringssparkonto (ISK) — Skatteverket](https://www.skatteverket.se/privat/skatter/vardepapper/investeringssparkontoisk.4.5fc8c94513259a4ba1d800037851.html)
- [Kvittning och kvotering — Skatteverket](https://www.skatteverket.se/privat/skatter/vardepapper/deklareraaktierochovrigavardepapper/kvittningochkvotering.4.7be5268414bea0646945a21.html)
- [Räkna ut vinst, förlust och skatt (bostad) — Skatteverket](https://www.skatteverket.se/privat/fastigheterochbostad/forsaljningavbostad/raknautvinstforlustochskatt)
- [Swedish withholding tax on dividends — Skatteverket](https://www.skatteverket.se/servicelankar/otherlanguages/inenglishengelska/businessesandemployers/nonestablishedforeignbusinesses/swedishwithholdingtasondividends.4.34a801ea1041d54f9e28000452.html)
- [Sweden - Individual - Income determination — PwC](https://taxsummaries.pwc.com/sweden/individual/income-determination)
- [Sweden - Individual - Other taxes — PwC](https://taxsummaries.pwc.com/sweden/individual/other-taxes)
- [Sweden - Individual - Residence — PwC](https://taxsummaries.pwc.com/sweden/individual/residence)
- [Sweden - Corporate - Taxes on corporate income — PwC](https://taxsummaries.pwc.com/sweden/corporate/taxes-on-corporate-income)
- [Qasa - houses for rent, Stockholm area](https://qasa.com/se/en/find-home?homeTypes=house&minRoomCount=5&searchAreas=Stockholm%7E%7Ese)
- [Stockholm International School - School fees](https://stockholmis.se/admissions/school-fees/)
- Sweden - Corporate - Income determination, PwC: https://taxsummaries.pwc.com/sweden/corporate/income-determination
- Investeringssparkonto (ISK), Skatteverket: https://www.skatteverket.se/privat/skatter/vardepapper/investeringssparkontoisk.4.5fc8c94513259a4ba1d800037851.html

## Change log
- 2026-10-15: initial research.
- 2026-10-15: data-quality pass: added prime rent (Qasa, Danderyd/Lidingö houses, SEK 55,000/month); school fee now from Stockholm International School's own page (SEK 191,500, Grades 11-12, 2026-27); added duration_note to the ISK regime.
- 2026-10-15: holding-structure review: no structure added (AB vs ISK explained); holding_company_notes updated.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept (SEK 55,000).
