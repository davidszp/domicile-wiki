"""Static, crawlable pages for search engines and AI agents, written from the built data in web/data.

The app itself is one page that draws everything with JavaScript under ``#/`` addresses, which search
engines index as a single URL and AI crawlers (which do not run JavaScript) see as empty. This writes:

- ``web/places/<country>/index.html`` (and ``<country>/<region>/``) with the key facts, the research
  summary, residence routes, succession, daily-life scores, the dossier and its sources, plus a Markdown
  twin ``index.md`` for agents
- ``web/places/index.html``, a list of every place
- ``web/sitemap.xml``, ``web/robots.txt``, ``web/llms.txt`` and ``web/404.html``

Every figure comes from the same build output the app shows, for the app's default reader (an EU-citizen
family with EUR 30M); nothing is computed here that the app does not show.
"""

from __future__ import annotations

import datetime as dt
import html
import json
import re
import shutil
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WEB = ROOT / "web"
DATA = WEB / "data"
PLACES = WEB / "places"

SITE = "https://domicile.wiki"  # canonical origin for search engines and agents; web/index.html uses the same
NAME = "domicile.wiki"
TAGLINE = "The open guide to moving abroad: taxes, residence, daily life, with sources."
LICENSE = "https://creativecommons.org/licenses/by-sa/4.0/"
REPO = "https://github.com/davidszp/domicile-wiki"

INHERITANCE = {"fully_exempt": "tax-free", "exempt_with_conditions": "tax-free, with conditions", "taxed_low": "low tax", "taxed": "taxed"}
WEALTH_TAX = {"none": "none", "limited": "limited", "broad": "yes"}
GROUP = {"EU": "EU citizens", "US": "US citizens", "OTHER": "other passports"}
KIND = {"free_movement": "Free movement", "investor_residence": "Investor residence", "citizenship_by_investment": "Citizenship by investment",
        "passive_income": "Passive income / retirement", "digital_nomad": "Digital nomad", "work": "Work", "entrepreneur": "Entrepreneur", "other": "Other"}
STATUS = {"open": "open", "closed_to_new": "closed to new applicants", "suspended": "suspended", "announced": "announced"}
NONTAX = ["safety", "stability", "corruption", "legal", "healthcare", "education", "hdi", "infrastructure", "cost", "business", "culture"]


def slug(name: str) -> str:
    s = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def paths(jurisdictions: dict) -> dict[str, str]:
    """The page path ("places/portugal/") of every researched place, keyed by id."""
    out: dict[str, str] = {}
    for jid, e in jurisdictions.items():
        if not e.get("researched") or e["level"] == "territory":
            continue
        if e["level"] == "country" or not e.get("parent"):
            out[jid] = f"places/{slug(e['name'])}/"
    for jid, e in jurisdictions.items():
        if e.get("researched") and e["level"] == "region" and e.get("parent") in out:
            out[jid] = f"{out[e['parent']]}{slug(e['name'])}/"
    assert len(set(out.values())) == len(out), "two places share a page path"
    return out


# Formatting --------------------------------------------------------------------------------------

def esc(x) -> str:
    return html.escape(str(x), quote=True)


def eur(x) -> str:
    return "n/a" if x is None else f"{'-' if x < 0 else ''}€{abs(round(x)):,}"


def long_date(iso: str) -> str:
    d = dt.date.fromisoformat(iso)
    return f"{d.day} {d.strftime('%B %Y')}"


def clip(text: str, n: int = 158) -> str:
    text = " ".join(text.split())
    if len(text) <= n:
        return text
    cut = text[: n - 1].rsplit(" ", 1)[0].rstrip(",;:")
    return cut + "…"


_INLINE = re.compile(r"(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|https?://[^\s)<>]+)")


def inline(text: str) -> str:
    """The inline Markdown subset of web/js/markdown.js, escaped."""
    out, last = [], 0
    for m in _INLINE.finditer(text):
        out.append(esc(text[last:m.start()]))
        t = m.group(0)
        if t.startswith("**"):
            out.append(f"<strong>{esc(t[2:-2])}</strong>")
        elif t.startswith("`"):
            out.append(f"<code>{esc(t[1:-1])}</code>")
        elif t.startswith("["):
            label, url = re.match(r"^\[([^\]]+)\]\(([^)\s]+)\)$", t).groups()
            out.append(link(url, label))
        elif t.startswith("http"):
            out.append(link(t, t))
        else:
            out.append(f"<em>{esc(t[1:-1])}</em>")
        last = m.end()
    out.append(esc(text[last:]))
    return "".join(out)


