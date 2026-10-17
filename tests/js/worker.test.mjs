import { test } from "node:test";
import assert from "node:assert/strict";
import worker from "../../worker/index.js";

const env = { ASSETS: { fetch: (req) => new Response(`asset ${new URL(req.url).pathname}`) } };

test("www redirects permanently to the apex, keeping path and query", async () => {
  const res = await worker.fetch(new Request("https://www.domicile.wiki/places/portugal/?a=1"), env);
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("location"), "https://domicile.wiki/places/portugal/?a=1");
});

test("the apex and the preview address are served from the assets", async () => {
  for (const host of ["domicile.wiki", "domicile-preview.domicile-web.workers.dev"]) {
    const res = await worker.fetch(new Request(`https://${host}/places/`), env);
    assert.equal(res.status, 200);
    assert.equal(await res.text(), "asset /places/");
  }
});
