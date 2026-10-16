"""Monthly history of what each persona sees: ``python -m domicile.history snapshot|show|changes``.

Git keeps every version of every data file; this keeps the *result* of those rules for each persona, one
file per month (``data/history/<YYYY-MM>.json``), so a country's tax story can be read without rebuilding
old versions of the site:

    snapshot [--month YYYY-MM]   record the current build (``make monthly-finish`` does this)
    show DEU [--persona hnwi]    one country over time
    changes 2026-10 2026-11      what changed between two months, per persona

Each snapshot records, for every researched jurisdiction and each persona (EU citizenship, default
weights): the score, the tax regime used, the yearly tax in EUR, and the residence route; for the HNWI
family also the four tax-metric scores and the 60-year projection. The exchange-rate date and the market
assumptions are stored alongside, so a move caused by a currency or an assumption can be told apart from
a change in the law.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HISTORY = ROOT / "data" / "history"
SCORES = ROOT / "web" / "data" / "scores.json"
PERSONAS = ("hnwi", "expat", "nomad")
CZ = "EU"


def _chosen(rows: list[dict] | None, regime: str | None) -> dict:
    return next((r for r in rows or [] if r["id"] == regime), {})


def _route(r: dict | None) -> str | None:
    return (r or {}).get(CZ, {}).get("id") if r else None


def record(e: dict) -> dict:
    """One jurisdiction's figures per persona."""
    d = e.get("default") or {}
    row = _chosen(e["tax"].get(CZ), d.get("regime"))
    out = {"hnwi": {"score": d.get("score"), "tax_score": d.get("tax_score"), "regime": d.get("regime"),
                    "tax_eur": row.get("cost"), "metrics": row.get("scores"), "route": _route(e.get("residence"))}}
    if e.get("projection"):
        out["hnwi"]["projection"] = e["projection"]
    for p, route in (("expat", "residence_work"), ("nomad", "residence_nomad")):
        pe = (e.get("personas") or {}).get(p) or {}
        pd = pe.get("default") or {}
        prow = _chosen((pe.get("tax") or {}).get(CZ), pd.get("regime"))
        out[p] = {"score": pd.get("score"), "regime": pd.get("regime"), "tax_eur": prow.get("cost"),
                  "income_eur": pe.get("income_eur"), "route": _route(e.get(route))}
    return out


def _commit() -> str | None:
    try:
        return subprocess.run(["git", "rev-parse", "--short", "HEAD"], cwd=ROOT, capture_output=True, text=True, check=True).stdout.strip()
    except (OSError, subprocess.CalledProcessError):
        return None


def snapshot(scores: dict, month: str, today: dt.date | None = None) -> dict:
    meta, cfg = scores["meta"], scores["meta"]["config"]
    units = {k: record(e) for k, e in sorted(scores["jurisdictions"].items()) if e.get("researched") and not e.get("inherited")}
    return {"month": month, "recorded": (today or dt.date.today()).isoformat(), "built": meta["built"], "commit": _commit(),
            "fx_date": meta["fx_date"], "market": {k: v for k, v in cfg["market"].items() if k != "description"},
            "reference_family": {k: v for k, v in cfg["reference_family"].items() if k != "description"},
            "jurisdictions": units}


def dumps(snap: dict) -> str:
    """JSON with one line per jurisdiction, so ``git diff`` of two months reads like a change list."""
    head = {k: v for k, v in snap.items() if k != "jurisdictions"}
    lines = json.dumps(head, ensure_ascii=False, indent=1)[:-2] + ',\n "jurisdictions": {\n'
    body = ",\n".join(f'  "{k}": {json.dumps(v, ensure_ascii=False, separators=(",", ":"))}' for k, v in snap["jurisdictions"].items())
    return lines + body + "\n }\n}\n"


def write(month: str, scores_path: Path = SCORES) -> Path:
    HISTORY.mkdir(parents=True, exist_ok=True)
    path = HISTORY / f"{month}.json"
    path.write_text(dumps(snapshot(json.loads(scores_path.read_text()), month)), encoding="utf-8")
    return path


def load_all() -> list[dict]:
    return [json.loads(p.read_text()) for p in sorted(HISTORY.glob("*.json"))]


def _fmt(v) -> str:
    if v is None:
        return "—"
    if isinstance(v, float):
        return f"{v:.1f}"
    if isinstance(v, int):
        return f"{v:,}"
    return str(v)


def show(iso: str, persona: str | None = None) -> str:
    snaps = load_all()
    out = []
    for p in [persona] if persona else PERSONAS:
        out += [f"### {iso} · {p}", "", "| Month | Score | Regime | Tax a year (EUR) | Route |" + (" 60-year end (EUR M) |" if p == "hnwi" else ""),
                "|---|---:|---|---:|---|" + ("---|" if p == "hnwi" else "")]
        for s in snaps:
            r = (s["jurisdictions"].get(iso) or {}).get(p)
            if not r:
                continue
            proj = ""
            if p == "hnwi":
                proj = " " + ", ".join(f"{k} {v / 1e6:.1f}" for k, v in (r.get("projection") or {}).items() if k != "no_tax" and v) + " |"
            out.append(f"| {s['month']} | {_fmt(r['score'])} | {_fmt(r['regime'])} | {_fmt(r['tax_eur'])} | {_fmt(r['route'])} |{proj}")
        out.append("")
    return "\n".join(out)


def changes(before: dict, after: dict) -> str:
    out = [f"## Changes {before['month']} → {after['month']}", ""]
    for k in ("fx_date", "market", "reference_family"):
        if before.get(k) != after.get(k):
            out.append(f"- {k.replace('_', ' ')} changed: {before.get(k)} → {after.get(k)} (moves below may come from this, not from the law)")
    for p in PERSONAS:
        rows = []
        for iso in sorted(set(before["jurisdictions"]) | set(after["jurisdictions"])):
            a, b = (before["jurisdictions"].get(iso) or {}).get(p) or {}, (after["jurisdictions"].get(iso) or {}).get(p) or {}
            what = [f"{f} {_fmt(a.get(f))} → {_fmt(b.get(f))}" for f in ("regime", "tax_eur", "route") if a.get(f) != b.get(f)]
            if a.get("projection") != b.get("projection") and p == "hnwi":
                what.append("60-year projection changed")
            if what:
                rows.append(f"- {iso}: " + "; ".join(what))
        out += [f"### {p}", ""] + (rows or ["No change."]) + [""]
    return "\n".join(out)


def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    sub = ap.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("snapshot", help="record the current build")
    s.add_argument("--month", default=dt.date.today().strftime("%Y-%m"))
    sh = sub.add_parser("show", help="one jurisdiction over time")
    sh.add_argument("id")
    sh.add_argument("--persona", choices=PERSONAS)
    c = sub.add_parser("changes", help="what changed between two months")
    c.add_argument("before")
    c.add_argument("after")
    a = ap.parse_args(argv)
    if a.cmd == "snapshot":
        print(f"wrote {write(a.month).relative_to(ROOT)}")
    elif a.cmd == "show":
        print(show(a.id.upper(), a.persona))
    else:
        load = lambda m: json.loads((HISTORY / f"{m}.json").read_text())  # noqa: E731
        print(changes(load(a.before), load(a.after)))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
