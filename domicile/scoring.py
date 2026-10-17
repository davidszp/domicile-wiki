"""Transparent scoring: metric normalisation, regime blending, weighted totals and status.

All parameters come from ``data/scoring_config.json``; nothing here is a hidden constant.
``web/js/scoring.js`` repeats only the final step (weights x metric scores) so users can change
weights; the metric scores themselves are computed here and shipped as data.
"""

from __future__ import annotations

import json
import math
from pathlib import Path

from domicile.taxcalc import METRICS as TAX_METRICS
from domicile.taxcalc import Profile, Rules, annual_taxes, local_share, transfer_taxes, unrelieved_us_wht

ROOT = Path(__file__).resolve().parent.parent
CONFIG_PATH = ROOT / "data" / "scoring_config.json"


def load_config(path: Path = CONFIG_PATH) -> dict:
    cfg = json.loads(path.read_text())
    ref, m = cfg["reference_family"], cfg["market"]
    # The family's yearly income follows from the market assumptions, so they are defined once.
    ref["dividends"], ref["realized_gains"] = market_income(ref["portfolio"], m)
    return cfg


def market_income(portfolio: float, market: dict) -> tuple[float, float]:
    """(dividends, realised gains) a year on ``portfolio`` under the market assumptions."""
    return portfolio * market["dividend_yield"], portfolio * market["price_growth"] * market["realisation"]


def clamp(x: float, lo: float = 0.0, hi: float = 100.0) -> float:
    return max(lo, min(hi, x))


def normalized_weights(weights: dict[str, float]) -> dict[str, float]:
    """Points -> fractions summing to 1. Negative points are rejected."""
    if any(w < 0 for w in weights.values()):
        raise ValueError("weights must be non-negative")
    total = sum(weights.values())
    if total <= 0:
        raise ValueError("at least one weight must be positive")
    return {k: w / total for k, w in weights.items()}


def default_weights(cfg: dict) -> dict[str, float]:
    return {k: m["weight"] for k, m in cfg["metrics"].items()}


def reference_profile(cfg: dict, citizenship: str = "EU") -> Profile:
    ref = {k: v for k, v in cfg["reference_family"].items() if k != "description"}
    return Profile(**ref, citizenship=citizenship, us_share=cfg["us_dividend_withholding"]["us_share_of_foreign_dividends"])


def has_us_treaty(country_id: str, cfg: dict) -> bool:
    """Whether residents of ``country_id`` get treaty-rate US withholding (regions: pass their country)."""
    w = cfg["us_dividend_withholding"]
    return country_id in w["treaty_countries"] or country_id in w["not_applicable"]


# --------------------------------------------------------------------------- tax metrics

def linear_rate_score(rate: float, zero_score_rate: float) -> float:
    return clamp(100.0 * (1.0 - rate / zero_score_rate))


