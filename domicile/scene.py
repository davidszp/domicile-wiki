"""Digital nomad scene score for the Digital nomad persona.

Sources live in ``data/indicators/nomad_scene/``:

- ``lists.json`` + ``list_entries.csv``: published rankings of the best places for digital nomads
  (several publishers, 2024-2026). Per list, a country earns 0.5 for being named at all plus up to
  0.5 for its best city's rank (first = 0.5, last = 0); an unranked list counts 0.75. The list
  component is the mean over all lists, so a country absent from every list scores 0.
- ``coworking.csv`` (optional, from ``python -m domicile.coworking``): OpenStreetMap coworking spaces
  around the country's busiest candidate hub; would be scored on a log scale between ``COWORK_LO`` (0)
  and ``COWORK_HI`` (100), but is currently shown for reference only.

Score = the list component. Coworking counts are loaded and shown but not scored (see LIST_WEIGHT).
"""

from __future__ import annotations

import csv
import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIR = ROOT / "data" / "indicators" / "nomad_scene"
COWORK_LO, COWORK_HI = 5, 300
# OpenStreetMap coworking coverage turned out to track local mapping activity more than the market
# (2026-10-15: Paris 204 and Berlin 143, but Dubai 4, Hong Kong 4, Canggu 9), so it is kept for
# reference only and the score uses the published lists alone. Set below 1.0 to blend it back in.
LIST_WEIGHT = 1.0


def load(path: Path = DIR) -> dict:
    lists = json.loads((path / "lists.json").read_text()) if (path / "lists.json").exists() else []
    entries = []
    if (path / "list_entries.csv").exists():
        with (path / "list_entries.csv").open() as f:
            entries = list(csv.DictReader(f))
    cowork = {}
    if (path / "coworking.csv").exists():
        with (path / "coworking.csv").open() as f:
            cowork = {r["iso3"]: r for r in csv.DictReader(f) if r["spaces"].strip()}
    return {"lists": lists, "entries": entries, "coworking": cowork}


def scores(data: dict, countries: list[str]) -> dict[str, dict]:
    lists = {l["id"]: l for l in data["lists"]}
    if not lists:
        return {}
    best: dict[tuple[str, str], dict] = {}
    for e in data["entries"]:
        lst = lists.get(e["list_id"])
        if lst is None:
            continue
        rank = int(e["rank"]) if e["rank"].strip() else None
        pts = 0.75 if not lst["ranked"] or rank is None else 0.5 + 0.5 * (1 - (rank - 1) / max(1, lst["length"] - 1))
        key = (e["iso3"], e["list_id"])
        if key not in best or pts > best[key]["points"]:
            best[key] = {"points": pts, "city": e["city"], "rank": rank}
    out = {}
    for c in countries:
        named = {lid: best[(c, lid)] for lid in lists if (c, lid) in best}
        list_score = 100 * sum(v["points"] for v in named.values()) / len(lists)
        cw = data["coworking"].get(c)
        cw_score = None
        if cw:
            n = float(cw["spaces"])
            cw_score = 100 * max(0.0, min(1.0, (math.log10(max(n, 1)) - math.log10(COWORK_LO)) / (math.log10(COWORK_HI) - math.log10(COWORK_LO))))
        score = list_score if cw_score is None or LIST_WEIGHT >= 1 else LIST_WEIGHT * list_score + (1 - LIST_WEIGHT) * cw_score
        out[c] = {"score": round(score, 2), "lists_named": len(named), "lists_total": len(lists),
                  "list_score": round(list_score, 2), "coworking_score": None if cw_score is None else round(cw_score, 2),
                  "hub": max(named.values(), key=lambda v: v["points"])["city"] if named else None,
                  "coworking_osm": {"city": cw["city"], "spaces": int(float(cw["spaces"]))} if cw else None,
                  "named_in": {lid: {"city": v["city"], "rank": v["rank"], "title": lists[lid].get("title", lid),
                                     "length": lists[lid].get("length")} for lid, v in named.items()}}
    return out
