# Brazil — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Brazil taxes residents on worldwide income. Since 2024 (Law 14,754/2023) income and gains from financial investments abroad are taxed annually at a flat 15%. From 2026 (Law 15,270/2025) dividends from Brazilian companies above BRL 50,000 a month per company bear 10% withholding, and a minimum tax of up to 10% applies to total income above BRL 600,000 (full 10% above BRL 1.2 million). Inheritance and gifts are taxed by the states (ITCMD, capped at 8%; Sao Paulo 4% flat in 2026). No wealth tax.

US citizens: No US-Brazil income tax treaty; Brazil recognises reciprocity for crediting US tax. US citizens remain subject to US federal income, estate and gift tax.

## Residence and eligibility

Permanent visa holders are resident from arrival; temporary visa without local employment after 183 days in a 12-month period; Brazilians leaving remain resident for 12 months unless an exit process is filed (PwC Residence).

- **Investor visa (VITEM IX / permanent residence by investment)** (EU, US, OTHER): Residence for investment in real estate or productive activity under the Migration Law (Decree 9,199/2017); amounts not researched.
- **Retiree visa (VITEM XIV)** (EU, US, OTHER): Requires a minimum foreign pension; not researched.

## Capital gains

### Standard regime

Gains on financial investments held abroad (including foreign listed shares and funds) are taxed annually at a flat 15% under Law 14,754/2023, separately from other income. Gains on shares sold on the Brazilian stock exchange are taxed at 15% (20% day trades). Other capital gains (unlisted shares, real estate in Brazil or abroad) are taxed progressively: 15% up to BRL 5 million, rising to 22.5% on the part above BRL 30 million.

- **Important exceptions, statute references and announced changes:** Small monthly sales of Brazilian shares (up to BRL 20,000) are exempt (not re-verified). Foreign currency gains on cash held abroad follow specific rules.
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 22.5% (0.225); listed domestic 15% (0.15); listed foreign 15% (0.15); private business sale 22.5% (0.225); local real estate 22.5% (0.225); foreign real estate 22.5% (0.225).
- **How derived:** PwC Other taxes: 15% flat on foreign financial investments (from 1 Jan 2024); progressive 15%-22.5% capital gains (top band above BRL 30 million) for other assets incl. assets abroad; 15% on Brazilian stock-exchange gains. Top band rates used for a large private business or real estate gain.
- **Trader recharacterisation:** Day-trade gains taxed at 20%. Individuals are not generally recharacterised as traders; business activity is normally carried on through companies.
- **Foreign assets:** Worldwide; gains on foreign financial investments taxed on realisation once a year at 15% with no deductions.

Open points for this tax: Law 14,754/2023 text not opened; rate taken from PwC and Deloitte. | Whether IRPFM (minimum tax) adds anything for income already taxed at 15% is not analysed; it is credited and should not increase these rates.

## Dividends

### Standard regime

From 1 January 2026 a Brazilian company withholds 10% on the whole monthly amount when it distributes more than BRL 50,000 in a month to the same resident individual. Dividends also count towards the new minimum individual income tax (IRPFM): 0%-10% on income between BRL 600,000 and BRL 1.2 million and 10% above, with credit for tax already paid. Foreign dividends are taxed at a flat 15% annually under Law 14,754/2023.

- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 15% (0.15); domestic 10% (0.1); foreign gross 15% (0.15); foreign tax relief: credit.
- **How derived:** Domestic: 10% (WHT and IRPFM top rate) for large dividend flows. Foreign: 15% flat (Law 14,754/2023, PwC Income determination). Credit for foreign tax under treaties or reciprocity (US, UK and Germany recognised) - PwC Foreign tax relief.
- **Outbound withholding:** 10% WHT on dividends to non-residents from 2026 (treaty rates cannot increase it); 15%/25% on interest and royalties.
- **Treaty network:** About 40 treaties (incl. Argentina, Austria, Belgium, Canada, Chile, China, France, India, Italy, Japan, Luxembourg, Mexico, Netherlands, Norway, Portugal, Singapore, Spain, Sweden, Switzerland, UAE); UK, Colombia, Paraguay pending. No US treaty (reciprocity recognised for credits).
- **Holding companies:** Profits of controlled foreign entities held by individuals are taxed annually at 15% on an accrual basis (Law 14,754/2023); trusts are look-through.

Open points for this tax: Mechanics of the IRPFM reducer (combined corporate + personal cap of 34%) not studied in detail.

## Inheritance and gifts to children

### Standard regime

