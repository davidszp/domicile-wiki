# Sweden: taxes, residence and cost of living

Source: https://domicile.wiki/places/sweden/ (domicile.wiki, researched 2026-10-16). Data licence CC BY-SA 4.0. Research, not tax or legal advice.

## At a glance

For an EU-citizen family of five living off a EUR 30M portfolio (the guide's default reader).

- Score for a wealthy family: 77 / 100
- Tax on a €30M portfolio: €235,260 a year · Family holding company (aktiebolag, AB)
- Wealth tax: none
- Children inherit: tax-free
- After 60 years: €153,575,000 of €30,000,000 (with no tax at all: €286,928,000)
- Living costs, family of five: €259,296 a year
- EU member: yes
- Currency: SEK
- Capital: Stockholm

## Tax on investments, inheritance and wealth

Directly held shares: 30% on gains and dividends. Most investors with listed portfolios use an investment savings account (ISK), which replaces income tax with about 1.065% a year on the account value above SEK 300,000 (2026). No wealth tax (since 2007) and no inheritance or gift tax (since 2005). No exit tax, but Swedish share gains stay taxable for ten years after leaving. No special regime for wealthy arrivals. A holding AB is modelled as a structure (20.6% in the company, 25% on payout).

- **Ordinary tax residence, direct holdings**: Swedish tax resident holding securities directly, taxed on worldwide income at 30% on capital income.
- **Investment savings account (ISK)**: Not a residence regime but a statutory account wrapper open to any Swedish resident. Listed securities held in an ISK are taxed only through an annual standardised yield tax on account value; gains and dividends inside are untaxed.
- **Family holding company (aktiebolag, AB)**: The family holds its portfolio through a Swedish private limited company (aktiebolag) owned by the parents. The AB pays 20.6% corporate tax on gains and dividends of listed portfolio shares (no participation exemption below 10% of the votes) with credit for foreign withholding tax; the parents pay personal tax only when the AB pays dividends. Shares in a passive family AB are assumed to be non-qualified, so a dividend is taxed at 5/6 x 30% = 25%. Wealth tax and inheritance tax do not exist, so the standard regime's 'none' applies.

## Income tax

Average municipal tax 32.38% on all taxable income plus 20% state tax above SEK 643,000, giving a 52.38% top marginal rate. Basic allowance SEK 17,400-45,600. Employee pension fee 7% (capped, fully creditable); self-employed egenavgifter 28.97%.

## Inheritance law and trusts

Children are guaranteed half of their intestate share, and a spouse a minimum of four price base amounts. A foreign resident can choose the law of their nationality (EU Succession Regulation art. 22). Sweden has no trusts; private foundations are allowed but taxed.

## Daily life (0-100, higher is better)

- Safety and personal security: 75
- Political and institutional stability: 77
- Corruption and government integrity: 84
- Legal system and property rights: 84
- Healthcare quality and access: 90
- Education quality: 60
- Human development and quality of life: 92
- Infrastructure and connectivity: 93
- Cost of living and housing: 66
- Business opportunities and economy: 85
- Cultural fit and lifestyle: 72

## Research notes

### Sweden — family-office tax dossier

Last reviewed: 2026-10-16
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

#### Summary

Shares held directly are taxed at 30% on gains and dividends. Most investors with listed portfolios use
an investment savings account (ISK) instead. An ISK replaces income tax with an annual standardised tax
of 1.065% (2026) on the account value above SEK 300,000. Sweden has had no wealth tax since 2007 and no
inheritance or gift tax since 2005. There is no exit tax, but gains on Swedish shares stay taxable for ten
years after leaving.

#### Residence and eligibility

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

#### Capital gains

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

#### Dividends

- **Rule:** dividends from listed Swedish and foreign companies are taxed at **30%**. JSON: 0.30
  domestic, 0.30 foreign.
- **Foreign withholding tax:** credited against Swedish tax.
- **Unlisted non-qualified shares:** dividends, gains and losses are taken up at 5/6, an effective 25%
  (Skatteverket, "Om aktier", which adds that in some cases the 5/6 reduction does not apply; the statute
  chapter was not opened). Used for the payout from the holding AB.
- **Outbound withholding (kupongskatt):** 30% on dividends to non-residents, reduced by treaty
  (Skatteverket). EU parent companies can be exempt. The Russia treaty has been suspended since 10 February
  2025.

#### Inheritance and gifts to children

- **Rule:** no inheritance, estate or gift tax (PwC: "There are no inheritance, estate, or gift taxes in
  Sweden"). It was abolished from 2005.
- **Cost basis:** heirs take over the cost basis, so the 30% gain tax is deferred. This is general
  knowledge and was not re-verified.
- **JSON:** basis `none`, `fully_exempt`.

#### Wealth tax

- **Rule:** there is no net wealth tax; it was abolished on 1 January 2007 (PwC). JSON type `none` in the
  standard regime.
- **Property fee:** the municipal property fee on homes is SEK 9,287 or 0.75% of the taxable value,
  whichever is lower (PwC wording). It does not apply to foreign property.

#### Special regimes

##### Investment savings account (ISK) — modelled as special regime `isk`

An ISK is a statutory account wrapper, not a residence regime. Any Swedish resident can open one.

- **No income tax inside:** gains and dividends inside the ISK are untaxed.
- **Standardised tax for 2026** (Skatteverket):
  - Deemed yield = government bond rate on 30 November 2025 (2.55%) + 1 point = **3.55%**, with a floor
    of 1.25%.
  - That yield is taxed at 30%, which is **1.065% of the capital base** a year.
  - The capital base is the average of the four quarter-start values plus all deposits during the year.
- **Tax-free basic level:** **SEK 300,000** per person from 1 January 2026 (SEK 150,000 in 2025). It is
  shared across ISK, endowment insurance (kapitalförsäkring) and PEPP. It is set by amendment, not
  indexed. The JSON uses **SEK 600,000** for the reference couple (one ISK each, portfolio split evenly).
- **Permitted assets:**
  - Securities listed on a regulated market anywhere in the world.
  - Securities traded on an MTF within the EEA.
  - Fund units and cash.
  - Holdings of 10% or more, and qualified shares, are not allowed.
- **Foreign withholding tax:** credited automatically against the ISK tax (Skatteverket, "Automatisk
  avräkning av utländsk skatt"). Skatteverket assumes the foreign income was taxed at 15% (1,000 of tax
  means 6,667 of income), caps that income at the account's schablonintäkt, and the credit cannot exceed
  the Swedish tax; an unused part can be carried forward five years. JSON: `credits_withholding` true.
- **JSON:**
  - Capital gains on listed shares 0.0.
  - Dividend rates 0.0.
  - Wealth tax `limited`, base `securities_accounts`, exempt_amount 600,000 (couple), credits_withholding true, rate 0.01065.
  - Private business and real estate keep the standard rates, because those assets cannot be held in an
    ISK.
- **Not verified:** moving existing holdings into an ISK counts as a sale at market value; this is
  general knowledge.
- **Outlook:** the rate changes every year. A forecast for 2027 is about 1.2% (ISK-guiden, not official
  and not cited in the JSON). Whether the post-election government will change the rules is unknown.

**Duration:** ISK is a permanent statutory account type (Inkomstskattelagen 1999:1229, chapter 42 rules on the standardised yield (schablonintäkt)): there is no time limit, and it applies for as long as the holder keeps the account. The yield parameters (government borrowing rate plus 1 point, and the tax-free allowance) are set each year, so the effective annual charge changes.

#### Holding structures

**Holding company (aktiebolag, AB) — modelled as structure regime `holding_ab`.** A Swedish AB owned by the
parents gets no participation exemption on a listed portfolio: listed shares are business-related only with at
least 10% of the votes held for a year, so portfolio gains and dividends are taxed at 20.6% in the company
(PwC, Corporate income determination), with credit for foreign withholding tax up to the Swedish tax on that
income (PwC, Tax credits and incentives). Gains on unlisted shares are exempt (business-related). Paying out to
a passive owner costs 25%: dividends on unlisted non-qualified shares are taken up at 5/6 and taxed at 30%
(Skatteverket, "Om aktier"). If an owner is active in the AB to a significant extent the shares are
qualified and the 3:12 rules (reformed 2026) apply instead. Case law reported by a lagen.nu summary (RÅ 2009
not 68, ruling not opened) says that managing securities has not made shares qualified. No wealth tax and no
inheritance tax apply, so the AB shares pass tax-free.

- **JSON:** gains 0.206 (listed), 0.0 (unlisted business sale), dividends 0.206 with credit, payout 0.25;
  running cost not researched (null). US citizens are excluded (CFC/PFIC).
- **Compared with the ISK:** for 2026 the ISK costs 1.065% of the value above the tax-free level, with no tax
  on gains, dividends or withdrawals. On this family's EUR 30m that is about EUR 320k a year against roughly
  EUR 370k of company tax on 2% dividends and realised gains, before any payout tax in an AB. The AB defers
  tax only on gains it does not realise and is never cheaper at these yields, but advisers commonly use it,
  so it is kept as a path.
- **Rejected:** Swedish investment companies (investmentföretag) need a broad shareholder base and are not
  available to a family. Endowment insurance (kapitalförsäkring) has the same standardised tax as the ISK.
- **Moving an existing portfolio** into an ISK or an AB is a sale at market value; the projection does not
  model this entry tax.

#### Company taxation (kept separate from personal tax)

- **Rate:** 20.6% flat; there are no local corporate taxes (PwC).
- **Outbound withholding:** 30% on dividends, reduced by treaty or the EU directive.
- **Participation exemption:** not verified here. Portfolio holdings in a company are taxed at the company
  level.

#### Cost of living notes

City: Stockholm.

- **Prime rent (monthly):** 55,000 SEK (2026). Median asking rent of 5 whole-house lettings with 6+ rooms (about 4-5 bedrooms; Swedish room counts include the living room) in Danderyd (Djursholm, Stocksund, Nora) and Lidingö, the prime family suburbs, listed on Qasa on 2026-10-15 (SEK 33,000-59,000; one duplicate listing removed). Across Stockholm, Danderyd, Lidingö, Nacka and Solna the 29 such houses had a median of about SEK 33,300. Small sample. Source: [Qasa - houses for rent, Stockholm area](https://qasa.com/se/en/find-home?homeTypes=house&minRoomCount=5&searchAreas=Stockholm%7E%7Ese).
- **International school fee (annual, per child):** 191,500 SEK (2026). Stockholm International School, Grades 11-12 (IB Diploma) annual tuition 2026-27, from the school's own fee page. Excludes the one-off SEK 60,000 enrolment fee and SEK 3,000 application fee. The listed tuition assumes the municipality pays school funding (skolpeng); a pupil who does not qualify pays the full amount on top. Source: [Stockholm International School - School fees](https://stockholmis.se/admissions/school-fees/).
- Health insurance, housekeeper and price per m² not sourced. Stockholm's rental market for large villas is thin; most are owner-occupied.

#### Open questions

- Changes to ISK and capital taxation in the 2027 budget or by the post-election government.
- How the 3:12 reform taxes sale gains on qualified shares.
- How gains on foreign real estate are taxed.
- The exceptions to the 5/6 rule on dividends (statute chapter not opened) and the inherited cost basis, not
  confirmed on an official page.
- The AB's running costs (not researched), and whether a passive family AB's shares always stay non-qualified.
- The migration routes.

#### Sources

- [Investeringssparkonto (ISK) — Skatteverket](https://www.skatteverket.se/privat/skatter/vardepapper/investeringssparkontoisk.4.5fc8c94513259a4ba1d800037851.html)
- [Kvittning och kvotering — Skatteverket](https://www.skatteverket.se/privat/skatter/vardepapper/deklareraaktierochovrigavardepapper/kvittningochkvotering.4.7be5268414bea0646945a21.html)
- [Räkna ut vinst, förlust och skatt (bostad) — Skatteverket](https://www.skatteverket.se/privat/fastigheterochbostad/forsaljningavbostad/raknautvinstforlustochskatt)
- [Swedish withholding tax on dividends — Skatteverket](https://www.skatteverket.se/servicelankar/otherlanguages/inenglishengelska/businessesandemployers/nonestablishedforeignbusinesses/swedishwithholdingtasondividends.4.34a801ea1041d54f9e28000452.html)
- [Sweden - Individual - Income determination — PwC](https://taxsummaries.pwc.com/sweden/individual/income-determination)
- [Sweden - Individual - Other taxes — PwC](https://taxsummaries.pwc.com/sweden/individual/other-taxes)
- [Sweden - Individual - Residence — PwC](https://taxsummaries.pwc.com/sweden/individual/residence)
- [Automatisk avräkning av utländsk skatt — Skatteverket](https://www.skatteverket.se/privat/internationellt/avrakningavutlandskskatt/automatiskavrakningavutlandskskatt.4.3684199413c956649b512df5.html)
- [Om aktier — Skatteverket](https://www.skatteverket.se/privat/skatter/vardepapper/omaktier.4.50a6b4831275a0376d380001915.html)
- [Sweden - Corporate - Tax credits and incentives — PwC](https://taxsummaries.pwc.com/sweden/corporate/tax-credits-and-incentives)
- [Sweden - Corporate - Taxes on corporate income — PwC](https://taxsummaries.pwc.com/sweden/corporate/taxes-on-corporate-income)
- [Qasa - houses for rent, Stockholm area](https://qasa.com/se/en/find-home?homeTypes=house&minRoomCount=5&searchAreas=Stockholm%7E%7Ese)
- [Stockholm International School - School fees](https://stockholmis.se/admissions/school-fees/)
- Sweden - Corporate - Income determination, PwC: https://taxsummaries.pwc.com/sweden/corporate/income-determination
- Investeringssparkonto (ISK), Skatteverket: https://www.skatteverket.se/privat/skatter/vardepapper/investeringssparkontoisk.4.5fc8c94513259a4ba1d800037851.html

#### Change log
- 2026-10-15: initial research.
- 2026-10-15: data-quality pass: added prime rent (Qasa, Danderyd/Lidingö houses, SEK 55,000/month); school fee now from Stockholm International School's own page (SEK 191,500, Grades 11-12, 2026-27); added duration_note to the ISK regime.
- 2026-10-15: holding-structure review: no structure added (AB vs ISK explained); holding_company_notes updated.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept (SEK 55,000).
- 2026-10-16: recipe pass: added the `holding_ab` structure regime (20.6% in the AB, 25% on payout); ISK allowance set to SEK 600,000 for the couple and the foreign-withholding credit switched on (Skatteverket automatic credit).


## Residence and succession sources

- [European e-Justice: Succession, Sweden](https://e-justice.europa.eu/166/EN/succession?SWEDEN&member=1) — European e-Justice Portal
- [Regulation (EU) No 650/2012 on succession](https://eur-lex.europa.eu/eli/reg/2012/650/oj) — European Union
- [HCCH status table: Convention of 1 July 1985 on the Law Applicable to Trusts and on their Recognition](https://www.hcch.net/en/instruments/conventions/status-table/?cid=59) — Hague Conference on Private International Law
- [Philea: Legal Environment for Philanthropy in Europe, Sweden](https://philea.eu/wp-content/uploads/2024/11/Sweden-Philea-2024-Legal-Environment-for-Philanthropy-in-Europe.pdf) — Philea
