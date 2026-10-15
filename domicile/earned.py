"""Earned-income engine for the Expat and Digital nomad personas.

``compile_income`` turns a researched ``IncomeFile`` into plain EUR rules; ``earned_tax`` applies
them to a gross income under the standard rules or one regime; ``persona_rows`` produces the
regime rows (each eligible regime blended with standard rules over the persona's horizon);
``visa_score`` and ``persona_cost`` give the visa-access score and the persona's Annual Household Cost. ``web/js/earned.js`` mirrors ``earned_tax`` for the
calculator and ``tests/test_parity.py`` keeps the two in step.
"""

from __future__ import annotations

import math

from domicile.fx import to_eur
from domicile.schema import IncomeFile, RegionalIncomeUnit
from domicile.taxcalc import apply_brackets


def _eur(amount: float | None, currency: str, fx: dict) -> float | None:
    return None if amount is None else round(to_eur(amount, currency, fx), 2)


def compile_income(f: IncomeFile, fx: dict) -> dict:
    it, cur = f.income_tax, f.currency
    regimes = []
    for r in f.regimes:
        regimes.append({
            "id": r.id, "name": r.name, "kind": r.kind, "eligible": list(r.eligible_citizenships),
            "applies_to": list(r.applies_to), "requires_foreign_income": r.requires_foreign_income,
            "requires_local_employment": r.requires_local_employment,
            "min_income": _eur(r.min_income.amount, r.min_income.currency, fx) if r.min_income else None,
            "max_income": _eur(r.max_income.amount, r.max_income.currency, fx) if r.max_income else None,
            "duration": r.duration_years, "treatment": r.treatment, "flat_rate": r.flat_rate,
            "exempt_share": r.exempt_share, "ssc": r.social_security_applies,
            "exempt_above": _eur(r.exemption_threshold.amount, r.exemption_threshold.currency, fx) if r.exemption_threshold else None,
            "covers_local_work": r.covers_local_work, "verification": [r.verification, r.confidence],
        })
    return {
        "brackets": [[_eur(b.from_amount, cur, fx), b.rate] for b in sorted(it.brackets, key=lambda b: b.from_amount)],
        "brackets_self": None if it.self_employed_brackets is None else
        [[_eur(b.from_amount, cur, fx), b.rate] for b in sorted(it.self_employed_brackets, key=lambda b: b.from_amount)],
        "allowance": _eur(it.personal_allowance, cur, fx),
        "ssc_deductible": it.social_security_deductible or 0.0,
        "employment_deduction": None if it.employment_deduction is None else {
            "schedule": [[_eur(b.from_amount, cur, fx), b.rate] for b in sorted(it.employment_deduction.schedule, key=lambda b: b.from_amount)],
            "base": _eur(it.employment_deduction.base, cur, fx), "min": _eur(it.employment_deduction.minimum, cur, fx),
            "max": _eur(it.employment_deduction.maximum, cur, fx)},
        "ssc_employment": [it.employee_social_security_rate, _eur(it.employee_social_security_cap, cur, fx)],
        "ssc_self": [it.self_employed_social_security_rate, _eur(it.self_employed_social_security_cap, cur, fx)],
        "regimes": regimes,
        "costs": _costs(f, fx),
    }


def _costs(f: IncomeFile, fx: dict) -> dict | None:
    if f.costs is None:
        return None
    out = {"city": f.costs.city}
    for key in ("rent_1bed", "rent_2bed", "coworking"):
        item = getattr(f.costs, key + "_monthly")
        out[key] = _eur(item.value.amount, item.value.currency, fx) if item else None
    return out