def tax_metric_scores(rules: Rules, profile: Profile, cfg: dict, country_id: str, usd_per_eur: float,
                      std: Rules | None = None) -> dict:
    """Score the four tax metrics for one compiled regime and one citizenship (``std``: the standard regime).
    ``country_id`` is the ISO3 of the country (the parent for a region): US-overlay and treaty rules are national."""
    t = cfg["tax_transforms"]
    us = cfg["us_citizen_overlay"]
    us_applies = profile.citizenship == "US"
    us_exempt = set(us["exempt_metrics"].get(country_id, {}).get("metrics", [])) if us_applies else set()
    annual = annual_taxes(rules, profile, std)
    out: dict[str, dict] = {}

    # Capital gains: portfolio effective rate plus business-sale and real-estate rates.
    cg = annual["capital_gains"]
    if cg is None:
        out["capital_gains"] = {"score": None, "reason": "portfolio gains rate not researched"}
    else:
        portfolio_rate = cg / profile.realized_gains if profile.realized_gains else 0.0
        parts = {"portfolio": portfolio_rate, "business": rules.cgt.get("business"), "real_estate": rules.cgt.get("real_estate")}
        if us_applies and "capital_gains" not in us_exempt:
            lump_covers = bool(rules.lump_sum) and any(
                c in rules.lump_sum["covers"] for c in ("foreign_capital_gains", "foreign_income_all"))
            parts = {
                k: (None if v is None else
                    (v + us["capital_gains_rate"] if k == "portfolio" and lump_covers else max(v, us["capital_gains_rate"])))
                for k, v in parts.items()
            }
        w = t["capital_gains"]["component_weights"]
        avail = {k: v for k, v in parts.items() if v is not None}
        wsum = sum(w[k] for k in avail)
        rate = sum(w[k] * v for k, v in avail.items()) / wsum
        out["capital_gains"] = {
            "score": round(linear_rate_score(rate, t["capital_gains"]["zero_score_rate"]), 2),
            "effective_rate": round(rate, 4), "components": {k: (None if v is None else round(v, 4)) for k, v in parts.items()},
            "partial": len(avail) < len(parts),
        }

    dv = annual["dividends"]
    if dv is None:
        out["dividends"] = {"score": None, "reason": "dividend rates not researched"}
    else:
        rate = dv / profile.dividends if profile.dividends else 0.0
        if us_applies and "dividends" not in us_exempt:
            us_after_credit = us["dividends_rate"] - profile.source_wht * profile.foreign_share
            rate = rate + us["dividends_rate"] if rules.lump_sum and dv and _lump_covers_div(rules) else max(rate, us_after_credit)
        extra = unrelieved_us_wht(profile, has_us_treaty(country_id, cfg), cfg["us_dividend_withholding"])
        extra_rate = extra / profile.dividends if profile.dividends else 0.0
        rate += extra_rate
        out["dividends"] = {"score": round(linear_rate_score(rate, t["dividends"]["zero_score_rate"]), 2),
                            "effective_rate": round(rate, 4), "us_wht_extra_rate": round(extra_rate, 4)}

    wt = annual["wealth_tax"]
    if wt is None:
        out["wealth_tax"] = {"score": None, "reason": "wealth tax not researched"}
    else:
        rate = wt / profile.net_wealth
        out["wealth_tax"] = {"score": round(linear_rate_score(rate, t["wealth_tax"]["zero_score_rate"]), 2),
                             "effective_rate": round(rate, 5), "annual_eur": round(wt)}

    inh = transfer_taxes(rules, profile)
    if inh is None:
        out["inheritance"] = {"score": None, "reason": "inheritance rules not researched"}
    else:
        ti = t["inheritance"]
        if us_applies and "inheritance" not in us_exempt:
            exemption_eur = us["estate_exemption_usd"] / usd_per_eur
            us_tax = us["estate_rate"] * max(0.0, profile.estate - exemption_eur)
            reach = profile.estate * local_share(profile) if rules.inh.get("scope") == "local_assets_only" else profile.estate
            other = reach * rules.inh["other_cost"]
            inh = max(inh - other, us_tax) + other
        rate = inh / profile.estate
        score = 100.0 - ti["max_penalty"] * min(1.0, rate / ti["zero_score_rate"])
        years = rules.inh.get("gift_free_after")
        if rate > 0 and years is not None:
            score += ti["gift_window_bonus"] * max(0.0, 1.0 - years / ti["gift_window_years"])
        if rules.inh["treatment"] == "exempt_with_conditions":
            score -= ti["conditional_exemption_penalty"]
        out["inheritance"] = {"score": round(clamp(score), 2), "effective_rate": round(rate, 4), "tax_eur": round(inh)}
    return out


def _lump_covers_div(rules: Rules) -> bool:
    return any(c in rules.lump_sum["covers"] for c in ("foreign_dividends", "foreign_income_all"))


def regime_cost(detail: dict, profile: Profile, cfg: dict) -> float | None:
    """Expected tax cost in EUR a year for the reference family under one regime: capital gains on the
    portfolio, dividends and wealth taxes each year, plus inheritance tax once per generation, spread
    over the planning horizon (two generations, 60 years). Used to pick the regime a family would actually choose (the cheapest), so moving a burden
    between tax categories cannot change the choice. ``None`` if any part is unknown."""
    try:
        cg = detail["capital_gains"]["components"]["portfolio"] * profile.realized_gains
        div = detail["dividends"]["effective_rate"] * profile.dividends
        wealth = detail["wealth_tax"]["effective_rate"] * profile.net_wealth
        inh = detail["inheritance"]["effective_rate"] * profile.estate
    except (KeyError, TypeError):
        return None
    if None in (cg, div, wealth, inh):
        return None
    tl = cfg["tax_transforms"]["time_limited_regimes"]
    return cg + div + wealth + inh * tl.get("generations", 1) / tl["horizon_years"]


