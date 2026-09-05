/** Readmify v2 Bundle - Universal Offline & GitHub Pages Compatibility */

(function() {

  'use strict';

/**
 * Readmify - Tech Stack Badge Catalog with SkillIcons & Shields.io Support
 * 130+ popular languages, frameworks, databases, cloud providers, and developer tools
 */

const TECH_CATEGORIES = [
  { id: 'all', name: 'All Technologies' },
  { id: 'languages', name: 'Languages' },
  { id: 'frontend', name: 'Frontend & Mobile' },
  { id: 'backend', name: 'Backend & APIs' },
  { id: 'database', name: 'Databases & Storage' },
  { id: 'devops', name: 'Cloud & DevOps' },
  { id: 'tools', name: 'Tools & Testing' },
];

const TECH_CATALOG = [
  // --- LANGUAGES ---
  { id: 'typescript', name: 'TypeScript', category: 'languages', color: '3178C6', logo: 'typescript', logoColor: 'white', skillSlug: 'ts' },
  { id: 'javascript', name: 'JavaScript', category: 'languages', color: 'F7DF1E', logo: 'javascript', logoColor: 'black', skillSlug: 'js' },
  { id: 'python', name: 'Python', category: 'languages', color: '3776AB', logo: 'python', logoColor: 'white', skillSlug: 'py' },
  { id: 'rust', name: 'Rust', category: 'languages', color: '000000', logo: 'rust', logoColor: 'white', skillSlug: 'rust' },
  { id: 'go', name: 'Go', category: 'languages', color: '00ADD8', logo: 'go', logoColor: 'white', skillSlug: 'go' },
  { id: 'java', name: 'Java', category: 'languages', color: 'ED8B00', logo: 'openjdk', logoColor: 'white', skillSlug: 'java' },
  { id: 'csharp', name: 'C#', category: 'languages', color: '239120', logo: 'csharp', logoColor: 'white', skillSlug: 'cs' },
  { id: 'cpp', name: 'C++', category: 'languages', color: '00599C', logo: 'cplusplus', logoColor: 'white', skillSlug: 'cpp' },
  { id: 'c', name: 'C', category: 'languages', color: 'A8B9CC', logo: 'c', logoColor: 'black', skillSlug: 'c' },
  { id: 'php', name: 'PHP', category: 'languages', color: '777BB4', logo: 'php', logoColor: 'white', skillSlug: 'php' },
  { id: 'swift', name: 'Swift', category: 'languages', color: 'F05138', logo: 'swift', logoColor: 'white', skillSlug: 'swift' },
  { id: 'kotlin', name: 'Kotlin', category: 'languages', color: '7F52FF', logo: 'kotlin', logoColor: 'white', skillSlug: 'kotlin' },
  { id: 'dart', name: 'Dart', category: 'languages', color: '0175C2', logo: 'dart', logoColor: 'white', skillSlug: 'dart' },
  { id: 'ruby', name: 'Ruby', category: 'languages', color: 'CC342D', logo: 'ruby', logoColor: 'white', skillSlug: 'ruby' },
  { id: 'html5', name: 'HTML5', category: 'languages', color: 'E34F26', logo: 'html5', logoColor: 'white', skillSlug: 'html' },
  { id: 'css3', name: 'CSS3', category: 'languages', color: '1572B6', logo: 'css3', logoColor: 'white', skillSlug: 'css' },
  { id: 'r', name: 'R', category: 'languages', color: '276DC3', logo: 'r', logoColor: 'white', skillSlug: 'r' },
  { id: 'scala', name: 'Scala', category: 'languages', color: 'DC322F', logo: 'scala', logoColor: 'white', skillSlug: 'scala' },
  { id: 'elixir', name: 'Elixir', category: 'languages', color: '4B275F', logo: 'elixir', logoColor: 'white', skillSlug: 'elixir' },
  { id: 'lua', name: 'Lua', category: 'languages', color: '2C2D72', logo: 'lua', logoColor: 'white', skillSlug: 'lua' },
  { id: 'shell', name: 'Bash / Shell', category: 'languages', color: '4EAA25', logo: 'gnubash', logoColor: 'white', skillSlug: 'bash' },
  { id: 'solidity', name: 'Solidity', category: 'languages', color: '363636', logo: 'solidity', logoColor: 'white', skillSlug: 'solidity' },

  // --- FRONTEND & MOBILE ---
  { id: 'react', name: 'React', category: 'frontend', color: '20232A', logo: 'react', logoColor: '61DAFB', skillSlug: 'react' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', color: '000000', logo: 'nextdotjs', logoColor: 'white', skillSlug: 'nextjs' },
  { id: 'vue', name: 'Vue.js', category: 'frontend', color: '4FC08D', logo: 'vuedotjs', logoColor: 'white', skillSlug: 'vue' },
  { id: 'nuxtjs', name: 'Nuxt.js', category: 'frontend', color: '00DC82', logo: 'nuxtdotjs', logoColor: 'white', skillSlug: 'nuxtjs' },
  { id: 'svelte', name: 'Svelte', category: 'frontend', color: 'FF3E00', logo: 'svelte', logoColor: 'white', skillSlug: 'svelte' },
  { id: 'angular', name: 'Angular', category: 'frontend', color: 'DD0031', logo: 'angular', logoColor: 'white', skillSlug: 'angular' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', color: '38B2AC', logo: 'tailwind-css', logoColor: 'white', skillSlug: 'tailwind' },
  { id: 'vite', name: 'Vite', category: 'frontend', color: '646CFF', logo: 'vite', logoColor: 'FFD62E', skillSlug: 'vite' },
  { id: 'astro', name: 'Astro', category: 'frontend', color: 'BC52EE', logo: 'astro', logoColor: 'white', skillSlug: 'astro' },
  { id: 'redux', name: 'Redux', category: 'frontend', color: '593D88', logo: 'redux', logoColor: 'white', skillSlug: 'redux' },
  { id: 'flutter', name: 'Flutter', category: 'frontend', color: '02569B', logo: 'flutter', logoColor: 'white', skillSlug: 'flutter' },
  { id: 'reactnative', name: 'React Native', category: 'frontend', color: '20232A', logo: 'react', logoColor: '61DAFB', skillSlug: 'react' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'frontend', color: '563D7C', logo: 'bootstrap', logoColor: 'white', skillSlug: 'bootstrap' },
  { id: 'sass', name: 'Sass', category: 'frontend', color: 'CC6699', logo: 'sass', logoColor: 'white', skillSlug: 'sass' },
  { id: 'threejs', name: 'Three.js', category: 'frontend', color: '000000', logo: 'threedotjs', logoColor: 'white', skillSlug: 'threejs' },
  { id: 'electron', name: 'Electron', category: 'frontend', color: '47848F', logo: 'electron', logoColor: 'white', skillSlug: 'electron' },

  // --- BACKEND & APIS ---
  { id: 'nodejs', name: 'Node.js', category: 'backend', color: '43853D', logo: 'nodedotjs', logoColor: 'white', skillSlug: 'nodejs' },
  { id: 'express', name: 'Express.js', category: 'backend', color: '404D59', logo: 'express', logoColor: 'white', skillSlug: 'express' },
  { id: 'fastify', name: 'Fastify', category: 'backend', color: '000000', logo: 'fastify', logoColor: 'white', skillSlug: 'fastify' },
  { id: 'nestjs', name: 'NestJS', category: 'backend', color: 'E0234E', logo: 'nestjs', logoColor: 'white', skillSlug: 'nestjs' },
  { id: 'django', name: 'Django', category: 'backend', color: '092E20', logo: 'django', logoColor: 'white', skillSlug: 'django' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', color: '009688', logo: 'fastapi', logoColor: 'white', skillSlug: 'fastapi' },
  { id: 'flask', name: 'Flask', category: 'backend', color: '000000', logo: 'flask', logoColor: 'white', skillSlug: 'flask' },
  { id: 'springboot', name: 'Spring Boot', category: 'backend', color: '6DB33F', logo: 'springboot', logoColor: 'white', skillSlug: 'spring' },
  { id: 'rails', name: 'Ruby on Rails', category: 'backend', color: 'CC0000', logo: 'rubyonrails', logoColor: 'white', skillSlug: 'rails' },
  { id: 'laravel', name: 'Laravel', category: 'backend', color: 'FF2D20', logo: 'laravel', logoColor: 'white', skillSlug: 'laravel' },
  { id: 'dotnet', name: '.NET', category: 'backend', color: '512BD4', logo: 'dotnet', logoColor: 'white', skillSlug: 'dotnet' },
  { id: 'graphql', name: 'GraphQL', category: 'backend', color: 'E10098', logo: 'graphql', logoColor: 'white', skillSlug: 'graphql' },

  // --- DATABASES & STORAGE ---
  { id: 'postgres', name: 'PostgreSQL', category: 'database', color: '316192', logo: 'postgresql', logoColor: 'white', skillSlug: 'postgres' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', color: '4EA94B', logo: 'mongodb', logoColor: 'white', skillSlug: 'mongodb' },
  { id: 'redis', name: 'Redis', category: 'database', color: 'DC382D', logo: 'redis', logoColor: 'white', skillSlug: 'redis' },
  { id: 'mysql', name: 'MySQL', category: 'database', color: '005C84', logo: 'mysql', logoColor: 'white', skillSlug: 'mysql' },
  { id: 'sqlite', name: 'SQLite', category: 'database', color: '07405E', logo: 'sqlite', logoColor: 'white', skillSlug: 'sqlite' },
  { id: 'supabase', name: 'Supabase', category: 'database', color: '3ECF8E', logo: 'supabase', logoColor: 'black', skillSlug: 'supabase' },
  { id: 'firebase', name: 'Firebase', category: 'database', color: 'FFCA28', logo: 'firebase', logoColor: 'black', skillSlug: 'firebase' },
  { id: 'prisma', name: 'Prisma', category: 'database', color: '2D3748', logo: 'prisma', logoColor: 'white', skillSlug: 'prisma' },

  // --- CLOUD & DEVOPS ---
  { id: 'docker', name: 'Docker', category: 'devops', color: '2496ED', logo: 'docker', logoColor: 'white', skillSlug: 'docker' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops', color: '326CE5', logo: 'kubernetes', logoColor: 'white', skillSlug: 'kubernetes' },
  { id: 'aws', name: 'AWS', category: 'devops', color: '232F3E', logo: 'amazonaws', logoColor: 'FF9900', skillSlug: 'aws' },
  { id: 'gcp', name: 'Google Cloud', category: 'devops', color: '4285F4', logo: 'googlecloud', logoColor: 'white', skillSlug: 'gcp' },
  { id: 'azure', name: 'Azure', category: 'devops', color: '0078D4', logo: 'microsoftazure', logoColor: 'white', skillSlug: 'azure' },
  { id: 'vercel', name: 'Vercel', category: 'devops', color: '000000', logo: 'vercel', logoColor: 'white', skillSlug: 'vercel' },
  { id: 'netlify', name: 'Netlify', category: 'devops', color: '00C7B7', logo: 'netlify', logoColor: 'white', skillSlug: 'netlify' },
  { id: 'cloudflare', name: 'Cloudflare', category: 'devops', color: 'F38020', logo: 'cloudflare', logoColor: 'white', skillSlug: 'cloudflare' },
  { id: 'githubactions', name: 'GitHub Actions', category: 'devops', color: '2088FF', logo: 'githubactions', logoColor: 'white', skillSlug: 'githubactions' },
  { id: 'terraform', name: 'Terraform', category: 'devops', color: '7B42BC', logo: 'terraform', logoColor: 'white', skillSlug: 'terraform' },
  { id: 'nginx', name: 'Nginx', category: 'devops', color: '009639', logo: 'nginx', logoColor: 'white', skillSlug: 'nginx' },
  { id: 'linux', name: 'Linux', category: 'devops', color: 'FCC624', logo: 'linux', logoColor: 'black', skillSlug: 'linux' },

  // --- TOOLS & AI ---
  { id: 'git', name: 'Git', category: 'tools', color: 'F05032', logo: 'git', logoColor: 'white', skillSlug: 'git' },
  { id: 'github', name: 'GitHub', category: 'tools', color: '181717', logo: 'github', logoColor: 'white', skillSlug: 'github' },
  { id: 'figma', name: 'Figma', category: 'tools', color: 'F24E1E', logo: 'figma', logoColor: 'white', skillSlug: 'figma' },
  { id: 'postman', name: 'Postman', category: 'tools', color: 'FF6C37', logo: 'postman', logoColor: 'white', skillSlug: 'postman' },
  { id: 'jest', name: 'Jest', category: 'tools', color: 'C21325', logo: 'jest', logoColor: 'white', skillSlug: 'jest' },
  { id: 'vitest', name: 'Vitest', category: 'tools', color: '6E9F18', logo: 'vitest', logoColor: 'white', skillSlug: 'vitest' },
  { id: 'pytorch', name: 'PyTorch', category: 'tools', color: 'EE4C2C', logo: 'pytorch', logoColor: 'white', skillSlug: 'pytorch' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'tools', color: 'FF6F00', logo: 'tensorflow', logoColor: 'white', skillSlug: 'tensorflow' }
];

function getBadgeUrl(item, style = 'for-the-badge') {
  const encodedName = encodeURIComponent(item.name.replace(/-/g, '--'));
  return `https://img.shields.io/badge/${encodedName}-${item.color}?style=${style}&logo=${item.logo}&logoColor=${item.logoColor}`;
}

function getSkillIconsUrl(techIds, theme = 'dark') {
  const slugs = techIds
    .map(id => TECH_CATALOG.find(t => t.id === id)?.skillSlug)
    .filter(Boolean);
  
  if (slugs.length === 0) return null;
  return `https://skillicons.dev/icons?i=${slugs.join(',')}&theme=${theme}`;
}


/**
 * Readmify - Standard Modular Sections Definition
 */

const SECTION_TYPES = {
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

const INITIAL_SECTIONS = [
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


/**
 * Readmify - Pre-made Templates
 * 7 Curated starters for different project categories
 */

const TEMPLATES = [
  {
    id: 'fullstack',
    name: 'Fullstack SaaS / Web App',
    icon: '??',
    description: 'Hero, Live Demo, Features, Tech Stack, Env Vars, Quickstart, Deployment',
    sections: [
      {
        id: 'sec-hero',
        type: SECTION_TYPES.HERO,
        title: 'Header & Title',
        enabled: true,
        data: {
          projectName: 'HyperScale App',
          tagline: 'The modern real-time analytics platform built for high-growth engineering teams.',
          align: 'center',
          logoUrl: 'https://raw.githubusercontent.com/username/repo/main/logo.png',
          showLogo: false,
          repoOwner: 'acme-corp',
          repoName: 'hyperscale-app'
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
          customBadges: [{ label: 'Status', message: 'Active', color: 'success', logo: 'statuspage' }]
        }
      },
      {
        id: 'sec-about',
        type: SECTION_TYPES.ABOUT,
        title: 'About the Project',
        enabled: true,
        data: {
          heading: 'About The Project',
          content: 'HyperScale is a cloud-native monitoring platform that collects and synthesizes distributed metrics in real time. It provides microsecond insights and automated anomaly alerts with zero configuration.'
        }
      },
      {
        id: 'sec-tech',
        type: SECTION_TYPES.TECH_STACK,
        title: 'Built With',
        enabled: true,
        data: {
          heading: 'Built With',
          style: 'for-the-badge',
          technologies: ['nextjs', 'typescript', 'tailwind', 'nodejs', 'postgres', 'redis', 'docker']
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
            { icon: '?', title: 'Sub-millisecond latency', desc: 'Real-time ingestion pipeline handling millions of events per second.' },
            { icon: '??', title: 'Enterprise-grade Security', desc: 'End-to-end encryption, SOC2 compliant audit logs, and role-based access control.' },
            { icon: '??', title: 'Interactive Dashboards', desc: 'Drill-down visualizations and customizable widgets for developer telemetry.' }
          ]
        }
      },
      {
        id: 'sec-demo',
        type: SECTION_TYPES.DEMO,
        title: 'Live Demo',
        enabled: true,
        data: {
          heading: 'Live Demo',
          imageUrl: 'https://raw.githubusercontent.com/username/repo/main/preview.png',
          caption: 'Interactive Dashboard Preview',
          liveUrl: 'https://hyperscale.demo.dev'
        }
      },
      {
        id: 'sec-install',
        type: SECTION_TYPES.INSTALLATION,
        title: 'Getting Started',
        enabled: true,
        data: {
          heading: 'Getting Started',
          prerequisites: 'Node.js 18+ and Docker installed.',
          packageManager: 'pnpm',
          steps: [
            { title: 'Clone the repo', cmd: 'git clone https://github.com/acme-corp/hyperscale-app.git' },
            { title: 'Install dependencies', cmd: 'pnpm install' },
            { title: 'Spin up database', cmd: 'docker compose up -d' },
            { title: 'Run the development server', cmd: 'pnpm run dev' }
          ]
        }
      },
      {
        id: 'sec-env',
        type: SECTION_TYPES.ENV_VARS,
        title: 'Environment Variables',
        enabled: true,
        data: {
          heading: 'Environment Variables',
          variables: [
            { key: 'DATABASE_URL', desc: 'PostgreSQL connection string', default: 'postgresql://postgres:pass@localhost:5432/db', required: true },
            { key: 'REDIS_URL', desc: 'Redis host string', default: 'redis://localhost:6379', required: false },
            { key: 'NEXTAUTH_SECRET', desc: 'Encryption key for session tokens', default: '', required: true }
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
          year: '2026',
          holder: 'Acme Corporation'
        }
      }
    ]
  },
  {
    id: 'library',
    name: 'NPM / Developer Library',
    icon: '??',
    description: 'Installation, Usage Code Examples, API Reference, Benchmarks, TypeScript types',
    sections: [
      {
        id: 'sec-hero',
        type: SECTION_TYPES.HERO,
        title: 'Header & Title',
        enabled: true,
        data: {
          projectName: 'fast-cache-ts',
          tagline: 'Ultra-lightweight, in-memory LRU cache with TTL support and TypeScript generics.',
          align: 'left',
          showLogo: false,
          repoOwner: 'devtools',
          repoName: 'fast-cache-ts'
        }
      },
      {
        id: 'sec-badges',
        type: SECTION_TYPES.BADGES,
        title: 'Badges',
        enabled: true,
        data: {
          style: 'flat-square',
          showStars: true,
          showForks: false,
          showIssues: true,
          showLicense: true,
          showRelease: true,
          showLastCommit: true,
          customBadges: [
            { label: 'npm', message: 'v2.1.0', color: 'CB3837', logo: 'npm' },
            { label: 'coverage', message: '99%', color: 'brightgreen', logo: 'jest' }
          ]
        }
      },
      {
        id: 'sec-about',
        type: SECTION_TYPES.ABOUT,
        title: 'Overview',
        enabled: true,
        data: {
          heading: 'Overview',
          content: '`fast-cache-ts` is a zero-dependency LRU cache optimized for V8 engine execution. It boasts 3x faster get/set operations compared to traditional cache maps and is fully typed.'
        }
      },
      {
        id: 'sec-install',
        type: SECTION_TYPES.INSTALLATION,
        title: 'Installation',
        enabled: true,
        data: {
          heading: 'Installation',
          prerequisites: 'Node.js 16+ or Bun/Deno.',
          packageManager: 'npm',
          steps: [
            { title: 'Install via npm', cmd: 'npm install fast-cache-ts' },
            { title: 'Or via pnpm', cmd: 'pnpm add fast-cache-ts' }
          ]
        }
      },
      {
        id: 'sec-usage',
        type: SECTION_TYPES.USAGE,
        title: 'Quickstart & Examples',
        enabled: true,
        data: {
          heading: 'Quickstart',
          codeLang: 'typescript',
          code: 'import { FastCache } from \'fast-cache-ts\';\n\n// Create a cache with max 500 items and 60s TTL\nconst cache = new FastCache<string, number>({\n  maxSize: 500,\n  ttlMs: 60_000\n});\n\ncache.set(\'score\', 100);\nconsole.log(cache.get(\'score\')); // 100',
          note: 'Supports automatic expiration, eviction callbacks, and custom hash functions.'
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
          year: '2026',
          holder: 'FastCache Contributors'
        }
      }
    ]
  },
  {
    id: 'cli',
    name: 'CLI Tool / Terminal App',
    icon: '?',
    description: 'Terminal demo, curl/brew install, command flags table, examples',
    sections: [
      {
        id: 'sec-hero',
        type: SECTION_TYPES.HERO,
        title: 'Header & Title',
        enabled: true,
        data: {
          projectName: 'git-ship',
          tagline: 'One command to squash, sign, tag, and publish your Git releases effortlessly.',
          align: 'center',
          showLogo: false,
          repoOwner: 'ship-tools',
          repoName: 'git-ship'
        }
      },
      {
        id: 'sec-badges',
        type: SECTION_TYPES.BADGES,
        title: 'Badges',
        enabled: true,
        data: {
          style: 'for-the-badge',
          showStars: true,
          showForks: true,
          showIssues: true,
          showLicense: true,
          showRelease: true,
          showLastCommit: false,
          customBadges: [{ label: 'Brew', message: 'v1.4.0', color: 'orange', logo: 'homebrew' }]
        }
      },
      {
        id: 'sec-tech',
        type: SECTION_TYPES.TECH_STACK,
        title: 'Built With',
        enabled: true,
        data: {
          heading: 'Built With',
          style: 'for-the-badge',
          technologies: ['rust', 'shell', 'git', 'githubactions']
        }
      },
      {
        id: 'sec-install',
        type: SECTION_TYPES.INSTALLATION,
        title: 'Installation',
        enabled: true,
        data: {
          heading: 'Installation',
          prerequisites: 'Git installed.',
          packageManager: 'curl',
          steps: [
            { title: 'Install via Homebrew (macOS/Linux)', cmd: 'brew install git-ship' },
            { title: 'Or install via Cargo', cmd: 'cargo install git-ship' },
            { title: 'Or via Shell Script', cmd: 'curl -fsSL https://git-ship.sh/install | sh' }
          ]
        }
      },
      {
        id: 'sec-usage',
        type: SECTION_TYPES.USAGE,
        title: 'Commands & Flags',
        enabled: true,
        data: {
          heading: 'Usage',
          codeLang: 'bash',
          code: '# Ship a minor version release\ngit ship --minor\n\n# Ship a patch with custom changelog\ngit ship --patch --notes "Hotfix for auth bug"\n\n# Dry run without pushing\ngit ship --dry-run',
          note: 'Run `git ship --help` to view all available interactive prompt options.'
        }
      },
      {
        id: 'sec-license',
        type: SECTION_TYPES.LICENSE,
        title: 'License',
        enabled: true,
        data: {
          heading: 'License',
          type: 'Apache-2.0',
          year: '2026',
          holder: 'Git Ship Developers'
        }
      }
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile App (iOS / Android)',
    icon: '??',
    description: 'App Store / Play Store badges, feature showcase, screenshots, build guide',
    sections: [
      {
        id: 'sec-hero',
        type: SECTION_TYPES.HERO,
        title: 'Header & Title',
        enabled: true,
        data: {
          projectName: 'FitFlow Mobile',
          tagline: 'Track workouts, sync with wearables, and crush your daily fitness goals.',
          align: 'center',
          showLogo: false,
          repoOwner: 'fitflow-app',
          repoName: 'fitflow-mobile'
        }
      },
      {
        id: 'sec-tech',
        type: SECTION_TYPES.TECH_STACK,
        title: 'Built With',
        enabled: true,
        data: {
          heading: 'Built With',
          style: 'for-the-badge',
          technologies: ['flutter', 'dart', 'firebase', 'sqlite', 'swift', 'kotlin']
        }
      },
      {
        id: 'sec-features',
        type: SECTION_TYPES.FEATURES,
        title: 'Features',
        enabled: true,
        data: {
          heading: 'Features',
          items: [
            { icon: '?', title: 'Apple Watch & WearOS Sync', desc: 'Seamless Bluetooth sync with heart rate and step counter sensors.' },
            { icon: '??', title: 'Offline-First Architecture', desc: 'Full workout tracking capabilities even with no internet connection.' },
            { icon: '??', title: 'Progress Graphs', desc: 'Interactive charts showing PRs, volume, and weekly trends.' }
          ]
        }
      },
      {
        id: 'sec-install',
        type: SECTION_TYPES.INSTALLATION,
        title: 'Local Build Instructions',
        enabled: true,
        data: {
          heading: 'Running Locally',
          prerequisites: 'Flutter SDK 3.x and Android Studio / Xcode installed.',
          packageManager: 'flutter',
          steps: [
            { title: 'Fetch packages', cmd: 'flutter pub get' },
            { title: 'Run on connected device/simulator', cmd: 'flutter run' }
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
          type: 'GPL-3.0',
          year: '2026',
          holder: 'FitFlow Team'
        }
      }
    ]
  },
  {
    id: 'student',
    name: 'Student / Hackathon Project',
    icon: '??',
    description: 'Problem statement, solution, demo video, team members, architecture',
    sections: [
      {
        id: 'sec-hero',
        type: SECTION_TYPES.HERO,
        title: 'Header & Title',
        enabled: true,
        data: {
          projectName: 'EcoSort AI',
          tagline: 'AI-powered smart recycling assistant designed at HackNation 2026.',
          align: 'center',
          showLogo: false,
          repoOwner: 'hacknation-team',
          repoName: 'ecosort-ai'
        }
      },
      {
        id: 'sec-about',
        type: SECTION_TYPES.ABOUT,
        title: 'Problem & Solution',
        enabled: true,
        data: {
          heading: 'Inspiration & Problem',
          content: 'Over 60% of recyclable material ends up in landfills because consumers are unsure which bin to use. EcoSort uses computer vision on your smartphone camera to classify items in under 200ms and display local recycling municipal rules.'
        }
      },
      {
        id: 'sec-tech',
        type: SECTION_TYPES.TECH_STACK,
        title: 'Tech Stack',
        enabled: true,
        data: {
          heading: 'Tech Stack',
          style: 'for-the-badge',
          technologies: ['python', 'pytorch', 'fastapi', 'react', 'tailwind', 'vercel']
        }
      },
      {
        id: 'sec-features',
        type: SECTION_TYPES.FEATURES,
        title: 'Accomplishments',
        enabled: true,
        data: {
          heading: 'What We Accomplished',
          items: [
            { icon: '??', title: '1st Place Sustainability Track', desc: 'Awarded top prize among 80+ participating collegiate teams.' },
            { icon: '??', title: '94% Image Accuracy', desc: 'Fine-tuned MobileNetV3 model on 15,000 community waste photos.' },
            { icon: '??', title: 'Built in 36 Hours', desc: 'Complete end-to-end prototype deployed to production during the hackathon.' }
          ]
        }
      },
      {
        id: 'sec-author',
        type: SECTION_TYPES.AUTHOR,
        title: 'The Team',
        enabled: true,
        data: {
          heading: 'The Team',
          name: 'The EcoSort Creators',
          github: 'hacknation-team',
          twitter: '',
          linkedin: '',
          email: 'team@ecosort.dev',
          buyMeACoffee: ''
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
          year: '2026',
          holder: 'EcoSort Team'
        }
      }
    ]
  },
  {
    id: 'profile',
    name: 'GitHub Profile README',
    icon: '??',
    description: 'Personal bio, skill badges, dynamic GitHub stats cards, social links',
    sections: [
      {
        id: 'sec-hero',
        type: SECTION_TYPES.HERO,
        title: 'Header & Title',
        enabled: true,
        data: {
          projectName: 'Hi there, I\'m Alex ??',
          tagline: 'Passionate Fullstack Developer & Open Source Enthusiast based in San Francisco, CA.',
          align: 'center',
          showLogo: false,
          repoOwner: 'alexdev',
          repoName: 'alexdev'
        }
      },
      {
        id: 'sec-about',
        type: SECTION_TYPES.ABOUT,
        title: 'About Me',
        enabled: true,
        data: {
          heading: 'About Me',
          content: '- ?? Currently working on developer tooling and high-throughput web APIs\n- ?? Learning Rust and distributed systems\n- ?? Ask me about React, Node.js, and Cloud Infrastructure\n- ?? Reach out to me: `alex@example.com`\n- ? Fun fact: I brew my own specialty pour-over coffee ?'
        }
      },
      {
        id: 'sec-tech',
        type: SECTION_TYPES.TECH_STACK,
        title: 'Languages & Tools',
        enabled: true,
        data: {
          heading: 'Languages & Tools',
          style: 'for-the-badge',
          technologies: ['typescript', 'javascript', 'python', 'rust', 'react', 'nextjs', 'nodejs', 'postgres', 'docker', 'aws']
        }
      },
      {
        id: 'sec-custom-stats',
        type: SECTION_TYPES.CUSTOM,
        title: 'GitHub Stats Cards',
        enabled: true,
        data: {
          heading: '?? GitHub Stats',
          markdown: '<div align="center">\n  <img src="https://github-readme-stats.vercel.app/api?username=yourusername&show_icons=true&theme=radical" alt="GitHub Stats" />\n  <br/>\n  <img src="https://github-readme-streak-stats.herokuapp.com/?user=yourusername&theme=radical" alt="GitHub Streak" />\n</div>'
        }
      },
      {
        id: 'sec-author',
        type: SECTION_TYPES.AUTHOR,
        title: 'Connect With Me',
        enabled: true,
        data: {
          heading: 'Connect With Me',
          name: 'Alex Dev',
          github: 'alexdev',
          twitter: 'alex_dev',
          linkedin: 'alex-developer',
          email: 'alex@example.com',
          buyMeACoffee: 'alexdev'
        }
      }
    ]
  },
  {
    id: 'ai',
    name: 'AI / Machine Learning Project',
    icon: '??',
    description: 'Model architecture, dataset overview, GPU requirements, setup notebook, inference',
    sections: [
      {
        id: 'sec-hero',
        type: SECTION_TYPES.HERO,
        title: 'Header & Title',
        enabled: true,
        data: {
          projectName: 'NeuralVision-LLM',
          tagline: 'Lightweight multi-modal transformer for high-accuracy document extraction on edge devices.',
          align: 'center',
          showLogo: false,
          repoOwner: 'open-ai-lab',
          repoName: 'neuralvision-llm'
        }
      },
      {
        id: 'sec-badges',
        type: SECTION_TYPES.BADGES,
        title: 'Badges',
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
            { label: 'HuggingFace', message: 'Models', color: 'FFD21E', logo: 'huggingface' }
          ]
        }
      },
      {
        id: 'sec-tech',
        type: SECTION_TYPES.TECH_STACK,
        title: 'Built With',
        enabled: true,
        data: {
          heading: 'Built With',
          style: 'for-the-badge',
          technologies: ['python', 'pytorch', 'huggingface', 'fastapi', 'docker']
        }
      },
      {
        id: 'sec-install',
        type: SECTION_TYPES.INSTALLATION,
        title: 'Installation & Setup',
        enabled: true,
        data: {
          heading: 'Installation',
          prerequisites: 'Python 3.10+ and CUDA 12.0 compatible GPU (optional for CPU inference).',
          packageManager: 'pip',
          steps: [
            { title: 'Create virtual environment', cmd: 'python -m venv venv && source venv/bin/activate' },
            { title: 'Install dependencies', cmd: 'pip install -r requirements.txt' },
            { title: 'Download model weights', cmd: 'python scripts/download_weights.py --model 7b-quantized' }
          ]
        }
      },
      {
        id: 'sec-usage',
        type: SECTION_TYPES.USAGE,
        title: 'Inference Example',
        enabled: true,
        data: {
          heading: 'Quick Inference',
          codeLang: 'python',
          code: 'from neuralvision import VisionModel\n\nmodel = VisionModel.from_pretrained("open-ai-lab/neuralvision-7b")\nresult = model.extract_document("sample_receipt.jpg")\n\nprint(result.to_json(indent=2))',
          note: 'Benchmark: ~140ms per invoice image on an NVIDIA RTX 4090.'
        }
      },
      {
        id: 'sec-license',
        type: SECTION_TYPES.LICENSE,
        title: 'License',
        enabled: true,
        data: {
          heading: 'License',
          type: 'Apache-2.0',
          year: '2026',
          holder: 'NeuralVision Open Source'
        }
      }
    ]
  }
];


/**
 * Readmify - GitHub Public API Service
 * Free, zero-auth public repository and language detection
 */

const GITHUB_TO_TECH_MAP = {
  'typescript': { id: 'typescript', skill: 'ts' },
  'javascript': { id: 'javascript', skill: 'js' },
  'python': { id: 'python', skill: 'py' },
  'rust': { id: 'rust', skill: 'rust' },
  'go': { id: 'go', skill: 'go' },
  'java': { id: 'java', skill: 'java' },
  'c++': { id: 'cpp', skill: 'cpp' },
  'c': { id: 'c', skill: 'c' },
  'c#': { id: 'csharp', skill: 'cs' },
  'php': { id: 'php', skill: 'php' },
  'swift': { id: 'swift', skill: 'swift' },
  'kotlin': { id: 'kotlin', skill: 'kotlin' },
  'dart': { id: 'dart', skill: 'dart' },
  'ruby': { id: 'ruby', skill: 'ruby' },
  'html': { id: 'html5', skill: 'html' },
  'css': { id: 'css3', skill: 'css' },
  'scss': { id: 'sass', skill: 'sass' },
  'shell': { id: 'shell', skill: 'bash' },
  'vue': { id: 'vue', skill: 'vue' },
  'svelte': { id: 'svelte', skill: 'svelte' },
  'solidity': { id: 'solidity', skill: 'solidity' },
  'elixir': { id: 'elixir', skill: 'elixir' },
  'lua': { id: 'lua', skill: 'lua' },
  'r': { id: 'r', skill: 'r' },
  'scala': { id: 'scala', skill: 'scala' },
  'dockerfile': { id: 'docker', skill: 'docker' }
};

function parseGitHubRepoInput(input) {
  if (!input || typeof input !== 'string') return null;
  const clean = input.trim().replace(/\/$/, '');

  // Format: https://github.com/owner/repo or http://...
  const urlMatch = clean.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/);
  if (urlMatch) {
    return { owner: urlMatch[1], repo: urlMatch[2].replace(/\.git$/, '') };
  }

  // Format: owner/repo
  const slashMatch = clean.match(/^([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)$/);
  if (slashMatch) {
    return { owner: slashMatch[1], repo: slashMatch[2].replace(/\.git$/, '') };
  }

  return null;
}

async function fetchGitHubRepoDetails(owner, repo) {
  try {
    const [repoRes, langRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`),
      fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`)
    ]);

    if (!repoRes.ok) {
      if (repoRes.status === 404) {
        throw new Error(`Repository "${owner}/${repo}" was not found or is private.`);
      } else if (repoRes.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again in a few minutes.');
      }
      throw new Error(`GitHub API returned status ${repoRes.status}`);
    }

    const repoData = await repoRes.json();
    const langData = langRes.ok ? await langRes.json() : {};

    // Calculate language percentages
    const totalBytes = Object.values(langData).reduce((a, b) => a + b, 0);
    const languages = [];
    const matchedTechIds = [];
    const skillSlugs = [];

    for (const [langName, bytes] of Object.entries(langData)) {
      const pct = totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0;
      languages.push({ name: langName, bytes, percentage: pct });

      const mapped = GITHUB_TO_TECH_MAP[langName.toLowerCase()];
      if (mapped) {
        matchedTechIds.push(mapped.id);
        if (mapped.skill) skillSlugs.push(mapped.skill);
      }
    }

    return {
      owner: repoData.owner?.login || owner,
      repo: repoData.name || repo,
      description: repoData.description || '',
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks_count || 0,
      openIssues: repoData.open_issues_count || 0,
      license: repoData.license?.spdx_id || repoData.license?.name || 'MIT',
      topics: repoData.topics || [],
      defaultBranch: repoData.default_branch || 'main',
      homepage: repoData.homepage || '',
      languages,
      matchedTechIds,
      skillSlugs
    };
  } catch (err) {
    console.error('Failed to fetch from GitHub API:', err);
    throw err;
  }
}


/**
 * Readmify - Export & Notification Utilities
 */

async function copyToClipboard(text, successMessage = 'README copied to clipboard!') {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers or insecure origins
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    showToast(successMessage, 'success');
    fireConfetti();
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    showToast('Failed to copy to clipboard', 'error');
    return false;
  }
}

function downloadReadmeFile(content, filename = 'README.md') {
  try {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('README.md downloaded successfully!', 'success');
    fireConfetti();
  } catch (err) {
    console.error('Download failed: ', err);
    showToast('Download failed. Please try copying markdown instead.', 'error');
  }
}

function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('readmify-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'readmify-toast-container';
    toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const icon = type === 'success' ? '?' : type === 'error' ? '?' : '??';
  const borderCol = type === 'success' ? 'border-emerald-500/50 text-emerald-300' : type === 'error' ? 'border-rose-500/50 text-rose-300' : 'border-indigo-500/50 text-indigo-300';

  toast.className = `flex items-center gap-3 px-4 py-3 bg-slate-900/95 border ${borderCol} rounded-xl shadow-2xl backdrop-blur-md text-sm font-medium transition-all duration-300 transform translate-y-4 opacity-0 pointer-events-auto`;
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function fireConfetti() {
  if (typeof window.confetti === 'function') {
    window.confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B']
    });
  }
}


/**
 * Readmify - Markdown Generator Engine
 * Converts the structured sections state into clean GitHub Flavored Markdown
 * Supports SkillIcons, Shields.io, GitHub Stats, Contributors, and Star History
 */

function generateMarkdown(sections) {
  if (!sections || !Array.isArray(sections)) return '';

  const chunks = [];
  const heroSection = sections.find(s => s.type === SECTION_TYPES.HERO && s.enabled);
  const repoOwner = heroSection?.data?.repoOwner || 'yourusername';
  const repoName = heroSection?.data?.repoName || 'your-repo';

  for (const section of sections) {
    if (!section.enabled) continue;

    const md = generateSectionMarkdown(section, { repoOwner, repoName });
    if (md && md.trim().length > 0) {
      chunks.push(md.trim());
    }
  }

  return chunks.join('\n\n') + '\n';
}

function generateSectionMarkdown(section, context) {
  const { type, data } = section;
  const { repoOwner, repoName } = context;

  switch (type) {
    case SECTION_TYPES.HERO: {
      const isCentered = data.align === 'center';
      const logoTag = data.showLogo && data.logoUrl
        ? `<img src="${data.logoUrl}" alt="${data.projectName} Banner" width="100%" style="border-radius: 8px; margin-bottom: 1rem;" />\n  <br/>`
        : '';

      if (isCentered) {
        return `<div align="center">
  ${logoTag}
  <h1>${data.projectName || 'Project Title'}</h1>
  <p>${data.tagline || ''}</p>
</div>`;
      } else {
        const logo = data.showLogo && data.logoUrl ? `![Banner](${data.logoUrl})\n\n` : '';
        return `${logo}# ${data.projectName || 'Project Title'}\n\n> ${data.tagline || ''}`;
      }
    }

    case SECTION_TYPES.BADGES: {
      const style = data.style || 'for-the-badge';
      const badges = [];

      if (data.showStars) {
        badges.push(`[![GitHub Stars](https://img.shields.io/github/stars/${repoOwner}/${repoName}?style=${style})](https://github.com/${repoOwner}/${repoName}/stargazers)`);
      }
      if (data.showForks) {
        badges.push(`[![GitHub Forks](https://img.shields.io/github/forks/${repoOwner}/${repoName}?style=${style})](https://github.com/${repoOwner}/${repoName}/network/members)`);
      }
      if (data.showIssues) {
        badges.push(`[![GitHub Issues](https://img.shields.io/github/issues/${repoOwner}/${repoName}?style=${style})](https://github.com/${repoOwner}/${repoName}/issues)`);
      }
      if (data.showLicense) {
        badges.push(`[![GitHub License](https://img.shields.io/github/license/${repoOwner}/${repoName}?style=${style})](https://github.com/${repoOwner}/${repoName}/blob/main/LICENSE)`);
      }
      if (data.showRelease) {
        badges.push(`[![GitHub Release](https://img.shields.io/github/v/release/${repoOwner}/${repoName}?style=${style})](https://github.com/${repoOwner}/${repoName}/releases)`);
      }
      if (data.showLastCommit) {
        badges.push(`![GitHub Last Commit](https://img.shields.io/github/last-commit/${repoOwner}/${repoName}?style=${style})`);
      }

      if (Array.isArray(data.customBadges)) {
        for (const cb of data.customBadges) {
          if (!cb.label || !cb.message) continue;
          const logoPart = cb.logo ? `&logo=${encodeURIComponent(cb.logo)}` : '';
          const url = `https://img.shields.io/badge/${encodeURIComponent(cb.label)}-${encodeURIComponent(cb.message)}-${cb.color || 'blue'}?style=${style}${logoPart}`;
          badges.push(`![${cb.label}](${url})`);
        }
      }

      if (badges.length === 0) return '';
      return `<div align="center">\n  ${badges.join('  \n  ')}\n</div>`;
    }

    case SECTION_TYPES.ABOUT: {
      return `## ${data.heading || 'About The Project'}\n\n${data.content || ''}`;
    }

    case SECTION_TYPES.TECH_STACK: {
      const style = data.style || 'skillicons';
      const techIds = data.technologies || [];

      if (techIds.length === 0) {
        return `## ${data.heading || 'Built With'}\n\n*(No technologies selected yet)*`;
      }

      // 1. SkillIcons Style
      if (style === 'skillicons') {
        const skillUrl = getSkillIconsUrl(techIds, 'dark');
        if (skillUrl) {
          return `## ${data.heading || 'Built With'}\n\n<p align="center">\n  <a href="https://skillicons.dev">\n    <img src="${skillUrl}" alt="Tech Stack" />\n  </a>\n</p>`;
        }
      }

      // 2. GitHub Top Languages Card
      if (style === 'github-stats') {
        return `## ${data.heading || 'Languages & Tech'}\n\n<p align="center">\n  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${repoOwner}&repo=${repoName}&layout=compact&theme=radical" alt="Top Languages" />\n</p>`;
      }

      // 3. Devicon Logo Grid
      if (style === 'devicon-grid') {
        const items = techIds.map(id => TECH_CATALOG.find(t => t.id === id)).filter(Boolean);
        const rows = items.map(item => `  <img src="https://cdn.simpleicons.org/${item.logo}" alt="${item.name}" width="36" height="36" style="margin: 6px;" title="${item.name}" />`).join('\n');
        return `## ${data.heading || 'Built With'}\n\n<p align="center">\n${rows}\n</p>`;
      }

      // 4. Default: Shields.io Badges
      const items = techIds.map(id => TECH_CATALOG.find(t => t.id === id)).filter(Boolean);
      const badgeMarkdown = items.map(item => `![${item.name}](${getBadgeUrl(item, style)})`).join(' ');
      return `## ${data.heading || 'Built With'}\n\n${badgeMarkdown}`;
    }

    case SECTION_TYPES.FEATURES: {
      const items = data.items || [];
      if (items.length === 0) return '';
      const list = items.map(item => {
        const icon = item.icon ? `${item.icon} ` : '✨ ';
        return `- ${icon}**${item.title || ''}**: ${item.desc || ''}`;
      }).join('\n');

      return `## ${data.heading || 'Key Features'}\n\n${list}`;
    }

    case SECTION_TYPES.DEMO: {
      const caption = data.caption || 'Project Preview';
      const imageMd = data.imageUrl ? `![${caption}](${data.imageUrl})` : '';
      const linkMd = data.liveUrl ? `\n\n🔗 **Live Demo**: [${data.liveUrl}](${data.liveUrl})` : '';
      return `## ${data.heading || 'Preview & Screenshots'}\n\n${imageMd}${linkMd}`;
    }

    case SECTION_TYPES.INSTALLATION: {
      const lines = [`## ${data.heading || 'Getting Started'}`];
      if (data.prerequisites) {
        lines.push(`\n### Prerequisites\n\n${data.prerequisites}`);
      }
      lines.push('\n### Installation\n');

      if (Array.isArray(data.steps) && data.steps.length > 0) {
        data.steps.forEach((step, idx) => {
          lines.push(`${idx + 1}. **${step.title}**\n   \`\`\`bash\n   ${step.cmd}\n   \`\`\``);
        });
      }
      return lines.join('\n');
    }

    case SECTION_TYPES.ENV_VARS: {
      const vars = data.variables || [];
      if (vars.length === 0) return '';
      const rows = vars.map(v => `| \`${v.key}\` | ${v.desc || '-'} | \`${v.default || '-'}\` | ${v.required ? '✅ Yes' : '❌ No'} |`).join('\n');
      return `## ${data.heading || 'Environment Variables'}\n\n| Variable | Description | Default | Required |\n| :--- | :--- | :--- | :--- |\n${rows}`;
    }

    case SECTION_TYPES.USAGE: {
      const lang = data.codeLang || 'bash';
      const codeBlock = data.code ? `\`\`\`${lang}\n${data.code}\n\`\`\`` : '';
      const note = data.note ? `\n\n> [!NOTE]\n> ${data.note}` : '';
      return `## ${data.heading || 'Usage'}\n\n${codeBlock}${note}`;
    }

    case SECTION_TYPES.ROADMAP: {
      const tasks = data.tasks || [];
      if (tasks.length === 0) return '';
      const taskList = tasks.map(t => `- [${t.completed ? 'x' : ' '}] ${t.text}`).join('\n');
      return `## ${data.heading || 'Roadmap'}\n\n${taskList}`;
    }

    case SECTION_TYPES.CONTRIBUTING: {
      const guide = data.guidelines || 'Contributions are what make open source great!';
      const steps = (data.steps || []).map((s, i) => `${i + 1}. ${s}`).join('\n');
      const contribAvatars = `<p align="center">\n  <a href="https://github.com/${repoOwner}/${repoName}/graphs/contributors">\n    <img src="https://contrib.rocks/image?repo=${repoOwner}/${repoName}" alt="Contributors" />\n  </a>\n</p>`;
      return `## ${data.heading || 'Contributing'}\n\n${guide}\n\n${steps}\n\n${contribAvatars}`;
    }

    case SECTION_TYPES.LICENSE: {
      return `## ${data.heading || 'License'}\n\nDistributed under the ${data.type || 'MIT'} License. See \`LICENSE\` for more information.\n\nCopyright (c) ${data.year || '2026'} ${data.holder || 'Your Name'}`;
    }

    case SECTION_TYPES.AUTHOR: {
      const badges = [];
      if (data.github) {
        badges.push(`[![GitHub](https://img.shields.io/badge/GitHub-${encodeURIComponent(data.github)}-181717?style=flat&logo=github)](https://github.com/${data.github})`);
      }
      if (data.twitter) {
        badges.push(`[![Twitter](https://img.shields.io/badge/Twitter-${encodeURIComponent(data.twitter)}-1DA1F2?style=flat&logo=x)](https://twitter.com/${data.twitter})`);
      }
      if (data.linkedin) {
        badges.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-${encodeURIComponent(data.linkedin)}-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/${data.linkedin})`);
      }
      if (data.buyMeACoffee) {
        badges.push(`[![BuyMeACoffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=flat&logo=buymeacoffee&logoColor=black)](https://buymeacoffee.com/${data.buyMeACoffee})`);
      }

      const badgeStr = badges.length > 0 ? `\n\n${badges.join(' ')}` : '';
      const emailStr = data.email ? `\n\nEmail: [${data.email}](mailto:${data.email})` : '';

      return `## ${data.heading || 'Author & Acknowledgements'}\n\n**${data.name || 'Author'}**${emailStr}${badgeStr}`;
    }

    case SECTION_TYPES.CUSTOM: {
      return `## ${data.heading || 'Custom Section'}\n\n${data.markdown || ''}`;
    }

    default:
      return '';
  }
}


/**
 * Readmify - README Health & Quality Analyzer
 * Evaluates completeness and provides tips for open-source excellence
 */

function calculateReadmeScore(sections) {
  if (!sections || !Array.isArray(sections)) {
    return { score: 0, label: 'Empty', color: '#EF4444', tips: ['Start by configuring your project basics'] };
  }

  let score = 0;
  const tips = [];

  const enabledTypes = new Set(sections.filter(s => s.enabled).map(s => s.type));

  // 1. Title & Tagline
  const hero = sections.find(s => s.type === SECTION_TYPES.HERO && s.enabled);
  if (hero && hero.data?.projectName && hero.data?.projectName !== 'Project Title') {
    score += 15;
    if (!hero.data.tagline || hero.data.tagline.trim().length < 10) {
      tips.push('Add a concise tagline describing what your project does');
    }
  } else {
    tips.push('Add a clear project name in Header & Title');
  }

  // 2. Badges
  if (enabledTypes.has(SECTION_TYPES.BADGES)) {
    score += 10;
  } else {
    tips.push('Enable badges (Stars, License, Build) for social proof');
  }

  // 3. About
  const about = sections.find(s => s.type === SECTION_TYPES.ABOUT && s.enabled);
  if (about && about.data?.content && about.data.content.length > 20) {
    score += 15;
  } else {
    tips.push('Add an About section explaining the problem your project solves');
  }

  // 4. Tech Stack
  const tech = sections.find(s => s.type === SECTION_TYPES.TECH_STACK && s.enabled);
  if (tech && tech.data?.technologies && tech.data.technologies.length > 0) {
    score += 15;
  } else {
    tips.push('Select technologies in "Built With" to showcase your tech stack');
  }

  // 5. Features
  const features = sections.find(s => s.type === SECTION_TYPES.FEATURES && s.enabled);
  if (features && features.data?.items && features.data.items.length >= 2) {
    score += 15;
  } else {
    tips.push('Highlight 2 or more key features to attract users');
  }

  // 6. Installation & Quickstart
  const install = sections.find(s => s.type === SECTION_TYPES.INSTALLATION && s.enabled);
  if (install && install.data?.steps && install.data.steps.length > 0) {
    score += 15;
  } else {
    tips.push('Provide step-by-step Installation instructions');
  }

  // 7. License
  if (enabledTypes.has(SECTION_TYPES.LICENSE)) {
    score += 10;
  } else {
    tips.push('Add a License section to define open-source permissions');
  }

  // 8. Author or Contributing
  if (enabledTypes.has(SECTION_TYPES.AUTHOR) || enabledTypes.has(SECTION_TYPES.CONTRIBUTING)) {
    score += 10;
  } else {
    tips.push('Add Author or Contributing guidelines so people know who built it');
  }

  // Classification
  let label = 'Needs Work';
  let color = '#EF4444'; // red

  if (score >= 90) {
    label = 'Outstanding';
    color = '#10B981'; // emerald
  } else if (score >= 75) {
    label = 'Great';
    color = '#06B6D4'; // cyan
  } else if (score >= 50) {
    label = 'Good';
    color = '#F59E0B'; // amber
  }

  return {
    score: Math.min(score, 100),
    label,
    color,
    tips
  };
}


/**
 * Readmify - Central Reactive State Store
 * Manages section order, user edits, templates, and localStorage persistence
 */

const STORAGE_KEY = 'readmify_v1_state';

class ReadmifyStore {
  constructor() {
    this.listeners = new Set();
    this.state = this.loadInitialState();
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
            viewMode: parsed.viewMode || 'split'
          };
        }
      }
    } catch (e) {
      console.warn('Could not restore saved state from localStorage:', e);
    }

    return {
      sections: JSON.parse(JSON.stringify(INITIAL_SECTIONS)),
      activeSectionId: INITIAL_SECTIONS[0].id,
      previewTheme: 'dark',
      viewMode: 'split'
    };
  }

  saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not persist state to localStorage:', e);
    }
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.saveToStorage();
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (err) {
        console.error('Error in store listener:', err);
      }
    }
  }

  // --- ACTIONS ---

  setActiveSection(sectionId) {
    if (this.state.activeSectionId !== sectionId) {
      this.state.activeSectionId = sectionId;
      this.notify();
    }
  }

  setPreviewTheme(theme) {
    if (this.state.previewTheme !== theme) {
      this.state.previewTheme = theme;
      this.notify();
    }
  }

  setViewMode(viewMode) {
    if (this.state.viewMode !== viewMode) {
      this.state.viewMode = viewMode;
      this.notify();
    }
  }

  toggleSection(sectionId, enabled) {
    const section = this.state.sections.find(s => s.id === sectionId);
    if (section) {
      section.enabled = enabled !== undefined ? enabled : !section.enabled;
      this.notify();
    }
  }

  updateSectionData(sectionId, partialData) {
    const section = this.state.sections.find(s => s.id === sectionId);
    if (section) {
      section.data = { ...section.data, ...partialData };
      this.notify();
    }
  }

  moveSection(sectionId, direction) {
    const index = this.state.sections.findIndex(s => s.id === sectionId);
    if (index === -1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= this.state.sections.length) return;

    const [item] = this.state.sections.splice(index, 1);
    this.state.sections.splice(targetIndex, 0, item);
    this.notify();
  }

  reorderSections(fromIndex, toIndex) {
    if (fromIndex === toIndex) return;
    if (fromIndex < 0 || fromIndex >= this.state.sections.length) return;
    if (toIndex < 0 || toIndex >= this.state.sections.length) return;

    const [item] = this.state.sections.splice(fromIndex, 1);
    this.state.sections.splice(toIndex, 0, item);
    this.notify();
  }

  addCustomSection(title = 'Custom Section') {
    const newId = `sec-custom-${Date.now()}`;
    const newSection = {
      id: newId,
      type: SECTION_TYPES.CUSTOM,
      title: title || 'Custom Section',
      enabled: true,
      data: {
        heading: title || 'Custom Section',
        markdown: 'Add your custom documentation, diagrams, or notes here.'
      }
    };
    this.state.sections.push(newSection);
    this.state.activeSectionId = newId;
    this.notify();
    return newId;
  }

  removeSection(sectionId) {
    const idx = this.state.sections.findIndex(s => s.id === sectionId);
    if (idx !== -1) {
      this.state.sections.splice(idx, 1);
      if (this.state.activeSectionId === sectionId) {
        this.state.activeSectionId = this.state.sections[0]?.id || null;
      }
      this.notify();
    }
  }

  loadTemplate(templateId) {
    const tpl = TEMPLATES.find(t => t.id === templateId);
    if (tpl) {
      this.state.sections = JSON.parse(JSON.stringify(tpl.sections));
      this.state.activeSectionId = this.state.sections[0]?.id || null;
      this.notify();
    }
  }

  resetToDefault() {
    this.state.sections = JSON.parse(JSON.stringify(INITIAL_SECTIONS));
    this.state.activeSectionId = INITIAL_SECTIONS[0].id;
    this.notify();
  }

  // Update multiple sections (e.g. from wizard)
  batchUpdate(updaterFn) {
    updaterFn(this.state.sections);
    this.notify();
  }
}

