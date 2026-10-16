export const meta = {
  name: 'monthly-update',
  description: 'Monthly domicile.wiki update: refresh datasets, scout and verify changes, update data, re-verify a rotation, build, test and review',
  whenToUse: 'Once a month, after `make monthly-prepare`; args come from data/build/monthly-args.json',
  phases: [
    { title: 'Refresh', detail: 'exchange rates and indicator datasets (scripts)' },
    { title: 'Scout', detail: 'one agent per region: tax, immigration and risk changes since the last run' },
    { title: 'Verify', detail: 'a sceptic per candidate checks it against an official source' },
    { title: 'Update', detail: 'one agent per data file: confirmed changes and the re-verification rotation' },
    { title: 'Recipes', detail: 'one agent per projection recipe whose tax file changed or that is due: re-work the hand-checked cases from the statute' },
    { title: 'Check', detail: 'build, tests, simulated visitors, diff report' },
    { title: 'Review', detail: 'cross-check changes against sources and the diff; write the report' },
  ],
}

// args (written by `make monthly-prepare`, see docs/MONTHLY_UPDATE.md):
//   { month: "2026-11", today: "2026-11-16", since: "2026-10-16",
//     snapshot: "data/build/scores_before.json", rotation: [{kind, id, path, last_checked}, ...], recipes: ["DEU", ...] }
const A = args || {}
if (!A.month || !A.today || !A.since || !A.snapshot) throw new Error('missing args: run `make monthly-prepare` and pass data/build/monthly-args.json')
// Recipes are handled in their own stage, after the tax files they depend on have been updated.
const ROTATION = (A.rotation || []).filter((r) => r.kind !== 'recipes')
const RECIPE_ROTATION = (A.rotation || []).filter((r) => r.kind === 'recipes')
const RECIPES = new Set(A.recipes || [])
const SONNET = 'sonnet' // research agents run on Sonnet (CLAUDE.md); the review inherits the session model

const REGIONS = [
  { id: 'eu', name: 'EU member states (and their regions: Spanish communities, Italian regions)' },
  { id: 'europe-other', name: 'Europe outside the EU: UK, Switzerland and cantons, Norway, Iceland, Liechtenstein, Monaco, Andorra, San Marino, the Balkans, Crown Dependencies, Gibraltar' },
  { id: 'mena-africa', name: 'Middle East and Africa (Gulf states and UAE emirates, Türkiye, Israel, North and sub-Saharan Africa, Mauritius, Seychelles)' },
  { id: 'asia-pacific', name: 'Asia and Oceania (Singapore, Hong Kong, Macau, Japan, Malaysia, Thailand, Indonesia, the Philippines, Australia, New Zealand, Pacific islands)' },
  { id: 'americas', name: 'North and South America (USA and states, Canada, Mexico, Panama, Costa Rica, Uruguay, Brazil, Argentina, Chile and others)' },
  { id: 'caribbean', name: 'Caribbean and other offshore jurisdictions (Cayman, Bermuda, Bahamas, BVI, Turks and Caicos, citizenship-by-investment states, Curaçao, Aruba)' },
]

const AREAS = 'tax (capital gains, dividends, wealth tax, inheritance and gift tax incl. spouse and children, special regimes and holding structures; income tax and social security for employees and freelancers), immigration (golden visas, citizenship by investment, passive-income, digital nomad and work permits: new, changed, closed, thresholds and fees), risk (sanctions, capital controls, national-security law, conflict: anything that could add or remove a knock-out or red flag in data/scoring_config.json), cost (school fees or rents that moved sharply)'

