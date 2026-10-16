# Malta — family-office tax dossier

Last reviewed: 2026-10-16
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

A foreign family resident in Malta is normally ordinarily resident but not domiciled. Malta then taxes it on the
remittance basis:

- Foreign capital gains are never taxed, even if remitted.
- Foreign dividends are taxed only if remitted.
- A minimum tax of EUR 5,000 applies where unremitted foreign income is EUR 35,000 or more.

The Global Residence Programme (GRP, for non-EU nationals) and The Residence Programme (TRP, for EU nationals) give
15% on remitted foreign income with a EUR 15,000 minimum. From 2027 they are replaced by the Individual Tax
Programme (ITP) with a EUR 35,000 minimum. Applications by 31 Dec 2026 keep the old terms until 2031.

There is no inheritance, gift or wealth tax. Duty on documents applies to Maltese real estate (5%) and Maltese
shares (about 2%) on death or gift.

## Residence and eligibility

- Ordinary residence is tested on the facts; 183 or more days in a year generally makes a person resident.
- Domicile follows common-law principles: a foreigner stays non-domiciled unless they acquire a Maltese domicile of
  choice.
- EU citizens: free movement, with TRP available.
- Non-EU citizens: GRP (property of EUR 275,000 or rent of EUR 9,600 a year until end-2026; EUR 700,000 or
  EUR 14,000 under the ITP), or the Malta Permanent Residence Programme (MPRP). MPRP amounts after Legal Notice
  146/2025 are not verified.

## Capital gains

