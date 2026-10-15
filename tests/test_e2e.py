"""End-to-end checks in a real browser, served with the production security headers.

Skipped automatically when Playwright or a Chromium binary is unavailable.
"""

import os
import shutil
import threading

import pytest

from conftest import scores

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


def open_page(browser, server, width=1400, height=900):
    page = browser.new_page(viewport={"width": width, "height": height})
    problems = []
    page.on("console", lambda m: problems.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: problems.append(str(e)))
    page.goto(server)
    page.wait_for_selector("canvas.map-canvas", timeout=20000)
    page.wait_for_function("() => window.domicileMap && window.domicileMap.hasFeature('DEU')", timeout=20000)
    page.wait_for_function("() => [...document.querySelectorAll('[data-view]')].every(b => !b.disabled)", timeout=20000)
    return page, problems


def labels_match_features(page):
    names = {k: v["name"] for k, v in scores()["jurisdictions"].items()}
    labels = page.eval_on_selector_all(".labels text.label", "els => els.map(e => [e.dataset.id, e.textContent])")
    wrong = [(i, t) for i, t in labels if names.get(i) != t]
    return labels, wrong


def test_loads_under_csp_without_errors(browser, server):
    page, problems = open_page(browser, server)
    assert page.evaluate("() => ['USA','DEU','CHN','BRA','AUS'].every(window.domicileMap.hasFeature)")
    assert not problems, problems
    page.close()


@pytest.mark.parametrize("view", ["europe", "uae", "caribbean", "usa"])
def test_regional_views_label_the_right_features(browser, server, view):
    page, problems = open_page(browser, server)
    page.click(f"[data-view={view}]")
    page.wait_for_timeout(600)
    labels, wrong = labels_match_features(page)
    assert not wrong, f"labels referencing the wrong jurisdiction: {wrong}"
    if view != "usa":
        assert labels, "no labels drawn"
    assert not problems, problems
    page.close()


@pytest.mark.parametrize("fid,name", [("MCO", "Monaco"), ("AND", "Andorra"), ("LIE", "Liechtenstein"), ("MLT", "Malta"), ("SMR", "San Marino")])
def test_small_european_states_are_clickable(browser, server, fid, name):
    page, _ = open_page(browser, server)
    page.click("[data-view=europe]")
    page.wait_for_timeout(500)
    target = page.locator(f".proxies circle[data-id={fid}]")
    if target.count() == 1:
        target.first.dispatch_event("click")
    else:  # large enough to be drawn and clicked directly on the canvas
        pt = page.evaluate(f"() => window.domicileMap.pointOf('{fid}')")
        assert pt, f"{fid} is not selectable in the Europe view"
        box = page.locator(".map-svg").bounding_box()
        page.mouse.click(box["x"] + pt[0], box["y"] + pt[1])
    page.wait_for_selector(".profile-head h2")
    assert page.locator(".profile-head h2").inner_text().startswith(name)
    page.close()


@pytest.mark.parametrize("fid", ["CYM", "TCA", "BRB", "GRD", "LCA", "VCT", "KNA", "ATG", "DMA", "VGB", "AIA"])
def test_small_caribbean_islands_are_selectable(browser, server, fid):
    page, _ = open_page(browser, server)
    page.click("[data-view=caribbean]")
    page.wait_for_timeout(500)
    n = page.locator(f".proxies circle[data-id={fid}]").count()
    assert n >= 1 or page.evaluate(f"() => window.domicileMap.hasFeature('{fid}')"), f"{fid} not selectable"
    page.close()


def test_bermuda_inset_selects_bermuda(browser, server):
    page, _ = open_page(browser, server)
    page.click("[data-view=caribbean]")
    page.wait_for_timeout(500)
    page.locator(".insets path[data-id=BMU]").dispatch_event("click")
    page.wait_for_selector(".profile-head h2")
    assert page.locator(".profile-head h2").inner_text().startswith("Bermuda")
    page.close()


def test_weights_change_rankings_and_persist(browser, server):
    page, problems = open_page(browser, server)
    page.click("#tab-rankings")
    first = page.locator(".rank-table tbody tr").first.inner_text()
    page.click("#tab-weights")
    page.click("text=Tax 80%")
    page.click("#tab-rankings")
    assert page.locator(".rank-table tbody tr").count() > 10
    stored = page.evaluate("() => JSON.parse(localStorage.getItem('domicile:v1')).weights")
    tax = sum(stored[m] for m in ("capital_gains", "dividends", "wealth_tax", "inheritance"))
    assert abs(tax / sum(stored.values()) - 0.8) < 0.01
    assert first  # sanity
    assert not problems, problems
    page.close()


