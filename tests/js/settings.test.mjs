// Settings import (Settings page, "Import settings…"): the file comes from the reader, so applySettings()
// must keep only valid values whatever it is given, and knock-out settings must apply through jur().
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { state, initState, applySettings, settingsSnapshot, jur, defaultKo } from "../../web/js/state.js";

const data = JSON.parse(fs.readFileSync(new URL("../../web/data/scores.json", import.meta.url)));
initState(data); // no localStorage in Node: starts from the defaults

test("garbage of every type falls back to the defaults", () => {
  for (const junk of [null, 42, "x", [], { persona: "admin", citizenship: "MARS", weights: "heavy", shortlist: "CHN",
    weightSets: [{ name: "", persona: "family_office" }, { name: "ok", persona: "nobody" }, 7], koOff: { family_office: ["rm -rf", 3] },
    koExempt: ["ZZZ", { id: "CHN" }], home: "<script>", priorities: { family_office: [99, -1, "0"] } }]) {
    applySettings(junk);
    assert.equal(state.persona, "family_office");
    assert.equal(state.citizenship, "EU");
    assert.deepEqual(state.shortlist, []);
    assert.deepEqual(state.weightSets, []);
    assert.deepEqual(state.koOff.family_office ?? [], []);
    assert.deepEqual(state.koExempt, []);
    assert.equal(state.home, null);
    assert.deepEqual(state.prioritiesByPersona.family_office ?? [], []);
  }
});

test("weights are clamped, and all-zero weights restore the defaults", () => {
  applySettings({ personaWeights: { family_office: { capital_gains: 500, dividends: -3, wealth_tax: "7" } } });
  assert.equal(state.weights.capital_gains, 15); // 500 is out of range: default kept
  assert.equal(state.weights.wealth_tax, 7);
  const zeros = Object.fromEntries(Object.keys(state.weights).map((k) => [k, 0]));
  applySettings({ personaWeights: { family_office: zeros } });
  assert.ok(Object.values(state.weights).some((v) => v > 0));
});

test("a valid file round-trips through export and import", () => {
  applySettings({ persona: "nomad", citizenship: "US", shortlist: ["PRT", "NOPE"], home: "DEU", koExempt: ["CHN"],
    weightSets: [{ name: " Safety first ", persona: "family_office", weights: { safety: 30 } }] });
  const snap = JSON.parse(JSON.stringify(settingsSnapshot()));
  applySettings({});
  applySettings(snap);
  assert.equal(state.persona, "nomad");
  assert.equal(state.citizenship, "US");
  assert.deepEqual(state.shortlist, ["PRT"]);
  assert.equal(state.home, "DEU");
  assert.equal(state.weightSets[0].name, "Safety first");
  assert.equal(state.weightSets[0].weights.safety, 30);
  applySettings({ persona: "family_office", citizenship: "EU" });
});

test("knock-out exceptions and switched-off rules apply through jur()", () => {
  applySettings({ persona: "family_office" }); // a file without a persona keeps the current one
  assert.ok(jur("CHN").ko.length > 0, "China is ruled out by default");
  applySettings({ persona: "family_office", koExempt: ["CHN"] });
  assert.equal(jur("CHN").ko.length, 0);
  assert.ok(jur("CHN").koWaived.length > 0 && jur("CHN").koExempt);
  assert.ok(defaultKo("CHN").length > 0, "defaultKo still reports the data's knock-outs");
  applySettings({ persona: "family_office", koOff: { family_office: ["capital_controls", "security_state_courts"] } });
  assert.equal(jur("CHN").ko.length, 0);
  applySettings({ persona: "family_office" });
  assert.ok(jur("CHN").ko.length > 0);
});
