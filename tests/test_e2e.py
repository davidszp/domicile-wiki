"""End-to-end checks in a real browser, served with the production security headers.

Skipped automatically when Playwright or a Chromium binary is unavailable.
"""

import json
import os
import shutil
import threading

import pytest

from conftest import ROOT, scores

playwright = pytest.importorskip("playwright.sync_api")
CHROMIUM = os.environ.get("WEALTHMAP_CHROMIUM") or shutil.which("chromium") or shutil.which("google-chrome-stable")


@pytest.fixture(scope="module")
def server():
    from domicile.serve import serve

    httpd = serve(0)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    yield f"http://127.0.0.1:{httpd.server_address[1]}/"
    httpd.shutdown()


@pytest.fixture(scope="module")
def browser():
    with playwright.sync_playwright() as p:
        try:
            b = p.chromium.launch(executable_path=CHROMIUM) if CHROMIUM else p.chromium.launch()
        except Exception as e:  # pragma: no cover - environment dependent
            pytest.skip(f"no usable Chromium: {e}")
        yield b
        b.close()


def open_page(browser, server, width=1400, height=900, route="#/guided"):
    page = browser.new_page(viewport={"width": width, "height": height})
    problems = []
    page.on("console", lambda m: problems.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: problems.append(str(e)))
    page.goto(server + route)
    page.wait_for_function("() => window.domicileReady", timeout=20000)
    return page, problems



def test_loads_under_csp_without_errors(browser, server):
    page, problems = open_page(browser, server)
    assert page.locator(".globe-svg path.globe-land").count() > 200
    assert not problems, problems
    page.close()







@pytest.mark.parametrize("route", ["#/guided", "#/factbook/SWE", "#/factbook/index", "#/factbook/method", "#/factbook/sources",
                                   "#/explorer/table", "#/explorer/chart", "#/compare", "#/compare/calculator", "#/settings"])
def test_every_mode_renders(browser, server, route):
    page, problems = open_page(browser, server, route=route)
    page.wait_for_timeout(400)
    assert not page.query_selector("#stage .error"), route
    mode = route.split("/")[1]
    if mode == "settings":
        assert page.get_attribute("#open-settings", "aria-pressed") == "true"
    else:
        assert page.get_attribute(f"[data-mode={mode}]", "aria-current") == "page"
    assert page.locator(".globe-svg path.globe-land").count() > 100
    assert not problems, problems
    page.close()


def test_eu_members_are_marked(browser, server):
    page, problems = open_page(browser, server, route="#/factbook/DEU")
    page.wait_for_selector(".profile-head h2")
    assert page.locator(".profile-head .eu-badge").count() == 1
    page.goto(server + "#/factbook/GBR")
    page.reload()
    page.wait_for_selector(".profile-head h2")
    assert page.locator(".profile-head .eu-badge").count() == 0
    assert "Not in the EU" in page.inner_text(".profile-head")
    assert not problems, problems
    page.close()


def test_one_store_feeds_every_mode(browser, server):
    """A deal-breaker ticked in Guided filters Explorer's table; a place opened anywhere turns the globe."""
    page, problems = open_page(browser, server, route="#/guided")
    page.check("#g-euOnly")
    page.click("[data-mode=explorer]")
    page.wait_for_selector(".rank-table")
    assert page.is_checked("#f-euOnly")
    names = page.eval_on_selector_all(".rank-table tbody tr", "rs => rs.map(r => !!r.querySelector('.eu-badge'))")
    assert names and all(names)
    page.locator(".rank-table tbody tr .linklike").first.click()
    page.wait_for_selector(".profile-head h2")
    assert page.evaluate("() => location.hash.startsWith('#/factbook/')")
    assert page.locator(".globe-land.selected").count() == 1
    assert "null" not in page.inner_text("#globe-caption")
    page.go_back()
    page.wait_for_selector(".rank-table")
    assert not problems, problems
    page.close()


