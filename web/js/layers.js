// The globe's colours: the overall score on the spectrum, red for knock-outs, stripes ("hatch") for
// territories, grey without a score. No cache here: scores are cached in results.js and colours per
// theme in colors.js, so a theme switch recolours correctly.

import { jur } from "./state.js";
import { evalOf } from "./results.js";
import { scoreColor } from "./colors.js";

/** A CSS colour, "var(--…)", or "hatch" for territories (the globe turns that into stripes). */
export function colorOf(id) {
  const e = jur(id);
  if (!e) return "var(--unscored)";
  if (e.territory) return "hatch";
  if (e.ko && e.ko.length) return "var(--band-red)";
  return scoreColor(evalOf(id).score) ?? "var(--unscored)";
}
