"""Build web-ready boundary files from Natural Earth 1:10m data.

Outputs
- ``web/data/world.topo.json``: one object ``countries`` with every Natural Earth admin-0 unit,
  keyed by ``id`` (ISO 3166-1 alpha-3 where one exists, see ``ID_FIXES``).
- ``web/data/regions.topo.json``: subnational units for the jurisdictions where regional tax rules
  matter, keyed by ISO 3166-2 ``id`` with ``parent``.
- ``data/build/*.geojson``: unsimplified copies used by the geographic tests.

Geometry processing is done by mapshaper (pinned in package.json), which simplifies with shared
topology, so neighbouring borders stay gap-free; ``keep-shapes`` stops small islands from vanishing.
"""

from __future__ import annotations

import json
import subprocess
import urllib.request
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "data" / "raw"
BUILD = ROOT / "data" / "build"
WEB_DATA = ROOT / "web" / "data"

NE_BASE = "https://naturalearth.s3.amazonaws.com/10m_cultural/"
NE_LAYERS = ["ne_10m_admin_0_countries", "ne_10m_admin_1_states_provinces"]

# Natural Earth ADM0_A3 codes that differ from ISO 3166-1 alpha-3 (or the code used in our data).
ID_FIXES = {"SDS": "SSD", "PSX": "PSE", "SAH": "ESH", "KOS": "XKX", "ALD": "ALA"}

# Countries with subnational views; ITA/ESP provinces are dissolved into regions/communities.
REGION_COUNTRIES = ["CHE", "ESP", "ITA", "ARE", "USA"]

# Natural Earth "region" names for Spanish autonomous communities -> ISO 3166-2 codes.
ESP_REGION_ISO = {
    "Andalucía": "ES-AN", "Aragón": "ES-AR", "Asturias": "ES-AS", "Islas Baleares": "ES-IB",
    "Canary Is.": "ES-CN", "Cantabria": "ES-CB", "Castilla y León": "ES-CL", "Castilla-La Mancha": "ES-CM",
    "Cataluña": "ES-CT", "Extremadura": "ES-EX", "Galicia": "ES-GA", "Madrid": "ES-MD", "Murcia": "ES-MC",
    "Foral de Navarra": "ES-NC", "País Vasco": "ES-PV", "La Rioja": "ES-RI", "Valenciana": "ES-VC",
    "Ceuta": "ES-CE", "Melilla": "ES-ML",
}
REGION_NAMES = {
    "ES-AN": "Andalusia", "ES-AR": "Aragon", "ES-AS": "Asturias", "ES-IB": "Balearic Islands",
    "ES-CN": "Canary Islands", "ES-CB": "Cantabria", "ES-CL": "Castile and León", "ES-CM": "Castilla-La Mancha",
    "ES-CT": "Catalonia", "ES-EX": "Extremadura", "ES-GA": "Galicia", "ES-MD": "Community of Madrid",
    "ES-MC": "Region of Murcia", "ES-NC": "Navarre", "ES-PV": "Basque Country", "ES-RI": "La Rioja",
    "ES-VC": "Valencian Community", "ES-CE": "Ceuta", "ES-ML": "Melilla",
    "IT-21": "Piedmont", "IT-23": "Aosta Valley", "IT-25": "Lombardy", "IT-32": "Trentino-South Tyrol",
    "IT-34": "Veneto", "IT-36": "Friuli-Venezia Giulia", "IT-42": "Liguria", "IT-45": "Emilia-Romagna",
    "IT-52": "Tuscany", "IT-55": "Umbria", "IT-57": "Marche", "IT-62": "Lazio", "IT-65": "Abruzzo",
    "IT-67": "Molise", "IT-72": "Campania", "IT-75": "Apulia", "IT-77": "Basilicata", "IT-78": "Calabria",
    "IT-82": "Sicily", "IT-88": "Sardinia",
    "AE-AZ": "Abu Dhabi", "AE-DU": "Dubai", "AE-SH": "Sharjah", "AE-AJ": "Ajman",
    "AE-UQ": "Umm Al Quwain", "AE-RK": "Ras Al Khaimah", "AE-FU": "Fujairah",
}


def mapshaper(*args: str) -> None:
    cmd = ["npx", "--no-install", "mapshaper", *args]
    subprocess.run(cmd, check=True, cwd=ROOT)


def download() -> None:
    RAW.mkdir(parents=True, exist_ok=True)
    for layer in NE_LAYERS:
        shp = RAW / layer / f"{layer}.shp"
        if shp.exists():
            continue
        zpath = RAW / f"{layer}.zip"
        if not zpath.exists():
            print(f"downloading {layer}")
            urllib.request.urlretrieve(f"{NE_BASE}{layer}.zip", zpath)
        with zipfile.ZipFile(zpath) as z:
            z.extractall(RAW / layer)


