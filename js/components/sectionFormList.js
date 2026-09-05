/**
 * The primary (and only) editing surface: a stacked list of plain-form cards,
 * one per section. No contenteditable, no hand-rendered approximation of the
 * markdown — just inputs writing straight into the store. This is what makes
 * "edit matches preview" a guarantee instead of a maintained invariant: the
 * preview pane renders the store's actual data, same as export.
 */
import { store } from '../store.js';
import { SECTION_TYPES, createSection } from '../data/defaultSections.js';
import { TECH_CATALOG, TECH_CATEGORIES, techById } from '../data/techCatalog.js';
import { LICENSE_CATALOG } from '../data/licenses.js';
import { enrichNpmPackage } from '../services/npmApi.js';
import { showToast } from '../utils/exportUtils.js';

const SECTION_LABELS = {
  [SECTION_TYPES.HERO]: 'Header & Title', [SECTION_TYPES.BADGES]: 'Badges',
  [SECTION_TYPES.ABOUT]: 'About', [SECTION_TYPES.TOC]: 'Table of Contents',
  [SECTION_TYPES.TECH_STACK]: 'Built With', [SECTION_TYPES.FEATURES]: 'Features',
  [SECTION_TYPES.DEMO]: 'Demo / Preview', [SECTION_TYPES.INSTALLATION]: 'Installation',
  [SECTION_TYPES.USAGE]: 'Usage', [SECTION_TYPES.ENV_VARS]: 'Environment Variables',
  [SECTION_TYPES.API_REFERENCE]: 'API Reference', [SECTION_TYPES.MERMAID]: 'Diagram (Mermaid)',
  [SECTION_TYPES.FAQ]: 'FAQ', [SECTION_TYPES.ROADMAP]: 'Roadmap',
  [SECTION_TYPES.CONTRIBUTING]: 'Contributing', [SECTION_TYPES.LICENSE]: 'License',
  [SECTION_TYPES.AUTHOR]: 'Author', [SECTION_TYPES.STATS]: 'Stats', [SECTION_TYPES.CUSTOM]: 'Custom Section'
};

let expandedIds = new Set();
let dragFromIndex = null;

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function renderSectionFormList(container, meta = {}) {
  const state = store.getState();

  // Only a live text edit needs its DOM left alone (rebuilding would drop the
  // cursor); every other change (add/remove/duplicate/reorder/toggle/select)
  // must always redraw so it's visible immediately.
  const isTextEdit = meta.type === 'UPDATE_SECTION_DATA' || meta.type === 'RENAME_SECTION';
  const active = document.activeElement;
  const isTypingField = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA') && container.contains(active);
  if (isTextEdit && isTypingField) return;

  container.innerHTML = state.sections.map((section, idx) => renderCard(section, idx, state.activeSectionId)).join('');
  attachListeners(container);
}

function renderCard(section, index, activeSectionId) {
  const collapsed = !expandedIds.has(section.id) && section.id !== activeSectionId;
  const label = SECTION_LABELS[section.type] || section.title;
  return `
    <div class="section-card ${section.enabled ? '' : 'section-card-disabled'}" data-card-id="${section.id}" data-index="${index}">
      <div class="section-card-header" data-id="${section.id}">
        <span class="drag-grip" draggable="true" title="Drag to reorder">⠿</span>
        <button type="button" class="card-collapse-btn" title="${collapsed ? 'Expand' : 'Collapse'}">${collapsed ? '▸' : '▾'}</button>
        <input type="text" class="card-title-input" data-id="${section.id}" value="${esc(section.title)}" title="${esc(label)} section" />
        <label class="card-enable-toggle" title="Show in README">
          <input type="checkbox" class="card-enable-cb" data-id="${section.id}" ${section.enabled ? 'checked' : ''} />
        </label>
        <button type="button" class="card-icon-btn card-duplicate-btn" data-id="${section.id}" title="Duplicate">⧉</button>
        <button type="button" class="card-icon-btn card-delete-btn" data-id="${section.id}" title="Delete">✕</button>
      </div>
      ${collapsed ? '' : `<div class="section-card-body">${renderFieldsForType(section)}</div>`}
    </div>
  `;
}

