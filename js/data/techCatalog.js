/**
 * Readmify - Tech Stack Badge Catalog with SkillIcons & Shields.io Support
 * 130+ popular languages, frameworks, databases, cloud providers, and developer tools
 */

export const TECH_CATEGORIES = [
  { id: 'all', name: 'All Technologies' },
  { id: 'languages', name: 'Languages' },
  { id: 'frontend', name: 'Frontend & Mobile' },
  { id: 'backend', name: 'Backend & APIs' },
  { id: 'database', name: 'Databases & Storage' },
  { id: 'devops', name: 'Cloud & DevOps' },
  { id: 'tools', name: 'Tools & Testing' },
];

export const TECH_CATALOG = [
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
  { id: 'drizzle', name: 'Drizzle ORM', category: 'database', color: 'C5F74F', logo: 'drizzle', logoColor: 'black', skillSlug: null },
  { id: 'sqlalchemy', name: 'SQLAlchemy', category: 'database', color: 'D71F00', logo: 'sqlalchemy', logoColor: 'white', skillSlug: null },

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

  // --- TOOLS & TESTING ---
  { id: 'git', name: 'Git', category: 'tools', color: 'F05032', logo: 'git', logoColor: 'white', skillSlug: 'git' },
  { id: 'github', name: 'GitHub', category: 'tools', color: '181717', logo: 'github', logoColor: 'white', skillSlug: 'github' },
  { id: 'figma', name: 'Figma', category: 'tools', color: 'F24E1E', logo: 'figma', logoColor: 'white', skillSlug: 'figma' },
  { id: 'postman', name: 'Postman', category: 'tools', color: 'FF6C37', logo: 'postman', logoColor: 'white', skillSlug: 'postman' },
  { id: 'jest', name: 'Jest', category: 'tools', color: 'C21325', logo: 'jest', logoColor: 'white', skillSlug: 'jest' },
  { id: 'vitest', name: 'Vitest', category: 'tools', color: '6E9F18', logo: 'vitest', logoColor: 'white', skillSlug: 'vitest' },
  { id: 'cypress', name: 'Cypress', category: 'tools', color: '69D3A7', logo: 'cypress', logoColor: 'black', skillSlug: 'cypress' },
  { id: 'playwright', name: 'Playwright', category: 'tools', color: '2EAD33', logo: 'playwright', logoColor: 'white', skillSlug: 'playwright' },
  { id: 'eslint', name: 'ESLint', category: 'tools', color: '4B32C3', logo: 'eslint', logoColor: 'white', skillSlug: null },
  { id: 'prettier', name: 'Prettier', category: 'tools', color: 'F7B93E', logo: 'prettier', logoColor: 'black', skillSlug: null },
  { id: 'pnpm', name: 'pnpm', category: 'tools', color: 'F69220', logo: 'pnpm', logoColor: 'white', skillSlug: 'pnpm' },
  { id: 'bun', name: 'Bun', category: 'tools', color: '000000', logo: 'bun', logoColor: 'white', skillSlug: 'bun' },
  { id: 'yarn', name: 'Yarn', category: 'tools', color: '2C8EBB', logo: 'yarn', logoColor: 'white', skillSlug: 'yarn' },
  { id: 'npm', name: 'npm', category: 'tools', color: 'CB3837', logo: 'npm', logoColor: 'white', skillSlug: 'npm' },
  { id: 'pytorch', name: 'PyTorch', category: 'tools', color: 'EE4C2C', logo: 'pytorch', logoColor: 'white', skillSlug: 'pytorch' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'tools', color: 'FF6F00', logo: 'tensorflow', logoColor: 'white', skillSlug: 'tensorflow' }
];

export function getBadgeUrl(item, style = 'for-the-badge') {
  const encodedName = encodeURIComponent(item.name.replace(/-/g, '--'));
  return `https://img.shields.io/badge/${encodedName}-${item.color}?style=${style}&logo=${item.logo}&logoColor=${item.logoColor}`;
}

