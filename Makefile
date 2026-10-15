# Reproducible build. `make all` runs everything from raw downloads to a tested site in web/.
PY := uv run python

.PHONY: all setup data geo indicators fx build gaps test test-fast serve validate clean

all: setup data build test

setup:            ## install Python and JS tooling (pinned)
	uv sync
	npm ci

data: geo indicators fx

geo:              ## download Natural Earth and build web/data/*.topo.json
	$(PY) -m domicile.geo

indicators:       ## refresh World Bank / UNDP / TI / EF indicators (network)
	$(PY) -m domicile.indicators

fx:               ## refresh ECB reference rates (network)
	$(PY) -m domicile.fx

validate:         ## schema-check every researched data file
	$(PY) -m domicile.validate

build: validate   ## score everything and write web/data
	$(PY) -m domicile.build
	$(PY) -m domicile.gaps

test:             ## geography, scoring, data, JS parity and browser tests
	uv run pytest -q

test-fast:        ## everything except the browser tests
	uv run pytest -q --ignore=tests/test_e2e.py

serve:            ## local server with the production security headers
	$(PY) -m domicile.serve 8765

clean:
	rm -rf data/build web/data/profiles web/data/dossiers
