"""The browser (web/js) and Python (domicile/) engines must agree exactly."""

import json
import shutil
import subprocess
from dataclasses import asdict

import pytest

from conftest import ROOT, WEB, scores
from domicile import scoring
from domicile.build import summarize
from domicile.taxcalc import Profile, Rules, annual_taxes, transfer_taxes

PROFILES = [
    Profile(),
    Profile(portfolio=5e6, net_wealth=6e6, realized_gains=2e5, dividends=1e5, estate=6e6, children=1, foreign_share=0.5),
    Profile(portfolio=400e6, net_wealth=500e6, realized_gains=20e6, dividends=8e6, estate=500e6, children=4,
            real_estate_local=40e6, real_estate_foreign=20e6, foreign_share=1.0),
]


@pytest.fixture(scope="module")
def js():
    if not shutil.which("node"):
        pytest.skip("node not installed")
    out = subprocess.run(["node", str(ROOT / "tests" / "js" / "parity_runner.mjs"), json.dumps([asdict(p) for p in PROFILES])],
                         check=True, capture_output=True, text=True, cwd=ROOT)
    return json.loads(out.stdout)


def close(a, b):
    if a is None or b is None:
        return a is None and b is None
    return abs(a - b) <= 0.01 + 1e-9 * abs(b)


@pytest.mark.parametrize("scenario", ["default", "custom", "toggles"])
def test_overall_scores_match_python(js, scenario):
    cfg = scoring.load_config()
    weights = js["evals"]["customWeights"] if scenario == "custom" else None
    flags = dict(include_activity=True, include_structures=False) if scenario == "toggles" else {}
    data = scores()["jurisdictions"]
    profiles = {p.stem: json.loads(p.read_text()) for p in (WEB / "profiles").glob("*.json")}
    mismatches = []
    for jid, e in data.items():
        prof = profiles[jid]
        tax = prof.get("tax_detail") if e["researched"] else None
        entry = {"tax": tax, "nontax": prof["nontax_detail"], "verification": e.get("verification"), "ko": e.get("ko")}
        for cz in ("EU", "US", "OTHER"):
            py = summarize(entry, cfg, cz, weights, **flags)
            j = js["evals"][scenario][jid][cz]
            if not (close(py["score"], j["score"]) and close(py["tax_score"], j["tax_score"])
                    and py["status"] == j["status"] and py["regime"] == j["regime"]):
                mismatches.append((jid, cz, py, j))
    assert not mismatches, mismatches[:5]


def test_tax_calculator_matches_python(js):
    bad = []
    for p in (WEB / "profiles").glob("*.json"):
        prof = json.loads(p.read_text())
        std = Rules(**prof["rules"]["standard"]) if prof.get("rules") and "standard" in prof["rules"] else None
        for rid, r in (prof.get("rules") or {}).items():
            rules = Rules(**r)
            for i, pr in enumerate(PROFILES):
                py_a = annual_taxes(rules, pr, None if rid == "standard" else std)
                py_t = transfer_taxes(rules, pr)
                j = js["calcs"][f"{prof['id']}/{rid}"][i]
                for k, v in py_a.items():
                    if not close(v, j["annual"][k]):
                        bad.append((prof["id"], rid, i, k, v, j["annual"][k]))
                if not close(py_t, j["transfer"]):
                    bad.append((prof["id"], rid, i, "transfer", py_t, j["transfer"]))
    assert not bad, bad[:5]


@pytest.mark.parametrize("persona", ["expat", "nomad"])
def test_persona_scores_match_python(js, persona):
    from domicile.build import summarize_persona

    cfg = scoring.load_config()
    pcfg = cfg["personas"][persona]
    data = scores()["jurisdictions"]
    profiles = {p.stem: json.loads(p.read_text()) for p in (WEB / "profiles").glob("*.json")}
    mismatches = []
    for jid in data:
        block = profiles[jid]["persona_detail"][persona]
        for cz in ("EU", "US", "OTHER"):
            py = summarize_persona(block, pcfg, cfg, cz)
            j = js["personas"][persona][jid][cz]
            if not (close(py["score"], j["score"]) and close(py["tax_score"], j["tax_score"])
                    and py["status"] == j["status"] and py["regime"] == j["regime"]):
                mismatches.append((jid, cz, py, j))
    assert not mismatches, mismatches[:5]


def test_earned_income_calculator_matches_python(js):
    from domicile.earned import persona_rows

    cfg = scoring.load_config()
    bad = []
    for jid, results in js["earned"].items():
        rules = json.loads((WEB / "profiles" / f"{jid}.json").read_text())["income_rules"]
        i = 0
        for income in js["incomes"]:
            for kind in ("employment", "self_employment"):
                for cz in ("EU", "US", "OTHER"):
                    py = persona_rows(rules, {"income_kind": kind, "horizon_years": 3}, cz, income, cfg)
                    j = results[i]
                    i += 1
                    got = [(r["id"], r["cost"], r["scores"]["income_tax"], r["detail"]["total"]) for r in py]
                    want = [(r["id"], r["cost"], r["score"], r["total"]) for r in j]
                    if len(got) != len(want) or any(a[0] != b[0] or abs(a[1] - b[1]) > 1 or not close(a[2], b[2]) or not close(a[3], b[3])
                                                    for a, b in zip(got, want)):
                        bad.append((jid, income, kind, cz, got, want))
    assert js["earned"], "no income rules in the build"
    assert not bad, bad[:3]
