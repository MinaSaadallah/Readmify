/**
 * Readmify - Dynamic Section Form Editor (v3 with Image Studio, Section Library & Full Customizability)
 */
import { store } from '../store.js';
import { SECTION_TYPES } from '../data/defaultSections.js';
import { renderTechPickerModal } from './techPicker.js';
import { renderPhotoModal } from './photoUploader.js';
import { openSectionLibrary } from './sectionLibrary.js';
import { fetchGitHubRepoFullDetails, parseGitHubRepoInput } from '../services/githubApi.js';
import { TECH_CATALOG, getBadgeUrl, getSkillIconsUrl } from '../data/techCatalog.js';
import { showToast, fireConfetti, copyToClipboard, downloadReadmeFile } from '../utils/exportUtils.js';
import { LICENSE_CATALOG, getLicenseById } from '../data/licenses.js';

let currentRenderedSectionId = null;

export function renderSectionEditor(container, meta = {}) {
  if (!container) return;

  const state = store.getState();
  const section = state.sections.find(s => s.id === state.activeSectionId);

  if (!section) {
    currentRenderedSectionId = null;
    container.innerHTML = `
      <div class="p-12 text-center text-muted-foreground text-xs space-y-3">
        <div class="w-10 h-10 mx-auto rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div class="space-y-1">
          <p class="font-medium text-foreground">No Section Selected</p>
          <p>Select a section from the bar above, or add a new section from the library.</p>
        </div>
        <button id="empty-add-sec-btn" class="btn-primary text-xs px-3.5 py-1.5 shadow-sm inline-flex items-center gap-1.5 cursor-pointer">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          <span>Open Section Library</span>
        </button>
      </div>
    `;
    container.querySelector('#empty-add-sec-btn')?.addEventListener('click', openSectionLibrary);
    return;
  }

  const { type, data, title, id, enabled } = section;

  // Prevent input focus loss: if user is typing inside an input/textarea of this section, do NOT rebuild innerHTML
  const activeEl = document.activeElement;
  const isTyping = activeEl && container.contains(activeEl) && (
    (activeEl.tagName === 'INPUT' && activeEl.type !== 'checkbox' && activeEl.type !== 'radio' && activeEl.type !== 'button' && activeEl.type !== 'submit') ||
    activeEl.tagName === 'TEXTAREA'
  );

  if (currentRenderedSectionId === id && isTyping && !meta.force) {
    if (type === SECTION_TYPES.LICENSE) {
      const licPre = container.querySelector('#license-preview-pre');
      if (licPre) {
        const activeLic = getLicenseById(data.type || 'MIT');
        licPre.textContent = activeLic.generateText(data.year, data.holder, data.projectName);
      }
    }
    return;
  }
  currentRenderedSectionId = id;

  const currentIndex = state.sections.findIndex(s => s.id === id);
  const totalSections = state.sections.length;

  container.innerHTML = `
    <div class="p-5 max-w-3xl mx-auto space-y-5">
      <!-- Section Action Header Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-border">
        <!-- Title & Rename -->
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <input 
              type="text" 
              id="section-title-rename-input" 
              value="${title}" 
              class="text-sm font-semibold text-foreground bg-transparent hover:bg-card focus:bg-card border border-transparent hover:border-border focus:border-border rounded px-2 py-0.5 transition outline-none" 
              title="Click to rename this section"
            />
            <span class="px-2 py-0.5 text-[10px] font-medium rounded-full ${enabled ? 'bg-muted text-foreground border border-border' : 'bg-muted/40 text-muted-foreground'}">
              ${enabled ? 'Active' : 'Disabled'}
            </span>
          </div>
          <p class="text-[11px] text-muted-foreground">Customize options, markdown layout, and content</p>
        </div>

        <!-- Section Action Buttons Toolbar -->
        <div class="flex items-center gap-1.5 flex-wrap">
          <button id="sec-move-up-btn" class="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded text-xs transition ${currentIndex === 0 ? 'opacity-30 pointer-events-none' : ''}" title="Move Section Up">
            ▲
          </button>
          <button id="sec-move-down-btn" class="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded text-xs transition ${currentIndex === totalSections - 1 ? 'opacity-30 pointer-events-none' : ''}" title="Move Section Down">
            ▼
          </button>
          <button id="sec-duplicate-btn" class="px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded border border-border transition flex items-center gap-1" title="Duplicate this section">
            <span>📑</span> Duplicate
          </button>
          <label class="relative inline-flex items-center cursor-pointer ml-1" title="Toggle section visibility">
            <input type="checkbox" id="toggle-section-enabled" class="sr-only peer" ${enabled ? 'checked' : ''}>
            <div class="w-8 h-4 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-zinc-900 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-700 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-foreground peer-checked:after:bg-zinc-950"></div>
          </label>
          <button id="sec-delete-btn" class="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded transition ml-1" title="Delete section">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </div>

      <!-- Form Fields Body -->
      <div id="section-form-fields" class="space-y-4">
        ${renderFormFieldsByType(type, data, state)}
      </div>
    </div>
  `;

  // Rename Section Input
  const renameInput = container.querySelector('#section-title-rename-input');
  renameInput?.addEventListener('input', (e) => {
    store.renameSection(id, e.target.value);
  });
  renameInput?.addEventListener('change', (e) => {
    showToast(`Renamed section to "${e.target.value}"`, 'info');
  });

  // Toolbar Listeners
  container.querySelector('#sec-move-up-btn')?.addEventListener('click', () => {
    store.moveSection(id, 'up');
  });
  container.querySelector('#sec-move-down-btn')?.addEventListener('click', () => {
    store.moveSection(id, 'down');
  });
  container.querySelector('#sec-duplicate-btn')?.addEventListener('click', () => {
    const newId = store.duplicateSection(id);
    if (newId) showToast('Section duplicated!', 'success');
  });
  container.querySelector('#toggle-section-enabled')?.addEventListener('change', (e) => {
    store.toggleSection(id, e.target.checked);
  });
  container.querySelector('#sec-delete-btn')?.addEventListener('click', () => {
    if (confirm(`Delete the section "${title}"?`)) {
      store.removeSection(id);
      showToast(`Removed "${title}"`, 'info');
    }
  });

  attachFieldListeners(container, id, type, data);
}

