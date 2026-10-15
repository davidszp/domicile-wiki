"""Scoring model: weights, normalisation, regime blending, missing data, status rules."""

import math

import pytest

from domicile import scoring
from domicile.scoring import (
    TAX_METRICS, blend, household_cost, linear_rate_score, load_config, nontax_scores, normalized_weights,
    overall, reweight_tax_share, status, tax_metric_scores,
)
from domicile.taxcalc import Profile, Rules, annual_taxes, apply_brackets, transfer_taxes

CFG = load_config()


def rules(**kw) -> Rules:
    base = dict(
        cgt={"listed_domestic": 0.0, "listed_foreign": 0.0, "business": 0.0, "real_estate": 0.0},
        div={"domestic": 0.0, "foreign_gross": 0.0, "ftc": "credit"},
        wealth=[],
        inh={"basis": "none", "treatment": "fully_exempt", "mode": "marginal", "exemption": 0, "brackets": [],
             "other_cost": 0.0, "gift_free_after": None},
        lump_sum=None,
    )
    base.update(kw)
    return Rules(**base)


# ---------------------------------------------------------------- weights

def test_default_weights_normalise_to_100_percent():
    w = normalized_weights(scoring.default_weights(CFG))
    assert math.isclose(sum(w.values()), 1.0)
    assert set(w) == set(CFG["metrics"])
    # The plan's points (sum 112) become percentages: capital gains 15/112.
    assert math.isclose(w["capital_gains"], 15 / 112)


def test_user_weights_always_renormalise():
    w = normalized_weights({"a": 3, "b": 1})
    assert w == {"a": 0.75, "b": 0.25}
    with pytest.raises(ValueError):
        normalized_weights({"a": 0, "b": 0})
    with pytest.raises(ValueError):
        normalized_weights({"a": -1, "b": 2})


@pytest.mark.parametrize("share", [0.5, 0.6, 0.7, 0.8])
def test_sensitivity_reweighting_hits_the_target_tax_share(share):
    w = reweight_tax_share(scoring.default_weights(CFG), share)
    assert math.isclose(sum(w.values()), 1.0)
    assert math.isclose(sum(w[m] for m in TAX_METRICS), share)
    # Proportions within the tax group are preserved (capital gains 15 vs dividends 5).
    assert math.isclose(w["capital_gains"] / w["dividends"], 3.0)


# ---------------------------------------------------------------- transforms

def test_linear_rate_score_bounds():
    assert linear_rate_score(0.0, 0.4) == 100
    assert linear_rate_score(0.4, 0.4) == 0
    assert linear_rate_score(0.6, 0.4) == 0
    assert linear_rate_score(0.2, 0.4) == 50


def test_marginal_and_whole_amount_brackets():
    b = [[0, 0.1], [100, 0.2], [200, 0.3]]
    assert apply_brackets(250, b) == pytest.approx(10 + 20 + 15)
    assert apply_brackets(250, b, "whole_amount") == pytest.approx(75)
    assert apply_brackets(-5, b) == 0
    assert apply_brackets(1000, []) == 0


def test_zero_headline_rate_does_not_mean_perfect_capital_gains_score():
    # No tax on securities, but 20% on local real estate gains (Cyprus-style).
    r = rules(cgt={"listed_domestic": 0.0, "listed_foreign": 0.0, "business": 0.0, "real_estate": 0.2})
    s = tax_metric_scores(r, Profile(), CFG, "XXX", 1.1)
    assert s["capital_gains"]["score"] < 100
    assert s["capital_gains"]["effective_rate"] == pytest.approx(0.15 * 0.2)


def test_missing_rates_are_never_scored_as_zero_tax():
    r = rules(cgt={"listed_domestic": None, "listed_foreign": None, "business": 0.0, "real_estate": 0.0})
    s = tax_metric_scores(r, Profile(), CFG, "XXX", 1.1)
    assert s["capital_gains"]["score"] is None
    r = rules(inh=None, wealth=None)
    s = tax_metric_scores(r, Profile(), CFG, "XXX", 1.1)
    assert s["inheritance"]["score"] is None and s["wealth_tax"]["score"] is None


