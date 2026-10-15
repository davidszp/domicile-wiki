# Indonesia — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Indonesia taxes residents on worldwide income at up to 35%. That rate applies to gains on foreign shares and to foreign dividends, unless the reinvestment-in-Indonesia exemptions apply. Indonesian listed shares bear only a 0.1% tax on sale proceeds, and Indonesian dividends a 10% final tax. Foreign experts can be taxed only on Indonesian income for four years, but that needs qualifying work. There is no inheritance, gift or wealth tax. A golden visa exists for large investors (thresholds not verified).

US citizens: US citizens pay US tax on top; the Indonesia-US treaty (1988) gives credits.

## Residence and eligibility

Resident if residing in Indonesia, present more than 183 days in any 12-month period, or present during a fiscal year with intent to reside. Treaty tie-breakers apply.

- **Golden Visa (investor) and other KITAS/KITAP permits** (EU, US, OTHER): Indonesia introduced a golden visa for investors in 2023 with 5- and 10-year terms and investment thresholds in company investment or government bonds (amounts not verified). Retirement and second-home visas also exist (not researched).

## Capital gains

### Indonesian tax resident (`standard`)

Residents are taxed on worldwide income. Capital gains are ordinary income at the progressive rates (5%-35%; 35% above IDR 5 billion), except sales of shares on the Indonesia Stock Exchange (0.1% final tax on proceeds) and transfers of land and buildings (2.5% final tax on the gross transfer value). Gains on foreign listed shares are therefore taxed at up to 35%, with a foreign tax credit.

- **Exemptions and thresholds:** None for securities. Gains from mutual funds are exempt (PwC).
- **Important exceptions, statute references and announced changes:** Foreign experts who become resident may elect to be taxed only on Indonesian-source income for their first four years (Omnibus Law; special regime, needs qualifying skills). Founder shares on IPO: optional 0.5% on listing value.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 35% (0.35); listed domestic 0.2% (0.002); listed foreign 35% (0.35); private business sale 35% (0.35); local real estate 5% (0.05); foreign real estate 35% (0.35).
- **How derived:** Foreign shares, private company shares and foreign property: top progressive rate 35%. Proceeds-based final taxes converted to a rate on the gain assuming the gain is half of the proceeds: IDX shares 0.1% of proceeds -> 0.2% of the gain; Indonesian land and buildings 2.5% of gross value -> 5% of the gain.
- **Holding period:** None.
- **Trader recharacterisation:** Trading as a business is taxed as business income at progressive rates; IDX sales remain under the 0.1% final tax.
- **Foreign assets:** Worldwide taxation with credit for foreign tax (per-country limit; not detailed by PwC).

### Foreign expert: Indonesian-source taxation (4 years) (`foreign_expert_territorial`)

Foreign gains are not taxed for the first four years; Indonesian gains as standard.

- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 35% (0.35); listed domestic 0.2% (0.002); listed foreign 0% (0.0); private business sale 35% (0.35); local real estate 5% (0.05); foreign real estate 0% (0.0).
- **How derived:** Foreign-source gains 0; Indonesian-source as standard.

## Dividends

### Indonesian tax resident (`standard`)

Dividends from Indonesian companies bear a 10% final tax, or none if the resident individual reinvests them in Indonesia within the prescribed period. Foreign dividends are taxed at the progressive rates up to 35% with credit for foreign tax, unless they qualify for the reinvestment exemption for foreign dividends introduced by the 2020/2021 tax laws (not verified).

- **Important exceptions, statute references and announced changes:** Foreign dividends: exemption if invested in Indonesia within a set period (for listed foreign companies the dividend itself; for unlisted, at least 30% of after-tax profit) under the Omnibus/HPP amendments to Income Tax Law Art. 4(3) (general knowledge, not verified).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 35% (0.35); domestic 10% (0.1); foreign gross 35% (0.35); foreign tax relief: credit.
- **How derived:** Domestic: 10% final (0 if reinvested in Indonesia). Foreign: top progressive rate 35% before credit, assuming no reinvestment in Indonesia.
- **Outbound withholding:** 20% WHT on dividends to non-residents, reducible by treaty (corporate summary; not opened).
- **Treaty network:** Around 70 treaties including the US and most EU states (count not verified; PwC treaty page opened).
- **Holding companies:** CIT 22%; foreign dividends received by Indonesian companies exempt if reinvested (not verified).