function renderFormFieldsByType(type, data, state) {
  switch (type) {
    case SECTION_TYPES.HERO:
      return `
        <!-- GitHub Deep Repo Scanner Banner -->
        <div class="p-3.5 bg-card border border-border rounded-lg space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <span>⚡</span> Deep Repository Scanner
            </span>
            <span class="text-[10px] text-muted-foreground">Scans tree, manifests & environment</span>
          </div>
          <div class="flex gap-2">
            <input type="text" id="github-autodetect-input" value="${data.repoOwner && data.repoName ? data.repoOwner + '/' + data.repoName : ''}" placeholder="Paste repo URL or owner/repo (e.g. facebook/react)" class="form-input text-xs flex-1" />
            <button id="trigger-autodetect-btn" class="btn-primary text-xs px-3.5 py-1.5 whitespace-nowrap flex items-center gap-1">
              <span>⚡</span> Deep Scan
            </button>
          </div>
          <p class="text-[11px] text-muted-foreground">Deeply inspects file tree, dependencies, package managers, scripts, environment variables, and CI/CD pipelines to build your entire README.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Project Name</label>
            <input type="text" data-field="projectName" value="${data.projectName || ''}" class="form-input text-xs" placeholder="e.g. Readmify" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Alignment</label>
            <select data-field="align" class="form-input text-xs">
              <option value="center" ${data.align === 'center' ? 'selected' : ''}>Centered (Modern)</option>
              <option value="left" ${data.align === 'left' ? 'selected' : ''}>Left-aligned (Classic)</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Tagline / Short Description</label>
          <input type="text" data-field="tagline" value="${data.tagline || ''}" class="form-input text-xs" placeholder="e.g. Craft stunning READMEs in minutes" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">GitHub Owner / Org</label>
            <input type="text" data-field="repoOwner" value="${data.repoOwner || ''}" class="form-input text-xs" placeholder="e.g. yourusername" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Repository Name</label>
            <input type="text" data-field="repoName" value="${data.repoName || ''}" class="form-input text-xs" placeholder="e.g. your-repo" />
          </div>
        </div>

        <!-- Banner / Photo Section with Image Studio -->
        <div class="p-3.5 bg-card border border-border rounded-lg space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <span>🖼️</span> Project Banner & Logo
            </label>
            <button id="open-banner-hub-btn" class="btn-secondary text-xs px-2.5 py-1 flex items-center gap-1 shadow-xs">
              <span>✂️</span> Open Image Studio (Crop & Resize)
            </button>
          </div>

          <div class="flex items-center gap-2">
            <input type="checkbox" id="hero-show-logo-cb" data-field="showLogo" ${data.showLogo ? 'checked' : ''} class="rounded border-border text-foreground" />
            <label for="hero-show-logo-cb" class="text-xs text-foreground cursor-pointer">Display banner / logo in README</label>
          </div>

          <div>
            <label class="block text-[11px] text-muted-foreground mb-1">Image URL or Base64 Data</label>
            <input type="text" data-field="logoUrl" value="${data.logoUrl || ''}" placeholder="https://raw.githubusercontent.com/.../banner.png" class="form-input text-xs" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] text-muted-foreground mb-1">Render Width</label>
              <select data-field="logoWidth" class="form-input text-xs">
                <option value="100%" ${data.logoWidth === '100%' ? 'selected' : ''}>100% (Full Width)</option>
                <option value="80%" ${data.logoWidth === '80%' ? 'selected' : ''}>80% (Medium Large)</option>
                <option value="600" ${data.logoWidth === '600' ? 'selected' : ''}>600px (Medium)</option>
                <option value="400" ${data.logoWidth === '400' ? 'selected' : ''}>400px (Compact)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] text-muted-foreground mb-1">Corner Radius</label>
              <select data-field="logoRadius" class="form-input text-xs">
                <option value="8px" ${data.logoRadius === '8px' ? 'selected' : ''}>Rounded (8px)</option>
                <option value="16px" ${data.logoRadius === '16px' ? 'selected' : ''}>Pill / Soft (16px)</option>
                <option value="0px" ${data.logoRadius === '0px' ? 'selected' : ''}>Sharp (0px)</option>
              </select>
            </div>
          </div>
        </div>
      `;

    case SECTION_TYPES.DEMO:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Preview & Screenshots'}" class="form-input text-xs" />
        </div>

        <div class="p-3.5 bg-card border border-border rounded-lg space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <span>📸</span> Screenshot / Demo Preview
            </label>
            <button id="open-demo-studio-btn" class="btn-secondary text-xs px-2.5 py-1 flex items-center gap-1 shadow-xs">
              <span>✂️</span> Crop & Resize in Image Studio
            </button>
          </div>

          <div>
            <label class="block text-[11px] text-muted-foreground mb-1">Image or GIF URL</label>
            <input type="text" data-field="imageUrl" value="${data.imageUrl || ''}" class="form-input text-xs" placeholder="https://raw.githubusercontent.com/.../demo.gif" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] text-muted-foreground mb-1">Display Width</label>
              <select data-field="width" class="form-input text-xs">
                <option value="100%" ${data.width === '100%' ? 'selected' : ''}>100% (Full)</option>
                <option value="80%" ${data.width === '80%' ? 'selected' : ''}>80% (Medium)</option>
                <option value="600" ${data.width === '600' ? 'selected' : ''}>600px</option>
                <option value="400" ${data.width === '400' ? 'selected' : ''}>400px</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] text-muted-foreground mb-1">Alignment</label>
              <select data-field="align" class="form-input text-xs">
                <option value="center" ${data.align === 'center' ? 'selected' : ''}>Center</option>
                <option value="left" ${data.align === 'left' ? 'selected' : ''}>Left</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] text-muted-foreground mb-1">Corner Radius</label>
              <select data-field="radius" class="form-input text-xs">
                <option value="8px" ${data.radius === '8px' ? 'selected' : ''}>Rounded (8px)</option>
                <option value="16px" ${data.radius === '16px' ? 'selected' : ''}>Soft (16px)</option>
                <option value="0px" ${data.radius === '0px' ? 'selected' : ''}>Sharp (0px)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Caption</label>
            <input type="text" data-field="caption" value="${data.caption || ''}" class="form-input text-xs" placeholder="App Walkthrough Preview" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Live Demo URL</label>
            <input type="text" data-field="liveUrl" value="${data.liveUrl || ''}" class="form-input text-xs" placeholder="https://myapp.vercel.app" />
          </div>
        </div>
      `;

    case SECTION_TYPES.FAQ:
      const questions = data.questions || [];
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Frequently Asked Questions'}" class="form-input text-xs" />
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Questions & Answers (${questions.length})</label>
            <button id="add-faq-btn" class="btn-primary text-xs px-2.5 py-1">
              + Add Question
            </button>
          </div>

          <div id="faq-items-list" class="space-y-3">
            ${questions.map((item, idx) => `
              <div class="p-3 bg-card border border-border rounded-lg space-y-2 relative group" data-idx="${idx}">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono text-muted-foreground uppercase">Question #${idx + 1}</span>
                  <button class="delete-faq-btn text-rose-400 hover:text-rose-300 text-xs px-1" data-idx="${idx}" title="Delete Question">✕</button>
                </div>
                <input type="text" class="faq-q-input form-input text-xs font-medium" placeholder="Question..." value="${item.q || ''}" data-idx="${idx}" />
                <textarea class="faq-a-input form-input text-xs" rows="2" placeholder="Answer..." data-idx="${idx}">${item.a || ''}</textarea>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.BENCHMARKS:
      const rows = data.rows || [];
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Benchmarks'}" class="form-input text-xs" />
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Test Conditions / Subtitle</label>
          <input type="text" data-field="subtitle" value="${data.subtitle || ''}" placeholder="e.g. Tested on Apple M2, Node v20" class="form-input text-xs" />
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Benchmark Metric Rows (${rows.length})</label>
            <button id="add-benchmark-btn" class="btn-primary text-xs px-2.5 py-1">
              + Add Metric
            </button>
          </div>

          <div id="benchmark-items-list" class="space-y-2">
            ${rows.map((row, idx) => `
              <div class="p-2.5 bg-card border border-border rounded-lg grid grid-cols-4 gap-2 items-center text-xs relative" data-idx="${idx}">
                <input type="text" class="bench-task-input form-input text-xs" placeholder="Task Name" value="${row.task || ''}" data-idx="${idx}" />
                <input type="text" class="bench-base-input form-input text-xs" placeholder="Baseline" value="${row.baseline || ''}" data-idx="${idx}" />
                <input type="text" class="bench-curr-input form-input text-xs font-semibold" placeholder="Current / Project" value="${row.current || ''}" data-idx="${idx}" />
                <div class="flex items-center gap-1">
                  <input type="text" class="bench-diff-input form-input text-xs text-emerald-400" placeholder="Improvement" value="${row.diff || ''}" data-idx="${idx}" />
                  <button class="delete-bench-btn text-rose-400 hover:text-rose-300 text-xs px-1" data-idx="${idx}">✕</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.SPONSORS:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Support & Sponsors'}" class="form-input text-xs" />
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Support Message</label>
          <textarea data-field="message" rows="2" class="form-input text-xs">${data.message || ''}</textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Buy Me A Coffee Username</label>
            <input type="text" data-field="buyMeACoffee" value="${data.buyMeACoffee || ''}" class="form-input text-xs" placeholder="username" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">GitHub Sponsors Username</label>
            <input type="text" data-field="githubSponsor" value="${data.githubSponsor || ''}" class="form-input text-xs" placeholder="username" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Patreon Handle</label>
            <input type="text" data-field="patreon" value="${data.patreon || ''}" class="form-input text-xs" placeholder="handle" />
          </div>
        </div>
      `;

    case SECTION_TYPES.API_REFERENCE:
      const endpoints = data.endpoints || [];
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'API Reference'}" class="form-input text-xs" />
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">API Endpoints (${endpoints.length})</label>
            <button id="add-endpoint-btn" class="btn-primary text-xs px-2.5 py-1">
              + Add Endpoint
            </button>
          </div>

          <div id="api-endpoints-list" class="space-y-2">
            ${endpoints.map((ep, idx) => `
              <div class="p-2.5 bg-card border border-border rounded-lg grid grid-cols-1 sm:grid-cols-4 gap-2 items-center text-xs" data-idx="${idx}">
                <select class="ep-method-select form-input text-xs font-bold" data-idx="${idx}">
                  <option value="GET" ${ep.method === 'GET' ? 'selected' : ''}>GET</option>
                  <option value="POST" ${ep.method === 'POST' ? 'selected' : ''}>POST</option>
                  <option value="PUT" ${ep.method === 'PUT' ? 'selected' : ''}>PUT</option>
                  <option value="DELETE" ${ep.method === 'DELETE' ? 'selected' : ''}>DELETE</option>
                  <option value="PATCH" ${ep.method === 'PATCH' ? 'selected' : ''}>PATCH</option>
                </select>
                <input type="text" class="ep-path-input form-input text-xs font-mono" placeholder="/api/v1/resource" value="${ep.path || ''}" data-idx="${idx}" />
                <input type="text" class="ep-desc-input form-input text-xs" placeholder="Description" value="${ep.desc || ''}" data-idx="${idx}" />
                <div class="flex items-center gap-1">
                  <input type="text" class="ep-auth-input form-input text-xs" placeholder="Auth (e.g. Bearer)" value="${ep.auth || 'None'}" data-idx="${idx}" />
                  <button class="delete-ep-btn text-rose-400 hover:text-rose-300 text-xs px-1" data-idx="${idx}">✕</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.CHANGELOG:
      const releases = data.releases || [];
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Changelog'}" class="form-input text-xs" />
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Release Versions (${releases.length})</label>
            <button id="add-release-btn" class="btn-primary text-xs px-2.5 py-1">
              + Add Release
            </button>
          </div>

          <div id="releases-list" class="space-y-3">
            ${releases.map((rel, idx) => `
              <div class="p-3 bg-card border border-border rounded-lg space-y-2 relative" data-idx="${idx}">
                <div class="flex items-center justify-between">
                  <div class="flex gap-2 flex-1 mr-2">
                    <input type="text" class="rel-version-input form-input text-xs font-bold w-28" placeholder="v1.0.0" value="${rel.version || ''}" data-idx="${idx}" />
                    <input type="text" class="rel-date-input form-input text-xs w-36" placeholder="YYYY-MM-DD" value="${rel.date || ''}" data-idx="${idx}" />
                  </div>
                  <button class="delete-rel-btn text-rose-400 hover:text-rose-300 text-xs px-1" data-idx="${idx}">✕</button>
                </div>
                <textarea class="rel-changes-input form-input text-xs" rows="2" placeholder="List changes (one per line)..." data-idx="${idx}">${(rel.changes || []).join('\n')}</textarea>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.BADGES:
      const bStyle = data.style || 'for-the-badge';
      const bAlign = data.align || 'center';
      const bFormat = data.format || 'html';
      const heroSec = store.getState().sections.find(s => s.type === SECTION_TYPES.HERO);
      const defaultOwner = heroSec?.data?.repoOwner || '';
      const defaultRepo = heroSec?.data?.repoName || '';

      return `
        <!-- Repo Target Bar -->
        <div class="p-3 bg-card border border-border rounded-lg space-y-2">
          <label class="block text-xs font-semibold text-foreground">Target GitHub Repository</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label class="block text-[11px] text-muted-foreground mb-0.5">Owner / User / Org</label>
              <input type="text" data-field="repoOwner" value="${data.repoOwner || defaultOwner}" class="form-input text-xs" placeholder="e.g. MinaSaadallah" />
            </div>
            <div>
              <label class="block text-[11px] text-muted-foreground mb-0.5">Repository Name</label>
              <input type="text" data-field="repoName" value="${data.repoName || defaultRepo}" class="form-input text-xs" placeholder="e.g. Coverage-Checker" />
            </div>
          </div>
        </div>

        <!-- Style, Alignment & Format Controls -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Badge Style</label>
            <select data-field="style" class="form-input text-xs">
              <option value="for-the-badge" ${bStyle === 'for-the-badge' ? 'selected' : ''}>for-the-badge (Bold)</option>
              <option value="flat" ${bStyle === 'flat' ? 'selected' : ''}>flat (Standard)</option>
              <option value="flat-square" ${bStyle === 'flat-square' ? 'selected' : ''}>flat-square (Minimal)</option>
              <option value="plastic" ${bStyle === 'plastic' ? 'selected' : ''}>plastic (Rounded)</option>
              <option value="social" ${bStyle === 'social' ? 'selected' : ''}>social (GitHub Style)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Alignment</label>
            <select data-field="align" class="form-input text-xs">
              <option value="center" ${bAlign === 'center' ? 'selected' : ''}>Center (Standard)</option>
              <option value="left" ${bAlign === 'left' ? 'selected' : ''}>Left</option>
              <option value="right" ${bAlign === 'right' ? 'selected' : ''}>Right</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Output Format</label>
            <select data-field="format" class="form-input text-xs">
              <option value="html" ${bFormat === 'html' ? 'selected' : ''}>HTML Tags &lt;a&gt;&lt;img&gt; (Reliable)</option>
              <option value="markdown" ${bFormat === 'markdown' ? 'selected' : ''}>Markdown Links [![alt](url)](link)</option>
            </select>
          </div>
        </div>

        <!-- 12 Dynamic GitHub Badges Toggles -->
        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-foreground">Dynamic GitHub Badges</label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-card border border-border rounded-lg text-xs">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showStars" ${data.showStars ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>⭐ GitHub Stars</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showForks" ${data.showForks ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>🍴 GitHub Forks</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showIssues" ${data.showIssues ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>🐛 Open Issues</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showPRs" ${data.showPRs ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>🔀 Pull Requests</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showLicense" ${data.showLicense ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>📜 License Badge</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showRelease" ${data.showRelease ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>🏷️ Latest Release</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showLastCommit" ${data.showLastCommit ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>🕒 Last Commit</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showCodeSize" ${data.showCodeSize ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>📦 Code Size</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showContributors" ${data.showContributors ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>👥 Contributors</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showActionsCI" ${data.showActionsCI ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>🟢 CI Workflow</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showTopLang" ${data.showTopLang ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>🌐 Top Language</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showWatchers" ${data.showWatchers ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>👁️ Watchers</span>
            </label>
          </div>
        </div>

        ${data.showActionsCI ? `
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">GitHub Actions Workflow File</label>
            <input type="text" data-field="ciWorkflowFile" value="${data.ciWorkflowFile || 'ci.yml'}" class="form-input text-xs" placeholder="e.g. ci.yml or build.yml" />
          </div>
        ` : ''}
      `;

    case SECTION_TYPES.ABOUT:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'About The Project'}" class="form-input text-xs" />
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Project Overview / Description</label>
          <textarea data-field="content" rows="6" class="form-input font-sans text-xs leading-relaxed" placeholder="Describe your project...">${data.content || ''}</textarea>
        </div>
      `;

    case SECTION_TYPES.TECH_STACK:
      const selectedTechs = data.technologies || [];
      const curLayout = data.layout || 'categorized';
      const curSize = data.iconSize || 'medium';
      const curAlign = data.align || 'center';

      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Built With'}" class="form-input text-xs" />
        </div>

        <!-- Layout Engine Selector -->
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Display Layout Engine</label>
          <select data-field="layout" class="form-input text-xs">
            <option value="categorized" ${curLayout === 'categorized' ? 'selected' : ''}>🏢 Categorized Tech Stack Grid (Frontend, Backend, Database)</option>
            <option value="devicon-grid" ${curLayout === 'devicon-grid' ? 'selected' : ''}>⚡ Devicon / SimpleIcons Grid (with Clickable Doc Links)</option>
            <option value="skillicons" ${curLayout === 'skillicons' ? 'selected' : ''}>🎨 SkillIcons Modern Ribbon Strip</option>
            <option value="shields" ${curLayout === 'shields' ? 'selected' : ''}>🛡️ Shields.io Brand Badges</option>
            <option value="matrix-table" ${curLayout === 'matrix-table' ? 'selected' : ''}>📊 Architecture Comparison Table</option>
          </select>
        </div>

        <!-- Size, Placement & Alignment Controls -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Icon Size</label>
            <select data-field="iconSize" class="form-input text-xs">
              <option value="small" ${curSize === 'small' ? 'selected' : ''}>Small (28px)</option>
              <option value="medium" ${curSize === 'medium' ? 'selected' : ''}>Medium (40px)</option>
              <option value="large" ${curSize === 'large' ? 'selected' : ''}>Large (52px)</option>
              <option value="xlarge" ${curSize === 'xlarge' ? 'selected' : ''}>Extra Large (64px)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Alignment</label>
            <select data-field="align" class="form-input text-xs">
              <option value="center" ${curAlign === 'center' ? 'selected' : ''}>Center</option>
              <option value="left" ${curAlign === 'left' ? 'selected' : ''}>Left</option>
              <option value="right" ${curAlign === 'right' ? 'selected' : ''}>Right</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Badge Style</label>
            <select data-field="style" class="form-input text-xs">
              <option value="for-the-badge" ${data.style === 'for-the-badge' ? 'selected' : ''}>for-the-badge (Bold)</option>
              <option value="flat" ${data.style === 'flat' ? 'selected' : ''}>flat (Clean)</option>
              <option value="flat-square" ${data.style === 'flat-square' ? 'selected' : ''}>flat-square (Minimal)</option>
            </select>
          </div>
        </div>

        ${curLayout === 'skillicons' ? `
          <div class="grid grid-cols-2 gap-3 p-3 bg-card border border-border rounded-lg">
            <div>
              <label class="block text-[11px] text-muted-foreground mb-1">SkillIcons Theme</label>
              <select data-field="skilliconsTheme" class="form-input text-xs">
                <option value="dark" ${data.skilliconsTheme === 'dark' ? 'selected' : ''}>Dark Theme</option>
                <option value="light" ${data.skilliconsTheme === 'light' ? 'selected' : ''}>Light Theme</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] text-muted-foreground mb-1">Icons Per Line</label>
              <input type="number" data-field="skilliconsPerline" min="4" max="20" value="${data.skilliconsPerline || 10}" class="form-input text-xs" />
            </div>
          </div>
        ` : ''}

        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Selected Technologies (${selectedTechs.length})</label>
            <button id="open-tech-picker-btn" class="btn-primary text-xs px-2.5 py-1 flex items-center gap-1 shadow-xs">
              <span>⚡</span> Manage Tech Stack
            </button>
          </div>

          <div class="p-3 bg-card border border-border rounded-md flex flex-wrap gap-1.5 min-h-[60px]">
            ${selectedTechs.length === 0 ? `
              <span class="text-xs text-muted-foreground">No technologies selected. Click "Manage Tech Stack" to add badges.</span>
            ` : selectedTechs.map(id => {
              const item = TECH_CATALOG.find(t => t.id === id);
              return `
                <span class="text-[11px] px-2 py-0.5 rounded-full border border-border bg-muted text-foreground flex items-center gap-1 font-medium">
                  ${item?.name || id}
                  <button class="remove-tech-chip-btn text-muted-foreground hover:text-foreground ml-1" data-id="${id}">✕</button>
                </span>
              `;
            }).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.FEATURES:
      const items = data.items || [];
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Key Features'}" class="form-input text-xs" />
        </div>

        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Feature List (${items.length})</label>
            <button id="add-feature-btn" class="btn-primary text-xs px-2 py-1">
              + Add Feature
            </button>
          </div>

          <div id="feature-items-list" class="space-y-2">
            ${items.map((item, idx) => `
              <div class="p-2.5 bg-card border border-border rounded-lg space-y-2 relative" data-idx="${idx}">
                <div class="flex items-center gap-2">
                  <input type="text" class="feat-icon-input form-input text-xs w-12 text-center" value="${item.icon || '⚡'}" data-idx="${idx}" />
                  <input type="text" class="feat-title-input form-input text-xs font-medium flex-1" value="${item.title || ''}" placeholder="Feature title" data-idx="${idx}" />
                  <button class="delete-feature-btn text-rose-400 hover:text-rose-300 text-xs px-1" data-idx="${idx}">✕</button>
                </div>
                <textarea class="feat-desc-input form-input text-xs" rows="2" placeholder="Feature description..." data-idx="${idx}">${item.desc || ''}</textarea>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.INSTALLATION:
      const steps = data.steps || [];
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Getting Started'}" class="form-input text-xs" />
        </div>

        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Prerequisites</label>
          <input type="text" data-field="prerequisites" value="${data.prerequisites || ''}" placeholder="Node.js 18+ and Git installed" class="form-input text-xs" />
        </div>

        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Installation Steps (${steps.length})</label>
            <button id="add-install-step-btn" class="btn-primary text-xs px-2 py-1">
              + Add Step
            </button>
          </div>

          <div id="install-steps-list" class="space-y-2">
            ${steps.map((s, idx) => `
              <div class="p-2.5 bg-card border border-border rounded-lg space-y-2 relative" data-idx="${idx}">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono text-muted-foreground">Step ${idx + 1}</span>
                  <button class="delete-step-btn text-rose-400 hover:text-rose-300 text-xs px-1" data-idx="${idx}">✕</button>
                </div>
                <input type="text" class="step-title-input form-input text-xs font-medium" value="${s.title || ''}" placeholder="Step description" data-idx="${idx}" />
                <textarea class="step-cmd-input form-input font-mono text-xs" rows="2" placeholder="Terminal command..." data-idx="${idx}">${s.cmd || ''}</textarea>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.PROJECT_STRUCTURE:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Project Structure'}" class="form-input text-xs" />
        </div>
        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="block text-xs font-medium text-foreground">Directory Tree (ASCII)</label>
            <span class="text-[10px] text-muted-foreground">Auto-generated via Deep Scan</span>
          </div>
          <textarea data-field="tree" rows="12" class="form-input font-mono text-xs leading-relaxed" placeholder=".\n├── src/\n│   └── index.ts\n└── README.md">${data.tree || ''}</textarea>
        </div>
      `;

    case SECTION_TYPES.ENV_VARS:
      const variables = data.variables || [];
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Environment Variables'}" class="form-input text-xs" />
        </div>

        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Variables (${variables.length})</label>
            <button id="add-env-var-btn" class="btn-primary text-xs px-2 py-1">
              + Add Variable
            </button>
          </div>

          <div id="env-vars-list" class="space-y-2">
            ${variables.map((v, idx) => `
              <div class="p-2.5 bg-card border border-border rounded-lg grid grid-cols-1 sm:grid-cols-4 gap-2 items-center text-xs" data-idx="${idx}">
                <input type="text" class="env-key-input form-input font-mono text-xs" placeholder="KEY_NAME" value="${v.key || ''}" data-idx="${idx}" />
                <input type="text" class="env-desc-input form-input text-xs sm:col-span-2" placeholder="Description" value="${v.desc || ''}" data-idx="${idx}" />
                <div class="flex items-center gap-1">
                  <input type="text" class="env-default-input form-input text-xs" placeholder="Default" value="${v.default || ''}" data-idx="${idx}" />
                  <button class="delete-env-btn text-rose-400 hover:text-rose-300 text-xs px-1" data-idx="${idx}">✕</button>
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
          <input type="text" data-field="heading" value="${data.heading || 'Usage'}" class="form-input text-xs" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Syntax Language</label>
            <input type="text" data-field="codeLang" value="${data.codeLang || 'bash'}" class="form-input text-xs" placeholder="bash, ts, python..." />
          </div>
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Example Code</label>
          <textarea data-field="code" rows="5" class="form-input font-mono text-xs leading-relaxed" placeholder="# Example usage command...">${data.code || ''}</textarea>
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Important Note / Tip</label>
          <input type="text" data-field="note" value="${data.note || ''}" class="form-input text-xs" placeholder="Tip or note..." />
        </div>
      `;

    case SECTION_TYPES.ROADMAP:
      const tasks = data.tasks || [];
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Roadmap'}" class="form-input text-xs" />
        </div>

        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Roadmap Items (${tasks.length})</label>
            <button id="add-task-btn" class="btn-primary text-xs px-2 py-1">
              + Add Item
            </button>
          </div>

          <div id="tasks-list" class="space-y-1.5">
            ${tasks.map((t, idx) => `
              <div class="flex items-center gap-2 p-2 bg-card border border-border rounded-md text-xs" data-idx="${idx}">
                <input type="checkbox" class="task-check rounded border-border" ${t.completed ? 'checked' : ''} data-idx="${idx}" />
                <input type="text" class="task-text-input form-input text-xs flex-1" value="${t.text || ''}" placeholder="Task description..." data-idx="${idx}" />
                <button class="delete-task-btn text-rose-400 hover:text-rose-300 text-xs px-1" data-idx="${idx}">✕</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.CONTRIBUTING:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Contributing'}" class="form-input text-xs" />
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

    case SECTION_TYPES.LICENSE: {
      const activeLic = getLicenseById(data.type || 'MIT');
      const curYear = data.year || new Date().getFullYear().toString();
      const curHolder = data.holder || 'Your Name';
      const curProj = data.projectName || '';
      const curPres = data.presentation || 'badge-minimal';
      const legalTextPreview = activeLic.generateText(curYear, curHolder, curProj);

      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'License'}" class="form-input text-xs" />
        </div>

        <!-- License Chooser Cards Grid -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <span>⚖️</span> Select License (${LICENSE_CATALOG.length} Legal Standards)
            </label>
            <span class="text-[10px] text-muted-foreground">Click to select legal license</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-h-[300px] overflow-y-auto p-1 border border-border rounded-lg bg-card/40">
            ${LICENSE_CATALOG.map(lic => {
              const isSelected = lic.id === activeLic.id;
              return `
                <div 
                  class="license-select-card p-3 rounded-md border text-left cursor-pointer transition flex flex-col justify-between select-none ${
                    isSelected 
                      ? 'border-foreground bg-accent shadow-xs ring-1 ring-foreground/20' 
                      : 'border-border bg-card hover:border-foreground/40 hover:bg-muted/40'
                  }"
                  data-license-id="${lic.id}"
                >
                  <div class="space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold text-foreground font-mono">${lic.id}</span>
                      ${isSelected ? '<span class="text-[10px] font-semibold text-foreground">✓ Active</span>' : ''}
                    </div>
                    <p class="text-[11px] font-medium text-foreground line-clamp-1">${lic.name}</p>
                    <p class="text-[10px] text-muted-foreground line-clamp-2 leading-tight">${lic.shortDesc}</p>
                  </div>

                  <div class="mt-2.5 pt-2 border-t border-border/60 flex flex-wrap gap-1">
                    ${lic.permissions.slice(0, 2).map(p => `
                      <span class="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">✓ ${p}</span>
                    `).join('')}
                    ${lic.limitations.slice(0, 1).map(l => `
                      <span class="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium">✕ ${l}</span>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Selected License Details & Metadata -->
        <div class="p-3.5 bg-card border border-border rounded-lg space-y-3">
          <div class="flex items-center justify-between border-b border-border/60 pb-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-foreground">${activeLic.name} (${activeLic.spdxId})</span>
              <a href="${activeLic.url}" target="_blank" rel="noopener noreferrer" class="text-[10px] text-muted-foreground hover:text-foreground hover:underline">Official SPDX Spec ↗</a>
            </div>
            <img src="${activeLic.badgeUrl}" alt="${activeLic.id}" class="h-4" />
          </div>

          <!-- Permissions, Limitations & Conditions Matrix -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div class="p-2.5 rounded bg-background border border-border space-y-1">
              <span class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Permissions</span>
              <ul class="text-[11px] text-muted-foreground space-y-0.5">
                ${activeLic.permissions.map(p => `<li>✓ ${p}</li>`).join('')}
              </ul>
            </div>
            <div class="p-2.5 rounded bg-background border border-border space-y-1">
              <span class="text-[10px] font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">Limitations</span>
              <ul class="text-[11px] text-muted-foreground space-y-0.5">
                ${activeLic.limitations.map(l => `<li>✕ ${l}</li>`).join('')}
              </ul>
            </div>
            <div class="p-2.5 rounded bg-background border border-border space-y-1">
              <span class="text-[10px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Conditions</span>
              <ul class="text-[11px] text-muted-foreground space-y-0.5">
                ${activeLic.conditions.length > 0 ? activeLic.conditions.map(c => `<li>ℹ ${c}</li>`).join('') : '<li class="text-zinc-500">None required</li>'}
              </ul>
            </div>
          </div>

          <!-- Metadata Fields -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div>
              <label class="block text-xs font-medium text-foreground mb-1">Copyright Year</label>
              <input type="text" data-field="year" value="${curYear}" class="form-input text-xs" placeholder="${new Date().getFullYear()}" />
            </div>
            <div>
              <label class="block text-xs font-medium text-foreground mb-1">Copyright Holder</label>
              <input type="text" data-field="holder" value="${curHolder}" class="form-input text-xs" placeholder="Full Name or Organization" />
            </div>
            <div>
              <label class="block text-xs font-medium text-foreground mb-1">Project Name (for header)</label>
              <input type="text" data-field="projectName" value="${curProj}" class="form-input text-xs" placeholder="Project Name" />
            </div>
          </div>

          <!-- Presentation Style Selector -->
          <div class="pt-1">
            <label class="block text-xs font-medium text-foreground mb-1">README Presentation Format</label>
            <select data-field="presentation" class="form-input text-xs">
              <option value="badge-minimal" ${curPres === 'badge-minimal' ? 'selected' : ''}>Minimal: Shields.io Badge & Link to LICENSE</option>
              <option value="collapsible-details" ${curPres === 'collapsible-details' ? 'selected' : ''}>Interactive: Badge + Collapsible Full Legal Text (&lt;details&gt;)</option>
              <option value="summary-table" ${curPres === 'summary-table' ? 'selected' : ''}>Comprehensive: Badge + Permissions &amp; Limitations Table</option>
            </select>
          </div>
        </div>

        <!-- 1-Click Download & Legal Text Actions -->
        <div class="p-3.5 bg-card border border-border rounded-lg space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span class="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <span>📄</span> Export Standalone Root LICENSE File
              </span>
              <p class="text-[11px] text-muted-foreground">Download the exact legal text file to place directly into your project's root folder</p>
            </div>
            <div class="flex items-center gap-2">
              <button id="copy-license-text-btn" class="btn-secondary text-xs px-3 py-1.5 whitespace-nowrap flex items-center gap-1">
                <span>📋</span> Copy Legal Text
              </button>
              <button id="download-license-file-btn" class="btn-primary text-xs px-3 py-1.5 whitespace-nowrap flex items-center gap-1">
                <span>💾</span> Download LICENSE File
              </button>
            </div>
          </div>

          <div>
            <label class="block text-[11px] text-muted-foreground mb-1">Live Generated Legal Agreement Preview:</label>
            <pre id="license-preview-pre" class="bg-background border border-border rounded p-3 font-mono text-[10.5px] leading-relaxed text-muted-foreground max-h-40 overflow-y-auto select-all whitespace-pre-wrap">${legalTextPreview}</pre>
          </div>
        </div>
      `;
    }

    case SECTION_TYPES.AUTHOR:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Author & Contact'}" class="form-input text-xs" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Author Name</label>
            <input type="text" data-field="name" value="${data.name || ''}" class="form-input text-xs" placeholder="Alex Developer" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">GitHub Username</label>
            <input type="text" data-field="github" value="${data.github || ''}" class="form-input text-xs" placeholder="alexdev" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Twitter / X Handle</label>
            <input type="text" data-field="twitter" value="${data.twitter || ''}" class="form-input text-xs" placeholder="alex_dev" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">LinkedIn Handle</label>
            <input type="text" data-field="linkedin" value="${data.linkedin || ''}" class="form-input text-xs" placeholder="alex-developer" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Email Address</label>
            <input type="email" data-field="email" value="${data.email || ''}" class="form-input text-xs" placeholder="alex@example.com" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Buy Me a Coffee</label>
            <input type="text" data-field="buyMeACoffee" value="${data.buyMeACoffee || ''}" class="form-input text-xs" placeholder="alexdev" />
          </div>
        </div>
      `;

    case SECTION_TYPES.CUSTOM:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Custom Section'}" class="form-input text-xs" />
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
  const getSecData = () => store.getState().sections.find(s => s.id === sectionId)?.data || currentData || {};

  // Generic [data-field] inputs
  container.querySelectorAll('[data-field]').forEach(el => {
    const field = el.dataset.field;
    const isCheckbox = el.type === 'checkbox';

    el.addEventListener(isCheckbox ? 'change' : 'input', () => {
      const val = isCheckbox ? el.checked : el.value;
      store.updateSectionData(sectionId, { [field]: val });
    });
  });

  // Hero Deep Scan Trigger
  const triggerAutoDetectBtn = container.querySelector('#trigger-autodetect-btn');
  const autoDetectInput = container.querySelector('#github-autodetect-input');
  if (triggerAutoDetectBtn && autoDetectInput) {
    triggerAutoDetectBtn.addEventListener('click', async () => {
      const parsed = parseGitHubRepoInput(autoDetectInput.value);
      if (!parsed) {
        showToast('Please enter a valid repo (e.g. facebook/react or GitHub URL)', 'error');
        return;
      }

      triggerAutoDetectBtn.innerHTML = '<span>⏳</span> Scanning...';
      triggerAutoDetectBtn.disabled = true;

      try {
        const info = await fetchGitHubRepoFullDetails(parsed.owner, parsed.repo, progress => {
          triggerAutoDetectBtn.innerHTML = `<span>⏳</span> ${progress.message.slice(0, 18)}...`;
        });

        store.applyRepoAnalysis(info);
        fireConfetti();
        showToast(`Deep scan complete! ${info.repo} (${info.matchedTechIds.length} tech badges detected)`, 'success');
      } catch (err) {
        showToast(err.message || 'Failed to scan repository', 'error');
      } finally {
        triggerAutoDetectBtn.innerHTML = '<span>⚡</span> Deep Scan';
        triggerAutoDetectBtn.disabled = false;
      }
    });
  }

  // Banner / Image Studio triggers
  container.querySelector('#open-banner-hub-btn')?.addEventListener('click', () => {
    renderPhotoModal('hero');
  });
  container.querySelector('#open-demo-studio-btn')?.addEventListener('click', () => {
    renderPhotoModal('demo');
  });

  // Tech Picker trigger
  container.querySelector('#open-tech-picker-btn')?.addEventListener('click', () => {
    renderTechPickerModal();
  });

  // Remove single tech badge chip
  container.querySelectorAll('.remove-tech-chip-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const removeId = btn.dataset.id;
      const data = getSecData();
      const currentList = data.technologies || [];
      const updated = currentList.filter(id => id !== removeId);
      store.updateSectionData(sectionId, { technologies: updated });
    });
  });

  // Feature items handlers
  const featureList = container.querySelector('#feature-items-list');
  container.querySelector('#add-feature-btn')?.addEventListener('click', () => {
    const data = getSecData();
    const items = [...(data.items || [])];
    items.push({ icon: '✨', title: 'New Feature', desc: 'Description of your new feature.' });
    store.updateSectionData(sectionId, { items });
  });

  featureList?.addEventListener('input', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const data = getSecData();
    const items = JSON.parse(JSON.stringify(data.items || []));
    if (!items[idx]) return;

    if (e.target.classList.contains('feat-icon-input')) items[idx].icon = e.target.value;
    if (e.target.classList.contains('feat-title-input')) items[idx].title = e.target.value;
    if (e.target.classList.contains('feat-desc-input')) items[idx].desc = e.target.value;

    store.updateSectionData(sectionId, { items });
  });

  featureList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-feature-btn');
    if (btn) {
      const idx = parseInt(btn.dataset.idx, 10);
      const data = getSecData();
      const items = (data.items || []).filter((_, i) => i !== idx);
      store.updateSectionData(sectionId, { items });
    }
  });

  // Installation steps handlers
  const stepsList = container.querySelector('#install-steps-list');
  container.querySelector('#add-install-step-btn')?.addEventListener('click', () => {
    const data = getSecData();
    const steps = [...(data.steps || [])];
    steps.push({ title: 'New step', cmd: 'echo "Step command"' });
    store.updateSectionData(sectionId, { steps });
  });

  stepsList?.addEventListener('input', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const data = getSecData();
    const steps = JSON.parse(JSON.stringify(data.steps || []));
    if (!steps[idx]) return;

    if (e.target.classList.contains('step-title-input')) steps[idx].title = e.target.value;
    if (e.target.classList.contains('step-cmd-input')) steps[idx].cmd = e.target.value;

    store.updateSectionData(sectionId, { steps });
  });

  stepsList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-step-btn');
    if (btn) {
      const idx = parseInt(btn.dataset.idx, 10);
      const data = getSecData();
      const steps = (data.steps || []).filter((_, i) => i !== idx);
      store.updateSectionData(sectionId, { steps });
    }
  });

  // Environment variables handlers
  const envList = container.querySelector('#env-vars-list');
  container.querySelector('#add-env-var-btn')?.addEventListener('click', () => {
    const data = getSecData();
    const variables = [...(data.variables || [])];
    variables.push({ key: 'NEW_VAR', desc: 'Description of variable', default: '-', required: false });
    store.updateSectionData(sectionId, { variables });
  });

  envList?.addEventListener('input', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const data = getSecData();
    const variables = JSON.parse(JSON.stringify(data.variables || []));
    if (!variables[idx]) return;

    if (e.target.classList.contains('env-key-input')) variables[idx].key = e.target.value;
    if (e.target.classList.contains('env-desc-input')) variables[idx].desc = e.target.value;
    if (e.target.classList.contains('env-default-input')) variables[idx].default = e.target.value;

    store.updateSectionData(sectionId, { variables });
  });

  envList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-env-btn');
    if (btn) {
      const idx = parseInt(btn.dataset.idx, 10);
      const data = getSecData();
      const variables = (data.variables || []).filter((_, i) => i !== idx);
      store.updateSectionData(sectionId, { variables });
    }
  });

  // Roadmap tasks handlers
  const tasksList = container.querySelector('#tasks-list');
  container.querySelector('#add-task-btn')?.addEventListener('click', () => {
    const data = getSecData();
    const tasks = [...(data.tasks || [])];
    tasks.push({ text: 'New milestone', completed: false });
    store.updateSectionData(sectionId, { tasks });
  });

  tasksList?.addEventListener('input', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const data = getSecData();
    const tasks = JSON.parse(JSON.stringify(data.tasks || []));
    if (!tasks[idx]) return;

    if (e.target.classList.contains('task-text-input')) tasks[idx].text = e.target.value;
    store.updateSectionData(sectionId, { tasks });
  });

  tasksList?.addEventListener('change', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const data = getSecData();
    const tasks = JSON.parse(JSON.stringify(data.tasks || []));
    if (!tasks[idx]) return;

    if (e.target.classList.contains('task-check')) tasks[idx].completed = e.target.checked;
    store.updateSectionData(sectionId, { tasks });
  });

  tasksList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-task-btn');
    if (btn) {
      const idx = parseInt(btn.dataset.idx, 10);
      const data = getSecData();
      const tasks = (data.tasks || []).filter((_, i) => i !== idx);
      store.updateSectionData(sectionId, { tasks });
    }
  });

  // FAQ Handlers
  const faqList = container.querySelector('#faq-items-list');
  container.querySelector('#add-faq-btn')?.addEventListener('click', () => {
    const data = getSecData();
    const questions = [...(data.questions || [])];
    questions.push({ q: 'New question?', a: 'Answer to the question.' });
    store.updateSectionData(sectionId, { questions });
  });

  faqList?.addEventListener('input', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const data = getSecData();
    const questions = JSON.parse(JSON.stringify(data.questions || []));
    if (!questions[idx]) return;

    if (e.target.classList.contains('faq-q-input')) questions[idx].q = e.target.value;
    if (e.target.classList.contains('faq-a-input')) questions[idx].a = e.target.value;

    store.updateSectionData(sectionId, { questions });
  });

  faqList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-faq-btn');
    if (btn) {
      const idx = parseInt(btn.dataset.idx, 10);
      const data = getSecData();
      const questions = (data.questions || []).filter((_, i) => i !== idx);
      store.updateSectionData(sectionId, { questions });
    }
  });

  // Benchmarks Handlers
  const benchList = container.querySelector('#benchmark-items-list');
  container.querySelector('#add-benchmark-btn')?.addEventListener('click', () => {
    const data = getSecData();
    const rows = [...(data.rows || [])];
    rows.push({ task: 'Task Name', baseline: '100ms', current: '20ms', diff: '5x faster' });
    store.updateSectionData(sectionId, { rows });
  });

  benchList?.addEventListener('input', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const data = getSecData();
    const rows = JSON.parse(JSON.stringify(data.rows || []));
    if (!rows[idx]) return;

    if (e.target.classList.contains('bench-task-input')) rows[idx].task = e.target.value;
    if (e.target.classList.contains('bench-base-input')) rows[idx].baseline = e.target.value;
    if (e.target.classList.contains('bench-curr-input')) rows[idx].current = e.target.value;
    if (e.target.classList.contains('bench-diff-input')) rows[idx].diff = e.target.value;

    store.updateSectionData(sectionId, { rows });
  });

  benchList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-bench-btn');
    if (btn) {
      const idx = parseInt(btn.dataset.idx, 10);
      const data = getSecData();
      const rows = (data.rows || []).filter((_, i) => i !== idx);
      store.updateSectionData(sectionId, { rows });
    }
  });

  // API Reference Handlers
  const apiList = container.querySelector('#api-endpoints-list');
  container.querySelector('#add-endpoint-btn')?.addEventListener('click', () => {
    const data = getSecData();
    const endpoints = [...(data.endpoints || [])];
    endpoints.push({ method: 'GET', path: '/api/v1/new', desc: 'Endpoint description', auth: 'None' });
    store.updateSectionData(sectionId, { endpoints });
  });

  apiList?.addEventListener('input', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const data = getSecData();
    const endpoints = JSON.parse(JSON.stringify(data.endpoints || []));
    if (!endpoints[idx]) return;

    if (e.target.classList.contains('ep-path-input')) endpoints[idx].path = e.target.value;
    if (e.target.classList.contains('ep-desc-input')) endpoints[idx].desc = e.target.value;
    if (e.target.classList.contains('ep-auth-input')) endpoints[idx].auth = e.target.value;

    store.updateSectionData(sectionId, { endpoints });
  });

  apiList?.addEventListener('change', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const data = getSecData();
    const endpoints = JSON.parse(JSON.stringify(data.endpoints || []));
    if (!endpoints[idx]) return;

    if (e.target.classList.contains('ep-method-select')) endpoints[idx].method = e.target.value;
    store.updateSectionData(sectionId, { endpoints });
  });

  apiList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-ep-btn');
    if (btn) {
      const idx = parseInt(btn.dataset.idx, 10);
      const data = getSecData();
      const endpoints = (data.endpoints || []).filter((_, i) => i !== idx);
      store.updateSectionData(sectionId, { endpoints });
    }
  });

  // Changelog Releases Handlers
  const relList = container.querySelector('#releases-list');
  container.querySelector('#add-release-btn')?.addEventListener('click', () => {
    const data = getSecData();
    const releases = [...(data.releases || [])];
    releases.push({ version: 'v1.1.0', date: new Date().toISOString().slice(0, 10), changes: ['New feature added'] });
    store.updateSectionData(sectionId, { releases });
  });

  relList?.addEventListener('input', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const data = getSecData();
    const releases = JSON.parse(JSON.stringify(data.releases || []));
    if (!releases[idx]) return;

    if (e.target.classList.contains('rel-version-input')) releases[idx].version = e.target.value;
    if (e.target.classList.contains('rel-date-input')) releases[idx].date = e.target.value;
    if (e.target.classList.contains('rel-changes-input')) {
      releases[idx].changes = e.target.value.split('\n').filter(c => c.trim().length > 0);
    }

    store.updateSectionData(sectionId, { releases });
  });

  relList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-rel-btn');
    if (btn) {
      const idx = parseInt(btn.dataset.idx, 10);
      const data = getSecData();
      const releases = (data.releases || []).filter((_, i) => i !== idx);
      store.updateSectionData(sectionId, { releases });
    }
  });

  // License Studio Handlers
  container.querySelectorAll('.license-select-card').forEach(card => {
    card.addEventListener('click', () => {
      const licId = card.dataset.licenseId;
      store.updateSectionData(sectionId, { type: licId });
    });
  });

  container.querySelector('#download-license-file-btn')?.addEventListener('click', () => {
    const data = getSecData();
    const lic = getLicenseById(data.type || 'MIT');
    const year = data.year || new Date().getFullYear().toString();
    const holder = data.holder || 'Your Name';
    const proj = data.projectName || '';
    const text = lic.generateText(year, holder, proj);
    downloadReadmeFile(text, 'LICENSE');
    fireConfetti();
    showToast(`Downloaded LICENSE (${lic.id})! Place in your repo root.`, 'success');
  });

  container.querySelector('#copy-license-text-btn')?.addEventListener('click', () => {
    const data = getSecData();
    const lic = getLicenseById(data.type || 'MIT');
    const year = data.year || new Date().getFullYear().toString();
    const holder = data.holder || 'Your Name';
    const proj = data.projectName || '';
    const text = lic.generateText(year, holder, proj);
    copyToClipboard(text, `Copied ${lic.name} agreement to clipboard!`);
  });
}
