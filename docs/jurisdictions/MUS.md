# Mauritius — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026/27
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Mauritius has no capital gains tax, no inheritance, estate or gift tax and no wealth tax. Residents are taxed at 0/10/20% on income, but foreign-source income is taxed only when remitted to Mauritius, and dividends from Mauritian companies are exempt from income tax. For the three income years from 1 July 2025 to 30 June 2028, a Fair Share Contribution of 15% applies to an individual's leviable income (including Mauritian dividends) above MUR 12 million, raising the top rate on large remitted income to 35%. A family that keeps its foreign portfolio income offshore and remits capital pays little or no Mauritian tax.

US citizens: US citizens remain fully US-taxed; Mauritius's remittance basis and lack of CGT mean the US layer is the main cost. No US-Mauritius income tax treaty (not verified).

## Residence and eligibility

Resident for an income year (1 July-30 June) if domiciled in Mauritius unless the permanent place of abode is outside, present 183 days or more in the year, or present 270 days or more in aggregate over the year and the two preceding years.

- **Residence permit through property acquisition / investor occupation permit / Premium Visa** (EU, US, OTHER): Mauritius grants residence permits to non-citizens who buy qualifying property (commonly cited minimum USD 375,000) or invest in a business, and Premium Visas for remote workers and retirees; dependants can be included. Amounts and conditions were not verified in this session (the EDB page returned 404).

## Capital gains

### Standard regime

No tax on capital gains. Income from dealings in units and securities is exempt, and foreign capital gains are not taxable. A series of property purchases and resales can be treated as trading.

- **Exemptions and thresholds:** All capital gains exempt.
- **Important exceptions, statute references and announced changes:** Land transfer tax and registration duty on property transactions (rates not verified in this session). Property dealing can be taxed as trade income.
- **Tax year / confidence / verification:** 2026/27 / high / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 0% (0.0); listed domestic 0% (0.0); listed foreign 0% (0.0); private business sale 0% (0.0); local real estate 0% (0.0); foreign real estate 0% (0.0).
- **How derived:** No capital gains tax; securities dealings exempt. Real estate 0% for an investor (land transfer tax, a seller-side transaction tax, is not modelled).
- **Holding period:** None.
- **Trader recharacterisation:** Repeated property buying and selling may be taxed as a trade; income from dealings in securities is expressly exempt.
- **Foreign assets:** Foreign capital gains are not taxable whether or not remitted.

**Remittance:** the 0% rates do not depend on keeping proceeds offshore: there is no capital gains tax at all (PwC; Deloitte 2026). Only trading activity would turn gains into income.

## Dividends

### Standard regime

Dividends paid by Mauritian resident companies are exempt from income tax, but they count in leviable income for the Fair Share Contribution (15% on leviable income above MUR 12 million, income years 2025/26-2027/28). Foreign dividends are taxable only if received in Mauritius, at up to 20% plus the 15% Fair Share Contribution above MUR 12 million, with a foreign tax credit that usually eliminates much of the Mauritian tax.

- **Exemptions and thresholds:** Income tax bands from 1 July 2025: first MUR 500,000 at 0%, next MUR 500,000 at 10%, remainder 20%. Fair Share Contribution threshold MUR 12 million of net/leviable income.
- **Important exceptions, statute references and announced changes:** Remittance basis: foreign dividends kept outside Mauritius are not taxed. The Fair Share Contribution applies for income years starting 1 July 2025 and the two following years; it lapses after 30 June 2028 unless extended. Mauritius has no comprehensive tax treaty with the United States (general knowledge; not verified), so US dividends bear 30% US WHT.
- **Tax year / confidence / verification:** 2026/27 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 35% (0.35); domestic 15% (0.15); foreign gross 35% (0.35); foreign tax relief: credit.
- **How derived:** Domestic: income-tax exempt (Income Tax Act Second Schedule), but 15% Fair Share Contribution on the part of leviable income above MUR 12 million = 0.15 for a large dividend flow. Foreign: 20% top income tax + 15% FSC = 35% on amounts remitted, before foreign tax credit; 0% if not remitted. After June 2028 the FSC is scheduled to lapse (20% / 0%).
- **Outbound withholding:** Mauritius does not levy WHT on dividends paid by resident companies (general rule; PwC withholding page not checked).
- **Treaty network:** Network of mostly African and Asian treaties used for holding structures; size not verified. No comprehensive US treaty (not verified).
- **Holding companies:** Companies pay 15% (80% partial exemption on specified foreign income such as foreign dividends, giving about 3%); GBL companies are used for international holdings. A 5% corporate Fair Share Contribution applies 2025/26-2027/28 to non-GBL companies with chargeable income and supplies above MUR 24 million.

**Remittance basis and Fair Share Contribution (re-verified 2026-10-15):** residents are taxed on Mauritian-source income and on foreign income remitted to Mauritius (MRA 'Foreign income' page; Deloitte Highlights 2026). The JSON foreign_gross_rate of 0.35 is the rate on foreign dividends that are remitted (20% top rate + 15% Fair Share Contribution on net income above MUR 12 million, for the three income years from 1 July 2025). Foreign dividends kept offshore bear 0%; the scored rate does not assume non-remittance. Mauritian dividends are exempt from income tax but count for the Fair Share Contribution (domestic_rate 0.15). No WHT on dividends paid out; over 50 tax treaties (Deloitte).

## Inheritance and gifts to children

### Standard regime

No inheritance, estate or gift tax. Whether registration duty applies to transfers of Mauritian property by succession or donation to children was not verified; foreign assets are outside any Mauritian charge.

