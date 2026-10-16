"""User-journey fuzzer: simulated visitors with a motivation click through domicile.wiki.

    uv run python tools/fuzz/journeys.py [--out .fuzz-out] [--only hnwi,student,...]

Each journey records a screenshot per step, runs the automatic checks in harness.py, and notes where
the site does not give the visitor what they came for (`expect`). Read <out>/<journey>/report.md and
the screenshots next to it; <out>/README.md lists every finding.
"""

from __future__ import annotations

import argparse
from pathlib import Path

from playwright.sync_api import sync_playwright

from harness import ROOT, Journey, launch, ready, start_server, timed


def fold(page, title: str):
    """Open a folded section by its heading."""
    page.locator("details.fold > summary", has_text=title).first.click()


# --------------------------------------------------------------------------------------------- journeys

def hnwi_family(j: Journey, page, base: str):
    ready(page, base)
    j.step("Lands on the site")
    j.expect(page.get_attribute("[data-guided-persona=family_office]", "aria-pressed") == "true", "HNWI is not preselected for a first visit")
    page.click(".choice:has-text('Low taxes on gains')")
    page.click(".choice:has-text('Schools, healthcare')")
    j.step("Picks low taxes and schools as priorities")
    page.check("#g-euOnly")
    page.check("#g-familyInheritsFree")
    j.step("Deal-breakers: stay in the EU, spouse and children inherit tax-free", full_page=True)
    names = page.eval_on_selector_all(".result-main h4 .linklike", "els => els.map(e => e.textContent)")
    j.expect(len(names) >= 3, f"fewer than 3 results for an EU family wanting tax-free inheritance: {names}")
    j.expect("Germany" not in names, "Germany (heavy inheritance tax) is still suggested")
    j.expect(page.locator(".result .eu-badge").count() == len(names), "a result without the EU tag although 'Must be in the EU' is ticked")
    for i in range(min(3, len(names))):
        page.locator(".result").nth(i).locator("button", has_text="+ Compare").click()
    j.step("Adds the top three to the comparison")
    page.locator(".result-main h4 .linklike").first.click()
    page.wait_for_selector(".profile-head h2")
    j.step(f"Opens the top result: {names[0] if names else '?'}")
    facts = page.inner_text("#panel .facts")
    j.expect("Residence for you" in facts and "free" in facts, f"no 'free, EU citizen' residence line in the key facts: {facts[:200]}")
    j.expect("Spouse inherits" in facts, "no spouse line in the key facts")
    fold(page, "Immigration paths")
    j.step("Reads the immigration paths", full_page=True)
    page.click("[data-mode=compare]")
    page.select_option("#cmp-home", "DEU")
    j.step("Compare: home Germany against the three", full_page=True)
    nets = page.eval_on_selector_all(".net-row td", "els => els.map(e => e.textContent)")
    j.expect(any(t.startswith("+") for t in nets), f"no place is cheaper than Germany for this family: {nets}")
    page.click("#cmp-tab-calculator")
    j.step("Opens the tax calculator", full_page=True)
    page.click("#open-settings")
    page.fill("#set-name", "Our family")
    page.click("#set-save")
    j.step("Saves the weights as 'Our family'")
    page.reload()
    page.wait_for_function("() => window.domicileReady")
    j.step("Comes back later (reload)")
    j.expect("Our family" in page.inner_text("#stage"), "saved weights gone after a reload")