const store = new ReadmifyStore();


/**
 * Readmify - Photo, Banner & Screenshot Hub (shadcn/ui style)
 * Local image uploader, curated developer banners, and multi-screenshot galleries
 */

const BANNER_PRESETS = [
  {
    id: 'minimal-grid',
    title: 'Minimal Dark Grid',
    category: 'Minimal',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'cyber-circuit',
    title: 'Cyber Circuit Glow',
    category: 'Cyberpunk',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'cosmic-mesh',
    title: 'Deep Cosmic Gradient',
    category: 'Gradients',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'modern-abstract',
    title: 'Modern Purple Wave',
    category: 'Abstract',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'terminal-code',
    title: 'Developer Terminal',
    category: 'Code',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80'
  },
  {
    id: 'blueprint',
    title: 'System Architecture',
    category: 'Tech',
    url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&auto=format&fit=crop&q=80'
  }
];

function renderPhotoModal(targetField = 'hero') {
  let modal = document.getElementById('photo-hub-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'photo-hub-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs hidden';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
      <!-- Modal Header -->
      <div class="px-5 py-3.5 border-b border-border flex items-center justify-between bg-card">
        <div>
          <h3 class="text-sm font-semibold text-foreground flex items-center gap-2">
            <span>🖼️</span> Photos, Banners & Screenshots
          </h3>
          <p class="text-[11px] text-muted-foreground mt-0.5">Choose a curated banner preset, or upload your own screenshots</p>
        </div>
        <button id="close-photo-modal-btn" class="p-1 text-muted-foreground hover:text-foreground text-xs">✕</button>
      </div>

      <!-- Tab Controls -->
      <div class="px-5 py-2.5 border-b border-border bg-background/50 flex gap-2">
        <button id="tab-banners-btn" class="px-3 py-1 text-xs font-medium rounded-md bg-primary text-primary-foreground shadow-xs">
          Banner Presets
        </button>
        <button id="tab-upload-btn" class="px-3 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground">
          Local Image Upload
        </button>
      </div>

      <!-- Tab Content Area -->
      <div class="p-5 overflow-y-auto flex-1 space-y-4 bg-background">
        <!-- BANNERS VIEW -->
        <div id="view-banners" class="space-y-3">
          <p class="text-xs text-muted-foreground">Select a high-resolution banner to automatically embed at the top of your project:</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${BANNER_PRESETS.map(preset => `
              <div class="banner-card group relative border border-border rounded-md overflow-hidden bg-card cursor-pointer hover:border-foreground/50 transition select-none" data-url="${preset.url}">
                <div class="h-24 w-full bg-cover bg-center" style="background-image: url('${preset.url}')"></div>
                <div class="p-2.5 flex items-center justify-between bg-card">
                  <span class="text-xs font-medium text-foreground">${preset.title}</span>
                  <span class="text-[10px] text-muted-foreground group-hover:text-foreground transition">Use Preset →</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- UPLOAD VIEW -->
        <div id="view-upload" class="hidden space-y-4">
          <p class="text-xs text-muted-foreground">Drag & drop an image or screenshot from your device:</p>
          <div id="drag-drop-zone" class="border-2 border-dashed border-border hover:border-zinc-500 rounded-lg p-8 text-center bg-card/40 cursor-pointer transition flex flex-col items-center justify-center gap-2">
            <span class="text-2xl">📸</span>
            <p class="text-xs font-medium text-foreground">Click to browse or drop an image file here</p>
            <p class="text-[11px] text-muted-foreground">Supports PNG, JPG, GIF, SVG, WebP</p>
            <input type="file" id="photo-file-input" accept="image/*" class="hidden" />
          </div>

          <div id="uploaded-preview-box" class="hidden p-3 bg-card border border-border rounded-md space-y-2">
            <span class="text-[11px] font-medium text-foreground">Image Loaded:</span>
            <img id="uploaded-img-preview" src="" class="max-h-40 rounded object-contain border border-border mx-auto" />
            <div class="flex justify-end gap-2 pt-2">
              <button id="apply-uploaded-hero-btn" class="btn-primary text-xs px-3 py-1.5">
                Set as Project Logo / Banner
              </button>
              <button id="apply-uploaded-demo-btn" class="btn-secondary text-xs px-3 py-1.5">
                Set as Preview Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  modal.querySelector('#close-photo-modal-btn').addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  // Tab switching
  const tabBannersBtn = modal.querySelector('#tab-banners-btn');
  const tabUploadBtn = modal.querySelector('#tab-upload-btn');
  const viewBanners = modal.querySelector('#view-banners');
  const viewUpload = modal.querySelector('#view-upload');

  tabBannersBtn.addEventListener('click', () => {
    tabBannersBtn.className = 'px-3 py-1 text-xs font-medium rounded-md bg-primary text-primary-foreground shadow-xs';
    tabUploadBtn.className = 'px-3 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground';
    viewBanners.classList.remove('hidden');
    viewUpload.classList.add('hidden');
  });

  tabUploadBtn.addEventListener('click', () => {
    tabUploadBtn.className = 'px-3 py-1 text-xs font-medium rounded-md bg-primary text-primary-foreground shadow-xs';
    tabBannersBtn.className = 'px-3 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground';
    viewUpload.classList.remove('hidden');
    viewBanners.classList.add('hidden');
  });

  // Preset Selection
  modal.querySelectorAll('.banner-card').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.url;
      applyBannerUrl(url, targetField);
      modal.classList.add('hidden');
      showToast('Banner applied successfully!', 'success');
    });
  });

  // File drop
  const dropZone = modal.querySelector('#drag-drop-zone');
  const fileInput = modal.querySelector('#photo-file-input');
  const previewBox = modal.querySelector('#uploaded-preview-box');
  const previewImg = modal.querySelector('#uploaded-img-preview');
  let loadedDataUrl = '';

  dropZone.addEventListener('click', () => fileInput.click());

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-zinc-400');
  });
  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-zinc-400');
  });
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-zinc-400');
    if (e.dataTransfer.files?.length > 0) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files?.length > 0) {
      handleImageFile(e.target.files[0]);
    }
  });

  function handleImageFile(file) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      loadedDataUrl = evt.target.result;
      previewImg.src = loadedDataUrl;
      previewBox.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }

  modal.querySelector('#apply-uploaded-hero-btn').addEventListener('click', () => {
    if (loadedDataUrl) {
      applyBannerUrl(loadedDataUrl, 'hero');
      modal.classList.add('hidden');
      showToast('Uploaded image set as Project Banner!', 'success');
    }
  });

  modal.querySelector('#apply-uploaded-demo-btn').addEventListener('click', () => {
    if (loadedDataUrl) {
      applyBannerUrl(loadedDataUrl, 'demo');
      modal.classList.add('hidden');
      showToast('Uploaded image set as Demo Preview!', 'success');
    }
  });
}

function applyBannerUrl(url, targetField) {
  if (targetField === 'demo') {
    const demoSec = store.getState().sections.find(s => s.type === SECTION_TYPES.DEMO);
    if (demoSec) {
      store.updateSectionData(demoSec.id, { imageUrl: url });
      store.toggleSection(demoSec.id, true);
    }
  } else {
    const heroSec = store.getState().sections.find(s => s.type === SECTION_TYPES.HERO);
    if (heroSec) {
      store.updateSectionData(heroSec.id, { logoUrl: url, showLogo: true });
    }
  }
}


/**
 * Readmify - Interactive Tech Stack Badge Picker Modal (shadcn/ui style)
 */

let currentCategory = 'all';
let searchQuery = '';

function renderTechPickerModal() {
  let modal = document.getElementById('tech-picker-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'tech-picker-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs hidden';
    modal.innerHTML = `
      <div class="bg-card border border-border rounded-lg w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        <!-- Modal Header -->
        <div class="px-5 py-3.5 border-b border-border flex items-center justify-between bg-card">
          <div>
            <h3 class="text-sm font-semibold text-foreground flex items-center gap-2">
              <span>🎨</span> Select Tech Stack & Badges
            </h3>
            <p class="text-[11px] text-muted-foreground mt-0.5">Choose from 130+ technologies with official brand logos & colors</p>
          </div>
          <button id="close-tech-picker-btn" class="p-1 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition text-xs">
            ✕
          </button>
        </div>

        <!-- Filter & Search Controls -->
        <div class="p-3 border-b border-border bg-background/50 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
          <div class="relative flex-1">
            <input 
              type="text" 
              id="tech-search-input" 
              placeholder="Filter technologies (e.g. React, Python, Docker)..." 
              class="form-input text-xs py-1.5"
            />
          </div>

          <div class="flex items-center gap-2">
            <label class="text-[11px] text-muted-foreground whitespace-nowrap">Style:</label>
            <select id="tech-badge-style-select" class="form-input text-xs py-1 px-2 h-8 w-auto">
              <option value="for-the-badge">for-the-badge (Bold)</option>
              <option value="flat">flat (Clean)</option>
              <option value="flat-square">flat-square (Modern)</option>
              <option value="plastic">plastic (Classic)</option>
            </select>
          </div>
        </div>

        <!-- Category Pills -->
        <div class="px-5 py-2 border-b border-border flex gap-1.5 overflow-x-auto bg-card/50 no-scrollbar">
          ${TECH_CATEGORIES.map(cat => `
            <button 
              class="tech-cat-btn px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all ${cat.id === 'all' ? 'bg-primary text-primary-foreground shadow-xs' : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-accent'}" 
              data-category="${cat.id}">
              ${cat.name}
            </button>
          `).join('')}
        </div>

        <!-- Tech Grid -->
        <div id="tech-items-grid" class="flex-1 p-5 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 bg-background">
          <!-- Populated dynamically -->
        </div>

        <!-- Modal Footer -->
        <div class="px-5 py-3 border-t border-border bg-card flex items-center justify-between">
          <div class="text-xs text-muted-foreground">
            <span id="tech-selected-count" class="font-medium text-foreground">0</span> technologies selected
          </div>
          <button id="apply-tech-picker-btn" class="btn-primary text-xs px-3.5 py-1.5">
            Apply Selection
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#close-tech-picker-btn')?.addEventListener('click', closeTechPicker);
    modal.querySelector('#apply-tech-picker-btn')?.addEventListener('click', closeTechPicker);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeTechPicker();
    });

    const searchInput = modal.querySelector('#tech-search-input');
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      updateTechGrid();
    });

    const styleSelect = modal.querySelector('#tech-badge-style-select');
    styleSelect.addEventListener('change', (e) => {
      const techSec = store.getState().sections.find(s => s.type === SECTION_TYPES.TECH_STACK);
      if (techSec) {
        store.updateSectionData(techSec.id, { style: e.target.value });
        updateTechGrid();
      }
    });

    modal.querySelectorAll('.tech-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modal.querySelectorAll('.tech-cat-btn').forEach(b => {
          b.className = 'tech-cat-btn px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all bg-muted text-muted-foreground hover:text-foreground hover:bg-accent';
        });
        btn.className = 'tech-cat-btn px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-all bg-primary text-primary-foreground shadow-xs';
        currentCategory = btn.dataset.category;
        updateTechGrid();
      });
    });
  }

  updateTechGrid();
  modal.classList.remove('hidden');
}