export function getSkillIconsUrl(techIds, theme = 'dark', perline = 10) {
  const slugs = techIds
    .map(id => TECH_CATALOG.find(t => t.id === id)?.skillSlug)
    .filter(Boolean);
  
  if (slugs.length === 0) return null;
  return `https://skillicons.dev/icons?i=${slugs.join(',')}&theme=${theme}&perline=${perline || 10}`;
}

export const TECH_DOC_MAP = {
  typescript: 'https://www.typescriptlang.org',
  javascript: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  python: 'https://www.python.org',
  rust: 'https://www.rust-lang.org',
  go: 'https://go.dev',
  java: 'https://www.java.com',
  csharp: 'https://dotnet.microsoft.com/en-us/languages/csharp',
  cpp: 'https://isocpp.org',
  c: 'https://en.cppreference.com/w/c',
  php: 'https://www.php.net',
  swift: 'https://www.swift.org',
  kotlin: 'https://kotlinlang.org',
  dart: 'https://dart.dev',
  ruby: 'https://www.ruby-lang.org',
  html5: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  css3: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  react: 'https://react.dev',
  nextjs: 'https://nextjs.org',
  vue: 'https://vuejs.org',
  nuxtjs: 'https://nuxt.com',
  svelte: 'https://svelte.dev',
  angular: 'https://angular.dev',
  tailwind: 'https://tailwindcss.com',
  vite: 'https://vite.dev',
  astro: 'https://astro.build',
  redux: 'https://redux.js.org',
  flutter: 'https://flutter.dev',
  reactnative: 'https://reactnative.dev',
  bootstrap: 'https://getbootstrap.com',
  sass: 'https://sass-lang.com',
  threejs: 'https://threejs.org',
  electron: 'https://www.electronjs.org',
  nodejs: 'https://nodejs.org',
  express: 'https://expressjs.com',
  fastapi: 'https://fastapi.tiangolo.com',
  nestjs: 'https://nestjs.com',
  django: 'https://www.djangoproject.com',
  flask: 'https://flask.palletsprojects.com',
  spring: 'https://spring.io',
  graphql: 'https://graphql.org',
  trpc: 'https://trpc.io',
  hono: 'https://hono.dev',
  bun: 'https://bun.sh',
  deno: 'https://deno.com',
  postgres: 'https://www.postgresql.org',
  mongodb: 'https://www.mongodb.com',
  redis: 'https://redis.io',
  mysql: 'https://www.mysql.com',
  sqlite: 'https://www.sqlite.org',
  prisma: 'https://www.prisma.io',
  drizzle: 'https://orm.drizzle.team',
  supabase: 'https://supabase.com',
  firebase: 'https://firebase.google.com',
  docker: 'https://www.docker.com',
  kubernetes: 'https://kubernetes.io',
  aws: 'https://aws.amazon.com',
  gcp: 'https://cloud.google.com',
  azure: 'https://azure.microsoft.com',
  vercel: 'https://vercel.com',
  netlify: 'https://www.netlify.com',
  cloudflare: 'https://www.cloudflare.com',
  githubactions: 'https://github.com/features/actions',
  git: 'https://git-scm.com',
  github: 'https://github.com',
  figma: 'https://www.figma.com',
  postman: 'https://www.postman.com',
  jest: 'https://jestjs.io',
  vitest: 'https://vitest.dev',
  cypress: 'https://www.cypress.io',
  playwright: 'https://playwright.dev',
  pnpm: 'https://pnpm.io',
  yarn: 'https://yarnpkg.com',
  npm: 'https://www.npmjs.com'
};

export function getTechDocUrl(itemOrId) {
  const id = typeof itemOrId === 'string' ? itemOrId : itemOrId?.id;
  if (!id) return 'https://github.com';
  return TECH_DOC_MAP[id] || `https://github.com/topics/${encodeURIComponent(id)}`;
}
