/**
 * Small, framework-free DOM utilities: clipboard, file download, toasts, confetti.
 */

export async function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
  try {
    if (window.isSecureContext && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    showToast(successMessage, 'success');
    fireConfetti();
    return true;
  } catch (e) {
    console.error('Copy failed:', e);
    showToast('Could not copy to clipboard', 'error');
    return false;
  }
}

export function downloadReadmeFile(content, filename = 'README.md') {
  try {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`${filename} downloaded!`, 'success');
    fireConfetti();
  } catch (e) {
    console.error('Download failed:', e);
    showToast('Could not download file', 'error');
  }
}

const TOAST_ICONS = { success: '✓', error: '✕', info: 'i' };
const TOAST_COLORS = { success: '#10B981', error: '#EF4444', info: '#71717A' };

export function showToast(message, type = 'info') {
  let container = document.getElementById('readmify-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'readmify-toast-container';
    container.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none;';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const color = TOAST_COLORS[type] || TOAST_COLORS.info;
  toast.style.cssText = `background:#18181b;color:#fafafa;border-left:3px solid ${color};padding:10px 14px;border-radius:6px;font-size:13px;box-shadow:0 4px 12px rgba(0,0,0,.3);opacity:0;transform:translateY(8px);transition:opacity .2s,transform .2s;max-width:320px;`;
  toast.textContent = `${TOAST_ICONS[type] || ''} ${message}`.trim();
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

export function fireConfetti() {
  if (typeof window.confetti === 'function') {
    window.confetti({
      particleCount: 60,
      spread: 55,
      origin: { y: 0.8 },
      colors: ['#fafafa', '#71717a', '#3b82f6', '#10b981', '#f59e0b']
    });
  }
}
