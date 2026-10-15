# Andorra — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

- Personal income tax (IRPF) is at most 10%.
- Gains on shares are exempt for holdings of 25% or less (with a 12-month look-back, family holdings aggregated). A
  holding above 25% is also exempt once owned for 10 years. Fund units are exempt.
- Dividends from Andorran companies are exempt. Foreign dividends are taxed at 10% with a foreign tax credit, and
  the first EUR 3,000 of savings income is exempt.
- No inheritance, gift or wealth tax.

## Residence and eligibility

- Tax resident if in Andorra more than 183 days, or if the main centre of economic interests is in Andorra
  (e-tràmits IRPF page).
- Residence permits: passive residence (an investment plus a deposit with the AFA, at least 90 days a year) or
  active residence. The amounts are not verified.

## Capital gains

The Guia pràctica de l'IRPF 2025 (Govern d'Andorra), "Rendes exemptes", restating Llei 5/2014, says:

- Gains on collective investment undertakings are exempt.
- Gains on shares are exempt if the holding (aggregated with related entities and family up to the third degree)
  was not above 25% in the 12 months before the sale. Above 25%, they are exempt if owned for at least 10 years.
- The exemption is excluded for companies whose assets are at least 50% Andorran real estate.
- Foreign real estate is exempt after 10 years.
- Andorran real estate pays the separate plusvàlua tax at 1%-15% (Altres impostos page). The schedule is not
  verified, so the JSON leaves it null.
- JSON: securities 0, private business 0 (more than 25% held for 10 or more years), foreign real estate 0.
  Headline 0.10.

## Dividends

- Andorran dividends are exempt if the payer is subject to Andorran corporate tax (IS).
- Foreign dividends are taxable at 10% with a deduction for international double taxation (guide).
- EUR 3,000 savings allowance.
- JSON: domestic 0, foreign 0.10 with credit.

## Inheritance and gifts to children

- Inheritances and donations are outside the scope of IRPF.
- Gains revealed on death are exempt.
- No inheritance or gift tax is listed among state or communal taxes.
- Gifts of real estate between relatives up to the third degree are exempt from plusvàlua. Transfers of shares
  between relatives up to the third degree are exempt from ITP.
- JSON: basis none, fully_exempt.

## Wealth tax

- None.
- Property transfer tax (ITP) is 4%.
- A vacant-dwelling tax of EUR 5.05/m2 applies to homes left empty for more than 2 years.

## Special regimes

None. The ordinary regime is already low-tax.

## Company taxation (kept separate from personal tax)

- Corporate tax (IS) is 10%.
- Andorran collective investment institutions pay 0%.
- Holding, IP and consolidation regimes exist (e-tràmits IS page).

## Cost of living notes

- Andorra la Vella / Escaldes-Engordany.
- Prime rent: EUR 6,500 a month = median of the 6 distinct houses with 4+ bedrooms listed for rent on Pisos.ad on
  2026-10-15 (EUR 3,000 Canillo, 3,500 Pal, 5,000 Aixirivall, 8,000 Erts, 9,100 Andorra la Vella, 10,000 Encamp; two
  apparent duplicates removed). Very small sample.
- School: Agora Andorra International School, IB Diploma EUR 14,150 a year (2026-27), plus EUR 1,100 admission,
  EUR 435 annual reservation and EUR 2,010 lunch. The school says its prices exclude taxes.
- Purchase price, health insurance and housekeeper costs are not sourced.

## Open questions

- Passive residence amounts.
- Measures on property purchases by non-residents in 2024-2026.
- The plusvàlua schedule.
- The treaty list.
- The 2026 edition of the IRPF guide was not checked.
- Rent rests on 6 listings; purchase price, health insurance and housekeeper costs not sourced.

## Sources

- Govern d'Andorra, Guia pràctica de l'IRPF 2025: https://www.govern.ad/documents/d/guest/guia_irpf
- Govern d'Andorra, IRPF e-tràmits: https://www.e-tramits.ad/tramits/impostos/irpf
- Govern d'Andorra, IS e-tràmits: https://www.e-tramits.ad/tramits/impostos/is
- Govern d'Andorra, Altres impostos: https://www.govern.ad/ca/tematiques/impostos-taxes-i-duana/impostos-en-andorra/altres-impostos
- Pisos.ad, houses for rent with 4+ bedrooms: https://www.pisos.ad/lloguer/cases/tots-subtipus?&minRooms=4&minBanys=0&maxRooms=0&maxBanys=0&minMetres=0&minPrice=0&maxPrice=0&reference=&caracteristiques=&order=&immo=0&parro=&promocions=False
- Agora Andorra International School, School Fees 2026-2027: https://andorra.agorainternationalschool.es/fs/resource-manager/view/2a6be333-c646-400d-b741-eb5a29b0a9c8

## Change log
- 2026-10-15: initial research.
- 2026-10-15 (data-quality pass): added prime rent (Pisos.ad, EUR 6,500/month, 6 listings) and Agora Andorra IB fee (EUR 14,150).
- 2026-10-15: family rent re-checked against the upper-middle-class standard: kept.