def test_compare_shows_changes_from_home(browser, server):
    page, problems = open_page(browser, server, route="#/compare")
    page.select_option("#cmp-home", "DEU")
    page.select_option("#cmp-add", "CZE")
    page.wait_for_selector(".compare-home .net-row")
    assert page.locator(".compare-home .net-row td.better").count() == 1
    assert not problems, problems
    page.close()

def test_weights_change_rankings_and_persist(browser, server):
    page, problems = open_page(browser, server, route="#/explorer/table")
    page.click("#tab-rankings")
    first = page.locator(".rank-table tbody tr").first.inner_text()
    page.click("#open-settings")
    page.click("text=Tax 80%")
    page.click("[data-mode=explorer]")
    page.click("#tab-rankings")
    assert page.locator(".rank-table tbody tr").count() > 10
    stored = page.evaluate("() => JSON.parse(localStorage.getItem('domicile:v1')).weights")
    tax = sum(stored[m] for m in ("capital_gains", "dividends", "wealth_tax", "inheritance"))
    assert abs(tax / sum(stored.values()) - 0.8) < 0.01
    assert first  # sanity
    assert not problems, problems
    page.close()


def test_mobile_layout_has_no_horizontal_scroll(browser, server):
    page, problems = open_page(browser, server, width=390, height=844, route="#/guided")
    overflow = page.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
    assert overflow <= 1
    page.fill("#search", "Monaco")
    page.keyboard.press("Enter")
    page.wait_for_selector(".profile-head h2")
    overflow = page.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
    assert overflow <= 1
    assert not problems, problems
    page.close()


def test_csv_export_is_formula_safe(browser, server):
    page, _ = open_page(browser, server, route="#/explorer/table")
    page.click("#tab-rankings")
    with page.expect_download() as dl:
        page.click("text=Export CSV")
    text = open(dl.value.path(), encoding="utf-8-sig").read()
    assert text.startswith('"rank","id","name"')
    assert '"=' not in text and '"+' not in text and '"@' not in text
    page.close()



def test_weight_slider_keeps_keyboard_focus(browser, server):
    page, problems = open_page(browser, server, route="#/settings")
    page.focus("#w-capital_gains")
    before = page.locator("#w-capital_gains").input_value()
    page.keyboard.press("ArrowRight")
    page.wait_for_timeout(200)
    assert page.evaluate("() => document.activeElement && document.activeElement.id") == "w-capital_gains"
    assert page.locator("#w-capital_gains").input_value() != before
    assert not problems, problems
    page.close()


def test_markdown_renderer_never_emits_script_or_javascript_links(browser, server):
    page, _ = open_page(browser, server, route="#/guided")
    result = page.evaluate("""async () => {
      const m = await import('/js/markdown.js');
      const el = m.renderMarkdown("[x](javascript:alert(1)) <script>alert(1)</script> [ok](https://example.org)");
      return { hrefs: [...el.querySelectorAll('a')].map(a => a.getAttribute('href')), scripts: el.querySelectorAll('script').length };
    }""")
    assert result["scripts"] == 0
    assert all(h and h.startswith("https://") for h in result["hrefs"]), result
    page.close()


def test_persona_switch_rescores_and_renders_every_panel(browser, server):
    page, problems = open_page(browser, server)
    page.click("[data-persona='nomad']")
    assert page.get_attribute("[data-persona='nomad']", "aria-pressed") == "true"
    assert page.is_hidden("#structures-wrap")
    page.fill("#search", "Thailand")
    page.keyboard.press("Enter")
    page.wait_for_selector("#panel .facts", timeout=10000)
    # A null child handed to the native append() prints "null"; profiles must never show it.
    assert " null" not in " " + page.inner_text("#panel").replace("\n", " ") + " ", "stray null in nomad profile"
    page.click("[data-persona='expat']")
    page.wait_for_timeout(1200)
    page.wait_for_selector("#panel .facts", timeout=10000)
    assert " null" not in " " + page.inner_text("#panel").replace("\n", " ") + " ", "stray null in expat profile"
    page.click("[data-persona='nomad']")
    page.click("[data-mode=explorer]")
    for tab in ("rankings", "chart"):
        page.click(f"#tab-{tab}")
        page.wait_for_timeout(150)
        assert not page.query_selector("#stage .error"), tab
    page.click("[data-mode=compare]")
    assert not page.query_selector("#stage .error")
    page.click("#cmp-tab-calculator")
    assert not page.query_selector("#stage .error")
    page.click("[data-mode=factbook]")
    page.click("#fb-method")
    assert page.inner_text("#panel h2").startswith("Methodology")
    page.click("#open-settings")
    assert "Digital nomad" in page.inner_text("#panel h2")
    # Back to the HNWI persona: its own weights and options return.
    page.click("[data-persona='family_office']")
    assert page.is_visible("#structures-wrap")
    page.reload()
    page.wait_for_selector("[data-persona='family_office'][aria-pressed='true']", timeout=20000)
    assert not problems, problems


