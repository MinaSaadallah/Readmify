/**
 * Readmify - Easy Guide & Deep Repository Scanner Hub
 * Smart auto-detection, live scanning visualizer, and streamlined manual setup
 */
import { store } from '../store.js';
import { SECTION_TYPES } from '../data/defaultSections.js';
import { TECH_CATALOG } from '../data/techCatalog.js';
import { fireConfetti, showToast } from '../utils/exportUtils.js';
import { fetchGitHubRepoFullDetails, parseGitHubRepoInput } from '../services/githubApi.js';

// Guide states: 'hub' | 'scanning' | 'report' | 'manual-step-1' | 'manual-step-2' | 'manual-step-3'
let guideView = 'hub';
let currentScanAnalysis = null;
let currentScanProgress = { step: 1, message: 'Initializing deep scan...' };
let currentRepoInput = '';

let manualData = {
  projectName: '',
  tagline: '',
  repoOwner: '',
  repoName: '',
  packageManager: 'npm',
  technologies: ['javascript', 'html5', 'css3', 'git']
};

const POPULAR_SAMPLE_REPOS = [
  { label: 'Express.js', repo: 'expressjs/express' },
  { label: 'FastAPI', repo: 'fastapi/fastapi' },
  { label: 'Tailwind CSS', repo: 'tailwindlabs/tailwindcss' },
  { label: 'React', repo: 'facebook/react' },
  { label: 'shadcn/ui', repo: 'shadcn-ui/ui' }
];

export function openWizard(initialRepo = '', autoScan = false) {
  const state = store.getState();
  const hero = state.sections.find(s => s.type === SECTION_TYPES.HERO);

  if (initialRepo) {
    currentRepoInput = initialRepo;
  } else if (hero?.data?.repoOwner && hero?.data?.repoName && hero.data.repoName !== 'your-awesome-project') {
    currentRepoInput = `${hero.data.repoOwner}/${hero.data.repoName}`;
  } else {
    currentRepoInput = '';
  }

  if (hero?.data?.projectName && hero.data.projectName !== 'Readmify' && hero.data.projectName !== 'My Project') {
    manualData.projectName = hero.data.projectName;
    manualData.tagline = hero.data.tagline || '';
    manualData.repoOwner = hero.data.repoOwner || '';
    manualData.repoName = hero.data.repoName || '';
  }

  let modal = document.getElementById('quick-wizard-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'quick-wizard-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs';
    document.body.appendChild(modal);
  }

  modal.classList.remove('hidden');

  if (autoScan && currentRepoInput) {
    startDeepScan(currentRepoInput);
  } else {
    guideView = 'hub';
    renderGuideView();
  }
}

