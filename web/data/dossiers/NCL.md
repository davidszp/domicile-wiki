# New Caledonia — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

## Summary

New Caledonia has its own tax code, separate from France. Private investors' gains on securities are generally untaxed; only real estate gains are taxed (24%). Dividends from local companies bear a 20% final withholding. Foreign dividends appear to fall into progressive income tax, up to 40%. There is no wealth tax. Inheritances and gifts to children are taxed at 5%-20% on worldwide assets when the deceased was resident.

## Residence and eligibility

Domicile if any of: home or principal place of stay in New Caledonia, main professional activity there, or centre of economic interests there. The France-New Caledonia treaty has tie-breakers (permanent home, vital interests, habitual abode).

Routes:

- French citizens (EU): French citizens can settle freely. Other EU citizens: entry and residence follow French immigration rules specific to New Caledonia (not researched).
- Non-French citizens: residence permit (EU, US, OTHER): Long stays need a visa and a residence card under the immigration rules applicable in New Caledonia (details not researched).

**US citizens:** No US-New Caledonia tax treaty; US citizens would pay New Caledonian tax plus US federal tax, with foreign tax credits on the US side.

## Capital gains

Capital gains of individuals are generally not taxable. Exception: private real estate gains (PVI) are taxed at 20% plus 4% CCS (24% in total), with exemptions and special rules.

**Rate basis:** PwC (reviewed 9 Sep 2026): 'Capital gains derived by individuals are generally not taxable', except real estate (PVI 20% + CCS 4%). Securities and private business shares 0. Real estate 0.24 is the headline before any holding-period relief (relief not researched). Foreign real estate assumed outside PVI.

**Professional trader:** Habitual trading could be business income under the progressive scale; not researched.

**Foreign assets:** No tax on gains from foreign securities found.

Confidence: medium; verification: partially_verified.

JSON: headline 0.24; listed domestic 0.0, listed foreign 0.0, private business 0.0, local real estate 0.24, foreign real estate 0.0.

## Dividends

Dividends from New Caledonian companies bear 20% at source (IRVM 11.5% + CCS 4% + additional centimes 4.5%) and are not subject to personal income tax. Foreign dividends are not covered by IRVM and appear to be taxed in personal income tax at progressive rates up to 40%, with a foreign tax credit.

**Rate basis:** Domestic: 0.20 final (PwC income determination; DSF IRVM page 'total de 20%'). Foreign: residents are taxed on worldwide income at 0-40% (PwC), and IRVM applies only to distributions by companies with their seat in New Caledonia (DSF), so foreign dividends are assumed to fall into the progressive scale at the 40% top rate. PwC mentions foreign tax credits. Low confidence for foreign dividends.

**Withholding outbound:** Dividends paid to non-residents: about 20% for individuals, 21% for companies (IRVM + CCS + centimes, plus possibly CAIS 3%); France-New Caledonia treaty: 15% individuals, 5% companies.

**Treaty network:** Only one comprehensive treaty, with France (1983). No treaty with the US or other EU states.

**Holding company notes:** IRVM reinvestment reduction (art. Lp 543.2-I) for local reinvestment; not relevant to a foreign portfolio.

Confidence: low; verification: partially_verified.

JSON: domestic 0.2, foreign gross 0.4, foreign tax relief 'credit'.

## Inheritance and gifts to children

Inheritance and gift duties are charged on each beneficiary. If the deceased or donor was resident in New Caledonia, worldwide assets are taxed; otherwise only New Caledonian assets. Children: progressive rates of 5% to 20% after an allowance of XPF 100,000. Spouses and PACS partners are exempt. Modelled as 20% on everything above XPF 100,000 per child.

**Foreign assets:** Worldwide assets when the deceased/donor is a tax resident of New Caledonia; local assets only otherwise.

**Gift tax:** Gifts follow the same rules as inheritances 'but some differences could exist' (PwC).

**Domicile rules:** Based on the tax domicile of the deceased or donor in New Caledonia.

