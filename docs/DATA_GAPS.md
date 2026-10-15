# Data gaps

Generated from the build of 2026-10-15 (EU citizen, default weights). Regenerate with `python -m domicile.gaps` after `python -m domicile.build`.

## Coverage

- Map units: 382 (258 countries/territories, 124 subnational units).
- Countries/territories with researched tax rules: 145. The other 113 are grey (unscored) on the overall and tax layers; their non-tax indicators are available on the non-tax layer.
- Status of researched countries: insufficient 20, knocked_out 14, provisional 96, verified 15.

## Systematic gaps

- **Cost of living and housing** missing for 62 of 145 researched countries.
- **Cultural fit and lifestyle** missing for 51 of 145 researched countries.
- **Corruption and government integrity** missing for 38 of 145 researched countries.
- **Education quality** missing for 34 of 145 researched countries.
- **Safety and personal security** missing for 28 of 145 researched countries.
- **Human development and quality of life** missing for 26 of 145 researched countries.
- **Infrastructure and connectivity** missing for 12 of 145 researched countries.
- **Political and institutional stability** missing for 10 of 145 researched countries.
- **Legal system and property rights** missing for 8 of 145 researched countries.
- **Business opportunities and economy** missing for 6 of 145 researched countries.
- **Healthcare quality and access** missing for 3 of 145 researched countries.
- Small territories (e.g. Crown Dependencies, British Overseas Territories, Monaco) are not covered by the World Bank Worldwide Governance Indicators or UNDP's HDI. Only authoritative local statistics with the same definitions are used as overrides; no proxies from the sovereign state are used.
- Tax rules are summarised at the top end for a large private investor; anti-avoidance rules, exit taxes in the country being left and treaty tie-breakers are described in text but not modelled.

## Per jurisdiction

