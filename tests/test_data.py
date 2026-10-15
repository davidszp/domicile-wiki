"""Integrity of the researched data and the generated outputs."""

import datetime as dt
import json
import re

import pytest

from conftest import ROOT, WEB, scores
from domicile.schema import Jurisdiction, Subnational
from domicile.validate import validate_file

JUR = sorted((ROOT / "data" / "jurisdictions").glob("*.json"))
SUB = sorted((ROOT / "data" / "subnational").glob("*.json"))
METRICS = ("capital_gains", "dividends", "wealth_tax", "inheritance")
TODAY = dt.date.today()


@pytest.mark.parametrize("path", JUR + SUB, ids=lambda p: p.stem)
def test_files_validate(path):
    assert validate_file(path) == []


@pytest.mark.parametrize("path", JUR + SUB, ids=lambda p: p.stem)
def test_every_file_has_a_matching_dated_dossier(path):
    is_sub = path.parent.name == "subnational"
    md = ROOT / "docs" / "jurisdictions" / (f"{path.stem}-regions.md" if is_sub else f"{path.stem}.md")
    assert md.exists(), f"missing dossier {md.name}"
    text = md.read_text()
    m = re.search(r"^Last reviewed:\s*(\d{4}-\d{2}-\d{2})", text, re.M)
    assert m, f"{md.name} has no 'Last reviewed:' line"
    researched = json.loads(path.read_text())["researched_on"]
    assert m.group(1) == researched, f"{md.name} reviewed {m.group(1)} but JSON researched_on {researched}"
    for section in ("## Sources", "## Change log"):
        assert section in text, f"{md.name} lacks '{section}'"


@pytest.mark.parametrize("path", JUR, ids=lambda p: p.stem)
def test_tax_claims_cite_sources_and_tax_years(path):
    j = Jurisdiction.model_validate_json(path.read_text())
    for r in j.regimes:
        for m in METRICS:
            metric = getattr(r, m)
            if metric is None:
                continue
            assert metric.sources, f"{r.id}.{m} has no source"
            assert all(str(s.url).startswith("https://") or str(s.url).startswith("http://") for s in metric.sources)
            year = int(metric.tax_year[:4])
            assert year >= 2025, f"{r.id}.{m} tax year {metric.tax_year} looks stale"
            assert metric.verified_on <= TODAY, f"{r.id}.{m} verified in the future"


@pytest.mark.parametrize("path", JUR, ids=lambda p: p.stem)
def test_special_regimes_without_duration_explain_why(path):
    """A special regime with no duration is scored as permanent, so the file must say why."""
    j = Jurisdiction.model_validate_json(path.read_text())
    for r in j.regimes[1:]:
        if r.duration_years is None:
            assert len(r.duration_note) >= 15, f"{path.stem}:{r.id} has no duration_years and no duration_note"


def test_source_register_covers_every_researched_metric():
    reg = json.loads((WEB / "sources.json").read_text())["tax"]
    covered = {(s["jurisdiction"], s["metric"]) for s in reg}
    for path in JUR:
        for m in METRICS:
            assert (path.stem, m) in covered, f"{path.stem}.{m} missing from the source register"
    assert all(s["tax_year"] and s["verified_on"] for s in reg)


def test_unresearched_jurisdictions_are_never_scored():
    for jid, e in scores()["jurisdictions"].items():
        if not e["researched"]:
            assert e["default"]["score"] is None, jid
            assert e["default"]["status"] in ("insufficient", "knocked_out"), jid


def test_scored_jurisdictions_have_all_tax_metrics():
    for jid, e in scores()["jurisdictions"].items():
        d = e["default"]
        if d["score"] is not None:
            best = next(r for r in e["tax"]["EU"] if r["id"] == d["regime"])
            assert all(best["scores"][m] is not None for m in METRICS), jid


def test_no_profile_leaks_unexpected_keys_or_html():
    """Profiles are rendered with textContent, but keep data free of markup anyway."""
    bad = []
    for p in (WEB / "profiles").glob("*.json"):
        text = p.read_text()
        if re.search(r"<\s*(script|iframe|img|svg|object)\b", text, re.I) or "javascript:" in text.lower():
            bad.append(p.stem)
    assert not bad, bad


