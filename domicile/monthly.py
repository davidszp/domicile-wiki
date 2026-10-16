"""Before and after the monthly update workflow: ``python -m domicile.monthly prepare|finish``.

prepare  snapshots the current build (data/build/scores_before.json), works out the period since the last
         run (data/updates/last_run.json) and the files due for re-verification (domicile.staleness), and
         writes the workflow's arguments to data/build/monthly-args.json.
finish   records today as the last run, after the maintainer has approved the update.

See docs/MONTHLY_UPDATE.md for the whole recipe.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import shutil
import sys
from pathlib import Path

from domicile.staleness import due

ROOT = Path(__file__).resolve().parent.parent
STATE = ROOT / "data" / "updates" / "last_run.json"
BUILD = ROOT / "data" / "build"
SCORES = ROOT / "web" / "data" / "scores.json"


def last_run() -> str:
    return json.loads(STATE.read_text())["date"] if STATE.exists() else "2026-10-16"


def prepare(today: dt.date, per_kind: dict[str, int]) -> dict:
    BUILD.mkdir(parents=True, exist_ok=True)
    snapshot = BUILD / "scores_before.json"
    shutil.copyfile(SCORES, snapshot)
    args = {"month": today.strftime("%Y-%m"), "today": today.isoformat(), "since": last_run(),
            "snapshot": str(snapshot.relative_to(ROOT)), "rotation": due(per_kind, today)}
    (BUILD / "monthly-args.json").write_text(json.dumps(args, indent=2) + "\n")
    return args


def finish(today: dt.date) -> None:
    STATE.parent.mkdir(parents=True, exist_ok=True)
    STATE.write_text(json.dumps({"date": today.isoformat()}, indent=2) + "\n")


def main(argv: list[str]) -> int:
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("step", choices=["prepare", "finish"])
    ap.add_argument("--today", help="override the date (YYYY-MM-DD)")
    ap.add_argument("--tax", type=int, default=12)
    ap.add_argument("--income", type=int, default=7)
    ap.add_argument("--immigration", type=int, default=6)
    ap.add_argument("--regions", type=int, default=1)
    ap.add_argument("--succession", type=int, default=12)
    a = ap.parse_args(argv)
    today = dt.date.fromisoformat(a.today) if a.today else dt.date.today()
    if a.step == "prepare":
        args = prepare(today, {"tax": a.tax, "income": a.income, "immigration": a.immigration, "regions": a.regions, "succession": a.succession})
        print(f"Period {args['since']} to {args['today']}; {len(args['rotation'])} files to re-verify; "
              f"arguments in data/build/monthly-args.json")
    else:
        finish(today)
        print(f"Last run recorded as {today.isoformat()} ({STATE.relative_to(ROOT)})")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