| Jurisdiction | Status | Data | Missing metrics | Low-confidence / unverified tax metrics | Open questions |
|---|---|---|---|---|---|
| Albania | provisional | 100% | – | – | 5 |
| American Samoa | provisional | 76% | Corruption and government integrity, Cost of living and housing, Education quality, Human development and quality of life, Infrastructure and connectivity, Cultural fit and lifestyle | standard.capital_gains, standard.dividends, standard.wealth_tax, standard.inheritance | 6 |
| Andorra | provisional | 89% | Corruption and government integrity, Education quality, Cultural fit and lifestyle | – | 9 |
| Anguilla | provisional | 71% | Safety and personal security, Corruption and government integrity, Education quality, Healthcare quality and access, Human development and quality of life, Infrastructure and connectivity | – | 4 |
| Antigua and Barbuda | provisional | 96% | Corruption and government integrity | – | 3 |
| Argentina | provisional | 96% | Cost of living and housing | – | 9 |
| Armenia | provisional | 96% | Cost of living and housing | – | 3 |
| Aruba | provisional | 78% | Safety and personal security, Corruption and government integrity, Education quality, Human development and quality of life, Cultural fit and lifestyle | – | 4 |
| Australia | provisional | 100% | – | temporary_resident.capital_gains, temporary_resident.dividends | 8 |
| Austria | provisional | 100% | – | – | 7 |
| Bahrain | provisional | 98% | Cultural fit and lifestyle | – | 3 |
| Barbados | verified | 96% | Education quality | – | 6 |
| Belarus | knocked_out | 96% | Cost of living and housing | – | 8 |
| Belgium | provisional | 100% | – | – | 9 |
| Belize | insufficient | 87% | Cost of living and housing, Education quality | standard.inheritance | 5 |
| Bermuda | provisional | 87% | Corruption and government integrity, Education quality, Human development and quality of life | – | 3 |
| Bhutan | provisional | 96% | Cost of living and housing | standard.capital_gains, standard.dividends, standard.wealth_tax, standard.inheritance | 5 |
| Bosnia and Herzegovina | provisional | 96% | Cost of living and housing | – | 8 |
| Botswana | provisional | 94% | Cost of living and housing, Cultural fit and lifestyle | standard.inheritance | 6 |
| Brazil | provisional | 94% | Cost of living and housing, Cultural fit and lifestyle | – | 7 |
| British Virgin Islands | insufficient | 51% | Safety and personal security, Political and institutional stability, Corruption and government integrity, Legal system and property rights, Education quality, Human development and quality of life, Business opportunities and economy | – | 2 |
| Brunei | provisional | 87% | Safety and personal security, Cost of living and housing, Cultural fit and lifestyle | – | 1 |
| Bulgaria | provisional | 100% | – | – | 6 |
| Cabo Verde | insufficient | 76% | Cost of living and housing, Education quality, Cultural fit and lifestyle | standard.capital_gains, standard.inheritance | 4 |
| Canada | provisional | 96% | Cost of living and housing | – | 5 |
| Cayman Islands | provisional | 87% | Corruption and government integrity, Education quality, Human development and quality of life | – | 3 |
| Chile | provisional | 96% | Cost of living and housing | – | 6 |
| China | knocked_out | 96% | Cost of living and housing | – | 5 |
| Cook Islands | provisional | 64% | Safety and personal security, Corruption and government integrity, Cost of living and housing, Education quality, Healthcare quality and access, Human development and quality of life, Infrastructure and connectivity, Cultural fit and lifestyle | standard.inheritance | 6 |
| Costa Rica | provisional | 100% | – | – | 5 |
| Croatia | verified | 100% | – | – | 3 |
| Curaçao | insufficient | 51% | Safety and personal security, Political and institutional stability, Corruption and government integrity, Legal system and property rights, Education quality, Human development and quality of life, Cultural fit and lifestyle | – | 8 |
| Cyprus | provisional | 100% | – | – | 9 |
| Czech Republic | verified | 100% | – | – | 3 |
| Denmark | verified | 100% | – | – | 8 |
| Dominica | provisional | 96% | Cost of living and housing | – | 5 |
| Dominican Republic | provisional | 100% | – | – | 7 |
| Estonia | provisional | 100% | – | – | 5 |
| Faroe Islands | insufficient | 51% | Safety and personal security, Political and institutional stability, Corruption and government integrity, Legal system and property rights, Education quality, Human development and quality of life, Cultural fit and lifestyle | – | 6 |
| Fiji | knocked_out | 94% | Cost of living and housing, Cultural fit and lifestyle | standard.dividends, standard.inheritance | 8 |
| Finland | verified | 100% | – | – | 10 |
| France | provisional | 98% | Cultural fit and lifestyle | impatriate_155b.capital_gains, impatriate_155b.dividends | 14 |
| French Polynesia | insufficient | 45% | Safety and personal security, Political and institutional stability, Corruption and government integrity, Cost of living and housing, Education quality, Human development and quality of life, Business opportunities and economy, Cultural fit and lifestyle | standard.dividends, standard.inheritance | 9 |
| Georgia | provisional | 100% | – | – | 3 |
| Germany | provisional | 100% | – | – | 9 |
| Ghana | provisional | 96% | Cost of living and housing | – | 4 |
| Gibraltar | insufficient | 46% | Safety and personal security, Political and institutional stability, Corruption and government integrity, Legal system and property rights, Education quality, Human development and quality of life, Business opportunities and economy | – | 7 |
| Greece | provisional | 100% | – | – | 16 |
| Greenland | provisional | 80% | Corruption and government integrity, Cost of living and housing, Education quality, Human development and quality of life, Cultural fit and lifestyle | – | 4 |
| Grenada | provisional | 96% | Cost of living and housing | – | 5 |
| Guam | provisional | 80% | Corruption and government integrity, Cost of living and housing, Education quality, Human development and quality of life, Cultural fit and lifestyle | standard.inheritance | 7 |
| Guernsey | insufficient | 54% | Political and institutional stability, Corruption and government integrity, Legal system and property rights, Education quality, Human development and quality of life, Business opportunities and economy, Infrastructure and connectivity | – | 5 |
| Guyana | insufficient | 82% | Cost of living and housing | standard.capital_gains | 6 |
| Hong Kong | knocked_out | 100% | – | – | 3 |
| Hungary | provisional | 100% | – | asset_management_foundation.capital_gains, asset_management_foundation.dividends | 15 |
| Iceland | verified | 98% | Cultural fit and lifestyle | – | 6 |
| India | provisional | 96% | Cost of living and housing | – | 3 |
| Indonesia | provisional | 96% | Cost of living and housing | – | 3 |
| Ireland | provisional | 100% | – | – | 11 |
| Isle of Man | insufficient | 54% | Political and institutional stability, Corruption and government integrity, Legal system and property rights, Education quality, Human development and quality of life, Business opportunities and economy, Infrastructure and connectivity | – | 6 |
| Israel | provisional | 100% | – | – | 5 |
| Italy | provisional | 100% | – | – | 18 |
| Japan | provisional | 100% | – | – | 5 |
| Jersey | provisional | 82% | Corruption and government integrity, Education quality, Human development and quality of life, Infrastructure and connectivity | – | 6 |
| Jordan | provisional | 96% | Cost of living and housing | – | 3 |
| Kazakhstan | provisional | 94% | Cost of living and housing, Cultural fit and lifestyle | – | 5 |
| Kiribati | insufficient | 64% | Safety and personal security, Corruption and government integrity, Cost of living and housing, Cultural fit and lifestyle | standard.capital_gains, standard.dividends, standard.wealth_tax, standard.inheritance | 6 |
| Kosovo | provisional | 89% | Corruption and government integrity, Human development and quality of life, Cultural fit and lifestyle | – | 3 |
| Kuwait | provisional | 96% | Cost of living and housing | – | 1 |
| Latvia | verified | 100% | – | – | 3 |
| Lesotho | provisional | 87% | Safety and personal security, Cost of living and housing, Cultural fit and lifestyle | – | 4 |
| Liechtenstein | provisional | 89% | Corruption and government integrity, Education quality, Cultural fit and lifestyle | – | 7 |
| Lithuania | provisional | 100% | – | – | 4 |
| Luxembourg | provisional | 98% | Cultural fit and lifestyle | – | 11 |
| Macau | provisional | 85% | Corruption and government integrity, Cost of living and housing, Human development and quality of life, Cultural fit and lifestyle | – | 2 |
| Malawi | provisional | 88% | Safety and personal security, Cost of living and housing | standard.inheritance | 6 |
| Malaysia | provisional | 100% | – | – | 5 |
| Maldives | provisional | 89% | Cost of living and housing, Education quality, Cultural fit and lifestyle | – | 4 |
| Malta | provisional | 98% | Cultural fit and lifestyle | – | 8 |
| Marshall Islands | provisional | 82% | Safety and personal security, Corruption and government integrity, Cost of living and housing, Cultural fit and lifestyle | standard.inheritance | 3 |
| Mauritius | provisional | 98% | Cultural fit and lifestyle | – | 4 |
| Micronesia (Federated States of) | provisional | 89% | Corruption and government integrity, Cost of living and housing, Cultural fit and lifestyle | standard.inheritance | 3 |
| Moldova | provisional | 100% | – | – | 6 |
| Monaco | provisional | 78% | Safety and personal security, Corruption and government integrity, Education quality, Human development and quality of life, Cultural fit and lifestyle | – | 8 |
| Mongolia | provisional | 96% | Cost of living and housing | – | 3 |
| Montenegro | provisional | 98% | Cultural fit and lifestyle | – | 10 |
| Morocco | provisional | 96% | Cost of living and housing | – | 5 |
| Namibia | provisional | 94% | Cost of living and housing, Cultural fit and lifestyle | – | 2 |
| Nauru | insufficient | 60% | Safety and personal security, Corruption and government integrity, Cost of living and housing, Education quality, Cultural fit and lifestyle | standard.capital_gains, standard.dividends, standard.inheritance | 3 |
| Netherlands | provisional | 100% | – | – | 12 |
| New Caledonia | insufficient | 58% | Safety and personal security, Political and institutional stability, Corruption and government integrity, Cost of living and housing, Education quality, Human development and quality of life, Business opportunities and economy, Cultural fit and lifestyle | standard.dividends, standard.inheritance | 8 |
| New Zealand | provisional | 100% | – | – | 5 |
| Niue | provisional | 64% | Safety and personal security, Corruption and government integrity, Cost of living and housing, Education quality, Healthcare quality and access, Human development and quality of life, Infrastructure and connectivity, Cultural fit and lifestyle | standard.dividends, standard.inheritance | 6 |
| North Macedonia | provisional | 100% | – | – | 4 |
| Norway | verified | 100% | – | – | 11 |
| Oman | provisional | 100% | – | – | 8 |
| Palau | provisional | 89% | Corruption and government integrity, Cost of living and housing, Cultural fit and lifestyle | standard.inheritance | 3 |
| Panama | provisional | 100% | – | – | 3 |
| Philippines | provisional | 96% | Cost of living and housing | – | 3 |
| Poland | verified | 100% | – | – | 8 |
| Portugal | provisional | 100% | – | – | 8 |
| Puerto Rico | provisional | 85% | Corruption and government integrity, Education quality, Human development and quality of life, Cultural fit and lifestyle | – | 10 |
| Qatar | provisional | 100% | – | – | 3 |
| Romania | provisional | 100% | – | – | 11 |
| Russia | knocked_out | 100% | – | – | 8 |
| Rwanda | provisional | 96% | Cost of living and housing | standard.capital_gains, standard.dividends, kifc_expert.capital_gains, kifc_expert.dividends | 4 |
| Saint Kitts and Nevis | knocked_out | 96% | Corruption and government integrity | – | 4 |
| Saint Lucia | knocked_out | 100% | – | – | 3 |
| Saint Vincent and the Grenadines | knocked_out | 96% | Cost of living and housing | – | 5 |
| Samoa | knocked_out | 85% | Corruption and government integrity, Cost of living and housing, Infrastructure and connectivity, Cultural fit and lifestyle | standard.inheritance | 5 |
| San Marino | provisional | 82% | Safety and personal security, Corruption and government integrity, Education quality, Cultural fit and lifestyle | – | 12 |
| Saudi Arabia | provisional | 100% | – | – | 5 |
| Senegal | insufficient | 75% | Safety and personal security, Cost of living and housing | standard.capital_gains, standard.dividends, standard.inheritance | 5 |
| Serbia | verified | 100% | – | – | 5 |
| Seychelles | insufficient | 89% | Cost of living and housing, Cultural fit and lifestyle | standard.capital_gains, standard.dividends, standard.wealth_tax, standard.inheritance | 3 |
| Singapore | verified | 98% | Cultural fit and lifestyle | – | 2 |
| Sint Maarten | insufficient | 38% | Safety and personal security, Political and institutional stability, Corruption and government integrity, Legal system and property rights, Education quality, Human development and quality of life, Infrastructure and connectivity, Cultural fit and lifestyle | standard.inheritance, pensioner_regulation.capital_gains, pensioner_regulation.dividends | 7 |
| Slovakia | verified | 100% | – | – | 4 |
| Slovenia | provisional | 98% | Cultural fit and lifestyle | – | 5 |
| Solomon Islands | provisional | 87% | Safety and personal security, Cost of living and housing, Cultural fit and lifestyle | standard.capital_gains, standard.wealth_tax, standard.inheritance | 5 |
| South Korea | provisional | 96% | Cost of living and housing | – | 7 |
| Spain | verified | 100% | – | – | 6 |
| Sri Lanka | knocked_out | 96% | Cost of living and housing | – | 4 |
| Suriname | insufficient | 80% | Cost of living and housing, Education quality, Cultural fit and lifestyle | standard.capital_gains, standard.wealth_tax, standard.inheritance | 7 |
| Sweden | provisional | 100% | – | – | 10 |
| Switzerland | provisional | 100% | – | – | 6 |
| São Tomé and Príncipe | provisional | 82% | Safety and personal security, Cost of living and housing, Education quality, Cultural fit and lifestyle | standard.capital_gains, standard.dividends, standard.wealth_tax, standard.inheritance | 7 |
| Taiwan | provisional | 85% | Cost of living and housing, Human development and quality of life, Infrastructure and connectivity, Cultural fit and lifestyle | – | 5 |
| Thailand | provisional | 93% | Safety and personal security | – | 5 |
| The Bahamas | knocked_out | 96% | Education quality | – | 6 |
| The Gambia | provisional | 87% | Safety and personal security, Cost of living and housing, Cultural fit and lifestyle | standard.dividends, standard.wealth_tax, standard.inheritance | 5 |
| Tonga | provisional | 89% | Corruption and government integrity, Cost of living and housing, Cultural fit and lifestyle | standard.capital_gains, standard.inheritance | 6 |
| Tunisia | insufficient | 78% | Cost of living and housing | standard.capital_gains, standard.dividends | 7 |
| Turkey | knocked_out | 100% | – | – | 9 |
| Turks and Caicos Islands | knocked_out | 55% | Political and institutional stability, Corruption and government integrity, Legal system and property rights, Education quality, Human development and quality of life, Infrastructure and connectivity | – | 6 |
| Tuvalu | insufficient | 78% | Safety and personal security, Corruption and government integrity, Cost of living and housing, Cultural fit and lifestyle | standard.dividends | 3 |
| US Virgin Islands | insufficient | 75% | Safety and personal security, Corruption and government integrity, Education quality, Human development and quality of life | standard.dividends, standard.inheritance | 8 |
| Ukraine | knocked_out | 100% | – | – | 8 |
| United Arab Emirates | provisional | 100% | – | – | 7 |
| United Kingdom | verified | 100% | – | – | 8 |
| United States | verified | 100% | – | – | 4 |
| Uruguay | provisional | 96% | Cost of living and housing | – | 7 |
| Vanuatu | provisional | 89% | Cost of living and housing, Infrastructure and connectivity, Cultural fit and lifestyle | – | 5 |
| Vietnam | provisional | 88% | Safety and personal security, Cost of living and housing | standard.capital_gains, standard.inheritance | 4 |
| Zambia | provisional | 88% | Safety and personal security, Cost of living and housing | – | 3 |