def link(url: str, text: str) -> str:
    if not url.startswith(("https://", "http://")):
        return esc(text)
    return f'<a href="{esc(url)}" rel="noopener">{esc(text)}</a>'


def markdown(src: str, shift: int = 1) -> str:
    """Block Markdown as in web/js/markdown.js; indented lines continue the list item or paragraph above."""
    lines = src.replace("\r\n", "\n").split("\n")
    out: list[str] = []
    i = 0
    item = re.compile(r"^\s*([-*]|\d+\.)\s+")
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        if hm := re.match(r"^(#{1,6})\s+(.*)$", line):
            lv = min(6, len(hm.group(1)) + shift)
            out.append(f"<h{lv}>{inline(hm.group(2))}</h{lv}>")
            i += 1
        elif re.match(r"^\s*\|", line):
            rows = []
            while i < len(lines) and re.match(r"^\s*\|", lines[i]):
                rows.append(lines[i])
                i += 1
            rows = [r for r in rows if not re.match(r"^\s*\|[\s:|-]+\|\s*$", r)]
            cells = lambda r: [c.strip() for c in r.strip().strip("|").split("|")]
            body = "".join("<tr>" + "".join(f"<{'th' if ri == 0 else 'td'}>{inline(c)}</{'th' if ri == 0 else 'td'}>" for c in cells(r)) + "</tr>"
                           for ri, r in enumerate(rows))
            out.append(f'<div class="table-wrap"><table class="md-table">{body}</table></div>')
        elif item.match(line):
            tag = "ol" if re.match(r"^\s*\d+\.", line) else "ul"
            items = []
            while i < len(lines) and (item.match(lines[i]) or (items and lines[i].startswith((" ", "\t")) and lines[i].strip())):
                if item.match(lines[i]):
                    items.append(item.sub("", lines[i]))
                else:
                    items[-1] += " " + lines[i].strip()
                i += 1
            out.append(f"<{tag}>" + "".join(f"<li>{inline(x)}</li>" for x in items) + f"</{tag}>")
        elif line.startswith("```"):
            buf = []
            i += 1
            while i < len(lines) and not lines[i].startswith("```"):
                buf.append(lines[i])
                i += 1
            i += 1
            out.append(f"<pre><code>{esc(chr(10).join(buf))}</code></pre>")
        else:
            buf = []
            while i < len(lines) and lines[i].strip() and not re.match(r"^(#{1,6}\s|\s*\||\s*([-*]|\d+\.)\s|```)", lines[i]):
                buf.append(lines[i].strip())
                i += 1
            out.append(f"<p>{inline(' '.join(buf))}</p>")
    return "\n".join(out)


# Page parts --------------------------------------------------------------------------------------

def layout(*, path: str, title: str, description: str, body: str, ld: list[dict] | None = None, md: bool = False, noindex: bool = False) -> str:
    url = f"{SITE}/{path}"
    ld_block = ""
    if ld:
        data = json.dumps({"@context": "https://schema.org", "@graph": ld}, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
        ld_block = f'\n  <script type="application/ld+json">{data}</script>'
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(description)}">
  {'<meta name="robots" content="noindex">' if noindex else f'<link rel="canonical" href="{esc(url)}">'}
  {f'<link rel="alternate" type="text/markdown" href="/{path}index.md" title="Markdown version">' if md else ''}
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="{NAME}">
  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(description)}">
  <meta property="og:url" content="{esc(url)}">
  <meta name="twitter:card" content="summary">
  <meta name="color-scheme" content="light dark">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script src="/js/theme.js"></script>
  <link rel="stylesheet" href="/css/app.css">
  <link rel="stylesheet" href="/css/page.css">{ld_block}
</head>
<body class="page">
  <header class="page-top">
    <a class="page-brand" href="/">{NAME}</a>
    <nav aria-label="Site"><a href="/places/">All places</a> <a href="/">Interactive guide</a> <a href="{REPO}" rel="noopener">Source</a></nav>
  </header>
  <main id="main" class="page-main">
{body}
  </main>
  <footer class="page-foot small muted">
    <p>Research, not tax or legal advice. Data <a href="{LICENSE}" rel="license noopener">CC BY-SA 4.0</a>, code AGPL-3.0. {'<a href="index.md">Markdown version</a>.' if md else ''}</p>
  </footer>