function renderFieldsForType(section) {
  const { type, data, id } = section;
  switch (type) {
    case SECTION_TYPES.HERO:
      return `
        ${imageDropzone(id, 'logoUrl', data.logoUrl, 'Project banner / logo')}
        <label class="field-check"><input type="checkbox" data-field="showLogo" ${data.showLogo ? 'checked' : ''} /> Show banner in README</label>
        <label class="field-label">Project name</label>
        <input type="text" class="field-input" data-field="projectName" value="${esc(data.projectName)}" />
        <label class="field-label">Tagline</label>
        <textarea class="field-input" data-field="tagline" rows="2">${esc(data.tagline)}</textarea>
        <div class="field-row">
          <div><label class="field-label">Alignment</label>
            <select class="field-input" data-field="align">
              ${['center', 'left', 'right'].map(a => `<option value="${a}" ${data.align === a ? 'selected' : ''}>${a}</option>`).join('')}
            </select>
          </div>
          <div><label class="field-label">Banner width</label>
            <select class="field-input" data-field="logoWidth">
              ${['100%', '80%', '600', '400'].map(w => `<option value="${w}" ${data.logoWidth === w ? 'selected' : ''}>${w}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="field-row">
          <div><label class="field-label">GitHub owner</label><input type="text" class="field-input" data-field="repoOwner" value="${esc(data.repoOwner)}" /></div>
          <div><label class="field-label">Repo name</label><input type="text" class="field-input" data-field="repoName" value="${esc(data.repoName)}" /></div>
        </div>
      `;

    case SECTION_TYPES.BADGES:
      return `
        <div class="field-row">
          <div><label class="field-label">Style</label>
            <select class="field-input" data-field="style">
              ${['for-the-badge', 'flat', 'flat-square', 'plastic', 'social'].map(s => `<option value="${s}" ${data.style === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
          <div><label class="field-label">Alignment</label>
            <select class="field-input" data-field="align">
              ${['center', 'left', 'right'].map(a => `<option value="${a}" ${data.align === a ? 'selected' : ''}>${a}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="field-checks-grid">
          ${['showStars:Stars', 'showForks:Forks', 'showIssues:Issues', 'showLicense:License', 'showLastCommit:Last commit', 'showRelease:Release', 'showContributors:Contributors', 'showActionsCI:CI status']
            .map(pair => { const [f, l] = pair.split(':'); return `<label class="field-check"><input type="checkbox" data-field="${f}" ${data[f] ? 'checked' : ''} /> ${l}</label>`; }).join('')}
        </div>
        <label class="field-label">npm package (optional)</label>
        <div class="field-row-inline">
          <input type="text" class="field-input" id="npm-pkg-input-${id}" placeholder="e.g. react" value="${esc(data.npmPackageName)}" />
          <button type="button" class="btn-secondary npm-detect-btn" data-id="${id}">Detect</button>
        </div>
        <div class="field-checks-grid">
          <label class="field-check"><input type="checkbox" data-field="showNpmVersion" ${data.showNpmVersion ? 'checked' : ''} /> npm version badge</label>
          <label class="field-check"><input type="checkbox" data-field="showNpmDownloads" ${data.showNpmDownloads ? 'checked' : ''} /> npm downloads badge</label>
        </div>
        ${renderListEditor(id, 'customBadges', data.customBadges || [], [
          { key: 'label', placeholder: 'Label' }, { key: 'message', placeholder: 'Message' }, { key: 'color', placeholder: 'Color (e.g. blue)' }, { key: 'link', placeholder: 'Link (optional)' }
        ], 'Custom badge')}
      `;

    case SECTION_TYPES.ABOUT:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">Content</label>
        <textarea class="field-input" data-field="content" rows="4">${esc(data.content)}</textarea>
      `;

    case SECTION_TYPES.TOC:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <p class="field-hint">Auto-generated from every other visible section's heading. No editing needed here.</p>
      `;

    case SECTION_TYPES.TECH_STACK: {
      const selected = (data.technologies || []).map(techId => techById(techId)).filter(Boolean);
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <div class="field-row">
          <div><label class="field-label">Layout</label>
            <select class="field-input" data-field="layout">
              <option value="badges" ${data.layout === 'badges' ? 'selected' : ''}>Badges</option>
              <option value="table" ${data.layout === 'table' ? 'selected' : ''}>Table</option>
            </select>
          </div>
          <div><label class="field-label">Alignment</label>
            <select class="field-input" data-field="align">
              ${['center', 'left', 'right'].map(a => `<option value="${a}" ${data.align === a ? 'selected' : ''}>${a}</option>`).join('')}
            </select>
          </div>
        </div>
        <label class="field-label">Technologies (${selected.length})</label>
        <div class="tech-chip-row">
          ${selected.map(t => `<span class="tech-chip">${esc(t.name)}<button type="button" class="tech-chip-remove" data-id="${id}" data-tech="${t.id}">✕</button></span>`).join('')}
        </div>
        <button type="button" class="btn-secondary tech-picker-open-btn" data-id="${id}">+ Pick technologies</button>
        <div class="tech-picker-inline hidden" id="tech-picker-${id}"></div>
      `;
    }

    case SECTION_TYPES.FEATURES:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        ${renderListEditor(id, 'items', data.items || [], [
          { key: 'title', placeholder: 'Feature title' }, { key: 'desc', placeholder: 'Description', textarea: true }
        ], 'Feature')}
      `;

    case SECTION_TYPES.DEMO:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        ${imageDropzone(id, 'imageUrl', data.imageUrl, 'Screenshot / GIF')}
        <div class="field-row">
          <div><label class="field-label">Width</label>
            <select class="field-input" data-field="width">
              ${['100%', '80%', '600', '400'].map(w => `<option value="${w}" ${data.width === w ? 'selected' : ''}>${w}</option>`).join('')}
            </select>
          </div>
          <div><label class="field-label">Alignment</label>
            <select class="field-input" data-field="align">
              ${['center', 'left', 'right'].map(a => `<option value="${a}" ${data.align === a ? 'selected' : ''}>${a}</option>`).join('')}
            </select>
          </div>
        </div>
        <label class="field-label">Caption</label>
        <input type="text" class="field-input" data-field="caption" value="${esc(data.caption)}" />
        <label class="field-label">Live demo URL</label>
        <input type="text" class="field-input" data-field="liveUrl" value="${esc(data.liveUrl)}" placeholder="https://myapp.example.com" />
      `;

    case SECTION_TYPES.INSTALLATION:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">Prerequisites</label>
        <textarea class="field-input" data-field="prerequisites" rows="2">${esc(data.prerequisites)}</textarea>
        ${renderListEditor(id, 'steps', data.steps || [], [
          { key: 'title', placeholder: 'Step title' }, { key: 'cmd', placeholder: 'Command', textarea: true, mono: true }
        ], 'Step')}
      `;

    case SECTION_TYPES.USAGE:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">Language</label>
        <input type="text" class="field-input" data-field="codeLang" value="${esc(data.codeLang)}" placeholder="bash, javascript, python..." />
        <label class="field-label">Code</label>
        <textarea class="field-input field-mono" data-field="code" rows="4">${esc(data.code)}</textarea>
        <label class="field-label">Note (optional)</label>
        <textarea class="field-input" data-field="note" rows="2">${esc(data.note)}</textarea>
      `;

    case SECTION_TYPES.ENV_VARS:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        ${renderListEditor(id, 'variables', data.variables || [], [
          { key: 'key', placeholder: 'KEY_NAME', mono: true }, { key: 'desc', placeholder: 'Description' }, { key: 'default', placeholder: 'Default value' }, { key: 'required', placeholder: '', checkbox: true, checkboxLabel: 'Required' }
        ], 'Variable')}
      `;

    case SECTION_TYPES.API_REFERENCE:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        ${renderListEditor(id, 'endpoints', data.endpoints || [], [
          { key: 'method', placeholder: 'GET' }, { key: 'path', placeholder: '/api/items', mono: true }, { key: 'desc', placeholder: 'Description' }
        ], 'Endpoint')}
      `;

    case SECTION_TYPES.MERMAID:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">Mermaid diagram source</label>
        <textarea class="field-input field-mono" data-field="diagram" rows="6">${esc(data.diagram)}</textarea>
        <p class="field-hint">GitHub renders Mermaid diagrams natively from a plain code block — no images, no extra service.</p>
      `;

    case SECTION_TYPES.FAQ:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        ${renderListEditor(id, 'questions', data.questions || [], [
          { key: 'q', placeholder: 'Question' }, { key: 'a', placeholder: 'Answer', textarea: true }
        ], 'Question')}
      `;

    case SECTION_TYPES.ROADMAP:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        ${renderListEditor(id, 'tasks', data.tasks || [], [
          { key: 'completed', placeholder: '', checkbox: true, checkboxLabel: 'Done' }, { key: 'text', placeholder: 'Task description' }
        ], 'Task')}
      `;

    case SECTION_TYPES.CONTRIBUTING:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">Guidelines</label>
        <textarea class="field-input" data-field="guidelines" rows="3">${esc(data.guidelines)}</textarea>
      `;

    case SECTION_TYPES.LICENSE:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">License</label>
        <select class="field-input" data-field="type">
          ${LICENSE_CATALOG.map(l => `<option value="${l.id}" ${data.type === l.id ? 'selected' : ''}>${l.name}</option>`).join('')}
        </select>
        <div class="field-row">
          <div><label class="field-label">Copyright holder</label><input type="text" class="field-input" data-field="holder" value="${esc(data.holder)}" /></div>
          <div><label class="field-label">Year</label><input type="text" class="field-input" data-field="year" value="${esc(data.year)}" /></div>
        </div>
      `;

    case SECTION_TYPES.AUTHOR:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">Name</label>
        <input type="text" class="field-input" data-field="name" value="${esc(data.name)}" />
        <div class="field-row">
          <div><label class="field-label">GitHub username</label><input type="text" class="field-input" data-field="github" value="${esc(data.github)}" /></div>
          <div><label class="field-label">Twitter/X username</label><input type="text" class="field-input" data-field="twitter" value="${esc(data.twitter)}" /></div>
        </div>
        <div class="field-row">
          <div><label class="field-label">LinkedIn username</label><input type="text" class="field-input" data-field="linkedin" value="${esc(data.linkedin)}" /></div>
          <div><label class="field-label">Email</label><input type="text" class="field-input" data-field="email" value="${esc(data.email)}" /></div>
        </div>
      `;

    case SECTION_TYPES.STATS:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">GitHub username</label>
        <input type="text" class="field-input" data-field="githubUser" value="${esc(data.githubUser)}" />
        <div class="field-checks-grid">
          <label class="field-check"><input type="checkbox" data-field="showTopLangs" ${data.showTopLangs ? 'checked' : ''} /> Top languages</label>
          <label class="field-check"><input type="checkbox" data-field="showStreak" ${data.showStreak ? 'checked' : ''} /> Contribution streak</label>
          <label class="field-check"><input type="checkbox" data-field="showStarHistory" ${data.showStarHistory ? 'checked' : ''} /> Star history</label>
        </div>
      `;

    case SECTION_TYPES.CUSTOM:
      return `
        <label class="field-label">Heading (optional)</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">Custom Markdown</label>
        <textarea class="field-input field-mono" data-field="markdown" rows="6">${esc(data.markdown)}</textarea>
      `;

    default:
      return '<p class="field-hint">No editable fields.</p>';
  }
}

function imageDropzone(sectionId, field, url, label) {
  if (url) {
    return `
      <div class="image-dropzone image-dropzone-filled" data-id="${sectionId}" data-field="${field}">
        <img src="${url}" alt="${esc(label)}" class="image-dropzone-preview" />
        <div class="image-dropzone-actions">
          <button type="button" class="btn-secondary image-replace-btn" data-id="${sectionId}" data-field="${field}">Replace</button>
          <button type="button" class="btn-secondary image-remove-btn" data-id="${sectionId}" data-field="${field}">Remove</button>
        </div>
        <input type="file" class="image-file-input hidden" accept="image/*" data-id="${sectionId}" data-field="${field}" />
      </div>
    `;
  }
  return `
    <div class="image-dropzone" data-id="${sectionId}" data-field="${field}">
      <p class="field-hint">${esc(label)} — drag &amp; drop an image, or</p>
      <div class="image-dropzone-actions">
        <button type="button" class="btn-secondary image-choose-btn" data-id="${sectionId}" data-field="${field}">Choose file</button>
        <button type="button" class="btn-secondary image-url-btn" data-id="${sectionId}" data-field="${field}">Paste URL</button>
      </div>
      <input type="file" class="image-file-input hidden" accept="image/*" data-id="${sectionId}" data-field="${field}" />
    </div>
  `;
}

function renderListEditor(sectionId, listField, items, columns, itemLabel) {
  return `
    <div class="list-editor" data-id="${sectionId}" data-list-field="${listField}">
      ${items.map((item, idx) => `
        <div class="list-editor-row" data-idx="${idx}">
          ${columns.map(col => {
            if (col.checkbox) return `<label class="field-check list-editor-check"><input type="checkbox" class="list-editor-input" data-key="${col.key}" ${item[col.key] ? 'checked' : ''} /> ${col.checkboxLabel || ''}</label>`;
            if (col.textarea) return `<textarea class="field-input list-editor-input ${col.mono ? 'field-mono' : ''}" data-key="${col.key}" rows="2" placeholder="${esc(col.placeholder)}">${esc(item[col.key])}</textarea>`;
            return `<input type="text" class="field-input list-editor-input ${col.mono ? 'field-mono' : ''}" data-key="${col.key}" placeholder="${esc(col.placeholder)}" value="${esc(item[col.key])}" />`;
          }).join('')}
          <button type="button" class="card-icon-btn list-editor-remove" data-idx="${idx}" title="Remove">✕</button>
        </div>
      `).join('')}
      <button type="button" class="btn-secondary list-editor-add">+ Add ${itemLabel}</button>
    </div>
  `;
}

function attachListeners(container) {
  // Generic [data-field] inputs -> store.updateSectionData
  container.querySelectorAll('.section-card').forEach(card => {
    const sectionId = card.dataset.cardId;

    card.querySelectorAll('[data-field]').forEach(el => {
      const field = el.dataset.field;
      const eventName = el.type === 'checkbox' ? 'change' : 'input';
      el.addEventListener(eventName, () => {
        const val = el.type === 'checkbox' ? el.checked : el.value;
        store.updateSectionData(sectionId, { [field]: val });
      });
    });

    // List editors (features/steps/env vars/endpoints/faq/roadmap/custom badges)
    card.querySelectorAll('.list-editor').forEach(editor => {
      const listField = editor.dataset.listField;
      const getItems = () => JSON.parse(JSON.stringify(store.findSection(sectionId)?.data?.[listField] || []));

      editor.querySelectorAll('.list-editor-row').forEach(row => {
        const idx = parseInt(row.dataset.idx, 10);
        row.querySelectorAll('.list-editor-input').forEach(input => {
          const key = input.dataset.key;
          const eventName = input.type === 'checkbox' ? 'change' : 'input';
          input.addEventListener(eventName, () => {
            const items = getItems();
            if (!items[idx]) return;
            items[idx][key] = input.type === 'checkbox' ? input.checked : input.value;
            store.updateSectionData(sectionId, { [listField]: items });
          });
        });
      });

      editor.querySelectorAll('.list-editor-remove').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.idx, 10);
          const items = getItems();
          items.splice(idx, 1);
          store.updateSectionData(sectionId, { [listField]: items });
        });
      });

      editor.querySelector('.list-editor-add')?.addEventListener('click', () => {
        const items = getItems();
        const blank = {};
        // infer shape from first existing item, or leave empty object for known types
        items.push(blank);
        store.updateSectionData(sectionId, { [listField]: items });
      });
    });

    // Image dropzones
    card.querySelectorAll('.image-dropzone').forEach(zone => {
      const field = zone.dataset.field;
      const fileInput = zone.querySelector('.image-file-input');

      const applyFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => store.updateSectionData(sectionId, { [field]: e.target.result, ...(field === 'logoUrl' ? { showLogo: true } : {}) });
        reader.readAsDataURL(file);
      };

      zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag-over'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        applyFile(e.dataTransfer.files?.[0]);
      });

      zone.querySelector('.image-choose-btn')?.addEventListener('click', () => fileInput?.click());
      zone.querySelector('.image-replace-btn')?.addEventListener('click', () => fileInput?.click());
      fileInput?.addEventListener('change', (e) => applyFile(e.target.files?.[0]));

      zone.querySelector('.image-url-btn')?.addEventListener('click', () => {
        const url = prompt('Paste an image URL:', '');
        if (url && url.trim()) store.updateSectionData(sectionId, { [field]: url.trim(), ...(field === 'logoUrl' ? { showLogo: true } : {}) });
      });

      zone.querySelector('.image-remove-btn')?.addEventListener('click', () => {
        store.updateSectionData(sectionId, { [field]: '', ...(field === 'logoUrl' ? { showLogo: false } : {}) });
      });
    });

    // Tech picker toggle (inline panel, built lazily)
    card.querySelector('.tech-picker-open-btn')?.addEventListener('click', () => {
      const panel = card.querySelector(`#tech-picker-${sectionId}`);
      if (!panel) return;
      const hidden = panel.classList.toggle('hidden');
      if (!hidden && !panel.dataset.built) {
        panel.dataset.built = 'true';
        panel.innerHTML = renderTechPickerPanel(sectionId);
        attachTechPickerListeners(panel, sectionId);
      }
    });

    card.querySelectorAll('.tech-chip-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const section = store.findSection(sectionId);
        const updated = (section.data.technologies || []).filter(t => t !== btn.dataset.tech);
        store.updateSectionData(sectionId, { technologies: updated });
      });
    });

    // npm Detect
    card.querySelector('.npm-detect-btn')?.addEventListener('click', async (e) => {
      const btn = e.target;
      const input = card.querySelector(`#npm-pkg-input-${sectionId}`);
      const name = input?.value?.trim();
      if (!name) { showToast('Enter a package name first', 'error'); return; }
      btn.disabled = true;
      btn.textContent = '...';
      try {
        const pkg = await enrichNpmPackage(name);
        store.updateSectionData(sectionId, { npmPackageName: pkg.name, showNpmVersion: true, showNpmDownloads: true });
        showToast(`Found ${pkg.name}@${pkg.version}`, 'success');
      } catch (err) {
        showToast(err.message || 'Package not found', 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Detect';
      }
    });
  });

  // Card chrome: collapse, rename, enable toggle, duplicate, delete
  // Click anywhere on a card's header bar to expand/collapse it — except the
  // controls that need their own click behavior (rename, enable, duplicate,
  // delete, drag handle).
  container.querySelectorAll('.section-card-header').forEach(header => {
    header.addEventListener('click', (e) => {
      if (e.target.closest('.card-title-input, .card-enable-toggle, .card-duplicate-btn, .card-delete-btn, .drag-grip')) return;
      const id = header.dataset.id;
      if (expandedIds.has(id)) expandedIds.delete(id); else expandedIds.add(id);
      renderSectionFormList(container);
    });
  });

  container.querySelectorAll('.card-title-input').forEach(input => {
    input.addEventListener('input', () => store.renameSection(input.dataset.id, input.value));
  });

  container.querySelectorAll('.card-enable-cb').forEach(cb => {
    cb.addEventListener('change', () => store.toggleSection(cb.dataset.id, cb.checked));
  });

  container.querySelectorAll('.card-duplicate-btn').forEach(btn => {
    btn.addEventListener('click', () => store.duplicateSection(btn.dataset.id));
  });

  container.querySelectorAll('.card-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Delete this section?')) store.removeSection(btn.dataset.id);
    });
  });

  setupDragReorder(container);
}

