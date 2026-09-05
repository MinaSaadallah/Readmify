/**
 * Central reactive state store. Single unconditional subscribe path —
 * no debounce branch is needed here because the editing surface is plain
 * form inputs, not contenteditable, so there's no cursor/focus to protect.
 */
import { INITIAL_SECTIONS, SECTION_TYPES, createSection } from './data/defaultSections.js';
import { TEMPLATES } from './data/templates.js';

const STORAGE_KEY = 'readmify_v2_state';

class ReadmifyStore {
  constructor() {
    this.listeners = new Set();
    this.state = this.loadInitialState();
    this._saveTimer = null;
    this._undoStack = [];
  }

  loadInitialState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.sections) && parsed.sections.length > 0) {
          return {
            sections: parsed.sections,
            activeSectionId: parsed.activeSectionId || parsed.sections[0].id,
            previewTheme: parsed.previewTheme || 'dark',
            viewMode: parsed.viewMode || 'editor'
          };
        }
      }
    } catch (e) {
      console.warn('Could not restore saved state:', e);
    }
    return {
      sections: JSON.parse(JSON.stringify(INITIAL_SECTIONS)),
      activeSectionId: INITIAL_SECTIONS[0].id,
      previewTheme: 'dark',
      viewMode: 'editor'
    };
  }

  getState() { return this.state; }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  notify(meta = {}) {
    for (const fn of this.listeners) fn(this.state, meta);
    this.scheduleSave();
  }

  scheduleSave() {
    if (this._saveTimer) clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => this.saveToStorage(), 500);
  }

  flushSave() {
    if (this._saveTimer) { clearTimeout(this._saveTimer); this._saveTimer = null; }
    this.saveToStorage();
  }

  saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        sections: this.state.sections,
        activeSectionId: this.state.activeSectionId,
        previewTheme: this.state.previewTheme,
        viewMode: this.state.viewMode
      }));
    } catch (e) { console.warn('Could not save state:', e); }
  }

  setViewMode(viewMode) {
    if (this.state.viewMode === viewMode) return;
    this.state.viewMode = viewMode;
    this.notify({ type: 'SET_VIEW_MODE' });
  }

  setPreviewTheme(theme) {
    if (this.state.previewTheme === theme) return;
    this.state.previewTheme = theme;
    this.notify({ type: 'SET_THEME' });
  }

  setActiveSection(id) {
    this.state.activeSectionId = id;
    this.notify({ type: 'SET_ACTIVE_SECTION' });
  }

  findSection(id) {
    return this.state.sections.find(s => s.id === id);
  }

  updateSectionData(id, partialData) {
    const section = this.findSection(id);
    if (!section) return;
    section.data = { ...section.data, ...partialData };
    this.notify({ type: 'UPDATE_SECTION_DATA', sectionId: id });
  }

  renameSection(id, title) {
    const section = this.findSection(id);
    if (!section) return;
    section.title = title;
    this.notify({ type: 'RENAME_SECTION', sectionId: id });
  }

  toggleSection(id, enabled) {
    const section = this.findSection(id);
    if (!section) return;
    section.enabled = enabled !== undefined ? enabled : !section.enabled;
    this.notify({ type: 'TOGGLE_SECTION', sectionId: id });
  }

  moveSection(id, direction) {
    const idx = this.state.sections.findIndex(s => s.id === id);
    if (idx === -1) return;
    const target = direction === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= this.state.sections.length) return;
    const [item] = this.state.sections.splice(idx, 1);
    this.state.sections.splice(target, 0, item);
    this.notify({ type: 'MOVE_SECTION' });
  }

  reorderSections(fromIndex, toIndex) {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
    if (fromIndex >= this.state.sections.length || toIndex >= this.state.sections.length) return;
    const [item] = this.state.sections.splice(fromIndex, 1);
    this.state.sections.splice(toIndex, 0, item);
    this.notify({ type: 'REORDER_SECTIONS' });
  }

  addSectionFromType(type, customTitle, insertIndex = null) {
    const existing = type !== SECTION_TYPES.CUSTOM ? this.state.sections.find(s => s.type === type) : null;
    if (existing) {
      existing.enabled = true;
      this.state.activeSectionId = existing.id;
      this.notify({ type: 'ADD_SECTION', sectionId: existing.id });
      return existing.id;
    }
    const section = createSection(type, customTitle);
    if (typeof insertIndex === 'number' && insertIndex >= 0 && insertIndex <= this.state.sections.length) {
      this.state.sections.splice(insertIndex, 0, section);
    } else {
      this.state.sections.push(section);
    }
    this.state.activeSectionId = section.id;
    this.notify({ type: 'ADD_SECTION', sectionId: section.id });
    return section.id;
  }

  duplicateSection(id) {
    const section = this.findSection(id);
    if (!section) return null;
    const idx = this.state.sections.findIndex(s => s.id === id);
    const clone = JSON.parse(JSON.stringify(section));
    clone.id = createSection(section.type).id;
    clone.title = `${section.title} (Copy)`;
    this.state.sections.splice(idx + 1, 0, clone);
    this.notify({ type: 'DUPLICATE_SECTION' });
    return clone.id;
  }

  removeSection(id) {
    const idx = this.state.sections.findIndex(s => s.id === id);
    if (idx === -1) return;
    const [removed] = this.state.sections.splice(idx, 1);
    this._undoStack.push({ section: removed, index: idx });
    if (this._undoStack.length > 10) this._undoStack.shift();
    this.notify({ type: 'REMOVE_SECTION' });
  }

  undoRemoveSection() {
    const last = this._undoStack.pop();
    if (!last) return;
    const target = Math.min(last.index, this.state.sections.length);
    this.state.sections.splice(target, 0, last.section);
    this.notify({ type: 'UNDO_REMOVE' });
  }

  addCustomSection(title = 'Custom Section') {
    return this.addSectionFromType(SECTION_TYPES.CUSTOM, title);
  }

  loadTemplate(templateId) {
    const tpl = TEMPLATES.find(t => t.id === templateId);
    if (!tpl) return;
    this.state.sections = JSON.parse(JSON.stringify(tpl.sections));
    this.state.activeSectionId = this.state.sections[0]?.id;
    this.notify({ type: 'LOAD_TEMPLATE' });
  }

  resetToDefault() {
    this.state.sections = JSON.parse(JSON.stringify(INITIAL_SECTIONS));
    this.state.activeSectionId = this.state.sections[0]?.id;
    this.notify({ type: 'RESET' });
  }

  applyRepoAnalysis(info) {
    const hero = this.state.sections.find(s => s.type === SECTION_TYPES.HERO);
    if (hero) {
      hero.data.repoOwner = info.owner;
      hero.data.repoName = info.repo;
      hero.data.projectName = hero.data.projectName === 'My Project' ? info.repo : hero.data.projectName;
      if (info.description) hero.data.tagline = info.description;
    }
    const about = this.state.sections.find(s => s.type === SECTION_TYPES.ABOUT);
    if (about && info.description) about.data.content = info.description;

    if (info.matchedTechIds?.length) {
      const tech = this.state.sections.find(s => s.type === SECTION_TYPES.TECH_STACK);
      if (tech) tech.data.technologies = Array.from(new Set([...(tech.data.technologies || []), ...info.matchedTechIds]));
    }
    if (info.installSteps?.length) {
      const install = this.state.sections.find(s => s.type === SECTION_TYPES.INSTALLATION);
      if (install) install.data.steps = info.installSteps;
    }
    if (info.license) {
      const lic = this.state.sections.find(s => s.type === SECTION_TYPES.LICENSE);
      if (lic) lic.data.type = info.license;
    }
    this.notify({ type: 'APPLY_REPO_ANALYSIS' });
  }
}

export const store = new ReadmifyStore();
