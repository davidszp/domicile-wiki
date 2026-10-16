# Norway — family-office tax dossier

Last reviewed: 2026-10-16
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Norway is a high-tax home for investment wealth. Dividends and share gains are taxed at an effective
37.84%. A broad worldwide net wealth tax of 1.0% applies above NOK 1.9 million, and 1.1% above NOK 21.5
million. Listed shares count at 80% of their value, so the effective wealth tax on a share portfolio is
about 0.8–0.88%. Norway has had no inheritance or gift tax since 2014, but heirs take over the cost
basis. An exit tax of 37.84% applies to latent share gains above NOK 3 million when a resident leaves.
There is no special regime for wealthy arrivals.

## Residence and eligibility

- **Tax residence:** more than 183 days in Norway in any 12-month period, or more than 270 days in any
  36-month period.
- **Ending residence:** residence ends from the first income year in which the person spends no more than
  61 days in Norway and has no dwelling available to them or close relatives. After 10 or more years of
  residence, those conditions must hold for three consecutive years, and residence ends on 1 January of
  the fourth year. (PwC, Residence.)
- **EU/EEA citizens:** register under the EEA rules. A person who does not work must show sufficient means
  and health insurance.
- **US and other citizens:** there is no investor visa. A permit needs a basis such as work,
  self-employment, family or study.
- These immigration routes were not verified on UDI, whose pages returned HTTP 403.

## Capital gains

- **Rule:** share gains are multiplied by 1.72 and taxed at the 22% ordinary income rate, an effective
  **37.84%** (Skatteetaten, 2026 factor table). This applies to Norwegian and foreign shares, listed or
  not, and to the sale of a private company by a personal shareholder.
- **JSON:** listed domestic and foreign shares and private business sale are all 0.3784 (22% × 1.72).
- **Shielding deduction:** cost basis × the risk-free rate is deducted. The rate was 3.6% for 2025; the
  2026 rate is published in January 2027. It is ignored in the JSON because it is small against a large
  gain.
- **Real estate:** gains are ordinary income at 22% (JSON 0.22). The main home is exempt under the
  ownership and use conditions, which were not re-verified. Foreign real estate is set at 0.22 with a
  credit; this was not re-verified either.
- **Share savings account (aksjesparekonto):** defers tax on listed shares and equity funds held inside
  it until more than the amount deposited is withdrawn.
- **Exit tax (skatteloven § 10-70)**, rewritten by Lovvedtak 17 (2024–2025) for emigrations from
  20 March 2024:
  - On leaving, latent share gains are taxed as if realised the day before departure, at 37.84%, on the
    part of total net latent gains above **NOK 3,000,000**.
  - Payment can be deferred for up to 12 years with security: either interest-free instalments of 1/12 a
    year, or one payment at the end with interest.
  - The deferral ends on sale, death and certain transfers.
  - The tax lapses for shares still held if the person becomes resident again within 12 years.
  - Skatteetaten's guideline of 31 March 2025 covers the security rules. When the person moves to an EEA
    state, security is required only where there is a real risk of non-collection.

## Dividends

- **Rule:** Norwegian and foreign dividends are taxed at 22% × 1.72 = **37.84%** above the shielding
  deduction. JSON: domestic and foreign rates are both 0.3784.
- **Foreign withholding tax:** credited against Norwegian tax.
- **Outbound withholding:** 25% on dividends to non-residents, reduced by treaty. EEA corporate
  shareholders with real substance can be exempt.
- **Treaties:** about 82 bilateral treaties plus the Nordic multilateral treaty (PwC table).
- **Pending:** the 2027 budget proposal of 7 October 2026 keeps the 1.72 factor. It has not been adopted
  yet.

## Inheritance and gifts to children

- **Rule:** inheritance and gift tax were abolished for deaths and gifts from 1 January 2014
  (Skatteetaten, "Arveavgift er fjernet").
