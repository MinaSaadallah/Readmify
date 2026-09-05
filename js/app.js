/**
 * App shell: mounts the left-pane section forms and the right-pane live
 * preview, and wires up the header. Both panes are driven by the exact same
 * store + renderReadmeHtml() call — see js/utils/renderReadme.js.
 */
import { store } from './store.js';
import { renderReadmeHtml } from './utils/renderReadme.js';
import { renderSectionFormList } from './components/sectionFormList.js';
import { openSectionLibrary } from './components/sectionLibrary.js';
import { openWizard } from './components/wizard.js';
import { initPalette } from './components/palette.js';
import { calculateReadmeScore } from './components/healthScore.js';
import { copyToClipboard, downloadReadmeFile, showToast } from './utils/exportUtils.js';
import { SECTION_TYPES } from './data/defaultSections.js';

let editorPaneBody, previewBody, rawView, previewTabBtn, rawTabBtn;
let currentMarkdown = '';
let mermaidReady = false;

function initApp() {
  editorPaneBody = document.getElementById('editor-pane-body');
  previewBody = document.getElementById('preview-body');
  rawView = document.getElementById('raw-view');
  previewTabBtn = document.getElementById('preview-tab-btn');
  rawTabBtn = document.getElementById('raw-tab-btn');

  setupHeaderControls();
  setupImportModal();
  initPalette();

  store.subscribe((state, meta) => renderApp(state, meta));
  renderApp(store.getState(), { force: true });

  window.addEventListener('beforeunload', () => store.flushSave());

  if (!localStorage.getItem('readmify_visited')) {
    localStorage.setItem('readmify_visited', 'true');
    setTimeout(() => openWizard(), 500);
  }
}

function renderApp(state, meta = {}) {
  applyViewModeDom(state.viewMode);

  if (editorPaneBody) renderSectionFormList(editorPaneBody, meta);

  const { markdown, html } = renderReadmeHtml(state.sections);
  currentMarkdown = markdown;
  window.__readmifyMarkdown = markdown;

  if (previewBody) {
    previewBody.className = 'markdown-body';
    previewBody.innerHTML = html;
    renderMermaidBlocks(previewBody);
  }
  applyPreviewTheme(state.previewTheme);
  if (rawView) rawView.value = markdown;

  updateHealthScore(state.sections, markdown);
  updateSaveIndicator();
}

function applyPreviewTheme(theme) {
  const link = document.getElementById('github-markdown-theme-link');
  const wrap = document.getElementById('preview-body-wrap');
  if (link) link.href = theme === 'light'
    ? 'https://cdn.jsdelivr.net/npm/github-markdown-css@5.8.1/github-markdown-light.css'
    : 'https://cdn.jsdelivr.net/npm/github-markdown-css@5.8.1/github-markdown-dark.css';
  if (wrap) { wrap.classList.toggle('theme-dark', theme !== 'light'); wrap.classList.toggle('theme-light', theme === 'light'); }
}

function renderMermaidBlocks(container) {
  const blocks = container.querySelectorAll('pre code.language-mermaid, pre code.mermaid');
  if (blocks.length === 0) return;
  if (!window.mermaid) return;
  if (!mermaidReady) {
    window.mermaid.initialize({ startOnLoad: false, theme: 'dark' });
    mermaidReady = true;
  }
  blocks.forEach((block, idx) => {
    const pre = block.closest('pre');
    const div = document.createElement('div');
    div.className = 'mermaid';
    div.textContent = block.textContent;
    div.id = `mermaid-diagram-${idx}-${Date.now()}`;
    pre.replaceWith(div);
  });
  try {
    window.mermaid.run({ nodes: container.querySelectorAll('.mermaid') });
  } catch (e) {
    console.warn('Mermaid render failed:', e);
  }
}

function applyViewModeDom(mode) {
  const editorPane = document.getElementById('editor-pane');
  const previewPane = document.getElementById('preview-pane');
  document.querySelectorAll('.view-mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  if (window.innerWidth < 900 && editorPane && previewPane) {
    editorPane.classList.toggle('hidden', mode !== 'editor');
    previewPane.classList.toggle('hidden', mode === 'editor' ? false : mode !== 'preview');
    if (mode === 'editor') previewPane.classList.add('hidden');
    if (mode === 'preview') editorPane.classList.add('hidden');
  } else if (editorPane && previewPane) {
    editorPane.classList.remove('hidden');
    previewPane.classList.remove('hidden');
  }
}

function updateHealthScore(sections, markdown) {
  const health = calculateReadmeScore(sections, markdown);
  const badge = document.getElementById('health-score-badge');
  const text = document.getElementById('health-score-text');
  const tipsEl = document.getElementById('health-score-tips');
  if (badge && text) {
    badge.style.borderColor = health.color;
    badge.style.color = health.color;
    text.textContent = `${health.score}% ${health.label}`;
  }
  if (tipsEl) {
    tipsEl.innerHTML = health.tips.slice(0, 3).map(t => `<li>${t}</li>`).join('');
  }
}

