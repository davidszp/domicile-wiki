# Suriname — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Suriname taxes residents on worldwide income (Wet Inkomstenbelasting 1922): dividends and interest, domestic or foreign, are taxed at progressive rates reaching 38% above SRD 234,000, with 25% Surinamese dividend tax credited. Private capital gains on securities are not among the taxable income sources. Suriname still levies a net wealth tax on residents' worldwide net assets: the consolidated law published by the tax authority states 3% of net wealth above SRD 100,000 (SRD 120,000 married), which would be very costly for this family. Inheritance tax not verified.

US citizens: No US-Suriname income tax treaty known. US citizens remain subject to US federal tax.

## Residence and eligibility

Living in Suriname, judged on the circumstances (IB art. 1; Wet Vermogensbelasting art. 1).

- **Residence permit (verblijfsvergunning)** (EU, US, OTHER): Not researched.

## Capital gains

### Standard regime

The Income Tax Act taxes income from sources (business and work, immovable property, movable capital, periodic payments). Gains on the private sale of securities or real estate are not a listed source and are untaxed unless realised in a business. Business cessation gains can be taxed at 25% on request (art. 34(4)).

- **Tax year / confidence / verification:** 2026 / low / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 0% (0.0); listed domestic 0% (0.0); listed foreign 0% (0.0); private business sale 0% (0.0); local real estate 0% (0.0); foreign real estate 0% (0.0).
- **How derived:** Wet Inkomstenbelasting 1922 arts. 5-7 define income from immovable property, movable capital (dividends, interest) and enterprise/work; private capital gains are not included.
- **Trader recharacterisation:** Gains forming part of business profits are taxed at the progressive rates up to 38%.

Open points for this tax: No explicit statement found; conclusion drawn from the structure of IB arts. 4-7. Substantial-shareholding rules not found in the consolidated text.

## Dividends

### Standard regime

Dividends and interest from shares, bonds and other securities are income from movable capital (art. 6), taxed in the progressive scale: 0% to SRD 108,000, then 8%, 18%, 28% and 38% above SRD 234,000 (art. 34). Surinamese companies withhold 25% dividend tax, credited against income tax (art. 52e).

- **Tax year / confidence / verification:** 2026 / medium / verified (checked 2026-10-15)
- **JSON numbers:** headline 38% (0.38); domestic 38% (0.38); foreign gross 38% (0.38); foreign tax relief: none.
- **How derived:** Art. 34(1) top rate 38% above SRD 234,000; Wet Dividendbelasting art. 5: 25% WHT, credited as a prepayment (IB art. 52e) so the total is 38%.
- **Outbound withholding:** 25% dividend tax (Wet Dividendbelasting art. 5).
- **Treaty network:** Very small network (Netherlands Kingdom arrangements; not researched).

Open points for this tax: Unilateral relief for foreign tax on foreign dividends depends on a Staatsbesluit (art. on voorkoming dubbele belasting); not found, scored as none.

## Inheritance and gifts to children

### Standard regime

Not verified. No inheritance or gift tax law is published on the tax authority's legislation page, and no other source could be opened. Scored as an untaxed placeholder with low confidence; treat as unknown.

- **Tax year / confidence / verification:** 2026 / low / unverified (checked 2026-10-15)
- **JSON numbers:** basis `beneficiary`, children `taxed_low`, exemption 0 SRD, brackets (marginal): none; other transfer costs 0% (0.0).
- **Gifts:** Unknown. (same as inheritance: True; tax-free after years: None)
- **Business relief covers listed shares:** False

Open points for this tax: Whether Suriname levies a successierecht/inheritance tax on residents' estates, at what rates for children, is unknown.

## Wealth tax

### Standard regime

Vermogensbelasting: residents are taxed on worldwide net wealth (all assets with money value minus debts; foreign assets must be declared). Art. 14: the tax is 3% of the taxable sum, being net wealth minus SRD 100,000 (unmarried) or SRD 120,000 (married). Non-residents are taxed only on Surinamese real estate and permanent-establishment assets. The tax authority still issues the 2026 return.

- **Tax year / confidence / verification:** 2026 / low / partially_verified (checked 2026-10-15)
- **JSON type:** `broad`
- **Component Vermogensbelasting (Wet Vermogensbelasting 1944, art. 14):** base `net_wealth_worldwide`, allowance 120,000 SRD, entry threshold 0 SRD, brackets (marginal): from 0 SRD: 3% (0.03). Allowance SRD 120,000 for a married taxpayer (SRD 100,000 unmarried). Unilateral relief by decree possible for foreign assets taxed abroad.
- **Property tax (not a wealth tax):** Huurwaardebelasting (rental value tax) exists as a separate law; not researched.

Open points for this tax: The 3% rate is as printed in the tax authority's consolidated text (last amended S.B. 2002 no. 107). A rate of 3% on net wealth is unusually high; it may be a transcription of 3 per mille. Needs confirmation from the official gazette or a Surinamese adviser before relying on it.

## Special regimes

None modelled; see Residence and eligibility.

## Company taxation (kept separate from personal tax)

Headline CIT rate: 36% (0.36). Income tax on bodies (lichamen) at 36% (IB art. 36). 25% dividend withholding tax.

## Cost of living notes

Not researched.

## Open questions

- Wealth tax rate (3% vs possible 3 per mille).
- Inheritance tax unknown.

## Sources

- Wet Inkomstenbelasting 1922 (geldende tekst, laatstelijk gewijzigd bij S.B. 2024 no. 3) (Belastingdienst Suriname, legislation): https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-Inkomstenbelasting.pdf
- Wet Dividendbelasting (geldende tekst) (Belastingdienst Suriname, legislation): https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-Dividendbelasting.pdf
- Belastingdienst Suriname: Inkomstenbelasting (Belastingdienst Suriname, tax_authority): https://belastingdienst.sr/belastingen/inkomstenbelasting/
- Wet Vermogensbelasting 1944 (geldende tekst, laatstelijk gewijzigd bij S.B. 2002 no. 107) (Belastingdienst Suriname, legislation): https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-Vermogensbelasting.pdf
- Aangiftebiljet Vermogensbelasting 2026 (Belastingdienst Suriname, tax_authority): https://belastingdienst.sr/wp-content/uploads/2026/04/Vermogensbelasting-2026.pdf

## Change log

- 2026-10-15: initial research.
- 2026-10-15: inheritance marked not_researched: Placeholder: no inheritance/gift tax law could be verified, so the metric is treated as missing (not as untaxed).
