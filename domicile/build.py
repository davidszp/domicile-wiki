"""Build the web app's data: ``python -m domicile.build``.

Reads researched jurisdiction files, indicators, FX and the scoring config; writes
- ``web/data/scores.json``   compact per-jurisdiction metric scores for the map, rankings and weights UI
- ``web/data/profiles/<ID>.json``  full detail for one jurisdiction (lazy-loaded on click)
- ``web/data/sources.json``  the source register
- ``web/data/dossiers/<file>.md``  the dated legal dossiers
"""

from __future__ import annotations

import copy
import csv
import datetime as dt
import json
import shutil
from pathlib import Path

from domicile import cola, earned, scene, scoring
from domicile.fx import load as load_fx, to_eur
from domicile.schema import CostOfLiving, IncomeFile, Jurisdiction, Regime, Subnational
from domicile.taxcalc import compile_regime

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
WEB = ROOT / "web" / "data"
CITIZENSHIPS = ("EU", "US", "OTHER")


def load_indicators() -> dict[str, dict[str, dict]]:
    out: dict[str, dict[str, dict]] = {}
    with (DATA / "indicators" / "indicators.csv").open() as f:
        for r in csv.DictReader(f):
            out.setdefault(r["iso3"], {})[r["key"]] = {"value": float(r["value"]), "year": int(r["year"]), "source": "dataset"}
    return out


def load_jurisdictions() -> dict[str, Jurisdiction]:
    out = {}
    for p in sorted((DATA / "jurisdictions").glob("*.json")):
        j = Jurisdiction.model_validate_json(p.read_text())
        out[j.id] = j
    return out


def load_income() -> dict[str, IncomeFile]:
    return {p.stem: IncomeFile.model_validate_json(p.read_text()) for p in sorted((DATA / "income").glob("*.json"))}


def load_subnational() -> dict[str, Subnational]:
    return {p.stem: Subnational.model_validate_json(p.read_text()) for p in sorted((DATA / "subnational").glob("*.json"))}


def merge_unit(parent: Jurisdiction, unit) -> Jurisdiction:
    """Apply a subnational unit's overrides to a copy of its parent."""
    child = parent.model_copy(deep=True)
    regimes: list[Regime] = []
    for r in child.regimes:
        ov = unit.regime_overrides.get(r.id)
        if ov is None:
            regimes.append(r)
            continue
        if not ov.available:
            if r.type == "standard":
                raise ValueError(f"{unit.code}: the standard regime cannot be removed")
            continue
        updates = {k: getattr(ov, k) for k in ("name", "description", "eligibility", "lump_sum", "capital_gains",
                                               "dividends", "wealth_tax", "inheritance") if getattr(ov, k) is not None}
        if ov.sources:
            updates["sources"] = [*r.sources, *ov.sources]
        regimes.append(r.model_copy(update=updates))
    unknown = set(unit.regime_overrides) - {r.id for r in parent.regimes}
    if unknown:
        raise ValueError(f"{unit.code}: overrides for unknown regimes {sorted(unknown)}")
    return child.model_copy(update={
        "name": unit.name, "regimes": regimes, "summary": unit.summary,
        "cost_of_living": unit.cost_of_living or parent.cost_of_living,
        "markers": unit.markers, "open_questions": [*unit.open_questions],
    })


def cost_in_eur(col: CostOfLiving | None, fx: dict) -> dict | None:
    if col is None:
        return None
    def eur(item):
        return None if item is None else to_eur(item.value.amount, item.value.currency, fx)
    return {"city": col.city, "rent_monthly": eur(col.prime_rent_monthly), "school_fee": eur(col.intl_school_annual_fee),
            "health": eur(col.family_health_insurance_annual), "housekeeper_monthly": eur(col.housekeeper_monthly),
            "price_per_m2": eur(col.prime_price_per_m2)}