def test_us_citizens_see_dollars_everyone_else_euros(browser, server):
    page, problems = open_page(browser, server)
    page.click("[data-persona='family_office']")
    page.select_option("#citizenship", "US")
    for mode, tab in (("explorer", "#tab-rankings"), ("compare", "#cmp-tab-calculator")):
        page.click(f"[data-mode={mode}]")
        page.click(tab)
        page.wait_for_timeout(600)
        text = page.inner_text("#panel")
        assert ("$" in text or "USD" in text) and "€" not in text and "EUR" not in text, (mode, text[:300])
    page.fill("#search", "Portugal")
    page.keyboard.press("Enter")
    page.wait_for_selector(".score-row", timeout=10000)
    page.wait_for_timeout(800)
    for f in page.query_selector_all("details.fold"):
        f.evaluate("d => d.open = true")
    assert "€" not in page.inner_text("#panel")
    page.select_option("#citizenship", "EU")
    page.click("[data-mode=explorer]")
    page.click("#tab-rankings")
    page.wait_for_timeout(600)
    text = page.inner_text("#panel")
    assert "€" in text and "$" not in text
    assert not problems, problems


def test_family_inheritance_filter_is_shared_by_explorer_and_guided(browser, server):
    """The filter needs both spouse and children tax-free: Germany (both taxed), France and Ireland (spouse only) drop out."""
    page, problems = open_page(browser, server, route="#/explorer/table")
    page.check("#f-familyInheritsFree")
    page.wait_for_timeout(300)
    names = page.eval_on_selector_all(".rank-table tbody tr td:nth-child(2) .linklike", "els => els.map(e => e.textContent)")
    assert names and "Germany" not in names and "France" not in names and "Netherlands" not in names
    assert "Ireland" not in names  # spouse exempt, but children are taxed
    page.click("[data-mode=guided]")
    assert page.is_checked("#g-familyInheritsFree")
    assert not problems, problems
    page.close()


def test_globe_follows_the_last_place_touched(browser, server):
    page, problems = open_page(browser, server, route="#/factbook/JPN")
    page.wait_for_selector(".profile-head h2")
    assert "Japan" in page.inner_text("#globe-caption")
    page.click("[data-mode=guided]")
    first = page.locator(".result").first
    name = first.locator("h4 .linklike").inner_text()
    first.locator("button", has_text="+ Compare").click()
    page.wait_for_timeout(200)
    assert f"Added to comparison: {name}" in page.inner_text("#globe-caption")
    page.click("[data-mode=compare]")
    page.select_option("#cmp-home", "DEU")
    page.wait_for_timeout(200)
    assert "Your home: Germany" in page.inner_text("#globe-caption")
    assert not problems, problems
    page.close()


