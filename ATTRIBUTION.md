# Attribution

domicile.wiki is built from other people's data. This file lists every source the build uses, what it
is used for, and the terms it is published under. Last reviewed: 2026-10-15.

The project's own work is licensed separately:

- **Code** (`domicile/`, `web/js/`, `web/css/`, `web/index.html`, `tests/`): GNU Affero General Public License
  v3.0 or later, see [`LICENSE`](LICENSE).
- **Researched data, dossiers and documentation** (`data/jurisdictions/`, `data/subnational/`, `data/income/`,
  `data/indicators/expat_cola/`, `data/indicators/nomad_scene/`, `docs/`, the generated files in `web/data/`):
  Creative Commons Attribution-ShareAlike 4.0, see [`LICENSE-DATA`](LICENSE-DATA). Third-party data inside them
  keeps the terms listed below.

Where a source's terms are uncertain this file says so; those entries are marked **to confirm** and should be
checked before relying on them for anything beyond this project.

## Maps and geography

| Source | Used for | Terms |
|---|---|---|
| [Natural Earth](https://www.naturalearthdata.com/) 1:10m admin-0 countries and admin-1 states/provinces | All boundaries, label points | Public domain |
| [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors | Coworking-space counts (`data/indicators/nomad_scene/coworking.csv`, reference only) and city geocoding | © OpenStreetMap contributors, [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/). The coworking counts are a derived database and stay under ODbL. |
| [ohsome API](https://api.ohsome.org/) by HeiGIT, Heidelberg | Counting OpenStreetMap coworking spaces | Service over OpenStreetMap data (ODbL) |
| [Nominatim](https://nominatim.org/) | Geocoding city centres | Service over OpenStreetMap data (ODbL); used within its usage policy |
| [European Union: EU countries](https://european-union.europa.eu/principles-countries-history/eu-countries_en); [European Commission: outermost regions](https://ec.europa.eu/regional_policy/policy/themes/outermost-regions_en) | EU membership marks (`data/scoring_config.json` → `eu`) | EU website content: reuse allowed with acknowledgement ([Commission Decision 2011/833/EU](https://eur-lex.europa.eu/eli/dec/2011/833/oj)) |

## Indicators

| Source | Used for | Terms |
|---|---|---|
| [World Bank Worldwide Governance Indicators](https://www.worldbank.org/en/publication/worldwide-governance-indicators), 2025 release | Rule of law, corruption, stability, regulatory quality, voice and accountability, government effectiveness; knock-outs | [CC BY 4.0](https://datacatalog.worldbank.org/public-licenses) |
| [World Bank World Development Indicators](https://data.worldbank.org/) | Homicide rate, life expectancy, UHC index, learning outcomes, GDP per capita (PPP), internet users, logistics index, migrant share, price level ratio, official exchange rates (fallback) | [CC BY 4.0](https://datacatalog.worldbank.org/public-licenses) |
| [UNDP Human Development Report 2025](https://hdr.undp.org/) composite indices time series | Human Development Index | UNDP states its HDR site material is under CC BY 3.0 IGO; one catalogue lists a 2020 report as CC BY-NC-SA 3.0 IGO. **To confirm** for the 2025 data. |
| [Transparency International Corruption Perceptions Index 2025](https://www.transparency.org/en/cpi) | Corruption score and knock-out | CPI data: [CC BY 4.0](https://www.transparency.org/en/copyright-enquiries) ("Corruption Perceptions Index 2025 by Transparency International is licensed under CC BY 4.0"). Changes made here: rescaled to 0-100 and combined with WGI. |
| [EF English Proficiency Index 2025](https://www.ef.com/wwen/epi/) (EF Education First / Signum International AG) | International, English-speaking environment | No reuse licence found. Only published country scores are used, with attribution. **To confirm** with EF before wider reuse. |
| [OECD PISA 2025 Results (Volume I)](https://doi.org/10.1787/73451bc5-en), 8 Sept 2026 | Education (70% of the education metric) | OECD content published after 1 July 2024 is generally [CC BY 4.0](https://www.oecd.org/en/about/oecd-open-by-default-policy.html); check the report's copyright page. |
| [CIA World Factbook](https://www.cia.gov/the-world-factbook/) language entries; [Wikipedia: countries where English is an official language](https://en.wikipedia.org/wiki/List_of_countries_and_territories_where_English_is_an_official_language) | English-majority list for the English-environment metric | Factbook: public domain. Wikipedia: CC BY-SA 4.0. |
| Local statistical offices (Crown Dependencies, small territories) | Indicator overrides where international datasets have no value | Each override cites its source in `data/jurisdictions/<ID>.json` |

## Exchange rates

| Source | Used for | Terms |
|---|---|---|
| [European Central Bank euro foreign exchange reference rates](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html) | Converting all amounts to EUR | Free reuse with the source acknowledged |
| [US Federal Reserve H.10](https://www.federalreserve.gov/releases/h10/current/default.htm) | Rates the ECB does not publish (e.g. TWD) | US government work, public domain |
| Central bank pegs (UAE, Saudi Arabia, Qatar, Bahrain, Oman, Bahamas and others; listed in `domicile/fx.py`) | Pegged currencies | Official published rates |

## Tax, income and residence research

More than 5,000 sources: legislation, tax authorities, governments, intergovernmental bodies and professional
firms (above all [PwC Worldwide Tax Summaries](https://taxsummaries.pwc.com/)). Every one is cited next to the
figure it supports in `data/jurisdictions/`, `data/subnational/` and `data/income/`, and all are listed with
publisher, tax year and date verified in [`docs/SOURCE_REGISTER.csv`](docs/SOURCE_REGISTER.csv). The project
summarises facts from them in its own words; it does not reproduce their text.

| Source | Used for |
|---|---|
| [IRS: United States income tax treaties A to Z](https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-z) | US dividend withholding (treaty list) |
| Rent figures (Global Property Guide, Investropa, Numbeo, Daft.ie, listing sites, statistical offices) | Annual Household Cost; each figure cites its source in `data/income/` or `data/jurisdictions/` |

## US states for the Expat and Digital nomad (`data/income_regions/USA.json`)

| Source | Used for | Terms |
|---|---|---|
| [Tax Foundation, State Individual Income Tax Rates and Brackets 2026](https://taxfoundation.org/) and state revenue departments | State income tax brackets and deductions | Facts summarised with attribution; each unit cites its pages |
| City tax authorities (New York City, Philadelphia, Detroit, Columbus and others) | City income taxes | Government publications |
| [US Bureau of Economic Analysis, Regional Price Parities](https://apps.bea.gov/regional/zip/MARPP.zip) (2024) | Price level of each state's main metro relative to Austin; also rescales the US salary multiplier from New York to Austin | US government work, public domain |
| [Zumper National Rent Report](https://www.zumper.com/) city pages, October 2026 | 1- and 2-bedroom city rents | Published averages used with attribution |

## Expat salary multipliers (`data/indicators/expat_cola/`)

| Source | Terms |
|---|---|
| [US Department of State, DSSR 920 Post (Cost-of-Living) Allowance](https://aoprals.state.gov/Web920/cola.asp), effective 4 Oct 2026 | US government work, public domain |
| [UN International Civil Service Commission, post adjustment](https://icsc.un.org/Home/DataPostAdjustment) (circular PAC/621 and October 2026 memo) | UN publication; used as published figures with attribution |
| [Eurostat, correction coefficients for EU officials](https://ec.europa.eu/eurostat/web/civil-servants-remuneration/publications) | [Eurostat reuse policy](https://ec.europa.eu/eurostat/help/copyright-notice): CC BY 4.0 |
| [Auswärtiges Amt, Kaufkraftausgleich Länderliste](https://www.auswaertiges-amt.de/resource/blob/2657502/48edbbc7e2bd1b6d115b041fe1025878/laenderliste-data.pdf) (as of 1 Oct 2026) | German federal government publication; **to confirm** reuse terms |

## Digital nomad scene (`data/indicators/nomad_scene/`)

Published rankings, used only for which cities they name and in what order:

- [Savills Executive Nomad Index 2025](https://impacts.savills.com/social-change/executive-nomads-2025-quality-of-life-is-a-priority-in-location-choices.html) (Savills Research, Sept 2025)
- [Nomads.com](https://nomads.com/) (formerly Nomad List), city list captured Oct 2026
- [Flatio: best cities for digital nomads 2025](https://www.timeout.com/news/these-are-officially-the-best-cities-for-digital-nomads-in-2025-020425) (via Time Out, Feb 2025)
- [ScoutLogic: hottest digital nomad destinations 2025](https://www.timeout.com/usa/news/want-to-work-abroad-these-are-the-hottest-digital-nomad-destinations-of-2025-082525) (via Time Out, Aug 2025)
- [Instant Offices: best places to be a digital nomad 2025](https://www.timeout.com/news/the-5-best-cities-to-be-a-digital-nomad-in-2025-081525) (via Time Out, Aug 2025)
- [InsureMyTrip: 10 best cities for digital nomads 2025](https://www.hotel-online.com/news/from-affordability-to-safety-the-10-best-cities-for-digital-nomads-2025) (via USA Today / Hotel Online, Mar 2025)
- [hotelwithtub.com: top 100 digital nomad destinations 2025](https://travellingforbusiness.co.uk/?p=16446) (via Travelling for Business, May 2025)
- [Big 7 Travel: 25 best cities for digital nomads 2025](https://businessreport.co.za/news/south-africa/2025-01-29-cape-town-ranks-6th-among-the-best-cities-for-digital-nomads-in-2025) (via Business Report, Jan 2025)

## Knock-outs and red flags

| Source | Used for |
|---|---|
| [EU Sanctions Map](https://www.sanctionsmap.eu/), [OFAC sanctions programs](https://ofac.treasury.gov/sanctions-programs-and-country-information) | Sanctions knock-out |
| IMF Article IV staff reports for [China (CR 26/44)](https://www.imf.org/-/media/files/publications/cr/2026/english/1chnea2026001-source-pdf.pdf), [Sri Lanka](https://www.imf.org/-/media/files/publications/cr/2025/english/1lkaea2025002-print-pdf.pdf), [Fiji](https://www.imf.org/-/media/files/publications/cr/2025/english/1fjiea2025001-print-pdf.pdf), [Samoa](https://www.imf.org/-/media/files/publications/cr/2025/english/1wsmea2025001-print-pdf.pdf); central-bank rules of [Sri Lanka](https://www.cbsl.gov.lk/sites/default/files/cbslweb_documents/laws/cdg/Foreign_Exchange_Act_Direction_No_16_of_2021_e.pdf), [Fiji](https://www.rbf.gov.fj/wp-content/uploads/2025/12/Exchange-Control-Guidelines-effective-1-January-2026.pdf) and [Samoa](https://cbs.gov.ws/media/Exchange-Control-Information-Booklet-2026-final.pdf) | Capital-controls knock-out |
| [World Justice Project Rule of Law Index 2025](https://worldjusticeproject.org/rule-of-law-index/downloads/WJPIndex2025.pdf), [Freedom House 2026](https://freedomhouse.org/), [US Hong Kong Business Advisory](https://ofac.treasury.gov/media/933161/download?inline=), [UK FCDO travel advice](https://www.gov.uk/foreign-travel-advice/china/safety-and-security), Radio Free Asia, Hughes Hubbard & Reed, Safeguard Defenders | Rule-of-law knock-out (China); red flags (Hong Kong, Macau) |
| AP (via WTOP), Macau Business, Human Rights Watch, [UK FCDO travel advice: Macao](https://www.gov.uk/foreign-travel-advice/macao/safety-and-security); Deloitte study for [InvestHK](https://www.investhk.gov.hk/) (family-office count) | Red flags for Macau and Hong Kong; see `docs/research/macau_foreign_wealth.md` |

The full evidence, with every URL, is in [`docs/research/china_hong_kong_foreign_wealth.md`](docs/research/china_hong_kong_foreign_wealth.md)
and [`docs/research/capital_controls_screen.md`](docs/research/capital_controls_screen.md).

## Software bundled with the app

| Software | Licence |
|---|---|
| [D3](https://d3js.org/) 7.9.0 (`web/vendor/d3-7.9.0.min.js`) | ISC, see `web/vendor/d3.LICENSE` |
| [topojson-client](https://github.com/topojson/topojson-client) 3.1.0 (`web/vendor/topojson-client-3.1.0.min.js`) | ISC, see `web/vendor/topojson-client.LICENSE` |
| [mapshaper](https://github.com/mbloch/mapshaper) 0.6.121 (build-time only, not shipped) | MPL 2.0 |
| [Newsreader](https://github.com/productiontype/Newsreader) (headings, wordmark; `web/vendor/fonts/newsreader-*.woff2`) | SIL Open Font License 1.1, see `web/vendor/fonts/Newsreader-OFL.txt` |
| [Manrope](https://github.com/sharanda/manrope) (text; `web/vendor/fonts/manrope-*.woff2`) | SIL Open Font License 1.1, see `web/vendor/fonts/Manrope-OFL.txt` |

## Corrections

If you hold rights in any of these sources and something here is wrong or missing, please open an issue.