function closeTechPicker() {
  const modal = document.getElementById('tech-picker-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function updateTechGrid() {
  const grid = document.getElementById('tech-items-grid');
  if (!grid) return;

  const techSec = store.getState().sections.find(s => s.type === SECTION_TYPES.TECH_STACK);
  const selectedTechs = new Set(techSec?.data?.technologies || []);
  const style = techSec?.data?.style || 'for-the-badge';

  const styleSelect = document.getElementById('tech-badge-style-select');
  if (styleSelect && techSec?.data?.style) {
    styleSelect.value = techSec.data.style;
  }

  const selectedCountEl = document.getElementById('tech-selected-count');
  if (selectedCountEl) {
    selectedCountEl.textContent = selectedTechs.size;
  }

  const filtered = TECH_CATALOG.filter(item => {
    const matchCategory = currentCategory === 'all' || item.category === currentCategory;
    const matchSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery) || item.id.includes(searchQuery);
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-10 text-center text-muted-foreground text-xs">
        No technologies found matching "${searchQuery}"
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const isSelected = selectedTechs.has(item.id);
    const badgeUrl = getBadgeUrl(item, style);

    return `
      <div 
        class="tech-card p-2.5 rounded-md border transition-all cursor-pointer flex flex-col justify-between gap-2 select-none ${
          isSelected 
            ? 'bg-muted border-foreground/60 shadow-xs ring-1 ring-ring' 
            : 'bg-card border-border hover:border-zinc-700 hover:bg-muted/50'
        }"
        data-tech-id="${item.id}"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-medium text-foreground truncate">${item.name}</span>
          <span class="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
            isSelected ? 'bg-primary text-primary-foreground font-bold' : 'border border-border text-transparent'
          }">✓</span>
        </div>
        <div class="h-5 flex items-center overflow-hidden">
          <img src="${badgeUrl}" alt="${item.name}" class="h-4 object-contain pointer-events-none" loading="lazy" />
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.tech-card').forEach(card => {
    card.addEventListener('click', () => {
      const techId = card.dataset.techId;
      toggleTechItem(techId);
    });
  });
}

function toggleTechItem(techId) {
  const techSec = store.getState().sections.find(s => s.type === SECTION_TYPES.TECH_STACK);
  if (!techSec) return;

  const currentList = [...(techSec.data.technologies || [])];
  const idx = currentList.indexOf(techId);

  if (idx !== -1) {
    currentList.splice(idx, 1);
  } else {
    currentList.push(techId);
  }

  store.updateSectionData(techSec.id, { technologies: currentList });
  updateTechGrid();
}


/**
 * Readmify - Dynamic Section Form Editor (v2 with GitHub Auto-Detect & Multi-Style)
 */

function renderSectionEditor(container) {
  if (!container) return;

  const state = store.getState();
  const section = state.sections.find(s => s.id === state.activeSectionId);

  if (!section) {
    container.innerHTML = `
      <div class="p-8 text-center text-muted-foreground text-xs">
        Select a section from the sidebar to edit its content.
      </div>
    `;
    return;
  }

  const { type, data, title, id, enabled } = section;

  container.innerHTML = `
    <div class="p-5">
      <!-- Section Header -->
      <div class="flex items-center justify-between pb-3.5 mb-5 border-b border-border">
        <div>
          <div class="flex items-center gap-2">
            <h2 class="text-sm font-semibold text-foreground">${title}</h2>
            <span class="px-2 py-0.5 text-[10px] font-medium rounded-full ${enabled ? 'bg-muted text-foreground border border-border' : 'bg-muted/40 text-muted-foreground'}">
              ${enabled ? 'Active' : 'Disabled'}
            </span>
          </div>
          <p class="text-[11px] text-muted-foreground mt-0.5">Configure options and content for this section</p>
        </div>

        <div class="flex items-center gap-2">
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="toggle-section-enabled" class="sr-only peer" ${enabled ? 'checked' : ''}>
            <div class="w-8 h-4 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-zinc-900 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-700 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-foreground peer-checked:after:bg-zinc-950"></div>
          </label>
          ${type === SECTION_TYPES.CUSTOM ? `
            <button id="delete-custom-section-btn" class="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded transition" title="Delete section">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Form Body -->
      <div id="section-form-fields" class="space-y-4">
        ${renderFormFieldsByType(type, data, state)}
      </div>
    </div>
  `;

  const toggleBtn = container.querySelector('#toggle-section-enabled');
  if (toggleBtn) {
    toggleBtn.addEventListener('change', (e) => {
      store.toggleSection(id, e.target.checked);
    });
  }

  const deleteBtn = container.querySelector('#delete-custom-section-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      if (confirm(`Are you sure you want to remove "${title}"?`)) {
        store.removeSection(id);
      }
    });
  }

  attachFieldListeners(container, id, type, data);
}

