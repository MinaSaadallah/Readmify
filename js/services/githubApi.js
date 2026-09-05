/**
 * Readmify - GitHub Public API Service
 * Free, zero-auth public repository and language detection
 */

const GITHUB_TO_TECH_MAP = {
  'typescript': { id: 'typescript', skill: 'ts' },
  'javascript': { id: 'javascript', skill: 'js' },
  'python': { id: 'python', skill: 'py' },
  'rust': { id: 'rust', skill: 'rust' },
  'go': { id: 'go', skill: 'go' },
  'java': { id: 'java', skill: 'java' },
  'c++': { id: 'cpp', skill: 'cpp' },
  'c': { id: 'c', skill: 'c' },
  'c#': { id: 'csharp', skill: 'cs' },
  'php': { id: 'php', skill: 'php' },
  'swift': { id: 'swift', skill: 'swift' },
  'kotlin': { id: 'kotlin', skill: 'kotlin' },
  'dart': { id: 'dart', skill: 'dart' },
  'ruby': { id: 'ruby', skill: 'ruby' },
  'html': { id: 'html5', skill: 'html' },
  'css': { id: 'css3', skill: 'css' },
  'scss': { id: 'sass', skill: 'sass' },
  'shell': { id: 'shell', skill: 'bash' },
  'vue': { id: 'vue', skill: 'vue' },
  'svelte': { id: 'svelte', skill: 'svelte' },
  'solidity': { id: 'solidity', skill: 'solidity' },
  'elixir': { id: 'elixir', skill: 'elixir' },
  'lua': { id: 'lua', skill: 'lua' },
  'r': { id: 'r', skill: 'r' },
  'scala': { id: 'scala', skill: 'scala' },
  'dockerfile': { id: 'docker', skill: 'docker' }
};

export function parseGitHubRepoInput(input) {
  if (!input || typeof input !== 'string') return null;
  const clean = input.trim().replace(/\/$/, '');

  // Format: https://github.com/owner/repo or http://...
  const urlMatch = clean.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/);
  if (urlMatch) {
    return { owner: urlMatch[1], repo: urlMatch[2].replace(/\.git$/, '') };
  }

  // Format: owner/repo
  const slashMatch = clean.match(/^([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)$/);
  if (slashMatch) {
    return { owner: slashMatch[1], repo: slashMatch[2].replace(/\.git$/, '') };
  }

  return null;
}

export async function fetchGitHubRepoDetails(owner, repo) {
  try {
    const [repoRes, langRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`),
      fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`)
    ]);

    if (!repoRes.ok) {
      if (repoRes.status === 404) {
        throw new Error(`Repository "${owner}/${repo}" was not found or is private.`);
      } else if (repoRes.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again in a few minutes.');
      }
      throw new Error(`GitHub API returned status ${repoRes.status}`);
    }

    const repoData = await repoRes.json();
    const langData = langRes.ok ? await langRes.json() : {};

    // Calculate language percentages
    const totalBytes = Object.values(langData).reduce((a, b) => a + b, 0);
    const languages = [];
    const matchedTechIds = [];
    const skillSlugs = [];

    for (const [langName, bytes] of Object.entries(langData)) {
      const pct = totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0;
      languages.push({ name: langName, bytes, percentage: pct });

      const mapped = GITHUB_TO_TECH_MAP[langName.toLowerCase()];
      if (mapped) {
        matchedTechIds.push(mapped.id);
        if (mapped.skill) skillSlugs.push(mapped.skill);
      }
    }

    return {
      owner: repoData.owner?.login || owner,
      repo: repoData.name || repo,
      description: repoData.description || '',
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks_count || 0,
      openIssues: repoData.open_issues_count || 0,
      license: repoData.license?.spdx_id || repoData.license?.name || 'MIT',
      topics: repoData.topics || [],
      defaultBranch: repoData.default_branch || 'main',
      homepage: repoData.homepage || '',
      languages,
      matchedTechIds,
      skillSlugs
    };
  } catch (err) {
    console.error('Failed to fetch from GitHub API:', err);
    throw err;
  }
}
