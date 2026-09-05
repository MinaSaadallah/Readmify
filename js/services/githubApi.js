/**
 * Read-only, unauthenticated GitHub repo scanner.
 * Uses only the public, keyless GitHub REST API and raw.githubusercontent.com —
 * no token, no backend, subject to GitHub's anonymous rate limit (60 req/hr/IP),
 * which is why successful scans are cached briefly in localStorage.
 */

const CACHE_PREFIX = 'readmify_scan_';
const CACHE_TTL_MS = 30 * 60 * 1000;

export function parseGitHubRepoInput(input) {
  if (!input) return null;
  const trimmed = input.trim().replace(/\.git$/, '').replace(/\/$/, '');
  const urlMatch = trimmed.match(/github\.com\/([^/\s]+)\/([^/\s]+)/i);
  if (urlMatch) return { owner: urlMatch[1], repo: urlMatch[2] };
  const shortMatch = trimmed.match(/^([\w.-]+)\/([\w.-]+)$/);
  if (shortMatch) return { owner: shortMatch[1], repo: shortMatch[2] };
  return null;
}

function readCache(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL_MS) return null;
    return data;
  } catch (e) {
    return null;
  }
}

function writeCache(key, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ ts: Date.now(), data }));
  } catch (e) { /* storage full or unavailable — non-fatal */ }
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${url}`);
  return res.json();
}

async function fetchRawFile(owner, repo, branch, path) {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`);
    if (!res.ok) return null;
    return await res.text();
  } catch (e) {
    return null;
  }
}

export async function fetchGitHubRepoFullDetails(owner, repo, onProgress) {
  const cacheKey = `${owner}/${repo}`.toLowerCase();
  const cached = readCache(cacheKey);
  if (cached) return cached;

  const report = (msg) => { if (typeof onProgress === 'function') onProgress({ message: msg }); };

  report('Fetching repo metadata...');
  const repoInfo = await fetchJson(`https://api.github.com/repos/${owner}/${repo}`);

  report('Fetching languages...');
  let languages = {};
  try { languages = await fetchJson(`https://api.github.com/repos/${owner}/${repo}/languages`); } catch (e) { /* optional */ }

  const branch = repoInfo.default_branch || 'main';

  report('Reading package manifest...');
  let packageJson = null;
  const pkgRaw = await fetchRawFile(owner, repo, branch, 'package.json');
  if (pkgRaw) { try { packageJson = JSON.parse(pkgRaw); } catch (e) { /* malformed, skip */ } }

  const hasRequirementsTxt = !!(await fetchRawFile(owner, repo, branch, 'requirements.txt'));
  const hasCargoToml = !!(await fetchRawFile(owner, repo, branch, 'Cargo.toml'));
  const hasGoMod = !!(await fetchRawFile(owner, repo, branch, 'go.mod'));

  report('Fetching contributors...');
  let contributors = [];
  try { contributors = await fetchJson(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=6`); } catch (e) { /* optional */ }

  report('Fetching latest release...');
  let latestRelease = null;
  try { latestRelease = await fetchJson(`https://api.github.com/repos/${owner}/${repo}/releases/latest`); } catch (e) { /* no releases, fine */ }

  const topLanguages = Object.keys(languages).slice(0, 8);
  const matchedTechIds = guessTechIds(topLanguages, packageJson);

  let installSteps = [{ title: 'Clone the repository', cmd: `git clone https://github.com/${owner}/${repo}.git\ncd ${repo}` }];
  if (packageJson) {
    installSteps.push({ title: 'Install dependencies', cmd: 'npm install' });
    if (packageJson.scripts?.dev) installSteps.push({ title: 'Start the dev server', cmd: 'npm run dev' });
    else if (packageJson.scripts?.start) installSteps.push({ title: 'Start the app', cmd: 'npm start' });
  } else if (hasRequirementsTxt) {
    installSteps.push({ title: 'Install dependencies', cmd: 'pip install -r requirements.txt' });
  } else if (hasCargoToml) {
    installSteps.push({ title: 'Build the project', cmd: 'cargo build --release' });
  } else if (hasGoMod) {
    installSteps.push({ title: 'Build the project', cmd: 'go build ./...' });
  }

  const result = {
    owner, repo,
    description: repoInfo.description || '',
    homepage: repoInfo.homepage || '',
    stars: repoInfo.stargazers_count || 0,
    defaultBranch: branch,
    topLanguages,
    matchedTechIds,
    packageJson,
    installSteps,
    contributors: (contributors || []).map(c => ({ login: c.login, avatarUrl: c.avatar_url, url: c.html_url })),
    latestVersion: latestRelease?.tag_name || null,
    license: repoInfo.license?.spdx_id || null
  };

  writeCache(cacheKey, result);
  return result;
}

const LANGUAGE_TO_TECH = {
  JavaScript: 'javascript', TypeScript: 'typescript', Python: 'python', Java: 'java',
  'C#': 'csharp', Go: 'go', Rust: 'rust', PHP: 'php', Ruby: 'ruby', Kotlin: 'kotlin',
  Swift: 'swift', 'C++': 'cplusplus', HTML: 'html5', CSS: 'css3', Dart: 'dart'
};

const PKG_DEP_TO_TECH = {
  react: 'react', vue: 'vuejs', '@angular/core': 'angular', svelte: 'svelte',
  next: 'nextjs', nuxt: 'nuxtjs', tailwindcss: 'tailwindcss', bootstrap: 'bootstrap',
  express: 'express', '@nestjs/core': 'nestjs', graphql: 'graphql', mongoose: 'mongodb',
  pg: 'postgresql', mysql2: 'mysql', redis: 'redis', firebase: 'firebase', jest: 'jest',
  eslint: 'eslint', webpack: 'webpack', vite: 'vite'
};

function guessTechIds(topLanguages, packageJson) {
  const ids = new Set();
  for (const lang of topLanguages) {
    if (LANGUAGE_TO_TECH[lang]) ids.add(LANGUAGE_TO_TECH[lang]);
  }
  if (packageJson) {
    ids.add('nodejs');
    const deps = { ...(packageJson.dependencies || {}), ...(packageJson.devDependencies || {}) };
    for (const dep of Object.keys(deps)) {
      if (PKG_DEP_TO_TECH[dep]) ids.add(PKG_DEP_TO_TECH[dep]);
    }
  }
  return Array.from(ids);
}
