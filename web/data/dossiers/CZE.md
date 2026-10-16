# Czech Republic — family-office tax dossier

Last reviewed: 2026-10-16
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Income Tax Act No. 586/1992 Coll. (ZDP). Gains on securities held more than 3 years are exempt, and from
2026 the exemption is uncapped for securities. Dividends: flat 15%. No inheritance tax; gifts from relatives
exempt. No wealth tax.

## Residence and eligibility

Resident with a permanent home in Czechia (owned or rented, intended for permanent living) or 183+ days in a
calendar year (PwC). EU citizens: free movement and registration. US/other: residence permit for a purpose
(business, employment, family); no investor-visa route found (not verified).

## Capital gains

- No separate CGT: gains are "other income" (§10 ZDP), taxed at 15%, 23% above CZK 1,762,812 (36x the
  average monthly wage, 2026).
- Exemptions (§4(1) ZDP): securities held > 3 years; stakes in companies not represented by a security
  (e.g. s.r.o.) held > 5 years; real estate held > 10 years if acquired from 2021 (5 years before; 2 years for
  a main residence); total securities proceeds up to CZK 100,000 a year.
- Not available for securities held as business assets (or within 3 years after removal from them).
- Cap: in 2025 exempt income from securities/stakes was capped at CZK 40m a year. From 1 January 2026 the
  cap applies only to crypto-assets (§4(3)) (law version effective 1.8.2026; PwC). The brief's "CZK 100m cap"
  was not found.
- Letters in the 2026 text: §4(1)(t) exempts total securities proceeds up to CZK 100,000 a year; §4(1)(u) exempts a security held more than 3 years. The 3 years are shortened by the time the deceased held the security when a spouse or direct-line relative inherited it (§4(1)(u)), so children who inherit can sell at once tax-free. No cap applies to securities (the CZK 40m cap in §4(3) names only crypto-assets).
- JSON: all long-term rates 0.0; `headline_rate = 0.23` (short-term gains at the top marginal rate).

Re-verified 2026-10-15 in the consolidated law text (version 157, effective 1.8.2026): §4(1) exempts gains on a security held more than 3 years (5 years for a kmenový list); the CZK 40m cap of §4(3) now covers only crypto-assets (§4(1)(zk)). §38v requires exempt income above CZK 5m to be reported to the tax office.

## Dividends

- Czech dividends: 15% final withholding. Foreign dividends: optional separate base at flat 15% (§8(8),
  §16a), foreign WHT credited up to the treaty rate; or the general base at 15%/23%.
- Outbound WHT: 15% (EU/EEA/treaty or information-exchange states), 35% others (PwC).
- JSON: `domestic_rate = foreign_gross_rate = 0.15`, `credit`.

## Inheritance and gifts to children

- No inheritance tax; inherited assets exempt from income tax (§4a(a) ZDP) for any heir.
- No gift tax; gifts are income but gifts from relatives in the direct and collateral line and spouses are
  exempt (§10(3)(c)(1) ZDP).
- JSON: `basis = none`, `children_treatment = fully_exempt`, `brackets = []`.

§38v reporting duty for exempt income above CZK 5m confirmed in the law text (2026-10-15).

## Wealth tax

None (PwC). Annual real estate tax on property held at 1 January is a municipal property tax. No real estate
transfer tax.

## Special regimes

None.

## Holding structures

No holding structure is scored for Czechia. Personally held listed securities are exempt after 3 years, uncapped from
2026. A Czech holding s.r.o. would instead pay:

- 21% CIT on portfolio gains;
- a 15% special rate on portfolio dividends, because the participation exemption needs at least 10% held 12 months
  (PwC Czech Republic, corporate income determination);
- another 15% on distributions.

It is worse than personal holding on every line, so the 3-year time test makes a company pointless for this family.

Trust fund and family foundation (checked in the law text 2026-10-16, consolidated ZDP effective 1.8.2026): a trust fund
(svěřenský fond, §17(1)(f)) and a family foundation (rodinná fundace, a nadace or nadační fond serving the founder or
close persons, defined in §17a(2)(f), which excludes it from public-benefit status) are corporate income taxpayers at 21%
(§21(1)). Distributions of their profit to an individual are capital income (§8(1)(i)) taxed at 15% (§36(2)(a)); property
the founder put in can come back without tax (§10(3)(c)(3)-(4)). The 3-year exemption of §4(1)(u) is for individuals, and
inheritance is already tax-free (§4a(a)), so neither vehicle can beat holding personally; they are used for control and
asset protection, not tax. Not scored. The corporate treatment of share gains inside these vehicles (no participation
exemption below a 10% stake) was read from PwC, not from the participation articles of the ZDP.