function renderFormFieldsByType(type, data, state) {
  switch (type) {
    case SECTION_TYPES.HERO:
      return `
        <!-- GitHub Auto-Detect Banner -->
        <div class="p-3 bg-card border border-border rounded-lg space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <span>⚡</span> Free GitHub API Auto-Detect
            </span>
            <span class="text-[10px] text-muted-foreground">Zero auth required</span>
          </div>
          <div class="flex gap-2">
            <input type="text" id="github-autodetect-input" value="${data.repoOwner && data.repoName ? data.repoOwner + '/' + data.repoName : ''}" placeholder="Paste repo (e.g. facebook/react)" class="form-input text-xs flex-1" />
            <button id="trigger-autodetect-btn" class="btn-primary text-xs px-3 py-1.5 whitespace-nowrap">
              Fetch Info
            </button>
          </div>
          <p class="text-[11px] text-muted-foreground">Automatically pulls languages, stars, description, license & topics.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Project Name</label>
            <input type="text" data-field="projectName" value="${data.projectName || ''}" class="form-input" placeholder="e.g. Readmify" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Alignment</label>
            <select data-field="align" class="form-input">
              <option value="center" ${data.align === 'center' ? 'selected' : ''}>Centered (Modern)</option>
              <option value="left" ${data.align === 'left' ? 'selected' : ''}>Left-aligned (Classic)</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Tagline / Short Description</label>
          <input type="text" data-field="tagline" value="${data.tagline || ''}" class="form-input" placeholder="e.g. Craft stunning READMEs in minutes" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">GitHub Owner / Org</label>
            <input type="text" data-field="repoOwner" value="${data.repoOwner || ''}" class="form-input" placeholder="e.g. yourusername" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Repository Name</label>
            <input type="text" data-field="repoName" value="${data.repoName || ''}" class="form-input" placeholder="e.g. your-repo" />
          </div>
        </div>

        <!-- Banner / Photo Section -->
        <div class="p-3.5 bg-card border border-border rounded-md space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Project Banner / Header Image</label>
            <button id="open-banner-hub-btn" class="text-xs font-medium text-foreground hover:underline flex items-center gap-1">
              <span>🖼️</span> Pick Preset / Upload
            </button>
          </div>
          <input type="text" data-field="logoUrl" value="${data.logoUrl || ''}" class="form-input text-xs" placeholder="https://... image banner URL" />
          <div class="flex items-center gap-2">
            <input type="checkbox" id="show-logo-cb" data-field="showLogo" ${data.showLogo ? 'checked' : ''} class="rounded border-border" />
            <label for="show-logo-cb" class="text-[11px] text-muted-foreground cursor-pointer">Display banner image in README</label>
          </div>
        </div>
      `;

    case SECTION_TYPES.TECH_STACK: {
      const selected = (data.technologies || [])
        .map(id => TECH_CATALOG.find(t => t.id === id))
        .filter(Boolean);
      const style = data.style || 'skillicons';

      return `
        <!-- Language & Tech Style Switcher -->
        <div class="space-y-1.5">
          <label class="block text-xs font-medium text-foreground">Visual Style</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button class="tech-style-btn p-2 rounded-md border text-xs text-left transition ${style === 'skillicons' ? 'bg-muted border-foreground/60 font-semibold text-foreground ring-1 ring-ring' : 'bg-card border-border text-muted-foreground hover:text-foreground'}" data-style="skillicons">
              <span class="block font-medium">SkillIcons</span>
              <span class="text-[10px] text-muted-foreground">Curved icon grid</span>
            </button>
            <button class="tech-style-btn p-2 rounded-md border text-xs text-left transition ${style === 'for-the-badge' ? 'bg-muted border-foreground/60 font-semibold text-foreground ring-1 ring-ring' : 'bg-card border-border text-muted-foreground hover:text-foreground'}" data-style="for-the-badge">
              <span class="block font-medium">Shields Bold</span>
              <span class="text-[10px] text-muted-foreground">Badge chips</span>
            </button>
            <button class="tech-style-btn p-2 rounded-md border text-xs text-left transition ${style === 'github-stats' ? 'bg-muted border-foreground/60 font-semibold text-foreground ring-1 ring-ring' : 'bg-card border-border text-muted-foreground hover:text-foreground'}" data-style="github-stats">
              <span class="block font-medium">Language Card</span>
              <span class="text-[10px] text-muted-foreground">Dynamic % graph</span>
            </button>
            <button class="tech-style-btn p-2 rounded-md border text-xs text-left transition ${style === 'devicon-grid' ? 'bg-muted border-foreground/60 font-semibold text-foreground ring-1 ring-ring' : 'bg-card border-border text-muted-foreground hover:text-foreground'}" data-style="devicon-grid">
              <span class="block font-medium">Logo Grid</span>
              <span class="text-[10px] text-muted-foreground">Centered icons</span>
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between pt-2">
          <div>
            <label class="block text-xs font-medium text-foreground">Selected Technologies & Languages</label>
            <p class="text-[11px] text-muted-foreground">${selected.length} items configured</p>
          </div>
          <button id="open-tech-picker-btn" class="btn-primary text-xs px-3 py-1.5 flex items-center gap-1.5">
            <span>✨</span> Browse & Add Badges
          </button>
        </div>

        <!-- Selected Badges Preview -->
        <div class="p-3.5 bg-card border border-border rounded-md min-h-[90px] flex flex-wrap gap-1.5 items-center">
          ${selected.length > 0 
            ? selected.map(item => `
                <div class="flex items-center gap-1.5 bg-muted border border-border px-2 py-1 rounded">
                  <img src="${getBadgeUrl(item, 'flat')}" alt="${item.name}" class="h-3.5" />
                  <button class="remove-tech-chip text-muted-foreground hover:text-rose-400 text-xs ml-1" data-tech-id="${item.id}">×</button>
                </div>
              `).join('')
            : '<p class="text-xs text-muted-foreground py-3 w-full text-center">No technologies selected yet. Click "Browse & Add Badges" above or auto-detect from GitHub!</p>'
          }
        </div>
      `;
    }

    case SECTION_TYPES.DEMO:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Preview & Screenshots'}" class="form-input" />
        </div>

        <div class="p-3.5 bg-card border border-border rounded-md space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Demo Image / Screenshot</label>
            <button id="open-demo-photo-btn" class="text-xs font-medium text-foreground hover:underline flex items-center gap-1">
              <span>📸</span> Upload Screenshot / Presets
            </button>
          </div>
          <input type="text" data-field="imageUrl" value="${data.imageUrl || ''}" class="form-input text-xs" placeholder="https://raw.githubusercontent.com/.../screenshot.png" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Caption</label>
            <input type="text" data-field="caption" value="${data.caption || ''}" class="form-input" placeholder="App Walkthrough" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Live Demo URL</label>
            <input type="text" data-field="liveUrl" value="${data.liveUrl || ''}" class="form-input" placeholder="https://myapp.vercel.app" />
          </div>
        </div>
      `;

    case SECTION_TYPES.CONTRIBUTING:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Contributing'}" class="form-input" />
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Welcome Message</label>
          <textarea data-field="guidelines" rows="3" class="form-input text-xs">${data.guidelines || ''}</textarea>
        </div>
        <div class="p-3 bg-card border border-border rounded-md text-xs text-muted-foreground flex items-center gap-2">
          <span>👥</span>
          <span>Includes automated live contributor avatars from <strong class="text-foreground">contrib.rocks</strong></span>
        </div>
      `;

    case SECTION_TYPES.BADGES:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Badge Style</label>
          <select data-field="style" class="form-input">
            <option value="for-the-badge" ${data.style === 'for-the-badge' ? 'selected' : ''}>for-the-badge (Bold)</option>
            <option value="flat" ${data.style === 'flat' ? 'selected' : ''}>flat (Standard)</option>
            <option value="flat-square" ${data.style === 'flat-square' ? 'selected' : ''}>flat-square (Minimal)</option>
            <option value="plastic" ${data.style === 'plastic' ? 'selected' : ''}>plastic (Rounded)</option>
          </select>
        </div>

        <label class="block text-xs font-medium text-foreground mt-2">Dynamic GitHub Badges</label>
        <div class="grid grid-cols-2 gap-2 p-3 bg-card border border-border rounded-md">
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" data-field="showStars" ${data.showStars ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>GitHub Stars</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" data-field="showForks" ${data.showForks ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>GitHub Forks</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" data-field="showIssues" ${data.showIssues ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>Open Issues</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" data-field="showLicense" ${data.showLicense ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>License Badge</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" data-field="showRelease" ${data.showRelease ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>Release Version</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" data-field="showLastCommit" ${data.showLastCommit ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>Last Commit</span>
          </label>
        </div>
      `;

    case SECTION_TYPES.ABOUT:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'About The Project'}" class="form-input" />
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Project Overview / Description</label>
          <textarea data-field="content" rows="6" class="form-input font-sans text-xs leading-relaxed" placeholder="Describe your project...">${data.content || ''}</textarea>
        </div>
      `;

    case SECTION_TYPES.FEATURES:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Key Features'}" class="form-input" />
        </div>

        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Features List</label>
            <button id="add-feature-item-btn" class="btn-secondary text-xs py-1 px-2.5">
              + Add Feature
            </button>
          </div>

          <div id="features-items-list" class="space-y-2">
            ${(data.items || []).map((item, idx) => `
              <div class="p-2.5 bg-card border border-border rounded-md flex gap-2 items-start" data-feature-index="${idx}">
                <input type="text" class="feature-icon-input w-9 text-center py-1 bg-background border border-border rounded text-xs" value="${item.icon || '✨'}" />
                <div class="flex-1 space-y-1">
                  <input type="text" class="feature-title-input form-input py-1 text-xs" value="${item.title || ''}" placeholder="Feature Title" />
                  <textarea rows="2" class="feature-desc-input form-input py-1 text-xs" placeholder="Short description">${item.desc || ''}</textarea>
                </div>
                <button class="remove-feature-btn p-1 text-muted-foreground hover:text-rose-400 transition" title="Delete feature">✕</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.INSTALLATION:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Getting Started'}" class="form-input" />
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Prerequisites</label>
          <input type="text" data-field="prerequisites" value="${data.prerequisites || ''}" class="form-input" placeholder="Node.js 18+ and Git installed" />
        </div>

        <div class="space-y-2.5 mt-3">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Setup Steps</label>
            <button id="add-install-step-btn" class="btn-secondary text-xs py-1 px-2.5">
              + Add Step
            </button>
          </div>

          <div id="install-steps-list" class="space-y-2">
            ${(data.steps || []).map((step, idx) => `
              <div class="p-2.5 bg-card border border-border rounded-md flex gap-2 items-start" data-step-index="${idx}">
                <span class="w-5 h-5 flex items-center justify-center bg-muted text-muted-foreground rounded text-[10px] font-bold mt-1">${idx + 1}</span>
                <div class="flex-1 space-y-1">
                  <input type="text" class="step-title-input form-input py-1 text-xs" value="${step.title || ''}" placeholder="Step title" />
                  <input type="text" class="step-cmd-input form-input py-1 text-xs font-mono text-emerald-400" value="${step.cmd || ''}" placeholder="Terminal command" />
                </div>
                <button class="remove-step-btn p-1 text-muted-foreground hover:text-rose-400 transition" title="Delete">✕</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.ENV_VARS:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Environment Variables'}" class="form-input" />
        </div>

        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Variables Table</label>
            <button id="add-env-var-btn" class="btn-secondary text-xs py-1 px-2.5">
              + Add Variable
            </button>
          </div>

          <div id="env-vars-list" class="space-y-1.5">
            ${(data.variables || []).map((v, idx) => `
              <div class="p-2.5 bg-card border border-border rounded-md grid grid-cols-12 gap-2 items-center" data-var-index="${idx}">
                <div class="col-span-4">
                  <input type="text" class="var-key-input form-input py-1 text-xs font-mono" value="${v.key || ''}" placeholder="KEY_NAME" />
                </div>
                <div class="col-span-4">
                  <input type="text" class="var-desc-input form-input py-1 text-xs" value="${v.desc || ''}" placeholder="Description" />
                </div>
                <div class="col-span-2">
                  <input type="text" class="var-default-input form-input py-1 text-xs font-mono" value="${v.default || ''}" placeholder="Default" />
                </div>
                <div class="col-span-1 flex justify-center">
                  <input type="checkbox" class="var-required-input rounded border-border" ${v.required ? 'checked' : ''} title="Required?" />
                </div>
                <div class="col-span-1 flex justify-end">
                  <button class="remove-var-btn text-muted-foreground hover:text-rose-400 text-xs">✕</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.USAGE:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Usage'}" class="form-input" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Code Language</label>
            <select data-field="codeLang" class="form-input">
              <option value="bash" ${data.codeLang === 'bash' ? 'selected' : ''}>Bash / Shell</option>
              <option value="javascript" ${data.codeLang === 'javascript' ? 'selected' : ''}>JavaScript</option>
              <option value="typescript" ${data.codeLang === 'typescript' ? 'selected' : ''}>TypeScript</option>
              <option value="python" ${data.codeLang === 'python' ? 'selected' : ''}>Python</option>
              <option value="rust" ${data.codeLang === 'rust' ? 'selected' : ''}>Rust</option>
              <option value="go" ${data.codeLang === 'go' ? 'selected' : ''}>Go</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Code Example</label>
          <textarea data-field="code" rows="5" class="form-input font-mono text-xs leading-relaxed" placeholder="// Code usage...">${data.code || ''}</textarea>
        </div>
      `;

    case SECTION_TYPES.ROADMAP:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Roadmap'}" class="form-input" />
        </div>
        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Roadmap Milestones</label>
            <button id="add-roadmap-task-btn" class="btn-secondary text-xs py-1 px-2.5">
              + Add Task
            </button>
          </div>
          <div id="roadmap-tasks-list" class="space-y-1.5">
            ${(data.tasks || []).map((t, idx) => `
              <div class="p-2 bg-card border border-border rounded-md flex items-center gap-2" data-task-index="${idx}">
                <input type="checkbox" class="task-completed-input rounded border-border" ${t.completed ? 'checked' : ''} />
                <input type="text" class="task-text-input form-input py-1 text-xs flex-1" value="${t.text || ''}" placeholder="Task description..." />
                <button class="remove-task-btn text-muted-foreground hover:text-rose-400 text-xs">✕</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.LICENSE:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'License'}" class="form-input" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">License Type</label>
            <select data-field="type" class="form-input">
              <option value="MIT" ${data.type === 'MIT' ? 'selected' : ''}>MIT License</option>
              <option value="Apache-2.0" ${data.type === 'Apache-2.0' ? 'selected' : ''}>Apache 2.0</option>
              <option value="GPL-3.0" ${data.type === 'GPL-3.0' ? 'selected' : ''}>GPL 3.0</option>
              <option value="BSD-3-Clause" ${data.type === 'BSD-3-Clause' ? 'selected' : ''}>BSD 3-Clause</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Year</label>
            <input type="text" data-field="year" value="${data.year || '2026'}" class="form-input" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Copyright Holder</label>
            <input type="text" data-field="holder" value="${data.holder || ''}" class="form-input" placeholder="Name or Org" />
          </div>
        </div>
      `;

    case SECTION_TYPES.AUTHOR:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Author & Acknowledgements'}" class="form-input" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Your Name</label>
            <input type="text" data-field="name" value="${data.name || ''}" class="form-input" placeholder="Alex Dev" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">GitHub Username</label>
            <input type="text" data-field="github" value="${data.github || ''}" class="form-input" placeholder="alexdev" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Twitter / X Handle</label>
            <input type="text" data-field="twitter" value="${data.twitter || ''}" class="form-input" placeholder="alex_dev" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">LinkedIn Handle</label>
            <input type="text" data-field="linkedin" value="${data.linkedin || ''}" class="form-input" placeholder="alex-developer" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Email Address</label>
            <input type="email" data-field="email" value="${data.email || ''}" class="form-input" placeholder="alex@example.com" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Buy Me a Coffee</label>
            <input type="text" data-field="buyMeACoffee" value="${data.buyMeACoffee || ''}" class="form-input" placeholder="alexdev" />
          </div>
        </div>
      `;

    case SECTION_TYPES.CUSTOM:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Custom Section'}" class="form-input" />
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Custom Markdown Content</label>
          <textarea data-field="markdown" rows="8" class="form-input font-mono text-xs leading-relaxed" placeholder="Custom markdown...">${data.markdown || ''}</textarea>
        </div>
      `;

    default:
      return '<p class="text-xs text-muted-foreground">No editable fields.</p>';
  }
}

function attachFieldListeners(container, sectionId, type, currentData) {
  // Generic inputs
  container.querySelectorAll('[data-field]').forEach(el => {
    const field = el.dataset.field;
    const isCheckbox = el.type === 'checkbox';

    el.addEventListener(isCheckbox ? 'change' : 'input', () => {
      const val = isCheckbox ? el.checked : el.value;
      store.updateSectionData(sectionId, { [field]: val });
    });
  });

  // GitHub Auto-Detect Trigger
  const triggerAutoDetectBtn = container.querySelector('#trigger-autodetect-btn');
  const autoDetectInput = container.querySelector('#github-autodetect-input');
  if (triggerAutoDetectBtn && autoDetectInput) {
    triggerAutoDetectBtn.addEventListener('click', async () => {
      const parsed = parseGitHubRepoInput(autoDetectInput.value);
      if (!parsed) {
        showToast('Please enter a valid repo (e.g. facebook/react or GitHub URL)', 'error');
        return;
      }

      triggerAutoDetectBtn.innerText = 'Fetching...';
      triggerAutoDetectBtn.disabled = true;

      try {
        const info = await fetchGitHubRepoDetails(parsed.owner, parsed.repo);
        store.batchUpdate(sections => {
          const hero = sections.find(s => s.type === SECTION_TYPES.HERO);
          if (hero) {
            hero.data.projectName = info.repo;
            hero.data.tagline = info.description || hero.data.tagline;
            hero.data.repoOwner = info.owner;
            hero.data.repoName = info.repo;
          }

          const tech = sections.find(s => s.type === SECTION_TYPES.TECH_STACK);
          if (tech && info.matchedTechIds.length > 0) {
            // Merge detected languages
            const set = new Set([...(tech.data.technologies || []), ...info.matchedTechIds]);
            tech.data.technologies = Array.from(set);
          }

          const lic = sections.find(s => s.type === SECTION_TYPES.LICENSE);
          if (lic && info.license && info.license !== 'NOASSERTION') {
            lic.data.type = info.license;
            lic.data.holder = info.owner;
          }

          const auth = sections.find(s => s.type === SECTION_TYPES.AUTHOR);
          if (auth && info.owner) {
            auth.data.github = info.owner;
          }
        });

        const langCount = info.languages.length;
        const langSummary = info.languages.slice(0, 3).map(l => `${l.name} (${l.percentage}%)`).join(', ');
        showToast(`Auto-detected ${langCount} languages! [${langSummary}]`, 'success');
      } catch (err) {
        showToast(err.message || 'Failed to fetch from GitHub API', 'error');
      } finally {
        triggerAutoDetectBtn.innerText = 'Fetch Info';
        triggerAutoDetectBtn.disabled = false;
      }
    });
  }

  // Photo / Banner Hub Trigger
  const openBannerBtn = container.querySelector('#open-banner-hub-btn');
  if (openBannerBtn) {
    openBannerBtn.addEventListener('click', () => {
      renderPhotoModal('hero');
    });
  }

  const openDemoPhotoBtn = container.querySelector('#open-demo-photo-btn');
  if (openDemoPhotoBtn) {
    openDemoPhotoBtn.addEventListener('click', () => {
      renderPhotoModal('demo');
    });
  }

  // Tech Style Switcher buttons
  container.querySelectorAll('.tech-style-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const style = btn.dataset.style;
      store.updateSectionData(sectionId, { style });
    });
  });

  // Open Tech Stack Modal
  const openTechBtn = container.querySelector('#open-tech-picker-btn');
  if (openTechBtn) {
    openTechBtn.addEventListener('click', () => {
      renderTechPickerModal();
    });
  }

  // Remove individual tech chip
  container.querySelectorAll('.remove-tech-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const techId = btn.dataset.techId;
      const techSec = store.getState().sections.find(s => s.id === sectionId);
      const list = (techSec?.data?.technologies || []).filter(id => id !== techId);
      store.updateSectionData(sectionId, { technologies: list });
    });
  });

  // Feature items
  const addFeatureBtn = container.querySelector('#add-feature-item-btn');
  if (addFeatureBtn) {
    addFeatureBtn.addEventListener('click', () => {
      const items = [...(currentData.items || [])];
      items.push({ icon: '✨', title: 'New Feature', desc: 'Description of this feature.' });
      store.updateSectionData(sectionId, { items });
    });
  }

  const featuresList = container.querySelector('#features-items-list');
  if (featuresList) {
    featuresList.querySelectorAll('.remove-feature-btn').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const items = [...(currentData.items || [])];
        items.splice(idx, 1);
        store.updateSectionData(sectionId, { items });
      });
    });

    featuresList.querySelectorAll('.feature-icon-input, .feature-title-input, .feature-desc-input').forEach(input => {
      input.addEventListener('input', () => {
        const row = input.closest('[data-feature-index]');
        const idx = parseInt(row.dataset.featureIndex, 10);
        const items = [...(currentData.items || [])];
        if (items[idx]) {
          items[idx] = {
            icon: row.querySelector('.feature-icon-input').value,
            title: row.querySelector('.feature-title-input').value,
            desc: row.querySelector('.feature-desc-input').value
          };
          store.updateSectionData(sectionId, { items });
        }
      });
    });
  }

  // Installation steps
  const addStepBtn = container.querySelector('#add-install-step-btn');
  if (addStepBtn) {
    addStepBtn.addEventListener('click', () => {
      const steps = [...(currentData.steps || [])];
      steps.push({ title: 'New Step', cmd: 'echo "hello"' });
      store.updateSectionData(sectionId, { steps });
    });
  }

  const stepsList = container.querySelector('#install-steps-list');
  if (stepsList) {
    stepsList.querySelectorAll('.remove-step-btn').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const steps = [...(currentData.steps || [])];
        steps.splice(idx, 1);
        store.updateSectionData(sectionId, { steps });
      });
    });

    stepsList.querySelectorAll('.step-title-input, .step-cmd-input').forEach(input => {
      input.addEventListener('input', () => {
        const row = input.closest('[data-step-index]');
        const idx = parseInt(row.dataset.stepIndex, 10);
        const steps = [...(currentData.steps || [])];
        if (steps[idx]) {
          steps[idx] = {
            title: row.querySelector('.step-title-input').value,
            cmd: row.querySelector('.step-cmd-input').value
          };
          store.updateSectionData(sectionId, { steps });
        }
      });
    });
  }

  // Env vars
  const addVarBtn = container.querySelector('#add-env-var-btn');
  if (addVarBtn) {
    addVarBtn.addEventListener('click', () => {
      const variables = [...(currentData.variables || [])];
      variables.push({ key: 'NEW_VAR', desc: 'Description', default: '', required: false });
      store.updateSectionData(sectionId, { variables });
    });
  }

  const varsList = container.querySelector('#env-vars-list');
  if (varsList) {
    varsList.querySelectorAll('.remove-var-btn').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const variables = [...(currentData.variables || [])];
        variables.splice(idx, 1);
        store.updateSectionData(sectionId, { variables });
      });
    });

    varsList.querySelectorAll('.var-key-input, .var-desc-input, .var-default-input, .var-required-input').forEach(input => {
      input.addEventListener(input.type === 'checkbox' ? 'change' : 'input', () => {
        const row = input.closest('[data-var-index]');
        const idx = parseInt(row.dataset.varIndex, 10);
        const variables = [...(currentData.variables || [])];
        if (variables[idx]) {
          variables[idx] = {
            key: row.querySelector('.var-key-input').value,
            desc: row.querySelector('.var-desc-input').value,
            default: row.querySelector('.var-default-input').value,
            required: row.querySelector('.var-required-input').checked
          };
          store.updateSectionData(sectionId, { variables });
        }
      });
    });
  }

  // Roadmap tasks
  const addTaskBtn = container.querySelector('#add-roadmap-task-btn');
  if (addTaskBtn) {
    addTaskBtn.addEventListener('click', () => {
      const tasks = [...(currentData.tasks || [])];
      tasks.push({ text: 'New milestone', completed: false });
      store.updateSectionData(sectionId, { tasks });
    });
  }

  const tasksList = container.querySelector('#roadmap-tasks-list');
  if (tasksList) {
    tasksList.querySelectorAll('.remove-task-btn').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        const tasks = [...(currentData.tasks || [])];
        tasks.splice(idx, 1);
        store.updateSectionData(sectionId, { tasks });
      });
    });

    tasksList.querySelectorAll('.task-completed-input, .task-text-input').forEach(input => {
      input.addEventListener(input.type === 'checkbox' ? 'change' : 'input', () => {
        const row = input.closest('[data-task-index]');
        const idx = parseInt(row.dataset.taskIndex, 10);
        const tasks = [...(currentData.tasks || [])];
        if (tasks[idx]) {
          tasks[idx] = {
            text: row.querySelector('.task-text-input').value,
            completed: row.querySelector('.task-completed-input').checked
          };
          store.updateSectionData(sectionId, { tasks });
        }
      });
    });
  }
}


