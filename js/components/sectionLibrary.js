/**
 * Readmify - Visual Section Library Catalog (shadcn/ui style)
 * Rich catalog of 16+ predefined modular section templates
 */
import { store } from '../store.js';
import { SECTION_TYPES } from '../data/defaultSections.js';
import { showToast, fireConfetti } from '../utils/exportUtils.js';

let catalogCategory = 'all';
let catalogSearchQuery = '';

export function getSectionSvg(type) {
  const icons = {
    [SECTION_TYPES.HERO]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>',
    [SECTION_TYPES.BADGES]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    [SECTION_TYPES.ABOUT]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg>',
    [SECTION_TYPES.TECH_STACK]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    [SECTION_TYPES.FEATURES]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
    [SECTION_TYPES.PROJECT_STRUCTURE]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>',
    [SECTION_TYPES.DEMO]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
    [SECTION_TYPES.BENCHMARKS]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>',
    [SECTION_TYPES.INSTALLATION]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>',
    [SECTION_TYPES.ENV_VARS]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="21" y2="21"/><line x1="4" x2="20" y1="14" y2="14"/><line x1="4" x2="20" y1="7" y2="7"/><circle cx="8" cy="7" r="2"/><circle cx="16" cy="14" r="2"/><circle cx="10" cy="21" r="2"/></svg>',
    [SECTION_TYPES.USAGE]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    [SECTION_TYPES.API_REFERENCE]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>',
    [SECTION_TYPES.FAQ]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>',
    [SECTION_TYPES.ROADMAP]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
    [SECTION_TYPES.CONTRIBUTING]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    [SECTION_TYPES.SPONSORS]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
    [SECTION_TYPES.CHANGELOG]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    [SECTION_TYPES.LICENSE]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>',
    [SECTION_TYPES.AUTHOR]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    [SECTION_TYPES.CUSTOM]: '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>'
  };
  return icons[type] || '<svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>';
}

export const SECTION_CATALOG = [
  // --- CORE & INTRO ---
  {
    type: SECTION_TYPES.HERO,
    title: 'Header & Title',
    category: 'core',
    desc: 'Project title, compelling tagline, custom banner/logo, and alignment.',
    tags: ['title', 'banner', 'hero', 'logo', 'header']
  },
  {
    type: SECTION_TYPES.BADGES,
    title: 'Repo Badges & Stats',
    category: 'core',
    desc: 'Automated GitHub stars, forks, license, release, and CI passing status badges.',
    tags: ['badges', 'shields', 'stars', 'forks', 'license', 'ci']
  },
  {
    type: SECTION_TYPES.ABOUT,
    title: 'About The Project',
    category: 'core',
    desc: 'Clear, engaging problem-solution overview explaining why your project exists.',
    tags: ['about', 'overview', 'summary', 'intro']
  },
  {
    type: SECTION_TYPES.TECH_STACK,
    title: 'Built With (Tech Stack)',
    category: 'core',
    desc: 'Display languages, frameworks, databases, and tools with SkillIcons or Shields badges.',
    tags: ['tech', 'stack', 'languages', 'frameworks', 'icons']
  },

  // --- FEATURES & ARCHITECTURE ---
  {
    type: SECTION_TYPES.FEATURES,
    title: 'Key Features',
    category: 'features',
    desc: 'Showcase your standout capabilities and core benefits with icons and descriptions.',
    tags: ['features', 'highlights', 'benefits', 'capabilities']
  },
  {
    type: SECTION_TYPES.PROJECT_STRUCTURE,
    title: 'Project Structure',
    category: 'features',
    desc: 'Visual ASCII directory tree showing code architecture and key files.',
    tags: ['structure', 'tree', 'architecture', 'folders', 'files']
  },
  {
    type: SECTION_TYPES.DEMO,
    title: 'Preview & Screenshots',
    category: 'features',
    desc: 'High-impact walkthrough GIF, application preview, or live demo link with custom sizing.',
    tags: ['demo', 'preview', 'screenshot', 'gif', 'image', 'video']
  },
  {
    type: SECTION_TYPES.BENCHMARKS,
    title: 'Benchmarks & Performance',
    category: 'features',
    desc: 'Metrics table comparing throughput, memory, or speed against competitors.',
    tags: ['benchmarks', 'performance', 'speed', 'metrics', 'comparison']
  },

  // --- SETUP & USAGE ---
  {
    type: SECTION_TYPES.INSTALLATION,
    title: 'Getting Started & Installation',
    category: 'setup',
    desc: 'System prerequisites and copy-paste terminal steps to clone, install, and run.',
    tags: ['install', 'setup', 'getting-started', 'npm', 'clone']
  },
  {
    type: SECTION_TYPES.ENV_VARS,
    title: 'Environment Variables',
    category: 'setup',
    desc: 'Formatted table detailing required keys, descriptions, and default values.',
    tags: ['env', 'environment', 'variables', 'config', 'secrets']
  },
  {
    type: SECTION_TYPES.USAGE,
    title: 'Usage & Examples',
    category: 'setup',
    desc: 'Code snippets, API calls, or CLI commands demonstrating how to use the project.',
    tags: ['usage', 'examples', 'code', 'snippet', 'cli']
  },
  {
    type: SECTION_TYPES.API_REFERENCE,
    title: 'API Reference',
    category: 'setup',
    desc: 'Clean REST or GraphQL endpoint table with methods, paths, and auth requirements.',
    tags: ['api', 'endpoints', 'rest', 'graphql', 'reference', 'routes']
  },

  // --- COMMUNITY & GOVERNANCE ---
  {
    type: SECTION_TYPES.FAQ,
    title: 'FAQ & Troubleshooting',
    category: 'community',
    desc: 'Collapsible accordion question-and-answer pairs for common issues and questions.',
    tags: ['faq', 'questions', 'troubleshooting', 'help', 'details']
  },
  {
    type: SECTION_TYPES.ROADMAP,
    title: 'Roadmap',
    category: 'community',
    desc: 'Interactive checklist of planned milestones, upcoming features, and current status.',
    tags: ['roadmap', 'todo', 'milestones', 'plans']
  },
  {
    type: SECTION_TYPES.CONTRIBUTING,
    title: 'Contributing Guide',
    category: 'community',
    desc: 'Fork-and-PR workflow instructions with automated contributor avatar wall.',
    tags: ['contributing', 'prs', 'fork', 'open-source', 'community']
  },
  {
    type: SECTION_TYPES.SPONSORS,
    title: 'Sponsors & Support',
    category: 'community',
    desc: 'Support cards for Buy Me A Coffee, GitHub Sponsors, and Patreon.',
    tags: ['sponsors', 'donate', 'coffee', 'patreon', 'funding']
  },
  {
    type: SECTION_TYPES.CHANGELOG,
    title: 'Changelog',
    category: 'community',
    desc: 'Version history, dates, and bullet points of new features, fixes, and changes.',
    tags: ['changelog', 'releases', 'versions', 'history', 'updates']
  },
  {
    type: SECTION_TYPES.LICENSE,
    title: 'License',
    category: 'community',
    desc: 'Software distribution license notice (MIT, Apache, GPL, etc.) and copyright holder.',
    tags: ['license', 'mit', 'apache', 'copyright']
  },
  {
    type: SECTION_TYPES.AUTHOR,
    title: 'Author & Contact',
    category: 'community',
    desc: 'Author bio, email, GitHub badge, Twitter/X, and LinkedIn social links.',
    tags: ['author', 'creator', 'contact', 'socials', 'email']
  },
  {
    type: SECTION_TYPES.CUSTOM,
    title: 'Custom Section',
    category: 'community',
    desc: 'A flexible, blank markdown canvas for architecture diagrams, notes, or anything else.',
    tags: ['custom', 'markdown', 'freeform', 'blank', 'notes']
  }
];

