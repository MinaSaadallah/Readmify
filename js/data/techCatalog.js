/**
 * Curated technology catalog for the Tech Stack / Badges sections.
 * Badge images come from shields.io's static-badge endpoint using simple-icons
 * logo slugs (https://simpleicons.org) — both are free, keyless, public services.
 */

export const TECH_CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'languages', name: 'Languages' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'database', name: 'Databases' },
  { id: 'devops', name: 'Cloud & DevOps' },
  { id: 'tools', name: 'Tools' }
];

// color = simple-icons brand hex (no '#'); logoColor = text color shields should draw the logo in.
export const TECH_CATALOG = [
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
export function techById(id) {
  if (techByIdCache.has(id)) return techByIdCache.get(id);
  const found = TECH_CATALOG.find(t => t.id === id) || null;
  techByIdCache.set(id, found);
  return found;
}

export function getBadgeUrl(item, style = 'for-the-badge') {
  const encodedName = encodeURIComponent(String(item.name).replace(/-/g, '--'));
  return `https://img.shields.io/badge/${encodedName}-${item.color}?style=${style}&logo=${item.logo}&logoColor=${item.logoColor}`;
}

export function getTechDocUrl(itemOrId) {
  const id = typeof itemOrId === 'string' ? itemOrId : itemOrId?.id;
  if (!id) return 'https://github.com';
  return TECH_DOC_MAP[id] || `https://github.com/topics/${id}`;
}
