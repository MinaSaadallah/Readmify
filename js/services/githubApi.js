/**
 * Readmify - GitHub Deep Repository Inspection Service
 * Free, zero-auth public repository, tree, manifest, and environment inspection
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

// Map npm package names & keywords to Tech Catalog IDs
const NPM_PACKAGE_MAP = {
  'react': 'react',
  'react-dom': 'react',
  'next': 'nextjs',
  'vue': 'vue',
  'nuxt': 'nuxtjs',
  'svelte': 'svelte',
  '@sveltejs/kit': 'svelte',
  '@angular/core': 'angular',
  'tailwindcss': 'tailwind',
  '@tailwindcss/postcss': 'tailwind',
  'vite': 'vite',
  'astro': 'astro',
  'redux': 'redux',
  '@reduxjs/toolkit': 'redux',
  'react-native': 'reactnative',
  'bootstrap': 'bootstrap',
  'sass': 'sass',
  'three': 'threejs',
  'electron': 'electron',
  'express': 'express',
  'fastify': 'fastify',
  '@nestjs/core': 'nestjs',
  'graphql': 'graphql',
  'prisma': 'prisma',
  '@prisma/client': 'prisma',
  'drizzle-orm': 'drizzle',
  'mongoose': 'mongodb',
  'pg': 'postgres',
  'mysql2': 'mysql',
  'redis': 'redis',
  'ioredis': 'redis',
  'sqlite3': 'sqlite',
  '@supabase/supabase-js': 'supabase',
  'firebase': 'firebase',
  'jest': 'jest',
  'vitest': 'vitest',
  'cypress': 'cypress',
  'playwright': 'playwright',
  '@playwright/test': 'playwright',
  'eslint': 'eslint',
  'prettier': 'prettier',
  'typescript': 'typescript'
};

// Map Python packages to Tech Catalog IDs
const PYTHON_PACKAGE_MAP = {
  'fastapi': 'fastapi',
  'flask': 'flask',
  'django': 'django',
  'torch': 'pytorch',
  'pytorch': 'pytorch',
  'tensorflow': 'tensorflow',
  'pytest': 'vitest',
  'redis': 'redis',
  'psycopg2': 'postgres',
  'pymongo': 'mongodb',
  'sqlalchemy': 'sqlalchemy',
  'docker': 'docker'
};

// Map Rust crates to Tech Catalog IDs
const RUST_CRATE_MAP = {
  'tokio': 'rust',
  'actix-web': 'rust',
  'axum': 'rust',
  'serde': 'rust',
  'diesel': 'database',
  'sqlx': 'database',
  'tauri': 'rust'
};

// Map Go modules to Tech Catalog IDs
const GO_MODULE_MAP = {
  'gin-gonic/gin': 'go',
  'gofiber/fiber': 'go',
  'labstack/echo': 'go',
  'gorm.io/gorm': 'database'
};

export function parseGitHubRepoInput(input) {
  if (!input || typeof input !== 'string') return null;
  const clean = input.trim().replace(/\/$/, '');

  // Format: https://github.com/owner/repo or http://...
  const urlMatch = clean.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/);
  if (urlMatch) {
    return { owner: urlMatch[1], repo: urlMatch[2].replace(/\.git$/, '') };
  }

  // Format: git@github.com:owner/repo.git
  const gitSshMatch = clean.match(/git@github\.com:([^\/]+)\/([^\/\?#]+)/);
  if (gitSshMatch) {
    return { owner: gitSshMatch[1], repo: gitSshMatch[2].replace(/\.git$/, '') };
  }

  // Format: owner/repo
  const slashMatch = clean.match(/^([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)$/);
  if (slashMatch) {
    return { owner: slashMatch[1], repo: slashMatch[2].replace(/\.git$/, '') };
  }

  return null;
}

/**
 * Fetch raw file text from repository (raw.githubusercontent.com or API fallback)
 */