def test_knockout_settings_apply_everywhere_and_persist(browser, server):
    """Keeping China in (Settings) takes it off Guided's left-out list, gives it a score, and survives a reload."""
    page, problems = open_page(browser, server, route="#/settings")
    page.evaluate("localStorage.removeItem('domicile:v1')")
    page.reload()
    page.wait_for_function("() => window.domicileReady")
    page.select_option("#ko-exempt-add", "CHN")
    page.wait_for_timeout(200)
    assert "China" in page.inner_text(".settings-card .saved-list")
    stored = page.evaluate("() => JSON.parse(localStorage.getItem('domicile:v1'))")
    assert stored["koExempt"] == ["CHN"]
    page.click("[data-mode=guided]")
    assert "China" not in page.inner_text(".leftout")
    page.goto(server + "#/factbook/CHN")
    page.reload()
    page.wait_for_selector(".profile-head h2")
    assert "Kept in by your settings" in page.inner_text("#panel")
    # Switching a whole rule off: no country stays ruled out for weak rule of law alone.
    page.goto(server + "#/settings")
    page.reload()
    page.wait_for_function("() => window.domicileReady")
    page.uncheck("#ko-rule_of_law")
    page.wait_for_timeout(200)
    assert "rule_of_law" in page.evaluate("() => JSON.parse(localStorage.getItem('domicile:v1')).koOff.family_office")
    page.evaluate("localStorage.removeItem('domicile:v1')")
    assert not problems, problems
    page.close()


def test_weight_sets_can_be_saved_used_and_exported(browser, server):
    page, problems = open_page(browser, server, route="#/settings")
    page.evaluate("localStorage.removeItem('domicile:v1')")
    page.reload()
    page.wait_for_function("() => window.domicileReady")
    page.click("text=Tax 80%")
    page.fill("#set-name", "Tax heavy")
    page.click("#set-save")
    page.click("text=Reset to defaults")
    page.wait_for_timeout(200)
    page.locator(".saved-list li", has_text="Tax heavy").locator("button", has_text="Use").click()
    page.wait_for_timeout(200)
    assert "Tax heavy" in page.inner_text(".saved-list") and "in use" in page.inner_text(".saved-list")
    assert "tax 80%" in page.inner_text("#weights-line")
    with page.expect_download() as dl:
        page.click("#settings-export")
    exported = json.loads(open(dl.value.path(), encoding="utf-8").read())
    assert exported["settings"]["weightSets"][0]["name"] == "Tax heavy"
    page.click(".settings-card [data-theme-choice=dark]")
    assert page.get_attribute("html", "data-theme") == "dark"
    assert page.get_attribute(".guide [data-theme-choice=dark]", "aria-pressed") == "true"  # the guide's switch follows
    with page.expect_download() as dl2:
        page.click("#settings-export")
    assert json.loads(open(dl2.value.path(), encoding="utf-8").read())["settings"]["theme"] == "dark"
    page.click(".guide [data-theme-choice=system]")
    page.evaluate("localStorage.removeItem('domicile:v1')")
    assert not problems, problems
    page.close()


def test_globe_zooms_and_finds_my_location(browser, server):
    ctx = browser.new_context(viewport={"width": 1400, "height": 900}, geolocation={"latitude": 38.72, "longitude": -9.14},
                              permissions=["geolocation"])
    page = ctx.new_page()
    problems = []
    page.on("pageerror", lambda e: problems.append(str(e)))
    page.goto(server + "#/guided")
    page.wait_for_function("() => window.domicileReady")
    tools = ".globe-tools button"
    assert page.locator(tools).nth(1).is_disabled()  # zoom out: already the whole globe
    box = page.locator(".globe-svg").bounding_box()
    page.mouse.move(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)
    page.mouse.wheel(0, -400)  # scroll up = zoom in
    page.wait_for_timeout(300)
    assert page.locator(tools).nth(1).is_enabled()
    page.locator(tools).nth(2).click()  # whole globe
    page.wait_for_timeout(1300)
    assert page.locator(tools).nth(1).is_disabled()
    page.click("#globe-locate")
    page.wait_for_function("() => document.querySelector('#globe-caption').textContent.includes('You are here')", timeout=5000)
    assert "Portugal" in page.inner_text("#globe-caption")
    assert not problems, problems
    ctx.close()


