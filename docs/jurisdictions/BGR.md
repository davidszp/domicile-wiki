# Bulgaria — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Bulgaria adopted the euro on 1 January 2026. It taxes residents' dividends at 5% and other income at a 10% flat rate. Gains on shares sold on EU/EEA regulated markets are exempt; gains realised on US exchanges are taxed at about 9% effective. There is no wealth tax, and transfers to children by gift or inheritance are tax-free.

Currency: EUR. All amounts are in EUR unless stated.

## Residence and eligibility

Resident if present more than 183 days in any 12-month period, if the centre of vital interests is in Bulgaria, or with a permanent address in Bulgaria combined with the centre of vital interests there. Treaties override.

- **EU free movement** (EU): EU/EEA/Swiss citizens may reside and register (details not separately verified).
- **Long-stay visa D and residence permit** (US, OTHER): Non-EU nationals need a type D visa and residence permit for a recognised purpose. A digital-nomad permit exists (funds of 50 gross minimum monthly salaries, one year, renewable once). Investment-based routes not verified.

## Capital gains

Gains on shares (and ETFs) disposed of on a regulated market in the EU/EEA are exempt (Personal Income Taxes Act, art. 13(1)(3)). Other gains on financial assets, including shares sold on US exchanges, are taxed at the 10% flat rate on the annual net result, with a 10% statutory deduction, so about 9% effective. Unlisted company shares: 10%. Real estate: one home held over 3 years plus up to two other properties held over 5 years per year are exempt; otherwise 10% on the gain less a 10% deduction.

**Exemptions and thresholds:** EU/EEA regulated-market disposals: exempt. Real estate exemptions per year: one residential property held >3 years and up to two other properties held >5 years (for Bulgarian and EU/EEA residents).

**Exceptions:** The test is the trading venue, not the issuer: SAP sold on Xetra is exempt, sold on NYSE taxable. US exchanges and, since Brexit, the LSE do not qualify per secondary sources; PwC states the exemption was extended from 2021 to 'equivalent third-country' markets, but which markets count was not verified. Losses on financial assets offset only gains of the same year.

**Holding periods:** No holding period for securities. Real estate: 3 years for one home, 5 years for up to two other properties.

**Foreign assets:** Residents are taxed on worldwide gains, reported in the annual return.

**Professional-trader risk:** Individuals pay 10% on financial-asset gains regardless of frequency; trading organised as a sole-trader business would be taxed as business income at 10% plus social contributions (not verified).

**JSON numbers:** headline 0.1; rates {"listed_securities_domestic": 0.0, "listed_securities_foreign": 0.09, "private_business_sale": 0.1, "real_estate_local": 0.0, "real_estate_foreign": null}. Domestic listed (Bulgarian Stock Exchange regulated market): 0%. Foreign listed: 0.09 assumes a non-EU venue such as NYSE/Nasdaq (10% x 90% of gain); EU/EEA-venue holdings are 0%. Private business sale: 10% on the gain. Real estate local: 0 assumes a property held more than 5 years and within the two-property annual exemption; otherwise about 9%.

2026-10-15: PITA consolidated text (lex.bg) read. From 1 Jan 2026 the exemption covers disposals on a regulated market and/or a growth market, defined via CITA §1 items 70-70a (MFIA art. 152; MiFID II growth markets). US exchanges assumed not to qualify; JSON unchanged.

## Dividends

Dividends from Bulgarian and foreign companies are taxed at 5% (final). Foreign withholding tax is credited up to the Bulgarian tax, so foreign dividends that already bore 5% or more at source (e.g. 15% US treaty rate) normally owe no further Bulgarian tax.

**JSON numbers:** headline 0.05, domestic 0.05, foreign gross 0.05, relief: credit. 5% final tax on dividends and liquidation proceeds; foreign dividends self-assessed at 5% with a per-country credit for foreign tax.

**Outbound withholding:** 5% WHT on dividends to non-residents (treaty reductions); exempt for EU/EEA resident companies except hidden profit distributions.

**Treaties:** 71 double tax treaties, including the US.

## Inheritance and gifts to children

Inheritance tax is a municipal tax under the Local Taxes and Fees Act, but the surviving spouse and lineal heirs (children, grandchildren, parents) do not pay it (art. 31(2)). Gifts between lineal relatives and between spouses are also not taxed (art. 44(6)). Transfers from parents to children are therefore tax-free, both during life and on death.

**Exemptions and thresholds:** Children: full exemption. For other heirs: BGN 250,000 (about EUR 127,800) per heir non-taxable, then 0.4%-0.8% for siblings and their children and 3.3%-6.6% for others, set by municipality.

**Exceptions:** Notary and registration fees apply to real estate transfers; not quantified. An inheritance declaration may still have to be filed with the municipality.

**Gifts:** No gift tax between lineal relatives or spouses (ZMDT art. 44(6)). Others: 0.4%-0.8% (siblings and their children) or 3.3%-6.6% (others).

**Foreign assets:** Exemption for lineal heirs applies to all assets.

