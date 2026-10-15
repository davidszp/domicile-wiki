# Greece — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Ordinary residents pay:

- 5% on dividends.
- 0% on gains from listed shares where they hold less than 0.5% of the company, and on EU/EEA UCITS funds.
- 15% on gains from unlisted shares and from holdings of 0.5% or more.
- Nothing on real estate gains: the tax is suspended until 31 Dec 2026.
- No wealth tax. ENFIA, the real estate tax, applies to Greek property.

Inheritance to each child: the first EUR 150,000 is free, then 1% / 5% / 10%. Lifetime parental grants are free up
to a one-time EUR 800,000 per child, then taxed at 10%.

Alternative: the Art. 5A flat tax of EUR 100,000 a year on all foreign income, plus EUR 20,000 per family member,
for up to 15 years, against a EUR 500,000 investment in Greece. This regime is only weakly sourced (see open
questions).

## Residence and eligibility

- Tax residence: more than 183 days of physical presence in any 12-month period, or the centre of vital interests in
  Greece (PwC; AADE circular).
- EU citizens move freely.
- Non-EU citizens can use the Golden Visa (thresholds not verified) or the start-up investor permit (EUR 250,000,
  from 2025).

## Capital gains

Art. 42 Law 4172/2013, as summarised by PwC:

- Listed shares with a holding below 0.5%: exempt.
- Unlisted shares, or listed shares with a holding of 0.5% or more: 15%.
- EU/EEA UCITS: exempt.
- A 0.1% sales tax applies to Greek-listed shares.
- Real estate gains tax is suspended until 31 Dec 2026 (Art. 90 Law 5162/2024).

JSON: listed securities 0 (assumes the exemption covers foreign-listed shares; unverified), private business 0.15,
real estate 0 for 2026. Non-UCITS ETFs and bonds are unverified.

## Dividends

- Flat 5%, final for Greek dividends.
- Foreign dividends are taxed at 5% with a credit for foreign tax, capped at the Greek tax. The credit needs
  apostilled documents.
- JSON: 0.05 for domestic and foreign dividends. Outbound withholding tax is 5%.

## Inheritance and gifts to children

Law 2961/2001 as amended by Law 5219/2025 (PwC).

- Category A, children:
  - EUR 150,000 tax-free.
  - 1% on the next EUR 150,000.
  - 5% on the next EUR 300,000.
  - 10% above EUR 600,000.
- JSON: exemption 150,000; brackets 0.01 from 0, 0.05 from 150,000, 0.10 from 450,000 of the taxable amount
  (marginal).
- Parental grants or gifts of any asset: a one-time EUR 800,000 allowance, then 10%. Cash gifts to Category A
  are 10%.
- Foreign immovable property is never taxed. Foreign movable property is taxed if the deceased was a Greek national
  or resident; this comes from general knowledge and is unverified.
- Art. 5A beneficiaries: movable property abroad is exempt (Art. 5A(8) Law 4172/2013; see Special regimes).
- Succession Law 5303/2026 (deaths from 16 Sep 2026) is civil law, not tax. It allows inheritance contracts, and it
  turns the forced share into a monetary claim.

## Wealth tax

- None.
- ENFIA is charged on Greek real estate: a main tax per property, plus a supplementary tax where the total exceeds
  EUR 500,000 (rates not verified).
- From 2027 a Local Development Fee is collected through energy bills (Law 5314/2026).

## Special regimes

