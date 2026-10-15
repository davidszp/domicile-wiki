"""Write the data-gap report and the source register: ``python -m domicile.gaps``.

- ``docs/DATA_GAPS.md``: per jurisdiction status, missing metrics, low-confidence tax metrics and
  open questions, generated from the built data so it is always current.
- ``docs/SOURCE_REGISTER.csv``: every tax source plus every indicator dataset.
"""

from __future__ import annotations

import csv
import json
from pathlib import Path

from domicile.schema import IncomeFile, Jurisdiction
from domicile.taxcalc import METRICS

ROOT = Path(__file__).resolve().parent.parent
WEB = ROOT / "web" / "data"


def income_gaps() -> list[str]:
    """Earned-income files (Expat and Digital nomad personas)."""
    files = [IncomeFile.model_validate_json(p.read_text()) for p in sorted((ROOT / "data" / "income").glob("*.json"))]
    lines = ["", "## Earned income (Expat and Digital nomad)", "",
             f"{len(files)} countries researched. Countries without a file are grey for both personas.", "",
             "| Country | Income tax | Social security deductible | Weak regimes | Reliefs not counted (local work not established) | Missing rents | Open questions |",
             "|---|---|---|---|---|---|---|"]
    for f in sorted(files, key=lambda f: f.name):
        it = f.income_tax
        weak = [r.id for r in f.regimes if r.confidence == "low" or r.verification == "unverified"]
        uncounted = [r.id for r in f.regimes if r.requires_foreign_income and r.covers_local_work is not True and r.treatment != "standard"]
        c = f.costs
        missing = [k for k in ("rent_1bed_monthly", "rent_2bed_monthly") if c is None or getattr(c, k) is None]
        oq = len(f.open_questions) + len(it.open_questions) + sum(len(r.open_questions) for r in f.regimes)
        ded = "not researched" if it.social_security_deductible is None else f"{it.social_security_deductible:.0%}"
        lines.append(f"| {f.name} | {it.verification}, {it.confidence} | {ded} | {', '.join(weak) or '–'} | {', '.join(uncounted) or '–'} | "
                     f"{', '.join(k.replace('_monthly', '') for k in missing) or '–'} | {oq} |")
    return lines


def main() -> None:
    scores = json.loads((WEB / "scores.json").read_text())
    cfg = scores["meta"]["config"]
    labels = {k: m["label"] for k, m in cfg["metrics"].items()}
    data = scores["jurisdictions"]
    jfiles = {p.stem: Jurisdiction.model_validate_json(p.read_text()) for p in sorted((ROOT / "data" / "jurisdictions").glob("*.json"))}

    countries = {k: v for k, v in data.items() if v["level"] == "country"}
    researched = {k: v for k, v in countries.items() if v["researched"]}
    by_status: dict[str, list[str]] = {}
    for k, v in researched.items():
        by_status.setdefault(v["default"]["status"], []).append(k)

    lines = [
        "# Data gaps",
        "",
        f"Generated from the build of {scores['meta']['built']} (EU citizen, default weights). Regenerate with "
        "`python -m domicile.gaps` after `python -m domicile.build`.",
        "",
        "## Coverage",
        "",
        f"- Map units: {len(data)} ({len(countries)} countries/territories, {len(data) - len(countries)} subnational units).",
        f"- Countries/territories with researched tax rules: {len(researched)}. The other {len(countries) - len(researched)} are grey "
        "(unscored) on the overall and tax layers; their non-tax indicators are available on the non-tax layer.",
        f"- Status of researched countries: " + ", ".join(f"{s} {len(v)}" for s, v in sorted(by_status.items())) + ".",
        "",
        "## Systematic gaps",
        "",
    ]
    missing_count: dict[str, int] = {}
    for v in researched.values():
        for m, s in v["nontax"].items():
            if s is None:
                missing_count[m] = missing_count.get(m, 0) + 1
    for m, n in sorted(missing_count.items(), key=lambda x: -x[1]):
        lines.append(f"- **{labels[m]}** missing for {n} of {len(researched)} researched countries.")
    lines += [
        "- Small territories (e.g. Crown Dependencies, British Overseas Territories, Monaco) are not covered by the World Bank "
        "Worldwide Governance Indicators or UNDP's HDI. Only authoritative local statistics with the same definitions are "
        "used as overrides; no proxies from the sovereign state are used.",
        "- Tax rules are summarised at the top end for a large private investor; anti-avoidance rules, exit taxes in the "
        "country being left and treaty tie-breakers are described in text but not modelled.",
        "",
        "## Per jurisdiction",
        "",
        "| Jurisdiction | Status | Data | Missing metrics | Low-confidence / unverified tax metrics | Open questions |",
        "|---|---|---|---|---|---|",
    ]
    for k in sorted(researched, key=lambda x: researched[x]["name"]):
        v = researched[k]
        d = v["default"]
        j = jfiles.get(k)
        weak, oq = [], 0
        if j:
            for r in j.regimes:
                for m in METRICS:
                    x = getattr(r, m)
                    if x and (x.confidence == "low" or x.verification == "unverified"):
                        weak.append(f"{r.id}.{m}")
                    if x:
                        oq += len(x.open_questions)
            oq += len(j.open_questions)
        missing = [labels[m] for m, s in v["nontax"].items() if s is None]
        lines.append(f"| {v['name']} | {d['status']} | {round(d['completeness'] * 100)}% | {', '.join(missing) or '–'} | "
                     f"{', '.join(weak) or '–'} | {oq} |")
    lines += income_gaps()
    (ROOT / "docs" / "DATA_GAPS.md").write_text("\n".join(lines) + "\n")

    src = json.loads((WEB / "sources.json").read_text())
    with (ROOT / "docs" / "SOURCE_REGISTER.csv").open("w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["type", "jurisdiction", "regime", "metric", "title", "url", "publisher", "kind", "tax_year", "verified_on", "confidence", "verification"])
        for s in src["tax"]:
            w.writerow(["tax", s["jurisdiction"], s["regime"], s["metric"], s["title"], s["url"], s["publisher"], s["kind"],
                        s["tax_year"], s["verified_on"], s["confidence"], s["verification"]])
        for key, m in sorted(src["indicators"].items()):
            w.writerow(["indicator", "", "", key, m["description"], m["url"], m["source"], "dataset", "", m.get("fetched", ""), "", ""])
    print(f"docs/DATA_GAPS.md and docs/SOURCE_REGISTER.csv written ({len(src['tax'])} tax sources)")


if __name__ == "__main__":
    main()
