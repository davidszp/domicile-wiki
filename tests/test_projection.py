"""The 60-year projection: the yearly loop, regime expiry, death, structures, and the recipe files."""

import json
from dataclasses import replace

import pytest

from conftest import ROOT
from domicile import build, fx, projection as P, scoring
from domicile.taxcalc import Rules
from domicile.validate import validate_file

CFG = scoring.load_config()
J = build.load_jurisdictions()
W = CFG["us_dividend_withholding"]
RECIPES = sorted((ROOT / "data" / "recipes").glob("*.json"))
# portax's deterministic case (~/Builds/portax, config.yaml of 2026-04-26), used as an outside check.
PORTAX = P.Assumptions(portfolio=20e6, years=30, deaths=(30,), dividend_yield=0.02, price_growth=0.06, inflation=0.025,
                       realisation=0.30, spending=150e3, spending_growth=0.03, home=0, foreign_share=1.0)


def flat(div=0.0, cg=0.0, payout=None, inh=0.0, wealth=None):
    """Rules with flat rates, for hand-checkable cases."""
    return Rules(cgt={"listed_domestic": cg, "listed_foreign": cg}, div={"domestic": div, "foreign_gross": div, "ftc": "none"},
                 wealth=wealth or [], inh={"basis": "estate", "brackets": [[0.0, inh]], "exemption": 0.0, "mode": "marginal", "other_cost": 0.0},
                 structure=None if payout is None else {"payout_rate": payout, "running_cost": 0.0})


def run(rules, a, after=None, duration=None, estate="portfolio"):
    years, missing = P.project_path(rules, after or rules, duration, a, us_treaty=True, cfg_wht=W, estate=estate)
    assert missing is None
    return years


def test_untaxed_portfolio_follows_the_closed_form():
    a = P.Assumptions(portfolio=1e6, years=5, deaths=(), dividend_yield=0.02, price_growth=0.05, inflation=0.0, spending=10e3,
                      spending_growth=0.0, home=0, source_wht=0.0)
    v = 1e6
    for _ in range(5):
        v = v * 1.07 - 10e3
    assert run(flat(), a)[-1].wealth == pytest.approx(v)


def test_flat_taxes_and_withholding_by_hand():
    a = P.Assumptions(portfolio=1e6, years=1, deaths=(), dividend_yield=0.02, price_growth=0.05, inflation=0.0, realisation=0.5,
                      spending=0.0, home=0, foreign_share=1.0, source_wht=0.15)
    y = run(flat(div=0.0, cg=0.2), a)[0]
    # 15% withholding on 20k of dividends, 20% on the realised half of 50k of gains.
    assert y.taxes == pytest.approx(0.15 * 20e3 + 0.2 * 25e3)


def test_structure_payout_is_grossed_up():
    a = P.Assumptions(portfolio=1e6, years=1, deaths=(), dividend_yield=0.02, price_growth=0.06, inflation=0.0, spending=85e3, spending_growth=0.0, home=0, source_wht=0.0)
    y = run(flat(payout=0.15), a)[0]
    assert y.taxes == pytest.approx(15e3)  # 100k gross pays 15k so the family keeps 85k
    assert y.wealth == pytest.approx(1e6 * 1.08 - 100e3)


def test_inheritance_at_each_death_and_none_outside_the_estate():
    a = P.Assumptions(portfolio=1e6, years=4, deaths=(2, 4), dividend_yield=0.02, price_growth=0.06, inflation=0.0, spending=0.0, home=0, source_wht=0.0)
    years = run(flat(inh=0.5), a)
    assert [y.year for y in years if y.inheritance] == [2, 4]
    assert years[1].inheritance == pytest.approx(0.5 * 1e6 * 1.08 ** 2)
    assert not any(y.inheritance for y in run(flat(inh=0.5), a, estate="outside_estate"))


def test_time_limited_regime_falls_back_to_standard():
    _, _, duration, _ = P.path_rules(J["CYP"], "non_dom", fx.load())
    assert duration == 17
    res = {r.id: r for r in P.project("CYP")}
    regimes = [y.regime for y in res["non_dom"].years]
    assert regimes[:17] == ["regime"] * 17 and set(regimes[17:]) == {"standard"}


def test_matches_portax_for_cyprus():
    """portax gives EUR 77,872,707 (real) for its Cyprus case; the same inputs must land within 0.5%."""
    cyp = next(r for r in P.project("CYP", PORTAX) if r.id == "non_dom")
    assert cyp.end_wealth == pytest.approx(77_872_707, rel=0.005)


def test_paths_rank_below_the_no_tax_line():
    for path in RECIPES:
        res = P.project(path.stem)
        ceiling = res[-1].end_wealth
        assert res[-1].id == "no_tax"
        for r in res[:-1]:
            assert r.missing is None, f"{path.stem}/{r.id}: {r.missing}"
            assert r.end_wealth < ceiling


@pytest.mark.parametrize("path", RECIPES, ids=lambda p: p.stem)
def test_recipe_validates_and_points_at_real_regimes(path):
    assert validate_file(path) == []
    f = json.loads(path.read_text())
    regimes = {r.id: r for r in P.unit_rules(path.stem, J).regimes}
    for p in f["paths"]:
        assert p["regime"] in regimes, f"{path.stem}: no regime {p['regime']}"
        assert not regimes[p["regime"]].requires_qualifying_activity, f"{path.stem}/{p['id']}: the family has no job or business, as in the scores"
        if p.get("estate") == "outside_estate":
            assert regimes[p["regime"]].type == "structure", f"{path.stem}/{p['id']}: only a structure can hold assets outside the estate"


