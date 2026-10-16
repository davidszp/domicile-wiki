# Portugal — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

- Capital gains and dividends: flat 28% (35% if from blacklisted jurisdictions). Gains on listed securities held 8+
  years are taxed at an effective 19.6%.
- Inheritances and gifts: children are exempt from the 10% stamp duty. Only a 0.8% stamp duty on gifts of
  Portuguese real estate remains.
- Wealth tax: none in general. AIMI applies to Portuguese residential property above EUR 600,000.
- IFICI ("NHR 2.0") requires a qualifying high-value activity, so it does not help a passive investor. The old NHR
  is closed.

## Residence and eligibility

- Resident if more than 183 days in any 12-month period, or if holding a habitual residence intended as the
  primary home. Split-year treatment applies (PwC).
- EU citizens move freely.
- Non-EU citizens: D7 visa or Golden Visa. Real estate routes for the Golden Visa were removed in 2023. Amounts
  are not verified.

## Capital gains

- Shares and other securities: 28% flat.
- Holding-period exclusions on listed securities and fund units (PwC, "2024 changes"):
  - 10% excluded if held 2-5 years.
  - 20% excluded if held 5-8 years.
  - 30% excluded if held 8 years or more.
- Holdings of less than 365 days must be aggregated at progressive rates if taxable income is EUR 86,634 or more.
- Unlisted micro and small company shares: 50% of the gain is taxed.
- Real estate: 50% of the gain is taxed at progressive rates (top 48% plus a 5% solidarity surcharge).
- Decree-Law 97/2026: reinvestment relief for residential letting.
- JSON: listed securities 0.28 x 0.7 = 0.196; private business 0.28; real estate 0.5 x 53% = 0.265.

## Dividends

- 28% flat, or optional aggregation at progressive rates.
- 35% if from blacklisted jurisdictions.
- Foreign tax credit capped at the treaty rate.
- JSON: 0.28 with credit.

## Inheritance and gifts to children

Código do Imposto do Selo, read on the Portal das Finanças:

- Tabela Geral verba 1.2: 10% on free acquisitions (inheritances and gifts).
- Art. 6(1)(e): the spouse or de facto partner, descendants and ascendants are exempt from verba 1.2.
- Verba 1.1: 0.8% on acquisitions of real estate for consideration or by gift. It still applies to gifts of
  Portuguese real estate to children. On its wording it does not cover inheritance.
- Scope: Portuguese-situs assets only (general knowledge of art. 4, unverified).
- JSON: beneficiary basis, children_treatment exempt_with_conditions, brackets [], other cost 0.
- Surviving spouse (`spouse_treatment` `fully_exempt`): Spouse is exempt from the 10% stamp duty on free transfers (Código do Imposto do Selo Art. 6(1)(e)); the 0.8% charge on Portuguese real estate is not covered by the verified exemption.

## Wealth tax

- No net wealth tax (PwC).
- AIMI: 0.7% for individuals (PwC). The EUR 600,000 allowance and the 1% / 1.5% tiers above EUR 1M / EUR 2M come
  from general knowledge.
- Modelled as limited, on local real estate, with exempt 600,000 and brackets 0.007 / 0.01 / 0.015.
- IMI is 0.3-0.45% (municipal property tax).

## Special regimes

- **IFICI** (art. 58-A EBF, 2024 State Budget):
  - 10 years.
  - 20% on Portuguese income from eligible activities.
  - Foreign-source income is generally exempt, except pensions and blacklisted sources (PwC).
  - Requires an eligible activity in an eligible entity. It is not available to a purely passive investor.
  - Whether foreign securities gains are exempt is unconfirmed; the old NHR taxed them at 28%.
- **Old NHR**: only for people resident by the end of 2024.

## Holding structures

No holding structure is scored for Portugal. A company that only manages securities or other assets (sociedade de
simples administração de bens, art. 6 n.º 4 b) CIRC) is tax-transparent under art. 6 n.º 1 c) CIRC when:

- a family group (relatives up to the 4th degree) owns the majority of the capital for more than 183 days; or
- it has five or fewer shareholders.

Its profit is attributed to the shareholders and taxed as their own income every year, so it cannot defer tax
(Autoridade Tributária, CIRC art. 6). The participation exemption needs a stake of at least 10% and would not cover
the portfolio anyway. How transparent income is taxed in the shareholders' hands was not verified.

## Company taxation (kept separate from personal tax)

Not researched in this pass.

## Cost of living notes

