"""Monkey fuzzer: seeded random clicks, selections and typing across the whole site.

    uv run python tools/fuzz/monkey.py [--seeds 3] [--steps 150] [--out .fuzz-out/monkey]

After every action the checks in harness.py run (exceptions, console errors, "undefined"/"NaN"/
"null" text, sideways scrolling, app error boxes). A screenshot is kept only when something is found,
with the last ten actions in the report so the failure can be replayed. Same seed, same run.
"""

from __future__ import annotations

import argparse
import random
from pathlib import Path

from playwright.sync_api import sync_playwright

from harness import BAD_TEXT, ROOT, launch, ready, start_server

VIEWPORTS = {"desktop": {"width": 1440, "height": 900}, "tablet": {"width": 820, "height": 1180}, "phone": {"width": 390, "height": 844}}
# Interactive elements a visitor can use; external links, downloads and the file picker are left out.
CLICKABLE = ("#stage button:not([disabled]), .guide button:not([disabled]), .guide .mode, #stage summary, "
             ".globe-land, .chart-svg .dot, #search-results li")
WORDS = ["Monaco", "Cyp", "zug", "Dubai", "xx", "Portugal", "new", "Ber", "<script>", "日本", ""]


def run(seed: int, steps: int, viewport: str, base: str, out: Path, p, browser) -> list[str]:
    rnd = random.Random(seed)
    ctx = browser.new_context(viewport=VIEWPORTS[viewport], accept_downloads=True)
    page = ctx.new_page()
    errors: list[str] = []
    page.on("pageerror", lambda e: errors.append(f"pageerror: {e}"))
    page.on("console", lambda m: errors.append(f"console: {m.text}") if m.type == "error" else None)
    page.on("dialog", lambda d: d.dismiss())  # "Reset everything" asks first; the monkey says no
    ready(page, base, "#/" + rnd.choice(["guided", "factbook/index", "explorer/table", "compare", "settings"]))
    log: list[str] = []
    found: list[str] = []
    for i in range(steps):
        action = rnd.random()
        try:
            if action < 0.62:
                els = page.locator(CLICKABLE)
                n = els.count()
                if not n:
                    continue
                el = els.nth(rnd.randrange(n))
                label = (el.get_attribute("aria-label") or el.inner_text(timeout=1000) or el.get_attribute("data-id") or "?")[:40].replace("\n", " ")
                log.append(f"click '{label}'")
                el.click(timeout=2000, force=True)
            elif action < 0.82:
                sels = page.locator("select:not([disabled])")
                n = sels.count()
                if not n:
                    continue
                s = sels.nth(rnd.randrange(n))
                opts = s.locator("option").evaluate_all("os => os.map(o => o.value)")
                if not opts:
                    continue
                v = rnd.choice(opts)
                log.append(f"select {s.get_attribute('id')} = {v}")
                s.select_option(v, timeout=2000)
            elif action < 0.90:
                boxes = page.locator("input[type=checkbox]:visible")
                n = boxes.count()
                if not n:
                    continue
                b = boxes.nth(rnd.randrange(n))
                log.append(f"toggle {b.get_attribute('id')}")
                b.click(timeout=2000)
            elif action < 0.95:
                w = rnd.choice(WORDS)
                log.append(f"search '{w}'")
                page.fill("#search", w)
                if rnd.random() < 0.6:
                    page.keyboard.press("Enter")
            elif action < 0.98:
                log.append("back")
                page.go_back(timeout=3000)
            else:
                box = page.locator(".globe-svg")
                if box.count() and box.is_visible():
                    b = box.bounding_box()
                    log.append("wheel on globe")
                    page.mouse.move(b["x"] + b["width"] / 2, b["y"] + b["height"] / 2)
                    page.mouse.wheel(0, rnd.choice([-300, 300]))
        except Exception as e:  # an action that cannot complete is noise, not a finding (element moved, etc.)
            log.append(f"  (skipped: {type(e).__name__})")
            continue
        page.wait_for_timeout(120)
        problems = list(errors)
        errors.clear()
        try:
            text = page.evaluate("() => document.body.innerText")
            problems += [f"text '{m.group(0)}'" for m in BAD_TEXT.finditer(text)][:3]
            if page.evaluate("() => document.documentElement.scrollWidth - document.documentElement.clientWidth") > 1:
                problems.append("page scrolls sideways")
            problems += [f"app error: {t}" for t in page.eval_on_selector_all("#stage .error", "es => es.map(e => e.textContent)")]
        except Exception as e:
            problems.append(f"page unusable: {e!r}"[:200])
        if problems:
            shot = out / f"{viewport}-seed{seed}-step{i:03d}.png"
            page.screenshot(path=str(shot))
            found.append(f"- {viewport} seed {seed} step {i}: {'; '.join(sorted(set(problems)))[:400]}\n"
                         f"  hash `{page.evaluate('() => location.hash')}`; last actions: {' → '.join(log[-10:])}\n  screenshot {shot.name}")
    ctx.close()
    return found


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--seeds", type=int, default=3)
    ap.add_argument("--steps", type=int, default=150)
    ap.add_argument("--out", default=str(ROOT / ".fuzz-out" / "monkey"))
    args = ap.parse_args()
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    for old in out.glob("*.png"):
        old.unlink()
    httpd, base = start_server()
    found: list[str] = []
    with sync_playwright() as p:
        browser = launch(p)
        for vp in VIEWPORTS:
            for seed in range(args.seeds):
                found += run(seed, args.steps, vp, base, out, p, browser)
        browser.close()
    httpd.shutdown()
    report = "# Monkey fuzzer\n\n" + (f"{len(found)} finding(s):\n\n" + "\n".join(found) if found else "No findings.\n")
    (out / "report.md").write_text(report)
    print(report)


if __name__ == "__main__":
    main()
