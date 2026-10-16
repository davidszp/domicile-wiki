# Monthly update

Once a month the site is brought up to date by a recipe of scripts and agents. Scripts do what is
mechanical (exchange rates, indicator datasets, the build, tests, the diff report); agents do what needs
reading and judgement (spotting changes, checking them against sources, editing data files, reviewing).
Nothing is committed or published until the maintainer has read the month's report.

## Running it

In Claude Code, from the repository root:

1. `make monthly-prepare`
   Saves the current build (`data/build/scores_before.json`), works out the period since the last run
   (`data/updates/last_run.json`) and the files due for re-verification, and writes the workflow's
   arguments to `data/build/monthly-args.json`. It also links the workflow into `.claude/workflows/`.
2. Ask Claude: *"Run the monthly-update workflow with the arguments in data/build/monthly-args.json."*
   It runs the six stages below (about an hour; roughly 50–70 agents, most of them on Sonnet).
3. Read `docs/updates/<YYYY-MM>.md`: decisions for you first, then what changed and why.
4. Decide. Ask Claude to undo anything you reject (`git diff` shows every edit), then `make build` and
   `make test` if anything changed.
5. `make monthly-finish` (records today as the last run and writes the month's history snapshot,
   `data/history/<YYYY-MM>.json`), then commit everything in one commit, tag it `data-<YYYY-MM>`, push, and
   deploy (`npx -y wrangler@4.151.0 deploy`).

## The stages (`tools/monthly/monthly-update.workflow.js`)

| Stage | Who | What |
|---|---|---|
| Refresh | script, via one agent | `make fx` (ECB rates) and `make indicators` (World Bank, UNDP, TI, EF); reports which series got new values |
| Scout | 6 agents (Sonnet), one per region | Changes since the last run in tax (incl. spouse and children), income tax, immigration routes, risk (sanctions, capital controls, national-security law, conflict) and costs; official sources first |
| Verify | 1 agent (Sonnet) per candidate | A sceptic confirms or refutes each claim from an official source and checks whether the site already has it; "unverifiable" by default |
| Update | 1 agent (Sonnet) per data file | Applies confirmed changes (in force → data; announced → text and open questions) and re-verifies the month's rotation; keeps dossiers in step; validates. Knock-outs and red flags: one agent, edits only those lists, and flags each for the maintainer |
| Check | script, via one agent | `make build`, all tests, the simulated visitors (`tools/fuzz`), and `python -m domicile.diffreport` against the saved build |
| Review | 1 agent (the session's model, Opus) | Reads every changed file against its source, explains each move in the diff report, lists decisions, writes `docs/updates/<YYYY-MM>.md` |

Changes for the same file are merged before its update agent starts, so no two agents edit one file.

## The re-verification rotation

Scouts catch changes in the news; the rotation catches what they miss. Each month the files whose most
recent check is oldest are re-verified in full (`python -m domicile.staleness` shows the queue):

| Files | Per month | Full cycle |
|---|---|---|
| Tax (`data/jurisdictions/`) | 12 | about a year |
| Income (`data/income/`) | 7 | about a year |
| Immigration (`data/immigration/`) | 6 | about ten months (rules change fast) |
| Regional (`data/subnational/`) | 1 | five months |
| Projection recipes (`data/recipes/`) | 5 | about a year (60 recipes); rates are re-checked through the tax files, the recipe only for how each path works |
| Succession (`data/succession/`) | 12 | about a year; each pass should read the statute and the live HCCH table, raising files from draft to verified |

Change the numbers with flags: `uv run python -m domicile.monthly prepare --tax 20`.

## History

Two records are kept, both in git:

- **The rules themselves.** Every data file is versioned; one commit per month, tagged `data-<YYYY-MM>`,
  makes any month's law recoverable (`git show data-2026-10:data/jurisdictions/DEU.json`, or
  `git log -p data/jurisdictions/DEU.json` for every change with its date). The month's report in
  `docs/updates/` says why each change was made.
- **What each persona saw.** `data/history/<YYYY-MM>.json` holds, per jurisdiction and persona (HNWI family,
  expat, nomad): score, regime used, yearly tax in EUR, residence route, and for the family the tax-metric
  scores and the 60-year projection, plus the exchange-rate date and market assumptions of that build.
  - `uv run python -m domicile.history show DEU` shows one country month by month.
  - `uv run python -m domicile.history changes 2026-10 2026-11` lists what changed for each persona; a change
    of exchange rates or assumptions is flagged, so it is not mistaken for a change in the law.

The series starts in October 2026. Never edit or delete a past snapshot; a correction goes in the next month.

## Rules the agents follow

- Never invent a figure; unknown means null and an open question (the research guides in `data/`).
- Research agents run on Sonnet; the review runs on the session's model.
- No commit, push or deploy inside the workflow.
- A new or removed knock-out or red flag is always a decision for the maintainer, listed first in the report.

## When a run fails

The workflow can be resumed: Claude relaunches it with the run id, and finished agents return their
cached results. A failing test or fuzzer finding does not stop the run; it is listed in the report.