/**
 * Readmify - 3-Minute Quick Wizard (shadcn/ui style)
 */

let currentStep = 1;
const TOTAL_STEPS = 5;

let wizardData = {
  projectName: '',
  tagline: '',
  repoOwner: '',
  repoName: '',
  align: 'center',
  badges: {
    showStars: true,
    showForks: true,
    showIssues: true,
    showLicense: true,
    showRelease: true,
    style: 'for-the-badge'
  },
  technologies: ['javascript', 'html5', 'css3', 'git'],
  features: [
    { icon: '⚡', title: 'Lightning Fast', desc: 'Built for speed with minimal overhead.' },
    { icon: '🔒', title: 'Secure & Private', desc: 'Runs entirely in your browser with zero tracking.' },
    { icon: '🎯', title: 'Easy to Use', desc: 'Designed for beginners and pros alike.' }
  ],
  packageManager: 'npm',
  licenseType: 'MIT',
  authorName: ''
};

function openWizard() {
  currentStep = 1;
  const state = store.getState();
  const hero = state.sections.find(s => s.type === SECTION_TYPES.HERO);
  if (hero?.data?.projectName && hero.data.projectName !== 'Project Title') {
    wizardData.projectName = hero.data.projectName;
    wizardData.tagline = hero.data.tagline || '';
    wizardData.repoOwner = hero.data.repoOwner || '';
    wizardData.repoName = hero.data.repoName || '';
  }

  let modal = document.getElementById('quick-wizard-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'quick-wizard-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs';
    document.body.appendChild(modal);
  }

  renderWizardStep();
  modal.classList.remove('hidden');
}

