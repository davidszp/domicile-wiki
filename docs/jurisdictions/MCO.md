# Monaco — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

- Residents pay no personal income tax, so there is no tax on capital gains, dividends or interest.
- There is no wealth tax, no annual property tax and no council tax.
- Inheritance and gift tax applies only to assets situated in Monaco. It is 0% for children and spouses.
- Exception: French nationals stay taxable in France under the 1963 France-Monaco convention.

## Residence and eligibility

- A residence card (carte de séjour) and genuine establishment in Monaco are required.
- Non-EU nationals first need a French long-stay visa.
- The financial requirements (in practice a bank deposit in Monaco) are not verified.

## Capital gains

- None, because there is no personal income tax (government page "Tax in Monaco").
- JSON: all rates 0.

## Dividends

- None.
- Foreign withholding tax is a final cost, and the treaty network is minimal.
- JSON: 0, not_applicable.

## Inheritance and gifts to children

Government page "Inheritance tax" (updated 30/07/2026):

- Only property situated in Monaco is taxed, regardless of the deceased's domicile or nationality.
- Rates:
  - Direct line and spouses: 0%.
  - Siblings: 8%.
  - Uncles, aunts, nephews and nieces: 10%.
  - Other relatives: 13%.
  - Unrelated persons: 16%.
- JSON: beneficiary basis, fully_exempt, brackets [].

Re-checked 2026-10-15 on the government page: 0% in direct line (parents/children) and between spouses; 8% siblings, 10% uncles/aunts/nephews/nieces, 13% other relatives, 16% unrelated; tax only on Monaco-situs property whatever the deceased's domicile or nationality.

## Wealth tax

None (government page: "There is no wealth tax"). There is also no annual property tax.

## Special regimes

None. The ordinary regime is already zero-tax.

French nationals are the exception and the schema cannot express it, because "EU" covers them. The app must treat
them separately.

## Company taxation (kept separate from personal tax)

- Business Profit Tax (ISB) applies only to businesses with more than 25% of turnover outside Monaco. The rate was
  not stated in the source opened.
- VAT is charged as in France.

## Cost of living notes

Monaco.

- Prime family rent: EUR 28,500/month for a 4-bedroom flat of about 200-300 m² (midpoint of the EUR 22,000-35,000 asking rents of such flats on LuxuryEstate.com, 15 Oct 2026), consistent with prime rents of about EUR 114.50/m² a month ([Jarnias, 2026](https://www.jarniascyril.com/?p=25449)). The sample's EUR 110,000 median reflected 400-700 m² penthouses and duplexes and is not used.
- International school: International School of Monaco, Classes 10-13, EUR 34,400 a year for 2025/26 (latest published
  table); one-time registration EUR 2,000 and Capital Development Fund EUR 10,000 (EUR 25,000 in the 2026-27
  bilingual-section terms).
- Purchase registration duty 4.5% (transparent buyers) or 7.5%. Not sourced: price per m², health insurance,
  housekeeper.

## Open questions

- The details of the French convention.
- The residence card thresholds.
- The ISB rate.

- School fee is the 2025/26 ISM figure; the 2026/27 tuition table was not found in the school's published 2026-2027 documents (the bilingual-section terms list a EUR 25,000 Capital Development Fund).
- Indicators: the World Bank WGI (all six), life expectancy, internet use, UHC index and migrant share are present for Monaco in the pipeline data, so no WGI override is needed. Homicide rate, HDI, CPI, GDP per capita PPP and the other missing indicators have no same-definition official source located: no crime series was found on the IMSEE (Monaco Statistics) site and no police homicide count was located. They remain missing rather than proxied from France.

## Sources

- Government of Monaco, Tax in Monaco: https://monservicepublic.gouv.mc/en/themes/tax/information/general-information/tax-in-monaco
- Government of Monaco, Inheritance tax: https://monservicepublic.gouv.mc/en/themes/tax/information/general-information/inheritance-tax
- Government of Monaco, Registration Duty: https://monservicepublic.gouv.mc/en/themes/tax/information/general-information/registration-duty
- [LuxuryEstate.com: luxury properties for rent in Monaco (listing sample)](https://www.luxuryestate.com/rent/monaco) — LuxuryEstate.com (other)
- [The International School of Monaco: Enrolment Terms & Conditions 2025-26](https://ismonaco.org/wp-content/uploads/2025/01/Enrolment-Terms-Conditions-2025-26.pdf) — The International School of Monaco (other)

- [Rental yield in Monaco: what an apartment in Monte-Carlo really earns in 2026](https://www.jarniascyril.com/?p=25449) — Cyril Jarnias (other)

## Change log
- 2026-10-15: initial research.
- 2026-10-15: re-checked direct-line 0% inheritance rate on the government page; recorded that WGI does cover Monaco while homicide/HDI/CPI have no official same-definition source (no override added); added prime rent (LuxuryEstate sample, EUR 110,000/month) and ISM fee (EUR 34,400, 2025/26).
- 2026-10-15: prime rent corrected from EUR 110,000 to EUR 28,500 a month: the earlier median was dominated by 400-700 m² penthouses; now a 200-300 m² 4-bedroom flat, cross-checked against EUR 114.50/m².
