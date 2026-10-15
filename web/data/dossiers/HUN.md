# Hungary — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Flat 15% personal income tax (PIT, Act CXVII of 1995, "Szja tv.") on capital gains and dividends; a 13%
social contribution tax ("szocho", Act LII of 2018) applies to some capital income but is capped. No
inheritance or gift duty between parents and children (Act XCIII of 1990 on duties, "Itv."). No wealth tax
in force in 2026, but a government draft published 6 October 2026 would tax net wealth above HUF 1 billion
at 1% from the 31 December 2026 valuation date. The US-Hungary tax treaty ended on 1 January 2024.

## Residence and eligibility

- Resident: Hungarian citizens; EEA nationals with a Hungarian registration card present 183+ days in the
  calendar year; settled third-country nationals; otherwise only permanent home / centre of vital interests /
  183 days (PwC).
- EU citizens: free movement, registration certificate. US/other: national residence permits. The Guest
  Investor residence permit (in force from July 2024) is slated for abolition by the Tisza government
  (Vialto, April 2026); no official repeal found as of 2026-10-15.

## Capital gains

- Rule: 15% PIT on the gain. A "controlled capital market transaction" (ellenőrzött tőkepiaci ügylet,
  Szja tv. § 67/A) through an investment service provider in Hungary, the EEA or a treaty state: 15% only, no
  szocho, losses can be netted (tax equalisation).
- Other gains (e.g. private company sale, non-treaty broker): 15% PIT + 13% szocho, szocho base capped at 24x
  monthly minimum wage = 24 x HUF 322,800 = HUF 7,747,200 (2026), reduced by salary and other
  szocho-bearing income.
- Since the US treaty ended, a US broker no longer qualifies for controlled-transaction treatment (RSM).
- TBSZ (long-term investment account): tax-free after 5 years from the collection year; 10% PIT (and
  reduced szocho, reported as 8%) in years 4-5; full rates within 3 years. Szocho on TBSZ applies since 2025.
- Real estate: 15%, exempt after 5 years of ownership.
- JSON: `listed_securities_domestic/foreign = 0.15`; `private_business_sale = 0.15` (capped szocho immaterial
  for a large gain); `real_estate_local/foreign = 0.0` (held > 5 years).

## Dividends

- 15% PIT. Szocho 13% does not apply to dividends from companies listed on an EEA regulated market; for other
  dividends (e.g. US-listed) it applies up to the HUF 7,747,200 cap (max about HUF 1.0m a year).
- Foreign WHT credited up to the treaty rate (15%). For non-treaty income Hungary leaves at least 5% PIT: US
  dividends now bear 30% US WHT + 5% Hungarian = about 35% (RSM; IRS Announcement 2024-5 via KPMG).
- Outbound: no WHT on dividends to foreign companies; 15% to non-resident individuals (treaty-reduced).
- JSON: `domestic_rate = foreign_gross_rate = 0.15`, `foreign_tax_credit = credit`.

## Inheritance and gifts to children

- Itv.: general 18% (9% residential property) duty, but inheritances and gifts between lineal relatives
  (ascendants/descendants by blood or adoption) and to the surviving spouse are fully exempt, any amount, any
  asset. Siblings exempt since 8 July 2020 (NAV). Exempt lineal gifts need no reporting.
- Stepchildren and foster children are not lineal relatives.
- JSON: `basis = beneficiary`, `children_treatment = fully_exempt`, `brackets = []`,
  `gifts_same_as_inheritance = true`, `other_transfer_cost_rate = 0` (notary probate fees small, not
  quantified).

## Wealth tax

- **Scored PRO FORMA (editorial decision, 2026-10-15):** the draft below is scored as if enacted, because
  enactment by the two-thirds majority is treated as near-certain. JSON `type = broad`, `basis =
  pro_forma_draft`: net worldwide wealth, HUF 1bn allowance, 1% marginal, 1.5% on wealth above HUF 100bn
  (bracket from HUF 99bn above the allowance). Each spouse's HUF 1bn allowance is applied (HUF 2bn for the reference couple).
