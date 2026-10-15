# Jersey — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Crown Dependency outside the UK and EU. No capital gains tax, no inheritance or gift tax, no wealth tax. Income including dividends is taxed at a flat 20%. Probate stamp duty up to 0.75%, capped at £100,000. Wealthy newcomers normally come as High Value Residents: minimum £250,000 tax a year, 1% on income above £1.25m.

## Residence and eligibility

Resident if present six months or more in a tax year, or if a place of abode is available and at least one night is spent there, or by habitual visits averaging three months a year (PwC). Residence rules are under review.

- **High Value Residency (2(1)(e))** (EU, US, OTHER): Discretionary consent; minimum £250,000 annual tax; expected net worth £10m+; purchase of a high-value property (stated in 2023 as £3.5m houses / £1.75m apartments). Non-British/Irish nationals also need immigration permission (Jersey follows UK-style rules).
- **British/Irish citizens and settled persons** (OTHER): May live in Jersey without immigration permission but face Control of Housing and Work restrictions on buying or renting property until they qualify for housing status (qualifying periods not verified here).

Standard regime eligibility: Tax residence in Jersey. Buying or renting property needs housing status (Control of Housing and Work); newcomers without it have very limited housing options, which is why wealthy arrivals use the HVR route.

## Capital gains

Jersey has no capital gains tax. Gains by a resident private investor on securities, a private business or real estate are not taxed, unless the activity is a trade (taxed as income at 20%). Stamp duty or land transaction tax applies on buying Jersey property.

- **rate basis**: No capital gains tax in Jersey; income tax (20%) applies to income, and to trading profits, not to capital gains.
- **professional trader**: Share or property dealing that amounts to a trade is taxed as income at 20%; Jersey property development profits are taxed at 20%.
- **holding period rules**: None.
- **foreign assets**: Foreign gains are equally untaxed.
- **JSON values**: `{"headline_rate": 0.0, "rates": {"listed_securities_domestic": 0.0, "listed_securities_foreign": 0.0, "private_business_sale": 0.0, "real_estate_local": 0.0, "real_estate_foreign": 0.0}}`
- **Confidence / verification**: high / partially_verified (tax year 2026)
- **Open question**: PwC 'other taxes' page does not expressly state 'no CGT'; widely documented but not quoted from an official Revenue Jersey page in this research.

## Dividends

Dividends are taxed as income at a flat 20% (the alternative marginal calculation at 26% only helps low incomes). For 2026 the income tax exemption threshold is £21,250; all married couples are taxed independently from 2026. High Value Residents pay 1% on non-Jersey-property income above £1.25m (see special regime).

- **rate basis**: Flat 20% standard rate on net income after allowances (PwC). Most Jersey companies pay 0% corporate tax, so no imputation credit arises on typical domestic dividends.
- **exemptions thresholds**: Exemption threshold £21,250 (2026); relevant only at low income.
- **withholding outbound**: No withholding tax on dividends, interest or royalties paid by Jersey companies to non-residents (PwC).
- **treaty network**: Small set of double tax agreements (UK, Guernsey, Isle of Man and a few others); no US income tax treaty, so US dividends suffer 30% US withholding. Foreign tax is relieved by credit.
- **JSON values**: `{"headline_rate": 0.2, "domestic_rate": 0.2, "foreign_gross_rate": 0.2, "foreign_tax_credit": "credit"}`
- **Confidence / verification**: high / verified (tax year 2026)
- **Open question**: Exact treaty count and unilateral credit mechanics not verified from an official list.

## Inheritance and gifts to children

No inheritance tax and no gift tax. A probate stamp duty applies to the personal (movable) estate: 0.5% up to £100,000, then £500 plus £75 per £10,000 (0.75%), capped at £100,000 for estates above £13.36m. For a Jersey-domiciled person it applies to worldwide movable estate.

