# Liechtenstein — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Liechtenstein taxes wealth instead of investment income. Net wealth (excluding foreign real estate) is converted into a deemed income of 4% (Sollertrag) and taxed with other income at the progressive state rate (top 8%) plus a municipal surcharge of 150%-250% of the state tax; at the minimum surcharge of 150% this is a wealth tax of up to 0.8% a year (0.896% at 180%). In return, dividends, interest and gains on shares and other movable private assets are exempt from income tax. There is no inheritance or gift tax. Liechtenstein real estate gains bear a separate tax of up to 24%. The main obstacle is residence: permits are scarce for EEA nationals and very limited for others.

## Residence and eligibility

Resident with a domicile in Liechtenstein (living there with the intention to stay) or a habitual residence of more than six months.

- **EEA nationals: residence permit within annual quota** (EU): Liechtenstein is in the EEA but restricts free movement of persons: residence permits for EEA nationals who do not work in Liechtenstein are subject to an annual quota, part of which is allocated by lottery. Details not verified in this session (official llv.li pages were blocked).
- **Third-country nationals** (US, OTHER): Very limited: permits are granted only exceptionally (e.g. senior managers or persons with a significant economic interest in Liechtenstein). No investor or golden-visa programme known. Not verified in this session.

Standard regime eligibility: Domicile (intention to stay permanently) or habitual residence of more than six months in Liechtenstein. Requires a residence permit, which is the main practical barrier.

## Capital gains

Capital gains on movable and immovable private assets are exempt from income tax (Art. 15(2)(m) SteG), as are gains on shares (Art. 15(2)(o)) and gains on foreign real estate (Art. 15(2)(l)). Gains on Liechtenstein real estate are taxed separately by the real estate gains tax: the income tax tariff for single persons (top 8%) plus a fixed 200% surcharge, up to 24%. Capital losses are not deductible.

JSON values: headline rate 24% (`0.24`); listed securities domestic 0% (`0.0`), foreign 0% (`0.0`); private business sale 0% (`0.0`); local real estate 24% (`0.24`); foreign real estate 0% (`0.0`).

