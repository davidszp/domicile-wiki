# Estonia — family-office tax dossier

Last reviewed: 2026-10-16
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary
Flat 22% income tax in 2026 (planned rise to 24% cancelled in Dec 2025); capital gains taxed at 22% but deferrable indefinitely through the investment account; foreign portfolio dividends generally exempt; no inheritance, gift or wealth tax. Companies pay 22/78 only on distribution.

## Residence and eligibility
- Tax residence: Resident if permanent home in Estonia or present more than 183 days in any 12-month period (part day counts as a full day); residence may start from arrival date; treaty tie-breaker can make a dual resident non-resident. Change of residence must be notified to EMTA.
- EU/EEA/Swiss free movement (EU): Register residence with the local government; right of residence as EU citizen.
- Temporary residence permit (non-EU) (US, OTHER): Permit under the Aliens Act on grounds such as enterprise, employment, startup, or large investor. Thresholds not verified in this research.

## Capital gains
- Rule in force: Capital gains are ordinary income taxed at the flat 22% rate (2026). Gains reinvested inside an 'investment account' (investeerimiskonto) are deferred until withdrawals exceed contributions, which makes long-term deferral possible for a listed-securities portfolio.
- Exemptions/thresholds: Basic exemption EUR 8,400/yr (irrelevant at this wealth level). Gain on sale of own home used as residence is exempt (general rule; not re-verified here). Losses on securities offset only securities/capital gains and may be carried forward.
- Conditions: Investment account available only to Estonian tax residents; account may be with a bank/investment firm in the EEA or an OECD state. Assets must be bought with money from the account.
- Holding periods: None for securities.
- Foreign assets: Residents taxed on worldwide gains; foreign tax credit limited to Estonian tax (22%) per country.
- Trader risk: No separate trader regime for individuals; a business conducted as a sole proprietor (FIE) adds social tax 33% on business income.
- Exceptions, reforms, announced changes: Flat personal income tax 22% for 2026 (EMTA tax-rates page, checked 15 Oct 2026). There is no 2% surcharge in 2026: the security (defence) tax planned for 2026-2028, which included a 2% levy on income and a 2% tax on company profits, was scrapped by the government on 8 May 2025 before it took effect (ERR); the rise to 24% legislated in its place was cancelled in December 2025, and EMTA lists 22% and CIT 22/78 for 2026 with no surcharge. Professional/business activity (registered sole trader) is taxed with social tax; a passive investor is not.
- Confidence: high, verified.
- JSON: headline 22%; listed domestic 22%, listed foreign 22%, private business 22%, local real estate 22%, foreign real estate 22%. Basis: Flat 22% PIT on net gain (2026), no holding-period relief. Effective rate can be deferred to near 0% in present-value terms via the investment account until money is withdrawn beyond contributions.

2% surcharge check (2026-10-15): none applies in 2026. The 2026-2028 security tax (2% on income and 2% on company profits) was scrapped on 8 May 2025 before taking effect (ERR); the replacement PIT rise to 24% was cancelled in December 2025; EMTA's 2026 page lists PIT 22% and CIT 22/78.

## Dividends
- Rule in force: Dividends from Estonian companies carry no personal income tax: the company pays 22/78 corporate income tax when it distributes. Foreign dividends are exempt for a resident individual if foreign tax was withheld on the dividend or the underlying profit was taxed abroad (PwC); otherwise 22%.
- Exemptions/thresholds: Domestic dividends: no PIT (except 7% WHT on redistribution of dividends that were taxed at the old 14/86 rate before 2025).
- Exceptions, reforms, announced changes: The 14/86 reduced CIT rate on regular dividends and the related 7% WHT on individuals were abolished from 1 January 2025 (EMTA). Flat personal income tax 22% for 2026 (EMTA tax-rates page). A rise to 24% from 2026, legislated in 2025 when the planned security (defence) tax was abolished, was cancelled by amendments adopted by the Riigikogu in December 2025 (reported by secondary sources; EMTA lists 22% for 2026).
- Confidence: medium, partially verified.
- JSON: headline 22%, domestic 0%, foreign gross 0%, relief method 'exemption'. Basis: domestic_rate 0: tax borne by the company at 22/78 (=28.2% of net dividend). foreign_gross_rate 0: exempt where source WHT was withheld or underlying profit taxed, which covers ordinary listed foreign shares; 22% with credit otherwise.
- Outbound withholding: Dividends paid by Estonian companies carry company-level CIT 22/78 on distribution; no additional WHT on dividends to non-residents in the standard case (7% WHT only for redistributed pre-2025 14/86 profits).
- Treaties: Broad treaty network with EU/OECD states and the US (exact count not verified); foreign tax credit is limited to the Estonian tax per country.
- Holding companies: Modelled as the structure regime 'oue_holding' (see Holding structures): an Estonian OÜ pays no tax on dividends and gains it keeps; 22/78 of the net amount is due when it distributes (Income Tax Act § 50(1)), with no further personal tax on a resident shareholder.
- Conflict (2026-10-16): PwC says foreign dividends are exempt for a resident individual when the profit was taxed abroad or tax was withheld on the dividend (what the JSON models). EMTA's English investment-account page says that in the ordinary system foreign dividends are declared and the foreign tax is credited against Estonian tax, with any shortfall payable (22% less 15% leaves 7%). Statute text not opened; see Open questions.

