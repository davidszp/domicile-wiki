# China — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

China taxes residents on worldwide income, with capital gains and dividends at a flat 20%. Gains on China-listed A-shares and dividends on listed shares held over a year are exempt for individuals. Foreigners resident for fewer than six consecutive years pay tax on foreign income only when it is paid or borne in China, and one absence of more than 30 consecutive days resets the count. There is no inheritance, gift or wealth tax. Permits for a non-working investor family are hard to obtain.

US citizens: US citizens pay US tax on top; the China-US treaty (1984) gives credit relief. Under the six-year rule Chinese tax on foreign income is nil, so the US layer is the full cost on foreign investment income.

## Residence and eligibility

Resident if domiciled in China (habitual residence through household registration, family or economic ties) or present 183 days or more in a calendar year. Foreigners with 183+ days are taxed on foreign income only when paid or borne in China until six consecutive such years have passed; one absence of more than 30 consecutive days in any year resets the count.

- **Work, business or family residence permit; permanent residence** (EU, US, OTHER): No residence-by-investment programme for passive investors was found. Residence permits are tied to employment, business, study or family. Foreigners' permanent residence (green card) is possible for high-level investors and talent under national rules (thresholds not verified).

## Capital gains

### Chinese tax resident (worldwide) (`standard`)

Resident individuals pay individual income tax (IIT) at a flat 20% on 'income from the transfer of property', which covers gains on securities, shares, real estate and partnership interests, computed as proceeds less cost and reasonable expenses. Gains on foreign listed securities of a resident taxed on worldwide income are therefore taxed at 20%, with a credit for foreign tax on the same category of income. Gains on A-shares listed in China are exempt for individuals under a long-standing State Council/MOF concession (not re-verified in this pass).

- **Exemptions and thresholds:** No annual allowance. Individuals selling a residence are exempt from land appreciation tax (PwC); the IIT exemption for selling a family's only home held 5+ years exists but was not verified.
- **Important exceptions, statute references and announced changes:** Foreigners resident for fewer than six consecutive years (183-day years) pay tax on foreign-source income only to the extent it is paid or borne by a Chinese entity or individual (six-year rule, modelled as a special regime). China has stepped up enforcement of IIT on residents' overseas investment income since 2025 using CRS data (general knowledge, not verified).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 20% (0.2); listed domestic 0% (0.0); listed foreign 20% (0.2); private business sale 20% (0.2); local real estate 20% (0.2); foreign real estate 20% (0.2).
- **How derived:** Flat 20% IIT on property-transfer income (PwC: 'a flat rate of 20% is applied on ... capital gains, unless specifically reduced by the State Council'). Domestic listed shares 0: the individual exemption for gains on China-listed A-shares (not in the PwC text; widely documented, not re-verified). Local real estate 20% of the gain (some localities assess a deemed 1-3% of proceeds when cost cannot be proven). No holding-period relief.
- **Holding period:** None for the 20% IIT rate.
- **Trader recharacterisation:** Individuals carrying on a business (sole proprietorship, partnership) are taxed on business income at 5%-35%; frequent dealing by a private investor is normally still treated as property-transfer income (not verified).
- **Foreign assets:** Worldwide taxation for domiciled individuals and for foreigners from the seventh consecutive 183-day year; credit for foreign tax limited to the Chinese tax on the same category of income from the same country, excess carried forward 5 years.

### Foreign resident within the six-year rule (`foreigner_six_year_rule`)

Gains on foreign securities and foreign real estate are foreign-source income; when not paid or borne by a Chinese entity or individual they are not taxed during the six-year period. Chinese-source gains are taxed as in the standard regime.

- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 20% (0.2); listed domestic 0% (0.0); listed foreign 0% (0.0); private business sale 20% (0.2); local real estate 20% (0.2); foreign real estate 0% (0.0).
- **How derived:** Foreign-source gains 0 under the six-year concession; Chinese-source items as standard (private business sale assumed to be a Chinese company, 20%).
- **Foreign assets:** Foreign-source income exempt unless paid or borne in China.

## Dividends

### Chinese tax resident (worldwide) (`standard`)

Dividends are taxed at a flat 20% on the gross amount, without deductions. Foreign dividends of a resident taxed on worldwide income are taxed at 20% with a credit for foreign withholding tax, limited per country and per income category. Dividends from China-listed companies are exempt for individuals who hold the shares for more than one year (differentiated rule: 10% for 1 month to 1 year, 20% for up to 1 month; not re-verified).

- **Important exceptions, statute references and announced changes:** Six-year rule for foreigners (special regime): foreign dividends not paid or borne by a Chinese payer are not taxed during the first six consecutive resident years.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 20% (0.2); domestic 0% (0.0); foreign gross 20% (0.2); foreign tax relief: credit.
- **How derived:** Flat 20% IIT on dividends (PwC). Domestic rate 0 = listed A-share dividends held longer than one year (widely documented exemption, not re-verified); unlisted Chinese company dividends bear 20%. Foreign: 20% before credit for source-country WHT (US treaty rate 10% would leave 10% Chinese tax).
- **Outbound withholding:** 10% WHT on dividends paid to non-resident enterprises, reducible by treaty; dividends paid to foreign individuals from foreign-invested enterprises have been exempt under a 1994 notice (not verified).
- **Treaty network:** 114 treaties/arrangements as of 30 June 2026, including the US and most EU states (PwC).
- **Holding companies:** Resident enterprises pay 25% CIT; dividends between resident enterprises are exempt. Holding through a company is not assumed.