def blend(regime_scores: dict, standard_scores: dict, duration: float | None, cfg: dict) -> dict:
    """Blend a time-limited regime with the standard regime over the planning horizon."""
    if duration is None:
        return regime_scores
    f = min(1.0, duration / cfg["tax_transforms"]["time_limited_regimes"]["horizon_years"])
    out = {}
    for m in TAX_METRICS:
        r, s = regime_scores[m].get("score"), standard_scores[m].get("score")
        if r is None or s is None:
            out[m] = dict(regime_scores[m])
            continue
        out[m] = {**regime_scores[m], "score": round(f * r + (1 - f) * s, 2), "unblended": r, "blend_factor": round(f, 3)}
    return out


# --------------------------------------------------------------------------- non-tax metrics

def wgi(x: float) -> float:
    return clamp((x + 2.5) / 5.0 * 100.0)


def lin(x: float, lo: float, hi: float) -> float:
    return clamp((x - lo) / (hi - lo) * 100.0)


def loglin(x: float, lo: float, hi: float) -> float:
    return clamp((math.log10(x) - math.log10(lo)) / (math.log10(hi) - math.log10(lo)) * 100.0)


def component_score(name: str, ind: dict[str, dict], extra: dict) -> float | None:
    """Normalise one raw indicator component to 0-100; ``None`` if missing."""
    v = lambda k: ind[k]["value"] if k in ind else None  # noqa: E731
    match name:
        case "homicide":
            r = v("homicide_rate")
            return None if r is None else clamp(100.0 * (1 - math.log10(1 + r) / math.log10(31)))
        case "wgi_pv" | "wgi_ge" | "wgi_rq" | "wgi_rl" | "wgi_cc" | "wgi_va":
            x = v(name)
            return None if x is None else wgi(x)
        case "cpi":
            return v("cpi")
        case "pisa":
            x = v("pisa")
            return None if x is None else lin(x, 350, 575)
        case "learning_outcomes":
            x = v("learning_outcomes")
            return None if x is None else lin(x, 300, 600)
        case "uhc_index":
            return v("uhc_index")
        case "life_expectancy":
            x = v("life_expectancy")
            return None if x is None else lin(x, 65, 85)
        case "hdi":
            x = v("hdi")
            return None if x is None else lin(x, 0.5, 1.0)
        case "gdp_pc_ppp":
            x = v("gdp_pc_ppp")
            return None if x is None else loglin(x, 2000, 100000)
        case "internet_users":
            return v("internet_users")
        case "lpi":
            x = v("lpi")
            return None if x is None else lin(x, 1.5, 4.3)
        case "english":
            x = v("english_epi")
            return None if x is None else lin(x, 400, 650)
        case "migrant_share":
            x = v("migrant_share")
            return None if x is None else lin(x, 0, 40)
        case "household_cost":
            c = extra.get("household_cost")
            return None if c is None else 100.0 - loglin(c["total_eur"], extra["cost_best"], extra["cost_worst"])
    raise KeyError(name)


def nontax_scores(ind: dict[str, dict], extra: dict, cfg: dict) -> dict:
    out = {}
    min_cov = cfg["composite_min_coverage"]
    for metric, spec in cfg["nontax_transforms"].items():
        comps = {c: component_score(c, ind, extra) for c in spec["components"]}
        avail = {c: s for c, s in comps.items() if s is not None}
        coverage = sum(spec["components"][c] for c in avail)
        if not avail or coverage < spec.get("min_coverage", min_cov):
            out[metric] = {"score": None, "components": comps, "reason": "insufficient indicator coverage"}
            continue
        score = sum(spec["components"][c] * s for c, s in avail.items()) / coverage
        out[metric] = {"score": round(score, 2), "components": {c: (None if s is None else round(s, 1)) for c, s in comps.items()},
                       "partial": coverage < 0.999}
    return out


