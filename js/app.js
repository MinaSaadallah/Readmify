/**
 * Readmify - Main Application Controller (v3 with Interactive Living Canvas)
 * Coordinates store state, interactive canvas, sidebar, preview rendering, GitHub API, and export actions
 */
import { store } from './store.js';
import { generateMarkdown } from './utils/markdownGenerator.js';
import { copyToClipboard, downloadReadmeFile, showToast, fireConfetti } from './utils/exportUtils.js';
import { renderSectionEditor } from './components/sectionEditor.js';
import { renderInteractiveCanvas, openSlideOverInspector, closeSlideOverInspector } from './components/interactiveCanvas.js';
import { openWizard } from './components/wizard.js';
import { renderPhotoModal } from './components/photoUploader.js';
import { openSectionLibrary } from './components/sectionLibrary.js';
import { calculateReadmeScore } from './components/healthScore.js';
import { parseGitHubRepoInput } from './services/githubApi.js';
import { SECTION_TYPES } from './data/defaultSections.js';
import { initPalette, openPalette } from './components/palette.js';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// DOM Elements
let canvasViewContainer;
let canvasBodyContainer;
let purePreviewContainer;
let rawMarkdownContainer;
let slideOverInspector;
let inspectorFormContainer;
let sectionListContainer;
let sectionPillBar;
let previewBody;
let rawMarkdownTextarea;
let currentMarkdown = '';

let markdownDebounceTimer = null;
let pendingMarkdownState = null;

function initApp() {
  canvasViewContainer = document.getElementById('canvas-view-container');
  canvasBodyContainer = document.getElementById('interactive-canvas-body');
  purePreviewContainer = document.getElementById('pure-preview-container');
  rawMarkdownContainer = document.getElementById('raw-markdown-container');
  slideOverInspector = document.getElementById('slide-over-inspector');
  inspectorFormContainer = document.getElementById('inspector-form-container');

  sectionListContainer = document.getElementById('section-list-items');
  sectionPillBar = document.getElementById('section-pill-bar');
  previewBody = document.getElementById('github-preview-body');
  rawMarkdownTextarea = document.getElementById('raw-markdown-textarea');

  document.getElementById('close-inspector-btn')?.addEventListener('click', closeSlideOverInspector);
  document.getElementById('raw-copy-btn')?.addEventListener('click', () => {
    copyToClipboard(currentMarkdown, 'Copied README.md code to clipboard!');
  });

  setupNavbarControls();
  setupViewModeSwitcher();
  setupImportModal();
  setupOverflowAndExport();
  setupGlobalDrop();
  setupSavedIndicator();
  try { initPalette(); } catch (e) { console.warn('palette init failed', e); }

  // Subscribe to store updates (debounce typing path for smoothness)
  store.subscribe((state, meta) => {
    if (meta && meta.type === 'UPDATE_SECTION_DATA' && !meta.force) {
      pendingMarkdownState = { state, meta };
      if (markdownDebounceTimer) return;
      markdownDebounceTimer = setTimeout(() => {
        markdownDebounceTimer = null;
        const p = pendingMarkdownState;
        pendingMarkdownState = null;
        if (p) renderApp(p.state, p.meta);
      }, 220);
      // Instant lightweight pill-active update only (no full rebuild)
      return;
    }
    if (markdownDebounceTimer) {
      clearTimeout(markdownDebounceTimer);
      markdownDebounceTimer = null;
      pendingMarkdownState = null;
    }
    renderApp(state, meta);
  });

  // Initial render
  renderApp(store.getState(), { force: true });

  // Check if first time user, offer quick wizard
  if (!localStorage.getItem('readmify_visited')) {
    localStorage.setItem('readmify_visited', 'true');
    setTimeout(() => {
      openWizard();
    }, 600);
  }
}

