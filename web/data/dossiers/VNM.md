# Vietnam — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Vietnam taxes residents on worldwide income, but investment income bears low flat rates: 5% on dividends, 0.1% of proceeds on securities sales, 2% of proceeds on real estate and 20% on gains from private company stakes. Inheritances and gifts above VND 20 million are taxed at 10% personal income tax, with exemptions for real estate within the close family. There is no wealth tax. Long-term residence for a non-working foreign family is difficult: there is no investor-residence programme beyond investor visas tied to a Vietnamese business.

US citizens: The Vietnam-US treaty is signed but not in force (PwC); US citizens credit Vietnamese tax in the US.

## Residence and eligibility

Resident if present 183 days or more in the calendar year or in the 12 consecutive months from arrival, or having a permanent residence in Vietnam (registered residence or a rented house with a definite lease term).

- **Investor visa (DT) and temporary residence card** (EU, US, OTHER): Temporary residence tied to capital invested in a Vietnamese enterprise (tiers by amount; not verified). No passive residence-by-investment programme was found.

## Capital gains

### Vietnamese tax resident (`standard`)

Tax residents are taxed on worldwide income. Non-employment income is taxed at flat rates on gross amounts: sale of securities 0.1% of the sale proceeds, transfer of capital contributions 20% of the net gain (or 2% of proceeds), sale of real estate 2% of the sale proceeds. PwC does not distinguish Vietnamese from foreign securities, so the 0.1%-of-proceeds rule is applied to foreign listed shares too.

- **Important exceptions, statute references and announced changes:** The PwC tables (five-band employment schedule, VND 20 million thresholds, alternative 2%-of-proceeds basis for capital assignments) appear to reflect the new Personal Income Tax Law adopted in 2025; its number and effective date were not verified. How foreign securities are taxed in practice (0.1% of proceeds vs capital-assignment rules) is uncertain.
- **Tax year / confidence / verification:** 2026 / low / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 20% (0.2); listed domestic 0.2% (0.002); listed foreign 0.2% (0.002); private business sale 20% (0.2); local real estate 4% (0.04); foreign real estate 4% (0.04).
- **How derived:** Proceeds-based rates converted to a rate on the gain assuming the gain is half of the proceeds: securities 0.1% of proceeds -> 0.2%; real estate 2% of proceeds -> 4%. Private company (capital assignment): 20% of net gain. Headline 20% = capital assignment rate.
- **Holding period:** None.
- **Trader recharacterisation:** Business income of individuals is taxed at 0.5%-5% of revenue or 15%-20% of profit (PwC); not normally relevant to a private investor.
- **Foreign assets:** Worldwide taxation for residents with credit for foreign PIT, capped at the Vietnamese tax on that income.

## Dividends

### Vietnamese tax resident (`standard`)

Dividends (and non-bank interest) received by residents are taxed at a flat 5%. Foreign dividends of residents are included under the worldwide principle at the same 5%, with a credit for foreign tax capped at the Vietnamese tax, so treaty withholding of 10%-15% normally absorbs it.

- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 5% (0.05); domestic 5% (0.05); foreign gross 5% (0.05); foreign tax relief: credit.
- **How derived:** Flat 5% on gross dividends (PwC). Foreign: 5% before credit; with 10%+ source WHT the net Vietnamese tax is nil.
- **Outbound withholding:** No WHT on dividends paid by Vietnamese companies to foreign corporate shareholders; individuals pay 5% (corporate summary, not opened).
- **Treaty network:** DTAs with 81 jurisdictions, of which several (including the United States) are not yet in force (PwC).
- **Holding companies:** CIT 20%; a company structure is not assumed.

## Inheritance and gifts to children

### Vietnamese tax resident (`standard`)

Vietnam has no separate inheritance or gift tax, but personal income tax of 10% applies to inheritances and gifts (securities, capital contributions, real estate and other registered assets) above VND 20 million. Inheritances and gifts of real estate between parents and children, spouses, grandparents and grandchildren, and siblings are exempt; other assets such as securities passed to children are taxed at 10% (exemption list from general knowledge of the PIT Law, not verified).

- **Tax year / confidence / verification:** 2026 / low / partially_verified (checked 2026-10-15)
- **JSON numbers:** basis `beneficiary`, children `taxed`, scope `worldwide`, exemption 20,000,000 VND, brackets (marginal): 10% (0.1) from 0 VND; other transfer costs 0% (0.0); deemed disposal 0% (0).
- **Gifts:** Gifts above VND 20 million taxed at 10% on the recipient on the same basis as inheritances; real estate between parents and children exempt. (same as inheritance: True; tax-free after years: None)
- **Foreign assets:** Unclear whether foreign securities inherited by a resident heir are caught; the tax applies to assets whose ownership must be registered (Vietnamese securities, capital contributions, real estate, vehicles), so foreign portfolio holdings may fall outside it in practice (not verified).
- **Residence/domicile rules:** Recipient-based: a resident heir is taxed on taxable inheritances; non-residents on Vietnamese assets.
- **Business relief covers listed shares:** False

## Wealth tax

### Vietnamese tax resident (`standard`)

No net wealth tax.

- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** Non-agricultural land use tax at low rates (0.03%-0.15%; not verified). Registration fee 0.5% on property transfers. A tax on second homes has been discussed (not in force as far as checked).

## Special regimes

None modelled; see Residence and eligibility.

## Company taxation (kept separate from personal tax)

Headline CIT rate: 20% (0.2). Standard CIT 20%; 15%-17% for qualifying SMEs under the new CIT Law from tax year 2025; preferential 10%-17% with incentives; 20% on foreign income of Vietnamese companies.

## Cost of living notes

Not researched in this pass (no quickly verifiable sources).

## Open questions

- Only PwC was opened; the PIT Law text (2025 revision) was not read.
- Residence routes for a non-working investor family not researched in detail.
- (standard.capital_gains) Application of the 0.1%-of-proceeds rule to foreign-listed securities not confirmed.
- (standard.inheritance) Scope for foreign assets and the parent-child exemption for non-real-estate assets were not verified in the law.

## Sources

- Vietnam - Individual - Taxes on personal income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/vietnam/individual/taxes-on-personal-income
- Vietnam - Individual - Income determination (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/vietnam/individual/income-determination
- Vietnam - Individual - Foreign tax relief and tax treaties (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/vietnam/individual/foreign-tax-relief-and-tax-treaties
- Vietnam - Individual - Other taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/vietnam/individual/other-taxes
- Vietnam - Individual - Residence (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/vietnam/individual/residence
- Vietnam - Corporate - Taxes on corporate income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/vietnam/corporate/taxes-on-corporate-income

## Change log

- 2026-10-15: initial research.
