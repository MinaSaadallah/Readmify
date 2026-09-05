/**
 * Readmify - Visual Section Library Catalog (shadcn/ui style)
 * Rich catalog of 16+ predefined modular section templates
 */
import { store } from '../store.js';
import { SECTION_TYPES } from '../data/defaultSections.js';
import { showToast, fireConfetti } from '../utils/exportUtils.js';

let catalogCategory = 'all';
let catalogSearchQuery = '';

export const SECTION_CATALOG = [
  // --- CORE & INTRO ---
  {
    type: SECTION_TYPES.HERO,
    title: 'Header & Title',
    category: 'core',
    icon: '🏷️',
    desc: 'Project title, compelling tagline, custom banner/logo, and alignment.',
    tags: ['title', 'banner', 'hero', 'logo', 'header']
  },
  {
    type: SECTION_TYPES.BADGES,
    title: 'Repo Badges & Stats',
    category: 'core',
    icon: '🛡️',
    desc: 'Automated GitHub stars, forks, license, release, and CI passing status badges.',
    tags: ['badges', 'shields', 'stars', 'forks', 'license', 'ci']
  },
  {
    type: SECTION_TYPES.ABOUT,
    title: 'About The Project',
    category: 'core',
    icon: '📖',
    desc: 'Clear, engaging problem-solution overview explaining why your project exists.',
    tags: ['about', 'overview', 'summary', 'intro']
  },
  {
    type: SECTION_TYPES.TECH_STACK,
    title: 'Built With (Tech Stack)',
    category: 'core',
    icon: '🛠️',
    desc: 'Display languages, frameworks, databases, and tools with SkillIcons or Shields badges.',
    tags: ['tech', 'stack', 'languages', 'frameworks', 'icons']
  },

  // --- FEATURES & ARCHITECTURE ---
  {
    type: SECTION_TYPES.FEATURES,
    title: 'Key Features',
    category: 'features',
    icon: '✨',
    desc: 'Showcase your standout capabilities and core benefits with icons and descriptions.',
    tags: ['features', 'highlights', 'benefits', 'capabilities']
  },
  {
    type: SECTION_TYPES.PROJECT_STRUCTURE,
    title: 'Project Structure',
    category: 'features',
    icon: '📁',
    desc: 'Visual ASCII directory tree showing code architecture and key files.',
    tags: ['structure', 'tree', 'architecture', 'folders', 'files']
  },
  {
    type: SECTION_TYPES.DEMO,
    title: 'Preview & Screenshots',
    category: 'features',
    icon: '📸',
    desc: 'High-impact walkthrough GIF, application preview, or live demo link with custom sizing.',
    tags: ['demo', 'preview', 'screenshot', 'gif', 'image', 'video']
  },
  {
    type: SECTION_TYPES.BENCHMARKS,
    title: 'Benchmarks & Performance',
    category: 'features',
    icon: '⚡',
    desc: 'Metrics table comparing throughput, memory, or speed against competitors.',
    tags: ['benchmarks', 'performance', 'speed', 'metrics', 'comparison']
  },

  // --- SETUP & USAGE ---
  {
    type: SECTION_TYPES.INSTALLATION,
    title: 'Getting Started & Installation',
    category: 'setup',
    icon: '🚀',
    desc: 'System prerequisites and copy-paste terminal steps to clone, install, and run.',
    tags: ['install', 'setup', 'getting-started', 'npm', 'clone']
  },
  {
    type: SECTION_TYPES.ENV_VARS,
    title: 'Environment Variables',
    category: 'setup',
    icon: '⚙️',
    desc: 'Formatted table detailing required keys, descriptions, and default values.',
    tags: ['env', 'environment', 'variables', 'config', 'secrets']
  },
  {
    type: SECTION_TYPES.USAGE,
    title: 'Usage & Examples',
    category: 'setup',
    icon: '💻',
    desc: 'Code snippets, API calls, or CLI commands demonstrating how to use the project.',
    tags: ['usage', 'examples', 'code', 'snippet', 'cli']
  },
  {
    type: SECTION_TYPES.API_REFERENCE,
    title: 'API Reference',
    category: 'setup',
    icon: '🔌',
    desc: 'Clean REST or GraphQL endpoint table with methods, paths, and auth requirements.',
    tags: ['api', 'endpoints', 'rest', 'graphql', 'reference', 'routes']
  },

  // --- COMMUNITY & GOVERNANCE ---
  {
    type: SECTION_TYPES.FAQ,
    title: 'FAQ & Troubleshooting',
    category: 'community',
    icon: '💡',
    desc: 'Collapsible accordion question-and-answer pairs for common issues and questions.',
    tags: ['faq', 'questions', 'troubleshooting', 'help', 'details']
  },
  {
    type: SECTION_TYPES.ROADMAP,
    title: 'Roadmap',
    category: 'community',
    icon: '🗺️',
    desc: 'Interactive checklist of planned milestones, upcoming features, and current status.',
    tags: ['roadmap', 'todo', 'milestones', 'plans']
  },
  {
    type: SECTION_TYPES.CONTRIBUTING,
    title: 'Contributing Guide',
    category: 'community',
    icon: '🤝',
    desc: 'Fork-and-PR workflow instructions with automated contributor avatar wall.',
    tags: ['contributing', 'prs', 'fork', 'open-source', 'community']
  },
  {
    type: SECTION_TYPES.SPONSORS,
    title: 'Sponsors & Support',
    category: 'community',
    icon: '☕',
    desc: 'Support cards for Buy Me A Coffee, GitHub Sponsors, and Patreon.',
    tags: ['sponsors', 'donate', 'coffee', 'patreon', 'funding']
  },
  {
    type: SECTION_TYPES.CHANGELOG,
    title: 'Changelog',
    category: 'community',
    icon: '📝',
    desc: 'Version history, dates, and bullet points of new features, fixes, and changes.',
    tags: ['changelog', 'releases', 'versions', 'history', 'updates']
  },
  {
    type: SECTION_TYPES.LICENSE,
    title: 'License',
    category: 'community',
    icon: '📜',
    desc: 'Software distribution license notice (MIT, Apache, GPL, etc.) and copyright holder.',
    tags: ['license', 'mit', 'apache', 'copyright']
  },
  {
    type: SECTION_TYPES.AUTHOR,
    title: 'Author & Contact',
    category: 'community',
    icon: '👤',
    desc: 'Author bio, email, GitHub badge, Twitter/X, and LinkedIn social links.',
    tags: ['author', 'creator', 'contact', 'socials', 'email']
  },
  {
    type: SECTION_TYPES.CUSTOM,
    title: 'Custom Section',
    category: 'community',
    icon: '✍️',
    desc: 'A flexible, blank markdown canvas for architecture diagrams, notes, or anything else.',
    tags: ['custom', 'markdown', 'freeform', 'blank', 'notes']
  }
];

export function openSectionLibrary() {
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
            ➕
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
          <span class="absolute left-2.5 top-2.5 text-muted-foreground text-xs pointer-events-none">🔍</span>
          <input 
            type="text" 
            id="lib-search-input" 
            value="${catalogSearchQuery}"
            placeholder="Search sections: FAQ, Benchmarks, API, Structure..." 
            class="form-input text-xs pl-7 pr-3 h-8 w-full" 
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
            <p class="text-lg">🔍</p>
            <p>No matching sections found for "${catalogSearchQuery}".</p>
            <button id="lib-clear-search-btn" class="text-xs text-foreground underline pt-1">Clear search filter</button>
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
                        <span class="text-base">${item.icon}</span>
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
        const newId = store.addSectionFromType(type, title);
        closeSectionLibrary();
        fireConfetti();
        showToast(`Added "${title}" to your README!`, 'success');
      }
    });
  });
}
