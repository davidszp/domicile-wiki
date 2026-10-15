# Rwanda — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Rwanda taxes residents on worldwide income at up to 30%. Rwandan dividends bear a 15% final withholding tax (5% on listed securities for Rwandan/EAC residents). Gains on shares are taxed at 10%, but gains on listed securities traded on the capital market are exempt; gains on commercial real estate are taxed at 30%. There is no wealth tax and no inheritance, estate or gift tax. The Kigali International Financial Centre offers a five-year foreign-income exemption only to new residents who work as experts for KIFC-licensed entities.

US citizens: US citizens remain fully US-taxed on worldwide income and estates; the app adds the US federal layer. No US-Rwanda income tax treaty.

## Residence and eligibility

Permanent residence or habitual abode in Rwanda; or more than 183 days in any 12-month period; or present in the year and averaging more than 122 days in each of the two preceding tax periods (PwC).

- **Residence permit / investor visa** (EU, US, OTHER): Foreigners need a residence permit; investor categories exist but thresholds were not verified in this session.

## Capital gains

### Standard regime

CGT of 10% applies to the gain on the direct or indirect sale or transfer of shares, debt instruments, options and similar assets. Gains on listed shares and securities sold on the capital market, and on units of collective investment schemes, are exempt. Gains on commercial immovable property are taxed at 30%. Residents are taxed on worldwide income, so foreign share gains are scored at 10%.

- **Tax year / confidence / verification:** 2026 / low / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 30% (0.3); listed domestic 0% (0.0); listed foreign 10% (0.1); private business sale 10% (0.1); local real estate 30% (0.3); foreign real estate n/a (null).
- **How derived:** Domestic listed: exempt (capital market transactions). Foreign listed: 10% assumed (worldwide basis; the listed exemption is read as the Rwandan capital market). Private business: 10%. Local real estate: 30% (commercial property; residential gains may be untaxed). Foreign real estate: null.
- **Trader recharacterisation:** Trading would be business income at up to 30%.
- **Foreign assets:** Worldwide taxation with credit for foreign tax up to the Rwandan tax.

### KIFC expert foreign-income exemption (special regime)

Under the KIFC expert exemption, foreign-source income (including foreign gains) is exempt for five years; Rwandan-source gains follow the standard rules.

- **Conditions:** Only for a new resident (not resident in the previous five years) working as an expert or professional directly for a KIFC-licensed entity.
- **Tax year / confidence / verification:** 2026 / low / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 10% (0.1); listed domestic 0% (0.0); listed foreign 0% (0.0); private business sale 10% (0.1); local real estate 30% (0.3); foreign real estate 0% (0.0).
- **How derived:** Foreign listed and foreign real estate 0 (foreign-source income exempt); Rwandan items as standard.

Open points for this tax: Whether the listed-securities exemption covers foreign stock exchanges. | Whether gains on non-commercial (residential) property of individuals are taxed. | Treatment of foreign real estate gains.

## Dividends

### Standard regime

Dividends from Rwandan companies bear a 15% WHT that is the final tax; dividends on securities listed on the capital market paid to Rwandan or EAC residents bear 5%. Residents are taxed on worldwide income; foreign dividends are scored at the 30% top PIT rate with credit for foreign tax up to the Rwandan tax.

- **Tax year / confidence / verification:** 2026 / low / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 30% (0.3); domestic 15% (0.15); foreign gross 30% (0.3); foreign tax relief: credit.
- **How derived:** Domestic 15% final (5% for listed). Foreign 30% top PIT rate before credit (no separate flat rate for foreign dividends found).
- **Outbound withholding:** 15% (5% on listed securities for Rwandan/EAC residents); treaty reductions.
- **Treaty network:** 14 DTTs (Barbados, Belgium, China, DR Congo, Jersey, Korea, Luxembourg, Mauritius, Morocco, Qatar, Singapore, South Africa, Turkey, UAE); none with the US.
- **Holding companies:** CIT 28%; dividends between resident companies exempt.

### KIFC expert foreign-income exemption (special regime)

Foreign dividends are exempt for five years under the KIFC expert exemption; Rwandan dividends are taxed as standard.

- **Tax year / confidence / verification:** 2026 / low / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 15% (0.15); domestic 15% (0.15); foreign gross 0% (0.0); foreign tax relief: not_applicable.
- **How derived:** Domestic 15% (standard). Foreign 0 under the exemption.

Open points for this tax: Whether foreign dividends of individuals are taxed at the 15% investment-income rate rather than the 30% PIT scale.

## Inheritance and gifts to children

### Standard regime

No inheritance, estate or gift tax.

- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **JSON numbers:** basis `none`, children `fully_exempt`, exemption 0 RWF, brackets (marginal): none; other transfer costs 0% (0.0).
- **Gifts:** None. (same as inheritance: True; tax-free after years: None)
- **Foreign assets:** No tax.
- **Residence/domicile rules:** Not applicable.
- **Business relief covers listed shares:** False

## Wealth tax

### Standard regime

No net wealth tax.

- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** Immovable property tax on market value: 0.5% for residential buildings (0.25%/0.1% for multi-storey), 0.3% commercial, plus a per-m² land tax (RWF 0-80).

## Special regimes

- **KIFC expert foreign-income exemption** (`kifc_expert`; EU, US, OTHER; duration 5 years): Five-year exemption from PIT on foreign-source income for a new resident working as an expert or professional directly for a KIFC-licensed entity. Eligibility: Not resident in Rwanda in the five years before becoming resident; works as an expert or professional directly for an entity carrying out KIFC-licensed activities.
  - Metrics that differ from standard: capital_gains, dividends (details in the tax sections above).

## Company taxation (kept separate from personal tax)

Headline CIT rate: 28% (0.28). CIT 28% on worldwide income with foreign tax credit; reduced rates for newly listed companies (20-25% for five years) and registered priority-sector investors; micro and small business regimes.
Special zones/regimes: Kigali International Financial Centre (KIFC) incentives for licensed entities (not reviewed).

## Cost of living notes

Not researched.

## Open questions

- None beyond those listed per tax section.

## Sources

- Rwanda - Individual - Other taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/rwanda/individual/other-taxes
- Rwanda - Corporate - Other taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/rwanda/corporate/other-taxes
- Rwanda - Individual - Taxes on personal income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/rwanda/individual/taxes-on-personal-income
- Rwanda - Individual - Income determination (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/rwanda/individual/income-determination
- Rwanda - Corporate - Income determination (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/rwanda/corporate/income-determination
- Rwanda - Corporate - Withholding taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/rwanda/corporate/withholding-taxes
- Rwanda - Individual - Foreign tax relief and tax treaties (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/rwanda/individual/foreign-tax-relief-and-tax-treaties
- Rwanda - Individual - Residence (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/rwanda/individual/residence
- Rwanda - Corporate - Taxes on corporate income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/rwanda/corporate/taxes-on-corporate-income

## Change log

- 2026-10-15: initial research.
