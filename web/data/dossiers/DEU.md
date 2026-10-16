# Germany — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Germany taxes a resident private investor's capital gains, dividends and interest at a flat 26.375% (25% Abgeltungsteuer plus 5.5% solidarity surcharge; church tax only for church members), with no holding-period exemption for securities bought since 2009. There is no wealth tax (not levied since 1997). Inheritance and gift tax is levied on each heir: each child receives EUR 400,000 tax-free from each parent every 10 years, above which 7%-30% applies (class I). Business-asset relief (85%/100%) does not cover a portfolio of listed shares. The Federal Constitutional Court heard two inheritance-tax cases on 12-13 October 2026; a ruling is pending and could change allowances, rates and business relief.

## Residence and eligibility

Unlimited liability with a domicile (a home kept for use, § 8 AO) or habitual abode (§ 9 AO; a stay of more than six months, short interruptions ignored). Treaty tie-breakers apply for dual residents. There is no special rule for new arrivals and no lump-sum or remittance regime.

- **EU/EEA/Swiss free movement** (EU): Registration at the local residents' office (Anmeldung) within two weeks of moving in; no permit.
- **Residence permit for persons of independent means or self-employment** (US, OTHER): Germany has no golden visa or residence-by-investment programme. Non-EU nationals apply for a national residence permit (e.g. § 7(1) sentence 3 AufenthG for purposes not covered elsewhere, or § 21 AufenthG self-employment), proving sufficient funds and health insurance; US citizens can apply from within Germany. Granted at the discretion of the immigration authority.

Standard regime eligibility: Domicile or habitual abode in Germany (§§ 8, 9 AO; habitual abode presumed after a stay of more than six months). Non-EU citizens need a residence permit.

## Capital gains

Gains on shares, bonds and funds held privately are taxed at a flat 25% plus 5.5% solidarity surcharge = 26.375% (§ 32d EStG), whatever the holding period, for assets acquired since 2009. A EUR 1,000 saver's allowance (EUR 2,000 for a married couple) covers all investment income. Shareholdings of at least 1% in a company (§ 17 EStG) are taxed under the partial-income method: 60% of the gain at the progressive rate, a top effective rate of about 28.5%. Private real estate (other than the owner-occupied home) is taxed at progressive rates up to 47.475% only if sold within 10 years of purchase; after 10 years the gain is tax-free.

JSON values: headline rate 26.375% (`0.26375`); listed securities domestic 26.375% (`0.26375`), foreign 26.375% (`0.26375`); private business sale 28.485% (`0.28485`); local real estate 0% (`0.0`); foreign real estate 0% (`0.0`).