def asian_student(j: Journey, page, base: str):
    ready(page, base)
    j.step("Lands on the site")
    j.note("No 'student' persona exists; the closest are Expat (employee) and Digital nomad.")
    page.click("[data-guided-persona=expat]")
    page.click(".choice:has-text('Another passport')")
    page.check("#g-euOnly")
    j.step("Chooses Expat, another passport (Vietnam), EU only", full_page=True)
    page.fill("#search", "student")
    j.step("Searches for 'student'")
    j.expect(page.locator("#search-results li").count() > 0, "searching 'student' finds nothing (search covers place names only)")
    page.fill("#search", "")
    page.keyboard.press("Escape")
    page.fill("#search", "Germany")
    page.keyboard.press("Enter")
    page.wait_for_selector(".profile-head h2")
    j.step("Opens Germany")
    fold(page, "Immigration paths")
    j.step("Immigration paths for 'other passports'", full_page=True)
    text = page.inner_text("#panel")
    j.expect("student" in text.lower() or "study" in text.lower(), "no study or student route in Germany's immigration paths")
    j.expect("Chancenkarte" in text or "Opportunity" in text, "the job-seeker Opportunity Card (Chancenkarte) is not mentioned")
    page.click("[data-mode=factbook]")
    page.click("#fb-index")
    j.step("Browses all countries (EU only stays ticked?)", full_page=True)
    j.expect(page.is_checked("#index-eu"), "the EU-only choice from Guided is not carried into the Factbook index")
    page.click("[data-mode=explorer]")
    page.select_option("#f-sort", "cost")
    j.step("Explorer: sorts by living costs, cheapest first", full_page=True)
    first = page.locator(".rank-table tbody tr").first.inner_text()
    j.note(f"cheapest EU place for an expat: {first.splitlines()[1] if len(first.splitlines()) > 1 else first}")


def lebanese_expat(j: Journey, page, base: str):
    ready(page, base)
    page.click("#persona [data-persona=expat]")
    page.select_option("#citizenship", "OTHER")
    j.step("Expat, Lebanese passport (other), first visit")
    page.click("[data-mode=compare]")
    has_lbn = page.locator("#cmp-home option[value=LBN]").count() > 0
    j.step("Compare: looks for Lebanon as home")
    j.expect(has_lbn, "Lebanon cannot be chosen as home in Compare (only researched countries are listed)")
    if has_lbn:
        page.select_option("#cmp-home", "LBN")
    for c in ("CYP", "GRC", "MLT", "ITA", "ESP"):
        if page.locator("#cmp-add").is_disabled():
            j.note(f"Compare is full before {c}: home plus four places at most")
            break
        if page.locator(f"#cmp-add option[value={c}]").count():
            page.select_option("#cmp-add", c)
            page.wait_for_timeout(150)
    j.step("Adds Mediterranean options: Cyprus, Greece, Malta, Italy, Spain", full_page=True)
    j.expect(page.locator(".compare-home th[scope=col]").count() >= 4, "could not add four Mediterranean countries")
    row = page.locator(".compare-home tr", has_text="Residence route for you").inner_text()
    j.note(f"residence row for a Lebanese expat: {row.replace(chr(9), ' | ')}")
    page.click("[data-mode=explorer]")
    page.click("#tab-rankings")
    j.expect(page.locator("#f-mediterranean").count() == 1, "no Mediterranean filter in Explorer")
    page.check("#f-mediterranean")
    j.step("Table: countries on the Mediterranean, ranked for an expat", full_page=True)
    names = page.eval_on_selector_all(".rank-table tbody tr td:nth-child(2) .linklike", "els => els.map(e => e.textContent)")
    j.expect(names and all(n in {"Spain", "France", "Monaco", "Italy", "Malta", "Slovenia", "Croatia", "Bosnia and Herzegovina", "Montenegro",
                                 "Albania", "Greece", "Turkey", "Türkiye", "Cyprus", "Syria", "Lebanon", "Israel", "Egypt", "Libya", "Tunisia",
                                 "Algeria", "Morocco", "Gibraltar"} for n in names), f"non-Mediterranean countries in the list: {names}")


def us_nomad(j: Journey, page, base: str):
    ready(page, base)
    page.click("#persona [data-persona=nomad]")
    page.select_option("#citizenship", "US")
    j.step("Digital nomad with a US passport")
    j.expect("$" in page.inner_text("#stage"), "US citizen does not see dollars in Guided")
    page.click("[data-mode=explorer]")
    page.click("#tab-chart")
    j.step("Explorer chart", wait=800)
    dots = page.locator(".chart-svg .dot")
    j.expect(dots.count() > 20, f"chart shows only {dots.count()} places")
    page.locator(".chart-svg .dot", has_text="Lisbon").count()
    page.fill("#search", "Portugal")
    page.keyboard.press("Enter")
    page.wait_for_selector(".profile-head h2")
    j.step("Opens Portugal", full_page=True)
    fold(page, "Immigration paths")
    j.step("Looks for the nomad visa", full_page=True)
    j.expect("D8" in page.inner_text("#panel") or "nomad" in page.inner_text("#panel").lower(), "Portugal's digital nomad visa (D8) not visible")
    page.click("#globe-locate")
    page.wait_for_timeout(1800)
    j.step("Presses 'My location' (Austin, Texas)")
    j.expect("United States" in page.inner_text("#globe-caption"), f"location caption: {page.inner_text('#globe-caption')}")