def test_northern_cyprus_is_an_occupied_territory_not_a_country(browser, server):
    """Located in south Nicosia (inside Natural Earth's coarse northern outline): the caption must say Cyprus."""
    ctx = browser.new_context(viewport={"width": 1400, "height": 900}, geolocation={"latitude": 35.1720, "longitude": 33.3615},
                              permissions=["geolocation"])
    page = ctx.new_page()
    problems = []
    page.on("pageerror", lambda e: problems.append(str(e)))
    page.goto(server + "#/factbook/index")
    page.wait_for_function("() => window.domicileReady")
    assert "Northern Cyprus" not in page.inner_text(".index") and "Turkish Republic" not in page.inner_text(".index")
    page.click("#globe-locate")
    page.wait_for_function("() => document.querySelector('#globe-caption').textContent.includes('You are here')", timeout=5000)
    caption = page.inner_text("#globe-caption")
    assert "Cyprus" in caption and "Northern" not in caption, caption
    page.goto(server + "#/factbook/CYN")
    page.reload()
    page.wait_for_selector(".profile-head h2")
    assert page.inner_text(".profile-head h2") == "Northern Cyprus (occupied)"
    assert "Occupied territory" in page.inner_text("#panel") and "541" in page.inner_text("#panel")
    assert not problems, problems
    ctx.close()


def test_back_returns_to_the_previous_mode_not_the_previous_country(browser, server):
    page, problems = open_page(browser, server, route="#/guided")
    for name in ("Portugal", "Spain", "Italy"):
        page.fill("#search", name)
        page.keyboard.press("Enter")
        page.wait_for_selector(".profile-head h2")
    assert page.evaluate("() => location.hash") == "#/factbook/ITA"
    page.go_back()
    page.wait_for_selector("[data-mode=guided][aria-current=page]")
    assert not problems, problems
    page.close()



@pytest.mark.parametrize("query,name", [("Zug", "Zug"), ("Monaco", "Monaco"), ("Cayman", "Cayman Islands"), ("Bermuda", "Bermuda")])
def test_small_places_and_regions_are_reachable_by_search(browser, server, query, name):
    page, problems = open_page(browser, server)
    page.fill("#search", query)
    page.keyboard.press("Enter")
    page.wait_for_selector(".profile-head h2")
    assert page.locator(".profile-head h2").inner_text().startswith(name)
    assert not problems, problems
    page.close()


def test_old_map_links_open_the_table(browser, server):
    page, problems = open_page(browser, server, route="#/explorer/map")
    page.wait_for_selector(".rank-table")
    assert page.evaluate("() => location.hash") == "#/explorer/table"
    assert page.locator("#tab-map").count() == 0
    assert not problems, problems
    page.close()


def test_calculator_starts_from_the_market_assumptions(browser, server):
    """The calculator's yield, price return and realised share come from scoring_config.market."""
    page, problems = open_page(browser, server, route="#/compare/calculator")
    page.click("[data-persona='family_office']")
    page.click("#cmp-tab-calculator")
    page.wait_for_selector("#c-dividend_yield")
    m = json.loads((ROOT / "data" / "scoring_config.json").read_text())["market"]
    for k in ("dividend_yield", "price_growth", "realisation"):
        assert float(page.input_value(f"#c-{k}")) == pytest.approx(m[k] * 100), k
    assert not page.query_selector("#stage .error")
    assert not problems, problems


def test_hnwi_page_shows_the_60_year_projection(browser, server):
    """Countries with a recipe show one line per way of holding the portfolio; others show no section."""
    page, problems = open_page(browser, server, route="#/factbook/DEU")
    page.click("[data-persona='family_office']")
    page.wait_for_selector(".proj-chart")
    paths = scores()["jurisdictions"]["DEU"]["projection"]
    assert page.locator(".proj-chart .proj-line").count() == len([k for k in paths if k != "no_tax"])
    assert "After 60 years" in page.inner_text("details:has(.proj-chart)")
    page.goto(server + "#/factbook/FRA")
    page.wait_for_selector(".facts")
    assert page.locator(".proj-chart").count() == 0
    assert not problems, problems
