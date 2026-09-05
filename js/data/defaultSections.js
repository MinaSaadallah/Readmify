/**
 * Readmify - Standard Modular Sections Definition
 */

export const SECTION_TYPES = {
  HERO: 'hero',
  BADGES: 'badges',
  ABOUT: 'about',
  TECH_STACK: 'techStack',
  FEATURES: 'features',
  DEMO: 'demo',
  INSTALLATION: 'installation',
  PROJECT_STRUCTURE: 'projectStructure',
  ENV_VARS: 'envVars',
  USAGE: 'usage',
  API_REFERENCE: 'apiReference',
  BENCHMARKS: 'benchmarks',
  FAQ: 'faq',
  ROADMAP: 'roadmap',
  CONTRIBUTING: 'contributing',
  SPONSORS: 'sponsors',
  CHANGELOG: 'changelog',
  LICENSE: 'license',
  AUTHOR: 'author',
  CUSTOM: 'custom'
};

export const INITIAL_SECTIONS = [
  {
    id: 'sec-hero',
    type: SECTION_TYPES.HERO,
    title: 'Header & Title',
    enabled: true,
    data: {
      projectName: 'My Project',
      tagline: 'A modern, high-performance open-source project built with passion.',
      align: 'center',
      logoUrl: '',
      showLogo: false,
      repoOwner: 'username',
      repoName: 'my-project'
    }
  },
  {
    id: 'sec-badges',
    type: SECTION_TYPES.BADGES,
    title: 'Repo Badges & Stats',
    enabled: true,
    data: {
      align: 'center',
      format: 'html',
      style: 'for-the-badge',
      repoOwner: '',
      repoName: '',
      showStars: true,
      showForks: true,
      showIssues: true,
      showPRs: true,
      showLicense: true,
      showRelease: true,
      showLastCommit: false,
      showCodeSize: false,
      showContributors: false,
      showActionsCI: false,
      showTopLang: false,
      showWatchers: false,
      ciWorkflowFile: 'ci.yml',
      customBadges: [
        { label: 'PRs', message: 'Welcome', color: 'brightgreen', logo: 'github' }
      ]
    }
  },
  {
    id: 'sec-about',
    type: SECTION_TYPES.ABOUT,
    title: 'About the Project',
    enabled: true,
    data: {
      heading: 'About The Project',
      content: 'A brief, compelling overview of why this project exists, the real-world problem it solves, and how it helps developers or users achieve their goals with maximum ease.'
    }
  },
  {
    id: 'sec-tech',
    type: SECTION_TYPES.TECH_STACK,
    title: 'Built With (Tech Stack)',
    enabled: true,
    data: {
      heading: 'Built With',
      layout: 'categorized',
      style: 'for-the-badge',
      iconSize: 'medium',
      align: 'center',
      spacing: 'normal',
      skilliconsTheme: 'dark',
      skilliconsPerline: 10,
      showDocLinks: true,
      showLabels: true,
      technologies: ['javascript', 'html5', 'css3', 'git', 'github']
    }
  },
  {
    id: 'sec-features',
    type: SECTION_TYPES.FEATURES,
    title: 'Key Features',
    enabled: true,
    data: {
      heading: 'Key Features',
      items: [
        { icon: '', title: 'Lightning Fast Performance', desc: 'Engineered for speed, minimal resource overhead, and instant responsiveness.' },
        { icon: '', title: 'Modern Intuitive Interface', desc: 'Clean, accessible, and responsive user experience designed for productivity.' },
        { icon: '', title: 'Secure & Reliable', desc: 'Robust architecture with rigorous error handling and privacy-conscious design.' },
        { icon: '', title: 'Modular & Extensible', desc: 'Easily customizable components with well-documented APIs and configuration.' }
      ]
    }
  },
  {
    id: 'sec-demo',
    type: SECTION_TYPES.DEMO,
    title: 'Demo / Preview',
    enabled: false,
    data: {
      heading: 'Preview & Demo',
      imageUrl: '',
      caption: 'Application preview',
      liveUrl: ''
    }
  },
  {
    id: 'sec-install',
    type: SECTION_TYPES.INSTALLATION,
    title: 'Getting Started & Installation',
    enabled: true,
    data: {
      heading: 'Getting Started',
      prerequisites: 'Node.js 18+ and Git installed on your system.',
      packageManager: 'npm',
      steps: [
        { title: 'Clone the repository', cmd: 'git clone https://github.com/username/my-project.git\ncd my-project' },
        { title: 'Install dependencies', cmd: 'npm install' },
        { title: 'Start development server', cmd: 'npm run dev' }
      ]
    }
  },
  {
    id: 'sec-structure',
    type: SECTION_TYPES.PROJECT_STRUCTURE,
    title: 'Project Structure',
    enabled: false,
    data: {
      heading: 'Project Structure',
      tree: '.\n├── src/\n│   ├── components/\n│   ├── utils/\n│   └── index.ts\n├── public/\n├── package.json\n└── README.md'
    }
  },
  {
    id: 'sec-env',
    type: SECTION_TYPES.ENV_VARS,
    title: 'Environment Variables',
    enabled: false,
    data: {
      heading: 'Environment Variables',
      variables: [
        { key: 'PORT', desc: 'Port number for the server', default: '3000', required: false },
        { key: 'API_KEY', desc: 'Secret API key', default: '', required: true }
      ]
    }
  },
  {
    id: 'sec-usage',
    type: SECTION_TYPES.USAGE,
    title: 'Usage & Examples',
    enabled: false,
    data: {
      heading: 'Usage',
      codeLang: 'bash',
      code: '# Quick start command\n./start.sh --help',
      note: 'Refer to documentation for extended flag usage and configuration options.'
    }
  },
  {
    id: 'sec-roadmap',
    type: SECTION_TYPES.ROADMAP,
    title: 'Roadmap',
    enabled: true,
    data: {
      heading: 'Roadmap',
      tasks: [
        { text: 'Initial core prototype and UI layout', completed: true },
        { text: 'Visual tech stack badge library', completed: true },
        { text: 'Live GitHub dark/light mode renderer', completed: true },
        { text: 'Export directly to GitHub repo via API', completed: false }
      ]
    }
  },
  {
    id: 'sec-contributing',
    type: SECTION_TYPES.CONTRIBUTING,
    title: 'Contributing',
    enabled: true,
    data: {
      heading: 'Contributing',
      guidelines: 'Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!',
      steps: [
        'Fork the Project',
        'Create your Feature Branch (`git checkout -b feature/AmazingFeature`)',
        'Commit your Changes (`git commit -m "Add some AmazingFeature"`)',
        'Push to the Branch (`git push origin feature/AmazingFeature`)',
        'Open a Pull Request'
      ]
    }
  },
  {
    id: 'sec-license',
    type: SECTION_TYPES.LICENSE,
    title: 'License',
    enabled: true,
    data: {
      heading: 'License',
      type: 'MIT',
      presentation: 'badge-minimal',
      year: new Date().getFullYear().toString(),
      holder: 'Your Name',
      projectName: 'My Project'
    }
  },
  {
    id: 'sec-author',
    type: SECTION_TYPES.AUTHOR,
    title: 'Author & Contact',
    enabled: true,
    data: {
      heading: 'Author & Contact',
      name: 'Your Name',
      github: 'yourusername',
      twitter: '',
      linkedin: '',
      email: '',
      buyMeACoffee: ''
    }
  }
];

