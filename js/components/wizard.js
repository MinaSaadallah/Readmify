/**
 * Readmify - 3-Minute Quick Wizard (shadcn/ui style)
 */
import { store } from '../store.js';
import { SECTION_TYPES } from '../data/defaultSections.js';
import { TECH_CATALOG } from '../data/techCatalog.js';
import { fireConfetti, showToast } from '../utils/exportUtils.js';

let currentStep = 1;
const TOTAL_STEPS = 5;

let wizardData = {
  projectName: '',
  tagline: '',
  repoOwner: '',
  repoName: '',
  align: 'center',
  badges: {
    showStars: true,
    showForks: true,
    showIssues: true,
    showLicense: true,
    showRelease: true,
    style: 'for-the-badge'
  },
  technologies: ['javascript', 'html5', 'css3', 'git'],
  features: [
    { icon: '⚡', title: 'Lightning Fast', desc: 'Built for speed with minimal overhead.' },
    { icon: '🔒', title: 'Secure & Private', desc: 'Runs entirely in your browser with zero tracking.' },
    { icon: '🎯', title: 'Easy to Use', desc: 'Designed for beginners and pros alike.' }
  ],
  packageManager: 'npm',
  licenseType: 'MIT',
  authorName: ''
};

export function openWizard() {
  currentStep = 1;
  const state = store.getState();
  const hero = state.sections.find(s => s.type === SECTION_TYPES.HERO);
  if (hero?.data?.projectName && hero.data.projectName !== 'Project Title') {
    wizardData.projectName = hero.data.projectName;
    wizardData.tagline = hero.data.tagline || '';
    wizardData.repoOwner = hero.data.repoOwner || '';
    wizardData.repoName = hero.data.repoName || '';
  }

  let modal = document.getElementById('quick-wizard-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'quick-wizard-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs';
    document.body.appendChild(modal);
  }

  renderWizardStep();
  modal.classList.remove('hidden');
}

export function closeWizard() {
  const modal = document.getElementById('quick-wizard-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function renderWizardStep() {
  const modal = document.getElementById('quick-wizard-modal');
  if (!modal) return;

  const progressPercent = Math.round((currentStep / TOTAL_STEPS) * 100);

  modal.innerHTML = `
    <div class="bg-card border border-border rounded-lg w-full max-w-xl shadow-2xl flex flex-col overflow-hidden">
      <!-- Wizard Top Header -->
      <div class="px-5 py-3.5 border-b border-border bg-card flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-md bg-muted border border-border flex items-center justify-center text-foreground font-semibold text-xs">
            🪄
          </div>
          <div>
            <h3 class="text-xs font-semibold text-foreground">3-Minute Quick Wizard</h3>
            <p class="text-[11px] text-muted-foreground">Step ${currentStep} of ${TOTAL_STEPS}: ${getStepTitle(currentStep)}</p>
          </div>
        </div>
        <button id="close-wizard-btn" class="text-muted-foreground hover:text-foreground text-xs p-1">✕</button>
      </div>

      <!-- Progress Bar -->
      <div class="w-full bg-border h-0.5">
        <div class="bg-foreground h-0.5 transition-all duration-300" style="width: ${progressPercent}%"></div>
      </div>

      <!-- Step Content Area -->
      <div class="p-5 overflow-y-auto max-h-[60vh] space-y-3.5 bg-background">
        ${getStepHtml(currentStep)}
      </div>

      <!-- Wizard Bottom Navigation -->
      <div class="px-5 py-3 border-t border-border bg-card flex items-center justify-between">
        <button id="wizard-prev-btn" class="btn-secondary text-xs ${currentStep === 1 ? 'invisible' : ''}">
          ← Back
        </button>
        <div class="flex items-center gap-2">
          ${currentStep < TOTAL_STEPS ? `
            <button id="wizard-next-btn" class="btn-primary text-xs px-3.5 py-1.5">
              Next Step →
            </button>
          ` : `
            <button id="wizard-finish-btn" class="btn-primary text-xs px-4 py-1.5">
              ✨ Finish & Generate
            </button>
          `}
        </div>
      </div>
    </div>
  `;

  modal.querySelector('#close-wizard-btn')?.addEventListener('click', closeWizard);

  const prevBtn = modal.querySelector('#wizard-prev-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      saveStepData(currentStep);
      if (currentStep > 1) {
        currentStep--;
        renderWizardStep();
      }
    });
  }

  const nextBtn = modal.querySelector('#wizard-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      saveStepData(currentStep);
      if (currentStep < TOTAL_STEPS) {
        currentStep++;
        renderWizardStep();
      }
    });
  }

  const finishBtn = modal.querySelector('#wizard-finish-btn');
  if (finishBtn) {
    finishBtn.addEventListener('click', () => {
      saveStepData(currentStep);
      applyWizardDataToStore();
      closeWizard();
      fireConfetti();
      showToast('README generated successfully!', 'success');
    });
  }

  attachStepSpecificListeners(currentStep, modal);
}

