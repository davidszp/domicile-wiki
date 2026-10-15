# Australia — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026/27
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Australian residents are taxed on worldwide income at up to 45% plus the 2% Medicare levy (47%) above AUD 190,000. Capital gains on assets held 12 months get a 50% discount, so the top effective rate is 23.5%; the May 2026 Budget announced that from 1 July 2027 the discount will be replaced by inflation indexation with a 30% minimum tax on post-July-2027 gains (announced, legislative status not verified). Franked Australian dividends carry a 30% imputation credit (net top rate about 24.3% of the cash dividend); foreign dividends are taxed at up to 47% with a foreign tax offset. There is no inheritance, gift or wealth tax; assets inherited by residents keep the deceased's cost base, but CGT can be triggered when assets pass to non-resident beneficiaries. Holders of temporary visas are exempt on most foreign income and gains.

US citizens: US citizens remain US-taxed; Australian superannuation, franking credits and Australian managed funds (PFICs) are poorly coordinated with US rules. The US-Australia treaty limits Australian dividend WHT to 15% for portfolio holdings.

## Residence and eligibility

Resident if domiciled in Australia (unless a permanent place of abode is abroad), present more than half the income year (183-day test) unless the usual abode is overseas, or resident under ordinary concepts. Treaty tie-breakers apply.

- **Permanent or temporary skilled/business visas (e.g. National Innovation visa)** (EU, US, OTHER): Home Affairs states that the Business Innovation and Investment Program (subclass 188/888, including the AUD 5 million Significant Investor stream) is closed as of 31 July 2024; applications lodged before then are still processed. Remaining routes require skills, sponsorship or exceptional-talent criteria (the National Innovation visa, subclass 858, is permanent). There is no investor or self-funded residence visa for a non-working family.

## Capital gains

### Standard regime

Net capital gains are added to taxable income. Individuals who hold an asset at least 12 months get a 50% discount (for disposals up to 30 June 2027), so the top effective rate is 47% x 50% = 23.5%. Gains on assets held under 12 months are taxed at up to 47%.

- **Exemptions and thresholds:** Main residence exemption; pre-CGT assets (acquired before 20 September 1985) exempt until 30 June 2027. Small business CGT concessions for active business assets (not modelled).
- **Important exceptions, statute references and announced changes:** Budget 2026-27 (12 May 2026): from 1 July 2027 the 50% discount is replaced by cost-base indexation and a 30% minimum tax on capital gains arising after 1 July 2027; pre-CGT assets become taxable; investors in new builds may choose the old discount. Not yet in force; legislative status not verified. Ceasing residence is a CGT event (I1) on non-Australian assets (general rule, not verified from an opened source in this session).
- **Tax year / confidence / verification:** 2026/27 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 47% (0.47); listed domestic 23.5% (0.235); listed foreign 23.5% (0.235); private business sale 23.5% (0.235); local real estate 23.5% (0.235); foreign real estate 23.5% (0.235).
- **How derived:** Top marginal rate 45% + 2% Medicare levy = 47%; 50% CGT discount for assets held at least 12 months gives 23.5%. Law in force for disposals to 30 June 2027; from 1 July 2027 post-2027 gains are expected to bear indexation plus a 30% minimum tax (higher for most large gains). Private business before small business concessions.
- **Holding period:** At least 12 months for the 50% discount.
- **Trader recharacterisation:** Share traders are taxed on revenue account (gains fully assessable at up to 47%, no discount); classification follows the facts (frequency, organisation, profit intention).
- **Foreign assets:** Worldwide gains taxable; foreign income tax offset available. Temporary residents are exempt on assets that are not taxable Australian property.

### Temporary resident (temporary visa holder) (special regime)

Capital gains on foreign assets (anything that is not taxable Australian property, e.g. foreign listed shares and portfolio holdings of Australian shares under 10%) are disregarded. Gains on Australian real estate and other taxable Australian property are taxed as for residents (23.5% with the discount; temporary residents may lose the discount for periods of non-residence).

