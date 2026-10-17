// One continuous colour scale for scores, like the visible spectrum: violet (best) through blue,
// green, yellow and orange to red (weakest). Used by the globe, the Explorer chart and the
// score chips. The stops are CSS tokens (--spec-*), so each theme has its own; they sit at the
// middle of the score bands in data/scoring_config.json, so a score keeps the colour its band had.

const STOPS = [
  [90, "--spec-violet"],
  [80, "--spec-blue"],
  [69, "--spec-green"],
  [57.5, "--spec-yellow"],
  [46, "--spec-orange"],
  [34, "--spec-red"],
];

let cache = { theme: null, stops: null, colors: new Map() };

function hexToRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return [128, 128, 128];
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function themeKey() {
  return `${document.documentElement.getAttribute("data-theme") || ""}|${window.matchMedia("(prefers-color-scheme: dark)").matches}`;
}

function stops() {
  const key = themeKey();
  if (cache.theme !== key) {
    const cs = getComputedStyle(document.documentElement);
    cache = { theme: key, stops: STOPS.map(([at, v]) => [at, hexToRgb(cs.getPropertyValue(v))]), colors: new Map() };
  }
  return cache.stops;
}

/** RGB for a score; null when there is no score. Scores are rounded to 0.5 for caching. */
export function scoreRgb(score) {
  if (score === null || score === undefined || Number.isNaN(score)) return null;
  const s = stops();
  const x = Math.round(score * 2) / 2;
  if (cache.colors.has(x)) return cache.colors.get(x);
  let rgb;
  if (x >= s[0][0]) rgb = s[0][1];
  else if (x <= s[s.length - 1][0]) rgb = s[s.length - 1][1];
  else {
    const i = s.findIndex(([at]) => x >= at); // s is ordered from best to worst
    const [hiAt, hi] = s[i - 1];
    const [loAt, lo] = s[i];
    const t = (x - loAt) / (hiAt - loAt);
    rgb = lo.map((c, k) => Math.round(c + (hi[k] - c) * t));
  }
  cache.colors.set(x, rgb);
  return rgb;
}

export function scoreColor(score) {
  const rgb = scoreRgb(score);
  return rgb ? `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` : null;
}

/** Dark or light text for a chip on this background (WCAG relative luminance). */
export function textOn(rgb) {
  const lin = rgb.map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  const L = 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
  return L > 0.36 ? "#14161a" : "#ffffff";
}

/** Re-run `fn` whenever the theme changes (the stops are per theme). */
export function onThemeChange(fn) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", fn);
  new MutationObserver(fn).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
}
