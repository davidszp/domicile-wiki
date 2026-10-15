# New Zealand — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026/27
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

New Zealand has no general capital gains tax, no inheritance, estate or gift tax and no net wealth tax, but a resident holding more than NZD 50,000 (cost) of foreign shares is taxed under the foreign investment fund (FIF) rules: normally 5% of the opening market value is deemed income (fair dividend rate), taxed at up to 39%, i.e. about 1.95% of the portfolio's value a year whatever the actual return (individuals may use the actual total return instead when it is lower, never below zero). Dividends and gains on those shares are not taxed separately. New residents get a once-only 4-year transitional-resident exemption on most foreign investment income, and since 2025 some new migrants can elect a realisation-based revenue account method (dividends plus 70% of gains), which US citizens can apply to all their foreign shares. Gains on residential property sold within 2 years (bright-line test) or on assets bought for resale are taxed.

US citizens: US citizens are taxed by the US on worldwide gains and dividends; the FIF deemed income can create a timing mismatch with US realisation-based taxation and foreign tax credit problems. The extended revenue account method (from 2025) lets eligible US citizens who arrived on or after 1 April 2024 after 5 years abroad tax all foreign shares on realisation (dividends + 70% of gains), which aligns better with US timing. The transitional resident exemption also applies.

## Residence and eligibility

Resident with a permanent place of abode in New Zealand (even if also elsewhere), or after more than 183 days in any 12-month period (backdated to the first day). Ceases after more than 325 days' absence in a 12-month period without a permanent place of abode.

- **Active Investor Plus resident visa - Growth** (EU, US, OTHER): Invest at least NZD 5 million in acceptable growth investments for 36 months; 21 days in New Zealand over the period (reducible). Partner and dependent children up to 24 included. Minimum investment: 5,000,000 NZD.
- **Active Investor Plus resident visa - Balanced** (EU, US, OTHER): Invest at least NZD 10 million in acceptable investments for 60 months; 105 days in New Zealand over the period (reducible with extra growth investment). Family included as above. Minimum investment: 10,000,000 NZD.

## Capital gains

### Standard regime

No comprehensive capital gains tax. Gains are taxed only where property was acquired for the purpose of disposal, in a profit-making scheme, by dealers, or on residential land sold within the 2-year bright-line period (main home excluded). Gains on foreign shares are not taxed on sale for a resident above the FIF threshold because the FIF regime taxes a deemed 5% return each year instead (recorded under wealth_tax).

- **Exemptions and thresholds:** Bright-line test: residential land disposed of within 2 years of acquisition (disposals on or after 1 July 2024; previously up to 10 years). Main home exclusion.
- **Important exceptions, statute references and announced changes:** Income Tax Act 2007 s CB 3/CB 4: gains on personal property (including shares) acquired with a dominant purpose of disposal are taxable at marginal rates. Financial arrangements (bonds, foreign-currency deposits) are taxed on accrual including FX gains. FIF holders leaving New Zealand are deemed to dispose of FIF interests at market value for FIF purposes.
- **Tax year / confidence / verification:** 2026/27 / high / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 0% (0.0); listed domestic 0% (0.0); listed foreign 0% (0.0); private business sale 0% (0.0); local real estate 0% (0.0); foreign real estate 0% (0.0).
- **How derived:** No CGT for a long-term investor without a purpose of resale; local real estate outside the 2-year bright-line period. Foreign listed shares: 0% on sale because the FIF FDR method (modelled as a 1.95% annual levy in wealth_tax) replaces taxation of gains and dividends.
- **Holding period:** 2-year bright-line for residential land; no holding rule for shares.
- **Trader recharacterisation:** Share or property dealers, and anyone who acquired an asset for the dominant purpose of resale, are taxed on gains at marginal rates up to 39%. Purpose is a factual test; frequent trading is a risk.
- **Foreign assets:** Foreign shares above NZD 50,000 total cost: FIF regime (see wealth_tax). ASX-listed Australian resident companies that keep a franking account are exempt from FIF; their dividends are taxed, gains are not.

### Transitional resident (4-year exemption) (special regime)

Foreign-source gains (e.g. on foreign shares) are exempt during the transitional period; New Zealand-source gains taxed as for residents (generally none).