def score_jurisdiction(jid: str, country: str, j: Jurisdiction, ind: dict, cfg: dict, fx: dict, plr_ref: float, all_ind: dict) -> dict:
    """Tax scores per citizenship and regime, non-tax scores, household cost."""
    std = j.regimes[0]
    usd_per_eur = fx["rates"]["USD"]["per_eur"]
    compiled = {r.id: compile_regime(r, std, j.currency, fx) for r in j.regimes}
    tax: dict[str, list] = {}
    for cz in CITIZENSHIPS:
        profile = scoring.reference_profile(cfg, cz)
        std_scores = scoring.tax_metric_scores(compiled[std.id], profile, cfg, country, usd_per_eur)
        std_cost = scoring.regime_cost(std_scores, profile, cfg)
        horizon = cfg["tax_transforms"]["time_limited_regimes"]["horizon_years"]
        rows = []
        for r in j.regimes:
            if cz not in r.eligible_citizenships:
                continue
            s = std_scores if r is std else scoring.tax_metric_scores(compiled[r.id], profile, cfg, country, usd_per_eur,
                                                                       compiled[std.id])
            cost = scoring.regime_cost(s, profile, cfg)
            if r is not std:
                if r.duration_years is not None and cost is not None and std_cost is not None:
                    f = min(1.0, r.duration_years / horizon)
                    cost = f * cost + (1 - f) * std_cost
                s = scoring.blend(s, std_scores, r.duration_years, cfg)
            rows.append({"id": r.id, "name": r.name, "type": r.type, "duration": r.duration_years,
                         "cost": None if cost is None else round(cost),
                         "activity": r.requires_qualifying_activity, "structure": r.type == "structure",
                         "scores": {m: s[m].get("score") for m in scoring.TAX_METRICS}, "detail": s})
        tax[cz] = rows

    indicators = dict(ind)
    for k, o in j.indicator_overrides.items():
        indicators[k] = {"value": o.value, "year": o.year, "source": o.source.title, "url": str(o.source.url)}
    plr, plr_note = price_level(jid, indicators, cfg, all_ind)
    hh = scoring.household_cost(cost_in_eur(j.cost_of_living, fx), plr, plr_ref, cfg, plr_note)
    hc = cfg["household_cost"]
    nontax = scoring.nontax_scores(indicators, {"household_cost": hh, "cost_best": hc["best_eur"], "cost_worst": hc["worst_eur"]}, cfg)
    verification = [(getattr(std, m).verification, getattr(std, m).confidence) for m in scoring.TAX_METRICS]
    return {"tax": tax, "nontax": nontax, "household_cost": hh, "indicators": indicators,
            "verification": verification, "compiled": {k: v.to_json() for k, v in compiled.items()}}


def price_level(jid: str, indicators: dict, cfg: dict, all_ind: dict) -> tuple[float | None, str | None]:
    plr = indicators.get("price_level_ratio", {}).get("value")
    partner = cfg["household_cost"]["price_level_fallback"]["map"].get(jid)
    if plr is None and partner and "price_level_ratio" in all_ind.get(partner, {}):
        return (all_ind[partner]["price_level_ratio"]["value"],
                f"No World Bank price level for this jurisdiction; {partner}'s price level used for the price-scaled components.")
    return plr, None


def income_personas(cfg: dict) -> dict[str, dict]:
    """Personas scored on earned income (everything except the family office)."""
    return {k: p for k, p in cfg["personas"].items() if "income_kind" in p}


PER_CITIZENSHIP = ("visa", "leftover")  # persona metrics that depend on the citizenship


def persona_income(persona: dict, usd_per_eur: float, mult: dict | None) -> tuple[float, dict | None]:
    """Gross pay in EUR for a persona in one country, with the salary multiplier applied if the persona has one."""
    base = persona["income_usd"] / usd_per_eur
    sm = persona.get("salary_multiplier")
    if not sm or not mult:
        return base, None
    share = sm.get("scaled_share", 1.0)
    return base * (1 - share + share * mult["multiplier"]), mult