- Lisbon / Cascais.
- Family home rent (monthly): EUR 3,100 (2026). Median asking rent of 13 T4 flats of 157-241 m2 in Lisbon family districts on Imovirtual, read 2026-10-15 from the first 37 of 193 results of the Lisbon T4 apartment rental search: Avenidas Novas/Campo Pequeno (3: EUR 3,100, 4,500, 7,000; plus Gulbenkian EUR 7,500 and Parque Eduardo VII EUR 4,500), Areeiro (EUR 2,900), Alvalade/Entrecampos (EUR 2,500), Estrela (EUR 2,950), Restelo (EUR 2,600), Benfica/Laranjeiras (EUR 2,400 and 2,950), Campolide (EUR 3,980) and Rato/Amoreiras (EUR 3,850). Range EUR 2,400-7,500. Chiado, Avenida da Liberdade and a 306 m2 Parque das Nacoes flat left out as prime or oversized. Asking rents, partly furnished. Replaces the Cascais figure of EUR 6,500 (75 T4/T5 houses), because Lisbon is the main city. Source: Imovirtual, Apartamentos T4 para arrendar em Lisboa. Cascais/Estoril houses (many international families) rent higher: EUR 6,500 median of 75 T4/T5 moradias on Imovirtual, 2026-10-15.
- School: Carlucci American International School of Lisbon (CAISL), Grades 9-12 EUR 23,532 a year (2026-27), plus a
  EUR 600 one-time registration fee and a EUR 1,953 annual building fee for the first five years. St. Julian's School
  publishes its 2026/27 fees only as images, not read.
- Purchase price, health insurance and housekeeper costs are not sourced.

## Open questions

- IFICI treatment of foreign securities gains.
- AIMI tiers.
- Corporate tax rate.
- Outbound withholding tax and treaty count.
- Visa thresholds.
- Purchase price, health insurance and housekeeper costs.

## Sources

- PwC, Portugal income determination: https://taxsummaries.pwc.com/portugal/individual/income-determination
- PwC, Portugal taxes on personal income: https://taxsummaries.pwc.com/portugal/individual/taxes-on-personal-income
- PwC, Portugal other taxes: https://taxsummaries.pwc.com/portugal/individual/other-taxes
- PwC, Portugal corporate other taxes: https://taxsummaries.pwc.com/portugal/corporate/other-taxes
- PwC, Portugal other tax credits and incentives: https://taxsummaries.pwc.com/portugal/individual/other-tax-credits-and-incentives
- PwC, Portugal residence: https://taxsummaries.pwc.com/portugal/individual/residence
- AT, Código do Imposto do Selo art. 6: https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/selo/Pages/selo6.aspx
- AT, Tabela Geral do Imposto do Selo: https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/selo/Pages/ccod-selo-tabgiselo.aspx
- Imovirtual, apartamentos T4 para arrendar em Lisboa: https://www.imovirtual.com/pt/resultados/arrendar/apartamento/lisboa/lisboa?roomsNumber=%5BFIVE%5D&limit=72
- Imovirtual, moradias T4/T5 para arrendar em Cascais (previous figure): https://www.imovirtual.com/pt/resultados/arrendar/moradia/lisboa/cascais?roomsNumber=%5BFOUR%2CFIVE%5D&limit=72
- CAISL, 2026-2027 Schedule of Required Fees: https://www.caislisbon.org/fs/resource-manager/view/669fa5f0-f4a0-4e4f-abba-acfafcc02f1e
- [Código do IRC - artigo 6.º (Transparência fiscal)](https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/CIRC_2R/Pages/irc6.aspx) — Autoridade Tributária e Aduaneira (tax_authority)

## Change log
- 2026-10-15: initial research.
- 2026-10-15 (data-quality pass): added prime rent (Imovirtual sample, EUR 6,500/month) and CAISL fee (EUR 23,532).
- 2026-10-15: flagged `ifici` as requiring employment or a qualifying activity (`requires_qualifying_activity`), so it is no longer used as the best regime for a passive investor family unless the user opts in.
- 2026-10-15: added a Holding structures section and a holding_company_notes sentence explaining why no holding structure is scored (art. 6 CIRC transparency).
- 2026-10-15: fact check: corporate income tax rate filled in (19% mainland IRC for 2026, PwC), previously left blank.
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
- 2026-10-15: family rent re-checked a second time: changed from EUR 6,500 (Cascais houses) to EUR 3,100 (13 Lisbon T4 flats, Avenidas Novas/Areeiro/Alvalade/Estrela/Restelo/Benfica).
- 2026-10-16: added surviving-spouse treatment.
