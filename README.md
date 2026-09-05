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

## ⚡ Instant Local Run

Because Readmify is built with 100% pure web standards:
1. Clone or download this repository.
2. Double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox.
3. That's it! It runs completely offline and saves drafts automatically in your browser's `localStorage`.

---

## 🌐 2-Step GitHub Pages Deployment

Hosting Readmify for free on GitHub Pages takes under 30 seconds:

1. **Push this repository to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: Readmify v3.0 release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/readmify.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   * Go to your repository on GitHub.
   * Click **Settings** → **Pages** (in the left sidebar).
   * Under **Build and deployment** → **Source**, select **Deploy from a branch**.
   * Under **Branch**, select `main` and `/ (root)`.
   * Click **Save**.

Your site will be live immediately at `https://<your-username>.github.io/readmify/`!

---

## 📂 Project Architecture

```
readmify/
├── index.html                    # Main HTML5 layout, top pill bar, and modal shells
├── README.md                     # Documentation and deployment guide
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