def household_cost(col: dict | None, plr: float | None, plr_ref: float, cfg: dict,
                   plr_note: str | None = None) -> dict | None:
    """Family-of-five annual cost estimate in EUR, or None when rent or school fee is missing.

    ``col`` holds EUR values already converted: rent_monthly, school_fee, health, housekeeper_monthly.
    """
    if not col or col.get("rent_monthly") is None or col.get("school_fee") is None:
        return None
    hc = cfg["household_cost"]
    if not plr or not plr_ref:
        return None  # everyday spending cannot be scaled without a price level
    level = plr / plr_ref
    estimated = []
    health = col.get("health")
    if health is None:
        health = hc["health_insurance_reference_eur"] * level
        estimated.append("health insurance")
    keeper = col.get("housekeeper_monthly")
    if keeper is None:
        keeper = hc["housekeeper_reference_monthly_eur"] * level
        estimated.append("housekeeper")
    parts = {
        "rent": 12 * col["rent_monthly"], "schools": 3 * col["school_fee"], "health_insurance": health,
        "housekeeper": 12 * keeper, "other_spending": hc["other_spending_eur"] * level,
    }
    return {"total_eur": round(sum(parts.values())), "parts": {k: round(v) for k, v in parts.items()},
            "estimated_from_price_level": estimated, "price_level_vs_euro_area": round(level, 3),
            "price_level_note": plr_note}


# --------------------------------------------------------------------------- totals

def overall(metric_scores: dict[str, float | None], weights: dict[str, float]) -> dict:
    """Weighted sum with missing metrics contributing 0; also returns completeness and the range."""
    w = normalized_weights(weights)
    score = sum(w[m] * (metric_scores.get(m) or 0.0) for m in w)
    missing = [m for m in w if metric_scores.get(m) is None]
    completeness = 1.0 - sum(w[m] for m in missing)
    return {"score": round(score, 2), "completeness": completeness,
            "max_if_missing_perfect": round(score + 100.0 * sum(w[m] for m in missing), 2), "missing": missing}


def tax_only(metric_scores: dict[str, float | None], weights: dict[str, float]) -> float | None:
    tw = {m: weights[m] for m in TAX_METRICS}
    if any(metric_scores.get(m) is None for m in TAX_METRICS) or sum(tw.values()) == 0:
        return None
    return round(sum(normalized_weights(tw)[m] * metric_scores[m] for m in TAX_METRICS), 2)


def reweight_tax_share(weights: dict[str, float], share: float) -> dict[str, float]:
    """Scale weights so tax metrics make up ``share`` of the total, keeping proportions within groups."""
    tax = {m: w for m, w in weights.items() if m in TAX_METRICS}
    rest = {m: w for m, w in weights.items() if m not in TAX_METRICS}
    ts, rs = sum(tax.values()), sum(rest.values())
    out = {m: share * w / ts for m, w in tax.items()}
    out.update({m: (1 - share) * w / rs for m, w in rest.items()})
    return out


def status(tax_verification: list[tuple[str, str]] | None, completeness: float, tax_computable: bool, cfg: dict) -> str:
    """``tax_verification``: (verification, confidence) for the four standard-regime tax metrics."""
    rules = cfg["status_rules"]
    eps = 1e-9  # same tolerance as web/js/scoring.js statusOf
    if not tax_computable or completeness < rules["provisional_min_completeness"] - eps:
        return "insufficient"
    if (tax_verification and all(v == "verified" and c != "low" for v, c in tax_verification)
            and completeness >= rules["verified_min_completeness"] - eps):
        return "verified"
    return "provisional"


LIST_KNOCKOUTS = ("sanctions", "capital_controls", "security_state_courts")


def knockouts(indicators: dict[str, dict], country_id: str, cfg: dict) -> list[dict]:
    """Failed knock-out criteria for a jurisdiction (regions pass their country's id and indicators)."""
    ko = cfg["knockout"]
    out = []
    for c in ko["criteria"]:
        v = indicators.get(c["indicator"], {}).get("value")
        if v is None:
            continue
        if (c["op"] == "lt" and v < c["threshold"]) or (c["op"] == "gt" and v > c["threshold"]):
            out.append({"id": c["id"], "label": c["label"], "value": round(v, 2), "threshold": c["threshold"],
                        "explanation": c["explanation"]})
    for list_id in LIST_KNOCKOUTS:  # researched country lists, with sources in the config
        lst = ko.get(list_id)
        if lst and country_id in lst["countries"]:
            out.append({"id": list_id, "label": lst["label"], "value": None, "threshold": None,
                        "explanation": lst["countries"][country_id]})
    return out

