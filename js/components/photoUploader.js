/**
 * Readmify - Image Studio (Cropper, Resizer & Banner Hub)
 * Zero-dependency interactive canvas cropper, dimension scaler, presets, and markdown styling
 */
import { store } from '../store.js';
import { SECTION_TYPES } from '../data/defaultSections.js';
import { showToast, copyToClipboard } from '../utils/exportUtils.js';

export const BANNER_PRESETS = [
  {
    id: 'minimal-grid',
    title: 'Minimal Dark Grid',
    category: 'Minimal',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'cyber-circuit',
    title: 'Cyber Circuit Glow',
    category: 'Cyberpunk',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'cosmic-mesh',
    title: 'Deep Cosmic Gradient',
    category: 'Gradients',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'modern-abstract',
    title: 'Modern Purple Wave',
    category: 'Abstract',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'terminal-code',
    title: 'Developer Terminal',
    category: 'Code',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'blueprint',
    title: 'System Architecture',
    category: 'Tech',
    url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&auto=format&fit=crop&q=80'
  }
];

// Active Studio State
let studioState = {
  activeTab: 'presets', // 'presets' | 'studio'
  targetField: 'hero',
  originalImage: null, // HTMLImageElement
  cropRatio: '3:1',    // '3:1' | '16:9' | '4:3' | '1:1' | 'free'
  cropBox: { x: 0, y: 0, w: 100, h: 100 }, // percentage of image
  targetWidth: 1200,
  targetHeight: 400,
  lockAspect: true,
  scalePct: 100,
  outputQuality: 0.88,
  outputFormat: 'image/jpeg',
  exportDataUrl: '',
  // Presentation styling
  mdWidth: '100%',
  mdAlign: 'center',
  mdRadius: '8px',
  linkUrl: '',
  caption: 'Project Preview',
  // Mockup frame & visual filters
  mockupFrame: 'none', // 'none' | 'browser' | 'terminal'
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  rotation: 0, // 0, 90, 180, 270
  flipH: false
};

export function renderPhotoModal(targetField = 'hero') {
  studioState.targetField = targetField;

  let modal = document.getElementById('photo-hub-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'photo-hub-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs hidden';
    document.body.appendChild(modal);
  }

  modal.classList.remove('hidden');
  renderStudioModalContent(modal);
}

function renderStudioModalContent(modal) {
  modal.innerHTML = `
    <div class="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
      <!-- Modal Header -->
      <div class="px-5 py-3.5 border-b border-border flex items-center justify-between bg-card flex-shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-md bg-muted border border-border flex items-center justify-center text-sm font-semibold text-foreground">
            🖼️
          </div>
          <div>
            <h3 class="text-sm font-semibold text-foreground flex items-center gap-2">
              <span>Image Studio & Cropper</span>
              <span class="text-[10px] px-1.5 py-0.2 rounded border border-border bg-muted text-muted-foreground font-normal">Crop • Resize • Style</span>
            </h3>
            <p class="text-[11px] text-muted-foreground">Interactive visual cropper, dimension resizer, and curated banners</p>
          </div>
        </div>
        <button id="close-studio-btn" class="p-1 text-muted-foreground hover:text-foreground text-xs">✕</button>
      </div>

      <!-- Tab Buttons -->
      <div class="px-5 py-2.5 border-b border-border bg-background/50 flex items-center justify-between flex-shrink-0">
        <div class="flex gap-2">
          <button id="studio-tab-presets" class="px-3 py-1 text-xs font-medium rounded-md transition ${studioState.activeTab === 'presets' ? 'bg-primary text-primary-foreground shadow-xs font-semibold' : 'bg-muted text-muted-foreground hover:text-foreground'}">
            Curated Banners
          </button>
          <button id="studio-tab-custom" class="px-3 py-1 text-xs font-medium rounded-md transition ${studioState.activeTab === 'studio' ? 'bg-primary text-primary-foreground shadow-xs font-semibold' : 'bg-muted text-muted-foreground hover:text-foreground'}">
            Image Cropper & Resizer ${studioState.originalImage ? '●' : ''}
          </button>
        </div>

        <div class="text-[11px] text-muted-foreground">
          Target: <strong class="text-foreground uppercase text-[10px] font-mono px-1 py-0.5 rounded bg-muted">${studioState.targetField}</strong>
        </div>
      </div>

      <!-- Main Body -->
      <div class="p-5 overflow-y-auto flex-1 bg-background">
        ${studioState.activeTab === 'presets' ? renderPresetsTabHtml() : renderStudioTabHtml()}
      </div>

      <!-- Footer Bar -->
      <div class="px-5 py-3 border-t border-border bg-card flex items-center justify-between flex-shrink-0">
        <span class="text-[11px] text-muted-foreground">Zero quality loss • Compressed for fast GitHub loading</span>
        <button id="close-studio-btn-2" class="btn-secondary text-xs px-3.5 py-1.5">
          Close
        </button>
      </div>
    </div>
  `;

  attachStudioListeners(modal);
}

