# Luxembourg — family-office tax dossier

Last reviewed: 2026-10-16
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Luxembourg does not tax a resident's gains on shares and bonds held longer than six months, provided the holding is not a 'material interest' (more than 10% of a company within the last five years). Dividends from qualifying (EU, Luxembourg and treaty-country) companies are 50% exempt, giving a top rate of about 22.9%; other investment income is taxed at up to 45.78%. There is no wealth tax for individuals (abolished 2006). Children who inherit their legal share from a Luxembourg-resident parent pay no inheritance tax; only amounts above the legal share are taxed (2.5%/5% plus surcharges). Notarial gifts to children cost 1.8% registration duty, while hand-to-hand gifts of movables (e.g. securities transfers) are not registered and not taxed unless the donor dies in the same year.

## Residence and eligibility

Resident if the person has an effectively used abode in Luxembourg or stays more than six consecutive months (also across two years or with short absences).

- **EU/EEA/Swiss free movement** (EU): Declaration of arrival at the commune; registration certificate after three months.
- **Residence permit for investors or private reasons** (US, OTHER): Luxembourg offers a residence permit for investors (investment in a Luxembourg company, a new business, or a large deposit in a Luxembourg financial institution) and a permit for private reasons for people with sufficient resources. Thresholds were not verified in this session.

Standard regime eligibility: Habitual abode (an effectively used home) in Luxembourg, or a stay of more than six consecutive months. Non-EU citizens need a residence permit.

## Capital gains

Gains on shares, bonds and other movable assets held more than six months are tax-free unless the seller holds a material interest (more than 10% of the company, alone or with household, at any time in the five years before the sale). Gains within six months are speculative and taxed at progressive rates up to 45.78% (if total speculative gains exceed EUR 500 a year). A material interest sold after six months is taxed at half the average rate, at most 22.89%. Real estate (not the main home) sold within five years is taxed at progressive rates; after five years at half the global rate (at most 22.89%), after an allowance of up to EUR 50,000 per 10 years (doubled for couples).

JSON values: headline rate 45.78% (`0.4578`); listed securities domestic 0% (`0.0`), foreign 0% (`0.0`); private business sale 22.89% (`0.2289`); local real estate 22.89% (`0.2289`); foreign real estate 22.89% (`0.2289`).

