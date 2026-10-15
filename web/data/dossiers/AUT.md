# Austria — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Austria taxes a resident's capital gains on securities and dividends at a flat 27.5% (bank interest 25%) regardless of holding period or size of holding, and real estate gains at 30%. There is no wealth tax and no inheritance or gift tax (abolished 2008), so children inherit a securities portfolio tax-free; only real estate passing within the family bears a stepped real estate transfer tax of 0.5%-3.5% plus a 1.1% registration fee, and larger lifetime gifts must be notified to the tax office. Emigration triggers a deemed sale of financial assets, deferred without interest for moves within the EU/EEA.

## Residence and eligibility

Unlimited liability with a home (Wohnsitz) in Austria, or habitual abode after a stay of more than six months. Treaty tie-breakers apply for dual residents.

- **EU/EEA/Swiss free movement** (EU): Registration of residence; registration certificate (Anmeldebescheinigung) after three months, with proof of sufficient funds and health insurance.
- **Settlement permit except gainful employment (Niederlassungsbewilligung - ausgenommen Erwerbstätigkeit)** (US, OTHER): For people of independent means who will not work in Austria: proof of substantial regular income, accommodation and health insurance; subject to an annual quota and German language requirements. Austria has no golden visa; citizenship by investment is discretionary and rare. Details not verified in this session.

Standard regime eligibility: A home (Wohnsitz) in Austria or habitual abode (stay of more than six months). Non-EU citizens need a residence permit.

## Capital gains

Gains on shares, bonds, funds and derivatives are taxed at a flat 27.5% (§ 27a(1) EStG) whatever the holding period and whatever the size of the shareholding, including substantial private-company stakes. Gains on private real estate are taxed at a flat 30% (§ 30a EStG); the main residence is exempt under conditions. There is no annual allowance.

JSON values: headline rate 30% (`0.3`); listed securities domestic 27.5% (`0.275`), foreign 27.5% (`0.275`); private business sale 27.5% (`0.275`); local real estate 30% (`0.3`); foreign real estate 30% (`0.3`).