## Company taxation (kept separate from personal tax)

21% CIT for periods from 2024 (19% before). Participation exemption for qualifying dividends and share gains.

## Cost of living notes

City: Prague.
- Prime family-home rent (monthly): CZK 98,000 (2026). Median asking rent of 48 distinct houses/villas of 200-400 m² for rent in Prague's prime western and southern districts (Praha 6: Dejvice, Bubeneč, Střešovice, Nebušice, Vokovice, Veleslavín, Suchdol; Praha 5; Praha 4/Podolí/Braník), sampled from Sreality.cz on 15 Oct 2026 (range CZK 49,999-190,000; median of all 67 Prague listings in that size band CZK 85,000). Asking rents, utilities extra. Source: Pronájem domu od 200 m² do 400 m² Praha (listing search), https://www.sreality.cz/hledani/pronajem/domy/praha?plocha-od=200&plocha-do=400
- International school (annual, per child): CZK 831,000 (2026). International School of Prague, Grades 11-12, academic year 2026/27: tuition CZK 753,000 plus annual Capital Assessment Fee CZK 78,000. New students also pay a one-off Newcomers' Fee of CZK 52,000 and a CZK 9,000 application fee. Source: School Fees - Fees for the Academic Year 2026/27, https://www.isp.cz/admissions/school-fees

Prime purchase price per m², family health insurance and housekeeper cost were not sourced in this round and are omitted rather than guessed.

## Open questions

- The brief mentioned a CZK 100m annual cap introduced in 2025: not found. The law in force (version effective 1 Aug - 31 Dec 2026) shows the CZK 40m cap now only in §4(3) for crypto-assets; securities and company stakes are uncapped from 2026.
- Notary probate fees not quantified; treated as negligible.
- Any income tax changes announced by the government formed after the October 2025 election were not found in PwC (reviewed July 2026) or in the law version effective 1 Aug 2026.

## Sources

- Zákon č. 586/1992 Sb., o daních z příjmů (consolidated, effective 1.8.2026): https://www.zakonyprolidi.cz/cs/1992-586
- PwC, Czech Republic - Individual - Income determination: https://taxsummaries.pwc.com/czech-republic/individual/income-determination
- PwC, Czech Republic - Individual - Taxes on personal income: https://taxsummaries.pwc.com/czech-republic/individual/taxes-on-personal-income
- PwC, Czech Republic - Individual - Other taxes: https://taxsummaries.pwc.com/czech-republic/individual/other-taxes
- PwC, Czech Republic - Individual - Residence: https://taxsummaries.pwc.com/czech-republic/individual/residence
- PwC, Czech Republic - Corporate - Taxes on corporate income: https://taxsummaries.pwc.com/czech-republic/corporate/taxes-on-corporate-income
- Pronájem domu od 200 m² do 400 m² Praha (listing search): https://www.sreality.cz/hledani/pronajem/domy/praha?plocha-od=200&plocha-do=400
- School Fees - Fees for the Academic Year 2026/27: https://www.isp.cz/admissions/school-fees
- [Czech Republic - Corporate - Income determination](https://taxsummaries.pwc.com/czech-republic/corporate/income-determination) — PwC Worldwide Tax Summaries (professional)

## Change log
- 2026-10-15: initial research.
- 2026-10-15: added Prague cost of living (Sreality.cz rent sample, ISP 2026/27 fees); confirmed in the law text the 3-year securities time test, the 2026 removal of the CZK 40m cap for securities (now crypto only) and the §38v CZK 5m reporting duty.
- 2026-10-15: added a Holding structures section and a holding_company_notes sentence explaining why no holding structure is scored (3-year time test beats a company).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
- 2026-10-16: no rate changed. Re-read the securities exemption (§4(1)(t)-(u), no cap on securities, heir inherits the deceased's holding time), §8(8)/§16a separate base, §38f credit and §36(2)(a); added the trust fund and family foundation analysis (21% CIT, 15% on distributions) to Holding structures and holding_company_notes; set the review date.
