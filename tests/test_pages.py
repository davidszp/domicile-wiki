"""The static text pages for search engines and agents (domicile/pages.py), as written by the build."""

import json
import re
from html.parser import HTMLParser
from pathlib import Path

import pytest

from domicile import pages

WEB = Path(__file__).resolve().parent.parent / "web"
SCORES = json.loads((WEB / "data" / "scores.json").read_text())["jurisdictions"]
PAGES = pages.paths(SCORES)


class Page(HTMLParser):
    def __init__(self, text: str):
        super().__init__()
        self.tags: list[tuple[str, dict]] = []
        self.scripts: list[tuple[dict, str]] = []
        self._script: dict | None = None
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.tags.append((tag, a))
        if tag == "script":
            self._script = a

    def handle_data(self, data):
        if self._script is not None:
            self.scripts.append((self._script, data))
            self._script = None

    def handle_endtag(self, tag):
        if tag == "script":
            self._script = None

    def all(self, tag):
        return [a for t, a in self.tags if t == tag]


def test_every_researched_place_has_a_page_and_build_links_it():
    researched = {j for j, e in SCORES.items() if e["researched"] and e["level"] != "territory"}
    assert set(PAGES) == researched
    for jid, path in PAGES.items():
        assert (WEB / path / "index.html").exists() and (WEB / path / "index.md").exists(), jid
        assert SCORES[jid]["page"] == path, jid
    on_disk = {p.parent.relative_to(WEB).as_posix() + "/" for p in (WEB / "places").rglob("index.html")} - {"places/"}
    assert on_disk == set(PAGES.values()), "stale or missing page folders"


def test_sitemap_lists_every_page_once():
    locs = re.findall(r"<loc>([^<]+)</loc>", (WEB / "sitemap.xml").read_text())
    assert len(locs) == len(set(locs))
    assert set(locs) == {f"{pages.SITE}/", f"{pages.SITE}/places/"} | {f"{pages.SITE}/{p}" for p in PAGES.values()}
    assert f"Sitemap: {pages.SITE}/sitemap.xml" in (WEB / "robots.txt").read_text()


@pytest.mark.parametrize("path", sorted(PAGES.values())[::9] + ["places/"])
def test_page_head_and_csp(path):
    text = (WEB / path / "index.html").read_text()
    doc = Page(text)
    assert len(doc.all("h1")) == 1
    assert [a["href"] for a in doc.all("link") if a.get("rel") == "canonical"] == [f"{pages.SITE}/{path}"]
    desc = [a["content"] for a in doc.all("meta") if a.get("name") == "description"]
    assert len(desc) == 1 and 50 <= len(desc[0]) <= 160
    assert not re.search(r"\sstyle=", text), "the CSP forbids inline styles"
    for attrs, body in doc.scripts:
        assert attrs.get("type") == "application/ld+json", "the CSP forbids inline scripts; only JSON-LD data"
        assert json.loads(body)["@context"] == "https://schema.org"
    for a in doc.all("a"):  # every internal link resolves to a file the site serves
        href = a["href"]
        if href.startswith("/") and not href.startswith("/#"):
            target = WEB / href.lstrip("/")
            assert (target / "index.html").exists() if href.endswith("/") else target.exists(), href


def test_app_and_pages_share_one_origin():
    html = (WEB / "index.html").read_text()
    assert f'<link rel="canonical" href="{pages.SITE}/">' in html
    for _, body in Page(html).scripts:
        json.loads(body)
    assert 'href="places/"' in html, "the app links the crawlable pages"


def test_llms_txt_points_at_markdown_that_exists():
    links = re.findall(r"\]\((https?://[^)]+)\)", (WEB / "llms.txt").read_text())
    md = [u for u in links if u.endswith("index.md")]
    assert len(md) == len(PAGES)
    for u in md:
        assert (WEB / u.removeprefix(f"{pages.SITE}/")).exists(), u


def test_markdown_escapes_html_and_joins_wrapped_list_items():
    out = pages.markdown("# T\n\n- one <b>\n  continued\n- [x](https://a.example/) and [y](javascript:alert(1))\n")
    assert "<h2>T</h2>" in out
    assert "<li>one &lt;b&gt; continued</li>" in out
    assert '<a href="https://a.example/" rel="noopener">x</a>' in out
    assert 'href="javascript' not in out