- **How the JSON numbers were derived:** Listed securities: 25% x 1.055 = 26.375% flat (§ 32d EStG plus Solidaritätszuschlag), no church tax. Private business sale (holding >= 1%, § 17 EStG): 60% taxable (§ 3 Nr. 40 EStG) at the top rate of 45% (from EUR 277,826 taxable income in 2026) plus 5.5% surcharge = 47.475% x 0.6 = 28.485%. Real estate: 0 because held longer than the 10-year period (§ 23 EStG); inside 10 years the gain is taxed at up to 47.475%. Foreign real estate is normally exempt in Germany under the treaty with the situs country (with progression) and in any case untaxed after 10 years.
- **Holding periods:** None for securities acquired since 1 January 2009. Real estate: 10 years. Other private assets (e.g. gold, crypto): 1 year.
- **Professional-trader risk:** Private asset management (Vermögensverwaltung) stays in the flat-rate regime even with frequent trading of securities; the courts rarely recharacterise securities trading by individuals as a business (gewerblicher Wertpapierhandel requires bank-like activity). The risk is higher for real estate: selling more than three properties within five years (Drei-Objekt-Grenze) can make all gains trade income taxed at progressive rates plus trade tax.
- **Foreign assets:** Worldwide taxation; foreign securities taxed exactly like domestic ones. Foreign brokers do not withhold, so gains are declared in the annual return (Anlage KAP) at the same rate.
- **Exemptions and thresholds:** Sparer-Pauschbetrag EUR 1,000 per person per year (EUR 2,000 joint), covering dividends, interest and gains together; actual expenses are not deductible. Private sales of other assets (§ 23 EStG) are exempt if the total gain in a year is below EUR 1,000. Owner-occupied home exempt. Real estate exempt after a 10-year holding period. Gains on securities bought before 1 January 2009 remain exempt (grandfathering).
- **Eligibility conditions:** Applies to securities held as private assets by a resident individual. Business assets and shareholdings of at least 1% fall outside the flat rate.
- **Regional differences:** None for income tax. Church tax (8% in Bavaria and Baden-Württemberg, 9% elsewhere, of the income tax) applies only to registered church members and is excluded here.
- **Important exceptions / announced changes:** Losses on the sale of shares can only be offset against gains on shares (§ 20(6) sentence 4 EStG). Exit tax (§ 6 AStG) on leaving Germany: shareholdings of at least 1% (and large fund holdings) are deemed sold if the person was fully taxable in Germany for at least 7 of the last 12 years; tax payable in 7 annual instalments, and it lapses if the person returns within 7 years. Portfolios of listed shares below 1% per company are not caught by § 6 AStG.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **Sources:** [Einkommensteuergesetz § 32a (tariff, VZ 2026)](https://www.gesetze-im-internet.de/estg/__32a.html); [Einkommensteuergesetz § 3 Nr. 40 (partial income method, 40% exempt)](https://www.gesetze-im-internet.de/estg/__3.html); [Außensteuergesetz § 6 (exit tax)](https://www.gesetze-im-internet.de/astg/__6.html); [Germany - Individual - Income determination](https://taxsummaries.pwc.com/germany/individual/income-determination)

## Dividends

Dividends, domestic or foreign, are taxed at a flat 26.375% (25% plus solidarity surcharge). German banks withhold the tax at source; foreign dividends are declared in the return. Foreign withholding tax is credited up to 15% (the treaty rate), not beyond.

JSON values: headline 26.375% (`0.26375`); domestic 26.375% (`0.26375`); foreign gross 26.375% (`0.26375`); foreign tax relief: credit.

- **How the JSON numbers were derived:** 25% Abgeltungsteuer x 1.055 solidarity surcharge = 26.375%, no church tax. Foreign dividends: the same rate, minus a credit for foreign withholding tax of at most 15% of the gross dividend; withholding above the treaty rate must be reclaimed from the source country.
- **Outbound withholding:** German companies withhold 26.375% (25% plus surcharge) on dividends; non-resident corporations can reclaim 2/5 (net 15.825%); treaty rates typically 15% (portfolio) or 5%/0% for parent companies; 0% under the EU Parent-Subsidiary Directive.
- **Treaty network:** About 95 double tax treaties, including the US, UK, Switzerland and all EU states; most reduce source tax on portfolio dividends to 15%.
- **Holding-company notes:** Modelled as the structure regime 'vv_gmbh': share gains in a GmbH bear about 1.65% (95% exempt under § 8b(2)-(3) KStG regardless of stake), but portfolio dividends (stakes below 10%) are fully taxed at about 33% including trade tax, and payouts bear 26.375%. A family foundation (Familienstiftung) is an alternative: it is not subject to trade tax if purely asset-managing, but its endowment is a taxable gift and it pays substitute inheritance tax every 30 years (§ 1(1) Nr. 4 ErbStG); not modelled.
- **Exemptions and thresholds:** Shared EUR 1,000 saver's allowance (EUR 2,000 joint).
- **Eligibility conditions:** Private shareholder. A shareholder with at least 25%, or at least 1% and working for the company, can opt for the partial-income method (60% taxable at progressive rates).
- **Regional differences:** None; church tax only for church members.
- **Important exceptions / announced changes:** Investment funds (including ETFs) have their own regime (InvStG) with partial exemptions and an annual advance lump sum (Vorabpauschale); this file models directly held shares and bonds.
- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **Sources:** [Germany - Individual - Income determination](https://taxsummaries.pwc.com/germany/individual/income-determination); [Einkommensteuergesetz § 3 Nr. 40](https://www.gesetze-im-internet.de/estg/__3.html)

## Inheritance and gifts to children

Inheritance and gift tax (ErbStG) is charged on each recipient. A child receives EUR 400,000 tax-free from each parent; gifts and inheritances from the same parent within 10 years are added together, and the allowance renews every 10 years. Above the allowance, class I rates of 7% to 30% apply to the whole taxable amount, with a hardship rule smoothing the jumps. A child inheriting EUR 50 million of listed securities from one parent pays about EUR 14.9 million (about 30%). The scope is worldwide if the deceased, donor or heir lives in Germany. The family home passes tax-free to a child who lives in it for 10 years (up to 200 m2).

JSON values: basis `beneficiary`, bracket mode `marginal`, children `taxed`, exemption EUR 400,000, marginal brackets above the exemption: 7% (`0.07`) from EUR 0, 50% (`0.5`) from EUR 75,000, 11% (`0.11`) from EUR 82,692, 50% (`0.5`) from EUR 300,000, 15% (`0.15`) from EUR 334,286, 50% (`0.5`) from EUR 600,000, 19% (`0.19`) from EUR 677,419, 50% (`0.5`) from EUR 6,000,000, 23% (`0.23`) from EUR 6,888,889, 50% (`0.5`) from EUR 13,000,000, 27% (`0.27`) from EUR 15,260,870, 50% (`0.5`) from EUR 26,000,000, 30% (`0.3`) from EUR 29,900,000; other transfer costs 0% (`0`); gifts same as inheritance: True; tax-free after years: None.

- **Gifts:** Gifts are taxed exactly like inheritances, with the same EUR 400,000 allowance per parent and child; all transfers between the same two people within 10 years are aggregated (§ 14 ErbStG), so the allowance can be used again every 10 years.
- **Business relief:** §§ 13a-13c ErbStG: 85% (standard) or 100% (option) of qualifying business assets exempt if the business is continued and payroll and holding-period conditions (5 or 7 years) are met; above EUR 26 million per acquisition a needs test or sliding relief applies. Administrative assets (Verwaltungsvermögen) such as securities portfolios are excluded from relief, also when held inside a company. Under constitutional review (1 BvR 804/22). Covers listed portfolios: no.
- **Foreign assets:** Worldwide assets are taxable when the deceased, donor or heir is resident in Germany. Foreign inheritance tax paid on foreign assets can be credited (§ 21 ErbStG); Germany has only six estate tax treaties (incl. US, France, Switzerland, Denmark, Sweden, Greece).
- **Domicile / residence rules:** Liability follows residence (domicile or habitual abode) of either the deceased/donor or the heir. German nationals remain fully liable for 5 years after leaving Germany (§ 2(1) Nr. 1 b ErbStG). Extended limited liability under § 4 AStG can apply for 10 years after emigration to a low-tax country. Because the heir's residence alone triggers tax, children living in Germany pay German tax on gifts or inheritances from parents living abroad.
- **Exemptions and thresholds:** Children: EUR 400,000 per parent per 10 years (§ 16 ErbStG); spouse EUR 500,000 plus a pension allowance of up to EUR 256,000; grandchildren EUR 200,000. Household goods EUR 41,000 per child. Family home to a child: exempt if occupied by the child for 10 years, up to 200 m2 of living space (§ 13 Nr. 4c). How the brackets were built: § 19(1) applies one rate to the whole taxable amount (7% up to 75,000; 11% to 300,000; 15% to 600,000; 19% to 6m; 23% to 13m; 27% to 26m; 30% above), and § 19(3) caps the extra tax just above each threshold at 50% of the excess. That combined tariff is exactly a marginal schedule: 50% bands just above each threshold (75,000-82,692; 300,000-334,286; 600,000-677,419; 6m-6,888,889; 13m-15,260,870; 26m-29,900,000) after which the whole amount is taxed at the new step rate.
- **Eligibility conditions:** Unlimited liability if the deceased/donor or the heir is resident in Germany, or is a German national who left less than 5 years earlier.
- **Regional differences:** None; federal law, administered by the states.
- **Important exceptions / announced changes:** The Federal Constitutional Court heard two cases on 12 October 2026 (1 BvF 1/23, Bavaria: real estate valuation, allowances and rates) and 13 October 2026 (1 BvR 804/22: business-asset relief vs. private assets such as securities). A ruling is expected within months; the Court has in past cases declared the law incompatible and let it apply until a reform deadline. The SPD has proposed replacing business relief with a EUR 5 million business allowance. None of this is in force.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **Sources:** [Erbschaftsteuer- und Schenkungsteuergesetz § 16 (allowances)](https://www.gesetze-im-internet.de/erbstg_1974/__16.html); [Erbschaftsteuer- und Schenkungsteuergesetz § 19 (rates, hardship rule)](https://www.gesetze-im-internet.de/erbstg_1974/__19.html); [Erbschaftsteuer- und Schenkungsteuergesetz § 2 (scope, 5-year rule for Germans)](https://www.gesetze-im-internet.de/erbstg_1974/__2.html); [Erbschaftsteuer vor dem Bundesverfassungsgericht: Was Mandanten jetzt wissen sollten (05.10.2026)](https://www.heuking.de/de/news-events/newsletter-fachbeitraege/artikel/erbschaftsteuer-vor-dem-bundesverfassungsgericht-was-mandanten-jetzt-wissen-sollten.html); [Erbschaftsteuerreform voraus? Erste Reformüberlegungen im Praxischeck](https://www.ebnerstolz.de/de/themen/private-clients/erbschaftsteuerreform-2026-104369.html)
- Surviving spouse and registered partner: tax class I, EUR 500,000 allowance plus pension allowance, then the same 7%-30% rates as children (about 30% on EUR 35 million). JSON spouse_treatment: taxed.

## Wealth tax

Germany has no wealth tax. The Vermögensteuer law remains on the statute books but has not been levied since 1997 after the Federal Constitutional Court ruled its valuation rules unconstitutional (1995).

JSON type: `none`.

- **Property tax (not a wealth tax):** Municipal Grundsteuer under the reformed rules in force since 1 January 2025; each state uses its own model and municipalities set the multiplier. Typically a few hundred to a few thousand euros a year for a family home.
- **Important exceptions / announced changes:** Proposals to revive a wealth tax recur in political debate (SPD, Greens, Left) but none is in the 2025 coalition agreement or in force.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **Sources:** [Germany - Individual - Other taxes](https://taxsummaries.pwc.com/germany/individual/other-taxes)

## Special regimes

None modelled; see the summary and open questions for regimes considered and rejected.

## Holding structures

**Modelled: asset-holding GmbH (`vv_gmbh`, type `structure`).** The family holds the portfolio through a German GmbH.

- **Share gains:** 95% exempt from corporate income tax and trade tax regardless of stake size or holding period (§ 8b(2) KStG); 5% of the gain is added back as non-deductible expenses (§ 8b(3)). Effective 5% x 32.975% = **1.649%** (`0.01649`) on domestic and foreign listed shares and on a private business sold by the GmbH.
- **Combined rate used:** corporate income tax 15% x 1.055 = 15.825%, plus trade tax 3.5% x Munich Hebesatz 490% = 17.15%, total **32.975%** (PwC city comparison: Berlin ~30%, Frankfurt ~32%, Munich ~33%; range 24.6%-36.1% for cities above 80,000). A minimum multiplier of 280% applies from 2027. Corporate income tax falls to 14% in 2028 and 10% from 2032.
- **Portfolio dividends:** stakes below 10% lose the corporate exemption (§ 8b(4) KStG) and stakes below 15% lose the trade-tax reduction (§ 8 Nr. 5, § 9 Nr. 2a/7 GewStG), so dividends bear the full **32.975%** (`domestic_rate`/`foreign_gross_rate` 0.32975, credit). Foreign withholding is creditable against corporate tax only (§ 26 KStG), not trade tax: with 15% withholding about 17.15% German tax remains; the model's credit leaves 17.975% (about 0.8 points too high).
- **Extended trade-tax reduction:** § 9 Nr. 1 Satz 2 GewStG reduces only "den Teil des Gewerbeertrags, der auf die Verwaltung und Nutzung des eigenen Grundbesitzes entfällt". A securities-only GmbH does not qualify, and a GmbH that also owns real estate keeps paying trade tax on its securities income. The lead figure of ~15.8% on portfolio dividends with the extended reduction is therefore wrong for this family.
- **Real estate inside the GmbH:** 15.825% with the extended reduction for the property part (32.975% without); privately held property is tax-free after 10 years, so the GmbH is worse for real estate. Foreign real estate left null.
- **Payout:** 26.375% Abgeltungsteuer (`payout_tax_rate` 0.26375). The partial-income option (60% at 47.475% = 28.485%) is worse at the top rate. Return of paid-in capital (§ 27 KStG account) is tax-free; private use of company assets or non-arm's-length loans are hidden profit distributions.
- **Wealth tax and inheritance:** not given in the structure regime, so they inherit the standard values (no wealth tax; normal ErbStG). GmbH shares holding securities get no business relief: securities are Verwaltungsvermögen (§ 13b(4) Nr. 4 ErbStG) and at 90% administrative assets nothing is relieved (§ 13b(2) Satz 2). Shares are valued at no less than net asset value.
- **Setup:** contributing an existing portfolio is a taxable disposal at 26.375% of built-in gains (no step-up for portfolio shares bought before moving to Germany); best funded with cash. Running and setup costs were not sourced and are omitted (`annual_running_cost` null).
- **Traps:** trade tax by legal form (§ 2(2) GewStG); bond interest taxed at ~33% instead of 26.375%; ETFs fall under the Investment Tax Act, not § 8b; **exit tax** under § 6 AStG on the GmbH shares (all latent gains and retained profits, 28.485%, 7 instalments) if a shareholder emigrates after 7 of 12 years of German residence; liquidation gains taxed under § 17 EStG at 28.485%.
- **Family foundation (not modelled):** a purely asset-managing Familienstiftung pays corporate tax but not trade tax, so portfolio dividends would bear 15.825%, but the endowment is a taxable gift (class by relationship to the founder) and the foundation pays substitute inheritance tax every 30 years as if its assets passed to two children (§ 1(1) Nr. 4 ErbStG, upheld by the Constitutional Court). Distributions are taxed at 26.375%.

Illustrative annual tax for the reference family (EUR 1.2M gains, EUR 0.6M dividends, EUR 400k payout): direct holding about EUR 394k; GmbH about EUR 348k including payout tax (no running costs included).

## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 15.825% (`0.15825`).

Corporate income tax 15% plus 5.5% solidarity surcharge (15.825%) plus municipal trade tax (about 7%-17%, typically ~14%), giving roughly 30% combined. The 2025 investment programme (promulgated 18 July 2025) cuts the corporate rate by one point a year from 2028 to 10% from 2032. Participation exemption: 95% of dividends (holdings >= 10%) and capital gains on shares exempt (§ 8b KStG). Controlled-foreign-company rules apply to passive income taxed below 15%.

Special zones: None.

## Cost of living notes

Munich.

- Prime family rent: EUR 4,250/month cold rent (Kaltmiete), the median of 22 houses with 5+ rooms and 180 m² or more
  listed in the city of Munich on immobilo.de on 15 October 2026 (range EUR 3,100-16,000; Bogenhausen EUR 4,700-9,240).
  City-wide, so it understates the most expensive districts.
- International school: Bavarian International School, Grades 10-12, EUR 24,850 a year for 2026-27 (entrance fee
  EUR 14,790 spread over three years).
- Not sourced: price per m², family health insurance, housekeeper.

## Open questions

- Inheritance-tax rulings of the Federal Constitutional Court (heard 12-13 October 2026) are pending.
- Munich rent is a city-wide listing sample (median EUR 4,250 cold rent); a prime-area agency figure for Bogenhausen/Grünwald would be higher.
- Treaty counts (about 95 income tax treaties; 6 inheritance tax treaties) are from general knowledge and were not re-checked against the BMF treaty list.
- (standard / capital_gains) Church tax is excluded from all rates; members of a church pay roughly 27.8%-27.99% instead of 26.375% on investment income.
- (standard / dividends) The 15% cap on the creditable foreign withholding (§ 32d(5) EStG) is standard practice but the statute text was not opened in this session.
- (standard / inheritance) Pending Federal Constitutional Court rulings (1 BvF 1/23 and 1 BvR 804/22, heard 12-13 October 2026) may change allowances, rates, real estate valuation and business relief; re-check when the judgments are published.
- (standard / inheritance) The family-home exemption details (§ 13 Nr. 4b/4c ErbStG) were not re-read in the statute in this session.

US citizens: The US-Germany income tax treaty and the separate US-Germany estate and gift tax treaty (1980) apply. Germany credits US tax only on US-source income; the US credits German tax on German-taxed income under the saving clause. US-domiciled fund holdings are fine; non-US funds can be PFICs for US purposes.

## Sources

- [Einkommensteuergesetz § 32a (tariff, VZ 2026)](https://www.gesetze-im-internet.de/estg/__32a.html) — Bundesministerium der Justiz (legislation)
- [Einkommensteuergesetz § 3 Nr. 40 (partial income method, 40% exempt)](https://www.gesetze-im-internet.de/estg/__3.html) — Bundesministerium der Justiz (legislation)
- [Außensteuergesetz § 6 (exit tax)](https://www.gesetze-im-internet.de/astg/__6.html) — Bundesministerium der Justiz (legislation)
- [Germany - Individual - Income determination](https://taxsummaries.pwc.com/germany/individual/income-determination) — PwC Worldwide Tax Summaries (professional)
- [Germany - Individual - Other taxes](https://taxsummaries.pwc.com/germany/individual/other-taxes) — PwC Worldwide Tax Summaries (professional)
- [Erbschaftsteuer- und Schenkungsteuergesetz § 16 (allowances)](https://www.gesetze-im-internet.de/erbstg_1974/__16.html) — Bundesministerium der Justiz (legislation)
- [Erbschaftsteuer- und Schenkungsteuergesetz § 19 (rates, hardship rule)](https://www.gesetze-im-internet.de/erbstg_1974/__19.html) — Bundesministerium der Justiz (legislation)
- [Erbschaftsteuer- und Schenkungsteuergesetz § 2 (scope, 5-year rule for Germans)](https://www.gesetze-im-internet.de/erbstg_1974/__2.html) — Bundesministerium der Justiz (legislation)
- [Erbschaftsteuer vor dem Bundesverfassungsgericht: Was Mandanten jetzt wissen sollten (05.10.2026)](https://www.heuking.de/de/news-events/newsletter-fachbeitraege/artikel/erbschaftsteuer-vor-dem-bundesverfassungsgericht-was-mandanten-jetzt-wissen-sollten.html) — Heuking (professional)
- [Erbschaftsteuerreform voraus? Erste Reformüberlegungen im Praxischeck](https://www.ebnerstolz.de/de/themen/private-clients/erbschaftsteuerreform-2026-104369.html) — RSM Ebner Stolz (professional)
- [Germany - Individual - Residence](https://taxsummaries.pwc.com/germany/individual/residence) — PwC Worldwide Tax Summaries (professional)
- [Gesetz für ein steuerliches Investitionssofortprogramm verkündet](https://www.forvismazars.com/de/en/who-we-are/news/press-media/newsletters/newsletter-steuern/newsletter-steuern-3-2025/steuerliches-investitionssofortprogramm) — Forvis Mazars (professional)
- [BIS School tuition & fees](https://www.bis-school.com/admissions/school-fees) — Bavarian International School gAG (other)
- [immobilo: Haus mieten in München (aggregated listing sample)](https://www.immobilo.de/mieten/haus/muenchen) — immobilo.de (other)
- [Körperschaftsteuergesetz § 8b (participation income: gains exempt, 5% add-back, § 8b(4) portfolio dividends)](https://www.gesetze-im-internet.de/kstg_1977/__8b.html) — Bundesministerium der Justiz (legislation)
- [Gewerbesteuergesetz § 9 (reductions: Nr. 1 Satz 2 extended reduction, Nr. 2a/7 15% dividend threshold)](https://www.gesetze-im-internet.de/gewstg/__9.html) — Bundesministerium der Justiz (legislation)
- [Gewerbesteuergesetz § 8 Nr. 5 (add-back of portfolio dividends for trade tax)](https://www.gesetze-im-internet.de/gewstg/__8.html) — Bundesministerium der Justiz (legislation)
- [Germany - Corporate - Income determination](https://taxsummaries.pwc.com/germany/corporate/income-determination) — PwC Worldwide Tax Summaries (professional)
- [Germany - Corporate - Taxes on corporate income](https://taxsummaries.pwc.com/germany/corporate/taxes-on-corporate-income) — PwC Worldwide Tax Summaries (professional)
- [Erbschaftsteuer- und Schenkungsteuergesetz § 13b (business relief; Verwaltungsvermögen, 90% test)](https://www.gesetze-im-internet.de/erbstg_1974/__13b.html) — Bundesministerium der Justiz (legislation)
- [Erbschaftsteuer- und Schenkungsteuergesetz § 1 (Nr. 4: family foundations taxed every 30 years)](https://www.gesetze-im-internet.de/erbstg_1974/__1.html) — Bundesministerium der Justiz (legislation)

## Change log

- 2026-10-15: initial research.
- 2026-10-15: added prime rent (immobilo.de listing sample, EUR 4,250/month cold rent).
- 2026-10-15: added the holding structure regime `vv_gmbh` (asset-holding GmbH: share gains 1.649%, portfolio dividends 32.975% at the Munich multiplier, payout 26.375%); noted that the extended trade-tax reduction does not cover securities income; added § 13b ErbStG detail on GmbH shares; Holding structures section.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
- 2026-10-16: added surviving-spouse treatment.
