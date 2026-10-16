# Turkey — family-office tax dossier

Last reviewed: 2026-10-16
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Turkey taxes residents on worldwide income at progressive rates up to 40%. Borsa Istanbul shares: 0% withholding. Foreign shares, bonds and private company stakes: up to 40% on the gain (PPI-indexed); real estate held over five years and Turkish joint-stock shares held over two years are outside the charge. Half of Turkish dividends is exempt (about 20% effective); foreign dividends up to 40%. Inheritance tax 1–10% by band after a TRY 2.9m exemption per child (2026), but it reaches only Turkish-situs assets unless a Turkish citizen is involved. Gifts from parents 5–15%. No net wealth tax; a 'valuable housing tax' applies to homes over TRY 17.7m. Since 2026 (Law 7582) a new resident with no Turkish residence or tax liability in the prior three years gets a 20-year exemption on all foreign income and gains (no remittance condition) and a flat 1% inheritance rate.

## Residence and eligibility

Full taxpayer if legal residence (domicile) in Turkey or intention to settle; foreigners staying more than six months in a calendar year are resident, except for temporary projects or force majeure.

- **Residence permit / citizenship by investment** (EU, US, OTHER): Turkey is not in the EU; foreigners need a residence permit. Residence permits and citizenship by real-estate investment exist; amounts and conditions not verified in this pass.

Standard regime eligibility: Legal residence (domicile) in Turkey, or foreigners staying more than six months in a calendar year. Foreigners need a residence permit.

## Capital gains

Gains on Borsa Istanbul shares bought after 1 Jan 2006 and sold through a Turkish bank or broker fall under Temporary Article 67 withholding at 0% (final). Other gains are 'değer artışı kazancı' under GVK Mük. Art. 80 and are declared at the progressive rates (top 40%): this covers foreign shares and bonds, shares in limited companies (ortaklık payları), and shares of Turkish joint-stock companies held two years or less. Shares of Turkish joint-stock companies (tam mükellef kurumlar) held more than two years are outside the charge (Mük. 80/1). Real estate is taxed only if sold within five years of acquisition (Mük. 80/6). The cost is indexed by the producer price index when the increase is at least 10% (Mük. 81).

JSON values: headline rate 40% (`0.4`); listed securities domestic 0% (`0.0`), foreign 40% (`0.4`); private business sale 40% (`0.4`); local real estate 0% (`0.0`); foreign real estate 0% (`0.0`).