function closeWizard() {
  const modal = document.getElementById('quick-wizard-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function renderWizardStep() {
  const modal = document.getElementById('quick-wizard-modal');
  if (!modal) return;

  const progressPercent = Math.round((currentStep / TOTAL_STEPS) * 100);

  modal.innerHTML = `
    <div class="bg-card border border-border rounded-lg w-full max-w-xl shadow-2xl flex flex-col overflow-hidden">
      <!-- Wizard Top Header -->
      <div class="px-5 py-3.5 border-b border-border bg-card flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-md bg-muted border border-border flex items-center justify-center text-foreground font-semibold text-xs">
            🪄
          </div>
          <div>
            <h3 class="text-xs font-semibold text-foreground">3-Minute Quick Wizard</h3>
            <p class="text-[11px] text-muted-foreground">Step ${currentStep} of ${TOTAL_STEPS}: ${getStepTitle(currentStep)}</p>
          </div>
        </div>
        <button id="close-wizard-btn" class="text-muted-foreground hover:text-foreground text-xs p-1">✕</button>
      </div>

      <!-- Progress Bar -->
      <div class="w-full bg-border h-0.5">
        <div class="bg-foreground h-0.5 transition-all duration-300" style="width: ${progressPercent}%"></div>
      </div>

      <!-- Step Content Area -->
      <div class="p-5 overflow-y-auto max-h-[60vh] space-y-3.5 bg-background">
        ${getStepHtml(currentStep)}
      </div>

      <!-- Wizard Bottom Navigation -->
      <div class="px-5 py-3 border-t border-border bg-card flex items-center justify-between">
        <button id="wizard-prev-btn" class="btn-secondary text-xs ${currentStep === 1 ? 'invisible' : ''}">
          ← Back
        </button>
        <div class="flex items-center gap-2">
          ${currentStep < TOTAL_STEPS ? `
            <button id="wizard-next-btn" class="btn-primary text-xs px-3.5 py-1.5">
              Next Step →
            </button>
          ` : `
            <button id="wizard-finish-btn" class="btn-primary text-xs px-4 py-1.5">
              ✨ Finish & Generate
            </button>
          `}
        </div>
      </div>
    </div>
  `;

  modal.querySelector('#close-wizard-btn')?.addEventListener('click', closeWizard);

  const prevBtn = modal.querySelector('#wizard-prev-btn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      saveStepData(currentStep);
      if (currentStep > 1) {
        currentStep--;
        renderWizardStep();
      }
    });
  }

  const nextBtn = modal.querySelector('#wizard-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      saveStepData(currentStep);
      if (currentStep < TOTAL_STEPS) {
        currentStep++;
        renderWizardStep();
      }
    });
  }

  const finishBtn = modal.querySelector('#wizard-finish-btn');
  if (finishBtn) {
    finishBtn.addEventListener('click', () => {
      saveStepData(currentStep);
      applyWizardDataToStore();
      closeWizard();
      fireConfetti();
      showToast('README generated successfully!', 'success');
    });
  }

  attachStepSpecificListeners(currentStep, modal);
}

