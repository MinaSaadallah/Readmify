/**
 * Readmify - Interactive Canvas Engine (v5 Simple Living Document)
 * Ultra-simple, kid-friendly direct in-place editing:
 * - 1-Click direct on-image editing (width, corners, crop ratio, file upload, URL swap, delete)
 * - Clean SVG icons throughout (zero emojis)
 * - Effortless outline & inline add/remove/reorder
 */
import { store } from '../store.js';
import { SECTION_TYPES } from '../data/defaultSections.js';
import { TECH_CATALOG, getBadgeUrl } from '../data/techCatalog.js';
import { getLicenseById } from '../data/licenses.js';
import { renderTechPickerModal } from './techPicker.js';
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

// Minimalist SVG icons
const SVG_ICONS = {
  plus: '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>',
  up: '<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>',
  down: '<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>',
  gear: '<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  copy: '<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>',
  trash: '<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  upload: '<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>',
  link: '<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  shield: '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  download: '<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>',
  image: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>'
};

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
        <div class="w-12 h-12 mx-auto rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <div class="space-y-1">
          <h3 class="text-base font-semibold text-foreground">Your README is Empty</h3>
          <p class="text-xs">Add sections from the library or use the Quick Guide scanner to get started.</p>
        </div>
        <div class="pt-2">
          <button id="canvas-empty-add-btn" class="btn-primary text-xs px-4 py-2 shadow-sm flex items-center gap-1.5 mx-auto cursor-pointer">
            ${SVG_ICONS.plus}
            <span>Open Section Library</span>
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

    // Top In-between Section Add Divider (also a drop target for drag reorder + library cards)
    html += `
      <div class="add-section-divider group/divider py-2 flex items-center justify-center relative select-none min-h-[20px]" data-drop-index="${idx}">
        <div class="divider-line h-[1px] bg-border/40 w-full group-hover/divider:bg-zinc-600 transition"></div>
        <button
          class="insert-section-btn absolute opacity-0 group-hover/divider:opacity-100 transition-all px-2.5 py-0.5 text-[10px] font-medium rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 shadow-sm flex items-center gap-1 cursor-pointer"
          data-insert-index="${idx}"
          title="Insert section here (or drop a dragged section / library card)"
        >
          ${SVG_ICONS.plus}
          <span>Add Section</span>
        </button>
      </div>
    `;

    // Section Block (draggable via grip handle)
    html += `
      <section
        class="interactive-section-block group relative rounded-lg border border-transparent hover:border-zinc-700/80 p-3 sm:p-4 transition-all ${
          sec.id === activeSectionId ? 'canvas-section-focused' : ''
        }"
        data-section-id="${sec.id}"
        draggable="false"
      >
        <!-- Floating Section Action Toolbar (Top Right on Hover) -->
        <div class="section-hover-toolbar absolute -top-3.5 right-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all duration-150 flex items-center gap-0.5 bg-zinc-900 border border-zinc-700/80 rounded-md px-1.5 py-0.5 shadow-xl text-xs z-30 select-none">
          <span class="drag-grip px-1 text-zinc-500 hover:text-zinc-100 cursor-grab" draggable="true" data-grip-id="${sec.id}" title="Drag to reorder">⠿</span>
          <span class="text-[10px] text-zinc-400 font-mono px-1 font-semibold">${idx + 1}</span>
          <button class="sec-move-up-btn p-1 text-zinc-400 hover:text-zinc-100 rounded hover:bg-zinc-800 transition ${isFirst ? 'opacity-30 pointer-events-none' : ''}" title="Move Up" data-id="${sec.id}">
            ${SVG_ICONS.up}
          </button>
          <button class="sec-move-down-btn p-1 text-zinc-400 hover:text-zinc-100 rounded hover:bg-zinc-800 transition ${isLast ? 'opacity-30 pointer-events-none' : ''}" title="Move Down" data-id="${sec.id}">
            ${SVG_ICONS.down}
          </button>
          <button class="sec-inspector-btn p-1 text-zinc-400 hover:text-zinc-100 rounded hover:bg-zinc-800 transition" title="Section Settings" data-id="${sec.id}">
            ${SVG_ICONS.gear}
          </button>
          <button class="sec-duplicate-btn p-1 text-zinc-400 hover:text-zinc-100 rounded hover:bg-zinc-800 transition" title="Duplicate Section" data-id="${sec.id}">
            ${SVG_ICONS.copy}
          </button>
          <button class="sec-delete-btn p-1 text-rose-400 hover:text-rose-300 rounded hover:bg-rose-950/40 transition" title="Delete Section" data-id="${sec.id}">
            ${SVG_ICONS.trash}
          </button>
        </div>

        <!-- Section Content -->
        <div class="section-inner-content">
          ${renderSectionInteractiveContent(sec, state)}
        </div>
      </section>
    `;
  });

  // Bottom In-between Add Divider (drop target)
  html += `
    <div class="add-section-divider group/divider py-3 flex items-center justify-center relative select-none min-h-[24px]" data-drop-index="${sections.length}">
      <div class="divider-line h-[1px] bg-border/40 w-full group-hover/divider:bg-zinc-600 transition"></div>
      <button 
        class="insert-section-btn px-3 py-1 text-xs font-medium rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 shadow-sm flex items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition"
        data-insert-index="${sections.length}"
        title="Add section to README"
      >
        ${SVG_ICONS.plus}
        <span>Add Section to README</span>
      </button>
    </div>
  `;

  html += `</div>`;

  container.innerHTML = html;
  attachCanvasEventListeners(container, state);
}

