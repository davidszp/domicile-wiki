"""Project a family portfolio over 60 years, path by path: ``python -m domicile.projection DEU [--json]``.

A recipe (``data/recipes/<ISO3>.json``) lists the ways a family can hold its portfolio in a country
(personally, through a company, a foundation ...). Each path names a regime in the country's tax file,
so the rates live in one place and the monthly update keeps them current. This module runs the same
yearly loop for every path:

    grow the portfolio (dividends + price gains)
    tax it with the existing engine (``taxcalc.annual_taxes``), plus source withholding on foreign dividends
    take out what the family spends (grossed up for the payout tax of a structure)
    at each death: inheritance tax with ``taxcalc.transfer_taxes``

A time-limited regime (e.g. a 17-year non-dom period) applies until it ends, then the standard rules.
Amounts are nominal inside the loop and reported in today's money (deflated by ``inflation``).

Deliberate simplifications, shown on the page: returns are steady (no market cycles); a fixed share of
each year's price gain is realised and taxed, the rest stays unrealised and is only taxed by a deemed
disposal at death; spending is paid from income without selling; the family's home is held at a constant
real value and counts for wealth tax and inheritance but is not part of the portfolio shown.
"""

from __future__ import annotations

import argparse
import json
import sys
from dataclasses import asdict, dataclass, field, replace
from pathlib import Path

from domicile import scoring
from domicile.schema import RecipeFile
from domicile.taxcalc import Profile, Rules, annual_taxes, compile_regime, transfer_taxes, unrelieved_us_wht

ROOT = Path(__file__).resolve().parent.parent
RECIPES = ROOT / "data" / "recipes"


@dataclass
class Assumptions:
    """The family and the market. Amounts in EUR, today's money."""

    portfolio: float = 30_000_000
    years: int = 60
    deaths: tuple[int, ...] = (30, 60)  # one per generation
    dividend_yield: float = 0.02
    price_growth: float = 0.05  # nominal
    inflation: float = 0.025
    realisation: float = 0.30  # share of each year's price gain that is sold (and taxed) that year
    spending: float = 400_000  # what the family takes out a year, after any payout tax
    spending_growth: float | None = None  # nominal; None = inflation (constant in today's money)
    home: float = 5_000_000  # real estate in the country, constant in today's money
    children: int = 3
    foreign_share: float = 0.9
    source_wht: float = 0.15
    us_share: float = 0.6
    citizenship: str = "EU"

    @classmethod
    def reference(cls, cfg: dict) -> Assumptions:
        """The site's reference family and market (scoring_config.reference_family, .market, .projection)."""
        ref, m = cfg["reference_family"], cfg["market"]
        return cls(dividend_yield=m["dividend_yield"], price_growth=m["price_growth"], inflation=m["inflation"],
                   realisation=m["realisation"], deaths=tuple(cfg["projection"]["deaths"]), portfolio=ref["portfolio"], spending=ref["annual_payout"], home=ref["real_estate_local"],
                   children=ref["children"], foreign_share=ref["foreign_share"], source_wht=ref["source_wht"],
                   us_share=cfg["us_dividend_withholding"]["us_share_of_foreign_dividends"])


@dataclass
class Year:
    year: int
    wealth: float  # portfolio at the end of the year, today's money
    taxes: float  # income and wealth taxes, withholding, payout tax and running costs, today's money
    inheritance: float = 0.0  # tax at a death this year, today's money
    regime: str = ""


@dataclass
class PathResult:
    id: str
    name: str
    regime: str
    years: list[Year] = field(default_factory=list)
    missing: str | None = None  # why the path cannot be computed (unresearched data)

    @property
    def end_wealth(self) -> float | None:
        return self.years[-1].wealth if self.years and not self.missing else None

    def summary(self) -> dict:
        if self.missing:
            return {"id": self.id, "name": self.name, "missing": self.missing}
        return {"id": self.id, "name": self.name, "end_wealth": round(self.end_wealth),
                "taxes": round(sum(y.taxes for y in self.years)), "inheritance": round(sum(y.inheritance for y in self.years))}


def load_recipe(iso3: str) -> RecipeFile:
    return RecipeFile.model_validate_json((RECIPES / f"{iso3}.json").read_text(encoding="utf-8"))


def path_rules(jur, regime_id: str, fx: dict) -> tuple[Rules, Rules, float | None, str]:
    """(rules while the regime applies, rules afterwards, duration in years, regime name)."""
    std = next(r for r in jur.regimes if r.type == "standard")
    reg = next((r for r in jur.regimes if r.id == regime_id), None)
    if reg is None:
        raise KeyError(f"{jur.id}: no regime '{regime_id}'")
    return (compile_regime(reg, std, jur.currency, fx), compile_regime(std, std, jur.currency, fx),
            reg.duration_years, reg.name)


