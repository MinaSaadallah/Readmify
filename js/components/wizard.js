/**
 * First-run / "Quick Guide" modal: scan a public GitHub repo to auto-fill
 * sections, or start from a curated template.
 */
import { store } from '../store.js';
import { TEMPLATES } from '../data/templates.js';
import { parseGitHubRepoInput, fetchGitHubRepoFullDetails } from '../services/githubApi.js';
import { showToast, fireConfetti } from '../utils/exportUtils.js';

export function openWizard() {
  let modal = document.getElementById('wizard-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'wizard-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <h3>Quick Start</h3>
        <button type="button" class="modal-close-btn" id="close-wizard-btn">✕</button>
      </div>
      <p class="field-hint">Scan a public GitHub repo to auto-fill sections, or start from a template.</p>
      <div class="field-row-inline">
        <input type="text" class="field-input" id="wizard-repo-input" placeholder="owner/repo or GitHub URL" />
        <button type="button" class="btn-primary" id="wizard-scan-btn">Scan</button>
      </div>
      <div id="wizard-scan-status" class="field-hint"></div>
      <p class="field-hint" style="margin-top:16px;">Or start from a template:</p>
      <div class="section-library-grid">
        ${TEMPLATES.map(t => `<button type="button" class="section-library-item" data-template="${t.id}">${t.name}</button>`).join('')}
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  modal.querySelector('#close-wizard-btn').addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

  modal.querySelectorAll('[data-template]').forEach(btn => {
    btn.addEventListener('click', () => {
      store.loadTemplate(btn.dataset.template);
      showToast('Template loaded!', 'success');
      modal.classList.add('hidden');
    });
  });

  const scanBtn = modal.querySelector('#wizard-scan-btn');
  const input = modal.querySelector('#wizard-repo-input');
  const status = modal.querySelector('#wizard-scan-status');

  const runScan = async () => {
    const parsed = parseGitHubRepoInput(input.value);
    if (!parsed) { showToast('Enter a valid repo (owner/repo or GitHub URL)', 'error'); return; }
    scanBtn.disabled = true;
    scanBtn.textContent = 'Scanning...';
    try {
      const info = await fetchGitHubRepoFullDetails(parsed.owner, parsed.repo, (p) => { status.textContent = p.message; });
      store.applyRepoAnalysis(info);
      fireConfetti();
      showToast(`Scanned ${info.owner}/${info.repo}!`, 'success');
      modal.classList.add('hidden');
    } catch (err) {
      showToast(err.message || 'Scan failed', 'error');
    } finally {
      scanBtn.disabled = false;
      scanBtn.textContent = 'Scan';
      status.textContent = '';
    }
  };

  scanBtn.addEventListener('click', runScan);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); runScan(); } });
}

export function closeWizard() {
  document.getElementById('wizard-modal')?.classList.add('hidden');
}