</body>
</html>
"""


def crumbs(items: list[tuple[str, str]]) -> tuple[str, dict]:
    """A breadcrumb trail as HTML and as a schema.org BreadcrumbList; items are (name, path)."""
    li = " <span aria-hidden=\"true\">›</span> ".join(
        f'<a href="/{p}">{esc(n)}</a>' if i < len(items) - 1 else f'<span aria-current="page">{esc(n)}</span>' for i, (n, p) in enumerate(items))
    ld = {"@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": n, "item": f"{SITE}/{p}"} for i, (n, p) in enumerate(items)]}
    return f'<nav class="crumbs small" aria-label="Breadcrumb">{li}</nav>', ld


def facts(rows: list[tuple[str, str | None]]) -> str:
    return '<dl class="facts">' + "".join(f"<div class=\"fact\"><dt>{esc(k)}</dt><dd>{v}</dd></div>" for k, v in rows if v) + "</dl>"


def residence_line(r: dict | None) -> str | None:
    """The cheapest route for one passport, as the app's 'Can you live here?' says it."""
    if not r:
        return None
    if r["kind"] == "none":
        return "only work or business permits"
    if r["kind"] == "citizen":
        return "yes, as citizens"
    if r["kind"] == "free_movement":
        return "free: register as an EU citizen"
    text = r["name"]
    if r.get("investment_eur"):
        text = f"from {eur(r['investment_eur'])} · {text}"
    elif r.get("income_eur"):
        text = f"income of {eur(r['income_eur'])} a year · {text}"
    if r.get("limited"):
        text += f" · limited places: {r['limited']}"
    return esc(text)


def projection_end(p: dict) -> tuple[dict | None, dict | None]:
    pr = p.get("projection")
    if not pr:
        return None, None
    end = lambda x: max(0, x["years"][-1][0]) * 1e3
    paths_ = [x for x in pr["paths"] if x["id"] != "no_tax" and not x.get("missing")]
    best = max(paths_, key=end, default=None)
    no_tax = next((x for x in pr["paths"] if x["id"] == "no_tax"), None)
    return (best and {"name": best["name"], "eur": end(best)}), (no_tax and {"eur": end(no_tax)})


def sources_list(items: list[dict]) -> str:
    seen, li = set(), []
    for s in items:
        if s["url"] in seen:
            continue
        seen.add(s["url"])
        li.append(f"<li>{link(s['url'], s['title'])} — {esc(s['publisher'])}</li>")
    return f'<ul class="sources">{"".join(li)}</ul>' if li else ""