/**
 * Direct 1-Click On-Image Toolbar & Wrapper
 * Provides 1-click resize pills, corner radius pills, crop ratio presets, replace file picker, and remove button.
 */
function renderDirectImageEditorHtml(imageUrl, options, sectionId, imageType = 'hero') {
  const { width = '100%', radius = '8px', ratio = 'auto' } = options;
  const ratioStyle = ratio && ratio !== 'auto' ? `aspect-ratio: ${ratio}; object-fit: cover;` : '';

  return `
    <div class="direct-image-editor-container group/imgctrl relative inline-block my-3 max-w-full" data-section-id="${sectionId}" data-image-type="${imageType}">
      <!-- Image Display Card -->
      <div class="relative inline-block max-w-full overflow-hidden transition-all shadow-md bg-zinc-900 border border-border/60" style="border-radius: ${radius};">
        <img
          src="${imageUrl}"
          alt="Image"
          loading="lazy" decoding="async"
          style="width: ${width}; ${ratioStyle}"
          class="max-w-full mx-auto block transition-all"
        />
      </div>

      <!-- Instant 1-Click On-Image Control Strip (Ultra-easy for kids & beginners) -->
      <div class="image-control-strip mt-2.5 flex flex-wrap items-center justify-center gap-1.5 bg-zinc-900 border border-zinc-700/80 rounded-lg px-2.5 py-1.5 shadow-xl text-xs select-none">
        <!-- Size Pills -->
        <span class="text-[11px] text-zinc-400 font-medium mr-0.5">Size:</span>
        <div class="inline-flex bg-zinc-800 rounded p-0.5 border border-zinc-700/60">
          ${['25%', '50%', '75%', '100%'].map(sz => `
            <button 
              type="button"
              class="img-size-btn px-2 py-0.5 text-[10px] rounded transition cursor-pointer font-medium ${width === sz ? 'bg-zinc-100 text-zinc-950 font-bold shadow-xs' : 'text-zinc-400 hover:text-zinc-200'}" 
              data-size="${sz}"
            >${sz}</button>
          `).join('')}
        </div>

        <span class="text-zinc-700 mx-0.5">|</span>

        <!-- Corners Pills -->
        <span class="text-[11px] text-zinc-400 font-medium mr-0.5">Corners:</span>
        <div class="inline-flex bg-zinc-800 rounded p-0.5 border border-zinc-700/60">
          ${[
            { r: '0px', label: 'Sharp' },
            { r: '8px', label: 'Round' },
            { r: '24px', label: 'Pill' }
          ].map(cr => `
            <button 
              type="button"
              class="img-radius-btn px-2 py-0.5 text-[10px] rounded transition cursor-pointer font-medium ${radius === cr.r ? 'bg-zinc-100 text-zinc-950 font-bold shadow-xs' : 'text-zinc-400 hover:text-zinc-200'}" 
              data-radius="${cr.r}"
            >${cr.label}</button>
          `).join('')}
        </div>

        <span class="text-zinc-700 mx-0.5">|</span>

        <!-- Aspect Ratio / Crop Pills -->
        <span class="text-[11px] text-zinc-400 font-medium mr-0.5">Crop:</span>
        <div class="inline-flex bg-zinc-800 rounded p-0.5 border border-zinc-700/60">
          ${[
            { r: 'auto', label: 'Auto' },
            { r: '3/1', label: '3:1' },
            { r: '16/9', label: '16:9' },
            { r: '1/1', label: '1:1' }
          ].map(rt => `
            <button 
              type="button"
              class="img-ratio-btn px-2 py-0.5 text-[10px] rounded transition cursor-pointer font-medium ${ratio === rt.r ? 'bg-zinc-100 text-zinc-950 font-bold shadow-xs' : 'text-zinc-400 hover:text-zinc-200'}" 
              data-ratio="${rt.r}"
            >${rt.label}</button>
          `).join('')}
        </div>

        <span class="text-zinc-700 mx-0.5">|</span>

        <!-- Replace File / URL -->
        <button 
          type="button"
          class="img-replace-file-btn px-2 py-0.5 text-[11px] rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition cursor-pointer flex items-center gap-1 shadow-xs" 
          title="Pick new image from computer"
        >
          ${SVG_ICONS.upload}
          <span>Replace</span>
        </button>

        <button 
          type="button"
          class="img-replace-url-btn px-2 py-0.5 text-[11px] rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 border border-zinc-700 transition cursor-pointer" 
          title="Paste image link"
        >
          URL
        </button>

        <!-- Delete Button -->
        <button 
          type="button"
          class="img-delete-btn p-1 rounded bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/50 transition cursor-pointer ml-1" 
          title="Remove image"
        >
          ${SVG_ICONS.trash}
        </button>

        <input type="file" class="direct-img-file-input hidden" accept="image/*" />
      </div>
    </div>
  `;
}