const CANDIDATES = {
  type: 'object',
  properties: {
    candidates: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          jurisdiction: { type: 'string', description: 'map id: ISO3 (DEU), or a region code (ES-MD, CH-ZG, US-NY)' },
          area: { type: 'string', enum: ['tax', 'income', 'immigration', 'risk', 'cost'] },
          change: { type: 'string', description: 'what changed, in one or two sentences, with figures' },
          status: { type: 'string', enum: ['in_force', 'enacted_not_yet_in_force', 'announced', 'proposed'] },
          effective_date: { type: 'string' },
          source_url: { type: 'string' },
          source_title: { type: 'string' },
        },
        required: ['jurisdiction', 'area', 'change', 'status', 'source_url'],
      },
    },
    searched: { type: 'string', description: 'what was searched and where, one line' },
  },
  required: ['candidates', 'searched'],
}

const VERDICT = {
  type: 'object',
  properties: {
    verdict: { type: 'string', enum: ['confirmed', 'refuted', 'unverifiable'] },
    in_force: { type: 'boolean' },
    differs_from_site: { type: 'boolean', description: 'true when the site\'s data file says something different today' },
    file: { type: 'string', description: 'the data file that would change, e.g. data/jurisdictions/PRT.json' },
    evidence_url: { type: 'string' },
    note: { type: 'string' },
  },
  required: ['verdict', 'in_force', 'differs_from_site', 'file', 'note'],
}

const CHANGELOG = {
  type: 'object',
  properties: {
    file: { type: 'string' },
    changed: { type: 'boolean' },
    entries: {
      type: 'array',
      items: {
        type: 'object',
        properties: { what: { type: 'string' }, before: { type: 'string' }, after: { type: 'string' }, source_url: { type: 'string' } },
        required: ['what', 'source_url'],
      },
    },
    validate_ok: { type: 'boolean' },
    unresolved: { type: 'array', items: { type: 'string' } },
  },
  required: ['file', 'changed', 'entries', 'validate_ok', 'unresolved'],
}

const GUIDE = {
  'data/jurisdictions': 'data/RESEARCH_GUIDE.md (and the file\'s dossier docs/jurisdictions/<ID>.md)',
  'data/subnational': 'data/RESEARCH_GUIDE.md (dossier docs/jurisdictions/<COUNTRY>-regions.md)',
  'data/income': 'data/INCOME_GUIDE.md (dossier docs/income/<ID>.md)',
  'data/immigration': 'data/IMMIGRATION_GUIDE.md',
  'data/recipes': 'data/RECIPE_GUIDE.md (rates belong in the tax file; a recipe changes only when how a path works changes)',
  'data/succession': 'data/SUCCESSION_GUIDE.md (raise confidence to high only after reading the statute text and the live HCCH table)',
  'data/scoring_config.json': 'the knock-out and red-flag blocks in data/scoring_config.json and docs/research/*.md',
}
const guideFor = (file) => GUIDE[Object.keys(GUIDE).find((k) => file.startsWith(k))] || 'the guides in data/*.md'

// ------------------------------------------------------------------ 1 Refresh (scripts, no research)
phase('Refresh')
const refresh = agent(
  `Refresh the public datasets for the domicile.wiki monthly update (${A.month}). From the repo root run \`make fx\` then \`make indicators\` (both fetch from the network). Then run \`git diff --stat data/fx.json data/indicators/\` and \`git diff data/indicators/manifest.json\`. Report the ECB rate date, and which indicator series changed VALUES (a new release), as opposed to only their "fetched" date. If a command fails, report the error; do not retry more than once and do not edit any code.`,
  { label: 'refresh datasets', phase: 'Refresh', model: SONNET, effort: 'low',
    schema: { type: 'object', properties: { fx_date: { type: 'string' }, indicators_with_new_values: { type: 'array', items: { type: 'string' } }, errors: { type: 'array', items: { type: 'string' } } }, required: ['fx_date', 'indicators_with_new_values', 'errors'] } })