def place_page(jid: str, e: dict, p: dict, meta: dict, path: str, pages: dict, J: dict, dossier: str | None) -> tuple[str, str, str]:
    """(html, markdown, description) for one researched place."""
    name, d = e["name"], p["data"]
    parent = J.get(e["parent"]) if e.get("parent") else None
    where = f"{name}, {parent['name']}" if parent else name
    researched = d["researched_on"]
    labels = {k: v["label"] for k, v in meta["config"]["metrics"].items()}
    row = (p["tax_detail"].get("EU") or [None])[0]
    if e["default"].get("regime"):
        row = next((x for x in p["tax_detail"]["EU"] if x["id"] == e["default"]["regime"]), row)
    best, no_tax = projection_end(p)
    a = (p.get("projection") or {}).get("assumptions") or {}
    hc = p.get("household_cost_detail")
    inh = INHERITANCE.get(d["regimes"][0]["inheritance"]["children_treatment"]) if d.get("regimes") else None
    capital = next((m["name"] for m in e.get("markers", []) if m.get("kind") == "capital"), None)
    imm, suc, inc = p.get("immigration"), p.get("succession"), p.get("income")
    title = f"{where}: taxes, residence and cost of living | {NAME}"
    description = clip(f"Moving to {where}? " + d["summary"])
    trail = [("All places", "places/")]
    if parent and e["parent"] in pages:
        trail.append((parent["name"], pages[e["parent"]]))
    trail.append((name, path))
    crumb_html, crumb_ld = crumbs(trail)

    glance = [
        ("Score for a wealthy family", f"{e['default']['score']:.0f} / 100" if e["default"].get("score") is not None else None),
        ("Ruled out", esc("; ".join(k["label"] for k in e["ko"]))) if e.get("ko") else (None, None),
        ("Can EU citizens live here?", residence_line((e.get("residence") or {}).get("EU"))),
        ("Can US citizens live here?", residence_line((e.get("residence") or {}).get("US"))),
        ("Other passports", residence_line((e.get("residence") or {}).get("OTHER"))),
        ("Tax on a €30M portfolio", f"{eur(row['cost'])} a year" + (f" · {esc(row['name'])}" if row["type"] != "standard" else "") if row and row.get("cost") is not None else None),
        ("Wealth tax", WEALTH_TAX.get(e["flags"].get("wealth_tax_type"))),
        ("Children inherit", inh),
        (f"After {a.get('years')} years", f"{eur(best['eur'])} of {eur(a['portfolio'])}" + (f" (with no tax at all: {eur(no_tax['eur'])})" if no_tax else "") if best else None),
        ("Living costs, family of five", f"{eur(hc['total_eur'])} a year" if hc else None),
        ("EU member", "yes" if e.get("eu") else "no"),
        ("Currency", esc(e.get("currency") or "")),
        ("Capital", esc(capital) if capital and not parent else None),
    ]
    glance = [g for g in glance if g[0]]

    parts = [crumb_html, f"<h1>{esc(where)}</h1>",
             (f'<p class="lede">Taxes, residence and daily life for people moving to {esc(where)}: for a wealthy family, an expat employee and a remote worker. '
             f'Researched <time datetime="{researched}">{long_date(researched)}</time>.</p>'),
             f'<p><a class="page-cta" href="/#/factbook/{esc(jid)}">Open {esc(name)} in the interactive guide</a></p>',
             '<section aria-labelledby="glance"><h2 id="glance">At a glance</h2>',
             '<p class="small muted">For an EU-citizen family of five living off a €30M portfolio, the guide\'s default reader. The interactive guide recomputes everything for other passports and situations.</p>',
             facts(glance), "</section>",
             '<section aria-labelledby="tax"><h2 id="tax">Tax on investments, inheritance and wealth</h2>', f"<p>{inline(d['summary'])}</p>"]
    regimes = [r for r in d.get("regimes", []) if r.get("description")]
    if regimes:
        parts.append("<ul>" + "".join(f"<li><strong>{esc(r['name'])}</strong>: {inline(r['description'])}</li>" for r in regimes) + "</ul>")
    parts.append("</section>")
    if inc and inc.get("income_tax", {}).get("summary"):
        parts += ['<section aria-labelledby="income"><h2 id="income">Income tax for employees and remote workers</h2>', f"<p>{inline(inc['income_tax']['summary'])}</p></section>"]
    if imm:
        rows = "".join(
            f"<tr><td>{esc(r['name'])}</td><td>{esc(KIND.get(r['kind'], r['kind']))}</td><td>{esc(', '.join(GROUP[c] for c in r['citizenships']))}"
            f"{' (some nationalities)' if r.get('only_some_nationalities') else ''}</td><td>{esc(STATUS[r['status']])}</td><td>{inline(r['summary'])}</td></tr>"
            for r in imm["routes"])
        parts += ['<section aria-labelledby="residence"><h2 id="residence">How to get residence</h2>',
                  f"<p>{inline(imm['summary'])}</p>",
                  f'<div class="table-wrap"><table class="md-table"><tr><th>Route</th><th>Kind</th><th>Who</th><th>Status</th><th>In short</th></tr>{rows}</table></div>',
                  f"<p><strong>Citizenship:</strong> {inline(imm['naturalisation'])}</p></section>"]
    if suc:
        parts += ['<section aria-labelledby="succession"><h2 id="succession">Inheritance law and trusts</h2>', f"<p>{inline(suc['summary'])}</p></section>"]
    nt = e.get("nontax") or {}
    if any(nt.get(k) is not None for k in NONTAX):
        rows = "".join(f"<tr><td>{esc(labels[k])}</td><td>{nt[k]:.0f}</td></tr>" for k in NONTAX if nt.get(k) is not None)
        parts += ['<section aria-labelledby="life"><h2 id="life">Daily life, scored out of 100</h2>',
                  '<p class="small muted">From public indicators (World Bank, UNDP, Transparency International and others); higher is better.</p>',
                  f'<div class="table-wrap"><table class="md-table"><tr><th>Measure</th><th>Score</th></tr>{rows}</table></div></section>']
    subs = sorted((J[s]["name"], pages[s]) for s in pages if J[s].get("parent") == jid)
    if subs:
        parts += ['<section aria-labelledby="regions"><h2 id="regions">Regions</h2><ul class="cols">',
                  "".join(f'<li><a href="/{p_}">{esc(n)}</a></li>' for n, p_ in subs), "</ul></section>"]
    if dossier:
        parts += ['<section aria-labelledby="dossier" class="dossier"><h2 id="dossier">Research notes</h2>', markdown(dossier, shift=2), "</section>"]
    srcs = [*(imm or {}).get("sources", []), *[s for r in (imm or {}).get("routes", []) for s in r["sources"]], *(suc or {}).get("sources", [])]
    if srcs:
        note = '<p class="small muted">Tax sources are cited in the research notes above.</p>' if dossier else ""
        parts += ['<section aria-labelledby="sources"><h2 id="sources">Residence and succession sources</h2>', sources_list(srcs), note, "</section>"]
    body = "\n".join(parts)

    url = f"{SITE}/{path}"
    about = {"@type": "Country", "name": name} if not parent else {"@type": "AdministrativeArea", "name": name, "containedInPlace": {"@type": "Country", "name": parent["name"]}}
    ld = [{"@type": "WebPage", "@id": url, "url": url, "name": title, "description": description, "inLanguage": "en",
           "dateModified": researched, "isPartOf": {"@id": f"{SITE}/#website"}, "about": about, "license": LICENSE,
           "breadcrumb": crumb_ld}]

    md = [f"# {where}: taxes, residence and cost of living", "",
          f"Source: {url} ({NAME}, researched {researched}). Data licence CC BY-SA 4.0. Research, not tax or legal advice.", "",
          "## At a glance", "", "For an EU-citizen family of five living off a EUR 30M portfolio (the guide's default reader).", ""]
    md += [f"- {k}: {html.unescape(re.sub('<[^>]+>', '', v))}" for k, v in glance if v]
    md += ["", "## Tax on investments, inheritance and wealth", "", d["summary"], ""]
    md += [f"- **{r['name']}**: {r['description']}" for r in regimes]
    if inc and inc.get("income_tax", {}).get("summary"):
        md += ["", "## Income tax", "", inc["income_tax"]["summary"]]
    if imm:
        md += ["", "## How to get residence", "", imm["summary"], ""]
        md += [f"- **{r['name']}** ({KIND.get(r['kind'], r['kind'])}; {', '.join(GROUP[c] for c in r['citizenships'])}; {STATUS[r['status']]}): {r['summary']}" for r in imm["routes"]]
        md += ["", f"Citizenship: {imm['naturalisation']}"]
    if suc:
        md += ["", "## Inheritance law and trusts", "", suc["summary"]]
    if any(nt.get(k) is not None for k in NONTAX):
        md += ["", "## Daily life (0-100, higher is better)", ""] + [f"- {labels[k]}: {nt[k]:.0f}" for k in NONTAX if nt.get(k) is not None]
    if dossier:
        md += ["", "## Research notes", "", re.sub(r"^(#{1,4}) ", lambda m: "#" * (len(m.group(1)) + 2) + " ", dossier, flags=re.MULTILINE)]
    if srcs:
        seen = set()
        md += ["", "## Residence and succession sources", ""]
        for s in srcs:
            if s["url"] not in seen:
                seen.add(s["url"])
                md.append(f"- [{s['title']}]({s['url']}) — {s['publisher']}")
    return layout(path=path, title=title, description=description, body=body, ld=ld, md=True), "\n".join(md) + "\n", description