- **How the JSON numbers were derived:** Top income tax rate 42% (from EUR 234,870 taxable income, 2025 scale) x 1.09 solidarity surcharge = 45.78% headline (short-term gains). Listed securities held over six months and below 10%: exempt (0). Material interest held over six months: half the global rate, capped at 22.89%. Real estate held over five years: half the global rate, top 22.89% (before the allowance). Foreign real estate: Luxembourg's rate shown; most treaties give the situs country the right to tax and Luxembourg exempts with progression.
- **Holding periods:** Movable assets: six months. Real estate: five years (two years before 2025).
- **Professional-trader risk:** Frequent short-term trading, leverage and derivatives raise the risk of being treated as carrying on a business, making all gains taxable at progressive rates. Administrative guidance for individuals is limited; a ruling can be sought.
- **Foreign assets:** Worldwide taxation; foreign securities treated like domestic ones.
- **Exemptions and thresholds:** Speculative gains below EUR 500 a year exempt. Main residence exempt. Real estate allowance EUR 50,000 per 10 years (EUR 100,000 for jointly taxed couples), plus up to EUR 75,000 for property inherited in the direct line.
- **Eligibility conditions:** Private investor holding below 10% of each company and holding more than six months.
- **Regional differences:** None.
- **Important exceptions / announced changes:** The speculative period for real estate was extended from two to five years for sales after 2024. Derivatives settled in cash and frequent short-term trading are likely taxed as speculative or business income. A former non-resident who becomes resident: material-interest gains are computed from market value on arrival only in specific cases (not verified). No exit tax for individuals on private portfolios.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Luxembourg - Individual - Income determination](https://taxsummaries.pwc.com/luxembourg/individual/income-determination); [Luxembourg - Individual - Taxes on personal income](https://taxsummaries.pwc.com/luxembourg/individual/taxes-on-personal-income)

## Dividends

Dividends are taxed at progressive rates, but half of the dividend is exempt if paid by a fully taxable Luxembourg company, an EU company covered by the Parent-Subsidiary Directive, or a company resident in a treaty country and subject to comparable tax. At the top rate that is 22.89%. Other dividends are taxed in full (up to 45.78%). A EUR 1,500 investment income deduction applies (EUR 3,000 for couples). Luxembourg companies withhold 15%, which is credited.

JSON values: headline 22.89% (`0.2289`); domestic 22.89% (`0.2289`); foreign gross 22.89% (`0.2289`); foreign tax relief: credit.

- **How the JSON numbers were derived:** 45.78% top rate x 50% taxable = 22.89% on qualifying dividends (domestic and treaty-country companies). Foreign withholding tax is credited against Luxembourg tax on that income, within treaty limits; with a 15% foreign withholding the extra Luxembourg tax is about 7.9 points.
- **Outbound withholding:** 15% on dividends paid by Luxembourg companies (0% under the participation exemption or to EU parent companies; reduced by treaty). No withholding on interest or liquidation proceeds. SPFs and investment funds do not withhold.
- **Treaty network:** About 85 income tax treaties, including the US and all EU states.
- **Holding-company notes:** Soparfi (ordinary company): 23.87% combined rate in Luxembourg City (2025/2026), full participation exemption for holdings of at least 10% or EUR 1.2 million held 12 months, 0.5% net wealth tax at company level. SPF (family wealth management company): exempt from income tax, 0.25% subscription tax on paid-up capital plus share premium (minimum EUR 1,000 from 2025, maximum EUR 125,000 a year), no treaty access, passive holding only. No structure is modelled: a resident already pays 0% on portfolio gains held over six months and about 22.9% on dividends, while a Soparfi pays 23.87% on portfolio gains and dividends plus 0.5% net wealth tax, and an SPF costs 0.25% a year (EUR 75,000 on EUR 30 million), loses treaty relief, and its distributions are fully taxable at up to 45.78% without the 50% exemption. Both vehicles are now modelled as regimes: spf (the one such families use for a portfolio) and, rejected, Soparfi (see Holding structures).
- **Exemptions and thresholds:** EUR 1,500 investment income deduction (doubled for jointly taxed couples); 50% exemption for qualifying dividends. Interest paid by Luxembourg paying agents bears a final 20% withholding (relibi).
- **Eligibility conditions:** Payer must be a qualifying company as described.
- **Regional differences:** None.
- **Important exceptions / announced changes:** Dividends from companies in non-treaty or low-tax countries, and fund distributions, do not get the 50% exemption.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [Luxembourg - Individual - Income determination](https://taxsummaries.pwc.com/luxembourg/individual/income-determination); [Luxembourg - Individual - Taxes on personal income](https://taxsummaries.pwc.com/luxembourg/individual/taxes-on-personal-income)

## Inheritance and gifts to children

Inheritance tax applies only if the deceased was a Luxembourg resident (domicile and centre of activities); the heirs' residence does not matter. Children are exempt on their legal share of the estate. Anything a child receives above the legal share (through a will) is taxed at 2.5%, and the surplus at 5%, with surcharges when the taxable portion exceeds EUR 10,000. A family that divides the estate equally among the three children pays nothing. Spouses are exempt.

JSON values: basis `beneficiary`, bracket mode `marginal`, children `exempt_with_conditions`, exemption EUR 0, marginal brackets above the exemption: none; other transfer costs 0% (`0`); gifts same as inheritance: False; tax-free after years: None.

- **Gifts:** Gifts by notarial deed bear registration duty on market value: 1.8% for gifts to children that count as an advance on the inheritance, 2.4% for gifts outside the share; plus 1% register fee for Luxembourg real estate (and a 50% surtax in Luxembourg City on real estate other than single-family homes). Hand-to-hand gifts of movables need no deed and are not taxed unless the donor dies in the same calendar year.
- **Business relief:** Not needed for direct-line legal shares. Covers listed portfolios: no.
- **Foreign assets:** Worldwide estate of a resident decedent within scope; for non-residents only Luxembourg real estate.
- **Domicile / residence rules:** Depends only on the deceased's residence (domicile and centre of activities in Luxembourg). The heir's residence is irrelevant for inheritance tax; for gift duty the parties' residence is irrelevant and duty arises when a deed is registered in Luxembourg.
- **Exemptions and thresholds:** Direct line: legal share 0%. Estates below EUR 1,250 exempt.
- **Eligibility conditions:** Exemption applies to the legal (intestate) share of each child. Non-resident decedents: only Luxembourg real estate is taxed (transfer duty at the same rates); Luxembourg bank accounts and securities of a non-resident are not taxed.
- **Regional differences:** None.
- **Important exceptions / announced changes:** Bequests to children above their legal share: 2.5% / 5% base rates multiplied by surcharges (up to 2.2x) for larger portions; the official page gives an example of a 140% increase. Foreign real estate and movables are taxed with reference to the deceased's citizenship rules (PwC).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **Sources:** [How to calculate taxes on an inherited estate](https://guichet.public.lu/en/citoyens/fiscalite/heritage-donation/succession/droits-succession-heritage.html); [Making a gift or donation](https://guichet.public.lu/en/citoyens/fiscalite/heritage-donation/donation/faire-donation.html); [Luxembourg - Individual - Other taxes](https://taxsummaries.pwc.com/luxembourg/individual/other-taxes)
- Surviving spouse (`spouse_treatment` `fully_exempt`): Surviving spouse pays 0% on the legal and extra-legal share (guichet.public.lu); a partner under a partnership declaration needs 3 years' registration.

## Wealth tax

No wealth tax for individuals, resident or non-resident, since 1 January 2006. (Companies pay net wealth tax.)

JSON type: `none`.

- **Property tax (not a wealth tax):** Municipal property tax on the old unitary value (assessment rate 0.7%-1% x communal multiplier 200%-800%); low in practice. A property tax reform is under discussion.
- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **Sources:** [Luxembourg - Individual - Other taxes](https://taxsummaries.pwc.com/luxembourg/individual/other-taxes)

## Special regimes

None modelled; see the summary and open questions for regimes considered and rejected.

## Holding structures

**Modelled: family wealth management company (SPF), regime `spf`, type `structure`.** A Luxembourg resident already pays nothing on portfolio gains held more than six months (below 10% stakes) and about 22.9% on dividends after the 50% exemption, so the SPF is scored as an alternative, not an improvement by default.

- **Entity:** a company whose sole purpose is to acquire, hold, manage and sell financial assets for individuals managing their private wealth (loi du 11 mai 2007, art. 1-3). Shares may be held only by such individuals, their private wealth entities or intermediaries (art. 3); it needs a company form (S.A., S.à r.l., S.C.A.). It cannot own real estate directly, grant interest-bearing loans or list its shares. Status is lost only for a breach not remedied within six months (2025 reform, Bill 8414); fines up to EUR 250,000 apply for non-qualifying investors or unauthorised activity.
- **Gains and dividends in the SPF:** exempt from income tax, municipal business tax and net wealth tax (art. 4(1)). JSON: gains 0 on listed securities and private business; real estate null; dividends 0 with foreign tax credit `exemption`. The exemption is lost for a year if 5% or more of its dividends come from non-resident unlisted companies not subject to a comparable income tax (art. 4(2)); a listed portfolio does not trigger this.
- **No treaty access:** an SPF cannot use Luxembourg's tax treaties or the EU parent-subsidiary directive, so foreign withholding is levied at the source country's domestic rate and is a final cost (for example US dividends bear 30% instead of the 15% treaty rate; the 30% is the general US rule, no source on the SPF's US treatment was opened). A 2025 circular lets an SPF obtain a domestic residence certificate under conditions, but this gives no treaty access (DLA Piper).
- **Subscription tax (annual running cost):** 0.25% (art. 5(1)) of paid-up capital plus share premium, plus any debt above eight times that sum, measured on 1 January; minimum EUR 1,000 and maximum EUR 125,000 a year from 2025. JSON `annual_running_cost` EUR 75,000, on EUR 30,000,000 contributed as capital and premium. The base is the amount endowed, not the market value. Accounting, domiciliation and the annual certificate (due by 31 July) are further costs, not priced by any source found. Set-up cost is null.
- **Payout:** dividends paid by an SPF bear no Luxembourg withholding tax (art. 147 no. 3 LIR), but resident individuals are taxed at progressive rates and the 50% exemption of art. 115 no. 15a LIR does not apply (Administration des contributions directes). `payout_tax_rate` 0.4578 (42% plus the 9% solidarity surcharge); the EUR 1,500 deduction (EUR 3,000 for couples) is ignored. Interest paid by an SPF to a resident individual bears the final 20% withholding (relibi).
- **Exit and liquidation:** a resident who sells SPF shares held above 10% realises a gain on a material interest, taxed at half the average rate, at most 22.89% after six months (PwC; applied to SPF shares by analogy, not checked for the SPF). Liquidation proceeds were not researched. Withdrawal of SPF status makes the company fully taxable from the notification of the decision (DLA Piper).
- **Soparfi, considered and not added:** 23.87% on portfolio dividends and gains unless the holding is at least 10% or cost at least EUR 1.2 million (EUR 6 million for gains) held 12 months, plus 0.5% net wealth tax on its net assets (about EUR 150,000 a year on EUR 30 million); distributions are taxed again. Clearly worse than direct holding.

## Company taxation (kept separate from personal tax)

Headline CIT rate in JSON: 23.87% (`0.2387`).

Corporate income tax 16% (14% below EUR 175,000) plus 7% solidarity surtax plus 6.75% municipal business tax in Luxembourg City = 23.87% combined (from tax year 2025; 24.94% before). Participation exemption for holdings of at least 10% or EUR 1.2 million (EUR 6 million for gains) held 12 months. Companies pay 0.5% net wealth tax. Pillar Two applies to large groups.

Special zones: SPF family wealth company: no income tax, 0.25% subscription tax, passive holding only.

## Cost of living notes

Luxembourg City.

- Prime family rent: EUR 5,300/month, the median of 15 distinct houses with 4+ bedrooms for rent in Luxembourg City on
  athome.lu on 15 October 2026 (range EUR 3,200-8,900; mostly 150-315 m² in Belair, Merl, Limpertsberg and
  Gasperich). Asking rents excluding charges.
- International school: International School of Luxembourg, Grades 9-12, EUR 24,226 a year for 2026-2027
  (tuition 22,180 + reserve 1,696 + growth 350); application EUR 300 and registration EUR 3,000 once.
- Not sourced: price per m², family health insurance, housekeeper.

## Open questions

- Impatriate regime (reformed from 1 January 2025: 50% exemption of salary up to EUR 400,000, minimum base salary EUR 75,000) applies only to employment income and is not modelled as a special regime.
- A single tax class reform is expected from tax year 2028 (PwC); not in force.
- 2026 income tax brackets: PwC shows the 2025 indexed scale; any 2026 indexation was not confirmed.
- Investor residence permit thresholds not verified (guichet.lu page not found).
- (standard / capital_gains) Only a professional source (PwC, reviewed 3 August 2026) was opened; the income tax law (LIR arts. 99bis, 99ter, 100) was not re-read.
- (standard / capital_gains) Treatment of material-interest gains for newly arrived residents (step-up of acquisition cost) not verified.
- (standard / dividends) The exact list of qualifying payers for the 50% exemption (art. 115 no. 15a LIR) was not re-read in the statute; circular L.I.R. 115/8 (2008) confirms it covers fully taxable resident companies, EU parent-subsidiary companies and companies resident in a treaty state, and that foreign tax is credited up to the Luxembourg tax on that income. Whether US companies meet the 'comparable tax' test depends on practice.
- (spf / dividends) The US rate of 30% for an SPF is the general US rule for a non-treaty foreign corporation; no source on the SPF's US treatment was opened.
- Structure added 2026-10-16: the SPF regime. The Soparfi was considered and not added. The SPF's running cost (EUR 75,000) is the subscription tax only; set-up cost is null.
- (standard / inheritance) The guichet.lu inheritance page was last updated in 2019 and the gift page says it is being updated; confirm current rates with the AED.
- (standard / inheritance) The full surcharge scale for amounts above the legal share is on the AED portal and was not opened.
- (standard / inheritance) Whether a hand-to-hand transfer of a securities account is reliably outside registration duty should be confirmed with a Luxembourg notary; PwC says such gifts attract no tax unless the donor dies in the same civil year.

US citizens: US-Luxembourg income tax treaty applies; there is no estate tax treaty. Luxembourg's 0% on long-term gains means US citizens pay full US capital gains tax with no foreign credit. Non-US funds and SPFs raise PFIC/CFC issues.

## Sources

- [Luxembourg - Individual - Income determination](https://taxsummaries.pwc.com/luxembourg/individual/income-determination) — PwC Worldwide Tax Summaries (professional)
- [Luxembourg - Individual - Taxes on personal income](https://taxsummaries.pwc.com/luxembourg/individual/taxes-on-personal-income) — PwC Worldwide Tax Summaries (professional)
- [Luxembourg - Individual - Other taxes](https://taxsummaries.pwc.com/luxembourg/individual/other-taxes) — PwC Worldwide Tax Summaries (professional)
- [How to calculate taxes on an inherited estate](https://guichet.public.lu/en/citoyens/fiscalite/heritage-donation/succession/droits-succession-heritage.html) — Guichet.lu (Luxembourg government) (government)
- [Making a gift or donation](https://guichet.public.lu/en/citoyens/fiscalite/heritage-donation/donation/faire-donation.html) — Guichet.lu (Luxembourg government) (government)
- [Luxembourg - Individual - Residence](https://taxsummaries.pwc.com/luxembourg/individual/residence) — PwC Worldwide Tax Summaries (professional)
- [Luxembourg - Corporate - Taxes on corporate income](https://taxsummaries.pwc.com/luxembourg/corporate/taxes-on-corporate-income) — PwC Worldwide Tax Summaries (professional)
- [athome.lu: houses with 4+ bedrooms for rent in Luxembourg City (listing sample)](https://www.athome.lu/en/rent/house/luxembourg?bedrooms_min=4) — athome.lu (other)
- [International School of Luxembourg: Schedule of School Fees 2026-2027](https://resources.finalsite.net/images/v1790691772/luxembourg/luxembourg/seboyxoq1izby0lqtdpr/SchoolFeesBrochure_26-27.pdf) — International School of Luxembourg (other)
- [Circulaire L.I.R. n° 115/8 du 15 décembre 2008 (art. 115 n° 15a, imputation des impôts étrangers)](https://impotsdirects.public.lu/dam-assets/fr/legislation/legi08/L_I_R__n___115-8_du_15_d__cembre_2008.pdf) — Administration des contributions directes (tax_authority)
- [Transmettre au Luxembourg lors d'un décès](https://paperjam.lu/article/transmettre-au-luxembourg-lors) — Paperjam (professional)
- [Projet de loi n° 5954 relatif aux droits de succession et de mutation par décès (résumé)](https://wdocs-pub.chd.lu/docs/Dossiers_parlementaires/5954/20250514_Resume.docx) — Chambre des Députés (government)
- [Loi du 11 mai 2007 relative à la création d'une société de gestion de patrimoine familial (SPF), Mémorial A](https://data.legilux.public.lu/file/eli-etat-leg-loi-2007-05-11-n1-jo-fr-html.html) — Legilux (Journal officiel) (legislation)
- [Société de gestion de patrimoine familial (SPF) - A à Z](https://impotsdirects.public.lu/fr/az/s/spf.html) — Administration des contributions directes (tax_authority)
- [With every carrot comes a stick: Luxembourg tightens rules on its popular wealth management vehicle, the SPF](https://www.dlapiper.com/en/insights/publications/2025/03/with-every-carrot-comes-a-stick-luxembourg-tightens-rules-on-spf) — DLA Piper (professional)
- [SPF Luxembourg: Family Wealth Company, Tax & Restrictions](https://fiduciaire-expert.lu/en/articles/spf-luxembourg-family-wealth-company/) — Fiduciaire Expert (professional)
- [Luxembourg - Corporate - Other taxes](https://taxsummaries.pwc.com/luxembourg/corporate/other-taxes) — PwC Worldwide Tax Summaries (professional)
- [Subscription tax (taxe d'abonnement)](https://guichet.public.lu/en/entreprises/fiscalite/declaration/instruments-financiers/taxe-abonnement.html) — Guichet.lu (government)
- [Circulaire n° 823 SPF (changes to the SPF law from 1 January 2025)](https://pfi.public.lu/content/dam/pfi/pdf/circulaires/taxe-dabonnement/circulaire-n-823-spf.pdf) — Administration de l'enregistrement, des domaines et de la TVA (tax_authority)

## Change log

- 2026-10-15: initial research.
- 2026-10-15: added prime rent (athome.lu listing sample, EUR 5,300/month) and international school fee (ISL Grades 9-12, EUR 24,226, 2026-27) to cost of living.
- 2026-10-15: Holding structures section: no structure modelled (SPF/Soparfi worse than direct holding); SPF subscription-tax minimum EUR 1,000 and maximum EUR 125,000 verified.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
- 2026-10-16: added surviving-spouse treatment.
- 2026-10-16: added the `spf` structure regime (income-tax exempt, 0.25% subscription tax EUR 75,000 a year, no treaty access, payout 45.78%) and rewrote the Holding structures section; Soparfi considered and not added; circular L.I.R. 115/8 added for the 50% dividend exemption.
