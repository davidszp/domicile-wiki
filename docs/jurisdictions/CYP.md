# Cyprus — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Cyprus does not tax gains on shares and bonds, and has no inheritance, gift or wealth tax. A new arrival without a
Cyprus domicile of origin is "non-dom" for 17 of 20 years. During that time Cyprus charges no Special Defence
Contribution (SDC) on dividends; the only charge is the 2.65% GHS health contribution, capped at EUR 180,000 of
income. After 17 years, SDC on dividends is 5% (2026 reform, down from 17%), and a 15% foreign withholding tax
usually offsets it in full. Non-dom status can be extended twice, by 5 years each time, for EUR 250,000 per extension.

## Residence and eligibility

- Tax residence: more than 183 days in the calendar year, or the 60-day rule. The 60-day rule requires at least
  60 days in Cyprus, no more than 183 days in any other single state, a Cyprus business, employment or directorship
  held at year end, and a permanent home in Cyprus all year. From 1 Jan 2026 the condition "not tax resident
  elsewhere" was dropped from the 60-day rule (PwC).
- EU citizens: free movement (MEU1 registration).
- Non-EU (including US): permanent residence by investment of EUR 300,000 excl. VAT (property, company or fund),
  plus secured income of EUR 50,000 + EUR 15,000 for the spouse + EUR 10,000 per child (GK Law Firm).
