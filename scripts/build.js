/**
 * Readmify Build Script
 * Bundles ES modules into a single offline & file:// compatible script
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const JS_DIR = path.join(ROOT_DIR, 'js');
const OUTPUT_BUNDLE = path.join(JS_DIR, 'readmify.bundle.js');

const MODULE_FILES = [
  'data/techCatalog.js',
  'data/licenses.js',
  'data/defaultSections.js',
  'data/templates.js',
  'services/githubApi.js',
  'utils/exportUtils.js',
  'utils/markdownGenerator.js',
  'components/healthScore.js',
  'store.js',
  'components/photoUploader.js',
  'components/sectionLibrary.js',
  'components/techPicker.js',
  'components/sectionEditor.js',
  'components/interactiveCanvas.js',
  'components/wizard.js',
  'app.js'
];

function cleanModuleContent(content) {
  // Remove import statements
  let cleaned = content.replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '');
  
  // Replace export default / export const / export function / export let / export class / export async function
  cleaned = cleaned.replace(/^\s*export\s+default\s+/gm, '');
  cleaned = cleaned.replace(/^\s*export\s+(const|let|var|function|class|async\s+function)\s+/gm, '$1 ');
  
  // Remove standalone export { ... }; statements
  cleaned = cleaned.replace(/^\s*export\s*\{[\s\S]*?\};?\s*$/gm, '');
  
  return cleaned;
}

function build() {
  console.log('Building Readmify bundle...');
  let bundleContent = `/** Readmify v2 Bundle - Universal Offline & GitHub Pages Compatibility */\n\n(function() {\n  'use strict';\n\n`;

  for (const relPath of MODULE_FILES) {
    const fullPath = path.join(JS_DIR, relPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`Warning: File not found: ${fullPath}`);
      continue;
    }
    console.log(`- Bundling ${relPath}`);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const cleaned = cleanModuleContent(raw);
    bundleContent += `\n/* ==================== MODULE: ${relPath} ==================== */\n` + cleaned + '\n';
  }

  bundleContent += `\n// Robust DOM Ready execution\nif (document.readyState === 'loading') {\n  document.addEventListener('DOMContentLoaded', initApp);\n} else {\n  initApp();\n}\n\n})();\n`;

  fs.writeFileSync(OUTPUT_BUNDLE, bundleContent, 'utf8');
  const size = fs.statSync(OUTPUT_BUNDLE).size;
  console.log(`Bundle created successfully: ${OUTPUT_BUNDLE} (${Math.round(size / 1024)} KB)`);
}

build();
