# The Gambia — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

The Gambia taxes residents' capital gains, including gains on foreign assets, at the higher of 15% of the gain or 5% of the sale price, as a final tax on each disposal. Dividends bear a final 15% dividend income tax, which GRA applies to all dividends received by residents. No wealth, inheritance or gift tax was identified, but that rests only on the revenue authority's list of taxes. Confidence is low to medium; the statutory residence test and foreign-dividend mechanics were not verified.

US citizens: US citizens remain fully US-taxed; Gambian CGT and dividend tax would generally be creditable against US tax only under US foreign tax credit rules (no treaty). No US-Gambia income tax treaty (not verified).

## Residence and eligibility

Not verified: the statutory residence test in the Income and Value Added Tax Act 2012 could not be obtained (the Act is not on the GRA downloads page). Residents are taxed on worldwide employment income (subject to a foreign-source rule) and on capital assets disposed of abroad.

- **Residence permit** (EU, US, OTHER): Non-citizens need a residence permit from the Gambia Immigration Department; ECOWAS citizens have free movement. Not researched.

## Capital gains

### Standard regime

Capital gains tax applies to disposals of capital assets (land, shares, partnership interests and rights in them). Any person disposing of a capital asset in The Gambia is liable, and so is any Gambian resident who disposes of a capital asset outside The Gambia. For individuals the tax is the higher of 15% of the gain or 5% of the consideration, and it is a final tax.

- **Exemptions and thresholds:** Gains up to GMD 24,000 exempt. Private residence occupied by the taxpayer or parents in the prior two years is exempt if the full proceeds are reinvested in a residence within one year; similar rule for agricultural land (two years).
- **Important exceptions, statute references and announced changes:** Income and Value Added Tax Act 2012. The 5%-of-consideration minimum means the tax on a gain smaller than one third of the sale price exceeds 15% of the gain (e.g. a gain of 20% of the price is taxed at 25% of the gain). Capital losses cannot be offset against other assets' gains or carried forward. Foreign CGT is credited only to the extent a treaty provides. Return and payment due within 15 days of each disposal.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 15% (0.15); listed domestic 15% (0.15); listed foreign 15% (0.15); private business sale 15% (0.15); local real estate 15% (0.15); foreign real estate 15% (0.15).
- **How derived:** 15% of the gain for a large gain (gain at least one third of the proceeds). Where the gain is a smaller share of proceeds, the 5% minimum on consideration raises the effective rate on the gain above 15%; this is not modelled. Foreign assets of residents are within the charge.
- **Holding period:** None; every disposal is taxed.
- **Trader recharacterisation:** Gains of a business of dealing would be business income under personal income tax (top 25%); not verified.
- **Foreign assets:** Residents are liable on disposals of capital assets outside The Gambia; foreign tax credit only under a treaty (lesser of foreign tax and Gambian CGT).

## Dividends

### Standard regime

Dividends paid by Gambian companies bear a 15% withholding tax that is a final tax. GRA states that any dividend income received by a resident taxpayer is liable to dividend income tax at 15% of the gross amount; foreign dividends are therefore scored at 15%.

- **Exemptions and thresholds:** No exemptions for shareholders; no deductions against dividend income.
- **Important exceptions, statute references and announced changes:** How foreign dividends (with no Gambian withholding agent) are assessed and whether foreign WHT is credited was not verified; personal income tax bands top out at 25% (above GMD 64,000 per the 2018 table in the GRA brochure) if foreign dividends were instead taxed as ordinary income.
- **Tax year / confidence / verification:** 2026 / low / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 15% (0.15); domestic 15% (0.15); foreign gross 15% (0.15); foreign tax relief: none.
- **How derived:** Domestic: 15% final WHT. Foreign: 15% dividend income tax on the gross amount per GRA's statement that it applies to all resident recipients; relief for foreign WHT assumed only under a treaty (not verified).
- **Outbound withholding:** 15% on dividends paid to residents and non-residents.
- **Treaty network:** Small; treaty list not researched. No US treaty (not verified), so US dividends bear 30% US WHT.
- **Holding companies:** Companies pay the higher of 27% of profit or 1% of turnover (2% unaudited); companies' capital gains are taxed at the higher of 25% of gain or 10% of consideration.

## Inheritance and gifts to children

### Standard regime

No inheritance, estate or gift tax appears among the taxes administered by the Gambia Revenue Authority. No professional summary confirming this was found.

- **Exemptions and thresholds:** No tax identified.
- **Important exceptions, statute references and announced changes:** Capital gains tax could apply if a gift or transfer on death is treated as a disposal; stamp duty under the Stamp Act applies to conveyances (rates not checked).
- **Tax year / confidence / verification:** 2026 / low / unverified (checked 2026-10-15)
- **JSON numbers:** basis `none`, children `fully_exempt`, scope `worldwide`, exemption 0 GMD, brackets (marginal): none; other transfer costs 0% (0.0).
- **Gifts:** None identified; CGT treatment of gifts not verified. (same as inheritance: True; tax-free after years: None)
- **Foreign assets:** No tax identified.
- **Residence/domicile rules:** Not applicable.
- **Business relief covers listed shares:** False

## Wealth tax

### Standard regime

No net wealth tax: none is among the taxes administered by the Gambia Revenue Authority.

- **Tax year / confidence / verification:** 2026 / low / unverified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** Rental income tax (8% residential, 15% commercial on gross rent); local council rates not researched.

## Special regimes

None modelled; see Residence and eligibility.

## Company taxation (kept separate from personal tax)

Headline CIT rate: 27% (0.27). Corporation tax is the higher of 27% of net profit or 1% of turnover (2% if accounts are unaudited). Resident companies are taxed on worldwide income. Company capital gains: higher of 25% of gain or 10% of consideration.
Special zones/regimes: Not researched.

## Cost of living notes

Not researched in this pass: no cost item could be sourced quickly from an agency report, school fee page or comparable source, so `cost_of_living` is omitted.

## Open questions

- No Big-4 summary covers The Gambia; all figures come from GRA brochures and FAQs (brochures dated 2023; PIT bands as at 2018).
- Whether a transfer by gift or on death counts as a disposal at market value for CGT was not verified.
- Whether listed securities of a large portfolio are reported per disposal (15-day returns) in practice is unclear.
- Taxation of foreign dividends of resident individuals (15% dividend income tax vs. ordinary rates up to 25%) and foreign tax credit not verified.
- Absence of inheritance/gift tax is inferred from GRA's list of domestic taxes only; confirm with a Gambian adviser.

## Sources

- Capital Gains Tax brochure (Gambia Revenue Authority, tax_authority): https://www.gra.gm/download-file/8d0c6de0-d217-11ed-9b31-029254d29bb1
- Domestic taxes FAQs (Gambia Revenue Authority, tax_authority): https://www.gra.gm/domestic-faqs
- Dividend Income Tax brochure (Gambia Revenue Authority, tax_authority): https://www.gra.gm/download-file/8d0c84c3-d217-11ed-9b31-029254d29bb1
- Personal Income Tax brochure (Gambia Revenue Authority, tax_authority): https://www.gra.gm/download-file/8d0cd78a-d217-11ed-9b31-029254d29bb1

## Change log

- 2026-10-15: initial research.
