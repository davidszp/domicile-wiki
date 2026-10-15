import json
from functools import cache
from pathlib import Path

import pytest
from shapely.geometry import shape

ROOT = Path(__file__).resolve().parent.parent
WEB = ROOT / "web" / "data"
BUILD = ROOT / "data" / "build"


@cache
def countries() -> dict:
    feats = json.loads((BUILD / "countries.geojson").read_text())["features"]
    return {f["properties"]["id"]: f for f in feats}


@cache
def regions() -> dict:
    feats = json.loads((BUILD / "regions.geojson").read_text())["features"]
    return {f["properties"]["id"]: f for f in feats}


@cache
def geom(fid: str):
    f = countries().get(fid) or regions().get(fid)
    if f is None:
        raise KeyError(fid)
    g = shape(f["geometry"])
    return g if g.is_valid else g.buffer(0)


@cache
def scores() -> dict:
    return json.loads((WEB / "scores.json").read_text())


@cache
def views() -> dict:
    return json.loads((WEB / "views.json").read_text())


def decode_topojson(path: Path, obj: str) -> list[dict]:
    """Minimal TopoJSON -> GeoJSON features (quantized, delta-encoded arcs)."""
    topo = json.loads(path.read_text())
    sx, sy = topo["transform"]["scale"]
    tx, ty = topo["transform"]["translate"]
    arcs = []
    for arc in topo["arcs"]:
        x = y = 0
        pts = []
        for dx, dy in arc:
            x += dx
            y += dy
            pts.append((x * sx + tx, y * sy + ty))
        arcs.append(pts)

    def ring(idx: list[int]) -> list:
        out = []
        for i in idx:
            pts = arcs[i] if i >= 0 else arcs[~i][::-1]
            out.extend(pts if not out else pts[1:])
        return out

    feats = []
    for g in topo["objects"][obj]["geometries"]:
        if g["type"] == "Polygon":
            geometry = {"type": "Polygon", "coordinates": [ring(r) for r in g["arcs"]]}
        elif g["type"] == "MultiPolygon":
            geometry = {"type": "MultiPolygon", "coordinates": [[ring(r) for r in p] for p in g["arcs"]]}
        else:
            geometry = None
        feats.append({"properties": g.get("properties", {}), "geometry": geometry})
    return feats


@pytest.fixture(scope="session")
def scores_data():
    return scores()