// ------------------------------------------------------------------ 2+3 Scout, then verify each candidate as soon as its region reports
const scoutPrompt = (r) => `You are the ${r.id} scout for the domicile.wiki monthly update (${A.month}; today ${A.today}). Find changes since ${A.since} that affect the site's data for: ${r.name}.

Areas: ${AREAS}.

The site covers the jurisdictions with files in data/jurisdictions/, data/subnational/, data/income/ and data/immigration/ (read the files' "continent"/"region" fields to see which are in your region). Search official sources first (tax authorities, finance ministries, official gazettes, immigration authorities, OFAC/EU sanctions, IMF), then Big Four tax alerts (PwC, EY, KPMG, Deloitte) and reputable law firms. Include announced and proposed changes too, marked as such: the site records them in open questions. Report only changes with a source you opened. Do not edit any file. If nothing changed, return an empty list.`

const verifyPrompt = (c) => `You are a sceptical checker for the domicile.wiki monthly update (today ${A.today}). A scout reported this change:

- Jurisdiction: ${c.jurisdiction}; area: ${c.area}; status: ${c.status}; effective: ${c.effective_date || 'not given'}
- Claim: ${c.change}
- Source: ${c.source_title || ''} ${c.source_url}

1. Confirm or refute it from an official or primary source (the law, gazette, authority page); a second reputable professional source is acceptable only when no official page is reachable. Default to "unverifiable" when you cannot confirm it yourself.
2. Find the data file that holds this today (data/jurisdictions/, data/subnational/, data/income/, data/immigration/, or data/scoring_config.json for knock-outs and red flags) and read it: does the site already say this? Set differs_from_site accordingly, and name the file.
Do not edit any file.`

const scouted = await pipeline(
  REGIONS,
  (r) => agent(scoutPrompt(r), { label: `scout ${r.id}`, phase: 'Scout', model: SONNET, schema: CANDIDATES }),
  (found, r) => parallel((found?.candidates || []).map((c) => () =>
    agent(verifyPrompt(c), { label: `verify ${c.jurisdiction} ${c.area}`, phase: 'Verify', model: SONNET, schema: VERDICT })
      .then((v) => (v ? { ...c, ...v, region: r.id } : null)))),
)
const verified = scouted.filter(Boolean).flat().filter(Boolean)
const confirmed = verified.filter((v) => v.verdict === 'confirmed' && v.differs_from_site && v.file)
const notes = verified.filter((v) => v.verdict === 'confirmed' && !v.in_force && !v.differs_from_site)
log(`${verified.length} candidates checked: ${confirmed.length} confirmed changes to apply, ${verified.filter((v) => v.verdict === 'refuted').length} refuted, ${verified.filter((v) => v.verdict === 'unverifiable').length} unverifiable`)

// ------------------------------------------------------------------ 4 Update: one agent per file (barrier: changes for one file must be merged first)
phase('Update')
const byFile = new Map()
for (const c of confirmed) {
  const f = c.file.startsWith('data/scoring_config') ? 'data/scoring_config.json' : c.file
  if (!byFile.has(f)) byFile.set(f, { file: f, changes: [], rotation: null })
  byFile.get(f).changes.push(c)
}
for (const r of ROTATION) {
  if (!byFile.has(r.path)) byFile.set(r.path, { file: r.path, changes: [], rotation: null })
  byFile.get(r.path).rotation = r
}
log(`${byFile.size} files to update (${ROTATION.length} in the re-verification rotation)`)