function renderApp(state, meta = {}) {
  const mode = state.viewMode || 'canvas';

  // 1. Always update markdown representation & health score
  currentMarkdown = generateMarkdown(state.sections);
  try { window.__readmifyMarkdown = currentMarkdown; } catch (e) {}
  // Only touch raw textarea when visible or forced (avoids layout thrash while typing)
  if (rawMarkdownTextarea && (mode === 'raw' || meta.force)) {
    rawMarkdownTextarea.value = currentMarkdown;
  }
  updateHealthAndStats(state.sections, currentMarkdown);

  // 2. Render Section Pills & Drawer
  renderSidebar(state, meta);

  // 3. Render Inspector if open
  if (slideOverInspector && !slideOverInspector.classList.contains('translate-x-full')) {
    if (inspectorFormContainer) {
      renderSectionEditor(inspectorFormContainer, meta);
    }
  }

  // 4. Render Active View Mode
  applyViewModeDom(mode);

  if (mode === 'canvas') {
    if (canvasBodyContainer) {
      renderInteractiveCanvas(canvasBodyContainer, state, meta);
    }
  } else if (mode === 'preview') {
    renderPurePreview(state);
  }
}

// --- 1. HORIZONTAL SECTION PILL BAR & DRAWER REORDERING ---
function renderSidebar(state, meta = {}) {
  // If only section data fields changed (typing in inputs), skip re-rendering pills and drawer
  if (meta && meta.type === 'UPDATE_SECTION_DATA') {
    return;
  }

  const { sections, activeSectionId } = state;

  // 1A. Render Horizontal Pill Bar
  if (sectionPillBar) {
    sectionPillBar.innerHTML = sections.map((sec, idx) => {
      const isActive = sec.id === activeSectionId;
      const isHidden = !sec.enabled;
      return `
        <button 
          class="section-pill px-2.5 py-1 text-xs rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 border flex-shrink-0 cursor-pointer select-none ${
            isActive 
              ? 'bg-zinc-100 text-zinc-950 font-semibold border-zinc-100 shadow-sm' 
              : 'bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground border-border'
          } ${isHidden ? 'opacity-50 line-through' : ''}"
          data-section-id="${sec.id}"
          title="${escapeHtml(sec.title)} (${sec.enabled ? 'visible' : 'hidden'})"
        >
          <span class="text-[10px] opacity-70 font-mono">${idx + 1}</span>
          <span>${escapeHtml(sec.title)}</span>
          ${!sec.enabled ? '<span class="text-[9px] opacity-70 font-mono">(hidden)</span>' : ''}
        </button>
      `;
    }).join('');

    sectionPillBar.querySelectorAll('.section-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const id = pill.dataset.sectionId;
        store.setActiveSection(id);
        const targetEl = document.querySelector(`.interactive-section-block[data-section-id="${id}"]`);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });

    // Auto-scroll active pill into view only on explicit navigation (avoids scroll thrash while typing)
    if (meta && (meta.type === 'SET_ACTIVE_SECTION' || meta.type === 'ADD_SECTION' || meta.force === true && meta.type !== 'UPDATE_SECTION_DATA')) {
      const activePill = sectionPillBar.querySelector(`.section-pill[data-section-id="${activeSectionId}"]`);
      if (activePill) {
        try { activePill.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'nearest' }); } catch (e) {}
      }
    }
  }

  // 1B. Render Drawer List Items (draggable outline)
  if (sectionListContainer) {
    sectionListContainer.innerHTML = sections.map((sec, idx) => {
      const isActive = sec.id === activeSectionId;
      return `
        <div
          class="section-item group flex items-center justify-between px-2.5 py-1.5 rounded-md border cursor-pointer select-none transition-all ${
            isActive
              ? 'active bg-muted border-border text-foreground font-medium shadow-xs'
              : 'bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
          } ${!sec.enabled ? 'opacity-50' : ''}"
          data-section-id="${sec.id}"
          data-index="${idx}"
          draggable="true"
          title="Drag to reorder"
        >
          <div class="flex items-center gap-2 flex-1 min-w-0">
            <span class="drag-grip text-zinc-600 text-[10px] cursor-grab">⠿</span>
            <span class="text-zinc-500 text-[10px] font-mono w-3.5">${idx + 1}</span>
            <span class="text-xs truncate">${escapeHtml(sec.title)}</span>
          </div>

          <div class="flex items-center gap-1 opacity-70 group-hover:opacity-100">
            <div class="flex items-center">
              <button class="move-up-btn p-1 text-muted-foreground hover:text-foreground rounded text-[10px] ${idx === 0 ? 'invisible' : ''}" title="Move Up" data-id="${sec.id}">▲</button>
              <button class="move-down-btn p-1 text-muted-foreground hover:text-foreground rounded text-[10px] ${idx === sections.length - 1 ? 'invisible' : ''}" title="Move Down" data-id="${sec.id}">▼</button>
            </div>

            <input 
              type="checkbox" 
              class="toggle-section-cb rounded border-border text-foreground focus:ring-0 cursor-pointer ml-1" 
              ${sec.enabled ? 'checked' : ''} 
              data-id="${sec.id}" 
              title="Toggle section visibility" 
            />
          </div>
        </div>
      `;
    }).join('');

    sectionListContainer.querySelectorAll('.section-item').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('input')) return;
        const id = el.dataset.sectionId;
        store.setActiveSection(id);
      });
    });

    sectionListContainer.querySelectorAll('.move-up-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        store.moveSection(btn.dataset.id, 'up');
      });
    });

    sectionListContainer.querySelectorAll('.move-down-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        store.moveSection(btn.dataset.id, 'down');
      });
    });

    sectionListContainer.querySelectorAll('.toggle-section-cb').forEach(cb => {
      cb.addEventListener('change', (e) => {
        e.stopPropagation();
        store.toggleSection(cb.dataset.id, cb.checked);
      });
    });

    // Drawer drag reorder (native, no deps)
    if (!sectionListContainer.dataset.dndBound) {
      sectionListContainer.dataset.dndBound = 'true';
      let dragIdx = null;
      sectionListContainer.addEventListener('dragstart', (e) => {
        const row = e.target.closest?.('.section-item');
        if (!row) return;
        dragIdx = parseInt(row.dataset.index, 10);
        e.dataTransfer.setData('text/readmify-drawer-index', String(dragIdx));
        e.dataTransfer.setData('text/readmify-section-id', row.dataset.sectionId);
        e.dataTransfer.effectAllowed = 'move';
        row.classList.add('dragging');
      });
      sectionListContainer.addEventListener('dragend', () => {
        dragIdx = null;
        sectionListContainer.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging'));
      });
      sectionListContainer.addEventListener('dragover', (e) => {
        if (e.target.closest?.('.section-item')) e.preventDefault();
      });
      sectionListContainer.addEventListener('drop', (e) => {
        const over = e.target.closest?.('.section-item');
        if (!over) return;
        e.preventDefault();
        const to = parseInt(over.dataset.index, 10);
        const fromStr = e.dataTransfer.getData('text/readmify-drawer-index');
        const from = fromStr !== '' ? parseInt(fromStr, 10) : dragIdx;
        if (from !== null && !isNaN(from) && from !== to) store.reorderSections(from, to);
      });
    }
  }

  // 1C. Pill Bar & Drawer Buttons (Bind once)
  const pillAddSecBtn = document.getElementById('pill-add-section-btn');
  if (pillAddSecBtn && !pillAddSecBtn.dataset.bound) {
    pillAddSecBtn.dataset.bound = 'true';
    pillAddSecBtn.addEventListener('click', () => openSectionLibrary());
  }

  const toggleDrawerBtn = document.getElementById('toggle-section-drawer-btn');
  const closeDrawerBtn = document.getElementById('close-section-drawer-btn');
  const drawerPanel = document.getElementById('section-drawer-panel');

  if (toggleDrawerBtn && drawerPanel && !toggleDrawerBtn.dataset.bound) {
    toggleDrawerBtn.dataset.bound = 'true';
    toggleDrawerBtn.addEventListener('click', () => {
      drawerPanel.classList.toggle('hidden');
    });
  }

  if (closeDrawerBtn && drawerPanel && !closeDrawerBtn.dataset.bound) {
    closeDrawerBtn.dataset.bound = 'true';
    closeDrawerBtn.addEventListener('click', () => {
      drawerPanel.classList.add('hidden');
    });
  }

  const addCustomBtn = document.getElementById('add-custom-sec-btn');
  if (addCustomBtn && !addCustomBtn.dataset.bound) {
    addCustomBtn.dataset.bound = 'true';
    addCustomBtn.addEventListener('click', () => {
      const title = prompt('Enter a title for the new section:', 'Custom Section');
      if (title && title.trim()) {
        store.addCustomSection(title.trim());
      }
    });
  }

  const resetBtn = document.getElementById('reset-template-btn');
  if (resetBtn && !resetBtn.dataset.bound) {
    resetBtn.dataset.bound = 'true';
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset your README to standard default sections? Any unsaved edits will be cleared.')) {
        store.resetToDefault();
        showToast('Reset to default template', 'info');
      }
    });
  }
}

