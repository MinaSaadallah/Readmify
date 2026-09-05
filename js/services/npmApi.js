/**
 * Readmify - npm Registry enrichment (free, no-auth, CORS *)
 * Only emits strings/URLs into markdown; silent offline fallback.
 */

const NPM_REGISTRY = 'https://registry.npmjs.org';
const NPM_DOWNLOADS = 'https://api.npmjs.org/downloads/point/last-month';

async function fetchJson(url, timeoutMs = 6000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  } finally {
    clearTimeout(t);
  }
}

export async function enrichNpmPackage(pkgName) {
  if (!pkgName) return null;
  const safe = encodeURIComponent(pkgName);
  const [meta, dl] = await Promise.all([
    fetchJson(`${NPM_REGISTRY}/${safe}/latest`),
    fetchJson(`${NPM_DOWNLOADS}/${safe}`)
  ]);
  if (!meta && !dl) return null;
  return {
    name: pkgName,
    version: meta?.version || '',
    description: meta?.description || '',
    homepage: meta?.homepage || '',
    keywords: Array.isArray(meta?.keywords) ? meta.keywords.slice(0, 8) : [],
    downloads: dl?.downloads || 0
  };
}

export function npmBadgeUrls(pkgName, style = 'for-the-badge') {
  const safe = encodeURIComponent(pkgName);
  return {
    version: `https://img.shields.io/npm/v/${safe}?style=${style}`,
    downloads: `https://img.shields.io/npm/dw/${safe}?style=${style}`
  };
}