- **How the JSON numbers were derived:** Movable assets, shares and foreign real estate: exempt under Art. 15(2)(l), (m), (o) SteG. Liechtenstein real estate: Art. 42 applies the Art. 19(1)(a) tariff (top marginal 8% from CHF 211,401) and Art. 43 adds a 200% surcharge instead of the municipal surcharge: 8% x 3 = 24%. Headline = that 24%.
- **Holding periods:** None.
- **Professional-trader risk:** Professional securities dealing would be business income (taxed via the income tax), but the private-asset exemption is broad; no recharacterisation guidance was found.
- **Foreign assets:** Foreign securities: same exemption. Foreign real estate: excluded from wealth tax (Art. 10(e)) and its gains exempt (Art. 15(2)(l)), with progression reservation for the rate (Art. 21).
- **Exemptions and thresholds:** All private capital gains on movable assets exempt. Real estate gains tax: the basic allowance of the single-person tariff (CHF 15,855) applies.
- **Eligibility conditions:** Assets held as private assets. Business assets follow different rules (anti-abuse rules for passive low-taxed foreign participations).
- **Regional differences:** Municipal surcharge differs by municipality but does not affect exempt gains; the real estate gains surcharge is a fixed 200%.
- **Important exceptions / announced changes:** Business-asset participations in passive, low-taxed foreign entities can lose the exemption. Indirect transfers of real estate companies trigger real estate gains tax.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **Sources:** [Steuergesetz (SteG), LGBl. 2010.340, consolidated version 01.07.2026](https://www.gesetze.li/konso/2010340000); [Liechtenstein - Individual - Income determination](https://taxsummaries.pwc.com/liechtenstein/individual/income-determination); [Liechtenstein - Individual - Other taxes](https://taxsummaries.pwc.com/liechtenstein/individual/other-taxes)

## Dividends

Dividends and profit shares from participations in legal entities are exempt from income tax for private shareholders (Art. 15(2)(n) SteG), as are all returns on wealth subject to wealth tax (Art. 15(1)(a)). The wealth tax (deemed return) replaces dividend tax.

JSON values: headline 0% (`0.0`); domestic 0% (`0.0`); foreign gross 0% (`0.0`); foreign tax relief: not_applicable.

- **How the JSON numbers were derived:** Art. 15(2)(n) SteG exempts profit shares; Art. 15(1)(a) exempts returns on wealth subject to wealth tax. Rate 0.
- **Outbound withholding:** Liechtenstein abolished its dividend coupon tax in 2011 (from general knowledge; PwC's withholding section not opened); companies distribute without withholding.
- **Treaty network:** Small treaty network; not verified in this session.
- **Holding-company notes:** Companies pay 12.5% profit tax with a CHF 1,800 minimum tax. Private asset structures (PVS) pay only the minimum tax but have no treaty access. No structure is modelled: a resident already pays no tax on dividends and gains; a controlled foundation or company is attributed to the founder for wealth tax, and moving assets into an opaque foundation that leaves the wealth tax base costs a one-off dedication tax of 3.5% plus municipal surcharge (8.75%-9.8%, up to 10.5%), after which distributions are taxable income for resident beneficiaries, so the saving of about 0.8% a year takes a decade or more to recover and is not a commonly used robust structure for residents.
- **Exemptions and thresholds:** Full exemption.
- **Eligibility conditions:** Private shareholder.
- **Regional differences:** None.
- **Important exceptions / announced changes:** Foreign withholding tax on dividends cannot be credited because no Liechtenstein tax arises on them; treaty reduction at source is the only relief.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **Sources:** [Steuergesetz (SteG), LGBl. 2010.340, consolidated version 01.07.2026](https://www.gesetze.li/konso/2010340000); [Liechtenstein - Individual - Income determination](https://taxsummaries.pwc.com/liechtenstein/individual/income-determination)

## Inheritance and gifts to children

Liechtenstein levies no inheritance, estate or gift tax. Inheritances and gifts are also exempt from income tax (Art. 15(2)(c) SteG). The heirs simply include the assets in their own wealth tax base afterwards.

JSON values: basis `none`, bracket mode `marginal`, children `fully_exempt`, exemption CHF 0, marginal brackets above the exemption: none; other transfer costs 0% (`0`); gifts same as inheritance: True; tax-free after years: None.

- **Gifts:** No gift tax; gifts are exempt from income tax. Only the dedication tax applies to transfers into structures outside the wealth tax base.
- **Business relief:** Not needed. Covers listed portfolios: no.
- **Foreign assets:** No tax on any assets; foreign estate taxes of situs countries may apply.
- **Domicile / residence rules:** Not applicable.
- **Exemptions and thresholds:** Full exemption.
- **Eligibility conditions:** None.
- **Regional differences:** None.
- **Important exceptions / announced changes:** A 3.5% dedication tax (Widmungssteuer, Art. 13 SteG) plus municipal surcharge (up to 10.5% in total per PwC) applies when assets are transferred to an entity or structure so that they leave the wealth tax base and the beneficial interests cannot be valued; not relevant to direct gifts to children.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **Sources:** [Liechtenstein - Individual - Other taxes](https://taxsummaries.pwc.com/liechtenstein/individual/other-taxes); [Steuergesetz (SteG), LGBl. 2010.340, consolidated version 01.07.2026](https://www.gesetze.li/konso/2010340000)

## Wealth tax

Wealth tax is levied through the income tax: worldwide net wealth (excluding foreign real estate and foreign permanent establishments) is multiplied by a 4% standard return (Sollertrag, Art. 5 SteG) and taxed together with other income at the progressive state tariff (marginal 1%-8%), plus a municipal surcharge set each year by the municipality between 150% and 250% of the state tax (PwC: currently 150%-180%). For a married couple whose only income is the deemed return, the effective marginal wealth tax rises to 0.8% at a 150% surcharge (0.896% at 180%).

JSON type: `broad`.

- **Component Wealth tax via 4% deemed return (Vermögenssteuer als Sollertrag)** (base `net_wealth_worldwide`, bracket mode `marginal`): allowance CHF 0, entry threshold CHF 0; brackets: 0% (`0.0`) from CHF 0, 0.1% (`0.001`) from CHF 792,750, 0.3% (`0.003`) from CHF 1,057,000, 0.4% (`0.004`) from CHF 2,114,000, 0.5% (`0.005`) from CHF 3,699,500, 0.6% (`0.006`) from CHF 5,285,000, 0.65% (`0.0065`) from CHF 6,870,500, 0.7% (`0.007`) from CHF 8,456,000, 0.8% (`0.008`) from CHF 10,570,000. Derived from Art. 19(1)(c) SteG (married couples): marginal state rates 0/1/3/4/5/6/6.5/7/8% with income thresholds CHF 31,710 / 42,280 / 84,560 / 147,980 / 211,400 / 274,820 / 338,240 / 422,800. Wealth thresholds = income thresholds / 0.04. Effective wealth rate = 4% x state rate x 2.5 (150% municipal surcharge). Base excludes foreign real estate (Art. 10(e)).
- **Property tax (not a wealth tax):** No separate property tax; Liechtenstein real estate is part of the wealth tax base.
- **Exemptions and thresholds:** Household goods and private cars up to CHF 52,800 for a married couple; foreign real estate exempt. The income tax basic allowance (CHF 31,710 joint) makes the first ~CHF 792,750 of wealth tax-free if there is no other income.
- **Eligibility conditions:** All residents taxed in the ordinary way.
- **Regional differences:** The municipal surcharge varies (legal range 150%-250%); the brackets assume 150%.
- **Important exceptions / announced changes:** Because the deemed return is added to other income, earned or pension income pushes the deemed return into higher bands sooner. Transfers into a structure that leaves the wealth tax base (e.g. an opaque foundation without proxy taxation) bear a one-off 3.5% dedication tax (Art. 13) plus the municipal surcharge. Lump-sum taxation on expenditure (Art. 30-34) replaces wealth and income tax for qualifying newcomers (see open questions).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Steuergesetz (SteG), LGBl. 2010.340, consolidated version 01.07.2026](https://www.gesetze.li/konso/2010340000); [Liechtenstein - Individual - Taxes on personal income](https://taxsummaries.pwc.com/liechtenstein/individual/taxes-on-personal-income); [Liechtenstein - Individual - Other taxes](https://taxsummaries.pwc.com/liechtenstein/individual/other-taxes)

## Special regimes

None modelled; see the summary and open questions for regimes considered and rejected.

## Holding structures

**No structure modelled.** Residents already pay no income tax on dividends and gains; the burden is the wealth tax on a 4% deemed return (up to about 0.8%-0.9% a year).

- A private asset structure (PVS, minimum tax CHF 1,800) helps non-residents, but for a resident founder a controlled foundation or company is attributed to the founder and stays in the wealth tax base.
- Putting assets into an opaque structure so that they leave the wealth tax base triggers the dedication tax: 3.5% of the wealth-tax value plus a municipal surcharge of 150%-180% (PwC), so 8.75%-9.8% one-off (up to 10.5%), about CHF 2.6-2.9 million on EUR 30 million. Afterwards, distributions to resident beneficiaries are taxable income to the extent the benefit is not subject to wealth tax (PwC), at up to about 20%-22%.
- The wealth tax saved (about 0.8% a year) therefore takes a decade or more to repay the entry cost, before running costs; this is not a commonly used, robust planning structure for resident families. The exact statutory provisions (dedication tax article, beneficiary rules) were taken from PwC and the existing file, not re-read in the SteG.

## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 12.5% (`0.125`).

Flat 12.5% profit tax on worldwide income; CHF 1,800 annual minimum tax (creditable), waived for small operating companies. Dividends and capital gains on participations generally exempt. Pillar Two 15% top-up for large groups. Private asset structures (PVS) pay only the minimum tax.

Special zones: None.

## Cost of living notes

Vaduz.

- International school: International School Rheintal in Buchs SG (Switzerland, about 5 km from Vaduz), Grades 11-12,
  CHF 35,470 a year for 2026/2027; capital fund fee CHF 5,600 once for the first child.
- Prime rent: CHF 2,500 a month, the median of the ten priced houses of 5.5+ rooms (about 4+ bedrooms) offered to let across
  Liechtenstein on immoboerse.li and nemo.li on 15 October 2026 (duplicates removed; range CHF 1,900-3,450: Schaan 6.5 rooms
  3,450, Mauren 6.5 rooms 3,350, Balzers 7.5-room terraced houses from 2,750, Gamprin-Bendern 2,690, Schellenberg, Nendeln and
  an older 7.5-room Schaan house 2,500 each, Eschen and Ruggell 2,400, Balzers 1,900). Not prime: no priced house was in Vaduz.
  Engel & Völkers' three Vaduz houses were price on request or already let (the let 5.5-room Städtle house at CHF 2,950), and a
  225 m² Schaan house was price on request, so a prime Vaduz family house likely rents above this median.
- Not sourced: price per m², family health insurance, housekeeper.

## Open questions

- Lump-sum taxation on expenditure (Art. 30-34 SteG: 25% of total annual expenditure, replacing wealth and income tax; for non-citizens arriving for the first time or after 10 years away who do not work in Liechtenstein; Liechtenstein real estate stays subject to wealth tax) was not modelled as a special regime because no typical or minimum expenditure base could be verified; the implementing ordinance was not read.
- Residence permit rules (EEA quota/lottery, third-country access) need confirmation from the Migration and Passport Office.
- Vaduz municipal surcharge for 2026 not verified.
- (standard / dividends) Size of Liechtenstein's treaty network and whether foreign withholding can be reduced for residents was not verified (Liechtenstein has a limited network, including Switzerland, Austria, Germany, the UK and Luxembourg, from general knowledge).
- (standard / wealth_tax) The 2026 municipal surcharge for Vaduz was not verified (llv.li blocked); brackets assume the statutory minimum 150%. Scale rates by (1+surcharge)/2.5 for other municipalities.
- (standard / wealth_tax) Brackets assume no income besides the deemed return and joint assessment of a married couple (Art. 19(1)(c) tariff).

US citizens: No US-Liechtenstein income tax treaty (a TIEA and FATCA IGA exist). Liechtenstein's wealth-based tax is not an income tax on specific items, so US foreign tax credits for it are doubtful; US citizens pay full US tax on gains and dividends.

- Prime rent is the CHF 2,500 median of ten ordinary 5.5+-room houses across Liechtenstein (immoboerse.li, nemo.li, 15 October 2026); no priced Vaduz house was listed. A Vaduz/Schaan prime figure from an agency would make it more representative.

## Sources

- [Steuergesetz (SteG), LGBl. 2010.340, consolidated version 01.07.2026](https://www.gesetze.li/konso/2010340000) — Liechtensteinische Landesverwaltung (gesetze.li) (legislation)
- [Liechtenstein - Individual - Income determination](https://taxsummaries.pwc.com/liechtenstein/individual/income-determination) — PwC Worldwide Tax Summaries (professional)
- [Liechtenstein - Individual - Other taxes](https://taxsummaries.pwc.com/liechtenstein/individual/other-taxes) — PwC Worldwide Tax Summaries (professional)
- [Liechtenstein - Individual - Taxes on personal income](https://taxsummaries.pwc.com/liechtenstein/individual/taxes-on-personal-income) — PwC Worldwide Tax Summaries (professional)
- [Liechtenstein - Individual - Residence](https://taxsummaries.pwc.com/liechtenstein/individual/residence) — PwC Worldwide Tax Summaries (professional)
- [Liechtenstein - Corporate - Taxes on corporate income](https://taxsummaries.pwc.com/liechtenstein/corporate/taxes-on-corporate-income) — PwC Worldwide Tax Summaries (professional)
- [International School Rheintal: Financial Regulations 2026/2027 (schedule of fees)](https://www.isr.ch/userfiles/isrmvc/Documents/Fees_Finances/ISR%20Financial%20Regulations%202026_2027_RS.pdf) — International School Rheintal (other)
- immoboerse.li (ITW Ingenieurunternehmung AG): houses to rent in Liechtenstein: https://www.immoboerse.li/immobilien/?search-intention=mieten&search-select-type=haus
- nemo.li: houses to rent in Liechtenstein: https://nemo.li/mieten/art-haus/
- Engel & Völkers: houses for rent in Liechtenstein: https://www.engelvoelkers.com/li/en/properties/res/rent/house

## Change log

- 2026-10-15: initial research.
- 2026-10-15: added international school fee (International School Rheintal, CHF 35,470, 2026/27); prime rent still not sourced.
- 2026-10-15: Holding structures section: no structure modelled (dedication tax prices out the wealth-tax saving). Tried again to source a Vaduz/Schaan prime rent: the main portals blocked automated access; the open question now names what is needed.
- 2026-10-15: added prime rent (CHF 2,500, median of ten 5.5+-room house lets across Liechtenstein on immoboerse.li and nemo.li; no priced Vaduz house, so likely understates prime).