def _js_map(d: dict[str, str]) -> str:
    return json.dumps(d, ensure_ascii=False)


def build_countries() -> None:
    src = RAW / "ne_10m_admin_0_countries" / "ne_10m_admin_0_countries.shp"
    fix = _js_map(ID_FIXES)
    each = (
        f"var F={fix}; id = F[ADM0_A3] || ADM0_A3; name = NAME_EN || ADMIN; "
        "iso2 = ISO_A2_EH; ne_type = TYPE; sovereign = SOVEREIGNT; continent = CONTINENT; subregion = SUBREGION; "
        "lx = Math.round(LABEL_X*1e4)/1e4; ly = Math.round(LABEL_Y*1e4)/1e4"
    )
    fields = "id,iso2,name,ne_type,sovereign,continent,subregion,lx,ly"
    BUILD.mkdir(parents=True, exist_ok=True)
    mapshaper(src.as_posix(), "-each", each, "-filter-fields", fields,
              "-o", (BUILD / "countries.geojson").as_posix(), "precision=0.000001", "force")
    WEB_DATA.mkdir(parents=True, exist_ok=True)
    # Coarse file for the world view, finer one (lazy-loaded) for the regional close-ups.
    # Units under 3,000 km² (Monaco, Andorra, Malta, small islands) keep much more detail, so
    # they keep their true shape and area; the test suite checks this.
    fix_label_points(BUILD / "countries.geojson")
    # The detail file needs a ~130 m grid (quantization 3e5) or the Vatican collapses to nothing.
    for out, pct, small, q in (("world.topo.json", 0.06, 0.5, 100_000), ("detail.topo.json", 0.25, 1, 300_000)):
        mapshaper((BUILD / "countries.geojson").as_posix(), "-rename-layers", "countries",
                  "-simplify", "variable", f"percentage=this.area < 3e9 ? {small} : {pct}", "keep-shapes", "-clean",
                  "-o", (WEB_DATA / out).as_posix(), "format=topojson", f"quantization={q}", "force")


def fix_label_points(path: Path) -> None:
    """Natural Earth label points occasionally fall in the sea (e.g. New Zealand, Antigua).
    Replace any label point outside its own feature with the pole of inaccessibility of the
    largest polygon, so markers and labels always sit on the right jurisdiction."""
    from shapely.geometry import Point, shape
    from shapely.ops import polylabel

    data = json.loads(path.read_text())
    fixed = []
    for f in data["features"]:
        p = f["properties"]
        g = shape(f["geometry"])
        g = g if g.is_valid else g.buffer(0)
        if g.distance(Point(p["lx"], p["ly"])) <= 0.001:
            continue
        largest = max(getattr(g, "geoms", [g]), key=lambda x: x.area)
        pt = polylabel(largest, tolerance=0.001)
        p["lx"], p["ly"] = round(pt.x, 4), round(pt.y, 4)
        p["label_point_repaired"] = True
        fixed.append(p["id"])
    path.write_text(json.dumps(data, separators=(",", ":")))
    if fixed:
        print(f"label points moved onto land: {', '.join(sorted(fixed))}")


def build_regions() -> None:
    src = RAW / "ne_10m_admin_1_states_provinces" / "ne_10m_admin_1_states_provinces.shp"
    esp = _js_map(ESP_REGION_ISO)
    names = _js_map(REGION_NAMES)
    countries = json.dumps(REGION_COUNTRIES)
    each = (
        f"var E={esp}, N={names}; parent = adm0_a3; "
        "rid = adm0_a3=='ESP' ? E[region] : adm0_a3=='ITA' ? region_cod : iso_3166_2; "
        "if (adm0_a3=='ARE' && iso_3166_2.indexOf('~')>=0) rid = 'AE-NZ'; "
        "rname = N[rid] || (rid=='AE-NZ' ? 'Neutral zone (shared administration)' : name)"
    )
    BUILD.mkdir(parents=True, exist_ok=True)
    mapshaper(src.as_posix(), "-filter", f"{countries}.includes(adm0_a3)", "-each", each,
              "-dissolve2", "rid", "copy-fields=parent,rname",
              "-each", "id = rid; name = rname; delete rid; delete rname",
              "-o", (BUILD / "regions.geojson").as_posix(), "precision=0.000001", "force")
    mapshaper((BUILD / "regions.geojson").as_posix(), "-rename-layers", "regions",
              "-simplify", "30%", "weighted", "keep-shapes", "-clean",
              "-o", (WEB_DATA / "regions.topo.json").as_posix(), "format=topojson", "quantization=100000", "force")


def main() -> None:
    download()
    build_countries()
    build_regions()
    for p in sorted(WEB_DATA.glob("*.topo.json")):
        print(f"{p.relative_to(ROOT)}: {p.stat().st_size / 1e6:.2f} MB")


if __name__ == "__main__":
    main()
