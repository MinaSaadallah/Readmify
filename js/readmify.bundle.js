

(function() {
  'use strict';

/* ==================== MODULE: data/defaultSections.js ==================== */

const SECTION_TYPES = {
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
function uid(prefix = 'sec') {
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
function createSection(type, customTitle) {
  const factory = DEFAULT_DATA[type];
  return {
    id: uid(),
    type,
    title: customTitle || DEFAULT_TITLES[type] || 'Section',
    enabled: true,
    data: factory ? factory() : {}
  };
}
const INITIAL_SECTIONS = [
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

/* ==================== MODULE: data/techCatalog.js ==================== */

const TECH_CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'languages', name: 'Languages' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'database', name: 'Databases' },
  { id: 'devops', name: 'Cloud & DevOps' },
  { id: 'tools', name: 'Tools' }
];

// color = simple-icons brand hex (no '#'); logoColor = text color shields should draw the logo in.
const TECH_CATALOG = [
  // Languages
  { id: 'javascript', name: 'JavaScript', category: 'languages', color: 'F7DF1E', logo: 'javascript', logoColor: 'black' },
  { id: 'typescript', name: 'TypeScript', category: 'languages', color: '3178C6', logo: 'typescript', logoColor: 'white' },
  { id: 'python', name: 'Python', category: 'languages', color: '3776AB', logo: 'python', logoColor: 'white' },
  { id: 'java', name: 'Java', category: 'languages', color: '007396', logo: 'openjdk', logoColor: 'white' },
  { id: 'csharp', name: 'C#', category: 'languages', color: '239120', logo: 'csharp', logoColor: 'white' },
  { id: 'go', name: 'Go', category: 'languages', color: '00ADD8', logo: 'go', logoColor: 'white' },
  { id: 'rust', name: 'Rust', category: 'languages', color: '000000', logo: 'rust', logoColor: 'white' },
  { id: 'php', name: 'PHP', category: 'languages', color: '777BB4', logo: 'php', logoColor: 'white' },
  { id: 'ruby', name: 'Ruby', category: 'languages', color: 'CC342D', logo: 'ruby', logoColor: 'white' },
  { id: 'kotlin', name: 'Kotlin', category: 'languages', color: '7F52FF', logo: 'kotlin', logoColor: 'white' },
  { id: 'swift', name: 'Swift', category: 'languages', color: 'FA7343', logo: 'swift', logoColor: 'white' },
  { id: 'cplusplus', name: 'C++', category: 'languages', color: '00599C', logo: 'cplusplus', logoColor: 'white' },
  { id: 'html5', name: 'HTML5', category: 'languages', color: 'E34F26', logo: 'html5', logoColor: 'white' },
  { id: 'css3', name: 'CSS3', category: 'languages', color: '1572B6', logo: 'css3', logoColor: 'white' },
  { id: 'dart', name: 'Dart', category: 'languages', color: '0175C2', logo: 'dart', logoColor: 'white' },

  // Frontend
  { id: 'react', name: 'React', category: 'frontend', color: '61DAFB', logo: 'react', logoColor: 'black' },
  { id: 'vuejs', name: 'Vue.js', category: 'frontend', color: '4FC08D', logo: 'vuedotjs', logoColor: 'white' },
  { id: 'angular', name: 'Angular', category: 'frontend', color: 'DD0031', logo: 'angular', logoColor: 'white' },
  { id: 'svelte', name: 'Svelte', category: 'frontend', color: 'FF3E00', logo: 'svelte', logoColor: 'white' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', color: '000000', logo: 'nextdotjs', logoColor: 'white' },
  { id: 'nuxtjs', name: 'Nuxt', category: 'frontend', color: '00DC82', logo: 'nuxtdotjs', logoColor: 'black' },
  { id: 'tailwindcss', name: 'Tailwind CSS', category: 'frontend', color: '06B6D4', logo: 'tailwindcss', logoColor: 'white' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'frontend', color: '7952B3', logo: 'bootstrap', logoColor: 'white' },
  { id: 'sass', name: 'Sass', category: 'frontend', color: 'CC6699', logo: 'sass', logoColor: 'white' },
  { id: 'redux', name: 'Redux', category: 'frontend', color: '764ABC', logo: 'redux', logoColor: 'white' },

  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend', color: '339933', logo: 'nodedotjs', logoColor: 'white' },
  { id: 'express', name: 'Express', category: 'backend', color: '000000', logo: 'express', logoColor: 'white' },
  { id: 'nestjs', name: 'NestJS', category: 'backend', color: 'E0234E', logo: 'nestjs', logoColor: 'white' },
  { id: 'django', name: 'Django', category: 'backend', color: '092E20', logo: 'django', logoColor: 'white' },
  { id: 'flask', name: 'Flask', category: 'backend', color: '000000', logo: 'flask', logoColor: 'white' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', color: '009688', logo: 'fastapi', logoColor: 'white' },
  { id: 'spring', name: 'Spring Boot', category: 'backend', color: '6DB33F', logo: 'springboot', logoColor: 'white' },
  { id: 'laravel', name: 'Laravel', category: 'backend', color: 'FF2D20', logo: 'laravel', logoColor: 'white' },
  { id: 'graphql', name: 'GraphQL', category: 'backend', color: 'E10098', logo: 'graphql', logoColor: 'white' },

  // Databases
  { id: 'mongodb', name: 'MongoDB', category: 'database', color: '47A248', logo: 'mongodb', logoColor: 'white' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', color: '4169E1', logo: 'postgresql', logoColor: 'white' },
  { id: 'mysql', name: 'MySQL', category: 'database', color: '4479A1', logo: 'mysql', logoColor: 'white' },
  { id: 'redis', name: 'Redis', category: 'database', color: 'DC382D', logo: 'redis', logoColor: 'white' },
  { id: 'sqlite', name: 'SQLite', category: 'database', color: '003B57', logo: 'sqlite', logoColor: 'white' },
  { id: 'firebase', name: 'Firebase', category: 'database', color: 'FFCA28', logo: 'firebase', logoColor: 'black' },
  { id: 'supabase', name: 'Supabase', category: 'database', color: '3FCF8E', logo: 'supabase', logoColor: 'black' },

  // Cloud & DevOps
  { id: 'docker', name: 'Docker', category: 'devops', color: '2496ED', logo: 'docker', logoColor: 'white' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops', color: '326CE5', logo: 'kubernetes', logoColor: 'white' },
  { id: 'aws', name: 'AWS', category: 'devops', color: '232F3E', logo: 'amazonaws', logoColor: 'white' },
  { id: 'githubactions', name: 'GitHub Actions', category: 'devops', color: '2088FF', logo: 'githubactions', logoColor: 'white' },
  { id: 'vercel', name: 'Vercel', category: 'devops', color: '000000', logo: 'vercel', logoColor: 'white' },
  { id: 'netlify', name: 'Netlify', category: 'devops', color: '00C7B7', logo: 'netlify', logoColor: 'white' },
  { id: 'nginx', name: 'Nginx', category: 'devops', color: '009639', logo: 'nginx', logoColor: 'white' },
  { id: 'terraform', name: 'Terraform', category: 'devops', color: '7B42BC', logo: 'terraform', logoColor: 'white' },

  // Tools
  { id: 'git', name: 'Git', category: 'tools', color: 'F05032', logo: 'git', logoColor: 'white' },
  { id: 'github', name: 'GitHub', category: 'tools', color: '181717', logo: 'github', logoColor: 'white' },
  { id: 'vscode', name: 'VS Code', category: 'tools', color: '007ACC', logo: 'visualstudiocode', logoColor: 'white' },
  { id: 'figma', name: 'Figma', category: 'tools', color: 'F24E1E', logo: 'figma', logoColor: 'white' },
  { id: 'jest', name: 'Jest', category: 'tools', color: 'C21325', logo: 'jest', logoColor: 'white' },
  { id: 'eslint', name: 'ESLint', category: 'tools', color: '4B32C3', logo: 'eslint', logoColor: 'white' },
  { id: 'webpack', name: 'Webpack', category: 'tools', color: '8DD6F9', logo: 'webpack', logoColor: 'black' },
  { id: 'vite', name: 'Vite', category: 'tools', color: '646CFF', logo: 'vite', logoColor: 'white' },
  { id: 'npm', name: 'npm', category: 'tools', color: 'CB3837', logo: 'npm', logoColor: 'white' },
  { id: 'postman', name: 'Postman', category: 'tools', color: 'FF6C37', logo: 'postman', logoColor: 'white' }
];

const TECH_DOC_MAP = {
  javascript: 'https://developer.mozilla.org/docs/Web/JavaScript',
  typescript: 'https://www.typescriptlang.org/',
  python: 'https://www.python.org/',
  java: 'https://www.java.com/',
  csharp: 'https://learn.microsoft.com/dotnet/csharp/',
  go: 'https://go.dev/',
  rust: 'https://www.rust-lang.org/',
  php: 'https://www.php.net/',
  ruby: 'https://www.ruby-lang.org/',
  kotlin: 'https://kotlinlang.org/',
  swift: 'https://www.swift.org/',
  cplusplus: 'https://isocpp.org/',
  html5: 'https://developer.mozilla.org/docs/Web/HTML',
  css3: 'https://developer.mozilla.org/docs/Web/CSS',
  dart: 'https://dart.dev/',
  react: 'https://react.dev/',
  vuejs: 'https://vuejs.org/',
  angular: 'https://angular.dev/',
  svelte: 'https://svelte.dev/',
  nextjs: 'https://nextjs.org/',
  nuxtjs: 'https://nuxt.com/',
  tailwindcss: 'https://tailwindcss.com/',
  bootstrap: 'https://getbootstrap.com/',
  sass: 'https://sass-lang.com/',
  redux: 'https://redux.js.org/',
  nodejs: 'https://nodejs.org/',
  express: 'https://expressjs.com/',
  nestjs: 'https://nestjs.com/',
  django: 'https://www.djangoproject.com/',
  flask: 'https://flask.palletsprojects.com/',
  fastapi: 'https://fastapi.tiangolo.com/',
  spring: 'https://spring.io/projects/spring-boot',
  laravel: 'https://laravel.com/',
  graphql: 'https://graphql.org/',
  mongodb: 'https://www.mongodb.com/',
  postgresql: 'https://www.postgresql.org/',
  mysql: 'https://www.mysql.com/',
  redis: 'https://redis.io/',
  sqlite: 'https://www.sqlite.org/',
  firebase: 'https://firebase.google.com/',
  supabase: 'https://supabase.com/',
  docker: 'https://www.docker.com/',
  kubernetes: 'https://kubernetes.io/',
  aws: 'https://aws.amazon.com/',
  githubactions: 'https://github.com/features/actions',
  vercel: 'https://vercel.com/',
  netlify: 'https://www.netlify.com/',
  nginx: 'https://nginx.org/',
  terraform: 'https://www.terraform.io/',
  git: 'https://git-scm.com/',
  github: 'https://github.com/',
  vscode: 'https://code.visualstudio.com/',
  figma: 'https://www.figma.com/',
  jest: 'https://jestjs.io/',
  eslint: 'https://eslint.org/',
  webpack: 'https://webpack.js.org/',
  vite: 'https://vitejs.dev/',
  npm: 'https://www.npmjs.com/',
  postman: 'https://www.postman.com/'
};

const techByIdCache = new Map();
function techById(id) {
  if (techByIdCache.has(id)) return techByIdCache.get(id);
  const found = TECH_CATALOG.find(t => t.id === id) || null;
  techByIdCache.set(id, found);
  return found;
}
function getBadgeUrl(item, style = 'for-the-badge') {
  const encodedName = encodeURIComponent(String(item.name).replace(/-/g, '--'));
  return `https://img.shields.io/badge/${encodedName}-${item.color}?style=${style}&logo=${item.logo}&logoColor=${item.logoColor}`;
}
function getTechDocUrl(itemOrId) {
  const id = typeof itemOrId === 'string' ? itemOrId : itemOrId?.id;
  if (!id) return 'https://github.com';
  return TECH_DOC_MAP[id] || `https://github.com/topics/${id}`;
}

/* ==================== MODULE: data/licenses.js ==================== */

const LICENSE_CATALOG = [
  {
    id: "MIT",
    name: "MIT License",
    url: "https://opensource.org/license/mit",
    badgeUrl: "https://img.shields.io/badge/License-MIT-yellow.svg",
    generateText: (year, holder) => "MIT License\n\nCopyright (c) [year] [fullname]\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.".split('[year]').join(year).split('[fullname]').join(holder)
  },
  {
    id: "Apache-2.0",
    name: "Apache License 2.0",
    url: "https://www.apache.org/licenses/LICENSE-2.0",
    badgeUrl: "https://img.shields.io/badge/License-Apache--2.0-blue.svg",
    generateText: () => "                                 Apache License\n                           Version 2.0, January 2004\n                        http://www.apache.org/licenses/\n\n   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION\n\n   1. Definitions.\n\n      \"License\" shall mean the terms and conditions for use, reproduction,\n      and distribution as defined by Sections 1 through 9 of this document.\n\n      \"Licensor\" shall mean the copyright owner or entity authorized by\n      the copyright owner that is granting the License.\n\n      \"Legal Entity\" shall mean the union of the acting entity and all\n      other entities that control, are controlled by, or are under common\n      control with that entity. For the purposes of this definition,\n      \"control\" means (i) the power, direct or indirect, to cause the\n      direction or management of such entity, whether by contract or\n      otherwise, or (ii) ownership of fifty percent (50%) or more of the\n      outstanding shares, or (iii) beneficial ownership of such entity.\n\n      \"You\" (or \"Your\") shall mean an individual or Legal Entity\n      exercising permissions granted by this License.\n\n      \"Source\" form shall mean the preferred form for making modifications,\n      including but not limited to software source code, documentation\n      source, and configuration files.\n\n      \"Object\" form shall mean any form resulting from mechanical\n      transformation or translation of a Source form, including but\n      not limited to compiled object code, generated documentation,\n      and conversions to other media types.\n\n      \"Work\" shall mean the work of authorship, whether in Source or\n      Object form, made available under the License, as indicated by a\n      copyright notice that is included in or attached to the work\n      (an example is provided in the Appendix below).\n\n      \"Derivative Works\" shall mean any work, whether in Source or Object\n      form, that is based on (or derived from) the Work and for which the\n      editorial revisions, annotations, elaborations, or other modifications\n      represent, as a whole, an original work of authorship. For the purposes\n      of this License, Derivative Works shall not include works that remain\n      separable from, or merely link (or bind by name) to the interfaces of,\n      the Work and Derivative Works thereof.\n\n      \"Contribution\" shall mean any work of authorship, including\n      the original version of the Work and any modifications or additions\n      to that Work or Derivative Works thereof, that is intentionally\n      submitted to Licensor for inclusion in the Work by the copyright owner\n      or by an individual or Legal Entity authorized to submit on behalf of\n      the copyright owner. For the purposes of this definition, \"submitted\"\n      means any form of electronic, verbal, or written communication sent\n      to the Licensor or its representatives, including but not limited to\n      communication on electronic mailing lists, source code control systems,\n      and issue tracking systems that are managed by, or on behalf of, the\n      Licensor for the purpose of discussing and improving the Work, but\n      excluding communication that is conspicuously marked or otherwise\n      designated in writing by the copyright owner as \"Not a Contribution.\"\n\n      \"Contributor\" shall mean Licensor and any individual or Legal Entity\n      on behalf of whom a Contribution has been received by Licensor and\n      subsequently incorporated within the Work.\n\n   2. Grant of Copyright License. Subject to the terms and conditions of\n      this License, each Contributor hereby grants to You a perpetual,\n      worldwide, non-exclusive, no-charge, royalty-free, irrevocable\n      copyright license to reproduce, prepare Derivative Works of,\n      publicly display, publicly perform, sublicense, and distribute the\n      Work and such Derivative Works in Source or Object form.\n\n   3. Grant of Patent License. Subject to the terms and conditions of\n      this License, each Contributor hereby grants to You a perpetual,\n      worldwide, non-exclusive, no-charge, royalty-free, irrevocable\n      (except as stated in this section) patent license to make, have made,\n      use, offer to sell, sell, import, and otherwise transfer the Work,\n      where such license applies only to those patent claims licensable\n      by such Contributor that are necessarily infringed by their\n      Contribution(s) alone or by combination of their Contribution(s)\n      with the Work to which such Contribution(s) was submitted. If You\n      institute patent litigation against any entity (including a\n      cross-claim or counterclaim in a lawsuit) alleging that the Work\n      or a Contribution incorporated within the Work constitutes direct\n      or contributory patent infringement, then any patent licenses\n      granted to You under this License for that Work shall terminate\n      as of the date such litigation is filed.\n\n   4. Redistribution. You may reproduce and distribute copies of the\n      Work or Derivative Works thereof in any medium, with or without\n      modifications, and in Source or Object form, provided that You\n      meet the following conditions:\n\n      (a) You must give any other recipients of the Work or\n          Derivative Works a copy of this License; and\n\n      (b) You must cause any modified files to carry prominent notices\n          stating that You changed the files; and\n\n      (c) You must retain, in the Source form of any Derivative Works\n          that You distribute, all copyright, patent, trademark, and\n          attribution notices from the Source form of the Work,\n          excluding those notices that do not pertain to any part of\n          the Derivative Works; and\n\n      (d) If the Work includes a \"NOTICE\" text file as part of its\n          distribution, then any Derivative Works that You distribute must\n          include a readable copy of the attribution notices contained\n          within such NOTICE file, excluding those notices that do not\n          pertain to any part of the Derivative Works, in at least one\n          of the following places: within a NOTICE text file distributed\n          as part of the Derivative Works; within the Source form or\n          documentation, if provided along with the Derivative Works; or,\n          within a display generated by the Derivative Works, if and\n          wherever such third-party notices normally appear. The contents\n          of the NOTICE file are for informational purposes only and\n          do not modify the License. You may add Your own attribution\n          notices within Derivative Works that You distribute, alongside\n          or as an addendum to the NOTICE text from the Work, provided\n          that such additional attribution notices cannot be construed\n          as modifying the License.\n\n      You may add Your own copyright statement to Your modifications and\n      may provide additional or different license terms and conditions\n      for use, reproduction, or distribution of Your modifications, or\n      for any such Derivative Works as a whole, provided Your use,\n      reproduction, and distribution of the Work otherwise complies with\n      the conditions stated in this License.\n\n   5. Submission of Contributions. Unless You explicitly state otherwise,\n      any Contribution intentionally submitted for inclusion in the Work\n      by You to the Licensor shall be under the terms and conditions of\n      this License, without any additional terms or conditions.\n      Notwithstanding the above, nothing herein shall supersede or modify\n      the terms of any separate license agreement you may have executed\n      with Licensor regarding such Contributions.\n\n   6. Trademarks. This License does not grant permission to use the trade\n      names, trademarks, service marks, or product names of the Licensor,\n      except as required for reasonable and customary use in describing the\n      origin of the Work and reproducing the content of the NOTICE file.\n\n   7. Disclaimer of Warranty. Unless required by applicable law or\n      agreed to in writing, Licensor provides the Work (and each\n      Contributor provides its Contributions) on an \"AS IS\" BASIS,\n      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or\n      implied, including, without limitation, any warranties or conditions\n      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A\n      PARTICULAR PURPOSE. You are solely responsible for determining the\n      appropriateness of using or redistributing the Work and assume any\n      risks associated with Your exercise of permissions under this License.\n\n   8. Limitation of Liability. In no event and under no legal theory,\n      whether in tort (including negligence), contract, or otherwise,\n      unless required by applicable law (such as deliberate and grossly\n      negligent acts) or agreed to in writing, shall any Contributor be\n      liable to You for damages, including any direct, indirect, special,\n      incidental, or consequential damages of any character arising as a\n      result of this License or out of the use or inability to use the\n      Work (including but not limited to damages for loss of goodwill,\n      work stoppage, computer failure or malfunction, or any and all\n      other commercial damages or losses), even if such Contributor\n      has been advised of the possibility of such damages.\n\n   9. Accepting Warranty or Additional Liability. While redistributing\n      the Work or Derivative Works thereof, You may choose to offer,\n      and charge a fee for, acceptance of support, warranty, indemnity,\n      or other liability obligations and/or rights consistent with this\n      License. However, in accepting such obligations, You may act only\n      on Your own behalf and on Your sole responsibility, not on behalf\n      of any other Contributor, and only if You agree to indemnify,\n      defend, and hold each Contributor harmless for any liability\n      incurred by, or claims asserted against, such Contributor by reason\n      of your accepting any such warranty or additional liability.\n\n   END OF TERMS AND CONDITIONS\n\n   APPENDIX: How to apply the Apache License to your work.\n\n      To apply the Apache License to your work, attach the following\n      boilerplate notice, with the fields enclosed by brackets \"[]\"\n      replaced with your own identifying information. (Don't include\n      the brackets!)  The text should be enclosed in the appropriate\n      comment syntax for the file format. We also recommend that a\n      file or class name and description of purpose be included on the\n      same \"printed page\" as the copyright notice for easier\n      identification within third-party archives.\n\n   Copyright [yyyy] [name of copyright owner]\n\n   Licensed under the Apache License, Version 2.0 (the \"License\");\n   you may not use this file except in compliance with the License.\n   You may obtain a copy of the License at\n\n       http://www.apache.org/licenses/LICENSE-2.0\n\n   Unless required by applicable law or agreed to in writing, software\n   distributed under the License is distributed on an \"AS IS\" BASIS,\n   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n   See the License for the specific language governing permissions and\n   limitations under the License."
  },
  {
    id: "GPL-3.0",
    name: "GNU GPLv3",
    url: "https://www.gnu.org/licenses/gpl-3.0",
    badgeUrl: "https://img.shields.io/badge/License-GPL--3.0-blue.svg",
    generateText: () => "                    GNU GENERAL PUBLIC LICENSE\n                       Version 3, 29 June 2007\n\n Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>\n Everyone is permitted to copy and distribute verbatim copies\n of this license document, but changing it is not allowed.\n\n                            Preamble\n\n  The GNU General Public License is a free, copyleft license for\nsoftware and other kinds of works.\n\n  The licenses for most software and other practical works are designed\nto take away your freedom to share and change the works.  By contrast,\nthe GNU General Public License is intended to guarantee your freedom to\nshare and change all versions of a program--to make sure it remains free\nsoftware for all its users.  We, the Free Software Foundation, use the\nGNU General Public License for most of our software; it applies also to\nany other work released this way by its authors.  You can apply it to\nyour programs, too.\n\n  When we speak of free software, we are referring to freedom, not\nprice.  Our General Public Licenses are designed to make sure that you\nhave the freedom to distribute copies of free software (and charge for\nthem if you wish), that you receive source code or can get it if you\nwant it, that you can change the software or use pieces of it in new\nfree programs, and that you know you can do these things.\n\n  To protect your rights, we need to prevent others from denying you\nthese rights or asking you to surrender the rights.  Therefore, you have\ncertain responsibilities if you distribute copies of the software, or if\nyou modify it: responsibilities to respect the freedom of others.\n\n  For example, if you distribute copies of such a program, whether\ngratis or for a fee, you must pass on to the recipients the same\nfreedoms that you received.  You must make sure that they, too, receive\nor can get the source code.  And you must show them these terms so they\nknow their rights.\n\n  Developers that use the GNU GPL protect your rights with two steps:\n(1) assert copyright on the software, and (2) offer you this License\ngiving you legal permission to copy, distribute and/or modify it.\n\n  For the developers' and authors' protection, the GPL clearly explains\nthat there is no warranty for this free software.  For both users' and\nauthors' sake, the GPL requires that modified versions be marked as\nchanged, so that their problems will not be attributed erroneously to\nauthors of previous versions.\n\n  Some devices are designed to deny users access to install or run\nmodified versions of the software inside them, although the manufacturer\ncan do so.  This is fundamentally incompatible with the aim of\nprotecting users' freedom to change the software.  The systematic\npattern of such abuse occurs in the area of products for individuals to\nuse, which is precisely where it is most unacceptable.  Therefore, we\nhave designed this version of the GPL to prohibit the practice for those\nproducts.  If such problems arise substantially in other domains, we\nstand ready to extend this provision to those domains in future versions\nof the GPL, as needed to protect the freedom of users.\n\n  Finally, every program is threatened constantly by software patents.\nStates should not allow patents to restrict development and use of\nsoftware on general-purpose computers, but in those that do, we wish to\navoid the special danger that patents applied to a free program could\nmake it effectively proprietary.  To prevent this, the GPL assures that\npatents cannot be used to render the program non-free.\n\n  The precise terms and conditions for copying, distribution and\nmodification follow.\n\n                       TERMS AND CONDITIONS\n\n  0. Definitions.\n\n  \"This License\" refers to version 3 of the GNU General Public License.\n\n  \"Copyright\" also means copyright-like laws that apply to other kinds of\nworks, such as semiconductor masks.\n\n  \"The Program\" refers to any copyrightable work licensed under this\nLicense.  Each licensee is addressed as \"you\".  \"Licensees\" and\n\"recipients\" may be individuals or organizations.\n\n  To \"modify\" a work means to copy from or adapt all or part of the work\nin a fashion requiring copyright permission, other than the making of an\nexact copy.  The resulting work is called a \"modified version\" of the\nearlier work or a work \"based on\" the earlier work.\n\n  A \"covered work\" means either the unmodified Program or a work based\non the Program.\n\n  To \"propagate\" a work means to do anything with it that, without\npermission, would make you directly or secondarily liable for\ninfringement under applicable copyright law, except executing it on a\ncomputer or modifying a private copy.  Propagation includes copying,\ndistribution (with or without modification), making available to the\npublic, and in some countries other activities as well.\n\n  To \"convey\" a work means any kind of propagation that enables other\nparties to make or receive copies.  Mere interaction with a user through\na computer network, with no transfer of a copy, is not conveying.\n\n  An interactive user interface displays \"Appropriate Legal Notices\"\nto the extent that it includes a convenient and prominently visible\nfeature that (1) displays an appropriate copyright notice, and (2)\ntells the user that there is no warranty for the work (except to the\nextent that warranties are provided), that licensees may convey the\nwork under this License, and how to view a copy of this License.  If\nthe interface presents a list of user commands or options, such as a\nmenu, a prominent item in the list meets this criterion.\n\n  1. Source Code.\n\n  The \"source code\" for a work means the preferred form of the work\nfor making modifications to it.  \"Object code\" means any non-source\nform of a work.\n\n  A \"Standard Interface\" means an interface that either is an official\nstandard defined by a recognized standards body, or, in the case of\ninterfaces specified for a particular programming language, one that\nis widely used among developers working in that language.\n\n  The \"System Libraries\" of an executable work include anything, other\nthan the work as a whole, that (a) is included in the normal form of\npackaging a Major Component, but which is not part of that Major\nComponent, and (b) serves only to enable use of the work with that\nMajor Component, or to implement a Standard Interface for which an\nimplementation is available to the public in source code form.  A\n\"Major Component\", in this context, means a major essential component\n(kernel, window system, and so on) of the specific operating system\n(if any) on which the executable work runs, or a compiler used to\nproduce the work, or an object code interpreter used to run it.\n\n  The \"Corresponding Source\" for a work in object code form means all\nthe source code needed to generate, install, and (for an executable\nwork) run the object code and to modify the work, including scripts to\ncontrol those activities.  However, it does not include the work's\nSystem Libraries, or general-purpose tools or generally available free\nprograms which are used unmodified in performing those activities but\nwhich are not part of the work.  For example, Corresponding Source\nincludes interface definition files associated with source files for\nthe work, and the source code for shared libraries and dynamically\nlinked subprograms that the work is specifically designed to require,\nsuch as by intimate data communication or control flow between those\nsubprograms and other parts of the work.\n\n  The Corresponding Source need not include anything that users\ncan regenerate automatically from other parts of the Corresponding\nSource.\n\n  The Corresponding Source for a work in source code form is that\nsame work.\n\n  2. Basic Permissions.\n\n  All rights granted under this License are granted for the term of\ncopyright on the Program, and are irrevocable provided the stated\nconditions are met.  This License explicitly affirms your unlimited\npermission to run the unmodified Program.  The output from running a\ncovered work is covered by this License only if the output, given its\ncontent, constitutes a covered work.  This License acknowledges your\nrights of fair use or other equivalent, as provided by copyright law.\n\n  You may make, run and propagate covered works that you do not\nconvey, without conditions so long as your license otherwise remains\nin force.  You may convey covered works to others for the sole purpose\nof having them make modifications exclusively for you, or provide you\nwith facilities for running those works, provided that you comply with\nthe terms of this License in conveying all material for which you do\nnot control copyright.  Those thus making or running the covered works\nfor you must do so exclusively on your behalf, under your direction\nand control, on terms that prohibit them from making any copies of\nyour copyrighted material outside their relationship with you.\n\n  Conveying under any other circumstances is permitted solely under\nthe conditions stated below.  Sublicensing is not allowed; section 10\nmakes it unnecessary.\n\n  3. Protecting Users' Legal Rights From Anti-Circumvention Law.\n\n  No covered work shall be deemed part of an effective technological\nmeasure under any applicable law fulfilling obligations under article\n11 of the WIPO copyright treaty adopted on 20 December 1996, or\nsimilar laws prohibiting or restricting circumvention of such\nmeasures.\n\n  When you convey a covered work, you waive any legal power to forbid\ncircumvention of technological measures to the extent such circumvention\nis effected by exercising rights under this License with respect to\nthe covered work, and you disclaim any intention to limit operation or\nmodification of the work as a means of enforcing, against the work's\nusers, your or third parties' legal rights to forbid circumvention of\ntechnological measures.\n\n  4. Conveying Verbatim Copies.\n\n  You may convey verbatim copies of the Program's source code as you\nreceive it, in any medium, provided that you conspicuously and\nappropriately publish on each copy an appropriate copyright notice;\nkeep intact all notices stating that this License and any\nnon-permissive terms added in accord with section 7 apply to the code;\nkeep intact all notices of the absence of any warranty; and give all\nrecipients a copy of this License along with the Program.\n\n  You may charge any price or no price for each copy that you convey,\nand you may offer support or warranty protection for a fee.\n\n  5. Conveying Modified Source Versions.\n\n  You may convey a work based on the Program, or the modifications to\nproduce it from the Program, in the form of source code under the\nterms of section 4, provided that you also meet all of these conditions:\n\n    a) The work must carry prominent notices stating that you modified\n    it, and giving a relevant date.\n\n    b) The work must carry prominent notices stating that it is\n    released under this License and any conditions added under section\n    7.  This requirement modifies the requirement in section 4 to\n    \"keep intact all notices\".\n\n    c) You must license the entire work, as a whole, under this\n    License to anyone who comes into possession of a copy.  This\n    License will therefore apply, along with any applicable section 7\n    additional terms, to the whole of the work, and all its parts,\n    regardless of how they are packaged.  This License gives no\n    permission to license the work in any other way, but it does not\n    invalidate such permission if you have separately received it.\n\n    d) If the work has interactive user interfaces, each must display\n    Appropriate Legal Notices; however, if the Program has interactive\n    interfaces that do not display Appropriate Legal Notices, your\n    work need not make them do so.\n\n  A compilation of a covered work with other separate and independent\nworks, which are not by their nature extensions of the covered work,\nand which are not combined with it such as to form a larger program,\nin or on a volume of a storage or distribution medium, is called an\n\"aggregate\" if the compilation and its resulting copyright are not\nused to limit the access or legal rights of the compilation's users\nbeyond what the individual works permit.  Inclusion of a covered work\nin an aggregate does not cause this License to apply to the other\nparts of the aggregate.\n\n  6. Conveying Non-Source Forms.\n\n  You may convey a covered work in object code form under the terms\nof sections 4 and 5, provided that you also convey the\nmachine-readable Corresponding Source under the terms of this License,\nin one of these ways:\n\n    a) Convey the object code in, or embodied in, a physical product\n    (including a physical distribution medium), accompanied by the\n    Corresponding Source fixed on a durable physical medium\n    customarily used for software interchange.\n\n    b) Convey the object code in, or embodied in, a physical product\n    (including a physical distribution medium), accompanied by a\n    written offer, valid for at least three years and valid for as\n    long as you offer spare parts or customer support for that product\n    model, to give anyone who possesses the object code either (1) a\n    copy of the Corresponding Source for all the software in the\n    product that is covered by this License, on a durable physical\n    medium customarily used for software interchange, for a price no\n    more than your reasonable cost of physically performing this\n    conveying of source, or (2) access to copy the\n    Corresponding Source from a network server at no charge.\n\n    c) Convey individual copies of the object code with a copy of the\n    written offer to provide the Corresponding Source.  This\n    alternative is allowed only occasionally and noncommercially, and\n    only if you received the object code with such an offer, in accord\n    with subsection 6b.\n\n    d) Convey the object code by offering access from a designated\n    place (gratis or for a charge), and offer equivalent access to the\n    Corresponding Source in the same way through the same place at no\n    further charge.  You need not require recipients to copy the\n    Corresponding Source along with the object code.  If the place to\n    copy the object code is a network server, the Corresponding Source\n    may be on a different server (operated by you or a third party)\n    that supports equivalent copying facilities, provided you maintain\n    clear directions next to the object code saying where to find the\n    Corresponding Source.  Regardless of what server hosts the\n    Corresponding Source, you remain obligated to ensure that it is\n    available for as long as needed to satisfy these requirements.\n\n    e) Convey the object code using peer-to-peer transmission, provided\n    you inform other peers where the object code and Corresponding\n    Source of the work are being offered to the general public at no\n    charge under subsection 6d.\n\n  A separable portion of the object code, whose source code is excluded\nfrom the Corresponding Source as a System Library, need not be\nincluded in conveying the object code work.\n\n  A \"User Product\" is either (1) a \"consumer product\", which means any\ntangible personal property which is normally used for personal, family,\nor household purposes, or (2) anything designed or sold for incorporation\ninto a dwelling.  In determining whether a product is a consumer product,\ndoubtful cases shall be resolved in favor of coverage.  For a particular\nproduct received by a particular user, \"normally used\" refers to a\ntypical or common use of that class of product, regardless of the status\nof the particular user or of the way in which the particular user\nactually uses, or expects or is expected to use, the product.  A product\nis a consumer product regardless of whether the product has substantial\ncommercial, industrial or non-consumer uses, unless such uses represent\nthe only significant mode of use of the product.\n\n  \"Installation Information\" for a User Product means any methods,\nprocedures, authorization keys, or other information required to install\nand execute modified versions of a covered work in that User Product from\na modified version of its Corresponding Source.  The information must\nsuffice to ensure that the continued functioning of the modified object\ncode is in no case prevented or interfered with solely because\nmodification has been made.\n\n  If you convey an object code work under this section in, or with, or\nspecifically for use in, a User Product, and the conveying occurs as\npart of a transaction in which the right of possession and use of the\nUser Product is transferred to the recipient in perpetuity or for a\nfixed term (regardless of how the transaction is characterized), the\nCorresponding Source conveyed under this section must be accompanied\nby the Installation Information.  But this requirement does not apply\nif neither you nor any third party retains the ability to install\nmodified object code on the User Product (for example, the work has\nbeen installed in ROM).\n\n  The requirement to provide Installation Information does not include a\nrequirement to continue to provide support service, warranty, or updates\nfor a work that has been modified or installed by the recipient, or for\nthe User Product in which it has been modified or installed.  Access to a\nnetwork may be denied when the modification itself materially and\nadversely affects the operation of the network or violates the rules and\nprotocols for communication across the network.\n\n  Corresponding Source conveyed, and Installation Information provided,\nin accord with this section must be in a format that is publicly\ndocumented (and with an implementation available to the public in\nsource code form), and must require no special password or key for\nunpacking, reading or copying.\n\n  7. Additional Terms.\n\n  \"Additional permissions\" are terms that supplement the terms of this\nLicense by making exceptions from one or more of its conditions.\nAdditional permissions that are applicable to the entire Program shall\nbe treated as though they were included in this License, to the extent\nthat they are valid under applicable law.  If additional permissions\napply only to part of the Program, that part may be used separately\nunder those permissions, but the entire Program remains governed by\nthis License without regard to the additional permissions.\n\n  When you convey a copy of a covered work, you may at your option\nremove any additional permissions from that copy, or from any part of\nit.  (Additional permissions may be written to require their own\nremoval in certain cases when you modify the work.)  You may place\nadditional permissions on material, added by you to a covered work,\nfor which you have or can give appropriate copyright permission.\n\n  Notwithstanding any other provision of this License, for material you\nadd to a covered work, you may (if authorized by the copyright holders of\nthat material) supplement the terms of this License with terms:\n\n    a) Disclaiming warranty or limiting liability differently from the\n    terms of sections 15 and 16 of this License; or\n\n    b) Requiring preservation of specified reasonable legal notices or\n    author attributions in that material or in the Appropriate Legal\n    Notices displayed by works containing it; or\n\n    c) Prohibiting misrepresentation of the origin of that material, or\n    requiring that modified versions of such material be marked in\n    reasonable ways as different from the original version; or\n\n    d) Limiting the use for publicity purposes of names of licensors or\n    authors of the material; or\n\n    e) Declining to grant rights under trademark law for use of some\n    trade names, trademarks, or service marks; or\n\n    f) Requiring indemnification of licensors and authors of that\n    material by anyone who conveys the material (or modified versions of\n    it) with contractual assumptions of liability to the recipient, for\n    any liability that these contractual assumptions directly impose on\n    those licensors and authors.\n\n  All other non-permissive additional terms are considered \"further\nrestrictions\" within the meaning of section 10.  If the Program as you\nreceived it, or any part of it, contains a notice stating that it is\ngoverned by this License along with a term that is a further\nrestriction, you may remove that term.  If a license document contains\na further restriction but permits relicensing or conveying under this\nLicense, you may add to a covered work material governed by the terms\nof that license document, provided that the further restriction does\nnot survive such relicensing or conveying.\n\n  If you add terms to a covered work in accord with this section, you\nmust place, in the relevant source files, a statement of the\nadditional terms that apply to those files, or a notice indicating\nwhere to find the applicable terms.\n\n  Additional terms, permissive or non-permissive, may be stated in the\nform of a separately written license, or stated as exceptions;\nthe above requirements apply either way.\n\n  8. Termination.\n\n  You may not propagate or modify a covered work except as expressly\nprovided under this License.  Any attempt otherwise to propagate or\nmodify it is void, and will automatically terminate your rights under\nthis License (including any patent licenses granted under the third\nparagraph of section 11).\n\n  However, if you cease all violation of this License, then your\nlicense from a particular copyright holder is reinstated (a)\nprovisionally, unless and until the copyright holder explicitly and\nfinally terminates your license, and (b) permanently, if the copyright\nholder fails to notify you of the violation by some reasonable means\nprior to 60 days after the cessation.\n\n  Moreover, your license from a particular copyright holder is\nreinstated permanently if the copyright holder notifies you of the\nviolation by some reasonable means, this is the first time you have\nreceived notice of violation of this License (for any work) from that\ncopyright holder, and you cure the violation prior to 30 days after\nyour receipt of the notice.\n\n  Termination of your rights under this section does not terminate the\nlicenses of parties who have received copies or rights from you under\nthis License.  If your rights have been terminated and not permanently\nreinstated, you do not qualify to receive new licenses for the same\nmaterial under section 10.\n\n  9. Acceptance Not Required for Having Copies.\n\n  You are not required to accept this License in order to receive or\nrun a copy of the Program.  Ancillary propagation of a covered work\noccurring solely as a consequence of using peer-to-peer transmission\nto receive a copy likewise does not require acceptance.  However,\nnothing other than this License grants you permission to propagate or\nmodify any covered work.  These actions infringe copyright if you do\nnot accept this License.  Therefore, by modifying or propagating a\ncovered work, you indicate your acceptance of this License to do so.\n\n  10. Automatic Licensing of Downstream Recipients.\n\n  Each time you convey a covered work, the recipient automatically\nreceives a license from the original licensors, to run, modify and\npropagate that work, subject to this License.  You are not responsible\nfor enforcing compliance by third parties with this License.\n\n  An \"entity transaction\" is a transaction transferring control of an\norganization, or substantially all assets of one, or subdividing an\norganization, or merging organizations.  If propagation of a covered\nwork results from an entity transaction, each party to that\ntransaction who receives a copy of the work also receives whatever\nlicenses to the work the party's predecessor in interest had or could\ngive under the previous paragraph, plus a right to possession of the\nCorresponding Source of the work from the predecessor in interest, if\nthe predecessor has it or can get it with reasonable efforts.\n\n  You may not impose any further restrictions on the exercise of the\nrights granted or affirmed under this License.  For example, you may\nnot impose a license fee, royalty, or other charge for exercise of\nrights granted under this License, and you may not initiate litigation\n(including a cross-claim or counterclaim in a lawsuit) alleging that\nany patent claim is infringed by making, using, selling, offering for\nsale, or importing the Program or any portion of it.\n\n  11. Patents.\n\n  A \"contributor\" is a copyright holder who authorizes use under this\nLicense of the Program or a work on which the Program is based.  The\nwork thus licensed is called the contributor's \"contributor version\".\n\n  A contributor's \"essential patent claims\" are all patent claims\nowned or controlled by the contributor, whether already acquired or\nhereafter acquired, that would be infringed by some manner, permitted\nby this License, of making, using, or selling its contributor version,\nbut do not include claims that would be infringed only as a\nconsequence of further modification of the contributor version.  For\npurposes of this definition, \"control\" includes the right to grant\npatent sublicenses in a manner consistent with the requirements of\nthis License.\n\n  Each contributor grants you a non-exclusive, worldwide, royalty-free\npatent license under the contributor's essential patent claims, to\nmake, use, sell, offer for sale, import and otherwise run, modify and\npropagate the contents of its contributor version.\n\n  In the following three paragraphs, a \"patent license\" is any express\nagreement or commitment, however denominated, not to enforce a patent\n(such as an express permission to practice a patent or covenant not to\nsue for patent infringement).  To \"grant\" such a patent license to a\nparty means to make such an agreement or commitment not to enforce a\npatent against the party.\n\n  If you convey a covered work, knowingly relying on a patent license,\nand the Corresponding Source of the work is not available for anyone\nto copy, free of charge and under the terms of this License, through a\npublicly available network server or other readily accessible means,\nthen you must either (1) cause the Corresponding Source to be so\navailable, or (2) arrange to deprive yourself of the benefit of the\npatent license for this particular work, or (3) arrange, in a manner\nconsistent with the requirements of this License, to extend the patent\nlicense to downstream recipients.  \"Knowingly relying\" means you have\nactual knowledge that, but for the patent license, your conveying the\ncovered work in a country, or your recipient's use of the covered work\nin a country, would infringe one or more identifiable patents in that\ncountry that you have reason to believe are valid.\n\n  If, pursuant to or in connection with a single transaction or\narrangement, you convey, or propagate by procuring conveyance of, a\ncovered work, and grant a patent license to some of the parties\nreceiving the covered work authorizing them to use, propagate, modify\nor convey a specific copy of the covered work, then the patent license\nyou grant is automatically extended to all recipients of the covered\nwork and works based on it.\n\n  A patent license is \"discriminatory\" if it does not include within\nthe scope of its coverage, prohibits the exercise of, or is\nconditioned on the non-exercise of one or more of the rights that are\nspecifically granted under this License.  You may not convey a covered\nwork if you are a party to an arrangement with a third party that is\nin the business of distributing software, under which you make payment\nto the third party based on the extent of your activity of conveying\nthe work, and under which the third party grants, to any of the\nparties who would receive the covered work from you, a discriminatory\npatent license (a) in connection with copies of the covered work\nconveyed by you (or copies made from those copies), or (b) primarily\nfor and in connection with specific products or compilations that\ncontain the covered work, unless you entered into that arrangement,\nor that patent license was granted, prior to 28 March 2007.\n\n  Nothing in this License shall be construed as excluding or limiting\nany implied license or other defenses to infringement that may\notherwise be available to you under applicable patent law.\n\n  12. No Surrender of Others' Freedom.\n\n  If conditions are imposed on you (whether by court order, agreement or\notherwise) that contradict the conditions of this License, they do not\nexcuse you from the conditions of this License.  If you cannot convey a\ncovered work so as to satisfy simultaneously your obligations under this\nLicense and any other pertinent obligations, then as a consequence you may\nnot convey it at all.  For example, if you agree to terms that obligate you\nto collect a royalty for further conveying from those to whom you convey\nthe Program, the only way you could satisfy both those terms and this\nLicense would be to refrain entirely from conveying the Program.\n\n  13. Use with the GNU Affero General Public License.\n\n  Notwithstanding any other provision of this License, you have\npermission to link or combine any covered work with a work licensed\nunder version 3 of the GNU Affero General Public License into a single\ncombined work, and to convey the resulting work.  The terms of this\nLicense will continue to apply to the part which is the covered work,\nbut the special requirements of the GNU Affero General Public License,\nsection 13, concerning interaction through a network will apply to the\ncombination as such.\n\n  14. Revised Versions of this License.\n\n  The Free Software Foundation may publish revised and/or new versions of\nthe GNU General Public License from time to time.  Such new versions will\nbe similar in spirit to the present version, but may differ in detail to\naddress new problems or concerns.\n\n  Each version is given a distinguishing version number.  If the\nProgram specifies that a certain numbered version of the GNU General\nPublic License \"or any later version\" applies to it, you have the\noption of following the terms and conditions either of that numbered\nversion or of any later version published by the Free Software\nFoundation.  If the Program does not specify a version number of the\nGNU General Public License, you may choose any version ever published\nby the Free Software Foundation.\n\n  If the Program specifies that a proxy can decide which future\nversions of the GNU General Public License can be used, that proxy's\npublic statement of acceptance of a version permanently authorizes you\nto choose that version for the Program.\n\n  Later license versions may give you additional or different\npermissions.  However, no additional obligations are imposed on any\nauthor or copyright holder as a result of your choosing to follow a\nlater version.\n\n  15. Disclaimer of Warranty.\n\n  THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY\nAPPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT\nHOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM \"AS IS\" WITHOUT WARRANTY\nOF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,\nTHE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\nPURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM\nIS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF\nALL NECESSARY SERVICING, REPAIR OR CORRECTION.\n\n  16. Limitation of Liability.\n\n  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING\nWILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS\nTHE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY\nGENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE\nUSE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF\nDATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD\nPARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),\nEVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF\nSUCH DAMAGES.\n\n  17. Interpretation of Sections 15 and 16.\n\n  If the disclaimer of warranty and limitation of liability provided\nabove cannot be given local legal effect according to their terms,\nreviewing courts shall apply local law that most closely approximates\nan absolute waiver of all civil liability in connection with the\nProgram, unless a warranty or assumption of liability accompanies a\ncopy of the Program in return for a fee.\n\n                     END OF TERMS AND CONDITIONS\n\n            How to Apply These Terms to Your New Programs\n\n  If you develop a new program, and you want it to be of the greatest\npossible use to the public, the best way to achieve this is to make it\nfree software which everyone can redistribute and change under these terms.\n\n  To do so, attach the following notices to the program.  It is safest\nto attach them to the start of each source file to most effectively\nstate the exclusion of warranty; and each file should have at least\nthe \"copyright\" line and a pointer to where the full notice is found.\n\n    <one line to give the program's name and a brief idea of what it does.>\n    Copyright (C) <year>  <name of author>\n\n    This program is free software: you can redistribute it and/or modify\n    it under the terms of the GNU General Public License as published by\n    the Free Software Foundation, either version 3 of the License, or\n    (at your option) any later version.\n\n    This program is distributed in the hope that it will be useful,\n    but WITHOUT ANY WARRANTY; without even the implied warranty of\n    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n    GNU General Public License for more details.\n\n    You should have received a copy of the GNU General Public License\n    along with this program.  If not, see <https://www.gnu.org/licenses/>.\n\nAlso add information on how to contact you by electronic and paper mail.\n\n  If the program does terminal interaction, make it output a short\nnotice like this when it starts in an interactive mode:\n\n    <program>  Copyright (C) <year>  <name of author>\n    This program comes with ABSOLUTELY NO WARRANTY; for details type `show w'.\n    This is free software, and you are welcome to redistribute it\n    under certain conditions; type `show c' for details.\n\nThe hypothetical commands `show w' and `show c' should show the appropriate\nparts of the General Public License.  Of course, your program's commands\nmight be different; for a GUI interface, you would use an \"about box\".\n\n  You should also get your employer (if you work as a programmer) or school,\nif any, to sign a \"copyright disclaimer\" for the program, if necessary.\nFor more information on this, and how to apply and follow the GNU GPL, see\n<https://www.gnu.org/licenses/>.\n\n  The GNU General Public License does not permit incorporating your program\ninto proprietary programs.  If your program is a subroutine library, you\nmay consider it more useful to permit linking proprietary applications with\nthe library.  If this is what you want to do, use the GNU Lesser General\nPublic License instead of this License.  But first, please read\n<https://www.gnu.org/licenses/why-not-lgpl.html>."
  },
  {
    id: "AGPL-3.0",
    name: "GNU AGPLv3",
    url: "https://www.gnu.org/licenses/agpl-3.0",
    badgeUrl: "https://img.shields.io/badge/License-AGPL--3.0-blue.svg",
    generateText: () => "                    GNU AFFERO GENERAL PUBLIC LICENSE\n                       Version 3, 19 November 2007\n\n Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>\n Everyone is permitted to copy and distribute verbatim copies\n of this license document, but changing it is not allowed.\n\n                            Preamble\n\n  The GNU Affero General Public License is a free, copyleft license for\nsoftware and other kinds of works, specifically designed to ensure\ncooperation with the community in the case of network server software.\n\n  The licenses for most software and other practical works are designed\nto take away your freedom to share and change the works.  By contrast,\nour General Public Licenses are intended to guarantee your freedom to\nshare and change all versions of a program--to make sure it remains free\nsoftware for all its users.\n\n  When we speak of free software, we are referring to freedom, not\nprice.  Our General Public Licenses are designed to make sure that you\nhave the freedom to distribute copies of free software (and charge for\nthem if you wish), that you receive source code or can get it if you\nwant it, that you can change the software or use pieces of it in new\nfree programs, and that you know you can do these things.\n\n  Developers that use our General Public Licenses protect your rights\nwith two steps: (1) assert copyright on the software, and (2) offer\nyou this License which gives you legal permission to copy, distribute\nand/or modify the software.\n\n  A secondary benefit of defending all users' freedom is that\nimprovements made in alternate versions of the program, if they\nreceive widespread use, become available for other developers to\nincorporate.  Many developers of free software are heartened and\nencouraged by the resulting cooperation.  However, in the case of\nsoftware used on network servers, this result may fail to come about.\nThe GNU General Public License permits making a modified version and\nletting the public access it on a server without ever releasing its\nsource code to the public.\n\n  The GNU Affero General Public License is designed specifically to\nensure that, in such cases, the modified source code becomes available\nto the community.  It requires the operator of a network server to\nprovide the source code of the modified version running there to the\nusers of that server.  Therefore, public use of a modified version, on\na publicly accessible server, gives the public access to the source\ncode of the modified version.\n\n  An older license, called the Affero General Public License and\npublished by Affero, was designed to accomplish similar goals.  This is\na different license, not a version of the Affero GPL, but Affero has\nreleased a new version of the Affero GPL which permits relicensing under\nthis license.\n\n  The precise terms and conditions for copying, distribution and\nmodification follow.\n\n                       TERMS AND CONDITIONS\n\n  0. Definitions.\n\n  \"This License\" refers to version 3 of the GNU Affero General Public License.\n\n  \"Copyright\" also means copyright-like laws that apply to other kinds of\nworks, such as semiconductor masks.\n\n  \"The Program\" refers to any copyrightable work licensed under this\nLicense.  Each licensee is addressed as \"you\".  \"Licensees\" and\n\"recipients\" may be individuals or organizations.\n\n  To \"modify\" a work means to copy from or adapt all or part of the work\nin a fashion requiring copyright permission, other than the making of an\nexact copy.  The resulting work is called a \"modified version\" of the\nearlier work or a work \"based on\" the earlier work.\n\n  A \"covered work\" means either the unmodified Program or a work based\non the Program.\n\n  To \"propagate\" a work means to do anything with it that, without\npermission, would make you directly or secondarily liable for\ninfringement under applicable copyright law, except executing it on a\ncomputer or modifying a private copy.  Propagation includes copying,\ndistribution (with or without modification), making available to the\npublic, and in some countries other activities as well.\n\n  To \"convey\" a work means any kind of propagation that enables other\nparties to make or receive copies.  Mere interaction with a user through\na computer network, with no transfer of a copy, is not conveying.\n\n  An interactive user interface displays \"Appropriate Legal Notices\"\nto the extent that it includes a convenient and prominently visible\nfeature that (1) displays an appropriate copyright notice, and (2)\ntells the user that there is no warranty for the work (except to the\nextent that warranties are provided), that licensees may convey the\nwork under this License, and how to view a copy of this License.  If\nthe interface presents a list of user commands or options, such as a\nmenu, a prominent item in the list meets this criterion.\n\n  1. Source Code.\n\n  The \"source code\" for a work means the preferred form of the work\nfor making modifications to it.  \"Object code\" means any non-source\nform of a work.\n\n  A \"Standard Interface\" means an interface that either is an official\nstandard defined by a recognized standards body, or, in the case of\ninterfaces specified for a particular programming language, one that\nis widely used among developers working in that language.\n\n  The \"System Libraries\" of an executable work include anything, other\nthan the work as a whole, that (a) is included in the normal form of\npackaging a Major Component, but which is not part of that Major\nComponent, and (b) serves only to enable use of the work with that\nMajor Component, or to implement a Standard Interface for which an\nimplementation is available to the public in source code form.  A\n\"Major Component\", in this context, means a major essential component\n(kernel, window system, and so on) of the specific operating system\n(if any) on which the executable work runs, or a compiler used to\nproduce the work, or an object code interpreter used to run it.\n\n  The \"Corresponding Source\" for a work in object code form means all\nthe source code needed to generate, install, and (for an executable\nwork) run the object code and to modify the work, including scripts to\ncontrol those activities.  However, it does not include the work's\nSystem Libraries, or general-purpose tools or generally available free\nprograms which are used unmodified in performing those activities but\nwhich are not part of the work.  For example, Corresponding Source\nincludes interface definition files associated with source files for\nthe work, and the source code for shared libraries and dynamically\nlinked subprograms that the work is specifically designed to require,\nsuch as by intimate data communication or control flow between those\nsubprograms and other parts of the work.\n\n  The Corresponding Source need not include anything that users\ncan regenerate automatically from other parts of the Corresponding\nSource.\n\n  The Corresponding Source for a work in source code form is that\nsame work.\n\n  2. Basic Permissions.\n\n  All rights granted under this License are granted for the term of\ncopyright on the Program, and are irrevocable provided the stated\nconditions are met.  This License explicitly affirms your unlimited\npermission to run the unmodified Program.  The output from running a\ncovered work is covered by this License only if the output, given its\ncontent, constitutes a covered work.  This License acknowledges your\nrights of fair use or other equivalent, as provided by copyright law.\n\n  You may make, run and propagate covered works that you do not\nconvey, without conditions so long as your license otherwise remains\nin force.  You may convey covered works to others for the sole purpose\nof having them make modifications exclusively for you, or provide you\nwith facilities for running those works, provided that you comply with\nthe terms of this License in conveying all material for which you do\nnot control copyright.  Those thus making or running the covered works\nfor you must do so exclusively on your behalf, under your direction\nand control, on terms that prohibit them from making any copies of\nyour copyrighted material outside their relationship with you.\n\n  Conveying under any other circumstances is permitted solely under\nthe conditions stated below.  Sublicensing is not allowed; section 10\nmakes it unnecessary.\n\n  3. Protecting Users' Legal Rights From Anti-Circumvention Law.\n\n  No covered work shall be deemed part of an effective technological\nmeasure under any applicable law fulfilling obligations under article\n11 of the WIPO copyright treaty adopted on 20 December 1996, or\nsimilar laws prohibiting or restricting circumvention of such\nmeasures.\n\n  When you convey a covered work, you waive any legal power to forbid\ncircumvention of technological measures to the extent such circumvention\nis effected by exercising rights under this License with respect to\nthe covered work, and you disclaim any intention to limit operation or\nmodification of the work as a means of enforcing, against the work's\nusers, your or third parties' legal rights to forbid circumvention of\ntechnological measures.\n\n  4. Conveying Verbatim Copies.\n\n  You may convey verbatim copies of the Program's source code as you\nreceive it, in any medium, provided that you conspicuously and\nappropriately publish on each copy an appropriate copyright notice;\nkeep intact all notices stating that this License and any\nnon-permissive terms added in accord with section 7 apply to the code;\nkeep intact all notices of the absence of any warranty; and give all\nrecipients a copy of this License along with the Program.\n\n  You may charge any price or no price for each copy that you convey,\nand you may offer support or warranty protection for a fee.\n\n  5. Conveying Modified Source Versions.\n\n  You may convey a work based on the Program, or the modifications to\nproduce it from the Program, in the form of source code under the\nterms of section 4, provided that you also meet all of these conditions:\n\n    a) The work must carry prominent notices stating that you modified\n    it, and giving a relevant date.\n\n    b) The work must carry prominent notices stating that it is\n    released under this License and any conditions added under section\n    7.  This requirement modifies the requirement in section 4 to\n    \"keep intact all notices\".\n\n    c) You must license the entire work, as a whole, under this\n    License to anyone who comes into possession of a copy.  This\n    License will therefore apply, along with any applicable section 7\n    additional terms, to the whole of the work, and all its parts,\n    regardless of how they are packaged.  This License gives no\n    permission to license the work in any other way, but it does not\n    invalidate such permission if you have separately received it.\n\n    d) If the work has interactive user interfaces, each must display\n    Appropriate Legal Notices; however, if the Program has interactive\n    interfaces that do not display Appropriate Legal Notices, your\n    work need not make them do so.\n\n  A compilation of a covered work with other separate and independent\nworks, which are not by their nature extensions of the covered work,\nand which are not combined with it such as to form a larger program,\nin or on a volume of a storage or distribution medium, is called an\n\"aggregate\" if the compilation and its resulting copyright are not\nused to limit the access or legal rights of the compilation's users\nbeyond what the individual works permit.  Inclusion of a covered work\nin an aggregate does not cause this License to apply to the other\nparts of the aggregate.\n\n  6. Conveying Non-Source Forms.\n\n  You may convey a covered work in object code form under the terms\nof sections 4 and 5, provided that you also convey the\nmachine-readable Corresponding Source under the terms of this License,\nin one of these ways:\n\n    a) Convey the object code in, or embodied in, a physical product\n    (including a physical distribution medium), accompanied by the\n    Corresponding Source fixed on a durable physical medium\n    customarily used for software interchange.\n\n    b) Convey the object code in, or embodied in, a physical product\n    (including a physical distribution medium), accompanied by a\n    written offer, valid for at least three years and valid for as\n    long as you offer spare parts or customer support for that product\n    model, to give anyone who possesses the object code either (1) a\n    copy of the Corresponding Source for all the software in the\n    product that is covered by this License, on a durable physical\n    medium customarily used for software interchange, for a price no\n    more than your reasonable cost of physically performing this\n    conveying of source, or (2) access to copy the\n    Corresponding Source from a network server at no charge.\n\n    c) Convey individual copies of the object code with a copy of the\n    written offer to provide the Corresponding Source.  This\n    alternative is allowed only occasionally and noncommercially, and\n    only if you received the object code with such an offer, in accord\n    with subsection 6b.\n\n    d) Convey the object code by offering access from a designated\n    place (gratis or for a charge), and offer equivalent access to the\n    Corresponding Source in the same way through the same place at no\n    further charge.  You need not require recipients to copy the\n    Corresponding Source along with the object code.  If the place to\n    copy the object code is a network server, the Corresponding Source\n    may be on a different server (operated by you or a third party)\n    that supports equivalent copying facilities, provided you maintain\n    clear directions next to the object code saying where to find the\n    Corresponding Source.  Regardless of what server hosts the\n    Corresponding Source, you remain obligated to ensure that it is\n    available for as long as needed to satisfy these requirements.\n\n    e) Convey the object code using peer-to-peer transmission, provided\n    you inform other peers where the object code and Corresponding\n    Source of the work are being offered to the general public at no\n    charge under subsection 6d.\n\n  A separable portion of the object code, whose source code is excluded\nfrom the Corresponding Source as a System Library, need not be\nincluded in conveying the object code work.\n\n  A \"User Product\" is either (1) a \"consumer product\", which means any\ntangible personal property which is normally used for personal, family,\nor household purposes, or (2) anything designed or sold for incorporation\ninto a dwelling.  In determining whether a product is a consumer product,\ndoubtful cases shall be resolved in favor of coverage.  For a particular\nproduct received by a particular user, \"normally used\" refers to a\ntypical or common use of that class of product, regardless of the status\nof the particular user or of the way in which the particular user\nactually uses, or expects or is expected to use, the product.  A product\nis a consumer product regardless of whether the product has substantial\ncommercial, industrial or non-consumer uses, unless such uses represent\nthe only significant mode of use of the product.\n\n  \"Installation Information\" for a User Product means any methods,\nprocedures, authorization keys, or other information required to install\nand execute modified versions of a covered work in that User Product from\na modified version of its Corresponding Source.  The information must\nsuffice to ensure that the continued functioning of the modified object\ncode is in no case prevented or interfered with solely because\nmodification has been made.\n\n  If you convey an object code work under this section in, or with, or\nspecifically for use in, a User Product, and the conveying occurs as\npart of a transaction in which the right of possession and use of the\nUser Product is transferred to the recipient in perpetuity or for a\nfixed term (regardless of how the transaction is characterized), the\nCorresponding Source conveyed under this section must be accompanied\nby the Installation Information.  But this requirement does not apply\nif neither you nor any third party retains the ability to install\nmodified object code on the User Product (for example, the work has\nbeen installed in ROM).\n\n  The requirement to provide Installation Information does not include a\nrequirement to continue to provide support service, warranty, or updates\nfor a work that has been modified or installed by the recipient, or for\nthe User Product in which it has been modified or installed.  Access to a\nnetwork may be denied when the modification itself materially and\nadversely affects the operation of the network or violates the rules and\nprotocols for communication across the network.\n\n  Corresponding Source conveyed, and Installation Information provided,\nin accord with this section must be in a format that is publicly\ndocumented (and with an implementation available to the public in\nsource code form), and must require no special password or key for\nunpacking, reading or copying.\n\n  7. Additional Terms.\n\n  \"Additional permissions\" are terms that supplement the terms of this\nLicense by making exceptions from one or more of its conditions.\nAdditional permissions that are applicable to the entire Program shall\nbe treated as though they were included in this License, to the extent\nthat they are valid under applicable law.  If additional permissions\napply only to part of the Program, that part may be used separately\nunder those permissions, but the entire Program remains governed by\nthis License without regard to the additional permissions.\n\n  When you convey a copy of a covered work, you may at your option\nremove any additional permissions from that copy, or from any part of\nit.  (Additional permissions may be written to require their own\nremoval in certain cases when you modify the work.)  You may place\nadditional permissions on material, added by you to a covered work,\nfor which you have or can give appropriate copyright permission.\n\n  Notwithstanding any other provision of this License, for material you\nadd to a covered work, you may (if authorized by the copyright holders of\nthat material) supplement the terms of this License with terms:\n\n    a) Disclaiming warranty or limiting liability differently from the\n    terms of sections 15 and 16 of this License; or\n\n    b) Requiring preservation of specified reasonable legal notices or\n    author attributions in that material or in the Appropriate Legal\n    Notices displayed by works containing it; or\n\n    c) Prohibiting misrepresentation of the origin of that material, or\n    requiring that modified versions of such material be marked in\n    reasonable ways as different from the original version; or\n\n    d) Limiting the use for publicity purposes of names of licensors or\n    authors of the material; or\n\n    e) Declining to grant rights under trademark law for use of some\n    trade names, trademarks, or service marks; or\n\n    f) Requiring indemnification of licensors and authors of that\n    material by anyone who conveys the material (or modified versions of\n    it) with contractual assumptions of liability to the recipient, for\n    any liability that these contractual assumptions directly impose on\n    those licensors and authors.\n\n  All other non-permissive additional terms are considered \"further\nrestrictions\" within the meaning of section 10.  If the Program as you\nreceived it, or any part of it, contains a notice stating that it is\ngoverned by this License along with a term that is a further\nrestriction, you may remove that term.  If a license document contains\na further restriction but permits relicensing or conveying under this\nLicense, you may add to a covered work material governed by the terms\nof that license document, provided that the further restriction does\nnot survive such relicensing or conveying.\n\n  If you add terms to a covered work in accord with this section, you\nmust place, in the relevant source files, a statement of the\nadditional terms that apply to those files, or a notice indicating\nwhere to find the applicable terms.\n\n  Additional terms, permissive or non-permissive, may be stated in the\nform of a separately written license, or stated as exceptions;\nthe above requirements apply either way.\n\n  8. Termination.\n\n  You may not propagate or modify a covered work except as expressly\nprovided under this License.  Any attempt otherwise to propagate or\nmodify it is void, and will automatically terminate your rights under\nthis License (including any patent licenses granted under the third\nparagraph of section 11).\n\n  However, if you cease all violation of this License, then your\nlicense from a particular copyright holder is reinstated (a)\nprovisionally, unless and until the copyright holder explicitly and\nfinally terminates your license, and (b) permanently, if the copyright\nholder fails to notify you of the violation by some reasonable means\nprior to 60 days after the cessation.\n\n  Moreover, your license from a particular copyright holder is\nreinstated permanently if the copyright holder notifies you of the\nviolation by some reasonable means, this is the first time you have\nreceived notice of violation of this License (for any work) from that\ncopyright holder, and you cure the violation prior to 30 days after\nyour receipt of the notice.\n\n  Termination of your rights under this section does not terminate the\nlicenses of parties who have received copies or rights from you under\nthis License.  If your rights have been terminated and not permanently\nreinstated, you do not qualify to receive new licenses for the same\nmaterial under section 10.\n\n  9. Acceptance Not Required for Having Copies.\n\n  You are not required to accept this License in order to receive or\nrun a copy of the Program.  Ancillary propagation of a covered work\noccurring solely as a consequence of using peer-to-peer transmission\nto receive a copy likewise does not require acceptance.  However,\nnothing other than this License grants you permission to propagate or\nmodify any covered work.  These actions infringe copyright if you do\nnot accept this License.  Therefore, by modifying or propagating a\ncovered work, you indicate your acceptance of this License to do so.\n\n  10. Automatic Licensing of Downstream Recipients.\n\n  Each time you convey a covered work, the recipient automatically\nreceives a license from the original licensors, to run, modify and\npropagate that work, subject to this License.  You are not responsible\nfor enforcing compliance by third parties with this License.\n\n  An \"entity transaction\" is a transaction transferring control of an\norganization, or substantially all assets of one, or subdividing an\norganization, or merging organizations.  If propagation of a covered\nwork results from an entity transaction, each party to that\ntransaction who receives a copy of the work also receives whatever\nlicenses to the work the party's predecessor in interest had or could\ngive under the previous paragraph, plus a right to possession of the\nCorresponding Source of the work from the predecessor in interest, if\nthe predecessor has it or can get it with reasonable efforts.\n\n  You may not impose any further restrictions on the exercise of the\nrights granted or affirmed under this License.  For example, you may\nnot impose a license fee, royalty, or other charge for exercise of\nrights granted under this License, and you may not initiate litigation\n(including a cross-claim or counterclaim in a lawsuit) alleging that\nany patent claim is infringed by making, using, selling, offering for\nsale, or importing the Program or any portion of it.\n\n  11. Patents.\n\n  A \"contributor\" is a copyright holder who authorizes use under this\nLicense of the Program or a work on which the Program is based.  The\nwork thus licensed is called the contributor's \"contributor version\".\n\n  A contributor's \"essential patent claims\" are all patent claims\nowned or controlled by the contributor, whether already acquired or\nhereafter acquired, that would be infringed by some manner, permitted\nby this License, of making, using, or selling its contributor version,\nbut do not include claims that would be infringed only as a\nconsequence of further modification of the contributor version.  For\npurposes of this definition, \"control\" includes the right to grant\npatent sublicenses in a manner consistent with the requirements of\nthis License.\n\n  Each contributor grants you a non-exclusive, worldwide, royalty-free\npatent license under the contributor's essential patent claims, to\nmake, use, sell, offer for sale, import and otherwise run, modify and\npropagate the contents of its contributor version.\n\n  In the following three paragraphs, a \"patent license\" is any express\nagreement or commitment, however denominated, not to enforce a patent\n(such as an express permission to practice a patent or covenant not to\nsue for patent infringement).  To \"grant\" such a patent license to a\nparty means to make such an agreement or commitment not to enforce a\npatent against the party.\n\n  If you convey a covered work, knowingly relying on a patent license,\nand the Corresponding Source of the work is not available for anyone\nto copy, free of charge and under the terms of this License, through a\npublicly available network server or other readily accessible means,\nthen you must either (1) cause the Corresponding Source to be so\navailable, or (2) arrange to deprive yourself of the benefit of the\npatent license for this particular work, or (3) arrange, in a manner\nconsistent with the requirements of this License, to extend the patent\nlicense to downstream recipients.  \"Knowingly relying\" means you have\nactual knowledge that, but for the patent license, your conveying the\ncovered work in a country, or your recipient's use of the covered work\nin a country, would infringe one or more identifiable patents in that\ncountry that you have reason to believe are valid.\n\n  If, pursuant to or in connection with a single transaction or\narrangement, you convey, or propagate by procuring conveyance of, a\ncovered work, and grant a patent license to some of the parties\nreceiving the covered work authorizing them to use, propagate, modify\nor convey a specific copy of the covered work, then the patent license\nyou grant is automatically extended to all recipients of the covered\nwork and works based on it.\n\n  A patent license is \"discriminatory\" if it does not include within\nthe scope of its coverage, prohibits the exercise of, or is\nconditioned on the non-exercise of one or more of the rights that are\nspecifically granted under this License.  You may not convey a covered\nwork if you are a party to an arrangement with a third party that is\nin the business of distributing software, under which you make payment\nto the third party based on the extent of your activity of conveying\nthe work, and under which the third party grants, to any of the\nparties who would receive the covered work from you, a discriminatory\npatent license (a) in connection with copies of the covered work\nconveyed by you (or copies made from those copies), or (b) primarily\nfor and in connection with specific products or compilations that\ncontain the covered work, unless you entered into that arrangement,\nor that patent license was granted, prior to 28 March 2007.\n\n  Nothing in this License shall be construed as excluding or limiting\nany implied license or other defenses to infringement that may\notherwise be available to you under applicable patent law.\n\n  12. No Surrender of Others' Freedom.\n\n  If conditions are imposed on you (whether by court order, agreement or\notherwise) that contradict the conditions of this License, they do not\nexcuse you from the conditions of this License.  If you cannot convey a\ncovered work so as to satisfy simultaneously your obligations under this\nLicense and any other pertinent obligations, then as a consequence you may\nnot convey it at all.  For example, if you agree to terms that obligate you\nto collect a royalty for further conveying from those to whom you convey\nthe Program, the only way you could satisfy both those terms and this\nLicense would be to refrain entirely from conveying the Program.\n\n  13. Remote Network Interaction; Use with the GNU General Public License.\n\n  Notwithstanding any other provision of this License, if you modify the\nProgram, your modified version must prominently offer all users\ninteracting with it remotely through a computer network (if your version\nsupports such interaction) an opportunity to receive the Corresponding\nSource of your version by providing access to the Corresponding Source\nfrom a network server at no charge, through some standard or customary\nmeans of facilitating copying of software.  This Corresponding Source\nshall include the Corresponding Source for any work covered by version 3\nof the GNU General Public License that is incorporated pursuant to the\nfollowing paragraph.\n\n  Notwithstanding any other provision of this License, you have\npermission to link or combine any covered work with a work licensed\nunder version 3 of the GNU General Public License into a single\ncombined work, and to convey the resulting work.  The terms of this\nLicense will continue to apply to the part which is the covered work,\nbut the work with which it is combined will remain governed by version\n3 of the GNU General Public License.\n\n  14. Revised Versions of this License.\n\n  The Free Software Foundation may publish revised and/or new versions of\nthe GNU Affero General Public License from time to time.  Such new versions\nwill be similar in spirit to the present version, but may differ in detail to\naddress new problems or concerns.\n\n  Each version is given a distinguishing version number.  If the\nProgram specifies that a certain numbered version of the GNU Affero General\nPublic License \"or any later version\" applies to it, you have the\noption of following the terms and conditions either of that numbered\nversion or of any later version published by the Free Software\nFoundation.  If the Program does not specify a version number of the\nGNU Affero General Public License, you may choose any version ever published\nby the Free Software Foundation.\n\n  If the Program specifies that a proxy can decide which future\nversions of the GNU Affero General Public License can be used, that proxy's\npublic statement of acceptance of a version permanently authorizes you\nto choose that version for the Program.\n\n  Later license versions may give you additional or different\npermissions.  However, no additional obligations are imposed on any\nauthor or copyright holder as a result of your choosing to follow a\nlater version.\n\n  15. Disclaimer of Warranty.\n\n  THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY\nAPPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT\nHOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM \"AS IS\" WITHOUT WARRANTY\nOF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,\nTHE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\nPURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM\nIS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF\nALL NECESSARY SERVICING, REPAIR OR CORRECTION.\n\n  16. Limitation of Liability.\n\n  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING\nWILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS\nTHE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY\nGENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE\nUSE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF\nDATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD\nPARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),\nEVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF\nSUCH DAMAGES.\n\n  17. Interpretation of Sections 15 and 16.\n\n  If the disclaimer of warranty and limitation of liability provided\nabove cannot be given local legal effect according to their terms,\nreviewing courts shall apply local law that most closely approximates\nan absolute waiver of all civil liability in connection with the\nProgram, unless a warranty or assumption of liability accompanies a\ncopy of the Program in return for a fee.\n\n                     END OF TERMS AND CONDITIONS\n\n            How to Apply These Terms to Your New Programs\n\n  If you develop a new program, and you want it to be of the greatest\npossible use to the public, the best way to achieve this is to make it\nfree software which everyone can redistribute and change under these terms.\n\n  To do so, attach the following notices to the program.  It is safest\nto attach them to the start of each source file to most effectively\nstate the exclusion of warranty; and each file should have at least\nthe \"copyright\" line and a pointer to where the full notice is found.\n\n    <one line to give the program's name and a brief idea of what it does.>\n    Copyright (C) <year>  <name of author>\n\n    This program is free software: you can redistribute it and/or modify\n    it under the terms of the GNU Affero General Public License as published\n    by the Free Software Foundation, either version 3 of the License, or\n    (at your option) any later version.\n\n    This program is distributed in the hope that it will be useful,\n    but WITHOUT ANY WARRANTY; without even the implied warranty of\n    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n    GNU Affero General Public License for more details.\n\n    You should have received a copy of the GNU Affero General Public License\n    along with this program.  If not, see <https://www.gnu.org/licenses/>.\n\nAlso add information on how to contact you by electronic and paper mail.\n\n  If your software can interact with users remotely through a computer\nnetwork, you should also make sure that it provides a way for users to\nget its source.  For example, if your program is a web application, its\ninterface could display a \"Source\" link that leads users to an archive\nof the code.  There are many ways you could offer source, and different\nsolutions will be better for different programs; see section 13 for the\nspecific requirements.\n\n  You should also get your employer (if you work as a programmer) or school,\nif any, to sign a \"copyright disclaimer\" for the program, if necessary.\nFor more information on this, and how to apply and follow the GNU AGPL, see\n<https://www.gnu.org/licenses/>."
  },
  {
    id: "MPL-2.0",
    name: "Mozilla Public License 2.0",
    url: "https://www.mozilla.org/MPL/2.0/",
    badgeUrl: "https://img.shields.io/badge/License-MPL--2.0-brightgreen.svg",
    generateText: () => "Mozilla Public License Version 2.0\n==================================\n\n1. Definitions\n--------------\n\n1.1. \"Contributor\"\n    means each individual or legal entity that creates, contributes to\n    the creation of, or owns Covered Software.\n\n1.2. \"Contributor Version\"\n    means the combination of the Contributions of others (if any) used\n    by a Contributor and that particular Contributor's Contribution.\n\n1.3. \"Contribution\"\n    means Covered Software of a particular Contributor.\n\n1.4. \"Covered Software\"\n    means Source Code Form to which the initial Contributor has attached\n    the notice in Exhibit A, the Executable Form of such Source Code\n    Form, and Modifications of such Source Code Form, in each case\n    including portions thereof.\n\n1.5. \"Incompatible With Secondary Licenses\"\n    means\n\n    (a) that the initial Contributor has attached the notice described\n        in Exhibit B to the Covered Software; or\n\n    (b) that the Covered Software was made available under the terms of\n        version 1.1 or earlier of the License, but not also under the\n        terms of a Secondary License.\n\n1.6. \"Executable Form\"\n    means any form of the work other than Source Code Form.\n\n1.7. \"Larger Work\"\n    means a work that combines Covered Software with other material, in\n    a separate file or files, that is not Covered Software.\n\n1.8. \"License\"\n    means this document.\n\n1.9. \"Licensable\"\n    means having the right to grant, to the maximum extent possible,\n    whether at the time of the initial grant or subsequently, any and\n    all of the rights conveyed by this License.\n\n1.10. \"Modifications\"\n    means any of the following:\n\n    (a) any file in Source Code Form that results from an addition to,\n        deletion from, or modification of the contents of Covered\n        Software; or\n\n    (b) any new file in Source Code Form that contains any Covered\n        Software.\n\n1.11. \"Patent Claims\" of a Contributor\n    means any patent claim(s), including without limitation, method,\n    process, and apparatus claims, in any patent Licensable by such\n    Contributor that would be infringed, but for the grant of the\n    License, by the making, using, selling, offering for sale, having\n    made, import, or transfer of either its Contributions or its\n    Contributor Version.\n\n1.12. \"Secondary License\"\n    means either the GNU General Public License, Version 2.0, the GNU\n    Lesser General Public License, Version 2.1, the GNU Affero General\n    Public License, Version 3.0, or any later versions of those\n    licenses.\n\n1.13. \"Source Code Form\"\n    means the form of the work preferred for making modifications.\n\n1.14. \"You\" (or \"Your\")\n    means an individual or a legal entity exercising rights under this\n    License. For legal entities, \"You\" includes any entity that\n    controls, is controlled by, or is under common control with You. For\n    purposes of this definition, \"control\" means (a) the power, direct\n    or indirect, to cause the direction or management of such entity,\n    whether by contract or otherwise, or (b) ownership of more than\n    fifty percent (50%) of the outstanding shares or beneficial\n    ownership of such entity.\n\n2. License Grants and Conditions\n--------------------------------\n\n2.1. Grants\n\nEach Contributor hereby grants You a world-wide, royalty-free,\nnon-exclusive license:\n\n(a) under intellectual property rights (other than patent or trademark)\n    Licensable by such Contributor to use, reproduce, make available,\n    modify, display, perform, distribute, and otherwise exploit its\n    Contributions, either on an unmodified basis, with Modifications, or\n    as part of a Larger Work; and\n\n(b) under Patent Claims of such Contributor to make, use, sell, offer\n    for sale, have made, import, and otherwise transfer either its\n    Contributions or its Contributor Version.\n\n2.2. Effective Date\n\nThe licenses granted in Section 2.1 with respect to any Contribution\nbecome effective for each Contribution on the date the Contributor first\ndistributes such Contribution.\n\n2.3. Limitations on Grant Scope\n\nThe licenses granted in this Section 2 are the only rights granted under\nthis License. No additional rights or licenses will be implied from the\ndistribution or licensing of Covered Software under this License.\nNotwithstanding Section 2.1(b) above, no patent license is granted by a\nContributor:\n\n(a) for any code that a Contributor has removed from Covered Software;\n    or\n\n(b) for infringements caused by: (i) Your and any other third party's\n    modifications of Covered Software, or (ii) the combination of its\n    Contributions with other software (except as part of its Contributor\n    Version); or\n\n(c) under Patent Claims infringed by Covered Software in the absence of\n    its Contributions.\n\nThis License does not grant any rights in the trademarks, service marks,\nor logos of any Contributor (except as may be necessary to comply with\nthe notice requirements in Section 3.4).\n\n2.4. Subsequent Licenses\n\nNo Contributor makes additional grants as a result of Your choice to\ndistribute the Covered Software under a subsequent version of this\nLicense (see Section 10.2) or under the terms of a Secondary License (if\npermitted under the terms of Section 3.3).\n\n2.5. Representation\n\nEach Contributor represents that the Contributor believes its\nContributions are its original creation(s) or it has sufficient rights\nto grant the rights to its Contributions conveyed by this License.\n\n2.6. Fair Use\n\nThis License is not intended to limit any rights You have under\napplicable copyright doctrines of fair use, fair dealing, or other\nequivalents.\n\n2.7. Conditions\n\nSections 3.1, 3.2, 3.3, and 3.4 are conditions of the licenses granted\nin Section 2.1.\n\n3. Responsibilities\n-------------------\n\n3.1. Distribution of Source Form\n\nAll distribution of Covered Software in Source Code Form, including any\nModifications that You create or to which You contribute, must be under\nthe terms of this License. You must inform recipients that the Source\nCode Form of the Covered Software is governed by the terms of this\nLicense, and how they can obtain a copy of this License. You may not\nattempt to alter or restrict the recipients' rights in the Source Code\nForm.\n\n3.2. Distribution of Executable Form\n\nIf You distribute Covered Software in Executable Form then:\n\n(a) such Covered Software must also be made available in Source Code\n    Form, as described in Section 3.1, and You must inform recipients of\n    the Executable Form how they can obtain a copy of such Source Code\n    Form by reasonable means in a timely manner, at a charge no more\n    than the cost of distribution to the recipient; and\n\n(b) You may distribute such Executable Form under the terms of this\n    License, or sublicense it under different terms, provided that the\n    license for the Executable Form does not attempt to limit or alter\n    the recipients' rights in the Source Code Form under this License.\n\n3.3. Distribution of a Larger Work\n\nYou may create and distribute a Larger Work under terms of Your choice,\nprovided that You also comply with the requirements of this License for\nthe Covered Software. If the Larger Work is a combination of Covered\nSoftware with a work governed by one or more Secondary Licenses, and the\nCovered Software is not Incompatible With Secondary Licenses, this\nLicense permits You to additionally distribute such Covered Software\nunder the terms of such Secondary License(s), so that the recipient of\nthe Larger Work may, at their option, further distribute the Covered\nSoftware under the terms of either this License or such Secondary\nLicense(s).\n\n3.4. Notices\n\nYou may not remove or alter the substance of any license notices\n(including copyright notices, patent notices, disclaimers of warranty,\nor limitations of liability) contained within the Source Code Form of\nthe Covered Software, except that You may alter any license notices to\nthe extent required to remedy known factual inaccuracies.\n\n3.5. Application of Additional Terms\n\nYou may choose to offer, and to charge a fee for, warranty, support,\nindemnity or liability obligations to one or more recipients of Covered\nSoftware. However, You may do so only on Your own behalf, and not on\nbehalf of any Contributor. You must make it absolutely clear that any\nsuch warranty, support, indemnity, or liability obligation is offered by\nYou alone, and You hereby agree to indemnify every Contributor for any\nliability incurred by such Contributor as a result of warranty, support,\nindemnity or liability terms You offer. You may include additional\ndisclaimers of warranty and limitations of liability specific to any\njurisdiction.\n\n4. Inability to Comply Due to Statute or Regulation\n---------------------------------------------------\n\nIf it is impossible for You to comply with any of the terms of this\nLicense with respect to some or all of the Covered Software due to\nstatute, judicial order, or regulation then You must: (a) comply with\nthe terms of this License to the maximum extent possible; and (b)\ndescribe the limitations and the code they affect. Such description must\nbe placed in a text file included with all distributions of the Covered\nSoftware under this License. Except to the extent prohibited by statute\nor regulation, such description must be sufficiently detailed for a\nrecipient of ordinary skill to be able to understand it.\n\n5. Termination\n--------------\n\n5.1. The rights granted under this License will terminate automatically\nif You fail to comply with any of its terms. However, if You become\ncompliant, then the rights granted under this License from a particular\nContributor are reinstated (a) provisionally, unless and until such\nContributor explicitly and finally terminates Your grants, and (b) on an\nongoing basis, if such Contributor fails to notify You of the\nnon-compliance by some reasonable means prior to 60 days after You have\ncome back into compliance. Moreover, Your grants from a particular\nContributor are reinstated on an ongoing basis if such Contributor\nnotifies You of the non-compliance by some reasonable means, this is the\nfirst time You have received notice of non-compliance with this License\nfrom such Contributor, and You become compliant prior to 30 days after\nYour receipt of the notice.\n\n5.2. If You initiate litigation against any entity by asserting a patent\ninfringement claim (excluding declaratory judgment actions,\ncounter-claims, and cross-claims) alleging that a Contributor Version\ndirectly or indirectly infringes any patent, then the rights granted to\nYou by any and all Contributors for the Covered Software under Section\n2.1 of this License shall terminate.\n\n5.3. In the event of termination under Sections 5.1 or 5.2 above, all\nend user license agreements (excluding distributors and resellers) which\nhave been validly granted by You or Your distributors under this License\nprior to termination shall survive termination.\n\n************************************************************************\n*                                                                      *\n*  6. Disclaimer of Warranty                                           *\n*  -------------------------                                           *\n*                                                                      *\n*  Covered Software is provided under this License on an \"as is\"       *\n*  basis, without warranty of any kind, either expressed, implied, or  *\n*  statutory, including, without limitation, warranties that the       *\n*  Covered Software is free of defects, merchantable, fit for a        *\n*  particular purpose or non-infringing. The entire risk as to the     *\n*  quality and performance of the Covered Software is with You.        *\n*  Should any Covered Software prove defective in any respect, You     *\n*  (not any Contributor) assume the cost of any necessary servicing,   *\n*  repair, or correction. This disclaimer of warranty constitutes an   *\n*  essential part of this License. No use of any Covered Software is   *\n*  authorized under this License except under this disclaimer.         *\n*                                                                      *\n************************************************************************\n\n************************************************************************\n*                                                                      *\n*  7. Limitation of Liability                                          *\n*  --------------------------                                          *\n*                                                                      *\n*  Under no circumstances and under no legal theory, whether tort      *\n*  (including negligence), contract, or otherwise, shall any           *\n*  Contributor, or anyone who distributes Covered Software as          *\n*  permitted above, be liable to You for any direct, indirect,         *\n*  special, incidental, or consequential damages of any character      *\n*  including, without limitation, damages for lost profits, loss of    *\n*  goodwill, work stoppage, computer failure or malfunction, or any    *\n*  and all other commercial damages or losses, even if such party      *\n*  shall have been informed of the possibility of such damages. This   *\n*  limitation of liability shall not apply to liability for death or   *\n*  personal injury resulting from such party's negligence to the       *\n*  extent applicable law prohibits such limitation. Some               *\n*  jurisdictions do not allow the exclusion or limitation of           *\n*  incidental or consequential damages, so this exclusion and          *\n*  limitation may not apply to You.                                    *\n*                                                                      *\n************************************************************************\n\n8. Litigation\n-------------\n\nAny litigation relating to this License may be brought only in the\ncourts of a jurisdiction where the defendant maintains its principal\nplace of business and such litigation shall be governed by laws of that\njurisdiction, without reference to its conflict-of-law provisions.\nNothing in this Section shall prevent a party's ability to bring\ncross-claims or counter-claims.\n\n9. Miscellaneous\n----------------\n\nThis License represents the complete agreement concerning the subject\nmatter hereof. If any provision of this License is held to be\nunenforceable, such provision shall be reformed only to the extent\nnecessary to make it enforceable. Any law or regulation which provides\nthat the language of a contract shall be construed against the drafter\nshall not be used to construe this License against a Contributor.\n\n10. Versions of the License\n---------------------------\n\n10.1. New Versions\n\nMozilla Foundation is the license steward. Except as provided in Section\n10.3, no one other than the license steward has the right to modify or\npublish new versions of this License. Each version will be given a\ndistinguishing version number.\n\n10.2. Effect of New Versions\n\nYou may distribute the Covered Software under the terms of the version\nof the License under which You originally received the Covered Software,\nor under the terms of any subsequent version published by the license\nsteward.\n\n10.3. Modified Versions\n\nIf you create software not governed by this License, and you want to\ncreate a new license for such software, you may create and use a\nmodified version of this License if you rename the license and remove\nany references to the name of the license steward (except to note that\nsuch modified license differs from this License).\n\n10.4. Distributing Source Code Form that is Incompatible With Secondary\nLicenses\n\nIf You choose to distribute Source Code Form that is Incompatible With\nSecondary Licenses under the terms of this version of the License, the\nnotice described in Exhibit B of this License must be attached.\n\nExhibit A - Source Code Form License Notice\n-------------------------------------------\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at https://mozilla.org/MPL/2.0/.\n\nIf it is not possible or desirable to put the notice in a particular\nfile, then You may include the notice in a location (such as a LICENSE\nfile in a relevant directory) where a recipient would be likely to look\nfor such a notice.\n\nYou may add additional accurate notices of copyright ownership.\n\nExhibit B - \"Incompatible With Secondary Licenses\" Notice\n---------------------------------------------------------\n\n  This Source Code Form is \"Incompatible With Secondary Licenses\", as\n  defined by the Mozilla Public License, v. 2.0."
  },
  {
    id: "BSD-3-Clause",
    name: "BSD 3-Clause License",
    url: "https://opensource.org/license/bsd-3-clause",
    badgeUrl: "https://img.shields.io/badge/License-BSD--3--Clause-blue.svg",
    generateText: (year, holder) => "BSD 3-Clause License\n\nCopyright (c) [year], [fullname]\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are met:\n\n1. Redistributions of source code must retain the above copyright notice, this\n   list of conditions and the following disclaimer.\n\n2. Redistributions in binary form must reproduce the above copyright notice,\n   this list of conditions and the following disclaimer in the documentation\n   and/or other materials provided with the distribution.\n\n3. Neither the name of the copyright holder nor the names of its\n   contributors may be used to endorse or promote products derived from\n   this software without specific prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS IS\"\nAND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\nIMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE\nDISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE\nFOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL\nDAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR\nSERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER\nCAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,\nOR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.".split('[year]').join(year).split('[fullname]').join(holder)
  },
  {
    id: "BSD-2-Clause",
    name: "BSD 2-Clause License",
    url: "https://opensource.org/license/bsd-2-clause",
    badgeUrl: "https://img.shields.io/badge/License-BSD--2--Clause-blue.svg",
    generateText: (year, holder) => "BSD 2-Clause License\n\nCopyright (c) [year], [fullname]\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are met:\n\n1. Redistributions of source code must retain the above copyright notice, this\n   list of conditions and the following disclaimer.\n\n2. Redistributions in binary form must reproduce the above copyright notice,\n   this list of conditions and the following disclaimer in the documentation\n   and/or other materials provided with the distribution.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS IS\"\nAND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE\nIMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE\nDISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE\nFOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL\nDAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR\nSERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER\nCAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,\nOR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.".split('[year]').join(year).split('[fullname]').join(holder)
  },
  {
    id: "ISC",
    name: "ISC License",
    url: "https://opensource.org/license/isc-license-txt",
    badgeUrl: "https://img.shields.io/badge/License-ISC-blue.svg",
    generateText: (year, holder) => "ISC License\n\nCopyright (c) [year] [fullname]\n\nPermission to use, copy, modify, and/or distribute this software for any\npurpose with or without fee is hereby granted, provided that the above\ncopyright notice and this permission notice appear in all copies.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH\nREGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY\nAND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,\nINDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM\nLOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR\nOTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR\nPERFORMANCE OF THIS SOFTWARE.".split('[year]').join(year).split('[fullname]').join(holder)
  },
  {
    id: "Unlicense",
    name: "The Unlicense",
    url: "https://unlicense.org/",
    badgeUrl: "https://img.shields.io/badge/License-Unlicense-informational.svg",
    generateText: () => "This is free and unencumbered software released into the public domain.\n\nAnyone is free to copy, modify, publish, use, compile, sell, or\ndistribute this software, either in source code form or as a compiled\nbinary, for any purpose, commercial or non-commercial, and by any\nmeans.\n\nIn jurisdictions that recognize copyright laws, the author or authors\nof this software dedicate any and all copyright interest in the\nsoftware to the public domain. We make this dedication for the benefit\nof the public at large and to the detriment of our heirs and\nsuccessors. We intend this dedication to be an overt act of\nrelinquishment in perpetuity of all present and future rights to this\nsoftware under copyright law.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,\nEXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\nMERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.\nIN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR\nOTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,\nARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR\nOTHER DEALINGS IN THE SOFTWARE.\n\nFor more information, please refer to <https://unlicense.org>"
  },
];
function getLicenseById(id) {
  if (!id) return LICENSE_CATALOG[0];
  const norm = String(id).toLowerCase().replace(/[^a-z0-9]/g, '');
  return LICENSE_CATALOG.find(l => l.id.toLowerCase().replace(/[^a-z0-9]/g, '') === norm) || LICENSE_CATALOG[0];
}

/* ==================== MODULE: data/templates.js ==================== */

function sec(type, dataOverrides, titleOverride) {
  const s = createSection(type, titleOverride);
  s.data = { ...s.data, ...dataOverrides };
  return s;
}
const TEMPLATES = [
  {
    id: 'web-app',
    name: 'Web App / SaaS',
    description: 'Full-stack web application with tech stack, install steps, and env vars.',
    sections: [
      sec(SECTION_TYPES.HERO, { projectName: 'My Web App', tagline: 'A modern full-stack web application.' }),
      sec(SECTION_TYPES.BADGES, {}),
      sec(SECTION_TYPES.TOC, {}),
      sec(SECTION_TYPES.ABOUT, { content: 'Describe the problem your app solves and who it is for.' }),
      sec(SECTION_TYPES.TECH_STACK, { technologies: ['typescript', 'react', 'nodejs', 'postgresql', 'docker'] }),
      sec(SECTION_TYPES.FEATURES, {}),
      sec(SECTION_TYPES.INSTALLATION, {}),
      sec(SECTION_TYPES.ENV_VARS, {}),
      sec(SECTION_TYPES.CONTRIBUTING, {}),
      sec(SECTION_TYPES.LICENSE, {})
    ]
  },
  {
    id: 'npm-library',
    name: 'npm / JS Library',
    description: 'A published package with an install command, usage example, and API reference.',
    sections: [
      sec(SECTION_TYPES.HERO, { projectName: 'my-package', tagline: 'A useful JavaScript/TypeScript package.' }),
      sec(SECTION_TYPES.BADGES, { showNpmVersion: true, showNpmDownloads: true }),
      sec(SECTION_TYPES.ABOUT, {}),
      sec(SECTION_TYPES.INSTALLATION, { steps: [{ title: 'Install via npm', cmd: 'npm install my-package' }] }),
      sec(SECTION_TYPES.USAGE, { codeLang: 'javascript', code: "import { thing } from 'my-package';\n\nthing();" }),
      sec(SECTION_TYPES.API_REFERENCE, {}),
      sec(SECTION_TYPES.CONTRIBUTING, {}),
      sec(SECTION_TYPES.LICENSE, {})
    ]
  },
  {
    id: 'cli-tool',
    name: 'CLI Tool',
    description: 'A command-line tool with install and usage instructions.',
    sections: [
      sec(SECTION_TYPES.HERO, { projectName: 'my-cli', tagline: 'A handy command-line tool.' }),
      sec(SECTION_TYPES.BADGES, { showNpmVersion: true }),
      sec(SECTION_TYPES.ABOUT, {}),
      sec(SECTION_TYPES.INSTALLATION, { steps: [{ title: 'Install globally', cmd: 'npm install -g my-cli' }] }),
      sec(SECTION_TYPES.USAGE, { codeLang: 'bash', code: 'my-cli --help' }),
      sec(SECTION_TYPES.FAQ, {}),
      sec(SECTION_TYPES.LICENSE, {})
    ]
  },
  {
    id: 'data-project',
    name: 'Data / ML Project',
    description: 'A Python-based data science or machine learning project.',
    sections: [
      sec(SECTION_TYPES.HERO, { projectName: 'My ML Project', tagline: 'A machine learning project.' }),
      sec(SECTION_TYPES.BADGES, {}),
      sec(SECTION_TYPES.ABOUT, {}),
      sec(SECTION_TYPES.TECH_STACK, { technologies: ['python', 'docker'] }),
      sec(SECTION_TYPES.MERMAID, { diagram: 'graph LR\n  A[Raw Data] --> B[Preprocessing]\n  B --> C[Model Training]\n  C --> D[Evaluation]' }),
      sec(SECTION_TYPES.INSTALLATION, { steps: [
        { title: 'Clone the repository', cmd: 'git clone https://github.com/username/my-project.git\ncd my-project' },
        { title: 'Install dependencies', cmd: 'pip install -r requirements.txt' }
      ] }),
      sec(SECTION_TYPES.USAGE, { codeLang: 'bash', code: 'python train.py' }),
      sec(SECTION_TYPES.LICENSE, {})
    ]
  },
  {
    id: 'personal-profile',
    name: 'GitHub Profile README',
    description: 'A personal profile README with stats and social links.',
    sections: [
      sec(SECTION_TYPES.HERO, { projectName: "Hi, I'm Your Name", tagline: 'Software developer building things on the web.' }),
      sec(SECTION_TYPES.ABOUT, { heading: 'About Me', content: "I'm a developer interested in..." }),
      sec(SECTION_TYPES.TECH_STACK, { technologies: ['javascript', 'typescript', 'react', 'python', 'git'] }),
      sec(SECTION_TYPES.STATS, { showTopLangs: true, showStreak: true }),
      sec(SECTION_TYPES.AUTHOR, { heading: 'Connect With Me' })
    ]
  }
];
function getTemplateById(id) {
  return TEMPLATES.find(t => t.id === id) || null;
}

/* ==================== MODULE: services/githubApi.js ==================== */

const CACHE_PREFIX = 'readmify_scan_';
const CACHE_TTL_MS = 30 * 60 * 1000;
function parseGitHubRepoInput(input) {
  if (!input) return null;
  const trimmed = input.trim().replace(/\.git$/, '').replace(/\/$/, '');
  const urlMatch = trimmed.match(/github\.com\/([^/\s]+)\/([^/\s]+)/i);
  if (urlMatch) return { owner: urlMatch[1], repo: urlMatch[2] };
  const shortMatch = trimmed.match(/^([\w.-]+)\/([\w.-]+)$/);
  if (shortMatch) return { owner: shortMatch[1], repo: shortMatch[2] };
  return null;
}

function readCache(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL_MS) return null;
    return data;
  } catch (e) {
    return null;
  }
}

function writeCache(key, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ ts: Date.now(), data }));
  } catch (e) { /* storage full or unavailable — non-fatal */ }
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${url}`);
  return res.json();
}

async function fetchRawFile(owner, repo, branch, path) {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`);
    if (!res.ok) return null;
    return await res.text();
  } catch (e) {
    return null;
  }
}
async function fetchGitHubRepoFullDetails(owner, repo, onProgress) {
  const cacheKey = `${owner}/${repo}`.toLowerCase();
  const cached = readCache(cacheKey);
  if (cached) return cached;

  const report = (msg) => { if (typeof onProgress === 'function') onProgress({ message: msg }); };

  report('Fetching repo metadata...');
  const repoInfo = await fetchJson(`https://api.github.com/repos/${owner}/${repo}`);

  report('Fetching languages...');
  let languages = {};
  try { languages = await fetchJson(`https://api.github.com/repos/${owner}/${repo}/languages`); } catch (e) { /* optional */ }

  const branch = repoInfo.default_branch || 'main';

  report('Reading package manifest...');
  let packageJson = null;
  const pkgRaw = await fetchRawFile(owner, repo, branch, 'package.json');
  if (pkgRaw) { try { packageJson = JSON.parse(pkgRaw); } catch (e) { /* malformed, skip */ } }

  const hasRequirementsTxt = !!(await fetchRawFile(owner, repo, branch, 'requirements.txt'));
  const hasCargoToml = !!(await fetchRawFile(owner, repo, branch, 'Cargo.toml'));
  const hasGoMod = !!(await fetchRawFile(owner, repo, branch, 'go.mod'));

  report('Fetching contributors...');
  let contributors = [];
  try { contributors = await fetchJson(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=6`); } catch (e) { /* optional */ }

  report('Fetching latest release...');
  let latestRelease = null;
  try { latestRelease = await fetchJson(`https://api.github.com/repos/${owner}/${repo}/releases/latest`); } catch (e) { /* no releases, fine */ }

  const topLanguages = Object.keys(languages).slice(0, 8);
  const matchedTechIds = guessTechIds(topLanguages, packageJson);

  let installSteps = [{ title: 'Clone the repository', cmd: `git clone https://github.com/${owner}/${repo}.git\ncd ${repo}` }];
  if (packageJson) {
    installSteps.push({ title: 'Install dependencies', cmd: 'npm install' });
    if (packageJson.scripts?.dev) installSteps.push({ title: 'Start the dev server', cmd: 'npm run dev' });
    else if (packageJson.scripts?.start) installSteps.push({ title: 'Start the app', cmd: 'npm start' });
  } else if (hasRequirementsTxt) {
    installSteps.push({ title: 'Install dependencies', cmd: 'pip install -r requirements.txt' });
  } else if (hasCargoToml) {
    installSteps.push({ title: 'Build the project', cmd: 'cargo build --release' });
  } else if (hasGoMod) {
    installSteps.push({ title: 'Build the project', cmd: 'go build ./...' });
  }

  const result = {
    owner, repo,
    description: repoInfo.description || '',
    homepage: repoInfo.homepage || '',
    stars: repoInfo.stargazers_count || 0,
    defaultBranch: branch,
    topLanguages,
    matchedTechIds,
    packageJson,
    installSteps,
    contributors: (contributors || []).map(c => ({ login: c.login, avatarUrl: c.avatar_url, url: c.html_url })),
    latestVersion: latestRelease?.tag_name || null,
    license: repoInfo.license?.spdx_id || null
  };

  writeCache(cacheKey, result);
  return result;
}

const LANGUAGE_TO_TECH = {
  JavaScript: 'javascript', TypeScript: 'typescript', Python: 'python', Java: 'java',
  'C#': 'csharp', Go: 'go', Rust: 'rust', PHP: 'php', Ruby: 'ruby', Kotlin: 'kotlin',
  Swift: 'swift', 'C++': 'cplusplus', HTML: 'html5', CSS: 'css3', Dart: 'dart'
};

const PKG_DEP_TO_TECH = {
  react: 'react', vue: 'vuejs', '@angular/core': 'angular', svelte: 'svelte',
  next: 'nextjs', nuxt: 'nuxtjs', tailwindcss: 'tailwindcss', bootstrap: 'bootstrap',
  express: 'express', '@nestjs/core': 'nestjs', graphql: 'graphql', mongoose: 'mongodb',
  pg: 'postgresql', mysql2: 'mysql', redis: 'redis', firebase: 'firebase', jest: 'jest',
  eslint: 'eslint', webpack: 'webpack', vite: 'vite'
};

function guessTechIds(topLanguages, packageJson) {
  const ids = new Set();
  for (const lang of topLanguages) {
    if (LANGUAGE_TO_TECH[lang]) ids.add(LANGUAGE_TO_TECH[lang]);
  }
  if (packageJson) {
    ids.add('nodejs');
    const deps = { ...(packageJson.dependencies || {}), ...(packageJson.devDependencies || {}) };
    for (const dep of Object.keys(deps)) {
      if (PKG_DEP_TO_TECH[dep]) ids.add(PKG_DEP_TO_TECH[dep]);
    }
  }
  return Array.from(ids);
}

/* ==================== MODULE: services/npmApi.js ==================== */

async function enrichNpmPackage(packageName) {
  if (!packageName || !packageName.trim()) return null;
  const name = packageName.trim();
  const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}/latest`);
  if (!res.ok) throw new Error(`Package "${name}" not found on npm`);
  const data = await res.json();
  return {
    name: data.name,
    version: data.version,
    description: data.description || ''
  };
}
function npmBadgeUrls(packageName, style = 'for-the-badge') {
  const encoded = encodeURIComponent(packageName);
  return {
    version: `https://img.shields.io/npm/v/${encoded}.svg?style=${style}&logo=npm`,
    downloads: `https://img.shields.io/npm/dm/${encoded}.svg?style=${style}&logo=npm`,
    packageUrl: `https://www.npmjs.com/package/${packageName}`
  };
}

