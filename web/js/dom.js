// Safe DOM construction. Data is only ever inserted as text nodes or vetted attributes;
// nothing in the app assigns innerHTML, so researched text cannot inject markup or script.

const BLOCKED_ATTRS = new Set(["style", "srcdoc"]);
const URL_ATTRS = new Set(["href", "src", "action", "formaction", "xlink:href"]);

export function safeUrl(url) {
  try {
    const u = new URL(String(url), window.location.href);
    return u.protocol === "https:" || u.protocol === "http:" ? u.href : null;
  } catch {
    return null;
  }
}

export function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "dataset") Object.assign(el.dataset, v);
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (URL_ATTRS.has(k)) {
      const u = safeUrl(v); // http(s) only: no javascript:, data: or other schemes
      if (u) el.setAttribute(k, u);
    } else if (BLOCKED_ATTRS.has(k) || k.startsWith("on")) {
      throw new Error(`attribute ${k} is not allowed`);
    } else el.setAttribute(k, v === true ? "" : String(v));
  }
  append(el, children);
  return el;
}

export function append(el, children) {
  for (const c of children.flat(Infinity)) {
    if (c === null || c === undefined || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

export function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
  return el;
}

export function extLink(url, text) {
  const u = safeUrl(url);
  if (!u) return h("span", null, text);
  return h("a", { href: u, target: "_blank", rel: "noopener noreferrer nofollow" }, text);
}

// Formatting -----------------------------------------------------------------------

export const fmtPct = (x, digits = 1) => (x === null || x === undefined ? "n/a" : `${(x * 100).toFixed(digits)}%`);
export const fmtScore = (x) => (x === null || x === undefined ? "–" : x.toFixed(1));
const eurFmt = new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
export const fmtEur = (x) => (x === null || x === undefined ? "n/a" : eurFmt.format(x));
export function fmtMoney(amount, currency) {
  try {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${Math.round(amount).toLocaleString("en-GB")} ${currency}`;
  }
}