// --- 2. LIVE PREVIEW & MARKDOWN RENDERING ---
function renderPreview(state) {
  currentMarkdown = generateMarkdown(state.sections);

  if (previewBody) {
    previewBody.className = `markdown-body ${state.previewTheme === 'light' ? 'github-light' : 'github-dark'}`;

    try {
      if (window.marked) {
        window.marked.setOptions({
          gfm: true,
          breaks: true
        });
        const rawHtml = window.marked.parse(currentMarkdown);
        const safeHtml = window.DOMPurify ? window.DOMPurify.sanitize(rawHtml) : rawHtml;
        previewBody.innerHTML = safeHtml;
      } else {
        previewBody.innerText = currentMarkdown;
      }
    } catch (err) {
      console.error('Markdown parse error:', err);
      previewBody.innerText = currentMarkdown;
    }
  }

  if (rawMarkdownTextarea) {
    rawMarkdownTextarea.value = currentMarkdown;
  }

  updateHealthAndStats(state.sections, currentMarkdown);
}

function updateHealthAndStats(sections, markdownText) {
  const words = markdownText.trim() ? markdownText.trim().split(/\s+/).length : 0;
  const chars = markdownText.length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  const statsWordEl = document.getElementById('stats-word-count');
  const statsCharEl = document.getElementById('stats-char-count');
  const statsTimeEl = document.getElementById('stats-reading-time');

  if (statsWordEl) statsWordEl.textContent = `${words} words`;
  if (statsCharEl) statsCharEl.textContent = `${chars} chars`;
  if (statsTimeEl) statsTimeEl.textContent = `~${readingTime} min read`;

  const health = calculateReadmeScore(sections);
  const scoreBadge = document.getElementById('health-score-badge');
  const scoreText = document.getElementById('health-score-text');
  const scoreTip = document.getElementById('health-score-tip');

  if (scoreBadge && scoreText) {
    scoreBadge.style.borderColor = health.color;
    scoreBadge.style.color = health.color;
    scoreText.textContent = `${health.score}% (${health.label})`;
  }

  if (scoreTip) {
    if (health.tips.length > 0) {
      const top = health.tips[0];
      scoreTip.innerHTML = '';
      const tipSpan = document.createElement('span');
      tipSpan.textContent = `Tip: ${typeof top === 'string' ? top : top.text} `;
      scoreTip.appendChild(tipSpan);
      // One-click suggestion: enable missing section directly
      if (top && typeof top === 'object' && top.action) {
        const btn = document.createElement('button');
        btn.id = 'health-suggest-btn';
        btn.className = 'ml-2 px-2 py-0.5 rounded border border-border bg-muted text-foreground text-[11px] font-medium';
        btn.textContent = top.actionLabel || 'Fix it';
        btn.addEventListener('click', () => {
          try {
            if (top.action.type === 'enable' && top.action.sectionType) {
              store.addSectionFromType(top.action.sectionType);
              showToast('Section enabled', 'success');
            } else if (top.action.type === 'view' && top.action.mode) {
              store.setViewMode(top.action.mode);
            }
          } catch (e) { console.warn(e); }
        });
        scoreTip.appendChild(btn);
      }
      scoreTip.classList.remove('hidden');
    } else {
      scoreTip.textContent = 'Your README is in top-tier shape!';
    }
  }
}

