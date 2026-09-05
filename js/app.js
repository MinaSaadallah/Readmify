/**
 * Readmify - Main Application Controller
 * Coordinates store state, sidebar, editor forms, preview rendering, and export actions
 */
import { store } from './store.js';
import { generateMarkdown } from './utils/markdownGenerator.js';
import { copyToClipboard, downloadReadmeFile, showToast, fireConfetti } from './utils/exportUtils.js';
import { renderSectionEditor } from './components/sectionEditor.js';
import { openWizard } from './components/wizard.js';
import { calculateReadmeScore } from './components/healthScore.js';
import { TEMPLATES } from './data/templates.js';

// DOM Elements
let sectionListContainer;
let sectionEditorContainer;
let previewBody;
let rawMarkdownTextarea;
let currentMarkdown = '';

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function initApp() {
  sectionListContainer = document.getElementById('section-list-items');
  sectionEditorContainer = document.getElementById('section-editor-container');
  previewBody = document.getElementById('github-preview-body');
  rawMarkdownTextarea = document.getElementById('raw-markdown-textarea');

  setupNavbarControls();
  setupViewModeSwitcher();
  setupImportModal();

  // Subscribe to store updates
  store.subscribe(renderApp);

  // Initial render
  renderApp(store.getState());

  // Check if first time user, offer quick wizard
  if (!localStorage.getItem('readmify_visited')) {
    localStorage.setItem('readmify_visited', 'true');
    setTimeout(() => {
      openWizard();
    }, 600);
  }
}

function renderApp(state) {
  renderSidebar(state);
  renderSectionEditor(sectionEditorContainer);
  renderPreview(state);
}

// --- 1. SIDEBAR RENDERING & REORDERING ---
function renderSidebar(state) {
  if (!sectionListContainer) return;

  const { sections, activeSectionId } = state;

  sectionListContainer.innerHTML = sections.map((sec, idx) => {
    const isActive = sec.id === activeSectionId;
    return `
      <div 
        class="section-item group flex items-center justify-between px-3 py-2.5 rounded-xl border cursor-pointer select-none transition-all ${
          isActive 
            ? 'active bg-indigo-950/40 border-indigo-500 shadow-sm text-white' 
            : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
        } ${!sec.enabled ? 'opacity-50' : ''}"
        data-section-id="${sec.id}"
        data-index="${idx}"
      >
        <div class="flex items-center gap-2.5 flex-1 min-w-0">
          <span class="text-slate-500 text-xs font-mono w-4">${idx + 1}</span>
          <span class="text-xs font-medium truncate">${sec.title}</span>
        </div>

        <div class="flex items-center gap-1 opacity-80 group-hover:opacity-100">
          <!-- Move Up/Down Controls -->
          <div class="flex items-center">
            <button class="move-up-btn p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 text-[10px] ${idx === 0 ? 'invisible' : ''}" title="Move Up" data-id="${sec.id}">▲</button>
            <button class="move-down-btn p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 text-[10px] ${idx === sections.length - 1 ? 'invisible' : ''}" title="Move Down" data-id="${sec.id}">▼</button>
          </div>

          <!-- Enable/Disable Toggle -->
          <input 
            type="checkbox" 
            class="toggle-section-cb rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer ml-1.5" 
            ${sec.enabled ? 'checked' : ''} 
            data-id="${sec.id}" 
            title="Toggle section visibility" 
          />
        </div>
      </div>
    `;
  }).join('');

  // Attach click to activate
  sectionListContainer.querySelectorAll('.section-item').forEach(el => {
    el.addEventListener('click', (e) => {
      // Don't switch if clicking buttons or checkboxes
      if (e.target.closest('button') || e.target.closest('input')) return;
      const id = el.dataset.sectionId;
      store.setActiveSection(id);
    });
  });

  // Attach move up / down
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

  // Attach checkbox toggle
  sectionListContainer.querySelectorAll('.toggle-section-cb').forEach(cb => {
    cb.addEventListener('change', (e) => {
      e.stopPropagation();
      store.toggleSection(cb.dataset.id, cb.checked);
    });
  });

  // Attach Add Custom Section
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

  // Attach Reset to default
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

  // 1. Update rendered HTML
  if (previewBody) {
    // Check GitHub theme class
    previewBody.className = `markdown-body ${state.previewTheme === 'light' ? 'github-light' : 'github-dark'}`;

    try {
      if (window.marked) {
        // Configure marked with GFM tables and line breaks
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

  // 2. Update Raw Code View
  if (rawMarkdownTextarea) {
    rawMarkdownTextarea.value = currentMarkdown;
  }

  // 3. Update Health Score & Stats
  updateHealthAndStats(state.sections, currentMarkdown);
}

function updateHealthAndStats(sections, markdownText) {
  // Stats
  const words = markdownText.trim() ? markdownText.trim().split(/\s+/).length : 0;
  const chars = markdownText.length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  const statsWordEl = document.getElementById('stats-word-count');
  const statsCharEl = document.getElementById('stats-char-count');
  const statsTimeEl = document.getElementById('stats-reading-time');

  if (statsWordEl) statsWordEl.textContent = `${words} words`;
  if (statsCharEl) statsCharEl.textContent = `${chars} chars`;
  if (statsTimeEl) statsTimeEl.textContent = `~${readingTime} min read`;

  // Health Score
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
      scoreTip.textContent = `💡 Tip: ${health.tips[0]}`;
      scoreTip.classList.remove('hidden');
    } else {
      scoreTip.textContent = '🎉 Your README is in top-tier shape!';
    }
  }
}

// --- 3. NAVBAR CONTROLS ---
function setupNavbarControls() {
  // Wizard Launch Button
  const wizardBtn = document.getElementById('nav-wizard-btn');
  if (wizardBtn) {
    wizardBtn.addEventListener('click', () => openWizard());
  }

  // Template Dropdown
  const templateSelect = document.getElementById('template-select');
  if (templateSelect) {
    templateSelect.innerHTML = `
      <option value="" disabled selected>✨ Load 1-Click Starter...</option>
      ${TEMPLATES.map(t => `
        <option value="${t.id}">${t.icon} ${t.name}</option>
      `).join('')}
    `;

    templateSelect.addEventListener('change', (e) => {
      const tplId = e.target.value;
      if (tplId) {
        if (confirm('Load this template? Your current sections will be replaced.')) {
          store.loadTemplate(tplId);
          showToast(`Loaded ${TEMPLATES.find(t => t.id === tplId)?.name} template!`, 'success');
        }
        templateSelect.value = '';
      }
    });
  }

  // Copy Markdown Button
  const copyBtn = document.getElementById('nav-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      await copyToClipboard(currentMarkdown, 'Markdown copied! Paste into GitHub README.md');
    });
  }

  // Download Button
  const downloadBtn = document.getElementById('nav-download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const hero = store.getState().sections.find(s => s.id === 'sec-hero');
      const filename = 'README.md';
      downloadReadmeFile(currentMarkdown, filename);
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
        ? '<span>☀️ Light</span>' 
        : '<span>🌙 Dark</span>';
      showToast(`Switched preview to GitHub ${nextTheme} mode`, 'info');
    });
  }
}

