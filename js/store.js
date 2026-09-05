/**
 * Readmify - Central Reactive State Store
 * Manages section order, user edits, templates, and localStorage persistence
 */
import { INITIAL_SECTIONS, SECTION_TYPES } from './data/defaultSections.js';
import { TEMPLATES } from './data/templates.js';

const STORAGE_KEY = 'readmify_v1_state';

class ReadmifyStore {
  constructor() {
    this.listeners = new Set();
    this.state = this.loadInitialState();
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
            viewMode: parsed.viewMode || 'split'
          };
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
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

  notify() {
    this.saveToStorage();
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (err) {
        console.error('Error in store listener:', err);
      }
    }
  }

  // --- ACTIONS ---

  setActiveSection(sectionId) {
    if (this.state.activeSectionId !== sectionId) {
      this.state.activeSectionId = sectionId;
      this.notify();
    }
  }

  setPreviewTheme(theme) {
    if (this.state.previewTheme !== theme) {
      this.state.previewTheme = theme;
      this.notify();
    }
  }

  setViewMode(viewMode) {
    if (this.state.viewMode !== viewMode) {
      this.state.viewMode = viewMode;
      this.notify();
    }
  }

  toggleSection(sectionId, enabled) {
    const section = this.state.sections.find(s => s.id === sectionId);
    if (section) {
      section.enabled = enabled !== undefined ? enabled : !section.enabled;
      this.notify();
    }
  }

  updateSectionData(sectionId, partialData) {
    const section = this.state.sections.find(s => s.id === sectionId);
    if (section) {
      section.data = { ...section.data, ...partialData };
      this.notify();
    }
  }

  moveSection(sectionId, direction) {
    const index = this.state.sections.findIndex(s => s.id === sectionId);
    if (index === -1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= this.state.sections.length) return;

    const [item] = this.state.sections.splice(index, 1);
    this.state.sections.splice(targetIndex, 0, item);
    this.notify();
  }

  reorderSections(fromIndex, toIndex) {
    if (fromIndex === toIndex) return;
    if (fromIndex < 0 || fromIndex >= this.state.sections.length) return;
    if (toIndex < 0 || toIndex >= this.state.sections.length) return;

    const [item] = this.state.sections.splice(fromIndex, 1);
    this.state.sections.splice(toIndex, 0, item);
    this.notify();
  }

  addCustomSection(title = 'Custom Section') {
    const newId = `sec-custom-${Date.now()}`;
    const newSection = {
      id: newId,
      type: SECTION_TYPES.CUSTOM,
      title: title || 'Custom Section',
      enabled: true,
      data: {
        heading: title || 'Custom Section',
        markdown: 'Add your custom documentation, diagrams, or notes here.'
      }
    };
    this.state.sections.push(newSection);
    this.state.activeSectionId = newId;
    this.notify();
    return newId;
  }

  removeSection(sectionId) {
    const idx = this.state.sections.findIndex(s => s.id === sectionId);
    if (idx !== -1) {
      this.state.sections.splice(idx, 1);
      if (this.state.activeSectionId === sectionId) {
        this.state.activeSectionId = this.state.sections[0]?.id || null;
      }
      this.notify();
    }
  }

  loadTemplate(templateId) {
    const tpl = TEMPLATES.find(t => t.id === templateId);
    if (tpl) {
      this.state.sections = JSON.parse(JSON.stringify(tpl.sections));
      this.state.activeSectionId = this.state.sections[0]?.id || null;
      this.notify();
    }
  }

  resetToDefault() {
    this.state.sections = JSON.parse(JSON.stringify(INITIAL_SECTIONS));
    this.state.activeSectionId = INITIAL_SECTIONS[0].id;
    this.notify();
  }

  // Update multiple sections (e.g. from wizard)
  batchUpdate(updaterFn) {
    updaterFn(this.state.sections);
    this.notify();
  }
}

export const store = new ReadmifyStore();
