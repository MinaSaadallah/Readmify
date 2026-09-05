/**
 * Curated starter templates — pre-filled section sets for common project types.
 */
import { SECTION_TYPES, createSection } from './defaultSections.js';

function sec(type, dataOverrides, titleOverride) {
  const s = createSection(type, titleOverride);
  s.data = { ...s.data, ...dataOverrides };
  return s;
}

export const TEMPLATES = [
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

export function getTemplateById(id) {
  return TEMPLATES.find(t => t.id === id) || null;
}
