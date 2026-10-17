"""Fetch non-tax indicators into ``data/indicators/indicators.csv`` (long format).

Run ``python -m domicile.indicators`` to refresh. The CSV is committed so builds are reproducible
offline; ``manifest.json`` records each indicator's definition, source and fetch date. Values older
than ``MAX_AGE_YEARS`` are dropped rather than presented as current.
"""

from __future__ import annotations

import csv
import datetime as dt
import io
import json
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "indicators"
RAW = ROOT / "data" / "raw"
MAX_AGE_YEARS = 10
UA = {"User-Agent": "domicile-data-pipeline/0.1 (research; contact via repository)"}

WB = "https://api.worldbank.org/v2/country/all/indicator/{code}?format=json&mrnev=1&per_page=20000"

WORLD_BANK = {
    "wgi_va": ("GOV_WGI_VA.EST", "Voice and Accountability, WGI estimate (-2.5 to 2.5)"),
    "wgi_pv": ("GOV_WGI_PV.EST", "Political Stability and Absence of Violence/Terrorism, WGI estimate"),
    "wgi_ge": ("GOV_WGI_GE.EST", "Government Effectiveness, WGI estimate"),
    "wgi_rq": ("GOV_WGI_RQ.EST", "Regulatory Quality, WGI estimate"),
    "wgi_rl": ("GOV_WGI_RL.EST", "Rule of Law, WGI estimate"),
    "wgi_cc": ("GOV_WGI_CC.EST", "Control of Corruption, WGI estimate"),
    "homicide_rate": ("VC.IHR.PSRC.P5", "Intentional homicides per 100,000 people (UNODC via World Bank)"),
    "life_expectancy": ("SP.DYN.LE00.IN", "Life expectancy at birth, years"),
    "uhc_index": ("SH_UHC_SCI", "UHC service coverage index (WHO via World Bank), 0-100"),
    "learning_outcomes": ("HD.HCI.HLOS", "Harmonized learning outcomes (Human Capital Index), test-score points"),
    "gdp_pc_ppp": ("NY.GDP.PCAP.PP.KD", "GDP per capita, PPP, constant 2021 international $"),
    "internet_users": ("IT.NET.USER.ZS", "Individuals using the Internet, % of population"),
    "lpi": ("LP.LPI.OVRL.XQ", "Logistics Performance Index, overall (1-5)"),
    "migrant_share": ("SM.POP.TOTL.ZS", "International migrant stock, % of population"),
}
PPP_PRIVATE = "PA.NUS.PRVT.PP"
NAME_FALLBACK = {"Jersey": "JEY", "Guernsey": "GGY", "Anguilla": "AIA", "Cook Islands": "COK", "Niue": "NIU"}
FX = "PA.NUS.FCRF"

HDI_URL = "https://hdr.undp.org/sites/default/files/2025_HDR/HDR25_Composite_indices_complete_time_series.csv"
CPI_URL = "https://images.transparencycdn.org/images/CPI2025_Results.xlsx"
EPI_URL = "https://www.ef.com/wwen/epi/"
ENGLISH_OFFICIAL_URL = "https://en.wikipedia.org/wiki/List_of_countries_and_territories_where_English_is_an_official_language"

# Jurisdictions where English is the main language of daily life (de facto majority language),
# which EF EPI does not rank. Basis: CIA World Factbook "Languages" entries and the Wikipedia list above.
ENGLISH_MAJORITY = [
    "GBR", "IRL", "USA", "CAN", "AUS", "NZL", "IMN", "JEY", "GGY", "GIB", "BMU", "BHS", "CYM", "TCA",
    "VGB", "AIA", "MSR", "ATG", "KNA", "DMA", "GRD", "LCA", "VCT", "BRB", "JAM", "TTO", "BLZ", "GUY",
    "VIR", "FLK", "SHN",
]


def _get(url: str) -> bytes:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=120) as r:
        return r.read()


def _cached(url: str, name: str) -> bytes:
    path = RAW / name
    if not path.exists():
        RAW.mkdir(parents=True, exist_ok=True)
        path.write_bytes(_get(url))
    return path.read_bytes()


def world_bank(code: str, url: str = WB) -> dict[str, tuple[float, int]]:
    payload = json.loads(_get(url.format(code=code)))
    if len(payload) < 2 or payload[1] is None:
        raise RuntimeError(f"World Bank indicator {code} returned no data: {payload[0]}")
    out = {}
    for row in payload[1]:
        # The API returns some territories (e.g. Jersey, Anguilla in WGI) with an empty ISO3 code;
        # recover them by name. The "Channel Islands" (CHI) aggregate is not Jersey or Guernsey and
        # is never used for either.
        iso = row.get("countryiso3code") or NAME_FALLBACK.get(row["country"]["value"])
        if iso and row["value"] is not None:
            out[iso] = (float(row["value"]), int(row["date"]))
    return out