- **exemptions thresholds**: Probate duty (Stamp Duties and Fees (Jersey) Law 1998, Schedule 3 item 9): no fee up to £10,000 net; £50 per £10,000 to £100,000; £500 + £75 per £10,000 up to £13,360,000; flat £100,000 above. other_transfer_cost_rate 0.0075 is the marginal rate up to the cap; for a £30m movable estate the effective cost is about 0.33%.
- **important exceptions**: Lifetime gifts of shares and portfolios attract no duty, so the probate duty can be avoided by lifetime transfers or holding structures. Jersey succession law gives spouse and children rights over part of movable estate (not a tax; not verified here).
- **foreign assets**: Probate duty covers worldwide personal estate of a Jersey-domiciled deceased; only Jersey-situs estate for others (Art. 5).
- **gift tax**: No gift tax. Stamp duty applies to gifts of Jersey immovable property (land) as for transfers.
- **domicile rules**: Duty base depends on Jersey domicile at death. No tax tail. Families arriving from the UK remain within UK IHT under the residence-based test from 6 April 2025 for up to 10 years after leaving, depending on years of UK residence.
- **JSON values**: `{"basis": "none", "children_treatment": "fully_exempt", "exemption": 0, "other_transfer_cost_rate": 0.0075, "gifts_same_as_inheritance": false}`
- **Confidence / verification**: high / verified (tax year 2026)
- **Open question**: Whether Jersey still has légitime (forced heirship) rights over movables was not verified.

## Wealth tax

No wealth tax or net worth tax.

- **property tax note**: Parish rates are levied on property by each parish (modest). Stamp duty applies to purchases of Jersey real estate; non-main-residence purchases carry an extra 4 percentage points since 2023.
- **JSON values**: `{"type": "none"}`
- **Confidence / verification**: high / verified (tax year 2026)

## Special regimes

### High Value Residency (2(1)(e) housing consent) (`high_value_residency`)

Discretionary residency for wealthy newcomers. Jersey property income is taxed at 20%; other income at 20% on the first £1.25m and 1% above. New HVRs (applications from 14 July 2023) must pay at least £250,000 a year: with income under £1.25m they are deemed to have enough income to pay that minimum.

- **Eligibility**: Application to the Government of Jersey (via Locate Jersey); granted at discretion considering economic and social benefit and financial history. Government stated in 2023 an expectation of net worth of at least £10m excluding the main home and a minimum property purchase of £3.5m (houses) / £1.75m (apartments), confirmation of final figures pending. Consent gives the right to buy or rent property.
- **Duration (years)**: indefinite
- **Why it does not expire**: No time limit: the HVR tax treatment applies for as long as the individual holds 2(1)(e) housing consent, stays Jersey resident and meets the conditions of approval (including the minimum tax); if a condition is breached, the treatment reverts to ordinary rules from that year onwards (Revenue Jersey HVR guidance).
- **Lump sum / cap in JSON**: 250,000 GBP a year, covers foreign_dividends, foreign_capital_gains, foreign_income_all, domestic_income. Minimum annual tax of £250,000 per applicant (gov.je). Covers income up to £1.25m; income above £1.25m (except Jersey property income at 20%) is taxed at 1%. Spouses are taxed independently. HVRs approved before 14 July 2023 stay on older terms (£170,000 minimum under the 2018 rules).

**Dividends under this regime:** For an HVR, dividends above the first £1.25m of income are taxed at 1%; the first £1.25m is taxed at 20%, subject to a minimum total tax of £250,000.

- **rate basis**: Marginal rate 1% on non-Jersey-property income above £1.25m; the £250,000 minimum is modelled as the lump sum.
- **withholding outbound**: No withholding tax on dividends paid by Jersey companies to non-residents.
- **treaty network**: As standard regime.
- **JSON values**: `{"headline_rate": 0.01, "domestic_rate": 0.01, "foreign_gross_rate": 0.01, "foreign_tax_credit": "credit"}`
- **Confidence / verification**: high / verified (tax year 2026)

## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 0.0.

General corporate rate 0%; 10% for regulated financial services companies; 20% for utilities, Jersey real estate income and large retailers. Multinational Corporate Income Tax (15%) for groups with revenue of €750m+ from 2025. No withholding tax on dividends to non-residents.

## Cost of living notes

City: St Helier.