def test_subnational_units_only_override_known_regimes():
    for path in SUB:
        sub = Subnational.model_validate_json(path.read_text())
        parent = Jurisdiction.model_validate_json((ROOT / "data" / "jurisdictions" / f"{sub.parent}.json").read_text())
        ids = {r.id for r in parent.regimes}
        for u in sub.units:
            assert set(u.regime_overrides) <= ids, f"{u.code}: {set(u.regime_overrides) - ids}"


def test_knockouts_are_data_driven_and_excluded_from_scores():
    data = scores()["jurisdictions"]
    assert {k["id"] for k in data["RUS"]["ko"]} >= {"rule_of_law", "sanctions"}
    for safe in ("CHE", "CYP", "ARE", "SGP", "MUS", "CH-ZG"):
        assert not data[safe]["ko"], safe
    for jid, e in data.items():
        if e.get("ko"):
            assert e["default"]["status"] == "knocked_out" and e["default"]["score"] is None, jid
    # Regions inherit their country's knock-outs (same indicators).
    assert all(not data[r]["ko"] for r in data if data[r].get("parent") == "CHE")


# Earned income (Expat and Digital nomad personas) --------------------------------------------

INC = sorted((ROOT / "data" / "income").glob("*.json"))


@pytest.mark.parametrize("path", INC, ids=lambda p: p.stem)
def test_income_files_validate_and_have_a_dated_dossier(path):
    assert validate_file(path) == []
    md = ROOT / "docs" / "income" / f"{path.stem}.md"
    assert md.exists(), f"missing dossier {md.name}"
    text = md.read_text()
    m = re.search(r"^Last reviewed:\s*(\d{4}-\d{2}-\d{2})", text, re.M)
    assert m and m.group(1) == json.loads(path.read_text())["researched_on"], f"{md.name}: Last reviewed must equal researched_on"
    for section in ("## Sources", "## Change log"):
        assert section in text, f"{md.name} lacks '{section}'"
    urls = set(re.findall(r'"url":\s*"([^"]+)"', path.read_text()))
    missing = [u for u in urls if u.rstrip("/") not in text]
    assert not missing, f"{md.name} does not list {missing[:3]}"


@pytest.mark.parametrize("path", INC, ids=lambda p: p.stem)
def test_income_file_matches_a_map_unit(path):
    assert path.stem in scores()["jurisdictions"]


def test_foreign_income_reliefs_count_only_when_they_cover_local_work():
    """A nomad's fees for work done while living in a country are usually local-source income."""
    from domicile.earned import eligible

    for path in INC:
        rules = json.loads((WEB / "profiles" / f"{path.stem}.json").read_text())["income_rules"]
        for r in rules["regimes"]:
            if r["requires_foreign_income"] and r["covers_local_work"] is not True:
                for cz in r["eligible"]:
                    assert not eligible(r, "self_employment", cz, 1e9), (path.stem, r["id"])


def test_every_map_unit_has_both_income_personas():
    for jid, e in scores()["jurisdictions"].items():
        assert set(e["personas"]) == {"expat", "nomad"}, jid
        for p in e["personas"].values():
            if not p["researched"]:
                assert p["default"]["score"] is None and p["tax"] is None, jid


def test_expat_salary_multipliers_are_sourced_and_anchored():
    """Posting-allowance tables: every row cites a URL, the euro-area reference averages 1.0, and
    every researched country gets a multiplier (estimated only where no table lists it)."""
    import csv
    import statistics

    from domicile import cola

    src = cola.load_sources()
    assert {"us_dssr", "un_icsc", "eu_cc", "de_kaufkraft"} <= set(src)
    for name, s in src.items():
        assert s["meta"]["url"].startswith("https://"), name
        for iso, r in s["rows"].items():
            assert r["url"].startswith("https://"), (name, iso)
    cfg = scores()["meta"]["config"]
    ref = cfg["household_cost"]["euro_area_reference"]
    data = scores()["jurisdictions"]
    mults = {k: data[k]["personas"]["expat"]["salary_multiplier"] for k in (p.stem for p in INC)}
    assert all(v is not None for v in mults.values()), [k for k, v in mults.items() if v is None]
    assert abs(statistics.mean(mults[c] for c in ref if c in mults) - 1.0) < 0.05
    assert mults["CHE"] > mults["DEU"] > mults["ROU"]
