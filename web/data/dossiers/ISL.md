# Iceland — family-office tax dossier

Last reviewed: 2026-10-16
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary
Flat 22% capital income tax on gains and dividends, no wealth tax, 10% inheritance tax above ISK 6,789,790 per estate (2026). Advance inheritance during life: 10% with no allowance. EEA member; no investor visa.

## Residence and eligibility
Resident after more than 183 days in any 12-month period, from arrival. Former residents stay fully liable for 3 years after leaving unless they prove tax liability elsewhere (PwC). EU/EEA citizens: free movement; others need a permit (not verified in detail).

## Capital gains
Capital income tax (fjármagnstekjuskattur) 22% on nominal gains (Skatturinn 2026 figures; PwC). Combined ISK 300,000 per person (600,000 per couple) allowance for interest, dividends and listed-share gains. Residential property owned over 2 years exempt. JSON: 0.22 for all categories. No exit tax found. Business trading income would be taxed at progressive rates (top 46.29% in 2026).

## Dividends
22% flat; foreign WHT credited. JSON 0.22 domestic and foreign. Outbound WHT: 22% to all recipients except non-resident legal entities (20%) and resident companies (0%), reduced by treaty (KPMG Icelandic Tax Facts 2026, s. 8.1.1; corrected 2026-10-16, the file said 20% for non-resident individuals); about 45 treaties. 2026 change: leftover personal allowance can no longer offset capital income tax (Government of Iceland, 23 Dec 2025). Rental income allowance fell from 50% to 25%.

## Inheritance and gifts to children
Act no. 14/2004 on inheritance tax: 10% of the estate's taxable base above ISK 6,789,790 (deaths in 2026; 2025: ISK 6,498,129), indexed to the consumer price index by law at the start of each year (Act 14/2004 art. 2(2); `thresholds_indexed` set true; the statutory base is ISK 5,000,000), shared among heirs by inheritance share; tax is charged on all assets passing to heirs when the estate is divided (art. 1(1)), so a foreign portfolio is in scope; spouse exempt (Skatturinn, Government of Iceland, island.is). JSON: basis estate, exemption 6,789,790, 10% bracket. Prepaid (advance) inheritance: 10% of full value, no allowance, debts not deductible (island.is). Treatment of other gifts (possibly taxable income of recipient) unverified. Abolition proposals in Althingi not passed.
- Surviving spouse or cohabitant: no inheritance tax is levied (PwC).

## Wealth tax
None (PwC). Municipal property tax on real estate is separate.

## Special regimes
None for new residents.

## Holding structures
**Modelled: investment holding company (`ehf_holding`, type `structure`).** The parents own an Icelandic ehf. that holds the portfolio. Company income tax is 20% (PwC), but dividends received are deductible (from foreign companies if their profits are taxed abroad at a rate not below the general rate in any OECD/EEA/EFTA state, UK or Faroe Islands) and gains on shares are deductible in full with 0% effect (KPMG Icelandic Tax Facts 2026, s. 3.5.1, 3.7.2; Income Tax Act No. 90/2003 art. 31, article not opened). Foreign withholding is not creditable. Losses on shares are not deductible except against share gains in the same year. Distributions to resident individuals bear 22% final withholding (s. 8.1.1); liquidation surplus over the purchase price is dividend. CFC rules apply to low-tax companies (CIT below two-thirds of 20%). No running cost is recorded (not sourced). Not modelled: private foundation (Icelandic foundations, sjálfseignarstofnun, are for stated purposes, not family wealth) and trusts (not an Icelandic form).

## Company taxation (kept separate from personal tax)
CIT 20%, unchanged for 2026. Dividend WHT 20% to non-residents.

## Cost of living notes

City: Reykjavik.