def test_wealth_tax_threshold_allowance_and_bases():
    p = Profile(portfolio=30e6, foreign_share=0.9, net_wealth=35e6, real_estate_local=5e6)
    comp = {"name": "t", "base": "net_wealth_worldwide", "mode": "marginal", "exempt": 1e6, "entry": 2e6, "brackets": [[0, 0.01]]}
    assert annual_taxes(rules(wealth=[comp]), p)["wealth_tax"] == pytest.approx(0.01 * 34e6)
    cliff = dict(comp, entry=40e6)
    assert annual_taxes(rules(wealth=[cliff]), p)["wealth_tax"] == 0
    foreign_fin = dict(comp, base="financial_assets_foreign", exempt=0, entry=0, brackets=[[0, 0.002]])
    assert annual_taxes(rules(wealth=[foreign_fin]), p)["wealth_tax"] == pytest.approx(0.002 * 27e6)


def test_lump_sum_replaces_foreign_income_tax_and_is_allocated():
    p = Profile(realized_gains=1.2e6, dividends=0.6e6, foreign_share=1.0)
    r = rules(cgt={"listed_domestic": 0.26, "listed_foreign": 0.26, "business": 0.26, "real_estate": 0.26},
              div={"domestic": 0.26, "foreign_gross": 0.26, "ftc": "none"},
              lump_sum={"annual": 300_000, "covers": ["foreign_income_all"]})
    a = annual_taxes(r, p)
    assert a["capital_gains"] + a["dividends"] == pytest.approx(300_000)
    assert a["capital_gains"] == pytest.approx(200_000)


def test_inheritance_beneficiary_vs_estate_basis():
    p = Profile(estate=30e6, children=3)
    per_child = rules(inh={"basis": "beneficiary", "treatment": "taxed", "mode": "marginal", "exemption": 1e6,
                           "brackets": [[0, 0.04]], "other_cost": 0.0, "gift_free_after": None})
    assert transfer_taxes(per_child, p) == pytest.approx(3 * 0.04 * 9e6)
    estate = rules(inh={"basis": "estate", "treatment": "taxed", "mode": "marginal", "exemption": 1e6,
                        "brackets": [[0, 0.4]], "other_cost": 0.01, "gift_free_after": 7})
    assert transfer_taxes(estate, p) == pytest.approx(0.4 * 29e6 + 0.01 * 30e6)


def test_heavy_inheritance_tax_is_mildly_negative_not_zero():
    """PLAN: UK/US/Germany-style regimes rank 'mildly negative'; 0% regimes are highly positive."""
    uk = rules(inh={"basis": "estate", "treatment": "taxed", "mode": "marginal", "exemption": 0.4e6,
                    "brackets": [[0, 0.4]], "other_cost": 0.0, "gift_free_after": 7})
    s = tax_metric_scores(uk, Profile(), CFG, "XXX", 1.1)["inheritance"]["score"]
    assert 20 <= s <= 40
    none = tax_metric_scores(rules(), Profile(), CFG, "XXX", 1.1)["inheritance"]["score"]
    assert none == 100


def test_time_limited_regime_is_blended_with_standard():
    good = {m: {"score": 100.0} for m in TAX_METRICS}
    std = {m: {"score": 40.0} for m in TAX_METRICS}
    horizon = CFG["tax_transforms"]["time_limited_regimes"]["horizon_years"]
    assert horizon == 60  # two generations
    out = blend(good, std, 15, CFG)
    assert out["capital_gains"]["score"] == pytest.approx(40.0 + 60.0 * 15 / 60)
    assert blend(good, std, None, CFG) is good
    assert blend(good, std, 80, CFG)["dividends"]["score"] == 100.0


def test_us_citizens_pay_at_least_the_us_rate_everywhere():
    p = Profile(citizenship="US")
    s = tax_metric_scores(rules(), p, CFG, "ARE", 1.1)
    assert s["capital_gains"]["effective_rate"] >= CFG["us_citizen_overlay"]["capital_gains_rate"] - 1e-9
    assert s["inheritance"]["score"] < 100  # US estate tax above the exemption
    # Puerto Rico: securities gains of bona fide residents are excluded from US income tax.
    pr = tax_metric_scores(rules(), p, CFG, "PRI", 1.1)
    assert pr["capital_gains"]["effective_rate"] == 0


def test_no_us_treaty_costs_extra_withholding_on_us_dividends():
    p = Profile()
    with_treaty = tax_metric_scores(rules(), p, CFG, "CYP", 1.1)["dividends"]
    without = tax_metric_scores(rules(), p, CFG, "ARE", 1.1)["dividends"]
    assert with_treaty["effective_rate"] == 0
    w = CFG["us_dividend_withholding"]
    expected = p.foreign_share * w["us_share_of_foreign_dividends"] * (w["statutory_rate"] - w["treaty_rate"])
    assert without["effective_rate"] == pytest.approx(expected, abs=1e-4)
    assert scoring.has_us_treaty("HUN", CFG) is False  # terminated 2024
    assert scoring.has_us_treaty("CHE", CFG) is True


