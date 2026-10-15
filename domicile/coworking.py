"""Count coworking spaces around each country's digital-nomad hub from OpenStreetMap:
``python -m domicile.coworking``.

For every candidate city the centre is geocoded with Nominatim, then the ohsome API (HeiGIT, a statistics
service over OpenStreetMap history) counts objects tagged ``amenity=coworking_space`` or ``office=coworking``
within ``RADIUS_M`` of it, at its latest data date. The city with the
most spaces is kept per country and written to ``data/indicators/nomad_scene/coworking.csv``.
OpenStreetMap coverage is crowd-sourced and uneven, so this is one input to the scene score, not
a census. Both services are queried slowly to respect their usage policies.
"""

from __future__ import annotations

import csv
import datetime as dt
import json
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "indicators" / "nomad_scene" / "coworking.csv"
UA = "domicile-research/0.1 (https://www.openstreetmap.org/copyright)"
RADIUS_M = 15000
CACHE = ROOT / "data" / "build" / "coworking_cache.json"  # geocoded city centres

# Candidate cities: the country's best-placed city in the nomad lists and its main city.
CANDIDATES = {
    "ALB": ["Tirana"], "AND": ["Andorra la Vella"], "ARE": ["Dubai"], "ARG": ["Buenos Aires"], "ATG": ["St. John's, Antigua"],
    "AUS": ["Sydney"], "AUT": ["Vienna"], "BEL": ["Brussels"], "BGR": ["Bansko", "Sofia"], "BHR": ["Manama"],
    "BHS": ["Nassau, Bahamas"], "BRA": ["Brasilia", "Sao Paulo"], "BRB": ["Bridgetown"], "CAN": ["Vancouver", "Toronto"],
    "CHE": ["Zurich"], "CHL": ["Santiago, Chile"], "COL": ["Medellin"], "CRI": ["Tamarindo", "San Jose, Costa Rica"],
    "CYM": ["George Town, Cayman Islands"], "CYP": ["Nicosia", "Limassol", "Larnaca"], "CZE": ["Prague"], "DEU": ["Berlin"],
    "DMA": ["Roseau"], "DNK": ["Copenhagen"], "DOM": ["Santo Domingo"], "ESP": ["Malaga", "Madrid", "Barcelona"],
    "EST": ["Tallinn"], "FIN": ["Helsinki"], "FRA": ["Paris"], "GBR": ["London"], "GEO": ["Tbilisi"], "GRC": ["Athens"],
    "GRD": ["St. George's, Grenada"], "HKG": ["Hong Kong"], "HRV": ["Zagreb", "Split"], "HUN": ["Budapest"],
    "IDN": ["Canggu, Bali"], "IRL": ["Dublin"], "ISL": ["Reykjavik"], "ITA": ["Milan"], "JPN": ["Tokyo"],
    "KNA": ["Basseterre"], "KOR": ["Seoul"], "LCA": ["Castries"], "LTU": ["Vilnius"], "LUX": ["Luxembourg, Luxembourg"],
    "LVA": ["Riga"], "MAR": ["Casablanca", "Marrakesh"], "MEX": ["Mexico City", "Playa del Carmen"], "MKD": ["Skopje"],
    "MLT": ["Sliema"], "MNE": ["Podgorica", "Budva"], "MUS": ["Port Louis", "Grand Baie"], "MYS": ["Kuala Lumpur"],
    "NLD": ["Amsterdam", "Rotterdam"], "NOR": ["Oslo"], "NZL": ["Auckland"], "OMN": ["Muscat"], "PAN": ["Panama City"],
    "PHL": ["Makati"], "POL": ["Warsaw"], "PRI": ["San Juan, Puerto Rico"], "PRT": ["Lisbon"], "QAT": ["Doha"],
    "ROU": ["Bucharest"], "SAU": ["Riyadh"], "SGP": ["Singapore"], "SRB": ["Belgrade"], "SVK": ["Bratislava"],
    "SVN": ["Ljubljana"], "SWE": ["Stockholm"], "THA": ["Bangkok", "Chiang Mai"], "TUR": ["Istanbul"], "TWN": ["Taipei"],
    "URY": ["Montevideo"], "USA": ["Miami", "New York City"], "VNM": ["Da Nang", "Ho Chi Minh City"], "ZAF": ["Cape Town"],
}


