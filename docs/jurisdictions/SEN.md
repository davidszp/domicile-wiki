# Senegal — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

Senegal taxes residents on worldwide income at progressive rates up to 43%, with no unilateral relief for foreign tax. Foreign dividends and, per Deloitte, capital gains fall under that scale; some share gains are taxed at 25%, and Senegalese dividends bear 10%. There is no wealth tax, and Deloitte describes only a fixed XOF 25,000 duty on accepting a succession; gift duties were not verified. Confidence is low: no tax authority source was reachable and the 2026 code reform was not reviewed.

US citizens: US citizens remain fully US-taxed; Senegal's tax on foreign dividends and gains (up to 43%) exceeds US long-term rates, so Senegal would be the binding layer. No US-Senegal income tax treaty.

## Residence and eligibility

Resident if the individual has a permanent abode or permanent residence in Senegal, carries on a professional activity there (other than a subsidiary one), or has the centre of economic interests there (PwC). No day-count test is stated.

- **Residence card** (EU, US, OTHER): Non-citizens staying long term need a residence card (carte de résident); ECOWAS citizens have free movement. No residence-by-investment programme identified. Not researched in detail.

## Capital gains

### Standard regime

Residents are taxed on worldwide income. Capital gains of individuals are taxed at the progressive income tax rates (0-43%) on declaration, real-estate gains are collected at source by the notary, and gains on the sale of shares are taxed at 25% 'in certain cases' (Deloitte 2026). Which rule applies to a resident's gains on foreign listed securities is not stated; scored at the 43% top progressive rate.

- **Exemptions and thresholds:** Progressive scale (XOF, annual): 0-630,000 0%; to 1.5m 20%; to 4m 30%; to 8m 35%; to 13.5m 37%; to 50m 40%; above 50m 43%; household 'shares' (quotient) system.
- **Important exceptions, statute references and announced changes:** The 25% rate for some share disposals is thought to be the CGI art. 259 levy (older sources); its scope for listed and foreign shares is unverified. A reform of the Code général des impôts for 2026 was mentioned in search results but not reviewed; whether it changed individual investment-income rules was not checked.
- **Tax year / confidence / verification:** 2026 / low / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 43% (0.43); listed domestic n/a (null); listed foreign 43% (0.43); private business sale n/a (null); local real estate n/a (null); foreign real estate 43% (0.43).
- **How derived:** Foreign listed securities and foreign real estate: 0.43, the top progressive rate that Deloitte gives as the capital gains rate for individuals. Domestic listed shares and private business shares: null because the 25% share-gain rate applies 'in certain cases' that could not be identified (the range is 25-43%). Senegalese real estate: null because the notary's at-source rate was not found.
- **Holding period:** None identified.
- **Trader recharacterisation:** Trading gains are business income at progressive rates.
- **Foreign assets:** Worldwide taxation; Senegal grants no unilateral foreign tax relief, only treaty relief (Deloitte).

## Dividends

### Standard regime

Senegalese dividends bear a 10% withholding tax for residents and non-residents. Foreign dividends of residents fall into worldwide income at progressive rates up to 43%, and Senegal gives no unilateral credit for foreign tax (treaty relief only).

- **Exemptions and thresholds:** See the progressive scale under capital gains.
- **Important exceptions, statute references and announced changes:** Whether the 10% WHT on Senegalese dividends is final (libératoire) for individuals is supported only by older (2006-era) code text and was not confirmed for the current code. A reform of the Code général des impôts for 2026 was mentioned in search results but not reviewed; whether it changed individual investment-income rules was not checked.
- **Tax year / confidence / verification:** 2026 / low / partially_verified (checked 2026-10-15)
- **JSON numbers:** headline 43% (0.43); domestic 10% (0.1); foreign gross 43% (0.43); foreign tax relief: none.
- **How derived:** Domestic: 10% WHT treated as final. Foreign: 43% top progressive rate on worldwide income, no unilateral credit; treaty credit only where a treaty applies (Senegal has more than 30 treaties, mostly African and European).
- **Outbound withholding:** 10% on dividends to residents and non-residents, reducible by treaty for non-residents.
- **Treaty network:** More than 30 treaties; BEPS MLI in force from 1 September 2022 (Deloitte). Includes France; no US treaty, so US dividends bear 30% US WHT.
- **Holding companies:** Companies pay 30%; dividends received outside the participation exemption are taxed after a 60% abatement. Not modelled.

## Inheritance and gifts to children

### Standard regime

Deloitte reports only a fixed registration duty of XOF 25,000 on deeds accepting a succession or legacy; no proportional inheritance tax is described. Treatment of gifts (donations) to children was not found.

- **Exemptions and thresholds:** Fixed XOF 25,000 per deed of acceptance of a succession.
- **Important exceptions, statute references and announced changes:** Registration duties on donations inter vivos and on transfers of Senegalese real estate by succession were not verified; the PwC summary does not cover inheritance or gift tax. A reform of the Code général des impôts for 2026 was mentioned in search results but not reviewed; whether it changed individual investment-income rules was not checked.
- **Tax year / confidence / verification:** 2026 / low / unverified (checked 2026-10-15)
- **JSON numbers:** basis `none`, children `fully_exempt`, scope `worldwide`, exemption 0 XOF, brackets (marginal): none; other transfer costs 0% (0.0).
- **Gifts:** Not verified: registration duties on donations to children could apply. (same as inheritance: False; tax-free after years: None)
- **Foreign assets:** No charge identified.
- **Residence/domicile rules:** Not applicable.
- **Business relief covers listed shares:** False

## Wealth tax

### Standard regime

No net wealth or net worth tax.

- **Tax year / confidence / verification:** 2026 / high / verified (checked 2026-10-15)
- **JSON type:** `none`
- **Property tax (not a wealth tax):** Land/property tax not researched; transfers of real property bear a 5% registration duty (Deloitte).

## Special regimes

None modelled; see Residence and eligibility.

## Company taxation (kept separate from personal tax)

Headline CIT rate: 30% (0.3). 30% CIT (15% for free export companies and special economic zones); minimum tax 0.5% of turnover when loss-making (capped XOF 5m). Participation exemption for qualifying dividends; 10% WHT on dividends.
Special zones/regimes: Special economic zones and free export companies at 15%.

## Cost of living notes

Not researched in this pass: no cost item could be sourced quickly from an agency report, school fee page or comparable source, so `cost_of_living` is omitted.

## Open questions

- Senegal's DGID website and the current Code général des impôts could not be reached; figures rest on Deloitte (April 2026) and PwC (August 2026) summaries.
- Which share disposals qualify for the 25% rate and whether it covers listed or foreign shares; the at-source rate on real-estate gains.
- Whether foreign gains of individuals are actually taxed at progressive rates in practice.
- Whether foreign dividends are taxed at progressive rates or at a proportional rate (as for domestic investment income) was not verified.
- Registration duty on gifts (donations) to children and on inherited Senegalese real estate not verified; the 'no inheritance tax' scoring rests on one professional summary.

## Sources

- Senegal Highlights 2026 (updated April 2026) (Deloitte International Tax, professional): https://www.deloitte.com/content/dam/assets-shared/docs/services/tax/2026/dttl-tax-senegalhighlights-2026.pdf
- Senegal - Individual - Taxes on personal income (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/senegal/individual/taxes-on-personal-income
- Senegal - Individual - Other taxes (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/senegal/individual/other-taxes
- Senegal - Individual - Residence (PwC Worldwide Tax Summaries, professional): https://taxsummaries.pwc.com/senegal/individual/residence

## Change log

- 2026-10-15: initial research.
