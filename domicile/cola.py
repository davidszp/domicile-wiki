"""Salary multipliers for the Expat persona from official posting allowances.

Governments and international organisations scale the pay of staff posted abroad by local living
costs. ``data/indicators/expat_cola/<source>.csv`` holds one such table per source (US State
Department post allowance, UN post adjustment, EU correction coefficients, German
Kaufkraftausgleich), each with a ``<source>.json`` describing its base. Every table is rescaled so
that the euro-area reference countries average 1.0, then the rescaled values are averaged per country:

- two-sided tables (an index that can go below its base, e.g. EU coefficients) are divided by the
  mean of the euro-area reference countries they list;
- one-sided tables (an allowance paid only where costs exceed the base, floored at 0) are turned
  into 1 + allowance and fitted to the two-sided consensus by the median ratio over the countries
  both list with a positive allowance. A zero allowance only says "not dearer than the base", so
  it is left out rather than read as equal to the base.

Countries no table covers fall back to the World Bank price level relative to the euro area, and
are flagged as estimated.
"""

from __future__ import annotations

import csv
import json
import statistics
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIR = ROOT / "data" / "indicators" / "expat_cola"


def load_sources(path: Path = DIR) -> dict[str, dict]:
    out = {}
    for meta_path in sorted(path.glob("*.json")):
        csv_path = meta_path.with_suffix(".csv")
        if not csv_path.exists():
            continue
        meta = json.loads(meta_path.read_text())
        if meta.get("use") is False:
            continue
        with csv_path.open() as f:
            rows = {r["iso3"]: {**r, "value": float(r["value"])} for r in csv.DictReader(f) if r["value"].strip()}
        out[meta_path.stem] = {"meta": meta, "rows": rows}
    return out


def _index(name: str, src: dict, value: float) -> float:
    """Raw table value as a cost index proportional to local costs."""
    kind = src["meta"].get("value_kind", "index")
    if kind == "percent_allowance":
        return 1 + value / 100
    if kind == "multiplier_points":  # UN post adjustment multiplier: pay = base x (1 + m/100)
        return 1 + value / 100
    return value / 100  # an index with the base at 100


def multipliers(sources: dict[str, dict], euro_ref: list[str], price_level: dict[str, float],
                plr_ref: float, countries: list[str]) -> dict[str, dict]:
    two = {n: s for n, s in sources.items() if s["meta"].get("two_sided")}
    one = {n: s for n, s in sources.items() if not s["meta"].get("two_sided")}
    norm: dict[str, dict[str, float]] = {}
    for n, s in two.items():
        ref = [_index(n, s, s["rows"][c]["value"]) for c in euro_ref if c in s["rows"]]
        if len(ref) < 3:
            continue  # cannot anchor this table to the euro area
        base = statistics.mean(ref)
        norm[n] = {c: _index(n, s, r["value"]) / base for c, r in s["rows"].items()}
    consensus = {c: statistics.mean(v[c] for v in norm.values() if c in v) for c in {c for v in norm.values() for c in v}}
    for n, s in one.items():
        pos = {c: _index(n, s, r["value"]) for c, r in s["rows"].items() if r["value"] > 0}
        if s["meta"].get("base_country"):
            pos[s["meta"]["base_country"]] = 1.0  # the table's home country is its base by definition
        ratios = [consensus[c] / pos[c] for c in pos if c in consensus]
        if len(ratios) < 5:
            continue
        k = statistics.median(ratios)
        norm[n] = {c: k * v for c, v in pos.items()}
    out = {}
    adjust = city_adjustments()
    for c in countries:
        vals = {n: round(v[c], 4) for n, v in norm.items() if c in v}
        if vals:
            out[c] = {"multiplier": round(statistics.mean(vals.values()), 4), "sources": vals, "estimated": False}
        elif price_level.get(c) and plr_ref:
            out[c] = {"multiplier": round(price_level[c] / plr_ref, 4), "sources": {}, "estimated": True}
        if c in out and c in adjust:
            a = adjust[c]
            out[c]["multiplier"] = round(out[c]["multiplier"] * a["factor"], 4)
            out[c]["city_adjustment"] = {"from": a["from"]["city"], "to": a["to"]["city"], "factor": a["factor"], "source": a["source"], "url": a["url"]}
    return out


def city_adjustments(path: Path = DIR) -> dict[str, dict]:
    """``<iso2 or iso3>_city_adjustment.json``: the tables quote a country at one post (the US at New York);
    this rescales it to the benchmark city by an official price-level ratio (BEA Regional Price Parities)."""
    prefix_iso = {"us": "USA"}
    out = {}
    for p in sorted(path.glob("*_city_adjustment.json")):
        prefix = p.name.removesuffix("_city_adjustment.json")
        out[prefix_iso.get(prefix, prefix.upper())] = json.loads(p.read_text())
    return out
