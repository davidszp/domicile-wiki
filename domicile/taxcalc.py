"""Illustrative tax engine shared by the scoring model and the in-browser calculator.

``compile_regime`` turns a researched regime into plain EUR rules (``rules``). ``annual_taxes`` and
``transfer_taxes`` apply those rules to a family profile. ``web/js/taxcalc.js`` is a line-by-line
port; ``tests/test_parity.py`` runs both on the same inputs so they cannot drift apart.

Everything here is deliberately simple: top-end effective rates, no personal allowances, no
timing. It answers "roughly how much, under these researched rules", never "what will I owe".
"""

from __future__ import annotations

from dataclasses import dataclass, field, replace

from domicile.fx import to_eur
from domicile.schema import Bracket, Inheritance, Regime, WealthComponent

METRICS = ("capital_gains", "dividends", "wealth_tax", "inheritance")


@dataclass
class Profile:
    """Illustrative family. Amounts in EUR; shares are fractions."""

    portfolio: float = 30_000_000
    foreign_share: float = 0.9  # of the portfolio and of dividends
    realized_gains: float = 450_000  # per year, listed securities (30M x 5% price return x 30% realised)
    dividends: float = 600_000  # per year (30M x 2% yield)
    real_estate_local: float = 5_000_000
    real_estate_foreign: float = 0.0
    net_wealth: float = 35_000_000
    estate: float = 35_000_000
    children: int = 3
    source_wht: float = 0.15  # treaty withholding assumed on foreign dividends
    citizenship: str = "EU"
    us_share: float = 0.6  # share of foreign dividends paid by US companies
    unrealized_gain_share: float = 0.4  # share of the estate that is unrealised capital gain
    annual_payout: float = 400_000  # what the family withdraws from a holding structure each year

    def __post_init__(self) -> None:
        if self.children < 1:
            raise ValueError("children must be at least 1")


@dataclass
class Rules:
    """A regime compiled to EUR. ``None`` anywhere means the researched data does not say."""

    cgt: dict[str, float | None] = field(default_factory=dict)
    div: dict[str, object] = field(default_factory=dict)
    wealth: list[dict] | None = None
    inh: dict | None = None
    lump_sum: dict | None = None
    structure: dict | None = None
    wealth_cap: dict | None = None
    wealth_from_year: int | None = None  # wealth tax applies only after this many years of residence

    def to_json(self) -> dict:
        return {"cgt": self.cgt, "div": self.div, "wealth": self.wealth, "inh": self.inh, "lump_sum": self.lump_sum,
                "structure": self.structure, "wealth_cap": self.wealth_cap}


def _brackets(bs: list[Bracket], currency: str, fx: dict) -> list[list[float]]:
    return [[round(to_eur(b.from_amount, currency, fx), 2), b.rate] for b in sorted(bs, key=lambda b: b.from_amount)]


def _wealth_component(c: WealthComponent, currency: str, fx: dict) -> dict:
    return {
        "name": c.name, "base": c.base, "mode": c.bracket_mode,
        "exempt": round(to_eur(c.exempt_amount, currency, fx), 2),
        "entry": round(to_eur(c.entry_threshold, currency, fx), 2),
        "brackets": _brackets(c.brackets, currency, fx),
        "credits_wht": c.credits_withholding,
        "securities_share": c.securities_valued_at,
        "home_share": c.main_home_valued_at,
    }


def _inheritance(i: Inheritance, currency: str, fx: dict) -> dict:
    return {
        "basis": i.basis, "treatment": i.children_treatment, "mode": i.bracket_mode,
        "exemption": round(to_eur(i.exemption, currency, fx), 2),
        "brackets": _brackets(i.brackets, currency, fx),
        "other_cost": i.other_transfer_cost_rate,
        "deemed_disposal": i.deemed_disposal_rate,
        "book_value": i.company_shares_at_book_value,
        "indexed": i.thresholds_indexed,
        "scope": i.scope,
        "gift_free_after": i.lifetime_gift_tax_free_after_years,
    }


