# United States — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Federal level only (states are covered separately). US residents and citizens are taxed on worldwide income. Long-term capital gains and qualified dividends are taxed at up to 20% plus the 3.8% net investment income tax, so 23.8% at the top; short-term gains and non-qualified dividends reach 40.8%. There is no federal wealth tax. Federal estate and gift tax is 40% above a unified basic exclusion of USD 15 million per person for 2026 (set permanently by the 2025 One Big Beautiful Bill Act and indexed from 2027; portable between US-citizen spouses), and assets get a stepped-up cost basis at death. Citizenship-based taxation, PFIC rules for non-US funds and a mark-to-market exit tax for covered expatriates are structural costs.

US citizens: This file is the US federal layer itself. US citizens are taxed on worldwide income and estates wherever they live; the app adds this layer to other countries. Renouncing citizenship triggers the IRC 877A exit tax for covered expatriates (deemed sale, USD 910,000 exclusion for 2026).

## Residence and eligibility

Income tax: citizens always; non-citizens with a green card (lawful permanent residents) or meeting the substantial presence test (at least 31 days in the year and 183 days counting all current-year days, 1/3 of prior-year days and 1/6 of the second prior year), subject to the closer-connection exception. Estate tax: domicile. Leaving after holding a green card in 8 of the last 15 years (long-term resident) or renouncing citizenship triggers the IRC 877A exit tax for covered expatriates (net worth USD 2 million or more, average net income tax above USD 211,000 for 2026, or failure to certify compliance).

- **EB-5 immigrant investor (green card)** (EU, OTHER): Investment in a qualifying US commercial enterprise creating 10 jobs; the statutory amounts (USD 1,050,000, or USD 800,000 in a targeted employment area) were not verified in this session. Gives permanent residence for the family and full US tax residence.
- **E-2 treaty investor / L-1 / O-1 visas** (EU, OTHER): Non-immigrant routes; E-2 is available only to nationals of treaty countries. Not verified in detail.
- **Citizens** (US): No permit needed.

## Capital gains

### Standard regime

Long-term gains (assets held more than 12 months) are taxed at 0%, 15% or 20%, plus 3.8% NIIT for high incomes: 23.8% at the top. For 2026 the 20% rate applies to taxable income above USD 613,700 (married filing jointly) or USD 545,500 (single). Short-term gains are ordinary income, top rate 37% (above USD 768,700 MFJ in 2026) plus 3.8% NIIT = 40.8%.

- **Exemptions and thresholds:** 0% LTCG rate up to USD 98,900 taxable income (MFJ, 2026). NIIT applies to net investment income above modified AGI of USD 250,000 (MFJ) / 200,000 (single), not indexed. Qualified small business stock (IRC 1202): stock acquired after 4 July 2025 excluded 50/75/100% after 3/4/5 years, cap USD 15 million.
- **Important exceptions, statute references and announced changes:** IRC 1(h): collectibles 28% and unrecaptured section 1250 gain 25% (plus NIIT). Capital losses offset gains plus USD 3,000 a year of ordinary income, with indefinite carry-forward. Non-US mutual funds/ETFs (UCITS) are PFICs, taxed at ordinary rates plus an interest charge unless QEF/mark-to-market elections apply. Gains on property held at death are wiped out by the step-up in basis (IRC 1014).
- **Regional differences:** Most states tax capital gains as ordinary income, from 0% (e.g. Florida, Texas, Nevada) to over 10% in California and New York (plus New York City tax); Washington levies a separate tax on large long-term gains. Figures here are indicative from general knowledge, not verified in this session; the subnational file is authoritative. Puerto Rico (Act 60) is a separate territorial regime.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **JSON numbers:** headline 20% (0.2); listed domestic 23.8% (0.238); listed foreign 23.8% (0.238); private business sale 23.8% (0.238); local real estate 23.8% (0.238); foreign real estate 23.8% (0.238).
- **How derived:** Top federal long-term rate 20% (IRC 1(h)) plus 3.8% NIIT (IRC 1411) = 23.8%, holding over 12 months, federal only. Foreign shares: same rate; foreign tax on the gain (rare) is creditable. Private business: 23.8% unless the QSBS exclusion applies (could be 0%). Real estate: 23.8%, but the part of the gain equal to prior depreciation is taxed at 25% + 3.8%. Individual shares/US ETFs assumed; non-US funds are PFICs and are worse.
- **Holding period:** More than 12 months for long-term rates.
- **Trader recharacterisation:** Trader status (IRC 475(f) mark-to-market election) converts gains to ordinary income; investors are not recharacterised merely by volume. Short holding periods (12 months or less) mean ordinary rates up to 37% + 3.8%.
- **Foreign assets:** Worldwide gains taxed; foreign tax credit (IRC 901) for foreign tax paid. Exit tax for covered expatriates: deemed sale of all assets the day before expatriation, first USD 910,000 of gain excluded (2026).