function getStepTitle(step) {
  switch (step) {
    case 1: return 'Project Identity';
    case 2: return 'Badges & Stats';
    case 3: return 'Tech Stack';
    case 4: return 'Key Features';
    case 5: return 'Installation & License';
    default: return '';
  }
}

function getStepHtml(step) {
  switch (step) {
    case 1:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1.5">Project Name</label>
          <input type="text" id="wiz-project-name" value="${wizardData.projectName}" placeholder="e.g. MyAwesomeApp" class="form-input text-xs" />
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1.5">Tagline / Short Description</label>
          <input type="text" id="wiz-tagline" value="${wizardData.tagline}" placeholder="e.g. Fast, reliable web application" class="form-input text-xs" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1.5">GitHub Username / Org</label>
            <input type="text" id="wiz-repo-owner" value="${wizardData.repoOwner}" placeholder="e.g. yourname" class="form-input text-xs" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1.5">Repository Name</label>
            <input type="text" id="wiz-repo-name" value="${wizardData.repoName}" placeholder="e.g. my-project" class="form-input text-xs" />
          </div>
        </div>
      `;

    case 2:
      return `
        <p class="text-xs text-muted-foreground">Select automated badges for the top of your README:</p>
        <div class="grid grid-cols-2 gap-2 p-3 bg-card border border-border rounded-md">
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" id="wiz-badge-stars" ${wizardData.badges.showStars ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>GitHub Stars</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" id="wiz-badge-forks" ${wizardData.badges.showForks ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>GitHub Forks</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" id="wiz-badge-issues" ${wizardData.badges.showIssues ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>Open Issues</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" id="wiz-badge-license" ${wizardData.badges.showLicense ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>License Badge</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" id="wiz-badge-release" ${wizardData.badges.showRelease ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>Latest Release</span>
          </label>
        </div>
      `;

    case 3:
      return `
        <div class="flex items-center justify-between">
          <p class="text-xs text-muted-foreground">Click to toggle project technologies:</p>
          <span class="text-xs font-medium text-foreground" id="wiz-tech-count">${wizardData.technologies.length} selected</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2.5 bg-card border border-border rounded-md max-h-56 overflow-y-auto">
          ${TECH_CATALOG.slice(0, 36).map(item => {
            const isSel = wizardData.technologies.includes(item.id);
            return `
              <div class="wiz-tech-chip flex items-center justify-between p-2 rounded-md border text-xs cursor-pointer select-none transition ${isSel ? 'bg-muted border-foreground/60 text-foreground font-medium ring-1 ring-ring' : 'bg-background border-border text-muted-foreground hover:text-foreground'}" data-id="${item.id}">
                <span class="truncate">${item.name}</span>
                <span class="text-[10px] ${isSel ? 'text-foreground' : 'text-transparent'}">✓</span>
              </div>
            `;
          }).join('')}
        </div>
      `;

    case 4:
      return `
        <div class="flex items-center justify-between">
          <p class="text-xs text-muted-foreground">List key project highlights:</p>
          <button id="wiz-add-feature-btn" class="text-xs text-foreground hover:underline font-medium">+ Add</button>
        </div>
        <div id="wiz-features-list" class="space-y-2">
          ${wizardData.features.map((f, i) => `
            <div class="flex items-center gap-2 p-2 bg-card border border-border rounded-md" data-wiz-f-idx="${i}">
              <input type="text" class="wiz-f-icon w-8 text-center bg-background border border-border rounded text-xs py-1" value="${f.icon || '✨'}" />
              <input type="text" class="wiz-f-title form-input py-1 text-xs flex-1" value="${f.title || ''}" placeholder="Feature Title" />
              <input type="text" class="wiz-f-desc form-input py-1 text-xs flex-1" value="${f.desc || ''}" placeholder="Short description" />
              <button class="wiz-f-remove text-muted-foreground hover:text-rose-400 text-xs px-1">×</button>
            </div>
          `).join('')}
        </div>
      `;

    case 5:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1.5">Package Manager / Quickstart</label>
          <select id="wiz-package-manager" class="form-input text-xs">
            <option value="npm" ${wizardData.packageManager === 'npm' ? 'selected' : ''}>Node.js / npm (npm install && npm start)</option>
            <option value="pnpm" ${wizardData.packageManager === 'pnpm' ? 'selected' : ''}>pnpm (pnpm install && pnpm dev)</option>
            <option value="pip" ${wizardData.packageManager === 'pip' ? 'selected' : ''}>Python / pip (pip install -r requirements.txt)</option>
            <option value="cargo" ${wizardData.packageManager === 'cargo' ? 'selected' : ''}>Rust / Cargo (cargo build --release)</option>
            <option value="docker" ${wizardData.packageManager === 'docker' ? 'selected' : ''}>Docker (docker compose up -d)</option>
            <option value="static" ${wizardData.packageManager === 'static' ? 'selected' : ''}>Static HTML (Open index.html directly)</option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1.5">Open Source License</label>
            <select id="wiz-license" class="form-input text-xs">
              <option value="MIT" ${wizardData.licenseType === 'MIT' ? 'selected' : ''}>MIT License</option>
              <option value="Apache-2.0" ${wizardData.licenseType === 'Apache-2.0' ? 'selected' : ''}>Apache 2.0</option>
              <option value="GPL-3.0" ${wizardData.licenseType === 'GPL-3.0' ? 'selected' : ''}>GNU GPL v3</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1.5">Author Name</label>
            <input type="text" id="wiz-author" value="${wizardData.authorName}" placeholder="Your Name" class="form-input text-xs" />
          </div>
        </div>
      `;

    default:
      return '';
  }
}

function saveStepData(step) {
  const modal = document.getElementById('quick-wizard-modal');
  if (!modal) return;

  if (step === 1) {
    wizardData.projectName = modal.querySelector('#wiz-project-name')?.value || 'My Project';
    wizardData.tagline = modal.querySelector('#wiz-tagline')?.value || '';
    wizardData.repoOwner = modal.querySelector('#wiz-repo-owner')?.value || 'username';
    wizardData.repoName = modal.querySelector('#wiz-repo-name')?.value || 'repo';
  } else if (step === 2) {
    wizardData.badges.showStars = modal.querySelector('#wiz-badge-stars')?.checked ?? true;
    wizardData.badges.showForks = modal.querySelector('#wiz-badge-forks')?.checked ?? true;
    wizardData.badges.showIssues = modal.querySelector('#wiz-badge-issues')?.checked ?? true;
    wizardData.badges.showLicense = modal.querySelector('#wiz-badge-license')?.checked ?? true;
    wizardData.badges.showRelease = modal.querySelector('#wiz-badge-release')?.checked ?? true;
  } else if (step === 4) {
    const list = modal.querySelectorAll('[data-wiz-f-idx]');
    const features = [];
    list.forEach(row => {
      features.push({
        icon: row.querySelector('.wiz-f-icon')?.value || '✨',
        title: row.querySelector('.wiz-f-title')?.value || 'Feature',
        desc: row.querySelector('.wiz-f-desc')?.value || ''
      });
    });
    if (features.length > 0) {
      wizardData.features = features;
    }
  } else if (step === 5) {
    wizardData.packageManager = modal.querySelector('#wiz-package-manager')?.value || 'npm';
    wizardData.licenseType = modal.querySelector('#wiz-license')?.value || 'MIT';
    wizardData.authorName = modal.querySelector('#wiz-author')?.value || 'Your Name';
  }
}

function attachStepSpecificListeners(step, modal) {
  if (step === 3) {
    modal.querySelectorAll('.wiz-tech-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const id = chip.dataset.id;
        const idx = wizardData.technologies.indexOf(id);
        if (idx !== -1) {
          wizardData.technologies.splice(idx, 1);
        } else {
          wizardData.technologies.push(id);
        }
        renderWizardStep();
      });
    });
  } else if (step === 4) {
    const addBtn = modal.querySelector('#wiz-add-feature-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        wizardData.features.push({ icon: '✨', title: 'New Highlight', desc: 'Description' });
        renderWizardStep();
      });
    }

    modal.querySelectorAll('.wiz-f-remove').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        wizardData.features.splice(idx, 1);
        renderWizardStep();
      });
    });
  }
}

