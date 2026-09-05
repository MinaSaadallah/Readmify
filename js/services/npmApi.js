/**
 * npm registry lookup + shields.io badge builder — free, keyless, no signup.
 */

export async function enrichNpmPackage(packageName) {
  if (!packageName || !packageName.trim()) return null;
  const name = packageName.trim();
  const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}/latest`);
  if (!res.ok) throw new Error(`Package "${name}" not found on npm`);
  const data = await res.json();
  return {
    name: data.name,
    version: data.version,
    description: data.description || ''
  };
}

export function npmBadgeUrls(packageName, style = 'for-the-badge') {
  const encoded = encodeURIComponent(packageName);
  return {
    version: `https://img.shields.io/npm/v/${encoded}.svg?style=${style}&logo=npm`,
    downloads: `https://img.shields.io/npm/dm/${encoded}.svg?style=${style}&logo=npm`,
    packageUrl: `https://www.npmjs.com/package/${packageName}`
  };
}