## Dividends

### Standard regime

Qualified dividends (from US companies and from foreign companies in treaty countries or listed in the US, holding period met) are taxed at the long-term capital gains rates: up to 20% plus 3.8% NIIT = 23.8%. Non-qualified dividends (e.g. from non-treaty-country companies, PFICs) are ordinary income at up to 37% + 3.8% = 40.8%. Foreign withholding tax is credited.

- **Exemptions and thresholds:** Same 0%/15%/20% bands as capital gains (2026 MFJ: 0% to USD 98,900, 20% above USD 613,700). NIIT above USD 250,000 MAGI (MFJ).
- **Important exceptions, statute references and announced changes:** A foreign corporation's dividend is qualified only if the company is eligible for a comprehensive US treaty or the shares are readily tradable on a US exchange, and it is not a PFIC. Holding period: more than 60 days in the 121-day window around the ex-date.
- **Regional differences:** States tax dividends as ordinary income (0% to over 10%, plus local taxes such as New York City); see the subnational file.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **JSON numbers:** headline 23.8% (0.238); domestic 23.8% (0.238); foreign gross 23.8% (0.238); foreign tax relief: credit.
- **How derived:** Qualified dividend rate 20% + 3.8% NIIT = 23.8% for a top-bracket family, federal only. Foreign dividends from treaty-country companies are qualified; typical 15% treaty WHT is credited against the 23.8%, so the total stays about 23.8%.
- **Outbound withholding:** 30% statutory WHT on US-source dividends paid to foreign persons, reduced by treaty (typically 15%, 5% for qualifying corporate parents).
- **Treaty network:** About 56 income tax treaties in force (PwC table; Hungary terminated from 2024, Russia suspended). Every US treaty contains a saving clause letting the US tax its citizens and residents as if the treaty did not exist.
- **Holding companies:** C corporations pay 21% federal CIT and distributions are taxed again at 23.8%. A closely held investment company (more than 50% by value owned by 5 or fewer individuals, at least 60% of adjusted ordinary gross income from dividends, interest and similar passive income) is a personal holding company and pays an extra 20% tax on undistributed income (IRC 541-542); the 20% accumulated earnings tax (IRC 531) catches profits retained beyond business needs. A C corporation therefore cannot shelter a portfolio. Most US family offices use LLCs taxed as partnerships (transparent). The useful structure is an irrevocable GST-exempt dynasty trust taxed as a grantor trust, modelled as the 'dynasty_trust' structure regime.

## Inheritance and gifts to children

### Standard regime

Federal estate tax is levied on the estate at 40% on the taxable estate above the basic exclusion amount, USD 15,000,000 per person for deaths in 2026 (OBBBA made the higher exclusion permanent and indexes it from 2027). Gift and estate tax are unified: lifetime gifts above the USD 19,000 per-recipient annual exclusion use up the same USD 15 million. Unused exclusion of a deceased spouse is portable, so a married couple shelters USD 30 million. Assets get a step-up in cost basis at death, eliminating the embedded capital gain.

- **Exemptions and thresholds:** Basic exclusion USD 15,000,000 per decedent (2026); annual gift exclusion USD 19,000 per donee (USD 38,000 with gift-splitting); unlimited marital deduction for a US-citizen spouse; gifts to a non-citizen spouse USD 194,000 a year (2026). GST tax exemption equals the basic exclusion.
- **Important exceptions, statute references and announced changes:** The marital deduction for a non-citizen surviving spouse requires a qualified domestic trust (QDOT). Non-resident non-citizens: estate tax on US-situs assets (including US shares) with a filing threshold of only USD 60,000 (not indexed). Gifts or bequests received by US persons from covered expatriates are taxed to the recipient at the top rate (IRC 2801).
- **Regional differences:** About a dozen states and DC levy estate taxes and a few levy inheritance taxes (not verified in this session; see the subnational file). Probate costs vary by state and are usually avoided with a revocable living trust.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **JSON numbers:** basis `estate`, children `taxed`, exemption 15,000,000 USD, brackets (marginal): from 0 USD: 40% (0.4); other transfer costs 0% (0.0).
- **Gifts:** Unified with the estate tax: 40% on lifetime gifts above the USD 19,000 annual exclusion once the USD 15 million lifetime exclusion is used; paid by the donor. (same as inheritance: True; tax-free after years: None)
- **Business relief:** No exemption for business assets; IRC 6166 allows deferral of estate tax on closely held business interests over up to 14 years, and IRC 2032A special-use valuation for farms/businesses.
- **Foreign assets:** US citizens and US-domiciled non-citizens: worldwide estate. Non-domiciled non-citizens: US-situs assets only (US real estate, shares of US companies, tangible property in the US).
- **Residence/domicile rules:** Estate tax uses domicile (living in the US with intent to remain), not the income tax residence test. Green card holders are usually domiciled. Expatriates who are covered expatriates trigger the IRC 2801 recipient tax on later gifts/bequests to US persons.
- **Business relief covers listed shares:** False