def persona_block(country: str, rules: dict | None, inc: IncomeFile | None, nontax: dict, ko: list[dict],
                  plr: float | None, plr_ref: float, cfg: dict, usd_per_eur: float, mult: dict | None = None,
                  nomad_scene: dict | None = None) -> dict:
    """Per-persona tax rows (per citizenship), persona-specific metrics and knock-outs for one map unit."""
    out = {}
    for pid, persona in income_personas(cfg).items():
        income, m = persona_income(persona, usd_per_eur, mult)
        cost = earned.persona_cost(rules["costs"] if rules else None, plr, plr_ref, persona)
        cost_score = earned.persona_cost_score(cost["total_eur"] if cost else None, persona)
        tax = {cz: earned.persona_rows(rules, persona, cz, income, cfg) for cz in CITIZENSHIPS} if rules else None
        visa = {cz: earned.visa_score(rules, country, persona, cz, income) for cz in CITIZENSHIPS} if "visa" in persona["metrics"] else None
        leftover = None
        if "leftover" in persona["metrics"]:
            leftover = {cz: earned.leftover(income, tax[cz] if tax else None, cost["total_eur"] if cost else None, persona)
                        for cz in CITIZENSHIPS}
        special = {"cost": cost_score, "scene": nomad_scene["score"] if nomad_scene else None}
        nt = {k: (special[k] if k in special else nontax[k]["score"]) for k in persona["metrics"]
              if k not in PER_CITIZENSHIP and persona["metrics"][k]["group"] == "nontax"}
        block = {"tax": tax, "nontax": nt, "visa": visa, "leftover": leftover, "income_eur": round(income),
                 "salary_multiplier": m, "nomad_scene": nomad_scene if "scene" in persona["metrics"] else None,
                 "household_cost": cost["total_eur"] if cost else None,
                 "household_cost_detail": cost, "ko": [k for k in ko if k["id"] in persona["knockout"]],
                 "verification": [(inc.income_tax.verification, inc.income_tax.confidence)] if inc else None}
        block["default"] = summarize_persona(block, persona, cfg)
        out[pid] = block
    return out


def persona_weights(persona: dict) -> dict[str, float]:
    return {m: v["weight"] for m, v in persona["metrics"].items()}


def summarize_persona(block: dict, persona: dict, cfg: dict, citizenship: str = "EU", weights: dict | None = None) -> dict:
    """Overall score for an earned-income persona: the cheapest eligible regime's income-tax score
    plus the persona's non-tax metrics, visa access and Annual Household Cost."""
    weights = weights or persona_weights(persona)
    rows = block["tax"][citizenship] if block["tax"] else []
    best = min(rows, key=lambda r: r["cost"]) if rows else None  # ties keep standard (first)
    scores = dict(block["nontax"])
    scores["income_tax"] = best["scores"]["income_tax"] if best else None
    if block["visa"] is not None:
        scores["visa"] = block["visa"][citizenship]
    if block.get("leftover") is not None:
        scores["leftover"] = block["leftover"][citizenship]["score"]
    tot = scoring.overall(scores, weights)
    verification = (block["verification"] or []) + ([best["verification"]] if best and "verification" in best else [])
    st = scoring.status(verification or None, tot["completeness"], best is not None, cfg)
    if block["ko"]:
        st = "knocked_out"
    return {"score": tot["score"] if st not in ("insufficient", "knocked_out") else None,
            "tax_score": scores["income_tax"], "status": st, "regime": best["id"] if best else None,
            "completeness": round(tot["completeness"], 4), "range": [tot["score"], tot["max_if_missing_perfect"]]}


def best_regime(rows: list[dict], weights: dict[str, float], include_activity: bool = False,
                include_structures: bool = True) -> dict | None:
    """Best regime by weighted tax score. Regimes needing employment or a qualifying activity are
    skipped unless ``include_activity`` (the family is assumed to be passive investors); holding
    structures are considered unless ``include_structures`` is False."""
    rows = [r for r in rows if (include_activity or not r.get("activity")) and (include_structures or not r.get("structure"))]
    priced = [r for r in rows if r.get("cost") is not None and all(r["scores"][m] is not None for m in scoring.TAX_METRICS)]
    if priced:  # the family picks the cheapest regime; ties keep the earlier (standard) one
        return min(priced, key=lambda r: r["cost"])

    def value(r):
        s = r["scores"]
        if any(s[m] is None for m in scoring.TAX_METRICS):
            return -1
        return sum(weights[m] * s[m] for m in scoring.TAX_METRICS)
    return max(rows, key=value) if rows else None