async function fetchRawFile(owner, repo, branch, filePath) {
  const rawUrl = `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${encodeURIComponent(branch)}/${filePath}`;
  try {
    const res = await fetch(rawUrl);
    if (res.ok) {
      return await res.text();
    }
  } catch (err) {
    // raw fetch failed, fallback to API
  }

  try {
    const apiRes = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${filePath}?ref=${encodeURIComponent(branch)}`,
      { headers: { 'Accept': 'application/vnd.github.raw+json' } }
    );
    if (apiRes.ok) {
      return await apiRes.text();
    }
  } catch (err) {
    // ignore
  }

  return null;
}

/**
 * Parse .env.example / .env.sample into structured variables
 */
function parseEnvContent(envText) {
  if (!envText) return [];
  const lines = envText.split('\n');
  const vars = [];
  let pendingComment = '';

  for (let line of lines) {
    line = line.trim();
    if (!line) {
      pendingComment = '';
      continue;
    }
    if (line.startsWith('#')) {
      const commentText = line.replace(/^#+\s*/, '').trim();
      if (commentText) {
        pendingComment = pendingComment ? `${pendingComment} ${commentText}` : commentText;
      }
      continue;
    }

    const eqIdx = line.indexOf('=');
    if (eqIdx !== -1) {
      const key = line.substring(0, eqIdx).trim();
      let val = line.substring(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
      const commentSplit = val.split(/\s+#\s+/);
      let inlineComment = '';
      if (commentSplit.length > 1) {
        val = commentSplit[0].trim();
        inlineComment = commentSplit.slice(1).join(' ').trim();
      }

      const desc = inlineComment || pendingComment || `Configuration key for ${key}`;
      const isRequired = val === '' || val.includes('required') || val.includes('change_me') || val.includes('your_');

      vars.push({
        key,
        desc,
        default: val || '-',
        required: isRequired
      });
      pendingComment = '';
    }
  }

  return vars;
}

/**
 * Generate a clean ASCII folder tree from repository file paths
 */
function buildAsciiDirectoryTree(filePaths) {
  if (!filePaths || !filePaths.length) return '';

  const ignoredPrefixes = [
    'node_modules/', '.git/', '.next/', 'dist/', 'build/', 'target/',
    '__pycache__/', 'venv/', '.venv/', '.cache/', '.vscode/', '.idea/',
    'vendor/', '.turbo/', 'coverage/', '.docusaurus/', '.output/'
  ];

  const filteredPaths = filePaths.filter(p => !ignoredPrefixes.some(ign => p.startsWith(ign)));

  // Build tree node hierarchy
  const root = {};
  for (const p of filteredPaths) {
    const parts = p.split('/');
    if (parts.length > 3) continue; // limit depth to 3 levels for clean presentation
    let curr = root;
    for (const part of parts) {
      if (!curr[part]) curr[part] = {};
      curr = curr[part];
    }
  }

  const lines = ['.'];
  function formatNode(node, prefix = '') {
    const keys = Object.keys(node).sort((a, b) => {
      const aIsDir = Object.keys(node[a]).length > 0;
      const bIsDir = Object.keys(node[b]).length > 0;
      if (aIsDir && !bIsDir) return -1;
      if (!aIsDir && bIsDir) return 1;
      return a.localeCompare(b);
    });

    keys.forEach((key, index) => {
      const isLast = index === keys.length - 1;
      const pointer = isLast ? '└── ' : '├── ';
      const isDir = Object.keys(node[key]).length > 0;
      lines.push(`${prefix}${pointer}${key}${isDir ? '/' : ''}`);
      if (isDir) {
        formatNode(node[key], `${prefix}${isLast ? '    ' : '│   '}`);
      }
    });
  }

  formatNode(root);
  return lines.slice(0, 35).join('\n'); // keep max 35 lines
}

/**
 * Synthesize intelligent features tailored to what was discovered in the repository
 */
function synthesizeSmartFeatures(analysis) {
  const { languages, matchedTechIds, packageManager, hasDocker, hasCi, hasEnv, envVars, scripts, repoName } = analysis;
  const features = [];

  const techSet = new Set(matchedTechIds);

  // 1. Framework / Core Architecture
  if (techSet.has('nextjs')) {
    features.push({
      icon: '⚡',
      title: 'Next.js App Router Architecture',
      desc: 'High-performance React application leveraging modern server components, streaming SSR, and optimized client bundles.'
    });
  } else if (techSet.has('react')) {
    features.push({
      icon: '⚛️',
      title: 'Modern React Interface',
      desc: 'Component-driven, reactive user interface engineered for responsiveness and high performance.'
    });
  } else if (techSet.has('vue') || techSet.has('nuxtjs')) {
    features.push({
      icon: '💚',
      title: 'Vue / Nuxt Reactive Architecture',
      desc: 'Progressive, intuitive frontend architecture with reactive state management and fast rendering.'
    });
  } else if (techSet.has('fastapi')) {
    features.push({
      icon: '⚡',
      title: 'FastAPI High-Performance Engine',
      desc: 'Asynchronous REST APIs with automatic OpenAPI/Swagger documentation and strict type validation.'
    });
  } else if (techSet.has('express')) {
    features.push({
      icon: '🚀',
      title: 'Lightweight Express.js Backend',
      desc: 'Modular, event-driven RESTful architecture with clean middleware handling and routing.'
    });
  } else if (techSet.has('rust')) {
    features.push({
      icon: '🦀',
      title: 'Blazing-Fast Rust Foundation',
      desc: 'Zero-cost abstractions, memory safety without garbage collection, and concurrency support.'
    });
  } else if (techSet.has('go')) {
    features.push({
      icon: '🐹',
      title: 'Concurrent Go Architecture',
      desc: 'High-throughput networking and minimal memory footprint powered by lightweight Goroutines.'
    });
  }

  // 2. Styling / UI Design
  if (techSet.has('tailwind')) {
    features.push({
      icon: '🎨',
      title: 'Tailwind CSS Design System',
      desc: 'Utility-first modern responsive styling with seamless dark/light theme adaptability.'
    });
  }

  // 3. Type Safety
  if (techSet.has('typescript')) {
    features.push({
      icon: '🛡️',
      title: 'Strict TypeScript Safety',
      desc: 'End-to-end type safety, autocompletion, and robust compile-time contract verification.'
    });
  }

  // 4. Database & ORM
  if (techSet.has('prisma')) {
    features.push({
      icon: '🗄️',
      title: 'Type-Safe Prisma ORM',
      desc: 'Automated database migrations, declarative schemas, and type-safe query generation.'
    });
  } else if (techSet.has('postgres')) {
    features.push({
      icon: '🐘',
      title: 'PostgreSQL Relational Storage',
      desc: 'ACID-compliant relational database management with advanced indexing and JSON capabilities.'
    });
  } else if (techSet.has('mongodb')) {
    features.push({
      icon: '🍃',
      title: 'Scalable Document Storage',
      desc: 'Flexible NoSQL document model powered by MongoDB for rapid development.'
    });
  }

  // 5. Containerization
  if (hasDocker) {
    features.push({
      icon: '🐳',
      title: 'Docker Containerization',
      desc: 'Instant containerized local environment and production deployment via Docker.'
    });
  }

  // 6. Automated Testing
  if (techSet.has('vitest') || techSet.has('jest') || scripts.test) {
    features.push({
      icon: '🧪',
      title: 'Automated Test Suite',
      desc: 'Comprehensive unit, integration, and regression testing suite for reliability and stability.'
    });
  }

  // 7. CI/CD Workflows
  if (hasCi) {
    features.push({
      icon: '🔄',
      title: 'Continuous Integration & Delivery',
      desc: 'Automated GitHub Actions workflows verifying code quality, builds, and test suites on every push.'
    });
  }

  // Fallback defaults if few detected
  if (features.length < 3) {
    features.push({
      icon: '🎯',
      title: 'Developer-Friendly Setup',
      desc: 'Clean repository layout with straightforward configuration and clear dependencies.'
    });
    features.push({
      icon: '📦',
      title: 'Lightweight & Modular',
      desc: 'Built with minimal dependencies to ensure fast build times and easy extensibility.'
    });
  }

  return features.slice(0, 6);
}

/**
 * Deep, comprehensive GitHub repository inspection
 * Inspects:
 * - Metadata (stars, forks, description, license, topics)
 * - Languages and percentage breakdown
 * - Full recursive git file tree
 * - package.json / requirements.txt / Cargo.toml / go.mod / docker-compose.yml / .env.example
 * - GitHub Actions workflows
 * - Project directory structure
 * - Generates tailored installation, usage, environment variables, features, and badges
 */
async function fetchJsonSafe(url) {
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    return await r.json();
  } catch (e) { return null; }
}

function getScanCache(key) {
  try {
    const raw = localStorage.getItem('readmify_last_scan:' + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - (parsed.at || 0) > 1000 * 60 * 30) return null;
    return parsed.data;
  } catch (e) { return null; }
}

function setScanCache(key, data) {
  try { localStorage.setItem('readmify_last_scan:' + key, JSON.stringify({ at: Date.now(), data })); } catch (e) {}
}

export async function fetchGitHubRepoFullDetails(owner, repo, onProgress = () => {}) {
  onProgress({ step: 1, message: `Connecting to GitHub API for ${owner}/${repo}...` });

  // 1. Fetch Repo Metadata & Languages in parallel (+ contributors, release, last commit — all optional)
  const [repoRes, langRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`),
    fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`)
  ]);

  if (!repoRes.ok) {
    if (repoRes.status === 404) {
      throw new Error(`Repository "${owner}/${repo}" was not found or is private.`);
    } else if (repoRes.status === 403) {
      throw new Error('GitHub API rate limit reached. Please wait a moment or try again.');
    }
    throw new Error(`GitHub API returned error ${repoRes.status}`);
  }

  const repoData = await repoRes.json();
  const langData = langRes.ok ? await langRes.json() : {};
  const defaultBranch = repoData.default_branch || 'main';

  // Calculate languages
  const totalBytes = Object.values(langData).reduce((a, b) => a + b, 0);
  const languages = [];
  const matchedTechSet = new Set();
  const skillSlugs = [];

  for (const [langName, bytes] of Object.entries(langData)) {
    const pct = totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0;
    languages.push({ name: langName, bytes, percentage: pct });

    const mapped = GITHUB_TO_TECH_MAP[langName.toLowerCase()];
    if (mapped) {
      matchedTechSet.add(mapped.id);
      if (mapped.skill) skillSlugs.push(mapped.skill);
    }
  }

  onProgress({ step: 2, message: `Scanning repository file tree on branch "${defaultBranch}"...` });

  // 2. Fetch Recursive Git Tree
  let filePaths = [];
  try {
    const treeRes = await fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/trees/${encodeURIComponent(defaultBranch)}?recursive=1`);
    if (treeRes.ok) {
      const treeData = await treeRes.json();
      if (Array.isArray(treeData.tree)) {
        filePaths = treeData.tree.map(item => item.path);
      }
    }
  } catch (err) {
    console.warn('Could not fetch recursive git tree:', err);
  }

  onProgress({ step: 3, message: `Analyzing ${filePaths.length || 'project'} files & manifests...` });

  // Detect ecosystem presence from file paths
  const hasPackageJson = filePaths.some(p => p === 'package.json');
  const hasPnpmLock = filePaths.some(p => p === 'pnpm-lock.yaml');
  const hasYarnLock = filePaths.some(p => p === 'yarn.lock');
  const hasBunLock = filePaths.some(p => p === 'bun.lockb' || p === 'bun.lock');
  const hasNpmLock = filePaths.some(p => p === 'package-lock.json');
  const hasTsConfig = filePaths.some(p => p.startsWith('tsconfig') || p.endsWith('.ts') || p.endsWith('.tsx'));
  const hasTailwind = filePaths.some(p => p.includes('tailwind.config') || p.includes('tailwind.css'));
  const hasDocker = filePaths.some(p => p.toLowerCase().includes('dockerfile') || p.includes('docker-compose'));
  const hasEnvExample = filePaths.find(p => p === '.env.example' || p === '.env.sample' || p === '.env.template');
  const hasCargo = filePaths.some(p => p === 'Cargo.toml');
  const hasGoMod = filePaths.some(p => p === 'go.mod');
  const hasRequirements = filePaths.some(p => p === 'requirements.txt');
  const hasPyproject = filePaths.some(p => p === 'pyproject.toml');

  // CI Workflows
  const workflowFiles = filePaths
    .filter(p => p.startsWith('.github/workflows/') && (p.endsWith('.yml') || p.endsWith('.yaml')))
    .map(p => p.replace('.github/workflows/', ''));

  if (hasTsConfig) matchedTechSet.add('typescript');
  if (hasTailwind) matchedTechSet.add('tailwind');
  if (hasDocker) matchedTechSet.add('docker');
  if (workflowFiles.length > 0) matchedTechSet.add('githubactions');

  // Determine Package Manager
  let packageManager = 'npm';
  if (hasBunLock) packageManager = 'bun';
  else if (hasPnpmLock) packageManager = 'pnpm';
  else if (hasYarnLock) packageManager = 'yarn';
  else if (hasCargo) packageManager = 'cargo';
  else if (hasGoMod) packageManager = 'go';
  else if (hasRequirements || hasPyproject) packageManager = 'pip';

  if (packageManager === 'pnpm') matchedTechSet.add('pnpm');
  if (packageManager === 'bun') matchedTechSet.add('bun');
  if (packageManager === 'yarn') matchedTechSet.add('yarn');

  // 3. Deep manifest fetching
  let packageJsonData = null;
  let parsedEnvVars = [];
  let scripts = {};

  // Fetch package.json if present
  if (hasPackageJson) {
    onProgress({ step: 4, message: 'Inspecting package.json dependencies and scripts...' });
    const pkgRaw = await fetchRawFile(owner, repo, defaultBranch, 'package.json');
    if (pkgRaw) {
      try {
        packageJsonData = JSON.parse(pkgRaw);
        scripts = packageJsonData.scripts || {};

        const allDeps = {
          ...(packageJsonData.dependencies || {}),
          ...(packageJsonData.devDependencies || {})
        };

        for (const depName of Object.keys(allDeps)) {
          const lower = depName.toLowerCase();
          if (NPM_PACKAGE_MAP[lower]) {
            matchedTechSet.add(NPM_PACKAGE_MAP[lower]);
          }
        }
      } catch (e) {
        console.warn('Failed to parse package.json:', e);
      }
    }
  }

  // Fetch Python requirements or pyproject if present
  if (hasRequirements || hasPyproject) {
    onProgress({ step: 4, message: 'Inspecting Python dependencies...' });
    const reqText = hasRequirements ? await fetchRawFile(owner, repo, defaultBranch, 'requirements.txt') : '';
    const pyprojText = hasPyproject ? await fetchRawFile(owner, repo, defaultBranch, 'pyproject.toml') : '';
    const combined = `${reqText || ''}\n${pyprojText || ''}`.toLowerCase();

    for (const [pkg, techId] of Object.entries(PYTHON_PACKAGE_MAP)) {
      if (combined.includes(pkg)) {
        matchedTechSet.add(techId);
      }
    }
  }

  // Fetch Rust Cargo.toml if present
  if (hasCargo) {
    onProgress({ step: 4, message: 'Inspecting Cargo.toml crates...' });
    const cargoRaw = await fetchRawFile(owner, repo, defaultBranch, 'Cargo.toml');
    if (cargoRaw) {
      const lower = cargoRaw.toLowerCase();
      for (const [crate, techId] of Object.entries(RUST_CRATE_MAP)) {
        if (lower.includes(crate)) matchedTechSet.add(techId);
      }
    }
  }

  // Fetch Go go.mod if present
  if (hasGoMod) {
    onProgress({ step: 4, message: 'Inspecting go.mod modules...' });
    const goModRaw = await fetchRawFile(owner, repo, defaultBranch, 'go.mod');
    if (goModRaw) {
      const lower = goModRaw.toLowerCase();
      for (const [mod, techId] of Object.entries(GO_MODULE_MAP)) {
        if (lower.includes(mod)) matchedTechSet.add(techId);
      }
    }
  }

  // Fetch .env.example if present
  if (hasEnvExample) {
    onProgress({ step: 5, message: `Parsing environment variables from ${hasEnvExample}...` });
    const envRaw = await fetchRawFile(owner, repo, defaultBranch, hasEnvExample);
    if (envRaw) {
      parsedEnvVars = parseEnvContent(envRaw);
    }
  }

  onProgress({ step: 6, message: 'Mapping directory architecture and synthesising features...' });

  // 4. Generate Project Structure ASCII Tree
  const asciiTree = buildAsciiDirectoryTree(filePaths);

  // 5. Generate tailored installation steps
  const installSteps = [];
  installSteps.push({
    title: 'Clone the repository',
    cmd: `git clone https://github.com/${owner}/${repo}.git\ncd ${repo}`
  });

  if (hasPackageJson) {
    const installCmd = packageManager === 'yarn' ? 'yarn install' : `${packageManager} install`;
    installSteps.push({
      title: 'Install dependencies',
      cmd: installCmd
    });

    // Dev/Start script
    if (scripts.dev) {
      const devCmd = packageManager === 'yarn' ? 'yarn dev' : `${packageManager} run dev`;
      installSteps.push({
        title: 'Start development server',
        cmd: devCmd
      });
    } else if (scripts.start) {
      const startCmd = packageManager === 'yarn' ? 'yarn start' : `${packageManager} start`;
      installSteps.push({
        title: 'Start the application',
        cmd: startCmd
      });
    }

    if (scripts.test) {
      installSteps.push({
        title: 'Run test suite',
        cmd: `${packageManager} test`
      });
    }
  } else if (hasRequirements || hasPyproject) {
    installSteps.push({
      title: 'Set up Python virtual environment',
      cmd: 'python -m venv venv\nsource venv/bin/activate  # On Windows: .\\venv\\Scripts\\activate'
    });
    if (hasRequirements) {
      installSteps.push({
        title: 'Install dependencies',
        cmd: 'pip install -r requirements.txt'
      });
    }
    if (matchedTechSet.has('fastapi')) {
      installSteps.push({
        title: 'Start FastAPI server',
        cmd: 'uvicorn main:app --reload'
      });
    } else if (matchedTechSet.has('flask')) {
      installSteps.push({
        title: 'Start Flask application',
        cmd: 'flask run'
      });
    } else if (matchedTechSet.has('django')) {
      installSteps.push({
        title: 'Run Django migrations and start server',
        cmd: 'python manage.py migrate\npython manage.py runserver'
      });
    } else {
      installSteps.push({
        title: 'Run application',
        cmd: 'python main.py'
      });
    }
  } else if (hasCargo) {
    installSteps.push({
      title: 'Build project with Cargo',
      cmd: 'cargo build --release'
    });
    installSteps.push({
      title: 'Run application',
      cmd: 'cargo run'
    });
  } else if (hasGoMod) {
    installSteps.push({
      title: 'Download dependencies',
      cmd: 'go mod download'
    });
    installSteps.push({
      title: 'Run application',
      cmd: 'go run .'
    });
  }

  // 6. Prerequisites definition
  let prerequisites = '';
  if (hasPackageJson) {
    const nodeEng = packageJsonData?.engines?.node ? ` (Node.js ${packageJsonData.engines.node})` : ' (Node.js 18+)';
    prerequisites = `${packageManager.toUpperCase()}${nodeEng} and Git installed on your system.`;
  } else if (hasRequirements || hasPyproject) {
    prerequisites = 'Python 3.9+ and Git installed on your system.';
  } else if (hasCargo) {
    prerequisites = 'Rust and Cargo toolchain (latest stable) installed.';
  } else if (hasGoMod) {
    prerequisites = 'Go 1.20+ installed on your system.';
  } else {
    prerequisites = 'Git installed on your system.';
  }

  // 7. Workflow status badges
  const workflowBadges = workflowFiles.map(file => {
    const name = file.replace(/\.(yml|yaml)$/, '').replace(/[-_]/g, ' ').toUpperCase();
    return {
      name,
      file,
      url: `https://github.com/${owner}/${repo}/actions/workflows/${file}`
    };
  });

  // 8. Synthesize smart features
  const matchedTechIds = Array.from(matchedTechSet);
  const smartFeatures = synthesizeSmartFeatures({
    languages,
    matchedTechIds,
    packageManager,
    hasDocker,
    hasCi: workflowFiles.length > 0,
    hasEnv: parsedEnvVars.length > 0,
    envVars: parsedEnvVars,
    scripts,
    repoName: repoData.name || repo
  });

  onProgress({ step: 7, message: 'Fetching contributors, releases & social card…' });

  // 9. Optional enrichment (never blocks offline fallback)
  const cacheKey = `${owner}/${repo}`;
  let extra = getScanCache(cacheKey);
  if (!extra) {
    const [contribs, latestRelease, lastCommit] = await Promise.all([
      fetchJsonSafe(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contributors?per_page=5`),
      fetchJsonSafe(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases/latest`),
      fetchJsonSafe(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits?per_page=1`)
    ]);
    extra = {
      topContributors: Array.isArray(contribs) ? contribs.slice(0, 5).map(c => ({ login: c.login, url: c.html_url, contributions: c.contributions })) : [],
      latestRelease: latestRelease?.tag_name || '',
      lastCommitDate: lastCommit?.[0]?.commit?.committer?.date || ''
    };
    setScanCache(cacheKey, extra);
  }

  onProgress({ step: 7, message: 'Analysis complete! Ready to generate README.' });

  const ogImage = `https://opengraph.githubassets.com/1/${encodeURIComponent(repoData.owner?.login || owner)}/${encodeURIComponent(repoData.name || repo)}`;

  const result = {
    owner: repoData.owner?.login || owner,
    repo: repoData.name || repo,
    description: repoData.description || packageJsonData?.description || '',
    stars: repoData.stargazers_count || 0,
    forks: repoData.forks_count || 0,
    openIssues: repoData.open_issues_count || 0,
    license: repoData.license?.spdx_id || repoData.license?.name || packageJsonData?.license || 'MIT',
    topics: repoData.topics || packageJsonData?.keywords || [],
    defaultBranch,
    homepage: repoData.homepage || packageJsonData?.homepage || '',
    languages,
    matchedTechIds,
    skillSlugs,
    packageManager,
    prerequisites,
    installSteps,
    envVars: parsedEnvVars,
    features: smartFeatures,
    projectTree: asciiTree,
    workflowBadges,
    hasDocker,
    totalFiles: filePaths.length,
    rawFilesScanned: (hasPackageJson ? 1 : 0) + (hasEnvExample ? 1 : 0) + (hasCargo ? 1 : 0) + (hasGoMod ? 1 : 0) + (hasRequirements ? 1 : 0),
    topContributors: extra.topContributors || [],
    latestRelease: extra.latestRelease || '',
    lastCommitDate: extra.lastCommitDate || '',
    ogImage
  };
  setScanCache(cacheKey + ':full', result);
  return result;
}

/**
 * Backwards compatibility wrapper for fetchGitHubRepoDetails
 */
export async function fetchGitHubRepoDetails(owner, repo) {
  return await fetchGitHubRepoFullDetails(owner, repo);
}