/* ==================== MODULE: utils/exportUtils.js ==================== */

async function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
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
function downloadReadmeFile(content, filename = 'README.md') {
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
function showToast(message, type = 'info') {
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
function fireConfetti() {
  if (typeof window.confetti === 'function') {
    window.confetti({
      particleCount: 60,
      spread: 55,
      origin: { y: 0.8 },
      colors: ['#fafafa', '#71717a', '#3b82f6', '#10b981', '#f59e0b']
    });
  }
}

/* ==================== MODULE: utils/markdownGenerator.js ==================== */

function githubSlug(heading) {
  return String(heading)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

function headingOf(section) {
  if (!section.enabled) return null;
  const skip = [SECTION_TYPES.HERO, SECTION_TYPES.BADGES, SECTION_TYPES.TOC];
  if (skip.includes(section.type)) return null;
  const heading = section.data?.heading;
  if (!heading) return null;
  return heading;
}
function generateMarkdown(sections) {
  if (!sections || !Array.isArray(sections)) return '';

  const heroSection = sections.find(s => s.type === SECTION_TYPES.HERO && s.enabled);
  const context = {
    repoOwner: heroSection?.data?.repoOwner || 'yourusername',
    repoName: heroSection?.data?.repoName || 'your-repo',
    tocEntries: sections
      .map(s => headingOf(s))
      .filter(Boolean)
      .map(h => ({ heading: h, anchor: githubSlug(h) }))
  };

  const chunks = [];
  for (const section of sections) {
    if (!section.enabled) continue;
    const md = generateSectionMarkdown(section, context);
    if (md && md.trim()) chunks.push(md.trim());
  }
  return chunks.join('\n\n') + '\n';
}

function generateSectionMarkdown(section, ctx) {
  const { type, data } = section;
  const { repoOwner, repoName } = ctx;

  switch (type) {
    case SECTION_TYPES.HERO: {
      const align = data.align || 'center';
      const width = data.logoWidth || '100%';
      let logo = '';
      if (data.showLogo && data.logoUrl) {
        logo = `<img src="${data.logoUrl}" alt="${data.projectName || 'Project'} banner" width="${width}" />\n  <br/>`;
      }
      if (align === 'center') {
        return `<div align="center">\n  ${logo}\n  <h1>${data.projectName || 'Project Title'}</h1>\n  <p>${data.tagline || ''}</p>\n</div>`;
      }
      if (align === 'right') {
        return `<div align="right">\n  ${logo}\n  <h1>${data.projectName || 'Project Title'}</h1>\n  <p>${data.tagline || ''}</p>\n</div>`;
      }
      const logoMd = data.showLogo && data.logoUrl ? `![Banner](${data.logoUrl})\n\n` : '';
      return `${logoMd}# ${data.projectName || 'Project Title'}\n\n> ${data.tagline || ''}`;
    }

    case SECTION_TYPES.BADGES: {
      const style = data.style || 'for-the-badge';
      const align = data.align || 'center';
      const badges = [];

      // These get wrapped in a raw <p align="..."> block below, and GFM treats an HTML
      // block as opaque — markdown ![]()/[]() syntax inside it would render as literal
      // text, not an image — so badges here must be real <a>/<img> HTML, not markdown.
      const add = (label, imgUrl, linkUrl) => {
        const img = `<img src="${imgUrl}" alt="${label}" />`;
        badges.push(linkUrl ? `<a href="${linkUrl}">${img}</a>` : img);
      };

      if (data.showStars) add('GitHub Stars', `https://img.shields.io/github/stars/${repoOwner}/${repoName}?style=${style}`, `https://github.com/${repoOwner}/${repoName}/stargazers`);
      if (data.showForks) add('GitHub Forks', `https://img.shields.io/github/forks/${repoOwner}/${repoName}?style=${style}`, `https://github.com/${repoOwner}/${repoName}/network/members`);
      if (data.showIssues) add('GitHub Issues', `https://img.shields.io/github/issues/${repoOwner}/${repoName}?style=${style}`, `https://github.com/${repoOwner}/${repoName}/issues`);
      if (data.showLicense) add('License', `https://img.shields.io/github/license/${repoOwner}/${repoName}?style=${style}`, `https://github.com/${repoOwner}/${repoName}/blob/main/LICENSE`);
      if (data.showLastCommit) add('Last Commit', `https://img.shields.io/github/last-commit/${repoOwner}/${repoName}?style=${style}`);
      if (data.showRelease) add('Release', `https://img.shields.io/github/v/release/${repoOwner}/${repoName}?style=${style}`, `https://github.com/${repoOwner}/${repoName}/releases`);
      if (data.showContributors) add('Contributors', `https://img.shields.io/github/contributors/${repoOwner}/${repoName}?style=${style}`, `https://github.com/${repoOwner}/${repoName}/graphs/contributors`);
      if (data.showActionsCI) add('CI', `https://github.com/${repoOwner}/${repoName}/actions/workflows/ci.yml/badge.svg`, `https://github.com/${repoOwner}/${repoName}/actions`);

      if (data.npmPackageName && (data.showNpmVersion || data.showNpmDownloads)) {
        const npmUrls = npmBadgeUrls(data.npmPackageName, style);
        if (data.showNpmVersion) add('npm version', npmUrls.version, npmUrls.packageUrl);
        if (data.showNpmDownloads) add('npm downloads', npmUrls.downloads, npmUrls.packageUrl);
      }

      if (Array.isArray(data.customBadges)) {
        for (const cb of data.customBadges) {
          if (!cb.label || !cb.message) continue;
          const url = `https://img.shields.io/badge/${encodeURIComponent(cb.label)}-${encodeURIComponent(cb.message)}-${cb.color || 'blue'}?style=${style}`;
          add(cb.label, url, cb.link || '');
        }
      }

      if (badges.length === 0) return '';
      return `<p align="${align}">\n  ${badges.join('\n  ')}\n</p>`;
    }

    case SECTION_TYPES.ABOUT:
      return `## ${data.heading || 'About'}\n\n${data.content || ''}`;

    case SECTION_TYPES.TOC: {
      if (ctx.tocEntries.length === 0) return '';
      const items = ctx.tocEntries.map(e => `- [${e.heading}](#${e.anchor})`).join('\n');
      return `## ${data.heading || 'Table of Contents'}\n\n${items}`;
    }

    case SECTION_TYPES.TECH_STACK: {
      const style = data.style || 'for-the-badge';
      const align = data.align || 'center';
      const items = (data.technologies || []).map(id => techById(id)).filter(Boolean);
      if (items.length === 0) return `## ${data.heading || 'Built With'}\n\n*(No technologies selected yet)*`;

      if (data.layout === 'table') {
        const rows = items.map(item => `| **${item.name}** | [Docs](${getTechDocUrl(item)}) |`).join('\n');
        return `## ${data.heading || 'Built With'}\n\n| Technology | Docs |\n| :--- | :--- |\n${rows}`;
      }

      // Raw <a>/<img> HTML, not markdown ![]()/[]() syntax — this is wrapped in a raw
      // <p> block below, which GFM treats as opaque, so nested markdown wouldn't parse.
      const badges = items.map(item => `<a href="${getTechDocUrl(item)}"><img src="${getBadgeUrl(item, style)}" alt="${item.name}" /></a>`);
      return `## ${data.heading || 'Built With'}\n\n<p align="${align}">\n  ${badges.join('\n  ')}\n</p>`;
    }

    case SECTION_TYPES.FEATURES: {
      const items = data.items || [];
      if (items.length === 0) return '';
      const list = items.map(item => `- **${item.title || ''}**: ${item.desc || ''}`).join('\n');
      return `## ${data.heading || 'Key Features'}\n\n${list}`;
    }

    case SECTION_TYPES.DEMO: {
      const align = data.align || 'center';
      const width = data.width || '100%';
      let imageMd = '';
      if (data.imageUrl) {
        const rawImg = `<img src="${data.imageUrl}" alt="${data.caption || 'Preview'}" width="${width}" />`;
        imageMd = `<div align="${align}">\n  ${rawImg}\n</div>`;
      }
      const liveMd = data.liveUrl ? `\n\n**Live Demo**: [${data.liveUrl}](${data.liveUrl})` : '';
      return `## ${data.heading || 'Preview'}\n\n${imageMd}${liveMd}`;
    }

    case SECTION_TYPES.INSTALLATION: {
      const lines = [`## ${data.heading || 'Getting Started'}`];
      if (data.prerequisites) lines.push(`\n### Prerequisites\n\n${data.prerequisites}`);
      lines.push('\n### Installation\n');
      (data.steps || []).forEach((step, idx) => {
        lines.push(`${idx + 1}. **${step.title}**\n   \`\`\`bash\n   ${step.cmd}\n   \`\`\``);
      });
      return lines.join('\n');
    }

    case SECTION_TYPES.USAGE: {
      const lang = data.codeLang || 'bash';
      const code = data.code ? `\`\`\`${lang}\n${data.code}\n\`\`\`` : '';
      const note = data.note ? `\n\n> [!NOTE]\n> ${data.note}` : '';
      return `## ${data.heading || 'Usage'}\n\n${code}${note}`;
    }

    case SECTION_TYPES.ENV_VARS: {
      const vars = data.variables || [];
      if (vars.length === 0) return '';
      const rows = vars.map(v => `| \`${v.key}\` | ${v.desc || '-'} | \`${v.default || '-'}\` | ${v.required ? 'Yes' : 'No'} |`).join('\n');
      return `## ${data.heading || 'Environment Variables'}\n\n| Variable | Description | Default | Required |\n| :--- | :--- | :--- | :--- |\n${rows}`;
    }

    case SECTION_TYPES.API_REFERENCE: {
      const eps = data.endpoints || [];
      if (eps.length === 0) return '';
      const rows = eps.map(e => `| \`${e.method || 'GET'}\` | \`${e.path || '/'}\` | ${e.desc || '-'} |`).join('\n');
      return `## ${data.heading || 'API Reference'}\n\n| Method | Endpoint | Description |\n| :--- | :--- | :--- |\n${rows}`;
    }

    case SECTION_TYPES.MERMAID: {
      if (!data.diagram || !data.diagram.trim()) return '';
      return `## ${data.heading || 'Diagram'}\n\n\`\`\`mermaid\n${data.diagram.trim()}\n\`\`\``;
    }

    case SECTION_TYPES.FAQ: {
      const qs = data.questions || [];
      if (qs.length === 0) return '';
      const details = qs.map(q => `<details>\n<summary><strong>${q.q || 'Question'}</strong></summary>\n<br/>\n\n${q.a || ''}\n\n</details>`).join('\n\n');
      return `## ${data.heading || 'FAQ'}\n\n${details}`;
    }

    case SECTION_TYPES.ROADMAP: {
      const tasks = data.tasks || [];
      if (tasks.length === 0) return '';
      const list = tasks.map(t => `- [${t.completed ? 'x' : ' '}] ${t.text}`).join('\n');
      return `## ${data.heading || 'Roadmap'}\n\n${list}`;
    }

    case SECTION_TYPES.CONTRIBUTING:
      return `## ${data.heading || 'Contributing'}\n\n${data.guidelines || 'Contributions are welcome! Please open an issue or pull request.'}`;

    case SECTION_TYPES.LICENSE: {
      const lic = getLicenseById(data.type || 'MIT');
      const year = data.year || String(new Date().getFullYear());
      const holder = data.holder || 'Your Name';
      const badge = `<p align="center">\n  <a href="${lic.url}"><img src="${lic.badgeUrl}" alt="License: ${lic.id}" /></a>\n</p>`;
      return `## ${data.heading || 'License'}\n\n${badge}\n\nDistributed under the **${lic.name}**. See [\`LICENSE\`](LICENSE) for the full text.\n\nCopyright (c) ${year} ${holder}`;
    }

    case SECTION_TYPES.AUTHOR: {
      const badges = [];
      if (data.github) badges.push(`[![GitHub](https://img.shields.io/badge/GitHub-${encodeURIComponent(data.github)}-181717?style=flat&logo=github)](https://github.com/${data.github})`);
      if (data.twitter) badges.push(`[![Twitter](https://img.shields.io/badge/Twitter-${encodeURIComponent(data.twitter)}-1DA1F2?style=flat&logo=x)](https://twitter.com/${data.twitter})`);
      if (data.linkedin) badges.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-${encodeURIComponent(data.linkedin)}-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/${data.linkedin})`);
      const emailMd = data.email ? `\n\nEmail: [${data.email}](mailto:${data.email})` : '';
      const badgeMd = badges.length ? `\n\n${badges.join(' ')}` : '';
      return `## ${data.heading || 'Author'}\n\n**${data.name || 'Author'}**${emailMd}${badgeMd}`;
    }

    case SECTION_TYPES.STATS: {
      // Don't silently fall back to the Hero section's placeholder repo owner
      // ("username"/"yourusername") — that isn't a real GitHub account, so the
      // stats images would just fail to load. Require an explicit username.
      const placeholders = new Set(['', 'username', 'yourusername']);
      const candidate = (data.githubUser || repoOwner || '').trim();
      const user = placeholders.has(candidate.toLowerCase()) ? '' : candidate;
      if (!user) return `## ${data.heading || 'Stats'}\n\n*(Set a GitHub username in this section's settings to enable stats)*`;
      const theme = data.theme === 'light' ? 'default' : 'dark';
      // Raw <a>/<img> HTML — wrapped in a raw <p> block below, which GFM treats as
      // opaque, so nested markdown ![]()/[]() syntax wouldn't parse there.
      const imgs = [];
      if (data.showTopLangs) imgs.push(`<a href="https://github.com/${encodeURIComponent(user)}"><img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${encodeURIComponent(user)}&layout=compact&theme=${theme === 'dark' ? 'github_dark' : 'default'}" alt="Top Languages" /></a>`);
      if (data.showStreak) imgs.push(`<a href="https://github.com/${encodeURIComponent(user)}"><img src="https://streak-stats.demolab.com?user=${encodeURIComponent(user)}&theme=${theme}" alt="Streak" /></a>`);
      if (data.showStarHistory) imgs.push(`<a href="https://star-history.com/#${repoOwner}/${repoName}&Date"><img src="https://api.star-history.com/svg?repos=${repoOwner}/${repoName}&type=Date" alt="Star History" /></a>`);
      if (imgs.length === 0) return '';
      return `## ${data.heading || 'Stats'}\n\n<p align="center">\n  ${imgs.join('\n  <br/>\n  ')}\n</p>`;
    }

    case SECTION_TYPES.CUSTOM:
      return data.markdown ? `${data.heading ? `## ${data.heading}\n\n` : ''}${data.markdown}` : '';

    default:
      return '';
  }
}

/* ==================== MODULE: utils/renderReadme.js ==================== */

function renderReadmeHtml(sections) {
  const markdown = generateMarkdown(sections);

  if (!window.marked) {
    return { markdown, html: `<pre>${markdown.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</pre>` };
  }

  window.marked.setOptions({ gfm: true, breaks: true });
  const rawHtml = window.marked.parse(markdown);
  const html = window.DOMPurify
    ? window.DOMPurify.sanitize(rawHtml, { FORBID_ATTR: ['style'], FORBID_TAGS: ['style', 'script'] })
    : rawHtml;

  return { markdown, html };
}

/* ==================== MODULE: store.js ==================== */

const STORAGE_KEY = 'readmify_v2_state';

class ReadmifyStore {
  constructor() {
    this.listeners = new Set();
    this.state = this.loadInitialState();
    this._saveTimer = null;
    this._undoStack = [];
  }

  loadInitialState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.sections) && parsed.sections.length > 0) {
          return {
            sections: parsed.sections,
            activeSectionId: parsed.activeSectionId || parsed.sections[0].id,
            previewTheme: parsed.previewTheme || 'dark',
            viewMode: parsed.viewMode || 'editor'
          };
        }
      }
    } catch (e) {
      console.warn('Could not restore saved state:', e);
    }
    return {
      sections: JSON.parse(JSON.stringify(INITIAL_SECTIONS)),
      activeSectionId: INITIAL_SECTIONS[0].id,
      previewTheme: 'dark',
      viewMode: 'editor'
    };
  }

  getState() { return this.state; }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  notify(meta = {}) {
    for (const fn of this.listeners) fn(this.state, meta);
    this.scheduleSave();
  }

  scheduleSave() {
    if (this._saveTimer) clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => this.saveToStorage(), 500);
  }

  flushSave() {
    if (this._saveTimer) { clearTimeout(this._saveTimer); this._saveTimer = null; }
    this.saveToStorage();
  }

  saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        sections: this.state.sections,
        activeSectionId: this.state.activeSectionId,
        previewTheme: this.state.previewTheme,
        viewMode: this.state.viewMode
      }));
    } catch (e) { console.warn('Could not save state:', e); }
  }

  setViewMode(viewMode) {
    if (this.state.viewMode === viewMode) return;
    this.state.viewMode = viewMode;
    this.notify({ type: 'SET_VIEW_MODE' });
  }

  setPreviewTheme(theme) {
    if (this.state.previewTheme === theme) return;
    this.state.previewTheme = theme;
    this.notify({ type: 'SET_THEME' });
  }

  setActiveSection(id) {
    this.state.activeSectionId = id;
    this.notify({ type: 'SET_ACTIVE_SECTION' });
  }

  findSection(id) {
    return this.state.sections.find(s => s.id === id);
  }

  updateSectionData(id, partialData) {
    const section = this.findSection(id);
    if (!section) return;
    section.data = { ...section.data, ...partialData };
    this.notify({ type: 'UPDATE_SECTION_DATA', sectionId: id });
  }

  renameSection(id, title) {
    const section = this.findSection(id);
    if (!section) return;
    section.title = title;
    this.notify({ type: 'RENAME_SECTION', sectionId: id });
  }

  toggleSection(id, enabled) {
    const section = this.findSection(id);
    if (!section) return;
    section.enabled = enabled !== undefined ? enabled : !section.enabled;
    this.notify({ type: 'TOGGLE_SECTION', sectionId: id });
  }

  moveSection(id, direction) {
    const idx = this.state.sections.findIndex(s => s.id === id);
    if (idx === -1) return;
    const target = direction === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= this.state.sections.length) return;
    const [item] = this.state.sections.splice(idx, 1);
    this.state.sections.splice(target, 0, item);
    this.notify({ type: 'MOVE_SECTION' });
  }

  reorderSections(fromIndex, toIndex) {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
    if (fromIndex >= this.state.sections.length || toIndex >= this.state.sections.length) return;
    const [item] = this.state.sections.splice(fromIndex, 1);
    this.state.sections.splice(toIndex, 0, item);
    this.notify({ type: 'REORDER_SECTIONS' });
  }

  addSectionFromType(type, customTitle, insertIndex = null) {
    const existing = type !== SECTION_TYPES.CUSTOM ? this.state.sections.find(s => s.type === type) : null;
    if (existing) {
      existing.enabled = true;
      this.state.activeSectionId = existing.id;
      this.notify({ type: 'ADD_SECTION', sectionId: existing.id });
      return existing.id;
    }
    const section = createSection(type, customTitle);
    if (typeof insertIndex === 'number' && insertIndex >= 0 && insertIndex <= this.state.sections.length) {
      this.state.sections.splice(insertIndex, 0, section);
    } else {
      this.state.sections.push(section);
    }
    this.state.activeSectionId = section.id;
    this.notify({ type: 'ADD_SECTION', sectionId: section.id });
    return section.id;
  }

  duplicateSection(id) {
    const section = this.findSection(id);
    if (!section) return null;
    const idx = this.state.sections.findIndex(s => s.id === id);
    const clone = JSON.parse(JSON.stringify(section));
    clone.id = createSection(section.type).id;
    clone.title = `${section.title} (Copy)`;
    this.state.sections.splice(idx + 1, 0, clone);
    this.notify({ type: 'DUPLICATE_SECTION' });
    return clone.id;
  }

  removeSection(id) {
    const idx = this.state.sections.findIndex(s => s.id === id);
    if (idx === -1) return;
    const [removed] = this.state.sections.splice(idx, 1);
    this._undoStack.push({ section: removed, index: idx });
    if (this._undoStack.length > 10) this._undoStack.shift();
    this.notify({ type: 'REMOVE_SECTION' });
  }

  undoRemoveSection() {
    const last = this._undoStack.pop();
    if (!last) return;
    const target = Math.min(last.index, this.state.sections.length);
    this.state.sections.splice(target, 0, last.section);
    this.notify({ type: 'UNDO_REMOVE' });
  }

  addCustomSection(title = 'Custom Section') {
    return this.addSectionFromType(SECTION_TYPES.CUSTOM, title);
  }

  loadTemplate(templateId) {
    const tpl = TEMPLATES.find(t => t.id === templateId);
    if (!tpl) return;
    this.state.sections = JSON.parse(JSON.stringify(tpl.sections));
    this.state.activeSectionId = this.state.sections[0]?.id;
    this.notify({ type: 'LOAD_TEMPLATE' });
  }

  resetToDefault() {
    this.state.sections = JSON.parse(JSON.stringify(INITIAL_SECTIONS));
    this.state.activeSectionId = this.state.sections[0]?.id;
    this.notify({ type: 'RESET' });
  }

  applyRepoAnalysis(info) {
    const hero = this.state.sections.find(s => s.type === SECTION_TYPES.HERO);
    if (hero) {
      hero.data.repoOwner = info.owner;
      hero.data.repoName = info.repo;
      hero.data.projectName = hero.data.projectName === 'My Project' ? info.repo : hero.data.projectName;
      if (info.description) hero.data.tagline = info.description;
    }
    const about = this.state.sections.find(s => s.type === SECTION_TYPES.ABOUT);
    if (about && info.description) about.data.content = info.description;

    if (info.matchedTechIds?.length) {
      const tech = this.state.sections.find(s => s.type === SECTION_TYPES.TECH_STACK);
      if (tech) tech.data.technologies = Array.from(new Set([...(tech.data.technologies || []), ...info.matchedTechIds]));
    }
    if (info.installSteps?.length) {
      const install = this.state.sections.find(s => s.type === SECTION_TYPES.INSTALLATION);
      if (install) install.data.steps = info.installSteps;
    }
    if (info.license) {
      const lic = this.state.sections.find(s => s.type === SECTION_TYPES.LICENSE);
      if (lic) lic.data.type = info.license;
    }
    this.notify({ type: 'APPLY_REPO_ANALYSIS' });
  }
}
const store = new ReadmifyStore();

