"""Geographic correctness, tested against real boundaries rather than eyeballed."""

import json

import pytest
from shapely.geometry import Point, box, shape
from shapely.validation import explain_validity

from conftest import ROOT, WEB, countries, decode_topojson, geom, regions, scores, views

KM = 1 / 111.0  # degrees of latitude per km (good enough for small tolerances)

# Reference coordinates (lon, lat) from GeoNames, independent of the researched data files.
REFERENCE_POINTS = {
    # Swiss cities must be in Switzerland, and in the right canton.
    "Zurich": (8.5417, 47.3769, "CHE", "CH-ZH"),
    "Geneva": (6.1432, 46.2044, "CHE", "CH-GE"),
    "Zug": (8.5156, 47.1662, "CHE", "CH-ZG"),
    "Lugano": (8.9511, 46.0101, "CHE", "CH-TI"),
    "Bern": (7.4474, 46.9481, "CHE", "CH-BE"),
    # Cyprus, eastern Mediterranean.
    "Limassol": (33.0413, 34.6841, "CYP", None),
    "Larnaca": (33.6232, 34.9229, "CYP", None),
    # UAE emirates.
    "Dubai": (55.2708, 25.2048, "ARE", "AE-DU"),
    "Abu Dhabi": (54.3773, 24.4539, "ARE", "AE-AZ"),
    "Sharjah": (55.4033, 25.3463, "ARE", "AE-SH"),
    "Ras Al Khaimah": (55.9432, 25.7895, "ARE", "AE-RK"),
    # Caribbean capitals.
    "Nassau": (-77.3554, 25.0480, "BHS", None),
    "George Town (Cayman)": (-81.3857, 19.2869, "CYM", None),
    "Hamilton": (-64.7813, 32.2948, "BMU", None),
    "Cockburn Town": (-71.1389, 21.4612, "TCA", None),
    "Bridgetown": (-59.6167, 13.1000, "BRB", None),
    "St John's": (-61.8456, 17.1210, "ATG", None),
    "Basseterre": (-62.7177, 17.2948, "KNA", None),
    "Roseau": (-61.3870, 15.3017, "DMA", None),
    "St George's": (-61.7486, 12.0561, "GRD", None),
    "Castries": (-60.9875, 14.0101, "LCA", None),
    "Road Town": (-64.6208, 18.4270, "VGB", None),
    "Kingstown": (-61.2248, 13.1600, "VCT", None),
    "The Valley": (-63.0578, 18.2170, "AIA", None),
    "San Juan": (-66.1057, 18.4655, "PRI", None),
    "Willemstad": (-68.9335, 12.1084, "CUW", None),
    "Oranjestad": (-70.0270, 12.5240, "ABW", None),
    # Small European states.
    "Monaco": (7.4246, 43.7384, "MCO", None),
    "Andorra la Vella": (1.5218, 42.5063, "AND", None),
    "Vaduz": (9.5209, 47.1410, "LIE", None),
    "Valletta": (14.5146, 35.8989, "MLT", None),
    "Luxembourg": (6.1296, 49.6116, "LUX", None),
    "San Marino": (12.4467, 43.9356, "SMR", None),
    "Douglas": (-4.4790, 54.1500, "IMN", None),
    "St Helier": (-2.1049, 49.1880, "JEY", None),
    "St Peter Port": (-2.5369, 49.4552, "GGY", None),
    "Gibraltar": (-5.3536, 36.1408, "GIB", None),
}


def near(fid: str, lon: float, lat: float, km: float) -> bool:
    return geom(fid).distance(Point(lon, lat)) <= km * KM


@pytest.mark.parametrize("name", sorted(REFERENCE_POINTS))
def test_reference_points_fall_in_their_jurisdiction(name):
    lon, lat, country, region = REFERENCE_POINTS[name]
    assert near(country, lon, lat, 2), f"{name} is not in {country}"
    if region:
        assert near(region, lon, lat, 2), f"{name} is not in {region}"
    # And not in any *other* country (no marker silently referencing a neighbour).
    others = [cid for cid in countries() if cid != country and geom(cid).contains(Point(lon, lat))]
    assert not others, f"{name} also falls inside {others}"


def test_cyprus_is_in_the_eastern_mediterranean():
    c = geom("CYP").centroid
    assert 32.0 < c.x < 34.7 and 34.4 < c.y < 35.8
    assert geom("CHE").centroid.x < c.x  # Switzerland lies west of Cyprus...
    assert geom("CHE").centroid.y > c.y + 10  # ...and well north of it


def test_switzerland_is_in_central_europe():
    c = geom("CHE").centroid
    assert 6.0 < c.x < 10.5 and 45.8 < c.y < 47.8
    for neighbour in ("DEU", "FRA", "ITA", "AUT", "LIE"):
        assert geom("CHE").distance(geom(neighbour)) < 0.01, f"Switzerland should border {neighbour}"