function getStepTitle(step) {
  switch (step) {
    case 1: return 'Project Identity';
    case 2: return 'Badges & Stats';
    case 3: return 'Tech Stack';
    case 4: return 'Key Features';
    case 5: return 'Installation & License';
    default: return '';
  }
}

function getStepHtml(step) {
  switch (step) {
    case 1:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1.5">Project Name</label>
          <input type="text" id="wiz-project-name" value="${wizardData.projectName}" placeholder="e.g. MyAwesomeApp" class="form-input text-xs" />
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1.5">Tagline / Short Description</label>
          <input type="text" id="wiz-tagline" value="${wizardData.tagline}" placeholder="e.g. Fast, reliable web application" class="form-input text-xs" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1.5">GitHub Username / Org</label>
            <input type="text" id="wiz-repo-owner" value="${wizardData.repoOwner}" placeholder="e.g. yourname" class="form-input text-xs" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1.5">Repository Name</label>
            <input type="text" id="wiz-repo-name" value="${wizardData.repoName}" placeholder="e.g. my-project" class="form-input text-xs" />
          </div>
        </div>
      `;

    case 2:
      return `
        <p class="text-xs text-muted-foreground">Select automated badges for the top of your README:</p>
        <div class="grid grid-cols-2 gap-2 p-3 bg-card border border-border rounded-md">
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" id="wiz-badge-stars" ${wizardData.badges.showStars ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>GitHub Stars</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" id="wiz-badge-forks" ${wizardData.badges.showForks ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>GitHub Forks</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" id="wiz-badge-issues" ${wizardData.badges.showIssues ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>Open Issues</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" id="wiz-badge-license" ${wizardData.badges.showLicense ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>License Badge</span>
          </label>
          <label class="flex items-center gap-2 text-xs text-foreground cursor-pointer">
            <input type="checkbox" id="wiz-badge-release" ${wizardData.badges.showRelease ? 'checked' : ''} class="rounded border-border text-foreground" />
            <span>Latest Release</span>
          </label>
        </div>
      `;

    case 3:
      return `
        <div class="flex items-center justify-between">
          <p class="text-xs text-muted-foreground">Click to toggle project technologies:</p>
          <span class="text-xs font-medium text-foreground" id="wiz-tech-count">${wizardData.technologies.length} selected</span>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2.5 bg-card border border-border rounded-md max-h-56 overflow-y-auto">
          ${TECH_CATALOG.slice(0, 36).map(item => {
            const isSel = wizardData.technologies.includes(item.id);
            return `
              <div class="wiz-tech-chip flex items-center justify-between p-2 rounded-md border text-xs cursor-pointer select-none transition ${isSel ? 'bg-muted border-foreground/60 text-foreground font-medium ring-1 ring-ring' : 'bg-background border-border text-muted-foreground hover:text-foreground'}" data-id="${item.id}">
                <span class="truncate">${item.name}</span>
                <span class="text-[10px] ${isSel ? 'text-foreground' : 'text-transparent'}">✓</span>
              </div>
            `;
          }).join('')}
        </div>
      `;

    case 4:
      return `
        <div class="flex items-center justify-between">
          <p class="text-xs text-muted-foreground">List key project highlights:</p>
          <button id="wiz-add-feature-btn" class="text-xs text-foreground hover:underline font-medium">+ Add</button>
        </div>
        <div id="wiz-features-list" class="space-y-2">
          ${wizardData.features.map((f, i) => `
            <div class="flex items-center gap-2 p-2 bg-card border border-border rounded-md" data-wiz-f-idx="${i}">
              <input type="text" class="wiz-f-icon w-8 text-center bg-background border border-border rounded text-xs py-1" value="${f.icon || '✨'}" />
              <input type="text" class="wiz-f-title form-input py-1 text-xs flex-1" value="${f.title || ''}" placeholder="Feature Title" />
              <input type="text" class="wiz-f-desc form-input py-1 text-xs flex-1" value="${f.desc || ''}" placeholder="Short description" />
              <button class="wiz-f-remove text-muted-foreground hover:text-rose-400 text-xs px-1">×</button>
            </div>
          `).join('')}
        </div>
      `;

    case 5:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1.5">Package Manager / Quickstart</label>
          <select id="wiz-package-manager" class="form-input text-xs">
            <option value="npm" ${wizardData.packageManager === 'npm' ? 'selected' : ''}>Node.js / npm (npm install && npm start)</option>
            <option value="pnpm" ${wizardData.packageManager === 'pnpm' ? 'selected' : ''}>pnpm (pnpm install && pnpm dev)</option>
            <option value="pip" ${wizardData.packageManager === 'pip' ? 'selected' : ''}>Python / pip (pip install -r requirements.txt)</option>
            <option value="cargo" ${wizardData.packageManager === 'cargo' ? 'selected' : ''}>Rust / Cargo (cargo build --release)</option>
            <option value="docker" ${wizardData.packageManager === 'docker' ? 'selected' : ''}>Docker (docker compose up -d)</option>
            <option value="static" ${wizardData.packageManager === 'static' ? 'selected' : ''}>Static HTML (Open index.html directly)</option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1.5">Open Source License</label>
            <select id="wiz-license" class="form-input text-xs">
              <option value="MIT" ${wizardData.licenseType === 'MIT' ? 'selected' : ''}>MIT License</option>
              <option value="Apache-2.0" ${wizardData.licenseType === 'Apache-2.0' ? 'selected' : ''}>Apache 2.0</option>
              <option value="GPL-3.0" ${wizardData.licenseType === 'GPL-3.0' ? 'selected' : ''}>GNU GPL v3</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1.5">Author Name</label>
            <input type="text" id="wiz-author" value="${wizardData.authorName}" placeholder="Your Name" class="form-input text-xs" />
          </div>
        </div>
      `;

    default:
      return '';
  }
}

function saveStepData(step) {
  const modal = document.getElementById('quick-wizard-modal');
  if (!modal) return;

  if (step === 1) {
    wizardData.projectName = modal.querySelector('#wiz-project-name')?.value || 'My Project';
    wizardData.tagline = modal.querySelector('#wiz-tagline')?.value || '';
    wizardData.repoOwner = modal.querySelector('#wiz-repo-owner')?.value || 'username';
    wizardData.repoName = modal.querySelector('#wiz-repo-name')?.value || 'repo';
  } else if (step === 2) {
    wizardData.badges.showStars = modal.querySelector('#wiz-badge-stars')?.checked ?? true;
    wizardData.badges.showForks = modal.querySelector('#wiz-badge-forks')?.checked ?? true;
    wizardData.badges.showIssues = modal.querySelector('#wiz-badge-issues')?.checked ?? true;
    wizardData.badges.showLicense = modal.querySelector('#wiz-badge-license')?.checked ?? true;
    wizardData.badges.showRelease = modal.querySelector('#wiz-badge-release')?.checked ?? true;
  } else if (step === 4) {
    const list = modal.querySelectorAll('[data-wiz-f-idx]');
    const features = [];
    list.forEach(row => {
      features.push({
        icon: row.querySelector('.wiz-f-icon')?.value || '✨',
        title: row.querySelector('.wiz-f-title')?.value || 'Feature',
        desc: row.querySelector('.wiz-f-desc')?.value || ''
      });
    });
    if (features.length > 0) {
      wizardData.features = features;
    }
  } else if (step === 5) {
    wizardData.packageManager = modal.querySelector('#wiz-package-manager')?.value || 'npm';
    wizardData.licenseType = modal.querySelector('#wiz-license')?.value || 'MIT';
    wizardData.authorName = modal.querySelector('#wiz-author')?.value || 'Your Name';
  }
}

function attachStepSpecificListeners(step, modal) {
  if (step === 3) {
    modal.querySelectorAll('.wiz-tech-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const id = chip.dataset.id;
        const idx = wizardData.technologies.indexOf(id);
        if (idx !== -1) {
          wizardData.technologies.splice(idx, 1);
        } else {
          wizardData.technologies.push(id);
        }
        renderWizardStep();
      });
    });
  } else if (step === 4) {
    const addBtn = modal.querySelector('#wiz-add-feature-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        wizardData.features.push({ icon: '✨', title: 'New Highlight', desc: 'Description' });
        renderWizardStep();
      });
    }

    modal.querySelectorAll('.wiz-f-remove').forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        wizardData.features.splice(idx, 1);
        renderWizardStep();
      });
    });
  }
}