// --- 4. VIEW MODE SWITCHER (SPLIT / PREVIEW / RAW) ---
function setupViewModeSwitcher() {
  const modeBtns = document.querySelectorAll('.view-mode-btn');
  const leftPane = document.getElementById('editor-left-pane');
  const rightPane = document.getElementById('editor-right-pane');
  const previewTab = document.getElementById('preview-render-tab');
  const rawTab = document.getElementById('preview-raw-tab');

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      store.setViewMode(mode);

      modeBtns.forEach(b => {
        b.className = 'view-mode-btn px-3 py-1.5 text-xs font-semibold rounded-lg transition-all text-slate-400 hover:text-white';
      });
      btn.className = 'view-mode-btn px-3 py-1.5 text-xs font-semibold rounded-lg transition-all bg-indigo-600 text-white shadow-sm';

      if (mode === 'split') {
        leftPane.classList.remove('hidden');
        leftPane.classList.add('w-full', 'lg:w-1/2');
        rightPane.classList.remove('hidden');
        rightPane.classList.add('w-full', 'lg:w-1/2');
        previewTab.classList.remove('hidden');
        rawTab.classList.add('hidden');
      } else if (mode === 'preview') {
        leftPane.classList.add('hidden');
        rightPane.classList.remove('hidden');
        rightPane.className = 'flex-1 h-full overflow-hidden flex flex-col';
        previewTab.classList.remove('hidden');
        rawTab.classList.add('hidden');
      } else if (mode === 'raw') {
        leftPane.classList.add('hidden');
        rightPane.classList.remove('hidden');
        rightPane.className = 'flex-1 h-full overflow-hidden flex flex-col';
        previewTab.classList.add('hidden');
        rawTab.classList.remove('hidden');
      }
    });
  });

  // Allow live editing in raw markdown textarea
  if (rawMarkdownTextarea) {
    rawMarkdownTextarea.addEventListener('input', (e) => {
      currentMarkdown = e.target.value;
      if (previewBody && window.marked) {
        const rawHtml = window.marked.parse(currentMarkdown);
        previewBody.innerHTML = window.DOMPurify ? window.DOMPurify.sanitize(rawHtml) : rawHtml;
      }
    });
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

  applyBtn?.addEventListener('click', () => {
    const text = importTextarea?.value || '';
    if (!text.trim()) {
      showToast('Please paste or upload markdown content first', 'error');
      return;
    }

    // Add as a custom full markdown section or replace custom
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