- In force 2026: none (PwC: "no net wealth/worth taxes in Hungary").
- Draft bill (Ministry of Finance, public consultation 6-14 October 2026, government summary):
  - Taxpayers: resident individuals (worldwide wealth), non-resident individuals (Hungarian real estate and
    Hungarian company shares only), and "asset-management taxpayers" (trusts, private foundations, similar
    foreign structures; foreign ones count as domestic if effectively managed from Hungary).
  - Rate: 1% on net wealth above HUF 1 billion up to a base of HUF 100 billion; 1.5% above that.
  - Each spouse has a separate HUF 1bn threshold; minors' non-inherited assets go into the parent's base;
    related asset-management structures share one threshold.
  - Debts deductible; personal-use movables excluded except art/jewellery > HUF 3m and vehicles > HUF 10m.
  - Valuation: listed securities at market; unlisted companies 1/3 equity + 2/3 capitalised earnings (15%);
    foreign real estate at cost indexed 3% a year or by official index.
  - On ceasing residence mid-year, wealth is measured the day before.
  - Entry into force 15 December 2026; first valuation 31 December 2026; return and payment by 31 August 2027.
  - Not yet passed by parliament as of 2026-10-15. Tisza holds a two-thirds majority.
- Local building and land taxes are municipal property taxes, not wealth tax.

Status check 2026-10-15: the draft is still a consultation draft (consultation closed 14 Oct 2026); no bill had been filed in Parliament (Index.hu, 10 Oct 2026). Not scored; JSON type stays 'none'.

## Special regimes

None for new arrivals. The vagyonkezelő alapítvány (asset management foundation, Act XIII of 2019) is a
domestic succession/holding vehicle; its tax treatment (CIT, distributions to beneficiaries, pending 2026
changes) was not verified from primary sources, so it is not modelled as a regime. Under the wealth tax draft
it would be a separate taxpayer sharing one HUF 1bn threshold with related structures.

## Holding structures

### Asset management foundation (`asset_management_foundation`, structure)

A vagyonkezelő alapítvány (Act XIII of 2021), with the parents and children as beneficiaries. It is scored because it
removes the 15% tax on gains while assets stay inside: about EUR 450,000 a year against EUR 510,000 personally on
the app profile (draft wealth tax included).

- **Foundation level:** the foundation is a CIT taxpayer (9%). Its income is not taxed if founder and beneficiaries
  are individuals and the income comes solely from acquiring, holding and disposing of financial instruments,
  securities, receivables and cash. Peterka (April 2026) describes this rule for trusts; Mondaq (January 2026) says
  the same applies to asset management foundations. JSON: listed gains `0`, dividends `0`. A private business sale and
  real estate are `0.09` (9% CIT; upper bound). Foreign withholding cannot be credited. The statute itself
  (njt.hu) could not be reached.
- **2026 tax package:** Bill T/387 was adopted on 28 July 2026 (WTS) and most of it applies from 31 August 2026
  (Forvis Mazars, KPMG). For assets contributed from that date:
  - the acquisition value and unrealised gain must be recorded;
  - the tax-free distribution of revalued assets after 5 years ends;
  - distributions are taxed as dividends, accumulated yield first, then the value increase, then the remaining
    original capital tax-free;
  - distributing an original asset in kind stays tax-free, with carry-over cost.

  Also new: annual reporting to NAV (first report due 31 March 2027) and NAV audits of every structure from 2028.
  Assets already in place before 12 September 2023, or already stepped up, keep the old rules.
- **Payout:** dividend income bears 15% PIT, plus szocho capped at 24 x the minimum wage, which is negligible on
  EUR 400,000. `payout_tax_rate 0.15`, matching the standard regime's 15%.
- **Wealth tax (pro forma, as the standard regime):** the 6 October 2026 draft treats private and asset management
  foundations as separate taxpayers, separate from founders and beneficiaries. Related structures cannot multiply the
  HUF 1bn allowance (Ministry of Finance draft summary). Modelled as two components, each 1% above HUF 1bn: the
  foundation on the portfolio (`financial_assets_all`) and the family on its home (`real_estate_all`). The draft
  actually gives each spouse a separate HUF 1bn allowance; the standard regime uses one family allowance, and this
  regime follows it for consistency.