def compile_regime(regime: Regime, standard: Regime, currency: str, fx: dict) -> Rules:
    """Compile ``regime``; metrics it leaves unset are inherited from ``standard``."""
    pick = {m: getattr(regime, m) or getattr(standard, m) for m in METRICS}
    # A metric marked not_researched is a placeholder: it must count as missing, never as data.
    pick = {m: (v if v is not None and v.status != "not_researched" else None) for m, v in pick.items()}
    cg, dv, wt, ih = pick["capital_gains"], pick["dividends"], pick["wealth_tax"], pick["inheritance"]
    rules = Rules()
    if cg is not None:
        r = cg.rates
        rules.cgt = {
            "listed_domestic": r.listed_securities_domestic, "listed_foreign": r.listed_securities_foreign,
            "business": r.private_business_sale, "real_estate": r.real_estate_local,
        }
    if dv is not None:
        rules.div = {"domestic": dv.domestic_rate, "foreign_gross": dv.foreign_gross_rate, "ftc": dv.foreign_tax_credit,
                     "credit_cap": dv.credit_cap}
    if wt is not None:
        rules.wealth = [_wealth_component(c, currency, fx) | {"indexed": wt.thresholds_indexed} for c in wt.components]
        rules.wealth_from_year = wt.starts_after_years
        if wt.income_cap:
            ic = wt.income_cap
            rules.wealth_cap = {"share": ic.share_of_income, "max_reduction": ic.max_reduction, "gains": ic.counts_long_term_gains,
                                "tax_rate": ic.counted_income_tax_rate, "min_yield": ic.min_income_yield,
                                "min_wealth_rate": ic.min_wealth_tax_rate}
    if ih is not None:
        rules.inh = _inheritance(ih, currency, fx)
    if regime.structure is not None:
        st = regime.structure
        rules.structure = {
            "payout_rate": st.payout_tax_rate,
            "running_cost": round(to_eur(st.annual_running_cost.amount, st.annual_running_cost.currency, fx), 2)
            if st.annual_running_cost else 0.0,
            "cost_relief": st.running_cost_deductible_at or 0.0,
        }
    if regime.lump_sum is not None:
        ls = regime.lump_sum
        spouse = to_eur(ls.spouse_supplement.amount, ls.spouse_supplement.currency, fx) if ls.spouse_supplement else 0.0
        rules.lump_sum = {"annual": round(to_eur(ls.annual.amount, ls.annual.currency, fx) + spouse, 2), "covers": list(ls.covers),
                          "indexed": ls.indexed_to_inflation, "cap": ls.is_cap}
    return rules


def apply_brackets(amount: float, brackets: list[list[float]], mode: str = "marginal") -> float:
    """Tax on ``amount`` (already net of exemptions)."""
    if amount <= 0 or not brackets:
        return 0.0
    if mode == "whole_amount":
        rate = 0.0
        for start, r in brackets:
            if amount > start:
                rate = r
        return amount * rate
    tax = 0.0
    for idx, (start, rate) in enumerate(brackets):
        end = brackets[idx + 1][0] if idx + 1 < len(brackets) else float("inf")
        if amount > start:
            tax += (min(amount, end) - start) * rate
    return tax


def _covers(rules: Rules, what: str) -> bool:
    ls = rules.lump_sum
    return bool(ls) and (what in ls["covers"] or "foreign_income_all" in ls["covers"])


def wealth_base(base: str, p: Profile) -> float:
    financial_foreign = p.portfolio * p.foreign_share
    return {
        "net_wealth_worldwide": p.net_wealth,
        "net_wealth_local": p.real_estate_local + p.portfolio * (1 - p.foreign_share),
        "financial_assets_all": p.portfolio,
        "financial_assets_foreign": financial_foreign,
        "securities_accounts": p.portfolio,
        "real_estate_local": p.real_estate_local,
        "real_estate_foreign": p.real_estate_foreign,
        "real_estate_all": p.real_estate_local + p.real_estate_foreign,
    }[base]