def _check_cases():
    for path in RECIPES:
        for i, c in enumerate(json.loads(path.read_text())["checks"]):
            yield pytest.param(path.stem, c, id=f"{path.stem}-{c['path']}-{c['kind']}-{c.get('phase', 'regime')}-{i}")


@pytest.mark.parametrize("iso3,check", list(_check_cases()))
def test_engine_reproduces_the_hand_worked_case(iso3, check):
    """Each recipe carries cases worked by hand from the statute; the engine must give the same tax,
    apart from a model_difference the recipe states and explains."""
    from domicile.taxcalc import Profile, annual_taxes, transfer_taxes

    jur = P.unit_rules(iso3, J)
    path = next(p for p in P.load_recipe(iso3).paths if p.id == check["path"])
    native = {"rates": {jur.currency: {"per_eur": 1.0}}}  # amounts stay in the country's currency
    rules, after, _, _ = P.path_rules(jur, path.regime, native)
    r = after if check.get("phase") == "after" else rules
    if check["kind"] == "annual":
        w = check.get("wealth", 0)
        p = Profile(portfolio=w, net_wealth=w, estate=w, real_estate_local=0, dividends=check.get("dividends", 0),
                    realized_gains=check.get("realised_gains", 0), foreign_share=check.get("foreign_share", 1.0),
                    source_wht=0.15, annual_payout=0, children=check.get("children", 3))
        t = annual_taxes(r, p, after)
        got = t["capital_gains"] + t["dividends"] + t["wealth_tax"]
    else:
        e = check["estate"]
        got = transfer_taxes(r, Profile(portfolio=e, net_wealth=e, estate=e, real_estate_local=0, foreign_share=1.0,
                                        unrealized_gain_share=0.0, children=check.get("children", 3)))
    want = check["expected"] + check.get("model_difference", 0)
    assert got == pytest.approx(want, rel=1e-3, abs=1.0), f"engine {got:,.2f}, hand-worked {check['expected']:,.2f} (+ stated difference {check.get('model_difference', 0):,.2f})"


def test_no_us_treaty_means_30_percent_on_us_dividends():
    """Hungary has had no US tax treaty since 2024: the projection must charge 30%, not 15%, on US dividends."""
    assert not scoring.has_us_treaty("HUN", CFG)
    a = P.Assumptions(portfolio=1e6, years=1, deaths=(), dividend_yield=0.02, price_growth=0.0, inflation=0.0, spending=0.0,
                      home=0, foreign_share=1.0, source_wht=0.15, us_share=0.6)
    with_treaty, _ = P.project_path(flat(), flat(), None, a, us_treaty=True, cfg_wht=W)
    without, _ = P.project_path(flat(), flat(), None, a, us_treaty=False, cfg_wht=W)
    us_dividends = 1e6 * 0.02 * 0.6
    assert without[0].taxes - with_treaty[0].taxes == pytest.approx(0.15 * us_dividends)
    assert without[0].taxes == pytest.approx(0.15 * 20e3 + 0.15 * us_dividends)  # 15% everywhere + 15 more on US = 30% on US


def test_company_shares_at_book_value_leave_unrealised_gains_untaxed():
    """Italy values S.r.l. quotas at book equity (art. 16 TUS): the inheritance base excludes the unrealised gains."""
    jur = J["ITA"]
    rules, after, duration, _ = P.path_rules(jur, "holding_srl", fx.load())
    assert rules.inh["book_value"]
    a = P.Assumptions(years=30, deaths=(30,))
    cfg = scoring.load_config()
    book, _ = P.project_path(rules, after, duration, a, us_treaty=True, cfg_wht=cfg["us_dividend_withholding"])
    market = replace(rules, inh={**rules.inh, "book_value": False})
    mkt, _ = P.project_path(market, after, duration, a, us_treaty=True, cfg_wht=cfg["us_dividend_withholding"])
    assert 0 < book[-1].inheritance < mkt[-1].inheritance


def test_indexed_thresholds_rise_with_prices_and_fixed_ones_do_not():
    """A threshold the law indexes keeps its real value over 60 years; a fixed one shrinks (US estate exclusion vs Germany)."""
    us, _, _, _ = P.path_rules(J["USA"], "standard", fx.load())
    de, _, _, _ = P.path_rules(J["DEU"], "standard", fx.load())
    assert us.inh["indexed"] and not de.inh["indexed"]
    assert P.indexed(us, 2.0).inh["exemption"] == 2 * us.inh["exemption"]
    assert P.indexed(de, 2.0).inh["exemption"] == de.inh["exemption"]


def test_income_surtax_applies_per_spouse_above_the_threshold():
    """Latvia's 3% on each spouse's investment income above EUR 200,000 (exempt dividends included)."""
    from domicile.taxcalc import Profile, annual_taxes
    rules, _, _, _ = P.path_rules(J["LVA"], "standard", {"rates": {"EUR": {"per_eur": 1.0}}})
    base = dict(portfolio=0, net_wealth=0, estate=0, real_estate_local=0, foreign_share=1.0, source_wht=0.15, annual_payout=0)
    below = annual_taxes(rules, Profile(dividends=200_000, realized_gains=150_000, **base))
    above = annual_taxes(rules, Profile(dividends=600_000, realized_gains=200_000, **base))
    assert below["capital_gains"] + below["dividends"] == pytest.approx(150_000 * 0.255)
    # 400,000 each: 3% on 200,000 each = 12,000 on top of 25.5% on the gains
    assert above["capital_gains"] + above["dividends"] == pytest.approx(200_000 * 0.255 + 12_000)
