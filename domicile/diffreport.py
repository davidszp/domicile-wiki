"""What an update changed on the site: ``python -m domicile.diffreport BEFORE.json [AFTER.json]``.

Compares two builds of web/data/scores.json (AFTER defaults to the current one) and prints Markdown for the
monthly report: countries whose default HNWI score moved, rank changes in the top 30, knock-outs and red
flags added or removed, tax regimes that changed, residence routes that changed per citizenship, and 60-year
projections that moved.
The reviewer reads this next to the agents' change log; a large move with no matching research change is
the thing to look into.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCORE_MOVE = 1.0  # points
COST_MOVE = 0.10  # share
PROJECTION_MOVE = 0.02  # share of wealth after 60 years


def _countries(scores: dict) -> dict:
    return {k: v for k, v in scores["jurisdictions"].items() if v["level"] == "country"}


def _ranking(j: dict) -> list[str]:
    ranked = [(v["default"]["score"], k) for k, v in j.items()
              if v.get("default", {}).get("score") is not None and v["default"].get("status") not in ("insufficient", "knocked_out")]
    return [k for _, k in sorted(ranked, key=lambda x: (-x[0], x[1]))]


def report(before: dict, after: dict) -> str:
    a, b = _countries(before), _countries(after)
    name = lambda k: (b.get(k) or a.get(k))["name"]  # noqa: E731
    lines = ["## What changed on the site", ""]

    moved = []
    for k in sorted(set(a) & set(b)):
        s0, s1 = a[k].get("default", {}).get("score"), b[k].get("default", {}).get("score")
        if s0 is None or s1 is None:
            if (s0 is None) != (s1 is None):
                moved.append(f"| {name(k)} | {s0 if s0 is not None else 'unscored'} | {s1 if s1 is not None else 'unscored'} | |")
        elif abs(s1 - s0) >= SCORE_MOVE:
            moved.append(f"| {name(k)} | {s0:.1f} | {s1:.1f} | {s1 - s0:+.1f} |")
    lines += ["### Default HNWI scores that moved", ""]
    lines += (["| Country | Before | After | Change |", "|---|---|---|---|", *moved] if moved else ["None moved by a point or more."]) + [""]

    r0, r1 = _ranking(a), _ranking(b)
    # A place entering the list shifts everyone below it by one: show entries, exits and moves of 2+ only.
    top = [f"| {i + 1} | {name(k)} | {('#' + str(r0.index(k) + 1)) if k in r0 else 'new'} |" for i, k in enumerate(r1[:30])
           if k not in r0 or abs(r0.index(k) - i) >= 2]
    left = [name(k) for k in r0[:30] if k not in r1[:30]]
    shifted = sum(1 for i, k in enumerate(r1[:30]) if k in r0 and abs(r0.index(k) - i) == 1)
    lines += ["### Top 30: entries, exits and moves of two places or more", ""]
    lines += (["| Now | Country | Before |", "|---|---|---|", *top] if top else ["None."])
    lines += ([f"Left the top 30: {', '.join(left)}."] if left else []) + ([f"{shifted} others moved by one place."] if shifted else []) + [""]

    def ko(j, k):
        return {x["id"] for x in j[k].get("ko") or []}
    ko_lines = []
    for k in sorted(set(a) | set(b)):
        k0, k1 = (ko(a, k) if k in a else set()), (ko(b, k) if k in b else set())
        if k0 != k1:
            ko_lines.append(f"- {name(k)}: " + ", ".join([f"+{x}" for x in sorted(k1 - k0)] + [f"-{x}" for x in sorted(k0 - k1)]))
        f0, f1 = a.get(k, {}).get("red_flag"), b.get(k, {}).get("red_flag")
        if bool(f0) != bool(f1):
            ko_lines.append(f"- {name(k)}: red flag {'added' if f1 else 'removed'}")
    lines += ["### Knock-outs and red flags", ""] + (ko_lines or ["No change."]) + [""]

    reg = []
    for k in sorted(set(a) & set(b)):
        g0, g1 = a[k].get("default", {}).get("regime"), b[k].get("default", {}).get("regime")
        if g0 != g1:
            reg.append(f"- {name(k)}: {g0} → {g1}")
        c0, c1 = a[k].get("household_cost"), b[k].get("household_cost")
        if c0 and c1 and abs(c1 - c0) / c0 >= COST_MOVE:
            reg.append(f"- {name(k)}: Annual Household Cost {c0:,.0f} → {c1:,.0f} EUR")
    lines += ["### Regimes used and household costs", ""] + (reg or ["No change."]) + [""]

    res = []
    for k in sorted(set(a) & set(b)):
        for cz in ("EU", "US", "OTHER"):
            x0 = (a[k].get("residence") or {}).get(cz) or {}
            x1 = (b[k].get("residence") or {}).get(cz) or {}
            if (x0.get("id"), x0.get("investment_eur"), x0.get("income_eur")) != (x1.get("id"), x1.get("investment_eur"), x1.get("income_eur")):
                res.append(f"- {name(k)} ({cz}): {x0.get('name') or x0.get('kind') or '—'} → {x1.get('name') or x1.get('kind') or '—'}")
    lines += ["### Cheapest residence route (HNWI)", ""] + (res or ["No change."]) + [""]

    proj = []
    for k in sorted(set(a) | set(b)):
        p0, p1 = (a.get(k) or {}).get("projection") or {}, (b.get(k) or {}).get("projection") or {}
        for path in sorted(set(p0) | set(p1)):
            if path == "no_tax":
                continue
            v0, v1 = p0.get(path), p1.get(path)
            if v0 is None or v1 is None:
                if v0 != v1:
                    proj.append(f"| {name(k)} | {path} | {_m(v0)} | {_m(v1)} | {'new' if v0 is None else 'removed'} |")
            elif v0 and abs(v1 - v0) / v0 >= PROJECTION_MOVE:
                proj.append(f"| {name(k)} | {path} | {_m(v0)} | {_m(v1)} | {100 * (v1 - v0) / v0:+.1f}% |")
    lines += ["### 60-year projections that moved 2% or more", "",
              "Wealth after 60 years for the reference family, in today's money. Every move needs a named, sourced change"
              " and re-worked checks in the country's recipe.", ""]
    lines += (["| Country | Path | Before | After | Change |", "|---|---|---|---|---|", *proj] if proj else ["No change."]) + [""]
    return "\n".join(lines)


def _m(v) -> str:
    return "—" if v is None else f"EUR {v / 1e6:,.1f}M"


def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("before", help="scores.json saved before the update")
    ap.add_argument("after", nargs="?", default=str(ROOT / "web" / "data" / "scores.json"))
    a = ap.parse_args(argv)
    print(report(json.loads(Path(a.before).read_text()), json.loads(Path(a.after).read_text())))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
