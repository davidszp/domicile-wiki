// Fetching with timeouts, validation of identifiers, and per-file caching.

const cache = new Map();
const ID_RE = /^[A-Z]{3}$|^[A-Z]{2}-[A-Z0-9]{1,3}$/;
const DOSSIER_RE = /^[A-Z]{3}(-regions)?$|^income\/[A-Z]{3}$/;

export class DataError extends Error {}

function fetchCached(url, as, timeoutMs = 20000) {
  const key = `${as}:${url}`;
  if (cache.has(key)) return cache.get(key);
  const p = (async () => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(url, { signal: ctrl.signal, credentials: "same-origin" });
      if (as === "text" && res.status === 404) return null;
      if (!res.ok) throw new DataError(`${url}: HTTP ${res.status}`);
      return await (as === "text" ? res.text() : res.json());
    } catch (e) {
      cache.delete(key); // never cache a failure: the next request retries
      if (e.name === "AbortError") throw new DataError(`${url}: request timed out`);
      if (e instanceof DataError) throw e;
      throw new DataError(`${url}: ${e.message}`);
    } finally {
      clearTimeout(t);
    }
  })();
  cache.set(key, p);
  return p;
}

const fetchJson = (url) => fetchCached(url, "json");

export const loadScores = () => fetchJson("data/scores.json");
export const loadWorld = () => fetchJson("data/world.topo.json");
export const loadDetail = () => fetchJson("data/detail.topo.json");
export const loadRegions = () => fetchJson("data/regions.topo.json");
export const loadSources = () => fetchJson("data/sources.json");
export const loadViews = () => fetchJson("data/views.json");

export function loadProfile(id) {
  if (!ID_RE.test(id)) return Promise.reject(new DataError(`invalid jurisdiction id ${id}`));
  return fetchJson(`data/profiles/${id}.json`);
}

export function loadDossier(name) {
  if (!DOSSIER_RE.test(name)) return Promise.reject(new DataError(`invalid dossier name ${name}`));
  return fetchCached(`data/dossiers/${name}.md`, "text"); // null when no dossier exists
}
