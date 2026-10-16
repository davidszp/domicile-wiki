# Projection recipe guide

One file per major jurisdiction: `data/recipes/<ISO3>.json`, validated by `RecipeFile` in
`domicile/schema.py`. A recipe lists the ways a wealthy family can hold its portfolio in the country
(personally, through a company, a foundation, a trust) so that `domicile/projection.py` can project each
one over 60 years, with a death in years 30 and 60.

Run it: `uv run python -m domicile.projection DEU` (or no argument for every recipe).
Check a file: `uv run python -m domicile.validate data/recipes/<ISO3>.json`

## The rule that keeps this maintainable

**A recipe holds no tax rates.** Each path names a regime in `data/jurisdictions/<ISO3>.json`, and every
rate (dividends, gains, wealth tax, inheritance brackets, a structure's payout tax and running cost) is
read from there. When a rate changes, fix the tax file; every projection follows. Change a recipe only
when *how a path works* changes.

If a path needs a rate the tax file cannot hold, add the field to the schema and the tax file first;
never put the rate in the recipe.

## Fields

- `paths[]`
  - `id`, `name`: e.g. `vv_gmbh`, "Asset-management GmbH".
  - `regime`: the regime id in the tax file. A time-limited regime (with `duration_years`) applies from
    year 1 until it ends, then the standard rules.
  - `estate`: `portfolio` when the parents' estate holds the portfolio or the shares of the company
    that holds it (inheritance tax applies to it); `outside_estate` when a foundation or trust owns it
    and nothing passes at death. Only a `structure` regime may be `outside_estate`, and only if the
    statute or the tax authority says the assets are not the founder's.
  - `note`: why the path behaves as modelled, with the statute where it matters (e.g. no business
    relief for an asset-management company).
- `checks[]`: cases worked **by hand from the statute**, which the engine must reproduce (see below). At
  least one `annual` case per path and one `inheritance` case.
- `assumptions`: simplifications particular to this country.
- `open_questions`, `sources`: as in the other guides.

## Which countries

Major industrialised countries and the expat and wealth hubs (about 35). Others keep the single annual
estimate on their page.

## Hand-worked checks

Each check gives a small case in the country's own currency (so exchange rates cannot move it) and the tax
the law charges, worked step by step in `working` with the statute for each step:

- `annual`: `dividends`, `realised_gains`, `wealth` (portfolio value) and `foreign_share` (foreign dividends
  carry 15% withholding). `expected` is the residence country's tax after any credit, running costs
  included, payout tax excluded. `phase: "after"` checks the standard rules a time-limited regime falls back to.
- `inheritance`: `estate` passing to `children` equal heirs.

`tests/test_projection.py` runs every check through the engine. Where the engine knowingly simplifies the
law (no allowances, the surcharge on a credited tax, a capped social contribution), record the gap in
`model_difference` (engine minus law) and name the simplification in `model_note`.

**Never copy a number from the engine or the tax file into `expected`**: the check is worth something only
because it is calculated independently. When a check fails, find out whether the tax file or the hand
calculation is wrong; never widen `model_difference` to make a test pass.

## When a change does not fit

Recipes can only use what the engine already understands: a regime from the tax file, assets inside or
outside the estate, a regime's duration. If the law changes how a path works in a way the recipe cannot
express (a new kind of tax, an exit tax on leaving, a structure taxed on deemed returns, assets moving in
or out of the estate on new terms), **do not approximate it with the nearest field**. Add an open question
starting "Needs an engine change:" with the statute and the change; the monthly review lists it as a
decision for the maintainer, and the engine is extended in code first.

