# Guernsey — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Crown Dependency outside the UK and EU. No capital gains tax, no inheritance or gift tax, no wealth tax. Income including dividends is taxed at a flat 20%, with optional caps of £160,000 (foreign income) or £320,000 (worldwide), and a £60,000 cap for four years for newcomers buying Open Market property. A GST was approved in October 2026 (from about 2028).

## Residence and eligibility

Day-count categories: principally resident (182+ days in the year); solely resident (91+ days and not 91+ days elsewhere); resident only (91-182 days, or 35+ days with 365+ days over the previous four years). Resident-only individuals may pay a standard charge (£50,000 for 2026) instead of tax on non-Guernsey income.

- **Open Market housing** (EU, US, OTHER): Anyone may live in Part A Open Market property without a housing licence. Non-British/Irish nationals also need immigration permission under Bailiwick rules (UK-style; not researched in detail).

Standard regime eligibility: Tax residence in Guernsey. Newcomers without local housing status can generally only live in Open Market (Part A) housing.

## Capital gains

Guernsey has no capital gains tax. Gains by a resident private investor on securities, a private business or real estate are not taxed unless the activity is a trade (taxed as income at 20%).

- **rate basis**: No capital gains tax (Carey Olsen: 'no ... capital gains taxes'); income tax at 20% applies to income only.
- **important exceptions**: From 2026, repayments of non-commercial shareholder loans from personal investment companies are treated as dividends (anti-avoidance).
- **professional trader**: Dealing in shares or land as a trade is taxed as income at 20%; Guernsey property development profits are taxed at 20%.
- **holding period rules**: None.
- **foreign assets**: Foreign gains are equally untaxed.
- **JSON values**: `{"headline_rate": 0.0, "rates": {"listed_securities_domestic": 0.0, "listed_securities_foreign": 0.0, "private_business_sale": 0.0, "real_estate_local": 0.0, "real_estate_foreign": 0.0}}`
- **Confidence / verification**: high / partially_verified (tax year 2026)

## Dividends

Dividends are taxed as income at a flat 20%. Guernsey companies paying dividends to resident individuals deduct tax at source up to 20% (20% if the company paid 0%). Residents can elect tax caps (see special regimes).

- **rate basis**: Flat 20% income tax rate on net income after allowances (PwC). Personal allowance £15,200 for 2026, withdrawn above £85,000 of income.
- **exemptions thresholds**: Personal allowance £15,200 (2026), withdrawn from £85,000 of income.
- **withholding outbound**: 0% withholding on dividends to non-residents under domestic law; dividends to Guernsey-resident individuals carry a deduction making up tax to 20%.
- **treaty network**: 14 comprehensive double tax agreements (incl. UK, Jersey, Isle of Man, Luxembourg, Malta, Cyprus, Singapore, Hong Kong); no US income tax treaty, so US dividends suffer 30% US withholding. Foreign tax relieved by credit.
- **JSON values**: `{"headline_rate": 0.2, "domestic_rate": 0.2, "foreign_gross_rate": 0.2, "foreign_tax_credit": "credit"}`
- **Confidence / verification**: high / verified (tax year 2026)
- **Open question**: Credit relief mechanics for non-treaty source countries not verified from Revenue Service guidance.

## Inheritance and gifts to children

No inheritance, estate or gift tax. A probate registry fee applies to personal (movable) estate: £225 up to £80,000 plus £50 per further £10,000 (0.5%), capped at £250,000 for estates above about £50m. Worldwide personal estate counts if no grant has been taken elsewhere.

- **exemptions thresholds**: Probate fee 0.5% of gross personal estate (Mourant, Feb 2026), capped at £250,000. Guernsey real property is outside the grant. Older guides (Carey Olsen 2020) show £35 per £10,000 (0.35%), so the scale has risen.
- **important exceptions**: Lifetime gifts attract no fee, and assets already covered by a foreign grant are valued on the Guernsey estate only.
- **foreign assets**: Worldwide movable estate counts for the probate fee unless probate has been obtained in another jurisdiction.
- **gift tax**: No gift tax.
- **domicile rules**: No tax, so no domicile test for tax. Families arriving from the UK remain within UK IHT under the residence-based test from 6 April 2025 for up to 10 years after leaving, depending on years of UK residence.
- **JSON values**: `{"basis": "none", "children_treatment": "fully_exempt", "exemption": 0, "other_transfer_cost_rate": 0.005, "gifts_same_as_inheritance": false}`
- **Confidence / verification**: medium / partially_verified (tax year 2026)
- **Open question**: Official Probate Registry fee schedule not located; figures from Mourant guide dated 27 Feb 2026.

## Wealth tax

No wealth tax or net worth tax.