const updatePrompt = (job) => {
  const isConfig = job.file === 'data/scoring_config.json'
  const changes = job.changes.map((c, i) => `${i + 1}. [${c.area}, ${c.in_force ? 'in force' : c.status}] ${c.change} — source ${c.evidence_url || c.source_url}. Checker: ${c.note}`).join('\n')
  return `You update one data file of domicile.wiki for the monthly update ${A.month} (today ${A.today}): ${job.file}.
Follow ${guideFor(job.file)}. Never invent a figure: unknown means null plus an open question.
${changes ? `\nApply these confirmed changes (each was checked against a source; re-read the source yourself before editing):\n${changes}\nChanges in force go into the data; enacted-not-yet-in-force and announced ones go into the text and open questions with their dates, not into scored figures.` : ''}
${job.rotation ? `\nThis file is also due for its periodic re-verification (last checked ${job.rotation.last_checked}): re-check every figure against current sources as the guide describes, update what changed, and refresh the verification dates of what you checked.` : ''}
${isConfig ? '\nThis is the shared scoring configuration: change ONLY the knock-out and red-flag country lists and their sources and explanations; touch nothing else. A new knock-out or a removed one is a judgement the maintainer must approve: make the edit, but say so in "unresolved".' : `\nFor a tax or income file, keep its dossier in step (same date on "Last reviewed:" and researched_on when you bump it, a dated Change log line, every new URL under Sources).`}
Then run \`uv run python -m domicile.validate ${job.file}\` until it prints 0 errors, and \`uv run pytest -q tests/test_data.py -k <ID>\` for this file. Edit only this file and its dossier. Report each change with before, after and source.`
}

const updated = (await parallel([...byFile.values()].map((job) => () =>
  agent(updatePrompt(job), { label: `update ${job.file.replace(/^data\//, '')}`, phase: 'Update', model: SONNET, schema: CHANGELOG })))).filter(Boolean)

// ------------------------------------------------------------------ 4b Recipes: after the tax files, because their checks depend on them
phase('Recipes')
const taxChanged = new Map()
for (const u of updated) {
  const m = /^data\/jurisdictions\/([A-Z]{3})\.json$/.exec(u.file || '')
  if (m && u.changed && RECIPES.has(m[1])) taxChanged.set(m[1], u.changes || [])
}
const recipeJobs = [...new Set([...taxChanged.keys(), ...RECIPE_ROTATION.map((r) => r.id)])]
log(`${recipeJobs.length} projection recipes to re-check (${taxChanged.size} because their tax file changed, ${RECIPE_ROTATION.length} due in the rotation)`)

