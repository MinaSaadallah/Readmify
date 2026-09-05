/**
 * Section type registry + factory + starter README.
 * Every other module imports SECTION_TYPES from here — this file has no
 * dependencies of its own, so it must load first in the bundle.
 */

export const SECTION_TYPES = {
  HERO: 'hero',
  BADGES: 'badges',
  ABOUT: 'about',
  TOC: 'toc',
  TECH_STACK: 'tech_stack',
  FEATURES: 'features',
  DEMO: 'demo',
  INSTALLATION: 'installation',
  USAGE: 'usage',
  ENV_VARS: 'env_vars',
  API_REFERENCE: 'api_reference',
  MERMAID: 'mermaid',
  FAQ: 'faq',
  ROADMAP: 'roadmap',
  CONTRIBUTING: 'contributing',
  LICENSE: 'license',
  AUTHOR: 'author',
  STATS: 'stats',
  CUSTOM: 'custom'
};

let uidCounter = 0;
export function uid(prefix = 'sec') {
  uidCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${uidCounter}`;
}

const DEFAULT_DATA = {
  [SECTION_TYPES.HERO]: () => ({
    projectName: 'My Project',
    tagline: 'A modern, high-performance open-source project.',
    align: 'center',
    logoUrl: '',
    showLogo: false,
    logoWidth: '100%',
    repoOwner: 'username',
    repoName: 'my-project'
  }),
  [SECTION_TYPES.BADGES]: () => ({
    style: 'for-the-badge',
    align: 'center',
    showStars: true,
    showForks: true,
    showIssues: true,
    showLicense: true,
    showLastCommit: false,
    showRelease: false,
    showContributors: false,
    showActionsCI: false,
    npmPackageName: '',
    showNpmVersion: false,
    showNpmDownloads: false,
    customBadges: []
  }),
  [SECTION_TYPES.ABOUT]: () => ({
    heading: 'About The Project',
    content: 'A brief, compelling overview of why this project exists, the problem it solves, and who it helps.'
  }),
  [SECTION_TYPES.TOC]: () => ({
    heading: 'Table of Contents'
  }),
  [SECTION_TYPES.TECH_STACK]: () => ({
    heading: 'Built With',
    layout: 'badges',
    style: 'for-the-badge',
    align: 'center',
    technologies: ['javascript', 'html5', 'css3', 'git']
  }),
  [SECTION_TYPES.FEATURES]: () => ({
    heading: 'Key Features',
    items: [
      { title: 'Fast', desc: 'Engineered for speed and minimal overhead.' },
      { title: 'Simple', desc: 'A clean, intuitive experience.' },
      { title: 'Reliable', desc: 'Solid error handling and sane defaults.' }
    ]
  }),
  [SECTION_TYPES.DEMO]: () => ({
    heading: 'Preview',
    imageUrl: '',
    caption: 'Project preview',
    width: '100%',
    align: 'center',
    liveUrl: ''
  }),
  [SECTION_TYPES.INSTALLATION]: () => ({
    heading: 'Getting Started',
    prerequisites: 'Node.js 18+ and Git installed on your system.',
    steps: [
      { title: 'Clone the repository', cmd: 'git clone https://github.com/username/my-project.git\ncd my-project' },
      { title: 'Install dependencies', cmd: 'npm install' },
      { title: 'Start the dev server', cmd: 'npm run dev' }
    ]
  }),
  [SECTION_TYPES.USAGE]: () => ({
    heading: 'Usage',
    codeLang: 'bash',
    code: 'npm run start',
    note: ''
  }),
  [SECTION_TYPES.ENV_VARS]: () => ({
    heading: 'Environment Variables',
    variables: [
      { key: 'API_KEY', desc: 'Your API key', default: '', required: true }
    ]
  }),
  [SECTION_TYPES.API_REFERENCE]: () => ({
    heading: 'API Reference',
    endpoints: [
      { method: 'GET', path: '/api/items', desc: 'List all items', auth: 'None' }
    ]
  }),
  [SECTION_TYPES.MERMAID]: () => ({
    heading: 'Architecture',
    diagram: 'graph TD\n  A[Client] --> B[API]\n  B --> C[(Database)]'
  }),
  [SECTION_TYPES.FAQ]: () => ({
    heading: 'FAQ',
    questions: [
      { q: 'How do I get started?', a: 'See the Getting Started section above.' }
    ]
  }),
  [SECTION_TYPES.ROADMAP]: () => ({
    heading: 'Roadmap',
    tasks: [
      { text: 'Initial release', completed: true },
      { text: 'Add more features', completed: false }
    ]
  }),
  [SECTION_TYPES.CONTRIBUTING]: () => ({
    heading: 'Contributing',
    guidelines: 'Contributions are welcome! Please open an issue or pull request.'
  }),
  [SECTION_TYPES.LICENSE]: () => ({
    heading: 'License',
    type: 'MIT',
    holder: 'Your Name',
    year: String(new Date().getFullYear())
  }),
  [SECTION_TYPES.AUTHOR]: () => ({
    heading: 'Author',
    name: 'Your Name',
    github: '',
    twitter: '',
    linkedin: '',
    email: ''
  }),
  [SECTION_TYPES.STATS]: () => ({
    heading: 'Stats',
    githubUser: '',
    showTopLangs: true,
    showStreak: false,
    showStarHistory: false,
    theme: 'dark'
  }),
  [SECTION_TYPES.CUSTOM]: () => ({
    heading: 'Custom Section',
    markdown: ''
  })
};

const DEFAULT_TITLES = {
  [SECTION_TYPES.HERO]: 'Header & Title',
  [SECTION_TYPES.BADGES]: 'Badges',
  [SECTION_TYPES.ABOUT]: 'About',
  [SECTION_TYPES.TOC]: 'Table of Contents',
  [SECTION_TYPES.TECH_STACK]: 'Built With',
  [SECTION_TYPES.FEATURES]: 'Features',
  [SECTION_TYPES.DEMO]: 'Demo / Preview',
  [SECTION_TYPES.INSTALLATION]: 'Installation',
  [SECTION_TYPES.USAGE]: 'Usage',
  [SECTION_TYPES.ENV_VARS]: 'Environment Variables',
  [SECTION_TYPES.API_REFERENCE]: 'API Reference',
  [SECTION_TYPES.MERMAID]: 'Diagram',
  [SECTION_TYPES.FAQ]: 'FAQ',
  [SECTION_TYPES.ROADMAP]: 'Roadmap',
  [SECTION_TYPES.CONTRIBUTING]: 'Contributing',
  [SECTION_TYPES.LICENSE]: 'License',
  [SECTION_TYPES.AUTHOR]: 'Author',
  [SECTION_TYPES.STATS]: 'Stats',
  [SECTION_TYPES.CUSTOM]: 'Custom Section'
};

export function createSection(type, customTitle) {
  const factory = DEFAULT_DATA[type];
  return {
    id: uid(),
    type,
    title: customTitle || DEFAULT_TITLES[type] || 'Section',
    enabled: true,
    data: factory ? factory() : {}
  };
}

export const INITIAL_SECTIONS = [
  createSection(SECTION_TYPES.HERO),
  createSection(SECTION_TYPES.BADGES),
  createSection(SECTION_TYPES.TOC),
  createSection(SECTION_TYPES.ABOUT),
  createSection(SECTION_TYPES.TECH_STACK),
  createSection(SECTION_TYPES.FEATURES),
  createSection(SECTION_TYPES.INSTALLATION),
  createSection(SECTION_TYPES.CONTRIBUTING),
  createSection(SECTION_TYPES.LICENSE)
];