- **How the JSON numbers were derived:** Domestic listed shares 0% (Temporary Art. 67 rate for Borsa Istanbul equities). Foreign listed securities 40%: Mük. 80/1 taxes gains on securities other than shares of Turkish resident companies held over two years, at the top progressive rate of 40% (Art. 103), before PPI indexation. Private business sale 40%: assumes a foreign company or a Turkish limited company (Mük. 80/4); a Turkish A.Ş. stake held over two years would be 0%. Real estate (Turkish or foreign) 0% when held more than five years (Mük. 80/6), otherwise up to 40%.
- **Holding periods:** Turkish A.Ş. shares: exempt after two years. Real estate: exempt after five years. No holding period for foreign securities.
- **Foreign assets:** Full taxpayers are taxed on worldwide income (GVK Art. 4), except under the Law 7582 new-resident exemption (Mük. 20/D).
- **Exemptions and thresholds:** Annual exemption of TRY 150,000 (2026) for capital gains other than on securities (Mük. 80, amount set by GVK General Communiqué 332); it does not apply to securities gains. Real estate held more than five years and Turkish A.Ş. shares held more than two years are outside the charge.
- **Important exceptions / announced changes:** Gains on securities traded abroad are not covered by the Temporary Article 67 withholding regime in this reading and are self-declared; whether foreign shares held through a Turkish bank fall under Art. 67 was not confirmed.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Gelir Vergisi Kanunu (Law 193), consolidated text incl. Mük. 20/D, Mük. 80, Mük. 81, Geçici 67](https://www.mevzuat.gov.tr/mevzuatmetin/1.4.193.pdf); [Turkey – Individual – Income determination](https://taxsummaries.pwc.com/turkey/individual/income-determination); [Turkey – Individual – Taxes on personal income](https://taxsummaries.pwc.com/turkey/individual/taxes-on-personal-income)

## Dividends

Half of gross dividends from Turkish companies is exempt; the rest is declared at progressive rates if over the TRY 400,000 (2026) threshold, with the 15% WHT (raised from 10% by Presidential Decision 9286, Dec 2024) creditable. Foreign dividends above TRY 22,000 (2026) must be declared and are taxed at progressive rates with a credit for foreign tax; the 50% exemption applies only to holdings of at least 50% remitted to Turkey.

JSON values: headline 40% (`0.4`); domestic 20% (`0.2`); foreign gross 40% (`0.4`); foreign tax relief: credit.

- **How the JSON numbers were derived:** Domestic: 50% exempt x 40% top rate = 20% (the 15% WHT is credited). Foreign portfolio dividends: fully taxable at 40% top rate.
- **Outbound withholding:** 15% WHT on dividends to individuals and non-resident companies (from 22 Dec 2024), reducible by treaty.
- **Treaty network:** About 92 treaty partners (PwC), including the United States and all major EU states.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Turkey – Individual – Income determination](https://taxsummaries.pwc.com/turkey/individual/income-determination); [Turkey – Individual – Significant developments](https://taxsummaries.pwc.com/turkey/individual/significant-developments); [Turkey – Individual – Taxes on personal income](https://taxsummaries.pwc.com/turkey/individual/taxes-on-personal-income)

## Inheritance and gifts to children

Inheritance and gift tax (Law 7338) is levied on the recipient. For 2026 each child (and the spouse) has an exemption of TRY 2,907,136 on an inheritance share (Art. 4(b), Communiqué 57). Inheritances are then taxed by band: 1% on the first TRY 3m, 3% on the next 7m, 5% on the next 15m, 7% on the next 30m, and 10% above TRY 55m (Art. 16). Gifts are taxed at 10–30% on the same bands, but gifts from parents to children pay half those rates (5–15%) after a TRY 66,935 exemption. Scope (Art. 1): property located in Turkey, and property anywhere belonging to or acquired by Turkish citizens. A non-Turkish family inheriting assets held abroad is therefore outside the tax; only Turkish-situs assets are taxed.

JSON values: basis `beneficiary`, bracket mode `marginal`, children `taxed`, exemption TRY 2,907,136, marginal brackets above the exemption: 1% (`0.01`) from TRY 0, 3% (`0.03`) from TRY 3,000,000, 5% (`0.05`) from TRY 10,000,000, 7% (`0.07`) from TRY 25,000,000, 10% (`0.1`) from TRY 55,000,000; other transfer costs 0% (`0`); gifts same as inheritance: False; tax-free after years: None.

- **Gifts:** Gifts (ivazsız intikal) are taxed at 10/15/20/25/30% on the same bands after a TRY 66,935 exemption (2026). Gifts from parents, a spouse or children are taxed at half those rates, i.e. 5–15% (Art. 16(2)), still well above the inheritance scale.
- **Business relief:** No business relief relevant (children exempt or not researched). Covers listed portfolios: no.
- **Foreign assets:** Art. 1: property of Turkish citizens (wherever located) and property located in Turkey. Foreign assets of non-Turkish citizens passing to non-Turkish heirs are outside the tax.
- **Domicile / residence rules:** Citizenship and situs based; residence alone does not bring foreign assets into scope.
- **Exemptions and thresholds:** 2026: TRY 2,907,136 per child/spouse share (TRY 5,817,845 for a spouse with no descendants); TRY 66,935 for gifts. Household goods and personal effects exempt. Foreign inheritance tax paid on the same assets is deductible.
- **Eligibility conditions:** Scope depends on citizenship and situs, not residence: Turkish-situs assets are always in scope; foreign-situs assets only when the deceased/donor or heir is a Turkish citizen. Art. 1(3): a foreign heir not domiciled in Turkey who acquires a Turkish citizen's foreign assets is not taxed.
- **Important exceptions / announced changes:** Band limits and exemptions are revalued every year by the VUK revaluation rate (25.49% for 2026): the statute itself requires it (Law 7338 art. 4 last paragraph for the exemptions, art. 16 for the bands), so `thresholds_indexed` is true in the structured data. Tax can be paid in six instalments over three years (May and November). Under Law 7582, inheritances from a person holding the Mük. 20/D exemption are taxed at a flat 1% during the 20-year period (see special regime).
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **Sources:** [Veraset ve İntikal Vergisi Kanunu (Law 7338), consolidated text with 2026 amounts](https://www.mevzuat.gov.tr/mevzuatmetin/1.3.7338.pdf); [Veraset ve İntikal Vergisi Kanunu Genel Tebliği (Seri No: 57), Resmî Gazete 33124 (5. Mük.), 31 Dec 2025](https://www.resmigazete.gov.tr/eskiler/2025/12/20251231M5-22.pdf); [2026 yılında uygulanacak veraset ve intikal vergisi maktu istisna tutarları ile matrah dilim tutarları yayımlandı](https://kpmgvergi.com/yayinlar/mali-bultenler/vergi/2026-yilinda-uygulanacak-veraset-ve-intikal-vergisi-maktu-istisna-tutarlari-ile-matrah-dilim-tutarlari-yayimlandi/3355)

**Surviving spouse:** The spouse has the same exemption as each child, TRY 2,907,136 (TRY 5,817,845 if the deceased left no descendants), and the same 1%-10% scale (Law 7338 arts. 4(b) and 16).

## Wealth tax

No national net wealth tax. Ordinary property tax (0.1% residential, doubled in metropolitan areas) and a 'valuable housing tax' (0.3%–1.0% on the value above TRY 17,711,000 for 2026) apply to Turkish homes.

JSON type: `none`.

- **Property tax (not a wealth tax):** Property tax 0.1% (residential), 0.2% (other buildings), 0.3% (land), doubled in metropolitan areas. Valuable housing tax: residences valued above TRY 17,711,000 (2026), 0.3%–1.0% on the excess by band.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Turkey – Individual – Other taxes](https://taxsummaries.pwc.com/turkey/individual/other-taxes)

## Special regimes

### New-resident foreign-income exemption (Law No. 7582) (`law_7582_new_resident`)

GVK Mük. Art. 20/D (added by Law 7582, in force for individuals becoming resident from 1 Jan 2026): an individual with no Turkish residence and no Turkish tax liability in the three calendar years before becoming resident is exempt from income tax on all foreign-source income and gains for 20 years. Exempt income is not declared and no remittance condition applies. Inheritances from such a person during the 20 years are taxed at a flat 1% (VİVK Art. 16, para. added by Law 7582).

- **Eligible citizenships:** EU, US, OTHER
- **Eligibility:** Became resident in Turkey (domicile or more than six months' stay) on or after 1 Jan 2026; no Turkish domicile and no full or limited Turkish tax liability in the three preceding calendar years (prior liability only for Turkish rental, investment or capital-gains income does not disqualify; wages, business or professional income does). Citizenship is irrelevant. An exemption certificate (İstisna Belgesi) must be obtained from the tax office by the end of the year of becoming resident (end of February of the next year if resident in the last two months). Individuals only; companies cannot use it.
- **Duration:** 20 years
- **Sources:** [Law No. 7582 (accepted 21 May 2026), Resmî Gazete 33270, 4 June 2026](https://www.resmigazete.gov.tr/eskiler/2026/06/20260604-1.htm); [Gelir Vergisi Kanunu (Law 193), consolidated text incl. Mük. 20/D, Mük. 80, Mük. 81, Geçici 67](https://www.mevzuat.gov.tr/mevzuatmetin/1.4.193.pdf); [Sirküler 38: Gelir Vergisi Genel Tebliğleri Seri No 333, 334, 335 (GVK mük. 20/D)](https://tr.andersen.com/tr/images/pdf/and_38-gvkgt-333-334-335.pdf); [Türkiye'ye yerleşenlere 20 yıllık vergi istisnası](https://www.ey.com/tr_tr/insights/tax/turkiyeye-yerlesenlere-20-yillik-vergi-istisnasi); [Turkey – Individual – Significant developments](https://taxsummaries.pwc.com/turkey/individual/significant-developments)

#### Capital gains under this regime

All foreign-source gains (foreign securities, foreign company stakes, foreign real estate) are exempt for 20 years and not declared. Turkish-source gains follow the standard rules. No remittance condition: the exemption applies whether or not proceeds are brought into Turkey.

JSON values: headline rate 40% (`0.4`); listed securities domestic 0% (`0.0`), foreign 0% (`0.0`); private business sale 0% (`0.0`); local real estate 0% (`0.0`); foreign real estate 0% (`0.0`).

- **How the JSON numbers were derived:** Foreign-source gains exempt under GVK Mük. 20/D. Domestic listed shares 0% (Temporary Art. 67). Private business sale 0% assumes a foreign company (Turkish company stakes follow the standard rules). Local real estate 0% when held over five years, as in the standard regime.
- **Eligibility conditions:** Requires the İstisna Belgesi; foreign taxes on exempt income cannot be credited and related expenses are not deductible. No remittance basis: foreign income is exempt whether or not it is remitted to Turkey.
- **Tax year / confidence / verification:** 2026 / medium / verified (checked 2026-10-15)
- **Sources:** [Law No. 7582 (accepted 21 May 2026), Resmî Gazete 33270, 4 June 2026](https://www.resmigazete.gov.tr/eskiler/2026/06/20260604-1.htm); [Gelir Vergisi Kanunu (Law 193), consolidated text incl. Mük. 20/D, Mük. 80, Mük. 81, Geçici 67](https://www.mevzuat.gov.tr/mevzuatmetin/1.4.193.pdf); [Sirküler 38: Gelir Vergisi Genel Tebliğleri Seri No 333, 334, 335 (GVK mük. 20/D)](https://tr.andersen.com/tr/images/pdf/and_38-gvkgt-333-334-335.pdf); [Türkiye'ye yerleşenlere 20 yıllık vergi istisnası](https://www.ey.com/tr_tr/insights/tax/turkiyeye-yerlesenlere-20-yillik-vergi-istisnasi)

#### Dividends under this regime

Foreign dividends and interest are exempt for 20 years and not declared (GVK Mük. 20/D). Turkish dividends as in the standard regime. No remittance condition.

JSON values: headline 40% (`0.4`); domestic 20% (`0.2`); foreign gross 0% (`0.0`); foreign tax relief: exemption.

- **How the JSON numbers were derived:** Foreign-source income exempt under Mük. 20/D; domestic as standard (50% exemption x 40% = 20% effective).
- **Eligibility conditions:** Requires the İstisna Belgesi. No remittance basis: foreign dividends are exempt whether or not remitted. Foreign withholding tax is a final cost (no credit).
- **Tax year / confidence / verification:** 2026 / medium / verified (checked 2026-10-15)
- **Sources:** [Law No. 7582 (accepted 21 May 2026), Resmî Gazete 33270, 4 June 2026](https://www.resmigazete.gov.tr/eskiler/2026/06/20260604-1.htm); [Gelir Vergisi Kanunu (Law 193), consolidated text incl. Mük. 20/D, Mük. 80, Mük. 81, Geçici 67](https://www.mevzuat.gov.tr/mevzuatmetin/1.4.193.pdf); [Sirküler 38: Gelir Vergisi Genel Tebliğleri Seri No 333, 334, 335 (GVK mük. 20/D)](https://tr.andersen.com/tr/images/pdf/and_38-gvkgt-333-334-335.pdf); [Türkiye'ye yerleşenlere 20 yıllık vergi istisnası](https://www.ey.com/tr_tr/insights/tax/turkiyeye-yerlesenlere-20-yillik-vergi-istisnasi)

#### Inheritance and gifts under this regime

VİVK Art. 16 (paragraph added by Law 7582, Art. 2): for a person who holds the Mük. 20/D exemption, inheritance transfers that occur within the 20-year exemption period are taxed at a flat 1% instead of the 1–10% scale. The per-child exemption of TRY 2,907,136 (Art. 4) still applies. Gifts are not covered and stay on the normal gift scale (5–15% from parents). The flat rate matters mainly for Turkish-situs assets and Turkish citizens, since foreign assets of non-Turkish citizens are outside the tax anyway.

JSON values: basis `beneficiary`, bracket mode `marginal`, children `taxed_low`, exemption TRY 2,907,136, marginal brackets above the exemption: 1% (`0.01`) from TRY 0; other transfer costs 0% (`0`); gifts same as inheritance: False; tax-free after years: None.

- **Gifts:** Not covered by the 1% rate: lifetime gifts from parents to children are taxed at 5–15% (half the 10–30% gift scale) after a TRY 66,935 exemption.
- **Business relief:** No business relief relevant (children exempt or not researched). Covers listed portfolios: no.
- **Foreign assets:** Same citizenship/situs scope as the standard regime (Art. 1).
- **Exemptions and thresholds:** Per-child exemption TRY 2,907,136 (2026).
- **Eligibility conditions:** The deceased must have held the Mük. 20/D exemption and died within its 20-year period. Applies to transfers by inheritance (veraset) only.
- **Tax year / confidence / verification:** 2026 / medium / verified (checked 2026-10-15)
- **Sources:** [Law No. 7582 (accepted 21 May 2026), Resmî Gazete 33270, 4 June 2026](https://www.resmigazete.gov.tr/eskiler/2026/06/20260604-1.htm); [Veraset ve İntikal Vergisi Kanunu (Law 7338), consolidated text with 2026 amounts](https://www.mevzuat.gov.tr/mevzuatmetin/1.3.7338.pdf); [Türkiye'ye yerleşenlere 20 yıllık vergi istisnası](https://www.ey.com/tr_tr/insights/tax/turkiyeye-yerlesenlere-20-yillik-vergi-istisnasi)

Metrics not listed inherit the standard regime.


## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 25% (`0.25`).

CIT 25% (30% financial sector), domestic minimum corporate tax 10% from 2025; 5-point reduction on export income; 15% dividend WHT.

## Cost of living notes

City: Istanbul (Sarıyer / Zekeriyaköy).

- **Prime rent (monthly):** TRY 165,000 (2026). Median asking rent of the 16 villas for rent in Sarıyer district listed on Emlakjet on 2026-10-15 (range TRY 125,000–965,000; furnished 5+1/5+2 villas in gated compounds with pools asked TRY 300,000–440,000). Sarıyer includes Zekeriyaköy, the villa area near the main international schools. Listing portal sample, asking prices, room counts not filtered. Source: [İstanbul Sarıyer kiralık villa ilanları](https://www.emlakjet.com/kiralik-villa/istanbul-sariyer/)
- **International school (annual, per child):** USD 47,400 (2026). Istanbul International Community School (IB, non-profit), individual (self-paying) fees 2026–27: Grades 9–10 USD 47,400 a year (Grades 11–12 USD 48,900), VAT included, both campuses. New students also pay a USD 8,000 one-time capital levy and USD 1,500 application/registration fees. Source: [IICS School Fees (Individual Fees 2026–2027, Hisar and Marmara campuses)](https://www.iics.k12.tr/school-fees/)

Rent is in TRY at 2026-10 prices; Turkish inflation erodes TRY figures quickly. School fees are set in USD.

## Open questions

- Gains on foreign shares held through a Turkish broker: Art. 67 withholding vs declaration not confirmed.
- Prime price per m², health insurance and housekeeper costs not sourced.
- (standard / capital_gains) Whether gains on foreign listed shares held through a Turkish intermediary fall under the Temporary Art. 67 withholding (15%/0%) rather than annual declaration was not confirmed; the JSON uses the declaration route at 40%.
- (standard / capital_gains) Producer-price indexation (Mük. 81) lowers the effective rate on long-held assets in a high-inflation economy; the JSON shows the statutory top rate.
- (standard / wealth_tax) The valuable housing tax is arguably a limited wealth levy on high-value homes; it is recorded as property tax here because its 2026 band limits were not verified.
- (standard / inheritance) The band limits come from the consolidated law text and KPMG; the official communiqué publishes the tariff as an image that could not be machine-read. The exemption amounts were read from the communiqué.
- (standard / inheritance) For non-Turkish citizens the brackets apply only to Turkish-situs assets; the scoring cannot express situs scope and may overstate the tax on a foreign portfolio.
- (law_7582_new_resident / capital_gains) How the tax office sources gains on foreign securities bought through a Turkish broker (foreign- or Turkish-source) is not addressed in the communiqué summaries read.
- (law_7582_new_resident / inheritance) Whether the Art. 4 exemption applies before the flat 1% is assumed (the new paragraph sets only the rate).

US citizens: US–Turkey income tax treaty in force (saving clause). Under the Law 7582 exemption Turkish tax on foreign income is zero, so US tax applies in full.

## Sources
- Law 7338 consolidated text (with Law 7582 art. 2), Mevzuat Bilgi Sistemi: https://www.mevzuat.gov.tr/mevzuatmetin/1.3.7338.pdf

- [Gelir Vergisi Kanunu (Law 193), consolidated text incl. Mük. 20/D, Mük. 80, Mük. 81, Geçici 67](https://www.mevzuat.gov.tr/mevzuatmetin/1.4.193.pdf) — Mevzuat Bilgi Sistemi (Presidency of Türkiye) (legislation)
- [Turkey – Individual – Income determination](https://taxsummaries.pwc.com/turkey/individual/income-determination) — PwC Worldwide Tax Summaries (professional)
- [Turkey – Individual – Taxes on personal income](https://taxsummaries.pwc.com/turkey/individual/taxes-on-personal-income) — PwC Worldwide Tax Summaries (professional)
- [Turkey – Individual – Significant developments](https://taxsummaries.pwc.com/turkey/individual/significant-developments) — PwC Worldwide Tax Summaries (professional)
- [Turkey – Individual – Other taxes](https://taxsummaries.pwc.com/turkey/individual/other-taxes) — PwC Worldwide Tax Summaries (professional)
- [Veraset ve İntikal Vergisi Kanunu (Law 7338), consolidated text with 2026 amounts](https://www.mevzuat.gov.tr/mevzuatmetin/1.3.7338.pdf) — Mevzuat Bilgi Sistemi (Presidency of Türkiye) (legislation)
- [Veraset ve İntikal Vergisi Kanunu Genel Tebliği (Seri No: 57), Resmî Gazete 33124 (5. Mük.), 31 Dec 2025](https://www.resmigazete.gov.tr/eskiler/2025/12/20251231M5-22.pdf) — Resmî Gazete / Gelir İdaresi Başkanlığı (tax_authority)
- [2026 yılında uygulanacak veraset ve intikal vergisi maktu istisna tutarları ile matrah dilim tutarları yayımlandı](https://kpmgvergi.com/yayinlar/mali-bultenler/vergi/2026-yilinda-uygulanacak-veraset-ve-intikal-vergisi-maktu-istisna-tutarlari-ile-matrah-dilim-tutarlari-yayimlandi/3355) — KPMG Türkiye (professional)
- [Law No. 7582 (accepted 21 May 2026), Resmî Gazete 33270, 4 June 2026](https://www.resmigazete.gov.tr/eskiler/2026/06/20260604-1.htm) — Resmî Gazete (legislation)
- [Sirküler 38: Gelir Vergisi Genel Tebliğleri Seri No 333, 334, 335 (GVK mük. 20/D)](https://tr.andersen.com/tr/images/pdf/and_38-gvkgt-333-334-335.pdf) — Andersen Türkiye (professional)
- [Türkiye'ye yerleşenlere 20 yıllık vergi istisnası](https://www.ey.com/tr_tr/insights/tax/turkiyeye-yerlesenlere-20-yillik-vergi-istisnasi) — EY Türkiye (professional)
- [Turkey – Individual – Residence](https://taxsummaries.pwc.com/turkey/individual/residence) — PwC Worldwide Tax Summaries (professional)
- [Turkey – Corporate – Taxes on corporate income](https://taxsummaries.pwc.com/turkey/corporate/taxes-on-corporate-income) — PwC Worldwide Tax Summaries (professional)
- [Turkey – Corporate – Withholding taxes](https://taxsummaries.pwc.com/turkey/corporate/withholding-taxes) — PwC Worldwide Tax Summaries (professional)
- [İstanbul Sarıyer kiralık villa ilanları](https://www.emlakjet.com/kiralik-villa/istanbul-sariyer/) — Emlakjet (other)
- [IICS School Fees (Individual Fees 2026–2027, Hisar and Marmara campuses)](https://www.iics.k12.tr/school-fees/) — Istanbul International Community School (other)

## Change log

- 2026-10-15: initial research.
- 2026-10-15: phase 2 data-quality pass. Inheritance: replaced the flagged single 10% whole-amount rate with the 2026 Law 7338 bands (1/3/5/7/10% at TRY 3m/10m/25m/55m) and the TRY 2,907,136 per-child exemption (Communiqué 57); documented the citizenship/situs scope (Art. 1) and half-rate parent-to-child gifts. Capital gains: foreign securities and private company stakes 40% (GVK Mük. 80), real estate 0% after five years, Turkish A.Ş. shares 0% after two years. Law 7582 regime: eligibility, certificate, no remittance condition, flat 1% inheritance rate (VİVK Art. 16 as amended) verified from the Resmî Gazete text. Added Istanbul rent and IICS school fee.
- 2026-10-15: inheritance scope set to local assets only for standard, law_7582_new_resident in the structured data (Law 7338 Art. 1: foreign assets of non-Turkish citizens passing to non-Turkish heirs are outside the tax (all citizenship profiles in this tool are non-Turkish)); previously the scoring applied the rates to the worldwide estate, which overstated the tax.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept (TRY 165,000).
- 2026-10-16: added surviving-spouse treatment.
- 2026-10-16: set inheritance `thresholds_indexed` true for `standard` and `law_7582_new_resident` (Law 7338 art. 4 last paragraph and art. 16 require annual revaluation); re-read the consolidated Law 7338 text (Mevzuat Bilgi Sistemi, incl. the 1% paragraph added by Law 7582 art. 2) and confirmed art. 1 scope, art. 4(b) TRY 2,907,136 and the art. 16 bands; no figures changed. Holding A.S. considered and not added as a structure (see recipe).