def _get(url: str, data: bytes | None = None) -> dict | list:
    req = urllib.request.Request(url, data=data, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.loads(r.read())


def geocode(city: str) -> tuple[float, float] | None:
    q = urllib.parse.urlencode({"q": city, "format": "json", "limit": 1})
    res = _get(f"https://nominatim.openstreetmap.org/search?{q}")
    time.sleep(1.1)  # Nominatim: at most one request a second
    return (float(res[0]["lat"]), float(res[0]["lon"])) if res else None


OHSOME = "https://api.ohsome.org/v1/elements/count/groupBy/boundary"
FILTER = "amenity=coworking_space or office=coworking"


def latest_ohsome_time() -> str:
    meta = _get("https://api.ohsome.org/v1/metadata")
    return meta["extractRegion"]["temporalExtent"]["toTimestamp"][:10]


def count_one(lat: float, lon: float, when: str) -> int:
    body = urllib.parse.urlencode({"bcircles": f"c:{lon},{lat},{RADIUS_M}", "filter": FILTER, "time": when}).encode()
    for attempt in range(4):
        try:
            res = _get(OHSOME, body)
            return int(res["groupByResult"][0]["result"][0]["value"])
        except Exception:  # slow or busy server: back off and retry
            time.sleep(20 * (attempt + 1))
    raise RuntimeError("ohsome API failed")


def counts(points: dict[str, tuple[float, float]], when: str, cache: dict) -> dict[str, int]:
    """Coworking spaces within RADIUS_M of each point, from the ohsome API (HeiGIT); one city per request,
    three at a time, each result cached so a rerun only fetches what is missing."""
    from concurrent.futures import ThreadPoolExecutor, as_completed

    todo = [c for c in points if cache.get(c, {}).get("ohsome", {}).get("time") != when]
    with ThreadPoolExecutor(max_workers=3) as ex:
        futs = {ex.submit(count_one, *points[c], when): c for c in todo}
        for f in as_completed(futs):
            c = futs[f]
            try:
                cache[c]["ohsome"] = {"time": when, "n": f.result()}
                CACHE.write_text(json.dumps(cache))
                print(f"{c}: {cache[c]['ohsome']['n']}", flush=True)
            except RuntimeError as e:
                print(f"{c}: {e}; rerun to retry", flush=True)
    return {c: cache[c]["ohsome"]["n"] for c in points if cache.get(c, {}).get("ohsome", {}).get("time") == when}


def main() -> None:
    cache = json.loads(CACHE.read_text()) if CACHE.exists() else {}
    points = {}
    for cities in CANDIDATES.values():
        for city in cities:
            if city not in cache:
                ll = geocode(city)
                if ll is None:
                    print(f"could not geocode {city}")
                    continue
                cache[city] = {"ll": ll}
                CACHE.parent.mkdir(parents=True, exist_ok=True)
                CACHE.write_text(json.dumps(cache))
            points[city] = tuple(cache[city]["ll"])
    when = latest_ohsome_time()
    n = counts(points, when, cache)
    rows = []
    for iso, cities in CANDIDATES.items():
        found = [(c, n[c]) for c in cities if c in n]
        if not found:
            continue
        city, spaces = max(found, key=lambda x: x[1])
        rows.append({"iso3": iso, "city": city, "spaces": spaces, "lat": round(points[city][0], 4), "lon": round(points[city][1], 4),
                     "directory": f"OpenStreetMap via ohsome API, {when} (amenity=coworking_space or office=coworking within {RADIUS_M // 1000} km)",
                     "url": "https://api.ohsome.org/", "accessed": dt.date.today().isoformat()})
        print(f"{iso} {city}: {spaces}", flush=True)
    with OUT.open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["iso3", "city", "spaces", "lat", "lon", "directory", "url", "accessed"])
        w.writeheader()
        w.writerows(rows)
    print(f"{len(rows)} countries written to {OUT} (OpenStreetMap as of {when})")


if __name__ == "__main__":
    main()