- **Art. 5A of Law 4172/2013**, added by Law 4646/2019. The brief called it "5C", but 5C is the 50% relief for
  workers and 5B the 7% regime for pensioners. Statute text read on Taxheaven (consolidated) on 2026-10-15.
  - Art. 5A(2): EUR 100,000 a year on all foreign-source income, whatever its amount. The regime can be extended to
    relatives (art. 2(f)) for EUR 20,000 each. A family of five pays EUR 180,000 a year if all four are included.
    Paid in one instalment by the last working day of December; foreign tax paid is not credited.
  - Art. 5A(4): starts with the first tax year applied for and ends after 15 tax years; cannot be extended.
  - Art. 5A(1): not Greek tax resident in 7 of the 8 years before the transfer; investment of at least EUR 500,000
    in Greek real estate, businesses, securities or shares, completed within 3 years; waived for Greek investor
    residence permit (golden visa) holders.
  - Art. 5A(5): non-payment ends the regime; an uncompleted investment revokes it from the start.
  - Art. 5A(8): the lump sum exhausts all tax on foreign-source income. The beneficiary is exempt from inheritance
    and gift tax on movable property abroad that he receives, and his movable property abroad passing to third
    parties (children) by death or gift is also exempt; applies to deaths from 1 Jan 2020. Foreign real estate is
    outside Greek inheritance tax anyway, so a foreign portfolio passes to the children free of Greek tax.
  - Art. 5A(2) adds that inheritance, gift and parental-grant tax provisions "do not apply" for relatives to whom the
    regime is extended; scope unclear.
  - JSON: capital_gains and dividends 0 on foreign income (high, verified); inheritance `exempt_with_conditions`,
    standard brackets for Greek-situs assets only (high, verified).
  - Application deadline reported as 31 March; not checked.

## Company taxation (kept separate from personal tax)

Corporate income tax 22% (not re-verified in this research). Dividend withholding tax 5%.

## Cost of living notes

- Athens: northern suburbs (Filothei-Psychiko, Kifisia) and southern coast (Glyfada, Vouliagmeni).
- Prime rent: EUR 6,000 a month = median asking rent of 119 detached houses, maisonettes and villas with 4+ bedrooms on
  xe.gr on 2026-10-15 in Glyfada and Filothei-Psychiko (interquartile range EUR 3,900-9,500). Kifisia/Ekali pages were
  blocked by a captcha and are not in the sample.
- School: ACS Athens, High School 2026-27, EUR 16,348 total tuition and fees (tuition EUR 14,680); IB Diploma fee
  EUR 1,400 extra over two years.
- Purchase price, health insurance and housekeeper costs are not sourced.

## Open questions

- Art. 5A was verified against the statute text (Taxheaven consolidation). Still open: AADE's own guidance, the
  annual application deadline, and the scope of the Art. 5A(2) sentence on relatives' inheritance/gift tax.
- Does the 0.5% listed-share exemption cover foreign exchanges?
- How are gains on non-UCITS ETFs and bonds taxed?
- What are the ENFIA supplementary rates?
- Will the real estate CGT suspension be extended?
- What are the current Golden Visa thresholds?
- Corporate tax rate and treaty count.

## Sources

- PwC, Greece income determination: https://taxsummaries.pwc.com/greece/individual/income-determination
- PwC, Greece other taxes: https://taxsummaries.pwc.com/greece/individual/other-taxes
- PwC, Greece significant developments: https://taxsummaries.pwc.com/greece/individual/significant-developments
- PwC, Greece foreign tax relief and tax treaties: https://taxsummaries.pwc.com/greece/individual/foreign-tax-relief-and-tax-treaties
- PwC, Greece residence: https://taxsummaries.pwc.com/greece/individual/residence
- PwC, Greece other issues: https://taxsummaries.pwc.com/greece/individual/other-issues
- private.law wiki, Greece non-dom regimes: https://wiki.private.law/en/greece-non-dom
- Taxheaven, Law 4172/2013 Article 5A (consolidated text): https://www.taxheaven.gr/law/4172/2013/arthro/5%CE%91
- xe.gr, residential rentals in Glyfada, 4+ bedrooms: https://www.xe.gr/property/results?transaction_name=rent&item_type=re_residence&geo_place_ids%5B%5D=ChIJr3Ztlyi-oRQR6El5e7CyRpM&minimum_bedrooms=4
- ACS Athens, Tuition and Fees 2026-2027: https://www.acs.gr/admissions_financial_tuition_fees/

## Change log
- 2026-10-15: initial research.
- 2026-10-15 (data-quality pass): verified Art. 5A against the statute (amounts, 15 years, conditions, Art. 5A(8) inheritance/gift exemption for foreign movables); raised its capital_gains, dividends and inheritance to high/verified; added prime rent (EUR 6,000) and ACS Athens fee (EUR 16,348).
- 2026-10-15: inheritance scope set to local assets only for art5a_lump_sum in the structured data (Art. 5A(8) exempts movable property abroad; foreign real estate is outside Greek inheritance tax anyway); previously the scoring applied the rates to the worldwide estate, which overstated the tax.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
