# Sint Maarten — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Sint Maarten taxes residents on worldwide income under a schedular system. Passive capital gains are exempt except on a substantial (5%+) shareholding (19.5%); dividends are taxed at the progressive rates up to 47.5% (including a 25% surtax), with credit for foreign tax. A pensioner's regulation lets eligible new residents pay 10% on foreign income (or progressive tax on deemed income of XCG 500,000). Inheritance and gift tax apply; the rates were not verified and are assumed to follow the former Netherlands Antilles table (2%-6% for children). No wealth tax and no real property tax.

US citizens: US citizens remain subject to US federal tax; no US treaty.

## Residence and eligibility

Centre of existence in Sint Maarten (Deloitte 2026).

- **Dutch nationals** (EU): Conditional right of admission for Dutch citizens; other EU citizens need a permit (not researched).
- **Residence permit** (EU, US, OTHER): Not researched.

## Capital gains

### Standard regime

Capital gains of individuals who are not entrepreneurs (passive gains) are exempt, except gains on a substantial shareholding (5% or more), taxed at a special 19.5% rate. Entrepreneurs' gains are taxed at the progressive rates.

- **Important exceptions, statute references and announced changes:** Protective assessment on emigration for 5%+ shareholdings; 4% transfer tax on real estate purchases.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 19.5% (0.195); listed domestic 0% (0.0); listed foreign 0% (0.0); private business sale 19.5% (0.195); local real estate 0% (0.0); foreign real estate 0% (0.0).
- **How derived:** Deloitte Sint Maarten Highlights 2026: passive gains exempt unless 5%+ shareholding; 19.5% special rate for substantial share interest. private_business_sale assumes a 5%+ stake.
- **Trader recharacterisation:** Gains in an individual's business are taxed at progressive rates up to 47.5%.

### Pensioner's regulation (10% on foreign income) (special regime)

Foreign substantial-interest gains assumed taxed at 10%; portfolio gains remain exempt.

- **Tax year / confidence / verification:** 2026 / low / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 10% (0.1); listed domestic 0% (0.0); listed foreign 0% (0.0); private business sale 10% (0.1); local real estate 0% (0.0); foreign real estate 0% (0.0).
- **How derived:** Foreign income at 10%; private_business_sale assumes a foreign company (by analogy with Curacao).

Open points for this tax: Primary legislation not opened.

## Dividends

### Standard regime

Dividends are income from movable assets, taxed at progressive rates up to 47.5% (top band above XCG 161,540 in 2026, including the 25% surtax). A 19.5% rate applies to dividends from a substantial interest. Foreign tax is credited up to the Sint Maarten tax on that income. No dividend withholding tax.

- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 47.5% (0.475); domestic 47.5% (0.475); foreign gross 47.5% (0.475); foreign tax relief: credit.
- **How derived:** Deloitte 2026 individual table: 47.5% (incl. 25% surtax) above XCG 161,540; credit for foreign tax limited to the local tax on that income.
- **Outbound withholding:** No WHT on dividends, interest or royalties.
- **Treaty network:** Four tax treaties (incl. the Tax Arrangement for the Kingdom) and 23 TIEAs.

### Pensioner's regulation (10% on foreign income) (special regime)

Foreign dividends taxed at 10% flat under the pensioner's regulation; domestic dividends as standard.

- **Tax year / confidence / verification:** 2026 / low / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 10% (0.1); domestic 47.5% (0.475); foreign gross 10% (0.1); foreign tax relief: none.
- **How derived:** Deloitte 2026: option for 10% flat rate on foreign income.

Open points for this tax: Eligibility conditions, home-ownership and age requirements not verified for Sint Maarten.

## Inheritance and gifts to children

### Standard regime

Deloitte 2026 confirms that inheritance tax and gift tax apply in Sint Maarten. Sint Maarten inherited the Netherlands Antilles Successiebelastingverordening 1908. Its current rates and exemptions were not found. The JSON assumes the descendant table that survives in Curacao's version of the same ordinance (2% to 50,000, 4% to 250,000, 6% above) with no exemption, which is a low-confidence placeholder.