/* ==================== MODULE: components/sectionFormList.js ==================== */

const SECTION_LABELS = {
  [SECTION_TYPES.HERO]: 'Header & Title', [SECTION_TYPES.BADGES]: 'Badges',
  [SECTION_TYPES.ABOUT]: 'About', [SECTION_TYPES.TOC]: 'Table of Contents',
  [SECTION_TYPES.TECH_STACK]: 'Built With', [SECTION_TYPES.FEATURES]: 'Features',
  [SECTION_TYPES.DEMO]: 'Demo / Preview', [SECTION_TYPES.INSTALLATION]: 'Installation',
  [SECTION_TYPES.USAGE]: 'Usage', [SECTION_TYPES.ENV_VARS]: 'Environment Variables',
  [SECTION_TYPES.API_REFERENCE]: 'API Reference', [SECTION_TYPES.MERMAID]: 'Diagram (Mermaid)',
  [SECTION_TYPES.FAQ]: 'FAQ', [SECTION_TYPES.ROADMAP]: 'Roadmap',
  [SECTION_TYPES.CONTRIBUTING]: 'Contributing', [SECTION_TYPES.LICENSE]: 'License',
  [SECTION_TYPES.AUTHOR]: 'Author', [SECTION_TYPES.STATS]: 'Stats', [SECTION_TYPES.CUSTOM]: 'Custom Section'
};