- **Tax year / confidence / verification:** 2026/27 / high / verified (checked 2026-10-15)
- **JSON numbers:** headline 0% (0.0); listed domestic 0% (0.0); listed foreign 0% (0.0); private business sale 0% (0.0); local real estate 0% (0.0); foreign real estate 0% (0.0).
- **How derived:** Foreign-source income and FIF income exempt during the 4-year period; domestic gains as standard.

### Revenue account method for new migrants (extended RAM for foreign citizens taxed abroad, e.g. US citizens) (special regime)

Gains on RAM foreign shares are taxed on sale at 70% x marginal rate = 27.3% at the 39% rate; losses only offset RAM gains/dividends.

- **Tax year / confidence / verification:** 2026/27 / high / verified (checked 2026-10-15)
- **JSON numbers:** headline 27.3% (0.273); listed domestic 0% (0.0); listed foreign 27.3% (0.273); private business sale 0% (0.0); local real estate 0% (0.0); foreign real estate 0% (0.0).
- **How derived:** 0.7 x realised gain x 39% = 27.3% on foreign shares under RAM; other assets as standard.

## Dividends

### Standard regime

New Zealand dividends carry imputation credits (company rate 28%); a top-rate shareholder pays 39% on the grossed-up dividend less the credit, about 15.3% of a fully imputed cash dividend. Foreign dividends on FIF interests valued under the FDR method are not taxed separately (the 5% deemed return replaces them). Below the NZD 50,000 de minimis, foreign dividends are taxed at up to 39% with a foreign tax credit.

- **Exemptions and thresholds:** FIF de minimis: total cost of attributing foreign interests NZD 50,000 or less.
- **Important exceptions, statute references and announced changes:** Australian franking credits are not usable in New Zealand. Foreign tax credits are limited to the treaty rate (e.g. 15%).
- **Tax year / confidence / verification:** 2026/27 / high / verified (checked 2026-10-15)
- **JSON numbers:** headline 39% (0.39); domestic 15.3% (0.153); foreign gross 0% (0.0); foreign tax relief: credit.
- **How derived:** Domestic: fully imputed dividend D, taxable D/0.72, tax 39% x D/0.72 = 0.542D less credit 0.389D = 0.153D. Foreign: 0 because under FDR the dividends are subsumed in the 5% deemed return taxed under wealth_tax (1.95% of value); source WHT is credited against the FIF tax. A small portfolio (under NZD 50,000 cost) would pay 39% on foreign dividends instead.
- **Outbound withholding:** NRWT on dividends: 0% on fully imputed dividends to 10%+ holders, 15% on fully imputed cash dividends to portfolio holders, 30% otherwise (treaty-reduced).
- **Treaty network:** About 41 treaties (PwC table), including the US (15% portfolio dividends), Australia, UK and major EU states.
- **Holding companies:** Company tax 28% with imputation. A New Zealand company holding the foreign portfolio pays FIF tax at 28% instead of 39% and is modelled as the 'investment_company' structure regime. Portfolio investment entities (PIEs) cap investor tax at 28% with no further tax on distributions, but a family cannot normally set up its own PIE (investor-number and other eligibility rules), so this applies to investing through public PIE funds rather than to a family vehicle.

### Transitional resident (4-year exemption) (special regime)

Foreign dividends need not be declared and the FIF rules do not apply during the transitional period. NZ dividends taxed as standard.

- **Tax year / confidence / verification:** 2026/27 / high / verified (checked 2026-10-15)
- **JSON numbers:** headline 39% (0.39); domestic 15.3% (0.153); foreign gross 0% (0.0); foreign tax relief: exemption.
- **How derived:** Foreign dividends exempt; domestic imputed dividends 15.3% of cash at the 39% rate.

### Revenue account method for new migrants (extended RAM for foreign citizens taxed abroad, e.g. US citizens) (special regime)

Dividends on RAM shares are taxed when received at marginal rates (39% top) with a foreign tax credit.

- **Tax year / confidence / verification:** 2026/27 / high / verified (checked 2026-10-15)
- **JSON numbers:** headline 39% (0.39); domestic 15.3% (0.153); foreign gross 39% (0.39); foreign tax relief: credit.
- **How derived:** Dividends derived x 39% marginal rate; source WHT credited.

## Inheritance and gifts to children

### Standard regime

