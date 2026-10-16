"""The monthly update's deterministic helpers: the re-verification queue, the diff report and prepare/finish."""

import copy
import datetime as dt
import json

from conftest import ROOT, scores
from domicile import diffreport, monthly, staleness


def test_queue_puts_the_least_recently_checked_file_first(tmp_path, monkeypatch):
    d = tmp_path / "data" / "immigration"
    d.mkdir(parents=True)
    (d / "AAA.json").write_text(json.dumps({"researched_on": "2026-10-10", "routes": [{"x": 1}]}))
    (d / "BBB.json").write_text(json.dumps({"researched_on": "2026-01-01"}))
    (d / "CCC.json").write_text(json.dumps({"researched_on": "2025-01-01", "income_tax": {"verified_on": "2026-09-01"}}))
    monkeypatch.setattr(staleness, "ROOT", tmp_path)
    monkeypatch.setattr(staleness, "DATA", tmp_path / "data")
    q = staleness.queue("immigration")
    # CCC's newest check (2026-09-01) counts, so BBB is the most overdue.
    assert [r["id"] for r in q] == ["BBB", "CCC", "AAA"]
    rows = staleness.due({"immigration": 2}, dt.date(2026, 11, 16))
    assert [r["id"] for r in rows] == ["BBB", "CCC"] and rows[0]["days_since"] == 319


def test_real_queues_cover_every_file():
    for kind, folder in staleness.KINDS.items():
        assert len(staleness.queue(kind)) == len(list((ROOT / "data" / folder).glob("*.json")))


def test_diff_report_explains_what_moved():
    before = scores()
    after = copy.deepcopy(before)
    j = after["jurisdictions"]
    j["PRT"]["default"]["score"] = (j["PRT"]["default"]["score"] or 0) + 3
    j["CYP"]["red_flag"] = {"label": "test"}
    text = diffreport.report(before, after)
    assert "| Portugal |" in text and "+3.0" in text
    assert "Cyprus: red flag added" in text
    assert "No change." in text  # sections without changes say so
    assert diffreport.report(before, before).count("No change.") >= 3


def test_prepare_and_finish(tmp_path, monkeypatch):
    monkeypatch.setattr(monthly, "BUILD", tmp_path / "build")
    monkeypatch.setattr(monthly, "STATE", tmp_path / "updates" / "last_run.json")
    monkeypatch.setattr(monthly, "ROOT", tmp_path)
    monkeypatch.setattr(monthly, "SCORES", ROOT / "web" / "data" / "scores.json")
    monkeypatch.setattr(monthly, "due", lambda per_kind, today: [{"kind": "tax", "id": "PRT"}])
    args = monthly.prepare(dt.date(2026, 11, 16), {"tax": 1})
    assert args["month"] == "2026-11" and args["since"] == "2026-10-16" and args["rotation"][0]["id"] == "PRT"
    assert (tmp_path / "build" / "scores_before.json").exists()
    assert json.loads((tmp_path / "build" / "monthly-args.json").read_text()) == args
    monthly.finish(dt.date(2026, 11, 20))
    assert monthly.last_run() == "2026-11-20"
