# Japan — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Japan taxes gains on listed shares and listed-company dividends separately at 20.315% (15.315% national including reconstruction surtax plus 5% local), but for 2025 and 2026 a minimum tax of 22.5% applies to aggregate income above JPY 330 million, and from 2027 the threshold is JPY 165 million at 30% (per PwC), so very large realised gains face more. There is no wealth tax. Inheritance and gift tax is among the world's highest: 10% to 55% on each heir's statutory share above a basic deduction of JPY 30 million plus 6 million per statutory heir. Foreigners on working-type visas who have lived in Japan 10 years or less in the last 15 are taxed only on Japanese assets at death, and for the first 5 years non-permanent residents are taxed on foreign income only if it is paid in or remitted to Japan. An exit tax applies to departing residents with JPY 100 million or more of securities.

US citizens: US citizens remain US-taxed; Japan's 20.315% on gains/dividends is creditable against US tax. The US-Japan estate and gift tax treaty coordinates the two inheritance taxes (details not verified). Japanese investment trusts are PFICs.

## Residence and eligibility

Resident if domiciled (jusho, centre of life) in Japan or with a residence (kyosho) for one year or more. Foreigners are non-permanent residents until their stay exceeds 5 years in the last 10.

- **Business Manager / Highly Skilled Professional and other work-type visas** (EU, US, OTHER): Japan has no passive investor or golden visa; residence requires a work, business-manager or family-based status. Business Manager requires setting up and running a business in Japan (capital and staffing requirements were reportedly tightened in 2025; not verified).

## Capital gains

### Standard regime

Gains on listed shares are taxed separately at 20.315% (income tax 15% + 2.1% reconstruction surtax on it + 5% local inhabitant tax). Unlisted shares are also taxed separately at 20.315%, and listed and unlisted losses cannot offset each other. Real estate: 20.315% if held more than 5 years at 1 January of the sale year, 39.63% if shorter. Minimum tax on high earners: for 2025 and 2026, 22.5% of aggregate income (including separately taxed gains) above JPY 330 million, charged to the extent it exceeds regular tax; per PwC, from 2027 the threshold falls to JPY 165 million and the rate rises to 30%.

- **Exemptions and thresholds:** NISA tax-free accounts (limited amounts, not relevant at this scale). Minimum tax threshold JPY 330 million (2025-2026).
- **Important exceptions, statute references and announced changes:** Exit tax (Income Tax Act art. 60-2; NTA Tax Answer 1478): residents who lived in Japan more than 5 of the last 10 years and hold JPY 100 million or more of securities and similar assets are deemed to sell them on departure; payment can be deferred 5 (up to 10) years with a tax agent and collateral. Gifts or bequests of such assets to non-residents trigger the same deemed sale.
- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 20.32% (0.20315); listed domestic 20.32% (0.20315); listed foreign 20.32% (0.20315); private business sale 20.32% (0.20315); local real estate 20.32% (0.20315); foreign real estate 20.32% (0.20315).
- **How derived:** Separate taxation at 15.315% national + 5% local = 20.315% for listed and unlisted shares and long-term real estate. Foreign listed shares through a Japanese broker are taxed the same way. Not modelled: the minimum tax, which lifts the effective rate towards 22.5% on income far above JPY 330 million (2025-2026) and towards 30% above JPY 165 million from 2027.
- **Holding period:** Real estate: more than 5 years (counted to 1 January of the year of sale) for 20.315%, otherwise 39.63%. No holding period for shares.
- **Trader recharacterisation:** Share gains of individuals remain separately taxed at 20.315% even for active traders; business-scale trading of other assets falls into aggregate income (top about 55.945%).
- **Foreign assets:** Permanent residents are taxed on worldwide gains with a foreign tax credit. Foreign asset report required above JPY 50 million (not verified).

### Non-permanent resident + temporary foreigner (first 5 years) (special regime)

Non-permanent residents are taxed on income other than foreign-source income, and on foreign-source income paid in Japan or remitted from abroad (Income Tax Act art. 7(1)(ii)). Since the 2017 reform, gains on securities are treated as non-foreign-source (taxed in full regardless of remittance) when the securities were acquired during a period as a non-permanent resident within the 10 years before the sale. Gains on securities acquired BEFORE becoming resident in Japan ('specified securities') are foreign-source when sold on a foreign exchange, through a foreign broker, or from a foreign custody account, and are taxed only if paid in Japan or remitted (Order art. 17(1)). Foreign listed gains are coded at 20.315% because any portfolio turnover after arrival creates fully taxable holdings.

