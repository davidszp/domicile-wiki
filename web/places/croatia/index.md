# Croatia: taxes, residence and cost of living

Source: https://domicile.wiki/places/croatia/ (domicile.wiki, researched 2026-10-16). Data licence CC BY-SA 4.0. Research, not tax or legal advice.

## At a glance

For an EU-citizen family of five living off a EUR 30M portfolio (the guide's default reader).

- Score for a wealthy family: 77 / 100
- Tax on a €30M portfolio: €55,800 a year
- Wealth tax: none
- Children inherit: tax-free
- After 60 years: €214,863,000 of €30,000,000 (with no tax at all: €286,928,000)
- Living costs, family of five: €202,925 a year
- EU member: yes
- Currency: EUR
- Capital: Zagreb

## Tax on investments, inheritance and wealth

Croatia taxes dividends at a flat 12%. Gains on securities are taxed at 12% only if they are sold within 2 years, and are untaxed after that. Real estate gains are 24% within 2 years. Children are exempt from inheritance and gift tax, and there is no wealth tax. No special regime for wealthy arrivals.

- **Ordinary tax residence**: Worldwide taxation of residents; capital income taxed at a flat 12% final rate.
- **Family holding company (d.o.o.)**: The family holds the portfolio through a Croatian d.o.o. owned by the parents. Dividends received from companies are not taxed in the company (Art. 6(1) item 1 Profit Tax Act), with no minimum holding. Realised gains on shares are part of its profit and bear profit tax at 18% (10% only if the company's revenue is below EUR 1m a year). Money taken out as dividends is taxed again at 12%. Wealth tax (none) and inheritance tax (direct line exempt) are the same as for direct holding, so those metrics are inherited from the standard regime. For a Croatian resident, personal holding is the lower-tax route (gains on financial assets are untaxed after 2 years and dividends bear 12%); the company is shown because advisers use it to defer the 12% on dividends.

## Income tax

Cities set their own income tax rates. Zagreb applies 23% up to EUR 60,000 of annual taxable income and 33% above (decision NN 28/2025, in force from 1 March 2025; no 2026 change found). The basic personal allowance is EUR 600 a month (EUR 7,200 a year). Employees pay 20% pension contributions (15% + 5%) up to EUR 143,496 a year; employer pays health insurance.

## Inheritance law and trusts

Children, a spouse and partners are guaranteed half of their intestate share, and dependent parents a third. A foreign resident can choose the law of their nationality (EU Succession Regulation art. 22). Croatia has no trusts, and foundations are for public benefit only.

## Daily life (0-100, higher is better)

- Safety and personal security: 79
- Political and institutional stability: 63
- Corruption and government integrity: 49
- Legal system and property rights: 60
- Healthcare quality and access: 73
- Education quality: 53
- Human development and quality of life: 78
- Infrastructure and connectivity: 74
- Cost of living and housing: 81
- Business opportunities and economy: 69
- Cultural fit and lifestyle: 66

## Research notes

### Croatia — family-office tax dossier

Last reviewed: 2026-10-16
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

#### Summary

Income Tax Act (Zakon o porezu na dohodak, NN 115/16 as amended to 152/24). Dividends and interest are taxed at
a flat 12%. Gains on financial assets are taxed at 12% only if sold within 2 years. Real estate gains are taxed at
24% within 2 years, and both are untaxed after that. Children are exempt from inheritance and gift tax and from real
estate transfer tax. No wealth tax. No special regime for wealthy arrivals.

#### Residence and eligibility

Resident if a home in Croatia is owned or available for an uninterrupted 183+ days across one or two calendar
years (actual use irrelevant), or physical presence is 183+ days. Note that simply keeping a Croatian home makes
you resident. EU citizens: free movement. US/other: temporary residence permit for a purpose. No golden visa
(not verified).

#### Capital gains

- Art. 67: disposals of financial assets 2+ years after acquisition are not taxed. Transfers between spouses and
  close relatives, on divorce or inheritance are not taxed. Otherwise the rate is 12% (Art. 70; Tax Administration).
  Losses only offset gains of the same year. FIFO.
- Art. 58/62: real estate sales taxed at 24% only within 2 years of acquisition, or if more than three same-type
  properties are sold in five years. Own or close-family home is exempt.
- Gifted assets sold within 2 years of the donor's acquisition: donor's date applies.
- JSON: all long-term rates 0.0; `headline_rate = 0.24` (real estate within 2 years).
- Business-like trading is taxed as self-employment income at progressive local rates.

#### Dividends

Flat 12% final tax (Art. 70) on domestic and foreign dividends. Foreign tax credited per item on proof from the
foreign tax authority (Art. 80). With 15% foreign WHT, no Croatian tax remains (excess credit not refunded).
JSON: `0.12/0.12`, credit. Outbound WHT 10% to non-resident companies, 0% to qualifying EU/EEA/Swiss parents
(PwC). About 70 treaties. A US treaty was signed in 2022 but is not confirmed in force.

#### Inheritance and gifts to children

Local Taxes Act (NN 115/16 … 152/24): 4% on cash, receivables, securities and movables over EUR 6,700. Spouses,
direct-line descendants and ancestors, and adoptive relations are exempt for inheritances and gifts (Tax
Administration "Darovanja"). Real estate goes through the 3% real estate transfer tax, with direct-line
descendants and ancestors exempt. JSON: `fully_exempt`, no brackets.
- Surviving spouse (including out-of-wedlock and life partners): exempt from the 4% inheritance and gift tax; the 3% real estate transfer tax exemption covers direct-line relatives only.

#### Wealth tax

None. From 1 Jan 2025, a mandatory municipal property tax of EUR 0.60–8.00/m² applies to residential property not
used for permanent living or long-term rental. It replaced the holiday-home tax (CMS). JSON: `type = none`.

#### Special regimes

None for wealthy arrivals. The 2025 repatriation incentive (5-year salary exemption for returning emigrants)
covers only employment income.

Structure regime `holding_doo` (family d.o.o.), added 2026-10-16 for the 60-year projection: gains 18% (10% below EUR 1m revenue), dividends
0% (deducted from the base), payout to the family 12%, wealth tax and inheritance inherited from the standard regime. Personal holding is cheaper
for a Croatian resident (gains untaxed after 2 years, Art. 67 para. 8; dividends 12%). Foundation and trust were not added: no family-wealth
foundation or trust vehicle in common use was found (not researched against a statute).

#### Company taxation (kept separate from personal tax)

Profit tax (Art. 28 Profit Tax Act): 18%, or 10% when the period's revenue is below EUR 1,000,000. Dividends and profit shares received
are deducted from the tax base (Art. 6(1) item 1) when the payer is subject to profit tax or a similar tax, is a legal form comparable
to a capital company and did not deduct the payment; the article states no percentage or holding period. Realised gains on shares
are taxable profit (PwC); unrealised revaluation gains are left out of the base (Art. 6(1) item 2). Distributions to individuals bear 12%
(Art. 70 para. 19 Income Tax Act).

#### Cost of living notes

Zagreb.

- School: American International School of Zagreb, Grades 11-12, EUR 21,425 tuition (2026-27), plus a EUR 2,700
  capital fee in the first years.
- Prime rent: EUR 3,500 a month = median asking rent of 47 detached family houses (at EUR 1,000 or more) on
  Nekretnine.hr on 2026-10-15 in Šestine-Mlinovi, Gračani, Podsljeme, Pantovčak, Tuškanac, Gornji Grad-Medveščak and
  Srebrnjak. Interquartile range about EUR 2,700-6,000; top listings EUR 10,000-14,000. The list view shows no bedroom
  counts; typical sizes are 240-500 m2. Sample drawn from 396 detached houses for rent in Zagreb.
- Purchase price, health insurance and housekeeper costs are not sourced.

#### Open questions

- 2024 reform (12% capital income, 24% real estate) is confirmed in the Act. The KPMG source page for the
  previous rates was unavailable.
- US–Croatia treaty status.
- Exempt-relative list is from Tax Administration guidance. The Local Taxes Act article was not read directly.
- Structure `holding_doo`: the Profit Tax Act page was read in part (Art. 6, 7, 28, 30); a specific participation rule for gains, fund dividends, the revenue test for the EUR 1m threshold and the company's cost basis after a contribution in kind not researched.

#### Sources

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
- Zakon o porezu na dobit (Profit Tax Act), Art. 6(1) item 1, Art. 28: https://www.zakon.hr/z/99/Zakon-o-porezu-na-dobit
- Croatia - Corporate - Income determination: https://taxsummaries.pwc.com/croatia/corporate/income-determination

#### Change log

- 2026-10-15: initial research.
- 2026-10-15 (data-quality pass): added prime rent (Nekretnine.hr sample, EUR 3,500/month).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
- 2026-10-16: added surviving-spouse treatment.
- 2026-10-16: added structure regime `holding_doo` (family d.o.o.) with sourced capital gains (18%), dividends (0%, Art. 6(1) item 1 Profit Tax Act) and payout (12%) terms; corporate summary now states the dividend deduction. Recipe `data/recipes/HRV.json` added.


## Residence and succession sources

- [European e-Justice: Succession, Croatia](https://e-justice.europa.eu/166/EN/succession?CROATIA&member=1) — European e-Justice Portal
- [Regulation (EU) No 650/2012 on succession](https://eur-lex.europa.eu/eli/reg/2012/650/oj) — European Union
- [HCCH status table: Convention of 1 July 1985 on the Law Applicable to Trusts and on their Recognition](https://www.hcch.net/en/instruments/conventions/status-table/?cid=59) — Hague Conference on Private International Law