let expandedIds = new Set();
let dragFromIndex = null;

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function renderSectionFormList(container, meta = {}) {
  const state = store.getState();

  // Only a live text edit needs its DOM left alone (rebuilding would drop the
  // cursor); every other change (add/remove/duplicate/reorder/toggle/select)
  // must always redraw so it's visible immediately.
  const isTextEdit = meta.type === 'UPDATE_SECTION_DATA' || meta.type === 'RENAME_SECTION';
  const active = document.activeElement;
  const isTypingField = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA') && container.contains(active);
  if (isTextEdit && isTypingField) return;

  container.innerHTML = state.sections.map((section, idx) => renderCard(section, idx, state.activeSectionId)).join('');
  attachListeners(container);
}

function renderCard(section, index, activeSectionId) {
  const collapsed = !expandedIds.has(section.id) && section.id !== activeSectionId;
  const label = SECTION_LABELS[section.type] || section.title;
  return `
    <div class="section-card ${section.enabled ? '' : 'section-card-disabled'}" data-card-id="${section.id}" data-index="${index}">
      <div class="section-card-header" data-id="${section.id}">
        <span class="drag-grip" draggable="true" title="Drag to reorder">⠿</span>
        <button type="button" class="card-collapse-btn" title="${collapsed ? 'Expand' : 'Collapse'}">${collapsed ? '▸' : '▾'}</button>
        <input type="text" class="card-title-input" data-id="${section.id}" value="${esc(section.title)}" title="${esc(label)} section" />
        <label class="card-enable-toggle" title="Show in README">
          <input type="checkbox" class="card-enable-cb" data-id="${section.id}" ${section.enabled ? 'checked' : ''} />
        </label>
        <button type="button" class="card-icon-btn card-duplicate-btn" data-id="${section.id}" title="Duplicate">⧉</button>
        <button type="button" class="card-icon-btn card-delete-btn" data-id="${section.id}" title="Delete">✕</button>
      </div>
      ${collapsed ? '' : `<div class="section-card-body">${renderFieldsForType(section)}</div>`}
    </div>
  `;
}