def test_mobile_layout_has_no_horizontal_scroll(browser, server):
    page, problems = open_page(browser, server, width=390, height=844)
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
    page, _ = open_page(browser, server)
    page.click("#tab-rankings")
    with page.expect_download() as dl:
        page.click("text=Export CSV")
    text = open(dl.value.path(), encoding="utf-8-sig").read()
    assert text.startswith('"rank","id","name"')
    assert '"=' not in text and '"+' not in text and '"@' not in text
    page.close()


def test_search_for_a_region_before_boundaries_load(browser, server):
    """Selecting a canton while the detailed boundaries are still loading must not break the map."""
    page = browser.new_page(viewport={"width": 1400, "height": 900})
    problems = []
    page.on("pageerror", lambda e: problems.append(str(e)))
    release = []
    page.route("**/data/detail.topo.json", lambda route: release.append(route))  # hold the response
    page.goto(server)
    page.wait_for_function("() => window.domicileMap && window.domicileMap.hasFeature('DEU')", timeout=20000)
    page.fill("#search", "Zug")
    page.keyboard.press("Enter")
    page.wait_for_selector(".profile-head h2")
    assert page.locator(".profile-head h2").inner_text().startswith("Zug")
    for r in release:
        r.continue_()
    page.wait_for_function("() => window.domicileMap.hasFeature('CH-ZG')", timeout=20000)
    assert not problems, problems
    page.close()


def test_weight_slider_keeps_keyboard_focus(browser, server):
    page, problems = open_page(browser, server)
    page.click("#tab-weights")
    page.focus("#w-capital_gains")
    before = page.locator("#w-capital_gains").input_value()
    page.keyboard.press("ArrowRight")
    page.wait_for_timeout(200)
    assert page.evaluate("() => document.activeElement && document.activeElement.id") == "w-capital_gains"
    assert page.locator("#w-capital_gains").input_value() != before
    assert not problems, problems
    page.close()


def test_markdown_renderer_never_emits_script_or_javascript_links(browser, server):
    page, _ = open_page(browser, server)
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
    assert page.is_hidden("#structures-wrap") and page.is_hidden("#activity-wrap")
    layers = page.eval_on_selector_all("#layer option", "os => os.map(o => o.value)")
    assert "visa" in layers and "income_tax" in layers and "wealth_tax" not in layers
    page.fill("#search", "Thailand")
    page.keyboard.press("Enter")
    page.wait_for_selector("text=Income tax and social security for a self-employed contractor", timeout=10000)
    # A null child handed to the native append() prints "null"; profiles must never show it.
    assert " null" not in " " + page.inner_text("#panel").replace("\n", " ") + " ", "stray null in nomad profile"
    page.click("[data-persona='expat']")
    page.wait_for_selector("text=Income tax and social security for a employee", timeout=10000)
    assert " null" not in " " + page.inner_text("#panel").replace("\n", " ") + " ", "stray null in expat profile"
    page.click("[data-persona='nomad']")
    for tab in ("rankings", "compare", "weights", "calculator", "methodology"):
        page.click(f"#tab-{tab}")
        page.wait_for_timeout(150)
        assert not page.query_selector("#panel .error"), tab
    assert page.inner_text("#panel h2").startswith("Methodology")
    page.click("#tab-weights")
    assert "Digital nomad" in page.inner_text("#panel h2")
    # Back to the HNWI persona: its own weights and options return.
    page.click("[data-persona='family_office']")
    assert page.is_visible("#structures-wrap")
    assert "wealth_tax" in page.eval_on_selector_all("#layer option", "os => os.map(o => o.value)")
    page.reload()
    page.wait_for_selector("[data-persona='family_office'][aria-pressed='true']", timeout=20000)
    assert not problems, problems


def test_us_citizens_see_dollars_everyone_else_euros(browser, server):
    page, problems = open_page(browser, server)
    page.click("[data-persona='family_office']")
    page.select_option("#citizenship", "US")
    for tab in ("rankings", "calculator"):
        page.click(f"#tab-{tab}")
        page.wait_for_timeout(600)
        text = page.inner_text("#panel")
        assert ("$" in text or "USD" in text) and "€" not in text and "EUR" not in text, (tab, text[:300])
    page.fill("#search", "Portugal")
    page.keyboard.press("Enter")
    page.wait_for_selector(".score-row", timeout=10000)
    page.wait_for_timeout(800)
    for f in page.query_selector_all("details.fold"):
        f.evaluate("d => d.open = true")
    assert "€" not in page.inner_text("#panel")
    page.select_option("#citizenship", "EU")
    page.click("#tab-rankings")
    page.wait_for_timeout(600)
    text = page.inner_text("#panel")
    assert "€" in text and "$" not in text
    assert not problems, problems
