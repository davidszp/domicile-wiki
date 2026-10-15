# United Kingdom — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary
Tax year 2026/27 (6 April 2026 - 5 April 2027). For a long-term resident wealthy family the UK is high-tax: CGT 24%, dividends up to 39.35%, inheritance tax 40% on the worldwide estate above £325,000, no annual wealth tax. Two features soften this for new arrivals: the 4-year foreign income and gains (FIG) regime (foreign income and gains untaxed in years 1-4) and the residence-based IHT test (non-UK assets outside IHT until UK resident in 10 of the previous 20 tax years). There is no passive investor visa.

## Residence and eligibility
- Statutory Residence Test, Finance Act 2013 Schedule 45. Automatic overseas tests: fewer than 16 UK days (46 if non-resident in each of the previous 3 years), or full-time work abroad with fewer than 91 days. Automatic UK tests: 183+ days, or only home in the UK (91+ consecutive days, used 30+ days in the year). Otherwise the sufficient-ties test (family, accommodation, work, 90-day and country ties against day counts).
- Immigration: Tier 1 Investor visa closed in 2022, no replacement. Innovator Founder visa needs an endorsed business plan (£1,000 endorsement, check-points at 12 and 24 months), dependants allowed, settlement after 3 years. Since Brexit EU citizens need a visa (Irish citizens excepted). An invitation-only investor visa was reported in the press in 2026 but is not announced and is not recorded.

## Capital gains
- Rates from 6 April 2025, unchanged for 2026/27: 18% within the basic-rate band, 24% above, same for shares and residential property. JSON: all asset classes 0.24, headline 0.24.
- Annual exempt amount £3,000. Business Asset Disposal Relief and Investors' Relief rise from 14% to 18% on 6 April 2026 (£1m lifetime limit each). Carried interest moves into income tax from 6 April 2026.
- Arising basis on worldwide gains; remittance basis abolished from 6 April 2025.
- Gifts are disposals at market value (no CGT-free lifetime gifting of appreciated shares); death gives a tax-free uplift. 5-year temporary non-residence rule.
- Trading risk: badges of trade; frequent dealing can be taxed as income (45% + NIC).

## Dividends
- From 6 April 2026 (Budget 2025, Finance Bill 2025-26): 10.75% ordinary, 35.75% upper, 39.35% additional (unchanged). Dividend allowance £500. JSON: domestic and foreign 0.3935, foreign withholding credited.
- Savings (interest) rates 20/40/45% in 2026/27, rising to 22/42/47% from 6 April 2027 (announced, legislated per HMRC technical note) - relevant for bonds.
- No UK withholding on dividends paid by UK companies (REIT/PAIF PIDs 20%, 22% from April 2027). Treaty network about 120 territories (PwC).