- **Domiciled residents (standard):** chargeable gains on shares, property, business, IP and partnership interests
  are taxed at marginal rates up to 35%.
  - Shares listed on the Malta Stock Exchange are exempt. Shares listed on foreign exchanges recognised by the
    Commissioner are exempt too, where the gain is capital in nature (PwC income determination; KPMG Malta on the
    Commissioner's November 2022 list: WFE members, NYSE, ESMA-registered EEA regulated markets). Units in some
    collective investment schemes may be excluded. Statute (art. 5(1) ITA) not read.
  - Maltese property pays a final tax of 8% of the transfer value (10% if acquired before 2004).
  - JSON: domestic listed 0, foreign listed 0 (was 0.35, corrected 2026-10-16), private business 0.35, local real estate 0.08 (on value),
    foreign real estate 0.35 (assumed).
- **Non-dom:** foreign gains are not taxed, even if remitted (PwC). JSON foreign = 0.

## Dividends

- Full imputation: dividends from Maltese companies carry a credit for the 35% corporate tax, so no further
  personal tax is due. JSON domestic 0.
- Foreign dividends:
  - Domiciled residents pay up to 35% with a credit for foreign tax.
  - Non-doms pay only on remitted amounts. JSON 0, which assumes the dividends are not remitted, plus the
    EUR 5,000 minimum.
  - GRP/TRP pay a flat 15% on remitted amounts, with a minimum of EUR 15,000.
- Malta levies no withholding tax on outbound dividends (general knowledge, not verified in this research).

## Inheritance and gifts to children

- No inheritance, estate or gift tax (PwC: "There are no inheritance, estate, or gift taxes in Malta").
- The Duty on Documents and Transfers Act (Cap. 364) charges duty on Maltese assets:
  - 5% on immovable property inherited or donated.
  - 2% on shares in Maltese companies (higher for property companies).
- Reliefs:
  - No duty on a dwelling passing from a parent to descendants (conditions apply).
  - An inherited dwelling occupied by the heirs pays 3.5%, up to EUR 400,000 from 28 Oct 2025.
  - A donation of residential property from parent to child is free on the first EUR 250,000, then 3.5%.
  - Gifts of marketable securities and family business premises to close relatives pay 1.5% until 31 Dec 2026.
- Foreign assets pay no duty.
- JSON: basis none, children_treatment taxed_low (duty only on Maltese situs assets), other_transfer_cost_rate 0
  (mostly foreign portfolio).

## Wealth tax

None. There is also no annual property tax.

## Special regimes

- **non_dom (remittance basis):** indefinite (`duration_note`): the remittance basis applies while the person is
  resident but not domiciled in Malta (Income Tax Act, Cap. 123, art. 4(1)); it ends only if Maltese domicile is
  acquired. Minimum tax EUR 5,000, modelled as `lump_sum`.
  - The 0% on foreign dividends assumes they are **not remitted** to Malta; remitted foreign income is taxed up to
    35% with credit. Foreign capital gains are untaxed even if remitted.
- **grp (GRP/TRP):** 15% on remitted foreign income, minimum EUR 15,000.
  - Individual Tax Programme Rules, 2026 (Legal Notice 195 of 2026, gazetted 14 July 2026, in force 1 Jan 2027):
    the 15% rate stays.
  - New minimum: EUR 35,000 for Global Resident and EU/EEA/Swiss Resident status, EUR 15,000 for retired
    pensioners, EUR 20,000 for UN pensioners.
  - Property: EUR 700,000 purchase or EUR 14,000 a year rent. Status lasts 5 years and is renewable (fee
    EUR 8,500).
  - Rule 3(3): status granted or applied for by 31 Dec 2026 continues until 31 Dec 2031; new statuses run 5 years
    and are renewable for further 5-year periods, so `duration_years` is null with a `duration_note`.
  - Read in the L.N. 195/2026 PDF on 2026-10-15: rule 3(1) categories (global resident; EU/EEA/Swiss resident;
    retired pensioner; UN pensioner), rule 3(2) fee EUR 8,500, rule 5(1) 15% on foreign income received in Malta by
    the beneficiary, spouse and dependent children, minimum EUR 35,000 for the first two categories and EUR 15,000
    for retired pensioners, payable in full in the first and last year; rule 5(3) other income at 35%.
  - Recipe modelling (2026-10-16): the JSON minimum is EUR 35,000, the long-run ITP figure (rule 5(1) proviso, one
    minimum for the beneficiary, spouse and dependent children); the first five years under the old terms (EUR 15,000)
    are not modelled. With 15% foreign withholding the Maltese 15% is relieved in full (art. 74), so only the minimum is due.
  - The 15% `foreign_gross_rate` assumes foreign dividends are remitted; unremitted dividends are untaxed but the
    minimum tax is due regardless.
  - For a family that does not remit income, the plain non-dom basis (EUR 5,000 minimum) is cheaper. GRP mainly
    provides the residence permit for non-EU nationals.

## Holding structures

No holding structure is scored for Malta.

- A Maltese company pays 35%. The shareholder refund (6/7 for ordinary income, 5/7 for passive interest and
  royalties, 2/3 where double tax relief is claimed; Legal 500/PKF) arises only when profits are distributed, so
  retained gains bear 35%.
- The FITWI election introduced in 2025 is a 15% final tax with a five-year lock-in (PwC Malta).
- Portfolio stakes of at least 5%, or an investment of about EUR 1.2m held 183 days, can be participating holdings
  with exemption, subject to anti-abuse conditions; not modelled.
- An arriving family is normally non-domiciled. Under the `non_dom` regime, foreign capital gains are never taxed and
  foreign dividends kept abroad are untaxed (EUR 5,000 minimum tax), so a company would add tax rather than save it.
  Only Malta-domiciled residents (the standard regime) could gain, and they are not the target family.

## Company taxation (kept separate from personal tax)

- Corporate tax is 35%, with refunds to shareholders under the imputation system (6/7 for trading income), for an
  effective rate of about 5%.
- A participation exemption applies.

## Cost of living notes

- Sliema / St Julian's; family villas are in Madliena, Swieqi, Ibragg, Attard/Balzan/Lija, Iklin and Santa Maria Estate.
- Prime rent: about EUR 7,000 a month. PropertyMarket.com.mt listed 176 houses and villas with 4+ bedrooms for rent in
  those localities on 2026-10-15. Its price-band counts: 54 at or below EUR 5,000, 71 at or below EUR 6,000, 98 at or
  below EUR 7,500, 127 at or below EUR 10,000. The median (88th listing) falls between EUR 6,000 and EUR 7,500, about
  EUR 7,000. Asking rents.
- School: Verdala International School, Grades 11-12 (IB Diploma) EUR 15,700 a year for 2026-27, plus a EUR 2,000
  annual capital contribution and one-time EUR 5,000 registration and EUR 300 administration fees.
- Purchase price, health insurance and housekeeper costs are not sourced.

## Open questions

- Legal Notice 195/2026 was read (PDF); Cap. 364 was not opened.
- The current TRP minimum was not verified separately.
- The statutory conditions of the foreign-listed shares exemption (art. 5(1) ITA) were not read; the exchange list comes from KPMG's report of the Commissioner's 2022 guidance.
- The MPRP amounts are unverified.
- The refund rules and the treaty count are unverified.

## Sources

- PwC, Malta taxes on personal income: https://taxsummaries.pwc.com/malta/individual/taxes-on-personal-income
- PwC, Malta income determination: https://taxsummaries.pwc.com/malta/individual/income-determination
- PwC, Malta other taxes: https://taxsummaries.pwc.com/malta/individual/other-taxes
- legislation.mt, L.N. 195 of 2026 Individual Tax Programme Rules: https://legislation.mt/eli/ln/2026/195/eng
- Deloitte Malta, Individual Tax Programme Rules 2026: https://www.deloitte.com/mt/en/services/tax/perspectives/tax-alerts/2026/individual-tax-programme-rules-2026.html
- BDO Malta, Malta introduces the ITP Rules 2026: https://www.bdo.com.mt/en-gb/insights/aml-and-compliance/malta-introduces-the-individual-tax-programme-rules-2026
- legislation.mt, L.N. 195 of 2026 Individual Tax Programme Rules (PDF): https://legislation.mt/eli/ln/2026/195/eng/pdf
- PropertyMarket.com.mt, houses & villas to rent, 4+ bedrooms, selected localities: https://www.propertymarket.com.mt/to-rent/?pc=1&nb=4&locations%5B%5D=Madliena&locations%5B%5D=Swieqi&locations%5B%5D=Ta%27+l-Ibragg&locations%5B%5D=Attard&locations%5B%5D=Balzan&locations%5B%5D=Lija&locations%5B%5D=Iklin&locations%5B%5D=Santa+Maria+Estate+%28Mellieha%29
- Verdala International School, Fees and Financial Conditions 2026-2027: https://www.verdala.org/attachments/download.asp?file=31&type=pdf
- [Malta - Corporate - Taxes on corporate income](https://taxsummaries.pwc.com/malta/corporate/taxes-on-corporate-income) — PwC Worldwide Tax Summaries (professional)
- [Malta: Taxation (shareholder refund system)](https://www.legal500.com/intelligence/malta/tax/taxation) — Legal 500 (PKF Malta) (professional)

## Change log
- 2026-10-15: initial research.
- 2026-10-15 (data-quality pass): added prime rent (EUR 7,000) and Verdala fee (EUR 15,700); duration_note for non_dom and grp; read L.N. 195/2026 itself (minimums, 5-year renewable term, transition to 2031); remittance assumptions stated in eligibility_conditions.
- 2026-10-15: added a Holding structures section and a holding_company_notes sentence explaining why no holding structure is scored (non-dom personal holding beats a company).
- 2026-10-15: children_treatment set to exempt_with_conditions: there is no inheritance or gift tax; duty applies only to transfers of Maltese assets (family home to descendants exempt under conditions, Maltese shares 2%), which the structured model cannot express as a rate on the estate.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
- 2026-10-16: standard capital gains on foreign listed securities corrected from 0.35 to 0 (shares on recognised foreign exchanges are exempt when the gain is capital; PwC income determination, KPMG Malta recognised stock exchanges). grp lump-sum minimum set to EUR 35,000, the ITP minimum from L.N. 195/2026 rule 5(1) that applies after the old terms end on 31 Dec 2031 (was EUR 15,000, which covers only the first five years).
