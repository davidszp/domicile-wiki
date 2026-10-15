"""Local static server that applies the same headers as web/_headers (CSP included), so policy
violations show up during development: ``python -m domicile.serve [port]``."""

from __future__ import annotations

import functools
import http.server
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WEB = ROOT / "web"


def site_headers() -> list[tuple[re.Pattern, list[dict]]]:
    """Parse web/_headers (Cloudflare Pages format): an unindented path pattern, then indented
    'Name: value' lines. '*' matches any characters; every matching block applies."""
    rules: list[tuple[re.Pattern, list[dict]]] = []
    for line in (WEB / "_headers").read_text().splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if not line[0].isspace():
            pattern = "^" + ".*".join(re.escape(part) for part in line.strip().split("*")) + "$"
            rules.append((re.compile(pattern), []))
        else:
            key, value = line.strip().split(":", 1)
            rules[-1][1].append({"key": key.strip(), "value": value.strip()})
    return rules


class Handler(http.server.SimpleHTTPRequestHandler):
    rules = site_headers()
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map, ".js": "text/javascript",
                      ".json": "application/json", ".md": "text/markdown; charset=utf-8", ".svg": "image/svg+xml"}

    def end_headers(self) -> None:
        path = self.path.split("?", 1)[0]
        for pattern, headers in self.rules:
            if pattern.match(path):
                for hd in headers:
                    if hd["key"] == "Strict-Transport-Security":
                        continue  # meaningless over plain http
                    value = hd["value"].replace("; upgrade-insecure-requests", "")
                    self.send_header(hd["key"], value)
        super().end_headers()

    def log_message(self, fmt: str, *args) -> None:
        if "--quiet" not in sys.argv:
            super().log_message(fmt, *args)


def serve(port: int = 8765) -> http.server.ThreadingHTTPServer:
    handler = functools.partial(Handler, directory=str(WEB))
    return http.server.ThreadingHTTPServer(("127.0.0.1", port), handler)


if __name__ == "__main__":
    port = int(next((a for a in sys.argv[1:] if a.isdigit()), 8765))
    httpd = serve(port)
    print(f"serving {WEB} on http://127.0.0.1:{port}/")
    httpd.serve_forever()