- **property tax note**: Tax on Real Property (TRP) is an annual property tax based on property size and use (not a wealth tax). Document duty applies to property purchases; the extra 2% on second/buy-to-let properties was removed in the 2026 Budget.
- **JSON values**: `{"type": "none"}`
- **Confidence / verification**: high / verified (tax year 2026)

## Special regimes

### Income tax cap (`tax_cap`)

A Guernsey resident can elect to cap income tax on non-Guernsey-source income (including Guernsey bank interest) at £160,000 a year, or on worldwide income at £320,000 a year (2026, unchanged since 2024). Guernsey property income is taxed at 20% on top. Since 2023 each spouse elects individually.

- **Eligibility**: Any Guernsey-resident individual, by annual election. Worthwhile when 20% of foreign income exceeds £160,000 (about £800,000 of income).
- **Duration (years)**: indefinite
- **Why it does not expire**: No time limit: any Guernsey resident can claim the cap each year under sections 39B-39E and the Sixth Schedule of the Income Tax (Guernsey) Law, 1975 (gov.gg tax cap page). The cap amounts are set in each annual Budget; it is apportioned in the year of arrival or departure.
- **Lump sum / cap in JSON**: 160,000 GBP a year, covers foreign_dividends, foreign_capital_gains, foreign_income_all. £160,000 is a maximum, not a fixed charge: tax is the lower of 20% of non-Guernsey income and the cap. The £320,000 cap covers worldwide income. Per individual since independent taxation in 2023 (couple: up to £320,000 on foreign income).

**Dividends under this regime:** Once the £160,000 cap binds, further foreign dividends carry no Guernsey tax. Guernsey-source dividends stay at 20% unless the £320,000 worldwide cap is chosen.

- **rate basis**: Marginal rate 0% on foreign income above the cap threshold; cap modelled as the lump sum.
- **withholding outbound**: 0% on dividends to non-residents.
- **treaty network**: As standard regime.
- **JSON values**: `{"headline_rate": 0.0, "domestic_rate": 0.2, "foreign_gross_rate": 0.0, "foreign_tax_credit": "not_applicable"}`
- **Confidence / verification**: high / verified (tax year 2026)

### Open Market new-resident tax cap (`open_market_cap`)

A newcomer who buys an Open Market (Part A) property with at least £50,000 of document duty can cap income tax on worldwide income (except Guernsey property income) at £60,000 a year for the arrival year and the following three years. After that the ordinary caps apply.

- **Eligibility**: Not Guernsey resident in the previous three years; purchase of a Part A Open Market property within 12 months of becoming resident, paying at least £50,000 document duty (roughly a £1.3m+ property).
- **Duration (years)**: 4
- **Lump sum / cap in JSON**: 60,000 GBP a year, covers foreign_dividends, foreign_capital_gains, foreign_income_all, domestic_income. Maximum, not a fixed charge. Guernsey land and property income excluded (taxed at 20%). Amount £60,000 since 2024, unchanged for 2026. A June 2026 proposal by Innovate Guernsey to raise it has not been adopted as far as found.

**Dividends under this regime:** During the four capped years, dividends above about £300,000 of income carry no further Guernsey tax because total tax is capped at £60,000.

- **rate basis**: Marginal rate 0% once 20% of income exceeds £60,000.
- **withholding outbound**: 0% on dividends to non-residents.
- **treaty network**: As standard regime.
- **JSON values**: `{"headline_rate": 0.0, "domestic_rate": 0.0, "foreign_gross_rate": 0.0, "foreign_tax_credit": "not_applicable"}`
- **Confidence / verification**: high / verified (tax year 2026)

## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 0.0.

General corporate rate 0%; 10% for banking, fiduciary, fund administration and similar regulated business; 20% for Guernsey property income, utilities and large retail. Pillar Two (domestic top-up tax and multinational top-up tax) from 1 January 2025 for groups with €750m+ revenue. No withholding tax on dividends to non-residents.

## Cost of living notes

City: St Peter Port.

- **International school fee (annual, per child):** 16,995 GBP (2026). Elizabeth College (independent, Years 7-13 incl. sixth form), Upper School day fee 2026-27: £5,665 per term, £16,995 a year, from the school's fee page. Source: [Elizabeth College - School fees](https://elizabethcollege.gg/school-fees/).
- **Prime rent (monthly):** £4,875 (2026). Median of a small sample: the only 4 long-let homes with 4-5 bedrooms and a stated rent on Guernsey agency sites on 2026-10-15: Swoffers - Connaught House, St Peter Port, 4 bed, Open Market, £72,000 a year (£6,000 pcm); Confidential Instruction, St Martin's, 5 bed, Local Market, £5,000 pcm; Central Park, St Peter Port, 4 bed, Local Market, £3,850 pcm; Livingroom - Valley Lodge, Forest, 4 bed, Open Market, £4,750 pcm (let). Price-on-application listings and 3 Belle Vue (3 bed per Swoffers and Savills) excluded; Savills Guernsey had no 4+ bedroom lettings. A newly arriving family without a housing licence can rent only Open Market property (the two Open Market rents: £4,750 and £6,000). Indicative only. Sources: [Swoffers rentals](https://swoffers.co.uk/property-search?market=rentals), [Livingroom rentals](https://www.livingroomproperty.com/rent), [Savills Guernsey rentals](https://search.savills.com/gg/en/list/property-to-rent/channel-islands/guernsey).
- For scale, the official Local Market mix-adjusted average advertised rent was £2,075 a month in Q2 2025 (Guernsey Facts and Figures 2025), across all sizes. Health insurance, housekeeper and price per m² not sourced.

