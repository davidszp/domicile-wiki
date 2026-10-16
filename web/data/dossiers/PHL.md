# Philippines — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

The Philippines taxes foreigners, resident or not, only on Philippine-source income, so foreign dividends and gains on foreign securities are untaxed. Philippine dividends bear a 10% final tax, and listed Philippine shares a 0.1% tax on the sale price. Estate tax is a flat 6% above PHP 5 million, and for a resident alien it reaches the worldwide estate. Gifts above PHP 250,000 a year bear 6% donor's tax. There is no wealth tax. Residence is available through the Special Resident Retiree's Visa and other visas.

US citizens: US citizens pay US tax on worldwide income; Philippine tax on their foreign income is nil. The 6% Philippine estate tax on a resident alien's worldwide estate is creditable against US estate tax only within foreign-tax-credit limits (no estate tax treaty).

## Residence and eligibility

Aliens: 'resident alien' if living in the Philippines with no definite intention as to length of stay; aliens staying more than 180 days in a calendar year are at least non-resident aliens engaged in trade or business. Both are taxed on Philippine-source income only.

- **Special Resident Retiree's Visa (SRRV) and other permanent visas** (EU, US, OTHER): SRRV for applicants aged 50+ with a deposit (amount varies by option and age; not verified); quota immigrant and treaty-based permanent visas exist.

## Capital gains

### Resident alien (`standard`)

Aliens, whether resident or not, are taxed only on Philippine-source income, so a foreign family's gains on foreign securities and foreign property are not taxed. Philippine-source gains: shares listed and traded on a stock exchange bear a stock transaction tax of 0.1% of the gross selling price (cut from 0.6% by the Capital Markets Efficiency Promotion Act, effective 2025); unlisted shares 15% of net gain; Philippine real property 6% of the higher of gross price and fair market value.

- **Exemptions and thresholds:** Foreign-source gains of aliens: outside the tax net.
- **Important exceptions, statute references and announced changes:** PwC's individual pages still show the 0.6% stock transaction tax; PwC's corporate 'Other taxes' page shows the 0.1% rate after the 2025 reform, which is used here. Philippine citizens who are resident are taxed on worldwide income (not relevant to EU/US/OTHER citizens).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 15% (0.15); listed domestic 0.2% (0.002); listed foreign 0% (0.0); private business sale 15% (0.15); local real estate 12% (0.12); foreign real estate 0% (0.0).
- **How derived:** Proceeds-based taxes converted to a rate on the gain assuming the gain is half the proceeds: listed shares 0.1% of proceeds -> 0.2%; Philippine real property 6% of gross price -> 12%. Unlisted Philippine shares 15% of net gain. Foreign assets 0 (aliens taxed on Philippine-source income only).
- **Holding period:** None for the final taxes.
- **Trader recharacterisation:** Dealers in securities are taxed on ordinary income at graduated rates (up to 35%).
- **Foreign assets:** Not taxed for aliens (resident or non-resident).

## Dividends

### Resident alien (`standard`)

Resident aliens pay a 10% final tax on dividends from domestic corporations. Foreign dividends are foreign-source income and not taxed for aliens; there is no foreign tax credit for aliens (PwC).

- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 10% (0.1); domestic 10% (0.1); foreign gross 0% (0.0); foreign tax relief: exemption.
- **How derived:** Domestic 10% final (resident aliens). Foreign 0: outside the scope of tax for aliens.
- **Outbound withholding:** Dividends to non-resident aliens 20%/25% final, to non-resident foreign corporations 25% (15% with tax-sparing), reducible by treaty.
- **Treaty network:** About 44 DTAs including the US, the UK and major EU states (PwC list).
- **Holding companies:** Domestic corporations pay 25% CIT (20% for small companies); a company structure is not assumed.

## Inheritance and gifts to children

### Resident alien (`standard`)

Estate tax is a flat 6% of the net estate (TRAIN Law, NIRC Sec. 84). For citizens and residents (including resident aliens) the gross estate covers property wherever situated, after a PHP 5 million standard deduction, the family home (up to PHP 10 million), debts and the surviving spouse's share of conjugal property. Non-resident aliens are taxed only on Philippine property. Donor's tax is also 6%, on gifts above PHP 250,000 a year.

- **Exemptions and thresholds:** PHP 5,000,000 standard deduction per estate; family home deduction up to PHP 10,000,000; donor's tax exemption PHP 250,000 per calendar year.
- **Important exceptions, statute references and announced changes:** Reciprocity exemption for intangible personal property of non-resident aliens (NIRC Sec. 104; not verified). Foreign estate tax is creditable.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** basis `estate`, children `taxed`, scope `worldwide`, exemption 5,000,000 PHP, brackets (marginal): 6% (0.06) from 0 PHP; other transfer costs 0% (0.0); deemed disposal 0% (0).
- **Gifts:** Donor's tax 6% on total gifts above PHP 250,000 in a calendar year, paid by the donor. (same as inheritance: False; tax-free after years: None)
- **Foreign assets:** Included in the gross estate of a resident alien (Sec. 85, 'wherever situated'); credit for foreign estate tax (Sec. 86(D)).
- **Residence/domicile rules:** Residence of the decedent decides: resident aliens worldwide, non-resident aliens Philippine assets only.
- **Business relief covers listed shares:** False

**Surviving spouse:** No marital deduction: what the spouse inherits is taxed at the flat 6% of the net estate; only the spouse's own net share of the conjugal or community property is deducted, and that is not an inheritance (NIRC Sec. 86(C), as amended by RA 10963).

## Wealth tax

### Resident alien (`standard`)

No net wealth tax.

- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** Real property tax up to 1% (provinces) or 2% (cities and Metro Manila municipalities) of assessed value plus 1% for the special education fund. Foreigners cannot own land (condominium units up to 40% of a project).

## Special regimes

None modelled; see Residence and eligibility.

## Company taxation (kept separate from personal tax)

Headline CIT rate: 25% (0.25). 25% CIT on domestic corporations' worldwide income (20% for small corporations); 2% minimum corporate income tax on gross income from the fourth year.
Special zones/regimes: PEZA economic zones and CREATE/CREATE MORE incentives (not researched).

## Cost of living notes

Not researched in this pass (no quickly verifiable sources).

## Open questions

- Whether a family on a retiree or other permanent visa is a 'resident alien' (worldwide estate tax) or a non-resident alien depends on intention; assumed resident.
- SRRV deposit amounts not verified.
- (standard.capital_gains) The 0.1% stock transaction tax is from PwC's corporate page; the RA 12214 text was not opened.

## Sources

- Philippines - Individual - Taxes on personal income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/philippines/individual/taxes-on-personal-income
- Philippines - Individual - Income determination (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/philippines/individual/income-determination
- Philippines - Corporate - Other taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/philippines/corporate/other-taxes
- Philippines - Individual - Foreign tax relief and tax treaties (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/philippines/individual/foreign-tax-relief-and-tax-treaties
- Republic Act No. 10963 (TRAIN Law), amending NIRC Secs. 84-86 (estate tax) and 98-99 (donor's tax) (Lawphil Project (text of Republic Act), legislation): https://lawphil.net/statutes/repacts/ra2017/ra_10963_2017.html
- Philippines - Individual - Other taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/philippines/individual/other-taxes
- Philippines - Individual - Residence (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/philippines/individual/residence
- Philippines - Corporate - Taxes on corporate income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/philippines/corporate/taxes-on-corporate-income

## Change log

- 2026-10-15: initial research.
- 2026-10-16: added surviving-spouse treatment.