- **Cost basis carries over:** heirs and recipients take over the original cost basis, so the 37.84% gain
  tax is deferred, not forgiven. Homes, cabins and some farm and forest property are exceptions.
- **JSON:** basis `none`, `fully_exempt`, no brackets.

## Wealth tax

- **Rates for 2026** (Skatteetaten):
  - Municipal: 0.35% above NOK 1,900,000.
  - State: 0.65% between NOK 1,900,000 and NOK 21,500,000, and 0.75% above.
  - Combined: **1.0% / 1.1%**.
  - The thresholds are per single taxpayer and doubled for spouses taxed jointly.
- **Valuation discounts for 2026:**
  - Shares, including business property: 20%.
  - Operating assets: 30%.
  - Primary residence: 75%, but 30% on value above **NOK 14 million**. The revised 2026 budget raised this
    threshold from NOK 10 million.
  - Secondary residences: 0%.
  - Debt is reduced in proportion to the discounted assets.
- **JSON:** `net_wealth_worldwide`, exempt_amount 3,800,000 (the couple's allowance: Skatteetaten doubles the
  thresholds for spouses taxed jointly), brackets of 1.0% from 0 and 1.1% from 39,200,000. The second figure
  is NOK 43m (2 x 21.5m) minus the 3.8m allowance. Not indexed by statute. The JSON sets
  `securities_valued_at` 0.8, so listed shares and funds count at 80%; the primary-home discount is not modelled,
  so the home counts in full and wealth tax is somewhat overstated.
- **2027 proposal (Prop. 1 S 2026–2027), not adopted:** the allowance rises to NOK 1,990,000, and the
  rates and the share discount stay the same (Smarte Penger summary).
- **NOU 2026:9:** the tax commission proposed removing the valuation discounts and lowering the rates. It
  is a study only.
- **Property tax:** municipalities may levy an optional eiendomsskatt. It is not a wealth tax, and its
  rates were not researched.

## Special regimes

None. Norway has no lump-sum or non-dom regime.

## Holding structures

**Structure modelled: personal holding company (holding AS), regime id `holding_as`.**

- **Participation exemption (fritaksmetoden, skatteloven § 2-38):** a Norwegian AS pays no tax on gains on
  qualifying shares, whatever the size of the stake; losses on them are not deductible. Qualifying dividends are
  97% exempt: 3% is taxed at 22%, an effective **0.66%** (PwC, Corporate income determination).
- **What qualifies:** shares in Norwegian and EEA companies, and EEA securities funds (UCITS). From 2026 the fund
  definition sits in FSFIN § 2-38-1.
- **Portfolio exception for non-EEA holdings (§ 2-38 third paragraph letter b):** shares in companies outside the
  EEA qualify only if the AS has held at least 10% of capital and votes for two years. A family's US shares are
  therefore taxed in the AS at **22%** on gains and dividends (with credit for withholding). Binding ruling BFU
  5/2026 (3 July 2026) applied the exception to units in a US equity fund. Low-tax countries outside the EEA never
  qualify. In practice the foreign portfolio is held through EEA-domiciled funds (e.g. Irish or Luxembourg UCITS
  ETFs) or EEA shares.
- **JSON (structure-level):** gains 0 on domestic and foreign listed shares (assuming EEA shares/funds) and on a
  private business held through the AS; real estate 0.22; dividends 0.0066 domestic and foreign, no credit
  (the 0.66% leaves little to credit foreign withholding against; immaterial).
- **Payout:** dividends to the parents are taxed at 22% × 1.72 = **37.84%** above the shielding deduction
  (`payout_tax_rate` 0.3784). Loans from the AS to a personal shareholder or close relatives are taxed as dividends
  (skatteloven § 10-11 fourth paragraph, since 7 October 2015; Skatteetaten Q&A). Repayment of paid-in capital is
  tax-free.
