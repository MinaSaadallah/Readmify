/**
 * Readmify - Central Reactive State Store
 * Manages section order, user edits, templates, and localStorage persistence
 */
import { INITIAL_SECTIONS, SECTION_TYPES, createSection } from './data/defaultSections.js';
import { TEMPLATES } from './data/templates.js';

const STORAGE_KEY = 'readmify_v1_state';

class ReadmifyStore {
  constructor() {
    this.listeners = new Set();
    this.state = this.loadInitialState();
  }

  loadInitialState() {
    try {
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed.sections) && parsed.sections.length > 0) {
            return {
              sections: parsed.sections,
              activeSectionId: parsed.activeSectionId || parsed.sections[0].id,
              previewTheme: parsed.previewTheme || 'dark',
              viewMode: parsed.viewMode || 'split'
            };
          }
        }
      }
    } catch (e) {
      console.warn('Could not restore saved state from localStorage:', e);
    }

    return {
      sections: JSON.parse(JSON.stringify(INITIAL_SECTIONS)),
      activeSectionId: INITIAL_SECTIONS[0].id,
      previewTheme: 'dark',
      viewMode: 'split'
    };
  }

  saveToStorage() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      }
    } catch (e) {
      console.warn('Could not persist state to localStorage:', e);
    }
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(meta = {}) {
    this.saveToStorage();
    for (const listener of this.listeners) {
      try {
        listener(this.state, meta);
      } catch (err) {
        console.error('Error in store listener:', err);
      }
    }
  }

  // --- ACTIONS ---

  setActiveSection(sectionId) {
    if (this.state.activeSectionId !== sectionId) {
      this.state.activeSectionId = sectionId;
      this.notify({ type: 'SET_ACTIVE_SECTION', sectionId, force: true });
    }
  }

  setPreviewTheme(theme) {
    if (this.state.previewTheme !== theme) {
      this.state.previewTheme = theme;
      this.notify({ type: 'SET_THEME', theme });
    }
  }

  setViewMode(viewMode) {
    if (this.state.viewMode !== viewMode) {
      this.state.viewMode = viewMode;
      this.notify({ type: 'SET_VIEW_MODE', viewMode });
    }
  }

  toggleSection(sectionId, enabled) {
    const section = this.state.sections.find(s => s.id === sectionId);
    if (section) {
      section.enabled = enabled !== undefined ? enabled : !section.enabled;
      this.notify({ type: 'TOGGLE_SECTION', sectionId, enabled: section.enabled, force: true });
    }
  }

  updateSectionData(sectionId, partialData) {
    const section = this.state.sections.find(s => s.id === sectionId);
    if (section) {
      section.data = { ...section.data, ...partialData };
      this.notify({ type: 'UPDATE_SECTION_DATA', sectionId, partialData });
    }
  }

  moveSection(sectionId, direction) {
    const index = this.state.sections.findIndex(s => s.id === sectionId);
    if (index === -1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= this.state.sections.length) return;

    const [item] = this.state.sections.splice(index, 1);
    this.state.sections.splice(targetIndex, 0, item);
    this.notify({ type: 'MOVE_SECTION', force: true });
  }

  reorderSections(fromIndex, toIndex) {
    if (fromIndex === toIndex) return;
    if (fromIndex < 0 || fromIndex >= this.state.sections.length) return;
    if (toIndex < 0 || toIndex >= this.state.sections.length) return;

    const [item] = this.state.sections.splice(fromIndex, 1);
    this.state.sections.splice(toIndex, 0, item);
    this.notify({ type: 'REORDER_SECTIONS', force: true });
  }

  addCustomSection(title = 'Custom Section') {
    return this.addSectionFromType(SECTION_TYPES.CUSTOM, title);
  }

  addSectionFromType(type, customTitle) {
    // Check if single-instance section already exists but is disabled
    const existing = this.state.sections.find(s => s.type === type && type !== SECTION_TYPES.CUSTOM);
    if (existing) {
      existing.enabled = true;
      if (customTitle) {
        existing.title = customTitle;
        if (existing.data && existing.data.heading) existing.data.heading = customTitle;
      }
      this.state.activeSectionId = existing.id;
      this.notify({ type: 'ADD_SECTION', sectionId: existing.id, force: true });
      return existing.id;
    }

    const newSection = createSection(type, customTitle);
    this.state.sections.push(newSection);
    this.state.activeSectionId = newSection.id;
    this.notify({ type: 'ADD_SECTION', sectionId: newSection.id, force: true });
    return newSection.id;
  }

  duplicateSection(sectionId) {
    const index = this.state.sections.findIndex(s => s.id === sectionId);
    if (index === -1) return null;

    const orig = this.state.sections[index];
    const cloned = JSON.parse(JSON.stringify(orig));
    cloned.id = `sec-${cloned.type}-${Date.now().toString(36)}`;
    cloned.title = `${orig.title} (Copy)`;
    if (cloned.data && cloned.data.heading) {
      cloned.data.heading = `${cloned.data.heading} (Copy)`;
    }
    cloned.enabled = true;

    this.state.sections.splice(index + 1, 0, cloned);
    this.state.activeSectionId = cloned.id;
    this.notify({ type: 'DUPLICATE_SECTION', sectionId: cloned.id, force: true });
    return cloned.id;
  }

  renameSection(sectionId, newTitle) {
    const sec = this.state.sections.find(s => s.id === sectionId);
    if (sec && newTitle && newTitle.trim()) {
      sec.title = newTitle.trim();
      if (sec.data && typeof sec.data.heading === 'string') {
        sec.data.heading = newTitle.trim();
      }
      this.notify({ type: 'RENAME_SECTION', sectionId, newTitle: sec.title });
    }
  }

  removeSection(sectionId) {
    const idx = this.state.sections.findIndex(s => s.id === sectionId);
    if (idx !== -1) {
      this.state.sections.splice(idx, 1);
      if (this.state.activeSectionId === sectionId) {
        this.state.activeSectionId = this.state.sections[0]?.id || null;
      }
      this.notify({ type: 'REMOVE_SECTION', sectionId, force: true });
    }
  }

  loadTemplate(templateId) {
    const tpl = TEMPLATES.find(t => t.id === templateId);
    if (tpl) {
      this.state.sections = JSON.parse(JSON.stringify(tpl.sections));
      this.state.activeSectionId = this.state.sections[0]?.id || null;
      this.notify({ type: 'LOAD_TEMPLATE', templateId, force: true });
    }
  }

  resetToDefault() {
    this.state.sections = JSON.parse(JSON.stringify(INITIAL_SECTIONS));
    this.state.activeSectionId = INITIAL_SECTIONS[0].id;
    this.notify({ type: 'RESET_DEFAULT', force: true });
  }

  // Update multiple sections (e.g. from wizard or deep scanner)
  batchUpdate(updaterFn) {
    updaterFn(this.state.sections);
    this.notify({ type: 'BATCH_UPDATE', force: true });
  }

  // Apply complete deep repository analysis across all relevant sections
  applyRepoAnalysis(analysis) {
    if (!analysis) return;

    this.batchUpdate(sections => {
      // 1. Hero
      const hero = sections.find(s => s.type === SECTION_TYPES.HERO);
      if (hero) {
        hero.enabled = true;
        hero.data.projectName = analysis.repo || hero.data.projectName;
        hero.data.tagline = analysis.description || hero.data.tagline;
        hero.data.repoOwner = analysis.owner || hero.data.repoOwner;
        hero.data.repoName = analysis.repo || hero.data.repoName;
      }

      // 2. Badges
      const badges = sections.find(s => s.type === SECTION_TYPES.BADGES);
      if (badges) {
        badges.enabled = true;
        badges.data.showStars = true;
        badges.data.showForks = true;
        badges.data.showIssues = true;
        badges.data.showLicense = !!analysis.license;
        badges.data.showRelease = true;
        badges.data.showLastCommit = true;

        if (Array.isArray(analysis.workflowBadges) && analysis.workflowBadges.length > 0) {
          badges.data.customBadges = analysis.workflowBadges.map(wb => ({
            label: 'CI',
            message: 'Passing',
            color: 'brightgreen',
            logo: 'githubactions'
          }));
        }
      }

      // 3. About
      const about = sections.find(s => s.type === SECTION_TYPES.ABOUT);
      if (about) {
        about.enabled = true;
        const desc = analysis.description ? `${analysis.description}\n\n` : '';
        const topics = Array.isArray(analysis.topics) && analysis.topics.length > 0
          ? `**Key topics**: ${analysis.topics.map(t => `\`${t}\``).join(', ')}.\n\n`
          : '';
        about.data.content = `${desc}${topics}Engineered for high performance, reliability, and clean developer workflows.`;
      }

      // 4. Tech Stack
      const tech = sections.find(s => s.type === SECTION_TYPES.TECH_STACK);
      if (tech) {
        tech.enabled = true;
        if (Array.isArray(analysis.matchedTechIds) && analysis.matchedTechIds.length > 0) {
          tech.data.technologies = Array.from(new Set(analysis.matchedTechIds));
        }
      }

      // 5. Features
      const features = sections.find(s => s.type === SECTION_TYPES.FEATURES);
      if (features) {
        features.enabled = true;
        if (Array.isArray(analysis.features) && analysis.features.length > 0) {
          features.data.items = analysis.features;
        }
      }

      // 6. Project Structure
      const structure = sections.find(s => s.type === SECTION_TYPES.PROJECT_STRUCTURE);
      if (structure) {
        if (analysis.projectTree && analysis.projectTree.trim().length > 0) {
          structure.enabled = true;
          structure.data.tree = analysis.projectTree;
        } else {
          structure.enabled = false;
        }
      }

      // 7. Installation
      const install = sections.find(s => s.type === SECTION_TYPES.INSTALLATION);
      if (install) {
        install.enabled = true;
        if (analysis.prerequisites) {
          install.data.prerequisites = analysis.prerequisites;
        }
        if (Array.isArray(analysis.installSteps) && analysis.installSteps.length > 0) {
          install.data.steps = analysis.installSteps;
        }
        if (analysis.packageManager) {
          install.data.packageManager = analysis.packageManager;
        }
      }

      // 8. Environment Variables
      const env = sections.find(s => s.type === SECTION_TYPES.ENV_VARS);
      if (env) {
        if (Array.isArray(analysis.envVars) && analysis.envVars.length > 0) {
          env.enabled = true;
          env.data.variables = analysis.envVars;
        } else {
          env.enabled = false;
        }
      }

      // 9. License
      const license = sections.find(s => s.type === SECTION_TYPES.LICENSE);
      if (license) {
        license.enabled = true;
        if (analysis.license && analysis.license !== 'NOASSERTION') {
          license.data.type = analysis.license;
        }
        if (analysis.owner) {
          license.data.holder = analysis.owner;
        }
      }

      // 10. Author
      const author = sections.find(s => s.type === SECTION_TYPES.AUTHOR);
      if (author) {
        author.enabled = true;
        if (analysis.owner) {
          author.data.name = analysis.owner;
          author.data.github = analysis.owner;
        }
      }
    });

    if (this.state.sections[0]) {
      this.state.activeSectionId = this.state.sections[0].id;
    }
    this.notify({ type: 'APPLY_REPO_ANALYSIS', force: true });
  }
}

export const store = new ReadmifyStore();