def index_page(pages: dict, J: dict, descriptions: dict) -> str:
    by_continent: dict[str, list[str]] = {}
    for jid in pages:
        e = J[jid]
        if e["level"] == "country" or not e.get("parent"):
            by_continent.setdefault(e.get("continent") or "Other", []).append(jid)
    parts = [crumbs([("All places", "places/")])[0], "<h1>All places</h1>",
             (f"<p class=\"lede\">{len(pages)} countries and regions with researched taxes, residence routes and daily-life data. "
             'Each page has the key facts and sources; the <a href="/">interactive guide</a> ranks and compares them for your own situation.</p>')]
    for cont in sorted(by_continent):
        parts.append(f"<section><h2>{esc(cont)}</h2><ul class=\"place-list\">")
        for jid in sorted(by_continent[cont], key=lambda x: J[x]["name"]):
            subs = sorted((s for s in pages if J[s].get("parent") == jid), key=lambda s: J[s]["name"])
            sub = f'<span class="small muted"> · {len(subs)} regions</span>' if subs else ""
            parts.append(f'<li><a href="/{pages[jid]}">{esc(J[jid]["name"])}</a>{sub}<br><span class="small muted">{esc(descriptions[jid])}</span></li>')
        parts.append("</ul></section>")
    ld = [{"@type": "CollectionPage", "@id": f"{SITE}/places/", "url": f"{SITE}/places/", "name": f"All places | {NAME}",
           "isPartOf": {"@id": f"{SITE}/#website"}, "license": LICENSE}]
    return layout(path="places/", title=f"All places: taxes, residence and cost of living | {NAME}",
                  description=f"Every country and region on {NAME}: tax on investments and income, residence routes per passport, succession law and daily life, with sources.",
                  body="\n".join(parts), ld=ld)


