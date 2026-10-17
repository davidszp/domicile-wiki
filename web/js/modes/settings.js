// Settings: everything the reader can keep, stored in this browser only (no login). Weight sets,
// knock-out rules and exceptions, and export/import so settings can move to another device.

import { h } from "../dom.js";
import { state, update, entries, jur, personaCfg, taxMetrics, koRules, defaultKo, settingsSnapshot, applySettings,
  saveSettings, storageAvailable, defaultWeightsFor } from "../state.js";
import { normalizeWeights } from "../scoring.js";
import { renderWeights } from "../panels/weights.js";

/** Label and explanation of a knock-out rule from the scoring configuration. */
function ruleInfo(id) {
  const ko = state.cfg.knockout;
  const c = ko.criteria.find((x) => x.id === id);
  if (c) return { label: c.label, explanation: c.explanation };
  return { label: ko[id]?.label ?? id, explanation: ko[id]?.explanation ?? "" };
}

/** Countries a rule rules out for the active persona, by default (before any setting). */
function countriesHit(ruleId) {
  return entries().filter(([id, e]) => e.level === "country" && defaultKo(id).some((k) => k.id === ruleId))
    .map(([, e]) => e.name).sort();
}

const taxShare = (w, persona) => {
  const n = normalizeWeights(w);
  return Math.round(taxMetrics(persona).reduce((a, m) => a + (n[m] || 0), 0) * 100);
};

function weightsSection(ctx) {
  const p = state.persona;
  const custom = JSON.stringify(state.weights) !== JSON.stringify(defaultWeightsFor(p));
  const name = h("input", { type: "text", id: "set-name", maxlength: 60, placeholder: "Name, e.g. “Safety first”", "aria-label": "Name for these weights" });
  const save = () => {
    const n = name.value.trim();
    if (!n) return name.focus();
    const rest = state.weightSets.filter((w) => !(w.persona === p && w.name === n));
    update({ weightSets: [...rest, { name: n, persona: p, weights: { ...state.weights } }] }, { persist: true });
  };
  name.addEventListener("keydown", (e) => e.key === "Enter" && save());
  const mine = state.weightSets.filter((w) => w.persona === p);
  return h("section", { class: "settings-card" },
    h("h3", null, `Weights for ${personaCfg().label}`),
    h("p", { class: "small muted" }, `Now: ${custom ? "your own" : "the defaults"}. Your current weights are always kept in this browser; save them under a name to switch between several.`),
    h("div", { class: "row-actions" }, name, h("button", { id: "set-save", onclick: save }, "Save current weights")),
    mine.length ? h("ul", { class: "saved-list" }, mine.map((w) => {
      const active = JSON.stringify(w.weights) === JSON.stringify(state.weights);
      return h("li", null,
        h("span", null, h("strong", null, w.name), h("span", { class: "small muted" }, ` · taxes ${taxShare(w.weights, p)}%`), active ? h("span", { class: "badge" }, "in use") : null),
        h("span", { class: "row-actions" },
          h("button", { disabled: active, onclick: () => { update({ weights: { ...w.weights } }, { persist: true }); ctx.refresh(); } }, "Use"),
          h("button", { "aria-label": `Delete ${w.name}`, onclick: () => update({ weightSets: state.weightSets.filter((x) => x !== w) }, { persist: true }) }, "Delete")));
    })) : h("p", { class: "small muted" }, "No saved weights yet."),
    sliders(ctx));
}

/** The sliders (panels/weights.js); they update in place, so the page is not re-rendered while dragging. */
function sliders(ctx) {
  const box = h("div", { class: "weights-box", id: "panel" });
  renderWeights(box, ctx);
  return box;
}

function knockoutSection(ctx) {
  const p = state.persona;
  const off = state.koOff[p] || [];
  const setOff = (list) => update({ koOff: { ...state.koOff, [p]: list } }, { persist: true });
  const rules = koRules(p).map((id) => ({ id, ...ruleInfo(id), hit: countriesHit(id) }))
    // Several rules share a label (two corruption measures): show them together.
    .filter((r) => r.hit.length || !off.includes(r.id));
  const ruledOutNow = entries().filter(([id, e]) => e.level === "country" && defaultKo(id).length).map(([id, e]) => [id, e.name]).sort((a, b) => a[1].localeCompare(b[1]));
  const add = h("select", { id: "ko-exempt-add", "aria-label": "Keep a country in" },
    h("option", { value: "" }, "Keep a country in…"),
    ruledOutNow.filter(([id]) => !state.koExempt.includes(id)).map(([id, n]) => h("option", { value: id }, n)));
  add.addEventListener("change", () => add.value && update({ koExempt: [...state.koExempt, add.value] }, { persist: true }));
  return h("section", { class: "settings-card" },
    h("h3", null, `Knock-out rules for ${personaCfg().label}`),
    h("p", { class: "small muted" }, "A knock-out removes a country from the rankings, whatever its score, and colours it red. Switch off a rule you do not share, or keep single countries in. Your choice applies in all four views; the country page then says it was kept in by your settings."),
    h("ul", { class: "ko-rules" }, rules.map((r) => {
      const c = h("input", { type: "checkbox", id: `ko-${r.id}` });
      c.checked = !off.includes(r.id);
      c.addEventListener("change", () => setOff(c.checked ? off.filter((x) => x !== r.id) : [...off, r.id]));
      return h("li", null,
        h("label", { class: "chk big", for: `ko-${r.id}` }, c, h("span", null, h("strong", null, r.label))),
        h("p", { class: "small muted" }, r.explanation),
        h("details", { class: "small" }, h("summary", null, `Rules out ${r.hit.length} ${r.hit.length === 1 ? "country" : "countries"} by default`), h("p", null, r.hit.join(", "))));
    })),
    h("h4", null, "Never rule out"),
    state.koExempt.length ? h("ul", { class: "saved-list" }, state.koExempt.map((id) => h("li", null,
      h("span", null, h("strong", null, jur(id)?.name ?? id), h("span", { class: "small muted" }, ` · would be ruled out for: ${[...new Set(defaultKo(id).map((k) => k.label))].join("; ").toLowerCase() || "nothing (no knock-out for this persona)"}`)),
      h("button", { "aria-label": `Rule out ${jur(id)?.name ?? id} again`, onclick: () => update({ koExempt: state.koExempt.filter((x) => x !== id) }, { persist: true }) }, "Remove")))) : h("p", { class: "small muted" }, "No exceptions."),
    h("div", { class: "row-actions" }, add,
      off.length || state.koExempt.length ? h("button", { onclick: () => update({ koOff: { ...state.koOff, [p]: [] }, koExempt: [] }, { persist: true }) }, "Restore the default rules") : null),
    h("p", { class: "small" }, h("button", { class: "linklike", onclick: () => ctx.go({ mode: "factbook", factbookPage: "method" }) }, "Why these rules (Method)")));
}

