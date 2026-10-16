# São Tomé and Príncipe — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

São Tomé and Príncipe taxes residents on worldwide income. Capital gains and investment income of individuals are subject to a final 15% tax unless aggregated with other income (progressive up to 30%), so foreign portfolio gains and dividends are taxed at about 15%. Inheritances and gifts to children are taxed at 5% of the value received. No wealth tax was identified. The only source found is EY's guides, which conflict on the dividend rate (15% vs 20%), and a 20% special surtax from 2023 may reach large incomes; confidence is low.

US citizens: US citizens remain fully US-taxed. STP's 15% on gains and dividends is at or below US long-term rates, so the US layer dominates; STP's 5% inheritance tax would apply in addition to any US estate tax. No US treaty.

## Residence and eligibility

Resident if any applies: more than 180 days in STP in a calendar year (with or without interruption); a residence available on 31 December presumed to be kept as a permanent residence; the core of business, professional or economic interests in STP; diplomatic staff or crew of STP-operated vessels/aircraft.

- **Residence visa** (EU, US, OTHER): Yearly residence visas may be granted to foreign citizens on request, renewable for equal periods (EY 2026). Naturalisation can be granted for significant investment or donation (discretionary).

## Capital gains

### Standard regime

Capital gains of individuals (Category D) are taxed under the PIT Code. Unless the taxpayer elects to aggregate them with other income (progressive rates up to 30%), the gross gain is subject to a final 15% tax. Residents are taxed on worldwide income, so gains on foreign securities are in scope.

- **Exemptions and thresholds:** No allowance for Category D gains other than small lottery prizes. Gain = proceeds less historical acquisition value (no indexation for individuals per EY).
- **Important exceptions, statute references and announced changes:** In 2023 a Special Personal Income Tax (IERS) of 20% was introduced on disposable income above STD 50,000 a month (EY; the currency unit and whether it reaches investment income are unclear). If it applies to capital income, the rate on large gains and dividends would be higher than scored. Companies pay 25% on gains as business income. Business-related gains of individuals fall into Category B at progressive rates.
- **Tax year / confidence / verification:** 2026 / low / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 15% (0.15); listed domestic 15% (0.15); listed foreign 15% (0.15); private business sale 15% (0.15); local real estate 15% (0.15); foreign real estate 15% (0.15).
- **How derived:** 15% final rate on Category D gains (EY 2026 personal guide); aggregation at up to 30% is optional and would be chosen only if cheaper. The possible 20% IERS surtax is not included.
- **Holding period:** None identified.
- **Trader recharacterisation:** Gains from a business or professional activity are Category B income taxed at progressive rates up to 30%.
- **Foreign assets:** Worldwide taxation of residents; double tax relief is a deduction listed in the PIT Code (mechanics not verified).

## Dividends

### Standard regime

Dividends are investment income (Category C). The EY personal guide states that the gross amount of Category C income is subject to a final 15% withholding tax unless the individual elects aggregation; it also states that only 50% of Category C income is taxable. EY's corporate guide gives a 20% WHT on dividends paid to residents. Scored at 15% for both domestic and foreign dividends.

- **Exemptions and thresholds:** 50% of Category C income taxable under aggregation (EY).
- **Important exceptions, statute references and announced changes:** Conflicting professional figures (15% final for individuals vs 20% dividend WHT). In 2023 a Special Personal Income Tax (IERS) of 20% was introduced on disposable income above STD 50,000 a month (EY; the currency unit and whether it reaches investment income are unclear). If it applies to capital income, the rate on large gains and dividends would be higher than scored.
- **Tax year / confidence / verification:** 2026 / low / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 15% (0.15); domestic 15% (0.15); foreign gross 15% (0.15); foreign tax relief: credit.
- **How derived:** 15% final rate on the gross dividend (EY personal guide). If the corporate guide's 20% WHT applies to individuals, the domestic rate would be 0.20. Foreign dividends assumed at the same 15% rate with credit for foreign tax (double tax relief listed among PIT Code deductions; not verified).
- **Outbound withholding:** 20% on dividends paid to residents and non-residents (EY corporate guide).
- **Treaty network:** Two treaties: Portugal (2017) and Cape Verde (2021). No US treaty, so US dividends bear 30% US WHT.
- **Holding companies:** 25% CIT; participation exemption for domestic dividends (100% with 20% holding for one year, otherwise 50%). Not modelled.