export function closeWizard() {
  const modal = document.getElementById('quick-wizard-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function renderGuideView() {
  const modal = document.getElementById('quick-wizard-modal');
  if (!modal) return;

  modal.innerHTML = `
    <div class="bg-card border border-border rounded-lg w-full max-w-xl shadow-2xl flex flex-col overflow-hidden max-h-[88vh]">
      <!-- Header -->
      <div class="px-5 py-3.5 border-b border-border bg-card flex items-center justify-between flex-shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-md bg-muted border border-border flex items-center justify-center text-foreground font-semibold text-xs">
            📖
          </div>
          <div>
            <h3 class="text-xs font-semibold text-foreground">Readmify Easy Guide</h3>
            <p class="text-[11px] text-muted-foreground">${getGuideSubtitle()}</p>
          </div>
        </div>
        <button id="close-guide-btn" class="text-muted-foreground hover:text-foreground text-xs p-1">✕</button>
      </div>

      <!-- Main Body -->
      <div class="p-5 overflow-y-auto flex-1 space-y-4 bg-background">
        ${getGuideBodyHtml()}
      </div>

      <!-- Footer Navigation -->
      <div class="px-5 py-3 border-t border-border bg-card flex items-center justify-between flex-shrink-0">
        ${getGuideFooterHtml()}
      </div>
    </div>
  `;

  modal.querySelector('#close-guide-btn')?.addEventListener('click', closeWizard);
  attachGuideListeners(modal);
}

function getGuideSubtitle() {
  switch (guideView) {
    case 'hub':
      return 'The smartest way to generate a README from your repo';
    case 'scanning':
      return 'Deep scanning repository files, manifests & scripts...';
    case 'report':
      return 'Repository analyzed! Review insights before generating';
    case 'manual-step-1':
      return 'Manual Guide: Step 1 of 3 (Project Identity)';
    case 'manual-step-2':
      return 'Manual Guide: Step 2 of 3 (Tech Stack)';
    case 'manual-step-3':
      return 'Manual Guide: Step 3 of 3 (Run & Install)';
    default:
      return 'Create a stunning README';
  }
}

function getGuideBodyHtml() {
  switch (guideView) {
    case 'hub':
      return `
        <!-- Main Card: Auto-Detect with Repo Link -->
        <div class="p-4 bg-card border border-border rounded-lg space-y-3.5">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 class="text-xs font-semibold text-foreground uppercase tracking-wider">Fastest: Scan Your GitHub Repo</h4>
          </div>
          <p class="text-xs text-muted-foreground leading-relaxed">
            Paste your repository link. Readmify will deeply inspect your file tree, <code class="text-[11px] px-1 py-0.5 rounded bg-muted text-foreground">package.json</code>, lockfiles, environment variables, and scripts to construct an entire tailored README.
          </p>

          <div class="space-y-2">
            <div class="flex gap-2">
              <div class="relative flex-1">
                <span class="absolute left-2.5 top-2.5 text-muted-foreground text-xs pointer-events-none">🐙</span>
                <input 
                  type="text" 
                  id="guide-repo-input" 
                  value="${currentRepoInput}"
                  placeholder="https://github.com/owner/repo or owner/repo..." 
                  class="form-input text-xs pl-7 pr-3 h-9" 
                />
              </div>
              <button id="guide-deep-scan-btn" class="btn-primary text-xs px-4 h-9 whitespace-nowrap flex items-center gap-1.5 shadow-sm">
                <span>⚡</span> Deep Scan & Generate
              </button>
            </div>

            <!-- Quick Example Chips -->
            <div class="flex flex-wrap items-center gap-1.5 pt-1">
              <span class="text-[10px] text-muted-foreground mr-1">Try sample:</span>
              ${POPULAR_SAMPLE_REPOS.map(sample => `
                <button class="sample-repo-chip text-[10px] px-2 py-0.5 rounded border border-border bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition" data-repo="${sample.repo}">
                  ${sample.label}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Alternative: Manual Setup -->
        <div class="p-4 rounded-lg border border-dashed border-border bg-card/30 flex items-center justify-between gap-3">
          <div class="space-y-0.5">
            <div class="text-xs font-medium text-foreground">Building locally without a GitHub link yet?</div>
            <p class="text-[11px] text-muted-foreground">Answer 3 simple questions to set up your project manually.</p>
          </div>
          <button id="guide-start-manual-btn" class="btn-secondary text-xs px-3 py-1.5 whitespace-nowrap">
            1-Min Manual Guide →
          </button>
        </div>
      `;

    case 'scanning':
      return `
        <div class="py-8 px-4 flex flex-col items-center justify-center text-center space-y-4">
          <div class="w-12 h-12 rounded-full border-2 border-border border-t-foreground animate-spin flex items-center justify-center text-xs">
            ⚡
          </div>
          <div class="space-y-1">
            <h4 class="text-xs font-semibold text-foreground">Analyzing Repository Architecture</h4>
            <p id="guide-live-status-text" class="text-xs text-muted-foreground">${currentScanProgress.message}</p>
          </div>

          <div class="w-full max-w-sm bg-muted/40 border border-border rounded-lg p-3 text-left space-y-2 text-[11px] font-mono text-muted-foreground">
            <div class="flex items-center gap-2 ${currentScanProgress.step >= 1 ? 'text-foreground font-medium' : 'opacity-40'}">
              <span>${currentScanProgress.step > 1 ? '✅' : '⏳'}</span> 1. Verify repository & metadata
            </div>
            <div class="flex items-center gap-2 ${currentScanProgress.step >= 2 ? 'text-foreground font-medium' : 'opacity-40'}">
              <span>${currentScanProgress.step > 2 ? '✅' : '⏳'}</span> 2. Scan recursive git file tree
            </div>
            <div class="flex items-center gap-2 ${currentScanProgress.step >= 3 ? 'text-foreground font-medium' : 'opacity-40'}">
              <span>${currentScanProgress.step > 3 ? '✅' : '⏳'}</span> 3. Inspect package manifests & lockfiles
            </div>
            <div class="flex items-center gap-2 ${currentScanProgress.step >= 4 ? 'text-foreground font-medium' : 'opacity-40'}">
              <span>${currentScanProgress.step > 4 ? '✅' : '⏳'}</span> 4. Extract dependencies & frameworks
            </div>
            <div class="flex items-center gap-2 ${currentScanProgress.step >= 5 ? 'text-foreground font-medium' : 'opacity-40'}">
              <span>${currentScanProgress.step > 5 ? '✅' : '⏳'}</span> 5. Parse environment variables (.env.example)
            </div>
            <div class="flex items-center gap-2 ${currentScanProgress.step >= 6 ? 'text-foreground font-medium' : 'opacity-40'}">
              <span>${currentScanProgress.step >= 6 ? '✅' : '⏳'}</span> 6. Map directory tree & synthesize features
            </div>
          </div>
        </div>
      `;

    case 'report':
      if (!currentScanAnalysis) return '<p class="text-xs text-muted-foreground">No analysis data available.</p>';
      const a = currentScanAnalysis;
      const langSummary = a.languages.slice(0, 3).map(l => `${l.name} (${l.percentage}%)`).join(', ');

      return `
        <div class="space-y-3.5">
          <!-- Summary Header Box -->
          <div class="p-3.5 bg-card border border-border rounded-lg flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-md bg-muted border border-border flex items-center justify-center text-sm font-semibold text-foreground">
                📦
              </div>
              <div>
                <h4 class="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <span>${a.owner} / ${a.repo}</span>
                  <span class="text-[10px] px-1.5 py-0.2 rounded border border-border bg-muted text-muted-foreground font-normal">${a.license}</span>
                </h4>
                <p class="text-[11px] text-muted-foreground truncate max-w-sm">${a.description || 'No description provided'}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 text-right">
              <span class="text-xs font-medium text-foreground">⭐ ${a.stars.toLocaleString()}</span>
              <span class="text-[11px] text-muted-foreground">🍴 ${a.forks.toLocaleString()}</span>
            </div>
          </div>

          <!-- Discovered Stats Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div class="p-2.5 bg-card border border-border rounded-md text-center">
              <div class="text-[10px] text-muted-foreground">Package Mgr</div>
              <div class="text-xs font-semibold text-foreground uppercase mt-0.5">${a.packageManager}</div>
            </div>
            <div class="p-2.5 bg-card border border-border rounded-md text-center">
              <div class="text-[10px] text-muted-foreground">Files Scanned</div>
              <div class="text-xs font-semibold text-foreground mt-0.5">${a.totalFiles || 'All'}</div>
            </div>
            <div class="p-2.5 bg-card border border-border rounded-md text-center">
              <div class="text-[10px] text-muted-foreground">Env Variables</div>
              <div class="text-xs font-semibold text-foreground mt-0.5">${a.envVars.length} found</div>
            </div>
            <div class="p-2.5 bg-card border border-border rounded-md text-center">
              <div class="text-[10px] text-muted-foreground">CI Workflows</div>
              <div class="text-xs font-semibold text-foreground mt-0.5">${a.workflowBadges.length} detected</div>
            </div>
          </div>

          <!-- Detected Tech Badges -->
          <div class="p-3 bg-card border border-border rounded-lg space-y-1.5">
            <div class="flex items-center justify-between text-xs">
              <span class="font-medium text-foreground">Discovered Tech Stack (${a.matchedTechIds.length})</span>
              <span class="text-[10px] text-muted-foreground">${langSummary}</span>
            </div>
            <div class="flex flex-wrap gap-1.5 pt-1">
              ${a.matchedTechIds.map(id => {
                const item = TECH_CATALOG.find(t => t.id === id);
                return `
                  <span class="text-[11px] px-2 py-0.5 rounded-full border border-border bg-muted text-foreground flex items-center gap-1 font-medium">
                    ${item?.name || id}
                  </span>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Synthesized Features Preview -->
          <div class="p-3 bg-card border border-border rounded-lg space-y-1.5">
            <span class="text-xs font-medium text-foreground">Synthesized Features (${a.features.length})</span>
            <div class="space-y-1 pt-1 text-[11px]">
              ${a.features.map(f => `
                <div class="flex items-start gap-1.5 text-muted-foreground">
                  <span>${f.icon}</span>
                  <div><strong class="text-foreground">${f.title}:</strong> ${f.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Smart extras: social card, contributors, release -->
          <div class="p-3 bg-card border border-border rounded-lg space-y-1.5 text-[11px] text-muted-foreground">
            <span class="text-xs font-medium text-foreground">Smart extras (auto-filled, all optional)</span>
            ${a.ogImage ? `<div class="flex items-center gap-2 pt-1"><img src="${a.ogImage}" alt="Social card" loading="lazy" class="h-10 rounded border border-border" /><span>GitHub social card will prefill your banner (off by default).</span></div>` : ''}
            ${(a.topContributors?.length || 0) > 0 ? `<div>Top contributors: ${(a.topContributors || []).map(c => `<a href="${c.url}" class="underline">${c.login}</a>`).join(', ')}</div>` : ''}
            ${a.latestRelease ? `<div>Latest release: <span class="text-foreground font-medium">${a.latestRelease}</span></div>` : ''}
            ${a.homepage ? `<div>Homepage: <a href="${a.homepage}" class="underline break-all">${a.homepage}</a></div>` : ''}
            <div class="pt-1">Tip: after Generate, open Tiles to resize, drag to reorder, or press Ctrl+K for actions.</div>
          </div>
        </div>
      `;

    case 'manual-step-1':
      return `
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Project Name</label>
            <input type="text" id="man-project-name" value="${manualData.projectName}" placeholder="e.g. MyAwesomeApp" class="form-input text-xs" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Tagline / What does it do?</label>
            <input type="text" id="man-tagline" value="${manualData.tagline}" placeholder="e.g. Blazing-fast web app for managing data" class="form-input text-xs" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-foreground mb-1">GitHub Username / Org</label>
              <input type="text" id="man-repo-owner" value="${manualData.repoOwner}" placeholder="e.g. yourname" class="form-input text-xs" />
            </div>
            <div>
              <label class="block text-xs font-medium text-foreground mb-1">Repository Name</label>
              <input type="text" id="man-repo-name" value="${manualData.repoName}" placeholder="e.g. my-awesome-app" class="form-input text-xs" />
            </div>
          </div>
        </div>
      `;

    case 'manual-step-2':
      const popularTech = ['typescript', 'javascript', 'python', 'react', 'nextjs', 'vue', 'tailwind', 'nodejs', 'express', 'fastapi', 'postgres', 'docker', 'git'];
      return `
        <div class="space-y-3">
          <p class="text-xs text-muted-foreground">Click to select the primary technologies used in this project:</p>
          <div class="flex flex-wrap gap-2 max-h-56 overflow-y-auto p-1">
            ${popularTech.map(id => {
              const item = TECH_CATALOG.find(t => t.id === id);
              if (!item) return '';
              const selected = manualData.technologies.includes(id);
              return `
                <button type="button" class="man-tech-chip px-3 py-1.5 rounded-md border text-xs font-medium flex items-center gap-1.5 transition ${
                  selected 
                    ? 'border-foreground bg-foreground text-background shadow-xs font-semibold' 
                    : 'border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted'
                }" data-tech="${id}">
                  <span>${selected ? '✓' : '+'}</span>
                  <span>${item.name}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;

    case 'manual-step-3':
      return `
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Package Manager / Toolchain</label>
            <select id="man-package-manager" class="form-input text-xs">
              <option value="npm" ${manualData.packageManager === 'npm' ? 'selected' : ''}>npm (Node.js)</option>
              <option value="pnpm" ${manualData.packageManager === 'pnpm' ? 'selected' : ''}>pnpm (Node.js)</option>
              <option value="yarn" ${manualData.packageManager === 'yarn' ? 'selected' : ''}>yarn (Node.js)</option>
              <option value="bun" ${manualData.packageManager === 'bun' ? 'selected' : ''}>bun (JavaScript/TypeScript)</option>
              <option value="pip" ${manualData.packageManager === 'pip' ? 'selected' : ''}>pip (Python)</option>
              <option value="cargo" ${manualData.packageManager === 'cargo' ? 'selected' : ''}>cargo (Rust)</option>
              <option value="go" ${manualData.packageManager === 'go' ? 'selected' : ''}>go (Go)</option>
            </select>
          </div>
          <p class="text-xs text-muted-foreground">Standard installation and running steps will be created automatically based on your choice.</p>
        </div>
      `;
  }
}

function getGuideFooterHtml() {
  switch (guideView) {
    case 'hub':
      return `
        <button id="guide-cancel-btn" class="btn-secondary text-xs px-3 py-1.5">
          Close
        </button>
        <div class="text-[10px] text-muted-foreground">
          Zero sign-up required • Free GitHub API
        </div>
      `;

    case 'scanning':
      return `
        <div class="text-xs text-muted-foreground">
          Please wait a moment...
        </div>
        <button id="guide-cancel-scan-btn" class="btn-secondary text-xs px-3 py-1.5">
          Cancel
        </button>
      `;

    case 'report':
      return `
        <button id="guide-back-to-hub-btn" class="btn-secondary text-xs px-3 py-1.5">
          ← Scan Another Repo
        </button>
        <button id="guide-apply-report-btn" class="btn-primary text-xs px-4 py-1.5 shadow-sm">
          ✨ Generate Full README
        </button>
      `;

    case 'manual-step-1':
      return `
        <button id="guide-back-to-hub-btn" class="btn-secondary text-xs px-3 py-1.5">
          ← Back
        </button>
        <button id="guide-manual-next-1-btn" class="btn-primary text-xs px-3.5 py-1.5">
          Next: Tech Stack →
        </button>
      `;

    case 'manual-step-2':
      return `
        <button id="guide-manual-prev-1-btn" class="btn-secondary text-xs px-3 py-1.5">
          ← Back
        </button>
        <button id="guide-manual-next-2-btn" class="btn-primary text-xs px-3.5 py-1.5">
          Next: Install & Run →
        </button>
      `;

    case 'manual-step-3':
      return `
        <button id="guide-manual-prev-2-btn" class="btn-secondary text-xs px-3 py-1.5">
          ← Back
        </button>
        <button id="guide-manual-finish-btn" class="btn-primary text-xs px-4 py-1.5 shadow-sm">
          ✨ Generate README
        </button>
      `;
  }
}

function attachGuideListeners(modal) {
  modal.querySelector('#guide-cancel-btn')?.addEventListener('click', closeWizard);
  modal.querySelector('#guide-cancel-scan-btn')?.addEventListener('click', () => {
    guideView = 'hub';
    renderGuideView();
  });

  // Hub Scan trigger
  const scanBtn = modal.querySelector('#guide-deep-scan-btn');
  const inputEl = modal.querySelector('#guide-repo-input');

  function triggerScan() {
    const val = inputEl?.value?.trim();
    if (!val) {
      showToast('Please enter a GitHub repository URL or owner/repo', 'error');
      return;
    }
    startDeepScan(val);
  }

  scanBtn?.addEventListener('click', triggerScan);
  inputEl?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      triggerScan();
    }
  });

  // Sample Chips
  modal.querySelectorAll('.sample-repo-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const repo = chip.dataset.repo;
      if (inputEl) inputEl.value = repo;
      startDeepScan(repo);
    });
  });

  // Start Manual Guide
  modal.querySelector('#guide-start-manual-btn')?.addEventListener('click', () => {
    guideView = 'manual-step-1';
    renderGuideView();
  });

  // Back to Hub
  modal.querySelector('#guide-back-to-hub-btn')?.addEventListener('click', () => {
    guideView = 'hub';
    renderGuideView();
  });

  // Apply Report
  modal.querySelector('#guide-apply-report-btn')?.addEventListener('click', () => {
    if (currentScanAnalysis) {
      store.applyRepoAnalysis(currentScanAnalysis);
      closeWizard();
      fireConfetti();
      showToast(`README created for ${currentScanAnalysis.repo}!`, 'success');
    }
  });

  // Manual Step 1 -> 2
  modal.querySelector('#guide-manual-next-1-btn')?.addEventListener('click', () => {
    const nameEl = modal.querySelector('#man-project-name');
    const tagEl = modal.querySelector('#man-tagline');
    const ownerEl = modal.querySelector('#man-repo-owner');
    const repoEl = modal.querySelector('#man-repo-name');

    manualData.projectName = nameEl?.value?.trim() || 'My Project';
    manualData.tagline = tagEl?.value?.trim() || 'An open-source application.';
    manualData.repoOwner = ownerEl?.value?.trim() || '';
    manualData.repoName = repoEl?.value?.trim() || (nameEl?.value ? nameEl.value.toLowerCase().replace(/\s+/g, '-') : 'project');

    guideView = 'manual-step-2';
    renderGuideView();
  });

  // Manual Step 2: Tech chips
  modal.querySelectorAll('.man-tech-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const techId = chip.dataset.tech;
      if (manualData.technologies.includes(techId)) {
        manualData.technologies = manualData.technologies.filter(t => t !== techId);
      } else {
        manualData.technologies.push(techId);
      }
      renderGuideView();
    });
  });

  modal.querySelector('#guide-manual-prev-1-btn')?.addEventListener('click', () => {
    guideView = 'manual-step-1';
    renderGuideView();
  });

  modal.querySelector('#guide-manual-next-2-btn')?.addEventListener('click', () => {
    guideView = 'manual-step-3';
    renderGuideView();
  });

  modal.querySelector('#guide-manual-prev-2-btn')?.addEventListener('click', () => {
    guideView = 'manual-step-2';
    renderGuideView();
  });

  // Manual Finish
  modal.querySelector('#guide-manual-finish-btn')?.addEventListener('click', () => {
    const pkgEl = modal.querySelector('#man-package-manager');
    manualData.packageManager = pkgEl?.value || 'npm';

    // Apply manual data to store
    store.batchUpdate(sections => {
      const hero = sections.find(s => s.type === SECTION_TYPES.HERO);
      if (hero) {
        hero.enabled = true;
        hero.data.projectName = manualData.projectName;
        hero.data.tagline = manualData.tagline;
        hero.data.repoOwner = manualData.repoOwner;
        hero.data.repoName = manualData.repoName;
      }

      const tech = sections.find(s => s.type === SECTION_TYPES.TECH_STACK);
      if (tech) {
        tech.enabled = true;
        tech.data.technologies = manualData.technologies;
      }

      const install = sections.find(s => s.type === SECTION_TYPES.INSTALLATION);
      if (install) {
        install.enabled = true;
        install.data.packageManager = manualData.packageManager;
        install.data.steps = [
          {
            title: 'Clone repository',
            cmd: manualData.repoOwner && manualData.repoName 
              ? `git clone https://github.com/${manualData.repoOwner}/${manualData.repoName}.git\ncd ${manualData.repoName}`
              : `git clone <your-repo-url>\ncd <project-folder>`
          },
          {
            title: 'Install dependencies',
            cmd: `${manualData.packageManager} install`
          },
          {
            title: 'Run application',
            cmd: `${manualData.packageManager} run dev`
          }
        ];
      }
    });

    closeWizard();
    fireConfetti();
    showToast('README generated successfully!', 'success');
  });
}

/**
 * Perform deep repository scanning with live progress updates
 */
async function startDeepScan(repoInput) {
  const parsed = parseGitHubRepoInput(repoInput);
  if (!parsed) {
    showToast('Please enter a valid repo (e.g. facebook/react or GitHub URL)', 'error');
    guideView = 'hub';
    renderGuideView();
    return;
  }

  currentRepoInput = `${parsed.owner}/${parsed.repo}`;
  guideView = 'scanning';
  currentScanProgress = { step: 1, message: `Connecting to GitHub API for ${parsed.owner}/${parsed.repo}...` };
  renderGuideView();

  try {
    const analysis = await fetchGitHubRepoFullDetails(parsed.owner, parsed.repo, progress => {
      currentScanProgress = progress;
      const statusEl = document.getElementById('guide-live-status-text');
      if (statusEl) statusEl.innerText = progress.message;
      renderGuideView();
    });

    currentScanAnalysis = analysis;
    guideView = 'report';
    renderGuideView();
  } catch (err) {
    showToast(err.message || 'Failed to scan repository', 'error');
    guideView = 'hub';
    renderGuideView();
  }
}