export function createSection(type, customTitle) {
  const uid = `sec-${type}-${Date.now().toString(36)}`;
  switch (type) {
    case SECTION_TYPES.HERO:
      return {
        id: uid,
        type,
        title: customTitle || 'Header & Title',
        enabled: true,
        data: {
          projectName: 'My Project',
          tagline: 'A modern, high-performance open-source project.',
          align: 'center',
          logoUrl: '',
          showLogo: false,
          logoWidth: '100%',
          logoAlign: 'center',
          logoRadius: '8px',
          repoOwner: 'username',
          repoName: 'my-project'
        }
      };

    case SECTION_TYPES.BADGES:
      return {
        id: uid,
        type,
        title: customTitle || 'Repo Badges & Stats',
        enabled: true,
        data: {
          align: 'center',
          format: 'html',
          style: 'for-the-badge',
          repoOwner: '',
          repoName: '',
          showStars: true,
          showForks: true,
          showIssues: true,
          showPRs: true,
          showLicense: true,
          showRelease: true,
          showLastCommit: false,
          showCodeSize: false,
          showContributors: false,
          showActionsCI: false,
          showTopLang: false,
          showWatchers: false,
          ciWorkflowFile: 'ci.yml',
          customBadges: []
        }
      };

    case SECTION_TYPES.ABOUT:
      return {
        id: uid,
        type,
        title: customTitle || 'About The Project',
        enabled: true,
        data: {
          heading: customTitle || 'About The Project',
          content: 'A brief, compelling overview of why this project exists, the real-world problem it solves, and how it helps developers or users.'
        }
      };

    case SECTION_TYPES.TECH_STACK:
      return {
        id: uid,
        type,
        title: customTitle || 'Built With (Tech Stack)',
        enabled: true,
        data: {
          heading: customTitle || 'Built With',
          layout: 'categorized',
          style: 'for-the-badge',
          iconSize: 'medium',
          align: 'center',
          spacing: 'normal',
          skilliconsTheme: 'dark',
          skilliconsPerline: 10,
          showDocLinks: true,
          showLabels: true,
          technologies: ['javascript', 'typescript', 'html5', 'css3', 'git']
        }
      };

    case SECTION_TYPES.FEATURES:
      return {
        id: uid,
        type,
        title: customTitle || 'Key Features',
        enabled: true,
        data: {
          heading: customTitle || 'Key Features',
          items: [
            { icon: '⚡', title: 'High Performance', desc: 'Engineered for speed, efficiency, and minimal resource usage.' },
            { icon: '🎨', title: 'Intuitive Experience', desc: 'Modern user experience designed for maximum developer ergonomics.' },
            { icon: '🛡️', title: 'Robust & Secure', desc: 'Built with strict type safety, thorough error handling, and reliability.' }
          ]
        }
      };

    case SECTION_TYPES.DEMO:
      return {
        id: uid,
        type,
        title: customTitle || 'Preview & Demo',
        enabled: true,
        data: {
          heading: customTitle || 'Preview & Demo',
          imageUrl: '',
          caption: 'Application Walkthrough Preview',
          liveUrl: '',
          width: '100%',
          align: 'center',
          radius: '8px'
        }
      };

    case SECTION_TYPES.INSTALLATION:
      return {
        id: uid,
        type,
        title: customTitle || 'Getting Started',
        enabled: true,
        data: {
          heading: customTitle || 'Getting Started',
          prerequisites: 'Node.js 18+ and Git installed locally.',
          packageManager: 'npm',
          steps: [
            { title: 'Clone the repository', cmd: 'git clone https://github.com/username/my-project.git\ncd my-project' },
            { title: 'Install dependencies', cmd: 'npm install' },
            { title: 'Start development server', cmd: 'npm run dev' }
          ]
        }
      };

    case SECTION_TYPES.PROJECT_STRUCTURE:
      return {
        id: uid,
        type,
        title: customTitle || 'Project Structure',
        enabled: true,
        data: {
          heading: customTitle || 'Project Structure',
          tree: '.\n├── src/\n│   ├── components/\n│   ├── utils/\n│   └── index.ts\n├── public/\n├── package.json\n└── README.md'
        }
      };

    case SECTION_TYPES.ENV_VARS:
      return {
        id: uid,
        type,
        title: customTitle || 'Environment Variables',
        enabled: true,
        data: {
          heading: customTitle || 'Environment Variables',
          variables: [
            { key: 'PORT', desc: 'Port number for the server', default: '3000', required: false },
            { key: 'API_KEY', desc: 'Secret API token', default: '', required: true }
          ]
        }
      };

    case SECTION_TYPES.USAGE:
      return {
        id: uid,
        type,
        title: customTitle || 'Usage & Examples',
        enabled: true,
        data: {
          heading: customTitle || 'Usage',
          codeLang: 'bash',
          code: '# Run CLI tool\nmy-cli --help',
          note: 'Refer to documentation for additional command flags and configuration options.'
        }
      };

    case SECTION_TYPES.API_REFERENCE:
      return {
        id: uid,
        type,
        title: customTitle || 'API Reference',
        enabled: true,
        data: {
          heading: customTitle || 'API Reference',
          endpoints: [
            { method: 'GET', path: '/api/v1/health', desc: 'Check service health & status', auth: 'None' },
            { method: 'POST', path: '/api/v1/data', desc: 'Create a new record', auth: 'Bearer Token' }
          ]
        }
      };

    case SECTION_TYPES.BENCHMARKS:
      return {
        id: uid,
        type,
        title: customTitle || 'Benchmarks & Performance',
        enabled: true,
        data: {
          heading: customTitle || 'Benchmarks',
          subtitle: 'Tested on Apple M2 Max, 32GB RAM with Node.js v20',
          rows: [
            { task: 'Cold Start Time', baseline: '142ms', current: '18ms', diff: '7.8x faster' },
            { task: 'Memory Consumption', baseline: '86MB', current: '22MB', diff: '74% reduction' },
            { task: 'Requests / Second', baseline: '4,200 req/s', current: '21,500 req/s', diff: '5.1x throughput' }
          ]
        }
      };

    case SECTION_TYPES.FAQ:
      return {
        id: uid,
        type,
        title: customTitle || 'FAQ & Troubleshooting',
        enabled: true,
        data: {
          heading: customTitle || 'Frequently Asked Questions',
          questions: [
            { q: 'Is this project free and open source?', a: 'Yes, distributed under the MIT License for free commercial and personal use.' },
            { q: 'How can I report a bug or feature request?', a: 'Please open an issue on the GitHub repository issues tab.' },
            { q: 'Can I contribute to the codebase?', a: 'Pull requests are very welcome! Please check the Contributing guide for instructions.' }
          ]
        }
      };

    case SECTION_TYPES.ROADMAP:
      return {
        id: uid,
        type,
        title: customTitle || 'Roadmap',
        enabled: true,
        data: {
          heading: customTitle || 'Roadmap',
          tasks: [
            { text: 'Initial core prototype and layout', completed: true },
            { text: 'Visual component and style picker', completed: true },
            { text: 'Production deployment and release', completed: false }
          ]
        }
      };

    case SECTION_TYPES.CONTRIBUTING:
      return {
        id: uid,
        type,
        title: customTitle || 'Contributing Guide',
        enabled: true,
        data: {
          heading: customTitle || 'Contributing',
          guidelines: 'Contributions make open source an amazing place to learn and build. Any contributions you make are **greatly appreciated**!',
          steps: [
            'Fork the Project',
            'Create your Feature Branch (`git checkout -b feature/AmazingFeature`)',
            'Commit your Changes (`git commit -m "Add AmazingFeature"`)',
            'Push to the Branch (`git push origin feature/AmazingFeature`)',
            'Open a Pull Request'
          ]
        }
      };

    case SECTION_TYPES.SPONSORS:
      return {
        id: uid,
        type,
        title: customTitle || 'Sponsors & Support',
        enabled: true,
        data: {
          heading: customTitle || 'Support & Sponsors',
          message: 'If you find this project helpful, consider supporting its ongoing development!',
          buyMeACoffee: '',
          githubSponsor: '',
          patreon: ''
        }
      };

    case SECTION_TYPES.CHANGELOG:
      return {
        id: uid,
        type,
        title: customTitle || 'Changelog',
        enabled: true,
        data: {
          heading: customTitle || 'Changelog',
          releases: [
            {
              version: 'v1.0.0',
              date: new Date().toISOString().slice(0, 10),
              changes: [
                'Initial release with full feature set',
                'Comprehensive documentation and tests'
              ]
            }
          ]
        }
      };

    case SECTION_TYPES.LICENSE:
      return {
        id: uid,
        type,
        title: customTitle || 'License',
        enabled: true,
        data: {
          heading: customTitle || 'License',
          type: 'MIT',
          presentation: 'badge-minimal',
          year: new Date().getFullYear().toString(),
          holder: 'Your Name',
          projectName: 'My Project'
        }
      };

    case SECTION_TYPES.AUTHOR:
      return {
        id: uid,
        type,
        title: customTitle || 'Author & Contact',
        enabled: true,
        data: {
          heading: customTitle || 'Author & Contact',
          name: 'Your Name',
          github: 'yourusername',
          twitter: '',
          linkedin: '',
          email: '',
          buyMeACoffee: ''
        }
      };

    case SECTION_TYPES.CUSTOM:
    default:
      return {
        id: uid,
        type: SECTION_TYPES.CUSTOM,
        title: customTitle || 'Custom Section',
        enabled: true,
        data: {
          heading: customTitle || 'Custom Section',
          markdown: 'Add your custom documentation, architecture notes, or details here.'
        }
      };
  }
}