## Inheritance and gifts to children

### Standard regime

Inheritance and gift tax is charged on the beneficiary at 5% for lineal descendants, ascendants and the spouse (10% siblings, 15% others), on the net market value of the assets received. Gifts are taxed at the same rates.

- **Exemptions and thresholds:** Under certain conditions an amount equal to 1,000 national minimum monthly salaries (minimum wage STN 2,500 in 2025, so about STN 2.5 million) is deducted from the taxable amount; not applied in the JSON because the conditions are unknown. Pensions and death grants, and charitable donations, are outside the tax.
- **Important exceptions, statute references and announced changes:** Territorial scope (whether foreign assets of a resident decedent or donor are taxed) was not stated by EY.
- **Tax year / confidence / verification:** 2026 / low / partially_verified (checked 2026-10-15)
- **JSON numbers:** basis `beneficiary`, children `taxed_low`, scope `worldwide`, exemption 0 STN, brackets (marginal): 5% from 0; other transfer costs 0% (0.0).
- **Gifts:** Same 5% rate for gifts to children. (same as inheritance: True; tax-free after years: None)
- **Foreign assets:** Not stated; scored as worldwide (conservative).
- **Residence/domicile rules:** Not researched.
- **Business relief covers listed shares:** False

**Surviving spouse:** 5% for lineal descendants, ascendants and the spouse alike, with no spousal exemption apart from a conditional deduction of 1,000 minimum monthly salaries whose conditions are unknown (EY 2026).

## Wealth tax

### Standard regime

No net wealth tax is mentioned in EY's 2026 guide, which lists PIT, inheritance and gift tax and social security for individuals.

- **Tax year / confidence / verification:** 2026 / low / unverified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** Property taxes not researched.

## Special regimes

None modelled; see Residence and eligibility.

## Company taxation (kept separate from personal tax)

Headline CIT rate: 25% (0.25). 25% CIT (IRC); capital gains taxed as business income; 20% WHT on dividends, with a participation exemption for resident parent companies; foreign income taxable with a credit.
Special zones/regimes: Agricultural companies: 50% exemption. Simplified regime for small companies.

## Cost of living notes

Not researched in this pass: no cost item could be sourced quickly from an agency report, school fee page or comparable source, so `cost_of_living` is omitted.

## Open questions

- Only EY guides were reachable; no tax authority or legislation source was consulted.
- EY's PIT bracket figures mix new (STN) and old (STD) dobra units (e.g. 'STN 11,700,000, approx. USD 526'), so local thresholds are not recorded.
- How a resident declares and pays the 15% tax on foreign gains with no local withholding agent was not verified.
- Scope of the 20% IERS (2023) for investment income not verified.
- Which rate applies to dividends received by resident individuals (15% final, 20% WHT, or 50% inclusion at progressive rates) needs confirmation from the PIT Code.
- Whether foreign-situs assets are taxed and the conditions for the 1,000-minimum-salaries deduction are unverified.
- No source explicitly confirms the absence of a wealth tax or describes property taxes.

## Sources

- EY Worldwide Personal Tax and Immigration Guide 2025-26 (March 2026 edition) (EY, professional): https://www.ey.com/content/dam/ey-unified-site/ey-com/en-gl/technical/tax-guides/documents/ey-gl-worldwide-personal-immigration-tax-guide-03-2026.pdf
- EY Worldwide Corporate Tax Guide 2025 (October 2025 edition) (EY, professional): https://www.ey.com/content/dam/ey-unified-site/ey-com/en-gl/technical/tax-guides/documents/ey-worldwide-corporate-tax-guide-10-2025.pdf

## Change log

- 2026-10-15: initial research.
- 2026-10-16: added surviving-spouse treatment.