### Foreign expert: Indonesian-source taxation (4 years) (`foreign_expert_territorial`)

Foreign dividends are not taxed for the first four years; Indonesian dividends 10% final as standard.

- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 10% (0.1); domestic 10% (0.1); foreign gross 0% (0.0); foreign tax relief: exemption.
- **How derived:** Foreign-source dividends 0; domestic 10% final.

## Inheritance and gifts to children

### Indonesian tax resident (`standard`)

Indonesia has no inheritance, estate or gift tax. Property acquired by gift is exempt income for the recipient (PwC lists it as exempt; under the Income Tax Law the exclusion covers gifts between direct-line relatives of one degree), and undivided inheritances are not income. The heir pays land and building acquisition duty (BPHTB, up to 5% above a regional threshold that starts at IDR 300 million for inheritances) on Indonesian real estate.

- **Important exceptions, statute references and announced changes:** BPHTB on inherited Indonesian property is not reflected in other_transfer_cost_rate because the family's estate is mostly securities; foreigners can hold only use rights (Hak Pakai) to land.
- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **JSON numbers:** basis `none`, children `fully_exempt`, scope `worldwide`, exemption 0 IDR, brackets (marginal): none; other transfer costs 0% (0.0); deemed disposal 0% (0).
- **Gifts:** No gift tax; gifts to children are excluded from the recipient's income. BPHTB up to 5% applies to transfers of Indonesian land and buildings, including by gift and inheritance. (same as inheritance: True; tax-free after years: None)
- **Foreign assets:** No tax.
- **Residence/domicile rules:** Not applicable.
- **Business relief covers listed shares:** False

### Foreign expert: Indonesian-source taxation (4 years) (`foreign_expert_territorial`)

Same as the standard regime.

## Wealth tax

### Indonesian tax resident (`standard`)

No net wealth tax.

- **Tax year / confidence / verification:** 2026 / high / partially_verified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** Land and buildings tax (PBB) annually at up to 0.5% of the government-determined value; BPHTB acquisition duty up to 5% on purchases; 2.5% final tax for the seller.

### Foreign expert: Indonesian-source taxation (4 years) (`foreign_expert_territorial`)

Same as the standard regime.

## Special regimes

### Foreign expert: Indonesian-source taxation (4 years) (`foreign_expert_territorial`)

Foreigners who become resident and meet skill requirements are taxed only on Indonesian-source income for their first four years of residence.

- **Eligible citizenships:** EU, US, OTHER
- **Eligibility:** Foreign national who becomes tax resident and has qualifying expertise/skills (implemented by regulation; requires work in Indonesia). Not available where a treaty is used for foreign income.
- **Duration (years):** 4
- **Requires qualifying activity:** True

## Company taxation (kept separate from personal tax)

Headline CIT rate: 22% (0.22). 22% flat CIT; 19% for listed companies meeting a 40% free-float test; small-business reductions. Worldwide taxation of resident companies.
Special zones/regimes: Special Economic Zones and tax holidays for pioneer industries (not researched).

## Cost of living notes

Not researched in this pass (no quickly verifiable sources).

## Open questions

- Only PwC was opened; Income Tax Law (as amended by the Omnibus Law and the HPP Law) not read.
- Golden visa investment thresholds not verified.
- (standard.dividends) Conditions of the foreign dividend reinvestment exemption were not read from the law or regulations.

## Sources

- Indonesia - Individual - Income determination (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/indonesia/individual/income-determination
- Indonesia - Individual - Other taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/indonesia/individual/other-taxes
- Indonesia - Individual - Taxes on personal income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/indonesia/individual/taxes-on-personal-income
- Indonesia - Individual - Foreign tax relief and tax treaties (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/indonesia/individual/foreign-tax-relief-and-tax-treaties
- Indonesia - Individual - Residence (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/indonesia/individual/residence
- Indonesia - Corporate - Taxes on corporate income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/indonesia/corporate/taxes-on-corporate-income

## Change log

- 2026-10-15: initial research.