function renderFieldsForType(section) {
  const { type, data, id } = section;
  switch (type) {
    case SECTION_TYPES.HERO:
      return `
        ${imageDropzone(id, 'logoUrl', data.logoUrl, 'Project banner / logo')}
        <label class="field-check"><input type="checkbox" data-field="showLogo" ${data.showLogo ? 'checked' : ''} /> Show banner in README</label>
        <label class="field-label">Project name</label>
        <input type="text" class="field-input" data-field="projectName" value="${esc(data.projectName)}" />
        <label class="field-label">Tagline</label>
        <textarea class="field-input" data-field="tagline" rows="2">${esc(data.tagline)}</textarea>
        <div class="field-row">
          <div><label class="field-label">Alignment</label>
            <select class="field-input" data-field="align">
              ${['center', 'left', 'right'].map(a => `<option value="${a}" ${data.align === a ? 'selected' : ''}>${a}</option>`).join('')}
            </select>
          </div>
          <div><label class="field-label">Banner width</label>
            <select class="field-input" data-field="logoWidth">
              ${['100%', '80%', '600', '400'].map(w => `<option value="${w}" ${data.logoWidth === w ? 'selected' : ''}>${w}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="field-row">
          <div><label class="field-label">GitHub owner</label><input type="text" class="field-input" data-field="repoOwner" value="${esc(data.repoOwner)}" /></div>
          <div><label class="field-label">Repo name</label><input type="text" class="field-input" data-field="repoName" value="${esc(data.repoName)}" /></div>
        </div>
      `;

    case SECTION_TYPES.BADGES:
      return `
        <div class="field-row">
          <div><label class="field-label">Style</label>
            <select class="field-input" data-field="style">
              ${['for-the-badge', 'flat', 'flat-square', 'plastic', 'social'].map(s => `<option value="${s}" ${data.style === s ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
          <div><label class="field-label">Alignment</label>
            <select class="field-input" data-field="align">
              ${['center', 'left', 'right'].map(a => `<option value="${a}" ${data.align === a ? 'selected' : ''}>${a}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="field-checks-grid">
          ${['showStars:Stars', 'showForks:Forks', 'showIssues:Issues', 'showLicense:License', 'showLastCommit:Last commit', 'showRelease:Release', 'showContributors:Contributors', 'showActionsCI:CI status']
            .map(pair => { const [f, l] = pair.split(':'); return `<label class="field-check"><input type="checkbox" data-field="${f}" ${data[f] ? 'checked' : ''} /> ${l}</label>`; }).join('')}
        </div>
        <label class="field-label">npm package (optional)</label>
        <div class="field-row-inline">
          <input type="text" class="field-input" id="npm-pkg-input-${id}" placeholder="e.g. react" value="${esc(data.npmPackageName)}" />
          <button type="button" class="btn-secondary npm-detect-btn" data-id="${id}">Detect</button>
        </div>
        <div class="field-checks-grid">
          <label class="field-check"><input type="checkbox" data-field="showNpmVersion" ${data.showNpmVersion ? 'checked' : ''} /> npm version badge</label>
          <label class="field-check"><input type="checkbox" data-field="showNpmDownloads" ${data.showNpmDownloads ? 'checked' : ''} /> npm downloads badge</label>
        </div>
        ${renderListEditor(id, 'customBadges', data.customBadges || [], [
          { key: 'label', placeholder: 'Label' }, { key: 'message', placeholder: 'Message' }, { key: 'color', placeholder: 'Color (e.g. blue)' }, { key: 'link', placeholder: 'Link (optional)' }
        ], 'Custom badge')}
      `;

    case SECTION_TYPES.ABOUT:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">Content</label>
        <textarea class="field-input" data-field="content" rows="4">${esc(data.content)}</textarea>
      `;

    case SECTION_TYPES.TOC:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <p class="field-hint">Auto-generated from every other visible section's heading. No editing needed here.</p>
      `;

    case SECTION_TYPES.TECH_STACK: {
      const selected = (data.technologies || []).map(techId => techById(techId)).filter(Boolean);
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <div class="field-row">
          <div><label class="field-label">Layout</label>
            <select class="field-input" data-field="layout">
              <option value="badges" ${data.layout === 'badges' ? 'selected' : ''}>Badges</option>
              <option value="table" ${data.layout === 'table' ? 'selected' : ''}>Table</option>
            </select>
          </div>
          <div><label class="field-label">Alignment</label>
            <select class="field-input" data-field="align">
              ${['center', 'left', 'right'].map(a => `<option value="${a}" ${data.align === a ? 'selected' : ''}>${a}</option>`).join('')}
            </select>
          </div>
        </div>
        <label class="field-label">Technologies (${selected.length})</label>
        <div class="tech-chip-row">
          ${selected.map(t => `<span class="tech-chip">${esc(t.name)}<button type="button" class="tech-chip-remove" data-id="${id}" data-tech="${t.id}">✕</button></span>`).join('')}
        </div>
        <button type="button" class="btn-secondary tech-picker-open-btn" data-id="${id}">+ Pick technologies</button>
        <div class="tech-picker-inline hidden" id="tech-picker-${id}"></div>
      `;
    }

    case SECTION_TYPES.FEATURES:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        ${renderListEditor(id, 'items', data.items || [], [
          { key: 'title', placeholder: 'Feature title' }, { key: 'desc', placeholder: 'Description', textarea: true }
        ], 'Feature')}
      `;

    case SECTION_TYPES.DEMO:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        ${imageDropzone(id, 'imageUrl', data.imageUrl, 'Screenshot / GIF')}
        <div class="field-row">
          <div><label class="field-label">Width</label>
            <select class="field-input" data-field="width">
              ${['100%', '80%', '600', '400'].map(w => `<option value="${w}" ${data.width === w ? 'selected' : ''}>${w}</option>`).join('')}
            </select>
          </div>
          <div><label class="field-label">Alignment</label>
            <select class="field-input" data-field="align">
              ${['center', 'left', 'right'].map(a => `<option value="${a}" ${data.align === a ? 'selected' : ''}>${a}</option>`).join('')}
            </select>
          </div>
        </div>
        <label class="field-label">Caption</label>
        <input type="text" class="field-input" data-field="caption" value="${esc(data.caption)}" />
        <label class="field-label">Live demo URL</label>
        <input type="text" class="field-input" data-field="liveUrl" value="${esc(data.liveUrl)}" placeholder="https://myapp.example.com" />
      `;

    case SECTION_TYPES.INSTALLATION:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">Prerequisites</label>
        <textarea class="field-input" data-field="prerequisites" rows="2">${esc(data.prerequisites)}</textarea>
        ${renderListEditor(id, 'steps', data.steps || [], [
          { key: 'title', placeholder: 'Step title' }, { key: 'cmd', placeholder: 'Command', textarea: true, mono: true }
        ], 'Step')}
      `;

    case SECTION_TYPES.USAGE:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">Language</label>
        <input type="text" class="field-input" data-field="codeLang" value="${esc(data.codeLang)}" placeholder="bash, javascript, python..." />
        <label class="field-label">Code</label>
        <textarea class="field-input field-mono" data-field="code" rows="4">${esc(data.code)}</textarea>
        <label class="field-label">Note (optional)</label>
        <textarea class="field-input" data-field="note" rows="2">${esc(data.note)}</textarea>
      `;

    case SECTION_TYPES.ENV_VARS:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        ${renderListEditor(id, 'variables', data.variables || [], [
          { key: 'key', placeholder: 'KEY_NAME', mono: true }, { key: 'desc', placeholder: 'Description' }, { key: 'default', placeholder: 'Default value' }, { key: 'required', placeholder: '', checkbox: true, checkboxLabel: 'Required' }
        ], 'Variable')}
      `;

    case SECTION_TYPES.API_REFERENCE:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        ${renderListEditor(id, 'endpoints', data.endpoints || [], [
          { key: 'method', placeholder: 'GET' }, { key: 'path', placeholder: '/api/items', mono: true }, { key: 'desc', placeholder: 'Description' }
        ], 'Endpoint')}
      `;

    case SECTION_TYPES.MERMAID:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">Mermaid diagram source</label>
        <textarea class="field-input field-mono" data-field="diagram" rows="6">${esc(data.diagram)}</textarea>
        <p class="field-hint">GitHub renders Mermaid diagrams natively from a plain code block — no images, no extra service.</p>
      `;

    case SECTION_TYPES.FAQ:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        ${renderListEditor(id, 'questions', data.questions || [], [
          { key: 'q', placeholder: 'Question' }, { key: 'a', placeholder: 'Answer', textarea: true }
        ], 'Question')}
      `;

    case SECTION_TYPES.ROADMAP:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        ${renderListEditor(id, 'tasks', data.tasks || [], [
          { key: 'completed', placeholder: '', checkbox: true, checkboxLabel: 'Done' }, { key: 'text', placeholder: 'Task description' }
        ], 'Task')}
      `;

    case SECTION_TYPES.CONTRIBUTING:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">Guidelines</label>
        <textarea class="field-input" data-field="guidelines" rows="3">${esc(data.guidelines)}</textarea>
      `;

    case SECTION_TYPES.LICENSE:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">License</label>
        <select class="field-input" data-field="type">
          ${LICENSE_CATALOG.map(l => `<option value="${l.id}" ${data.type === l.id ? 'selected' : ''}>${l.name}</option>`).join('')}
        </select>
        <div class="field-row">
          <div><label class="field-label">Copyright holder</label><input type="text" class="field-input" data-field="holder" value="${esc(data.holder)}" /></div>
          <div><label class="field-label">Year</label><input type="text" class="field-input" data-field="year" value="${esc(data.year)}" /></div>
        </div>
      `;

    case SECTION_TYPES.AUTHOR:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">Name</label>
        <input type="text" class="field-input" data-field="name" value="${esc(data.name)}" />
        <div class="field-row">
          <div><label class="field-label">GitHub username</label><input type="text" class="field-input" data-field="github" value="${esc(data.github)}" /></div>
          <div><label class="field-label">Twitter/X username</label><input type="text" class="field-input" data-field="twitter" value="${esc(data.twitter)}" /></div>
        </div>
        <div class="field-row">
          <div><label class="field-label">LinkedIn username</label><input type="text" class="field-input" data-field="linkedin" value="${esc(data.linkedin)}" /></div>
          <div><label class="field-label">Email</label><input type="text" class="field-input" data-field="email" value="${esc(data.email)}" /></div>
        </div>
      `;

    case SECTION_TYPES.STATS:
      return `
        <label class="field-label">Heading</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">GitHub username</label>
        <input type="text" class="field-input" data-field="githubUser" value="${esc(data.githubUser)}" />
        <div class="field-checks-grid">
          <label class="field-check"><input type="checkbox" data-field="showTopLangs" ${data.showTopLangs ? 'checked' : ''} /> Top languages</label>
          <label class="field-check"><input type="checkbox" data-field="showStreak" ${data.showStreak ? 'checked' : ''} /> Contribution streak</label>
          <label class="field-check"><input type="checkbox" data-field="showStarHistory" ${data.showStarHistory ? 'checked' : ''} /> Star history</label>
        </div>
      `;

    case SECTION_TYPES.CUSTOM:
      return `
        <label class="field-label">Heading (optional)</label>
        <input type="text" class="field-input" data-field="heading" value="${esc(data.heading)}" />
        <label class="field-label">Custom Markdown</label>
        <textarea class="field-input field-mono" data-field="markdown" rows="6">${esc(data.markdown)}</textarea>
      `;

    default:
      return '<p class="field-hint">No editable fields.</p>';
  }
}

function imageDropzone(sectionId, field, url, label) {
  if (url) {
    return `
      <div class="image-dropzone image-dropzone-filled" data-id="${sectionId}" data-field="${field}">
        <img src="${url}" alt="${esc(label)}" class="image-dropzone-preview" />
        <div class="image-dropzone-actions">
          <button type="button" class="btn-secondary image-replace-btn" data-id="${sectionId}" data-field="${field}">Replace</button>
          <button type="button" class="btn-secondary image-remove-btn" data-id="${sectionId}" data-field="${field}">Remove</button>
        </div>
        <input type="file" class="image-file-input hidden" accept="image/*" data-id="${sectionId}" data-field="${field}" />
      </div>
    `;
  }
  return `
    <div class="image-dropzone" data-id="${sectionId}" data-field="${field}">
      <p class="field-hint">${esc(label)} — drag &amp; drop an image, or</p>
      <div class="image-dropzone-actions">
        <button type="button" class="btn-secondary image-choose-btn" data-id="${sectionId}" data-field="${field}">Choose file</button>
        <button type="button" class="btn-secondary image-url-btn" data-id="${sectionId}" data-field="${field}">Paste URL</button>
      </div>
      <input type="file" class="image-file-input hidden" accept="image/*" data-id="${sectionId}" data-field="${field}" />
    </div>
  `;
}

function renderListEditor(sectionId, listField, items, columns, itemLabel) {
  return `
    <div class="list-editor" data-id="${sectionId}" data-list-field="${listField}">
      ${items.map((item, idx) => `
        <div class="list-editor-row" data-idx="${idx}">
          ${columns.map(col => {
            if (col.checkbox) return `<label class="field-check list-editor-check"><input type="checkbox" class="list-editor-input" data-key="${col.key}" ${item[col.key] ? 'checked' : ''} /> ${col.checkboxLabel || ''}</label>`;
            if (col.textarea) return `<textarea class="field-input list-editor-input ${col.mono ? 'field-mono' : ''}" data-key="${col.key}" rows="2" placeholder="${esc(col.placeholder)}">${esc(item[col.key])}</textarea>`;
            return `<input type="text" class="field-input list-editor-input ${col.mono ? 'field-mono' : ''}" data-key="${col.key}" placeholder="${esc(col.placeholder)}" value="${esc(item[col.key])}" />`;
          }).join('')}
          <button type="button" class="card-icon-btn list-editor-remove" data-idx="${idx}" title="Remove">✕</button>
        </div>
      `).join('')}
      <button type="button" class="btn-secondary list-editor-add">+ Add ${itemLabel}</button>
    </div>
  `;
}

function attachListeners(container) {
  // Generic [data-field] inputs -> store.updateSectionData
  container.querySelectorAll('.section-card').forEach(card => {
    const sectionId = card.dataset.cardId;

    card.querySelectorAll('[data-field]').forEach(el => {
      const field = el.dataset.field;
      const eventName = el.type === 'checkbox' ? 'change' : 'input';
      el.addEventListener(eventName, () => {
        const val = el.type === 'checkbox' ? el.checked : el.value;
        store.updateSectionData(sectionId, { [field]: val });
      });
    });

    // List editors (features/steps/env vars/endpoints/faq/roadmap/custom badges)
    card.querySelectorAll('.list-editor').forEach(editor => {
      const listField = editor.dataset.listField;
      const getItems = () => JSON.parse(JSON.stringify(store.findSection(sectionId)?.data?.[listField] || []));

      editor.querySelectorAll('.list-editor-row').forEach(row => {
        const idx = parseInt(row.dataset.idx, 10);
        row.querySelectorAll('.list-editor-input').forEach(input => {
          const key = input.dataset.key;
          const eventName = input.type === 'checkbox' ? 'change' : 'input';
          input.addEventListener(eventName, () => {
            const items = getItems();
            if (!items[idx]) return;
            items[idx][key] = input.type === 'checkbox' ? input.checked : input.value;
            store.updateSectionData(sectionId, { [listField]: items });
          });
        });
      });

      editor.querySelectorAll('.list-editor-remove').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.idx, 10);
          const items = getItems();
          items.splice(idx, 1);
          store.updateSectionData(sectionId, { [listField]: items });
        });
      });

      editor.querySelector('.list-editor-add')?.addEventListener('click', () => {
        const items = getItems();
        const blank = {};
        // infer shape from first existing item, or leave empty object for known types
        items.push(blank);
        store.updateSectionData(sectionId, { [listField]: items });
      });
    });

    // Image dropzones
    card.querySelectorAll('.image-dropzone').forEach(zone => {
      const field = zone.dataset.field;
      const fileInput = zone.querySelector('.image-file-input');

      const applyFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => store.updateSectionData(sectionId, { [field]: e.target.result, ...(field === 'logoUrl' ? { showLogo: true } : {}) });
        reader.readAsDataURL(file);
      };

      zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag-over'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        applyFile(e.dataTransfer.files?.[0]);
      });

      zone.querySelector('.image-choose-btn')?.addEventListener('click', () => fileInput?.click());
      zone.querySelector('.image-replace-btn')?.addEventListener('click', () => fileInput?.click());
      fileInput?.addEventListener('change', (e) => applyFile(e.target.files?.[0]));

      zone.querySelector('.image-url-btn')?.addEventListener('click', () => {
        const url = prompt('Paste an image URL:', '');
        if (url && url.trim()) store.updateSectionData(sectionId, { [field]: url.trim(), ...(field === 'logoUrl' ? { showLogo: true } : {}) });
      });

      zone.querySelector('.image-remove-btn')?.addEventListener('click', () => {
        store.updateSectionData(sectionId, { [field]: '', ...(field === 'logoUrl' ? { showLogo: false } : {}) });
      });
    });

    // Tech picker toggle (inline panel, built lazily)
    card.querySelector('.tech-picker-open-btn')?.addEventListener('click', () => {
      const panel = card.querySelector(`#tech-picker-${sectionId}`);
      if (!panel) return;
      const hidden = panel.classList.toggle('hidden');
      if (!hidden && !panel.dataset.built) {
        panel.dataset.built = 'true';
        panel.innerHTML = renderTechPickerPanel(sectionId);
        attachTechPickerListeners(panel, sectionId);
      }
    });

    card.querySelectorAll('.tech-chip-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const section = store.findSection(sectionId);
        const updated = (section.data.technologies || []).filter(t => t !== btn.dataset.tech);
        store.updateSectionData(sectionId, { technologies: updated });
      });
    });

    // npm Detect
    card.querySelector('.npm-detect-btn')?.addEventListener('click', async (e) => {
      const btn = e.target;
      const input = card.querySelector(`#npm-pkg-input-${sectionId}`);
      const name = input?.value?.trim();
      if (!name) { showToast('Enter a package name first', 'error'); return; }
      btn.disabled = true;
      btn.textContent = '...';
      try {
        const pkg = await enrichNpmPackage(name);
        store.updateSectionData(sectionId, { npmPackageName: pkg.name, showNpmVersion: true, showNpmDownloads: true });
        showToast(`Found ${pkg.name}@${pkg.version}`, 'success');
      } catch (err) {
        showToast(err.message || 'Package not found', 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Detect';
      }
    });
  });

  // Card chrome: collapse, rename, enable toggle, duplicate, delete
  // Click anywhere on a card's header bar to expand/collapse it — except the
  // controls that need their own click behavior (rename, enable, duplicate,
  // delete, drag handle).
  container.querySelectorAll('.section-card-header').forEach(header => {
    header.addEventListener('click', (e) => {
      if (e.target.closest('.card-title-input, .card-enable-toggle, .card-duplicate-btn, .card-delete-btn, .drag-grip')) return;
      const id = header.dataset.id;
      if (expandedIds.has(id)) expandedIds.delete(id); else expandedIds.add(id);
      renderSectionFormList(container);
    });
  });

  container.querySelectorAll('.card-title-input').forEach(input => {
    input.addEventListener('input', () => store.renameSection(input.dataset.id, input.value));
  });

  container.querySelectorAll('.card-enable-cb').forEach(cb => {
    cb.addEventListener('change', () => store.toggleSection(cb.dataset.id, cb.checked));
  });

  container.querySelectorAll('.card-duplicate-btn').forEach(btn => {
    btn.addEventListener('click', () => store.duplicateSection(btn.dataset.id));
  });

  container.querySelectorAll('.card-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Delete this section?')) store.removeSection(btn.dataset.id);
    });
  });

  setupDragReorder(container);
}

