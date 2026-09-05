/**
 * Readmify - Interactive Preview Canvas Engine
 * Renders the living README document with direct in-place editing,
 * hover section actions, interactive widgets, and seamless state sync.
 */
import { store } from '../store.js';
import { SECTION_TYPES, createSection } from '../data/defaultSections.js';
import { TECH_CATALOG, getBadgeUrl, getSkillIconsUrl } from '../data/techCatalog.js';
import { LICENSE_CATALOG, getLicenseById } from '../data/licenses.js';
import { renderTechPickerModal } from './techPicker.js';
import { renderPhotoModal } from './photoUploader.js';
import { openSectionLibrary } from './sectionLibrary.js';
import { showToast, fireConfetti, copyToClipboard, downloadReadmeFile } from '../utils/exportUtils.js';
import { renderSectionEditor } from './sectionEditor.js';

let activeBadgePopoverSectionId = null;

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Main entry point: renders the interactive document canvas
 */
export function renderInteractiveCanvas(container, state, meta = {}) {
  if (!container) return;

  // Don't re-render entire canvas if user is actively typing in an input/textarea/contenteditable
  const activeEl = document.activeElement;
  const isTyping = activeEl && container.contains(activeEl) && (
    (activeEl.tagName === 'INPUT' && activeEl.type !== 'checkbox' && activeEl.type !== 'radio' && activeEl.type !== 'button' && activeEl.type !== 'submit') ||
    activeEl.tagName === 'TEXTAREA' ||
    activeEl.getAttribute('contenteditable') === 'true'
  );

  if (isTyping && !meta.force) {
    return;
  }

  const { sections, activeSectionId } = state;
  const enabledSections = sections.filter(s => s.enabled);

  if (enabledSections.length === 0) {
    container.innerHTML = `
      <div class="p-16 text-center text-muted-foreground space-y-4">
        <div class="text-4xl">📄</div>
        <div class="space-y-1">
          <h3 class="text-base font-semibold text-foreground">Your README is Empty</h3>
          <p class="text-xs">Add sections from the library or use the Easy Guide scanner to get started.</p>
        </div>
        <div class="pt-2">
          <button id="canvas-empty-add-btn" class="btn-primary text-xs px-4 py-2 shadow-sm">
            ➕ Open Section Library
          </button>
        </div>
      </div>
    `;
    container.querySelector('#canvas-empty-add-btn')?.addEventListener('click', () => openSectionLibrary());
    return;
  }

  let html = `
    <div class="canvas-document markdown-body github-dark relative min-h-[600px] select-text">
  `;

  sections.forEach((sec, idx) => {
    if (!sec.enabled) return;

    const isFirst = idx === 0;
    const isLast = idx === sections.length - 1;

    // Top In-between Section Add Divider
    html += `
      <div class="add-section-divider group/divider py-1.5 flex items-center justify-center relative select-none">
        <div class="divider-line h-[1px] bg-border/40 w-full group-hover/divider:bg-zinc-600 transition"></div>
        <button 
          class="insert-section-btn absolute opacity-0 group-hover/divider:opacity-100 transition-all px-2.5 py-0.5 text-[10px] font-medium rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 shadow-sm flex items-center gap-1 cursor-pointer"
          data-insert-index="${idx}"
          title="Insert section here"
        >
          <span>➕</span> Add Section
        </button>
      </div>
    `;

    // Section Block
    html += `
      <section 
        class="interactive-section-block group relative rounded-lg border border-transparent hover:border-zinc-700/80 p-3 sm:p-4 transition-all ${
          sec.id === activeSectionId ? 'canvas-section-focused' : ''
        }"
        data-section-id="${sec.id}"
      >
        <!-- Floating Section Action Pill (Top Right on Hover) -->
        <div class="section-hover-toolbar absolute -top-3.5 right-3 opacity-0 group-hover:opacity-100 transition-all duration-150 flex items-center gap-0.5 bg-zinc-900 border border-zinc-700/80 rounded-md px-1.5 py-0.5 shadow-xl text-xs z-30 select-none">
          <span class="text-[10px] text-zinc-400 font-mono px-1 font-semibold">${idx + 1}</span>
          <button class="sec-move-up-btn p-1 text-zinc-400 hover:text-zinc-100 rounded hover:bg-zinc-800 transition ${isFirst ? 'opacity-30 pointer-events-none' : ''}" title="Move Up" data-id="${sec.id}">▲</button>
          <button class="sec-move-down-btn p-1 text-zinc-400 hover:text-zinc-100 rounded hover:bg-zinc-800 transition ${isLast ? 'opacity-30 pointer-events-none' : ''}" title="Move Down" data-id="${sec.id}">▼</button>
          <button class="sec-inspector-btn p-1 text-zinc-400 hover:text-zinc-100 rounded hover:bg-zinc-800 transition" title="Section Settings & Fine-tuning (Inspector)" data-id="${sec.id}">⚙️</button>
          <button class="sec-duplicate-btn p-1 text-zinc-400 hover:text-zinc-100 rounded hover:bg-zinc-800 transition" title="Duplicate Section" data-id="${sec.id}">📑</button>
          <button class="sec-delete-btn p-1 text-rose-400 hover:text-rose-300 rounded hover:bg-rose-950/40 transition" title="Delete Section" data-id="${sec.id}">🗑️</button>
        </div>

        <!-- Section Content -->
        <div class="section-inner-content">
          ${renderSectionInteractiveContent(sec, state)}
        </div>
      </section>
    `;
  });

  // Bottom In-between Add Divider
  html += `
    <div class="add-section-divider group/divider py-3 flex items-center justify-center relative select-none">
      <div class="divider-line h-[1px] bg-border/40 w-full group-hover/divider:bg-zinc-600 transition"></div>
      <button 
        class="insert-section-btn px-3 py-1 text-xs font-medium rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 shadow-sm flex items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition"
        data-insert-index="${sections.length}"
        title="Add section at the bottom"
      >
        <span>➕</span> Add Section to README
      </button>
    </div>
  `;

  html += `</div>`;

  container.innerHTML = html;
  attachCanvasEventListeners(container, state);
}