## Wealth tax

### Standard regime

No federal net wealth tax.

- **Regional differences:** No state currently levies a broad net wealth tax. Local property taxes on real estate are significant and vary widely (not quantified here).
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** No federal property tax; states and localities tax real property (and some tax personal property). A few states historically taxed intangibles.

## Special regimes

None modelled; see Residence and eligibility.

## Holding structures

### Irrevocable GST-exempt dynasty trust taxed as a grantor trust (structure regime `dynasty_trust`)

**What it is.** Each parent gives assets worth up to the 2026 basic exclusion of USD 15,000,000 (USD 30,000,000 for the couple; Rev. Proc. 2025-32) to an irrevocable trust for the children and later generations, and allocates the same amount of GST exemption (IRC 2631(c): the GST exemption equals the basic exclusion amount). The trust is drafted to be a grantor trust for income tax (IRC 671-679, typically a power to substitute assets under IRC 675(4)(C)) but a completed gift for estate and gift tax. It is usually a directed trust sitused in a state without a rule against perpetuities (South Dakota, Nevada, Delaware and others), so it can last indefinitely. Eligible: US citizens and US-domiciled non-citizens (the USD 15 million exclusion is not available to non-domiciled non-citizens); listed for EU, US and OTHER citizenships.

**Income tax (capital gains and dividends).** Unchanged from direct holding: the parents report all trust income and gains, 20% + 3.8% NIIT = 23.8% on long-term gains and qualified dividends, foreign WHT credited. JSON: all capital-gains rates 0.238, dividends 0.238 with credit. The parents' payment of the trust's tax is not a further gift (Rev. Rul. 2004-64, not opened in this session) and steadily moves value out of the taxable estate.

**Inheritance.** Gifted assets and all later growth are outside the parents' estates, and with GST exemption allocated also outside the children's and grandchildren's estates. JSON: basis `estate`, exemption USD 30,000,000, 40% above it, i.e. both parents fund the trust in life with their full exclusions and the rest of the estate is taxed at death. Caveats, recorded in the JSON: (1) the static figure ignores the main benefit, growth after funding (USD 30 million at 5% is about USD 80 million after 20 years, all outside the estate); (2) the standard regime in this file counts only one USD 15 million exclusion, whereas a married couple can also reach USD 30 million at death through portability (QDOT needed for a non-citizen surviving spouse), so the app's gap between the two regimes partly reflects that convention; (3) trust assets get no step-up in basis at death (Rev. Rul. 2023-2), so the children pay up to 23.8% on embedded gains when they sell, unless low-basis assets are swapped back to the grantor before death.

**Payout and costs.** `payout_tax_rate` 0: distributions to the children are not taxable to them while the trust is a grantor trust. The parents cannot benefit (except a spouse under a spousal lifetime access trust), so their own spending comes from assets kept outside the trust. Running cost USD 25,000 a year is a rough unsourced estimate (trustee fee, accounting, legal review). After grantor status ends the trust pays trust rates: 37% on ordinary income above USD 16,000 and 20% on long-term gains above USD 16,250 in 2026 (Rev. Proc. 2025-32), plus 3.8% NIIT, unless it distributes.

**Anti-avoidance and exit.** Estate inclusion if the grantor keeps benefits or control (IRC 2036, 2038), the reciprocal-trust doctrine, implied agreements. Covered expatriates: IRC 877A exit tax and IRC 2801 on later gifts to US persons; moving the trust abroad can trigger IRC 684 (not verified). State law: situs state decides duration and non-grantor-trust state income tax; Connecticut gift tax and New York gift add-back not reflected. **Subnational caveat:** state units in `data/subnational/USA.json` override only the `standard` regime, so in states with income tax the `dynasty_trust` regime currently shows federal-only rates; it needs matching state overrides before state results are comparable.