def phone_gulf_investor(j: Journey, page, base: str):
    ready(page, base)
    j.step("Opens the site on a phone")
    page.select_option("#citizenship", "OTHER")
    page.click("[data-mode=factbook]")
    page.fill("#index-filter", "Mon")
    j.step("Factbook index, filters for 'Mon'", full_page=True)
    page.locator(".index-list .linklike", has_text="Monaco").click()
    page.wait_for_selector(".profile-head h2")
    j.step("Reads Monaco", full_page=True)
    page.fill("#search", "Hong Kong")
    page.keyboard.press("Enter")
    page.wait_for_selector(".profile-head h2")
    j.step("Reads Hong Kong: ranked, with a red flag", full_page=True)
    text = page.inner_text("#panel")
    j.expect("Red flag" in text and "national" in text.lower(), "Hong Kong's red flag (national-security regime) is not shown on its page")
    page.click("[data-mode=explorer]")
    page.click("#tab-rankings")
    j.step("Explorer table: is the red flag visible in the list?", full_page=True)
    row = page.locator(".rank-table tbody tr", has_text="Hong Kong")
    j.expect(row.count() == 1 and "Red flag" in row.inner_text(), "Hong Kong is missing from the table or has no red-flag tag")

JOURNEYS = {
    "hnwi": ("German entrepreneur family", "Sold their company (about EUR 30M), three children at school; Germany's inheritance tax worries them; they want to stay in the EU.", hnwi_family, {}),
    "student": ("Student from Vietnam", "Wants a master's degree in the EU and then a job there; money is tight, safety matters.", asian_student, {}),
    "lebanon": ("Engineer from Lebanon", "Wants an expat job somewhere around the Mediterranean, close to family, with a realistic residence permit.", lebanese_expat, {}),
    "nomad": ("US software freelancer", "Wants two years as a digital nomad somewhere cheaper with good internet and a nomad visa.", us_nomad,
              {"geolocation": {"latitude": 30.27, "longitude": -97.74}, "permissions": ["geolocation"]}),
    "phone": ("Gulf investor on a phone", "Browsing on the go: Monaco looks attractive; also weighing Hong Kong and its political risk.", phone_gulf_investor,
              {"viewport": {"width": 390, "height": 844}, "is_mobile": True, "has_touch": True}),
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(ROOT / ".fuzz-out"))
    ap.add_argument("--only", default="")
    args = ap.parse_args()
    out = Path(args.out)
    only = {x for x in args.only.split(",") if x}
    httpd, base = start_server()
    summary = []
    with sync_playwright() as p:
        browser = launch(p)
        for key, (who, why, fn, ctx_opts) in JOURNEYS.items():
            if only and key not in only:
                continue
            jdir = out / key
            jdir.mkdir(parents=True, exist_ok=True)
            for old in jdir.glob("*.png"):
                old.unlink()
            j = Journey(key, who, why, jdir)
            ctx = browser.new_context(**({"viewport": {"width": 1440, "height": 900}} | ctx_opts))
            page = j.attach(ctx.new_page())
            try:
                ms = timed(lambda: fn(j, page, base))
                j.note(f"journey took {ms / 1000:.1f} s")
            except Exception as e:  # a crash is a finding too
                j.findings.append(__import__("harness").Finding(j.steps[-1]["title"] if j.steps else "-", "crash", repr(e)[:500]))
                try:
                    j.step("State at the crash")
                except Exception:
                    pass
            j.write()
            ctx.close()
            summary.append((key, who, j.findings))
        browser.close()
    httpd.shutdown()
    lines = ["# Journey fuzzer findings", ""]
    for key, who, findings in summary:
        lines += [f"## {key}: {who}", ""] + ([f"- [{f.kind}] {f.step}: {f.detail}" for f in findings] or ["- none"]) + [""]
    (out / "README.md").write_text("\n".join(lines))
    print("\n".join(lines))


if __name__ == "__main__":
    main()