/**
 * Render individual section interactive preview
 */
function renderSectionInteractiveContent(section, state) {
  const { type, data, id } = section;

  switch (type) {
    case SECTION_TYPES.HERO: {
      const align = data.align || 'center';
      const alignClass = align === 'center' ? 'text-center' : (align === 'right' ? 'text-right' : 'text-left');
      const width = data.logoWidth || '100%';
      const radius = data.logoRadius || '8px';

      let bannerHtml = '';
      if (data.showLogo && data.logoUrl) {
        bannerHtml = `
          <div class="relative group/banner inline-block my-3 max-w-full">
            <img src="${data.logoUrl}" alt="${escapeHtml(data.projectName)} Banner" style="width: ${width}; border-radius: ${radius};" class="max-w-full mx-auto block shadow-md" />
            <div class="absolute inset-0 bg-black/50 backdrop-blur-xs opacity-0 group-hover/banner:opacity-100 transition flex items-center justify-center gap-2 rounded-lg">
              <button class="open-hero-studio-btn px-3 py-1.5 text-xs font-medium bg-zinc-900 text-white border border-zinc-600 rounded-md shadow-lg flex items-center gap-1.5 hover:bg-zinc-800 cursor-pointer">
                <span>✂️</span> Image Studio (Crop/Resize)
              </button>
              <button class="remove-banner-btn px-2 py-1.5 text-xs font-medium bg-rose-950/80 text-rose-300 border border-rose-800 rounded-md hover:bg-rose-900 cursor-pointer" title="Remove Banner">
                ✕
              </button>
            </div>
          </div>
        `;
      } else {
        bannerHtml = `
          <div class="my-2 select-none">
            <button class="open-hero-studio-btn text-xs text-muted-foreground hover:text-foreground bg-card/60 hover:bg-muted border border-dashed border-border rounded-lg px-3.5 py-2 inline-flex items-center gap-1.5 transition cursor-pointer">
              <span>🖼️</span> + Add Project Banner / Logo (Image Studio)
            </button>
          </div>
        `;
      }

      return `
        <div class="${alignClass} space-y-2 py-2">
          ${bannerHtml}
          <div>
            <h1 
              class="canvas-editable-heading text-3xl font-bold tracking-tight text-foreground outline-none hover:bg-zinc-800/40 focus:bg-zinc-800/60 rounded px-2 py-0.5 transition cursor-text inline-block min-w-[120px]"
              contenteditable="true"
              data-field="projectName"
              data-section-id="${id}"
              title="Click to edit project name"
            >${escapeHtml(data.projectName || 'Project Title')}</h1>
          </div>
          <div>
            <p 
              class="canvas-editable-text text-base text-zinc-400 outline-none hover:bg-zinc-800/40 focus:bg-zinc-800/60 rounded px-2 py-1 transition cursor-text inline-block min-w-[200px]"
              contenteditable="true"
              data-field="tagline"
              data-section-id="${id}"
              title="Click to edit tagline"
            >${escapeHtml(data.tagline || 'A modern open-source project built with passion.')}</p>
          </div>
        </div>
      `;
    }

    case SECTION_TYPES.BADGES: {
      const align = data.align || 'center';
      const alignClass = align === 'center' ? 'text-center' : (align === 'right' ? 'text-right' : 'text-left');
      const owner = data.repoOwner || 'owner';
      const repo = data.repoName || 'repo';
      const style = data.style || 'for-the-badge';

      const badges = [];
      if (data.showStars) badges.push('<img src="https://img.shields.io/github/stars/' + owner + '/' + repo + '?style=' + style + '" alt="Stars" class="h-5" />');
      if (data.showForks) badges.push('<img src="https://img.shields.io/github/forks/' + owner + '/' + repo + '?style=' + style + '" alt="Forks" class="h-5" />');
      if (data.showIssues) badges.push('<img src="https://img.shields.io/github/issues/' + owner + '/' + repo + '?style=' + style + '" alt="Issues" class="h-5" />');
      if (data.showPRs) badges.push('<img src="https://img.shields.io/github/issues-pr/' + owner + '/' + repo + '?style=' + style + '" alt="PRs" class="h-5" />');
      if (data.showLicense) badges.push('<img src="https://img.shields.io/badge/License-MIT-blue.svg?style=' + style + '" alt="License" class="h-5" />');
      if (data.showRelease) badges.push('<img src="https://img.shields.io/github/v/release/' + owner + '/' + repo + '?style=' + style + '" alt="Release" class="h-5" />');

      if (Array.isArray(data.customBadges)) {
        data.customBadges.forEach(cb => {
          const l = encodeURIComponent(cb.label || 'Badge');
          const m = encodeURIComponent(cb.message || 'Value');
          const c = encodeURIComponent(cb.color || 'blue');
          badges.push('<img src="https://img.shields.io/badge/' + l + '-' + m + '-' + c + '?style=' + style + '" alt="' + cb.label + '" class="h-5" />');
        });
      }

      return `
        <div class="${alignClass} py-2 space-y-2">
          <div class="flex flex-wrap items-center justify-${align === 'center' ? 'center' : (align === 'right' ? 'end' : 'start')} gap-1.5">
            ${badges.length > 0 ? badges.join('\n') : '<span class="text-xs text-muted-foreground italic">No badges selected. Click below to add shields.</span>'}
          </div>

          <!-- Direct Badge Quick Customizer Pill -->
          <div class="pt-1 select-none">
            <button 
              class="open-badge-popover-btn text-xs text-muted-foreground hover:text-foreground bg-card/60 hover:bg-muted border border-border rounded-md px-2.5 py-1 inline-flex items-center gap-1.5 transition cursor-pointer"
              data-id="${id}"
            >
              <span>🏷️</span> Customize Badges (${badges.length} active) ▾
            </button>
          </div>

          <!-- Popover Modal for Badges if toggled -->
          ${activeBadgePopoverSectionId === id ? renderBadgePopoverHtml(data, id) : ''}
        </div>
      `;
    }

    case SECTION_TYPES.ABOUT: {
      return `
        <div class="space-y-2">
          <h2 
            class="canvas-editable-heading text-xl font-semibold text-foreground border-b border-zinc-800 pb-1.5 outline-none hover:bg-zinc-800/40 focus:bg-zinc-800/60 rounded px-1.5 transition cursor-text inline-block min-w-[140px]"
            contenteditable="true"
            data-field="heading"
            data-section-id="${id}"
          >${escapeHtml(data.heading || 'About The Project')}</h2>

          <div 
            class="canvas-editable-text text-sm text-zinc-300 leading-relaxed outline-none hover:bg-zinc-800/40 focus:bg-zinc-800/60 rounded p-2 transition cursor-text min-h-[60px] whitespace-pre-wrap"
            contenteditable="true"
            data-field="content"
            data-section-id="${id}"
            title="Click to edit about content"
          >${escapeHtml(data.content || 'A brief, compelling overview of why this project exists, the real-world problem it solves, and how it helps developers achieve their goals.')}</div>
        </div>
      `;
    }

    case SECTION_TYPES.TECH_STACK: {
      const techs = data.technologies || [];
      const style = data.style || 'for-the-badge';
      const align = data.align || 'center';
      const alignClass = align === 'center' ? 'justify-center' : (align === 'right' ? 'justify-end' : 'justify-start');

      return `
        <div class="space-y-3">
          <div class="flex items-center justify-between border-b border-zinc-800 pb-1.5">
            <h2 
              class="canvas-editable-heading text-xl font-semibold text-foreground outline-none hover:bg-zinc-800/40 focus:bg-zinc-800/60 rounded px-1.5 transition cursor-text"
              contenteditable="true"
              data-field="heading"
              data-section-id="${id}"
            >${escapeHtml(data.heading || 'Built With')}</h2>

            <div class="flex items-center gap-1.5 select-none">
              <button class="open-tech-picker-canvas-btn btn-primary text-xs px-2.5 py-1 flex items-center gap-1 shadow-xs cursor-pointer">
                <span>➕</span> Add Technology
              </button>
            </div>
          </div>

          <div class="flex flex-wrap items-center ${alignClass} gap-2 pt-1">
            ${techs.map(tId => {
              const tech = TECH_CATALOG.find(t => t.id === tId) || { name: tId, logo: tId, color: 'blue' };
              const badgeUrl = getBadgeUrl(tech, style);
              return `
                <div class="tech-badge-chip group/chip relative inline-flex items-center select-none" data-id="${tId}">
                  <img src="${badgeUrl}" alt="${tech.name}" class="h-6 rounded shadow-xs" />
                  <button 
                    class="remove-canvas-tech-btn absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] opacity-0 group-hover/chip:opacity-100 transition flex items-center justify-center shadow-md cursor-pointer hover:bg-rose-500"
                    data-tech-id="${tId}"
                    title="Remove ${tech.name}"
                  >✕</button>
                </div>
              `;
            }).join('')}
            ${techs.length === 0 ? '<p class="text-xs text-muted-foreground italic">No technologies added yet. Click "+ Add Technology" above.</p>' : ''}
          </div>
        </div>
      `;
    }

    case SECTION_TYPES.FEATURES: {
      const items = data.items || [];
      return `
        <div class="space-y-3">
          <div class="flex items-center justify-between border-b border-zinc-800 pb-1.5">
            <h2 
              class="canvas-editable-heading text-xl font-semibold text-foreground outline-none hover:bg-zinc-800/40 focus:bg-zinc-800/60 rounded px-1.5 transition cursor-text"
              contenteditable="true"
              data-field="heading"
              data-section-id="${id}"
            >${escapeHtml(data.heading || 'Key Features')}</h2>

            <button class="add-canvas-feature-btn btn-primary text-xs px-2.5 py-1 flex items-center gap-1 cursor-pointer">
              <span>➕</span> Add Feature
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            ${items.map((feat, idx) => `
              <div class="feature-item-card group/feat p-3 bg-zinc-900/60 border border-zinc-800/80 rounded-lg space-y-1 relative hover:border-zinc-700 transition">
                <button class="delete-canvas-feature-btn absolute top-2 right-2 text-zinc-500 hover:text-rose-400 opacity-0 group-hover/feat:opacity-100 transition text-xs p-1 cursor-pointer" data-idx="${idx}" title="Delete feature">✕</button>
                <div class="flex items-center gap-2">
                  <span 
                    class="canvas-feat-icon text-lg cursor-text outline-none hover:bg-zinc-800/60 rounded px-1"
                    contenteditable="true"
                    data-idx="${idx}"
                    data-subfield="icon"
                  >${escapeHtml(feat.icon || '✨')}</span>
                  <span 
                    class="canvas-feat-title font-semibold text-sm text-foreground outline-none hover:bg-zinc-800/60 rounded px-1 flex-1 cursor-text"
                    contenteditable="true"
                    data-idx="${idx}"
                    data-subfield="title"
                  >${escapeHtml(feat.title || 'Feature Title')}</span>
                </div>
                <p 
                  class="canvas-feat-desc text-xs text-zinc-400 leading-relaxed outline-none hover:bg-zinc-800/60 rounded px-1 cursor-text whitespace-pre-wrap"
                  contenteditable="true"
                  data-idx="${idx}"
                  data-subfield="desc"
                >${escapeHtml(feat.desc || 'Feature description...')}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    case SECTION_TYPES.INSTALLATION: {
      const steps = data.steps || [];
      const pm = data.packageManager || 'npm';
      return `
        <div class="space-y-3">
          <div class="flex items-center justify-between border-b border-zinc-800 pb-1.5">
            <h2 
              class="canvas-editable-heading text-xl font-semibold text-foreground outline-none hover:bg-zinc-800/40 focus:bg-zinc-800/60 rounded px-1.5 transition cursor-text"
              contenteditable="true"
              data-field="heading"
              data-section-id="${id}"
            >${escapeHtml(data.heading || 'Getting Started / Installation')}</h2>

            <div class="flex items-center gap-2 select-none">
              <!-- Package Manager Selector Tabs -->
              <div class="flex items-center bg-zinc-900 border border-zinc-800 rounded-md p-0.5 text-xs">
                ${['npm', 'yarn', 'pnpm', 'bun'].map(p => `
                  <button 
                    class="pm-selector-btn px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
                      pm === p ? 'bg-zinc-100 text-zinc-950 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                    }"
                    data-pm="${p}"
                  >${p}</button>
                `).join('')}
              </div>

              <button class="add-canvas-step-btn btn-primary text-xs px-2.5 py-1 flex items-center gap-1 cursor-pointer">
                <span>➕</span> Add Step
              </button>
            </div>
          </div>

          <div class="space-y-3 pt-1">
            ${steps.map((step, idx) => `
              <div class="group/step space-y-1.5 p-2 rounded-lg hover:bg-zinc-900/30 transition relative">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 flex items-center justify-center text-[11px] font-mono">${idx + 1}</span>
                    <span 
                      class="canvas-step-title font-medium text-xs text-foreground outline-none hover:bg-zinc-800/60 rounded px-1.5 py-0.5 cursor-text"
                      contenteditable="true"
                      data-idx="${idx}"
                      data-subfield="title"
                    >${escapeHtml(step.title || 'Step Title')}</span>
                  </div>
                  <button class="delete-canvas-step-btn text-zinc-500 hover:text-rose-400 opacity-0 group-step:opacity-100 transition text-xs p-1 cursor-pointer" data-idx="${idx}">✕</button>
                </div>

                <div class="relative group/code">
                  <pre class="bg-zinc-950 border border-zinc-800 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-x-auto"><code 
                    class="canvas-step-cmd outline-none cursor-text block"
                    contenteditable="true"
                    data-idx="${idx}"
                    data-subfield="cmd"
                  >${escapeHtml(step.cmd || 'echo "command"')}</code></pre>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    case SECTION_TYPES.ROADMAP: {
      const tasks = data.tasks || [];
      return `
        <div class="space-y-3">
          <div class="flex items-center justify-between border-b border-zinc-800 pb-1.5">
            <h2 
              class="canvas-editable-heading text-xl font-semibold text-foreground outline-none hover:bg-zinc-800/40 focus:bg-zinc-800/60 rounded px-1.5 transition cursor-text"
              contenteditable="true"
              data-field="heading"
              data-section-id="${id}"
            >${escapeHtml(data.heading || 'Roadmap')}</h2>

            <button class="add-canvas-task-btn btn-primary text-xs px-2.5 py-1 flex items-center gap-1 cursor-pointer">
              <span>➕</span> Add Task
            </button>
          </div>

          <div class="space-y-1.5 pt-1">
            ${tasks.map((task, idx) => `
              <div class="group/task flex items-center gap-2.5 p-2 rounded-md hover:bg-zinc-900/40 transition">
                <input 
                  type="checkbox" 
                  class="canvas-task-checkbox rounded border-zinc-700 text-zinc-100 focus:ring-0 cursor-pointer w-4 h-4"
                  ${task.completed ? 'checked' : ''} 
                  data-idx="${idx}" 
                />
                <span 
                  class="canvas-task-text text-sm flex-1 outline-none hover:bg-zinc-800/50 rounded px-1.5 py-0.5 cursor-text ${
                    task.completed ? 'line-through text-zinc-500' : 'text-zinc-200'
                  }"
                  contenteditable="true"
                  data-idx="${idx}"
                >${escapeHtml(task.text || 'Task milestone')}</span>
                <button class="delete-canvas-task-btn text-zinc-500 hover:text-rose-400 opacity-0 group-task:opacity-100 transition text-xs p-1 cursor-pointer" data-idx="${idx}">✕</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    case SECTION_TYPES.LICENSE: {
      const activeLic = getLicenseById(data.type || 'MIT');
      const year = data.year || new Date().getFullYear().toString();
      const holder = data.holder || 'Your Name';
      const proj = data.projectName || '';
      const text = activeLic.generateText(year, holder, proj);

      return `
        <div class="space-y-3">
          <div class="flex items-center justify-between border-b border-zinc-800 pb-1.5">
            <h2 
              class="canvas-editable-heading text-xl font-semibold text-foreground outline-none hover:bg-zinc-800/40 focus:bg-zinc-800/60 rounded px-1.5 transition cursor-text"
              contenteditable="true"
              data-field="heading"
              data-section-id="${id}"
            >${escapeHtml(data.heading || 'License')}</h2>

            <div class="flex items-center gap-2 select-none">
              <button class="copy-canvas-lic-btn btn-secondary text-xs px-2.5 py-1 flex items-center gap-1 cursor-pointer">
                <span>📋</span> Copy Text
              </button>
              <button class="download-canvas-lic-btn btn-primary text-xs px-2.5 py-1 flex items-center gap-1 cursor-pointer">
                <span>💾</span> Download LICENSE File
              </button>
            </div>
          </div>

          <!-- Interactive License Standard Pills -->
          <div class="flex items-center gap-1.5 flex-wrap select-none pt-1">
            <span class="text-xs text-muted-foreground mr-1">Standard:</span>
            ${['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'ISC', 'Unlicense'].map(licId => `
              <button 
                class="lic-pill-btn px-2.5 py-1 text-xs rounded-md border transition cursor-pointer ${
                  activeLic.id === licId 
                    ? 'bg-zinc-100 text-zinc-950 font-bold border-zinc-100 shadow-xs' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }"
                data-lic="${licId}"
              >${licId}</button>
            `).join('')}
          </div>

          <p class="text-xs text-zinc-400">
            Distributed under the <strong class="text-zinc-200">${activeLic.name}</strong>. See <code class="text-zinc-300">LICENSE</code> for more information.
          </p>

          <details class="bg-zinc-950 border border-zinc-800/80 rounded-lg p-3 text-xs text-zinc-400 cursor-pointer">
            <summary class="font-medium text-zinc-300 hover:text-zinc-100">View Full Legal Text Preview</summary>
            <pre class="mt-2 text-[11px] font-mono leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap text-zinc-400">${escapeHtml(text)}</pre>
          </details>
        </div>
      `;
    }

    case SECTION_TYPES.CUSTOM: {
      return `
        <div class="space-y-2">
          <h2 
            class="canvas-editable-heading text-xl font-semibold text-foreground border-b border-zinc-800 pb-1.5 outline-none hover:bg-zinc-800/40 focus:bg-zinc-800/60 rounded px-1.5 transition cursor-text"
            contenteditable="true"
            data-field="heading"
            data-section-id="${id}"
          >${escapeHtml(data.heading || 'Custom Section')}</h2>

          <div 
            class="canvas-editable-text font-mono text-xs text-zinc-300 bg-zinc-950/60 border border-zinc-800/80 rounded-lg p-3 outline-none hover:border-zinc-700 focus:border-zinc-600 transition cursor-text min-h-[100px] whitespace-pre-wrap leading-relaxed"
            contenteditable="true"
            data-field="markdown"
            data-section-id="${id}"
            title="Click to edit custom markdown"
          >${escapeHtml(data.markdown || 'Add custom markdown here...')}</div>
        </div>
      `;
    }

    default: {
      return `
        <div class="space-y-2">
          <h2 
            class="canvas-editable-heading text-xl font-semibold text-foreground border-b border-zinc-800 pb-1.5 outline-none hover:bg-zinc-800/40 focus:bg-zinc-800/60 rounded px-1.5 transition cursor-text"
            contenteditable="true"
            data-field="heading"
            data-section-id="${id}"
          >${escapeHtml(data.heading || section.title)}</h2>
          <p class="text-xs text-muted-foreground">Click the ⚙️ gear icon in the top right to customize this section's parameters.</p>
        </div>
      `;
    }
  }
}

/**
 * Render popover for quick badge customization right on the canvas
 */
function renderBadgePopoverHtml(data, sectionId) {
  const flags = [
    { key: 'showStars', label: 'GitHub Stars' },
    { key: 'showForks', label: 'GitHub Forks' },
    { key: 'showIssues', label: 'Open Issues' },
    { key: 'showPRs', label: 'Pull Requests' },
    { key: 'showLicense', label: 'License' },
    { key: 'showRelease', label: 'Latest Release' },
    { key: 'showLastCommit', label: 'Last Commit' },
    { key: 'showCodeSize', label: 'Repository Size' }
  ];

  return `
    <div class="badge-popover-box mt-2 p-3 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl text-left max-w-md mx-auto space-y-2.5 animate-in fade-in duration-100 z-30">
      <div class="flex items-center justify-between border-b border-zinc-800 pb-1.5">
        <span class="text-xs font-semibold text-zinc-200">Toggle Badges</span>
        <button class="close-badge-popover-btn text-xs text-zinc-400 hover:text-zinc-100 p-1 cursor-pointer">✕</button>
      </div>

      <div class="grid grid-cols-2 gap-2 text-xs">
        ${flags.map(f => `
          <label class="flex items-center gap-1.5 cursor-pointer text-zinc-300 hover:text-zinc-100">
            <input type="checkbox" class="badge-flag-toggle rounded border-zinc-700 text-zinc-100 cursor-pointer" data-flag="${f.key}" ${data[f.key] ? 'checked' : ''} />
            <span>${f.label}</span>
          </label>
        `).join('')}
      </div>

      <div class="flex items-center justify-between border-t border-zinc-800 pt-2">
        <select class="badge-style-select form-input text-xs py-1 h-7 w-auto">
          <option value="for-the-badge" ${data.style === 'for-the-badge' ? 'selected' : ''}>for-the-badge</option>
          <option value="flat-square" ${data.style === 'flat-square' ? 'selected' : ''}>flat-square</option>
          <option value="flat" ${data.style === 'flat' ? 'selected' : ''}>flat</option>
          <option value="plastic" ${data.style === 'plastic' ? 'selected' : ''}>plastic</option>
        </select>
        <button class="close-badge-popover-btn btn-primary text-xs px-2.5 py-1 cursor-pointer">Done</button>
      </div>
    </div>
  `;
}

/**
 * Attach dynamic event listeners for direct in-place editing and block manipulation
 */
function attachCanvasEventListeners(container, state) {
  const getSec = (id) => store.getState().sections.find(s => s.id === id);

  // 1. In-place contenteditable text inputs
  container.querySelectorAll('[contenteditable="true"]').forEach(el => {
    el.addEventListener('input', () => {
      const sectionId = el.dataset.sectionId || el.closest('.interactive-section-block')?.dataset.sectionId;
      if (!sectionId) return;

      const field = el.dataset.field;
      const subfield = el.dataset.subfield;
      const idx = el.dataset.idx !== undefined ? parseInt(el.dataset.idx, 10) : null;
      const val = el.innerText;

      if (field) {
        store.updateSectionData(sectionId, { [field]: val });
      } else if (subfield && idx !== null) {
        const sec = getSec(sectionId);
        if (!sec || !sec.data) return;

        if (sec.type === SECTION_TYPES.FEATURES && Array.isArray(sec.data.items)) {
          const items = JSON.parse(JSON.stringify(sec.data.items));
          if (items[idx]) {
            items[idx][subfield] = val;
            store.updateSectionData(sectionId, { items });
          }
        } else if (sec.type === SECTION_TYPES.INSTALLATION && Array.isArray(sec.data.steps)) {
          const steps = JSON.parse(JSON.stringify(sec.data.steps));
          if (steps[idx]) {
            steps[idx][subfield] = val;
            store.updateSectionData(sectionId, { steps });
          }
        }
      } else if (idx !== null && el.classList.contains('canvas-task-text')) {
        const sec = getSec(sectionId);
        if (sec && Array.isArray(sec.data.tasks)) {
          const tasks = JSON.parse(JSON.stringify(sec.data.tasks));
          if (tasks[idx]) {
            tasks[idx].text = val;
            store.updateSectionData(sectionId, { tasks });
          }
        }
      }
    });

    // Prevent enter adding extra divs in single-line headings
    if (el.classList.contains('canvas-editable-heading')) {
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          el.blur();
        }
      });
    }
  });

  // 2. Section Floating Toolbar Handlers (▲, ▼, ⚙️, 📑, 🗑️)
  container.querySelectorAll('.sec-move-up-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      store.moveSection(btn.dataset.id, 'up');
    });
  });

  container.querySelectorAll('.sec-move-down-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      store.moveSection(btn.dataset.id, 'down');
    });
  });

  container.querySelectorAll('.sec-inspector-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      store.setActiveSection(btn.dataset.id);
      openSlideOverInspector(btn.dataset.id);
    });
  });

  container.querySelectorAll('.sec-duplicate-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const newId = store.duplicateSection(btn.dataset.id);
      if (newId) showToast('Section duplicated!', 'success');
    });
  });

  container.querySelectorAll('.sec-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sec = getSec(btn.dataset.id);
      if (confirm(`Remove the section "${sec?.title || 'this section'}"?`)) {
        store.removeSection(btn.dataset.id);
        showToast('Section removed', 'info');
      }
    });
  });

  // 3. In-between Section Adders
  container.querySelectorAll('.insert-section-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const insertIndex = parseInt(btn.dataset.insertIndex, 10);
      openSectionLibrary(insertIndex);
    });
  });

  // 4. Hero Banner Studio & Remove Handlers
  container.querySelectorAll('.open-hero-studio-btn').forEach(btn => {
    btn.addEventListener('click', () => renderPhotoModal('hero'));
  });

  container.querySelectorAll('.remove-banner-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const secId = btn.closest('.interactive-section-block')?.dataset.sectionId;
      if (secId) store.updateSectionData(secId, { showLogo: false, logoUrl: '' });
    });
  });

  // 5. Tech Stack Handlers
  container.querySelectorAll('.open-tech-picker-canvas-btn').forEach(btn => {
    btn.addEventListener('click', () => renderTechPickerModal());
  });

  container.querySelectorAll('.remove-canvas-tech-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const secId = btn.closest('.interactive-section-block')?.dataset.sectionId;
      const tId = btn.dataset.techId;
      if (secId && tId) {
        const sec = getSec(secId);
        const list = sec?.data?.technologies || [];
        store.updateSectionData(secId, { technologies: list.filter(t => t !== tId) });
      }
    });
  });

  // 6. Feature List Handlers
  container.querySelectorAll('.add-canvas-feature-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const secId = btn.closest('.interactive-section-block')?.dataset.sectionId;
      if (!secId) return;
      const sec = getSec(secId);
      const items = [...(sec?.data?.items || [])];
      items.push({ icon: '✨', title: 'New Feature', desc: 'Describe your new feature in a few clear sentences.' });
      store.updateSectionData(secId, { items });
    });
  });

  container.querySelectorAll('.delete-canvas-feature-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const secId = btn.closest('.interactive-section-block')?.dataset.sectionId;
      const idx = parseInt(btn.dataset.idx, 10);
      if (!secId) return;
      const sec = getSec(secId);
      const items = (sec?.data?.items || []).filter((_, i) => i !== idx);
      store.updateSectionData(secId, { items });
    });
  });

  // 7. Installation Steps & Package Manager Handlers
  container.querySelectorAll('.add-canvas-step-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const secId = btn.closest('.interactive-section-block')?.dataset.sectionId;
      if (!secId) return;
      const sec = getSec(secId);
      const steps = [...(sec?.data?.steps || [])];
      steps.push({ title: 'New Step', cmd: 'npm run start' });
      store.updateSectionData(secId, { steps });
    });
  });

  container.querySelectorAll('.delete-canvas-step-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const secId = btn.closest('.interactive-section-block')?.dataset.sectionId;
      const idx = parseInt(btn.dataset.idx, 10);
      if (!secId) return;
      const sec = getSec(secId);
      const steps = (sec?.data?.steps || []).filter((_, i) => i !== idx);
      store.updateSectionData(secId, { steps });
    });
  });

  container.querySelectorAll('.pm-selector-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const secId = btn.closest('.interactive-section-block')?.dataset.sectionId;
      const pm = btn.dataset.pm;
      if (secId && pm) store.updateSectionData(secId, { packageManager: pm });
    });
  });

  // 8. Roadmap Task Checkboxes & Adders
  container.querySelectorAll('.canvas-task-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const secId = cb.closest('.interactive-section-block')?.dataset.sectionId;
      const idx = parseInt(cb.dataset.idx, 10);
      if (!secId) return;
      const sec = getSec(secId);
      const tasks = JSON.parse(JSON.stringify(sec?.data?.tasks || []));
      if (tasks[idx]) {
        tasks[idx].completed = cb.checked;
        store.updateSectionData(secId, { tasks });
      }
    });
  });

  container.querySelectorAll('.add-canvas-task-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const secId = btn.closest('.interactive-section-block')?.dataset.sectionId;
      if (!secId) return;
      const sec = getSec(secId);
      const tasks = [...(sec?.data?.tasks || [])];
      tasks.push({ text: 'New milestone', completed: false });
      store.updateSectionData(secId, { tasks });
    });
  });

  container.querySelectorAll('.delete-canvas-task-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const secId = btn.closest('.interactive-section-block')?.dataset.sectionId;
      const idx = parseInt(btn.dataset.idx, 10);
      if (!secId) return;
      const sec = getSec(secId);
      const tasks = (sec?.data?.tasks || []).filter((_, i) => i !== idx);
      store.updateSectionData(secId, { tasks });
    });
  });

  // 9. License Studio Pills & Actions
  container.querySelectorAll('.lic-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const secId = btn.closest('.interactive-section-block')?.dataset.sectionId;
      const lic = btn.dataset.lic;
      if (secId && lic) store.updateSectionData(secId, { type: lic });
    });
  });

  container.querySelectorAll('.download-canvas-lic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const secId = btn.closest('.interactive-section-block')?.dataset.sectionId;
      const sec = getSec(secId);
      const data = sec?.data || {};
      const lic = getLicenseById(data.type || 'MIT');
      const year = data.year || new Date().getFullYear().toString();
      const holder = data.holder || 'Your Name';
      const proj = data.projectName || '';
      const text = lic.generateText(year, holder, proj);
      downloadReadmeFile(text, 'LICENSE');
      fireConfetti();
      showToast(`Downloaded LICENSE (${lic.id})!`, 'success');
    });
  });

  container.querySelectorAll('.copy-canvas-lic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const secId = btn.closest('.interactive-section-block')?.dataset.sectionId;
      const sec = getSec(secId);
      const data = sec?.data || {};
      const lic = getLicenseById(data.type || 'MIT');
      const year = data.year || new Date().getFullYear().toString();
      const holder = data.holder || 'Your Name';
      const proj = data.projectName || '';
      const text = lic.generateText(year, holder, proj);
      copyToClipboard(text, `Copied ${lic.name} agreement to clipboard!`);
    });
  });

  // 10. Badge Popover Handlers
  container.querySelectorAll('.open-badge-popover-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const sId = btn.dataset.id;
      activeBadgePopoverSectionId = (activeBadgePopoverSectionId === sId) ? null : sId;
      renderInteractiveCanvas(container, store.getState(), { force: true });
    });
  });

  container.querySelectorAll('.close-badge-popover-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeBadgePopoverSectionId = null;
      renderInteractiveCanvas(container, store.getState(), { force: true });
    });
  });

  container.querySelectorAll('.badge-flag-toggle').forEach(cb => {
    cb.addEventListener('change', () => {
      const secId = cb.closest('.interactive-section-block')?.dataset.sectionId;
      const flag = cb.dataset.flag;
      if (secId && flag) {
        store.updateSectionData(secId, { [flag]: cb.checked });
      }
    });
  });

  container.querySelectorAll('.badge-style-select').forEach(sel => {
    sel.addEventListener('change', () => {
      const secId = sel.closest('.interactive-section-block')?.dataset.sectionId;
      if (secId) store.updateSectionData(secId, { style: sel.value });
    });
  });
}

/**
 * Slide-Over Inspector Drawer Controller
 */
export function openSlideOverInspector(sectionId) {
  const panel = document.getElementById('slide-over-inspector');
  if (!panel) return;

  panel.classList.remove('translate-x-full');
  panel.classList.add('translate-x-0');

  const contentContainer = panel.querySelector('#inspector-form-container');
  if (contentContainer) {
    renderSectionEditor(contentContainer, { force: true });
  }
}

export function closeSlideOverInspector() {
  const panel = document.getElementById('slide-over-inspector');
  if (panel) {
    panel.classList.add('translate-x-full');
    panel.classList.remove('translate-x-0');
  }
}
