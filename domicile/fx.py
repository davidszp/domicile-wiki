"""Exchange rates to EUR, snapshotted to ``data/fx.json`` (``python -m domicile.fx`` refreshes).

Order of preference: ECB euro foreign exchange reference rates (daily), then official USD or EUR
pegs (documented below), then the World Bank 2025 average official rate as a last resort.
"""

from __future__ import annotations

import datetime as dt
import json
import re
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FX_PATH = ROOT / "data" / "fx.json"
ECB_URL = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
FED_H10_URL = "https://www.federalreserve.gov/releases/h10/current/default.htm"
# Currencies published by neither the ECB nor the World Bank: units per USD from the Fed's H.10 release.
FED_H10 = {"TWD": "TAIWAN"}  # row header in the H.10 table
WB_FX = "https://api.worldbank.org/v2/country/all/indicator/PA.NUS.FCRF?format=json&mrnev=1&per_page=20000"

# Units of currency per 1 USD (or per 1 EUR for EUR pegs), as fixed by the issuing central bank.
USD_PEGS = {
    "AED": (3.6725, "Central Bank of the UAE peg"), "SAR": (3.75, "Saudi Central Bank peg"),
    "QAR": (3.64, "Qatar Central Bank peg"), "BHD": (0.376, "Central Bank of Bahrain peg"),
    "OMR": (0.3845, "Central Bank of Oman peg"), "BSD": (1.0, "Central Bank of The Bahamas 1:1 peg"),
    "BMD": (1.0, "Bermuda Monetary Authority 1:1 peg"), "KYD": (0.833333, "Cayman Islands Monetary Authority peg (KYD 1 = USD 1.20)"),
    "XCD": (2.7, "Eastern Caribbean Central Bank peg"), "BBD": (2.0, "Central Bank of Barbados peg"),
    "AWG": (1.79, "Centrale Bank van Aruba peg"), "XCG": (1.79, "Central Bank of Curaçao and Sint Maarten peg"),
    "ANG": (1.79, "Central Bank of Curaçao and Sint Maarten peg (legacy guilder)"), "PAB": (1.0, "Panama 1:1 with USD"),
    "HKD": (7.80, "HKMA linked exchange rate (7.75-7.85 band, midpoint)"), "BZD": (2.0, "Central Bank of Belize peg"),
    "JOD": (0.709, "Central Bank of Jordan peg"),
}
EUR_PEGS = {
    "XPF": (119.33174, "CFP franc, fixed to the euro (IEOM)"), "CVE": (110.265, "Cabo Verde escudo peg (Banco de Cabo Verde)"),
    "STN": (24.5, "São Tomé and Príncipe dobra peg (Banco Central de STP)"),
    "BAM": (1.95583, "Central Bank of Bosnia and Herzegovina currency board"),
    "XOF": (655.957, "BCEAO peg"), "XAF": (655.957, "BEAC peg"), "KMF": (491.96775, "Central Bank of Comoros peg"),
    "DKK": (7.46038, "ERM II central rate (ECB rate used when available)"),
}
# Pegs to other non-USD currencies: currency -> (units per 1 anchor, anchor, why).
OTHER_PEGS = {
    "BTN": (1.0, "INR", "Bhutanese ngultrum at par with the Indian rupee (Royal Monetary Authority of Bhutan)"),
    "BND": (1.0, "SGD", "Brunei dollar at par with the Singapore dollar (Currency Interchangeability Agreement)"),
    "MOP": (1.03, "HKD", "Macau pataca linked to the Hong Kong dollar (AMCM)"),
    "NAD": (1.0, "ZAR", "Namibian dollar at par with the rand (Common Monetary Area)"),
    "LSL": (1.0, "ZAR", "Lesotho loti at par with the rand (Common Monetary Area)"),
}
# Units per 1 GBP: Crown Dependency and Overseas Territory currencies issued at par with sterling.
GBP_PEGS = {
    "GIP": (1.0, "Gibraltar pound, at par with GBP"), "JEP": (1.0, "Jersey pound, at par with GBP"),
    "GGP": (1.0, "Guernsey pound, at par with GBP"), "IMP": (1.0, "Manx pound, at par with GBP"),
    "FKP": (1.0, "Falkland Islands pound, at par with GBP"),
}
# ISO 4217 currency -> a country using it, to look up World Bank rates when nothing better exists.
WB_FALLBACK_COUNTRY = {
    "ALL": "ALB", "MKD": "MKD", "RSD": "SRB", "MDL": "MDA", "UAH": "UKR", "BYN": "BLR", "RUB": "RUS",
    "GEL": "GEO", "TRY": "TUR", "MUR": "MUS", "CRC": "CRI", "UYU": "URY", "TWD": "TWN", "JMD": "JAM",
    "TTD": "TTO", "DOP": "DOM", "SGD": "SGP", "MYR": "MYS", "THB": "THA", "ILS": "ISR", "ISK": "ISL",
    "KZT": "KAZ", "MNT": "MNG", "AMD": "ARM", "KWD": "KWT", "MVR": "MDV", "SCR": "SYC", "VND": "VNM", "LKR": "LKA",
    "ARS": "ARG", "CLP": "CHL", "GYD": "GUY", "SRD": "SUR", "BWP": "BWA", "MAD": "MAR", "TND": "TUN", "RWF": "RWA",
    "GHS": "GHA", "GMD": "GMB", "MWK": "MWI", "ZMW": "ZMB", "FJD": "FJI", "WST": "WSM", "TOP": "TON", "VUV": "VUT",
    "SBD": "SLB", "COP": "COL", "PEN": "PER", "PYG": "PRY", "BOB": "BOL", "KES": "KEN", "NGN": "NGA", "EGP": "EGY",
}


