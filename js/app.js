/**
 * Readmify - Main Application Controller (v2)
 * Coordinates store state, sidebar, editor forms, preview rendering, GitHub API, and export actions
 */
import { store } from './store.js';
import { generateMarkdown } from './utils/markdownGenerator.js';
import { copyToClipboard, downloadReadmeFile, showToast, fireConfetti } from './utils/exportUtils.js';
import { renderSectionEditor } from './components/sectionEditor.js';
import { openWizard } from './components/wizard.js';
import { renderPhotoModal } from './components/photoUploader.js';
import { calculateReadmeScore } from './components/healthScore.js';
import { fetchGitHubRepoDetails, parseGitHubRepoInput } from './services/githubApi.js';
import { TEMPLATES } from './data/templates.js';
import { SECTION_TYPES } from './data/defaultSections.js';

// DOM Elements
let sectionListContainer;
let sectionEditorContainer;
let previewBody;
let rawMarkdownTextarea;
let currentMarkdown = '';

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
        class="section-item group flex items-center justify-between px-2.5 py-2 rounded-md border cursor-pointer select-none transition-all ${
          isActive 
            ? 'active bg-muted border-border text-foreground font-medium shadow-xs' 
            : 'bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
        } ${!sec.enabled ? 'opacity-50' : ''}"
        data-section-id="${sec.id}"
        data-index="${idx}"
      >
        <div class="flex items-center gap-2 flex-1 min-w-0">
          <span class="text-zinc-500 text-[10px] font-mono w-3.5">${idx + 1}</span>
          <span class="text-xs truncate">${sec.title}</span>
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
      scoreTip.textContent = `💡 Tip: ${health.tips[0]}`;
      scoreTip.classList.remove('hidden');
    } else {
      scoreTip.textContent = '🎉 Your README is in top-tier shape!';
    }
  }
}

// --- 3. NAVBAR CONTROLS ---
function setupNavbarControls() {
  // GitHub Auto-Detect Bar
  const navGithubInput = document.getElementById('nav-github-input');
  const navGithubDetectBtn = document.getElementById('nav-github-detect-btn');

  async function handleNavAutoDetect() {
    if (!navGithubInput) return;
    const parsed = parseGitHubRepoInput(navGithubInput.value);
    if (!parsed) {
      showToast('Please enter a valid repo (e.g. facebook/react or GitHub URL)', 'error');
      return;
    }

    navGithubDetectBtn.innerHTML = '<span>⏳</span> Fetching...';
    navGithubDetectBtn.disabled = true;

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
      fireConfetti();
      showToast(`Detected ${info.repo}! [${langSummary}]`, 'success');
    } catch (err) {
      showToast(err.message || 'Failed to fetch from GitHub API', 'error');
    } finally {
      navGithubDetectBtn.innerHTML = '<span>⚡</span> Detect';
      navGithubDetectBtn.disabled = false;
    }
  }

  if (navGithubDetectBtn && navGithubInput) {
    navGithubDetectBtn.addEventListener('click', handleNavAutoDetect);
    navGithubInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleNavAutoDetect();
      }
    });
  }

  // Photo / Banner Hub Trigger
  const navPhotosBtn = document.getElementById('nav-photos-btn');
  if (navPhotosBtn) {
    navPhotosBtn.addEventListener('click', () => {
      renderPhotoModal('hero');
    });
  }

  // Wizard Launch Button
  const wizardBtn = document.getElementById('nav-wizard-btn');
  if (wizardBtn) {
    wizardBtn.addEventListener('click', () => openWizard());
  }

  // Template Dropdown
  const templateSelect = document.getElementById('template-select');
  if (templateSelect) {
    templateSelect.innerHTML = `
      <option value="" disabled selected>✨ 1-Click Starters...</option>
      ${TEMPLATES.map(t => `
        <option value="${t.id}">${t.icon} ${t.name}</option>
      `).join('')}
    `;

    templateSelect.addEventListener('change', (e) => {
      const tplId = e.target.value;
      if (tplId) {
        if (confirm('Load this starter template? Your current sections will be updated.')) {
          store.loadTemplate(tplId);
          showToast(`Loaded ${TEMPLATES.find(t => t.id === tplId)?.name} starter!`, 'success');
        }
        templateSelect.value = '';
      }
    });
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
        ? '<span>☀️</span>' 
        : '<span>🌙</span>';
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
        b.className = 'view-mode-btn px-3 py-1 text-xs font-medium rounded-md transition-all text-muted-foreground hover:text-foreground';
      });
      btn.className = 'view-mode-btn px-3 py-1 text-xs font-medium rounded-md transition-all bg-background text-foreground shadow-sm';

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
