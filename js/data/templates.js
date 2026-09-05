/**
 * Readmify - Pre-made Templates
 * 7 Curated starters for different project categories
 */
import { SECTION_TYPES } from './defaultSections.js';

export const TEMPLATES = [
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