No inheritance, estate or gift tax. Estate duty was abolished in 1992 and gift duty in 2011 (gift-duty date from general knowledge, not verified from an opened source). Transfers to children are tax-free; for FIF shares the heirs simply continue under the FIF rules.

- **Exemptions and thresholds:** No tax of any amount.
- **Important exceptions, statute references and announced changes:** Inherited residential land is generally outside the bright-line test for the heir (general rule; not verified). Trusts: trustee income tax rate 39% from 2024/25 (not verified in this session).
- **Tax year / confidence / verification:** 2026/27 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** basis `none`, children `fully_exempt`, exemption 0 NZD, brackets (marginal): none; other transfer costs 0% (0.0).
- **Gifts:** None (gift duty abolished). (same as inheritance: True; tax-free after years: None)
- **Foreign assets:** No tax.
- **Residence/domicile rules:** Not applicable.
- **Business relief covers listed shares:** False

Open points for this tax: Official confirmation of the estate duty (1992) and gift duty (2011) abolition dates was not obtained: the legislation site returned HTTP 403 and PwC's page does not mention them.

## Wealth tax

### Standard regime

No net wealth tax. However, the FIF fair dividend rate method taxes 5% of the opening market value of foreign shares each year as income (39% top rate = about 1.95% of value), regardless of actual dividends or gains. It is recorded here as a limited levy on foreign financial assets because economically it works like one.

- **Exemptions and thresholds:** Applies only if the total cost of foreign attributing interests exceeds NZD 50,000 at any time in the year. Exempt: ASX-listed Australian-resident companies with franking accounts. Individuals and eligible family trusts may instead pay on the actual total return (comparative value) when it is lower than 5%, and the portfolio total cannot go below zero.
- **Important exceptions, statute references and announced changes:** Statutory basis: Income Tax Act 2007 subpart EX (FIF rules), FDR method. Budget 2026 proposes extending the revenue account method (realisation basis) to all residents (per PwC, July 2026; not yet law).
- **Tax year / confidence / verification:** 2026/27 / high / verified (checked 2026-10-15)
- **JSON type:** `limited`
- **Component FIF fair dividend rate (5% deemed return taxed at 39%):** base `financial_assets_foreign`, allowance 0 NZD, entry threshold 50,000 NZD, brackets (marginal): from 0 NZD: 1.95% (0.0195). Threshold is on total cost, not value. Rate = 5% x 39% top marginal rate. Foreign source dividend WHT is creditable against it. In loss or low-return years individuals can pay on the actual return (comparative value), floor zero.
- **Property tax (not a wealth tax):** Local council rates on land based on rateable value. No stamp duty on property. Residential land withholding tax applies to offshore sellers within the bright-line period.

### Transitional resident (4-year exemption) (special regime)

No FIF income during the transitional period, so no deemed-return levy on foreign shares.

- **Tax year / confidence / verification:** 2026/27 / high / verified (checked 2026-10-15)
- **JSON type:** `none`

### Revenue account method for new migrants (extended RAM for foreign citizens taxed abroad, e.g. US citizens) (special regime)

RAM shares are taken out of the FDR deemed-return charge.

- **Tax year / confidence / verification:** 2026/27 / high / verified (checked 2026-10-15)
- **JSON type:** `none`

## Special regimes

- **Transitional resident (4-year exemption)** (`transitional_resident`; EU, US, OTHER; duration 4 years): New migrants and New Zealanders returning after 10 years are exempt for about 4 years on most foreign income: foreign interest, dividends, FIF income, rent and gains. Foreign employment and personal-services income is not exempt. Eligibility: Became tax resident on or after 1 April 2006, not tax resident at any time in the previous 10 years, never transitional before. Ends 4 years after the end of the month of qualifying, or earlier on opting out (e.g. claiming Working for Families credits). Automatic; opting out is irrevocable.
  - Metrics that differ from standard: capital_gains, dividends, wealth_tax (details in the tax sections above).