- **How the JSON numbers were derived:** Securities and private business shares: the 27.5% special rate of § 27a(1) Z 2 EStG applies to all capital gains of private investors, with no surcharges and no holding-period relief. Real estate: 30% flat under § 30a(1) EStG. Foreign real estate: the 30% Austrian rate before treaty relief; most Austrian treaties leave real estate gains to the situs country (Austria then exempts or credits).
- **Holding periods:** None for securities acquired after 2010 (bonds/derivatives after 30 March 2012) or for real estate.
- **Professional-trader risk:** Low risk for securities: capital income of private investors stays under § 27 even with frequent trading. Commercial real estate dealing can turn real estate gains into business income at progressive rates (up to 55%).
- **Foreign assets:** Worldwide taxation at the same rates; foreign accounts declared in the return. Foreign real estate gains depend on the treaty with the situs country.
- **Exemptions and thresholds:** No allowance for capital income. Main residence exempt if lived in for 2 years since acquisition or 5 of the last 10 years. Shares bought before 2011 (bonds/derivatives before 30 March 2012) are grandfathered and tax-free, unless a holding of at least 1%.
- **Eligibility conditions:** Resident individual holding as private assets. Austrian banks withhold the 27.5% as a final tax; foreign accounts are declared in the return at the same rate. Option to be taxed at the regular progressive rate if lower (Regelbesteuerungsoption).
- **Regional differences:** None.
- **Important exceptions / announced changes:** Losses can be offset only within the same year against other capital income (not against bank interest), and cannot be carried forward. Exit tax (§ 27(6) Z 1 EStG): leaving Austria is a deemed sale of all financial assets at market value; for a move to an EU/EEA state the tax is assessed but not collected until actual sale (annual proof required if relevant income exceeds EUR 100,000); a move outside the EU/EEA makes the tax due. Since 1 January 2025 a 30% surcharge applies to gains from land rezoned to building land.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **Sources:** [EStG 1988 § 27a (special tax rates)](https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570&Paragraf=27a); [EStG 1988 § 30a (special rate on real estate gains)](https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570&Paragraf=30a); [EStG 1988 § 27 (capital income, exit taxation Abs. 6)](https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570&Paragraf=27); [Austria - Individual - Income determination](https://taxsummaries.pwc.com/austria/individual/income-determination)

## Dividends

Dividends, domestic or foreign, are taxed at a flat 27.5%, withheld as a final tax by Austrian banks or declared in the return for foreign accounts. Foreign withholding tax is credited up to 15% via the Austrian custodian bank, regardless of the treaty.

JSON values: headline 27.5% (`0.275`); domestic 27.5% (`0.275`); foreign gross 27.5% (`0.275`); foreign tax relief: credit.

- **How the JSON numbers were derived:** 27.5% special rate (§ 27a(1) Z 2 EStG); foreign dividends taxed at 27.5% of the gross amount with a credit for foreign withholding tax of at most 15%.
- **Outbound withholding:** 27.5% KESt on dividends paid to individuals; 23% to corporations; reduced by treaties and to 0% under the EU Parent-Subsidiary Directive.
- **Treaty network:** About 90 income tax treaties including the US and all EU states.
- **Holding-company notes:** Dividends from Austrian and qualifying foreign participations held by an Austrian company are generally exempt; portfolio holdings in a GmbH are taxed at 23% and distributions again at 27.5%. No structure is modelled: from 2026 a Privatstiftung pays 27.5% interim tax on gains and interest (the same as a private investor; § 22(2) KStG), only defers tax on dividends until they are paid out at 27.5%, costs 3.5% entry tax on the endowment, and Austria has no inheritance tax to avoid; a GmbH (23% plus 27.5% on payout) is worse.
- **Exemptions and thresholds:** No allowance.
- **Eligibility conditions:** Private shareholder; option for progressive taxation if lower.
- **Regional differences:** None.
- **Important exceptions / announced changes:** Foreign withholding above 15% must be reclaimed from the source country.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **Sources:** [Austria - Individual - Income determination](https://taxsummaries.pwc.com/austria/individual/income-determination); [EStG 1988 § 27a (special tax rates)](https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570&Paragraf=27a)

## Inheritance and gifts to children

No inheritance or gift tax since 1 August 2008. A securities portfolio passes to children tax-free. Real estate passing within the family bears real estate transfer tax on the property value at stepped rates (0.5% on the first EUR 250,000, 2% on the next EUR 150,000, 3.5% above), plus a 1.1% land-registry fee. Lifetime gifts of cash, securities and company shares above EUR 50,000 a year between relatives must be notified within three months (fine up to 10% of value if deliberately not reported).

JSON values: basis `none`, bracket mode `marginal`, children `fully_exempt`, exemption EUR 0, marginal brackets above the exemption: none; other transfer costs 0% (`0`); gifts same as inheritance: True; tax-free after years: None.

- **Gifts:** No gift tax. Gifts above EUR 50,000 a year between relatives must be notified to the tax office within three months; gifts of real estate bear real estate transfer tax (0.5%/2%/3.5% stepped) plus 1.1% registration fee.
- **Business relief:** Not needed for inheritance tax. Real estate transfer tax on business transfers has a EUR 900,000 allowance (from general knowledge, not verified). Covers listed portfolios: no.
- **Foreign assets:** No tax on foreign assets either; foreign inheritance/gift tax of the situs country may apply.
- **Domicile / residence rules:** Not relevant; there is no inheritance tax. The gift notification duty applies if donor or recipient lives in Austria.
- **Exemptions and thresholds:** Gift notification duty (§ 121a BAO): gifts between relatives up to EUR 50,000 per donor and recipient in one year are exempt from notification; real estate is notified under the real estate transfer tax act instead.
- **Eligibility conditions:** None; applies to all.
- **Regional differences:** None.
- **Important exceptions / announced changes:** Transfers to a private foundation bear 2.5% foundation entry tax (Stiftungseingangssteuer). Inherited real estate: real estate transfer tax (stepped, family rates, aggregated over 5 years) plus 1.1% registration fee on the property value (Grundstückswert). Political proposals to reintroduce inheritance tax are not enacted.
- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **Sources:** [Austria - Individual - Other taxes](https://taxsummaries.pwc.com/austria/individual/other-taxes); [Schenkungsmeldung](https://www.bmf.gv.at/themen/steuern/steuern-von-a-bis-z/schenkungsmeldung.html); [Grunderwerbsteuer Österreich 2026 - der vollständige Überblick](https://brandauer-rechtsanwaelte.at/2026/05/24/grunderwerbsteuer-oesterreich-2026-ueberblick/)

## Wealth tax

Austria has no wealth tax (net wealth tax not levied since 1994).

JSON type: `none`.

- **Property tax (not a wealth tax):** Municipal Grundsteuer based on the old assessed value (Einheitswert), at most 1% of assessed value; usually small.
- **Important exceptions / announced changes:** Reintroducing wealth and inheritance taxes is a recurring SPÖ demand; the 2025 coalition (ÖVP-SPÖ-NEOS) budget measures did not include one.
- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **Sources:** [Austria - Individual - Other taxes](https://taxsummaries.pwc.com/austria/individual/other-taxes)

## Special regimes

None modelled; see the summary and open questions for regimes considered and rejected.

## Holding structures

**No structure modelled.** The Privatstiftung, the usual Austrian family vehicle, no longer gives a material advantage in 2026:

- Interim tax (Zwischensteuer) on interest, realised gains, derivatives, crypto and private real estate gains is **27.5% from calendar year 2026** (23% in 2024-2025; § 22(2) KStG), the same rate a private investor pays. It is credited when the foundation makes distributions that bear 27.5% KESt (§ 13(3), § 24(5) KStG), so gains end up taxed at 27.5% either way.
- Domestic dividends and qualifying foreign portfolio dividends are exempt in the foundation (§ 10, § 13(2) KStG), so dividend tax is only deferred until payout at 27.5%, and foreign withholding is then lost as a credit.
- Entry tax (Stiftungseingangssteuer) is **3.5% of assets endowed from 1 January 2026** (2.5% before; 25% if disclosure rules are breached), i.e. about EUR 1.05 million on EUR 30 million, plus board (three members) and auditor costs.
- Austria has no inheritance or gift tax, so the foundation saves nothing on succession.
- A GmbH pays 23% on portfolio gains (foreign portfolio dividends are generally exempt) and payouts bear another 27.5%: worse than direct holding.

## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 23% (`0.23`).

Corporate income tax 23%. Dividends from domestic and qualifying foreign participations are generally exempt; international participations of at least 10% held for one year are also exempt on gains (unless opted out). Distributions to individuals bear 27.5% withholding.

Special zones: None.

## Cost of living notes

Vienna (districts 13, 18 and 19).

- Prime family rent: EUR 5,950/month, the median of 35 distinct houses with 5+ rooms and 180 m² or more listed on
  willhaben.at on 15 October 2026 in Hietzing, Währing and Döbling (range about EUR 2,980-25,000).
- International school: Vienna International School, Grades 11-12, EUR 29,160 a year for 2026/27; new students also
  pay an admissions fee of EUR 5,760 and a capital fee of EUR 5,040 once.
- Not sourced: price per m², family health insurance, housekeeper.

## Open questions

- Special regime considered and not modelled: the § 103 EStG immigration relief (Zuzugsbegünstigung) is granted only to scientists, researchers, artists and athletes whose move is in the public interest, and its percentage relief applies to foreign income in narrow cases; not realistic for a family office.
- Residence permit details for non-EU nationals (quota, income threshold) were not verified; the migration.gv.at page was unavailable.
- Treaty counts are from general knowledge.
- (standard / capital_gains) Main-residence exemption conditions and the 2025 rezoning surcharge were taken from general knowledge and a Deloitte search summary; the § 30 EStG text was not opened.
- (standard / wealth_tax) The 1994 date of abolition is from general knowledge; the source only says there is no wealth tax.
- (standard / inheritance) The 2.5% foundation entry tax was not checked against the StiftEG text in this session.
- (standard / inheritance) children_treatment is 'fully_exempt' for the portfolio; real estate transfer tax of up to 3.5% plus 1.1% fee applies to inherited Austrian real estate, which the schema cannot express separately.

US citizens: The US-Austria income tax treaty and the 1982 US-Austria estate and gift tax treaty apply. Austria's 27.5% on gains and dividends is generally creditable against US tax on foreign-source income; non-US funds can be PFICs.

## Sources

- [EStG 1988 § 27a (special tax rates)](https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570&Paragraf=27a) — RIS - Bundeskanzleramt (legislation)
- [EStG 1988 § 30a (special rate on real estate gains)](https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570&Paragraf=30a) — RIS - Bundeskanzleramt (legislation)
- [EStG 1988 § 27 (capital income, exit taxation Abs. 6)](https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004570&Paragraf=27) — RIS - Bundeskanzleramt (legislation)
- [Austria - Individual - Income determination](https://taxsummaries.pwc.com/austria/individual/income-determination) — PwC Worldwide Tax Summaries (professional)
- [Austria - Individual - Other taxes](https://taxsummaries.pwc.com/austria/individual/other-taxes) — PwC Worldwide Tax Summaries (professional)
- [Schenkungsmeldung](https://www.bmf.gv.at/themen/steuern/steuern-von-a-bis-z/schenkungsmeldung.html) — Bundesministerium für Finanzen (tax_authority)
- [Grunderwerbsteuer Österreich 2026 - der vollständige Überblick](https://brandauer-rechtsanwaelte.at/2026/05/24/grunderwerbsteuer-oesterreich-2026-ueberblick/) — Brandauer Rechtsanwälte (professional)
- [Austria - Individual - Residence](https://taxsummaries.pwc.com/austria/individual/residence) — PwC Worldwide Tax Summaries (professional)
- [Austria - Corporate - Taxes on corporate income](https://taxsummaries.pwc.com/austria/corporate/taxes-on-corporate-income) — PwC Worldwide Tax Summaries (professional)
- [willhaben: Haus mieten in Wien (listing sample)](https://www.willhaben.at/iad/immobilien/haus-mieten/wien) — willhaben internet service GmbH (other)
- [Vienna International School: 2026/27 Terms and Conditions (fee schedule)](https://www.vis.ac.at/fileadmin/user_upload/VIS/Admissions/26-27_VIS_Terms_and_Conditions.pdf) — Vienna International School (other)
- [Körperschaftsteuergesetz 1988 § 13 (Privatstiftungen, Zwischenbesteuerung)](https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004569&Paragraf=13) — RIS (Bundeskanzleramt) (legislation)
- [Körperschaftsteuergesetz 1988 § 22 (rates; Zwischensteuer 27.5% from 2026)](https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004569&Paragraf=22) — RIS (Bundeskanzleramt) (legislation)
- [Körperschaftsteuergesetz 1988 § 24 (Abs. 5: credit of Zwischensteuer on distributions)](https://www.ris.bka.gv.at/NormDokument.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10004569&Paragraf=24) — RIS (Bundeskanzleramt) (legislation)
- [Die Besteuerung von Privatstiftungen](https://www.wko.at/steuern/besteuerung-privatstiftungen) — Wirtschaftskammer Österreich (professional)

## Change log

- 2026-10-15: initial research.
- 2026-10-15: added prime rent (willhaben sample, EUR 5,950/month) and Vienna International School fee (EUR 29,160, 2026/27).
- 2026-10-15: Holding structures section: no structure modelled; recorded the 2026 rise of the Privatstiftung interim tax to 27.5% and entry tax to 3.5%.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
