# French Polynesia: taxes, residence and cost of living

Source: https://domicile.wiki/places/french-polynesia/ (domicile.wiki, researched 2026-10-15). Data licence CC BY-SA 4.0. Research, not tax or legal advice.

## At a glance

For an EU-citizen family of five living off a EUR 30M portfolio (the guide's default reader).

- Wealth tax: none
- Children inherit: low tax
- EU member: no
- Currency: XPF
- Capital: Papeete

## Tax on investments, inheritance and wealth

French Polynesia has no general personal income tax. Gains on securities and income from foreign assets are untaxed for individuals. Local dividends bear IRCM plus a 5% solidarity levy (CST). Real estate gains are taxed at 50% within 5 years, then on a sliding scale to 0% after 10 years. There is no wealth tax. Inheritance duties exist, but their rates for children could not be found, so the inheritance score is unverified.

- **Residence in French Polynesia**: No general income tax. Separate levies hit specific income: CST on wages and pensions, IRCM + CST on distributions by local companies, and the real estate gains tax.

## Inheritance law and trusts

French civil law applies, so children have a protected share (the réserve) that a will cannot cut. A foreign resident cannot choose their national law, and the EU Succession Regulation does not apply. The Hague Trusts Convention is not in force for France.

## Daily life (0-100, higher is better)

- Legal system and property rights: 64
- Healthcare quality and access: 96
- Infrastructure and connectivity: 73

## Research notes

### French Polynesia — family-office tax dossier

Last reviewed: 2026-10-15
Tax year: 2026
Reviewer: research agent (Claude), unreviewed by a tax adviser

#### Summary

French Polynesia has no general personal income tax. Gains on securities and income from foreign assets are untaxed for individuals. Local dividends bear IRCM plus a 5% solidarity levy (CST). Real estate gains are taxed at 50% within 5 years, then on a sliding scale to 0% after 10 years. There is no wealth tax. Inheritance duties exist, but their rates for children could not be found, so the inheritance score is unverified.

#### Residence and eligibility

There is no general income tax, hence no general tax residence certificate: the DICP only attests the local taxes a person is registered for, optionally with a municipal residence certificate.

Routes:

- French citizens (EU): French citizens can settle freely. Other EU citizens: French immigration rules specific to French Polynesia apply (not researched).
- Non-French citizens: long-stay visa and residence card (EU, US, OTHER): Long stays need a visa and residence card under the French immigration rules applicable in French Polynesia (not researched).

**US citizens:** No US treaty. A US citizen living in French Polynesia still pays full US federal tax on worldwide income and US estate tax; the local regime gives almost nothing to credit.

#### Capital gains

No tax on gains from securities for individuals (no general income tax). Real estate gains are taxed at 50% if the property was held under 5 years, then 20%, 16%, 12%, 8% and 4% in years 5-9, and 0% after 10 years (from 10 Dec 2024).

**Rate basis:** DICP: 'Il n'existe pas en Polynésie française d'impôt général sur l'ensemble des revenus.' The real estate scale is from the government's OpenFisca parameter (in force 10 Dec 2024), consistent with IEOM 2025 (50% under 5 years since 2022, disappears after 10 years). Real estate scored at 0 because the guide assumes a holding beyond every holding period. Headline 0.50 = the short-holding real estate rate.

**Holding period rules:** Real estate: 50% under 5 years, 20% in year 5 falling 4 points a year to 0% from year 10.

**Foreign assets:** Foreign assets untaxed (DICP: foreign rental income not taxable; no general income tax).

Real estate gains scale from the government's OpenFisca parameter `daf.rch.plus_values_immobiliere` (in force 10 Dec 2024; legal reference Lexpol text 521011): 50% (held under 5 years), 20% (5 years), 16%, 12%, 8%, 4%, 0% from 10 years. IEOM 2025 confirms the 2022 reform (50% under 5 years, disappears after 10).

Confidence: medium; verification: partially_verified.

JSON: headline 0.5; listed domestic 0.0, listed foreign 0.0, private business 0.0, local real estate 0.0, foreign real estate 0.0.

#### Dividends

Dividends from local companies are subject to IRCM (withheld and declared by the paying company) plus CST on investment income at 5%. Foreign dividends received directly by a resident are not taxed: there is no general income tax and IRCM applies to distributions by entities in French Polynesia.

**Rate basis:** Foreign 0: no general income tax (DICP), and the IRCM return is filed by the distributing local entity (DICP IRCM form). Domestic rate left null: the IRCM rate was not found in an accessible source (the code des impôts on Lexpol was offline); CST-RCM is 5% on top.

**Withholding outbound:** IRCM plus 5% CST-RCM on distributions by local companies (IRCM does not apply to dividends paid to companies with their seat in French Polynesia, art. LP.178-1).

**Treaty network:** Only a tax agreement with France (1957); no treaties with the US or other countries.

**Holding company notes:** Dividends to local companies are outside IRCM (art. LP.178-1).

Confidence: low; verification: partially_verified.

JSON: domestic None, foreign gross 0.0, foreign tax relief 'not_applicable'.

#### Inheritance and gifts to children

Transfers on death are declared to and taxed by the Direction des affaires foncières (Recette-Conservation des hypothèques), which liquidates registration duties on 'mutations par décès'. The direct-line rates and allowances could not be found, so this metric is unverified: the JSON scores no duty, which may overstate how favourable French Polynesia is.

**Foreign assets:** Not researched.

**Gift tax:** Gifts are registered acts subject to registration duties; a 10% real estate publicity tax rate on donations of real estate is listed in the government's OpenFisca parameters. Rates for movable gifts not found.

**Domicile rules:** Not researched.

Confidence: low; verification: unverified.

JSON: basis 'beneficiary', children 'taxed_low', exemption 0 XPF, brackets [].

#### Wealth tax

No net wealth tax was found among the taxes administered by the DICP.

**Property tax note:** Impôt foncier on built property (DICP), plus communal additional centimes.

Confidence: medium; verification: partially_verified.

JSON: type 'none'.

#### Special regimes

None needed for income: there is no general income tax. No residence-by-investment programme found.

#### Company taxation (kept separate from personal tax)

CIT rate in JSON: 0.25. Corporate income tax 25% (27% until 2022), plus a CSIS surcharge on large profits rising to 15% above XPF 400M (government OpenFisca parameters). Local investment tax credits (défiscalisation locale).

#### Cost of living notes

Not sourced in this pass (no cost_of_living block). Markers: Papeete (-17.535, -149.5696; Wikipedia (Papeete), approx.).

#### Open questions

- Inheritance duty rates for children not found: highest-priority gap.
- IRCM rate on local dividends not found.
- [standard/capital_gains] Whether sales of shares in property-rich companies (SCI) fall under the real estate gains tax was not checked.
- [standard/capital_gains] Whether habitual trading could become taxable business activity (patente / CST-NS) was not checked.
- [standard/dividends] IRCM rate on dividends from local companies not found (Lexpol unreachable on 15 Oct 2026).
- [standard/dividends] Whether IRCM reaches foreign dividends paid through a local bank or paying agent was not confirmed.
- [standard/inheritance] Direct-line inheritance and gift duty rates and allowances not found (code des impôts on Lexpol unreachable, no web search budget left). Score is provisional.
- [standard/inheritance] Scope for foreign movable assets of a resident deceased not researched.

#### Sources

- DICP Polynésie française: S'installer en Polynésie française (FAQ: no general income tax): https://www.service-public.pf/dicp/autres-situations/sinstaller-en-polynesie-francaise/
- OpenFisca Polynésie française parameter daf.rch.plus_values_immobiliere (taux de la plus-value immobilière, from 10 Dec 2024): https://api.gov.pf/dsi/openfisca-pf/v1/parameter/daf/rch/plus_values_immobiliere
- IEOM Polynésie française: Rapport annuel économique 2025: https://www.ieom.fr/IMG/pdf/ra_economique_de_polynesie_francaise_2025.pdf
- DICP FAQ: La CST sur le revenu des capitaux mobiliers (5%): https://www.service-public.pf/dicp/faq-items/la-cst-sur-le-revenu-des-capitaux-mobiliers/
- DICP: Modèle de déclaration de l'impôt sur le revenu des capitaux mobiliers (IRCM) et CST-RCM: https://www.service-public.pf/dicp/wp-content/uploads/sites/59/2025/02/Annexe-Modele-type-de-la-declaration-a-limpot-sur-le-revenu-des-capitaux-mobiliers-2.pdf
- DICP: Propriétaire d'un immeuble - vous êtes redevable de l'impôt foncier: https://www.service-public.pf/dicp/document/proprietaire-dun-immeuble-vous-etes-redevable-de-limpot-foncier/
- DAF Polynésie française: Section Recette Conservation des Hypothèques (mutations par décès, droits d'enregistrement): https://www.service-public.pf/daf/recette-conservation-des-hypotheques/
- DICP: Note d'information - résidence fiscale et non-imposition sur le revenu: https://www.service-public.pf/dicp/wp-content/uploads/sites/59/2025/02/Note-dinformation-residence-fiscale-et-non-imposition-sur-le-revenu.pdf
- OpenFisca Polynésie française parameter dicp.impot_societe.taux.is_par_activite.NORMALE: https://api.gov.pf/dsi/openfisca-pf/v1/parameter/dicp/impot_societe/taux/is_par_activite/NORMALE
- OpenFisca Polynésie française parameter dicp.impot_societe.taux.csis: https://api.gov.pf/dsi/openfisca-pf/v1/parameter/dicp/impot_societe/taux/csis

#### Change log
- 2026-10-15: initial research.
- 2026-10-15: inheritance marked not_researched (rates not found), so it counts as missing instead of untaxed.


## Residence and succession sources

- [HCCH status table, Convention of 1 July 1985 on the Law Applicable to Trusts](https://www.hcch.net/en/instruments/conventions/status-table/?cid=59) — HCCH
- [Code civil](https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006070721/) — Legifrance
