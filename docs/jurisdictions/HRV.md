# Croatia — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Income Tax Act (Zakon o porezu na dohodak, NN 115/16 as amended to 152/24). Dividends and interest are taxed at
a flat 12%. Gains on financial assets are taxed at 12% only if sold within 2 years. Real estate gains are taxed at
24% within 2 years, and both are untaxed after that. Children are exempt from inheritance and gift tax and from real
estate transfer tax. No wealth tax. No special regime for wealthy arrivals.

## Residence and eligibility

Resident if a home in Croatia is owned or available for an uninterrupted 183+ days across one or two calendar
years (actual use irrelevant), or physical presence is 183+ days. Note that simply keeping a Croatian home makes
you resident. EU citizens: free movement. US/other: temporary residence permit for a purpose. No golden visa
(not verified).

## Capital gains

- Art. 67: disposals of financial assets 2+ years after acquisition are not taxed. Transfers between spouses and
  close relatives, on divorce or inheritance are not taxed. Otherwise the rate is 12% (Art. 70; Tax Administration).
  Losses only offset gains of the same year. FIFO.
- Art. 58/62: real estate sales taxed at 24% only within 2 years of acquisition, or if more than three same-type
  properties are sold in five years. Own or close-family home is exempt.
- Gifted assets sold within 2 years of the donor's acquisition: donor's date applies.
- JSON: all long-term rates 0.0; `headline_rate = 0.24` (real estate within 2 years).
- Business-like trading is taxed as self-employment income at progressive local rates.

## Dividends

Flat 12% final tax (Art. 70) on domestic and foreign dividends. Foreign tax credited per item on proof from the
foreign tax authority (Art. 80). With 15% foreign WHT, no Croatian tax remains (excess credit not refunded).
JSON: `0.12/0.12`, credit. Outbound WHT 10% to non-resident companies, 0% to qualifying EU/EEA/Swiss parents
(PwC). About 70 treaties. A US treaty was signed in 2022 but is not confirmed in force.

## Inheritance and gifts to children

Local Taxes Act (NN 115/16 … 152/24): 4% on cash, receivables, securities and movables over EUR 6,700. Spouses,
direct-line descendants and ancestors, and adoptive relations are exempt for inheritances and gifts (Tax
Administration "Darovanja"). Real estate goes through the 3% real estate transfer tax, with direct-line
descendants and ancestors exempt. JSON: `fully_exempt`, no brackets.

## Wealth tax

None. From 1 Jan 2025, a mandatory municipal property tax of EUR 0.60–8.00/m² applies to residential property not
used for permanent living or long-term rental. It replaced the holiday-home tax (CMS). JSON: `type = none`.

## Special regimes

None for wealthy arrivals. The 2025 repatriation incentive (5-year salary exemption for returning emigrants)
covers only employment income.

## Company taxation (kept separate from personal tax)

CIT 18%, or 10% below EUR 1m revenue (PwC). Distributions to individuals then bear 12%.

## Cost of living notes

Zagreb.

- School: American International School of Zagreb, Grades 11-12, EUR 21,425 tuition (2026-27), plus a EUR 2,700
  capital fee in the first years.
- Prime rent: EUR 3,500 a month = median asking rent of 47 detached family houses (at EUR 1,000 or more) on
  Nekretnine.hr on 2026-10-15 in Šestine-Mlinovi, Gračani, Podsljeme, Pantovčak, Tuškanac, Gornji Grad-Medveščak and
  Srebrnjak. Interquartile range about EUR 2,700-6,000; top listings EUR 10,000-14,000. The list view shows no bedroom
  counts; typical sizes are 240-500 m2. Sample drawn from 396 detached houses for rent in Zagreb.
- Purchase price, health insurance and housekeeper costs are not sourced.

## Open questions

- 2024 reform (12% capital income, 24% real estate) is confirmed in the Act. The KPMG source page for the
  previous rates was unavailable.
- US–Croatia treaty status.
- Exempt-relative list is from Tax Administration guidance. The Local Taxes Act article was not read directly.

## Sources

- Zakon o porezu na dohodak (Income Tax Act), consolidated (NN 115/16 … 152/24): https://www.zakon.hr/z/85/zakon-o-porezu-na-dohodak
- Dohodak od kapitala po osnovi kapitalnih dobitaka: https://porezna-uprava.gov.hr/hr/dohodak-od-kapitala-po-osnovi-kapitalnih-dobitaka/4653
- Oporezivanje kapitala: https://porezna-uprava.gov.hr/hr/oporezivanje-kapitala/4745
- Croatia – Individual – Income determination: https://taxsummaries.pwc.com/croatia/individual/income-determination
- Croatia – Corporate – Withholding taxes: https://taxsummaries.pwc.com/croatia/corporate/withholding-taxes
- Croatia – Individual – Other taxes: https://taxsummaries.pwc.com/croatia/individual/other-taxes
- Tax law changes in 2025: https://cms.law/en/hrv/legal-updates/tax-law-changes-in-2025
- Darovanja: https://porezna-uprava.gov.hr/hr/darovanja-8008/8008
- Inheritance and gifts tax: general rules, rates and taxpayer: https://porezna-uprava.gov.hr/en/inheritanc-e-and-gifts-tax-information-on-the-general-rules-rates-and-taxpayer/7315
- Croatia – Individual – Residence: https://taxsummaries.pwc.com/croatia/individual/residence
- Croatia – Corporate – Taxes on corporate income: https://taxsummaries.pwc.com/croatia/corporate/taxes-on-corporate-income
- AISZ Tuition & Fees 2026–2027: https://aisz.hr/admissions/tuition-fees
- Nekretnine.hr, najam samostojećih kuća Zagreb: https://www.nekretnine.hr/najam-samostojeca-kuce/zagreb/

## Change log

- 2026-10-15: initial research.
- 2026-10-15 (data-quality pass): added prime rent (Nekretnine.hr sample, EUR 3,500/month).