def summarize(entry: dict, cfg: dict, citizenship: str = "EU", weights: dict | None = None,
              include_activity: bool = False, include_structures: bool = True) -> dict:
    weights = weights or scoring.default_weights(cfg)
    rows = entry["tax"].get(citizenship, []) if entry.get("tax") else []
    best = best_regime(rows, weights, include_activity, include_structures)
    metric_scores = {m: v.get("score") for m, v in entry["nontax"].items()}
    tax_computable = False
    if best:
        metric_scores.update(best["scores"])
        tax_computable = all(best["scores"][m] is not None for m in scoring.TAX_METRICS)
    else:
        metric_scores.update({m: None for m in scoring.TAX_METRICS})
    tot = scoring.overall(metric_scores, weights)
    st = scoring.status(entry.get("verification"), tot["completeness"], tax_computable, cfg)
    if entry.get("ko"):
        st = "knocked_out"
    return {"score": tot["score"] if st not in ("insufficient", "knocked_out") else None, "tax_score": scoring.tax_only(metric_scores, weights),
            "status": st, "regime": best["id"] if best else None, "completeness": round(tot["completeness"], 4),
            "range": [tot["score"], tot["max_if_missing_perfect"]]}


def main() -> None:
    cfg = scoring.load_config()
    fx = load_fx()
    ind = load_indicators()
    jur = load_jurisdictions()
    subs = load_subnational()
    income = load_income()
    income_rules = {k: earned.compile_income(f, fx) for k, f in income.items()}
    usd_per_eur = fx["rates"]["USD"]["per_eur"]
    world = json.loads((DATA / "build" / "countries.geojson").read_text())["features"]
    regions = json.loads((DATA / "build" / "regions.geojson").read_text())["features"]
    ref = cfg["household_cost"]["euro_area_reference"]
    plrs = [ind[c]["price_level_ratio"]["value"] for c in ref if "price_level_ratio" in ind.get(c, {})]
    plr_ref = sum(plrs) / len(plrs)
    mults = cola.multipliers(cola.load_sources(), ref,
                             {c: v["price_level_ratio"]["value"] for c, v in ind.items() if "price_level_ratio" in v},
                             plr_ref, sorted(income))
    scenes = scene.scores(scene.load(), sorted({f["properties"]["id"] for f in world}))

    out_j: dict[str, dict] = {}
    profiles: dict[str, dict] = {}
    profiles_extra: dict[str, dict] = {}
    sources: list[dict] = []
    unknown = set(jur) - {f["properties"]["id"] for f in world}
    if unknown:
        raise SystemExit(f"jurisdiction files without a boundary feature: {sorted(unknown)}")

    def add(jid: str, name: str, level: str, parent: str | None, continent: str, region: str,
            j: Jurisdiction | None, iso_for_indicators: str, inherited: bool = False, lx=None, ly=None) -> None:
        entry = {"name": name, "level": level, "parent": parent, "continent": continent, "region": region,
                 "researched": j is not None, "inherited": inherited}
        if lx is not None:
            entry["label"] = [lx, ly]

        def personas(indicators: dict, nontax: dict, ko: list[dict]) -> None:
            plr, _ = price_level(iso_for_indicators, indicators, cfg, ind)
            blocks = persona_block(iso_for_indicators, income_rules.get(iso_for_indicators), income.get(iso_for_indicators),
                                   nontax, ko, plr, plr_ref, cfg, usd_per_eur, mults.get(iso_for_indicators),
                                   scenes.get(iso_for_indicators))
            entry["personas"] = {pid: {"tax": None if b["tax"] is None else {cz: [{k: r[k] for k in ("id", "name", "type", "duration", "cost", "scores", "verification") if k in r}
                                                                                   for r in rows] for cz, rows in b["tax"].items()},
                                       "nontax": b["nontax"], "visa": b["visa"], "household_cost": b["household_cost"],
                                       "leftover": b["leftover"] and {cz: v["score"] for cz, v in b["leftover"].items()},
                                       "income_eur": b["income_eur"],
                                       "salary_multiplier": b["salary_multiplier"] and b["salary_multiplier"]["multiplier"],
                                       "ko": b["ko"], "verification": b["verification"], "default": b["default"],
                                       "researched": iso_for_indicators in income}
                                 for pid, b in blocks.items()}
            profiles_extra[jid] = {"persona_detail": blocks,
                                   "income": json.loads(income[iso_for_indicators].model_dump_json()) if iso_for_indicators in income else None,
                                   "income_rules": income_rules.get(iso_for_indicators)}

        if j is None:
            indicators = ind.get(iso_for_indicators, {})
            ko = scoring.knockouts(indicators, iso_for_indicators, cfg)
            nontax = scoring.nontax_scores(indicators, {"household_cost": None, "cost_best": cfg["household_cost"]["best_eur"], "cost_worst": cfg["household_cost"]["worst_eur"]}, cfg)
            entry.update({"tax": None, "nontax": {m: v["score"] for m, v in nontax.items()}, "ko": ko})
            entry["default"] = summarize({"tax": None, "nontax": nontax, "verification": None, "ko": ko}, cfg)
            personas(indicators, nontax, ko)
            out_j[jid] = entry
            profiles[jid] = {"id": jid, **entry, "nontax_detail": nontax, "indicators": indicators, **profiles_extra.pop(jid)}
            return
        s = score_jurisdiction(jid, iso_for_indicators, j, ind.get(iso_for_indicators, {}), cfg, fx, plr_ref, ind)
        entry.update({
            "currency": j.currency,
            "tax": {cz: [{k: r[k] for k in ("id", "name", "type", "duration", "cost", "activity", "structure", "scores")} for r in rows] for cz, rows in s["tax"].items()},
            "nontax": {m: v["score"] for m, v in s["nontax"].items()},
            "verification": s["verification"],
            "household_cost": s["household_cost"]["total_eur"] if s["household_cost"] else None,
            "flags": {**flags(j), "us_treaty": scoring.has_us_treaty(iso_for_indicators, cfg)},
            "markers": [m.model_dump() for m in j.markers],
        })
        entry["ko"] = scoring.knockouts(s["indicators"], iso_for_indicators, cfg)
        red = cfg.get("red_flags", {}).get("countries", {}).get(iso_for_indicators)
        if red:
            entry["red_flag"] = red
        entry["default"] = summarize({**s, "nontax": s["nontax"], "ko": entry["ko"]}, cfg)
        personas(s["indicators"], s["nontax"], entry["ko"])
        out_j[jid] = entry
        profiles[jid] = {
            "id": jid, **entry, "data": json.loads(j.model_dump_json()), "tax_detail": s["tax"],
            "nontax_detail": s["nontax"], "indicators": s["indicators"], "household_cost_detail": s["household_cost"],
            "rules": s["compiled"], **profiles_extra.pop(jid),
        }
        if not inherited:
            sources.extend(source_rows(jid, j))

    for f in world:
        p = f["properties"]
        jid = p["id"]
        j = jur.get(jid)
        continent = j.continent if j else p["continent"]
        region = j.region if j else p["subregion"]
        add(jid, j.name if j else p["name"], "country", None, continent, region, j, jid, lx=p["lx"], ly=p["ly"])

    for f in regions:
        p = f["properties"]
        parent_id = p["parent"]
        parent = jur.get(parent_id)
        sub = subs.get(parent_id)
        unit = next((u for u in sub.units if u.code == p["id"]), None) if sub else None
        if parent is None:
            add(p["id"], p["name"], "region", parent_id, out_j[parent_id]["continent"], out_j[parent_id]["region"], None, parent_id)
            continue
        if unit is not None:
            merged = merge_unit(parent, unit)
            add(p["id"], unit.name, "region", parent_id, parent.continent, parent.region, merged, parent_id)
            if unit.cost_of_living is None and parent.cost_of_living is not None:
                for target in (out_j[p["id"]], profiles[p["id"]]):
                    target["cost_from_parent"] = parent.cost_of_living.city
            sources.extend(source_rows(p["id"], merged, only_unit=unit))
        elif p["id"] == "AE-NZ":
            add(p["id"], p["name"], "region", parent_id, parent.continent, parent.region, None, "---")
        else:
            inherited = parent.model_copy(update={"name": p["name"], "markers": []})
            add(p["id"], p["name"], "region", parent_id, parent.continent, parent.region, inherited, parent_id, inherited=True)
            if parent.cost_of_living is not None:
                for target in (out_j[p["id"]], profiles[p["id"]]):
                    target["cost_from_parent"] = parent.cost_of_living.city

    for k, f in income.items():
        sources.extend(income_source_rows(k, f))

    if subs:
        orphan = {u.code for s in subs.values() for u in s.units} - {f["properties"]["id"] for f in regions}
        if orphan:
            raise SystemExit(f"subnational units without a boundary feature: {sorted(orphan)}")

    write(cfg, fx, out_j, profiles, sources)


