/**
 * Readmify - Command palette (Ctrl+K), offline, no deps.
 * Indexes section catalog + core actions. Supports drag from results.
 */
import { store } from '../store.js';
import { SECTION_CATALOG } from './sectionLibrary.js';
import { copyToClipboard, downloadReadmeFile } from '../utils/exportUtils.js';
import { openSectionLibrary } from './sectionLibrary.js';
import { openWizard } from './wizard.js';

let paletteOpen = false;
let activeIdx = 0;
let currentItems = [];

function coreActions() {
  return [
    { id: 'add-section', label: 'Add section…', hint: 'Library', run: () => openSectionLibrary() },
    { id: 'scan-repo', label: 'Scan GitHub repo…', hint: 'Deep scan', run: () => openWizard('', false) },
    { id: 'preview', label: 'Go to Preview', hint: 'View', run: () => store.setViewMode('preview') },
    { id: 'editor', label: 'Go to Editor', hint: 'View', run: () => store.setViewMode('canvas') },
    { id: 'code', label: 'Go to Code', hint: 'View', run: () => store.setViewMode('raw') },
    { id: 'copy', label: 'Copy markdown', hint: 'Export', run: () => copyToClipboard(window.__readmifyMarkdown || '', 'Markdown copied!') },
    { id: 'download', label: 'Download README.md', hint: 'Export', run: () => downloadReadmeFile(window.__readmifyMarkdown || '', 'README.md') },
    { id: 'import', label: 'Import README…', hint: 'File', run: () => document.getElementById('nav-import-btn')?.click() },
    { id: 'guide', label: 'Open Quick Guide', hint: 'Help', run: () => document.getElementById('nav-wizard-btn')?.click() },
    { id: 'theme', label: 'Toggle theme', hint: 'View', run: () => document.getElementById('theme-toggle-btn')?.click() },
  ];
}

export function openPalette() {
  const bd = document.getElementById('cmd-palette-backdrop');
  const input = document.getElementById('cmd-palette-input');
  if (!bd || !input) return;
  paletteOpen = true;
  activeIdx = 0;
  bd.classList.remove('hidden');
  input.value = '';
  renderPalette('');
  setTimeout(() => input.focus(), 30);
}

export function closePalette() {
  const bd = document.getElementById('cmd-palette-backdrop');
  if (bd) bd.classList.add('hidden');
  paletteOpen = false;
}

export function isPaletteOpen() { return paletteOpen; }

function allItems(query) {
  const q = (query || '').toLowerCase().trim();
  const actions = coreActions().map(a => ({ kind: 'action', title: a.label, sub: a.hint, run: a.run, id: a.id }));
  const secs = (SECTION_CATALOG || []).map(c => ({
    kind: 'section', title: `Add: ${c.title}`, sub: c.desc || c.category,
    type: c.type, id: `sec-${c.type}`
  }));
  const all = [...actions, ...secs];
  if (!q) return all.slice(0, 14);
  return all.filter(i => `${i.title} ${i.sub || ''}`.toLowerCase().includes(q)).slice(0, 14);
}

function renderPalette(query) {
  const list = document.getElementById('cmd-palette-list');
  if (!list) return;
  currentItems = allItems(query);
  list.innerHTML = currentItems.map((it, idx) => `
    <div class="cmd-item ${idx === activeIdx ? 'active' : ''} flex items-center justify-between px-2.5 py-2 rounded-md cursor-pointer"
      data-idx="${idx}" ${it.kind === 'section' ? `draggable="true" data-section-type="${it.type}"` : ''}>
      <span class="font-medium ${idx === activeIdx ? 'text-foreground' : 'text-zinc-200'}">${it.title}</span>
      <span class="text-[10px] text-muted-foreground">${it.sub || ''}</span>
    </div>`).join('') || `<div class="px-3 py-6 text-center text-muted-foreground">No matches</div>`;

  list.querySelectorAll('.cmd-item').forEach(el => {
    el.addEventListener('click', () => runItem(parseInt(el.dataset.idx, 10)));
    el.addEventListener('dragstart', (e) => {
      const it = currentItems[parseInt(el.dataset.idx, 10)];
      if (it?.kind === 'section') {
        e.dataTransfer.setData('text/readmify-section-type', it.type);
        e.dataTransfer.effectAllowed = 'copy';
      }
    });
  });
}

function runItem(idx) {
  const it = currentItems[idx];
  if (!it) return;
  closePalette();
  if (it.kind === 'action' && typeof it.run === 'function') it.run();
  else if (it.kind === 'section') store.addSectionFromType(it.type);
}

export function initPalette() {
  const bd = document.getElementById('cmd-palette-backdrop');
  const input = document.getElementById('cmd-palette-input');
  const btn = document.getElementById('nav-palette-btn');
  if (!bd || !input) return;
  if (bd.dataset.bound) return;
  bd.dataset.bound = 'true';

  btn?.addEventListener('click', openPalette);
  bd.addEventListener('click', (e) => { if (e.target === bd) closePalette(); });
  input.addEventListener('input', () => { activeIdx = 0; renderPalette(input.value); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); activeIdx = Math.min(activeIdx + 1, currentItems.length - 1); renderPalette(input.value); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); activeIdx = Math.max(activeIdx - 1, 0); renderPalette(input.value); }
    else if (e.key === 'Enter') { e.preventDefault(); runItem(activeIdx); }
    else if (e.key === 'Escape') closePalette();
  });
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (isPaletteOpen()) closePalette(); else openPalette();
    }
    if (e.key === 'Escape' && isPaletteOpen()) closePalette();
  });
}