**Scope/domicile:** Scope: Bulgarian citizens on worldwide estate; foreign citizens on property in Bulgaria (ZMDT art. 29). Children exempt in any case.

**JSON numbers:** basis `beneficiary`, children `fully_exempt`, exemption 0, brackets [], other transfer cost 0, gifts same as inheritance: True.

## Wealth tax

Bulgaria has no net wealth tax and no levy on financial assets.

**JSON type:** `none`.

**Property tax (not a wealth tax):** Municipal real estate tax 0.01%-0.45% of the property's tax value, set by each municipality.

## Special regimes

No special regime for newly arriving wealthy individuals was identified; only ordinary residence is modelled.

## Company taxation (kept separate from personal tax)

CIT rate 0.1. CIT 10% flat; Pillar Two (QDMTT, IIR, UTPR) for large groups. 5% dividend WHT to non-residents, exempt to EU/EEA companies.

## Cost of living notes

City: Sofia.
- Prime family-home rent (monthly): EUR 2,528 (2026). Median asking rent of 126 house listings of 200-500 m² in Sofia's prime residential areas at the foot of Vitosha and in the centre (Boyana, Dragalevtsi, Simeonovo, Malinova Dolina, Lozenets, Bistritsa, Pancharevo, Center, Izgrev and similar), from all 10 pages of imot.bg 'houses for rent, Sofia' (375 listings) on 15 Oct 2026; range EUR 1,000-10,000. imot.bg itself reports a median of EUR 2,554 for all Sofia house rentals. Source: Къщи под наем в град София, https://www.imot.bg/obiavi/naemi/grad-sofiya/kashta
- International school (annual, per child): EUR 29,021 (2026). Anglo-American School of Sofia, Grades 9-12, 2026-2027: tuition EUR 25,619 plus annual capital fee EUR 3,402 (returning-student total EUR 29,021). New students pay EUR 31,830 in the first year (adds EUR 1,707 entrance capital fee and EUR 1,102 registration fee). Source: Tuition and Fees 2026-2027, https://www.aas-sofia.org/join/tuition-and-fees

Prime purchase price per m², family health insurance and housekeeper cost were not sourced in this round and are omitted rather than guessed.

## Open questions

- Whether a foreign (e.g. US) exchange can ever qualify: the 2026 definition refers to MFIA art. 152 (Bulgarian and EU/EEA regulated markets); art. 152 text not opened. We assume US exchanges do not qualify.
- Taxation of gains on foreign real estate (treated like local real estate?) not verified.
- Exact credit limitation formula for foreign dividends not read in the statute.
- Consolidated statute read from a private legal database, not the State Gazette; notary fee level not verified.
- Art. 29(1) taxes worldwide estate for Bulgarian citizens and Bulgarian-situs property otherwise; irrelevant for children but relevant for other heirs.
- Euro adoption confirmed by PwC and BTA; amounts in older sources are in BGN at 1.95583 per EUR.

## Sources

- [Bulgaria - Individual - Income determination](https://taxsummaries.pwc.com/bulgaria/individual/income-determination)
- [Bulgaria - Individual - Significant developments](https://taxsummaries.pwc.com/bulgaria/individual/significant-developments)
- [Capital Gains from Shares and ETFs - Reporting by Bulgarian Individuals (2026)](https://www.innovires.com/en/blog/kapitalovi-pechalbi-akcii-etf-fizicheski-lica.html)
- [Bulgaria - Individual - Foreign tax relief and tax treaties](https://taxsummaries.pwc.com/bulgaria/individual/foreign-tax-relief-and-tax-treaties)
- [Bulgaria - Corporate - Withholding taxes](https://taxsummaries.pwc.com/bulgaria/corporate/withholding-taxes)
- [Bulgaria - Individual - Other taxes](https://taxsummaries.pwc.com/bulgaria/individual/other-taxes)
- [Zakon za mestnite danatsi i taksite (Local Taxes and Fees Act), consolidated text as amended to SG 55/2026](https://kik-info.com/normativna-baza/zakoni/zmdt/)
- [Oblagane na dareniyata po Zakona za mestnite danatsi i taksi](https://trudipravo.bg/izbrani-statii/oblagane-na-dareniyata-po-zakona-za-mestnite-danatzi-i-taksi/)
- [Bulgaria - Individual - Residence](https://taxsummaries.pwc.com/bulgaria/individual/residence)
- [Bulgaria - Corporate - Taxes on corporate income](https://taxsummaries.pwc.com/bulgaria/corporate/taxes-on-corporate-income)
- Закон за данъците върху доходите на физическите лица (consolidated, lex.bg): https://lex.bg/laws/ldoc/2135538631
- Къщи под наем в град София: https://www.imot.bg/obiavi/naemi/grad-sofiya/kashta
- Tuition and Fees 2026-2027: https://www.aas-sofia.org/join/tuition-and-fees

## Change log

- 2026-10-15: initial research.
- 2026-10-15: added Sofia cost of living (imot.bg rent sample, AAS 2026-27 fees); read the 2026 PITA definition of regulated/growth market for the share-gain exemption.