- **Prime rent (monthly):** 4,800 GBP (2026). Median asking rent of the 27 Jersey 4-5 bedroom houses listed to let by Livingroom on 2026-10-15, including 20 marked recently let (£2,750-£9,250 pcm; the 7 still available had a median of about £5,700). These are qualified-tenant (local market) homes; HVRs with 2(1)(e) consent can rent any property. Checked 2026-10-15 against the upper-middle-class standard. Source: [Livingroom - Property to rent (Guernsey and Jersey)](https://www.livingroomproperty.com/rent).
- **International school fee (annual, per child):** 8,760 GBP (2026). Jersey College for Girls (government-provided fee-paying secondary school) 2026-27 fee £2,920 per term x 3 terms. Jersey's leading fee-paying schools are state-subsidised; private boarding in the UK would cost far more. Source: [Jersey College for Girls - Fees](https://jerseycollegeforgirls.com/jcg/fees).
- Health insurance, housekeeper and price per m² not sourced. No World Bank price level for Jersey, so the app cannot compute the household-cost estimate even with rent and school fee.

**Indicator overrides (non-tax scoring).** Used because the automatic World Bank/UNDP feeds have no value for this jurisdiction:
- `wgi_va` = 1.4203543 (2025): Same WGI series the pipeline uses; the World Bank API returns Jersey with an empty ISO3 code, so the automatic fetch drops it. Source: [Worldwide Governance Indicators, Voice and Accountability estimate, Jersey](https://api.worldbank.org/v2/country/JEY/indicator/GOV_WGI_VA.EST?format=json&mrnev=1).
- `wgi_pv` = 1.4940407 (2025): Same WGI series the pipeline uses; the World Bank API returns Jersey with an empty ISO3 code, so the automatic fetch drops it. Source: [Worldwide Governance Indicators, Political Stability and Absence of Violence/Terrorism estimate, Jersey](https://api.worldbank.org/v2/country/JEY/indicator/GOV_WGI_PV.EST?format=json&mrnev=1).
- `wgi_ge` = 1.2490934 (2025): Same WGI series the pipeline uses; the World Bank API returns Jersey with an empty ISO3 code, so the automatic fetch drops it. Source: [Worldwide Governance Indicators, Government Effectiveness estimate, Jersey](https://api.worldbank.org/v2/country/JEY/indicator/GOV_WGI_GE.EST?format=json&mrnev=1).
- `wgi_rq` = 1.0704544 (2025): Same WGI series the pipeline uses; the World Bank API returns Jersey with an empty ISO3 code, so the automatic fetch drops it. Source: [Worldwide Governance Indicators, Regulatory Quality estimate, Jersey](https://api.worldbank.org/v2/country/JEY/indicator/GOV_WGI_RQ.EST?format=json&mrnev=1).
- `wgi_rl` = 1.6362591 (2025): Same WGI series the pipeline uses; the World Bank API returns Jersey with an empty ISO3 code, so the automatic fetch drops it. Source: [Worldwide Governance Indicators, Rule of Law estimate, Jersey](https://api.worldbank.org/v2/country/JEY/indicator/GOV_WGI_RL.EST?format=json&mrnev=1).
- `wgi_cc` = 1.0243769 (2025): Same WGI series the pipeline uses; the World Bank API returns Jersey with an empty ISO3 code, so the automatic fetch drops it. Source: [Worldwide Governance Indicators, Control of Corruption estimate, Jersey](https://api.worldbank.org/v2/country/JEY/indicator/GOV_WGI_CC.EST?format=json&mrnev=1).
- `life_expectancy` = 83.2 (2024): Life expectancy at birth, three-year average 2022-2024 (both sexes). Source: [Jersey Better Life Index 2025](https://stats.je/wp-content/uploads/2026/03/R-Better-Life-Index-2025-K7SD-SJ20260325.pdf).
- `homicide_rate` = 0.0 (2024): Homicides per 100,000 people, three-year average 2022-2024, derived by Statistics Jersey from police statistics (OECD Better Life definition). Source: [Jersey Better Life Index 2025](https://stats.je/wp-content/uploads/2026/03/R-Better-Life-Index-2025-K7SD-SJ20260325.pdf).

US citizens: No US-Jersey income tax treaty; US tax applies on worldwide income with foreign tax credit for Jersey tax. The HVR deemed-income minimum may not be fully creditable.

## Open questions

- P.51/2026: the States Assembly site (statesassembly.je) blocks automated access, so its text could not be read. The only mention found is a commercial guide (Global Law Experts) saying it 'sharpened the minimum tax and housing expectations', with no figures. A separate proposition, P.19/2026 (Deputy Renouf), to cap the number of 2(1)(e) grants was scheduled for debate on 25 February 2026 and opposed by the Council of Ministers; its outcome was not verified. Revenue Jersey's HVR guidance (checked 2026-10-15) shows no 2026 change except independent taxation of spouses. HVR terms are recorded as on gov.je.
- Whether the 2023 proposals (£3.5m property minimum, £10m net worth expectation) were applied exactly as proposed.
- Non-employed residents' social security / long-term care charge on unearned income not modelled.

## Sources

- Jersey - Individual - Taxes on personal income: <https://taxsummaries.pwc.com/jersey/individual/taxes-on-personal-income>
- Jersey - Individual - Other taxes: <https://taxsummaries.pwc.com/jersey/individual/other-taxes>
- Jersey Budget Measures for 2026: <https://orbitax.com/news/country/article/Jersey-Budget-Measures-for-202-60897>
- Tax information for High Value Residents: <https://www.gov.je/TaxesMoney/IncomeTax/Technical/Guidelines/Pages/TaxInformationHighValueResidents.aspx>
- Stamp Duties and Fees (Jersey) Law 1998, Schedule 3 (Probate fees): <https://www.jerseylaw.je/laws/current/l_8_1998>
- Government raising minimum tax payments for new high value residents (2023): <https://www.gov.je/News/2023/Pages/GovernmentRaisingMinimumTaxPayments.aspx>
- Jersey - Individual - Residence: <https://taxsummaries.pwc.com/jersey/individual/residence>
- Jersey - Corporate - Taxes on corporate income: <https://taxsummaries.pwc.com/jersey/corporate/taxes-on-corporate-income>
- Jersey - Corporate - Withholding taxes: <https://taxsummaries.pwc.com/jersey/corporate/withholding-taxes>
- Jersey College for Girls - Fees: <https://jerseycollegeforgirls.com/jcg/fees>
- Jersey Better Life Index 2025: <https://stats.je/wp-content/uploads/2026/03/R-Better-Life-Index-2025-K7SD-SJ20260325.pdf>
- Livingroom - Property to rent (Guernsey and Jersey): <https://www.livingroomproperty.com/rent>
- Worldwide Governance Indicators, Control of Corruption estimate, Jersey: <https://api.worldbank.org/v2/country/JEY/indicator/GOV_WGI_CC.EST?format=json&mrnev=1>
- Worldwide Governance Indicators, Government Effectiveness estimate, Jersey: <https://api.worldbank.org/v2/country/JEY/indicator/GOV_WGI_GE.EST?format=json&mrnev=1>
- Worldwide Governance Indicators, Political Stability and Absence of Violence/Terrorism estimate, Jersey: <https://api.worldbank.org/v2/country/JEY/indicator/GOV_WGI_PV.EST?format=json&mrnev=1>
- Worldwide Governance Indicators, Regulatory Quality estimate, Jersey: <https://api.worldbank.org/v2/country/JEY/indicator/GOV_WGI_RQ.EST?format=json&mrnev=1>
- Worldwide Governance Indicators, Rule of Law estimate, Jersey: <https://api.worldbank.org/v2/country/JEY/indicator/GOV_WGI_RL.EST?format=json&mrnev=1>
- Worldwide Governance Indicators, Voice and Accountability estimate, Jersey: <https://api.worldbank.org/v2/country/JEY/indicator/GOV_WGI_VA.EST?format=json&mrnev=1>

## Change log

- 2026-10-15: initial research.
- 2026-10-15: data-quality pass: added rent (Livingroom, Jersey 4-5 bedroom lettings, £4,800/month); added duration_note to the HVR regime; P.51/2026 still unread (site blocks access), open question rewritten; added indicator overrides: WGI 2025 (six estimates from the World Bank API), life expectancy 83.2 and homicide rate 0.0 (Statistics Jersey Better Life Index 2025).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
