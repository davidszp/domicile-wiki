# Poland — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

PIT Act (ustawa o podatku dochodowym od osób fizycznych), consolidated text Dz.U. 2026 poz. 592. Capital gains
and dividends: 19% flat. 4% solidarity levy on income above PLN 1m includes capital gains but not dividends.
Inheritance and gift tax (Dz.U. 2026 poz. 478): children exempt if reported within 6 months. No wealth tax.
Optional PLN 200,000 lump sum on foreign income for 10 years for new residents.

## Residence and eligibility

Resident if the centre of personal or economic interests is in Poland or presence exceeds 183 days in a tax
year (art. 3(1a); PwC). EU: free movement. US/other: purpose-based permits; no investor visa found (unverified).

## Capital gains

- Art. 30b: 19% on gains from securities, derivatives, shares/stakes, fund units. No holding-period exemption.
- Art. 30h: solidarity levy 4% on the excess over PLN 1,000,000 of income taxed under art. 27, 30b, 30c and
  30f. So large gains bear 23% at the margin.
- Real estate: taxable only if sold within 5 years from the end of the year of acquisition (art. 10(1)(8));
  then 19% under art. 30e, not in the levy base.
- Exit tax on unrealised gains when leaving (art. 30da; PwC); thresholds not checked.
- JSON: securities and private business 0.23; real estate 0.0; headline 0.23.

## Dividends

- Art. 30a(1): 19% flat; art. 30a(9): foreign tax credited up to the Polish 19%. Not in the solidarity levy base.
- Outbound: 19% WHT, treaty-reduced (PwC).
- Treaties: PwC lists 92, 5 not yet in force; US treaty in force.
- JSON: domestic and foreign 0.19, `credit`.

## Inheritance and gifts to children

- Art. 4a: exemption for spouse, descendants, ascendants, stepchildren, siblings, stepparents ("zero group") if
  (1) reported to the tax office within 6 months (inheritance: from the court ruling becoming final or
  registration of the notarial certificate of succession, art. 4a(1a)); (2) cash gifts above the tax-free amount
  received by bank/payment-account transfer. Wording amended with effect from 20 August 2025 (Dz.U. 2025 poz.
  1064). No report needed under the Group I tax-free amount or for notarial-deed transfers (art. 4a(4)).
- If missed: Group I scale (art. 15): 3% up to PLN 10,278, 5% to PLN 20,556, 7% above, after the tax-free
  amount (art. 9: PLN 36,120 in the consolidated text); 5-year aggregation per donor. Gift invoked only during
  audit: 20%.
- Scope (art. 1-3): Polish-situs assets; foreign assets if the recipient is a Polish citizen or permanent
  resident.
- JSON: `basis = beneficiary`, `children_treatment = exempt_with_conditions`, `brackets = []`.
- Surviving spouse (`spouse_treatment` `exempt_with_conditions`): Spouse is exempt (zero group, Art. 4a) if reported within 6 months and the acquirer is a Polish/EU/EEA citizen or resident (Art. 4(4)); missed reports are taxed at Group I rates.

## Wealth tax

None. Municipal real estate tax (2026 max PLN 1.25/m2 residential) and 2% civil law transactions tax on real
estate purchases are not wealth taxes (PwC).

## Special regimes

**Lump sum on foreign income (art. 30j-30p):**
- PLN 200,000 a year (pro rata in the arrival year) replaces PIT on all foreign revenue except CFC income (art.
  30f); foreign revenue is not combined with other income.
- Conditions: no Polish residence in at least 5 of the 6 preceding years; election by end of January after the
  move, with residence certificate; at least PLN 100,000 a year of qualifying spending (economic growth,
  science, education, culture, sport) from the year after the move (art. 30m).
- Family members (spouse, children) may join at PLN 100,000 each, without the spending duty (art. 30p).
- 10 consecutive tax years (art. 30n). Lost if the lump sum is unpaid, spending missed, or residence moves abroad.
- JSON: `lump_sum.annual = PLN 200,000`, foreign gains and dividends 0; domestic as standard.
- Open: whether foreign-listed shares sold via a Polish broker are foreign-source.

## Holding structures

### Family foundation (`family_foundation`, structure)

A fundacja rodzinna (Act of 26 January 2023, in force since 22 May 2023). It is scored because gains and dividends
are untaxed inside and payouts bear 15%: about EUR 70,000 a year against EUR 309,000 personally on the app profile.
The lump-sum regime for foreign income is about EUR 130,000.

- **Foundation level:** exempt from CIT on income from permitted activity, which includes holding shares and trading
  financial instruments (PwC Poland, corporate). Non-permitted activity is taxed at 25%; renting to a related party's
  business at 19%. JSON: all gains `0`, dividends `0` (foreign withholding is a final cost).