def price_level_ratio() -> dict[str, tuple[float, int]]:
    """PPP / exchange rate for the latest year in which both exist."""
    span = "https://api.worldbank.org/v2/country/all/indicator/{code}?format=json&date=2015:2026&per_page=20000"
    by_year: dict[str, dict[str, dict[int, float]]] = {}
    for code in (PPP_PRIVATE, FX):
        payload = json.loads(_get(span.format(code=code)))
        for row in payload[1] or []:
            if row.get("countryiso3code") and row["value"] is not None:
                by_year.setdefault(row["countryiso3code"], {}).setdefault(code, {})[int(row["date"])] = float(row["value"])
    out = {}
    for iso, d in by_year.items():
        common = sorted(set(d.get(PPP_PRIVATE, {})) & set(d.get(FX, {})))
        if common and d[FX][common[-1]] > 0:
            y = common[-1]
            out[iso] = (d[PPP_PRIVATE][y] / d[FX][y], y)
    return out


def hdi() -> dict[str, tuple[float, int]]:
    text = _cached(HDI_URL, "HDR25_composite.csv").decode("latin-1")
    rows = list(csv.DictReader(io.StringIO(text)))
    years = sorted(int(m.group(1)) for c in rows[0] if (m := re.fullmatch(r"hdi_(\d{4})", c)))
    out = {}
    for r in rows:
        iso = r["iso3"]
        if len(iso) != 3 or iso.startswith("ZZ"):
            continue
        for y in reversed(years):
            v = r.get(f"hdi_{y}", "").strip()
            if v:
                out[iso] = (float(v), y)
                break
    return out


def _xlsx_rows(path: Path):
    """Yield (sheet_name, rows) from an .xlsx, including ISO 'strict' OOXML that openpyxl rejects."""
    import xml.etree.ElementTree as ET
    import zipfile

    def local(tag: str) -> str:
        return tag.rsplit("}", 1)[-1]

    with zipfile.ZipFile(path) as z:
        shared = []
        if "xl/sharedStrings.xml" in z.namelist():
            for si in ET.fromstring(z.read("xl/sharedStrings.xml")):
                shared.append("".join(t.text or "" for t in si.iter() if local(t.tag) == "t"))
        sheets = sorted(n for n in z.namelist() if re.fullmatch(r"xl/worksheets/sheet\d+\.xml", n))
        for name in sheets:
            rows = []
            for row in ET.fromstring(z.read(name)).iter():
                if local(row.tag) != "row":
                    continue
                cells = {}
                for c in row:
                    if local(c.tag) != "c":
                        continue
                    col = re.match(r"[A-Z]+", c.get("r", "A")).group(0)
                    idx = 0
                    for ch in col:
                        idx = idx * 26 + ord(ch) - 64
                    v = next((x.text for x in c if local(x.tag) == "v"), None)
                    if v is None:
                        v = "".join(t.text or "" for t in c.iter() if local(t.tag) == "t") or None
                    elif c.get("t") == "s":
                        v = shared[int(v)]
                    cells[idx - 1] = v
                rows.append([cells.get(i) for i in range(max(cells, default=-1) + 1)])
            yield name, rows


def cpi() -> dict[str, tuple[float, int]]:
    _cached(CPI_URL, "CPI2025_Results.xlsx")
    for _, rows in _xlsx_rows(RAW / "CPI2025_Results.xlsx"):
        out, cols = {}, None
        for row in rows:
            cells = [str(c).strip() if c is not None else "" for c in row]
            low = [c.lower() for c in cells]
            if cols is None:
                score = next((i for i, c in enumerate(low) if c in ("cpi score 2025", "cpi 2025 score")), None)
                if "iso3" in low and score is not None:
                    cols = (low.index("iso3"), score)
                continue
            if len(cells) > max(cols):
                iso, val = cells[cols[0]], cells[cols[1]]
                try:
                    out[iso.upper()] = (float(val), 2025)
                except ValueError:
                    pass
        if out:
            return out
    raise RuntimeError("could not find ISO3 / CPI score 2025 columns in the CPI workbook")


def english_epi(iso2_to_iso3: dict[str, str]) -> dict[str, tuple[float, int]]:
    html = _cached(EPI_URL, "ef_epi_2025.html").decode("utf-8")
    pattern = r'"([a-z]{2})":\{"countrySlug":"[^"]+","countryUrl":"[^"]*","countryPosition":"\d+","efEpiScore":(\d+)'
    out, unmatched = {}, []
    for iso2, score in re.findall(pattern, html):
        iso = iso2_to_iso3.get(iso2.upper())
        if iso:
            out[iso] = (float(score), 2025)
        else:
            unmatched.append(iso2)
    if len(out) < 100:
        raise RuntimeError(f"EF EPI page parsed only {len(out)} countries; the page layout has probably changed")
    if unmatched:
        print(f"  EF EPI ISO-2 codes without a boundary feature (skipped): {sorted(set(unmatched))}")
    return out