def compile_regional(unit: RegionalIncomeUnit, national: dict, currency: str, fx: dict) -> dict:
    """A region's rules: the national rules plus the region's own income tax (and main-city tax), its
    main-city rents and its price level relative to the national benchmark city."""
    t = unit.income_tax
    b = lambda bs: [[_eur(x.from_amount, currency, fx), x.rate] for x in sorted(bs, key=lambda x: x.from_amount)]
    rules = {**national, "regional": {
        "brackets": b(t.brackets), "allowance": _eur(t.allowance, currency, fx),
        "local_brackets": b(t.local_brackets), "local_allowance": _eur(t.local_allowance, currency, fx)}}
    if unit.costs is not None:
        out = {"city": unit.costs.city}
        for key in ("rent_1bed", "rent_2bed", "coworking"):
            item = getattr(unit.costs, key + "_monthly")
            out[key] = _eur(item.value.amount, item.value.currency, fx) if item else None
        rules["costs"] = out
    pp = unit.price_parity
    rules["price_ratio"] = round(pp.value / pp.benchmark_value, 4) if pp else 1.0
    return rules


def regional_tax(rules: dict, income: float) -> float:
    """State and city income tax on top of national tax; national regimes do not change it."""
    r = rules.get("regional")
    if not r:
        return 0.0
    return (apply_brackets(max(0.0, income - r["allowance"]), r["brackets"])
            + apply_brackets(max(0.0, income - r["local_allowance"]), r["local_brackets"]))


def _standard_tax(rules: dict, income: float, kind: str = "employment", deduction: float = 0.0) -> float:
    brackets = rules["brackets_self"] if kind == "self_employment" and rules.get("brackets_self") else rules["brackets"]
    return apply_brackets(max(0.0, income - rules["allowance"] - deduction), brackets)


def employment_deduction(rules: dict, income: float, kind: str) -> float:
    e = rules.get("employment_deduction")
    if kind != "employment" or not e:
        return 0.0
    d = max(e["min"], e["base"] + apply_brackets(income, e["schedule"]))
    if e["max"] is not None:
        d = min(d, e["max"])
    return min(d, income)


def _ssc(rules: dict, income: float, kind: str) -> float:
    rate, cap = rules["ssc_employment" if kind == "employment" else "ssc_self"]
    return rate * (min(income, cap) if cap is not None else income)


def earned_tax(rules: dict, income: float, kind: str, regime: dict | None = None) -> dict:
    """Income tax and own social security on ``income`` (EUR) for ``kind`` (employment/self_employment)."""
    ssc = _ssc(rules, income, kind)
    if regime and not regime["ssc"]:
        ssc = 0.0
    local = regional_tax(rules, income)
    # Own contributions (where the law allows) and an employee's standard work-expense deduction come off taxable income.
    d = ssc * rules["ssc_deductible"] + employment_deduction(rules, income, kind)
    treatment = regime["treatment"] if regime else "standard"
    if treatment == "exempt":
        tax = 0.0
    elif treatment == "flat_rate":
        capped = min(income, regime["max_income"]) if regime["max_income"] is not None else income
        # Above a cap (e.g. Spain's Beckham law above EUR 600k) the excess bears the normal marginal rates.
        # A flat rate applies to gross qualifying income; any excess above the cap bears normal rates.
        tax = capped * regime["flat_rate"] + (_standard_tax(rules, income, kind, d) - _standard_tax(rules, capped, kind, d))
    elif treatment == "partial_exemption":
        # The exempt share applies between the threshold (if any) and the cap (if any).
        top = min(income, regime["max_income"]) if regime["max_income"] is not None else income
        above = max(0.0, top - (regime["exempt_above"] or 0.0))
        tax = _standard_tax(rules, income - above * regime["exempt_share"], kind, d)
    else:
        tax = _standard_tax(rules, income, kind, d)
    tax += local
    total = tax + ssc
    return {"tax": round(tax, 2), "ssc": round(ssc, 2), "total": round(total, 2), "rate": total / income if income else 0.0}


def eligible(regime: dict, kind: str, citizenship: str, income: float) -> bool:
    if kind not in regime["applies_to"] or citizenship not in regime["eligible"]:
        return False
    if kind == "self_employment" and regime["requires_local_employment"]:
        return False  # a nomad with foreign clients cannot use a regime tied to a local employer
    if kind == "employment" and regime["requires_foreign_income"]:
        return False  # an expat employed locally cannot use a foreign-income nomad regime
    if regime["min_income"] is not None and income < regime["min_income"]:
        return False
    if regime["requires_foreign_income"] and regime["covers_local_work"] is not True:
        return False  # foreign-source reliefs rarely reach pay for work done while living there
    return True