## Inheritance and gifts to children
- Inheritance Tax Act 1984. Rate 40% above the £325,000 nil-rate band (frozen to 5 April 2031). Residence nil-rate band £175,000 tapers away above a £2m estate. JSON: basis estate, exemption 325,000, bracket 0.40 from 0, children taxed.
- Scope from 6 April 2025 (Finance Act 2025 s.44, new IHTA ss.6A-6C): long-term UK resident = UK resident in at least 10 of the previous 20 tax years; worldwide assets in scope. Tail after leaving: 3 years (10-13 years' residence) rising to 10 years (20 years). Ten consecutive non-resident years reset the count. Non-long-term residents: UK-situs assets only.
- Gifts: potentially exempt transfers, tax-free if the donor survives 7 years; taper 32/24/16/8% for years 3-7. Annual exemption £3,000; gifts out of surplus income unlimited. Most trust gifts 20% immediately.
- Business/Agricultural Property Relief from 6 April 2026: 100% relief up to a combined £2.5m per person (first announced as £1m in October 2024, raised 23 December 2025), transferable to a spouse (£5m per couple), 50% above. AIM and other non-'listed' market shares 50% relief. Listed portfolio shares get no relief (JSON: business_relief_covers_public_shares false).
- Pensions: unused pension funds and most death benefits enter the estate from 6 April 2027 (Finance Act 2026).
- Probate fee £526 for estates over £5,000 (JSON other_transfer_cost_rate 0).

## Wealth tax
None (JSON type none). Council tax is a modest per-dwelling charge. Announced: High Value Council Tax Surcharge in England from April 2028 for homes valued at £2m+ in 2026: £2,500 / £3,500 / £5,000 / £7,500 by band (£2-2.5m, £2.5-3.5m, £3.5-5m, £5m+), CPI-indexed from 2029-30; not in force, final legislation not seen. Transaction taxes: SDLT up to 12% (17% second homes, +2% non-resident), 0.5% stamp duty/SDRT on UK share purchases.

## Special regimes
4-year FIG regime (JSON id fig_4_year, duration 4): for individuals in their first 4 tax years of UK residence after at least 10 consecutive years of non-residence, from 2025/26. Claimed foreign income and gains (foreign dividends, interest, foreign capital gains, overseas trade/property profits) are not taxed and can be brought into the UK. Claim per year and per source in the return; no carry-forward; claimants lose the personal allowance and CGT annual exempt amount. UK-source income and gains are taxed normally. JSON: foreign listed securities and foreign real estate 0.0; foreign dividends 0.0; domestic items unchanged. Inheritance override explains that new arrivals are outside IHT on non-UK assets until long-term resident (about 10 years). Temporary Repatriation Facility (12% for 2025/26 and 2026/27, 15% for 2027/28) only for pre-April-2025 foreign income/gains of former remittance-basis users.

## Holding structures

**Structure modelled: family investment company (FIC), regime id `family_investment_company`.**

- **Corporation tax:** a FIC is normally a close investment-holding company, so it pays the **25%** main rate on all
  taxable profits; it cannot use the 19% small profits rate or marginal relief (GOV.UK, Marginal Relief). Gains on
  portfolio shares are taxable at 25%, one point above personal CGT (24%); no indexation for assets acquired from
  2018. The substantial shareholding exemption covers 10%+ stakes in trading companies (JSON private business 0).
  Interest is taxed at 25% (against 45%, 47% from April 2027, for individuals).
- **Dividends received:** exempt under CTA 2009 Part 9A: distributions on non-redeemable ordinary shares (s.931F)
  and portfolio holdings under 10% (s.931G). Foreign withholding tax on exempt dividends is a final cost. JSON:
  dividends 0, `exemption`.
- **Payout:** dividends to individuals in 2026/27 at 10.75% / 35.75% / 39.35% after a GBP 500 allowance (GOV.UK).
  `payout_tax_rate` 0.3935 assumes additional-rate parents. In practice FICs are funded with an interest-free loan
  repayable on demand, and repaying it is tax-free, so withdrawals can be untaxed for many years (ICAEW). Dividends
  can be steered to adult children through alphabet shares, subject to the settlements legislation.
- **Inheritance (not representable in the metric, which stays at the standard 40%):** parents keep voting or
  freezer shares fixed at today's value while children hold growth shares that take value above a hurdle, so growth
  accrues outside the parents' estates (Geldards). Gifts of shares are potentially exempt transfers (free after 7
  years); funds put into the FIC are not PETs in themselves, and a loan repayable on demand avoids a transfer of
  value. No business property relief: an investment company's shares are not relevant business property (IHTA 1984
  s.105(3)). Watch IHTA s.98 (altering share rights), s.3(3) (not exercising dividend rights) and gifts with
  reservation. FIC shares are UK-situs, so they are in the IHT net even before the family becomes long-term
  resident, unlike a foreign custody portfolio of a new arrival.
- **Getting assets in:** transferring shares in is a disposal at market value between connected persons (24% CGT);
  FICs are funded with cash. New arrivals can realise foreign gains tax-free in their FIG years, then fund the FIC.
- **Exit and liquidation:** liquidation distributions are capital (24% CGT, no BADR; TAAR in ITTOIA s.396B). The UK
  has no exit tax on individuals; dividends to non-residents bear no UK withholding, but the 5-year temporary
  non-residence rule catches close-company distributions. Moving the company's management abroad triggers a
  corporate exit charge.
