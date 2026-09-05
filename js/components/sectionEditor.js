/**
 * Readmify - Dynamic Section Form Editor (v2 with GitHub Auto-Detect & Multi-Style)
 */
import { store } from '../store.js';
import { SECTION_TYPES } from '../data/defaultSections.js';
import { renderTechPickerModal } from './techPicker.js';
import { renderPhotoModal } from './photoUploader.js';
import { fetchGitHubRepoDetails, parseGitHubRepoInput } from '../services/githubApi.js';
import { TECH_CATALOG, getBadgeUrl, getSkillIconsUrl } from '../data/techCatalog.js';
import { showToast } from '../utils/exportUtils.js';

export function renderSectionEditor(container) {
  if (!container) return;

  const state = store.getState();
  const section = state.sections.find(s => s.id === state.activeSectionId);

  if (!section) {
    container.innerHTML = `
      <div class="p-8 text-center text-muted-foreground text-xs">
        Select a section from the sidebar to edit its content.
      </div>
    `;
    return;
  }

  const { type, data, title, id, enabled } = section;

  container.innerHTML = `
    <div class="p-5">
      <!-- Section Header -->
      <div class="flex items-center justify-between pb-3.5 mb-5 border-b border-border">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-sm font-semibold text-foreground">${title}</h2>
            <span class="px-2 py-0.5 text-[10px] font-medium rounded-full ${enabled ? 'bg-muted text-foreground border border-border' : 'bg-muted/40 text-muted-foreground'}">
              ${enabled ? 'Active' : 'Disabled'}
            </span>
          </div>
          <p class="text-[11px] text-muted-foreground mt-0.5">Configure options and content for this section</p>
        </div>

        <div class="flex items-center gap-2">
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="toggle-section-enabled" class="sr-only peer" ${enabled ? 'checked' : ''}>
            <div class="w-8 h-4 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-zinc-900 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-700 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-foreground peer-checked:after:bg-zinc-950"></div>
          </label>
          ${type === SECTION_TYPES.CUSTOM ? `
            <button id="delete-custom-section-btn" class="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded transition" title="Delete section">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Form Body -->
      <div id="section-form-fields" class="space-y-4">
        ${renderFormFieldsByType(type, data, state)}
      </div>
    </div>
  `;

  const toggleBtn = container.querySelector('#toggle-section-enabled');
  if (toggleBtn) {
    toggleBtn.addEventListener('change', (e) => {
      store.toggleSection(id, e.target.checked);
    });
  }

  const deleteBtn = container.querySelector('#delete-custom-section-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      if (confirm(`Are you sure you want to remove "${title}"?`)) {
        store.removeSection(id);
      }
    });
  }

  attachFieldListeners(container, id, type, data);
}

function renderFormFieldsByType(type, data, state) {
  switch (type) {
    case SECTION_TYPES.HERO:
      return `
        <!-- GitHub Auto-Detect Banner -->
        <div class="p-3 bg-card border border-border rounded-lg space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <span>⚡</span> Free GitHub API Auto-Detect
            </span>
            <span class="text-[10px] text-muted-foreground">Zero auth required</span>
          </div>
          <div class="flex gap-2">
            <input type="text" id="github-autodetect-input" value="${data.repoOwner && data.repoName ? data.repoOwner + '/' + data.repoName : ''}" placeholder="Paste repo (e.g. facebook/react)" class="form-input text-xs flex-1" />
            <button id="trigger-autodetect-btn" class="btn-primary text-xs px-3 py-1.5 whitespace-nowrap">
              Fetch Info
            </button>
          </div>
          <p class="text-[11px] text-muted-foreground">Automatically pulls languages, stars, description, license & topics.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Project Name</label>
            <input type="text" data-field="projectName" value="${data.projectName || ''}" class="form-input" placeholder="e.g. Readmify" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Alignment</label>
            <select data-field="align" class="form-input">
              <option value="center" ${data.align === 'center' ? 'selected' : ''}>Centered (Modern)</option>
              <option value="left" ${data.align === 'left' ? 'selected' : ''}>Left-aligned (Classic)</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Tagline / Short Description</label>
          <input type="text" data-field="tagline" value="${data.tagline || ''}" class="form-input" placeholder="e.g. Craft stunning READMEs in minutes" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">GitHub Owner / Org</label>
            <input type="text" data-field="repoOwner" value="${data.repoOwner || ''}" class="form-input" placeholder="e.g. yourusername" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Repository Name</label>
            <input type="text" data-field="repoName" value="${data.repoName || ''}" class="form-input" placeholder="e.g. your-repo" />
          </div>
        </div>

        <!-- Banner / Photo Section -->
        <div class="p-3.5 bg-card border border-border rounded-md space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Project Banner / Header Image</label>
            <button id="open-banner-hub-btn" class="text-xs font-medium text-foreground hover:underline flex items-center gap-1">
              <span>🖼️</span> Pick Preset / Upload
            </button>
          </div>
          <input type="text" data-field="logoUrl" value="${data.logoUrl || ''}" class="form-input text-xs" placeholder="https://... image banner URL" />
          <div class="flex items-center gap-2">
            <input type="checkbox" id="show-logo-cb" data-field="showLogo" ${data.showLogo ? 'checked' : ''} class="rounded border-border" />
            <label for="show-logo-cb" class="text-[11px] text-muted-foreground cursor-pointer">Display banner image in README</label>
          </div>
        </div>
      `;

    case SECTION_TYPES.TECH_STACK: {
      const selected = (data.technologies || [])
        .map(id => TECH_CATALOG.find(t => t.id === id))
        .filter(Boolean);
      const style = data.style || 'skillicons';

      return `
        <!-- Language & Tech Style Switcher -->
        <div class="space-y-1.5">
          <label class="block text-xs font-medium text-foreground">Visual Style</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button class="tech-style-btn p-2 rounded-md border text-xs text-left transition ${style === 'skillicons' ? 'bg-muted border-foreground/60 font-semibold text-foreground ring-1 ring-ring' : 'bg-card border-border text-muted-foreground hover:text-foreground'}" data-style="skillicons">
              <span class="block font-medium">SkillIcons</span>
              <span class="text-[10px] text-muted-foreground">Curved icon grid</span>
            </button>
            <button class="tech-style-btn p-2 rounded-md border text-xs text-left transition ${style === 'for-the-badge' ? 'bg-muted border-foreground/60 font-semibold text-foreground ring-1 ring-ring' : 'bg-card border-border text-muted-foreground hover:text-foreground'}" data-style="for-the-badge">
              <span class="block font-medium">Shields Bold</span>
              <span class="text-[10px] text-muted-foreground">Badge chips</span>
            </button>
            <button class="tech-style-btn p-2 rounded-md border text-xs text-left transition ${style === 'github-stats' ? 'bg-muted border-foreground/60 font-semibold text-foreground ring-1 ring-ring' : 'bg-card border-border text-muted-foreground hover:text-foreground'}" data-style="github-stats">
              <span class="block font-medium">Language Card</span>
              <span class="text-[10px] text-muted-foreground">Dynamic % graph</span>
            </button>
            <button class="tech-style-btn p-2 rounded-md border text-xs text-left transition ${style === 'devicon-grid' ? 'bg-muted border-foreground/60 font-semibold text-foreground ring-1 ring-ring' : 'bg-card border-border text-muted-foreground hover:text-foreground'}" data-style="devicon-grid">
              <span class="block font-medium">Logo Grid</span>
              <span class="text-[10px] text-muted-foreground">Centered icons</span>
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between pt-2">
          <div>
            <label class="block text-xs font-medium text-foreground">Selected Technologies & Languages</label>
            <p class="text-[11px] text-muted-foreground">${selected.length} items configured</p>
          </div>
          <button id="open-tech-picker-btn" class="btn-primary text-xs px-3 py-1.5 flex items-center gap-1.5">
            <span>✨</span> Browse & Add Badges
          </button>
        </div>

        <!-- Selected Badges Preview -->
        <div class="p-3.5 bg-card border border-border rounded-md min-h-[90px] flex flex-wrap gap-1.5 items-center">
          ${selected.length > 0 
            ? selected.map(item => `
                <div class="flex items-center gap-1.5 bg-muted border border-border px-2 py-1 rounded">
                  <img src="${getBadgeUrl(item, 'flat')}" alt="${item.name}" class="h-3.5" />
                  <button class="remove-tech-chip text-muted-foreground hover:text-rose-400 text-xs ml-1" data-tech-id="${item.id}">×</button>
                </div>
              `).join('')
            : '<p class="text-xs text-muted-foreground py-3 w-full text-center">No technologies selected yet. Click "Browse & Add Badges" above or auto-detect from GitHub!</p>'
          }
        </div>
      `;
    }

    case SECTION_TYPES.DEMO:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Preview & Screenshots'}" class="form-input" />
        </div>

        <div class="p-3.5 bg-card border border-border rounded-md space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Demo Image / Screenshot</label>
            <button id="open-demo-photo-btn" class="text-xs font-medium text-foreground hover:underline flex items-center gap-1">
              <span>📸</span> Upload Screenshot / Presets
            </button>
          </div>
          <input type="text" data-field="imageUrl" value="${data.imageUrl || ''}" class="form-input text-xs" placeholder="https://raw.githubusercontent.com/.../screenshot.png" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Caption</label>
            <input type="text" data-field="caption" value="${data.caption || ''}" class="form-input" placeholder="App Walkthrough" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Live Demo URL</label>
            <input type="text" data-field="liveUrl" value="${data.liveUrl || ''}" class="form-input" placeholder="https://myapp.vercel.app" />
          </div>
        </div>
      `;

    case SECTION_TYPES.CONTRIBUTING:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Contributing'}" class="form-input" />
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Welcome Message</label>
          <textarea data-field="guidelines" rows="3" class="form-input text-xs">${data.guidelines || ''}</textarea>
        </div>
        <div class="p-3 bg-card border border-border rounded-md text-xs text-muted-foreground flex items-center gap-2">
          <span>👥</span>
          <span>Includes automated live contributor avatars from <strong class="text-foreground">contrib.rocks</strong></span>
        </div>
      `;

    case SECTION_TYPES.BADGES:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Badge Style</label>
          <select data-field="style" class="form-input">
            <option value="for-the-badge" ${data.style === 'for-the-badge' ? 'selected' : ''}>for-the-badge (Bold)</option>
            <option value="flat" ${data.style === 'flat' ? 'selected' : ''}>flat (Standard)</option>
            <option value="flat-square" ${data.style === 'flat-square' ? 'selected' : ''}>flat-square (Minimal)</option>
            <option value="plastic" ${data.style === 'plastic' ? 'selected' : ''}>plastic (Rounded)</option>
          </select>
        </div>

        <label class="block text-xs font-medium text-foreground mt-2">Dynamic GitHub Badges</label>
        <div class="grid grid-cols-2 gap-2 p-3 bg-card border border-border rounded-md">
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" data-field="showStars" ${data.showStars ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>GitHub Stars</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" data-field="showForks" ${data.showForks ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>GitHub Forks</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" data-field="showIssues" ${data.showIssues ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>Open Issues</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" data-field="showLicense" ${data.showLicense ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>License Badge</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" data-field="showRelease" ${data.showRelease ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>Release Version</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" data-field="showLastCommit" ${data.showLastCommit ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>Last Commit</span>
          </label>
        </div>
      `;

    case SECTION_TYPES.ABOUT:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'About The Project'}" class="form-input" />
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Project Overview / Description</label>
          <textarea data-field="content" rows="6" class="form-input font-sans text-xs leading-relaxed" placeholder="Describe your project...">${data.content || ''}</textarea>
        </div>
      `;

    case SECTION_TYPES.FEATURES:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Key Features'}" class="form-input" />
        </div>

        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Features List</label>
            <button id="add-feature-item-btn" class="btn-secondary text-xs py-1 px-2.5">
              + Add Feature
            </button>
          </div>

          <div id="features-items-list" class="space-y-2">
            ${(data.items || []).map((item, idx) => `
              <div class="p-2.5 bg-card border border-border rounded-md flex gap-2 items-start" data-feature-index="${idx}">
                <input type="text" class="feature-icon-input w-9 text-center py-1 bg-background border border-border rounded text-xs" value="${item.icon || '✨'}" />
                <div class="flex-1 space-y-1">
                  <input type="text" class="feature-title-input form-input py-1 text-xs" value="${item.title || ''}" placeholder="Feature Title" />
                  <textarea rows="2" class="feature-desc-input form-input py-1 text-xs" placeholder="Short description">${item.desc || ''}</textarea>
                </div>
                <button class="remove-feature-btn p-1 text-muted-foreground hover:text-rose-400 transition" title="Delete feature">✕</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.INSTALLATION:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Getting Started'}" class="form-input" />
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Prerequisites</label>
          <input type="text" data-field="prerequisites" value="${data.prerequisites || ''}" class="form-input" placeholder="Node.js 18+ and Git installed" />
        </div>

        <div class="space-y-2.5 mt-3">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Setup Steps</label>
            <button id="add-install-step-btn" class="btn-secondary text-xs py-1 px-2.5">
              + Add Step
            </button>
          </div>

          <div id="install-steps-list" class="space-y-2">
            ${(data.steps || []).map((step, idx) => `
              <div class="p-2.5 bg-card border border-border rounded-md flex gap-2 items-start" data-step-index="${idx}">
                <span class="w-5 h-5 flex items-center justify-center bg-muted text-muted-foreground rounded text-[10px] font-bold mt-1">${idx + 1}</span>
                <div class="flex-1 space-y-1">
                  <input type="text" class="step-title-input form-input py-1 text-xs" value="${step.title || ''}" placeholder="Step title" />
                  <input type="text" class="step-cmd-input form-input py-1 text-xs font-mono text-emerald-400" value="${step.cmd || ''}" placeholder="Terminal command" />
                </div>
                <button class="remove-step-btn p-1 text-muted-foreground hover:text-rose-400 transition" title="Delete">✕</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.ENV_VARS:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Environment Variables'}" class="form-input" />
        </div>

        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Variables Table</label>
            <button id="add-env-var-btn" class="btn-secondary text-xs py-1 px-2.5">
              + Add Variable
            </button>
          </div>

          <div id="env-vars-list" class="space-y-1.5">
            ${(data.variables || []).map((v, idx) => `
              <div class="p-2.5 bg-card border border-border rounded-md grid grid-cols-12 gap-2 items-center" data-var-index="${idx}">
                <div class="col-span-4">
                  <input type="text" class="var-key-input form-input py-1 text-xs font-mono" value="${v.key || ''}" placeholder="KEY_NAME" />
                </div>
                <div class="col-span-4">
                  <input type="text" class="var-desc-input form-input py-1 text-xs" value="${v.desc || ''}" placeholder="Description" />
                </div>
                <div class="col-span-2">
                  <input type="text" class="var-default-input form-input py-1 text-xs font-mono" value="${v.default || ''}" placeholder="Default" />
                </div>
                <div class="col-span-1 flex justify-center">
                  <input type="checkbox" class="var-required-input rounded border-border" ${v.required ? 'checked' : ''} title="Required?" />
                </div>
                <div class="col-span-1 flex justify-end">
                  <button class="remove-var-btn text-muted-foreground hover:text-rose-400 text-xs">✕</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.USAGE:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Usage'}" class="form-input" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Code Language</label>
            <select data-field="codeLang" class="form-input">
              <option value="bash" ${data.codeLang === 'bash' ? 'selected' : ''}>Bash / Shell</option>
              <option value="javascript" ${data.codeLang === 'javascript' ? 'selected' : ''}>JavaScript</option>
              <option value="typescript" ${data.codeLang === 'typescript' ? 'selected' : ''}>TypeScript</option>
              <option value="python" ${data.codeLang === 'python' ? 'selected' : ''}>Python</option>
              <option value="rust" ${data.codeLang === 'rust' ? 'selected' : ''}>Rust</option>
              <option value="go" ${data.codeLang === 'go' ? 'selected' : ''}>Go</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Code Example</label>
          <textarea data-field="code" rows="5" class="form-input font-mono text-xs leading-relaxed" placeholder="// Code usage...">${data.code || ''}</textarea>
        </div>
      `;

    case SECTION_TYPES.ROADMAP:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Roadmap'}" class="form-input" />
        </div>
        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Roadmap Milestones</label>
            <button id="add-roadmap-task-btn" class="btn-secondary text-xs py-1 px-2.5">
              + Add Task
            </button>
          </div>
          <div id="roadmap-tasks-list" class="space-y-1.5">
            ${(data.tasks || []).map((t, idx) => `
              <div class="p-2 bg-card border border-border rounded-md flex items-center gap-2" data-task-index="${idx}">
                <input type="checkbox" class="task-completed-input rounded border-border" ${t.completed ? 'checked' : ''} />
                <input type="text" class="task-text-input form-input py-1 text-xs flex-1" value="${t.text || ''}" placeholder="Task description..." />
                <button class="remove-task-btn text-muted-foreground hover:text-rose-400 text-xs">✕</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.LICENSE:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'License'}" class="form-input" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">License Type</label>
            <select data-field="type" class="form-input">
              <option value="MIT" ${data.type === 'MIT' ? 'selected' : ''}>MIT License</option>
              <option value="Apache-2.0" ${data.type === 'Apache-2.0' ? 'selected' : ''}>Apache 2.0</option>
              <option value="GPL-3.0" ${data.type === 'GPL-3.0' ? 'selected' : ''}>GPL 3.0</option>
              <option value="BSD-3-Clause" ${data.type === 'BSD-3-Clause' ? 'selected' : ''}>BSD 3-Clause</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Year</label>
            <input type="text" data-field="year" value="${data.year || '2026'}" class="form-input" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Copyright Holder</label>
            <input type="text" data-field="holder" value="${data.holder || ''}" class="form-input" placeholder="Name or Org" />
          </div>
        </div>
      `;

    case SECTION_TYPES.AUTHOR:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Author & Acknowledgements'}" class="form-input" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Your Name</label>
            <input type="text" data-field="name" value="${data.name || ''}" class="form-input" placeholder="Alex Dev" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">GitHub Username</label>
            <input type="text" data-field="github" value="${data.github || ''}" class="form-input" placeholder="alexdev" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Twitter / X Handle</label>
            <input type="text" data-field="twitter" value="${data.twitter || ''}" class="form-input" placeholder="alex_dev" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">LinkedIn Handle</label>
            <input type="text" data-field="linkedin" value="${data.linkedin || ''}" class="form-input" placeholder="alex-developer" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Email Address</label>
            <input type="email" data-field="email" value="${data.email || ''}" class="form-input" placeholder="alex@example.com" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Buy Me a Coffee</label>
            <input type="text" data-field="buyMeACoffee" value="${data.buyMeACoffee || ''}" class="form-input" placeholder="alexdev" />
          </div>
        </div>
      `;

    case SECTION_TYPES.CUSTOM:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Custom Section'}" class="form-input" />
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Custom Markdown Content</label>
          <textarea data-field="markdown" rows="8" class="form-input font-mono text-xs leading-relaxed" placeholder="Custom markdown...">${data.markdown || ''}</textarea>
        </div>
      `;

    default:
      return '<p class="text-xs text-muted-foreground">No editable fields.</p>';
  }
}

function attachFieldListeners(container, sectionId, type, currentData) {
  // Generic inputs
  container.querySelectorAll('[data-field]').forEach(el => {
    const field = el.dataset.field;
    const isCheckbox = el.type === 'checkbox';

    el.addEventListener(isCheckbox ? 'change' : 'input', () => {
      const val = isCheckbox ? el.checked : el.value;
      store.updateSectionData(sectionId, { [field]: val });
    });
  });

  // GitHub Auto-Detect Trigger
  const triggerAutoDetectBtn = container.querySelector('#trigger-autodetect-btn');
  const autoDetectInput = container.querySelector('#github-autodetect-input');
  if (triggerAutoDetectBtn && autoDetectInput) {
    triggerAutoDetectBtn.addEventListener('click', async () => {
      const parsed = parseGitHubRepoInput(autoDetectInput.value);
      if (!parsed) {
        showToast('Please enter a valid repo (e.g. facebook/react or GitHub URL)', 'error');
        return;
      }

      triggerAutoDetectBtn.innerText = 'Fetching...';
      triggerAutoDetectBtn.disabled = true;

      try {
        const info = await fetchGitHubRepoDetails(parsed.owner, parsed.repo);
        store.batchUpdate(sections => {
          const hero = sections.find(s => s.type === SECTION_TYPES.HERO);
          if (hero) {
            hero.data.projectName = info.repo;
            hero.data.tagline = info.description || hero.data.tagline;
            hero.data.repoOwner = info.owner;
            hero.data.repoName = info.repo;
          }

          const tech = sections.find(s => s.type === SECTION_TYPES.TECH_STACK);
          if (tech && info.matchedTechIds.length > 0) {
            // Merge detected languages
            const set = new Set([...(tech.data.technologies || []), ...info.matchedTechIds]);
            tech.data.technologies = Array.from(set);
          }

          const lic = sections.find(s => s.type === SECTION_TYPES.LICENSE);
          if (lic && info.license && info.license !== 'NOASSERTION') {
            lic.data.type = info.license;
            lic.data.holder = info.owner;
          }

          const auth = sections.find(s => s.type === SECTION_TYPES.AUTHOR);
          if (auth && info.owner) {
            auth.data.github = info.owner;
          }
        });

        const langCount = info.languages.length;
        const langSummary = info.languages.slice(0, 3).map(l => `${l.name} (${l.percentage}%)`).join(', ');
        showToast(`Auto-detected ${langCount} languages! [${langSummary}]`, 'success');
      } catch (err) {
        showToast(err.message || 'Failed to fetch from GitHub API', 'error');
      } finally {
        triggerAutoDetectBtn.innerText = 'Fetch Info';
        triggerAutoDetectBtn.disabled = false;
      }
    });
  }

  // Photo / Banner Hub Trigger
  const openBannerBtn = container.querySelector('#open-banner-hub-btn');
  if (openBannerBtn) {
    openBannerBtn.addEventListener('click', () => {
      renderPhotoModal('hero');
    });
  }

  const openDemoPhotoBtn = container.querySelector('#open-demo-photo-btn');
  if (openDemoPhotoBtn) {
    openDemoPhotoBtn.addEventListener('click', () => {
      renderPhotoModal('demo');
    });
  }

  // Tech Style Switcher buttons
  container.querySelectorAll('.tech-style-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const style = btn.dataset.style;
      store.updateSectionData(sectionId, { style });
    });
  });

  // Open Tech Stack Modal
  const openTechBtn = container.querySelector('#open-tech-picker-btn');
  if (openTechBtn) {
    openTechBtn.addEventListener('click', () => {
      renderTechPickerModal();
    });
  }

  // Remove individual tech chip
  container.querySelectorAll('.remove-tech-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const techId = btn.dataset.techId;
      const techSec = store.getState().sections.find(s => s.id === sectionId);
      const list = (techSec?.data?.technologies || []).filter(id => id !== techId);
      store.updateSectionData(sectionId, { technologies: list });
    });
  });

  // Feature items
  const addFeatureBtn = container.querySelector('#add-feature-item-btn');
  if (addFeatureBtn) {
    addFeatureBtn.addEventListener('click', () => {
      const items = [...(currentData.items || [])];
      items.push({ icon: '✨', title: 'New Feature', desc: 'Description of this feature.' });
      store.updateSectionData(sectionId, { items });
    });
  }

  const featuresList = container.querySelector('#features-items-list');
  if (featuresList) {
    featuresList.querySelectorAll('.remove-feature-btn').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const items = [...(currentData.items || [])];
        items.splice(idx, 1);
        store.updateSectionData(sectionId, { items });
      });
    });

    featuresList.querySelectorAll('.feature-icon-input, .feature-title-input, .feature-desc-input').forEach(input => {
      input.addEventListener('input', () => {
        const row = input.closest('[data-feature-index]');
        const idx = parseInt(row.dataset.featureIndex, 10);
        const items = [...(currentData.items || [])];
        if (items[idx]) {
          items[idx] = {
            icon: row.querySelector('.feature-icon-input').value,
            title: row.querySelector('.feature-title-input').value,
            desc: row.querySelector('.feature-desc-input').value
          };
          store.updateSectionData(sectionId, { items });
        }
      });
    });
  }

  // Installation steps
  const addStepBtn = container.querySelector('#add-install-step-btn');
  if (addStepBtn) {
    addStepBtn.addEventListener('click', () => {
      const steps = [...(currentData.steps || [])];
      steps.push({ title: 'New Step', cmd: 'echo "hello"' });
      store.updateSectionData(sectionId, { steps });
    });
  }

  const stepsList = container.querySelector('#install-steps-list');
  if (stepsList) {
    stepsList.querySelectorAll('.remove-step-btn').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const steps = [...(currentData.steps || [])];
        steps.splice(idx, 1);
        store.updateSectionData(sectionId, { steps });
      });
    });

    stepsList.querySelectorAll('.step-title-input, .step-cmd-input').forEach(input => {
      input.addEventListener('input', () => {
        const row = input.closest('[data-step-index]');
        const idx = parseInt(row.dataset.stepIndex, 10);
        const steps = [...(currentData.steps || [])];
        if (steps[idx]) {
          steps[idx] = {
            title: row.querySelector('.step-title-input').value,
            cmd: row.querySelector('.step-cmd-input').value
          };
          store.updateSectionData(sectionId, { steps });
        }
      });
    });
  }

  // Env vars
  const addVarBtn = container.querySelector('#add-env-var-btn');
  if (addVarBtn) {
    addVarBtn.addEventListener('click', () => {
      const variables = [...(currentData.variables || [])];
      variables.push({ key: 'NEW_VAR', desc: 'Description', default: '', required: false });
      store.updateSectionData(sectionId, { variables });
    });
  }

  const varsList = container.querySelector('#env-vars-list');
  if (varsList) {
    varsList.querySelectorAll('.remove-var-btn').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const variables = [...(currentData.variables || [])];
        variables.splice(idx, 1);
        store.updateSectionData(sectionId, { variables });
      });
    });

    varsList.querySelectorAll('.var-key-input, .var-desc-input, .var-default-input, .var-required-input').forEach(input => {
      input.addEventListener(input.type === 'checkbox' ? 'change' : 'input', () => {
        const row = input.closest('[data-var-index]');
        const idx = parseInt(row.dataset.varIndex, 10);
        const variables = [...(currentData.variables || [])];
        if (variables[idx]) {
          variables[idx] = {
            key: row.querySelector('.var-key-input').value,
            desc: row.querySelector('.var-desc-input').value,
            default: row.querySelector('.var-default-input').value,
            required: row.querySelector('.var-required-input').checked
          };
          store.updateSectionData(sectionId, { variables });
        }
      });
    });
  }

  // Roadmap tasks
  const addTaskBtn = container.querySelector('#add-roadmap-task-btn');
  if (addTaskBtn) {
    addTaskBtn.addEventListener('click', () => {
      const tasks = [...(currentData.tasks || [])];
      tasks.push({ text: 'New milestone', completed: false });
      store.updateSectionData(sectionId, { tasks });
    });
  }

  const tasksList = container.querySelector('#roadmap-tasks-list');
  if (tasksList) {
    tasksList.querySelectorAll('.remove-task-btn').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const tasks = [...(currentData.tasks || [])];
        tasks.splice(idx, 1);
        store.updateSectionData(sectionId, { tasks });
      });
    });

    tasksList.querySelectorAll('.task-completed-input, .task-text-input').forEach(input => {
      input.addEventListener(input.type === 'checkbox' ? 'change' : 'input', () => {
        const row = input.closest('[data-task-index]');
        const idx = parseInt(row.dataset.taskIndex, 10);
        const tasks = [...(currentData.tasks || [])];
        if (tasks[idx]) {
          tasks[idx] = {
            text: row.querySelector('.task-text-input').value,
            completed: row.querySelector('.task-completed-input').checked
          };
          store.updateSectionData(sectionId, { tasks });
        }
      });
    });
  }
}
