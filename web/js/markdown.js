// Minimal, safe Markdown -> DOM renderer for the jurisdiction dossiers. Supports headings,
// paragraphs, bullet/numbered lists, tables, **bold**, *italic*, `code` and [links](https://...).
// It builds nodes with textContent only; raw HTML in the source is shown as text.

import { h, extLink } from "./dom.js";

function inline(text) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|https?:\/\/[^\s)<>]+)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    if (t.startsWith("**")) out.push(h("strong", null, t.slice(2, -2)));
    else if (t.startsWith("`")) out.push(h("code", null, t.slice(1, -1)));
    else if (t.startsWith("[")) {
      const mm = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(t);
      out.push(extLink(mm[2], mm[1]));
    } else if (t.startsWith("http")) out.push(extLink(t, t));
    else out.push(h("em", null, t.slice(1, -1)));
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function renderMarkdown(src) {
  const root = h("div", { class: "markdown" });
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*$/.test(line)) {
      i++;
      continue;
    }
    const hm = /^(#{1,6})\s+(.*)$/.exec(line);
    if (hm) {
      const level = Math.min(6, hm[1].length + 1); // the panel already has an h2
      root.append(h(`h${level}`, null, ...inline(hm[2])));
      i++;
      continue;
    }
    if (/^\s*\|/.test(line)) {
      const rows = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(lines[i++]);
      const cells = (r) => r.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const table = h("table", { class: "md-table" });
      const body = rows.filter((r) => !/^\s*\|[\s:|-]+\|\s*$/.test(r));
      body.forEach((r, ri) => {
        table.append(h("tr", null, cells(r).map((c) => h(ri === 0 ? "th" : "td", null, ...inline(c)))));
      });
      root.append(h("div", { class: "table-wrap" }, table));
      continue;
    }
    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const list = h(ordered ? "ol" : "ul");
      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
        list.append(h("li", null, ...inline(lines[i].replace(/^\s*([-*]|\d+\.)\s+/, ""))));
        i++;
      }
      root.append(list);
      continue;
    }
    if (/^```/.test(line)) {
      const buf = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
      i++;
      root.append(h("pre", null, h("code", null, buf.join("\n"))));
      continue;
    }
    const buf = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|\s*\||\s*([-*]|\d+\.)\s|```)/.test(lines[i])) buf.push(lines[i++]);
    root.append(h("p", null, ...inline(buf.join(" "))));
  }
  return root;
}