function renderPresetsTabHtml() {
  return `
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xs text-muted-foreground">Select a high-resolution developer banner to instantly apply:</p>
        <button id="studio-jump-to-custom-btn" class="text-xs text-foreground hover:underline flex items-center gap-1 font-medium">
          <span>📤</span> Upload or crop your own image →
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        ${BANNER_PRESETS.map(preset => `
          <div class="preset-card group relative border border-border hover:border-foreground/50 rounded-lg overflow-hidden bg-card cursor-pointer transition select-none" data-url="${preset.url}">
            <div class="h-28 w-full bg-cover bg-center transition group-hover:scale-105 duration-200" style="background-image: url('${preset.url}')"></div>
            <div class="p-2.5 flex items-center justify-between bg-card">
              <span class="text-xs font-medium text-foreground">${preset.title}</span>
              <span class="text-[10px] text-muted-foreground group-hover:text-foreground transition font-medium">Use →</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderStudioTabHtml() {
  if (!studioState.originalImage) {
    return `
      <div class="space-y-4">
        <!-- Upload Drop Zone -->
        <div id="studio-drop-zone" class="border-2 border-dashed border-border hover:border-foreground/40 rounded-lg p-10 text-center bg-card/40 cursor-pointer transition flex flex-col items-center justify-center gap-2.5">
          <span class="text-3xl">📸</span>
          <div class="space-y-1">
            <p class="text-xs font-semibold text-foreground">Click to browse or drop an image file here</p>
            <p class="text-[11px] text-muted-foreground">Supports PNG, JPG, WebP, GIF, SVG</p>
          </div>
          <input type="file" id="studio-file-input" accept="image/*" class="hidden" />
        </div>

        <!-- URL Input Alternative -->
        <div class="p-3.5 bg-card border border-border rounded-lg space-y-2">
          <label class="block text-xs font-medium text-foreground">Or paste an online image URL</label>
          <div class="flex gap-2">
            <input type="text" id="studio-url-input" placeholder="https://example.com/screenshot.png" class="form-input text-xs flex-1" />
            <button id="studio-load-url-btn" class="btn-primary text-xs px-3.5 py-1.5 whitespace-nowrap">
              Load into Studio
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Active Editor Workspace
  return `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <!-- Left Column: Interactive Canvas Cropper & Enhancements -->
      <div class="lg:col-span-2 space-y-3">
        <!-- Crop Aspect Ratio Selector -->
        <div class="flex items-center justify-between bg-card p-2 rounded-lg border border-border text-xs">
          <span class="font-medium text-muted-foreground text-[11px]">Aspect Ratio:</span>
          <div class="flex items-center gap-1">
            ${[
              { id: '3:1', label: '3:1 (Banner)' },
              { id: '16:9', label: '16:9 (Demo)' },
              { id: '4:3', label: '4:3 (Preview)' },
              { id: '1:1', label: '1:1 (Square)' },
              { id: 'free', label: 'Freeform' }
            ].map(r => `
              <button class="crop-ratio-btn px-2 py-0.5 rounded text-[11px] font-medium transition ${
                studioState.cropRatio === r.id 
                  ? 'bg-foreground text-background font-semibold shadow-xs' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }" data-ratio="${r.id}">
                ${r.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Visual Canvas Wrapper -->
        <div class="relative bg-zinc-950 border border-border rounded-lg p-2 overflow-hidden flex items-center justify-center min-h-[260px] max-h-[340px]">
          <canvas id="studio-crop-canvas" class="max-h-[320px] max-w-full rounded object-contain cursor-crosshair"></canvas>
        </div>

        <!-- Mockup Window Frame & Transforms Controls -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-card border border-border rounded-lg text-xs">
          <div>
            <span class="font-medium text-muted-foreground text-[11px] block mb-1.5">Mockup Window Frame:</span>
            <div class="flex items-center gap-1">
              <button class="mockup-frame-btn px-2.5 py-1 rounded text-xs transition ${studioState.mockupFrame === 'none' ? 'bg-foreground text-background font-semibold shadow-xs' : 'bg-muted text-muted-foreground hover:text-foreground'}" data-frame="none">
                None (Raw)
              </button>
              <button class="mockup-frame-btn px-2.5 py-1 rounded text-xs transition ${studioState.mockupFrame === 'browser' ? 'bg-foreground text-background font-semibold shadow-xs' : 'bg-muted text-muted-foreground hover:text-foreground'}" data-frame="browser">
                🌐 macOS Window
              </button>
              <button class="mockup-frame-btn px-2.5 py-1 rounded text-xs transition ${studioState.mockupFrame === 'terminal' ? 'bg-foreground text-background font-semibold shadow-xs' : 'bg-muted text-muted-foreground hover:text-foreground'}" data-frame="terminal">
                💻 Terminal
              </button>
            </div>
          </div>

          <div>
            <span class="font-medium text-muted-foreground text-[11px] block mb-1.5">Rotate & Flip:</span>
            <div class="flex items-center gap-1.5">
              <button id="studio-rotate-left-btn" class="btn-secondary px-2 py-1 text-xs" title="Rotate 90° Counter-Clockwise">
                ⟲ -90°
              </button>
              <button id="studio-rotate-right-btn" class="btn-secondary px-2 py-1 text-xs" title="Rotate 90° Clockwise">
                ⟳ +90°
              </button>
              <button id="studio-flip-h-btn" class="btn-secondary px-2.5 py-1 text-xs ${studioState.flipH ? 'bg-accent font-semibold text-foreground' : ''}" title="Flip Horizontal">
                ⇆ Flip
              </button>
              <button id="studio-reset-transform-btn" class="text-[10.5px] text-muted-foreground hover:text-foreground px-1 py-1" title="Reset Rotation & Flip">
                ↺ Reset
              </button>
            </div>
          </div>
        </div>

        <!-- Filter Sliders -->
        <div class="p-3 bg-card border border-border rounded-lg space-y-2 text-xs">
          <div class="flex items-center justify-between">
            <span class="font-medium text-foreground text-xs flex items-center gap-1">
              <span>🎨</span> Image Filters & Adjustments
            </span>
            <button id="studio-reset-filters-btn" class="text-[10px] text-muted-foreground hover:text-foreground">
              Reset Filters
            </button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div>
              <div class="flex justify-between text-[10px] mb-1">
                <span class="text-muted-foreground">Brightness</span>
                <span id="brightness-label" class="font-mono">${studioState.brightness}%</span>
              </div>
              <input type="range" id="studio-brightness-slider" min="50" max="150" value="${studioState.brightness}" class="w-full accent-foreground cursor-pointer" />
            </div>

            <div>
              <div class="flex justify-between text-[10px] mb-1">
                <span class="text-muted-foreground">Contrast</span>
                <span id="contrast-label" class="font-mono">${studioState.contrast}%</span>
              </div>
              <input type="range" id="studio-contrast-slider" min="50" max="150" value="${studioState.contrast}" class="w-full accent-foreground cursor-pointer" />
            </div>

            <div>
              <div class="flex justify-between text-[10px] mb-1">
                <span class="text-muted-foreground">Saturation</span>
                <span id="saturation-label" class="font-mono">${studioState.saturation}%</span>
              </div>
              <input type="range" id="studio-saturation-slider" min="0" max="200" value="${studioState.saturation}" class="w-full accent-foreground cursor-pointer" />
            </div>

            <div>
              <div class="flex justify-between text-[10px] mb-1">
                <span class="text-muted-foreground">Blur</span>
                <span id="blur-label" class="font-mono">${studioState.blur}px</span>
              </div>
              <input type="range" id="studio-blur-slider" min="0" max="8" step="1" value="${studioState.blur}" class="w-full accent-foreground cursor-pointer" />
            </div>
          </div>
        </div>

        <!-- Scale & Quality Sliders -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-card border border-border rounded-lg text-xs">
          <div>
            <div class="flex justify-between text-[11px] mb-1">
              <span class="text-muted-foreground">Output Scale:</span>
              <span id="scale-label" class="font-mono text-foreground">${studioState.scalePct}%</span>
            </div>
            <input type="range" id="studio-scale-slider" min="25" max="200" step="5" value="${studioState.scalePct}" class="w-full accent-foreground cursor-pointer" />
          </div>

          <div>
            <div class="flex justify-between text-[11px] mb-1">
              <span class="text-muted-foreground">JPEG Quality:</span>
              <span id="quality-label" class="font-mono text-foreground">${Math.round(studioState.outputQuality * 100)}%</span>
            </div>
            <input type="range" id="studio-quality-slider" min="50" max="100" step="2" value="${Math.round(studioState.outputQuality * 100)}" class="w-full accent-foreground cursor-pointer" />
          </div>
        </div>
      </div>

      <!-- Right Column: Settings, Preview & Apply Actions -->
      <div class="space-y-4">
        <!-- Live Cropped Result Preview -->
        <div class="p-3 bg-card border border-border rounded-lg space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-medium text-foreground">Output Preview</span>
            <span id="output-dims-badge" class="text-[10px] font-mono text-muted-foreground">${studioState.targetWidth}×${studioState.targetHeight}</span>
          </div>
          <div class="bg-background rounded border border-border/80 p-2 flex items-center justify-center overflow-hidden min-h-[120px] max-h-[160px]">
            <img id="studio-result-preview" src="${studioState.exportDataUrl}" class="max-h-full max-w-full object-contain rounded" style="border-radius: ${studioState.mdRadius};" />
          </div>
        </div>

        <!-- Markdown Layout Controls -->
        <div class="p-3 bg-card border border-border rounded-lg space-y-2.5 text-xs">
          <span class="font-medium text-foreground text-xs block">Placement & Presentation</span>

          <div>
            <label class="block text-[11px] text-muted-foreground mb-1">Display Width</label>
            <select id="studio-md-width" class="form-input text-xs">
              <option value="100%" ${studioState.mdWidth === '100%' ? 'selected' : ''}>100% (Full Width)</option>
              <option value="80%" ${studioState.mdWidth === '80%' ? 'selected' : ''}>80% (Standard)</option>
              <option value="600" ${studioState.mdWidth === '600' ? 'selected' : ''}>600px (Medium)</option>
              <option value="400" ${studioState.mdWidth === '400' ? 'selected' : ''}>400px (Small)</option>
            </select>
          </div>

          <div>
            <label class="block text-[11px] text-muted-foreground mb-1">Alignment</label>
            <select id="studio-md-align" class="form-input text-xs">
              <option value="center" ${studioState.mdAlign === 'center' ? 'selected' : ''}>Center</option>
              <option value="left" ${studioState.mdAlign === 'left' ? 'selected' : ''}>Left</option>
              <option value="right" ${studioState.mdAlign === 'right' ? 'selected' : ''}>Right</option>
            </select>
          </div>

          <div>
            <label class="block text-[11px] text-muted-foreground mb-1">Corner Radius</label>
            <select id="studio-md-radius" class="form-input text-xs">
              <option value="8px" ${studioState.mdRadius === '8px' ? 'selected' : ''}>Rounded (8px)</option>
              <option value="16px" ${studioState.mdRadius === '16px' ? 'selected' : ''}>Pill / Extra Rounded (16px)</option>
              <option value="0px" ${studioState.mdRadius === '0px' ? 'selected' : ''}>Sharp (0px)</option>
            </select>
          </div>

          <div>
            <label class="block text-[11px] text-muted-foreground mb-1">Clickable Link URL (optional)</label>
            <input type="text" id="studio-link-url" value="${studioState.linkUrl || ''}" placeholder="https://my-app.com" class="form-input text-xs" />
          </div>

          <div>
            <label class="block text-[11px] text-muted-foreground mb-1">Caption / Alt Text</label>
            <input type="text" id="studio-caption" value="${studioState.caption || ''}" placeholder="Project Preview Screenshot" class="form-input text-xs" />
          </div>
        </div>

        <!-- Apply CTA Buttons -->
        <div class="space-y-2 pt-1">
          <button id="studio-apply-hero-btn" class="w-full btn-primary text-xs py-2 justify-center shadow-xs">
            ✨ Set as Project Banner / Logo
          </button>
          <button id="studio-apply-demo-btn" class="w-full btn-secondary text-xs py-1.5 justify-center">
            📸 Set as Demo / Preview Image
          </button>
          <button id="studio-download-img-btn" class="w-full btn-secondary text-xs py-1.5 justify-center flex items-center gap-1.5">
            <span>💾</span> Download Image File (.png)
          </button>
          <button id="studio-copy-tag-btn" class="w-full text-xs text-muted-foreground hover:text-foreground py-1 text-center hover:underline">
            📋 Copy HTML &lt;img&gt; Tag
          </button>
          <button id="studio-change-img-btn" class="w-full text-[11px] text-zinc-500 hover:text-rose-400 py-0.5 text-center transition">
            Change Image File
          </button>
        </div>
      </div>
    </div>
  `;
}

function attachStudioListeners(modal) {
  modal.querySelector('#close-studio-btn')?.addEventListener('click', () => modal.classList.add('hidden'));
  modal.querySelector('#close-studio-btn-2')?.addEventListener('click', () => modal.classList.add('hidden'));

  // Tab switching
  modal.querySelector('#studio-tab-presets')?.addEventListener('click', () => {
    studioState.activeTab = 'presets';
    renderStudioModalContent(modal);
  });
  modal.querySelector('#studio-tab-custom')?.addEventListener('click', () => {
    studioState.activeTab = 'studio';
    renderStudioModalContent(modal);
    if (studioState.originalImage) initCanvasCrop();
  });
  modal.querySelector('#studio-jump-to-custom-btn')?.addEventListener('click', () => {
    studioState.activeTab = 'studio';
    renderStudioModalContent(modal);
    if (studioState.originalImage) initCanvasCrop();
  });

  // Preset click
  modal.querySelectorAll('.preset-card').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.url;
      applyImageToTarget(url, studioState.targetField, {
        width: '100%',
        align: 'center',
        radius: '8px'
      });
      modal.classList.add('hidden');
      showToast('Banner applied successfully!', 'success');
    });
  });

  // Drop zone & file input
  const dropZone = modal.querySelector('#studio-drop-zone');
  const fileInput = modal.querySelector('#studio-file-input');

  dropZone?.addEventListener('click', () => fileInput?.click());
  dropZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-foreground/60');
  });
  dropZone?.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-foreground/60');
  });
  dropZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-foreground/60');
    if (e.dataTransfer.files?.length > 0) {
      loadImageFromFile(e.dataTransfer.files[0], modal);
    }
  });

  fileInput?.addEventListener('change', (e) => {
    if (e.target.files?.length > 0) {
      loadImageFromFile(e.target.files[0], modal);
    }
  });

  // Load URL
  modal.querySelector('#studio-load-url-btn')?.addEventListener('click', () => {
    const url = modal.querySelector('#studio-url-input')?.value?.trim();
    if (!url) {
      showToast('Please enter an image URL', 'error');
      return;
    }
    loadImageFromUrl(url, modal);
  });

  // If in studio view with image loaded, bind controls
  if (studioState.activeTab === 'studio' && studioState.originalImage) {
    // Ratio buttons
    modal.querySelectorAll('.crop-ratio-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        studioState.cropRatio = btn.dataset.ratio;
        setCropBoxFromRatio(studioState.cropRatio);
        updateCroppedOutput();
        renderStudioModalContent(modal);
        initCanvasCrop();
      });
    });

    // Mockup frame buttons
    modal.querySelectorAll('.mockup-frame-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        studioState.mockupFrame = btn.dataset.frame;
        modal.querySelectorAll('.mockup-frame-btn').forEach(b => {
          if (b.dataset.frame === studioState.mockupFrame) {
            b.className = 'mockup-frame-btn px-2.5 py-1 rounded text-xs transition bg-foreground text-background font-semibold shadow-xs';
          } else {
            b.className = 'mockup-frame-btn px-2.5 py-1 rounded text-xs transition bg-muted text-muted-foreground hover:text-foreground';
          }
        });
        updateCroppedOutput();
      });
    });

    // Transforms (Rotate & Flip)
    modal.querySelector('#studio-rotate-left-btn')?.addEventListener('click', () => {
      studioState.rotation = (studioState.rotation + 270) % 360;
      updateCroppedOutput();
    });
    modal.querySelector('#studio-rotate-right-btn')?.addEventListener('click', () => {
      studioState.rotation = (studioState.rotation + 90) % 360;
      updateCroppedOutput();
    });
    modal.querySelector('#studio-flip-h-btn')?.addEventListener('click', (e) => {
      studioState.flipH = !studioState.flipH;
      e.currentTarget.classList.toggle('bg-accent', studioState.flipH);
      e.currentTarget.classList.toggle('font-semibold', studioState.flipH);
      updateCroppedOutput();
    });
    modal.querySelector('#studio-reset-transform-btn')?.addEventListener('click', () => {
      studioState.rotation = 0;
      studioState.flipH = false;
      const flipBtn = modal.querySelector('#studio-flip-h-btn');
      if (flipBtn) flipBtn.classList.remove('bg-accent', 'font-semibold');
      updateCroppedOutput();
    });

    // Filter Sliders
    modal.querySelector('#studio-brightness-slider')?.addEventListener('input', (e) => {
      studioState.brightness = parseInt(e.target.value, 10);
      const lbl = modal.querySelector('#brightness-label');
      if (lbl) lbl.innerText = `${studioState.brightness}%`;
      updateCroppedOutput();
    });
    modal.querySelector('#studio-contrast-slider')?.addEventListener('input', (e) => {
      studioState.contrast = parseInt(e.target.value, 10);
      const lbl = modal.querySelector('#contrast-label');
      if (lbl) lbl.innerText = `${studioState.contrast}%`;
      updateCroppedOutput();
    });
    modal.querySelector('#studio-saturation-slider')?.addEventListener('input', (e) => {
      studioState.saturation = parseInt(e.target.value, 10);
      const lbl = modal.querySelector('#saturation-label');
      if (lbl) lbl.innerText = `${studioState.saturation}%`;
      updateCroppedOutput();
    });
    modal.querySelector('#studio-blur-slider')?.addEventListener('input', (e) => {
      studioState.blur = parseInt(e.target.value, 10);
      const lbl = modal.querySelector('#blur-label');
      if (lbl) lbl.innerText = `${studioState.blur}px`;
      updateCroppedOutput();
    });
    modal.querySelector('#studio-reset-filters-btn')?.addEventListener('click', () => {
      studioState.brightness = 100;
      studioState.contrast = 100;
      studioState.saturation = 100;
      studioState.blur = 0;
      const bSl = modal.querySelector('#studio-brightness-slider');
      if (bSl) bSl.value = 100;
      const bLb = modal.querySelector('#brightness-label');
      if (bLb) bLb.innerText = '100%';
      const cSl = modal.querySelector('#studio-contrast-slider');
      if (cSl) cSl.value = 100;
      const cLb = modal.querySelector('#contrast-label');
      if (cLb) cLb.innerText = '100%';
      const sSl = modal.querySelector('#studio-saturation-slider');
      if (sSl) sSl.value = 100;
      const sLb = modal.querySelector('#saturation-label');
      if (sLb) sLb.innerText = '100%';
      const blSl = modal.querySelector('#studio-blur-slider');
      if (blSl) blSl.value = 0;
      const blLb = modal.querySelector('#blur-label');
      if (blLb) blLb.innerText = '0px';
      updateCroppedOutput();
    });

    // Scale slider
    modal.querySelector('#studio-scale-slider')?.addEventListener('input', (e) => {
      studioState.scalePct = parseInt(e.target.value, 10);
      modal.querySelector('#scale-label').innerText = `${studioState.scalePct}%`;
      updateCroppedOutput();
    });

    // Quality slider
    modal.querySelector('#studio-quality-slider')?.addEventListener('input', (e) => {
      studioState.outputQuality = parseInt(e.target.value, 10) / 100;
      modal.querySelector('#quality-label').innerText = `${Math.round(studioState.outputQuality * 100)}%`;
      updateCroppedOutput();
    });

    // Presentation dropdowns
    modal.querySelector('#studio-md-width')?.addEventListener('change', (e) => {
      studioState.mdWidth = e.target.value;
    });
    modal.querySelector('#studio-md-align')?.addEventListener('change', (e) => {
      studioState.mdAlign = e.target.value;
    });
    modal.querySelector('#studio-md-radius')?.addEventListener('change', (e) => {
      studioState.mdRadius = e.target.value;
      const resImg = modal.querySelector('#studio-result-preview');
      if (resImg) resImg.style.borderRadius = studioState.mdRadius;
    });
    modal.querySelector('#studio-link-url')?.addEventListener('input', (e) => {
      studioState.linkUrl = e.target.value;
    });
    modal.querySelector('#studio-caption')?.addEventListener('input', (e) => {
      studioState.caption = e.target.value;
    });

    // Apply buttons
    modal.querySelector('#studio-apply-hero-btn')?.addEventListener('click', () => {
      if (studioState.exportDataUrl) {
        applyImageToTarget(studioState.exportDataUrl, 'hero', {
          width: studioState.mdWidth,
          align: studioState.mdAlign,
          radius: studioState.mdRadius,
          linkUrl: studioState.linkUrl,
          caption: studioState.caption
        });
        modal.classList.add('hidden');
        showToast('Processed image applied as Project Banner!', 'success');
      }
    });

    modal.querySelector('#studio-apply-demo-btn')?.addEventListener('click', () => {
      if (studioState.exportDataUrl) {
        applyImageToTarget(studioState.exportDataUrl, 'demo', {
          width: studioState.mdWidth,
          align: studioState.mdAlign,
          radius: studioState.mdRadius,
          linkUrl: studioState.linkUrl,
          caption: studioState.caption
        });
        modal.classList.add('hidden');
        showToast('Processed image applied as Demo Preview!', 'success');
      }
    });

    // 1-Click Download Image Button
    modal.querySelector('#studio-download-img-btn')?.addEventListener('click', () => {
      if (studioState.exportDataUrl) {
        const a = document.createElement('a');
        a.href = studioState.exportDataUrl;
        a.download = `readmify-${studioState.targetField || 'image'}-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast('Image downloaded successfully!', 'success');
      }
    });

    modal.querySelector('#studio-copy-tag-btn')?.addEventListener('click', () => {
      if (studioState.exportDataUrl) {
        const align = studioState.mdAlign;
        const width = studioState.mdWidth;
        const radius = studioState.mdRadius;
        const alt = studioState.caption || 'Project Image';
        const rawImg = `<img src="${studioState.exportDataUrl}" alt="${alt}" width="${width}" style="border-radius: ${radius}; max-width: 100%;" />`;
        const wrapped = studioState.linkUrl ? `<a href="${studioState.linkUrl}">\n  ${rawImg}\n</a>` : rawImg;
        const tag = `<div align="${align}">\n  ${wrapped}\n</div>`;
        copyToClipboard(tag, 'HTML Image tag copied to clipboard!');
      }
    });

    modal.querySelector('#studio-change-img-btn')?.addEventListener('click', () => {
      studioState.originalImage = null;
      renderStudioModalContent(modal);
    });

    initCanvasCrop();
  }
}

function loadImageFromFile(file, modal) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      studioState.originalImage = img;
      studioState.activeTab = 'studio';
      studioState.rotation = 0;
      studioState.flipH = false;
      studioState.brightness = 100;
      studioState.contrast = 100;
      studioState.saturation = 100;
      studioState.blur = 0;
      studioState.mockupFrame = 'none';
      setCropBoxFromRatio(studioState.cropRatio);
      updateCroppedOutput();
      renderStudioModalContent(modal);
      initCanvasCrop();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function loadImageFromUrl(url, modal) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    studioState.originalImage = img;
    studioState.activeTab = 'studio';
    studioState.rotation = 0;
    studioState.flipH = false;
    studioState.brightness = 100;
    studioState.contrast = 100;
    studioState.saturation = 100;
    studioState.blur = 0;
    studioState.mockupFrame = 'none';
    setCropBoxFromRatio(studioState.cropRatio);
    updateCroppedOutput();
    renderStudioModalContent(modal);
    initCanvasCrop();
  };
  img.onerror = () => {
    showToast('Failed to load image from URL (CORS restricted or invalid URL)', 'error');
  };
  img.src = url;
}

function setCropBoxFromRatio(ratio) {
  if (!studioState.originalImage) return;
  const img = studioState.originalImage;
  const imgAspect = img.width / img.height;

  let targetAspect = imgAspect;
  if (ratio === '3:1') targetAspect = 3 / 1;
  else if (ratio === '16:9') targetAspect = 16 / 9;
  else if (ratio === '4:3') targetAspect = 4 / 3;
  else if (ratio === '1:1') targetAspect = 1 / 1;

  if (ratio === 'free') {
    studioState.cropBox = { x: 0.05, y: 0.05, w: 0.9, h: 0.9 };
    return;
  }

  if (imgAspect > targetAspect) {
    // Image is wider than crop box
    const h = 0.9;
    const cropPixelHeight = img.height * h;
    const cropPixelWidth = cropPixelHeight * targetAspect;
    const w = Math.min(0.95, cropPixelWidth / img.width);
    const x = (1 - w) / 2;
    const y = (1 - h) / 2;
    studioState.cropBox = { x, y, w, h };
  } else {
    // Image is taller than crop box
    const w = 0.9;
    const cropPixelWidth = img.width * w;
    const cropPixelHeight = cropPixelWidth / targetAspect;
    const h = Math.min(0.95, cropPixelHeight / img.height);
    const x = (1 - w) / 2;
    const y = (1 - h) / 2;
    studioState.cropBox = { x, y, w, h };
  }
}

/**
 * Interactive HTML5 Canvas Cropper
 */
function initCanvasCrop() {
  const canvas = document.getElementById('studio-crop-canvas');
  if (!canvas || !studioState.originalImage) return;

  const ctx = canvas.getContext('2d');
  const img = studioState.originalImage;

  // Fit canvas to display
  const maxDisplayW = 550;
  const maxDisplayH = 340;
  const scale = Math.min(maxDisplayW / img.width, maxDisplayH / img.height, 1);
  canvas.width = img.width * scale;
  canvas.height = img.height * scale;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Dim overlay outside crop box
    const { x, y, w, h } = studioState.cropBox;
    const bx = x * canvas.width;
    const by = y * canvas.height;
    const bw = w * canvas.width;
    const bh = h * canvas.height;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    // Top
    ctx.fillRect(0, 0, canvas.width, by);
    // Bottom
    ctx.fillRect(0, by + bh, canvas.width, canvas.height - (by + bh));
    // Left
    ctx.fillRect(0, by, bx, bh);
    // Right
    ctx.fillRect(bx + bw, by, canvas.width - (bx + bw), bh);

    // Crop box outline
    ctx.strokeStyle = '#fafafa';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(bx, by, bw, bh);

    // Grid rule of thirds lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    ctx.moveTo(bx + bw / 3, by);
    ctx.lineTo(bx + bw / 3, by + bh);
    ctx.moveTo(bx + (2 * bw) / 3, by);
    ctx.lineTo(bx + (2 * bw) / 3, by + bh);
    ctx.moveTo(bx, by + bh / 3);
    ctx.lineTo(bx + bw, by + bh / 3);
    ctx.moveTo(bx, by + (2 * bh) / 3);
    ctx.lineTo(bx + bw, by + (2 * bh) / 3);
    ctx.stroke();

    // Corner handles
    ctx.fillStyle = '#fafafa';
    const handleSize = 6;
    ctx.fillRect(bx - handleSize / 2, by - handleSize / 2, handleSize, handleSize);
    ctx.fillRect(bx + bw - handleSize / 2, by - handleSize / 2, handleSize, handleSize);
    ctx.fillRect(bx - handleSize / 2, by + bh - handleSize / 2, handleSize, handleSize);
    ctx.fillRect(bx + bw - handleSize / 2, by + bh - handleSize / 2, handleSize, handleSize);
  }

  draw();

  // Mouse drag interaction
  let isDragging = false;
  let dragMode = 'move'; // 'move' or 'resize'
  let startX = 0;
  let startY = 0;
  let origBox = null;

  canvas.onmousedown = (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / canvas.width;
    const my = (e.clientY - rect.top) / canvas.height;

    const { x, y, w, h } = studioState.cropBox;
    const isInside = mx >= x && mx <= x + w && my >= y && my <= y + h;

    if (isInside) {
      isDragging = true;
      startX = mx;
      startY = my;
      origBox = { ...studioState.cropBox };
      dragMode = 'move';
    }
  };

  window.onmousemove = (e) => {
    if (!isDragging || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / canvas.width;
    const my = (e.clientY - rect.top) / canvas.height;

    const dx = mx - startX;
    const dy = my - startY;

    if (dragMode === 'move') {
      let newX = Math.max(0, Math.min(1 - origBox.w, origBox.x + dx));
      let newY = Math.max(0, Math.min(1 - origBox.h, origBox.y + dy));
      studioState.cropBox.x = newX;
      studioState.cropBox.y = newY;
      draw();
      updateCroppedOutput();
    }
  };

  window.onmouseup = () => {
    if (isDragging) {
      isDragging = false;
      updateCroppedOutput();
    }
  };
}

function updateCroppedOutput() {
  if (!studioState.originalImage) return;

  const img = studioState.originalImage;
  const { x, y, w, h } = studioState.cropBox;

  const cropPxX = Math.round(x * img.width);
  const cropPxY = Math.round(y * img.height);
  const cropPxW = Math.round(w * img.width);
  const cropPxH = Math.round(h * img.height);

  const scale = studioState.scalePct / 100;
  const baseW = Math.max(50, Math.round(cropPxW * scale));
  const baseH = Math.max(50, Math.round(cropPxH * scale));

  const isRotated90or270 = studioState.rotation === 90 || studioState.rotation === 270;
  const rotatedW = isRotated90or270 ? baseH : baseW;
  const rotatedH = isRotated90or270 ? baseW : baseH;

  // Step 1: Render transformed and filtered cropped image
  const contentCanvas = document.createElement('canvas');
  contentCanvas.width = rotatedW;
  contentCanvas.height = rotatedH;
  const contentCtx = contentCanvas.getContext('2d');

  // Build filter string
  const filterParts = [];
  if (studioState.brightness !== 100) filterParts.push(`brightness(${studioState.brightness}%)`);
  if (studioState.contrast !== 100) filterParts.push(`contrast(${studioState.contrast}%)`);
  if (studioState.saturation !== 100) filterParts.push(`saturate(${studioState.saturation}%)`);
  if (studioState.blur > 0) filterParts.push(`blur(${studioState.blur}px)`);
  contentCtx.filter = filterParts.length > 0 ? filterParts.join(' ') : 'none';

  // Apply rotation and flip
  contentCtx.save();
  contentCtx.translate(rotatedW / 2, rotatedH / 2);
  contentCtx.rotate((studioState.rotation * Math.PI) / 180);
  if (studioState.flipH) {
    contentCtx.scale(-1, 1);
  }
  contentCtx.drawImage(img, cropPxX, cropPxY, cropPxW, cropPxH, -baseW / 2, -baseH / 2, baseW, baseH);
  contentCtx.restore();

  // Step 2: Render Mockup Window Frame (if selected)
  let finalCanvas;
  if (studioState.mockupFrame === 'browser') {
    const titleBarH = 38;
    const borderR = 10;
    finalCanvas = document.createElement('canvas');
    finalCanvas.width = rotatedW;
    finalCanvas.height = rotatedH + titleBarH;
    const ctx = finalCanvas.getContext('2d');

    // Titlebar background
    ctx.fillStyle = '#1e1e24';
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(0, 0, finalCanvas.width, finalCanvas.height, borderR);
    } else {
      ctx.rect(0, 0, finalCanvas.width, finalCanvas.height);
    }
    ctx.fill();

    // macOS traffic lights
    const dotY = 19;
    ctx.fillStyle = '#ff5f56';
    ctx.beginPath(); ctx.arc(18, dotY, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffbd2e';
    ctx.beginPath(); ctx.arc(38, dotY, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#27c93f';
    ctx.beginPath(); ctx.arc(58, dotY, 6, 0, Math.PI * 2); ctx.fill();

    // Faux address bar
    const addrW = Math.min(320, Math.max(160, rotatedW - 140));
    const addrX = (rotatedW - addrW) / 2;
    ctx.fillStyle = '#2b2b36';
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(addrX, 8, addrW, 22, 6);
    } else {
      ctx.rect(addrX, 8, addrW, 22);
    }
    ctx.fill();

    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🔒 https://app.preview', addrX + addrW / 2, 19);

    // Draw content image
    ctx.drawImage(contentCanvas, 0, titleBarH);
  } else if (studioState.mockupFrame === 'terminal') {
    const titleBarH = 34;
    const borderR = 8;
    finalCanvas = document.createElement('canvas');
    finalCanvas.width = rotatedW;
    finalCanvas.height = rotatedH + titleBarH;
    const ctx = finalCanvas.getContext('2d');

    // Terminal header
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(0, 0, finalCanvas.width, finalCanvas.height, borderR);
    } else {
      ctx.rect(0, 0, finalCanvas.width, finalCanvas.height);
    }
    ctx.fill();

    // Traffic light dots
    const dotY = 17;
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(16, dotY, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#eab308';
    ctx.beginPath(); ctx.arc(32, dotY, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#22c55e';
    ctx.beginPath(); ctx.arc(48, dotY, 5, 0, Math.PI * 2); ctx.fill();

    // Terminal title
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('bash — 80×24', rotatedW / 2, 17);

    // Draw content image
    ctx.drawImage(contentCanvas, 0, titleBarH);
  } else {
    finalCanvas = contentCanvas;
  }

  studioState.targetWidth = finalCanvas.width;
  studioState.targetHeight = finalCanvas.height;

  const exportFormat = studioState.mockupFrame !== 'none' ? 'image/png' : studioState.outputFormat;
  const dataUrl = finalCanvas.toDataURL(exportFormat, studioState.outputQuality);
  studioState.exportDataUrl = dataUrl;

  // Update DOM elements if present
  const resImg = document.getElementById('studio-result-preview');
  if (resImg) resImg.src = dataUrl;
  const dimsBadge = document.getElementById('output-dims-badge');
  if (dimsBadge) dimsBadge.innerText = `${finalCanvas.width}×${finalCanvas.height} px`;
}

function applyImageToTarget(url, targetField, styleOptions = {}) {
  const { width = '100%', align = 'center', radius = '8px', linkUrl = '', caption = '' } = styleOptions;

  if (targetField === 'demo') {
    const demoSec = store.getState().sections.find(s => s.type === SECTION_TYPES.DEMO);
    if (demoSec) {
      store.updateSectionData(demoSec.id, {
        imageUrl: url,
        width,
        align,
        radius,
        liveUrl: linkUrl || demoSec.data?.liveUrl || '',
        linkUrl: linkUrl || demoSec.data?.linkUrl || '',
        caption: caption || demoSec.data?.caption || 'Project Preview'
      });
      store.toggleSection(demoSec.id, true);
    }
  } else {
    const heroSec = store.getState().sections.find(s => s.type === SECTION_TYPES.HERO);
    if (heroSec) {
      store.updateSectionData(heroSec.id, {
        logoUrl: url,
        showLogo: true,
        logoWidth: width,
        logoAlign: align,
        logoRadius: radius,
        logoLinkUrl: linkUrl || heroSec.data?.logoLinkUrl || ''
      });
    }
  }
}