let saveIndicatorTimer = null;
function updateSaveIndicator() {
  const dot = document.getElementById('save-state-dot');
  const text = document.getElementById('save-state-text');
  if (!dot || !text) return;
  dot.classList.add('dirty');
  dot.classList.remove('saved');
  text.textContent = 'Saving...';
  if (saveIndicatorTimer) clearTimeout(saveIndicatorTimer);
  saveIndicatorTimer = setTimeout(() => {
    dot.classList.remove('dirty');
    dot.classList.add('saved');
    text.textContent = 'Saved';
  }, 600);
}

function setupHeaderControls() {
  document.getElementById('nav-add-section-btn')?.addEventListener('click', () => openSectionLibrary());

  document.getElementById('nav-photos-btn')?.addEventListener('click', () => {
    const hero = store.getState().sections.find(s => s.type === SECTION_TYPES.HERO);
    if (hero) scrollToSection(hero.id);
  });

  document.getElementById('nav-badges-btn')?.addEventListener('click', () => {
    const id = store.addSectionFromType(SECTION_TYPES.BADGES);
    scrollToSection(id);
  });

  document.querySelectorAll('.view-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => store.setViewMode(btn.dataset.mode));
  });

  previewTabBtn?.addEventListener('click', () => switchPreviewTab('preview'));
  rawTabBtn?.addEventListener('click', () => switchPreviewTab('raw'));

  document.getElementById('nav-download-btn')?.addEventListener('click', () => {
    downloadReadmeFile(currentMarkdown, 'README.md');
  });

  const exportBtn = document.getElementById('export-menu-btn');
  const exportMenu = document.getElementById('export-menu');
  const overflowBtn = document.getElementById('nav-overflow-btn');
  const overflowMenu = document.getElementById('nav-overflow-menu');

  exportBtn?.addEventListener('click', (e) => { e.stopPropagation(); overflowMenu?.classList.add('hidden'); exportMenu?.classList.toggle('hidden'); });
  overflowBtn?.addEventListener('click', (e) => { e.stopPropagation(); exportMenu?.classList.add('hidden'); overflowMenu?.classList.toggle('hidden'); });
  document.addEventListener('click', () => { exportMenu?.classList.add('hidden'); overflowMenu?.classList.add('hidden'); });

  document.getElementById('export-menu-copy')?.addEventListener('click', () => copyToClipboard(currentMarkdown));
  document.getElementById('export-menu-download')?.addEventListener('click', () => downloadReadmeFile(currentMarkdown, 'README.md'));

  overflowMenu?.querySelectorAll('[data-overflow]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.overflow;
      if (action === 'guide') openWizard();
      else if (action === 'import') document.getElementById('import-modal')?.classList.remove('hidden');
      else if (action === 'theme') {
        const next = store.getState().previewTheme === 'dark' ? 'light' : 'dark';
        store.setPreviewTheme(next);
        showToast(`Switched to ${next} preview theme`, 'info');
      } else if (action === 'copy') copyToClipboard(currentMarkdown);
      else if (action === 'reset') {
        if (confirm('Reset your README to the default template? This clears your current sections.')) store.resetToDefault();
      }
    });
  });
}

function switchPreviewTab(tab) {
  previewTabBtn?.classList.toggle('active', tab === 'preview');
  rawTabBtn?.classList.toggle('active', tab === 'raw');
  document.getElementById('preview-body-wrap')?.classList.toggle('hidden', tab !== 'preview');
  rawView?.classList.toggle('hidden', tab !== 'raw');
}

function scrollToSection(sectionId) {
  store.setViewMode('editor');
  setTimeout(() => {
    const card = document.querySelector(`[data-card-id="${sectionId}"]`);
    card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card?.classList.add('section-card-flash');
    setTimeout(() => card?.classList.remove('section-card-flash'), 1200);
  }, 50);
}

function setupImportModal() {
  const modal = document.getElementById('import-modal');
  if (!modal) return;
  const textarea = document.getElementById('import-textarea');
  const applyBtn = document.getElementById('import-apply-btn');
  const cancelBtn = document.getElementById('import-cancel-btn');

  cancelBtn?.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

  applyBtn?.addEventListener('click', () => {
    const text = textarea?.value?.trim();
    if (!text) { showToast('Paste some markdown first', 'error'); return; }
    store.state.sections = [{ id: `custom-${Date.now()}`, type: SECTION_TYPES.CUSTOM, title: 'Imported README', enabled: true, data: { heading: '', markdown: text } }];
    store.notify({ type: 'IMPORT' });
    modal.classList.add('hidden');
    showToast('Imported! Edit it as a Custom section.', 'success');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
