# Netherlands — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

The Netherlands does not tax dividends and capital gains on a private portfolio as such. Instead, Box 3 taxes a deemed return on net assets held on 1 January at 36%: for 2026 the deemed return on investments is 6.00%, so a securities portfolio costs 2.16% of its value each year above a tax-free EUR 59,357 per person, which works as a wealth tax. Taxpayers may report a lower actual return (including unrealised gains) instead. A new actual-return system is expected from 1 January 2028. Shareholdings of 5% or more are taxed in Box 2 at up to 31%. Children pay inheritance and gift tax of 10% on the first EUR 158,669 and 20% above, after a EUR 26,230 inheritance exemption (2026).

## Residence and eligibility

Facts and circumstances (art. 4 General Taxation Act): durable personal ties such as a permanent home, family, registration and intended stay. As a rule of thumb an expatriate whose family moves with them is resident from arrival.

- **EU/EEA/Swiss free movement** (EU): Registration with the municipality (BRP); no permit.
- **Residence permit for third-country nationals** (US, OTHER): No residence-by-investment for passive investors was verified in this session (the former foreign investor scheme of EUR 1.25 million was closed in 2024, from general knowledge). US citizens can use the Dutch-American Friendship Treaty self-employed permit with a EUR 4,500 business investment (from general knowledge). Not verified.

Standard regime eligibility: Residence determined by all facts and circumstances (art. 4 AWR): durable personal ties such as a permanent home and family. Non-EU citizens need a residence permit.

## Capital gains

No separate capital gains tax on portfolio shares, bonds or investment real estate: they sit in Box 3, which taxes a deemed annual return on their value (see wealth tax). Gains on a substantial interest (5% or more of a company, alone or with partner/close relatives) are taxed in Box 2 at 24.5% on the first EUR 68,843 and 31% above (2026). The main home is in Box 1 and its sale is not taxed.

JSON values: headline rate 31% (`0.31`); listed securities domestic 0% (`0.0`), foreign 0% (`0.0`); private business sale 31% (`0.31`); local real estate 0% (`0.0`); foreign real estate 0% (`0.0`).

