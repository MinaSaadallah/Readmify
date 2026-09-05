/**
 * "Add Section" modal — pick a section type to add or re-enable.
 */
import { store } from '../store.js';
import { SECTION_LABELS } from './sectionFormList.js';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function openSectionLibrary() {
  let modal = document.getElementById('section-library-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'section-library-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  const existingTypes = new Set(store.getState().sections.map(s => s.type));

  modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <h3>Add a section</h3>
        <button type="button" class="modal-close-btn" id="close-section-library-btn">✕</button>
      </div>
      <input type="text" class="field-input" id="section-library-search" placeholder="Search sections..." />
      <div class="section-library-grid">
        ${Object.entries(SECTION_LABELS).map(([type, label]) => `
          <button type="button" class="section-library-item" data-type="${type}" data-name="${label.toLowerCase()}">
            ${esc(label)}${existingTypes.has(type) ? ' <span class="badge-muted">already added</span>' : ''}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  modal.querySelector('#close-section-library-btn').addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

  modal.querySelector('#section-library-search').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    modal.querySelectorAll('.section-library-item').forEach(el => { el.hidden = q && !el.dataset.name.includes(q); });
  });

  modal.querySelectorAll('.section-library-item').forEach(btn => {
    btn.addEventListener('click', () => {
      store.addSectionFromType(btn.dataset.type);
      modal.classList.add('hidden');
    });
  });
}

export function closeSectionLibrary() {
  document.getElementById('section-library-modal')?.classList.add('hidden');
}