const recipePrompt = (id) => {
  const ch = taxChanged.get(id)
  const due = RECIPE_ROTATION.find((r) => r.id === id)
  return `You maintain one projection recipe of domicile.wiki for the monthly update ${A.month} (today ${A.today}): data/recipes/${id}.json. Follow data/RECIPE_GUIDE.md.
${ch ? `\nThe country's tax file data/jurisdictions/${id}.json was changed this month:\n${JSON.stringify(ch)}\n` : ''}${due ? `\nThe recipe is due for its periodic re-check (last checked ${due.last_checked}): re-read the statutes behind every path and check.\n` : ''}
1. Re-work every case in "checks" BY HAND from the statute: open the law (or the authority's page), apply it step by step, and write the result in "expected" and the steps in "working". Never copy a number from the engine or from the tax file: the point of a check is an independent calculation.
2. Run \`uv run pytest -q tests/test_projection.py -k ${id}\`. If a check fails, find out whether the tax file or your calculation is wrong, and say which. Keep or set "model_difference" only when the engine knowingly simplifies the law, with a model_note naming the simplification; never set it just to make a test pass.
3. If the law changed how a path works (a new or abolished structure, assets now inside or outside the estate, a regime's duration, a kind of tax the engine has no field for) and the recipe cannot express it with its existing fields: do NOT approximate. Add an open question starting "Needs an engine change:" and list it in "unresolved".
4. Rates never go in the recipe; if the tax file is wrong, report it in "unresolved" instead of editing it.
Run \`uv run python -m domicile.validate data/recipes/${id}.json\` until it prints 0 errors. Edit only this file. Report each change with before, after and source.`
}
const recipeUpdates = (await parallel(recipeJobs.map((id) => () =>
  agent(recipePrompt(id), { label: `recipe ${id}`, phase: 'Recipes', model: SONNET, schema: CHANGELOG })))).filter(Boolean)

// ------------------------------------------------------------------ 5 Check (after the dataset refresh has landed)
phase('Check')
const refreshed = await refresh
const check = await agent(
  `Check the domicile.wiki monthly update ${A.month} before review. From the repo root run, in order: \`make build\` (validate, build, gaps), \`uv run pytest -q\`, \`npm test\`, \`uv run python tools/fuzz/journeys.py\`, and \`uv run python -m domicile.diffreport ${A.snapshot}\`. Report pass/fail counts and the first lines of each failure (do not fix anything), the fuzzer findings that are errors, text, overflow, app-error or crash, and the diff report's Markdown verbatim.`,
  { label: 'build and test', phase: 'Check', model: SONNET, effort: 'low',
    schema: { type: 'object', properties: { build_ok: { type: 'boolean' }, tests: { type: 'string' }, failures: { type: 'array', items: { type: 'string' } }, fuzz_findings: { type: 'array', items: { type: 'string' } }, diff_markdown: { type: 'string' } }, required: ['build_ok', 'tests', 'failures', 'fuzz_findings', 'diff_markdown'] } })

// ------------------------------------------------------------------ 6 Review (session model) and the report
phase('Review')
const review = await agent(
  `You review the domicile.wiki monthly update ${A.month} (today ${A.today}; previous run ${A.since}) before the maintainer approves it. Nothing has been committed.

Inputs (JSON):
- refresh: ${JSON.stringify(refreshed)}
- applied changes, per file: ${JSON.stringify(updated)}
- projection recipes re-checked: ${JSON.stringify(recipeUpdates)}
- confirmed but not yet in force (recorded as notes): ${JSON.stringify(notes.map((n) => ({ jurisdiction: n.jurisdiction, change: n.change, effective: n.effective_date, source: n.evidence_url || n.source_url })))}
- refuted or unverifiable scout claims: ${JSON.stringify(verified.filter((v) => v.verdict !== 'confirmed').map((v) => ({ jurisdiction: v.jurisdiction, change: v.change, verdict: v.verdict, note: v.note })))}
- build and tests: ${JSON.stringify({ build_ok: check?.build_ok, tests: check?.tests, failures: check?.failures, fuzz: check?.fuzz_findings })}
- what changed on the site (diff report):
${check?.diff_markdown || '(not available)'}

1. Run \`git diff --stat\` and read the diff of every changed data file. For each applied change, check that the edit matches its source and the guide (no invented figures; in-force vs announced handled correctly; dates and dossiers in step). Open the source when a figure looks off.
2. Explain every large move in the diff report by an applied change or a dataset refresh; flag any you cannot explain. This includes the "60-year projections" section: every path that moved by 2% or more must trace to a named, sourced change, and its recipe's hand-worked checks must have been re-done; any "Needs an engine change" is a decision for the maintainer.
3. List what the maintainer must decide: new or removed knock-outs and red flags, contested facts, failing tests.
4. Write the report to docs/updates/${A.month}.md: a one-paragraph summary; then sections Decisions for the maintainer, Changes applied (per jurisdiction, with sources), Not yet in force (watch list), Rejected claims, Datasets refreshed, Build and tests, and the diff report. Plain, short sentences.
Do not commit, push or deploy.`,
  { label: 'review and report', phase: 'Review',
    schema: { type: 'object', properties: { report: { type: 'string' }, decisions: { type: 'array', items: { type: 'string' } }, problems: { type: 'array', items: { type: 'string' } }, ready_to_publish: { type: 'boolean' } }, required: ['report', 'decisions', 'problems', 'ready_to_publish'] } })

return {
  month: A.month,
  report: review?.report,
  ready_to_publish: review?.ready_to_publish,
  decisions: review?.decisions,
  problems: review?.problems,
  counts: { candidates: verified.length, confirmed: confirmed.length, files_updated: updated.filter((u) => u.changed).length, rotation: ROTATION.length, recipes: recipeUpdates.length },
}
