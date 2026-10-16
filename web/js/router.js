// The address bar: every page has a link (#/factbook/SWE, #/explorer/chart, #/compare/calculator).
// A new mode is a new history entry, so Back returns to it; selecting place after place within a mode
// only replaces the entry.

import { state, jur, update } from "./state.js";

const HASH_RE = /^#\/(guided|factbook|explorer|compare|settings)(?:\/([A-Za-z0-9-]+))?$/;
const EXPLORER_VIEWS = ["table", "chart"];
const ROUTE_KEYS = ["mode", "selected", "explorerView", "factbookPage", "compareView"];

let applying = false; // true while the state follows the address (Back/Forward), so it is not written back
let lastMode = null;

export function hashFor() {
  if (state.mode === "factbook") return `#/factbook/${state.factbookPage === "article" && state.selected ? state.selected : state.factbookPage}`;
  if (state.mode === "explorer") return `#/explorer/${state.explorerView}`;
  if (state.mode === "compare" && state.compareView === "calculator") return "#/compare/calculator";
  return `#/${state.mode}`;
}

/** The state patch an address asks for, or null when it is not one of ours. */
export function readHash(hash = window.location.hash) {
  const m = HASH_RE.exec(hash);
  if (!m) return null;
  const [, mode, arg] = m;
  const patch = { mode };
  if (mode === "factbook" && arg) {
    if (["index", "method", "sources"].includes(arg)) patch.factbookPage = arg;
    else if (jur(arg)) Object.assign(patch, { factbookPage: "article", selected: arg });
  }
  if (mode === "explorer" && EXPLORER_VIEWS.includes(arg)) patch.explorerView = arg;
  if (mode === "explorer" && arg === "map") patch.explorerView = "table"; // old links: the big map was retired
  if (mode === "explorer" && arg === "weights") patch.mode = "settings"; // weights moved to Settings
  if (mode === "explorer" && arg === "calculator") Object.assign(patch, { mode: "compare", compareView: "calculator" }); // and the calculator to Compare
  if (mode === "compare") patch.compareView = arg === "calculator" ? "calculator" : "side";
  return patch;
}

/** After a state change: update the address if the page changed. */
export function syncHash(patch) {
  if (!ROUTE_KEYS.some((k) => k in patch)) return;
  const newEntry = "mode" in patch && patch.mode !== lastMode;
  lastMode = state.mode;
  if (applying) return;
  const next = hashFor();
  if (next === window.location.hash) return;
  if (newEntry) window.history.pushState(null, "", next);
  else window.history.replaceState(null, "", next);
}

/** Start following the address: normalise it now, and apply Back/Forward from then on. */
export function startRouting() {
  window.history.replaceState(null, "", hashFor());
  lastMode = state.mode;
  window.addEventListener("popstate", () => {
    const patch = readHash();
    if (!patch) return;
    applying = true;
    try {
      update(patch);
    } finally {
      applying = false;
    }
  });
}