ITCMD is a state tax on inheritances and gifts, levied on the recipient's acquisition at up to 8% (Senate cap). EC 132/2023 makes progressive rates mandatory and LC 227/2026 (Jan 2026) set national rules, including taxation of assets abroad, but each state must legislate. Sao Paulo (scored here) still applies a single 4% rate in 2026; bills for 1%-4% or up to 8% are pending.

- **Important exceptions, statute references and announced changes:** STF (Dec 2024): no ITCMD on VGBL/PGBL pension plan payouts at death. A transitional pending change: Sao Paulo bills PL 7/2024 (up to 8%) and PL 409/2025 (1%-4%).
- **Regional differences:** Rates vary by state (2%-8%; Deloitte: progressive 2% up to 8%). From 2026 movable property is taxed by the state of the deceased's or donor's domicile; real estate by its location (LC 227/2026).
- **Tax year / confidence / verification:** 2026 / medium / partially_verified (checked 2026-10-15)
- **JSON numbers:** basis `beneficiary`, children `taxed_low`, exemption 0 BRL, brackets (marginal): from 0 BRL: 4% (0.04); other transfer costs 0% (0.0).
- **Gifts:** Gifts taxed by ITCMD at the same state rate (Sao Paulo 4%). (same as inheritance: True; tax-free after years: None)
- **Foreign assets:** LC 227/2026 allows states to tax assets abroad once they legislate; status in Sao Paulo for 2026 uncertain.
- **Residence/domicile rules:** Movables: state of domicile of deceased/donor; real estate: state where located.
- **Business relief covers listed shares:** False

Open points for this tax: Whether Sao Paulo can already tax foreign-situs assets in 2026 (STF Tema 825 required a complementary law; LC 227/2026 now exists but state law and anteriority rules apply) is unclear; scope set to worldwide conservatively. | Sao Paulo small-estate exemptions not modelled; Rio de Janeiro and other states use progressive scales up to 8%.

## Wealth tax

### Standard regime

No net wealth tax (the constitutional large-fortunes tax has never been enacted).

- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** Municipal IPTU on urban property (Sao Paulo basic 1% residential); ITBI up to 3% on real-estate purchases.

## Special regimes

None modelled; see Residence and eligibility.

## Company taxation (kept separate from personal tax)

Headline CIT rate: 34% (0.34). IRPJ 15% + 10% surcharge above BRL 240,000 + CSLL 9% = 34% combined. 10% WHT on dividends from 2026.

## Cost of living notes

Not researched.

## Open questions

- ITCMD on foreign assets in Sao Paulo for 2026 deaths/gifts unresolved.
- Law texts (14,754/2023 and 15,270/2025) not opened directly.

## Sources

- PwC Worldwide Tax Summaries: Brazil - Individual - Other taxes (PwC, professional): https://taxsummaries.pwc.com/brazil/individual/other-taxes
- PwC Worldwide Tax Summaries: Brazil - Individual - Significant developments (PwC, professional): https://taxsummaries.pwc.com/brazil/individual/significant-developments
- Deloitte International Tax: Brazil Highlights 2026 (Deloitte, professional): https://www.deloitte.com/content/dam/assets-shared/docs/services/tax/2026/dttl-tax-brazilhighlights-2026.pdf
- PwC Worldwide Tax Summaries: Brazil - Individual - Income determination (PwC, professional): https://taxsummaries.pwc.com/brazil/individual/income-determination
- PwC Worldwide Tax Summaries: Brazil - Corporate - Withholding taxes (PwC, professional): https://taxsummaries.pwc.com/brazil/corporate/withholding-taxes
- PwC Worldwide Tax Summaries: Brazil - Individual - Foreign tax relief and tax treaties (PwC, professional): https://taxsummaries.pwc.com/brazil/individual/foreign-tax-relief-and-tax-treaties
- Planejamento patrimonial e sucessorio diante do ITCMD progressivo (Freitas Ferraz Advogados, Capital Aberto, Aug 2026) (Capital Aberto / Freitas Ferraz Advogados, professional): https://capitalaberto.com.br/insights/freitas-ferraz-advogados/2026/08/planejamento-patrimonial-e-sucessorio-diante-do-itcmd-progressivo
- PwC Worldwide Tax Summaries: Brazil - Individual - Residence (PwC, professional): https://taxsummaries.pwc.com/brazil/individual/residence
- PwC Worldwide Tax Summaries: Brazil - Corporate - Taxes on corporate income (PwC, professional): https://taxsummaries.pwc.com/brazil/corporate/taxes-on-corporate-income

## Change log

- 2026-10-15: initial research.