- **Conditions:** Remittance basis for pre-arrival holdings only: the 0% foreign real estate rate and the remittance-only treatment of pre-arrival foreign securities ASSUME the proceeds are kept abroad and not remitted (remittances are deemed to come first from other foreign-paid taxable income, Order art. 17(4)). Securities bought while a non-permanent resident are taxed at 20.315% regardless of remittance.
- **Tax year / confidence / verification:** 2026 / medium / verified (checked 2026-10-15)
- **JSON numbers:** headline 20.32% (0.20315); listed domestic 20.32% (0.20315); listed foreign 20.32% (0.20315); private business sale 20.32% (0.20315); local real estate 20.32% (0.20315); foreign real estate 0% (0.0).
- **How derived:** listed_securities_foreign 20.315% (15.315% national incl. reconstruction surtax + 5% local): applies to securities acquired while a non-permanent resident (Order art. 17(1), last 10 years) and to remitted gains on pre-arrival holdings; a family that never sells or remits pre-arrival holdings could pay 0% on those, which is not scored. Foreign real estate: foreign-source, taxable only if paid in Japan or remitted (0% if kept abroad). Domestic listed shares, private business and Japanese real estate: as standard.

Open points for this tax: How the 'acquired while a non-permanent resident' test treats funds or ETFs bought abroad before arrival and later reinvested (Order art. 17(2) first-in-first-out matching) was not checked against NTA guidance.

## Dividends

### Standard regime

Dividends are in principle aggregate income (top about 55.945%, with a small dividend credit for Japanese dividends), but dividends from listed companies (shareholders under 3%) can be taxed separately at 20.315%, which is final. Foreign listed dividends received through a Japanese payer are taxed at 20.315% after foreign withholding, with a foreign tax credit available by filing.

- **Exemptions and thresholds:** None at this scale.
- **Important exceptions, statute references and announced changes:** Holders of 3% or more of a listed company, and owners of unlisted companies, are taxed at aggregate rates up to about 55.945% on dividends (minus dividend credit).
- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 55.95% (0.55945); domestic 20.32% (0.20315); foreign gross 20.32% (0.20315); foreign tax relief: credit.
- **How derived:** Listed portfolio dividends: separate taxation 20.315% (domestic and foreign listed). Headline = aggregate top rate 45% x 1.021 + 10% = 55.945% for non-listed/large holdings.
- **Outbound withholding:** 20.42% on dividends to non-residents (15.315% for listed dividends to portfolio holders), reduced by treaty.
- **Treaty network:** Broad network covering the US, EU and Asian partners (count not verified).
- **Holding companies:** Large companies in Tokyo pay about 31.5% effective; a defense special corporate tax of 4% of national CIT applies from 2026. Small family companies face an additional tax on retained earnings (not verified). No holding structure is modelled: an asset-management company pays roughly 30% or more on portfolio gains and on foreign portfolio dividends (the 95% foreign-dividend exclusion needs a 25% stake, and only 20% of domestic dividends on stakes under 5% are excluded; PwC), against 20.315% for an individual, and its distributions are taxed to the family at progressive rates up to about 55% less the dividend credit. The inheritance-valuation rules for share-holding companies (net asset value less a deduction for unrealised gains, which reportedly excludes gains on assets contributed in kind; not verified) do not make up for this on a listed portfolio.

### Non-permanent resident + temporary foreigner (first 5 years) (special regime)

Foreign dividends paid and kept abroad are not taxed for a non-permanent resident; amounts remitted to Japan are taxed. Japanese dividends as standard.

- **Conditions:** Remittance basis: the 0% foreign_gross_rate ASSUMES foreign dividends are paid and kept abroad. Amounts remitted to Japan are taxed (remittances are deemed to come first from other foreign-paid non-foreign-source income, then from foreign-source income, Order art. 17(4)). Dividends paid through a Japanese broker are paid in Japan and fully taxed.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 55.95% (0.55945); domestic 20.32% (0.20315); foreign gross 0% (0.0); foreign tax relief: exemption.
- **How derived:** Foreign-source dividends not paid in or remitted to Japan are outside the charge; remitted amounts taxed (aggregate rates or 20.315%). Remittance ordering rules are complex.

## Inheritance and gifts to children

### Standard regime