- **Inheritance:** no event while the foundation holds the assets. Children are exempt in Hungary anyway; the
  standard regime is inherited.
- **Costs:** HUF 6m a year and HUF 2m setup (estimates: accounting, CIT declaration and annual report, board,
  notary/court). Not sourced.
- **Unverified:** the CIT Act text of the foundation exemption, the szocho treatment of foundation distributions, and
  how the foundation's allowance interacts with the founders' own.

## Company taxation (kept separate from personal tax)

9% CIT; local business tax up to 2% of adjusted revenue (dividends and interest exempt); dividends received
exempt; no WHT on dividends/interest/royalties to foreign companies (PwC).

## Cost of living notes

City: Budapest.
- Prime family-home rent (monthly): HUF 1,237,500 (2026). Median asking rent of 22 houses/large homes with 4+ bedrooms and 200-450 m² in Buda districts II, III, XI and XII (Pasarét, Rózsadomb, Budaliget, Svábhegy, Istenhegy, Testvérhegy etc.) in the full rental stock of Tower Budapest, an expat-focused letting agency (40 result pages, 324 listings, read 15 Oct 2026); range HUF 690,000-3,367,000 (about EUR 1,900-9,250). Excludes common costs and utilities. Source: Tower Budapest rentals (full listing), https://www.towerbudapest.com/en/rentals
- International school (annual, per child): USD 33,250 (2026). American International School of Budapest, Grades 11-12 IB Diploma, 2026/27 tuition USD 29,750 plus USD 3,500 building fee (new students also pay one-off registration and deposit). Source: AISB fees and medical requirements 2026/27, https://aisb.hu/joining-us/fees-and-medical-requirements

Prime purchase price per m², family health insurance and housekeeper cost were not sourced in this round and are omitted rather than guessed.

## Open questions

- Exact TBSZ szocho rates in years 4-5 after the 2025 change (sources give 8%); not material for a 5-year holding.
- Whether dividends credited inside a TBSZ account are sheltered like gains; not verified.
- Draft wealth tax (1% above HUF 1bn net wealth, 1.5% above HUF 100bn) published 6 Oct 2026; consultation closed 14 Oct 2026; not yet submitted to Parliament as of 15 Oct 2026. If enacted as drafted it applies to wealth held on 31 Dec 2026. Re-check parlament.hu and switch this metric to 'broad' with the enacted brackets when passed.
- Whether the final law adds an exit tax or a main-home exemption, and how the announced 5% 'offering' of the tax to public causes works.
- Notary probate fees for a large estate not quantified; treated as negligible.
- Final enactment of the wealth tax bill (draft of 6 Oct 2026; not submitted to Parliament as of 15 Oct 2026).
- Tax treatment of the vagyonkezelő alapítvány (asset management foundation): CIT exemption of portfolio income, taxation of distributions to beneficiaries, and pending 2026 changes were not verified from primary sources; the draft wealth tax treats such foundations as separate taxpayers.
- Future of the Guest Investor residence programme.

## Sources