function setupDragReorder(container) {
  container.querySelectorAll('.drag-grip').forEach(grip => {
    grip.addEventListener('dragstart', (e) => {
      const card = grip.closest('.section-card');
      dragFromIndex = parseInt(card.dataset.index, 10);
      e.dataTransfer.effectAllowed = 'move';
      card.classList.add('dragging');
    });
    grip.addEventListener('dragend', () => {
      grip.closest('.section-card')?.classList.remove('dragging');
      dragFromIndex = null;
    });
  });

  container.querySelectorAll('.section-card').forEach(card => {
    card.addEventListener('dragover', (e) => {
      if (dragFromIndex === null) return;
      e.preventDefault();
      card.classList.add('drop-target');
    });
    card.addEventListener('dragleave', () => card.classList.remove('drop-target'));
    card.addEventListener('drop', (e) => {
      e.preventDefault();
      card.classList.remove('drop-target');
      if (dragFromIndex === null) return;
      const toIndex = parseInt(card.dataset.index, 10);
      store.reorderSections(dragFromIndex, toIndex);
      dragFromIndex = null;
    });
  });
}

function renderTechPickerPanel(sectionId) {
  const section = store.findSection(sectionId);
  const selected = new Set(section.data.technologies || []);
  return `
    <input type="text" class="field-input tech-picker-search" placeholder="Search technologies..." />
    <div class="tech-picker-categories">
      ${TECH_CATEGORIES.map(c => `<button type="button" class="tech-cat-btn" data-cat="${c.id}">${c.name}</button>`).join('')}
    </div>
    <div class="tech-picker-grid">
      ${TECH_CATALOG.map(t => `
        <button type="button" class="tech-picker-item ${selected.has(t.id) ? 'tech-picker-item-selected' : ''}" data-tech="${t.id}" data-cat="${t.category}" data-name="${t.name.toLowerCase()}">
          ${esc(t.name)}
        </button>
      `).join('')}
    </div>
  `;
}

