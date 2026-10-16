# Ireland — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Ireland taxes a resident's capital gains at 33% (EUR 1,270 annual exemption) and dividends as ordinary income at up to about 55% (40% income tax plus 8% USC, a 3% USC surcharge on non-PAYE income above EUR 100,000, and PRSI). There is no wealth tax. Gifts and inheritances are taxed by Capital Acquisitions Tax at 33% above a lifetime threshold per child of EUR 420,000 (Group A, from 7 October 2026; EUR 400,000 before). Residents who are not Irish-domiciled can use the remittance basis: foreign income and foreign gains are taxed only when brought into Ireland, and foreign assets of a non-domiciled donor stay outside CAT until five consecutive years of Irish residence.

## Residence and eligibility

Resident if present 183 days in a tax year, or 280 days over the tax year and the previous year (at least 30 days in each); any part of a day counts. Ordinary residence starts after three consecutive years of residence and continues for three years after leaving. Domicile is separate (permanent home), and governs access to the remittance basis.

- **EU/EEA/Swiss free movement (and UK under the Common Travel Area)** (EU): No permit needed.
- **Stamp 0 permission for persons of independent means** (US, OTHER): Permission to reside without working for people with sufficient independent income and private health insurance. The Immigrant Investor Programme closed to new applications in 2023. Thresholds not verified in this session.

Standard regime eligibility: Tax residence: 183 days in the tax year, or 280 days over the tax year and the previous year (with at least 30 days in each). This regime applies in full to Irish-domiciled residents; a new arrival usually keeps a foreign domicile and can choose the remittance basis instead.

## Capital gains

Capital gains are taxed at 33% for all asset classes, with an annual exemption of EUR 1,270 per person (not transferable between spouses). The main residence is exempt. Gains on certain fund interests and life policies are taxed separately (PwC cites 40%). A reduced 10% rate (revised entrepreneur relief) applies to qualifying business disposals up to a lifetime limit.

JSON values: headline rate 33% (`0.33`); listed securities domestic 33% (`0.33`), foreign 33% (`0.33`); private business sale 33% (`0.33`); local real estate 33% (`0.33`); foreign real estate 33% (`0.33`).

