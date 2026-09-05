/**
 * Readmify Build Script
 * Bundles ES modules into a single offline & file:// compatible script.
 * Naive concat-and-strip-imports bundler (no real module resolution), so
 * MODULE_FILES order must respect dependency order — a file must appear
 * after everything it imports.
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const JS_DIR = path.join(ROOT_DIR, 'js');
const OUTPUT_BUNDLE = path.join(JS_DIR, 'readmify.bundle.js');

const MODULE_FILES = [
  'data/defaultSections.js',
  'data/techCatalog.js',
  'data/licenses.js',
  'data/templates.js',
  'services/githubApi.js',
  'services/npmApi.js',
  'utils/exportUtils.js',
  'utils/markdownGenerator.js',
  'utils/renderReadme.js',
  'store.js',
  'components/sectionFormList.js',
  'components/sectionLibrary.js',
  'components/wizard.js',
  'components/palette.js',
  'components/healthScore.js',
  'app.js'
];

function cleanModuleContent(content) {
  let cleaned = content.replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '');
  cleaned = cleaned.replace(/^\s*export\s+default\s+/gm, '');
  cleaned = cleaned.replace(/^\s*export\s+(const|let|var|function|class|async\s+function)\s+/gm, '$1 ');
  cleaned = cleaned.replace(/^\s*export\s*\{[\s\S]*?\};?\s*$/gm, '');
  return cleaned;
}

function build() {
  console.log('Building Readmify bundle...');
  let bundleContent = `/** Readmify v5 Bundle - offline & file:// compatible */\n\n(function() {\n  'use strict';\n\n`;

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

  // Note: app.js already contains its own DOMContentLoaded bootstrap —
  // do NOT append another one here, that caused a double-init bug before.
  bundleContent += `\n})();\n`;

  bundleContent = bundleContent.replace(/\/\*\*[\s\S]*?\*\//g, '');
  bundleContent = bundleContent.replace(/\n{3,}/g, '\n\n');

  fs.writeFileSync(OUTPUT_BUNDLE, bundleContent, 'utf8');
  const size = fs.statSync(OUTPUT_BUNDLE).size;
  console.log(`Bundle created successfully: ${OUTPUT_BUNDLE} (${Math.round(size / 1024)} KB)`);
}

build();