def country_features() -> list[dict]:
    path = ROOT / "data" / "build" / "countries.geojson"
    if not path.exists():
        raise RuntimeError("run `python -m domicile.geo` first")
    return [f["properties"] for f in json.loads(path.read_text())["features"]]


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    today = dt.date.today()
    min_year = today.year - MAX_AGE_YEARS
    series: dict[str, dict[str, tuple[float, int]]] = {}
    manifest: dict[str, dict] = {}

    for key, (code, desc) in WORLD_BANK.items():
        print(f"World Bank {code}")
        series[key] = world_bank(code)
        source = "Worldwide Governance Indicators (World Bank), 2025 release" if code.startswith("GOV_WGI") else "World Bank World Development Indicators API"
        manifest[key] = {"description": desc, "source": source,
                         "url": f"https://data.worldbank.org/indicator/{code}", "code": code}

    print("price level ratio")
    series["price_level_ratio"] = price_level_ratio()
    manifest["price_level_ratio"] = {
        "description": "Price level ratio: household-consumption PPP conversion factor / market exchange rate (US = 1)",
        "source": "World Bank WDI (PA.NUS.PRVT.PP / PA.NUS.FCRF, same year)",
        "url": "https://data.worldbank.org/indicator/PA.NUS.PRVT.PP", "code": f"{PPP_PRIVATE}/{FX}"}

    print("UNDP HDI")
    series["hdi"] = hdi()
    manifest["hdi"] = {"description": "Human Development Index (0-1)", "source": "UNDP Human Development Report 2025, composite indices time series", "url": HDI_URL}

    print("TI CPI")
    series["cpi"] = cpi()
    manifest["cpi"] = {"description": "Corruption Perceptions Index 2025 (0-100, higher = cleaner)", "source": "Transparency International", "url": CPI_URL}

    print("EF EPI")
    features = country_features()
    known = {p["id"] for p in features}
    epi = english_epi({p["iso2"]: p["id"] for p in features if p.get("iso2") and p["iso2"] != "-99"} | {"XK": "XKX"})
    for iso in ENGLISH_MAJORITY:
        epi.setdefault(iso, (700.0, 2025))
    series["english_epi"] = epi
    manifest["english_epi"] = {
        "description": "EF English Proficiency Index 2025 score; jurisdictions where English is the majority language "
                       "(not ranked by EF) are set to 700, above the top EF score",
        "source": "EF Education First EPI 2025; English-majority list from CIA World Factbook language entries",
        "url": EPI_URL, "english_majority_list_url": ENGLISH_OFFICIAL_URL, "english_majority": ENGLISH_MAJORITY}

    pisa_csv, pisa_src = OUT / "pisa.csv", OUT / "pisa_source.json"
    if pisa_csv.exists() and pisa_src.exists():
        print("OECD PISA")
        src = json.loads(pisa_src.read_text())
        year = int(re.search(r"\d{4}", str(src["cycle"])).group(0))
        with pisa_csv.open() as f:
            series["pisa"] = {r["iso3"]: (float(r["mean"]), year) for r in csv.DictReader(f) if r["iso3"] and r["mean"]}
        manifest["pisa"] = {"description": f"OECD {src['cycle']}: mean of mathematics, reading and science scores of 15-year-olds",
                            "source": f"OECD, {src['title']} ({src['published']})", "url": src["url"]}

    rows = []
    for key, data in sorted(series.items()):
        dropped = 0
        for iso, (value, year) in sorted(data.items()):
            if iso not in known:  # World Bank regional/income aggregates
                continue
            if year < min_year:
                dropped += 1
                continue
            rows.append({"iso3": iso, "key": key, "value": round(value, 6), "year": year})
        manifest[key]["fetched"] = today.isoformat()
        manifest[key]["dropped_older_than"] = min_year
        manifest[key]["dropped_count"] = dropped
        manifest[key]["count"] = sum(1 for r in rows if r["key"] == key)

    with (OUT / "indicators.csv").open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["iso3", "key", "value", "year"])
        w.writeheader()
        w.writerows(rows)
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
    for key, m in sorted(manifest.items()):
        print(f"  {key:18} {m['count']:4} countries (dropped {m['dropped_count']} stale)")


if __name__ == "__main__":
    import argparse

    argparse.ArgumentParser(description="Refresh the indicator datasets (World Bank, UNDP, TI, EF; network); "
                            "writes data/indicators/.").parse_args()
    main()