def test_dubai_and_abu_dhabi_are_in_the_uae_not_beside_cyprus():
    for emirate in ("AE-DU", "AE-AZ"):
        assert geom("ARE").buffer(0.01).contains(geom(emirate).representative_point())
        assert geom(emirate).distance(geom("CYP")) > 15  # > ~1,600 km


def test_all_source_geometries_valid_after_repair():
    bad = []
    for fid, f in {**countries(), **regions()}.items():
        g = shape(f["geometry"]) if f["geometry"] else None
        if g is None or g.is_empty:
            bad.append((fid, "empty"))
        elif not g.is_valid and not g.buffer(0).is_valid:
            bad.append((fid, explain_validity(g)))
    assert not bad, bad


@pytest.mark.parametrize("topo,obj", [("world.topo.json", "countries"), ("detail.topo.json", "countries"), ("regions.topo.json", "regions")])
def test_web_topologies_are_valid_and_complete(topo, obj):
    feats = decode_topojson(WEB / topo, obj)
    ids = [f["properties"]["id"] for f in feats]
    assert len(ids) == len(set(ids)), "duplicate ids in topology"
    expected = set(countries()) if obj == "countries" else set(regions())
    assert set(ids) == expected
    invalid = []
    for f in feats:
        g = shape(f["geometry"])
        if g.is_empty:
            invalid.append((f["properties"]["id"], "empty"))
        elif not g.is_valid and g.buffer(0).area < 0.98 * abs(g.area):
            invalid.append((f["properties"]["id"], explain_validity(g)))
    assert not invalid, invalid


def test_simplified_borders_stay_close_to_the_source():
    feats = {f["properties"]["id"]: f for f in decode_topojson(WEB / "detail.topo.json", "countries")}
    for fid in ("CHE", "CYP", "ARE", "MLT", "LUX", "AND", "MCO", "BRB"):
        simp = shape(feats[fid]["geometry"]).buffer(0)
        assert simp.centroid.distance(geom(fid).centroid) < 0.05, fid
        assert abs(simp.area - geom(fid).area) / geom(fid).area < 0.12, fid


def test_label_points_lie_inside_their_feature():
    data = scores()["jurisdictions"]
    wrong = []
    for fid, f in countries().items():
        p = f["properties"]
        important = data.get(fid, {}).get("researched") or fid in {i for v in views().values() for i in v.get("must_include", [])}
        if important and not near(fid, p["lx"], p["ly"], 3):
            wrong.append(fid)
    assert not wrong, f"label points outside their feature: {wrong}"


def test_scored_ids_match_boundaries():
    data = scores()["jurisdictions"]
    feature_ids = set(countries()) | set(regions())
    assert set(data) == feature_ids
    for p in (ROOT / "data" / "jurisdictions").glob("*.json"):
        assert p.stem in countries(), f"{p.stem} has no boundary"
    for p in (ROOT / "data" / "subnational").glob("*.json"):
        for u in json.loads(p.read_text())["units"]:
            assert u["code"] in regions(), f"{u['code']} has no boundary"
            assert regions()[u["code"]]["properties"]["parent"] == p.stem


def test_every_researched_marker_is_inside_its_jurisdiction():
    """Markers from the research files must fall in (or within 5 km of) the jurisdiction they belong to."""
    data = scores()["jurisdictions"]
    wrong = []
    for jid, e in data.items():
        for m in e.get("markers") or []:
            if not near(jid, m["lon"], m["lat"], 5):
                wrong.append(f"{jid}: {m['name']} ({m['lon']}, {m['lat']})")
    assert not wrong, "markers outside their jurisdiction:\n" + "\n".join(wrong)


def test_views_contain_what_they_promise():
    vs = views()
    for vid, v in vs.items():
        for fid in v.get("must_include", []):
            assert fid in countries(), f"{vid}: unknown id {fid}"
            if v.get("bbox"):
                p = countries()[fid]["properties"]
                x0, y0, x1, y1 = v["bbox"]
                assert x0 <= p["lx"] <= x1 and y0 <= p["ly"] <= y1, f"{fid} label point outside the {vid} view"
        for rid in v.get("must_include_regions", []):
            assert rid in regions() and regions()[rid]["properties"]["parent"] in v["regions"], f"{vid}: {rid}"
        for ins in v.get("insets", []):
            for fid in ins["must_include"]:
                assert box(*ins["bbox"]).intersects(geom(fid)), f"inset {ins['id']} misses {fid}"
                # Bermuda is far outside the main Caribbean frame, which is why it needs an inset.
                assert not box(*v["bbox"]).intersects(geom(fid))


def test_world_hotspots_cover_their_jurisdictions():
    vs = views()
    eu = box(*vs["europe"]["bbox"])
    for fid in ("CYP", "MLT", "ISL", "CHE", "PRT", "FIN"):
        assert eu.intersects(geom(fid)), fid
    assert box(*vs["uae"]["bbox"]).contains(geom("AE-DU").representative_point())
    assert not box(*vs["uae"]["bbox"]).intersects(geom("CYP"))
