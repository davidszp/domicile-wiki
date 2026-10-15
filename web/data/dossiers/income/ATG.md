# Antigua and Barbuda — earned income, nomad and expat dossier

Last reviewed: 2026-10-15
Tax year: 2026

## Summary

Antigua and Barbuda has no tax on employment income. Resident self-employed people pay the unincorporated business tax (0% to XCD 42,000, 8% to XCD 186,000, 25% above), modelled in the brackets. Employees pay 7% social security plus 3.5% medical benefits up to XCD 78,000 a year; the self-employed pay 10% social security. The Nomad Digital Residence (USD 50,000 a year, up to two years, USD 1,500) is available but no official tax exemption for holders could be found. Rents (Chestertons, long-term, asking): 1-bed USD 1,000, 2-bed USD 1,900.

## Income tax and social security

Deloitte 2026: no individual income tax; employees contribute 7% social security and 3.5% medical benefits, ceiling XCD 6,500 a month. Resident individuals pay unincorporated business tax on worldwide self-employment, partnership or unincorporated business income, on a sliding scale of 0% to 25% (Deloitte); the IRD FAQ bands for a sole trader are 0% up to XCD 42,000, 8% to XCD 186,000 and 25% above, on net income after expenses. For a USD 60,000 (about XCD 162,000) contractor that is roughly XCD 9,600 of tax before expenses, unless an exemption applies. The brackets in the data file are these UBT bands (they do not apply to employees). Self-employed social security is 10% of declared earnings under the Social Security (Self Employed Persons) Regulations 2013, reg. 9(1); professionals declare at least XCD 6,000 a month (S.I. 59 of 2016). The self-employed medical benefit contribution (third-party sources say 5%) is not confirmed and not included.

## Digital nomad visa

Nomad Digital Residence: USD 50,000 expected income per year, proof of employment or self-employment, medical insurance, police clearance; authorisation valid up to two years; USD 1,500 / 2,000 / 3,000 for single / couple / family. Tax treatment: neither the High Commission page nor any official text found states an exemption from income tax or UBT; the Act itself (Nomad Digital Residence Act 2020) could not be located online and the programme's own domain is parked. Recorded as standard taxation, covers_local_work left unset, with an open question.

## Expat regimes

None found.

## Living costs

Chestertons Antigua long-term rentals (pages 1 to 5, 82 priced listings, asking rents in USD, furnishing not stated, units marked Rented excluded): 1-bed median USD 1,000 (13 units, studios excluded, range 850 to 1,800); 2-bed median USD 1,900 (22 units, range 1,000 to 2,800). Locations are mostly St John's and surroundings, Jolly Harbour, Hodges Bay and Crosbies.

## Residence routes

Remote workers of any citizenship can apply for the Nomad Digital Residence (USD 50,000 a year, two-year authorisation, USD 1,500 single). Employees of a local employer need a work permit (not researched). Citizenship by investment (National Development Fund USD 230,000 or approved real estate from USD 300,000, per the CIU pages cited in data/jurisdictions/ATG.json) is a separate route. US citizens remain taxable in the US on worldwide income and have no Antigua tax to credit on employment income.

## Open questions

- UBT bands are from the 2021 IRD FAQ; Deloitte (January 2026) confirms the 0% to 25% sliding scale but not the band edges, so 2026 edges are not reconfirmed.
- The 3.5% medical benefit is not confirmed to share the XCD 6,500 monthly ceiling, and the self-employed medical benefit contribution (third-party: 5%) was not found on an official page.
- Modelling choice: the UBT is placed in the brackets so that the self-employed nomad's tax is captured; it does not apply to employees.
- Nomad Digital Residence Act 2020: the Act text is not on laws.gov.ag (searched the media library and the 2020/2021 act lists) and the programme's own site antiguanomadresidence.com is a parked domain, so whether the Act exempts holders from income tax and business tax could not be established. The High Commission page does not address tax. If the Act does exempt holders' income, treatment becomes exempt with covers_local_work true.
- Whether social security contributions apply to NDR holders is not stated.
- Work-permit terms not researched.

## Sources

- [Deloitte International Tax: Antigua and Barbuda Highlights 2026](https://www.deloitte.com/content/dam/assets-shared/docs/services/tax/2026/dttl-tax-antiguaandbarbudahighlights-2026.pdf) — Deloitte, accessed 2026-10-15
- [Antigua and Barbuda Inland Revenue Department: Unincorporated Business Tax (UBT) FAQ](https://ird.gov.ag/wp-content/uploads/2021/07/Unincorporated-Business-Tax-FAQ.pdf) — Inland Revenue Department, Antigua and Barbuda, accessed 2026-10-15
- [Global Citizen Solutions: Antigua and Barbuda Tax guide](https://www.globalcitizensolutions.com/antigua-and-barbuda-tax/) — Global Citizen Solutions, accessed 2026-10-15
- [Hivedesk: Antigua compliance guide](https://www.hivedesk.com/compliance/antigua) — Hivedesk, accessed 2026-10-15
- [Antigua and Barbuda Social Security (Self Employed Persons) Regulations 2013, S.I. No. 17 of 2013](https://socialsecurity.gov.ag/wp-content/uploads/2021/03/no-17-of-2013-self-employed-persons-amendment.pdf) — Antigua and Barbuda Social Security Board, accessed 2026-10-15
- [Social Security (Self Employed Persons) (Amendment) Regulations 2016, S.I. No. 59 of 2016 (earnings classes)](https://socialsecurity.gov.ag/wp-content/uploads/2021/03/no-59-of-2016-self-employed-persons-amendment.pdf) — Antigua and Barbuda Social Security Board, accessed 2026-10-15
- [High Commission for Antigua and Barbuda (UK): Nomad Digital Residence visa programme](https://antigua-barbuda.com/ova_sev/nomad-digital-residence-visa-programme/) — High Commission for Antigua and Barbuda in the United Kingdom, accessed 2026-10-15
- [Chestertons Antigua: all properties for long-term rent (88 listings)](https://www.chestertonsantigua.com/all-properties-for-long-term-rent) — Chestertons Antigua, accessed 2026-10-15

## Change log
- 2026-10-15: initial research.
- 2026-10-15: check pass: UBT bands put in the brackets (resident self-employed pay UBT on worldwide income; no NDR exemption could be established, Act text not found); self-employed social security corrected to 10% (S.I. 17 of 2013, S.I. 59 of 2016; the 5% medical benefit is unconfirmed and removed); rents added from Chestertons Antigua long-term listings (1-bed USD 1,000, 2-bed USD 1,900).
- 2026-10-15: wage and self-employment scales separated (new self_employed_brackets field): wages untaxed, unincorporated business tax on self-employment.
- 2026-10-15: social security deductibility: 0 (Antigua and Barbuda imposes no personal income tax on employment income (Deloitte 2026), so contributions reduce no taxable income).