- PwC, Hungary - Individual - Income determination: https://taxsummaries.pwc.com/hungary/individual/income-determination
- PwC, Hungary - Individual - Other taxes: https://taxsummaries.pwc.com/hungary/individual/other-taxes
- PwC, Hungary - Individual - Residence: https://taxsummaries.pwc.com/hungary/individual/residence
- PwC, Hungary - Corporate - Taxes on corporate income: https://taxsummaries.pwc.com/hungary/corporate/taxes-on-corporate-income
- PwC, Hungary - Corporate - Withholding taxes: https://taxsummaries.pwc.com/hungary/corporate/withholding-taxes
- Ministry of Finance, consultation on the wealth tax bill: https://kormany.hu/dokumentumtar/tarsadalmi-egyeztetes-a-vagyonadorol-szolo-torvenyjavaslatrol
- Ministry of Finance, summary of the wealth tax draft (PDF): https://kormany.hu/application/documents/6025c5a8-77c8-476c-a3f3-a05d86d7b9bf/download
- RSM Hungary, Vagyonadó 2026-2027 Magyarországon: https://www.rsm.hu/blog/csaladi-vallalat/vagyonado-2026-2027-magyarorszagon
- Reuters via Internazionale, Hungary government proposes wealth tax on ultra-rich: https://www.internazionale.it/ultime-notizie-reuters/2026/10/06/hungary-government-proposes-wealth-tax-on-ultra-rich
- Telex, TBSZ and controlled capital market transactions: https://telex.hu/nevertek/2026/07/18/befektetesek-igy-lehet-elkerulni-a-hozamok-utani-adofizetest-tbsz-allampapir-nyugdijmegtakaritas-lehetosegek-ajanlatok
- RSM Hungary, termination of the US-Hungarian tax treaty: https://www.rsm.hu/en/blog/2023/09/tax-consequences-of-the-termination-of-the-us-hungarian-tax-treaty
- KPMG US, Announcement 2024-5: https://kpmg.com/us/en/home/insights/2023/12/tnf-announcement-2024-5-termination-hungary-tax-treaty.html
- NAV, sibling exemption from inheritance and gift duty: https://nav.gov.hu/ado/illetek/Illetekmentes_a_testv20200715
- WTS Klient, Draft PIT return 2026: https://wtsklient.hu/en/2026/03/18/draft-pit-return/
- Vialto Partners, Hungary election and immigration policy: https://vialtopartners.com/regional-alerts/hungary-immigration-election-results-potential-impact-on-immigration-policy
- AISB fees 2026/27: https://aisb.hu/joining-us/fees-and-medical-requirements
- Felajánlható lesz a vagyonadó egy része, részleteket közölt a Pénzügyminisztérium: https://index.hu/gazdasag/2026/10/10/vagyonado-penzugyminiszterium-karman-andras-tarsadalmi-egyeztetes/
- Tower Budapest rentals (full listing): https://www.towerbudapest.com/en/rentals
- [Tax alert 4 August 2026: first tax package of the new government](https://kpmg.com/hu/en/insights/2026/08/taxalert-2026-08-04.html) — KPMG Hungary (professional)
- [The most important changes in the summer tax package (2026)](https://www.forvismazars.com/hu/en/insights/newsletters/tax-newsletters-2026/important-changes-in-the-summer-tax-package) — Forvis Mazars Hungary (professional)
- [The 2026 Hungarian tax package (29 July 2026)](https://wtsklient.hu/en/2026/07/29/the-2026-hungarian-tax-package/) — WTS Klient Hungary (professional)
- [Trusts in Hungary - key tax considerations, part 2 (23 April 2026)](https://blog.peterkapartners.com/trusts-in-hungary-key-tax-considerations-part-2/) — PETERKA & PARTNERS (professional)
- [Cross-border wealth structuring between Turkey and Hungary: trusts, AMFs and tax efficiency (5 January 2026)](https://webiis10.mondaq.com/turkey/withholding-tax/1727338/cross-border-wealth-structuring-between-turkey-and-hungary-trusts-amfs-and-tax-efficiency) — Mondaq (professional)

## Change log
- 2026-10-15: initial research.
- 2026-10-15: checked parliamentary status of the 6 Oct 2026 wealth tax draft (consultation only, not filed in Parliament as of 15 Oct 2026; kept out of the scored numbers, made prominent in summary/important_exceptions); added Budapest rent sample (Tower Budapest).
- 2026-10-15: editorial decision to score the draft wealth tax PRO FORMA (as if enacted): 1% on net worldwide wealth above HUF 1bn and 1.5% above HUF 100bn per the 6 Oct 2026 consultation draft. The law in force in 2026 still has no wealth tax; the JSON wealth_tax metric carries basis "pro_forma_draft".
- 2026-10-15: added structure regime `asset_management_foundation` (0% on financial-instrument income, 15% on distributions under the rules in force from 31 Aug 2026, draft wealth tax pro forma with the foundation as a separate taxpayer) and a Holding structures section.
- 2026-10-15: pro-forma wealth tax now applies both spouses' HUF 1bn allowances (HUF 2bn) for the married reference couple, consistent with the draft.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