let targetInsertIndex = null;

export function openSectionLibrary(insertIndex = null) {
  targetInsertIndex = typeof insertIndex === 'number' ? insertIndex : null;
  let modal = document.getElementById('section-library-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'section-library-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs hidden';
    document.body.appendChild(modal);
  }

  catalogCategory = 'all';
  catalogSearchQuery = '';
  renderLibraryModal();
  modal.classList.remove('hidden');
}

export function closeSectionLibrary() {
  targetInsertIndex = null;
  const modal = document.getElementById('section-library-modal');
  if (modal) modal.classList.add('hidden');
}

function renderLibraryModal() {
  const modal = document.getElementById('section-library-modal');
  if (!modal) return;

  const currentSections = store.getState().sections;

  // Filter items
  const filtered = SECTION_CATALOG.filter(item => {
    const matchesCategory = catalogCategory === 'all' || item.category === catalogCategory;
    const q = catalogSearchQuery.toLowerCase();
    const matchesSearch = !q || 
      item.title.toLowerCase().includes(q) || 
      item.desc.toLowerCase().includes(q) || 
      item.tags.some(t => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  modal.innerHTML = `
    <div class="bg-card border border-border rounded-lg w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
      <!-- Modal Header -->
      <div class="px-5 py-3.5 border-b border-border flex items-center justify-between bg-card flex-shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-md bg-muted border border-border flex items-center justify-center text-foreground font-semibold text-sm">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-foreground">Section Library</h3>
            <p class="text-[11px] text-muted-foreground">Pick from 16+ curated section templates to add to your README</p>
          </div>
        </div>
        <button id="close-lib-btn" class="p-1 text-muted-foreground hover:text-foreground text-xs">✕</button>
      </div>

      <!-- Search & Category Filters -->
      <div class="px-5 py-3 border-b border-border bg-background/50 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between flex-shrink-0">
        <div class="relative flex-1">
          <span class="absolute left-2.5 top-2 text-muted-foreground text-xs pointer-events-none">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>
          </span>
          <input 
            type="text" 
            id="lib-search-input" 
            value="${catalogSearchQuery}"
            placeholder="Search sections: FAQ, Benchmarks, API, Structure..." 
            class="form-input text-xs pl-8 pr-3 h-8 w-full" 
          />
        </div>

        <div class="flex items-center gap-1 overflow-x-auto pb-0.5 sm:pb-0">
          ${[
            { id: 'all', label: 'All' },
            { id: 'core', label: 'Core' },
            { id: 'features', label: 'Features' },
            { id: 'setup', label: 'Setup' },
            { id: 'community', label: 'Community' }
          ].map(c => `
            <button class="lib-cat-btn px-2.5 py-1 text-[11px] font-medium rounded-md transition ${
              catalogCategory === c.id 
                ? 'bg-primary text-primary-foreground font-semibold shadow-xs' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }" data-cat="${c.id}">
              ${c.label}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Section Cards Grid -->
      <div class="p-5 overflow-y-auto flex-1 bg-background">
        ${filtered.length === 0 ? `
          <div class="py-12 text-center text-muted-foreground text-xs space-y-1">
            <p class="text-sm">No matching sections found for "${catalogSearchQuery}".</p>
            <button id="lib-clear-search-btn" class="text-xs text-foreground underline pt-1 cursor-pointer">Clear search filter</button>
          </div>
        ` : `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${filtered.map(item => {
              const existingSec = currentSections.find(s => s.type === item.type);
              const isEnabled = existingSec && existingSec.enabled;
              const isMultiple = item.type === SECTION_TYPES.CUSTOM;

              return `
                <div class="group p-3.5 bg-card border border-border hover:border-foreground/40 rounded-lg flex flex-col justify-between transition space-y-3 select-none">
                  <div class="space-y-1.5">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded bg-muted/60 flex items-center justify-center">
                          ${getSectionSvg(item.type)}
                        </div>
                        <h4 class="text-xs font-semibold text-foreground group-hover:text-foreground transition">${item.title}</h4>
                      </div>
                      ${isEnabled && !isMultiple ? `
                        <span class="text-[10px] px-1.5 py-0.5 rounded-full border border-border bg-muted/60 text-muted-foreground">In README</span>
                      ` : ''}
                    </div>
                    <p class="text-[11px] text-muted-foreground leading-relaxed">${item.desc}</p>
                  </div>

                  <div class="pt-1 flex items-center justify-between border-t border-border/50">
                    <span class="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">${item.category}</span>
                    ${isEnabled && !isMultiple ? `
                      <button class="lib-action-btn text-xs font-medium text-foreground hover:underline" data-type="${item.type}" data-title="${item.title}" data-mode="jump">
                        Edit Section →
                      </button>
                    ` : `
                      <button class="lib-action-btn btn-primary text-xs px-2.5 py-1 shadow-xs flex items-center gap-1" data-type="${item.type}" data-title="${item.title}" data-mode="add">
                        <span>+</span> Add to README
                      </button>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>

      <!-- Modal Footer -->
      <div class="px-5 py-3 border-t border-border bg-card flex items-center justify-between flex-shrink-0">
        <span class="text-[11px] text-muted-foreground">Tip: You can reorder, rename, or duplicate any section in your workspace.</span>
        <button id="close-lib-btn-2" class="btn-secondary text-xs px-3.5 py-1.5">
          Close
        </button>
      </div>
    </div>
  `;

  modal.querySelector('#close-lib-btn')?.addEventListener('click', closeSectionLibrary);
  modal.querySelector('#close-lib-btn-2')?.addEventListener('click', closeSectionLibrary);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSectionLibrary();
  });

  // Search input
  const searchInput = modal.querySelector('#lib-search-input');
  searchInput?.addEventListener('input', (e) => {
    catalogSearchQuery = e.target.value;
    renderLibraryModal();
    // Maintain focus
    const updatedInput = modal.querySelector('#lib-search-input');
    if (updatedInput) {
      updatedInput.focus();
      updatedInput.setSelectionRange(catalogSearchQuery.length, catalogSearchQuery.length);
    }
  });

  modal.querySelector('#lib-clear-search-btn')?.addEventListener('click', () => {
    catalogSearchQuery = '';
    renderLibraryModal();
  });

  // Categories
  modal.querySelectorAll('.lib-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      catalogCategory = btn.dataset.cat;
      renderLibraryModal();
    });
  });

  // Action buttons (Add or Jump)
  modal.querySelectorAll('.lib-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const title = btn.dataset.title;
      const mode = btn.dataset.mode;

      if (mode === 'jump') {
        const sec = store.getState().sections.find(s => s.type === type);
        if (sec) {
          store.setActiveSection(sec.id);
          closeSectionLibrary();
          showToast(`Jumped to "${sec.title}"`, 'info');
        }
      } else {
        const newId = store.addSectionFromType(type, title, targetInsertIndex);
        closeSectionLibrary();
        fireConfetti();
        showToast(`Added "${title}" to your README!`, 'success');
      }
    });
  });
}