- **Revenue account method for new migrants (extended RAM for foreign citizens taxed abroad, e.g. US citizens)** (`revenue_account_method`; US; duration indefinite): From 1 April 2025, eligible new residents may elect to tax qualifying FIF shares on a realisation basis: dividends at marginal rates plus 70% of realised gains. Under 'extended RAM' it applies to all foreign shares of a person who remains liable to tax on their disposal in another country by citizenship or right to live there (in practice US citizens). Leaving New Zealand triggers a deferred deemed disposal for 3 years. Eligibility: Natural person (or family trust whose principal settlor qualifies) who became resident (not transitional) on or after 1 April 2024 after at least five years of non-residence. Without the extended rule RAM covers only unlisted foreign shares acquired before arrival, so for a listed portfolio it is relevant mainly to US citizens.
  - Why no fixed duration: RAM is an election, not a time-limited concession: once a qualifying migrant elects it, it keeps applying to the elected FIF interests while the person remains resident; it ends only on leaving New Zealand (deemed disposal, deferred for 3 years).
  - Metrics that differ from standard: capital_gains, dividends, wealth_tax (details in the tax sections above).

## Holding structures

### New Zealand investment holding company (structure regime `investment_company`)

**What it is.** A New Zealand limited company holds the foreign portfolio. Eligible: EU and OTHER after the 4-year transitional-resident period; not US persons (PFIC/CFC) and not a substitute for the revenue account method, which only natural persons and family trusts can elect.

**Rates.** FIF rules apply to companies as to individuals, but at the 28% company rate (PwC): 5% fair dividend rate x 28% = 1.4% of opening value a year (JSON wealth_tax component, financial_assets_foreign, rate 0.014, no entry threshold) instead of 1.95% personally. Companies cannot use the comparative value method in low-return years and have no NZD 50,000 de minimis (IR461: the CV option is for individuals and eligible trusts). Capital gains: none (JSON 0 throughout; dealer/purpose test still applies). Dividends: foreign portfolio dividends are covered by FIF (JSON foreign_gross 0, credit); fully imputed NZ dividends bear no further company tax (JSON domestic 0).

**Payout.** Dividends to resident shareholders carry imputation credits: at 39%, a fully imputed dividend costs (0.39 - 0.28)/0.72 = 15.3% of the cash (JSON payout_tax_rate 0.1528). The company's FIF income (about NZD 2.5 million a year here) provides ample credits for the EUR 400k withdrawal. Untaxed surpluses (returns above the deemed 5%) are taxed at 39% if paid out as dividends, but realised capital gains are tax-free on liquidation (s CD 26 / CD 44; IRD public ruling BR Pub 14/09). Running cost NZD 10,000 a year is a reasoned estimate, not sourced.

**Anti-avoidance and exit.** General anti-avoidance rule s BG 1 (Penny and Hooper); dealer test on share gains; integrity rules on trust income routed to close companies (s HC 38, not verified). Trusts pay 39%, so a family trust gives no rate advantage. No exit tax on emigration; liquidation returns capital and realised capital gains tax-free.

**Inheritance.** No inheritance or gift tax (standard regime applies); company shares pass to the children without tax.

**Other vehicles.** PIEs cap investor tax at 28% with tax-free distributions, but a family cannot normally form its own PIE; using public PIE funds is a product choice, not a family structure. Budget 2026 proposes extending the revenue account method to all residents (not law); if enacted, direct holding would be taxed on realisation (70% of gains at 39% = 27.3%) and the comparison would change.

## Company taxation (kept separate from personal tax)

Headline CIT rate: 28% (0.28). 28% CIT on worldwide income with full imputation to resident shareholders. Pillar Two: IIR and UTPR from 1 January 2025, domestic IIR from 1 January 2026.
Special zones/regimes: Portfolio investment entities (PIE) regime caps investor tax at 28%.

## Cost of living notes

City: Auckland.
- Prime rent, monthly: 4,550 NZD (2026). Median weekly rent for 4-bedroom houses in Remuera, Auckland, from bonds lodged 1 March-31 August 2026: NZD 1,050 a week (462 active bonds), converted to a month as x52/12 (NZD 4,550). Remuera is a sought-after upper-middle family suburb. 5+ bedroom houses: median NZD 1,325 (158 bonds). Official MBIE bond data, not asking rents. Replaces the 5+ bedroom figure (NZD 5,742). Source: Market rent: Auckland - Remuera, 01 Mar 2026 - 31 Aug 2026.
- International school, annual per child: 33,422 NZD (2026). King's College, Auckland, 2026 domestic day-student total for Years 11-13: tuition NZD 32,572 plus campus and building levy NZD 850 (GST inclusive). Children of residence-class visa holders pay domestic fees; international students pay a separate, higher schedule (2027 PDF not opened). Source: College Fees.
Purchase prices, health insurance and housekeeper costs not sourced. Foreign buyers are generally barred from buying existing homes (Overseas Investment Act), with an Active Investor Plus exception.