- **Tax year / confidence / verification:** 2026 / low / unverified (checked 2026-10-15)
- **JSON numbers:** basis `beneficiary`, children `taxed`, exemption 0 XCG, brackets (marginal): from 0 XCG: 2% (0.02); from 50,000 XCG: 4% (0.04); from 250,000 XCG: 6% (0.06); other transfer costs 0% (0.0).
- **Gifts:** Gift tax applies (Deloitte); rates assumed equal to inheritance tax. (same as inheritance: True; tax-free after years: None)
- **Residence/domicile rules:** Under the shared Antillean ordinance the tax applies when the deceased or donor was resident (assumed).
- **Business relief covers listed shares:** False

Open points for this tax: Sint Maarten's own successiebelasting rates, exemptions for children and scope (resident deceased, worldwide) are not verified; the Curacao table and amendments since 2010 may differ.

## Wealth tax

### Standard regime

No net wealth tax.

- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** No real property tax; 4% transfer tax on real estate purchases (buyer).

## Special regimes

- **Pensioner's regulation (10% on foreign income)** (`pensioner_regulation`; EU, US, OTHER; duration indefinite): An eligible taxpayer may opt for a 10% flat rate on foreign income, or progressive tax on deemed foreign income of XCG 500,000 (Deloitte 2026). Designed to attract high-net-worth foreign individuals. Eligibility: Conditions not verified; in the sister regime in Curacao they include prior non-residence, minimum age and owning a home of a minimum value.
  - Why no fixed duration: No end date is mentioned in Deloitte's description; by analogy with the shared Antillean regime it applies for every year the conditions are met. Not verified against Sint Maarten law.
  - Metrics that differ from standard: capital_gains, dividends (details in the tax sections above).

## Company taxation (kept separate from personal tax)

Headline CIT rate: 34.5% (0.345). Profit tax 30% plus 15% surtax = 34.5%; participation exemption (5% or XCG 890,000); tax holidays for qualifying investment; no WHT.

## Cost of living notes

City: Dutch Sint Maarten (Point Blanche / Oyster Pond / Cole Bay / Madame Estate).

- Prime rent: USD 4,500 a month (2026), median of the four 4-5 bedroom houses/villas in Century 21 St. Maarten's long-term rental list on 15 Oct 2026: USD 3,500 (Point Blanche), 4,000 (Oyster Pond), 5,000 (Madame Estate, yearly rental), 9,000 (Cole Bay, 5 bed with pool). With a 4-bed Dawn Beach condo (USD 4,000) the median is USD 4,000. Thin sample.
- International school fee: USD 15,500 a year, Learning Unlimited Preparatory School Grades 6-12, 2026-27 (USD 1,550 x 10 months; plus USD 200 enrollment and USD 100 registration fees), from the school's tuition agreement PDF.
- Price per m2, health insurance, housekeeper: not sourced.

## Open questions

- Sint Maarten inheritance/gift tax rates and exemptions.
- Pensioner's regulation conditions.
- No WGI/World Bank indicators: no authoritative overrides were added.

## Sources

- Deloitte International Tax: Sint Maarten Highlights 2026 (Deloitte, professional): https://www.deloitte.com/content/dam/assets-shared/docs/services/tax/2026/dttl-tax-sintmaartenhighlights-2026.pdf
- Successiebelastingverordening 1908 (Curacao consolidated text 2026; shared Netherlands Antilles origin, used only as a comparison) (Government of Curacao, legislation): https://gobiernu.cw/wp-content/uploads/2026/05/85-GT.-Successiebelastingverordening-1908.pdf
- Century 21 St. Maarten: long-term rentals (Century 21 St. Maarten, other): https://www.century21-stmaarten.com/property_contract/long-term-rentals/
- Learning Unlimited Preparatory School: Tuition Enrollment Agreement 2026-2027 (Learning Unlimited Preparatory School, other): https://luprepschool.com/wp-content/uploads/2026/08/Tuition-Agreement-2026-2027-Pre-School-to-Grade-12.pdf

## Change log

- 2026-10-15: initial research.
- 2026-10-15: inheritance marked not_researched: Placeholder: Sint Maarten's own rates were not found; the Curaçao table is shown for reference only and the metric is treated as missing.
- 2026-10-15: cost of living added: prime rent USD 4,500 (median of four 4-5 bed long lets, Century 21, thin) and Learning Unlimited Preparatory School Grades 6-12 tuition USD 15,500 (2026-27).