Inheritance tax is charged on heirs, but computed on the estate: the basic deduction (JPY 30 million + 6 million per statutory heir) is subtracted, the remainder is divided notionally by statutory shares, each share is taxed at progressive rates from 10% to 55% (above JPY 600 million), and the total is allocated to the actual recipients. Gifts are taxed at similar progressive rates (annual exemption JPY 1.1 million per recipient); gifts within 7 years before death are added back. Permanent residents (and foreigners who have lived in Japan more than 10 of the last 15 years) are taxed on worldwide property.

- **Exemptions and thresholds:** Basic deduction JPY 30 million + JPY 6 million x number of statutory heirs (family of five with a surviving spouse: 4 heirs = JPY 54 million in total). Spouse credit (tax-free up to the larger of the statutory share or JPY 160 million; general knowledge, not verified). Coded exemption per child: JPY 13.5 million (= 54 million / 4 heirs).
- **Important exceptions, statute references and announced changes:** Optional inheritance-time settlement gift regime: parents aged 60+ to children aged 18+, 20% flat gift tax above a JPY 25 million lifetime deduction, credited against later inheritance tax. 'Temporary resident' and 'foreign decedent' rules exempt foreign property for foreigners who have lived in Japan 10 years or less in the last 15 (see special regimes).
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **JSON numbers:** basis `beneficiary`, children `taxed`, exemption 13,500,000 JPY, brackets (marginal): from 0 JPY: 10% (0.1); from 10,000,000 JPY: 15% (0.15); from 30,000,000 JPY: 20% (0.2); from 50,000,000 JPY: 30% (0.3); from 100,000,000 JPY: 40% (0.4); from 200,000,000 JPY: 45% (0.45); from 300,000,000 JPY: 50% (0.5); from 600,000,000 JPY: 55% (0.55); other transfer costs 0% (0.0).
- **Gifts:** Progressive gift tax up to 55% above JPY 1.1 million a year per recipient (special lower scale for gifts from parents/grandparents to adult descendants; not detailed), or the elective 20% inheritance-time settlement regime. Gifts within 7 years before death are added to the estate. (same as inheritance: False; tax-free after years: 7)
- **Business relief:** Business succession deferral for unlisted company shares exists (conditions not verified); listed portfolios get no relief.
- **Foreign assets:** Worldwide for Japanese nationals domiciled in Japan within the last 10 years and for foreigners beyond the temporary thresholds; only Japan-situs property for temporary foreigners and their heirs.
- **Residence/domicile rules:** NTA No.4138: temporary resident = holds a residence status and has lived in Japan 10 years or less in the 15 years before inheritance; foreign decedent = held a residence status and Japanese address at death. Japanese nationals stay in worldwide scope for 10 years after leaving.
- **Business relief covers listed shares:** False

### Non-permanent resident + temporary foreigner (first 5 years) (special regime)

While the decedent is a 'foreign decedent' and the heirs are temporary residents, only Japan-situs property is subject to inheritance tax; foreign property (e.g. a portfolio held with a foreign custodian in foreign securities) is outside the charge. Japanese property is taxed on the standard scale.