def rate_score(rate: float, cfg: dict) -> float:
    return round(max(0.0, min(100.0, 100.0 * (1 - rate / cfg["income_tax_transform"]["zero_score_rate"]))), 2)


def persona_rows(rules: dict, persona: dict, citizenship: str, income: float, cfg: dict) -> list[dict]:
    """Standard rules plus each eligible regime, blended over the persona's horizon."""
    kind, horizon = persona["income_kind"], persona["horizon_years"]
    std = earned_tax(rules, income, kind)
    rows = [{"id": "standard", "name": "Standard resident taxation", "type": "standard", "duration": None,
             "cost": round(std["total"]), "scores": {"income_tax": rate_score(std["rate"], cfg)}, "detail": std}]
    for r in rules["regimes"]:
        if r["treatment"] == "standard" or not eligible(r, kind, citizenship, income):
            continue
        res = earned_tax(rules, income, kind, r)
        f = 1.0 if r["duration"] is None else min(1.0, r["duration"] / horizon)
        rate = f * res["rate"] + (1 - f) * std["rate"]
        rows.append({"id": r["id"], "name": r["name"], "type": "special", "duration": r["duration"],
                     "cost": round(f * res["total"] + (1 - f) * std["total"]),
                     "scores": {"income_tax": rate_score(rate, cfg)}, "detail": {**res, "blend_factor": round(f, 3)},
                     "verification": r["verification"]})
    return rows


def visa_score(rules: dict | None, country: str, persona: dict, citizenship: str, income: float) -> float | None:
    v = persona.get("visa")
    if v is None or rules is None:
        return None
    if citizenship == "EU" and country in v["free_movement"]:
        return 100.0
    for r in rules["regimes"]:
        if r["kind"] == "digital_nomad_visa" and citizenship in r["eligible"] and \
                (r["min_income"] is None or income >= r["min_income"]):
            return 100.0
    return float(v["no_route_score"])


def persona_cost(costs: dict | None, plr: float | None, plr_ref: float, persona: dict) -> dict | None:
    """Annual Household Cost for a persona, in EUR, or None when the rent or price level is missing."""
    c = persona["cost"]
    rent = costs and costs.get(c["rent_field"].replace("_monthly", ""))
    if rent is None or not plr or not plr_ref:
        return None
    level = plr / plr_ref
    parts = {"rent": 12 * rent, "other_spending": c["other_spending_eur"] * level}
    estimated = []
    if c.get("coworking"):
        cw = costs.get("coworking")
        if cw is None:
            cw = c["coworking_reference_monthly_eur"] * level
            estimated.append("coworking")
        parts["coworking"] = 12 * cw
    return {"total_eur": round(sum(parts.values())), "parts": {k: round(v) for k, v in parts.items()},
            "estimated_from_price_level": estimated, "price_level_vs_euro_area": round(level, 3)}


def persona_cost_score(total: float | None, persona: dict) -> float | None:
    if total is None:
        return None
    c = persona["cost"]
    lo, hi = math.log10(c["best_eur"]), math.log10(c["worst_eur"])
    return round(max(0.0, min(100.0, 100.0 * (1 - (math.log10(total) - lo) / (hi - lo)))), 2)


def leftover(income: float, rows: list[dict] | None, household_cost: float | None, persona: dict) -> dict:
    """Money left over a year: pay minus tax and social security under the cheapest eligible regime
    (averaged over the stay) minus the Annual Household Cost; scored linearly between the persona's bounds."""
    if not rows or household_cost is None:
        return {"eur": None, "score": None}
    best = min(rows, key=lambda r: r["cost"])
    eur = income - best["cost"] - household_cost
    lo, hi = persona["leftover"]["zero_eur"], persona["leftover"]["full_eur"]
    return {"eur": round(eur), "score": round(max(0.0, min(100.0, 100.0 * (eur - lo) / (hi - lo))), 2)}