function applyWizardDataToStore() {
  store.batchUpdate(sections => {
    const hero = sections.find(s => s.type === SECTION_TYPES.HERO);
    if (hero) {
      hero.enabled = true;
      hero.data.projectName = wizardData.projectName;
      hero.data.tagline = wizardData.tagline;
      hero.data.repoOwner = wizardData.repoOwner;
      hero.data.repoName = wizardData.repoName;
    }

    const badges = sections.find(s => s.type === SECTION_TYPES.BADGES);
    if (badges) {
      badges.enabled = true;
      badges.data.showStars = wizardData.badges.showStars;
      badges.data.showForks = wizardData.badges.showForks;
      badges.data.showIssues = wizardData.badges.showIssues;
      badges.data.showLicense = wizardData.badges.showLicense;
      badges.data.showRelease = wizardData.badges.showRelease;
    }

    const tech = sections.find(s => s.type === SECTION_TYPES.TECH_STACK);
    if (tech) {
      tech.enabled = true;
      tech.data.technologies = [...wizardData.technologies];
    }

    const feat = sections.find(s => s.type === SECTION_TYPES.FEATURES);
    if (feat) {
      feat.enabled = true;
      feat.data.items = [...wizardData.features];
    }

    const install = sections.find(s => s.type === SECTION_TYPES.INSTALLATION);
    if (install) {
      install.enabled = true;
      const pm = wizardData.packageManager;
      if (pm === 'npm') {
        install.data.steps = [
          { title: 'Clone the repository', cmd: `git clone https://github.com/${wizardData.repoOwner}/${wizardData.repoName}.git` },
          { title: 'Install dependencies', cmd: 'npm install' },
          { title: 'Start the app', cmd: 'npm start' }
        ];
      } else if (pm === 'pip') {
        install.data.steps = [
          { title: 'Clone the repository', cmd: `git clone https://github.com/${wizardData.repoOwner}/${wizardData.repoName}.git` },
          { title: 'Install packages', cmd: 'pip install -r requirements.txt' },
          { title: 'Run app', cmd: 'python main.py' }
        ];
      } else {
        install.data.steps = [
          { title: 'Clone the repository', cmd: `git clone https://github.com/${wizardData.repoOwner}/${wizardData.repoName}.git` },
          { title: 'Open in browser', cmd: '# Open index.html directly' }
        ];
      }
    }

    const lic = sections.find(s => s.type === SECTION_TYPES.LICENSE);
    if (lic) {
      lic.enabled = true;
      lic.data.type = wizardData.licenseType;
      lic.data.holder = wizardData.authorName || 'Your Name';
    }

    const auth = sections.find(s => s.type === SECTION_TYPES.AUTHOR);
    if (auth && wizardData.authorName) {
      auth.data.name = wizardData.authorName;
      auth.data.github = wizardData.repoOwner;
    }
  });
}