### Foreign resident within the six-year rule (`foreigner_six_year_rule`)

Foreign dividends are not taxed during the six-year period unless paid or borne by a Chinese entity or individual; Chinese dividends as in the standard regime. Source-country withholding is the final cost.

- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 20% (0.2); domestic 0% (0.0); foreign gross 0% (0.0); foreign tax relief: exemption.
- **How derived:** Foreign dividends 0 (six-year concession); domestic as standard.
- **Treaty network:** 114 treaties/arrangements (PwC).

## Inheritance and gifts to children

### Chinese tax resident (worldwide) (`standard`)

China has no inheritance, estate or gift tax. Gifts of real property can attract deed tax (3%-5%, paid by the recipient) and, for non-family recipients, 20% IIT on the recipient; transfers between parents and children are generally exempt from IIT (not verified in this pass).

- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **JSON numbers:** basis `none`, children `fully_exempt`, scope `worldwide`, exemption 0 CNY, brackets (marginal): none; other transfer costs 0% (0.0); deemed disposal 0% (0).
- **Gifts:** No gift tax. Deed tax may apply to gifts of Chinese real estate; transfers of real estate to direct relatives are generally exempt from IIT (not verified). (same as inheritance: True; tax-free after years: None)
- **Foreign assets:** Not taxed.
- **Residence/domicile rules:** Not applicable.
- **Business relief covers listed shares:** False

### Foreign resident within the six-year rule (`foreigner_six_year_rule`)

Same as the standard regime.

## Wealth tax

### Chinese tax resident (worldwide) (`standard`)

No net wealth tax.

- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** Real estate tax of 1.2% of original value (or 12% of rent) applies to business or rented property; individuals' non-business homes are exempt nationally. Shanghai and Chongqing run pilot residential property taxes on some newly bought homes (0.4%-1.2%; not verified). Deed tax 3%-5% on purchases.

### Foreign resident within the six-year rule (`foreigner_six_year_rule`)

Same as the standard regime.

## Special regimes

### Foreign resident within the six-year rule (`foreigner_six_year_rule`)

Foreign individuals resident (183+ days) for fewer than six consecutive years are taxed on foreign-source income only when it is paid or borne by a Chinese entity or individual.

- **Eligible citizenships:** EU, US, OTHER
- **Eligibility:** Non-China-domiciled foreign individual present 183+ days a year. A filing with the tax authority is generally required to use the concession (not verified).
- **Duration (years):** None — The six-year count resets whenever the individual spends more than 30 consecutive days outside China in a tax year (PwC Residence), so a family taking one long trip abroad at least every six years keeps the concession indefinitely.
- **Requires qualifying activity:** False

## Company taxation (kept separate from personal tax)

Headline CIT rate: 25% (0.25). 25% CIT on worldwide income of resident enterprises; 15% for qualifying high/new-tech enterprises and in encouraged-industry zones (Hainan Free Trade Port, Western Regions, Qianhai, Hengqin and others); 5% effective rate on the first CNY 3 million for small low-profit enterprises to 2027. No local income tax.
Special zones/regimes: Hainan Free Trade Port (15% CIT to 2027 for encouraged enterprises; also a 15% IIT cap for qualifying talent on comprehensive and business income, not on investment income).

## Cost of living notes

Not researched in this pass (no quickly verifiable sources).

## Open questions

- PwC is the only source opened; the IIT Law and MOF/STA notices on A-share gains and listed dividends were not read.
- Practical residence routes for a non-working investor family were not verified.
- (standard.capital_gains) The A-share capital-gains exemption for individuals was not read from the MOF/STA notice in this pass.
- (standard.dividends) Listed-dividend holding-period exemption (Caishui [2015] No. 101) not read from source.
- (standard.inheritance) An inheritance tax has been discussed in China for years; no law in force (PwC: 'at present, there are no inheritance, estate, or gift taxes').

## Sources

- China, People's Republic of - Individual - Taxes on personal income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/peoples-republic-of-china/individual/taxes-on-personal-income
- China, People's Republic of - Individual - Income determination (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/peoples-republic-of-china/individual/income-determination
- China, People's Republic of - Individual - Residence (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/peoples-republic-of-china/individual/residence
- China, People's Republic of - Individual - Other taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/peoples-republic-of-china/individual/other-taxes
- China, People's Republic of - Individual - Foreign tax relief and tax treaties (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/peoples-republic-of-china/individual/foreign-tax-relief-and-tax-treaties
- China, People's Republic of - Corporate - Taxes on corporate income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/peoples-republic-of-china/corporate/taxes-on-corporate-income

## Change log

- 2026-10-15: initial research.
- 2026-10-15: six-year rule scored as a 6-year regime (not indefinite): the reset requires repeated 30-day absences, incompatible with the tool's two-generation (60-year) residence assumption.