def flags(j: Jurisdiction) -> dict:
    """Facts used by the ranking filters, taken from the standard regime."""
    std = j.regimes[0]
    return {
        "wealth_tax_type": std.wealth_tax.type,
        "inheritance_children": std.inheritance.children_treatment,
        "special_regimes": [r.id for r in j.regimes[1:] if r.type == "special"],
        "structures": [r.id for r in j.regimes if r.type == "structure"],
        "cit_rate": j.corporate.cit_rate,
        "pro_forma": [m for m in scoring.TAX_METRICS if getattr(std, m).basis == "pro_forma_draft"],
    }


def source_rows(jid: str, j: Jurisdiction, only_unit=None) -> list[dict]:
    rows = []
    for r in j.regimes:
        if only_unit is not None and r.id not in only_unit.regime_overrides:
            continue
        for m in scoring.TAX_METRICS:
            metric = getattr(r, m)
            if metric is None or (only_unit is not None and getattr(only_unit.regime_overrides[r.id], m) is None):
                continue
            for s in metric.sources:
                rows.append({"jurisdiction": jid, "regime": r.id, "metric": m, "title": s.title, "url": str(s.url),
                             "publisher": s.publisher, "kind": s.kind, "tax_year": metric.tax_year,
                             "verified_on": metric.verified_on.isoformat(), "confidence": metric.confidence,
                             "verification": metric.verification, "basis": metric.basis})
    return rows