function storageSection(ctx) {
  const msg = h("p", { class: "small", role: "status", id: "settings-msg" });
  const file = h("input", { type: "file", accept: "application/json,.json", id: "settings-import", class: "sr-only" });
  file.addEventListener("change", async () => {
    const f = file.files && file.files[0];
    if (!f) return;
    try {
      if (f.size > 200000) throw new Error("file too large");
      const data = JSON.parse(await f.text());
      const imported = data && data.settings ? data.settings : data;
      applySettings(imported);
      if (imported && ["system", "light", "dark"].includes(imported.theme)) window.domicileTheme?.set(imported.theme);
      saveSettings();
      update({ persona: state.persona, weights: state.weights, citizenship: state.citizenship, koOff: state.koOff, koExempt: state.koExempt,
        weightSets: state.weightSets, shortlist: state.shortlist, home: state.home, includeStructures: state.includeStructures });
      ctx.refresh();
      document.getElementById("settings-msg").textContent = "Settings imported.";
    } catch (e) {
      msg.textContent = `Could not import: ${e.message}`;
    }
    file.value = "";
  });
  const exportFile = () => {
    const blob = new Blob([JSON.stringify({ app: "domicile.wiki", version: 1, exported: new Date().toISOString().slice(0, 10), settings: settingsSnapshot() }, null, 2)], { type: "application/json" });
    const a = h("a", { download: "domicile-settings.json" });
    a.href = URL.createObjectURL(blob);
    document.body.append(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  };
  const reset = () => {
    if (!window.confirm("Reset all settings in this browser: weights, saved weights, knock-out rules, shortlist, home, persona, passport and theme?")) return;
    applySettings({ persona: "family_office", citizenship: "EU", shortlist: [], mode: state.mode, view: state.view });
    window.domicileTheme?.set("system");
    state.home = null;
    saveSettings();
    update({ persona: state.persona, weights: state.weights, citizenship: state.citizenship, koOff: {}, koExempt: [], weightSets: [], shortlist: [], home: null, includeStructures: true, compare: [] });
    ctx.refresh();
  };
  const current = window.domicileTheme ? window.domicileTheme.get() : "system";
  const themeBtn = (v, label) => h("button", { type: "button", "data-theme-choice": v, "aria-pressed": String(current === v) }, label);
  return h("section", { class: "settings-card" },
    h("h3", null, "Appearance"),
    h("div", { class: "theme-switch", role: "group", "aria-label": "Colour theme" }, themeBtn("system", "Auto"), themeBtn("light", "Light"), themeBtn("dark", "Dark")),
    h("p", { class: "small muted" }, "Auto follows your device. Saved with your other settings and included in the export."),
    h("h3", null, "Where this is kept"),
    h("p", { class: "small" }, storageAvailable()
      ? "In this browser only (its local storage). Nothing is sent anywhere and there is no account. Clearing this site's data, or a private window, starts from the defaults. To use your settings on another device, export them to a file and import it there."
      : "This browser does not allow the site to store anything (private mode or blocked site data), so settings last only until you close the page. Export them to keep them."),
    h("div", { class: "row-actions" },
      h("button", { id: "settings-export", onclick: exportFile }, "Export settings"),
      h("label", { class: "button-like", for: "settings-import" }, "Import settings…"), file,
      h("button", { id: "settings-reset", onclick: reset }, "Reset everything")),
    msg);
}

export function renderSettings(stage, ctx) {
  stage.append(h("header", { class: "stage-head" },
    h("h2", null, "Settings"),
    h("p", { class: "muted" }, `Saved in this browser, no login. Weights and knock-out rules are per persona; you are viewing ${personaCfg().label} (switch on the left).`)),
  h("div", { class: "settings-grid" }, weightsSection(ctx), knockoutSection(ctx), storageSection(ctx)));
}
