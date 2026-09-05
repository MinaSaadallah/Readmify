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
  ENV_VARS: 'envVars',
  USAGE: 'usage',
  ROADMAP: 'roadmap',
  CONTRIBUTING: 'contributing',
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
      projectName: 'Readmify',
      tagline: 'Craft stunning, professional GitHub READMEs in minutes without writing markdown from scratch.',
      align: 'center',
      logoUrl: 'https://raw.githubusercontent.com/username/repo/main/assets/logo.png',
      showLogo: false,
      repoOwner: 'yourusername',
      repoName: 'your-awesome-project'
    }
  },
  {
    id: 'sec-badges',
    type: SECTION_TYPES.BADGES,
    title: 'Repo Badges & Stats',
    enabled: true,
    data: {
      style: 'for-the-badge',
      showStars: true,
      showForks: true,
      showIssues: true,
      showLicense: true,
      showRelease: true,
      showLastCommit: false,
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
      style: 'for-the-badge',
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
        { icon: '??', title: 'Zero-Build Simplicity', desc: 'No complex compilation or heavy dependencies required; works instantly out of the box.' },
        { icon: '??', title: 'Visual Tech Stack Picker', desc: 'Easily select from 130+ tech stack badges with official logos and brand colors.' },
        { icon: '?', title: 'Real-Time GitHub Preview', desc: 'Preview your markdown in authentic GitHub Dark and Light themes with instant feedback.' },
        { icon: '??', title: 'Fully Responsive & Lightweight', desc: 'Engineered for lightning-fast loading and smooth interaction on any device.' }
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
      imageUrl: 'https://raw.githubusercontent.com/username/repo/main/demo.gif',
      caption: 'App walkthrough preview',
      liveUrl: 'https://yourproject.github.io'
    }
  },
  {
    id: 'sec-install',
    type: SECTION_TYPES.INSTALLATION,
    title: 'Getting Started & Installation',
    enabled: true,
    data: {
      heading: 'Getting Started',
      prerequisites: 'A modern web browser or git installed locally.',
      packageManager: 'git',
      steps: [
        { title: 'Clone the repository', cmd: 'git clone https://github.com/yourusername/your-awesome-project.git' },
        { title: 'Navigate to project directory', cmd: 'cd your-awesome-project' },
        { title: 'Open in your browser', cmd: '# Simply double click index.html or open with Live Server' }
      ]
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
      year: new Date().getFullYear().toString(),
      holder: 'Your Name'
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