- **How the JSON numbers were derived:** Flat 33% CGT rate for all assets; no USC or PRSI on capital gains. Private business sale shown at 33% because revised entrepreneur relief (10%) is capped and conditional on working in the business.
- **Holding periods:** None; no indexation for assets acquired after 2002.
- **Professional-trader risk:** Frequent trading can be treated as a trade (Schedule D Case I), taxing profits as income at up to about 55% including USC and PRSI.
- **Foreign assets:** Domiciled residents: worldwide gains taxed as they arise. Non-domiciled residents: see the remittance basis regime.
- **Exemptions and thresholds:** Annual exemption EUR 1,270 per individual. Principal private residence relief.
- **Eligibility conditions:** Resident or ordinarily resident individual.
- **Regional differences:** None.
- **Important exceptions / announced changes:** Irish and EU-domiciled ETFs/funds: gains and distributions are subject to a separate 'exit tax' regime with an 8-year deemed disposal (rate cited by PwC as 40% for certain fund interests; Finance Act 2025 changes not verified). Ireland has no general exit tax on individuals leaving (not verified in statute).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Ireland - Individual - Income determination](https://taxsummaries.pwc.com/ireland/individual/income-determination); [Ireland - Individual - Residence](https://taxsummaries.pwc.com/ireland/individual/residence)

## Dividends

Dividends, Irish or foreign, are taxed as income at the marginal rate of 40% plus USC of 8% plus a 3% USC surcharge on non-PAYE income above EUR 100,000, plus PRSI on unearned income (about 4.2%): around 55% at the top. Irish companies withhold 25% dividend withholding tax, which is credited. Foreign withholding tax is credited under the treaties.

JSON values: headline 55.2% (`0.552`); domestic 55.2% (`0.552`); foreign gross 55.2% (`0.552`); foreign tax relief: credit.

- **How the JSON numbers were derived:** 40% income tax (above EUR 44,000 single / 53,000-88,000 married) + 8% USC (above EUR 70,044) + 3% USC surcharge (non-PAYE income above EUR 100,000) + 4.2% PRSI (assumed) = 55.2%.
- **Outbound withholding:** 25% dividend withholding tax on dividends paid by Irish companies; exemptions for non-resident individuals in treaty/EU states and companies with documentation.
- **Treaty network:** About 75 income tax treaties, including the US and all EU states (count from general knowledge).
- **Holding-company notes:** An Irish investment company pays 25% on passive income and 33% on gains, plus a 20% close-company surcharge on undistributed investment income (rate from general knowledge).
- **Exemptions and thresholds:** No dividend allowance.
- **Eligibility conditions:** Resident individual.
- **Regional differences:** None.
- **Important exceptions / announced changes:** PRSI on unearned income has been rising in annual steps each October; the exact 2026 rate was not verified.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Ireland - Individual - Taxes on personal income](https://taxsummaries.pwc.com/ireland/individual/taxes-on-personal-income); [USC standard rates and thresholds](https://www.revenue.ie/en/jobs-and-pensions/usc/standard-rates-thresholds.aspx); [Other rates of USC (3% surcharge)](https://www.revenue.ie/en/jobs-and-pensions/usc/other-rates.aspx); [Ireland - Individual - Income determination](https://taxsummaries.pwc.com/ireland/individual/income-determination)

## Inheritance and gifts to children

Capital Acquisitions Tax (CAT) is charged on the recipient at 33% on gifts and inheritances above a lifetime tax-free threshold per group. A child (Group A) can receive EUR 420,000 in total from both parents combined (all Group A benefits since 5 December 1991 are aggregated) for gifts or inheritances on or after 7 October 2026; the threshold was EUR 400,000 from 2 October 2024 to 6 October 2026. Spouses are exempt. Each person can give EUR 3,000 a year to anyone tax-free.

JSON values: basis `beneficiary`, bracket mode `marginal`, children `taxed`, exemption EUR 420,000, marginal brackets above the exemption: 33% (`0.33`) from EUR 0; other transfer costs 0% (`0`); gifts same as inheritance: True; tax-free after years: None.

- **Gifts:** Gifts are taxed the same way as inheritances (33% above the shared Group A threshold, aggregated for life since 5 December 1991), plus a EUR 3,000 annual small gift exemption per donor. A gift of assets standing at a gain can also trigger CGT for the donor, creditable against the CAT on the same event.
- **Business relief:** Business relief reduces the taxable value of relevant business property by 90% under conditions; it does not extend to portfolio investments in listed shares (not verified on an official page in this session). Covers listed portfolios: no.
- **Foreign assets:** Worldwide assets in scope if disponer or beneficiary is resident or ordinarily resident (subject to the five-year rule for non-domiciled persons). Foreign inheritance tax can be credited.
- **Domicile / residence rules:** Scope follows residence or ordinary residence of either party; a person stays ordinarily resident for three years after leaving. Non-domiciled persons are treated as in scope only after five consecutive years of residence.
- **Exemptions and thresholds:** Group A threshold EUR 420,000 (from 7 October 2026), a lifetime amount covering all gifts and inheritances from parents. Small gift exemption EUR 3,000 per donor per recipient per calendar year. Spouse/civil partner exempt. Dwelling house exemption for a child who lived in the home (conditions not verified).
- **Eligibility conditions:** In scope if the disponer or the beneficiary is resident or ordinarily resident in Ireland, or the property is Irish-situated.
- **Regional differences:** None.
- **Important exceptions / announced changes:** A foreign-domiciled disponer or beneficiary counts as resident/ordinarily resident for CAT only after five consecutive tax years of Irish residence (and still resident at the date of the gift or inheritance); until then foreign assets passing between non-domiciled persons are outside CAT (rule from general knowledge, s. 6 CATCA 2003; statute page blocked).
- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **Sources:** [CAT group thresholds](https://www.revenue.ie/en/gains-gifts-and-inheritance/cat-thresholds-rates-and-aggregation-rules/cat-thresholds.aspx); [CAT thresholds, rates and aggregation rules](https://www.revenue.ie/en/gains-gifts-and-inheritance/cat-thresholds-rates-and-aggregation-rules/index.aspx); [Gift and Inheritance Tax (CAT)](https://www.revenue.ie/en/gains-gifts-and-inheritance/gift-and-inheritance-tax-cat/index.aspx); [What do you not pay CAT on?](https://www.revenue.ie/en/gains-gifts-and-inheritance/gift-and-inheritance-tax-cat/what-do-you-not-pay-cat-on.aspx); [Ireland - Individual - Other taxes](https://taxsummaries.pwc.com/ireland/individual/other-taxes)
- Surviving spouse and civil partner: inheritance is fully exempt from CAT (CATCA 2003 s.71) and does not use the Group A threshold.

## Wealth tax

Ireland has no net wealth tax on individuals.

JSON type: `none`.

- **Property tax (not a wealth tax):** Local Property Tax on Irish residential property, banded by value (generally a fraction of a percent a year).
- **Important exceptions / announced changes:** Domicile levy (Part 18C TCA 1997): EUR 200,000 a year for an individual who in the tax year is Irish-domiciled, has world-wide income above EUR 1 million, an Irish income tax liability below EUR 200,000, and Irish property worth more than EUR 5 million on 31 December. Residence is irrelevant and there is no citizenship test; Irish income tax paid is credited against it. 'Irish property' excludes shares in trading companies and trading holding companies. A non-domiciled arrival is outside it; a family that later acquires an Irish domicile of choice would normally pay more than EUR 200,000 of Irish income tax on a large income and so owe little or nothing. Not modelled as a wealth tax.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **Sources:** [Ireland - Individual - Other taxes](https://taxsummaries.pwc.com/ireland/individual/other-taxes)

## Special regimes

### Remittance basis for residents not domiciled in Ireland (`remittance_basis`)

A resident who is not Irish-domiciled pays income tax on foreign investment income and CGT on foreign gains only to the extent they are remitted (brought) to Ireland. Irish-source income, Irish dividends and gains on Irish assets stay fully taxable. Inheritance tax follows the standard rules, but foreign assets of a non-domiciled family stay outside CAT for the first five consecutive years of residence.

- **Eligible citizenships:** EU, US, OTHER
- **Eligibility:** Irish tax resident but domiciled outside Ireland (domicile of origin abroad, no intention to stay permanently). No minimum stay, fee or application; claimed in the tax return. Must fund Irish living costs from Irish income, unremitted capital or clean capital without bringing in untaxed foreign income or gains.
- **Duration:** indefinite years
- **Duration note:** No statutory time limit: the remittance basis applies for as long as the person is Irish-resident but not Irish-domiciled. It ends if the person acquires an Irish domicile of choice (settling permanently), which becomes more likely the longer the family stays. The CAT advantage for foreign assets lasts only until five consecutive years of residence.

#### Capital gains under this regime

Foreign gains are taxed at 33% only when the proceeds are remitted to Ireland; unremitted foreign gains are not taxed. Gains on Irish assets (including Irish-listed shares and Irish real estate) are taxed at 33% as they arise.

JSON values: headline rate 33% (`0.33`); listed securities domestic 33% (`0.33`), foreign 0% (`0.0`); private business sale 0% (`0.0`); local real estate 33% (`0.33`); foreign real estate 0% (`0.0`).

- **How the JSON numbers were derived:** 0 for foreign listed securities, foreign private companies and foreign real estate on the assumption that proceeds stay outside Ireland; 33% on Irish assets and on anything remitted.
- **Holding periods:** None.
- **Professional-trader risk:** As standard.
- **Foreign assets:** Taxed only on remittance.
- **Exemptions and thresholds:** EUR 1,270 annual exemption on taxable gains; losses on foreign assets are not deductible for a remittance-basis taxpayer.
- **Eligibility conditions:** Not Irish-domiciled. The 0% rates for foreign listed securities, foreign private companies and foreign real estate assume the gains (and the sale proceeds containing them) are never remitted to Ireland, directly or indirectly; a remitted foreign gain is taxed at 33% in the year it is brought in. Gains on Irish assets are taxed as they arise.
- **Important exceptions / announced changes:** Domicile can be lost over a long stay (acquiring an Irish domicile of choice) which ends the regime. Remitting the proceeds of a sale also remits the gain.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Ireland - Individual - Income determination](https://taxsummaries.pwc.com/ireland/individual/income-determination)

#### Dividends under this regime

Foreign dividends are taxed only when remitted to Ireland, then at up to about 55%. Irish dividends are taxed as they arise.

JSON values: headline 55.2% (`0.552`); domestic 55.2% (`0.552`); foreign gross 0% (`0.0`); foreign tax relief: not_applicable.

- **How the JSON numbers were derived:** Foreign dividends kept abroad: 0 (taxed at ~55.2% if remitted). Irish dividends as standard.
- **Outbound withholding:** As standard (25%).
- **Treaty network:** As standard; foreign withholding tax is a final cost on unremitted dividends.
- **Exemptions and thresholds:** None.
- **Eligibility conditions:** Not Irish-domiciled. The 0% foreign dividend rate assumes the dividends are kept outside Ireland and never remitted; remitted foreign dividends are taxed at the marginal income tax rate plus USC and PRSI (about 55.2% at the top). Irish dividends are taxed as they arise.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Ireland - Individual - Taxes on personal income](https://taxsummaries.pwc.com/ireland/individual/taxes-on-personal-income)

Metrics not listed inherit the standard regime.

## Holding structures

**No structure modelled.** An Irish investment company pays 33% on chargeable gains (the same as personal CGT) and
25% on passive income, including most portfolio dividends (12.5% for dividends paid out of certain foreign trading
profits); the participation exemption needs a 5% stake in a trading company (PwC, Corporate income determination).
A close company also pays a **20% surcharge** on distributable investment and estate income not distributed
(TCA 1997 s.440; Revenue Tax and Duty Manual Part 13-02-05), which pushes it to pay out. Distributions to the family
then bear income tax, USC and PRSI of about 55%, and liquidation proceeds bear 33% CGT. Gains get no saving at all,
dividends a small one only if left undistributed (subject to the surcharge), and the payout layer more than cancels
it. Irish CGT is not charged on death in either case. Recorded in `holding_company_notes`.

## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 12.5% (`0.125`).

12.5% on trading profits; 25% on passive (non-trading) income such as interest, rent and certain foreign dividends; 33% on chargeable gains. Pillar Two 15% minimum for groups with revenue of EUR 750 million or more. Close companies face a surcharge on undistributed investment income.

Special zones: None.

## Cost of living notes

Dublin (prime south Dublin and coastal suburbs).

- Prime family rent: EUR 6,198/month, the median of 18 distinct 4-6 bedroom houses listed for rent on MyHome.ie on
  15 October 2026 in Dublin 4/6/14/18, Blackrock, Booterstown, Monkstown, Dún Laoghaire, Dalkey and Malahide
  (range EUR 3,500-15,950; Ballsbridge/Sandymount houses EUR 10,500-13,000). Asking rents.
- International school: Nord Anglia International School Dublin, Grades 11-12, EUR 25,296 a year for 2026-2027
  (Grades 9-10 EUR 23,971); one-time enrolment fee EUR 1,600.
- Not sourced: price per m², family health insurance, housekeeper.

## Open questions

- Special Assignee Relief Programme (SARP; renewed to 2030 with a EUR 125,000 minimum income) relieves employment income only and is not modelled.
- PRSI rate on unearned income in 2026 not verified.
- Budget 2027 (announced October 2026) measures beyond the CAT threshold were not checked.
- (standard / capital_gains) Revised entrepreneur relief (10% up to a lifetime limit, EUR 1m historically; Budget changes not checked) was not verified in this session.
- (standard / capital_gains) The current exit-tax/deemed-disposal rate for funds and ETFs after Finance Act 2025 was not verified; PwC still cites 40% for certain fund interests.
- (standard / capital_gains) Revenue's CGT rate page returned 404; only PwC was opened for the 33% rate.
- (standard / dividends) PRSI rate on unearned income for 2026 (4.2% assumed, from the 2025 increase schedule) not verified on an official page.
- (standard / inheritance) The EUR 420,000 threshold from 7 October 2026 is shown on Revenue's site; confirm it is enacted in the Finance Act following Budget 2027.
- (standard / inheritance) Business relief (90% reduction in taxable value of relevant business property), agricultural relief and the dwelling-house exemption were not verified on official pages (Revenue pages returned 404).
- (standard / inheritance) The five-year rule for foreign-domiciled persons (s. 6 CATCA 2003) could not be opened on irishstatutebook.ie (403).
- (remittance_basis / capital_gains) Only PwC was opened; Revenue's guidance on remittance basis and loss treatment was not read.

US citizens: US-Ireland income tax treaty applies; there is no estate tax treaty. The remittance basis does not help US citizens with US tax. Irish CAT at 33% can be credited against US estate tax only within US foreign death tax credit rules. Irish/EU ETFs are PFICs for US persons.

## Sources

- [Ireland - Individual - Income determination](https://taxsummaries.pwc.com/ireland/individual/income-determination) — PwC Worldwide Tax Summaries (professional)
- [Ireland - Individual - Residence](https://taxsummaries.pwc.com/ireland/individual/residence) — PwC Worldwide Tax Summaries (professional)
- [Ireland - Individual - Taxes on personal income](https://taxsummaries.pwc.com/ireland/individual/taxes-on-personal-income) — PwC Worldwide Tax Summaries (professional)
- [USC standard rates and thresholds](https://www.revenue.ie/en/jobs-and-pensions/usc/standard-rates-thresholds.aspx) — Revenue Commissioners (tax_authority)
- [Other rates of USC (3% surcharge)](https://www.revenue.ie/en/jobs-and-pensions/usc/other-rates.aspx) — Revenue Commissioners (tax_authority)
- [Ireland - Individual - Other taxes](https://taxsummaries.pwc.com/ireland/individual/other-taxes) — PwC Worldwide Tax Summaries (professional)
- [CAT group thresholds](https://www.revenue.ie/en/gains-gifts-and-inheritance/cat-thresholds-rates-and-aggregation-rules/cat-thresholds.aspx) — Revenue Commissioners (tax_authority)
- [CAT thresholds, rates and aggregation rules](https://www.revenue.ie/en/gains-gifts-and-inheritance/cat-thresholds-rates-and-aggregation-rules/index.aspx) — Revenue Commissioners (tax_authority)
- [Gift and Inheritance Tax (CAT)](https://www.revenue.ie/en/gains-gifts-and-inheritance/gift-and-inheritance-tax-cat/index.aspx) — Revenue Commissioners (tax_authority)
- [What do you not pay CAT on?](https://www.revenue.ie/en/gains-gifts-and-inheritance/gift-and-inheritance-tax-cat/what-do-you-not-pay-cat-on.aspx) — Revenue Commissioners (tax_authority)
- [Ireland - Corporate - Taxes on corporate income](https://taxsummaries.pwc.com/ireland/corporate/taxes-on-corporate-income) — PwC Worldwide Tax Summaries (professional)
- [MyHome.ie: properties with 4+ bedrooms to rent in Dublin (listing sample)](https://www.myhome.ie/rentals/dublin/property-to-rent?minbeds=4) — MyHome.ie (other)
- [Nord Anglia International School Dublin: 2026-2027 Tuition Fees](https://www.nordangliaeducation.com/nais-dublin/-/media/nais-dublin/admissions/nais-dublin-tuition-fees-2026-2027.pdf) — Nord Anglia International School Dublin (other)
- [Tax and Duty Manual Part 18C-00-01: Domicile Levy (last reviewed August 2026)](https://www.revenue.ie/en/tax-professionals/tdm/income-tax-capital-gains-tax-corporation-tax/part-18c/18c-00-01.pdf) — Revenue Commissioners (Ireland) (tax_authority)
- [Tax and Duty Manual Part 13-02-05: Surcharge on certain undistributed income of close companies — Revenue](https://www.revenue.ie/en/tax-professionals/tdm/income-tax-capital-gains-tax-corporation-tax/part-13/13-02-05.pdf)
- [Ireland - Corporate - Income determination — PwC](https://taxsummaries.pwc.com/ireland/corporate/income-determination)
- Capital Acquisitions Tax Consolidation Act 2003, section 71 (exemption for spouses, inheritances): https://www.irishstatutebook.ie/eli/2003/act/1/section/71/enacted/en/html

## Change log

- 2026-10-15: initial research.
- 2026-10-15: added prime rent (MyHome.ie sample, EUR 6,198/month) and NAIS Dublin fee (EUR 25,296, 2026-27); remittance-basis eligibility conditions now state that the 0% rates assume no remittance; domicile levy conditions re-checked against Revenue's Tax and Duty Manual Part 18C (August 2026).
- 2026-10-15: holding-structure review: no structure added (33% gains, 25% passive income, 20% close-company surcharge, ~55% payout); holding_company_notes updated.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
- 2026-10-16: added surviving-spouse treatment.
