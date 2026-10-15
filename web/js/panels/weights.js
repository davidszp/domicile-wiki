import { h } from "../dom.js";
import { state, update, metricsFor, taxMetrics, personaCfg, isIncomePersona } from "../state.js";
import { normalizeWeights, reweightTaxShare } from "../scoring.js";

// This panel is not re-rendered when weights change (main.js gives it no dependencies): sliders keep
// keyboard focus, and the percentages are updated in place. Presets re-render it explicitly.
function metricDescription(k) {
  const cfg = state.cfg;
  if (isIncomePersona()) {
    const p = personaCfg();
    if (k === "income_tax") return cfg.income_tax_transform.description;
    if (k === "cost") return p.cost.description;
    if (k === "visa") return p.visa.description;
    if (k === "leftover") return p.leftover.description;
    if (k === "scene") return p.scene.description;
    if (k === "income_tax" && p.salary_multiplier) return `${cfg.income_tax_transform.description} ${p.salary_multiplier.description}`;
  }
  return (cfg.tax_transforms[k] || cfg.nontax_transforms[k] || {}).description || "";
}

export function renderWeights(panel, ctx) {
  const outputs = {};
  const summary = h("p");

  const refreshNumbers = () => {
    const norm = normalizeWeights(state.weights);
    const taxShare = taxMetrics().reduce((a, m) => a + norm[m], 0);
    summary.replaceChildren(h("strong", null, `Taxation: ${(taxShare * 100).toFixed(1)}%`), ` · non-tax: ${((1 - taxShare) * 100).toFixed(1)}%`);
    for (const [k, out] of Object.entries(outputs)) out.textContent = `${state.weights[k]} pts · ${(norm[k] * 100).toFixed(1)}%`;
  };

  const applyPreset = (weights) => {
    update({ weights }, { persist: true });
    ctx.refresh(); // move the sliders to the new values
  };

  panel.append(h("h2", null, `Weights: ${personaCfg().label}`),
    h("p", { class: "small muted" }, "Weights are points, not percentages; they are normalised so the total is always 100%. Changes apply instantly to the map, rankings and profiles and are remembered in this browser only. Each persona keeps its own weights."),
    summary,
    h("div", { class: "row-actions" },
      h("button", { onclick: () => applyPreset({ ...state.defaultWeights }) }, "Reset to defaults"),
      ...state.cfg.sensitivity_tax_shares.map((s) => h("button", {
        onclick: () => {
          const r = reweightTaxShare(state.defaultWeights, s, taxMetrics());
          applyPreset(Object.fromEntries(Object.entries(r).map(([k, v]) => [k, Math.round(v * 1000) / 10])));
        },
      }, `Tax ${s * 100}%`))));

  for (const group of ["tax", "nontax"]) {
    panel.append(h("h3", null, group === "tax" ? "Tax metrics" : "Non-tax metrics"));
    for (const [k, m] of Object.entries(metricsFor()).filter(([, m]) => m.group === group)) {
      const out = (outputs[k] = h("output", { for: `w-${k}` }));
      const input = h("input", { type: "range", id: `w-${k}`, min: 0, max: 40, step: 1, value: state.weights[k], "aria-describedby": `w-${k}-desc` });
      input.addEventListener("input", () => { out.textContent = `${input.value} pts`; });
      input.addEventListener("change", () => {
        const next = { ...state.weights, [k]: Number(input.value) };
        if (Object.values(next).every((v) => v === 0)) {
          input.value = state.weights[k];
          out.textContent = "At least one weight must stay above zero";
          return;
        }
        update({ weights: next }, { persist: true });
        refreshNumbers();
      });
      panel.append(h("div", { class: "weight-row" }, h("label", { for: `w-${k}` }, m.label), input, out,
        h("div", { class: "small muted", id: `w-${k}-desc` }, metricDescription(k))));
    }
  }
  refreshNumbers();
}
