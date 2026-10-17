# Monaco: taxes, residence and cost of living

Source: https://domicile.wiki/places/monaco/ (domicile.wiki, researched 2026-10-15). Data licence CC BY-SA 4.0. Research, not tax or legal advice.

## At a glance

For an EU-citizen family of five living off a EUR 30M portfolio (the guide's default reader).

- Score for a wealthy family: 67 / 100
- Can EU citizens live here?: from €500,000 · Residence card on proof of means (carte de séjour)
- Can US citizens live here?: from €500,000 · Residence card on proof of means (carte de séjour)
- Other passports: from €500,000 · Residence card on proof of means (carte de séjour)
- Tax on a €30M portfolio: €48,600 a year
- Wealth tax: none
- Children inherit: tax-free
- After 60 years: €218,196,000 of €30,000,000 (with no tax at all: €286,928,000)
- Living costs, family of five: €581,143 a year
- EU member: no
- Currency: EUR
- Capital: Monaco

## Tax on investments, inheritance and wealth

Residents of Monaco pay no personal income tax (so no tax on capital gains, dividends or interest) and no wealth tax or annual property tax. Inheritance and gift tax applies only to assets situated in Monaco and is 0% between parents and children and between spouses (8% siblings up to 16% unrelated). The big exception: French nationals resident in Monaco are taxed by France as if French residents under the 1963 France-Monaco convention. Real estate purchases bear 4.5%-7.5% registration duty.

- **Ordinary Monaco residence (non-French nationals)**: No personal income tax for residents genuinely established in Monaco. Does not apply to French nationals, who remain taxable in France on worldwide income under the 1963 Bilateral Convention (with narrow historical exceptions not researched).

## How to get residence

Monaco is not in the EU and everyone, EU citizens included, needs a residence card (carte de séjour) to live there more than three months. EU/EEA/Swiss citizens apply directly; US and other citizens first need a French long-stay visa. There is no fixed legal investment: the practical requirement is housing in Monaco and a bank reference, in practice a deposit of around EUR 500,000 at a Monaco bank, set by each bank.

- **Residence card on proof of means (carte de séjour)** (Passive income / retirement; EU citizens, US citizens, other passports; open): A person who does not work in Monaco can get a residence card by proving housing in Monaco and sufficient resources, shown in practice by a reference from a Monaco bank. The temporary card lasts one year and is renewable.
- **Employment in Monaco (work authorisation and residence)** (Work; EU citizens, US citizens, other passports; open): Working in Monaco needs a Monaco employer and a work authorisation; residence is then requested separately. Monaco has no digital nomad visa.

Citizenship: Discretionary grant by the Prince; reported minimum of 10 years of residence, generally counted from age 18. Not an entitlement.

## Inheritance law and trusts

Children are protected by a reserved share that a will cannot remove, but a person can choose their national law under the 2017 reform. Monaco has had the Hague Trusts Convention in force since 2008. Its own trust-like and foundation tools are narrow.

## Daily life (0-100, higher is better)

- Political and institutional stability: 80
- Legal system and property rights: 79
- Healthcare quality and access: 92
- Infrastructure and connectivity: 99
- Cost of living and housing: 16
- Business opportunities and economy: 81

## Research notes

### Monaco — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

#### Summary

- Residents pay no personal income tax, so there is no tax on capital gains, dividends or interest.
- There is no wealth tax, no annual property tax and no council tax.
- Inheritance and gift tax applies only to assets situated in Monaco. It is 0% for children and spouses.
- Exception: French nationals stay taxable in France under the 1963 France-Monaco convention.

#### Residence and eligibility

- A residence card (carte de séjour) and genuine establishment in Monaco are required.
- Non-EU nationals first need a French long-stay visa.
- The financial requirements (in practice a bank deposit in Monaco) are not verified.

#### Capital gains

- None, because there is no personal income tax (government page "Tax in Monaco").
- JSON: all rates 0.

#### Dividends

- None.
- Foreign withholding tax is a final cost, and the treaty network is minimal.
- JSON: 0, not_applicable.

#### Inheritance and gifts to children

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
- Surviving spouse (`spouse_treatment` `fully_exempt`): Spouse rate is 0% (MonServicePublic); only Monaco-situs property is in scope.

#### Wealth tax

None (government page: "There is no wealth tax"). There is also no annual property tax.

#### Special regimes

None. The ordinary regime is already zero-tax.

French nationals are the exception and the schema cannot express it, because "EU" covers them. The app must treat
them separately.

#### Company taxation (kept separate from personal tax)

- Business Profit Tax (ISB) applies only to businesses with more than 25% of turnover outside Monaco. The rate was
  not stated in the source opened.
- VAT is charged as in France.

#### Cost of living notes

Monaco.

- Prime family rent: EUR 28,500/month for a 4-bedroom flat of about 200-300 m² (midpoint of the EUR 22,000-35,000 asking rents of such flats on LuxuryEstate.com, 15 Oct 2026), consistent with prime rents of about EUR 114.50/m² a month ([Jarnias, 2026](https://www.jarniascyril.com/?p=25449)). The sample's EUR 110,000 median reflected 400-700 m² penthouses and duplexes and is not used.
- International school: International School of Monaco, Classes 10-13, EUR 34,400 a year for 2025/26 (latest published
  table); one-time registration EUR 2,000 and Capital Development Fund EUR 10,000 (EUR 25,000 in the 2026-27
  bilingual-section terms).
- Purchase registration duty 4.5% (transparent buyers) or 7.5%. Not sourced: price per m², health insurance,
  housekeeper.

#### Open questions

- The details of the French convention.
- The residence card thresholds.
- The ISB rate.

- School fee is the 2025/26 ISM figure; the 2026/27 tuition table was not found in the school's published 2026-2027 documents (the bilingual-section terms list a EUR 25,000 Capital Development Fund).
- Indicators: the World Bank WGI (all six), life expectancy, internet use, UHC index and migrant share are present for Monaco in the pipeline data, so no WGI override is needed. Homicide rate, HDI, CPI, GDP per capita PPP and the other missing indicators have no same-definition official source located: no crime series was found on the IMSEE (Monaco Statistics) site and no police homicide count was located. They remain missing rather than proxied from France.

#### Sources

- Government of Monaco, Tax in Monaco: https://monservicepublic.gouv.mc/en/themes/tax/information/general-information/tax-in-monaco
- Government of Monaco, Inheritance tax: https://monservicepublic.gouv.mc/en/themes/tax/information/general-information/inheritance-tax
- Government of Monaco, Registration Duty: https://monservicepublic.gouv.mc/en/themes/tax/information/general-information/registration-duty
- [LuxuryEstate.com: luxury properties for rent in Monaco (listing sample)](https://www.luxuryestate.com/rent/monaco) — LuxuryEstate.com (other)
- [The International School of Monaco: Enrolment Terms & Conditions 2025-26](https://ismonaco.org/wp-content/uploads/2025/01/Enrolment-Terms-Conditions-2025-26.pdf) — The International School of Monaco (other)

- [Rental yield in Monaco: what an apartment in Monte-Carlo really earns in 2026](https://www.jarniascyril.com/?p=25449) — Cyril Jarnias (other)

#### Change log
- 2026-10-15: initial research.
- 2026-10-15: re-checked direct-line 0% inheritance rate on the government page; recorded that WGI does cover Monaco while homicide/HDI/CPI have no official same-definition source (no override added); added prime rent (LuxuryEstate sample, EUR 110,000/month) and ISM fee (EUR 34,400, 2025/26).
- 2026-10-15: prime rent corrected from EUR 110,000 to EUR 28,500 a month: the earlier median was dominated by 400-700 m² penthouses; now a 200-300 m² 4-bedroom flat, cross-checked against EUR 114.50/m².
- 2026-10-16: added surviving-spouse treatment.


## Residence and succession sources

- [Tax in Monaco](https://monservicepublic.gouv.mc/en/themes/tax/information/general-information/tax-in-monaco) — Government of Monaco (MonServicePublic)
- [Decision TS 2021-08 M. F. J. c. Etat de Monaco (Sovereign Ordinance 3.153, art. 7)](https://www.tribunal-supreme.mc/wp-content/uploads/2022/03/Decision-TS-2021-08-M.-F.-J.-c.-Etat-de-Monaco.pdf) — Tribunal Suprême de Monaco
- [Monaco Carte de Séjour: Complete Guide (2026)](https://www.globalcitizensolutions.com/monaco-residency/) — Global Citizen Solutions
- [First residence application in Monaco, step by step](https://mondaq.co.uk/work-visas/1260114/first-residence-application-in-monaco---step-by-step) — Mondaq
- [The impact of the reform of Monegasque private international law](https://cms.law/en/MCO/Publication/The-impact-of-the-reform-of-Monegasque-private-international-law) — CMS
- [HCCH status table: 1985 Trusts Convention](https://www.hcch.net/en/instruments/conventions/status-table/?cid=59) — Hague Conference on Private International Law
- [Journal de Monaco, official legislation](https://journaldemonaco.gouv.mc/) — Government of Monaco