## Inheritance and gifts to children
- Rule in force: No inheritance tax and no gift tax. Inherited assets are not income for the heir. A later sale is taxed as a capital gain using the deceased's acquisition cost.
- Foreign assets: No tax regardless of asset location.
- Confidence: medium, partially verified.
- Gifts: No gift tax; gifts between individuals are not taxable income.
- Business relief: Not applicable (no tax).
- Domicile/scope: Not applicable.
- JSON: basis 'none', children 'fully_exempt', exemption 0 EUR, brackets none, other transfer cost 0%.

## Wealth tax
- Rule in force: No net wealth tax and no recurring levy on financial assets.
- Confidence: high, verified.
- Property taxes (not a wealth tax): Annual municipal land tax 0.1%-1% of assessed land value; no tax on buildings. Land under the home up to a size limit is exempt.
- JSON: type 'none'.

## Special regimes
None. No special tax regime for newly arriving wealthy individuals was found; only ordinary residence (JSON regime 'standard').

## Company taxation (kept separate from personal tax)
- Headline CIT 22%. Distribution-based CIT: 22/78 (22% of gross distribution) only when profits are distributed; retained earnings untaxed. The 14/86 reduced rate for regular dividends was abolished from 2025. A 2% corporate profit tax (part of the security tax) was abolished in 2025 before it applied; a planned rise of the distribution rate to 24/76 from 2026 was reported cancelled in December 2025 (EMTA lists 22/78).

## Holding structures

**Modelled: Estonian holding company (`oue_holding`, type `structure`).** An osaühing (OÜ) owned by the parents holds the portfolio.
- **Company tax:** only on distribution, 22/78 of the net amount (Income Tax Act § 50(1), rate in § 4(1),(11); EMTA 'Taxation of dividends'), i.e. 22% of the cash the company uses. Retained dividends and gains are untaxed (PwC: all undistributed profits are tax exempt). JSON: gains rates 0, dividend rates 0, credit 'none', payout_tax_rate 0.22.
- **Personal tax on payout:** none for a resident individual from 1 January 2025 (14/86 and the 7% withholding abolished).
- **Wealth tax and inheritance:** not given in the structure regime, so they inherit the standard values (none; no inheritance or gift tax). Shares in the OÜ pass free of tax; Estonia has no deemed disposal at death.
- **Funding:** an in-kind contribution of an existing portfolio may be a disposal taxed at 22% on the gain (not verified); cash or newly bought positions avoid it.
- **Not modelled:** the investment account (needs an engine change, see Open questions), a private foundation or trust (not researched), annual running cost of the OÜ (not sourced).

## Cost of living notes

City: Tallinn.
- Prime family-home rent (monthly): EUR 2,500 (2026). Median asking rent of 19 distinct houses of 180-500 m² for rent within Tallinn city (Nõmme, Haabersti, Pirita, Kesklinn/Kadriorg) in City24.ee's house-rental search for Estonia on 15 Oct 2026 (first 100 results; a EUR 1 placeholder and duplicates removed); range EUR 999-5,300. Viimsi and other suburbs excluded. Asking rents. Source: Houses for rent, Tallinn (City24 search), https://www.city24.ee/en/real-estate-search/houses-for-rent/tallinn
- International school (annual, per child): EUR 26,764 (2026). International School of Estonia, DP 1 & DP 2 (Grades 11-12), 2026-2027: annual fee EUR 26,764. New students pay a one-time EUR 600 registration fee and a EUR 3,000 capital levy. Source: Fees and tuition discounts (Tuition Fees for 2026-2027), https://ise.edu.ee/join-us/fees-and-tuition-discounts/

Prime purchase price per m², family health insurance and housekeeper cost were not sourced in this round and are omitted rather than guessed. KV.EE, the largest Estonian portal, blocked automated access; the rent sample comes from City24.