def income_source_rows(jid: str, f: IncomeFile) -> list[dict]:
    it = f.income_tax
    rows = [{"jurisdiction": jid, "regime": "standard", "metric": "income_tax", "title": s.title, "url": str(s.url),
             "publisher": s.publisher, "kind": s.kind, "tax_year": it.tax_year, "verified_on": it.verified_on.isoformat(),
             "confidence": it.confidence, "verification": it.verification, "basis": "enacted"} for s in it.sources]
    for r in f.regimes:
        rows += [{"jurisdiction": jid, "regime": r.id, "metric": "income_tax", "title": s.title, "url": str(s.url),
                  "publisher": s.publisher, "kind": s.kind, "tax_year": it.tax_year, "verified_on": f.researched_on.isoformat(),
                  "confidence": r.confidence, "verification": r.verification, "basis": "enacted"} for s in r.sources]
    return rows


def write(cfg: dict, fx: dict, out_j: dict, profiles: dict, sources: list[dict]) -> None:
    WEB.mkdir(parents=True, exist_ok=True)
    manifest = json.loads((DATA / "indicators" / "manifest.json").read_text())
    meta = {"built": dt.date.today().isoformat(), "fx_date": fx["date"], "fx_usd_per_eur": fx["rates"]["USD"]["per_eur"], "config": cfg, "indicators": manifest,
            "citizenships": list(CITIZENSHIPS)}
    dump(WEB / "scores.json", {"meta": meta, "jurisdictions": out_j})
    pdir = WEB / "profiles"
    if pdir.exists():
        shutil.rmtree(pdir)
    pdir.mkdir()
    for jid, p in profiles.items():
        dump(pdir / f"{jid}.json", p)
    dump(WEB / "sources.json", {"tax": sources, "indicators": manifest, "fx": fx})
    ddir = WEB / "dossiers"
    if ddir.exists():
        shutil.rmtree(ddir)
    ddir.mkdir()
    for md in sorted((ROOT / "docs" / "jurisdictions").glob("*.md")):
        shutil.copy(md, ddir / md.name)
    (ddir / "income").mkdir()
    for md in sorted((ROOT / "docs" / "income").glob("*.md")):
        shutil.copy(md, ddir / "income" / md.name)
    researched = sum(1 for e in out_j.values() if e["researched"] and not e["inherited"])
    scored = sum(1 for e in out_j.values() if e["default"]["score"] is not None)
    ko = sum(1 for e in out_j.values() if e.get("ko"))
    print(f"{len(out_j)} map units, {researched} researched, {scored} scored, {ko} knocked out (EU, default weights), {len(sources)} tax sources")


def dump(path: Path, obj) -> None:
    path.write_text(json.dumps(obj, ensure_ascii=False, separators=(",", ":"), allow_nan=False))


if __name__ == "__main__":
    main()
