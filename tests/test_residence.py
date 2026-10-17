"""The 'Residence for you' summary (domicile.build.residence_summary): which route a reader is shown."""

import pytest

from domicile.build import MEANS_KINDS, residence_summary
from domicile.schema import ImmigrationFile

FX = {"rates": {"EUR": {"per_eur": 1.0}, "USD": {"per_eur": 1.1}}}
SRC = [{"title": "t", "url": "https://example.org/", "publisher": "p", "kind": "government"}]


def route(rid, kind, cz=("EU", "US", "OTHER"), status="open", inv=None, inc=None, some=False):
    return {"id": rid, "name": rid, "kind": kind, "citizenships": list(cz), "status": status,
            "status_note": "" if status == "open" else "closed in 2025 by law",
            "grants": "temporary_residence", "summary": "x" * 20, "requirements": "x" * 20, "physical_presence": "none required",
            "minimum_investment": inv and {"amount": inv, "currency": "EUR"},
            "minimum_income": inc and {"amount": inc, "currency": "EUR"},
            "only_some_nationalities": some, "sources": SRC}


def file(iso, *routes):
    return ImmigrationFile.model_validate({"id": iso, "name": iso, "researched_on": "2026-10-16", "summary": "x" * 40,
                                           "naturalisation": "x" * 20, "dual_citizenship": None, "routes": list(routes)})


def test_free_movement_beats_any_paid_route():
    s = residence_summary(file("PRT", route("gv", "investor_residence", inv=250_000), route("fm", "free_movement", cz=["EU"])), FX)
    assert s["EU"]["kind"] == "free_movement"
    assert s["US"]["id"] == "gv"


def test_a_route_without_investment_beats_a_golden_visa():
    s = residence_summary(file("ESP", route("gv", "investor_residence", inv=500_000), route("nlv", "passive_income", inc=28_800)), FX)
    assert s["OTHER"]["id"] == "nlv" and s["OTHER"]["income_eur"] == 28_800


def test_closed_and_nationality_limited_routes_are_never_the_summary():
    s = residence_summary(file("PAN", route("old", "investor_residence", inv=1, status="closed_to_new"),
                               route("friendly", "investor_residence", inv=2, some=True),
                               route("qi", "investor_residence", inv=300_000)), FX)
    assert s["US"]["id"] == "qi"


def test_work_and_other_routes_are_not_routes_money_can_buy():
    s = residence_summary(file("NOR", route("job", "work", cz=["US", "OTHER"]), route("lump", "other")), FX)
    assert s["US"] == {"kind": "none"}


def test_expats_get_the_work_permit_with_a_known_salary_threshold():
    f = file("DEU", route("vague", "work"), route("blue", "work", inc=50_700), route("rich", "passive_income"))
    s = residence_summary(f, FX, {"free_movement", "work"})
    assert s["OTHER"]["id"] == "blue"


def test_nomads_also_see_nomad_visas():
    f = file("GRC", route("dnv", "digital_nomad", inc=42_000), route("gv", "investor_residence", inv=250_000))
    assert residence_summary(f, FX)["US"]["id"] == "gv"
    assert residence_summary(f, FX, MEANS_KINDS | {"digital_nomad"})["US"]["id"] == "dnv"


def test_us_citizens_are_citizens_in_the_usa():
    assert residence_summary(file("USA", route("eb5", "investor_residence", cz=["EU", "OTHER"], inv=800_000)), FX)["US"] == {"kind": "citizen"}


def test_a_summary_route_in_an_unknown_currency_fails_the_build():
    bad = route("x", "investor_residence", inv=1)
    bad["minimum_investment"] = {"amount": 1, "currency": "UYI"}
    with pytest.raises(SystemExit):
        residence_summary(file("URY", bad), FX)


def test_a_route_with_capped_places_comes_after_one_open_to_all_and_says_so():
    """Liechtenstein's 16 permits a year: a quota route is shown only when nothing open to all who qualify exists."""
    quota = {**route("quota", "passive_income"), "limited_places": "16 permits a year"}
    s = residence_summary(file("LIE", quota, route("gv", "investor_residence", inv=1_000_000)), FX)
    assert s["EU"]["id"] == "gv" and "limited" not in s["EU"]
    s = residence_summary(file("LIE", quota), FX)
    assert s["EU"]["limited"] == "16 permits a year"