function setupDragReorder(container) {
  container.querySelectorAll('.drag-grip').forEach(grip => {
    grip.addEventListener('dragstart', (e) => {
      const card = grip.closest('.section-card');
      dragFromIndex = parseInt(card.dataset.index, 10);
      e.dataTransfer.effectAllowed = 'move';
      card.classList.add('dragging');
    });
    grip.addEventListener('dragend', () => {
      grip.closest('.section-card')?.classList.remove('dragging');
      dragFromIndex = null;
    });
  });

  container.querySelectorAll('.section-card').forEach(card => {
    card.addEventListener('dragover', (e) => {
      if (dragFromIndex === null) return;
      e.preventDefault();
      card.classList.add('drop-target');
    });
    card.addEventListener('dragleave', () => card.classList.remove('drop-target'));
    card.addEventListener('drop', (e) => {
      e.preventDefault();
      card.classList.remove('drop-target');
      if (dragFromIndex === null) return;
      const toIndex = parseInt(card.dataset.index, 10);
      store.reorderSections(dragFromIndex, toIndex);
      dragFromIndex = null;
    });
  });
}

function renderTechPickerPanel(sectionId) {
  const section = store.findSection(sectionId);
  const selected = new Set(section.data.technologies || []);
  return `
    <input type="text" class="field-input tech-picker-search" placeholder="Search technologies..." />
    <div class="tech-picker-categories">
      ${TECH_CATEGORIES.map(c => `<button type="button" class="tech-cat-btn" data-cat="${c.id}">${c.name}</button>`).join('')}
    </div>
    <div class="tech-picker-grid">
      ${TECH_CATALOG.map(t => `
        <button type="button" class="tech-picker-item ${selected.has(t.id) ? 'tech-picker-item-selected' : ''}" data-tech="${t.id}" data-cat="${t.category}" data-name="${t.name.toLowerCase()}">
          ${esc(t.name)}
        </button>
      `).join('')}
    </div>
  `;
}

function attachTechPickerListeners(panel, sectionId) {
  const items = () => Array.from(panel.querySelectorAll('.tech-picker-item'));

  panel.querySelector('.tech-picker-search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    items().forEach(el => { el.hidden = q && !el.dataset.name.includes(q); });
  });

  panel.querySelectorAll('.tech-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      items().forEach(el => { el.hidden = cat !== 'all' && el.dataset.cat !== cat; });
    });
  });

  panel.querySelectorAll('.tech-picker-item').forEach(el => {
    el.addEventListener('click', () => {
      const section = store.findSection(sectionId);
      const current = new Set(section.data.technologies || []);
      const techId = el.dataset.tech;
      if (current.has(techId)) current.delete(techId); else current.add(techId);
      store.updateSectionData(sectionId, { technologies: Array.from(current) });
    });
  });
}

export function openAddSectionMenu(onPick) {
  // Simple: return the list for the caller (palette/library) to render its own UI.
  return Object.entries(SECTION_LABELS).map(([type, label]) => ({ type, label }));
}

export { SECTION_LABELS };