- **Comparison for this family (illustrative, app profile):** dividend tax falls from about EUR 155k (39.35% less
  15% foreign withholding credited) to nil, but gains cost EUR 12k more and the foreign withholding is lost; with a
  EUR 400k payout taxed as dividends (EUR 157k) the FIC is slightly worse on annual tax than direct holding (about
  EUR 457k against EUR 443k). Its advantages are those the annual score does not show: tax-free extraction by loan
  repayment, 25% instead of 45-47% on bond interest, and IHT savings from growth shares.
- **Running costs:** not sourced (omitted). Annual accounts and CT600 required; small companies are usually audit-exempt.
- **US citizens:** excluded (US CFC/PFIC rules).

## Company taxation (kept separate from personal tax)
Corporation tax 25% main rate (profits above £250,000), 19% small profits rate (below £50,000), marginal relief between. Distribution exemption for most dividends received; substantial shareholding exemption for trading subsidiaries. No dividend withholding tax.

## Cost of living notes

City: London.

- **Prime rent (monthly):** 12,500 GBP (2026). Median asking rent of 123 4-5 bedroom homes (houses and large flats) to let in the Royal Borough of Kensington and Chelsea on Rightmove on 2026-10-15, weekly rents converted at x52/12 (interquartile range £8,500-£15,167 pcm; 312 listings in total, newest first). Source: [Rightmove - 4-5 bedroom property to rent in Kensington and Chelsea](https://www.rightmove.co.uk/property-to-rent/find.html?locationIdentifier=REGION%5E61229&minBedrooms=4&maxBedrooms=5&sortType=6).
- **International school fee (annual, per child):** 39,960 GBP (2026). ACS International School Cobham (Surrey, London commuter belt), Grade 12 day tuition 2026-27, VAT included (20% VAT on private school fees since January 2025). Source: [ACS International Schools - Cobham school fees 2026-27](https://www.acs-schools.com/cobham/wp-content/uploads/sites/2/2026/03/ACS-2026-27-VAT-FeeSheets-Cob.pdf).
- Health insurance, housekeeper and price per m² not sourced. The school fee is for a Surrey international school; central London day schools charge similar or higher fees.

## Open questions
- A possible invitation-only investor visa was reported in 2026 but not announced; not included.
- Savings income rates rise to 22/42/47% from 6 April 2027 (Budget 2025) - matters for bond-heavy portfolios.
- Prime London rent and price per m² not sourced.
- The app's single rate cannot show that a newly arrived family's non-UK assets fall outside IHT for roughly their first 10 years of residence; scored here as the long-term-resident position.
- High Value Council Tax Surcharge: final legislation not yet seen; rates are from the Budget 2025 policy paper.

## Sources
- Capital Gains Tax: what you pay it on, rates and allowances: https://www.gov.uk/capital-gains-tax/rates
- Budget 2025: Overview of tax legislation and rates (OOTLAR), Annex A: rates and allowances: https://www.gov.uk/government/publications/budget-2025-overview-of-tax-legislation-and-rates-ootlar/annex-a-rates-and-allowances
- United Kingdom: Individual - Income determination (last reviewed 23 July 2026): https://taxsummaries.pwc.com/united-kingdom/individual/income-determination
- Tax on dividends: https://www.gov.uk/tax-on-dividends
- Change to tax rates for property, savings and dividend income: technical note: https://www.gov.uk/government/publications/changes-to-tax-rates-for-property-savings-and-dividend-income/change-to-tax-rates-for-property-savings-and-dividend-income-technical-note
- United Kingdom: Individual - Other taxes (last reviewed 23 July 2026): https://taxsummaries.pwc.com/united-kingdom/individual/other-taxes
- High Value Council Tax Surcharge: https://www.gov.uk/government/publications/high-value-council-tax-surcharge/high-value-council-tax-surcharge
- Inheritance Tax if you're a long-term UK resident: https://www.gov.uk/guidance/inheritance-tax-if-youre-a-long-term-uk-resident
- Inheritance Tax Act 1984, section 6A (long-term UK resident), inserted by Finance Act 2025 s.44: https://www.legislation.gov.uk/ukpga/1984/51/section/6A
- Inheritance Tax: gifts (7-year rule, taper relief, exemptions): https://www.gov.uk/inheritance-tax/gifts
- Business Relief for Inheritance Tax: what qualifies: https://www.gov.uk/business-relief-inheritance-tax/what-qualifies-for-business-relief
- Changes to Agricultural Property Relief and Business Property Relief (policy paper): https://www.gov.uk/government/publications/changes-to-agricultural-property-relief-and-business-property-relief
- Inheritance Tax on pensions: technical note: https://www.gov.uk/government/publications/inheritance-tax-on-pensions-technical-note
- Applying for probate: fees: https://www.gov.uk/applying-for-probate/fees
- Check if you can claim the 4-year foreign income and gains regime: https://www.gov.uk/guidance/check-if-you-can-claim-the-4-year-foreign-income-and-gains-regime
- United Kingdom: Individual - Taxes on personal income (last reviewed 23 July 2026): https://taxsummaries.pwc.com/united-kingdom/individual/taxes-on-personal-income
- Tax on foreign income: work out your residence status: https://www.gov.uk/tax-foreign-income/residence
- RDR3: Statutory Residence Test (SRT): https://www.gov.uk/government/publications/rdr3-statutory-residence-test-srt
- Innovator Founder visa: https://www.gov.uk/innovator-founder-visa
- United Kingdom: Corporate - Taxes on corporate income (last reviewed 23 July 2026): https://taxsummaries.pwc.com/united-kingdom/corporate/taxes-on-corporate-income
- United Kingdom: Corporate - Withholding taxes (last reviewed 23 July 2026): https://taxsummaries.pwc.com/united-kingdom/corporate/withholding-taxes
- ACS International Schools - Cobham school fees 2026-27: https://www.acs-schools.com/cobham/wp-content/uploads/sites/2/2026/03/ACS-2026-27-VAT-FeeSheets-Cob.pdf
- [Rightmove - 4-5 bedroom property to rent in Kensington and Chelsea](https://www.rightmove.co.uk/property-to-rent/find.html?locationIdentifier=REGION%5E61229&minBedrooms=4&maxBedrooms=5&sortType=6)
- Marginal Relief for Corporation Tax (GOV.UK): https://www.gov.uk/guidance/corporation-tax-marginal-relief
- Tax on dividends (GOV.UK): https://www.gov.uk/tax-on-dividends
- United Kingdom - Corporate - Income determination (PwC): https://taxsummaries.pwc.com/united-kingdom/corporate/income-determination
- Corporation Tax Act 2009, section 931F: https://www.legislation.gov.uk/ukpga/2009/4/section/931F
- Corporation Tax Act 2009, section 931G: https://www.legislation.gov.uk/ukpga/2009/4/section/931G
- Inheritance Tax Act 1984, section 105: https://www.legislation.gov.uk/ukpga/1984/51/section/105
- Why you should take care with family investment companies (ICAEW): https://www.icaew.com/technical/tax/tax-faculty/taxline/articles/2025/why-you-should-take-care-with-family-investment-companies
- How Family Investment Companies use Growth and Freezer Shares (Geldards): https://www.geldards.com/insights/how-family-investment-companies-use-growth-and-freezer-shares-for-smarter-wealth-planning/

## Change log
- 2026-10-15: initial research.
- 2026-10-15: data-quality pass: added prime rent (Rightmove, Kensington and Chelsea 4-5 bedrooms, £12,500/month); re-verified on GOV.UK the 2026/27 dividend rates (10.75/35.75/39.35%) and the £2.5m APR/BPR allowance (transferable to a spouse) and added the transfer to the JSON; stated that the FIG regime is not remittance-based.
- 2026-10-15: inheritance scope set to local assets only for fig_4_year in the structured data (a new arrival is not a long-term UK resident during the 4-year FIG period, so non-UK assets are outside inheritance tax); previously the scoring applied the rates to the worldwide estate, which overstated the tax.
- 2026-10-15: added the family investment company structure regime (`family_investment_company`) and the Holding structures section; holding_company_notes updated.