def project_path(rules: Rules, after: Rules, duration: float | None, a: Assumptions, *, us_treaty: bool,
                 cfg_wht: dict, estate: str = "portfolio") -> tuple[list[Year], str | None]:
    """The yearly loop for one path. Returns the years, or a reason when the data cannot price a year."""
    v, unrealised = a.portfolio, 0.0
    growth = a.inflation if a.spending_growth is None else a.spending_growth
    out: list[Year] = []
    for t in range(1, a.years + 1):
        r = rules if duration is None or t <= duration else after
        infl = (1 + a.inflation) ** t
        home = a.home * infl
        div, price = v * a.dividend_yield, v * a.price_growth
        gains = price * a.realisation
        unrealised += price - gains
        need = a.spending * (1 + growth) ** (t - 1)
        payout_rate = r.structure["payout_rate"] if r.structure else 0.0
        if payout_rate is None:
            return out, "the payout tax of this structure is not researched"
        gross = need / (1 - payout_rate)
        p = Profile(portfolio=v, foreign_share=a.foreign_share, realized_gains=gains, dividends=div,
                    real_estate_local=home, net_wealth=v + home, estate=v + home, children=a.children,
                    source_wht=a.source_wht, citizenship=a.citizenship, us_share=a.us_share, annual_payout=gross)
        tx = annual_taxes(r, p, after)
        if None in (tx["capital_gains"], tx["dividends"], tx["wealth_tax"]):
            gap = next(k for k in ("capital_gains", "dividends", "wealth_tax") if tx[k] is None)
            return out, f"{gap.replace('_', ' ')} is not researched for this regime"
        # The engine taxes the payout up to the year's income; here the family needs ``gross`` in full.
        taxes = tx["capital_gains"] + tx["dividends"] + tx["wealth_tax"] - tx["payout_tax"] + gross * payout_rate
        # Withholding abroad is lost whatever the residence country does (a credit only reduces its own tax).
        taxes += div * a.foreign_share * a.source_wht + unrelieved_us_wht(p, us_treaty, cfg_wht)
        v += div + price - taxes - need  # ``taxes`` includes the payout tax, so the rest of the payout is ``need``
        inh = 0.0
        if t in a.deaths:
            in_estate = v if estate == "portfolio" else 0.0
            total = in_estate + home
            heirs = replace(p, portfolio=v, net_wealth=total, estate=total,
                            unrealized_gain_share=min(1.0, unrealised / total) if in_estate > 0 and total > 0 else 0.0)
            tax = transfer_taxes(r, heirs)
            if tax is None:
                return out, "inheritance tax is not researched for this regime"
            inh = tax
            v -= inh
            if r.inh and r.inh.get("deemed_disposal"):
                unrealised = 0.0  # the deemed sale resets the base
        out.append(Year(t, v / infl, taxes / infl, inh / infl, "regime" if r is rules else "standard"))
        if v <= 0:
            return out, "the portfolio runs out"
    return out, None


def project(iso3: str, a: Assumptions | None = None, *, cfg: dict | None = None, jurisdictions=None, fx: dict | None = None) -> list[PathResult]:
    """Every path in the country's recipe, plus a no-tax line for reference."""
    from domicile import build, fx as fxm

    cfg = cfg or scoring.load_config()
    a = a or Assumptions.reference(cfg)
    jurisdictions = jurisdictions or build.load_jurisdictions()
    fx = fx or fxm.load()
    recipe = load_recipe(iso3)
    jur = jurisdictions[iso3]
    treaty = scoring.has_us_treaty(iso3, cfg)
    results = []
    for path in recipe.paths:
        rules, after, duration, name = path_rules(jur, path.regime, fx)
        years, missing = project_path(rules, after, duration, a, us_treaty=treaty,
                                      cfg_wht=cfg["us_dividend_withholding"], estate=path.estate)
        results.append(PathResult(path.id, path.name, name, years, missing))
    zero = Rules(cgt={"listed_domestic": 0.0, "listed_foreign": 0.0}, div={"domestic": 0.0, "foreign_gross": 0.0, "ftc": "none"},
                 wealth=[], inh={"basis": "none", "brackets": [], "exemption": 0.0, "mode": "marginal", "other_cost": 0.0})
    years, _ = project_path(zero, zero, None, replace(a, source_wht=0.0), us_treaty=True, cfg_wht=cfg["us_dividend_withholding"])
    results.append(PathResult("no_tax", "No tax at all (reference)", "", years))
    return results


def _table(iso3: str, results: list[PathResult], a: Assumptions) -> str:
    marks = [y for y in (10, 20, 30, 40, 50, 60) if y <= a.years]
    lines = [f"{iso3}: EUR {a.portfolio / 1e6:.0f}M portfolio, {a.dividend_yield:.0%} dividends + {a.price_growth:.0%} growth, "
             f"{a.inflation:.1%} inflation, spending EUR {a.spending / 1e3:.0f}k/yr, deaths in years {', '.join(map(str, a.deaths))}. "
             "Millions of EUR in today's money.", "",
             "| Path | " + " | ".join(f"Year {y}" for y in marks) + " | Taxes | Inheritance |",
             "|---|" + "---:|" * (len(marks) + 2)]
    for r in results:
        if r.missing:
            lines.append(f"| {r.name} | not computable: {r.missing} |")
            continue
        at = {y.year: y.wealth for y in r.years}
        lines.append(f"| {r.name} | " + " | ".join(f"{at[y] / 1e6:.1f}" for y in marks)
                     + f" | {sum(y.taxes for y in r.years) / 1e6:.1f} | {sum(y.inheritance for y in r.years) / 1e6:.1f} |")
    return "\n".join(lines)


def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("countries", nargs="*", help="ISO3 codes (default: every recipe)")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args(argv)
    cfg = scoring.load_config()
    assumptions = Assumptions.reference(cfg)
    out = {}
    for iso3 in a.countries or sorted(p.stem for p in RECIPES.glob("*.json")):
        res = project(iso3, assumptions, cfg=cfg)
        out[iso3] = [r.summary() for r in res]
        if not a.json:
            print(_table(iso3, res, assumptions), end="\n\n")
    if a.json:
        print(json.dumps({"assumptions": asdict(assumptions), "countries": out}, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