- **Conditions:** Decedent held a Table 1 residence status and lived in Japan 10 years or less in the last 15; heirs likewise temporary or non-resident foreigners.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** basis `beneficiary`, children `exempt_with_conditions`, exemption 13,500,000 JPY, brackets (marginal): from 0 JPY: 10% (0.1); from 10,000,000 JPY: 15% (0.15); from 30,000,000 JPY: 20% (0.2); from 50,000,000 JPY: 30% (0.3); from 100,000,000 JPY: 40% (0.4); from 200,000,000 JPY: 45% (0.45); from 300,000,000 JPY: 50% (0.5); from 600,000,000 JPY: 55% (0.55); other transfer costs 0% (0.0).
- **Gifts:** Gift tax likewise only on Japan-situs property for temporary foreigners. (same as inheritance: False; tax-free after years: 7)
- **Foreign assets:** Foreign-situs property exempt (shares/bonds situs = issuer's head office; deposits = branch).
- **Residence/domicile rules:** Brackets apply only to Japan-situs property.
- **Business relief covers listed shares:** False

### Temporary foreigner for inheritance tax (years 6 to 10) (special regime)

Foreign property outside inheritance tax; Japanese property taxed on the standard scale. Income tax as standard.

- **Conditions:** 10 years or less of residence in the past 15 years; Table 1 residence status.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** basis `beneficiary`, children `exempt_with_conditions`, exemption 13,500,000 JPY, brackets (marginal): from 0 JPY: 10% (0.1); from 10,000,000 JPY: 15% (0.15); from 30,000,000 JPY: 20% (0.2); from 50,000,000 JPY: 30% (0.3); from 100,000,000 JPY: 40% (0.4); from 200,000,000 JPY: 45% (0.45); from 300,000,000 JPY: 50% (0.5); from 600,000,000 JPY: 55% (0.55); other transfer costs 0% (0.0).
- **Gifts:** Only Japan-situs property. (same as inheritance: False; tax-free after years: 7)
- **Foreign assets:** Foreign-situs property exempt.
- **Residence/domicile rules:** Brackets apply only to Japan-situs property.
- **Business relief covers listed shares:** False

## Wealth tax

### Standard regime

No net wealth tax.

- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** Fixed asset tax of 1.4% a year on the appraised value of real property (plus city planning tax in urban areas, not verified); registration and licence tax 0.1-2% on registration.

## Special regimes

- **Non-permanent resident + temporary foreigner (first 5 years)** (`non_permanent_resident`; EU, US, OTHER; duration 5 years): A foreign national resident in Japan for 5 years or less in the last 10 is a non-permanent resident: taxed on Japan-source income and on foreign-source income only if paid in or remitted to Japan. During this time (and up to 10 years in the last 15) a foreigner holding a work-type residence status is a 'temporary' person for inheritance tax: foreign property is outside Japanese inheritance and gift tax. Eligibility: Non-Japanese national with a Japanese domicile; aggregate stay 5 years or less in the previous 10. For inheritance: holder of a residence status listed in Table 1 (work/business-type visas such as Business Manager; not permanent resident or spouse visas) with 10 years or less of residence in the past 15. A non-working family needs a qualifying visa; the Business Manager visa requires running a real business in Japan (requirements not verified).
  - Metrics that differ from standard: capital_gains, dividends, inheritance (details in the tax sections above).
- **Temporary foreigner for inheritance tax (years 6 to 10)** (`temporary_foreigner_years_6_10`; EU, US, OTHER; duration 5 years): After 5 years the foreigner becomes a permanent-resident taxpayer for income tax (worldwide income at standard rates), but remains outside inheritance and gift tax on foreign property until more than 10 years of residence in the last 15, provided the residence status remains a Table 1 (work-type) status. Eligibility: As for the non-permanent resident regime, years 6 to 10 of residence; not available to holders of permanent residence or spouse-type visas.
  - Metrics that differ from standard: inheritance (details in the tax sections above).

## Holding structures

No holding structure is modelled. An asset-management company (資産管理会社) is taxed at roughly 30% or more on gains and on foreign portfolio dividends: the 95% exclusion for foreign dividends needs a 25% stake, and only 20% of domestic dividends on stakes under 5% are excluded (PwC). An individual pays 20.315%. Profits paid out to the family are taxed at progressive rates up to about 55% less the dividend credit. The inheritance-tax valuation of share-holding companies (net asset value less a deduction for unrealised gains; reportedly not for gains on assets contributed in kind; not verified) does not offset this for a listed portfolio. See `holding_company_notes`.

## Company taxation (kept separate from personal tax)

Headline CIT rate: 31.52% (0.3152). National CIT 23.2%; combined effective rate about 31.52% for large companies in Tokyo (32.71% statutory before deducting enterprise taxes); smaller companies have reduced national rates on the first JPY 8 million. Defense special corporate tax of 4% of national CIT (after a JPY 5 million deduction) from fiscal years in 2026. Pillar Two: IIR from fiscal years beginning 1 April 2024; QDMTT and UTPR from 1 April 2026.

## Cost of living notes

City: Tokyo.
- Prime rent, monthly: 1,650,000 JPY (2026). Median asking rent of 59 unique listings with 4 or 5 bedrooms (4LDK/4SLDK/5LDK and larger) in Minato ward (Azabu, Hiroo, Akasaka, Shirokane, Takanawa) on SUUMO, all result pages read 15 October 2026; median floor area 211 m2, first quartile JPY 1.2 million, third quartile JPY 2.1 million. Rent excludes management fees; deposits and key money (often 1-2 months each) are extra. Source: SUUMO rental search: Minato-ku, Tokyo, 4K-5K+ layouts.
- International school, annual per child: 4,076,000 JPY (2026). The American School in Japan (Chofu campus), Grades 9-12 tuition 2026-27 JPY 3,826,000 plus annual capital assessment JPY 250,000. One-time fees: registration JPY 300,000 and building maintenance JPY 1,525,000. Source: Tuition & Fees (2026-27 Schedule of Tuition & Fees).
Purchase prices, health insurance and housekeeper costs not sourced. ASIJ is in Chofu; families choosing it often live in Chofu/Setagaya, where rents are well below Minato.

## Open questions

- Minimum tax on ultra-high income (22.5% above JPY 330 million in 2025-2026; 30% above JPY 165 million from 2027 per PwC) is not reflected in the CGT rates; for a gain of several billion yen the effective rate exceeds 20.315%.
- Non-permanent residents' foreign securities gains now verified against Income Tax Act art. 7 and Order art. 17 (e-Gov); the treatment of reinvested funds bought before arrival is not confirmed.
- Inheritance exemption per child is an approximation of Japan's estate-level basic deduction divided among four statutory heirs.
- Business Manager visa requirements not verified; cost of living: purchase prices, health insurance and housekeeper wages not sourced.

## Sources

- Japan - Individual - Income determination (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/japan/individual/income-determination
- Japan - Individual - Taxes on personal income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/japan/individual/taxes-on-personal-income
- No.1478 Exit taxation (国外転出をする場合の譲渡所得等の特例) (National Tax Agency Japan, tax_authority): https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1478.htm
- Japan - Individual - Other taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/japan/individual/other-taxes
- No.4155 Inheritance tax rates (相続税の税率) (National Tax Agency Japan, tax_authority): https://www.nta.go.jp/taxes/shiraberu/taxanswer/sozoku/4155.htm
- No.4138 Heirs living abroad and scope of inheritance tax (National Tax Agency Japan, tax_authority): https://www.nta.go.jp/taxes/shiraberu/taxanswer/sozoku/4138.htm
- Japan - Individual - Residence (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/japan/individual/residence
- Income Tax Act (Act No. 33 of 1965), Article 7 (scope of taxable income) (e-Gov Japanese Law (Digital Agency), legislation): https://laws.e-gov.go.jp/law/340AC0000000033
- Order for Enforcement of the Income Tax Act (Cabinet Order No. 96 of 1965), Article 17 (scope of taxable income of non-permanent residents) (e-Gov Japanese Law (Digital Agency), legislation): https://laws.e-gov.go.jp/law/340CO0000000096
- No.2010 Taxpayers who are individuals (residents, non-permanent residents, non-residents) (National Tax Agency, tax_authority): https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/2010.htm
- No.2875 Determination of residents and non-residents (National Tax Agency Japan, tax_authority): https://www.nta.go.jp/taxes/shiraberu/taxanswer/gensen/2875.htm
- Japan - Corporate - Taxes on corporate income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/japan/corporate/taxes-on-corporate-income
- SUUMO rental search: Minato-ku, Tokyo, 4K-5K+ layouts (SUUMO (Recruit Co., Ltd.), other): https://suumo.jp/jj/chintai/ichiran/FR301FC001/?ar=030&bs=040&ta=13&sc=13103&md=11&md=12&md=13&md=14&pc=50
- Tuition & Fees (2026-27 Schedule of Tuition & Fees) (The American School in Japan, other): https://www.asij.ac.jp/admissions/tuition-fees
- Japan - Corporate - Income determination (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/japan/corporate/income-determination

## Change log

- 2026-10-15: initial research.
- 2026-10-15: reviewed special-regime durations: non-permanent resident 5 years and temporary foreigner years 6-10 (5 years), unchanged.
- 2026-10-15 (data-quality pass): non-permanent-resident capital gains verified against Income Tax Act art. 7 and Order art. 17 (e-Gov): securities bought while a non-permanent resident are taxed regardless of remittance, pre-arrival holdings sold abroad only if remitted; confidence raised from low to medium, rate unchanged at 20.315%. Remittance assumptions now stated in eligibility_conditions for capital gains and dividends. Added cost of living: Minato 4-5 bedroom asking rent JPY 1,650,000 a month (SUUMO, n=59) and ASIJ Grades 9-12 fee JPY 4,076,000 (2026-27, tuition plus capital assessment).
- 2026-10-15: inheritance scope set to local assets only for non_permanent_resident, temporary_foreigner_years_6_10 in the structured data (foreign-situs property of temporary foreigners and their heirs is exempt); previously the scoring applied the rates to the worldwide estate, which overstated the tax.
- 2026-10-15: reviewed holding structures; none modelled (asset-management company taxed more heavily than direct holding); added a Holding structures section.