**Indicator overrides (non-tax scoring).** Used because the automatic World Bank/UNDP feeds have no value for this jurisdiction:
- `life_expectancy` = 83.6 (2024): Life expectancy at birth, three-year average 2022-2024, provisional (Table 1.1 and Figure 3.15). Source: [Guernsey Facts and Figures 2025](https://www.gov.gg/CHttpHandler.ashx?id=194705&p=0).
- `homicide_rate` = 0.0 (2025): The full list of recorded 'Violence Against the Person' offences for 2025 contains no murder or manslaughter; the 2024 Bailiwick Law Enforcement Annual Report's list also has none. Zero homicides on a population of about 64,000. Source: [Guernsey Police Annual Report 2025](https://www.guernsey.police.uk/CHttpHandler.ashx?id=200660&p=0).

US citizens: No US-Guernsey income tax treaty; US tax applies on worldwide income with credit for Guernsey tax. Guernsey's caps reduce the local credit available.

## Open questions

- GST: on 2 October 2026 the States carried P.2026/49 (22-17) directing a GST package with income tax and social security mitigations (reported starting rate 3%, possibly rising to 5%; supporters target 2028). No law made, no start date; income tax effects for high earners unknown (source: lookuptax.com tracking summary, not an official record).
- Non-employed residents pay social security contributions on income up to an upper limit; not modelled here.
- Cost-of-living items not sourced (no official 2026 senior fee found for Elizabeth College).

## Sources

- Probate and estate administration for Guernsey domiciliaries: <https://www.careyolsen.com/sites/default/files/CO_GSY_Probate-and-estate-administration-for-Guernsey-domiciliaries_19-5-20.pdf>
- Guernsey - Individual - Taxes on personal income: <https://taxsummaries.pwc.com/guernsey/individual/taxes-on-personal-income>
- Guernsey - Corporate - Withholding taxes: <https://taxsummaries.pwc.com/guernsey/corporate/withholding-taxes>
- Guernsey Budget 2026: <https://www.grantthorntonci.com/News-Centre/budget-responses/guernsey-budget-2026/>
- Guernsey - Individual - Other taxes: <https://taxsummaries.pwc.com/guernsey/individual/other-taxes>
- Guernsey probate (guide dated 27 February 2026): <https://www.mourant.com/news-and-views/guides/guernsey--probate>
- Tax cap (Revenue Service guidance): <https://www.gov.gg/taxcap>
- Monetary values table (income tax allowances, caps, standard charge, 2018-2024): <https://gov.gg/CHttpHandler.ashx?id=174308&p=0>
- Guernsey - Individual - Residence: <https://taxsummaries.pwc.com/guernsey/individual/residence>
- States approve GST package (P.2026/49): <https://lookuptax.com/tax-changes/guernsey/states-approve-gst-package-2026>
- Guernsey - Corporate - Taxes on corporate income: <https://taxsummaries.pwc.com/guernsey/corporate/taxes-on-corporate-income>
- Elizabeth College - School fees: <https://elizabethcollege.gg/school-fees/>
- Guernsey Facts and Figures 2025: <https://www.gov.gg/CHttpHandler.ashx?id=194705&p=0>
- Guernsey Police Annual Report 2025: <https://www.guernsey.police.uk/CHttpHandler.ashx?id=200660&p=0>
- Swoffers - Property search: rentals: <https://swoffers.co.uk/property-search?market=rentals>
- Livingroom - Rent: <https://www.livingroomproperty.com/rent>
- Savills - Properties to rent in Guernsey: <https://search.savills.com/gg/en/list/property-to-rent/channel-islands/guernsey>

## Change log

- 2026-10-15: initial research.
- 2026-10-15: data-quality pass: added Elizabeth College fee (£16,995, 2026-27); rent still not sourced; added duration_note to the tax cap; added indicator overrides: life expectancy 83.6 (Facts and Figures 2025) and homicide rate 0.0 (Guernsey Police Annual Report 2025).
- 2026-10-15 (household cost pass): added prime rent £4,875 a month, the median of the only 4 priced 4-5 bedroom long-lets on Swoffers and Livingroom (Savills had none); small sample, described as such.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