def llms_txt(pages: dict, J: dict, descriptions: dict) -> str:
    lines = [f"# {NAME}", "", (f"> {TAGLINE} An open, source-linked guide for wealthy families, expat employees and remote workers: "
             "tax on capital gains, dividends, wealth, inheritance and income; residence and citizenship routes per passport; "
             "succession law; cost of living; safety, stability and other daily-life indicators. Free; data CC BY-SA 4.0."), "",
             ("Each place has a text page (HTML) and a Markdown twin at the same address plus `index.md`. "
             "Figures are for the guide's default reader (an EU-citizen family of five with EUR 30M) unless stated. "
             "Every figure is dated and sourced; please cite the place page."), "",
             "## Main pages", "",
             f"- [All places]({SITE}/places/): every researched country and region",
             f"- [Interactive guide]({SITE}/): rankings, comparisons and calculators for any passport and situation (JavaScript app)",
             f"- [Source code and method]({REPO}): data pipeline, scoring model and research guides",
             f"- [All scores (JSON)]({SITE}/data/scores.json): per-place scores and key figures", "", "## Places", ""]
    for jid in sorted(pages, key=lambda x: pages[x]):
        lines.append(f"- [{J[jid]['name']}{', ' + J[J[jid]['parent']]['name'] if J[jid].get('parent') else ''}]({SITE}/{pages[jid]}index.md): {descriptions[jid]}")
    return "\n".join(lines) + "\n"


def not_found() -> str:
    body = ('<h1>Page not found</h1><p>This address does not exist. Try <a href="/places/">all places</a> or the '
            '<a href="/">interactive guide</a>.</p>')
    return layout(path="404.html", title=f"Page not found | {NAME}", description="Page not found.", body=body, noindex=True)


def main() -> None:
    scores = json.loads((DATA / "scores.json").read_text())
    J, meta = scores["jurisdictions"], scores["meta"]
    pages = paths(J)
    if PLACES.exists():
        shutil.rmtree(PLACES)
    descriptions, dates = {}, {}
    for jid, path in pages.items():
        p = json.loads((DATA / "profiles" / f"{jid}.json").read_text())
        e = J[jid]
        dname = jid if e["level"] == "country" or not e.get("parent") else None
        dfile = DATA / "dossiers" / f"{dname}.md" if dname else None
        dossier = dfile.read_text() if dfile and dfile.exists() else None
        page, md, desc = place_page(jid, e, p, meta, path, pages, J, dossier)
        out = WEB / path
        out.mkdir(parents=True, exist_ok=True)
        (out / "index.html").write_text(page)
        (out / "index.md").write_text(md)
        descriptions[jid], dates[jid] = desc, p["data"]["researched_on"]
    (PLACES / "index.html").write_text(index_page(pages, J, descriptions))
    (WEB / "404.html").write_text(not_found())
    (WEB / "llms.txt").write_text(llms_txt(pages, J, descriptions))
    built = meta["built"]
    urls = [(f"{SITE}/", built), (f"{SITE}/places/", built)] + [(f"{SITE}/{pages[j]}", dates[j]) for j in sorted(pages, key=lambda x: pages[x])]
    (WEB / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
                                     + "".join(f"  <url><loc>{esc(u)}</loc><lastmod>{d}</lastmod></url>\n" for u, d in urls) + "</urlset>\n")
    (WEB / "robots.txt").write_text(f"# Search engines and AI agents are welcome; please cite the place pages.\nUser-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n")
    print(f"{len(pages)} place pages, sitemap, llms.txt, robots.txt and 404 written")


if __name__ == "__main__":
    main()