function attachTechPickerListeners(panel, sectionId) {
  const items = () => Array.from(panel.querySelectorAll('.tech-picker-item'));

  panel.querySelector('.tech-picker-search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    items().forEach(el => { el.hidden = q && !el.dataset.name.includes(q); });
  });

  panel.querySelectorAll('.tech-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      items().forEach(el => { el.hidden = cat !== 'all' && el.dataset.cat !== cat; });
    });
  });

  panel.querySelectorAll('.tech-picker-item').forEach(el => {
    el.addEventListener('click', () => {
      const section = store.findSection(sectionId);
      const current = new Set(section.data.technologies || []);
      const techId = el.dataset.tech;
      if (current.has(techId)) current.delete(techId); else current.add(techId);
      store.updateSectionData(sectionId, { technologies: Array.from(current) });
    });
  });
}
function openAddSectionMenu(onPick) {
  // Simple: return the list for the caller (palette/library) to render its own UI.
  return Object.entries(SECTION_LABELS).map(([type, label]) => ({ type, label }));
}

/* ==================== MODULE: components/sectionLibrary.js ==================== */

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function openSectionLibrary() {
  let modal = document.getElementById('section-library-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'section-library-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  const existingTypes = new Set(store.getState().sections.map(s => s.type));

  modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <h3>Add a section</h3>
        <button type="button" class="modal-close-btn" id="close-section-library-btn">✕</button>
      </div>
      <input type="text" class="field-input" id="section-library-search" placeholder="Search sections..." />
      <div class="section-library-grid">
        ${Object.entries(SECTION_LABELS).map(([type, label]) => `
          <button type="button" class="section-library-item" data-type="${type}" data-name="${label.toLowerCase()}">
            ${esc(label)}${existingTypes.has(type) ? ' <span class="badge-muted">already added</span>' : ''}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  modal.querySelector('#close-section-library-btn').addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

  modal.querySelector('#section-library-search').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    modal.querySelectorAll('.section-library-item').forEach(el => { el.hidden = q && !el.dataset.name.includes(q); });
  });

  modal.querySelectorAll('.section-library-item').forEach(btn => {
    btn.addEventListener('click', () => {
      store.addSectionFromType(btn.dataset.type);
      modal.classList.add('hidden');
    });
  });
}
function closeSectionLibrary() {
  document.getElementById('section-library-modal')?.classList.add('hidden');
}

/* ==================== MODULE: components/wizard.js ==================== */

function openWizard() {
  let modal = document.getElementById('wizard-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'wizard-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-card">
      <div class="modal-header">
        <h3>Quick Start</h3>
        <button type="button" class="modal-close-btn" id="close-wizard-btn">✕</button>
      </div>
      <p class="field-hint">Scan a public GitHub repo to auto-fill sections, or start from a template.</p>
      <div class="field-row-inline">
        <input type="text" class="field-input" id="wizard-repo-input" placeholder="owner/repo or GitHub URL" />
        <button type="button" class="btn-primary" id="wizard-scan-btn">Scan</button>
      </div>
      <div id="wizard-scan-status" class="field-hint"></div>
      <p class="field-hint" style="margin-top:16px;">Or start from a template:</p>
      <div class="section-library-grid">
        ${TEMPLATES.map(t => `<button type="button" class="section-library-item" data-template="${t.id}">${t.name}</button>`).join('')}
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  modal.querySelector('#close-wizard-btn').addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

  modal.querySelectorAll('[data-template]').forEach(btn => {
    btn.addEventListener('click', () => {
      store.loadTemplate(btn.dataset.template);
      showToast('Template loaded!', 'success');
      modal.classList.add('hidden');
    });
  });

  const scanBtn = modal.querySelector('#wizard-scan-btn');
  const input = modal.querySelector('#wizard-repo-input');
  const status = modal.querySelector('#wizard-scan-status');

  const runScan = async () => {
    const parsed = parseGitHubRepoInput(input.value);
    if (!parsed) { showToast('Enter a valid repo (owner/repo or GitHub URL)', 'error'); return; }
    scanBtn.disabled = true;
    scanBtn.textContent = 'Scanning...';
    try {
      const info = await fetchGitHubRepoFullDetails(parsed.owner, parsed.repo, (p) => { status.textContent = p.message; });
      store.applyRepoAnalysis(info);
      fireConfetti();
      showToast(`Scanned ${info.owner}/${info.repo}!`, 'success');
      modal.classList.add('hidden');
    } catch (err) {
      showToast(err.message || 'Scan failed', 'error');
    } finally {
      scanBtn.disabled = false;
      scanBtn.textContent = 'Scan';
      status.textContent = '';
    }
  };

  scanBtn.addEventListener('click', runScan);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); runScan(); } });
}
function closeWizard() {
  document.getElementById('wizard-modal')?.classList.add('hidden');
}

/* ==================== MODULE: components/palette.js ==================== */

let open = false;
let activeIdx = 0;
let currentItems = [];

function coreActions() {
  return [
    { label: 'Go to Editor', run: () => store.setViewMode('editor') },
    { label: 'Go to Preview', run: () => store.setViewMode('preview') },
    { label: 'Copy markdown', run: () => copyToClipboard(window.__readmifyMarkdown || '', 'Markdown copied!') },
    { label: 'Download README.md', run: () => downloadReadmeFile(window.__readmifyMarkdown || '', 'README.md') },
    { label: 'Quick Start (scan repo / templates)', run: () => openWizard() },
    {
      label: 'Toggle theme', run: () => {
        const next = store.getState().previewTheme === 'dark' ? 'light' : 'dark';
        store.setPreviewTheme(next);
        showToast(`Switched to ${next} preview theme`, 'info');
      }
    },
    {
      label: 'Reset to default template', run: () => {
        if (confirm('Reset your README to the default template? This clears your current sections.')) {
          store.resetToDefault();
        }
      }
    }
  ];
}

function allItems(query) {
  const q = (query || '').toLowerCase().trim();
  const actions = coreActions().map(a => ({ kind: 'action', title: a.label, run: a.run }));
  const sections = Object.entries(SECTION_LABELS).map(([type, label]) => ({ kind: 'section', title: `Add: ${label}`, type }));
  const all = [...actions, ...sections];
  if (!q) return all.slice(0, 12);
  return all.filter(i => i.title.toLowerCase().includes(q)).slice(0, 12);
}

function render(query) {
  const list = document.getElementById('cmd-palette-list');
  if (!list) return;
  currentItems = allItems(query);
  list.innerHTML = currentItems.map((item, idx) => `
    <div class="cmd-item ${idx === activeIdx ? 'active' : ''}" data-idx="${idx}">${item.title}</div>
  `).join('') || `<div class="cmd-item-empty">No matches</div>`;

  list.querySelectorAll('.cmd-item').forEach(el => {
    el.addEventListener('click', () => runItem(parseInt(el.dataset.idx, 10)));
  });
}

function runItem(idx) {
  const item = currentItems[idx];
  if (!item) return;
  closePalette();
  if (item.kind === 'action') item.run();
  else if (item.kind === 'section') store.addSectionFromType(item.type);
}
function openPalette() {
  const backdrop = document.getElementById('cmd-palette-backdrop');
  const input = document.getElementById('cmd-palette-input');
  if (!backdrop || !input) return;
  open = true;
  activeIdx = 0;
  backdrop.classList.remove('hidden');
  input.value = '';
  render('');
  setTimeout(() => input.focus(), 20);
}
function closePalette() {
  document.getElementById('cmd-palette-backdrop')?.classList.add('hidden');
  open = false;
}
function isPaletteOpen() { return open; }
function initPalette() {
  const backdrop = document.getElementById('cmd-palette-backdrop');
  const input = document.getElementById('cmd-palette-input');
  const btn = document.getElementById('nav-palette-btn');
  if (!backdrop || !input) return;

  btn?.addEventListener('click', openPalette);
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closePalette(); });
  input.addEventListener('input', () => { activeIdx = 0; render(input.value); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); activeIdx = Math.min(activeIdx + 1, currentItems.length - 1); render(input.value); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); activeIdx = Math.max(activeIdx - 1, 0); render(input.value); }
    else if (e.key === 'Enter') { e.preventDefault(); runItem(activeIdx); }
    else if (e.key === 'Escape') closePalette();
  });
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      isPaletteOpen() ? closePalette() : openPalette();
    }
    if (e.key === 'Escape' && isPaletteOpen()) closePalette();
  });
}

/* ==================== MODULE: components/healthScore.js ==================== */

function findGitHubUnsafeMarkup(markdownText) {
  if (!markdownText) return [];
  const issues = [];
  if (/\sstyle\s*=/i.test(markdownText)) issues.push('Contains inline style= attributes, which GitHub strips from README HTML.');
  if (/<script[\s>]/i.test(markdownText)) issues.push('Contains <script> tags, which GitHub never renders.');
  if (/<style[\s>]/i.test(markdownText)) issues.push('Contains <style> tags, which GitHub never renders.');
  return issues;
}

function countWords(text) {
  if (!text) return 0;
  const t = String(text).replace(/[#*`>\-[\]()!]/g, ' ').trim();
  return t ? t.split(/\s+/).length : 0;
}
function calculateReadmeScore(sections, markdownText) {
  if (!sections || !Array.isArray(sections)) {
    return { score: 0, label: 'Empty', color: '#EF4444', tips: [] };
  }

  let score = 0;
  const tips = [];
  const enabled = new Set(sections.filter(s => s.enabled).map(s => s.type));

  const hero = sections.find(s => s.type === SECTION_TYPES.HERO && s.enabled);
  if (hero?.data?.projectName && hero.data.projectName !== 'Project Title' && hero.data.projectName !== 'My Project') {
    score += 15;
  } else {
    tips.push('Give your project a real name in the Header section.');
  }

  if (enabled.has(SECTION_TYPES.BADGES)) score += 10; else tips.push('Add a Badges section for quick social proof.');

  const about = sections.find(s => s.type === SECTION_TYPES.ABOUT && s.enabled);
  const aboutWords = countWords(about?.data?.content);
  if (aboutWords > 15) score += 15; else tips.push('Write a short About section explaining what your project does.');

  const tech = sections.find(s => s.type === SECTION_TYPES.TECH_STACK && s.enabled);
  if (tech?.data?.technologies?.length > 0) score += 10; else tips.push('List your tech stack.');

  const features = sections.find(s => s.type === SECTION_TYPES.FEATURES && s.enabled);
  if (features?.data?.items?.length >= 2) score += 10; else tips.push('List at least 2 key features.');

  const install = sections.find(s => s.type === SECTION_TYPES.INSTALLATION && s.enabled);
  if (install?.data?.steps?.length > 0) score += 15; else tips.push('Add step-by-step installation instructions.');

  if (enabled.has(SECTION_TYPES.LICENSE)) score += 10; else tips.push('Add a License section.');
  if (enabled.has(SECTION_TYPES.AUTHOR) || enabled.has(SECTION_TYPES.CONTRIBUTING)) score += 10; else tips.push('Add an Author or Contributing section.');

  const demo = sections.find(s => s.type === SECTION_TYPES.DEMO && s.enabled);
  if (demo?.data?.imageUrl || demo?.data?.liveUrl) score += 5;

  if (/(TODO|FIXME|XXX)/i.test(JSON.stringify(sections))) tips.push('Remove TODO/FIXME placeholders before publishing.');

  for (const issue of findGitHubUnsafeMarkup(markdownText)) tips.push(issue);

  let label = 'Needs Work', color = '#EF4444';
  if (score >= 90) { label = 'Outstanding'; color = '#10B981'; }
  else if (score >= 70) { label = 'Great'; color = '#06B6D4'; }
  else if (score >= 45) { label = 'Good'; color = '#F59E0B'; }

  return { score: Math.min(score, 100), label, color, tips };
}

/* ==================== MODULE: app.js ==================== */

let editorPaneBody, previewBody, rawView, previewTabBtn, rawTabBtn;
let currentMarkdown = '';
let mermaidReady = false;

function initApp() {
  editorPaneBody = document.getElementById('editor-pane-body');
  previewBody = document.getElementById('preview-body');
  rawView = document.getElementById('raw-view');
  previewTabBtn = document.getElementById('preview-tab-btn');
  rawTabBtn = document.getElementById('raw-tab-btn');

  setupHeaderControls();
  setupImportModal();
  initPalette();

  store.subscribe((state, meta) => renderApp(state, meta));
  renderApp(store.getState(), { force: true });

  window.addEventListener('beforeunload', () => store.flushSave());

  if (!localStorage.getItem('readmify_visited')) {
    localStorage.setItem('readmify_visited', 'true');
    setTimeout(() => openWizard(), 500);
  }
}

function renderApp(state, meta = {}) {
  applyViewModeDom(state.viewMode);

  if (editorPaneBody) renderSectionFormList(editorPaneBody, meta);

  const { markdown, html } = renderReadmeHtml(state.sections);
  currentMarkdown = markdown;
  window.__readmifyMarkdown = markdown;

  if (previewBody) {
    previewBody.className = 'markdown-body';
    previewBody.innerHTML = html;
    renderMermaidBlocks(previewBody);
  }
  applyPreviewTheme(state.previewTheme);
  if (rawView) rawView.value = markdown;

  updateHealthScore(state.sections, markdown);
  updateSaveIndicator();
}

function applyPreviewTheme(theme) {
  const link = document.getElementById('github-markdown-theme-link');
  const wrap = document.getElementById('preview-body-wrap');
  if (link) link.href = theme === 'light'
    ? 'https://cdn.jsdelivr.net/npm/github-markdown-css@5.8.1/github-markdown-light.css'
    : 'https://cdn.jsdelivr.net/npm/github-markdown-css@5.8.1/github-markdown-dark.css';
  if (wrap) { wrap.classList.toggle('theme-dark', theme !== 'light'); wrap.classList.toggle('theme-light', theme === 'light'); }
}

function renderMermaidBlocks(container) {
  const blocks = container.querySelectorAll('pre code.language-mermaid, pre code.mermaid');
  if (blocks.length === 0) return;
  if (!window.mermaid) return;
  if (!mermaidReady) {
    window.mermaid.initialize({ startOnLoad: false, theme: 'dark' });
    mermaidReady = true;
  }
  blocks.forEach((block, idx) => {
    const pre = block.closest('pre');
    const div = document.createElement('div');
    div.className = 'mermaid';
    div.textContent = block.textContent;
    div.id = `mermaid-diagram-${idx}-${Date.now()}`;
    pre.replaceWith(div);
  });
  try {
    window.mermaid.run({ nodes: container.querySelectorAll('.mermaid') });
  } catch (e) {
    console.warn('Mermaid render failed:', e);
  }
}

function applyViewModeDom(mode) {
  const editorPane = document.getElementById('editor-pane');
  const previewPane = document.getElementById('preview-pane');
  document.querySelectorAll('.view-mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  if (window.innerWidth < 900 && editorPane && previewPane) {
    editorPane.classList.toggle('hidden', mode !== 'editor');
    previewPane.classList.toggle('hidden', mode === 'editor' ? false : mode !== 'preview');
    if (mode === 'editor') previewPane.classList.add('hidden');
    if (mode === 'preview') editorPane.classList.add('hidden');
  } else if (editorPane && previewPane) {
    editorPane.classList.remove('hidden');
    previewPane.classList.remove('hidden');
  }
}

function updateHealthScore(sections, markdown) {
  const health = calculateReadmeScore(sections, markdown);
  const badge = document.getElementById('health-score-badge');
  const text = document.getElementById('health-score-text');
  const tipsEl = document.getElementById('health-score-tips');
  if (badge && text) {
    badge.style.borderColor = health.color;
    badge.style.color = health.color;
    text.textContent = `${health.score}% ${health.label}`;
  }
  if (tipsEl) {
    tipsEl.innerHTML = health.tips.slice(0, 3).map(t => `<li>${t}</li>`).join('');
  }
}

let saveIndicatorTimer = null;
function updateSaveIndicator() {
  const dot = document.getElementById('save-state-dot');
  const text = document.getElementById('save-state-text');
  if (!dot || !text) return;
  dot.classList.add('dirty');
  dot.classList.remove('saved');
  text.textContent = 'Saving...';
  if (saveIndicatorTimer) clearTimeout(saveIndicatorTimer);
  saveIndicatorTimer = setTimeout(() => {
    dot.classList.remove('dirty');
    dot.classList.add('saved');
    text.textContent = 'Saved';
  }, 600);
}

function setupHeaderControls() {
  document.getElementById('nav-add-section-btn')?.addEventListener('click', () => openSectionLibrary());

  document.getElementById('nav-photos-btn')?.addEventListener('click', () => {
    const hero = store.getState().sections.find(s => s.type === SECTION_TYPES.HERO);
    if (hero) scrollToSection(hero.id);
  });

  document.getElementById('nav-badges-btn')?.addEventListener('click', () => {
    const id = store.addSectionFromType(SECTION_TYPES.BADGES);
    scrollToSection(id);
  });

  document.querySelectorAll('.view-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => store.setViewMode(btn.dataset.mode));
  });

  previewTabBtn?.addEventListener('click', () => switchPreviewTab('preview'));
  rawTabBtn?.addEventListener('click', () => switchPreviewTab('raw'));

  document.getElementById('nav-download-btn')?.addEventListener('click', () => {
    downloadReadmeFile(currentMarkdown, 'README.md');
  });

  const exportBtn = document.getElementById('export-menu-btn');
  const exportMenu = document.getElementById('export-menu');
  const overflowBtn = document.getElementById('nav-overflow-btn');
  const overflowMenu = document.getElementById('nav-overflow-menu');

  exportBtn?.addEventListener('click', (e) => { e.stopPropagation(); overflowMenu?.classList.add('hidden'); exportMenu?.classList.toggle('hidden'); });
  overflowBtn?.addEventListener('click', (e) => { e.stopPropagation(); exportMenu?.classList.add('hidden'); overflowMenu?.classList.toggle('hidden'); });
  document.addEventListener('click', () => { exportMenu?.classList.add('hidden'); overflowMenu?.classList.add('hidden'); });

  document.getElementById('export-menu-copy')?.addEventListener('click', () => copyToClipboard(currentMarkdown));
  document.getElementById('export-menu-download')?.addEventListener('click', () => downloadReadmeFile(currentMarkdown, 'README.md'));

  overflowMenu?.querySelectorAll('[data-overflow]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.overflow;
      if (action === 'guide') openWizard();
      else if (action === 'import') document.getElementById('import-modal')?.classList.remove('hidden');
      else if (action === 'theme') {
        const next = store.getState().previewTheme === 'dark' ? 'light' : 'dark';
        store.setPreviewTheme(next);
        showToast(`Switched to ${next} preview theme`, 'info');
      } else if (action === 'copy') copyToClipboard(currentMarkdown);
      else if (action === 'reset') {
        if (confirm('Reset your README to the default template? This clears your current sections.')) store.resetToDefault();
      }
    });
  });
}