### C corporations (described, not modelled)

21% federal CIT plus 23.8% on distributions. A company more than 50% owned by 5 or fewer individuals with at least 60% of its adjusted ordinary gross income from passive income is a personal holding company and pays a further 20% on undistributed income (IRC 541-542); the 20% accumulated earnings tax (IRC 531) catches retained profits beyond business needs. A C corporation is not a usable portfolio wrapper; family offices use LLCs taxed as partnerships, which change nothing for tax.

## Company taxation (kept separate from personal tax)

Headline CIT rate: 21% (0.21). Flat 21% federal CIT plus state CIT of roughly 1-10% (some states none). 15% corporate alternative minimum tax for corporations with average financial statement income above USD 1 billion. Dividends paid by a C corporation are taxed again at shareholder level (23.8%), so families usually hold investments directly or through pass-through LLCs/partnerships.
Special zones/regimes: Opportunity zones (deferral/exclusion of reinvested gains) and state-level incentives; not modelled.

## Cost of living notes

Not researched.

## Open questions

- State taxes are deliberately excluded (covered by the subnational file).
- EB-5 investment amounts and visa routes not verified in this session.
- Cost of living omitted: it depends entirely on the state/city, which the subnational research covers.
- Whether the US Pillar Two 'side-by-side' arrangement affects family holding companies was not researched (it concerns large multinationals).

## Sources

- Rev. Proc. 2025-32 (2026 inflation adjustments) (Internal Revenue Service, tax_authority): https://www.irs.gov/pub/irs-drop/rp-25-32.pdf
- Net Investment Income Tax (Internal Revenue Service, tax_authority): https://www.irs.gov/individuals/net-investment-income-tax
- IRS releases tax inflation adjustments for tax year 2026 (Internal Revenue Service, tax_authority): https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill
- United States - Individual - Other taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/united-states/individual/other-taxes
- United States - Individual - Income determination (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/united-states/individual/income-determination
- United States - Corporate - Withholding taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/united-states/corporate/withholding-taxes
- Estate tax for nonresidents not citizens of the United States (Internal Revenue Service, tax_authority): https://www.irs.gov/businesses/small-businesses-self-employed/estate-tax-for-nonresidents-not-citizens-of-the-united-states
- United States - Individual - Residence (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/united-states/individual/residence
- Expatriation tax (Internal Revenue Service, tax_authority): https://www.irs.gov/individuals/international-taxpayers/expatriation-tax
- United States - Corporate - Taxes on corporate income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/united-states/corporate/taxes-on-corporate-income
- 26 U.S.C. § 671 - Trust income attributable to grantors and others treated as substantial owners (Legal Information Institute (Cornell), legislation): https://www.law.cornell.edu/uscode/text/26/671
- 26 U.S.C. § 2631 - GST exemption (Legal Information Institute (Cornell), legislation): https://www.law.cornell.edu/uscode/text/26/2631
- Rev. Rul. 2023-2 (basis of assets in an irrevocable grantor trust not included in the gross estate) (Internal Revenue Service, tax_authority): https://www.irs.gov/pub/irs-drop/rr-23-02.pdf
- 26 U.S.C. § 541 - Imposition of personal holding company tax (Legal Information Institute (Cornell), legislation): https://www.law.cornell.edu/uscode/text/26/541
- 26 U.S.C. § 542 - Definition of personal holding company (Legal Information Institute (Cornell), legislation): https://www.law.cornell.edu/uscode/text/26/542
- 26 U.S.C. § 531 - Imposition of accumulated earnings tax (Legal Information Institute (Cornell), legislation): https://www.law.cornell.edu/uscode/text/26/531

## Change log

- 2026-10-15: initial research.
- 2026-10-15: reviewed special-regime durations: no special regime.
- 2026-10-15: added the `dynasty_trust` structure regime (GST-exempt grantor dynasty trust) and a Holding structures section; holding-company notes now describe the personal holding company and accumulated earnings taxes from the statute.
- 2026-10-15: federal estate tax now scored with portability for the married reference couple (USD 30M combined exclusion instead of USD 15M); the US-citizen overlay uses the same figure. With portability the dynasty trust no longer shows an inheritance advantage in the static model; its real benefit (keeping post-gift growth and the GST-exempt amount out of future estates) is described in text.
