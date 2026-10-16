"""Which researched files are due for re-verification: ``python -m domicile.staleness [--per-kind N] [--json]``.

The monthly update re-checks a rotating batch instead of everything: the files whose newest research date
is oldest come first (a file's date is its ``researched_on``; a tax file also counts the latest
``verified_on`` of its metrics, so a file partly re-verified last month moves back in the queue).
Ties are broken by id, so the order is stable from one run to the next.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
KINDS = {"tax": "jurisdictions", "income": "income", "immigration": "immigration", "regions": "subnational", "succession": "succession"}


def _dates(obj) -> list[str]:
    """Every researched_on / verified_on date anywhere in a data file."""
    out = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in ("researched_on", "verified_on") and isinstance(v, str):
                out.append(v)
            else:
                out += _dates(v)
    elif isinstance(obj, list):
        for v in obj:
            out += _dates(v)
    return out


def queue(kind: str) -> list[dict]:
    """Files of one kind, most overdue first."""
    rows = []
    for p in sorted((DATA / KINDS[kind]).glob("*.json")):
        dates = _dates(json.loads(p.read_text()))
        newest = max(dates) if dates else "0000-00-00"
        rows.append({"kind": kind, "id": p.stem, "path": str(p.relative_to(ROOT)), "last_checked": newest})
    return sorted(rows, key=lambda r: (r["last_checked"], r["id"]))


def due(per_kind: dict[str, int], today: dt.date | None = None) -> list[dict]:
    today = today or dt.date.today()
    out = []
    for kind, n in per_kind.items():
        for r in queue(kind)[:n]:
            r["days_since"] = (today - dt.date.fromisoformat(r["last_checked"])).days if r["last_checked"][0] != "0" else None
            out.append(r)
    return out


def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--tax", type=int, default=12, help="tax files to re-verify (default 12: all 145 in about a year)")
    ap.add_argument("--income", type=int, default=7, help="income files (default 7: all 78 in about a year)")
    ap.add_argument("--immigration", type=int, default=6, help="immigration files (default 6: all 59 in about ten months)")
    ap.add_argument("--regions", type=int, default=1, help="regional files (default 1)")
    ap.add_argument("--succession", type=int, default=12, help="succession files (default 12: all 145 in about a year)")
    ap.add_argument("--json", action="store_true", help="print JSON for the monthly workflow")
    a = ap.parse_args(argv)
    rows = due({"tax": a.tax, "income": a.income, "immigration": a.immigration, "regions": a.regions, "succession": a.succession})
    if a.json:
        print(json.dumps(rows, indent=2))
    else:
        for r in rows:
            print(f"{r['kind']:<12} {r['id']:<6} last checked {r['last_checked']} ({r['days_since']} days)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