- **Conditions:** Temporary visa; not a Social Security Act resident; no Australian-resident spouse. No visa route exists for a non-working wealthy family (BIIP closed 31 July 2024; National Innovation visa is permanent), so this regime is a placeholder restricted to OTHER (New Zealand citizens on a subclass 444 visa) with a 1-year visitor-visa duration.
- **Tax year / confidence / verification:** 2026/27 / low / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 47% (0.47); listed domestic 23.5% (0.235); listed foreign 0% (0.0); private business sale 23.5% (0.235); local real estate 23.5% (0.235); foreign real estate 0% (0.0).
- **How derived:** Foreign-asset gains exempt (ITAA 1997 Subdivision 768-R, per PwC's description). Australian listed shares: portfolio holdings under 10% are not taxable Australian property, so may also be exempt; coded 23.5% conservatively. Private business assumed Australian.

Open points for this tax: ATO and legislation pages were not reachable (HTTP 403); the exact scope of the temporary-resident exemption (ITAA 1997 Subdivision 768-R) is from PwC. | Visa position verified from Home Affairs (BIIP closed 31 July 2024; National Innovation visa permanent; Visitor visa 3, 6 or 12 months). Whether a New Zealand citizen on a subclass 444 visa is a temporary resident depends on Social Security Act residence (protected SCV holders are not temporary residents); not verified on the ATO site.

## Dividends

### Standard regime

Franked dividends from Australian companies are grossed up for the company tax paid (up to 30%) and the franking credit is offset against personal tax, with excess refundable. A top-rate individual pays 47% on the grossed-up amount less the 30% credit, i.e. about 24.3% of the cash dividend. Foreign dividends are taxed at up to 47% with a foreign income tax offset for source withholding.

- **Exemptions and thresholds:** None for high incomes.
- **Important exceptions, statute references and announced changes:** Controlled foreign company rules can attribute passive income of foreign companies controlled by Australians.
- **Tax year / confidence / verification:** 2026/27 / high / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 47% (0.47); domestic 24.3% (0.243); foreign gross 47% (0.47); foreign tax relief: credit.
- **How derived:** Fully franked dividend D: taxable D/0.7, tax 47% x D/0.7 = 0.671D less franking credit 0.429D = 0.243D (24.3% of cash). Foreign dividends: 47% before foreign income tax offset.
- **Outbound withholding:** No WHT on franked dividends; unfranked dividends 30% (15% for most treaty residents), exempt to the extent declared conduit foreign income.
- **Treaty network:** About 50 treaties listed by PwC, including the United States (15% portfolio dividends).
- **Holding companies:** Companies pay 30% (25% for base rate entities with turnover under AUD 50 million and passive income no more than 80%). The usual family vehicle, a discretionary trust streaming dividends to a 30% 'bucket company' and capital gains to individuals, is modelled as the 'family_trust_bucket_company' structure regime.

### Temporary resident (temporary visa holder) (special regime)

Foreign dividends are exempt for temporary residents. Australian franked dividends are taxed as for residents.

- **Conditions:** Temporary visa; not a Social Security Act resident; no Australian-resident spouse. No visa route exists for a non-working wealthy family (BIIP closed 31 July 2024; National Innovation visa is permanent), so this regime is a placeholder restricted to OTHER (New Zealand citizens on a subclass 444 visa) with a 1-year visitor-visa duration.
- **Tax year / confidence / verification:** 2026/27 / low / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 47% (0.47); domestic 24.3% (0.243); foreign gross 0% (0.0); foreign tax relief: exemption.
- **How derived:** Foreign-source income of temporary residents is exempt; domestic franked dividend calculation as for residents.

Open points for this tax: ATO pages were not reachable (HTTP 403); exemption scope from PwC. | Visa position verified from Home Affairs (BIIP closed 31 July 2024; National Innovation visa permanent; Visitor visa 3, 6 or 12 months). Whether a New Zealand citizen on a subclass 444 visa is a temporary resident depends on Social Security Act residence (protected SCV holders are not temporary residents); not verified on the ATO site.

## Inheritance and gifts to children

### Standard regime

No inheritance, estate or gift tax. When a resident beneficiary inherits, any CGT is generally deferred: the beneficiary takes over the deceased's cost base (or market value for pre-CGT assets and certain main residences) and pays CGT only on a later sale. CGT is triggered at death when an asset passes to a non-resident beneficiary or a tax-advantaged entity (CGT event K3), apart from taxable Australian property. Gifts are a disposal by the donor at market value, so a gift of appreciated shares to a child triggers CGT (23.5% at the top rate).

- **Exemptions and thresholds:** No tax of any amount on inheritances to children.
- **Important exceptions, statute references and announced changes:** Superannuation death benefits paid to adult (non-dependant) children are taxed (rates not verified here). The K3 rule makes leaving shares to a child who lives abroad a taxable event.
- **Regional differences:** Probate fees are set by each state's Supreme Court and are modest in absolute terms (not verified).
- **Tax year / confidence / verification:** 2026/27 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** basis `none`, children `fully_exempt`, exemption 0 AUD, brackets (marginal): none; other transfer costs 0% (0.0).
- **Gifts:** No gift tax; a gift is a CGT disposal at market value by the donor. (same as inheritance: False; tax-free after years: None)
- **Foreign assets:** No inheritance tax on any assets.
- **Residence/domicile rules:** Not applicable.
- **Business relief covers listed shares:** False

## Wealth tax

### Standard regime

No net wealth tax.

- **Important exceptions, statute references and announced changes:** Division 296: per PwC, from 1 July 2026 individuals with total superannuation balances above AUD 3 million pay an extra 15% on earnings attributable to the balance between AUD 3 million and 10 million and 25% above AUD 10 million. This is an earnings tax on superannuation, not a wealth tax; it matters only to families with large super balances.
- **Tax year / confidence / verification:** 2026/27 / high / verified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** State land tax on the unimproved value of land (principal residence exempt; thresholds vary), council rates, stamp duty on purchases, and foreign purchaser surcharges on duty and land tax in several states. A federal annual vacancy fee applies to foreign-owned vacant dwellings. Foreign persons, including temporary residents, are banned from buying established dwellings until 30 June 2029 (limited exceptions).

## Special regimes

- **Temporary resident (temporary visa holder)** (`temporary_resident`; OTHER; duration 1 years): Holders of temporary visas who are not Social Security Act residents and have no Australian-resident spouse are exempt from Australian tax on foreign-source income and on capital gains on assets that are not taxable Australian property. No current visa lets a non-working wealthy family live in Australia on a temporary basis, so this regime is effectively unavailable; it is kept only as a low-confidence placeholder. Eligibility: Hold a temporary visa under the Migration Act 1958; not an Australian resident for Social Security Act purposes; spouse not an Australian resident under that Act. No realistic visa exists today for a non-working wealthy family. Home Affairs states that the Business Innovation and Investment Program (subclass 188, including the Significant Investor stream) is closed as of 31 July 2024. The National Innovation visa (subclass 858) is a permanent visa ('Permanently' per Home Affairs), so holders are ordinary residents and the exemption does not apply. Every other temporary visa requires work, study or sponsorship (e.g. the Skills in Demand visa needs genuine employment by an approved sponsor). The only temporary visa open without those conditions is the Visitor visa (subclass 600), granted for stays of 3, 6 or 12 months and not meant for living in Australia; duration is therefore set to 1 year as a placeholder. Eligible citizenships are restricted to OTHER as an empty-safe choice: in practice only New Zealand citizens (Special Category visa, subclass 444, no fixed term) can live in Australia indefinitely on a temporary visa without working, and they fall in OTHER. EU and US families cannot use this regime.
  - Metrics that differ from standard: capital_gains, dividends (details in the tax sections above).

## Holding structures

### Discretionary family trust with a 'bucket company' (structure regime `family_trust_bucket_company`)

**What it is.** The portfolio is owned by a discretionary trust with a corporate trustee. Each year, by trustee resolution before 30 June, capital gains are streamed to individual family members (Subdivision 115-C) and dividends and other income to a family-owned 'bucket' company (Subdivision 207-B for franked dividends). Eligible: EU and OTHER; not US persons (foreign non-grantor trust and PFIC/CFC treatment in the US).

**Rates.** Capital gains keep the 50% discount in individuals' hands: 47% x 50% = 23.5% (JSON 0.235 for all asset classes, same as direct holding; lower for adult children on lower incomes, not modelled). A company would pay 30% on the whole gain, so gains are not streamed to it. Dividends in the bucket company: 30% company tax (a passive investment company is not a base rate entity; PwC); a franked dividend D bears 30% x D/0.7 less a 0.429D franking credit = 0 (JSON domestic 0); foreign portfolio dividends are assessable to the company at 30% with a foreign income tax offset (JSON foreign_gross 0.3, credit), compared with 47% for a top-rate individual. The foreign-dividend exemption for companies needs a 10% stake (PwC).

**Payout.** `payout_tax_rate` 0, because the family's spending (EUR 400k assumed) is covered by the capital gains already taxed in their hands (about EUR 1.2 million a year). Profits taken out of the bucket company are franked dividends: 24.3% of the cash at the top rate. The company's tax is therefore a deferral, not a saving, on money the family eventually spends. Running cost AUD 15,000 a year is a reasoned estimate (two returns, accounts, resolutions, ASIC fees), not sourced.

**Anti-avoidance.** Division 7A (payments, loans or debt forgiveness by the company to the family are unfranked deemed dividends unless under a complying loan). *Commissioner of Taxation v Bendel* [2026] HCA 18 (10 June 2026): an unpaid present entitlement of the bucket company is not by itself a Division 7A loan, contrary to TR 2010/3 and TD 2022/11 (RSM); Subdivision EA, section 100A reimbursement agreements (trustee taxed at 47% where adult children's distributions benefit the parents) and Part IVA still apply. Minors' distributions are taxed at penalty rates (Division 6AA, not verified). Family trust election and the 45-day rule are needed for franking credits.

**Inheritance and exit.** No inheritance tax (standard regime applies); the trust does not die, control passes through the appointor, and the trust ends on its vesting date (up to 80 years in most states). Leaving Australia: CGT event I1 for individuals, I2 if the trust ceases to be resident; winding up the company pays out franked dividends (exit rules not verified from an opened source).

**Announced changes (not modelled).** Budget 2026-27 (12 May 2026): a 30% minimum tax on discretionary trusts from 1 July 2028, and the 50% CGT discount replaced by indexation with a 30% minimum tax for gains after 1 July 2027 (PwC calls the CGT change a recent law change; status not verified). Professional commentary says corporate beneficiaries would get no credit for the trust minimum tax, which would make the trust-to-bucket-company route double-taxed. If enacted, the advantage modelled here would largely disappear from 2028.

## Company taxation (kept separate from personal tax)

Headline CIT rate: 30% (0.3). 30% CIT; 25% for base rate entities (aggregated turnover under AUD 50 million and passive income no more than 80% of assessable income, so a pure investment company pays 30%). Full imputation: franking credits pass to resident shareholders. Pillar Two: IIR and 15% domestic minimum tax from 1 January 2024, UTPR from 1 January 2025. Budget 2026-27 announced a 30% minimum tax on discretionary trusts from 1 July 2028.

## Cost of living notes

City: Sydney.
- Prime rent, monthly: 16,792 AUD (2026). Median weekly rent for new bonds on houses with 4 or more bedrooms in postcode 2088 (Mosman), April-June 2026: AUD 3,875 a week (first quartile 2,313, third quartile 4,950; 30 or fewer new bonds, flagged 's'), converted to a month as x52/12. Postcode 2030 (Vaucluse, Dover Heights) median AUD 3,625. Official bond-lodgement data, not asking rents. Source: Rent and Sales Report: rent tables, June 2026 quarter (Table 2, weekly rents by postcode).
- International school, annual per child: 52,410 AUD (2026). Sydney Grammar School (boys, College Street), annual tuition fee 2026 for Forms I-VI (Years 7-12), schedule issued 25 November 2025. Australian school fees follow the calendar year. Source: Schedule of Fees 2026.
Foreign persons cannot buy established homes until 30 June 2029, so a newly arrived family rents. Purchase prices, health insurance and housekeeper costs not sourced.

## Open questions

- Legislative status and mechanics of the 1 July 2027 CGT reform (indexation + 30% minimum tax) are not verified; the JSON scores the law in force (50% discount).
- Division 296 is described by PwC as applying from 1 July 2026; enactment details not checked against legislation.
- ATO and AustLII pages returned HTTP 403, so CGT event K3 and the temporary-resident CGT scope rest on PwC and general knowledge. The visa position is now verified from Home Affairs (BIIP closed 31 July 2024).
- The temporary-resident regime is effectively unavailable to a non-working wealthy family: it is kept as a low-confidence placeholder restricted to OTHER (New Zealand citizens on subclass 444) with a 1-year duration matching the longest visitor-visa stay. A family member employed in Australia on a sponsored work visa would make it available for that visa's term (not modelled).

## Sources

- Australia - Individual - Income determination (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/australia/individual/income-determination
- Australia - Individual - Taxes on personal income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/australia/individual/taxes-on-personal-income
- Budget 2026-27: Tax reform (Australian Government (Treasury), government): https://budget.gov.au/content/04-tax-reform.htm
- Australia - Individual - Significant developments (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/australia/individual/significant-developments
- Australia - Corporate - Withholding taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/australia/corporate/withholding-taxes
- Australia - Individual - Other taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/australia/individual/other-taxes
- Australia - Individual - Residence (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/australia/individual/residence
- Business Innovation and Investment (Provisional) visa (subclass 188) - site notice 'BIIP refunds and closure' (Department of Home Affairs (Australia), government): https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/business-innovation-and-investment-188
- Visitor visa (subclass 600) (Department of Home Affairs (Australia), government): https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600
- National Innovation visa (subclass 858) (Department of Home Affairs (Australia), government): https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/national-innovation-visa-858
- Australia - Corporate - Taxes on corporate income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/australia/corporate/taxes-on-corporate-income
- Rent and Sales Report: rent tables, June 2026 quarter (Table 2, weekly rents by postcode) (NSW Department of Communities and Justice, government): https://dcj.nsw.gov.au/content/dam/dcj/dcj-website/documents/about-us/families-and-communities-statistics/housing-and-rent-sales/rent-tables-june-2026-quarter.xlsx
- Schedule of Fees 2026 (Sydney Grammar School, other): https://www.sydgram.nsw.edu.au/admissions/fees/
- Australia - Corporate - Income determination (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/australia/corporate/income-determination
- High Court: UPEs are not Division 7A loans (Commissioner of Taxation v Bendel [2026] HCA 18) (RSM Australia, professional): https://www.rsm.global/australia/insights/high-court-upes-not-division-7a-loans-bendel

## Change log

- 2026-10-15: initial research.
- 2026-10-15: temporary_resident regime changed from indefinite (duration null) to 4 years, eligibility rewritten to say that no temporary visa fits a non-working family since the 2024 closure of the investor visa streams, confidence lowered to low (review of special-regime durations).
- 2026-10-15 (data-quality pass): temporary_resident regime re-verified against Home Affairs: BIIP (subclass 188, incl. Significant Investor) closed as of 31 July 2024, National Innovation visa is permanent, Visitor visa 3/6/12 months. No visa fits a non-working wealthy family, so the regime is restricted to OTHER (NZ citizens on subclass 444) with a 1-year placeholder duration, confidence low. Added cost of living: Mosman 4+ bedroom house rent AUD 16,792 a month (NSW Rent and Sales Report, June quarter 2026) and Sydney Grammar School fee AUD 52,410 (2026).
- 2026-10-15: added the `family_trust_bucket_company` structure regime and a Holding structures section (Bendel [2026] HCA 18, Budget 2026-27 trust and CGT announcements).