- **Wealth tax:** the AS itself is not liable. The parents pay wealth tax on the AS shares, valued at the company's
  tax value of net assets on 1 January of the income year (Skatte-ABC A-4-4.2), less the 20% share discount
  (Skatteetaten 2026 rates). For a listed portfolio this is the same 80% value as direct holding, so the
  `wealth_tax` metric is inherited from the standard regime. Valuation lags by one year.
- **Inheritance:** none (abolished 2014); heirs take over the cost basis of the AS shares. Inherited from standard.
- **Anti-avoidance and running:** general anti-avoidance rule (skatteloven § 13-2). Accounts and a company return
  are needed; with a balance sheet this size an auditor is likely required (audit thresholds not re-verified).
  Running and set-up costs are not sourced and are omitted from the JSON. Minimum share capital is NOK 30,000.
- **Getting assets in:** transferring an existing personal portfolio to the AS is a realisation at 37.84%, and
  Norway gives no step-up on immigration; the structure suits cash or assets with small latent gains on arrival.
- **Exit and liquidation:** liquidation proceeds are a realisation of the AS shares at 37.84%. On emigration the
  exit tax (§ 10-70) taxes latent gains on the AS shares above NOK 3m at 37.84%, deferrable up to 12 years.
- **US citizens:** excluded from the regime (US CFC/PFIC rules tax the company's passive income currently).
- **Unverified:** whether foreign withholding can be credited against the tax on the 3% portion; audit thresholds.

## Company taxation (kept separate from personal tax)

- **Rate:** 22% corporate income tax, and 25% for some financial companies.
- **Participation exemption (fritaksmetoden):** applies to corporate shareholders. Its partial clawback
  was not re-verified.
- **Holding company:** a personal holding company (AS) defers personal dividend tax until it distributes.
- **Svalbard:** has its own low-tax regime, which was not researched.

## Cost of living notes

City: Oslo.

- **Prime rent (monthly):** 47,000 NOK (2026). Median asking rent of 14 detached houses (enebolig) with 4-5 bedrooms for rent in Oslo municipality on finn.no on 2026-10-15 (NOK 30,500-180,000; one duplicate removed). The upper half is in the prime west (Bygdøy, Holmenkollen, Smestad, Vinderen) at NOK 55,000-180,000. Source: [FINN.no - Bolig til leie, Oslo, enebolig, 4+ soverom](https://www.finn.no/realestate/lettings/search.html?location=0.20061&min_bedrooms=4&property_type=1).
- **International school fee (annual, per child):** 288,700 NOK (2026). Oslo International School, annual tuition 2026-27, Year 1 to IB2 (excludes one-off fees). Source: [School fees](https://www.oslointernationalschool.no/admissions/school-fees).
- Health insurance, housekeeper and price per m² not sourced.

## Open questions

- The 2026 shielding rate is not yet published.
- The 2027 budget proposals are not yet adopted.
- The UDI immigration routes were not verified.
- The shielding deduction (cost basis x risk-free rate) is ignored in the JSON rates; on a cost basis of NOK 30 million it could exceed the whole annual dividend. The cost basis of the family's shares is unknown.
- Moving an existing personal portfolio into an AS or an ASK is a realisation at 37.84% (no step-up on arrival); the share savings account (ASK) holds only EEA-domiciled shares and funds (Skatteetaten) and is not modelled.
- The 2027 budget proposal (7 October 2026) keeps the 1.72 factor; not yet adopted by the Storting.
- The main-home exemption and the taxation of foreign real estate were not re-verified.

## Sources

- [Faktor for oppjustering av gevinst/tap eller utbytte på aksjer (2026) — Skatteetaten](https://www.skatteetaten.no/satser/faktor-for-oppjustering-av-gevinsttap-eller-utbytte-pa-aksjer/?year=2026)
- [Formuesskatt og verdsettingsrabatter (2026) — Skatteetaten](https://www.skatteetaten.no/satser/formuesskatt/?year=2026)
- [Arveavgift er fjernet — Skatteetaten](https://www.skatteetaten.no/satser/arveavgift/)
- [Retningslinje for utsettelse av innbetaling av fastsatt utflyttingsskatt etter skatteloven § 10-70 — Skatteetaten](https://www.skatteetaten.no/rettskilder/type/retningslinjer/retningslinje-for-utsettelse-av-innbetaling-av-fastsatt-utflyttingsskatt-etter-skatteloven--10-70/)
- [Lovvedtak 17 (2024-2025): endringer i skatteloven § 10-70 — Stortinget](https://stortinget.no/no/Saker-og-publikasjoner/Vedtak/Beslutninger/Lovvedtak/2024-2025/vedtak-202425-017/)
- [Norway: National Budget 2025 makes amendments to exit tax rules — BDO](https://www.bdo.global/en-gb/insights/tax/expatriate-tax/norway-national-budget-2025-makes-amendments-to-exit-tax-rules)
- [Norway - Individual - Income determination — PwC](https://taxsummaries.pwc.com/norway/individual/income-determination)
- [Norway - Individual - Taxes on personal income — PwC](https://taxsummaries.pwc.com/norway/individual/taxes-on-personal-income)
- [Norway - Individual - Other taxes — PwC](https://taxsummaries.pwc.com/norway/individual/other-taxes)
- [Norway - Individual - Residence — PwC](https://taxsummaries.pwc.com/norway/individual/residence)
- [Norway - Corporate - Withholding taxes — PwC](https://taxsummaries.pwc.com/norway/corporate/withholding-taxes)
- [Norway - Corporate - Taxes on corporate income — PwC](https://taxsummaries.pwc.com/norway/corporate/taxes-on-corporate-income)
- [Statsbudsjettet for 2027 — Smarte Penger](https://www.smartepenger.no/skatt/3834-statsbudsjettet-for-2027)
- [School fees — Oslo International School](https://www.oslointernationalschool.no/admissions/school-fees)
- [FINN.no - Bolig til leie, Oslo, enebolig, 4+ soverom](https://www.finn.no/realestate/lettings/search.html?location=0.20061&min_bedrooms=4&property_type=1)
- [Norway - Corporate - Income determination — PwC](https://taxsummaries.pwc.com/norway/corporate/income-determination)
- [Bindende forhåndsuttalelse 5/2026: Porteføljeunntaket i fritaksmetoden for andeler i verdipapirfond — Skatteetaten](https://www.skatteetaten.no/rettskilder/type/uttalelser/bfu/portefoljeunntaket-i-fritaksmetoden-for-andeler-i-verdipapirfond/)
- [Spørsmål og svar - lån fra selskap til personlig aksjonær — Skatteetaten](https://www.skatteetaten.no/bedrift-og-organisasjon/starte-og-drive/rutiner-regnskap-og-kassasystem/lonn-lan-og-utbytte/lan-til-aksjonar/skattepliktig-lan-til-personlig-aksjonar/sporsmal-og-svar---lan-fra-selskap/)
- [Skatte-ABC 2024: A-4 Aksjer - formue — Skatteetaten](https://www.skatteetaten.no/rettskilder/type/handboker/skatte-abc/2024/a-4-aksjer--formue/A-4.003/A-4.004/)

## Change log
- 2026-10-15: initial research.
- 2026-10-15: data-quality pass: added prime rent (finn.no, Oslo 4-5 bedroom detached houses, NOK 47,000/month).
- 2026-10-15: added the holding AS structure regime (`holding_as`) and the Holding structures section; standard holding_company_notes now points to it.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
- 2026-10-16: recipe pass: wealth-tax allowance set to the couple's NOK 3.8 million (upper bracket from NOK 43 million net wealth) because thresholds double for spouses taxed jointly (Skatteetaten); noted that the engine applies it without the valuation discounts; shielding-deduction and entry-realisation caveats added.
