# Zambia — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Zambia has no capital gains tax, no wealth tax and no inheritance, estate or gift tax. Gains on listed and foreign securities are untaxed; an 8% Property Transfer Tax on value applies instead to Zambian land and unlisted Zambian shares. The weak point for this family is dividends: residents' foreign dividends (and interest) are taxed at progressive rates up to 37%, with a foreign tax credit. Dividends from Lusaka-listed companies are exempt.

US citizens: US citizens remain fully US-taxed. Zambia's 37% tax on foreign dividends exceeds the US rate on qualified dividends, so the Zambian tax would be the binding layer (credit mechanics under US rules not analysed). No US-Zambia income tax treaty (not verified).

## Residence and eligibility

An individual is resident unless present in Zambia only for a temporary purpose and not with a view to establishing residence; presence of 183 days or more in a charge year (calendar year) always makes an individual resident.

- **Immigration permits (investor, employment, residence)** (EU, US, OTHER): All non-Zambians need a permit under the Immigration and Deportation Act; investor and residence permit thresholds were not researched in this pass.

## Capital gains

### Standard regime

Zambia has no capital gains tax. Gains on listed or foreign securities are outside income tax (the Income Tax Act taxes Zambian-source income plus residents' foreign interest and dividends only). Instead, Property Transfer Tax (PTT) of 8% of the value is charged, normally on the seller, on transfers of Zambian land and buildings and of shares in Zambian-incorporated companies other than shares listed on the Lusaka Securities Exchange (LuSE).

- **Exemptions and thresholds:** No CGT at all. PTT does not apply to LuSE-listed shares or to foreign shares.
- **Important exceptions, statute references and announced changes:** PTT 8% (from 1 January 2025) on land, unlisted Zambian shares (including indirect transfers by a non-resident company holding at least 10%), IP and certain mining rights; 10% on mining licences/rights. PTT is levied on value (realisable value/consideration), not on the gain. Business income (a trade in shares or property) is taxable at income tax rates.
- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 0% (0.0); listed domestic 0% (0.0); listed foreign 0% (0.0); private business sale 8% (0.08); local real estate 8% (0.08); foreign real estate 0% (0.0).
- **How derived:** Listed (LuSE) and foreign securities: 0 (no CGT; no PTT on listed or foreign shares). Private business (shares in a Zambian company) and Zambian real estate: 0.08 = 8% PTT on the transfer value, recorded as the rate because it replaces CGT; on a gain smaller than the full value the burden relative to the gain is higher (e.g. 16% of a gain equal to half the value). Foreign real estate: 0.
- **Holding period:** None.
- **Trader recharacterisation:** Profits from a business of dealing in shares or property are business income taxed at up to 37% (individual) or 30% (company).
- **Foreign assets:** Gains on foreign assets are not taxed; only foreign interest and dividends of residents are brought into Zambian tax.

## Dividends

### Standard regime

Dividends from Zambian companies bear a final 15% withholding tax, but dividends paid to individuals by LuSE-listed companies are exempt. Foreign dividends received by Zambian residents are deemed Zambian-source and taxed at the progressive rates (top 37% above ZMW 110,400 a year), with a unilateral foreign tax credit where no treaty applies.

- **Exemptions and thresholds:** 2026 bands (annual): ZMW 0-61,200 0%; 61,201-85,200 20%; 85,201-110,400 30%; above 110,400 37%.
- **Important exceptions, statute references and announced changes:** Dividend WHT is a final tax for individuals. Exempt: dividends from LuSE-listed companies to individuals, mining-company dividends, and certain farming and vehicle-assembly dividends for five years.
- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 37% (0.37); domestic 0% (0.0); foreign gross 37% (0.37); foreign tax relief: credit.
- **How derived:** Domestic: 0 for LuSE-listed shares (the relevant case for a listed portfolio); unlisted Zambian companies 15% final WHT. Foreign: deemed Zambian-source, taxed at the 37% top rate before a credit limited to the Zambian tax on that income (treaty rates where a treaty applies).
- **Outbound withholding:** 15% (residents) / 20% (non-residents, reducible by treaty) on dividends from Zambian companies; 0% on LuSE-listed dividends to individuals and on mining dividends.
- **Treaty network:** More than 20 treaties (Deloitte 2026). No US income tax treaty (not verified from the US list), so US dividends bear 30% US WHT.
- **Holding companies:** Companies pay 30% CIT; no CGT. A company holding a foreign portfolio would itself be taxed on foreign dividends; not modelled.

## Inheritance and gifts to children

### Standard regime

No inheritance tax, estate duty, gift or donations tax.

- **Exemptions and thresholds:** No tax of any amount.
- **Important exceptions, statute references and announced changes:** Property Transfer Tax (8%) may arise when Zambian land or unlisted Zambian shares are transferred; whether transfers to heirs or donees are exempt was not verified. Foreign assets and listed securities are outside PTT.
- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **JSON numbers:** basis `none`, children `fully_exempt`, scope `worldwide`, exemption 0 ZMW, brackets (marginal): none; other transfer costs 0% (0.0).
- **Gifts:** None (no donations tax); PTT on gifts of Zambian land or unlisted shares not verified. (same as inheritance: True; tax-free after years: None)
- **Foreign assets:** No tax.
- **Residence/domicile rules:** Not applicable.
- **Business relief covers listed shares:** False

## Wealth tax

### Standard regime

No net wealth or net worth tax.

- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** Local council rates on land and buildings (Ministry of Lands / city councils); PTT on transfers.

## Special regimes

None modelled; see Residence and eligibility.

## Company taxation (kept separate from personal tax)

Headline CIT rate: 30% (0.3). 30% standard CIT for companies and branches (35% electronic communications; mining and other sector rates differ); 5% turnover tax for small businesses. No CGT; PTT applies to transfers of land and unlisted shares. 15% final WHT on dividends to residents, 20% to non-residents.
Special zones/regimes: Multi-facility economic zones and priority-sector incentives (not researched).

## Cost of living notes

Not researched in this pass: no cost item could be sourced quickly from an agency report, school fee page or comparable source, so `cost_of_living` is omitted.

## Open questions

- Investor/residence permit requirements not researched.
- Whether PTT applies to the transfer of Zambian land or unlisted shares to heirs on death or by gift (and on what value) was not verified.
- PTT treatment of transfers on death and of gifts of Zambian real estate not verified.

## Sources

- Zambia - Individual - Income determination (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/zambia/individual/income-determination
- Zambia - Individual - Other taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/zambia/individual/other-taxes
- Zambia Highlights 2026 (updated April 2026) (Deloitte International Tax, professional): https://www.deloitte.com/content/dam/assets-shared/docs/services/tax/2026/dttl-tax-zambiahighlights-2026.pdf
- Zambia - Individual - Taxes on personal income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/zambia/individual/taxes-on-personal-income
- Zambia - Individual - Residence (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/zambia/individual/residence

## Change log

- 2026-10-15: initial research.