- **Prime rent (monthly):** 510,000 ISK (2026). Median asking rent of the 8 capital-area listings (Reykjavík, Garðabær, Hafnarfjörður) with 4-5 bedrooms on the first results page of Igloo (myigloo.is) on 2026-10-15 (ISK 400,000-695,000; 57 listings nationwide with 4+ bedrooms). Large houses of 170-240 m² asked ISK 525,000-695,000. Source: [Igloo - Íbúðir til leigu (4+ svefnherbergi)](https://myigloo.is/listings?min_bedrooms=4).
- **International school fee (annual, per child):** 110,000 ISK (2026). Iceland's only IB Diploma programme is at Menntaskólinn við Hamrahlíð (MH), a public upper-secondary school with no tuition. Annual cost of the 2-year Diploma = MH fee ISK 15,000 per semester (ISK 30,000 a year) + IB exam and materials fees ISK 160,000 over the programme (ISK 80,000 a year), as on the school's fee page (updated 25.09.2026). The private International School of Iceland stops at Grade 10 and does not publish fees. Source: [MH - IB school fee](https://www.mh.is/is/ib-studies/for-applicants/ib-school-fee).
- Health insurance, housekeeper and price per m² not sourced. The school figure reflects a free public IB programme, which makes Reykjavik look cheap on schooling; there is no private international secondary school.

## Open questions
- Taxation of ordinary gifts to children outside advance inheritance.
- Worldwide scope of inheritance tax for an Icelandic-domiciled deceased (presumed).
- Working-shareholder wage recharacterisation rules for a private company stake.
- Cost-of-living items.

## Sources
- Icelandic Tax Facts 2026, KPMG Iceland: https://assets.kpmg.com/content/dam/kpmgsites/is/pdf/2026/Icelandic%20Tax%20Facts%202026.pdf.coredownload.pdf
- Iceland - Corporate - Income determination, PwC: https://taxsummaries.pwc.com/iceland/corporate/income-determination
- Iceland - Corporate - Taxes on corporate income, PwC: https://taxsummaries.pwc.com/iceland/corporate/taxes-on-corporate-income
- Lög um erfðafjárskatt nr. 14/2004, Lagasafn: https://lagasafn.hi.is/2004014.html
- Helstu tölur og prósentur 2026, Skatturinn: https://www.skatturinn.is/einstaklingar/helstutolur/2026/
- Skattabreytingar á árinu 2026, Government of Iceland: https://www.stjornarradid.is/efst-a-baugi/frettir/stok-frett/2025/12/23/Skattabreytingar-a-arinu-2026/
- Inheritance tax, island.is: https://island.is/en/erfdafjarskattur
- Prepaid inheritance, island.is: https://island.is/en/prepaid-inheritance
- Iceland - Individual - Income determination, PwC: https://taxsummaries.pwc.com/iceland/individual/income-determination
- Iceland - Individual - Other taxes, PwC: https://taxsummaries.pwc.com/iceland/individual/other-taxes
- Iceland - Individual - Residence, PwC: https://taxsummaries.pwc.com/iceland/individual/residence
- Iceland - Corporate - Withholding taxes, PwC: https://taxsummaries.pwc.com/iceland/corporate/withholding-taxes
- [Igloo - Íbúðir til leigu (4+ svefnherbergi)](https://myigloo.is/listings?min_bedrooms=4)
- [MH - IB school fee](https://www.mh.is/is/ib-studies/for-applicants/ib-school-fee)

## Change log
- 2026-10-15: initial research.
- 2026-10-15: data-quality pass: added rent (Igloo, capital-area 4-5 bedroom listings, ISK 510,000/month) and the MH IB Diploma cost (ISK 110,000/year; public school, no tuition).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
- 2026-10-16: added surviving-spouse treatment.
- 2026-10-16: added structure regime `ehf_holding` (holding ehf.: 0% on qualifying dividends and share gains, 22% payout); set inheritance `thresholds_indexed` true (Act 14/2004 art. 2(2)); corrected dividend withholding wording (22% to non-resident individuals, 20% to non-resident entities, KPMG s. 8.1.1); noted worldwide scope of the inheritance tax (art. 1(1)); added KPMG Icelandic Tax Facts 2026, PwC corporate pages and Lagasafn act text to sources.
