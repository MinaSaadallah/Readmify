<div align="center">
  <img src="./assets/favicon.svg" alt="Readmify Logo" width="96" />
  <br/>
  <h1>Readmify 🚀</h1>
  <p><strong>The easiest, ultra-lightweight GitHub README builder on the web.</strong></p>

  <div>
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License" />
    <img src="https://img.shields.io/badge/Zero--Build-100%25-brightgreen?style=for-the-badge" alt="Zero-Build" />
    <img src="https://img.shields.io/badge/GitHub--Pages-Ready-orange?style=for-the-badge&logo=github" alt="GitHub Pages Ready" />
    <img src="https://img.shields.io/badge/Tech--Badges-130+-purple?style=for-the-badge" alt="130+ Badges" />
  </div>
</div>

<br/>

## 🌟 Why Readmify?

Creating a stunning GitHub `README.md` should not take hours of wrestling with Markdown syntax, aligning HTML tags, or manually hunting for `shields.io` URLs.

**Readmify** is an ultra-fast, zero-friction web application designed for developers, students, and open-source creators:
* ⚖️ **Legal License Studio & 1-Click Root LICENSE**: Choose from 9 standard legal open-source licenses (MIT, Apache 2.0, GPL-3.0, BSD, etc.) with permission/condition breakdown, 3 README presentation formats (minimal, collapsible `<details>`, summary table), and 1-click root `LICENSE` file export.
* 🛡️ **12+ Dynamic Badges & Clean Rendering**: Live shields.io badges for stars, forks, issues, PRs, CI status, contributors, and releases, engineered to render cleanly without raw markdown parsing glitches.
* 🛠️ **Realistic "Built With" (Tech Stack) Engine**: 4 layout engines (Categorized Domain Grid, Interactive Devicon Grid, SkillIcons Ribbon, and Architecture Matrix Table) with size controls (Small, Medium, Large, XL), alignment (Left, Center, Right), and 60+ official documentation links.
* 🖼️ **Pro Image Studio with Mockup Frames & Filters**: Zero-dependency HTML5 Canvas image studio featuring macOS browser window frames (🔴 🟡 🟢 traffic lights & address bar), terminal frames, rotation, flip, visual filters (brightness, contrast, saturation, blur), and 1-click image download.
* 📚 **Visual Section Library Catalog**: Rich catalog of 16+ modular section templates (FAQ, Benchmarks, Sponsors, API Reference, Changelog, Roadmap, etc.) with search, category filtering, and 1-click addition.
* 🛠️ **Deep Repository Scanner**: Automatically inspects your repository's full file tree, `package.json`, lockfiles, `Cargo.toml`, `requirements.txt`, `.env.example`, and CI/CD pipelines to construct an entire tailored README.
* ⚡ **Live GitHub Preview**: Authentic GitHub Dark Mode (`#0d1117`) and Light Mode (`#ffffff`) rendering with real-time health score rating.
* 🚀 **Universal Offline Bundle**: Works instantly offline and via GitHub Pages with universal bundle support.

---

## ⚡ Instant Direct Usage

Readmify requires **zero installation, zero build tools, and no server**:

1. **Directly open `index.html`** in any web browser (Chrome, Edge, Safari, Firefox).
2. **100% Client-Side & Private**: All editing, image manipulation, and GitHub scanning runs entirely inside your browser. Your drafts are automatically saved in `localStorage`.
3. **Works Anywhere**: Fully functional offline directly from your local disk or anywhere you place the files.

---

## 🎯 How to Use Readmify

1. **⚡ Deep Scan Your Repo**:
   - Paste your GitHub repo name or URL (e.g. `owner/repo`) into the Deep Scanner.
   - Readmify automatically inspects dependencies, manifest files, scripts, and directory structure to pre-fill your README.

2. **🎨 Customize Sections & Tech Stack**:
   - Add, reorder, or toggle any of the 16+ section modules from the **Section Library**.
   - Pick your tech stack badges from over 140+ technologies with custom sizing, alignment, and official documentation links.

3. **🖼️ Pro Image Studio**:
   - Upload or paste banners and screenshot demos.
   - Crop, resize, wrap in macOS browser or terminal mockup frames, adjust visual filters, and download.

4. **⚖️ Open-Source License Studio**:
   - Choose from 9 standard legal licenses with full permissions/limitations breakdown.
   - 1-click download your root `LICENSE` file ready to drop into your repo root.

5. **💾 Export & Done**:
   - 1-click copy your formatted markdown or click **Download README.md** to place directly into your project!

---

## 📂 Project Architecture

```
readmify/
├── index.html                    # Main HTML5 layout, top pill bar, and modal shells
├── README.md                     # Documentation and user guide
├── assets/
│   └── favicon.svg               # SVG brand logo and favicon
├── css/
│   ├── styles.css                # Application UI layout, glassmorphic navbar, forms
│   └── github-preview.css        # Authentic GitHub Dark & Light mode typography
├── scripts/
│   └── build.js                  # Standalone offline bundle builder
└── js/
    ├── app.js                    # Main controller, pill bar & view mode coordinator
    ├── store.js                  # Reactive state store with rename, duplicate & auto-save
    ├── readmify.bundle.js        # Universal offline & GitHub Pages bundle
    ├── data/
    │   ├── techCatalog.js        # 140+ tech badges with official colors and logos
    │   ├── defaultSections.js    # 16+ section definitions, defaults & factory
    │   └── templates.js          # Base starter templates
    ├── components/
    │   ├── photoUploader.js      # HTML5 Canvas Image Studio (crop, resize, presets)
    │   ├── sectionLibrary.js     # Visual 16+ section catalog modal
    │   ├── sectionEditor.js      # Dynamic section form fields with inline renaming
    │   ├── techPicker.js         # Searchable interactive tech badge modal
    │   ├── wizard.js             # Easy Guide & deep repository scanner hub
    │   └── healthScore.js        # README completeness analyzer & tips
    └── utils/
        ├── markdownGenerator.js  # Clean GitHub Flavored Markdown builder
        └── exportUtils.js        # Clipboard copy, .md download, and toast alerts
```

---

## 📄 License

Distributed under the **MIT License**. Free for personal and commercial open-source use.
