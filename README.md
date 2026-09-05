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
* 🪄 **3-Minute Quick Wizard**: A 5-step guided walkthrough that crafts a complete README from scratch.
* 🎨 **130+ Tech Stack Badges**: Instant search and 1-click addition with official brand logos and hex colors.
* ⚡ **Live GitHub Preview**: Authentic GitHub Dark Mode (`#0d1117`) and Light Mode (`#ffffff`) rendering with real-time health score rating.
* 📦 **7 Curated 1-Click Templates**: Fullstack SaaS, NPM Library, CLI Tool, Mobile App, Student Project, GitHub Profile README, and AI/ML.
* 🚀 **Pure Zero-Build**: No Node.js, no `npm install`, no `node_modules`, and no build wait times.

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
   git commit -m "feat: Initial Readmify release"
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
├── index.html                    # Main HTML5 layout and modal shells
├── README.md                     # Documentation and deployment guide
├── assets/
│   └── favicon.svg               # SVG brand logo and favicon
├── css/
│   ├── styles.css                # Application UI layout, glassmorphic navbar, forms
│   └── github-preview.css        # Authentic GitHub Dark & Light mode typography
└── js/
    ├── app.js                    # Main controller and event coordinator
    ├── store.js                  # Reactive state store with localStorage auto-save
    ├── data/
    │   ├── techCatalog.js        # 130+ tech badges with official colors and logos
    │   ├── defaultSections.js    # Section definitions & defaults
    │   └── templates.js          # 7 pre-made project templates
    ├── components/
    │   ├── wizard.js             # 5-step beginner quick wizard
    │   ├── sectionEditor.js      # Dynamic section form fields
    │   ├── techPicker.js         # Searchable interactive tech badge modal
    │   └── healthScore.js        # README completeness analyzer & tips
    └── utils/
        ├── markdownGenerator.js  # Clean GitHub Flavored Markdown builder
        └── exportUtils.js        # Clipboard copy, .md download, and toast alerts
```

---

## 📄 License

Distributed under the **MIT License**. Free for personal and commercial open-source use.
