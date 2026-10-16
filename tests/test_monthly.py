"""The monthly update's deterministic helpers: the re-verification queue, the diff report and prepare/finish."""

import copy
import datetime as dt
import json

from conftest import ROOT, scores
from domicile import diffreport, history, monthly, staleness


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
    monkeypatch.setattr(history, "HISTORY", tmp_path / "history")
    args = monthly.prepare(dt.date(2026, 11, 16), {"tax": 1})
    assert args["month"] == "2026-11" and args["since"] == "2026-10-16" and args["rotation"][0]["id"] == "PRT"
    assert (tmp_path / "build" / "scores_before.json").exists()
    assert json.loads((tmp_path / "build" / "monthly-args.json").read_text()) == args
    monthly.finish(dt.date(2026, 11, 20))
    assert monthly.last_run() == "2026-11-20"
    assert (tmp_path / "history" / "2026-11.json").exists()  # finish records the month's figures


def test_diff_report_lists_projection_moves():
    before = scores()
    assert before["jurisdictions"]["DEU"]["projection"]["personal"], "the build stores each recipe's end wealth"
    after = copy.deepcopy(before)
    after["jurisdictions"]["DEU"]["projection"]["personal"] *= 0.95
    after["jurisdictions"]["DEU"]["projection"]["vv_gmbh"] *= 1.01  # under 2%: not listed
    text = diffreport.report(before, after)
    section = text.split("### 60-year projections")[1]
    assert "| Germany | personal |" in section and "-5.0%" in section
    assert "vv_gmbh" not in section


def test_history_snapshot_records_each_persona_and_reads_back():
    snap = history.snapshot(scores(), "2026-10")
    de = snap["jurisdictions"]["DEU"]
    assert set(de) == {"hnwi", "expat", "nomad"}
    assert de["hnwi"]["regime"] and de["hnwi"]["tax_eur"] and de["hnwi"]["projection"]["personal"]
    assert de["expat"]["tax_eur"] and de["nomad"]["route"]
    assert snap["market"]["price_growth"] == scores()["meta"]["config"]["market"]["price_growth"]
    back = json.loads(history.dumps(snap))
    assert back == json.loads(json.dumps(snap))  # the one-line-per-country layout is still plain JSON
    later = copy.deepcopy(back)
    later["month"] = "2026-11"
    later["jurisdictions"]["DEU"]["expat"]["tax_eur"] += 1000
    later["market"]["price_growth"] = 0.04
    text = history.changes(back, later)
    assert "DEU: tax_eur" in text.split("### expat")[1].split("###")[0]
    assert "market changed" in text  # a move from an assumption is labelled as such


def test_history_files_are_well_formed():
    for p in sorted((ROOT / "data" / "history").glob("*.json")):
        s = json.loads(p.read_text())
        assert s["month"] == p.stem and s["jurisdictions"], p.name
        assert all(set(v) == set(history.PERSONAS) for v in s["jurisdictions"].values()), p.name