def annual_taxes(rules: Rules, p: Profile, std: Rules | None = None) -> dict[str, float | None]:
    """Annual residence-country taxes in EUR. ``None`` = not computable from the researched data.

    A lump sum (if any) is reported separately and also allocated across the metrics in proportion
    to the standard-regime tax it replaces (``std``), so each metric compares like with like and a
    lump-sum regime only scores better when it really costs less. Without ``std``, or when it
    replaces nothing, the lump sum is allocated to capital gains and dividends by foreign income.
    """
    out: dict[str, float | None] = {}
    gains_f, gains_d = p.realized_gains * p.foreign_share, p.realized_gains * (1 - p.foreign_share)
    div_f, div_d = p.dividends * p.foreign_share, p.dividends * (1 - p.foreign_share)
    lump_cg, lump_div = _covers(rules, "foreign_capital_gains"), _covers(rules, "foreign_dividends")

    c = rules.cgt
    if c.get("listed_foreign") is None and not lump_cg or c.get("listed_domestic") is None:
        out["capital_gains"] = None
    else:
        out["capital_gains"] = (0.0 if lump_cg else gains_f * c["listed_foreign"]) + gains_d * c["listed_domestic"]

    d = rules.div
    if d.get("domestic") is None or (d.get("foreign_gross") is None and not lump_div):
        out["dividends"] = None
    else:
        if lump_div:
            foreign = 0.0
        elif d["ftc"] == "exemption":
            foreign = 0.0
        elif d["ftc"] == "credit":
            credit = p.source_wht if d.get("credit_cap") is None else min(p.source_wht, d["credit_cap"])
            foreign = div_f * max(0.0, d["foreign_gross"] - credit)
        elif d["ftc"] == "deduction":
            foreign = div_f * (1 - p.source_wht) * d["foreign_gross"]
        else:
            foreign = div_f * d["foreign_gross"]
        out["dividends"] = foreign + div_d * d["domestic"]

    if rules.wealth is None:
        out["wealth_tax"] = None
    else:
        total = 0.0
        for comp in rules.wealth:
            if "foreign" in comp["base"] and _covers(rules, "wealth_tax_foreign"):
                continue
            s, hs = comp.get("securities_share", 1.0), comp.get("home_share", 1.0)
            valued = p if s == hs == 1.0 else replace(
                p, portfolio=p.portfolio * s, real_estate_local=p.real_estate_local * hs,
                net_wealth=p.net_wealth - p.portfolio * (1 - s) - p.real_estate_local * (1 - hs))
            base = wealth_base(comp["base"], valued)
            if base <= comp["entry"]:
                continue
            tax = apply_brackets(base - comp["exempt"], comp["brackets"], comp["mode"])
            if comp.get("credits_wht"):  # a tax on deemed income that takes the place of dividend tax
                tax = max(0.0, tax - div_f * p.source_wht)
            total += tax
        cap = rules.wealth_cap
        if cap and total > 0 and None not in (d.get("domestic"), d.get("foreign_gross"), c.get("listed_foreign"), c.get("listed_domestic")):
            # Income tax before credits on the income that counts, against the cap on income plus wealth tax.
            if rules.structure:  # the family's own income is what the structure pays out to it
                income = p.annual_payout
                income_tax = p.annual_payout * (rules.structure["payout_rate"] or 0.0)
            else:
                income = p.dividends + (p.realized_gains if cap["gains"] else 0.0)
                income_tax = div_f * d["foreign_gross"] + div_d * d["domestic"]
                if cap["gains"]:
                    income_tax += gains_f * c["listed_foreign"] + gains_d * c["listed_domestic"]
            if cap.get("tax_rate") is not None:  # only part of the income tax counts (e.g. not the federal tax)
                income_tax = income * cap["tax_rate"]
            if cap.get("min_yield"):
                income = max(income, p.net_wealth * cap["min_yield"])
            floor = max(total * (1 - cap["max_reduction"]), p.net_wealth * (cap.get("min_wealth_rate") or 0.0))
            allowed = max(cap["share"] * income - income_tax, min(total, floor))
            total = min(total, allowed)
        out["wealth_tax"] = total

    _add_structure_costs(rules, p, out)
    lump = rules.lump_sum["annual"] if rules.lump_sum else 0.0
    out["lump_sum"] = lump
    if not lump:
        return out
    keys = ("capital_gains", "dividends", "wealth_tax")
    if std is not None:
        base = annual_taxes(std, p)
        cut = {k: max(0.0, base[k] - out[k]) for k in keys if base[k] is not None and out[k] is not None}
        total = sum(cut.values())
        charge = min(lump, total) if rules.lump_sum.get("cap") else lump  # a cap never costs more than the ordinary tax
        out["lump_sum"] = charge
        if total > 0:
            for k, v in cut.items():
                out[k] += charge * v / total
            return out
        if rules.lump_sum.get("cap"):
            return out
    replaced = (gains_f if lump_cg else 0.0) + (div_f if lump_div else 0.0)
    if replaced > 0:
        for key, amount, flag in (("capital_gains", gains_f, lump_cg), ("dividends", div_f, lump_div)):
            if flag and out[key] is not None:
                out[key] += lump * amount / replaced
    return out