function switchPreviewTab(tab) {
  previewTabBtn?.classList.toggle('active', tab === 'preview');
  rawTabBtn?.classList.toggle('active', tab === 'raw');
  document.getElementById('preview-body-wrap')?.classList.toggle('hidden', tab !== 'preview');
  rawView?.classList.toggle('hidden', tab !== 'raw');
}

function scrollToSection(sectionId) {
  store.setViewMode('editor');
  setTimeout(() => {
    const card = document.querySelector(`[data-card-id="${sectionId}"]`);
    card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card?.classList.add('section-card-flash');
    setTimeout(() => card?.classList.remove('section-card-flash'), 1200);
  }, 50);
}

function setupImportModal() {
  const modal = document.getElementById('import-modal');
  if (!modal) return;
  const textarea = document.getElementById('import-textarea');
  const applyBtn = document.getElementById('import-apply-btn');
  const cancelBtn = document.getElementById('import-cancel-btn');

  cancelBtn?.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

  applyBtn?.addEventListener('click', () => {
    const text = textarea?.value?.trim();
    if (!text) { showToast('Paste some markdown first', 'error'); return; }
    store.state.sections = [{ id: `custom-${Date.now()}`, type: SECTION_TYPES.CUSTOM, title: 'Imported README', enabled: true, data: { heading: '', markdown: text } }];
    store.notify({ type: 'IMPORT' });
    modal.classList.add('hidden');
    showToast('Imported! Edit it as a Custom section.', 'success');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

})();