function applyWizardDataToStore() {
  store.batchUpdate(sections => {
    const hero = sections.find(s => s.type === SECTION_TYPES.HERO);
    if (hero) {
      hero.enabled = true;
      hero.data.projectName = wizardData.projectName;
      hero.data.tagline = wizardData.tagline;
      hero.data.repoOwner = wizardData.repoOwner;
      hero.data.repoName = wizardData.repoName;
    }

    const badges = sections.find(s => s.type === SECTION_TYPES.BADGES);
    if (badges) {
      badges.enabled = true;
      badges.data.showStars = wizardData.badges.showStars;
      badges.data.showForks = wizardData.badges.showForks;
      badges.data.showIssues = wizardData.badges.showIssues;
      badges.data.showLicense = wizardData.badges.showLicense;
      badges.data.showRelease = wizardData.badges.showRelease;
    }

    const tech = sections.find(s => s.type === SECTION_TYPES.TECH_STACK);
    if (tech) {
      tech.enabled = true;
      tech.data.technologies = [...wizardData.technologies];
    }

    const feat = sections.find(s => s.type === SECTION_TYPES.FEATURES);
    if (feat) {
      feat.enabled = true;
      feat.data.items = [...wizardData.features];
    }

    const install = sections.find(s => s.type === SECTION_TYPES.INSTALLATION);
    if (install) {
      install.enabled = true;
      const pm = wizardData.packageManager;
      if (pm === 'npm') {
        install.data.steps = [
          { title: 'Clone the repository', cmd: `git clone https://github.com/${wizardData.repoOwner}/${wizardData.repoName}.git` },
          { title: 'Install dependencies', cmd: 'npm install' },
          { title: 'Start the app', cmd: 'npm start' }
        ];
      } else if (pm === 'pip') {
        install.data.steps = [
          { title: 'Clone the repository', cmd: `git clone https://github.com/${wizardData.repoOwner}/${wizardData.repoName}.git` },
          { title: 'Install packages', cmd: 'pip install -r requirements.txt' },
          { title: 'Run app', cmd: 'python main.py' }
        ];
      } else {
        install.data.steps = [
          { title: 'Clone the repository', cmd: `git clone https://github.com/${wizardData.repoOwner}/${wizardData.repoName}.git` },
          { title: 'Open in browser', cmd: '# Open index.html directly' }
        ];
      }
    }

    const lic = sections.find(s => s.type === SECTION_TYPES.LICENSE);
    if (lic) {
      lic.enabled = true;
      lic.data.type = wizardData.licenseType;
      lic.data.holder = wizardData.authorName || 'Your Name';
    }

    const auth = sections.find(s => s.type === SECTION_TYPES.AUTHOR);
    if (auth && wizardData.authorName) {
      auth.data.name = wizardData.authorName;
      auth.data.github = wizardData.repoOwner;
    }
  });
}


/**
 * Readmify - Main Application Controller (v2)
 * Coordinates store state, sidebar, editor forms, preview rendering, GitHub API, and export actions
 */

// DOM Elements
let sectionListContainer;
let sectionEditorContainer;
let previewBody;
let rawMarkdownTextarea;
let currentMarkdown = '';

function initApp() {
  sectionListContainer = document.getElementById('section-list-items');
  sectionEditorContainer = document.getElementById('section-editor-container');
  previewBody = document.getElementById('github-preview-body');
  rawMarkdownTextarea = document.getElementById('raw-markdown-textarea');

  setupNavbarControls();
  setupViewModeSwitcher();
  setupImportModal();

  // Subscribe to store updates
  store.subscribe(renderApp);

  // Initial render
  renderApp(store.getState());

  // Check if first time user, offer quick wizard
  if (!localStorage.getItem('readmify_visited')) {
    localStorage.setItem('readmify_visited', 'true');
    setTimeout(() => {
      openWizard();
    }, 600);
  }
}

function renderApp(state) {
  renderSidebar(state);
  renderSectionEditor(sectionEditorContainer);
  renderPreview(state);
}

// --- 1. SIDEBAR RENDERING & REORDERING ---
function renderSidebar(state) {
  if (!sectionListContainer) return;

  const { sections, activeSectionId } = state;

  sectionListContainer.innerHTML = sections.map((sec, idx) => {
    const isActive = sec.id === activeSectionId;
    return `
      <div 
        class="section-item group flex items-center justify-between px-2.5 py-2 rounded-md border cursor-pointer select-none transition-all ${
          isActive 
            ? 'active bg-muted border-border text-foreground font-medium shadow-xs' 
            : 'bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
        } ${!sec.enabled ? 'opacity-50' : ''}"
        data-section-id="${sec.id}"
        data-index="${idx}"
      >
        <div class="flex items-center gap-2 flex-1 min-w-0">
          <span class="text-zinc-500 text-[10px] font-mono w-3.5">${idx + 1}</span>
          <span class="text-xs truncate">${sec.title}</span>
        </div>

        <div class="flex items-center gap-1 opacity-70 group-hover:opacity-100">
          <div class="flex items-center">
            <button class="move-up-btn p-1 text-muted-foreground hover:text-foreground rounded text-[10px] ${idx === 0 ? 'invisible' : ''}" title="Move Up" data-id="${sec.id}">▲</button>
            <button class="move-down-btn p-1 text-muted-foreground hover:text-foreground rounded text-[10px] ${idx === sections.length - 1 ? 'invisible' : ''}" title="Move Down" data-id="${sec.id}">▼</button>
          </div>

          <input 
            type="checkbox" 
            class="toggle-section-cb rounded border-border text-foreground focus:ring-0 cursor-pointer ml-1" 
            ${sec.enabled ? 'checked' : ''} 
            data-id="${sec.id}" 
            title="Toggle section visibility" 
          />
        </div>
      </div>
    `;
  }).join('');

  sectionListContainer.querySelectorAll('.section-item').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('input')) return;
      const id = el.dataset.sectionId;
      store.setActiveSection(id);
    });
  });

  sectionListContainer.querySelectorAll('.move-up-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      store.moveSection(btn.dataset.id, 'up');
    });
  });

  sectionListContainer.querySelectorAll('.move-down-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      store.moveSection(btn.dataset.id, 'down');
    });
  });

  sectionListContainer.querySelectorAll('.toggle-section-cb').forEach(cb => {
    cb.addEventListener('change', (e) => {
      e.stopPropagation();
      store.toggleSection(cb.dataset.id, cb.checked);
    });
  });

  const addCustomBtn = document.getElementById('add-custom-sec-btn');
  if (addCustomBtn && !addCustomBtn.dataset.bound) {
    addCustomBtn.dataset.bound = 'true';
    addCustomBtn.addEventListener('click', () => {
      const title = prompt('Enter a title for the new section:', 'Custom Section');
      if (title && title.trim()) {
        store.addCustomSection(title.trim());
      }
    });
  }

  const resetBtn = document.getElementById('reset-template-btn');
  if (resetBtn && !resetBtn.dataset.bound) {
    resetBtn.dataset.bound = 'true';
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset your README to standard default sections? Any unsaved edits will be cleared.')) {
        store.resetToDefault();
        showToast('Reset to default template', 'info');
      }
    });
  }
}

// --- 2. LIVE PREVIEW & MARKDOWN RENDERING ---
function renderPreview(state) {
  currentMarkdown = generateMarkdown(state.sections);

  if (previewBody) {
    previewBody.className = `markdown-body ${state.previewTheme === 'light' ? 'github-light' : 'github-dark'}`;

    try {
      if (window.marked) {
        window.marked.setOptions({
          gfm: true,
          breaks: true
        });
        const rawHtml = window.marked.parse(currentMarkdown);
        const safeHtml = window.DOMPurify ? window.DOMPurify.sanitize(rawHtml) : rawHtml;
        previewBody.innerHTML = safeHtml;
      } else {
        previewBody.innerText = currentMarkdown;
      }
    } catch (err) {
      console.error('Markdown parse error:', err);
      previewBody.innerText = currentMarkdown;
    }
  }

  if (rawMarkdownTextarea) {
    rawMarkdownTextarea.value = currentMarkdown;
  }

  updateHealthAndStats(state.sections, currentMarkdown);
}

function updateHealthAndStats(sections, markdownText) {
  const words = markdownText.trim() ? markdownText.trim().split(/\s+/).length : 0;
  const chars = markdownText.length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  const statsWordEl = document.getElementById('stats-word-count');
  const statsCharEl = document.getElementById('stats-char-count');
  const statsTimeEl = document.getElementById('stats-reading-time');

  if (statsWordEl) statsWordEl.textContent = `${words} words`;
  if (statsCharEl) statsCharEl.textContent = `${chars} chars`;
  if (statsTimeEl) statsTimeEl.textContent = `~${readingTime} min read`;

  const health = calculateReadmeScore(sections);
  const scoreBadge = document.getElementById('health-score-badge');
  const scoreText = document.getElementById('health-score-text');
  const scoreTip = document.getElementById('health-score-tip');

  if (scoreBadge && scoreText) {
    scoreBadge.style.borderColor = health.color;
    scoreBadge.style.color = health.color;
    scoreText.textContent = `${health.score}% (${health.label})`;
  }

  if (scoreTip) {
    if (health.tips.length > 0) {
      scoreTip.textContent = `💡 Tip: ${health.tips[0]}`;
      scoreTip.classList.remove('hidden');
    } else {
      scoreTip.textContent = '🎉 Your README is in top-tier shape!';
    }
  }
}

// --- 3. NAVBAR CONTROLS ---
function setupNavbarControls() {
  // GitHub Auto-Detect Bar
  const navGithubInput = document.getElementById('nav-github-input');
  const navGithubDetectBtn = document.getElementById('nav-github-detect-btn');

  async function handleNavAutoDetect() {
    if (!navGithubInput) return;
    const parsed = parseGitHubRepoInput(navGithubInput.value);
    if (!parsed) {
      showToast('Please enter a valid repo (e.g. facebook/react or GitHub URL)', 'error');
      return;
    }

    navGithubDetectBtn.innerHTML = '<span>⏳</span> Fetching...';
    navGithubDetectBtn.disabled = true;

    try {
      const info = await fetchGitHubRepoDetails(parsed.owner, parsed.repo);
      store.batchUpdate(sections => {
        const hero = sections.find(s => s.type === SECTION_TYPES.HERO);
        if (hero) {
          hero.data.projectName = info.repo;
          hero.data.tagline = info.description || hero.data.tagline;
          hero.data.repoOwner = info.owner;
          hero.data.repoName = info.repo;
        }

        const tech = sections.find(s => s.type === SECTION_TYPES.TECH_STACK);
        if (tech && info.matchedTechIds.length > 0) {
          const set = new Set([...(tech.data.technologies || []), ...info.matchedTechIds]);
          tech.data.technologies = Array.from(set);
        }

        const lic = sections.find(s => s.type === SECTION_TYPES.LICENSE);
        if (lic && info.license && info.license !== 'NOASSERTION') {
          lic.data.type = info.license;
          lic.data.holder = info.owner;
        }

        const auth = sections.find(s => s.type === SECTION_TYPES.AUTHOR);
        if (auth && info.owner) {
          auth.data.github = info.owner;
        }
      });

      const langCount = info.languages.length;
      const langSummary = info.languages.slice(0, 3).map(l => `${l.name} (${l.percentage}%)`).join(', ');
      fireConfetti();
      showToast(`Detected ${info.repo}! [${langSummary}]`, 'success');
    } catch (err) {
      showToast(err.message || 'Failed to fetch from GitHub API', 'error');
    } finally {
      navGithubDetectBtn.innerHTML = '<span>⚡</span> Detect';
      navGithubDetectBtn.disabled = false;
    }
  }

  if (navGithubDetectBtn && navGithubInput) {
    navGithubDetectBtn.addEventListener('click', handleNavAutoDetect);
    navGithubInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleNavAutoDetect();
      }
    });
  }

  // Photo / Banner Hub Trigger
  const navPhotosBtn = document.getElementById('nav-photos-btn');
  if (navPhotosBtn) {
    navPhotosBtn.addEventListener('click', () => {
      renderPhotoModal('hero');
    });
  }

  // Wizard Launch Button
  const wizardBtn = document.getElementById('nav-wizard-btn');
  if (wizardBtn) {
    wizardBtn.addEventListener('click', () => openWizard());
  }

  // Template Dropdown
  const templateSelect = document.getElementById('template-select');
  if (templateSelect) {
    templateSelect.innerHTML = `
      <option value="" disabled selected>✨ 1-Click Starters...</option>
      ${TEMPLATES.map(t => `
        <option value="${t.id}">${t.icon} ${t.name}</option>
      `).join('')}
    `;

    templateSelect.addEventListener('change', (e) => {
      const tplId = e.target.value;
      if (tplId) {
        if (confirm('Load this starter template? Your current sections will be updated.')) {
          store.loadTemplate(tplId);
          showToast(`Loaded ${TEMPLATES.find(t => t.id === tplId)?.name} starter!`, 'success');
        }
        templateSelect.value = '';
      }
    });
  }

  // Copy Markdown Button
  const copyBtn = document.getElementById('nav-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      await copyToClipboard(currentMarkdown, 'Markdown copied! Paste directly into GitHub README.md');
    });
  }

  // Download Button
  const downloadBtn = document.getElementById('nav-download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      downloadReadmeFile(currentMarkdown, 'README.md');
    });
  }

  // GitHub Theme Toggle (Dark / Light)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = store.getState().previewTheme;
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      store.setPreviewTheme(nextTheme);

      themeToggleBtn.innerHTML = nextTheme === 'light' 
        ? '<span>☀️</span>' 
        : '<span>🌙</span>';
      showToast(`Switched preview to GitHub ${nextTheme} mode`, 'info');
    });
  }
}

// --- 4. VIEW MODE SWITCHER (SPLIT / PREVIEW / RAW) ---
function setupViewModeSwitcher() {
  const modeBtns = document.querySelectorAll('.view-mode-btn');
  const leftPane = document.getElementById('editor-left-pane');
  const rightPane = document.getElementById('editor-right-pane');
  const previewTab = document.getElementById('preview-render-tab');
  const rawTab = document.getElementById('preview-raw-tab');

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      store.setViewMode(mode);

      modeBtns.forEach(b => {
        b.className = 'view-mode-btn px-3 py-1 text-xs font-medium rounded-md transition-all text-muted-foreground hover:text-foreground';
      });
      btn.className = 'view-mode-btn px-3 py-1 text-xs font-medium rounded-md transition-all bg-background text-foreground shadow-sm';

      if (mode === 'split') {
        leftPane.classList.remove('hidden');
        leftPane.classList.add('w-full', 'lg:w-1/2');
        rightPane.classList.remove('hidden');
        rightPane.classList.add('w-full', 'lg:w-1/2');
        previewTab.classList.remove('hidden');
        rawTab.classList.add('hidden');
      } else if (mode === 'preview') {
        leftPane.classList.add('hidden');
        rightPane.classList.remove('hidden');
        rightPane.className = 'flex-1 h-full overflow-hidden flex flex-col';
        previewTab.classList.remove('hidden');
        rawTab.classList.add('hidden');
      } else if (mode === 'raw') {
        leftPane.classList.add('hidden');
        rightPane.classList.remove('hidden');
        rightPane.className = 'flex-1 h-full overflow-hidden flex flex-col';
        previewTab.classList.add('hidden');
        rawTab.classList.remove('hidden');
      }
    });
  });

  if (rawMarkdownTextarea) {
    rawMarkdownTextarea.addEventListener('input', (e) => {
      currentMarkdown = e.target.value;
      if (previewBody && window.marked) {
        const rawHtml = window.marked.parse(currentMarkdown);
        previewBody.innerHTML = window.DOMPurify ? window.DOMPurify.sanitize(rawHtml) : rawHtml;
      }
    });
  }
}

// --- 5. IMPORT EXISTING README MODAL ---
function setupImportModal() {
  const importBtn = document.getElementById('nav-import-btn');
  const modal = document.getElementById('import-readme-modal');
  const cancelBtn = document.getElementById('close-import-modal-btn');
  const applyBtn = document.getElementById('apply-import-btn');
  const importTextarea = document.getElementById('import-markdown-textarea');
  const fileInput = document.getElementById('import-file-input');

  if (!importBtn || !modal) return;

  importBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  cancelBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (importTextarea) importTextarea.value = evt.target.result;
      };
      reader.readAsText(file);
    }
  });

  applyBtn?.addEventListener('click', () => {
    const text = importTextarea?.value || '';
    if (!text.trim()) {
      showToast('Please paste or upload markdown content first', 'error');
      return;
    }

    store.batchUpdate(sections => {
      sections.forEach(s => s.enabled = false);
      const customSec = sections.find(s => s.id === 'sec-imported');
      if (customSec) {
        customSec.enabled = true;
        customSec.data.markdown = text;
      } else {
        sections.unshift({
          id: 'sec-imported',
          type: 'custom',
          title: 'Imported README',
          enabled: true,
          data: {
            heading: 'Imported Content',
            markdown: text
          }
        });
      }
    });

    modal.classList.add('hidden');
    showToast('Imported README successfully!', 'success');
  });
}

// Robust DOM Ready execution
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}


})();