Law: code des impôts de Nouvelle-Calédonie, art. 248-417 (droits d'enregistrement, DSF). The consolidated code was not reachable (juridoc PDF returned 404; the new Leginova portal, live since 1 Oct 2026, is a JavaScript application). JSON: exemption XPF 100,000, single 20% bracket, as an upper bound.

Confidence: low; verification: partially_verified.

JSON: basis 'beneficiary', children 'taxed', exemption 100,000 XPF, brackets [{"from_amount": 0, "rate": 0.2}].

**Surviving spouse:** PwC states that no inheritance tax is due between spouses or PACS partners; its separate line giving a XPF 100,000 allowance and 5%-20% rates for 'direct dependants (spouse or partner)' is ambiguous, and the local Code des impots (arts. 248-417) could not be opened, so confidence is medium.

## Wealth tax

No net wealth tax (PwC).

**Property tax note:** Contribution foncière on land and buildings, computed from surface area times a rate per m2 and then 8.4% (buildings) or 0.7875% (land), varying by commune (PwC).

Confidence: high; verification: partially_verified.

JSON: type 'none'.

## Special regimes

None found. New Caledonia has no regime for wealthy new residents.

## Company taxation (kept separate from personal tax)

CIT rate in JSON: 0.3. CIT 30% (15% for smaller companies below turnover thresholds; 35% mining and metallurgy), plus CAIS 3% on distributions above XPF 30M and an additional social contribution of 5%-15% for large profits. Taxed on New Caledonian-source income.

## Cost of living notes

Not sourced in this pass (no cost_of_living block). Markers: Nouméa (-22.2763, 166.4572; Wikipedia (Nouméa), approx.).

## Open questions

- Direct-line inheritance bands (5%-20%) not found; the code des impôts on juridoc/Leginova was unreachable.
- Foreign dividends: progressive-scale treatment assumed, not confirmed.
- [standard/capital_gains] Whether PVI has a holding-period reduction or exemption was not checked.
- [standard/capital_gains] Whether frequent trading could be treated as business income (BIC) was not checked.
- [standard/dividends] Tax treatment of foreign-source dividends for resident individuals (progressive scale vs other) not confirmed in the code; CCS 4% might also apply.
- [standard/inheritance] The band thresholds of the 5%-20% direct-line scale were not found (code des impôts art. 248-417 not reachable); the JSON applies 20% to the whole amount above the allowance, an upper bound that is close for a EUR 11.7M share per child.
- [standard/inheritance] PwC's wording of the XPF 100,000 allowance ('when beneficiaries are direct dependants (spouse or partner…)') is ambiguous.
- [standard/inheritance] Any lifetime gift recall period not researched.

## Sources

- PwC Worldwide Tax Summaries: New Caledonia, Individual - Other taxes (reviewed 9 Sep 2026): https://taxsummaries.pwc.com/new-caledonia/individual/other-taxes
- DSF Nouvelle-Calédonie: La contribution calédonienne de solidarité (CCS): https://dsf.gouv.nc/impots/la-contribution-caledonienne-de-solidarite-ccs
- PwC Worldwide Tax Summaries: New Caledonia, Individual - Income determination (reviewed 9 Sep 2026): https://taxsummaries.pwc.com/new-caledonia/individual/income-determination
- PwC Worldwide Tax Summaries: New Caledonia, Individual - Taxes on personal income (reviewed 9 Sep 2026): https://taxsummaries.pwc.com/new-caledonia/individual/taxes-on-personal-income
- DSF Nouvelle-Calédonie: L'impôt sur le revenu des valeurs mobilières (IRVM): https://dsf.gouv.nc/impots/limpot-sur-le-revenu-des-valeurs-mobilieres-irvm
- DSF Nouvelle-Calédonie: Les droits d'enregistrement (successions et donations, art. 248-417 code des impôts): https://dsf.gouv.nc/impots/les-droits-denregistrement
- PwC Worldwide Tax Summaries: New Caledonia, Individual - Residence (reviewed 9 Sep 2026): https://taxsummaries.pwc.com/new-caledonia/individual/residence
- DSF Nouvelle-Calédonie: Impôt sur le revenu - principes généraux: https://dsf.gouv.nc/particuliers-impots-et-taxes/principes-generaux
- PwC Worldwide Tax Summaries: New Caledonia, Corporate - Taxes on corporate income (reviewed 9 Sep 2026): https://taxsummaries.pwc.com/new-caledonia/corporate/taxes-on-corporate-income
- PwC Worldwide Tax Summaries: New Caledonia, Corporate - Withholding taxes (reviewed 9 Sep 2026): https://taxsummaries.pwc.com/new-caledonia/corporate/withholding-taxes

## Change log
- 2026-10-15: initial research.
- 2026-10-16: added surviving-spouse treatment.
