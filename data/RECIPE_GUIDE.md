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

## What the engine already understands

Set these in the **tax file** (never in the recipe); each needs the statute:

- `thresholds_indexed` on `wealth_tax` and `inheritance`, `indexed_to_inflation` on `lump_sum`: true only when the
  law itself raises the amounts with prices each year (US IRC 2010(c)(3), Netherlands art. 10.1 Wet IB 2001).
  Amounts changed only by occasional amendment, or frozen (UK nil-rate band), stay false: over 60 years they
  shrink in real terms.
- `lump_sum.spouse_supplement`: a fixed extra amount when the spouse is covered too (Italy EUR 50,000).
- `inheritance.deemed_disposal_rate`: income tax on gains at death. For a structure path it taxes the growth of
  the company's shares since the family put the portfolio in (Netherlands Box 2, Canada).
- `inheritance.company_shares_at_book_value`: a structure's shares are valued at book equity at death, so the
  portfolio's unrealised gains are not taxed (Italy art. 16 TUS).
- `wealth_tax.components[].credits_withholding`: foreign dividend withholding is credited against a wealth or
  deemed-return tax (Netherlands Box 3).
- `credit_cap` and `foreign_tax_credit: "deduction"` on dividends: a credit limited to part of the tax (France
  12.8%), or the rate applied to the dividend net of foreign withholding (Belgium).
- `main_home_valued_at` / `securities_valued_at` on a wealth-tax component: valuation discounts (France IFI 70%,
  Norway shares 80%).
- `wealth_tax.income_cap`: income plus wealth tax capped at a share of income (Spain art. 31 LIP).
- `lump_sum.is_cap`: the amount is a maximum (Guernsey): the family pays the lower of it and the ordinary tax.
- `wealth_tax.starts_after_years`: the wealth tax applies only after that many years of residence (San Marino).
- `income_cap.counted_income_tax_rate`, `min_income_yield`, `min_wealth_tax_rate`: caps that count only part of
  the income tax, assume a minimum yield on wealth, or keep a minimum wealth tax (Swiss cantonal caps).
- `structure.running_cost_deductible_at`: the structure's running costs reduce its own tax at this rate.
- A path may not use a regime with `requires_qualifying_activity`: the family has no job or business, as in
  the scores.

## Adding a structure

If wealthy families in the country commonly hold a portfolio through a structure that the tax file lacks
(a private foundation, a holding company, a family trust), add it to the tax file as a `structure` regime
with every metric researched and sourced, following `data/RESEARCH_GUIDE.md`, then add the path. Only real,
commonly used structures; a structure that is never better than direct holding is still worth a path if
advisers commonly recommend it, so the page can show why.

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