# ---------------------------------------------------------------- non-tax and totals

def test_composites_need_minimum_coverage():
    ind = {"wgi_rl": {"value": 1.5}, "wgi_va": {"value": 1.0}}
    s = nontax_scores(ind, {"household_cost": None, "cost_best": 1, "cost_worst": 2}, CFG)
    assert s["legal"]["score"] == pytest.approx(0.7 * 80 + 0.3 * 70)
    assert s["education"]["score"] is None
    only_va = nontax_scores({"wgi_va": {"value": 1.0}}, {"household_cost": None, "cost_best": 1, "cost_worst": 2}, CFG)
    assert only_va["legal"]["score"] is None  # 30% coverage < 50% minimum


def test_household_cost_requires_rent_and_school():
    assert household_cost({"rent_monthly": 10000, "school_fee": None}, 1.0, 1.0, CFG) is None
    hc = household_cost({"rent_monthly": 10000, "school_fee": 30000}, 1.0, 1.0, CFG)
    assert hc["total_eur"] == round(120000 + 90000 + 15000 + 30000 + 90000)
    assert set(hc["estimated_from_price_level"]) == {"health insurance", "housekeeper"}


def test_missing_metrics_contribute_zero_and_report_completeness():
    w = scoring.default_weights(CFG)
    full = {m: 80.0 for m in w}
    assert overall(full, w)["score"] == pytest.approx(80.0)
    partial = dict(full, culture=None, cost=None)
    r = overall(partial, w)
    assert r["score"] < 80
    assert r["completeness"] == pytest.approx(1 - 7 / 112)
    assert r["max_if_missing_perfect"] == pytest.approx(r["score"] + 100 * 7 / 112)
    assert set(r["missing"]) == {"culture", "cost"}


def test_status_rules():
    ver = [("verified", "high")] * 4
    assert status(ver, 0.95, True, CFG) == "verified"
    assert status(ver, 0.85, True, CFG) == "provisional"
    assert status([("verified", "low")] + ver[1:], 0.95, True, CFG) == "provisional"
    assert status(ver, 0.55, True, CFG) == "insufficient"
    assert status(ver, 0.99, False, CFG) == "insufficient"


def test_weighted_sum_matches_hand_calculation():
    w = {"capital_gains": 15, "dividends": 5, "inheritance": 10, "wealth_tax": 10, "safety": 8, "stability": 15,
         "corruption": 5, "legal": 15, "cost": 5, "education": 5, "healthcare": 5, "hdi": 5, "business": 2,
         "infrastructure": 5, "culture": 2}
    scores = {k: float(i * 5) for i, k in enumerate(w)}
    expected = sum(w[k] * scores[k] for k in w) / sum(w.values())
    assert overall(scores, w)["score"] == pytest.approx(expected, abs=0.01)


def test_lump_sum_is_allocated_to_the_taxes_it_replaces():
    """A Swiss-style forfait must not count against capital gains that are untaxed anyway."""
    p = Profile(realized_gains=1.2e6, dividends=0.6e6, foreign_share=1.0)
    std = rules(cgt={"listed_domestic": 0.0, "listed_foreign": 0.0, "business": 0.0, "real_estate": 0.0},
                div={"domestic": 0.4, "foreign_gross": 0.4, "ftc": "none"})
    lump = rules(cgt=std.cgt, div={"domestic": 0.4, "foreign_gross": 0.4, "ftc": "none"},
                 lump_sum={"annual": 100_000, "covers": ["foreign_income_all"]})
    a = annual_taxes(lump, p, std)
    assert a["capital_gains"] == 0
    assert a["dividends"] == pytest.approx(100_000)
    # A lump sum dearer than the tax it replaces must score worse on that metric.
    dear = rules(cgt=std.cgt, div=std.div, lump_sum={"annual": 400_000, "covers": ["foreign_income_all"]})
    assert annual_taxes(dear, p, std)["dividends"] > annual_taxes(std, p)["dividends"]


def test_local_only_inheritance_scope_taxes_only_local_assets():
    p = Profile(estate=35e6, net_wealth=35e6, portfolio=30e6, foreign_share=0.9, real_estate_local=5e6, children=1)
    inh = {"basis": "beneficiary", "treatment": "taxed", "mode": "marginal", "exemption": 0, "brackets": [[0, 0.1]],
           "other_cost": 0.0, "gift_free_after": None}
    world = transfer_taxes(rules(inh=inh), p)
    local = transfer_taxes(rules(inh={**inh, "scope": "local_assets_only"}), p)
    assert world == pytest.approx(3.5e6)
    assert local == pytest.approx(0.1 * (5e6 + 3e6))


