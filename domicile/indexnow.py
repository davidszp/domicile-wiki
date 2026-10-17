"""Tell Bing (and the other IndexNow engines: Yandex, Seznam, Naver) that pages changed.

``python -m domicile.indexnow`` (``make indexnow``) submits every URL in ``web/sitemap.xml``; run it after
deploying. The engines check the key at ``https://domicile.wiki/<KEY>.txt``, so that file must be live
first. Google does not take IndexNow: it reads the sitemap named in robots.txt and Search Console.
"""

from __future__ import annotations

import json
import re
import urllib.request
from pathlib import Path

from domicile.pages import SITE

KEY = "8eac7b202997527b17de2baaffbfc87d"
WEB = Path(__file__).resolve().parent.parent / "web"


def urls() -> list[str]:
    return re.findall(r"<loc>([^<]+)</loc>", (WEB / "sitemap.xml").read_text())


def main() -> None:
    body = {"host": SITE.removeprefix("https://"), "key": KEY, "keyLocation": f"{SITE}/{KEY}.txt", "urlList": urls()}
    req = urllib.request.Request("https://api.indexnow.org/indexnow", data=json.dumps(body).encode(),
                                 headers={"Content-Type": "application/json; charset=utf-8", "User-Agent": "domicile.wiki indexnow"})
    with urllib.request.urlopen(req, timeout=60) as r:  # 200 or 202: accepted
        print(f"IndexNow: {len(body['urlList'])} URLs submitted, HTTP {r.status}")


if __name__ == "__main__":
    main()