## Open questions

- Exact current text of Income Tax Act § 17 (investment account) and § 15 (gains) not opened in Riigi Teataja (site is JS-rendered); relied on EMTA guidance.
- Foreign-dividend exemption for individuals taken from PwC 'Income determination'; statutory text (Income Tax Act § 18) not opened. Confirm whether a US dividend with only 15% treaty WHT qualifies as fully exempt (expected yes).
- Notary fees for the succession certificate are value-based but capped; exact schedule not verified. Rule that the heir inherits the deceased's acquisition cost not re-verified for 2026.
- Gifts from a company (rather than an individual) may be taxed as fringe benefit/distribution; not researched.
- Reports of a '2% surcharge' in 2026 (e.g. Remote Work Europe) refer to the abolished security tax; EMTA's 2026 rate page shows none. Resolved as: no surcharge in 2026.

- Conflict on foreign dividends of a resident individual: PwC (exempt when tax was withheld abroad or profit taxed abroad) versus EMTA's English page (credit of foreign tax, shortfall payable). The Income Tax Act text (Riigi Teataja, JS-rendered) was not opened. If EMTA's reading is right, foreign_gross_rate becomes 0.22 with foreign_tax_credit 'credit'.
- Holding structures: an OÜ is modelled; a private family foundation or trust was not researched and is not modelled.

## Sources
- [Tax rates (private client)](https://emta.ee/en/private-client/taxes-and-payment/declaration-income/tax-rates)
- [Securities and investment account](https://www.emta.ee/en/private-client/taxes-and-payment/taxable-income/securities-and-investment-account)
- [Estonia - Individual - Income determination](https://taxsummaries.pwc.com/estonia/individual/income-determination)
- [Estonia - Individual - Taxes on personal income](https://taxsummaries.pwc.com/estonia/individual/taxes-on-personal-income)
- [Estonia tax changes 2026](https://1office.co/blog/estonia-tax-changes-2026/)
- [Estonia - Individual - Foreign tax relief and tax treaties](https://taxsummaries.pwc.com/estonia/individual/foreign-tax-relief-and-tax-treaties)
- [Estonia - Individual - Other taxes](https://taxsummaries.pwc.com/estonia/individual/other-taxes)
- [Successions in Europe - Estonia](https://www.notariesofeurope.eu/en/faq3/successions-in-europe/estonia/)
- [Estonia - Individual - Residence](https://taxsummaries.pwc.com/estonia/individual/residence)
- [Taxation of dividends (EMTA, business client)](https://emta.ee/en/business-client/taxes-and-payment/income-and-social-taxes/taxation-dividends)
- [Estonia - Corporate - Taxes on corporate income](https://taxsummaries.pwc.com/estonia/corporate/taxes-on-corporate-income)
- [Estonia - Corporate - Income determination](https://taxsummaries.pwc.com/estonia/corporate/income-determination)
- [Taxes in Estonia (Ministry of Finance, updated 22.04.2026)](https://fin.ee/en/taxes)
- [Estonia abolishes planned temporary defense tax (EY Global Tax News, 9 July 2025)](https://globaltaxnews.ey.com/news/2025-1409)
- [Security Tax Abolished, but VAT and Income Tax to Rise to 24%](https://www.koda.ee/en/news/security-tax-abolished-vat-and-income-tax-rise-24)
- [Estonia Country Update (2% surcharge unwinding)](https://remoteworkeurope.eu/news/2026/estonia-two-percent-tax-surcharge-unwinding)
- Estonia scraps defense tax, makes VAT rise permanent (8 May 2025): https://news.err.ee/1609687289/estonia-scraps-defense-tax-makes-vat-rise-permanent
- Houses for rent, Tallinn (City24 search): https://www.city24.ee/en/real-estate-search/houses-for-rent/tallinn
- Fees and tuition discounts (Tuition Fees for 2026-2027): https://ise.edu.ee/join-us/fees-and-tuition-discounts/

## Change log
- 2026-10-15: initial research.
- 2026-10-15: resolved the reported 2026 '2% surcharge' (security tax scrapped May 2025; EMTA lists none for 2026); added Tallinn cost of living (City24 rent sample, ISE 2026-27 fee).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
- 2026-10-16: added the holding structure regime `oue_holding` (Estonian OÜ: no tax on retained dividends and gains, 22/78 on distribution, payout rate 0.22); recorded the conflict between PwC and EMTA on foreign dividends of resident individuals (not changed in the JSON); wrote the projection recipe `data/recipes/EST.json`.