function setupOverflowAndExport() {
  const overflowBtn = document.getElementById('nav-overflow-btn');
  const overflowMenu = document.getElementById('nav-overflow-menu');
  const exportBtn = document.getElementById('export-menu-btn');
  const exportMenu = document.getElementById('export-menu');
  const toggle = (el) => el?.classList.toggle('hidden');
  overflowBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    exportMenu?.classList.add('hidden');
    toggle(overflowMenu);
  });
  exportBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    overflowMenu?.classList.add('hidden');
    toggle(exportMenu);
  });
  document.addEventListener('click', () => {
    overflowMenu?.classList.add('hidden');
    exportMenu?.classList.add('hidden');
  });
  overflowMenu?.querySelectorAll('[data-overflow]')?.forEach(b => {
    b.addEventListener('click', () => {
      const k = b.dataset.overflow;
      if (k === 'guide') document.getElementById('nav-wizard-btn')?.click();
      else if (k === 'import') document.getElementById('nav-import-btn')?.click();
      else if (k === 'theme') document.getElementById('theme-toggle-btn')?.click();
      else if (k === 'copy') document.getElementById('nav-copy-btn')?.click();
      else if (k === 'reset') document.getElementById('reset-template-btn')?.click();
    });
  });
  document.getElementById('export-menu-copy')?.addEventListener('click', () => document.getElementById('nav-copy-btn')?.click());
  document.getElementById('export-menu-download')?.addEventListener('click', () => document.getElementById('nav-download-btn')?.click());
  document.getElementById('export-menu-license')?.addEventListener('click', () => {
    // Trigger license download from inspector/canvas if present, else toast
    const btn = document.querySelector('.download-canvas-lic-btn, #download-license-file-btn');
    if (btn) btn.click();
    else showToast('Open License section → Download LICENSE', 'info');
  });
}