## Open questions

- The FIF FDR charge is modelled as a 'limited' wealth-tax component (1.95% of foreign share value above NZD 50,000 cost) because the schema has no deemed-income field; foreign dividends and gains are set to 0 to avoid double counting.
- Budget 2026 proposal to extend RAM to all residents: status not verified (PwC, July 2026).
- Gift duty abolition (2011) not confirmed from an opened official source.
- Cost of living: purchase prices, health insurance and housekeeper wages not sourced; the Active Investor Plus home-purchase exception was not re-verified in this pass.

## Sources

- New Zealand - Individual - Income determination (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/new-zealand/individual/income-determination
- Leaving New Zealand (Inland Revenue (NZ), tax_authority): https://www.ird.govt.nz/international-tax/individuals/leaving
- Tax for New Zealand tax residents (Inland Revenue (NZ), tax_authority): https://www.ird.govt.nz/international-tax/individuals/tax-for-new-zealand-tax-residents
- Guide to foreign investment funds (IR461, April 2026) (Inland Revenue (NZ), tax_authority): https://www.ird.govt.nz/-/media/project/ir/home/documents/forms-and-guides/ir400---ir499/ir461/ir461.pdf?modified=20260331214052
- New Zealand - Individual - Taxes on personal income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/new-zealand/individual/taxes-on-personal-income
- New Zealand - Corporate - Withholding taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/new-zealand/corporate/withholding-taxes
- Foreign investment fund rules exemptions (Inland Revenue (NZ), tax_authority): https://www.ird.govt.nz/income-tax/income-tax-for-businesses-and-organisations/types-of-business-income/foreign-investment-funds-fifs/foreign-investment-fund-rules-exemptions
- Inheritance tax (country overview) (Wikipedia, other): https://en.wikipedia.org/wiki/Inheritance_tax
- New Zealand - Individual - Other taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/new-zealand/individual/other-taxes
- Transitional tax residents exemption (Inland Revenue (NZ), tax_authority): https://www.ird.govt.nz/roles/nz-tax-residents/exemption
- Tax residency status for individuals (Inland Revenue (NZ), tax_authority): https://www.ird.govt.nz/international-tax/individuals/tax-residency-status-for-individuals
- Active Investor Plus Visa (Immigration New Zealand, government): https://www.immigration.govt.nz/visas/active-investor-plus-visa/
- New Zealand - Corporate - Taxes on corporate income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/new-zealand/corporate/taxes-on-corporate-income
- Market rent: Auckland - Remuera, 01 Mar 2026 - 31 Aug 2026 (Tenancy Services, Ministry of Business, Innovation and Employment, government): https://www.tenancy.govt.nz/rent-bond-and-bills/market-rent/?location=Remuera&period=42&action_doSearch=Search
- College Fees (King's College, other): https://www.kingscollege.school.nz/admissions/college-fees
- New Zealand - Corporate - Income determination (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/new-zealand/corporate/income-determination
- Public ruling BR Pub 14/09: liquidation and capital distributions (s CD 26) (Inland Revenue (NZ), tax_authority): https://www.taxtechnical.ird.govt.nz/-/media/project/ir/tt/pdfs/rulings/public/pu14009.pdf

## Change log

- 2026-10-15: initial research.
- 2026-10-15: reviewed special-regime durations: transitional resident 4 years (unchanged); revenue account method is an indefinite election, so duration stays null and a duration_note now explains why.
- 2026-10-15 (data-quality pass): added cost of living: Remuera 5+ bedroom house rent NZD 5,742 a month (MBIE market rent, bonds Mar-Aug 2026) and King's College Years 11-13 domestic day fee NZD 33,422 (2026).
- 2026-10-15: added the `investment_company` structure regime (FIF at the 28% company rate) and a Holding structures section.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: changed from 5,742 NZD to 4,550 NZD (Remuera 4-bedroom house).
