# Reproducible build. `make all` runs everything from raw downloads to a tested site in web/.
PY := uv run python

.PHONY: all setup data geo indicators fx build gaps test test-fast serve validate clean fuzz fuzz-monkey monthly-prepare monthly-finish

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

monthly-prepare:  ## snapshot the build and write the monthly workflow's arguments (docs/MONTHLY_UPDATE.md)
	@mkdir -p .claude/workflows && ln -sf ../../tools/monthly/monthly-update.workflow.js .claude/workflows/monthly-update.js
	$(PY) -m domicile.monthly prepare

monthly-finish:   ## after approving an update: record today as the last run
	$(PY) -m domicile.monthly finish

fuzz:             ## simulated visitors click through the site; screenshots and findings in .fuzz-out/
	uv run python tools/fuzz/journeys.py

fuzz-monkey:      ## seeded random clicking on desktop, tablet and phone; findings in .fuzz-out/monkey/
	uv run python tools/fuzz/monkey.py

serve:            ## local server with the production security headers
	$(PY) -m domicile.serve 8765

clean:
	rm -rf data/build web/data/profiles web/data/dossiers