- **Payout:** 15% CIT paid by the foundation on benefits to beneficiaries, on assets distributed at dissolution (base
  reduced by the founder's contributed value) and on hidden profits (art. 24q CIT Act). The founder's spouse,
  descendants, ascendants, stepchildren, siblings and step-parents are exempt from PIT. Groups I-II pay 10%, others
  15% (Grant Thornton). `payout_tax_rate 0.15`.
- **Wealth and inheritance:** Poland has no wealth tax. There is no inheritance event while the foundation holds the
  assets, and children inherit tax-free anyway if the transfer is reported. Both inherit the standard regime.
- **Not in force:** a Ministry of Finance project published in August 2026 (MDDP, 5 August 2026; Grant Thornton,
  7 August 2026) would:
  - raise the 15% to 19%;
  - require assets to be held 36 months to keep the preference;
  - apply CFC rules to foundations;
  - tax income earned through transparent entities;
  - clarify short-term rental;
  - extend the PIT exemption to the founder's siblings' descendants.

  It is planned for adoption by the Council of Ministers in Q3 2026 and would take effect in 2027 at the earliest. A
  2025 bill with similar changes was vetoed by the President. Grant Thornton confirms that in 2026 there is no holding
  period and no CFC rule.
- **Costs:** PLN 40,000 a year and PLN 20,000 setup (estimates). The founding capital of at least PLN 100,000 stays
  in the foundation.
- **Unverified:** the statutory text (art. 6 and art. 24q CIT Act; art. 5 of the foundation act) was not read.
  Whether source states grant treaty rates to an exempt foundation was not checked.

## Company taxation (kept separate from personal tax)

19% CIT, 9% small taxpayers; Estonian CIT option; family foundations (fundacja rodzinna) CIT-exempt on
ongoing passive activity (PwC). Distribution taxation of family foundations not researched.

## Cost of living notes

City: Warsaw.
- Prime family-home rent (monthly): PLN 17,000 (2026). Median asking rent of 73 houses of 200-400 m² for rent in Warsaw (mostly Wilanów, Mokotów/Sadyba, Saska Kępa and Żoliborz), from the first Otodom.pl results page (72 per page) on 15 Oct 2026; range PLN 13,000-47,500. Some listings are offered for office use; asking rents, utilities extra. Source: Domy na wynajem: Warszawa (200-400 m²), https://www.otodom.pl/pl/wyniki/wynajem/dom/mazowieckie/warszawa/warszawa/warszawa?areaMin=200&areaMax=400&limit=72
- International school (annual, per child): PLN 134,348 (2026). American School of Warsaw, Grade 12, 2026-27: USD 12,904 plus PLN 83,968 (tuition is billed in both currencies). The USD part is converted at the NBP mid rate of 14 Oct 2026 (3.9042 PLN/USD) = PLN 50,380, total about PLN 134,348. Grades 9-10: USD 12,904 + PLN 81,076. New students pay a one-time USD 8,000 registration fee. Source: ASW Tuition & Fee Payment, 2026-2027 School Year, https://resources.finalsite.net/images/v1779447479/warsaw/plkjnkqb8q4i8oaywmbo/TuitionFees.pdf

Prime purchase price per m², family health insurance and housekeeper cost were not sourced in this round and are omitted rather than guessed. USD/PLN rate: NBP table A 200/A/NBP/2026 (14 Oct 2026).

## Open questions

- Exit tax threshold and rates for individuals were not checked in the law text.
- The Group I tax-free amount in the consolidated text is PLN 36,120 (art. 9(1)(1)); not relevant once the zero-group exemption is claimed.
- Source rules: whether gains on foreign-listed shares sold through a Polish broker count as 'foreign revenue' (art. 30k) was not checked.
- The brief referred to the lump sum as art. 30h; in the consolidated PIT Act (Dz.U. 2026 poz. 592) art. 30h is the solidarity levy and the lump sum is art. 30j-30p.
- Polish family foundation (fundacja rodzinna) taxation of distributions not researched; it may be a realistic succession structure.

## Sources

- PIT Act consolidated text Dz.U. 2026 poz. 592: https://api.sejm.gov.pl/eli/acts/DU/2026/592/text.pdf
- Inheritance and Gift Tax Act consolidated text Dz.U. 2026 poz. 478: https://api.sejm.gov.pl/eli/acts/DU/2026/478/text.pdf
- PwC, Poland - Individual - Income determination: https://taxsummaries.pwc.com/poland/individual/income-determination
- PwC, Poland - Individual - Other taxes: https://taxsummaries.pwc.com/poland/individual/other-taxes
- PwC, Poland - Individual - Residence: https://taxsummaries.pwc.com/poland/individual/residence
- PwC, Poland - Corporate - Taxes on corporate income: https://taxsummaries.pwc.com/poland/corporate/taxes-on-corporate-income
- PwC, Poland - Individual - Foreign tax relief and tax treaties: https://taxsummaries.pwc.com/poland/individual/foreign-tax-relief-and-tax-treaties
- Domy na wynajem: Warszawa (200-400 m²): https://www.otodom.pl/pl/wyniki/wynajem/dom/mazowieckie/warszawa/warszawa/warszawa?areaMin=200&areaMax=400&limit=72
- ASW Tuition & Fee Payment, 2026-2027 School Year: https://resources.finalsite.net/images/v1779447479/warsaw/plkjnkqb8q4i8oaywmbo/TuitionFees.pdf
- [Fundacja rodzinna - skutki podatkowe (updated 14.09.2023)](https://grantthornton.pl/publikacja/fundacja-rodzinna-skutki-podatkowe/) — Grant Thornton Poland (professional)
- [Zmiany w opodatkowaniu fundacji rodzinnych od 2027 roku (7.08.2026)](https://grantthornton.pl/publikacja/zmiany-w-opodatkowaniu-fundacji-rodzinnych-od-2027-roku/) — Grant Thornton Poland (professional)
- [Tax Alert: Fundacje rodzinne - MF proponuje podwyżkę podatku z 15% do 19% (5 August 2026)](https://www.mddp.pl/wp-content/uploads/2026/08/Tax-Alert_Fundacje-rodzinne_MF-proponuje-podwyzke-podatku-z-15-do-19-proc-3.pdf) — MDDP (professional)

## Change log
- 2026-10-15: initial research.
- 2026-10-15: added Warsaw cost of living (Otodom.pl rent sample, ASW 2026-27 fees converted at the NBP rate).
- 2026-10-15: added structure regime `family_foundation` (fundacja rodzinna: 0% CIT on permitted activity, 15% on distributions, close family PIT-exempt; August 2026 project for 19% noted, not law) and a Holding structures section.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
- 2026-10-16: added surviving-spouse treatment.