def _get(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "domicile-data-pipeline/0.1"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def refresh() -> dict:
    root = ET.fromstring(_get(ECB_URL))
    cubes = [c for c in root.iter() if c.get("currency")]
    date = next(c.get("time") for c in root.iter() if c.get("time"))
    rates = {"EUR": {"per_eur": 1.0, "source": "base currency"}}
    for c in cubes:
        rates[c.get("currency")] = {"per_eur": float(c.get("rate")), "source": f"ECB reference rate {date}"}
    usd = rates["USD"]["per_eur"]
    for cur, (per_usd, why) in USD_PEGS.items():
        rates.setdefault(cur, {"per_eur": per_usd * usd, "source": f"{why}; USD via ECB {date}"})
    gbp = rates["GBP"]["per_eur"]
    for cur, (per_gbp, why) in GBP_PEGS.items():
        rates.setdefault(cur, {"per_eur": per_gbp * gbp, "source": f"{why}; GBP via ECB {date}"})
    for cur, (per_eur, why) in EUR_PEGS.items():
        rates.setdefault(cur, {"per_eur": per_eur, "source": why})
    for cur, (per_anchor, anchor, why) in OTHER_PEGS.items():
        if anchor in rates:
            rates.setdefault(cur, {"per_eur": per_anchor * rates[anchor]["per_eur"], "source": f"{why}; {anchor} rate as above"})
    fed_html = _get(FED_H10_URL).decode("utf-8", "replace")
    for cur, label in FED_H10.items():
        i = fed_html.find(label)
        if i < 0:
            continue
        row = fed_html[i: fed_html.find("</tr>", i)]  # this currency's table row only
        row = re.sub(r"<[^>]+>", " ", row)
        nums = re.findall(r"\d+\.\d+", row)
        if nums:
            rates.setdefault(cur, {"per_eur": float(nums[-1]) * usd,
                                   "source": f"Federal Reserve H.10 (latest daily rate, {nums[-1]} per USD); USD via ECB {date}"})
    wb = json.loads(_get(WB_FX))[1]
    by_country = {r["countryiso3code"]: (r["value"], r["date"]) for r in wb if r["value"]}
    eur_per_usd_wb = by_country.get("EMU", (None,))[0]
    for cur, iso in WB_FALLBACK_COUNTRY.items():
        if cur in rates or iso not in by_country or not eur_per_usd_wb:
            continue
        lcu_per_usd, year = by_country[iso]
        rates[cur] = {"per_eur": lcu_per_usd / eur_per_usd_wb,
                      "source": f"World Bank official exchange rate, {year} average (PA.NUS.FCRF)"}
    snapshot = {"date": date, "fetched": dt.date.today().isoformat(), "rates": dict(sorted(rates.items()))}
    FX_PATH.write_text(json.dumps(snapshot, indent=1) + "\n")
    return snapshot


def load() -> dict:
    return json.loads(FX_PATH.read_text())


def to_eur(amount: float, currency: str, fx: dict) -> float:
    try:
        return amount / fx["rates"][currency]["per_eur"]
    except KeyError:
        raise KeyError(f"no exchange rate for {currency}; add it to domicile/fx.py") from None


if __name__ == "__main__":
    s = refresh()
    print(f"{len(s['rates'])} currencies, ECB date {s['date']}")