function setupSavedIndicator() {
  const dot = document.getElementById('save-state-dot');
  const txt = document.getElementById('save-state-text');
  if (!dot && !txt) return;
  const markDirty = () => {
    if (dot) { dot.classList.remove('saved'); dot.classList.add('dirty'); }
    if (txt) txt.textContent = 'Saving…';
  };
  const markSaved = () => {
    if (dot) { dot.classList.remove('dirty'); dot.classList.add('saved'); }
    if (txt) {
      const d = new Date();
      txt.textContent = `Saved ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    }
  };
  // Any store notify => dirty, debounced save event => saved
  const origNotify = store.notify.bind(store);
  store.notify = (meta) => { try { markDirty(); } catch (e) {} return origNotify(meta); };
  window.addEventListener('readmify:saved', markSaved);
  // Flush on unload so no work is lost
  window.addEventListener('beforeunload', () => { try { store.flushSave(); } catch (e) {} });
}

function setupGlobalDrop() {
  const overlay = document.getElementById('global-drop-overlay');
  const viewport = document.getElementById('canvas-scroll-viewport');
  let dragDepth = 0;
  const show = () => overlay && (overlay.classList.remove('hidden'), overlay.classList.add('flex'));
  const hide = () => overlay && (overlay.classList.add('hidden'), overlay.classList.remove('flex'));
  window.addEventListener('dragenter', (e) => {
    if (!e.dataTransfer || ![... (e.dataTransfer.types || [])].includes('Files')) return;
    dragDepth++;
    show();
    viewport?.classList.add('global-drag-over');
  });
  window.addEventListener('dragleave', () => {
    dragDepth = Math.max(0, dragDepth - 1);
    if (dragDepth === 0) { hide(); viewport?.classList.remove('global-drag-over'); }
  });
  window.addEventListener('dragover', (e) => { if (overlay && !overlay.classList.contains('hidden')) e.preventDefault(); });
  window.addEventListener('drop', (e) => {
    if (!overlay || overlay.classList.contains('hidden')) return;
    // Only handle file drops here; section-type drops are handled on canvas dividers
    if (!e.dataTransfer || ![... (e.dataTransfer.types || [])].includes('Files')) return;
    e.preventDefault();
    dragDepth = 0;
    hide();
    viewport?.classList.remove('global-drag-over');
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      if (file) showToast('Only images can be dropped as banners', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      const url = evt.target.result;
      const state = store.getState();
      // Prefer hero, fallback to demo, else create hero
      let target = state.sections.find(s => s.enabled && s.type === SECTION_TYPES.HERO)
        || state.sections.find(s => s.enabled && s.type === 'demo')
        || state.sections.find(s => s.type === SECTION_TYPES.HERO);
      if (!target) return;
      if (target.type === SECTION_TYPES.HERO) store.updateSectionData(target.id, { showLogo: true, logoUrl: url });
      else store.updateSectionData(target.id, { imageUrl: url });
      showToast('Banner added via drag & drop!', 'success');
    };
    reader.readAsDataURL(file);
  });
}

// --- 3. NAVBAR CONTROLS ---
function setupNavbarControls() {
  // GitHub Deep Scanner Bar
  const navGithubInput = document.getElementById('nav-github-input');
  const navGithubDetectBtn = document.getElementById('nav-github-detect-btn');

  function handleNavDeepScan() {
    const val = navGithubInput?.value?.trim() || '';
    if (!val) {
      openWizard('', false);
      return;
    }
    const parsed = parseGitHubRepoInput(val);
    if (!parsed) {
      showToast('Please enter a valid repo (e.g. facebook/react or GitHub URL)', 'error');
      return;
    }
    openWizard(val, true);
  }

  if (navGithubDetectBtn && navGithubInput) {
    navGithubDetectBtn.addEventListener('click', handleNavDeepScan);
    navGithubInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleNavDeepScan();
      }
    });
  }

  // Add Section Catalog Button in Navbar
  const navAddSecBtn = document.getElementById('nav-add-section-btn');
  if (navAddSecBtn) {
    navAddSecBtn.addEventListener('click', () => {
      openSectionLibrary();
    });
  }

  // Photo / Banner Hub Trigger
  const navPhotosBtn = document.getElementById('nav-photos-btn');
  if (navPhotosBtn) {
    navPhotosBtn.addEventListener('click', () => {
      renderPhotoModal('hero');
    });
  }

  // Easy Guide Launch Button
  const wizardBtn = document.getElementById('nav-wizard-btn');
  if (wizardBtn) {
    wizardBtn.addEventListener('click', () => openWizard(navGithubInput?.value?.trim() || '', false));
  }

  // Copy Markdown Button
  const copyBtn = document.getElementById('nav-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      await copyToClipboard(currentMarkdown, 'Markdown copied! Paste directly into GitHub README.md');
    });
  }

  // Download Button
  const downloadBtn = document.getElementById('nav-download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      downloadReadmeFile(currentMarkdown, 'README.md');
    });
  }

  // GitHub Theme Toggle (Dark / Light)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = store.getState().previewTheme;
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      store.setPreviewTheme(nextTheme);

      themeToggleBtn.innerHTML = nextTheme === 'light' 
        ? '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>' 
        : '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
      showToast(`Switched preview to GitHub ${nextTheme} mode`, 'info');
    });
  }
}

// --- 4. VIEW MODE SWITCHER (EDITOR / PREVIEW / CODE) ---
function setupViewModeSwitcher() {
  const modeBtns = document.querySelectorAll('.view-mode-btn');

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      store.setViewMode(mode);
    });
  });

  if (rawMarkdownTextarea) {
    rawMarkdownTextarea.addEventListener('input', (e) => {
      currentMarkdown = e.target.value;
      if (previewBody) {
        try {
          if (window.marked) {
            const rawHtml = window.marked.parse(currentMarkdown);
            const safeHtml = window.DOMPurify ? window.DOMPurify.sanitize(rawHtml) : rawHtml;
            previewBody.innerHTML = safeHtml;
          }
        } catch (err) {
          console.error('Markdown parse error:', err);
        }
      }
    });
  }
}

function applyViewModeDom(mode) {
  const modeBtns = document.querySelectorAll('.view-mode-btn');
  modeBtns.forEach(b => {
    if (b.dataset.mode === mode) {
      b.className = 'view-mode-btn px-3.5 py-1 text-xs font-medium rounded-md transition-all bg-background text-foreground shadow-sm';
    } else {
      b.className = 'view-mode-btn px-3.5 py-1 text-xs font-medium rounded-md transition-all text-muted-foreground hover:text-foreground';
    }
  });

  if (canvasViewContainer) {
    canvasViewContainer.classList.toggle('hidden', mode !== 'canvas');
    if (mode === 'canvas') canvasViewContainer.classList.add('flex');
    else canvasViewContainer.classList.remove('flex');
  }
  if (purePreviewContainer) {
    purePreviewContainer.classList.toggle('hidden', mode !== 'preview');
    if (mode === 'preview') purePreviewContainer.classList.add('flex');
    else purePreviewContainer.classList.remove('flex');
  }
  if (rawMarkdownContainer) {
    rawMarkdownContainer.classList.toggle('hidden', mode !== 'raw');
    if (mode === 'raw') rawMarkdownContainer.classList.add('flex');
    else rawMarkdownContainer.classList.remove('flex');
  }
}

function renderPurePreview(state) {
  if (!previewBody) return;

  try {
    let html = '';
    if (window.marked) {
      window.marked.setOptions({ gfm: true, breaks: true });
      const rawHtml = window.marked.parse(currentMarkdown);
      html = window.DOMPurify ? window.DOMPurify.sanitize(rawHtml) : rawHtml;
    } else {
      html = escapeHtml(currentMarkdown);
    }

    previewBody.className = `markdown-body ${state.previewTheme === 'light' ? 'github-light' : 'github-dark'}`;
    previewBody.innerHTML = html;
  } catch (err) {
    console.error('Markdown parse error:', err);
    previewBody.innerText = currentMarkdown;
  }
}

// --- 5. IMPORT EXISTING README MODAL ---
function setupImportModal() {
  const importBtn = document.getElementById('nav-import-btn');
  const modal = document.getElementById('import-readme-modal');
  const cancelBtn = document.getElementById('close-import-modal-btn');
  const applyBtn = document.getElementById('apply-import-btn');
  const importTextarea = document.getElementById('import-markdown-textarea');
  const fileInput = document.getElementById('import-file-input');

  if (!importBtn || !modal) return;

  importBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  cancelBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (importTextarea) importTextarea.value = evt.target.result;
      };
      reader.readAsText(file);
    }
  });

  // Drag & drop .md/.txt files onto import modal + textarea
  const dropZone = modal.querySelector('.bg-card');
  const handleFile = (file) => {
    if (!file) return;
    if (!/(\.md|\.markdown|\.txt)$/i.test(file.name) && file.type !== 'text/markdown' && !file.type.startsWith('text/')) {
      showToast('Drop a .md / .txt file', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => { if (importTextarea) importTextarea.value = evt.target.result; };
    reader.readAsText(file);
  };
  ['dragover', 'dragenter'].forEach(ev => modal.addEventListener(ev, (e) => {
    e.preventDefault();
    dropZone?.classList.add('drag-over');
  }));
  ['dragleave', 'drop'].forEach(ev => modal.addEventListener(ev, (e) => {
    if (ev === 'drop') {
      e.preventDefault();
      const f = e.dataTransfer?.files?.[0];
      if (f) handleFile(f);
    }
    dropZone?.classList.remove('drag-over');
  }));
  importTextarea?.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer?.files?.[0];
    if (f) handleFile(f);
  });

  applyBtn?.addEventListener('click', () => {
    const text = importTextarea?.value || '';
    if (!text.trim()) {
      showToast('Please paste or upload markdown content first', 'error');
      return;
    }

    store.batchUpdate(sections => {
      sections.forEach(s => s.enabled = false);
      const customSec = sections.find(s => s.id === 'sec-imported');
      if (customSec) {
        customSec.enabled = true;
        customSec.data.markdown = text;
      } else {
        sections.unshift({
          id: 'sec-imported',
          type: 'custom',
          title: 'Imported README',
          enabled: true,
          data: {
            heading: 'Imported Content',
            markdown: text
          }
        });
      }
    });

    modal.classList.add('hidden');
    showToast('Imported README successfully!', 'success');
  });
}

// Robust DOM Ready execution
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
