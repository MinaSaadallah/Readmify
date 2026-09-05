/**
 * Readmify - Interactive Tech Stack Badge Picker Modal (shadcn/ui style)
 */
import { TECH_CATALOG, TECH_CATEGORIES, getBadgeUrl } from '../data/techCatalog.js';
import { store } from '../store.js';
import { SECTION_TYPES } from '../data/defaultSections.js';

let currentCategory = 'all';
let searchQuery = '';

export function renderTechPickerModal() {
  let modal = document.getElementById('tech-picker-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'tech-picker-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs hidden';
    modal.innerHTML = `
      <div class="bg-card border border-border rounded-lg w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        <!-- Modal Header -->
        <div class="px-5 py-3.5 border-b border-border flex items-center justify-between bg-card">
          <div>
            <h3 class="text-sm font-semibold text-foreground flex items-center gap-2">
              <span>🎨</span> Select Tech Stack & Badges
            </h3>
            <p class="text-[11px] text-muted-foreground mt-0.5">Choose from 130+ technologies with official brand logos & colors</p>
          </div>
          <button id="close-tech-picker-btn" class="p-1 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition text-xs">
            ✕
          </button>
        </div>

        <!-- Filter & Search Controls -->
        <div class="p-3 border-b border-border bg-background/50 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
          <div class="relative flex-1">
            <input 
              type="text" 
              id="tech-search-input" 
              placeholder="Filter technologies (e.g. React, Python, Docker)..." 
              class="form-input text-xs py-1.5"
            />
          </div>

          <div class="flex items-center gap-2">
            <label class="text-[11px] text-muted-foreground whitespace-nowrap">Style:</label>
            <select id="tech-badge-style-select" class="form-input text-xs py-1 px-2 h-8 w-auto">
              <option value="for-the-badge">for-the-badge (Bold)</option>
              <option value="flat">flat (Clean)</option>
              <option value="flat-square">flat-square (Modern)</option>
              <option value="plastic">plastic (Classic)</option>
            </select>
          </div>
        </div>

        <!-- Category Pills -->
        <div class="px-5 py-2 border-b border-border flex gap-1.5 overflow-x-auto bg-card/50 no-scrollbar">
          ${TECH_CATEGORIES.map(cat => `
            <button 
              class="tech-cat-btn px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all ${cat.id === 'all' ? 'bg-primary text-primary-foreground shadow-xs' : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-accent'}" 
              data-category="${cat.id}">
              ${cat.name}
            </button>
          `).join('')}
        </div>

        <!-- Tech Grid -->
        <div id="tech-items-grid" class="flex-1 p-5 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 bg-background">
          <!-- Populated dynamically -->
        </div>

        <!-- Modal Footer -->
        <div class="px-5 py-3 border-t border-border bg-card flex items-center justify-between">
          <div class="text-xs text-muted-foreground">
            <span id="tech-selected-count" class="font-medium text-foreground">0</span> technologies selected
          </div>
          <button id="apply-tech-picker-btn" class="btn-primary text-xs px-3.5 py-1.5">
            Apply Selection
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#close-tech-picker-btn')?.addEventListener('click', closeTechPicker);
    modal.querySelector('#apply-tech-picker-btn')?.addEventListener('click', closeTechPicker);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeTechPicker();
    });

    const searchInput = modal.querySelector('#tech-search-input');
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      updateTechGrid();
    });

    const styleSelect = modal.querySelector('#tech-badge-style-select');
    styleSelect.addEventListener('change', (e) => {
      const techSec = store.getState().sections.find(s => s.type === SECTION_TYPES.TECH_STACK);
      if (techSec) {
        store.updateSectionData(techSec.id, { style: e.target.value });
        updateTechGrid();
      }
    });

    modal.querySelectorAll('.tech-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.tech-cat-btn').forEach(b => {
          b.className = 'tech-cat-btn px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all bg-muted text-muted-foreground hover:text-foreground hover:bg-accent';
        });
        btn.className = 'tech-cat-btn px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all bg-primary text-primary-foreground shadow-xs';
        currentCategory = btn.dataset.category;
        updateTechGrid();
      });
    });
  }

  updateTechGrid();
  modal.classList.remove('hidden');
}

export function closeTechPicker() {
  const modal = document.getElementById('tech-picker-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function updateTechGrid() {
  const grid = document.getElementById('tech-items-grid');
  if (!grid) return;

  const techSec = store.getState().sections.find(s => s.type === SECTION_TYPES.TECH_STACK);
  const selectedTechs = new Set(techSec?.data?.technologies || []);
  const style = techSec?.data?.style || 'for-the-badge';

  const styleSelect = document.getElementById('tech-badge-style-select');
  if (styleSelect && techSec?.data?.style) {
    styleSelect.value = techSec.data.style;
  }

  const selectedCountEl = document.getElementById('tech-selected-count');
  if (selectedCountEl) {
    selectedCountEl.textContent = selectedTechs.size;
  }

  const filtered = TECH_CATALOG.filter(item => {
    const matchCategory = currentCategory === 'all' || item.category === currentCategory;
    const matchSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery) || item.id.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-10 text-center text-muted-foreground text-xs">
        No technologies found matching "${searchQuery}"
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const isSelected = selectedTechs.has(item.id);
    const badgeUrl = getBadgeUrl(item, style);

    return `
      <div 
        class="tech-card p-2.5 rounded-md border transition-all cursor-pointer flex flex-col justify-between gap-2 select-none ${
          isSelected 
            ? 'bg-muted border-foreground/60 shadow-xs ring-1 ring-ring' 
            : 'bg-card border-border hover:border-zinc-700 hover:bg-muted/50'
        }"
        data-tech-id="${item.id}"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-medium text-foreground truncate">${item.name}</span>
          <span class="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
            isSelected ? 'bg-primary text-primary-foreground font-bold' : 'border border-border text-transparent'
          }">✓</span>
        </div>
        <div class="h-5 flex items-center overflow-hidden">
          <img src="${badgeUrl}" alt="${item.name}" class="h-4 object-contain pointer-events-none" loading="lazy" />
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.tech-card').forEach(card => {
    card.addEventListener('click', () => {
      const techId = card.dataset.techId;
      toggleTechItem(techId);
    });
  });
}

function toggleTechItem(techId) {
  const techSec = store.getState().sections.find(s => s.type === SECTION_TYPES.TECH_STACK);
  if (!techSec) return;

  const currentList = [...(techSec.data.technologies || [])];
  const idx = currentList.indexOf(techId);

  if (idx !== -1) {
    currentList.splice(idx, 1);
  } else {
    currentList.push(techId);
  }

  store.updateSectionData(techSec.id, { technologies: currentList });
  updateTechGrid();
}
