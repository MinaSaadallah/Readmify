/**
 * ⌘K command palette — quick actions + jump-to-add-section.
 */
import { store } from '../store.js';
import { SECTION_LABELS } from './sectionFormList.js';
import { openWizard } from './wizard.js';
import { copyToClipboard, downloadReadmeFile, showToast } from '../utils/exportUtils.js';

let open = false;
let activeIdx = 0;
let currentItems = [];

function coreActions() {
  return [
    { label: 'Go to Editor', run: () => store.setViewMode('editor') },
    { label: 'Go to Preview', run: () => store.setViewMode('preview') },
    { label: 'Copy markdown', run: () => copyToClipboard(window.__readmifyMarkdown || '', 'Markdown copied!') },
    { label: 'Download README.md', run: () => downloadReadmeFile(window.__readmifyMarkdown || '', 'README.md') },
    { label: 'Quick Start (scan repo / templates)', run: () => openWizard() },
    {
      label: 'Toggle theme', run: () => {
        const next = store.getState().previewTheme === 'dark' ? 'light' : 'dark';
        store.setPreviewTheme(next);
        showToast(`Switched to ${next} preview theme`, 'info');
      }
    },
    {
      label: 'Reset to default template', run: () => {
        if (confirm('Reset your README to the default template? This clears your current sections.')) {
          store.resetToDefault();
        }
      }
    }
  ];
}

function allItems(query) {
  const q = (query || '').toLowerCase().trim();
  const actions = coreActions().map(a => ({ kind: 'action', title: a.label, run: a.run }));
  const sections = Object.entries(SECTION_LABELS).map(([type, label]) => ({ kind: 'section', title: `Add: ${label}`, type }));
  const all = [...actions, ...sections];
  if (!q) return all.slice(0, 12);
  return all.filter(i => i.title.toLowerCase().includes(q)).slice(0, 12);
}

function render(query) {
  const list = document.getElementById('cmd-palette-list');
  if (!list) return;
  currentItems = allItems(query);
  list.innerHTML = currentItems.map((item, idx) => `
    <div class="cmd-item ${idx === activeIdx ? 'active' : ''}" data-idx="${idx}">${item.title}</div>
  `).join('') || `<div class="cmd-item-empty">No matches</div>`;

  list.querySelectorAll('.cmd-item').forEach(el => {
    el.addEventListener('click', () => runItem(parseInt(el.dataset.idx, 10)));
  });
}

function runItem(idx) {
  const item = currentItems[idx];
  if (!item) return;
  closePalette();
  if (item.kind === 'action') item.run();
  else if (item.kind === 'section') store.addSectionFromType(item.type);
}

export function openPalette() {
  const backdrop = document.getElementById('cmd-palette-backdrop');
  const input = document.getElementById('cmd-palette-input');
  if (!backdrop || !input) return;
  open = true;
  activeIdx = 0;
  backdrop.classList.remove('hidden');
  input.value = '';
  render('');
  setTimeout(() => input.focus(), 20);
}

export function closePalette() {
  document.getElementById('cmd-palette-backdrop')?.classList.add('hidden');
  open = false;
}

export function isPaletteOpen() { return open; }

export function initPalette() {
  const backdrop = document.getElementById('cmd-palette-backdrop');
  const input = document.getElementById('cmd-palette-input');
  const btn = document.getElementById('nav-palette-btn');
  if (!backdrop || !input) return;

  btn?.addEventListener('click', openPalette);
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closePalette(); });
  input.addEventListener('input', () => { activeIdx = 0; render(input.value); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); activeIdx = Math.min(activeIdx + 1, currentItems.length - 1); render(input.value); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); activeIdx = Math.max(activeIdx - 1, 0); render(input.value); }
    else if (e.key === 'Enter') { e.preventDefault(); runItem(activeIdx); }
    else if (e.key === 'Escape') closePalette();
  });
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      isPaletteOpen() ? closePalette() : openPalette();
    }
    if (e.key === 'Escape' && isPaletteOpen()) closePalette();
  });
}