- **Exemptions and thresholds:** No tax of any amount.
- **Important exceptions, statute references and announced changes:** Registration duty and land transfer tax on Mauritian immovable property may apply on donation (not verified). Mauritian civil law (forced heirship under the Civil Code) restricts free disposition of estates of persons whose succession is governed by Mauritian law (general knowledge; not verified).
- **Tax year / confidence / verification:** 2026/27 / high / partially_verified (checked 2026-10-15)
- **JSON numbers:** basis `none`, children `fully_exempt`, exemption 0 MUR, brackets (marginal): none; other transfer costs 0% (0.0).
- **Gifts:** None; registration duty on gifts of Mauritian real estate not verified. (same as inheritance: True; tax-free after years: None)
- **Foreign assets:** No tax.
- **Residence/domicile rules:** Not applicable.
- **Business relief covers listed shares:** False

## Wealth tax

### Standard regime

No net wealth tax.

- **Tax year / confidence / verification:** 2026/27 / high / verified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** Local rates on property in municipal areas; registration duty on property purchases (rate not verified).

## Special regimes

None modelled; see Residence and eligibility.

## Company taxation (kept separate from personal tax)

Headline CIT rate: 15% (0.15). 15% CIT (3% for exporters and Freeport operators); 80% partial exemption on specified foreign income (foreign dividends, interest, ship/aircraft leasing) with no foreign tax credit when claimed. Global Business Licence companies taxed at 15%. Corporate Fair Share Contribution 5% (2% for 3% taxpayers) from 1 July 2025 to 30 June 2028 for companies above MUR 24 million chargeable income and supplies (GBL companies excluded). QDMTT for large MNE groups from 1 July 2025.
Special zones/regimes: Freeport zone (3%), GBL regime for international business.

## Cost of living notes

City: Grand Baie / Tamarin (north and west coasts); Moka for schools.

- **prime_rent_monthly**: 130,000 MUR (2026). Median monthly rent of the 17 long-term rental houses and villas with 4-5 bedrooms listed by Pam Golding Mauritius on 15 Oct 2026 (Tamarin, Pereybere, Grand Baie area, Rivière Noire, La Louisa, Piton, etc.); range MUR 55,000-265,000. Agency asking rents; furnishing mostly not stated. Source: [Long-term rental properties in Mauritius](https://www.pamgolding.mu/en/rent-properties-mauritius/long-term-rental-mauritius.html).
- **intl_school_annual_fee**: 286,880 MUR (2026). Lycée des Mascareignes (Moka; French AEFE-network lycée), seconde to terminale annual fee 2026-27 for families of other nationalities, standard track (international BFI track: MUR 390,610; French or Mauritian parents: MUR 234,410); one-time first-registration fee MUR 100,000. Source: [Lycée des Mascareignes - Frais de scolarité et règlement financier 2026-2027](https://www.lyceedesmascareignes.org/frais-de-scolarite-et-reglement-financier).
- English-curriculum schools (Northfields, Le Bocage) do not publish fees online or could not be reached. Purchase prices, health insurance and housekeeper costs not sourced.

## Open questions

- Registration duty / land transfer tax on succession and donation to children not verified.
- Residence-by-investment thresholds (property USD 375,000, investor permits) not verified.
- Fair Share Contribution confirmed by two professional sources (PwC June 2026; Deloitte January 2026); the Finance Act 2025 text and MRA guidance were not located (MRA website has no FSC page).
- Whether remitted foreign dividends count in full in the income on which the 15% Fair Share Contribution is computed is inferred from 'net income' (PwC, Deloitte), not confirmed from MRA guidance or the Finance Act 2025 text.

## Sources

- Mauritius - Individual - Income determination (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/mauritius/individual/income-determination
- Exempt income (individuals) (Mauritius Revenue Authority, tax_authority): https://www.mra.mu/index.php/individuals/exempt-income
- Foreign income (individuals) (Mauritius Revenue Authority, tax_authority): https://www.mra.mu/index.php/individuals/foreign-income
- Mauritius - Individual - Taxes on personal income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/mauritius/individual/taxes-on-personal-income
- Mauritius - Individual - Other taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/mauritius/individual/other-taxes
- Mauritius - Individual - Residence (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/mauritius/individual/residence
- Mauritius - Corporate - Taxes on corporate income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/mauritius/corporate/taxes-on-corporate-income
- Mauritius Highlights 2026 (updated January 2026) (Deloitte International Tax, professional): https://www.deloitte.com/content/dam/assets-shared/docs/services/tax/2026/dttl-tax-mauritiushighlights-2026.pdf
- Long-term rental properties in Mauritius (Pam Golding Properties Mauritius, professional): https://www.pamgolding.mu/en/rent-properties-mauritius/long-term-rental-mauritius.html
- Lycée des Mascareignes - Frais de scolarité et règlement financier 2026-2027 (Lycée des Mascareignes, other): https://www.lyceedesmascareignes.org/frais-de-scolarite-et-reglement-financier

## Change log

- 2026-10-15: initial research.
- 2026-10-15: reviewed special-regime durations: no special regime.
- 2026-10-15: data-quality pass: added rent (Pam Golding 4-5 bed houses/villas, median) and school fee (Lycée des Mascareignes 2026-27); Fair Share Contribution re-verified with Deloitte Mauritius Highlights 2026; remittance basis stated explicitly in dividend and capital-gains eligibility conditions; dividend WHT 0% and 50+ treaties confirmed.