## Earned income (Expat and Digital nomad)

78 countries researched. Countries without a file are grey for both personas.

| Country | Income tax | Social security deductible | Weak regimes | Reliefs not counted (local work not established) | Missing rents | Open questions |
|---|---|---|---|---|---|---|
| Albania | partially_verified, medium | 100% | unique_permit_digital_nomad | – | – | 8 |
| Andorra | partially_verified, medium | 100% | – | – | – | 9 |
| Antigua and Barbuda | partially_verified, medium | 0% | nomad_digital_residence | – | – | 5 |
| Argentina | partially_verified, low | 100% | – | – | – | 11 |
| Australia | verified, high | 0% | no_nomad_visa | temporary_resident_foreign_income | – | 8 |
| Austria | verified, high | 100% | – | – | rent_2bed | 4 |
| Bahrain | partially_verified, medium | 0% | – | – | – | 3 |
| Barbados | verified, high | 0% | – | – | – | 7 |
| Belgium | partially_verified, medium | 100% | – | – | – | 8 |
| Brazil | partially_verified, medium | 100% | – | – | – | 11 |
| Bulgaria | partially_verified, medium | 100% | – | – | – | 7 |
| Canada | partially_verified, medium | 20% | – | – | – | 8 |
| Cayman Islands | partially_verified, medium | 0% | – | – | – | 6 |
| Chile | partially_verified, medium | 100% | – | chl_first_three_years_chilean_source | – | 9 |
| Colombia | partially_verified, medium | 100% | – | – | – | 11 |
| Costa Rica | partially_verified, medium | 0% | – | digital_nomad_law_10008 | – | 9 |
| Croatia | partially_verified, low | 100% | – | – | – | 10 |
| Cyprus | partially_verified, medium | 100% | cyp_nomad_visa | – | – | 13 |
| Czechia | partially_verified, medium | 0% | – | – | – | 6 |
| Denmark | partially_verified, medium | 100% | – | – | – | 7 |
| Dominica | verified, high | 0% | – | – | – | 7 |
| Dominican Republic | partially_verified, medium | 100% | – | dom_territorial_new_resident | rent_2bed | 9 |
| Estonia | partially_verified, high | 100% | – | – | – | 7 |
| Finland | partially_verified, low | 81% | – | – | – | 6 |
| France | partially_verified, medium | 86% | – | – | – | 8 |
| Georgia | partially_verified, medium | not researched | – | remotely_from_georgia | – | 9 |
| Germany | partially_verified, medium | 94% | – | – | – | 8 |
| Greece | partially_verified, medium | 100% | – | – | – | 13 |
| Grenada | partially_verified, medium | not researched | – | – | – | 8 |
| Hong Kong | partially_verified, medium | 100% | – | territorial_profits | – | 7 |
| Hungary | partially_verified, medium | 0% | hun_atalanyado | – | – | 8 |
| Iceland | partially_verified, medium | 100% | – | – | rent_2bed | 6 |
| Indonesia | partially_verified, medium | 75% | e33g, foreign_expert_territorial | – | – | 8 |
| Ireland | partially_verified, high | 0% | stamp0 | – | – | 8 |
| Italy | partially_verified, medium | 100% | ita_nomad_visa | – | – | 16 |
| Japan | partially_verified, medium | 100% | non_permanent_resident | – | – | 8 |
| Latvia | partially_verified, medium | 100% | – | – | – | 6 |
| Lithuania | partially_verified, medium | 0% | ltu_individual_activity | – | – | 6 |
| Luxembourg | partially_verified, medium | 100% | – | – | – | 8 |
| Malaysia | partially_verified, medium | 81% | iskandar_knowledge_worker | foreign_income_exemption | rent_2bed | 12 |
| Malta | partially_verified, medium | not researched | – | – | – | 10 |
| Mauritius | partially_verified, medium | not researched | – | – | rent_2bed | 11 |
| Mexico | partially_verified, medium | 0% | – | – | – | 13 |
| Montenegro | partially_verified, low | 0% | – | – | – | 11 |
| Morocco | partially_verified, medium | not researched | – | – | – | 7 |
| Netherlands | partially_verified, medium | 0% | – | – | – | 8 |
| New Zealand | partially_verified, medium | 0% | – | transitional_resident | – | 7 |
| North Macedonia | partially_verified, low | 100% | – | – | rent_2bed | 5 |
| Norway | partially_verified, medium | 0% | – | – | – | 4 |
| Oman | verified, high | 0% | – | – | – | 5 |
| Panama | verified, high | 0% | short_stay_remote_worker | short_stay_remote_worker | – | 8 |
| Philippines | partially_verified, medium | 100% | – | – | – | 9 |
| Poland | partially_verified, medium | 60% | – | – | – | 7 |
| Portugal | partially_verified, medium | 100% | – | – | – | 10 |
| Puerto Rico | verified, high | not researched | – | – | – | 9 |
| Qatar | partially_verified, medium | 0% | – | – | – | 5 |
| Romania | partially_verified, medium | 100% | rou_nomad_visa | – | – | 11 |
| Saint Kitts and Nevis | partially_verified, medium | 0% | digital_resident | – | – | 6 |
| Saint Lucia | partially_verified, low | 100% | – | – | rent_1bed | 5 |
| Saudi Arabia | partially_verified, medium | 0% | – | – | – | 4 |
| Serbia | partially_verified, medium | 0% | temporary_residence_remote | – | – | 6 |
| Singapore | verified, high | 0% | – | – | – | 5 |
| Slovakia | verified, high | 100% | – | – | – | 6 |
| Slovenia | partially_verified, medium | 100% | – | – | – | 10 |
| South Africa | verified, high | not researched | – | – | – | 6 |
| South Korea | partially_verified, medium | 100% | f_1_d_workation | – | – | 9 |
| Spain | partially_verified, medium | 100% | – | – | – | 9 |
| Sweden | verified, high | 0% | – | – | rent_2bed | 6 |
| Switzerland | partially_verified, medium | 100% | – | – | – | 6 |
| Taiwan | partially_verified, medium | not researched | nomad_none | – | – | 9 |
| Thailand | verified, high | 100% | – | – | – | 6 |
| The Bahamas | partially_verified, medium | 0% | – | – | rent_1bed, rent_2bed | 6 |
| Turkey | partially_verified, medium | 100% | – | tr_law_7582_foreign_income_exemption | – | 9 |
| United Arab Emirates | verified, high | 0% | dubai_virtual_working_programme | – | – | 4 |
| United Kingdom | partially_verified, medium | 0% | – | – | rent_2bed | 7 |
| United States | partially_verified, medium | 0% | – | – | – | 7 |
| Uruguay | partially_verified, medium | not researched | – | ury_new_resident_tax_holiday | – | 11 |
| Vietnam | partially_verified, medium | 100% | – | – | – | 6 |
