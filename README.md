<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="web/logo-dark.svg">
    <img src="web/logo.svg" alt="domicile.wiki" width="420">
  </picture>
</p>

# domicile.wiki

An open, source-linked map of where to make your home: it ranks countries and regions for three
kinds of mover. A **high-net-worth individual (HNWI)** and family (capital gains, dividends, inheritance and wealth taxes over two
generations), an **expat** employee (income tax, salary by location, money left over after living
costs) and a **digital nomad** (income tax, living costs, visas, the local nomad scene), each also
scored on safety, stability, rule of law, corruption, healthcare and quality of life. Every score can
be traced to a dated dossier, a structured data file, a public dataset and a documented
transformation.

It is a static site (no server code) and can be deployed as is to Cloudflare Pages or any static host.

> Illustrative research, not tax or legal advice. The tax research was carried out with AI assistance
> against official and professional sources and has not been reviewed by a licensed adviser.

## What is in it

| Area | Where |
|---|---|
| Four ways through the same data: Guided (questions, then a shortlist), Factbook (one page per country), Explorer (filterable table and chart), Compare (changes from where you live, and a tax calculator) | `web/js/main.js`, `web/js/modes/` |
| Guide on the left: your situation (persona, passport, weights), search, and a globe that turns to the place you last opened | `web/js/guide.js`, `web/js/globe.js` |
| Swiss cantons, Spanish autonomous communities, Italian regions, UAE emirates, US states | `data/subnational/*.json` |
| Country pages: taxes, immigration paths per passport, spouse and children inheritance, red flags, sources | `web/js/panels/` |
| Settings kept in the browser (no login): weights and saved weight sets, knock-out rules and exceptions, export and import | `web/js/modes/settings.js`, `web/js/state.js` |
| Family tax-scenario calculator (EU, US or other citizenship) | `web/js/panels/calculator.js`, `web/js/taxcalc.js` |
| Methodology and source-register pages | `web/js/panels/methodology.js`, `sources.js` |
| Researched tax data, one structured file per jurisdiction | `data/jurisdictions/<ISO3>.json` |
| Dated, human-readable legal dossier per jurisdiction | `docs/jurisdictions/<ISO3>.md` |
| Scoring configuration (weights, transforms, reference family, bands) | `data/scoring_config.json` |
| Indicator datasets (World Bank WGI/WDI, UNDP HDI, TI CPI, EF EPI) | `data/indicators/` |
| Immigration routes per country and citizenship group | `data/immigration/<ISO3>.json`, `data/IMMIGRATION_GUIDE.md` |
| Borders follow the UN; non-member territories are marked, not ranked | `domicile/geo.py` (`UN_BORDERS`), `data/scoring_config.json` (`territories`) |
| Simulated visitors and a random-click fuzzer (`make fuzz`, `make fuzz-monkey`) | `tools/fuzz/` |
| Data-gap report and source register | `docs/DATA_GAPS.md`, `docs/SOURCE_REGISTER.csv` |

## Setup

