/**
 * Readmify - Photo, Banner & Screenshot Hub (shadcn/ui style)
 * Local image uploader, curated developer banners, and multi-screenshot galleries
 */
import { store } from '../store.js';
import { SECTION_TYPES } from '../data/defaultSections.js';
import { showToast } from '../utils/exportUtils.js';

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

export function renderPhotoModal(targetField = 'hero') {
  let modal = document.getElementById('photo-hub-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'photo-hub-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs hidden';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
      <!-- Modal Header -->
      <div class="px-5 py-3.5 border-b border-border flex items-center justify-between bg-card">
        <div>
          <h3 class="text-sm font-semibold text-foreground flex items-center gap-2">
            <span>🖼️</span> Photos, Banners & Screenshots
          </h3>
          <p class="text-[11px] text-muted-foreground mt-0.5">Choose a curated banner preset, or upload your own screenshots</p>
        </div>
        <button id="close-photo-modal-btn" class="p-1 text-muted-foreground hover:text-foreground text-xs">✕</button>
      </div>

      <!-- Tab Controls -->
      <div class="px-5 py-2.5 border-b border-border bg-background/50 flex gap-2">
        <button id="tab-banners-btn" class="px-3 py-1 text-xs font-medium rounded-md bg-primary text-primary-foreground shadow-xs">
          Banner Presets
        </button>
        <button id="tab-upload-btn" class="px-3 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground">
          Local Image Upload
        </button>
      </div>

      <!-- Tab Content Area -->
      <div class="p-5 overflow-y-auto flex-1 space-y-4 bg-background">
        <!-- BANNERS VIEW -->
        <div id="view-banners" class="space-y-3">
          <p class="text-xs text-muted-foreground">Select a high-resolution banner to automatically embed at the top of your project:</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${BANNER_PRESETS.map(preset => `
              <div class="banner-card group relative border border-border rounded-md overflow-hidden bg-card cursor-pointer hover:border-foreground/50 transition select-none" data-url="${preset.url}">
                <div class="h-24 w-full bg-cover bg-center" style="background-image: url('${preset.url}')"></div>
                <div class="p-2.5 flex items-center justify-between bg-card">
                  <span class="text-xs font-medium text-foreground">${preset.title}</span>
                  <span class="text-[10px] text-muted-foreground group-hover:text-foreground transition">Use Preset →</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- UPLOAD VIEW -->
        <div id="view-upload" class="hidden space-y-4">
          <p class="text-xs text-muted-foreground">Drag & drop an image or screenshot from your device:</p>
          <div id="drag-drop-zone" class="border-2 border-dashed border-border hover:border-zinc-500 rounded-lg p-8 text-center bg-card/40 cursor-pointer transition flex flex-col items-center justify-center gap-2">
            <span class="text-2xl">📸</span>
            <p class="text-xs font-medium text-foreground">Click to browse or drop an image file here</p>
            <p class="text-[11px] text-muted-foreground">Supports PNG, JPG, GIF, SVG, WebP</p>
            <input type="file" id="photo-file-input" accept="image/*" class="hidden" />
          </div>

          <div id="uploaded-preview-box" class="hidden p-3 bg-card border border-border rounded-md space-y-2">
            <span class="text-[11px] font-medium text-foreground">Image Loaded:</span>
            <img id="uploaded-img-preview" src="" class="max-h-40 rounded object-contain border border-border mx-auto" />
            <div class="flex justify-end gap-2 pt-2">
              <button id="apply-uploaded-hero-btn" class="btn-primary text-xs px-3 py-1.5">
                Set as Project Logo / Banner
              </button>
              <button id="apply-uploaded-demo-btn" class="btn-secondary text-xs px-3 py-1.5">
                Set as Preview Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  modal.querySelector('#close-photo-modal-btn').addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  // Tab switching
  const tabBannersBtn = modal.querySelector('#tab-banners-btn');
  const tabUploadBtn = modal.querySelector('#tab-upload-btn');
  const viewBanners = modal.querySelector('#view-banners');
  const viewUpload = modal.querySelector('#view-upload');

  tabBannersBtn.addEventListener('click', () => {
    tabBannersBtn.className = 'px-3 py-1 text-xs font-medium rounded-md bg-primary text-primary-foreground shadow-xs';
    tabUploadBtn.className = 'px-3 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground';
    viewBanners.classList.remove('hidden');
    viewUpload.classList.add('hidden');
  });

  tabUploadBtn.addEventListener('click', () => {
    tabUploadBtn.className = 'px-3 py-1 text-xs font-medium rounded-md bg-primary text-primary-foreground shadow-xs';
    tabBannersBtn.className = 'px-3 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground';
    viewUpload.classList.remove('hidden');
    viewBanners.classList.add('hidden');
  });

  // Preset Selection
  modal.querySelectorAll('.banner-card').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.url;
      applyBannerUrl(url, targetField);
      modal.classList.add('hidden');
      showToast('Banner applied successfully!', 'success');
    });
  });

  // File drop
  const dropZone = modal.querySelector('#drag-drop-zone');
  const fileInput = modal.querySelector('#photo-file-input');
  const previewBox = modal.querySelector('#uploaded-preview-box');
  const previewImg = modal.querySelector('#uploaded-img-preview');
  let loadedDataUrl = '';

  dropZone.addEventListener('click', () => fileInput.click());

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-zinc-400');
  });
  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-zinc-400');
  });
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-zinc-400');
    if (e.dataTransfer.files?.length > 0) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files?.length > 0) {
      handleImageFile(e.target.files[0]);
    }
  });

  function handleImageFile(file) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      loadedDataUrl = evt.target.result;
      previewImg.src = loadedDataUrl;
      previewBox.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }

  modal.querySelector('#apply-uploaded-hero-btn').addEventListener('click', () => {
    if (loadedDataUrl) {
      applyBannerUrl(loadedDataUrl, 'hero');
      modal.classList.add('hidden');
      showToast('Uploaded image set as Project Banner!', 'success');
    }
  });

  modal.querySelector('#apply-uploaded-demo-btn').addEventListener('click', () => {
    if (loadedDataUrl) {
      applyBannerUrl(loadedDataUrl, 'demo');
      modal.classList.add('hidden');
      showToast('Uploaded image set as Demo Preview!', 'success');
    }
  });
}

function applyBannerUrl(url, targetField) {
  if (targetField === 'demo') {
    const demoSec = store.getState().sections.find(s => s.type === SECTION_TYPES.DEMO);
    if (demoSec) {
      store.updateSectionData(demoSec.id, { imageUrl: url });
      store.toggleSection(demoSec.id, true);
    }
  } else {
    const heroSec = store.getState().sections.find(s => s.type === SECTION_TYPES.HERO);
    if (heroSec) {
      store.updateSectionData(heroSec.id, { logoUrl: url, showLogo: true });
    }
  }
}