- **How the JSON numbers were derived:** Portfolio securities and investment real estate: 0 because realised gains are not taxed separately; their value is taxed annually through Box 3 (recorded under wealth_tax). Private business sale (>= 5%): Box 2 top rate 31%. Headline = the Box 2 top rate. Foreign real estate is in Box 3 but most treaties exempt it with progression.
- **Holding periods:** None.
- **Professional-trader risk:** Trading activity that goes beyond normal asset management ('meer dan normaal vermogensbeheer') moves results into Box 1 (result from other activities) at up to 49.5%; leveraged or highly active trading carries this risk.
- **Foreign assets:** Worldwide assets in Box 3; foreign real estate usually exempt under treaties or unilateral relief (with progression).
- **Exemptions and thresholds:** Box 3 allowance EUR 59,357 per person (2026), applied to the wealth base, not to gains.
- **Eligibility conditions:** Resident individual; holdings below 5%.
- **Regional differences:** None.
- **Important exceptions / announced changes:** Under the planned actual-return system (expected 1 January 2028) Box 3 would tax actual returns at 36%, including unrealised value changes on most listed assets (capital-gains-style for real estate and start-up shares); not in force. Box 2 exit tax: emigrating holders of a substantial interest get a protective assessment on the unrealised gain (from general knowledge).
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **Sources:** [Netherlands - Individual - Income determination](https://taxsummaries.pwc.com/netherlands/individual/income-determination); [Netherlands - Individual - Taxes on personal income](https://taxsummaries.pwc.com/netherlands/individual/taxes-on-personal-income); [Wat is mijn werkelijk rendement? (box 3)](https://www.belastingdienst.nl/wps/wcm/connect/nl/box-3/content/wat-is-mijn-werkelijk-rendement)

## Dividends

Portfolio dividends are not taxed as income: they are part of the Box 3 deemed return. Dutch dividends bear 15% dividend withholding tax, which a resident credits against income tax. Foreign withholding tax can be credited against the Box 3 tax under treaties and the unilateral decree (limited). Dividends from a substantial interest (5%+) are taxed in Box 2 at 24.5%/31%.

JSON values: headline 31% (`0.31`); domestic 0% (`0.0`); foreign gross 0% (`0.0`); foreign tax relief: credit.

- **How the JSON numbers were derived:** Portfolio dividends: 0 as separate income tax (the asset value is taxed via Box 3 under wealth_tax). Headline: Box 2 top rate 31% for substantial interests.
- **Outbound withholding:** 15% dividend withholding tax on dividends paid by Dutch companies, reduced by treaties and to 0% for qualifying EU/treaty corporate parents; a conditional withholding tax applies to payments to low-tax jurisdictions.
- **Treaty network:** About 95 income tax treaties, including the US and all EU states (count from general knowledge).
- **Holding-company notes:** Modelled as the structure regime 'beleggings_bv': moving the portfolio into a BV takes it out of Box 3 (2.16% a year on its value); the BV pays 19%/25.8% on actual realised dividends and gains (no participation exemption below 5%), and distributions are taxed in Box 2 at 24.5%/31%.
- **Exemptions and thresholds:** None.
- **Eligibility conditions:** Resident individual; holdings below 5% for Box 3 treatment.
- **Regional differences:** None.
- **Important exceptions / announced changes:** If the taxpayer opts for the actual return, dividends received count toward it.
- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **Sources:** [Netherlands - Individual - Income determination](https://taxsummaries.pwc.com/netherlands/individual/income-determination); [Netherlands - Individual - Taxes on personal income](https://taxsummaries.pwc.com/netherlands/individual/taxes-on-personal-income)

## Inheritance and gifts to children

Inheritance tax is charged on each heir. In 2026 a child has an exemption of EUR 26,230; the rest is taxed at 10% up to EUR 158,669 and 20% above. A spouse or partner has an exemption of EUR 828,035. The tax applies if the deceased lived in the Netherlands; Dutch nationals remain treated as resident for 10 years after emigrating, and for gift tax anyone remains resident for one year after leaving.

JSON values: basis `beneficiary`, bracket mode `marginal`, children `taxed`, exemption EUR 26,230, marginal brackets above the exemption: 10% (`0.1`) from EUR 0, 20% (`0.2`) from EUR 158,669; other transfer costs 0% (`0`); gifts same as inheritance: False; tax-free after years: None.

- **Gifts:** Gift tax uses the same rates (10% / 20% for children) with smaller exemptions: an annual exemption for gifts from parents to a child and a one-off higher exemption; gifts from the same donor in one calendar year are aggregated. Gifts made within 180 days before death are added to the estate.
- **Business relief:** BOR (bedrijfsopvolgingsregeling): 100% exemption up to a cap and 83% above for qualifying business assets with continuation conditions; investment assets and listed portfolios do not qualify. Covers listed portfolios: no.
- **Foreign assets:** Worldwide estate if the deceased was resident or deemed resident; credit or exemption for foreign tax under the unilateral decree and the few estate tax treaties.
- **Domicile / residence rules:** Dutch nationals who die within 10 years of leaving the Netherlands are treated as resident; anyone who makes a gift within one year of leaving is treated as resident for gift tax. The heir's residence does not matter.
- **Exemptions and thresholds:** Child EUR 26,230 (2026); disabled child EUR 78,671; partner EUR 828,035. Gift tax: annual exemption for gifts from parents to children and a one-off increased exemption (for a home, study or freely between ages 18 and 39), amounts not verified for 2026.
- **Eligibility conditions:** Deceased or donor resident (or deemed resident) in the Netherlands at the time of the transfer; non-resident donors/deceased are not taxed even on Dutch assets.
- **Regional differences:** None.
- **Important exceptions / announced changes:** Business succession facility (BOR): large exemption for qualifying business assets, not for investment assets; the BOR has been tightened in recent budgets (2025/2026 details not verified).
- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **Sources:** [Tarieven erfbelasting 2026](https://www.belastingdienst.nl/wps/wcm/connect/nl/erfbelasting/content/tarieven-erfbelasting); [Vrijstelling erfbelasting 2026](https://www.belastingdienst.nl/wps/wcm/connect/nl/erfbelasting/content/vrijstelling-erfbelasting); [Netherlands - Individual - Other taxes](https://taxsummaries.pwc.com/netherlands/individual/other-taxes)
- Surviving spouse (`spouse_treatment` `taxed`): Spouse is taxed at 10%/20% after a EUR 828,035 exemption (Belastingdienst 2026), roughly 20% effective on this estate.

## Wealth tax

Box 3 works as a wealth tax. On net assets held on 1 January (main home excluded) the law deems a return of 6.00% on investments and other assets, 1.28% on bank deposits (provisional) and -2.70% on debts (provisional) for 2026; the deemed return on the part above the allowance of EUR 59,357 per person (EUR 118,714 for partners) is taxed at 36%. For a securities portfolio that is 2.16% of its value a year. If the actual return (income plus realised and unrealised value changes, no allowance) is lower, the taxpayer can report it in the return and pay 36% of that instead.

JSON type: `broad`.

- **Component Box 3 deemed return tax on investments (6.00% x 36%)** (base `net_wealth_worldwide`, bracket mode `marginal`): allowance EUR 118,714, entry threshold EUR 0; brackets: 2.16% (`0.0216`) from EUR 0. Effective annual rate 6.00% deemed return x 36% = 2.16% on investments above the allowance of EUR 118,714 for a couple (EUR 59,357 each). Bank deposits: 1.28% x 36% = 0.46%; debts reduce the base at 2.70%. Main home excluded (Box 1). Foreign real estate usually exempt under treaties.
- **Property tax (not a wealth tax):** Municipal property tax (OZB) on the WOZ value, usually around 0.1% a year for owners of homes; the main home is also taxed in Box 1 through a notional rental value (eigenwoningforfait).
- **Exemptions and thresholds:** EUR 59,357 per person (2026); debts only count above EUR 3,800 per person. Children have their own allowance if they hold assets.
- **Eligibility conditions:** Resident individuals on worldwide assets; non-residents only on certain Dutch assets.
- **Regional differences:** None.
- **Important exceptions / announced changes:** Rebuttal: since Supreme Court rulings (2021, 2024) the tax may not exceed 36% of the actual return; the Wet tegenbewijsregeling box 3 lets taxpayers prove a lower actual return. A new Box 3 with taxation of actual returns is expected from 1 January 2028 (not in force). From 2026 own use of a second home is added to the actual return.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **Sources:** [Box 3-inkomen op de voorlopige aanslag 2026](https://www.belastingdienst.nl/wps/wcm/connect/nl/box-3/content/berekening-box-3-inkomen-2026); [Wat is mijn werkelijk rendement? (box 3)](https://www.belastingdienst.nl/wps/wcm/connect/nl/box-3/content/wat-is-mijn-werkelijk-rendement); [Netherlands - Individual - Other taxes](https://taxsummaries.pwc.com/netherlands/individual/other-taxes)

## Special regimes

None modelled; see the summary and open questions for regimes considered and rejected.

## Holding structures

**Modelled: investment BV (`beleggings_bv`, type `structure`).** The parents hold the portfolio through a BV of which they own at least 5%, so their shares are a substantial interest taxed in Box 2 and the portfolio leaves Box 3.

- **Box 3 avoided:** the 6.00% deemed return x 36% = 2.16% a year on the portfolio no longer applies (structure `wealth_tax.type` none). Savings kept personally stay in Box 3; the home stays in Box 1.
- **BV taxation:** corporate income tax 19% on the first EUR 200,000 and 25.8% above (2026), on actual realised dividends and gains. The participation exemption needs a 5% stake (and passes the portfolio-investment tests), so portfolio shares are fully taxed: JSON 0.258 for listed shares and dividends, credit for treaty withholding. A private business stake of 5%+ sold by the BV: 0 (participation exemption). Local real estate 0.258; foreign real estate null.
- **Payout:** Box 2 24.5% to EUR 68,843 per person and 31% above (art. 2.12 Wet IB 2001, 2026 text); partners can split Box 2 income. JSON `payout_tax_rate` 0.31 (top rate); on EUR 400,000 split between two parents the average would be about 28.8%. The BV withholds 15% dividend tax, credited.
- **Anti-avoidance:** loans from the BV above EUR 500,000 per shareholder (with partner) are a deemed Box 2 dividend (excessive borrowing rule, own-home loans excepted). Fiscal investment institution (FBI) shareholder limits not verified.
- **Inheritance:** inherited from the standard regime (the business succession facility does not cover investment assets). At death the shares are deemed disposed of in Box 2 unless the heirs elect a roll-over (strict conditions; a 7 August 2026 district-court case concerned a roll-over for a BV with no business). Emigration triggers a protective assessment on the Box 2 gain.
- **Setup:** contributing a Box 3 portfolio triggers no income tax. Running costs were not sourced and are omitted.
- **Outlook:** the planned actual-return Box 3 (expected from 2028, not in force) would tax unrealised gains annually at 36%, widening the BV's advantage.

Illustrative annual tax for the reference family: Box 3 about EUR 753k (modelled base); BV about EUR 507k including EUR 124k Box 2 tax on the payout (no running costs). The BV also wins in poor years because it is taxed on realised income only, while Box 3's counter-evidence rule narrows the gap.

## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 25.8% (`0.258`).

Corporate income tax 19% on the first EUR 200,000 and 25.8% above. Participation exemption for holdings of at least 5%. Dividend withholding tax 15%; conditional withholding tax on payments to low-tax jurisdictions.

Special zones: None.

## Cost of living notes

Amsterdam.

- Prime family rent: EUR 4,500/month, the median of 11 Amsterdam homes with 5+ rooms and 150 m² or more on
  Huurstunt.nl on 15 October 2026 (range EUR 3,750-8,950). Small sample of asking rents.
- International school: International School of Amsterdam, Grades 11-12, EUR 32,755 a year for 2026-2027.
- Not sourced: price per m², family health insurance, housekeeper.

## Open questions

- 30% ruling: an employment-income regime (30% tax-free allowance, falling to 27% from 2027). The partial non-resident status that kept Box 3 off worldwide assets was abolished from 2025, with grandfathering to the end of 2026 only for people who used it before 2024, so it gives a new arrival no Box 3 relief and is not modelled.
- Actual-return Box 3 expected from 2028; when enacted, CGT and dividend fields will need real rates (36% on actual returns).
- Residence routes for non-EU nationals not verified.
- (standard / capital_gains) Box 2 protective assessment on emigration was not re-verified.
- (standard / capital_gains) Parliamentary status of the actual-return bill (Wet werkelijk rendement box 3) as of October 2026: the Belastingdienst says 'likely' 1 January 2028.
- (standard / dividends) How far foreign dividend withholding tax can be credited against Box 3 tax (treaty credit limited to the Box 3 tax attributable to that income) was not verified.
- (standard / wealth_tax) The deposit and debt percentages for 2026 are provisional until early 2027; the 6.00% for investments is final.
- (standard / wealth_tax) The schema cannot express the 'lower of deemed or actual return' rule; in a year with a portfolio return below 6% the real tax is lower than modelled.
- (standard / inheritance) The 10-year (Dutch nationals) and 1-year (gifts) residence fictions (art. 3 SW 1956) and the gift exemptions for 2026 were not checked on an official page (Belastingdienst gift pages returned 404).
- (standard / inheritance) BOR changes in the 2026 budget were not verified.

US citizens: US-Netherlands income tax treaty and the 1969 US-Netherlands estate tax treaty apply. Box 3 tax on a deemed return is generally not creditable as a foreign income tax against US tax on actual dividends and gains (no matching income), so US citizens can face both.

## Sources

- [Netherlands - Individual - Income determination](https://taxsummaries.pwc.com/netherlands/individual/income-determination) — PwC Worldwide Tax Summaries (professional)
- [Netherlands - Individual - Taxes on personal income](https://taxsummaries.pwc.com/netherlands/individual/taxes-on-personal-income) — PwC Worldwide Tax Summaries (professional)
- [Wat is mijn werkelijk rendement? (box 3)](https://www.belastingdienst.nl/wps/wcm/connect/nl/box-3/content/wat-is-mijn-werkelijk-rendement) — Belastingdienst (tax_authority)
- [Box 3-inkomen op de voorlopige aanslag 2026](https://www.belastingdienst.nl/wps/wcm/connect/nl/box-3/content/berekening-box-3-inkomen-2026) — Belastingdienst (tax_authority)
- [Netherlands - Individual - Other taxes](https://taxsummaries.pwc.com/netherlands/individual/other-taxes) — PwC Worldwide Tax Summaries (professional)
- [Tarieven erfbelasting 2026](https://www.belastingdienst.nl/wps/wcm/connect/nl/erfbelasting/content/tarieven-erfbelasting) — Belastingdienst (tax_authority)
- [Vrijstelling erfbelasting 2026](https://www.belastingdienst.nl/wps/wcm/connect/nl/erfbelasting/content/vrijstelling-erfbelasting) — Belastingdienst (tax_authority)
- [Netherlands - Individual - Residence](https://taxsummaries.pwc.com/netherlands/individual/residence) — PwC Worldwide Tax Summaries (professional)
- [Netherlands - Corporate - Taxes on corporate income](https://taxsummaries.pwc.com/netherlands/corporate/taxes-on-corporate-income) — PwC Worldwide Tax Summaries (professional)
- [Huurstunt: huurwoningen in Amsterdam (listing sample)](https://www.huurstunt.nl/huren/amsterdam) — Huurstunt.nl (other)
- [International School of Amsterdam: Tuition Fees for School Year 2026-2027](https://www.isa.nl/fees/) — International School of Amsterdam (other)
- [Wet inkomstenbelasting 2001 (art. 2.12 Box 2 rates 2026)](https://wetten.overheid.nl/BWBR0011353/2026-01-01/) — Overheid.nl (legislation)
- [Netherlands - Corporate - Income determination](https://taxsummaries.pwc.com/netherlands/corporate/income-determination) — PwC Worldwide Tax Summaries (professional)
- [Aanmerkelijk belang en box 2 in 2026](https://www.portsighttax.com/insights/aanmerkelijk-belang-box-2-2026) — Portsight Tax (professional)

## Change log

- 2026-10-15: initial research.
- 2026-10-15: added prime rent (Huurstunt sample, EUR 4,500/month) and International School of Amsterdam fee (EUR 32,755, 2026-27).
- 2026-10-15: added the holding structure regime `beleggings_bv` (BV: 25.8% on realised gains and dividends, no Box 3, Box 2 payout 31%); Holding structures section.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
- 2026-10-16: added surviving-spouse treatment.
