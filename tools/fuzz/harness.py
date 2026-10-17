"""Shared harness for the user-journey and monkey fuzzers.

Starts the site with the production headers (domicile.serve on a free port), opens Chromium through
Playwright, and gives each journey a `Step` recorder: every step saves a screenshot and runs the
automatic checks below. Findings are written to <out>/<journey>/report.md and summary.json.

Automatic checks after every step:
- JavaScript exceptions and console errors (CSP violations show up here too)
- visible text containing "undefined", "NaN", "[object Object]" or a stray "null"
- horizontal page overflow (the layout must never scroll sideways)
- error boxes rendered by the app (".error")
"""

from __future__ import annotations

import json
import re
import shutil
import sys
import threading
import time
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

BAD_TEXT = re.compile(r"\bundefined\b|\bNaN\b|\[object Object\]|(?<![\w-])null(?![\w-])")


def start_server():
    from domicile.serve import serve

    httpd = serve(0)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, f"http://127.0.0.1:{httpd.server_address[1]}/"


def launch(p):
    exe = shutil.which("chromium") or shutil.which("google-chrome-stable")
    return p.chromium.launch(executable_path=exe) if exe else p.chromium.launch()


@dataclass
class Finding:
    step: str
    kind: str  # error | text | overflow | app-error | expectation | note
    detail: str


@dataclass
class Journey:
    name: str
    who: str
    motivation: str
    out: Path
    page: object = None
    findings: list[Finding] = field(default_factory=list)
    steps: list[dict] = field(default_factory=list)
    _errors: list[str] = field(default_factory=list)

    def attach(self, page):
        self.page = page
        page.on("pageerror", lambda e: self._errors.append(f"pageerror: {e}"))
        page.on("console", lambda m: self._errors.append(f"console.{m.type}: {m.text}") if m.type == "error" else None)
        return page

    def step(self, title: str, *, wait: int = 500, full_page: bool = False):
        """Record the page after an action: screenshot plus automatic checks."""
        page = self.page
        page.wait_for_timeout(wait)
        n = len(self.steps) + 1
        shot = self.out / f"{n:02d}-{re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')[:50]}.png"
        if full_page:  # the content column scrolls inside a fixed-height layout: unfold it for the capture
            page.evaluate("""() => { for (const [sel, prop, v] of [['.app', 'height', 'auto'], ['.stage', 'overflow', 'visible'],
                ['.guide', 'overflow', 'visible']]) { const el = document.querySelector(sel); if (el) el.style[prop] = v; } }""")
        page.screenshot(path=str(shot), full_page=full_page)
        if full_page:
            page.evaluate("() => { for (const sel of ['.app', '.stage', '.guide']) document.querySelector(sel)?.removeAttribute('style'); }")
        for e in self._errors:
            self.findings.append(Finding(title, "error", e))
        self._errors.clear()
        text = page.evaluate("() => document.body.innerText")
        for m in {m.group(0) for m in BAD_TEXT.finditer(text)}:
            ctx = text[max(0, text.find(m) - 60): text.find(m) + 60].replace("\n", " ")
            self.findings.append(Finding(title, "text", f"'{m}' in: …{ctx}…"))
        overflow = page.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth")
        if overflow > 1:
            self.findings.append(Finding(title, "overflow", f"page scrolls sideways by {overflow}px"))
        for err in page.eval_on_selector_all("#stage .error", "els => els.map(e => e.textContent)"):
            self.findings.append(Finding(title, "app-error", err))
        self.steps.append({"n": n, "title": title, "screenshot": shot.name, "hash": page.evaluate("() => location.hash")})
        return shot

    def expect(self, ok: bool, what: str, step: str = ""):
        """A user expectation: recorded as a finding when it does not hold."""
        if not ok:
            self.findings.append(Finding(step or (self.steps[-1]["title"] if self.steps else "-"), "expectation", what))
        return ok

    def note(self, what: str):
        self.findings.append(Finding(self.steps[-1]["title"] if self.steps else "-", "note", what))

    def write(self):
        lines = [f"# {self.name}", "", f"**Who:** {self.who}", "", f"**Motivation:** {self.motivation}", "", "## Steps", ""]
        lines += [f"{s['n']}. {s['title']} (`{s['hash']}`) — {s['screenshot']}" for s in self.steps]
        lines += ["", "## Findings", ""]
        lines += [f"- [{f.kind}] {f.step}: {f.detail}" for f in self.findings] or ["- none"]
        (self.out / "report.md").write_text("\n".join(lines) + "\n")
        (self.out / "summary.json").write_text(json.dumps({"name": self.name, "steps": self.steps,
                                                           "findings": [f.__dict__ for f in self.findings]}, indent=2))


def ready(page, base: str, route: str = "#/guided", clear: bool = True, view: str = "advanced"):
    """``clear``: start as a first-time visitor, except in ``view`` (the journeys use Advanced's controls)."""
    page.goto(base + route)
    page.wait_for_function("() => window.domicileReady", timeout=20000)
    if clear:
        page.evaluate("(view) => { localStorage.clear(); localStorage.setItem('domicile:v1', JSON.stringify({ view })); }", view)
        page.reload()
        page.wait_for_function("() => window.domicileReady", timeout=20000)


def timed(fn):
    t = time.perf_counter()
    fn()
    return (time.perf_counter() - t) * 1000