Requirements: [uv](https://docs.astral.sh/uv/) (Python 3.13+), Node 20+ and npm. Chromium is used by the
browser tests if present.

```bash
make setup      # uv sync + npm ci (pinned versions)
make data       # Natural Earth boundaries, indicators and FX (downloads)
make build      # validate data, score, write web/data, regenerate docs/DATA_GAPS.md
make test       # geography, scoring, data, JS/Python parity and browser tests
make serve      # http://127.0.0.1:8765 with the production security headers
```

`make geo` must run once on a fresh checkout before the tests, because `data/build/` (full-resolution
boundaries used by the geographic tests) is not committed.

## How the pipeline works

1. **Geography** (`domicile/geo.py`): Natural Earth 1:10m admin-0 and admin-1 shapefiles are simplified
   with mapshaper, which keeps shared borders gap-free. Units under 3,000 km² keep full detail so small
   states keep their true shape. Natural Earth label points that fall in the sea are moved onto land.
2. **Indicators** (`domicile/indicators.py`): World Bank API (WGI 2025, homicides, life expectancy, UHC,
   learning outcomes, GDP, internet, LPI, migrants, price levels), the UNDP HDI CSV, Transparency
   International CPI 2025, and EF EPI 2025. Values older than ten years are dropped.
3. **FX** (`domicile/fx.py`): ECB reference rates, official pegs, and World Bank rates as a last resort.
4. **Tax data**: `data/jurisdictions/*.json` validated by `domicile/schema.py` (pydantic, `extra=forbid`).
5. **Scoring** (`domicile/scoring.py`, `domicile/taxcalc.py`):
   - Tax metrics are effective burdens for an illustrative family, not headline rates.
   - The family is assumed to stay two generations (60 years): time-limited regimes are blended with
     standard rules over that horizon, and inheritance tax is counted once per generation.
   - US citizens get a US federal floor.
   - Residence countries without a US tax treaty bear the extra 15% US withholding on US dividends.
   - Missing data score 0 and are reported, never imputed.
6. **Build** (`domicile/build.py`) writes compact JSON for the map plus one lazily loaded profile per
   jurisdiction. The browser repeats only the final weighting step, so users can change weights. The
   JS and Python engines are tested for exact parity.

## Updating a jurisdiction (the dossier workflow)

Each jurisdiction has two files that must agree:

- `docs/jurisdictions/<ISO3>.md`: the dated legal dossier, with the rules, statute references, reasoning,
  sources and a **Change log**.
- `data/jurisdictions/<ISO3>.json`: the structured numbers the app scores.

To update one:

1. Edit the dossier: describe the change, cite the source, and add a line to its Change log.
2. Update the JSON to match. Set `researched_on`, and the dossier's `Last reviewed:` line, to the date
   of review; a test enforces that the two match.
3. Run `make build test`.

`data/RESEARCH_GUIDE.md` defines every field and the sourcing rules. Law that has been announced but is
not yet in force is described in the text, never scored.

## Deploying (Cloudflare Pages or any static host)

The deployable site is the `web/` directory, already built and committed: plain HTML, ES modules and
JSON, with no build step on the host. `web/_headers` sets the security and cache headers; Cloudflare
Pages reads it, and `domicile/serve.py` applies the same file locally.

Cloudflare Pages, connected to the GitHub repository (redeploys on every push):

1. Workers & Pages → Create → Pages → Connect to Git → choose the repository.
2. Framework preset: None. Build command: *(empty)*. Build output directory: `web`.
3. Add the custom domain under the project's Custom domains tab.

To update the live site: rebuild locally (`make build test`), commit `web/data/`, push.

Or deploy straight from this machine with Wrangler (`wrangler.jsonc` serves `web/` as static assets and
applies `web/_headers`): `npx wrangler@4.151.0 login` once, then `npx wrangler@4.151.0 deploy`. The
preview runs at <https://domicile-preview.domicile-web.workers.dev>.

### Security

- **No server code and no runtime third-party requests.** D3 7.9.0 and topojson-client 3.1.0 are
  vendored in `web/vendor/` (licences alongside).
- **Strict Content-Security-Policy:** `default-src 'self'`, no inline scripts or styles, no `eval`,
  `frame-ancestors 'none'`. Also nosniff, HSTS, COOP/CORP and a restrictive Permissions-Policy.
  `domicile/serve.py` applies the same headers locally, so the browser tests run under the
  production CSP.
- **No `innerHTML`:** every piece of data reaches the DOM through `textContent`. Links pass an
  http(s)-only URL check and open with `rel="noopener noreferrer"`. The dossier Markdown renderer
  builds DOM nodes and never parses HTML.
- **Validated fetches:** identifiers are checked against a strict pattern before any data file is
  fetched, and fetches have timeouts and explicit error states.
- **CSV exports** neutralise spreadsheet formula injection.
- **Nothing leaves the browser.** Only weights, shortlist and citizenship are kept, in
  `localStorage`. Calculator inputs are never stored.

### Performance

- **First load:** about 300 KB compressed (D3 92 KB, world boundaries 120 KB, scores 45 KB, app code
  and styles about 45 KB).
- **Lazily loaded:** detailed boundaries (430 KB) load in the background for the close-ups, and
  regional boundaries and per-jurisdiction profiles load on demand.
- **Caching:** vendored files are served with immutable cache headers; data and code with short
  revalidating caches.

## License

domicile.wiki is free software and stays that way.

- **Code** is licensed under the [GNU Affero General Public License v3.0 or later](LICENSE). Anyone who
  modifies it and runs it, including as a website, must publish their source under the same licence.
- **Researched data, dossiers and documentation** are licensed under
  [Creative Commons Attribution-ShareAlike 4.0](LICENSE-DATA).
- **Third-party data** keeps its own terms; every source is listed in [ATTRIBUTION.md](ATTRIBUTION.md).
- **Contributions** are accepted under the same licences (inbound = outbound), with no copyright
  assignment, so nobody, the maintainers included, can take the project closed. Sign off your commits
  (`git commit -s`, the [Developer Certificate of Origin](https://developercertificate.org/)).
- **Name and logo:** "domicile.wiki" and the globe logo identify this project. Forks are welcome under
  the licences above, but please use a different name and logo so people can tell them apart.

## Tests

```
tests/test_geography.py  reference cities in the right country/canton/emirate, Cyprus in the eastern
                         Mediterranean, Switzerland in central Europe, Dubai/Abu Dhabi in the UAE,
                         Caribbean capitals, label points inside features, valid geometries, view coverage
tests/test_scoring.py    weights sum to 100%, transforms, brackets, blending, US overlay, treaty withholding,
                         missing data never scored favourably, status rules
tests/test_data.py       schema validation, dated dossiers, sources and tax years on every claim,
                         source register coverage
tests/test_parity.py     browser (JS) and Python engines agree on every score and calculator result
tests/test_e2e.py        real browser under the production CSP: labels match features, small states
                         clickable, Bermuda inset, weights persist, mobile layout, CSV safety
```