def unrelieved_us_wht(p: Profile, has_us_treaty: bool, cfg_wht: dict) -> float:
    """Extra US withholding (EUR/yr) when the country of residence has no US treaty. Not residence tax."""
    if has_us_treaty or p.citizenship == "US":
        return 0.0
    return p.dividends * p.foreign_share * p.us_share * (cfg_wht["statutory_rate"] - cfg_wht["treaty_rate"])


def _add_structure_costs(rules: Rules, p: Profile, out: dict) -> None:
    """Holding structures: the family withdraws ``annual_payout`` a year, taxed at the payout rate,
    and the vehicle has running costs. Both are allocated to capital gains and dividends in
    proportion to the income they come out of, so effective rates stay comparable."""
    out["payout_tax"] = 0.0
    out["running_cost"] = 0.0
    st = rules.structure
    if not st:
        return
    if st["payout_rate"] is None:
        out["capital_gains"] = out["dividends"] = None
        return
    income = p.realized_gains + p.dividends
    payout = min(p.annual_payout, income) if income > 0 else p.annual_payout
    out["payout_tax"] = payout * st["payout_rate"]
    out["running_cost"] = st["running_cost"]
    # Deductible costs lower the structure's own tax, never below nothing.
    relief = min(st["running_cost"] * st.get("cost_relief", 0.0), (out["capital_gains"] or 0.0) + (out["dividends"] or 0.0))
    extra = out["payout_tax"] + out["running_cost"] - relief
    if income <= 0:
        return
    for key, amount in (("capital_gains", p.realized_gains), ("dividends", p.dividends)):
        if out[key] is not None:
            out[key] += extra * amount / income


def local_share(p: Profile) -> float:
    """Share of net wealth situated in the country of residence (local home + domestic securities)."""
    if p.net_wealth <= 0:
        return 1.0
    local = p.real_estate_local + p.portfolio * (1 - p.foreign_share)
    return max(0.0, min(1.0, local / p.net_wealth))


def transfer_taxes(rules: Rules, p: Profile) -> float | None:
    """Tax on passing ``p.estate`` to ``p.children`` equal heirs, in EUR (one-off, not annual)."""
    ih = rules.inh
    if ih is None:
        return None
    taxable = p.estate * local_share(p) if ih.get("scope") == "local_assets_only" else p.estate
    if ih["basis"] == "beneficiary":
        share = taxable / p.children
        tax = p.children * apply_brackets(share - ih["exemption"], ih["brackets"], ih["mode"])
    elif ih["basis"] == "estate":
        tax = apply_brackets(taxable - ih["exemption"], ih["brackets"], ih["mode"])
    else:
        tax = 0.0
    deemed = p.estate * p.unrealized_gain_share * ih.get("deemed_disposal", 0.0)
    return tax + deemed + taxable * ih["other_cost"]  # transfer costs reach what the tax reaches