def test_activity_regimes_are_not_used_for_passive_families():
    from domicile.build import best_regime
    w = scoring.default_weights(CFG)
    rows = [{"id": "standard", "activity": False, "cost": 500_000, "scores": {m: 50.0 for m in TAX_METRICS}},
            {"id": "work_regime", "activity": True, "cost": 100_000, "scores": {m: 90.0 for m in TAX_METRICS}}]
    assert best_regime(rows, w)["id"] == "standard"
    assert best_regime(rows, w, include_activity=True)["id"] == "work_regime"


def test_structure_adds_payout_tax_and_running_cost():
    """GmbH-style: ~1.5% on gains inside, but what the family takes out is taxed again."""
    p = Profile(realized_gains=1.2e6, dividends=0.6e6, foreign_share=1.0, annual_payout=400_000)
    gmbh = rules(cgt={"listed_domestic": 0.015, "listed_foreign": 0.015, "business": 0.015, "real_estate": 0.3},
                 div={"domestic": 0.3, "foreign_gross": 0.3, "ftc": "none"},
                 structure={"payout_rate": 0.26375, "running_cost": 20_000})
    a = annual_taxes(gmbh, p)
    assert a["payout_tax"] == pytest.approx(400_000 * 0.26375)
    assert a["running_cost"] == 20_000
    extra = a["payout_tax"] + a["running_cost"]
    assert a["capital_gains"] == pytest.approx(1.2e6 * 0.015 + extra * 1.2 / 1.8)
    assert a["dividends"] == pytest.approx(0.6e6 * 0.3 + extra * 0.6 / 1.8)
    # Payout rate unknown -> not computable rather than silently untaxed.
    unknown = rules(cgt=gmbh.cgt, div=gmbh.div, structure={"payout_rate": None, "running_cost": 0})
    assert annual_taxes(unknown, p)["capital_gains"] is None


def test_structures_can_be_switched_off():
    from domicile.build import best_regime
    w = scoring.default_weights(CFG)
    rows = [{"id": "standard", "cost": 500_000, "scores": {m: 50.0 for m in TAX_METRICS}},
            {"id": "gmbh", "structure": True, "cost": 300_000, "scores": {m: 80.0 for m in TAX_METRICS}}]
    assert best_regime(rows, w)["id"] == "gmbh"
    assert best_regime(rows, w, include_structures=False)["id"] == "standard"



def test_regime_choice_follows_euro_cost_not_category_weights():
    """Shifting a burden between tax categories must not decide the regime: the cheaper one wins."""
    from domicile.build import best_regime
    w = scoring.default_weights(CFG)
    box3 = {"id": "standard", "cost": 750_000, "scores": {"capital_gains": 90.0, "dividends": 100.0, "wealth_tax": 0.0, "inheritance": 60.0}}
    bv = {"id": "bv", "structure": True, "cost": 500_000, "scores": {"capital_gains": 35.0, "dividends": 50.0, "wealth_tax": 100.0, "inheritance": 60.0}}
    assert best_regime([box3, bv], w)["id"] == "bv"


def test_not_researched_metrics_count_as_missing():
    from domicile.schema import Jurisdiction
    from domicile.taxcalc import compile_regime
    import json
    from conftest import ROOT
    j = Jurisdiction.model_validate_json((ROOT / "data" / "jurisdictions" / "SUR.json").read_text())
    fx = json.loads((ROOT / "data" / "fx.json").read_text())
    rules_ = compile_regime(j.regimes[0], j.regimes[0], j.currency, fx)
    assert rules_.inh is None  # placeholder inheritance is not scored as untaxed
    assert tax_metric_scores(rules_, Profile(), CFG, "SUR", 1.1)["inheritance"]["score"] is None


def test_education_prefers_pisa_and_falls_back_to_learning_outcomes():
    ext = {"household_cost": None, "cost_best": 1, "cost_worst": 2}
    both = nontax_scores({"pisa": {"value": 575.0}, "learning_outcomes": {"value": 300.0}}, ext, CFG)["education"]
    assert both["score"] == pytest.approx(70.0)  # 0.7 x 100 + 0.3 x 0
    only_hlo = nontax_scores({"learning_outcomes": {"value": 450.0}}, ext, CFG)["education"]
    assert only_hlo["score"] == pytest.approx(50.0)
    assert nontax_scores({}, ext, CFG)["education"]["score"] is None