- Domicile for SDC: domicile of origin (father's at birth), or deemed domicile after 17 of the last 20 years of
  residence (SDC Law art. 2(3)).

## Capital gains

- Gains on "titles" (shares, bonds, options, fund units) are exempt from income tax unconditionally, including
  trading gains, for every resident, domiciled or not.
- Capital Gains Tax Law: 20% applies only to Cyprus immovable property and to shares of companies holding it. From
  2026 indirect holdings count where at least 20% of the value derives from Cyprus property (was 50%); listed
  shares are excluded.
- Lifetime exemptions from 2026: EUR 150,000 principal residence, EUR 50,000 farmland, EUR 30,000 other; overall
  cap EUR 150,000.
- Gifts to children are exempt from CGT.
- A 0.4% transfer levy applies to the proceeds of Cyprus property sales.
- Crypto gains are taxed at a flat 8% from 2026.
- JSON: listed domestic, listed foreign, private business and foreign real estate = 0.0. Local real estate = 0.2.
  Headline = 0.2.

## Dividends

- Dividends are exempt from personal income tax.
- SDC (domiciled residents only): 5% on profits of 2026 onwards. Profits up to 2025 stay at 17% if distributed by
  end-2031.
- GHS: 2.65% on dividend income, capped at EUR 180,000 of income. This is excluded from the rates.
- Foreign withholding tax is credited against SDC, unilaterally.
- JSON standard (domiciled): 0.05 domestic and foreign, with a credit. Non-dom regime: 0.0, not_applicable.
- Outbound withholding tax is generally 0%. 17% applies to companies in EU-blacklisted jurisdictions. From 2026
  there is a rate for related low-tax-jurisdiction recipients, which PwC states as both 5% and 17%.
- About 67 treaties, including the US.

## Inheritance and gifts to children

- Estate duty was abolished from 1 Jan 2000, and there is no gift tax.
- Parent-to-child free transfers of property pay nil Land Registry fees.
- Gifts to children are exempt from CGT.
- The Stamp Duty Law was repealed from 1 Jan 2026.
- The executor must file a statement of the deceased's assets with the Tax Department within 6 months of death.
- JSON: basis none, fully_exempt, other_transfer_cost_rate 0.

## Wealth tax

- None.
- The immovable property tax was abolished in 2017. Only small municipal fees remain.

## Special regimes

- **non_dom**: automatic for 17 of 20 years. It exempts dividends (and most interest) from SDC.
- Art. 3D of the SDC Law (in force 1 Jan 2026, Circular 2/2026 of 29 May 2026) allows a deemed-domiciled person to
  stay non-dom for up to two further 5-year periods. The price is EUR 250,000 upfront per period, irrevocable and
  non-refundable, with Commissioner approval.
- The application is due by 30 June of the first year of the period. The transitional deadline was 30 June 2026 for
  persons deemed domiciled in 2024-2026.
- This is not modelled as `lump_sum`, because it only buys continued SDC exemption in years 18-27. It is worth
  little now that SDC is 5% and creditable.

## Company taxation (kept separate from personal tax)

- Corporate income tax is 15% from 2026 (was 12.5%).
- Dividend income is generally exempt, and gains on titles are exempt.
- Deemed dividend distribution was abolished. Disguised dividend rules were added.
- Losses can be carried forward for 7 years.

## Cost of living notes

- Limassol: The Heritage Private School charges EUR 12,285 a year for Years 12-13 (2025-26).
- Prime rent: EUR 6,950 a month = median asking rent of 64 four- and five-bedroom villas/detached houses listed on
  Bazaraki on 2026-10-15 in the eastern coastal belt (Agios Tychonas, Germasogeia incl. Potamos, Mouttagiaka,
  Parekklisia, Pyrgos, Limassol Marina). Interquartile range EUR 5,500-12,000. Sample: 480 Limassol-district house
  listings, filtered by title (4-5 bedroom villa/detached) and rent >= EUR 1,000. Asking rents, not contract rents.
- Purchase price, health insurance and housekeeper costs are not sourced.

## Open questions

- The primary texts were not opened: the SDC Law as amended, Circular 2/2026 and the estate duty abolition law.
- PwC gives both 5% and 17% as the 2026 withholding tax on dividends to related low-tax-jurisdiction companies.
- The treatment of passive interest from 2026 is unresolved.
- Circular 2/2026: KPMG Cyprus (17 June 2026) confirms EUR 250,000 upfront per 5-year extension, at most two
  extensions, irrevocable and non-refundable. The Tax Department PDF KPMG links to redirected to the Tax Department
  home page on 2026-10-15, so the circular itself remains unread.
- Purchase price, health insurance and housekeeper costs have no source yet.

## Sources

- PwC, Cyprus individual taxes on personal income: https://taxsummaries.pwc.com/cyprus/individual/taxes-on-personal-income
- PwC, Cyprus individual other taxes: https://taxsummaries.pwc.com/cyprus/individual/other-taxes
- PwC, Cyprus income determination: https://taxsummaries.pwc.com/cyprus/individual/income-determination
- PwC, Cyprus residence: https://taxsummaries.pwc.com/cyprus/individual/residence
- PwC, Cyprus corporate withholding taxes: https://taxsummaries.pwc.com/cyprus/corporate/withholding-taxes
- KPMG Cyprus, Circular 2/2026 extensions of the non-dom regime: https://kpmg.com/cy/en/insights/tax-alerts/circular-2-2026-extensions-of-the-non-dom-regime.html
- EY Cyprus Tax Facts 2026: https://www.ey.com/en_cy/cyprus-tax-facts
- Trident Trust, Summary of Cyprus's 2026 tax reforms: https://www.tridenttrust.com/knowledge/news/summary-of-cyprus-s-2026-tax-reforms
- PwC Cyprus via Mondaq, Tax Facts 2023 inheritance tax: https://www.mondaq.com/cyprus/tax-authorities/1342608/tax-facts-figures-2023-inheritance-tax
- GK Law Firm, Cyprus residency by investment: https://gk-lawfirm.com/practice-areas/immigration-law/cyprus-residency-by-investment
- Heritage Private School fees 2025-26: https://www.heritageschool.ac.cy/_files/ugd/db7817_5c89941076374fd2a96b11ab343016b5.pdf
- Bazaraki, houses to rent in Limassol district: https://www.bazaraki.com/real-estate-to-rent/houses/lemesos-district-limassol/

## Change log
- 2026-10-15: initial research.
- 2026-10-15 (data-quality pass): added prime rent (Bazaraki sample, EUR 6,950/month); re-checked Circular 2/2026 via KPMG (official PDF unreachable).