/**
 * Friendly Kid-friendly Dropzone Box when no image is present
 */
function renderKidFriendlyDropzone(sectionId, title = 'Add Project Banner / Logo', imageType = 'hero') {
  return `
    <div class="kid-dropzone-box border-2 border-dashed border-zinc-700/80 hover:border-zinc-500 rounded-xl p-5 text-center transition bg-zinc-900/30 hover:bg-zinc-900/60 select-none my-3 cursor-pointer group" data-section-id="${sectionId}" data-image-type="${imageType}">
      <div class="w-9 h-9 mx-auto rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 transition mb-2">
        ${SVG_ICONS.image}
      </div>
      <p class="text-xs font-semibold text-foreground">${title}</p>
      <p class="text-[11px] text-muted-foreground mt-0.5">Click to choose an image from your computer, or drag and drop</p>
      <div class="mt-2.5 flex items-center justify-center gap-2">
        <button type="button" class="dropzone-choose-file-btn px-3 py-1 text-xs font-medium rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 shadow-xs cursor-pointer flex items-center gap-1.5">
          ${SVG_ICONS.upload}
          <span>Choose File</span>
        </button>
        <button type="button" class="dropzone-enter-url-btn px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 border border-zinc-700 shadow-xs cursor-pointer">
          Paste URL
        </button>
      </div>
      <input type="file" class="dropzone-file-input hidden" accept="image/*" />
    </div>
  `;
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
      const ratio = data.aspectRatio || 'auto';

      let bannerHtml = '';
      if (data.showLogo && data.logoUrl) {
        bannerHtml = renderDirectImageEditorHtml(data.logoUrl, { width, radius, ratio }, id, 'hero');
      } else {
        bannerHtml = renderKidFriendlyDropzone(id, 'Add Project Banner / Logo', 'hero');
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
          <div class="flex items-center ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'} gap-1.5 pt-1 select-none">
            <button class="hero-visual-toggle px-2 py-0.5 text-[10px] rounded-md border transition cursor-pointer ${data.animateTagline ? 'bg-zinc-100 text-zinc-950 font-semibold border-zinc-100' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'}" data-flag="animateTagline" title="Animated typing tagline (online)">✨ Typing</button>
            <button class="hero-visual-toggle px-2 py-0.5 text-[10px] rounded-md border transition cursor-pointer ${data.showCapsuleBanner ? 'bg-zinc-100 text-zinc-950 font-semibold border-zinc-100' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'}" data-flag="showCapsuleBanner" title="Capsule-render header banner (online)">🌊 Banner</button>
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
      const lazy = 'loading="lazy" decoding="async"';
      if (data.showStars) badges.push('<img ' + lazy + ' src="https://img.shields.io/github/stars/' + owner + '/' + repo + '?style=' + style + '" alt="Stars" class="h-5" />');
      if (data.showForks) badges.push('<img ' + lazy + ' src="https://img.shields.io/github/forks/' + owner + '/' + repo + '?style=' + style + '" alt="Forks" class="h-5" />');
      if (data.showIssues) badges.push('<img ' + lazy + ' src="https://img.shields.io/github/issues/' + owner + '/' + repo + '?style=' + style + '" alt="Issues" class="h-5" />');
      if (data.showPRs) badges.push('<img ' + lazy + ' src="https://img.shields.io/github/issues-pr/' + owner + '/' + repo + '?style=' + style + '" alt="PRs" class="h-5" />');
      if (data.showLicense) badges.push('<img ' + lazy + ' src="https://img.shields.io/badge/License-MIT-blue.svg?style=' + style + '" alt="License" class="h-5" />');
      if (data.showRelease) badges.push('<img ' + lazy + ' src="https://img.shields.io/github/v/release/' + owner + '/' + repo + '?style=' + style + '" alt="Release" class="h-5" />');

      if (Array.isArray(data.customBadges)) {
        data.customBadges.forEach(cb => {
          const l = encodeURIComponent(cb.label || 'Badge');
          const m = encodeURIComponent(cb.message || 'Value');
          const c = encodeURIComponent(cb.color || 'blue');
          badges.push('<img ' + lazy + ' src="https://img.shields.io/badge/' + l + '-' + m + '-' + c + '?style=' + style + '" alt="' + cb.label + '" class="h-5" />');
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
              ${SVG_ICONS.shield}
              <span>Badges (${badges.length}) ▾</span>
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
      const tileSize = data.tileSize || 'medium';
      const tileStyle = data.tileStyle || 'badges';
      const alignClass = align === 'center' ? 'justify-center' : (align === 'right' ? 'justify-end' : 'justify-start');
      const imgH = tileSize === 'small' ? 'h-5' : tileSize === 'large' ? 'h-7' : tileSize === 'xlarge' ? 'h-8' : 'h-6';

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
              <div class="hidden sm:flex items-center bg-zinc-900 border border-zinc-800 rounded-md p-0.5 text-[10px]">
                ${['small', 'medium', 'large'].map(sz => `
                  <button class="tile-size-btn px-1.5 py-0.5 rounded transition cursor-pointer ${tileSize === sz ? 'bg-zinc-100 text-zinc-950 font-semibold' : 'text-zinc-400 hover:text-zinc-200'}" data-size="${sz}" data-id="${id}" title="Tile size ${sz}">${sz[0].toUpperCase()}</button>
                `).join('')}
              </div>
              <button class="open-tech-picker-canvas-btn btn-primary text-xs px-2.5 py-1 flex items-center gap-1 shadow-xs cursor-pointer">
                ${SVG_ICONS.plus}
                <span>Tiles</span>
              </button>
            </div>
          </div>

          <div class="tile-grid tile-size-${tileSize} tile-style-${tileStyle} ${alignClass} pt-1" data-tech-dropzone="${id}">
            ${techs.map(tId => {
              const tech = TECH_CATALOG.find(t => t.id === tId) || { name: tId, logo: tId, color: 'blue' };
              const badgeUrl = getBadgeUrl(tech, style);
              return `
                <div class="tile-chip tech-badge-chip group/chip" draggable="true" data-tech-id="${tId}" data-id="${tId}" title="Drag to reorder — hover to remove">
                  <span class="drag-grip text-zinc-600 text-[10px]">⠿</span>
                  <img src="${badgeUrl}" alt="${tech.name}" loading="lazy" decoding="async" class="${imgH} rounded shadow-xs pointer-events-none" />
                  <button
                    class="remove-canvas-tech-btn w-4 h-4 bg-rose-600/80 text-white rounded-full text-[10px] opacity-0 group-hover/chip:opacity-100 transition flex items-center justify-center cursor-pointer hover:bg-rose-500"
                    data-tech-id="${tId}"
                    title="Remove ${tech.name}"
                  >✕</button>
                </div>
              `;
            }).join('')}
            ${techs.length === 0 ? '<p class="text-xs text-muted-foreground italic w-full">No tiles yet. Click “Tiles” or drag from Tech Picker. Tip: drop images anywhere to set banners.</p>' : ''}
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

            <button class="add-canvas-feature-btn btn-primary text-xs px-2.5 py-1 flex items-center gap-1 cursor-pointer shadow-xs">
              ${SVG_ICONS.plus}
              <span>Add Feature</span>
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            ${items.map((feat, idx) => `
              <div class="feature-item-card group/feat p-3 bg-zinc-900/60 border border-zinc-800/80 rounded-lg space-y-1 relative hover:border-zinc-700 transition">
                <button class="delete-canvas-feature-btn absolute top-2 right-2 text-zinc-500 hover:text-rose-400 opacity-0 group-hover/feat:opacity-100 transition text-xs p-1 cursor-pointer" data-idx="${idx}" title="Delete feature">✕</button>
                <div class="flex items-center gap-2">
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

    case SECTION_TYPES.DEMO: {
      const width = data.width || '100%';
      const radius = data.radius || '8px';
      const ratio = data.aspectRatio || 'auto';

      let imageHtml = '';
      if (data.imageUrl) {
        imageHtml = renderDirectImageEditorHtml(data.imageUrl, { width, radius, ratio }, id, 'demo');
      } else {
        imageHtml = renderKidFriendlyDropzone(id, 'Add Preview Screenshot / GIF', 'demo');
      }

      return `
        <div class="space-y-3">
          <div class="border-b border-zinc-800 pb-1.5">
            <h2 
              class="canvas-editable-heading text-xl font-semibold text-foreground outline-none hover:bg-zinc-800/40 focus:bg-zinc-800/60 rounded px-1.5 transition cursor-text"
              contenteditable="true"
              data-field="heading"
              data-section-id="${id}"
            >${escapeHtml(data.heading || 'Preview & Screenshots')}</h2>
          </div>

          <div class="text-center py-1">
            ${imageHtml}
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

              <button class="add-canvas-step-btn btn-primary text-xs px-2.5 py-1 flex items-center gap-1 cursor-pointer shadow-xs">
                ${SVG_ICONS.plus}
                <span>Add Step</span>
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

    case SECTION_TYPES.PROJECT_STRUCTURE: {
      return `
        <div class="space-y-3">
          <div class="border-b border-zinc-800 pb-1.5">
            <h2 
              class="canvas-editable-heading text-xl font-semibold text-foreground outline-none hover:bg-zinc-800/40 focus:bg-zinc-800/60 rounded px-1.5 transition cursor-text"
              contenteditable="true"
              data-field="heading"
              data-section-id="${id}"
            >${escapeHtml(data.heading || 'Project Structure')}</h2>
          </div>
          <pre class="bg-zinc-950 border border-zinc-800 rounded-lg p-3 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed"><code 
            class="outline-none cursor-text block whitespace-pre"
            contenteditable="true"
            data-field="tree"
            data-section-id="${id}"
          >${escapeHtml(data.tree || '.\n├── src/\n│   ├── index.js\n│   └── utils.js\n├── package.json\n└── README.md')}</code></pre>
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

            <button class="add-canvas-task-btn btn-primary text-xs px-2.5 py-1 flex items-center gap-1 cursor-pointer shadow-xs">
              ${SVG_ICONS.plus}
              <span>Add Task</span>
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
                ${SVG_ICONS.copy}
                <span>Copy</span>
              </button>
              <button class="download-canvas-lic-btn btn-primary text-xs px-2.5 py-1 flex items-center gap-1 cursor-pointer shadow-xs">
                ${SVG_ICONS.download}
                <span>Download LICENSE</span>
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
            <summary class="font-medium text-zinc-300 hover:text-zinc-100">View Full Legal Text</summary>
            <pre class="mt-2 text-[11px] font-mono leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap text-zinc-400">${escapeHtml(text)}</pre>
          </details>
        </div>
      `;
    }

    case SECTION_TYPES.STATS: {
      const toggles = [
        { key: 'showActivityGraph', label: 'Activity graph' },
        { key: 'showContributors', label: 'Contributors' },
        { key: 'showStarHistory', label: 'Star history' },
        { key: 'showTopLangs', label: 'Top langs' },
        { key: 'showStreak', label: 'Streak' },
        { key: 'showVisitors', label: 'Visitors' }
      ];
      return `
        <div class="space-y-3">
          <div class="border-b border-zinc-800 pb-1.5">
            <h2
              class="canvas-editable-heading text-xl font-semibold text-foreground outline-none hover:bg-zinc-800/40 focus:bg-zinc-800/60 rounded px-1.5 transition cursor-text"
              contenteditable="true"
              data-field="heading"
              data-section-id="${id}"
            >${escapeHtml(data.heading || 'Stats & Activity')}</h2>
            <p class="text-[11px] text-muted-foreground mt-0.5">Opt-in online visuals — README still works offline, images load on GitHub.</p>
          </div>
          <div class="flex flex-wrap gap-1.5 select-none">
            ${toggles.map(t => `
              <button class="stats-toggle-btn px-2.5 py-1 text-[11px] rounded-md border transition cursor-pointer ${data[t.key] ? 'bg-zinc-100 text-zinc-950 font-semibold border-zinc-100' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'}" data-flag="${t.key}" data-id="${id}">${data[t.key] ? '✓ ' : '+ '}${t.label}</button>
            `).join('')}
          </div>
          <div
            class="canvas-editable-text text-xs text-zinc-400 outline-none hover:bg-zinc-800/40 rounded px-1.5 py-0.5 cursor-text"
            contenteditable="true" data-field="githubUser" data-section-id="${id}"
            title="GitHub username for stats"
          >${escapeHtml(data.githubUser || 'yourusername')}</div>
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
          <p class="text-xs text-muted-foreground flex items-center gap-1.5">
            <span>Configure this section via the settings icon:</span>
            <button class="sec-inspector-btn inline-flex items-center gap-1 text-foreground underline" data-id="${id}">
              ${SVG_ICONS.gear} Settings
            </button>
          </p>
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
 * Native drag-drop for sections: grip dragstart sets sectionId,
 * dividers accept drops to reorder OR insert library cards.
 */
function setupCanvasDragDrop(container) {
  if (container.dataset.dndBound === 'true') return;
  container.dataset.dndBound = 'true';
  let dragSectionId = null;

  container.addEventListener('dragstart', (e) => {
    const grip = e.target.closest?.('[data-grip-id]');
    const block = e.target.closest?.('.interactive-section-block');
    const chip = e.target.closest?.('.tile-chip[data-tech-id]');
    if (grip) {
      dragSectionId = grip.dataset.gripId;
      e.dataTransfer.setData('text/readmify-section-id', dragSectionId);
      e.dataTransfer.effectAllowed = 'move';
      block?.classList.add('dragging');
    } else if (chip && e.target.closest('.tile-grid')) {
      e.dataTransfer.setData('text/readmify-tech-id', chip.dataset.techId);
      e.dataTransfer.setData('text/readmify-tech-from', chip.closest('.interactive-section-block')?.dataset.sectionId || '');
      e.dataTransfer.effectAllowed = 'move';
    }
  });
  container.addEventListener('dragend', () => {
    dragSectionId = null;
    container.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging'));
    container.querySelectorAll('.drop-target').forEach(el => el.classList.remove('drop-target'));
  });
  container.addEventListener('dragover', (e) => {
    const divider = e.target.closest?.('.add-section-divider');
    const block = e.target.closest?.('.interactive-section-block');
    if (divider || block) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      divider?.classList.add('drop-target');
    }
  });
  container.addEventListener('dragleave', (e) => {
    const divider = e.target.closest?.('.add-section-divider');
    if (divider && !divider.contains(e.relatedTarget)) divider.classList.remove('drop-target');
  });
  container.addEventListener('drop', (e) => {
    const divider = e.target.closest?.('.add-section-divider');
    if (!divider) return;
    e.preventDefault();
    divider.classList.remove('drop-target');
    const dropIndex = parseInt(divider.dataset.dropIndex, 10);
    const movingId = e.dataTransfer.getData('text/readmify-section-id');
    const libType = e.dataTransfer.getData('text/readmify-section-type');
    const techId = e.dataTransfer.getData('text/readmify-tech-id');
    const state = store.getState();
    if (movingId) {
      const from = state.sections.findIndex(s => s.id === movingId);
      if (from !== -1) {
        let to = isNaN(dropIndex) ? state.sections.length : dropIndex;
        // Adjust for removal shift when moving down
        const without = state.sections.filter(s => s.id !== movingId);
        to = Math.max(0, Math.min(to > from ? to - 1 : to, without.length));
        const [item] = state.sections.splice(from, 1);
        state.sections.splice(to, 0, item);
        store.notify({ type: 'REORDER_SECTIONS', force: true });
        showToast('Section reordered', 'success');
      }
      return;
    }
    if (libType) {
      store.addSectionFromType(libType, null, isNaN(dropIndex) ? null : dropIndex);
      showToast('Section added', 'success');
      return;
    }
    if (techId) {
      // Drop tech onto nearest tech section near divider
      const all = store.getState().sections;
      const techSec = all.slice(0, isNaN(dropIndex) ? all.length : dropIndex).reverse().find(s => s.type === SECTION_TYPES.TECH_STACK && s.enabled)
        || all.find(s => s.type === SECTION_TYPES.TECH_STACK && s.enabled);
      if (techSec) {
        const list = [...(techSec.data.technologies || [])];
        if (!list.includes(techId)) {
          list.push(techId);
          store.updateSectionData(techSec.id, { technologies: list });
          showToast('Tech added via drag & drop', 'success');
        }
      }
    }
  });
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
      const removed = store.removeSection(btn.dataset.id);
      if (removed) {
        showToast(`Removed "${sec?.title || 'section'}" — Undo?`, 'info');
        // One-click undo via toast click (no confirm friction)
        const toasts = document.querySelectorAll('#readmify-toast-container > div');
        const last = toasts[toasts.length - 1];
        if (last) {
          last.style.cursor = 'pointer';
          last.title = 'Click to undo';
          last.addEventListener('click', () => store.undoRemoveSection(), { once: true });
          setTimeout(() => { try { last.style.cursor = ''; } catch (e) {} }, 4000);
        }
      }
    });
  });

  // 2b. Drag & drop reorder (grip -> section/divider). Native HTML5, no deps.
  try { setupCanvasDragDrop(container); } catch (e) { console.warn('dnd setup failed', e); }

  // 3. In-between Section Adders
  container.querySelectorAll('.insert-section-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const insertIndex = parseInt(btn.dataset.insertIndex, 10);
      openSectionLibrary(insertIndex);
    });
  });

  // 4. DIRECT ON-IMAGE CONTROLS (Size, Radius, Ratio, Replace File/URL, Delete)
  container.querySelectorAll('.img-size-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const ctrl = btn.closest('.direct-image-editor-container');
      const secId = ctrl?.dataset.sectionId;
      const imgType = ctrl?.dataset.imageType;
      const sz = btn.dataset.size;
      if (!secId || !sz) return;

      if (imgType === 'hero') {
        store.updateSectionData(secId, { logoWidth: sz });
      } else if (imgType === 'demo') {
        store.updateSectionData(secId, { width: sz });
      }
    });
  });

  container.querySelectorAll('.img-radius-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const ctrl = btn.closest('.direct-image-editor-container');
      const secId = ctrl?.dataset.sectionId;
      const imgType = ctrl?.dataset.imageType;
      const rad = btn.dataset.radius;
      if (!secId || !rad) return;

      if (imgType === 'hero') {
        store.updateSectionData(secId, { logoRadius: rad });
      } else if (imgType === 'demo') {
        store.updateSectionData(secId, { radius: rad });
      }
    });
  });

  container.querySelectorAll('.img-ratio-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const ctrl = btn.closest('.direct-image-editor-container');
      const secId = ctrl?.dataset.sectionId;
      const ratio = btn.dataset.ratio;
      if (!secId || !ratio) return;
      store.updateSectionData(secId, { aspectRatio: ratio });
    });
  });

  container.querySelectorAll('.img-replace-file-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const ctrl = btn.closest('.direct-image-editor-container');
      const fileInput = ctrl?.querySelector('.direct-img-file-input');
      fileInput?.click();
    });
  });

  container.querySelectorAll('.direct-img-file-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const ctrl = input.closest('.direct-image-editor-container');
      const secId = ctrl?.dataset.sectionId;
      const imgType = ctrl?.dataset.imageType;
      if (!secId) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        const url = evt.target.result;
        if (imgType === 'hero') {
          store.updateSectionData(secId, { showLogo: true, logoUrl: url });
        } else if (imgType === 'demo') {
          store.updateSectionData(secId, { imageUrl: url });
        }
        showToast('Image replaced successfully!', 'success');
      };
      reader.readAsDataURL(file);
    });
  });

  container.querySelectorAll('.img-replace-url-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const ctrl = btn.closest('.direct-image-editor-container');
      const secId = ctrl?.dataset.sectionId;
      const imgType = ctrl?.dataset.imageType;
      if (!secId) return;

      const sec = getSec(secId);
      const currentUrl = (imgType === 'hero' ? sec?.data?.logoUrl : sec?.data?.imageUrl) || '';
      const inputUrl = prompt('Enter image URL (PNG, JPG, GIF, SVG):', currentUrl);
      if (inputUrl && inputUrl.trim()) {
        const clean = inputUrl.trim();
        if (imgType === 'hero') {
          store.updateSectionData(secId, { showLogo: true, logoUrl: clean });
        } else if (imgType === 'demo') {
          store.updateSectionData(secId, { imageUrl: clean });
        }
        showToast('Image URL updated!', 'success');
      }
    });
  });

  container.querySelectorAll('.img-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const ctrl = btn.closest('.direct-image-editor-container');
      const secId = ctrl?.dataset.sectionId;
      const imgType = ctrl?.dataset.imageType;
      if (!secId) return;

      if (imgType === 'hero') {
        store.updateSectionData(secId, { showLogo: false, logoUrl: '' });
      } else if (imgType === 'demo') {
        store.updateSectionData(secId, { imageUrl: '' });
      }
      showToast('Image removed', 'info');
    });
  });

  // 5. KID-FRIENDLY DROPZONE HANDLERS (When no image is present)
  container.querySelectorAll('.kid-dropzone-box').forEach(box => {
    const secId = box.dataset.sectionId;
    const imgType = box.dataset.imageType;
    const fileInput = box.querySelector('.dropzone-file-input');

    // Clicking box or choose button opens file selector
    box.addEventListener('click', (e) => {
      if (e.target.closest('.dropzone-enter-url-btn')) return;
      fileInput?.click();
    });

    box.querySelector('.dropzone-choose-file-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput?.click();
    });

    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file || !secId) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        const url = evt.target.result;
        if (imgType === 'hero') {
          store.updateSectionData(secId, { showLogo: true, logoUrl: url });
        } else if (imgType === 'demo') {
          store.updateSectionData(secId, { imageUrl: url });
        }
        showToast('Image uploaded successfully!', 'success');
      };
      reader.readAsDataURL(file);
    });

    box.querySelector('.dropzone-enter-url-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!secId) return;
      const inputUrl = prompt('Enter image URL (PNG, JPG, GIF, SVG):', '');
      if (inputUrl && inputUrl.trim()) {
        const clean = inputUrl.trim();
        if (imgType === 'hero') {
          store.updateSectionData(secId, { showLogo: true, logoUrl: clean });
        } else if (imgType === 'demo') {
          store.updateSectionData(secId, { imageUrl: clean });
        }
        showToast('Image added successfully!', 'success');
      }
    });

    // Drag and drop support directly on canvas
    box.addEventListener('dragover', (e) => {
      e.preventDefault();
      box.classList.add('border-primary', 'bg-zinc-800/50');
    });

    box.addEventListener('dragleave', () => {
      box.classList.remove('border-primary', 'bg-zinc-800/50');
    });

    box.addEventListener('drop', (e) => {
      e.preventDefault();
      box.classList.remove('border-primary', 'bg-zinc-800/50');
      const file = e.dataTransfer?.files?.[0];
      if (!file || !secId) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        const url = evt.target.result;
        if (imgType === 'hero') {
          store.updateSectionData(secId, { showLogo: true, logoUrl: url });
        } else if (imgType === 'demo') {
          store.updateSectionData(secId, { imageUrl: url });
        }
        showToast('Image uploaded successfully!', 'success');
      };
      reader.readAsDataURL(file);
    });
  });

  // 6. Tech Stack Handlers (tiles: size, drag reorder, drop add)
  container.querySelectorAll('.open-tech-picker-canvas-btn').forEach(btn => {
    btn.addEventListener('click', () => renderTechPickerModal());
  });

  container.querySelectorAll('.tile-size-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (btn.dataset.id) store.updateSectionData(btn.dataset.id, { tileSize: btn.dataset.size });
    });
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

  // Tile drag reorder within + across tech sections
  container.querySelectorAll('[data-tech-dropzone]').forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      if (e.dataTransfer.types?.includes('text/readmify-tech-id') || e.dataTransfer.types?.includes('text/readmify-section-type')) return;
      // allow tech chips
      if ([... (e.dataTransfer.types || [])].join(' ').includes('tech') || e.dataTransfer.getData) {
        e.preventDefault();
      } else {
        // Fallback: allow any dragover so drop works in most browsers
        try { e.preventDefault(); } catch (err) {}
      }
    });
    zone.addEventListener('drop', (e) => {
      const techId = e.dataTransfer.getData('text/readmify-tech-id');
      const fromSec = e.dataTransfer.getData('text/readmify-tech-from');
      const toSec = zone.dataset.techDropzone;
      if (!techId || !toSec) return;
      e.preventDefault();
      e.stopPropagation();
      const toSection = getSec(toSec);
      if (!toSection) return;
      // Remove from source if different section
      if (fromSec && fromSec !== toSec) {
        const fromSection = getSec(fromSec);
        if (fromSection) {
          const fl = (fromSection.data.technologies || []).filter(t => t !== techId);
          store.updateSectionData(fromSec, { technologies: fl });
        }
      } else if (fromSec === toSec) {
        // Reorder to end (simple) — full positional reorder via drag order
        const cur = [...(toSection.data.technologies || [])].filter(t => t !== techId);
        // Insert near drop target chip if hovering one
        const overChip = e.target.closest?.('.tile-chip');
        if (overChip?.dataset.techId) {
          const at = cur.indexOf(overChip.dataset.techId);
          cur.splice(at >= 0 ? at : cur.length, 0, techId);
        } else cur.push(techId);
        store.updateSectionData(toSec, { technologies: cur });
        return;
      }
      const list = [...(toSection.data.technologies || [])];
      if (!list.includes(techId)) {
        list.push(techId);
        store.updateSectionData(toSec, { technologies: list });
        showToast('Tile added', 'success');
      }
    });
  });

  // 7. Feature List Handlers
  container.querySelectorAll('.add-canvas-feature-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const secId = btn.closest('.interactive-section-block')?.dataset.sectionId;
      if (!secId) return;
      const sec = getSec(secId);
      const items = [...(sec?.data?.items || [])];
      items.push({ title: 'New Feature', desc: 'Describe your feature in a few clear sentences.' });
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

  // 8. Installation Steps & Package Manager Handlers
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

  // 9. Roadmap Task Checkboxes & Adders
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

  // 10. License Studio Pills & Actions
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

  // 11. Badge Popover Handlers
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

  // 12. Stats toggles + hero visual toggles
  container.querySelectorAll('.stats-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const secId = btn.dataset.id || btn.closest('.interactive-section-block')?.dataset.sectionId;
      const flag = btn.dataset.flag;
      if (!secId || !flag) return;
      const sec = getSec(secId);
      store.updateSectionData(secId, { [flag]: !(sec?.data?.[flag]) });
    });
  });
  container.querySelectorAll('.hero-visual-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const secId = btn.closest('.interactive-section-block')?.dataset.sectionId;
      const flag = btn.dataset.flag;
      if (!secId || !flag) return;
      const sec = getSec(secId);
      store.updateSectionData(secId, { [flag]: !(sec?.data?.[flag]) });
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
