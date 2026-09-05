/** Readmify v2 Bundle - Universal Offline & GitHub Pages Compatibility */

(function() {
  'use strict';


/* ==================== MODULE: data/techCatalog.js ==================== */
/**
 * Readmify - Tech Stack Badge Catalog with SkillIcons & Shields.io Support
 * 130+ popular languages, frameworks, databases, cloud providers, and developer tools
 */const TECH_CATEGORIES = [
  { id: 'all', name: 'All Technologies' },
  { id: 'languages', name: 'Languages' },
  { id: 'frontend', name: 'Frontend & Mobile' },
  { id: 'backend', name: 'Backend & APIs' },
  { id: 'database', name: 'Databases & Storage' },
  { id: 'devops', name: 'Cloud & DevOps' },
  { id: 'tools', name: 'Tools & Testing' },
];const TECH_CATALOG = [
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
];function getBadgeUrl(item, style = 'for-the-badge') {
  const encodedName = encodeURIComponent(item.name.replace(/-/g, '--'));
  return `https://img.shields.io/badge/${encodedName}-${item.color}?style=${style}&logo=${item.logo}&logoColor=${item.logoColor}`;
}function getSkillIconsUrl(techIds, theme = 'dark', perline = 10) {
  const slugs = techIds
    .map(id => TECH_CATALOG.find(t => t.id === id)?.skillSlug)
    .filter(Boolean);
  
  if (slugs.length === 0) return null;
  return `https://skillicons.dev/icons?i=${slugs.join(',')}&theme=${theme}&perline=${perline || 10}`;
}const TECH_DOC_MAP = {
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
};function getTechDocUrl(itemOrId) {
  const id = typeof itemOrId === 'string' ? itemOrId : itemOrId?.id;
  if (!id) return 'https://github.com';
  return TECH_DOC_MAP[id] || `https://github.com/topics/${encodeURIComponent(id)}`;
}


/* ==================== MODULE: data/licenses.js ==================== */
/**
 * Readmify - Open Source Legal License Catalog & Agreement Generator
 * Definitions, permission matrices, and authentic standard legal texts
 */
const LICENSE_CATALOG = [
  {
    id: 'MIT',
    name: 'MIT License',
    spdxId: 'MIT',
    shortDesc: 'A short and simple permissive license with conditions only requiring preservation of copyright and license notices.',
    badgeColor: 'yellow',
    badgeUrl: 'https://img.shields.io/badge/License-MIT-yellow.svg',
    url: 'https://opensource.org/licenses/MIT',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    limitations: ['Liability', 'Warranty'],
    conditions: ['License and copyright notice'],
    generateText: (year, holder, projectName) => `MIT License

Copyright (c) ${year || new Date().getFullYear()} ${holder || 'The Authors'}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`
  },
  {
    id: 'Apache-2.0',
    name: 'Apache License 2.0',
    spdxId: 'Apache-2.0',
    shortDesc: 'A permissive license whose main conditions require preservation of copyright and license notices, and explicit grant of patent rights.',
    badgeColor: 'blue',
    badgeUrl: 'https://img.shields.io/badge/License-Apache_2.0-blue.svg',
    url: 'https://opensource.org/licenses/Apache-2.0',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Patent grant', 'Private use'],
    limitations: ['Trademark use', 'Liability', 'Warranty'],
    conditions: ['License and copyright notice', 'State changes'],
    generateText: (year, holder, projectName) => `                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   Copyright ${year || new Date().getFullYear()} ${holder || 'The Authors'}

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.`
  },
  {
    id: 'GPL-3.0',
    name: 'GNU General Public License v3.0',
    spdxId: 'GPL-3.0',
    shortDesc: 'Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications.',
    badgeColor: 'blue',
    badgeUrl: 'https://img.shields.io/badge/License-GPLv3-blue.svg',
    url: 'https://www.gnu.org/licenses/gpl-3.0',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Patent grant', 'Private use'],
    limitations: ['Liability', 'Warranty'],
    conditions: ['Disclose source', 'License and copyright notice', 'Same license', 'State changes'],
    generateText: (year, holder, projectName) => `${projectName || 'This program'} - A free and open-source project
Copyright (C) ${year || new Date().getFullYear()} ${holder || 'The Authors'}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`
  },
  {
    id: 'AGPL-3.0',
    name: 'GNU Affero General Public License v3.0',
    spdxId: 'AGPL-3.0',
    shortDesc: 'Strongest copyleft license. Network users interacting with the software remotely via web/API are entitled to receive the full source code.',
    badgeColor: 'blue',
    badgeUrl: 'https://img.shields.io/badge/License-AGPL_v3-blue.svg',
    url: 'https://www.gnu.org/licenses/agpl-3.0',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Patent grant', 'Private use'],
    limitations: ['Liability', 'Warranty'],
    conditions: ['Disclose source', 'Network use is distribution', 'License and copyright notice', 'Same license', 'State changes'],
    generateText: (year, holder, projectName) => `${projectName || 'This program'} - An open-source application
Copyright (C) ${year || new Date().getFullYear()} ${holder || 'The Authors'}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.`
  },
  {
    id: 'BSD-3-Clause',
    name: 'BSD 3-Clause License',
    spdxId: 'BSD-3-Clause',
    shortDesc: 'A permissive license similar to BSD 2-Clause, with a clause forbidding others from using copyright holders names for promotional endorsement without permission.',
    badgeColor: 'blue',
    badgeUrl: 'https://img.shields.io/badge/License-BSD_3--Clause-blue.svg',
    url: 'https://opensource.org/licenses/BSD-3-Clause',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    limitations: ['Liability', 'Warranty'],
    conditions: ['License and copyright notice'],
    generateText: (year, holder, projectName) => `BSD 3-Clause License

Copyright (c) ${year || new Date().getFullYear()}, ${holder || 'The Authors'}
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`
  },
  {
    id: 'BSD-2-Clause',
    name: 'BSD 2-Clause License',
    spdxId: 'BSD-2-Clause',
    shortDesc: 'A permissive license that comes in two clauses. Extremely lightweight and simple.',
    badgeColor: 'blue',
    badgeUrl: 'https://img.shields.io/badge/License-BSD_2--Clause-orange.svg',
    url: 'https://opensource.org/licenses/BSD-2-Clause',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    limitations: ['Liability', 'Warranty'],
    conditions: ['License and copyright notice'],
    generateText: (year, holder, projectName) => `BSD 2-Clause License

Copyright (c) ${year || new Date().getFullYear()}, ${holder || 'The Authors'}
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`
  },
  {
    id: 'MPL-2.0',
    name: 'Mozilla Public License 2.0',
    spdxId: 'MPL-2.0',
    shortDesc: 'A weak copyleft license that is file-level rather than project-level, allowing proprietary extensions as long as modified MPL files remain open source.',
    badgeColor: 'brightgreen',
    badgeUrl: 'https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg',
    url: 'https://opensource.org/licenses/MPL-2.0',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Patent grant', 'Private use'],
    limitations: ['Trademark use', 'Liability', 'Warranty'],
    conditions: ['Disclose source (file-level)', 'License and copyright notice', 'Same license (file-level)'],
    generateText: (year, holder, projectName) => `This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Copyright (c) ${year || new Date().getFullYear()} ${holder || 'The Authors'}`
  },
  {
    id: 'ISC',
    name: 'ISC License',
    spdxId: 'ISC',
    shortDesc: 'A permissive license functionally equivalent to the 2-Clause BSD and MIT licenses, with language that was considered simpler.',
    badgeColor: 'blue',
    badgeUrl: 'https://img.shields.io/badge/License-ISC-blue.svg',
    url: 'https://opensource.org/licenses/ISC',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    limitations: ['Liability', 'Warranty'],
    conditions: ['License and copyright notice'],
    generateText: (year, holder, projectName) => `ISC License

Copyright (c) ${year || new Date().getFullYear()} ${holder || 'The Authors'}

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.`
  },
  {
    id: 'Unlicense',
    name: 'The Unlicense',
    spdxId: 'Unlicense',
    shortDesc: 'A license with no conditions whatsoever which dedicates works to the public domain. Equivalent to CC0.',
    badgeColor: 'lightgrey',
    badgeUrl: 'https://img.shields.io/badge/license-Unlicense-blue.svg',
    url: 'https://unlicense.org/',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    limitations: ['Liability', 'Warranty'],
    conditions: [],
    generateText: () => `This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org>`
  }
];
function getLicenseById(id) {
  if (!id) return LICENSE_CATALOG[0];
  const norm = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  return LICENSE_CATALOG.find(l => {
    const lNorm = l.id.toLowerCase().replace(/[^a-z0-9]/g, '');
    const spdxNorm = l.spdxId.toLowerCase().replace(/[^a-z0-9]/g, '');
    return lNorm === norm || spdxNorm === norm;
  }) || LICENSE_CATALOG[0];
}


/* ==================== MODULE: data/defaultSections.js ==================== */
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
const INITIAL_SECTIONS = [
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
        { icon: '⚡', title: 'Lightning Fast Performance', desc: 'Engineered for speed, minimal resource overhead, and instant responsiveness.' },
        { icon: '🎨', title: 'Modern Intuitive Interface', desc: 'Clean, accessible, and responsive user experience designed for productivity.' },
        { icon: '🔒', title: 'Secure & Reliable', desc: 'Robust architecture with rigorous error handling and privacy-conscious design.' },
        { icon: '📦', title: 'Modular & Extensible', desc: 'Easily customizable components with well-documented APIs and configuration.' }
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
function createSection(type, customTitle) {
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


/* ==================== MODULE: data/templates.js ==================== */
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


/* ==================== MODULE: services/githubApi.js ==================== */
/**
 * Readmify - GitHub Deep Repository Inspection Service
 * Free, zero-auth public repository, tree, manifest, and environment inspection
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

// Map npm package names & keywords to Tech Catalog IDs
const NPM_PACKAGE_MAP = {
  'react': 'react',
  'react-dom': 'react',
  'next': 'nextjs',
  'vue': 'vue',
  'nuxt': 'nuxtjs',
  'svelte': 'svelte',
  '@sveltejs/kit': 'svelte',
  '@angular/core': 'angular',
  'tailwindcss': 'tailwind',
  '@tailwindcss/postcss': 'tailwind',
  'vite': 'vite',
  'astro': 'astro',
  'redux': 'redux',
  '@reduxjs/toolkit': 'redux',
  'react-native': 'reactnative',
  'bootstrap': 'bootstrap',
  'sass': 'sass',
  'three': 'threejs',
  'electron': 'electron',
  'express': 'express',
  'fastify': 'fastify',
  '@nestjs/core': 'nestjs',
  'graphql': 'graphql',
  'prisma': 'prisma',
  '@prisma/client': 'prisma',
  'drizzle-orm': 'drizzle',
  'mongoose': 'mongodb',
  'pg': 'postgres',
  'mysql2': 'mysql',
  'redis': 'redis',
  'ioredis': 'redis',
  'sqlite3': 'sqlite',
  '@supabase/supabase-js': 'supabase',
  'firebase': 'firebase',
  'jest': 'jest',
  'vitest': 'vitest',
  'cypress': 'cypress',
  'playwright': 'playwright',
  '@playwright/test': 'playwright',
  'eslint': 'eslint',
  'prettier': 'prettier',
  'typescript': 'typescript'
};

// Map Python packages to Tech Catalog IDs
const PYTHON_PACKAGE_MAP = {
  'fastapi': 'fastapi',
  'flask': 'flask',
  'django': 'django',
  'torch': 'pytorch',
  'pytorch': 'pytorch',
  'tensorflow': 'tensorflow',
  'pytest': 'vitest',
  'redis': 'redis',
  'psycopg2': 'postgres',
  'pymongo': 'mongodb',
  'sqlalchemy': 'sqlalchemy',
  'docker': 'docker'
};

// Map Rust crates to Tech Catalog IDs
const RUST_CRATE_MAP = {
  'tokio': 'rust',
  'actix-web': 'rust',
  'axum': 'rust',
  'serde': 'rust',
  'diesel': 'database',
  'sqlx': 'database',
  'tauri': 'rust'
};

// Map Go modules to Tech Catalog IDs
const GO_MODULE_MAP = {
  'gin-gonic/gin': 'go',
  'gofiber/fiber': 'go',
  'labstack/echo': 'go',
  'gorm.io/gorm': 'database'
};
function parseGitHubRepoInput(input) {
  if (!input || typeof input !== 'string') return null;
  const clean = input.trim().replace(/\/$/, '');

  // Format: https://github.com/owner/repo or http://...
  const urlMatch = clean.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/);
  if (urlMatch) {
    return { owner: urlMatch[1], repo: urlMatch[2].replace(/\.git$/, '') };
  }

  // Format: git@github.com:owner/repo.git
  const gitSshMatch = clean.match(/git@github\.com:([^\/]+)\/([^\/\?#]+)/);
  if (gitSshMatch) {
    return { owner: gitSshMatch[1], repo: gitSshMatch[2].replace(/\.git$/, '') };
  }

  // Format: owner/repo
  const slashMatch = clean.match(/^([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)$/);
  if (slashMatch) {
    return { owner: slashMatch[1], repo: slashMatch[2].replace(/\.git$/, '') };
  }

  return null;
}

/**
 * Fetch raw file text from repository (raw.githubusercontent.com or API fallback)
 */
async function fetchRawFile(owner, repo, branch, filePath) {
  const rawUrl = `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${encodeURIComponent(branch)}/${filePath}`;
  try {
    const res = await fetch(rawUrl);
    if (res.ok) {
      return await res.text();
    }
  } catch (err) {
    // raw fetch failed, fallback to API
  }

  try {
    const apiRes = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${filePath}?ref=${encodeURIComponent(branch)}`,
      { headers: { 'Accept': 'application/vnd.github.raw+json' } }
    );
    if (apiRes.ok) {
      return await apiRes.text();
    }
  } catch (err) {
    // ignore
  }

  return null;
}

/**
 * Parse .env.example / .env.sample into structured variables
 */
function parseEnvContent(envText) {
  if (!envText) return [];
  const lines = envText.split('\n');
  const vars = [];
  let pendingComment = '';

  for (let line of lines) {
    line = line.trim();
    if (!line) {
      pendingComment = '';
      continue;
    }
    if (line.startsWith('#')) {
      const commentText = line.replace(/^#+\s*/, '').trim();
      if (commentText) {
        pendingComment = pendingComment ? `${pendingComment} ${commentText}` : commentText;
      }
      continue;
    }

    const eqIdx = line.indexOf('=');
    if (eqIdx !== -1) {
      const key = line.substring(0, eqIdx).trim();
      let val = line.substring(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
      const commentSplit = val.split(/\s+#\s+/);
      let inlineComment = '';
      if (commentSplit.length > 1) {
        val = commentSplit[0].trim();
        inlineComment = commentSplit.slice(1).join(' ').trim();
      }

      const desc = inlineComment || pendingComment || `Configuration key for ${key}`;
      const isRequired = val === '' || val.includes('required') || val.includes('change_me') || val.includes('your_');

      vars.push({
        key,
        desc,
        default: val || '-',
        required: isRequired
      });
      pendingComment = '';
    }
  }

  return vars;
}

/**
 * Generate a clean ASCII folder tree from repository file paths
 */
function buildAsciiDirectoryTree(filePaths) {
  if (!filePaths || !filePaths.length) return '';

  const ignoredPrefixes = [
    'node_modules/', '.git/', '.next/', 'dist/', 'build/', 'target/',
    '__pycache__/', 'venv/', '.venv/', '.cache/', '.vscode/', '.idea/',
    'vendor/', '.turbo/', 'coverage/', '.docusaurus/', '.output/'
  ];

  const filteredPaths = filePaths.filter(p => !ignoredPrefixes.some(ign => p.startsWith(ign)));

  // Build tree node hierarchy
  const root = {};
  for (const p of filteredPaths) {
    const parts = p.split('/');
    if (parts.length > 3) continue; // limit depth to 3 levels for clean presentation
    let curr = root;
    for (const part of parts) {
      if (!curr[part]) curr[part] = {};
      curr = curr[part];
    }
  }

  const lines = ['.'];
  function formatNode(node, prefix = '') {
    const keys = Object.keys(node).sort((a, b) => {
      const aIsDir = Object.keys(node[a]).length > 0;
      const bIsDir = Object.keys(node[b]).length > 0;
      if (aIsDir && !bIsDir) return -1;
      if (!aIsDir && bIsDir) return 1;
      return a.localeCompare(b);
    });

    keys.forEach((key, index) => {
      const isLast = index === keys.length - 1;
      const pointer = isLast ? '└── ' : '├── ';
      const isDir = Object.keys(node[key]).length > 0;
      lines.push(`${prefix}${pointer}${key}${isDir ? '/' : ''}`);
      if (isDir) {
        formatNode(node[key], `${prefix}${isLast ? '    ' : '│   '}`);
      }
    });
  }

  formatNode(root);
  return lines.slice(0, 35).join('\n'); // keep max 35 lines
}

/**
 * Synthesize intelligent features tailored to what was discovered in the repository
 */
function synthesizeSmartFeatures(analysis) {
  const { languages, matchedTechIds, packageManager, hasDocker, hasCi, hasEnv, envVars, scripts, repoName } = analysis;
  const features = [];

  const techSet = new Set(matchedTechIds);

  // 1. Framework / Core Architecture
  if (techSet.has('nextjs')) {
    features.push({
      icon: '⚡',
      title: 'Next.js App Router Architecture',
      desc: 'High-performance React application leveraging modern server components, streaming SSR, and optimized client bundles.'
    });
  } else if (techSet.has('react')) {
    features.push({
      icon: '⚛️',
      title: 'Modern React Interface',
      desc: 'Component-driven, reactive user interface engineered for responsiveness and high performance.'
    });
  } else if (techSet.has('vue') || techSet.has('nuxtjs')) {
    features.push({
      icon: '💚',
      title: 'Vue / Nuxt Reactive Architecture',
      desc: 'Progressive, intuitive frontend architecture with reactive state management and fast rendering.'
    });
  } else if (techSet.has('fastapi')) {
    features.push({
      icon: '⚡',
      title: 'FastAPI High-Performance Engine',
      desc: 'Asynchronous REST APIs with automatic OpenAPI/Swagger documentation and strict type validation.'
    });
  } else if (techSet.has('express')) {
    features.push({
      icon: '🚀',
      title: 'Lightweight Express.js Backend',
      desc: 'Modular, event-driven RESTful architecture with clean middleware handling and routing.'
    });
  } else if (techSet.has('rust')) {
    features.push({
      icon: '🦀',
      title: 'Blazing-Fast Rust Foundation',
      desc: 'Zero-cost abstractions, memory safety without garbage collection, and concurrency support.'
    });
  } else if (techSet.has('go')) {
    features.push({
      icon: '🐹',
      title: 'Concurrent Go Architecture',
      desc: 'High-throughput networking and minimal memory footprint powered by lightweight Goroutines.'
    });
  }

  // 2. Styling / UI Design
  if (techSet.has('tailwind')) {
    features.push({
      icon: '🎨',
      title: 'Tailwind CSS Design System',
      desc: 'Utility-first modern responsive styling with seamless dark/light theme adaptability.'
    });
  }

  // 3. Type Safety
  if (techSet.has('typescript')) {
    features.push({
      icon: '🛡️',
      title: 'Strict TypeScript Safety',
      desc: 'End-to-end type safety, autocompletion, and robust compile-time contract verification.'
    });
  }

  // 4. Database & ORM
  if (techSet.has('prisma')) {
    features.push({
      icon: '🗄️',
      title: 'Type-Safe Prisma ORM',
      desc: 'Automated database migrations, declarative schemas, and type-safe query generation.'
    });
  } else if (techSet.has('postgres')) {
    features.push({
      icon: '🐘',
      title: 'PostgreSQL Relational Storage',
      desc: 'ACID-compliant relational database management with advanced indexing and JSON capabilities.'
    });
  } else if (techSet.has('mongodb')) {
    features.push({
      icon: '🍃',
      title: 'Scalable Document Storage',
      desc: 'Flexible NoSQL document model powered by MongoDB for rapid development.'
    });
  }

  // 5. Containerization
  if (hasDocker) {
    features.push({
      icon: '🐳',
      title: 'Docker Containerization',
      desc: 'Instant containerized local environment and production deployment via Docker.'
    });
  }

  // 6. Automated Testing
  if (techSet.has('vitest') || techSet.has('jest') || scripts.test) {
    features.push({
      icon: '🧪',
      title: 'Automated Test Suite',
      desc: 'Comprehensive unit, integration, and regression testing suite for reliability and stability.'
    });
  }

  // 7. CI/CD Workflows
  if (hasCi) {
    features.push({
      icon: '🔄',
      title: 'Continuous Integration & Delivery',
      desc: 'Automated GitHub Actions workflows verifying code quality, builds, and test suites on every push.'
    });
  }

  // Fallback defaults if few detected
  if (features.length < 3) {
    features.push({
      icon: '🎯',
      title: 'Developer-Friendly Setup',
      desc: 'Clean repository layout with straightforward configuration and clear dependencies.'
    });
    features.push({
      icon: '📦',
      title: 'Lightweight & Modular',
      desc: 'Built with minimal dependencies to ensure fast build times and easy extensibility.'
    });
  }

  return features.slice(0, 6);
}

/**
 * Deep, comprehensive GitHub repository inspection
 * Inspects:
 * - Metadata (stars, forks, description, license, topics)
 * - Languages and percentage breakdown
 * - Full recursive git file tree
 * - package.json / requirements.txt / Cargo.toml / go.mod / docker-compose.yml / .env.example
 * - GitHub Actions workflows
 * - Project directory structure
 * - Generates tailored installation, usage, environment variables, features, and badges
 */
async function fetchGitHubRepoFullDetails(owner, repo, onProgress = () => {}) {
  onProgress({ step: 1, message: `Connecting to GitHub API for ${owner}/${repo}...` });

  // 1. Fetch Repo Metadata & Languages in parallel
  const [repoRes, langRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`),
    fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`)
  ]);

  if (!repoRes.ok) {
    if (repoRes.status === 404) {
      throw new Error(`Repository "${owner}/${repo}" was not found or is private.`);
    } else if (repoRes.status === 403) {
      throw new Error('GitHub API rate limit reached. Please wait a moment or try again.');
    }
    throw new Error(`GitHub API returned error ${repoRes.status}`);
  }

  const repoData = await repoRes.json();
  const langData = langRes.ok ? await langRes.json() : {};
  const defaultBranch = repoData.default_branch || 'main';

  // Calculate languages
  const totalBytes = Object.values(langData).reduce((a, b) => a + b, 0);
  const languages = [];
  const matchedTechSet = new Set();
  const skillSlugs = [];

  for (const [langName, bytes] of Object.entries(langData)) {
    const pct = totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0;
    languages.push({ name: langName, bytes, percentage: pct });

    const mapped = GITHUB_TO_TECH_MAP[langName.toLowerCase()];
    if (mapped) {
      matchedTechSet.add(mapped.id);
      if (mapped.skill) skillSlugs.push(mapped.skill);
    }
  }

  onProgress({ step: 2, message: `Scanning repository file tree on branch "${defaultBranch}"...` });

  // 2. Fetch Recursive Git Tree
  let filePaths = [];
  try {
    const treeRes = await fetch(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/trees/${encodeURIComponent(defaultBranch)}?recursive=1`);
    if (treeRes.ok) {
      const treeData = await treeRes.json();
      if (Array.isArray(treeData.tree)) {
        filePaths = treeData.tree.map(item => item.path);
      }
    }
  } catch (err) {
    console.warn('Could not fetch recursive git tree:', err);
  }

  onProgress({ step: 3, message: `Analyzing ${filePaths.length || 'project'} files & manifests...` });

  // Detect ecosystem presence from file paths
  const hasPackageJson = filePaths.some(p => p === 'package.json');
  const hasPnpmLock = filePaths.some(p => p === 'pnpm-lock.yaml');
  const hasYarnLock = filePaths.some(p => p === 'yarn.lock');
  const hasBunLock = filePaths.some(p => p === 'bun.lockb' || p === 'bun.lock');
  const hasNpmLock = filePaths.some(p => p === 'package-lock.json');
  const hasTsConfig = filePaths.some(p => p.startsWith('tsconfig') || p.endsWith('.ts') || p.endsWith('.tsx'));
  const hasTailwind = filePaths.some(p => p.includes('tailwind.config') || p.includes('tailwind.css'));
  const hasDocker = filePaths.some(p => p.toLowerCase().includes('dockerfile') || p.includes('docker-compose'));
  const hasEnvExample = filePaths.find(p => p === '.env.example' || p === '.env.sample' || p === '.env.template');
  const hasCargo = filePaths.some(p => p === 'Cargo.toml');
  const hasGoMod = filePaths.some(p => p === 'go.mod');
  const hasRequirements = filePaths.some(p => p === 'requirements.txt');
  const hasPyproject = filePaths.some(p => p === 'pyproject.toml');

  // CI Workflows
  const workflowFiles = filePaths
    .filter(p => p.startsWith('.github/workflows/') && (p.endsWith('.yml') || p.endsWith('.yaml')))
    .map(p => p.replace('.github/workflows/', ''));

  if (hasTsConfig) matchedTechSet.add('typescript');
  if (hasTailwind) matchedTechSet.add('tailwind');
  if (hasDocker) matchedTechSet.add('docker');
  if (workflowFiles.length > 0) matchedTechSet.add('githubactions');

  // Determine Package Manager
  let packageManager = 'npm';
  if (hasBunLock) packageManager = 'bun';
  else if (hasPnpmLock) packageManager = 'pnpm';
  else if (hasYarnLock) packageManager = 'yarn';
  else if (hasCargo) packageManager = 'cargo';
  else if (hasGoMod) packageManager = 'go';
  else if (hasRequirements || hasPyproject) packageManager = 'pip';

  if (packageManager === 'pnpm') matchedTechSet.add('pnpm');
  if (packageManager === 'bun') matchedTechSet.add('bun');
  if (packageManager === 'yarn') matchedTechSet.add('yarn');

  // 3. Deep manifest fetching
  let packageJsonData = null;
  let parsedEnvVars = [];
  let scripts = {};

  // Fetch package.json if present
  if (hasPackageJson) {
    onProgress({ step: 4, message: 'Inspecting package.json dependencies and scripts...' });
    const pkgRaw = await fetchRawFile(owner, repo, defaultBranch, 'package.json');
    if (pkgRaw) {
      try {
        packageJsonData = JSON.parse(pkgRaw);
        scripts = packageJsonData.scripts || {};

        const allDeps = {
          ...(packageJsonData.dependencies || {}),
          ...(packageJsonData.devDependencies || {})
        };

        for (const depName of Object.keys(allDeps)) {
          const lower = depName.toLowerCase();
          if (NPM_PACKAGE_MAP[lower]) {
            matchedTechSet.add(NPM_PACKAGE_MAP[lower]);
          }
        }
      } catch (e) {
        console.warn('Failed to parse package.json:', e);
      }
    }
  }

  // Fetch Python requirements or pyproject if present
  if (hasRequirements || hasPyproject) {
    onProgress({ step: 4, message: 'Inspecting Python dependencies...' });
    const reqText = hasRequirements ? await fetchRawFile(owner, repo, defaultBranch, 'requirements.txt') : '';
    const pyprojText = hasPyproject ? await fetchRawFile(owner, repo, defaultBranch, 'pyproject.toml') : '';
    const combined = `${reqText || ''}\n${pyprojText || ''}`.toLowerCase();

    for (const [pkg, techId] of Object.entries(PYTHON_PACKAGE_MAP)) {
      if (combined.includes(pkg)) {
        matchedTechSet.add(techId);
      }
    }
  }

  // Fetch Rust Cargo.toml if present
  if (hasCargo) {
    onProgress({ step: 4, message: 'Inspecting Cargo.toml crates...' });
    const cargoRaw = await fetchRawFile(owner, repo, defaultBranch, 'Cargo.toml');
    if (cargoRaw) {
      const lower = cargoRaw.toLowerCase();
      for (const [crate, techId] of Object.entries(RUST_CRATE_MAP)) {
        if (lower.includes(crate)) matchedTechSet.add(techId);
      }
    }
  }

  // Fetch Go go.mod if present
  if (hasGoMod) {
    onProgress({ step: 4, message: 'Inspecting go.mod modules...' });
    const goModRaw = await fetchRawFile(owner, repo, defaultBranch, 'go.mod');
    if (goModRaw) {
      const lower = goModRaw.toLowerCase();
      for (const [mod, techId] of Object.entries(GO_MODULE_MAP)) {
        if (lower.includes(mod)) matchedTechSet.add(techId);
      }
    }
  }

  // Fetch .env.example if present
  if (hasEnvExample) {
    onProgress({ step: 5, message: `Parsing environment variables from ${hasEnvExample}...` });
    const envRaw = await fetchRawFile(owner, repo, defaultBranch, hasEnvExample);
    if (envRaw) {
      parsedEnvVars = parseEnvContent(envRaw);
    }
  }

  onProgress({ step: 6, message: 'Mapping directory architecture and synthesising features...' });

  // 4. Generate Project Structure ASCII Tree
  const asciiTree = buildAsciiDirectoryTree(filePaths);

  // 5. Generate tailored installation steps
  const installSteps = [];
  installSteps.push({
    title: 'Clone the repository',
    cmd: `git clone https://github.com/${owner}/${repo}.git\ncd ${repo}`
  });

  if (hasPackageJson) {
    const installCmd = packageManager === 'yarn' ? 'yarn install' : `${packageManager} install`;
    installSteps.push({
      title: 'Install dependencies',
      cmd: installCmd
    });

    // Dev/Start script
    if (scripts.dev) {
      const devCmd = packageManager === 'yarn' ? 'yarn dev' : `${packageManager} run dev`;
      installSteps.push({
        title: 'Start development server',
        cmd: devCmd
      });
    } else if (scripts.start) {
      const startCmd = packageManager === 'yarn' ? 'yarn start' : `${packageManager} start`;
      installSteps.push({
        title: 'Start the application',
        cmd: startCmd
      });
    }

    if (scripts.test) {
      installSteps.push({
        title: 'Run test suite',
        cmd: `${packageManager} test`
      });
    }
  } else if (hasRequirements || hasPyproject) {
    installSteps.push({
      title: 'Set up Python virtual environment',
      cmd: 'python -m venv venv\nsource venv/bin/activate  # On Windows: .\\venv\\Scripts\\activate'
    });
    if (hasRequirements) {
      installSteps.push({
        title: 'Install dependencies',
        cmd: 'pip install -r requirements.txt'
      });
    }
    if (matchedTechSet.has('fastapi')) {
      installSteps.push({
        title: 'Start FastAPI server',
        cmd: 'uvicorn main:app --reload'
      });
    } else if (matchedTechSet.has('flask')) {
      installSteps.push({
        title: 'Start Flask application',
        cmd: 'flask run'
      });
    } else if (matchedTechSet.has('django')) {
      installSteps.push({
        title: 'Run Django migrations and start server',
        cmd: 'python manage.py migrate\npython manage.py runserver'
      });
    } else {
      installSteps.push({
        title: 'Run application',
        cmd: 'python main.py'
      });
    }
  } else if (hasCargo) {
    installSteps.push({
      title: 'Build project with Cargo',
      cmd: 'cargo build --release'
    });
    installSteps.push({
      title: 'Run application',
      cmd: 'cargo run'
    });
  } else if (hasGoMod) {
    installSteps.push({
      title: 'Download dependencies',
      cmd: 'go mod download'
    });
    installSteps.push({
      title: 'Run application',
      cmd: 'go run .'
    });
  }

  // 6. Prerequisites definition
  let prerequisites = '';
  if (hasPackageJson) {
    const nodeEng = packageJsonData?.engines?.node ? ` (Node.js ${packageJsonData.engines.node})` : ' (Node.js 18+)';
    prerequisites = `${packageManager.toUpperCase()}${nodeEng} and Git installed on your system.`;
  } else if (hasRequirements || hasPyproject) {
    prerequisites = 'Python 3.9+ and Git installed on your system.';
  } else if (hasCargo) {
    prerequisites = 'Rust and Cargo toolchain (latest stable) installed.';
  } else if (hasGoMod) {
    prerequisites = 'Go 1.20+ installed on your system.';
  } else {
    prerequisites = 'Git installed on your system.';
  }

  // 7. Workflow status badges
  const workflowBadges = workflowFiles.map(file => {
    const name = file.replace(/\.(yml|yaml)$/, '').replace(/[-_]/g, ' ').toUpperCase();
    return {
      name,
      file,
      url: `https://github.com/${owner}/${repo}/actions/workflows/${file}`
    };
  });

  // 8. Synthesize smart features
  const matchedTechIds = Array.from(matchedTechSet);
  const smartFeatures = synthesizeSmartFeatures({
    languages,
    matchedTechIds,
    packageManager,
    hasDocker,
    hasCi: workflowFiles.length > 0,
    hasEnv: parsedEnvVars.length > 0,
    envVars: parsedEnvVars,
    scripts,
    repoName: repoData.name || repo
  });

  onProgress({ step: 7, message: 'Analysis complete! Ready to generate README.' });

  return {
    owner: repoData.owner?.login || owner,
    repo: repoData.name || repo,
    description: repoData.description || packageJsonData?.description || '',
    stars: repoData.stargazers_count || 0,
    forks: repoData.forks_count || 0,
    openIssues: repoData.open_issues_count || 0,
    license: repoData.license?.spdx_id || repoData.license?.name || packageJsonData?.license || 'MIT',
    topics: repoData.topics || packageJsonData?.keywords || [],
    defaultBranch,
    homepage: repoData.homepage || packageJsonData?.homepage || '',
    languages,
    matchedTechIds,
    skillSlugs,
    packageManager,
    prerequisites,
    installSteps,
    envVars: parsedEnvVars,
    features: smartFeatures,
    projectTree: asciiTree,
    workflowBadges,
    hasDocker,
    totalFiles: filePaths.length,
    rawFilesScanned: (hasPackageJson ? 1 : 0) + (hasEnvExample ? 1 : 0) + (hasCargo ? 1 : 0) + (hasGoMod ? 1 : 0) + (hasRequirements ? 1 : 0)
  };
}

/**
 * Backwards compatibility wrapper for fetchGitHubRepoDetails
 */
async function fetchGitHubRepoDetails(owner, repo) {
  return await fetchGitHubRepoFullDetails(owner, repo);
}


/* ==================== MODULE: utils/exportUtils.js ==================== */
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


/* ==================== MODULE: utils/markdownGenerator.js ==================== */
/**
 * Readmify - Markdown Generator Engine
 * Converts the structured sections state into clean GitHub Flavored Markdown
 * Supports SkillIcons, Shields.io, GitHub Stats, Contributors, and Star History
 */function generateMarkdown(sections) {
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
      const align = data.align || 'center';
      const isCentered = align === 'center';
      const width = data.logoWidth || '100%';
      const radius = data.logoRadius || '8px';
      let logoTag = '';
      if (data.showLogo && data.logoUrl) {
        const rawImg = `<img src="${data.logoUrl}" alt="${data.projectName || 'Project'} Banner" width="${width}" style="border-radius: ${radius}; margin-bottom: 1rem; max-width: 100%;" />`;
        const wrappedImg = data.logoLinkUrl ? `<a href="${data.logoLinkUrl}">\n    ${rawImg}\n  </a>` : rawImg;
        logoTag = `${wrappedImg}\n  <br/>`;
      }

      if (isCentered) {
        return `<div align="center">
  ${logoTag}
  <h1>${data.projectName || 'Project Title'}</h1>
  <p>${data.tagline || ''}</p>
</div>`;
      } else if (align === 'right') {
        return `<div align="right">
  ${logoTag}
  <h1>${data.projectName || 'Project Title'}</h1>
  <p>${data.tagline || ''}</p>
</div>`;
      } else {
        const logo = data.showLogo && data.logoUrl
          ? (data.logoLinkUrl ? `[![Banner](${data.logoUrl})](${data.logoLinkUrl})\n\n` : `![Banner](${data.logoUrl})\n\n`)
          : '';
        return `${logo}# ${data.projectName || 'Project Title'}\n\n> ${data.tagline || ''}`;
      }
    }

    case SECTION_TYPES.BADGES: {
      const bOwner = data.repoOwner || repoOwner;
      const bRepo = data.repoName || repoName;
      const style = data.style || 'for-the-badge';
      const align = data.align || 'center';
      const format = data.format || 'html';
      const badges = [];

      function addBadge(label, imgUrl, linkUrl) {
        if (format === 'html') {
          if (linkUrl) {
            badges.push(`<a href="${linkUrl}"><img src="${imgUrl}" alt="${label}" /></a>`);
          } else {
            badges.push(`<img src="${imgUrl}" alt="${label}" />`);
          }
        } else {
          if (linkUrl) {
            badges.push(`[![${label}](${imgUrl})](${linkUrl})`);
          } else {
            badges.push(`![${label}](${imgUrl})`);
          }
        }
      }

      if (data.showStars) {
        addBadge('GitHub Stars', `https://img.shields.io/github/stars/${bOwner}/${bRepo}?style=${style}`, `https://github.com/${bOwner}/${bRepo}/stargazers`);
      }
      if (data.showForks) {
        addBadge('GitHub Forks', `https://img.shields.io/github/forks/${bOwner}/${bRepo}?style=${style}`, `https://github.com/${bOwner}/${bRepo}/network/members`);
      }
      if (data.showIssues) {
        addBadge('GitHub Issues', `https://img.shields.io/github/issues/${bOwner}/${bRepo}?style=${style}`, `https://github.com/${bOwner}/${bRepo}/issues`);
      }
      if (data.showPRs) {
        addBadge('GitHub Pull Requests', `https://img.shields.io/github/issues-pr/${bOwner}/${bRepo}?style=${style}`, `https://github.com/${bOwner}/${bRepo}/pulls`);
      }
      if (data.showLicense) {
        addBadge('GitHub License', `https://img.shields.io/github/license/${bOwner}/${bRepo}?style=${style}`, `https://github.com/${bOwner}/${bRepo}/blob/main/LICENSE`);
      }
      if (data.showRelease) {
        addBadge('GitHub Release', `https://img.shields.io/github/v/release/${bOwner}/${bRepo}?style=${style}`, `https://github.com/${bOwner}/${bRepo}/releases`);
      }
      if (data.showLastCommit) {
        addBadge('GitHub Last Commit', `https://img.shields.io/github/last-commit/${bOwner}/${bRepo}?style=${style}`);
      }
      if (data.showCodeSize) {
        addBadge('GitHub Code Size', `https://img.shields.io/github/languages/code-size/${bOwner}/${bRepo}?style=${style}`);
      }
      if (data.showContributors) {
        addBadge('GitHub Contributors', `https://img.shields.io/github/contributors/${bOwner}/${bRepo}?style=${style}`, `https://github.com/${bOwner}/${bRepo}/graphs/contributors`);
      }
      if (data.showActionsCI) {
        const wf = data.ciWorkflowFile || 'ci.yml';
        addBadge('CI Status', `https://github.com/${bOwner}/${bRepo}/actions/workflows/${wf}/badge.svg`, `https://github.com/${bOwner}/${bRepo}/actions`);
      }
      if (data.showTopLang) {
        addBadge('Top Language', `https://img.shields.io/github/languages/top/${bOwner}/${bRepo}?style=${style}`);
      }
      if (data.showWatchers) {
        addBadge('GitHub Watchers', `https://img.shields.io/github/watchers/${bOwner}/${bRepo}?style=${style}`, `https://github.com/${bOwner}/${bRepo}/watchers`);
      }

      if (Array.isArray(data.customBadges)) {
        for (const cb of data.customBadges) {
          if (!cb.label || !cb.message) continue;
          const logoPart = cb.logo ? `&logo=${encodeURIComponent(cb.logo)}` : '';
          const url = `https://img.shields.io/badge/${encodeURIComponent(cb.label)}-${encodeURIComponent(cb.message)}-${cb.color || 'blue'}?style=${style}${logoPart}`;
          addBadge(cb.label, url);
        }
      }

      if (badges.length === 0) return '';

      if (format === 'html') {
        const inner = badges.join('\n  ');
        return `<p align="${align}">\n  ${inner}\n</p>`;
      } else {
        if (align === 'center') {
          return `<div align="center">\n\n${badges.join('  \n')}\n\n</div>`;
        } else if (align === 'right') {
          return `<div align="right">\n\n${badges.join('  \n')}\n\n</div>`;
        } else {
          return badges.join('  \n');
        }
      }
    }

    case SECTION_TYPES.ABOUT: {
      return `## ${data.heading || 'About The Project'}\n\n${data.content || ''}`;
    }

    case SECTION_TYPES.TECH_STACK: {
      const layout = data.layout || 'categorized';
      const style = data.style || 'for-the-badge';
      const align = data.align || 'center';
      const techIds = data.technologies || [];

      if (techIds.length === 0) {
        return `## ${data.heading || 'Built With'}\n\n*(No technologies selected yet)*`;
      }

      const sizeMap = { small: 28, medium: 40, large: 52, xlarge: 64 };
      const iconPx = sizeMap[data.iconSize] || (parseInt(data.iconSize, 10) || 40);
      const items = techIds.map(id => TECH_CATALOG.find(t => t.id === id)).filter(Boolean);

      // 1. Categorized Layout (Real-world industry standard)
      if (layout === 'categorized') {
        const catMap = {};
        for (const item of items) {
          const catId = item.category || 'tools';
          if (!catMap[catId]) catMap[catId] = [];
          catMap[catId].push(item);
        }

        const catBlocks = [];
        for (const catDef of TECH_CATEGORIES) {
          if (catDef.id === 'all') continue;
          const catItems = catMap[catDef.id];
          if (!catItems || catItems.length === 0) continue;

          const badgeRows = catItems.map(item => {
            const docUrl = getTechDocUrl(item);
            const badgeUrl = getBadgeUrl(item, style);
            return `[![${item.name}](${badgeUrl})](${docUrl})`;
          }).join(' ');

          catBlocks.push(`### ${catDef.name}\n\n${badgeRows}`);
        }

        return `## ${data.heading || 'Built With'}\n\n${catBlocks.join('\n\n')}`;
      }

      // 2. Devicon / SimpleIcons Interactive Grid with Doc Links
      if (layout === 'devicon-grid') {
        const marginPx = data.spacing === 'compact' ? 4 : data.spacing === 'relaxed' ? 12 : 8;
        const rows = items.map(item => {
          const docUrl = getTechDocUrl(item);
          const labelHtml = data.showLabels ? `<br/><sub style="font-size:10px">${item.name}</sub>` : '';
          return `  <a href="${docUrl}" target="_blank" rel="noreferrer" style="margin: ${marginPx}px; display: inline-block; text-align: center; text-decoration: none;">\n    <img src="https://cdn.simpleicons.org/${item.logo}/${item.color}" alt="${item.name}" width="${iconPx}" height="${iconPx}" title="${item.name}" />${labelHtml}\n  </a>`;
        }).join('\n');

        return `## ${data.heading || 'Built With'}\n\n<p align="${align}">\n${rows}\n</p>`;
      }

      // 3. SkillIcons Ribbon
      if (layout === 'skillicons') {
        const theme = data.skilliconsTheme || 'dark';
        const perline = data.skilliconsPerline || 10;
        const skillUrl = getSkillIconsUrl(techIds, theme, perline);
        if (skillUrl) {
          return `## ${data.heading || 'Built With'}\n\n<p align="${align}">\n  <a href="https://skillicons.dev">\n    <img src="${skillUrl}" alt="Tech Stack" />\n  </a>\n</p>`;
        }
      }

      // 4. Matrix / Comparison Table
      if (layout === 'matrix-table') {
        const tableRows = items.map(item => {
          const catName = TECH_CATEGORIES.find(c => c.id === item.category)?.name || 'General';
          const docUrl = getTechDocUrl(item);
          return `| **${item.name}** | ${catName} | Core Dependency | [Documentation](${docUrl}) |`;
        }).join('\n');

        return `## ${data.heading || 'Built With'}\n\n| Technology | Category | Role | Official Docs |\n| :--- | :--- | :--- | :--- |\n${tableRows}`;
      }

      // 5. Default Shields.io Badges
      const badgeList = items.map(item => {
        const docUrl = getTechDocUrl(item);
        const badgeUrl = getBadgeUrl(item, style);
        return `[![${item.name}](${badgeUrl})](${docUrl})`;
      });

      if (align === 'center') {
        return `## ${data.heading || 'Built With'}\n\n<p align="center">\n  ${badgeList.join('\n  ')}\n</p>`;
      } else if (align === 'right') {
        return `## ${data.heading || 'Built With'}\n\n<p align="right">\n  ${badgeList.join('\n  ')}\n</p>`;
      } else {
        return `## ${data.heading || 'Built With'}\n\n${badgeList.join(' ')}`;
      }
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
      const width = data.width || '100%';
      const radius = data.radius || '8px';
      const align = data.align || 'center';
      const linkUrl = data.linkUrl || data.liveUrl;
      let imageMd = '';
      if (data.imageUrl) {
        const rawImg = `<img src="${data.imageUrl}" alt="${caption}" width="${width}" style="border-radius: ${radius}; max-width: 100%;" />`;
        const wrappedImg = linkUrl ? `<a href="${linkUrl}">\n    ${rawImg}\n  </a>` : rawImg;
        if (width !== '100%' || align !== 'left' || radius !== '0px' || linkUrl) {
          imageMd = `<div align="${align}">\n  ${wrappedImg}\n</div>`;
        } else {
          imageMd = `![${caption}](${data.imageUrl})`;
        }
      }
      const liveLinkMd = data.liveUrl && !linkUrl ? `\n\n🔗 **Live Demo**: [${data.liveUrl}](${data.liveUrl})` : '';
      return `## ${data.heading || 'Preview & Screenshots'}\n\n${imageMd}${liveLinkMd}`;
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

    case SECTION_TYPES.PROJECT_STRUCTURE: {
      const tree = data.tree || '';
      if (!tree.trim()) return '';
      return `## ${data.heading || 'Project Structure'}\n\n\`\`\`text\n${tree.trim()}\n\`\`\``;
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

    case SECTION_TYPES.API_REFERENCE: {
      const endpoints = data.endpoints || [];
      if (endpoints.length === 0) return '';
      const rows = endpoints.map(ep => `| \`${ep.method || 'GET'}\` | \`${ep.path || '/'}\` | ${ep.desc || '-'} | \`${ep.auth || 'None'}\` |`).join('\n');
      return `## ${data.heading || 'API Reference'}\n\n| Method | Endpoint | Description | Auth |\n| :--- | :--- | :--- | :--- |\n${rows}`;
    }

    case SECTION_TYPES.BENCHMARKS: {
      const rows = data.rows || [];
      const subtitle = data.subtitle ? `*${data.subtitle}*\n\n` : '';
      if (rows.length === 0) return '';
      const tableRows = rows.map(r => `| **${r.task}** | ${r.baseline || '-'} | **${r.current || '-'}** | \`${r.diff || '-'}\` |`).join('\n');
      return `## ${data.heading || 'Benchmarks'}\n\n${subtitle}| Benchmark Task | Baseline | Project | Improvement |\n| :--- | :--- | :--- | :--- |\n${tableRows}`;
    }

    case SECTION_TYPES.FAQ: {
      const questions = data.questions || [];
      if (questions.length === 0) return '';
      const details = questions.map(q => `<details>\n<summary><strong>${q.q || 'Question'}</strong></summary>\n<br/>\n\n${q.a || 'Answer'}\n\n</details>`).join('\n\n');
      return `## ${data.heading || 'Frequently Asked Questions'}\n\n${details}`;
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

    case SECTION_TYPES.SPONSORS: {
      const msg = data.message ? `${data.message}\n\n` : '';
      const badges = [];
      if (data.buyMeACoffee) {
        badges.push(`[![Buy Me A Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=black)](https://buymeacoffee.com/${data.buyMeACoffee})`);
      }
      if (data.githubSponsor) {
        badges.push(`[![GitHub Sponsors](https://img.shields.io/badge/GitHub_Sponsors-EA4AAA?style=for-the-badge&logo=githubsponsors&logoColor=white)](https://github.com/sponsors/${data.githubSponsor})`);
      }
      if (data.patreon) {
        badges.push(`[![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://patreon.com/${data.patreon})`);
      }
      const badgeStr = badges.length > 0 ? `<p align="center">\n  ${badges.join('  \n  ')}\n</p>` : '';
      return `## ${data.heading || 'Support & Sponsors'}\n\n${msg}${badgeStr}`;
    }

    case SECTION_TYPES.CHANGELOG: {
      const releases = data.releases || [];
      if (releases.length === 0) return '';
      const list = releases.map(rel => {
        const changes = (rel.changes || []).map(c => `- ${c}`).join('\n');
        return `### ${rel.version || 'v1.0.0'} (${rel.date || 'Latest'})\n\n${changes}`;
      }).join('\n\n');
      return `## ${data.heading || 'Changelog'}\n\n${list}`;
    }

    case SECTION_TYPES.LICENSE: {
      const lic = getLicenseById(data.type || 'MIT');
      const year = data.year || new Date().getFullYear().toString();
      const holder = data.holder || 'The Authors';
      const projectName = data.projectName || repoName || 'This project';
      const presentation = data.presentation || 'badge-minimal';

      const badgeTag = `<p align="center">\n  <a href="${lic.url}">\n    <img src="${lic.badgeUrl}" alt="License: ${lic.id}" />\n  </a>\n</p>`;

      if (presentation === 'collapsible-details') {
        const fullText = lic.generateText(year, holder, projectName);
        return `## ${data.heading || 'License'}\n\n${badgeTag}\n\nDistributed under the **${lic.name}**. See [\`LICENSE\`](LICENSE) for more information.\n\n<details>\n<summary><strong>View Full ${lic.name} Agreement</strong></summary>\n<br/>\n\n\`\`\`text\n${fullText}\n\`\`\`\n\n</details>\n\nCopyright (c) ${year} ${holder}`;
      }

      if (presentation === 'summary-table') {
        const perms = lic.permissions.map(p => `✅ ${p}`).join('<br/>') || '-';
        const limits = lic.limitations.map(l => `❌ ${l}`).join('<br/>') || '-';
        const conds = lic.conditions.map(c => `ℹ️ ${c}`).join('<br/>') || '-';

        return `## ${data.heading || 'License'}\n\n${badgeTag}\n\nDistributed under the **${lic.name}**.\n\n| Permissions | Limitations | Conditions |\n| :--- | :--- | :--- |\n| ${perms} | ${limits} | ${conds} |\n\nCopyright (c) ${year} ${holder}. See [\`LICENSE\`](LICENSE) for the full text.`;
      }

      // Default: badge-minimal
      return `## ${data.heading || 'License'}\n\n${badgeTag}\n\nDistributed under the **${lic.name}**. See [\`LICENSE\`](LICENSE) for more information.\n\nCopyright (c) ${year} ${holder}`;
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


/* ==================== MODULE: components/healthScore.js ==================== */
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


/* ==================== MODULE: store.js ==================== */
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
      if (typeof localStorage !== 'undefined') {
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
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      }
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
    return this.addSectionFromType(SECTION_TYPES.CUSTOM, title);
  }

  addSectionFromType(type, customTitle) {
    // Check if single-instance section already exists but is disabled
    const existing = this.state.sections.find(s => s.type === type && type !== SECTION_TYPES.CUSTOM);
    if (existing) {
      existing.enabled = true;
      if (customTitle) {
        existing.title = customTitle;
        if (existing.data && existing.data.heading) existing.data.heading = customTitle;
      }
      this.state.activeSectionId = existing.id;
      this.notify();
      return existing.id;
    }

    const newSection = createSection(type, customTitle);
    this.state.sections.push(newSection);
    this.state.activeSectionId = newSection.id;
    this.notify();
    return newSection.id;
  }

  duplicateSection(sectionId) {
    const index = this.state.sections.findIndex(s => s.id === sectionId);
    if (index === -1) return null;

    const orig = this.state.sections[index];
    const cloned = JSON.parse(JSON.stringify(orig));
    cloned.id = `sec-${cloned.type}-${Date.now().toString(36)}`;
    cloned.title = `${orig.title} (Copy)`;
    if (cloned.data && cloned.data.heading) {
      cloned.data.heading = `${cloned.data.heading} (Copy)`;
    }
    cloned.enabled = true;

    this.state.sections.splice(index + 1, 0, cloned);
    this.state.activeSectionId = cloned.id;
    this.notify();
    return cloned.id;
  }

  renameSection(sectionId, newTitle) {
    const sec = this.state.sections.find(s => s.id === sectionId);
    if (sec && newTitle && newTitle.trim()) {
      sec.title = newTitle.trim();
      if (sec.data && typeof sec.data.heading === 'string') {
        sec.data.heading = newTitle.trim();
      }
      this.notify();
    }
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

  // Update multiple sections (e.g. from wizard or deep scanner)
  batchUpdate(updaterFn) {
    updaterFn(this.state.sections);
    this.notify();
  }

  // Apply complete deep repository analysis across all relevant sections
  applyRepoAnalysis(analysis) {
    if (!analysis) return;

    this.batchUpdate(sections => {
      // 1. Hero
      const hero = sections.find(s => s.type === SECTION_TYPES.HERO);
      if (hero) {
        hero.enabled = true;
        hero.data.projectName = analysis.repo || hero.data.projectName;
        hero.data.tagline = analysis.description || hero.data.tagline;
        hero.data.repoOwner = analysis.owner || hero.data.repoOwner;
        hero.data.repoName = analysis.repo || hero.data.repoName;
      }

      // 2. Badges
      const badges = sections.find(s => s.type === SECTION_TYPES.BADGES);
      if (badges) {
        badges.enabled = true;
        badges.data.showStars = true;
        badges.data.showForks = true;
        badges.data.showIssues = true;
        badges.data.showLicense = !!analysis.license;
        badges.data.showRelease = true;
        badges.data.showLastCommit = true;

        if (Array.isArray(analysis.workflowBadges) && analysis.workflowBadges.length > 0) {
          badges.data.customBadges = analysis.workflowBadges.map(wb => ({
            label: 'CI',
            message: 'Passing',
            color: 'brightgreen',
            logo: 'githubactions'
          }));
        }
      }

      // 3. About
      const about = sections.find(s => s.type === SECTION_TYPES.ABOUT);
      if (about) {
        about.enabled = true;
        const desc = analysis.description ? `${analysis.description}\n\n` : '';
        const topics = Array.isArray(analysis.topics) && analysis.topics.length > 0
          ? `**Key topics**: ${analysis.topics.map(t => `\`${t}\``).join(', ')}.\n\n`
          : '';
        about.data.content = `${desc}${topics}Engineered for high performance, reliability, and clean developer workflows.`;
      }

      // 4. Tech Stack
      const tech = sections.find(s => s.type === SECTION_TYPES.TECH_STACK);
      if (tech) {
        tech.enabled = true;
        if (Array.isArray(analysis.matchedTechIds) && analysis.matchedTechIds.length > 0) {
          tech.data.technologies = Array.from(new Set(analysis.matchedTechIds));
        }
      }

      // 5. Features
      const features = sections.find(s => s.type === SECTION_TYPES.FEATURES);
      if (features) {
        features.enabled = true;
        if (Array.isArray(analysis.features) && analysis.features.length > 0) {
          features.data.items = analysis.features;
        }
      }

      // 6. Project Structure
      const structure = sections.find(s => s.type === SECTION_TYPES.PROJECT_STRUCTURE);
      if (structure) {
        if (analysis.projectTree && analysis.projectTree.trim().length > 0) {
          structure.enabled = true;
          structure.data.tree = analysis.projectTree;
        } else {
          structure.enabled = false;
        }
      }

      // 7. Installation
      const install = sections.find(s => s.type === SECTION_TYPES.INSTALLATION);
      if (install) {
        install.enabled = true;
        if (analysis.prerequisites) {
          install.data.prerequisites = analysis.prerequisites;
        }
        if (Array.isArray(analysis.installSteps) && analysis.installSteps.length > 0) {
          install.data.steps = analysis.installSteps;
        }
        if (analysis.packageManager) {
          install.data.packageManager = analysis.packageManager;
        }
      }

      // 8. Environment Variables
      const env = sections.find(s => s.type === SECTION_TYPES.ENV_VARS);
      if (env) {
        if (Array.isArray(analysis.envVars) && analysis.envVars.length > 0) {
          env.enabled = true;
          env.data.variables = analysis.envVars;
        } else {
          env.enabled = false;
        }
      }

      // 9. License
      const license = sections.find(s => s.type === SECTION_TYPES.LICENSE);
      if (license) {
        license.enabled = true;
        if (analysis.license && analysis.license !== 'NOASSERTION') {
          license.data.type = analysis.license;
        }
        if (analysis.owner) {
          license.data.holder = analysis.owner;
        }
      }

      // 10. Author
      const author = sections.find(s => s.type === SECTION_TYPES.AUTHOR);
      if (author) {
        author.enabled = true;
        if (analysis.owner) {
          author.data.name = analysis.owner;
          author.data.github = analysis.owner;
        }
      }
    });

    if (this.state.sections[0]) {
      this.state.activeSectionId = this.state.sections[0].id;
    }
    this.notify();
  }
}
const store = new ReadmifyStore();


/* ==================== MODULE: components/photoUploader.js ==================== */
/**
 * Readmify - Image Studio (Cropper, Resizer & Banner Hub)
 * Zero-dependency interactive canvas cropper, dimension scaler, presets, and markdown styling
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

// Active Studio State
let studioState = {
  activeTab: 'presets', // 'presets' | 'studio'
  targetField: 'hero',
  originalImage: null, // HTMLImageElement
  cropRatio: '3:1',    // '3:1' | '16:9' | '4:3' | '1:1' | 'free'
  cropBox: { x: 0, y: 0, w: 100, h: 100 }, // percentage of image
  targetWidth: 1200,
  targetHeight: 400,
  lockAspect: true,
  scalePct: 100,
  outputQuality: 0.88,
  outputFormat: 'image/jpeg',
  exportDataUrl: '',
  // Presentation styling
  mdWidth: '100%',
  mdAlign: 'center',
  mdRadius: '8px',
  linkUrl: '',
  caption: 'Project Preview',
  // Mockup frame & visual filters
  mockupFrame: 'none', // 'none' | 'browser' | 'terminal'
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  rotation: 0, // 0, 90, 180, 270
  flipH: false
};
function renderPhotoModal(targetField = 'hero') {
  studioState.targetField = targetField;

  let modal = document.getElementById('photo-hub-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'photo-hub-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs hidden';
    document.body.appendChild(modal);
  }

  modal.classList.remove('hidden');
  renderStudioModalContent(modal);
}

function renderStudioModalContent(modal) {
  modal.innerHTML = `
    <div class="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
      <!-- Modal Header -->
      <div class="px-5 py-3.5 border-b border-border flex items-center justify-between bg-card flex-shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-md bg-muted border border-border flex items-center justify-center text-sm font-semibold text-foreground">
            🖼️
          </div>
          <div>
            <h3 class="text-sm font-semibold text-foreground flex items-center gap-2">
              <span>Image Studio & Cropper</span>
              <span class="text-[10px] px-1.5 py-0.2 rounded border border-border bg-muted text-muted-foreground font-normal">Crop • Resize • Style</span>
            </h3>
            <p class="text-[11px] text-muted-foreground">Interactive visual cropper, dimension resizer, and curated banners</p>
          </div>
        </div>
        <button id="close-studio-btn" class="p-1 text-muted-foreground hover:text-foreground text-xs">✕</button>
      </div>

      <!-- Tab Buttons -->
      <div class="px-5 py-2.5 border-b border-border bg-background/50 flex items-center justify-between flex-shrink-0">
        <div class="flex gap-2">
          <button id="studio-tab-presets" class="px-3 py-1 text-xs font-medium rounded-md transition ${studioState.activeTab === 'presets' ? 'bg-primary text-primary-foreground shadow-xs font-semibold' : 'bg-muted text-muted-foreground hover:text-foreground'}">
            Curated Banners
          </button>
          <button id="studio-tab-custom" class="px-3 py-1 text-xs font-medium rounded-md transition ${studioState.activeTab === 'studio' ? 'bg-primary text-primary-foreground shadow-xs font-semibold' : 'bg-muted text-muted-foreground hover:text-foreground'}">
            Image Cropper & Resizer ${studioState.originalImage ? '●' : ''}
          </button>
        </div>

        <div class="text-[11px] text-muted-foreground">
          Target: <strong class="text-foreground uppercase text-[10px] font-mono px-1 py-0.5 rounded bg-muted">${studioState.targetField}</strong>
        </div>
      </div>

      <!-- Main Body -->
      <div class="p-5 overflow-y-auto flex-1 bg-background">
        ${studioState.activeTab === 'presets' ? renderPresetsTabHtml() : renderStudioTabHtml()}
      </div>

      <!-- Footer Bar -->
      <div class="px-5 py-3 border-t border-border bg-card flex items-center justify-between flex-shrink-0">
        <span class="text-[11px] text-muted-foreground">Zero quality loss • Compressed for fast GitHub loading</span>
        <button id="close-studio-btn-2" class="btn-secondary text-xs px-3.5 py-1.5">
          Close
        </button>
      </div>
    </div>
  `;

  attachStudioListeners(modal);
}

function renderPresetsTabHtml() {
  return `
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xs text-muted-foreground">Select a high-resolution developer banner to instantly apply:</p>
        <button id="studio-jump-to-custom-btn" class="text-xs text-foreground hover:underline flex items-center gap-1 font-medium">
          <span>📤</span> Upload or crop your own image →
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        ${BANNER_PRESETS.map(preset => `
          <div class="preset-card group relative border border-border hover:border-foreground/50 rounded-lg overflow-hidden bg-card cursor-pointer transition select-none" data-url="${preset.url}">
            <div class="h-28 w-full bg-cover bg-center transition group-hover:scale-105 duration-200" style="background-image: url('${preset.url}')"></div>
            <div class="p-2.5 flex items-center justify-between bg-card">
              <span class="text-xs font-medium text-foreground">${preset.title}</span>
              <span class="text-[10px] text-muted-foreground group-hover:text-foreground transition font-medium">Use →</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderStudioTabHtml() {
  if (!studioState.originalImage) {
    return `
      <div class="space-y-4">
        <!-- Upload Drop Zone -->
        <div id="studio-drop-zone" class="border-2 border-dashed border-border hover:border-foreground/40 rounded-lg p-10 text-center bg-card/40 cursor-pointer transition flex flex-col items-center justify-center gap-2.5">
          <span class="text-3xl">📸</span>
          <div class="space-y-1">
            <p class="text-xs font-semibold text-foreground">Click to browse or drop an image file here</p>
            <p class="text-[11px] text-muted-foreground">Supports PNG, JPG, WebP, GIF, SVG</p>
          </div>
          <input type="file" id="studio-file-input" accept="image/*" class="hidden" />
        </div>

        <!-- URL Input Alternative -->
        <div class="p-3.5 bg-card border border-border rounded-lg space-y-2">
          <label class="block text-xs font-medium text-foreground">Or paste an online image URL</label>
          <div class="flex gap-2">
            <input type="text" id="studio-url-input" placeholder="https://example.com/screenshot.png" class="form-input text-xs flex-1" />
            <button id="studio-load-url-btn" class="btn-primary text-xs px-3.5 py-1.5 whitespace-nowrap">
              Load into Studio
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Active Editor Workspace
  return `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <!-- Left Column: Interactive Canvas Cropper & Enhancements -->
      <div class="lg:col-span-2 space-y-3">
        <!-- Crop Aspect Ratio Selector -->
        <div class="flex items-center justify-between bg-card p-2 rounded-lg border border-border text-xs">
          <span class="font-medium text-muted-foreground text-[11px]">Aspect Ratio:</span>
          <div class="flex items-center gap-1">
            ${[
              { id: '3:1', label: '3:1 (Banner)' },
              { id: '16:9', label: '16:9 (Demo)' },
              { id: '4:3', label: '4:3 (Preview)' },
              { id: '1:1', label: '1:1 (Square)' },
              { id: 'free', label: 'Freeform' }
            ].map(r => `
              <button class="crop-ratio-btn px-2 py-0.5 rounded text-[11px] font-medium transition ${
                studioState.cropRatio === r.id 
                  ? 'bg-foreground text-background font-semibold shadow-xs' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }" data-ratio="${r.id}">
                ${r.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Visual Canvas Wrapper -->
        <div class="relative bg-zinc-950 border border-border rounded-lg p-2 overflow-hidden flex items-center justify-center min-h-[260px] max-h-[340px]">
          <canvas id="studio-crop-canvas" class="max-h-[320px] max-w-full rounded object-contain cursor-crosshair"></canvas>
        </div>

        <!-- Mockup Window Frame & Transforms Controls -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-card border border-border rounded-lg text-xs">
          <div>
            <span class="font-medium text-muted-foreground text-[11px] block mb-1.5">Mockup Window Frame:</span>
            <div class="flex items-center gap-1">
              <button class="mockup-frame-btn px-2.5 py-1 rounded text-xs transition ${studioState.mockupFrame === 'none' ? 'bg-foreground text-background font-semibold shadow-xs' : 'bg-muted text-muted-foreground hover:text-foreground'}" data-frame="none">
                None (Raw)
              </button>
              <button class="mockup-frame-btn px-2.5 py-1 rounded text-xs transition ${studioState.mockupFrame === 'browser' ? 'bg-foreground text-background font-semibold shadow-xs' : 'bg-muted text-muted-foreground hover:text-foreground'}" data-frame="browser">
                🌐 macOS Window
              </button>
              <button class="mockup-frame-btn px-2.5 py-1 rounded text-xs transition ${studioState.mockupFrame === 'terminal' ? 'bg-foreground text-background font-semibold shadow-xs' : 'bg-muted text-muted-foreground hover:text-foreground'}" data-frame="terminal">
                💻 Terminal
              </button>
            </div>
          </div>

          <div>
            <span class="font-medium text-muted-foreground text-[11px] block mb-1.5">Rotate & Flip:</span>
            <div class="flex items-center gap-1.5">
              <button id="studio-rotate-left-btn" class="btn-secondary px-2 py-1 text-xs" title="Rotate 90° Counter-Clockwise">
                ⟲ -90°
              </button>
              <button id="studio-rotate-right-btn" class="btn-secondary px-2 py-1 text-xs" title="Rotate 90° Clockwise">
                ⟳ +90°
              </button>
              <button id="studio-flip-h-btn" class="btn-secondary px-2.5 py-1 text-xs ${studioState.flipH ? 'bg-accent font-semibold text-foreground' : ''}" title="Flip Horizontal">
                ⇆ Flip
              </button>
              <button id="studio-reset-transform-btn" class="text-[10.5px] text-muted-foreground hover:text-foreground px-1 py-1" title="Reset Rotation & Flip">
                ↺ Reset
              </button>
            </div>
          </div>
        </div>

        <!-- Filter Sliders -->
        <div class="p-3 bg-card border border-border rounded-lg space-y-2 text-xs">
          <div class="flex items-center justify-between">
            <span class="font-medium text-foreground text-xs flex items-center gap-1">
              <span>🎨</span> Image Filters & Adjustments
            </span>
            <button id="studio-reset-filters-btn" class="text-[10px] text-muted-foreground hover:text-foreground">
              Reset Filters
            </button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div>
              <div class="flex justify-between text-[10px] mb-1">
                <span class="text-muted-foreground">Brightness</span>
                <span id="brightness-label" class="font-mono">${studioState.brightness}%</span>
              </div>
              <input type="range" id="studio-brightness-slider" min="50" max="150" value="${studioState.brightness}" class="w-full accent-foreground cursor-pointer" />
            </div>

            <div>
              <div class="flex justify-between text-[10px] mb-1">
                <span class="text-muted-foreground">Contrast</span>
                <span id="contrast-label" class="font-mono">${studioState.contrast}%</span>
              </div>
              <input type="range" id="studio-contrast-slider" min="50" max="150" value="${studioState.contrast}" class="w-full accent-foreground cursor-pointer" />
            </div>

            <div>
              <div class="flex justify-between text-[10px] mb-1">
                <span class="text-muted-foreground">Saturation</span>
                <span id="saturation-label" class="font-mono">${studioState.saturation}%</span>
              </div>
              <input type="range" id="studio-saturation-slider" min="0" max="200" value="${studioState.saturation}" class="w-full accent-foreground cursor-pointer" />
            </div>

            <div>
              <div class="flex justify-between text-[10px] mb-1">
                <span class="text-muted-foreground">Blur</span>
                <span id="blur-label" class="font-mono">${studioState.blur}px</span>
              </div>
              <input type="range" id="studio-blur-slider" min="0" max="8" step="1" value="${studioState.blur}" class="w-full accent-foreground cursor-pointer" />
            </div>
          </div>
        </div>

        <!-- Scale & Quality Sliders -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-card border border-border rounded-lg text-xs">
          <div>
            <div class="flex justify-between text-[11px] mb-1">
              <span class="text-muted-foreground">Output Scale:</span>
              <span id="scale-label" class="font-mono text-foreground">${studioState.scalePct}%</span>
            </div>
            <input type="range" id="studio-scale-slider" min="25" max="200" step="5" value="${studioState.scalePct}" class="w-full accent-foreground cursor-pointer" />
          </div>

          <div>
            <div class="flex justify-between text-[11px] mb-1">
              <span class="text-muted-foreground">JPEG Quality:</span>
              <span id="quality-label" class="font-mono text-foreground">${Math.round(studioState.outputQuality * 100)}%</span>
            </div>
            <input type="range" id="studio-quality-slider" min="50" max="100" step="2" value="${Math.round(studioState.outputQuality * 100)}" class="w-full accent-foreground cursor-pointer" />
          </div>
        </div>
      </div>

      <!-- Right Column: Settings, Preview & Apply Actions -->
      <div class="space-y-4">
        <!-- Live Cropped Result Preview -->
        <div class="p-3 bg-card border border-border rounded-lg space-y-2">
          <div class="flex items-center justify-between text-xs">
            <span class="font-medium text-foreground">Output Preview</span>
            <span id="output-dims-badge" class="text-[10px] font-mono text-muted-foreground">${studioState.targetWidth}×${studioState.targetHeight}</span>
          </div>
          <div class="bg-background rounded border border-border/80 p-2 flex items-center justify-center overflow-hidden min-h-[120px] max-h-[160px]">
            <img id="studio-result-preview" src="${studioState.exportDataUrl}" class="max-h-full max-w-full object-contain rounded" style="border-radius: ${studioState.mdRadius};" />
          </div>
        </div>

        <!-- Markdown Layout Controls -->
        <div class="p-3 bg-card border border-border rounded-lg space-y-2.5 text-xs">
          <span class="font-medium text-foreground text-xs block">Placement & Presentation</span>

          <div>
            <label class="block text-[11px] text-muted-foreground mb-1">Display Width</label>
            <select id="studio-md-width" class="form-input text-xs">
              <option value="100%" ${studioState.mdWidth === '100%' ? 'selected' : ''}>100% (Full Width)</option>
              <option value="80%" ${studioState.mdWidth === '80%' ? 'selected' : ''}>80% (Standard)</option>
              <option value="600" ${studioState.mdWidth === '600' ? 'selected' : ''}>600px (Medium)</option>
              <option value="400" ${studioState.mdWidth === '400' ? 'selected' : ''}>400px (Small)</option>
            </select>
          </div>

          <div>
            <label class="block text-[11px] text-muted-foreground mb-1">Alignment</label>
            <select id="studio-md-align" class="form-input text-xs">
              <option value="center" ${studioState.mdAlign === 'center' ? 'selected' : ''}>Center</option>
              <option value="left" ${studioState.mdAlign === 'left' ? 'selected' : ''}>Left</option>
              <option value="right" ${studioState.mdAlign === 'right' ? 'selected' : ''}>Right</option>
            </select>
          </div>

          <div>
            <label class="block text-[11px] text-muted-foreground mb-1">Corner Radius</label>
            <select id="studio-md-radius" class="form-input text-xs">
              <option value="8px" ${studioState.mdRadius === '8px' ? 'selected' : ''}>Rounded (8px)</option>
              <option value="16px" ${studioState.mdRadius === '16px' ? 'selected' : ''}>Pill / Extra Rounded (16px)</option>
              <option value="0px" ${studioState.mdRadius === '0px' ? 'selected' : ''}>Sharp (0px)</option>
            </select>
          </div>

          <div>
            <label class="block text-[11px] text-muted-foreground mb-1">Clickable Link URL (optional)</label>
            <input type="text" id="studio-link-url" value="${studioState.linkUrl || ''}" placeholder="https://my-app.com" class="form-input text-xs" />
          </div>

          <div>
            <label class="block text-[11px] text-muted-foreground mb-1">Caption / Alt Text</label>
            <input type="text" id="studio-caption" value="${studioState.caption || ''}" placeholder="Project Preview Screenshot" class="form-input text-xs" />
          </div>
        </div>

        <!-- Apply CTA Buttons -->
        <div class="space-y-2 pt-1">
          <button id="studio-apply-hero-btn" class="w-full btn-primary text-xs py-2 justify-center shadow-xs">
            ✨ Set as Project Banner / Logo
          </button>
          <button id="studio-apply-demo-btn" class="w-full btn-secondary text-xs py-1.5 justify-center">
            📸 Set as Demo / Preview Image
          </button>
          <button id="studio-download-img-btn" class="w-full btn-secondary text-xs py-1.5 justify-center flex items-center gap-1.5">
            <span>💾</span> Download Image File (.png)
          </button>
          <button id="studio-copy-tag-btn" class="w-full text-xs text-muted-foreground hover:text-foreground py-1 text-center hover:underline">
            📋 Copy HTML &lt;img&gt; Tag
          </button>
          <button id="studio-change-img-btn" class="w-full text-[11px] text-zinc-500 hover:text-rose-400 py-0.5 text-center transition">
            Change Image File
          </button>
        </div>
      </div>
    </div>
  `;
}

function attachStudioListeners(modal) {
  modal.querySelector('#close-studio-btn')?.addEventListener('click', () => modal.classList.add('hidden'));
  modal.querySelector('#close-studio-btn-2')?.addEventListener('click', () => modal.classList.add('hidden'));

  // Tab switching
  modal.querySelector('#studio-tab-presets')?.addEventListener('click', () => {
    studioState.activeTab = 'presets';
    renderStudioModalContent(modal);
  });
  modal.querySelector('#studio-tab-custom')?.addEventListener('click', () => {
    studioState.activeTab = 'studio';
    renderStudioModalContent(modal);
    if (studioState.originalImage) initCanvasCrop();
  });
  modal.querySelector('#studio-jump-to-custom-btn')?.addEventListener('click', () => {
    studioState.activeTab = 'studio';
    renderStudioModalContent(modal);
    if (studioState.originalImage) initCanvasCrop();
  });

  // Preset click
  modal.querySelectorAll('.preset-card').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.url;
      applyImageToTarget(url, studioState.targetField, {
        width: '100%',
        align: 'center',
        radius: '8px'
      });
      modal.classList.add('hidden');
      showToast('Banner applied successfully!', 'success');
    });
  });

  // Drop zone & file input
  const dropZone = modal.querySelector('#studio-drop-zone');
  const fileInput = modal.querySelector('#studio-file-input');

  dropZone?.addEventListener('click', () => fileInput?.click());
  dropZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-foreground/60');
  });
  dropZone?.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-foreground/60');
  });
  dropZone?.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-foreground/60');
    if (e.dataTransfer.files?.length > 0) {
      loadImageFromFile(e.dataTransfer.files[0], modal);
    }
  });

  fileInput?.addEventListener('change', (e) => {
    if (e.target.files?.length > 0) {
      loadImageFromFile(e.target.files[0], modal);
    }
  });

  // Load URL
  modal.querySelector('#studio-load-url-btn')?.addEventListener('click', () => {
    const url = modal.querySelector('#studio-url-input')?.value?.trim();
    if (!url) {
      showToast('Please enter an image URL', 'error');
      return;
    }
    loadImageFromUrl(url, modal);
  });

  // If in studio view with image loaded, bind controls
  if (studioState.activeTab === 'studio' && studioState.originalImage) {
    // Ratio buttons
    modal.querySelectorAll('.crop-ratio-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        studioState.cropRatio = btn.dataset.ratio;
        setCropBoxFromRatio(studioState.cropRatio);
        updateCroppedOutput();
        renderStudioModalContent(modal);
        initCanvasCrop();
      });
    });

    // Mockup frame buttons
    modal.querySelectorAll('.mockup-frame-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        studioState.mockupFrame = btn.dataset.frame;
        modal.querySelectorAll('.mockup-frame-btn').forEach(b => {
          if (b.dataset.frame === studioState.mockupFrame) {
            b.className = 'mockup-frame-btn px-2.5 py-1 rounded text-xs transition bg-foreground text-background font-semibold shadow-xs';
          } else {
            b.className = 'mockup-frame-btn px-2.5 py-1 rounded text-xs transition bg-muted text-muted-foreground hover:text-foreground';
          }
        });
        updateCroppedOutput();
      });
    });

    // Transforms (Rotate & Flip)
    modal.querySelector('#studio-rotate-left-btn')?.addEventListener('click', () => {
      studioState.rotation = (studioState.rotation + 270) % 360;
      updateCroppedOutput();
    });
    modal.querySelector('#studio-rotate-right-btn')?.addEventListener('click', () => {
      studioState.rotation = (studioState.rotation + 90) % 360;
      updateCroppedOutput();
    });
    modal.querySelector('#studio-flip-h-btn')?.addEventListener('click', (e) => {
      studioState.flipH = !studioState.flipH;
      e.currentTarget.classList.toggle('bg-accent', studioState.flipH);
      e.currentTarget.classList.toggle('font-semibold', studioState.flipH);
      updateCroppedOutput();
    });
    modal.querySelector('#studio-reset-transform-btn')?.addEventListener('click', () => {
      studioState.rotation = 0;
      studioState.flipH = false;
      const flipBtn = modal.querySelector('#studio-flip-h-btn');
      if (flipBtn) flipBtn.classList.remove('bg-accent', 'font-semibold');
      updateCroppedOutput();
    });

    // Filter Sliders
    modal.querySelector('#studio-brightness-slider')?.addEventListener('input', (e) => {
      studioState.brightness = parseInt(e.target.value, 10);
      const lbl = modal.querySelector('#brightness-label');
      if (lbl) lbl.innerText = `${studioState.brightness}%`;
      updateCroppedOutput();
    });
    modal.querySelector('#studio-contrast-slider')?.addEventListener('input', (e) => {
      studioState.contrast = parseInt(e.target.value, 10);
      const lbl = modal.querySelector('#contrast-label');
      if (lbl) lbl.innerText = `${studioState.contrast}%`;
      updateCroppedOutput();
    });
    modal.querySelector('#studio-saturation-slider')?.addEventListener('input', (e) => {
      studioState.saturation = parseInt(e.target.value, 10);
      const lbl = modal.querySelector('#saturation-label');
      if (lbl) lbl.innerText = `${studioState.saturation}%`;
      updateCroppedOutput();
    });
    modal.querySelector('#studio-blur-slider')?.addEventListener('input', (e) => {
      studioState.blur = parseInt(e.target.value, 10);
      const lbl = modal.querySelector('#blur-label');
      if (lbl) lbl.innerText = `${studioState.blur}px`;
      updateCroppedOutput();
    });
    modal.querySelector('#studio-reset-filters-btn')?.addEventListener('click', () => {
      studioState.brightness = 100;
      studioState.contrast = 100;
      studioState.saturation = 100;
      studioState.blur = 0;
      const bSl = modal.querySelector('#studio-brightness-slider');
      if (bSl) bSl.value = 100;
      const bLb = modal.querySelector('#brightness-label');
      if (bLb) bLb.innerText = '100%';
      const cSl = modal.querySelector('#studio-contrast-slider');
      if (cSl) cSl.value = 100;
      const cLb = modal.querySelector('#contrast-label');
      if (cLb) cLb.innerText = '100%';
      const sSl = modal.querySelector('#studio-saturation-slider');
      if (sSl) sSl.value = 100;
      const sLb = modal.querySelector('#saturation-label');
      if (sLb) sLb.innerText = '100%';
      const blSl = modal.querySelector('#studio-blur-slider');
      if (blSl) blSl.value = 0;
      const blLb = modal.querySelector('#blur-label');
      if (blLb) blLb.innerText = '0px';
      updateCroppedOutput();
    });

    // Scale slider
    modal.querySelector('#studio-scale-slider')?.addEventListener('input', (e) => {
      studioState.scalePct = parseInt(e.target.value, 10);
      modal.querySelector('#scale-label').innerText = `${studioState.scalePct}%`;
      updateCroppedOutput();
    });

    // Quality slider
    modal.querySelector('#studio-quality-slider')?.addEventListener('input', (e) => {
      studioState.outputQuality = parseInt(e.target.value, 10) / 100;
      modal.querySelector('#quality-label').innerText = `${Math.round(studioState.outputQuality * 100)}%`;
      updateCroppedOutput();
    });

    // Presentation dropdowns
    modal.querySelector('#studio-md-width')?.addEventListener('change', (e) => {
      studioState.mdWidth = e.target.value;
    });
    modal.querySelector('#studio-md-align')?.addEventListener('change', (e) => {
      studioState.mdAlign = e.target.value;
    });
    modal.querySelector('#studio-md-radius')?.addEventListener('change', (e) => {
      studioState.mdRadius = e.target.value;
      const resImg = modal.querySelector('#studio-result-preview');
      if (resImg) resImg.style.borderRadius = studioState.mdRadius;
    });
    modal.querySelector('#studio-link-url')?.addEventListener('input', (e) => {
      studioState.linkUrl = e.target.value;
    });
    modal.querySelector('#studio-caption')?.addEventListener('input', (e) => {
      studioState.caption = e.target.value;
    });

    // Apply buttons
    modal.querySelector('#studio-apply-hero-btn')?.addEventListener('click', () => {
      if (studioState.exportDataUrl) {
        applyImageToTarget(studioState.exportDataUrl, 'hero', {
          width: studioState.mdWidth,
          align: studioState.mdAlign,
          radius: studioState.mdRadius,
          linkUrl: studioState.linkUrl,
          caption: studioState.caption
        });
        modal.classList.add('hidden');
        showToast('Processed image applied as Project Banner!', 'success');
      }
    });

    modal.querySelector('#studio-apply-demo-btn')?.addEventListener('click', () => {
      if (studioState.exportDataUrl) {
        applyImageToTarget(studioState.exportDataUrl, 'demo', {
          width: studioState.mdWidth,
          align: studioState.mdAlign,
          radius: studioState.mdRadius,
          linkUrl: studioState.linkUrl,
          caption: studioState.caption
        });
        modal.classList.add('hidden');
        showToast('Processed image applied as Demo Preview!', 'success');
      }
    });

    // 1-Click Download Image Button
    modal.querySelector('#studio-download-img-btn')?.addEventListener('click', () => {
      if (studioState.exportDataUrl) {
        const a = document.createElement('a');
        a.href = studioState.exportDataUrl;
        a.download = `readmify-${studioState.targetField || 'image'}-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast('Image downloaded successfully!', 'success');
      }
    });

    modal.querySelector('#studio-copy-tag-btn')?.addEventListener('click', () => {
      if (studioState.exportDataUrl) {
        const align = studioState.mdAlign;
        const width = studioState.mdWidth;
        const radius = studioState.mdRadius;
        const alt = studioState.caption || 'Project Image';
        const rawImg = `<img src="${studioState.exportDataUrl}" alt="${alt}" width="${width}" style="border-radius: ${radius}; max-width: 100%;" />`;
        const wrapped = studioState.linkUrl ? `<a href="${studioState.linkUrl}">\n  ${rawImg}\n</a>` : rawImg;
        const tag = `<div align="${align}">\n  ${wrapped}\n</div>`;
        copyToClipboard(tag, 'HTML Image tag copied to clipboard!');
      }
    });

    modal.querySelector('#studio-change-img-btn')?.addEventListener('click', () => {
      studioState.originalImage = null;
      renderStudioModalContent(modal);
    });

    initCanvasCrop();
  }
}

function loadImageFromFile(file, modal) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      studioState.originalImage = img;
      studioState.activeTab = 'studio';
      studioState.rotation = 0;
      studioState.flipH = false;
      studioState.brightness = 100;
      studioState.contrast = 100;
      studioState.saturation = 100;
      studioState.blur = 0;
      studioState.mockupFrame = 'none';
      setCropBoxFromRatio(studioState.cropRatio);
      updateCroppedOutput();
      renderStudioModalContent(modal);
      initCanvasCrop();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function loadImageFromUrl(url, modal) {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    studioState.originalImage = img;
    studioState.activeTab = 'studio';
    studioState.rotation = 0;
    studioState.flipH = false;
    studioState.brightness = 100;
    studioState.contrast = 100;
    studioState.saturation = 100;
    studioState.blur = 0;
    studioState.mockupFrame = 'none';
    setCropBoxFromRatio(studioState.cropRatio);
    updateCroppedOutput();
    renderStudioModalContent(modal);
    initCanvasCrop();
  };
  img.onerror = () => {
    showToast('Failed to load image from URL (CORS restricted or invalid URL)', 'error');
  };
  img.src = url;
}

function setCropBoxFromRatio(ratio) {
  if (!studioState.originalImage) return;
  const img = studioState.originalImage;
  const imgAspect = img.width / img.height;

  let targetAspect = imgAspect;
  if (ratio === '3:1') targetAspect = 3 / 1;
  else if (ratio === '16:9') targetAspect = 16 / 9;
  else if (ratio === '4:3') targetAspect = 4 / 3;
  else if (ratio === '1:1') targetAspect = 1 / 1;

  if (ratio === 'free') {
    studioState.cropBox = { x: 0.05, y: 0.05, w: 0.9, h: 0.9 };
    return;
  }

  if (imgAspect > targetAspect) {
    // Image is wider than crop box
    const h = 0.9;
    const cropPixelHeight = img.height * h;
    const cropPixelWidth = cropPixelHeight * targetAspect;
    const w = Math.min(0.95, cropPixelWidth / img.width);
    const x = (1 - w) / 2;
    const y = (1 - h) / 2;
    studioState.cropBox = { x, y, w, h };
  } else {
    // Image is taller than crop box
    const w = 0.9;
    const cropPixelWidth = img.width * w;
    const cropPixelHeight = cropPixelWidth / targetAspect;
    const h = Math.min(0.95, cropPixelHeight / img.height);
    const x = (1 - w) / 2;
    const y = (1 - h) / 2;
    studioState.cropBox = { x, y, w, h };
  }
}

/**
 * Interactive HTML5 Canvas Cropper
 */
function initCanvasCrop() {
  const canvas = document.getElementById('studio-crop-canvas');
  if (!canvas || !studioState.originalImage) return;

  const ctx = canvas.getContext('2d');
  const img = studioState.originalImage;

  // Fit canvas to display
  const maxDisplayW = 550;
  const maxDisplayH = 340;
  const scale = Math.min(maxDisplayW / img.width, maxDisplayH / img.height, 1);
  canvas.width = img.width * scale;
  canvas.height = img.height * scale;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Dim overlay outside crop box
    const { x, y, w, h } = studioState.cropBox;
    const bx = x * canvas.width;
    const by = y * canvas.height;
    const bw = w * canvas.width;
    const bh = h * canvas.height;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    // Top
    ctx.fillRect(0, 0, canvas.width, by);
    // Bottom
    ctx.fillRect(0, by + bh, canvas.width, canvas.height - (by + bh));
    // Left
    ctx.fillRect(0, by, bx, bh);
    // Right
    ctx.fillRect(bx + bw, by, canvas.width - (bx + bw), bh);

    // Crop box outline
    ctx.strokeStyle = '#fafafa';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(bx, by, bw, bh);

    // Grid rule of thirds lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    ctx.moveTo(bx + bw / 3, by);
    ctx.lineTo(bx + bw / 3, by + bh);
    ctx.moveTo(bx + (2 * bw) / 3, by);
    ctx.lineTo(bx + (2 * bw) / 3, by + bh);
    ctx.moveTo(bx, by + bh / 3);
    ctx.lineTo(bx + bw, by + bh / 3);
    ctx.moveTo(bx, by + (2 * bh) / 3);
    ctx.lineTo(bx + bw, by + (2 * bh) / 3);
    ctx.stroke();

    // Corner handles
    ctx.fillStyle = '#fafafa';
    const handleSize = 6;
    ctx.fillRect(bx - handleSize / 2, by - handleSize / 2, handleSize, handleSize);
    ctx.fillRect(bx + bw - handleSize / 2, by - handleSize / 2, handleSize, handleSize);
    ctx.fillRect(bx - handleSize / 2, by + bh - handleSize / 2, handleSize, handleSize);
    ctx.fillRect(bx + bw - handleSize / 2, by + bh - handleSize / 2, handleSize, handleSize);
  }

  draw();

  // Mouse drag interaction
  let isDragging = false;
  let dragMode = 'move'; // 'move' or 'resize'
  let startX = 0;
  let startY = 0;
  let origBox = null;

  canvas.onmousedown = (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / canvas.width;
    const my = (e.clientY - rect.top) / canvas.height;

    const { x, y, w, h } = studioState.cropBox;
    const isInside = mx >= x && mx <= x + w && my >= y && my <= y + h;

    if (isInside) {
      isDragging = true;
      startX = mx;
      startY = my;
      origBox = { ...studioState.cropBox };
      dragMode = 'move';
    }
  };

  window.onmousemove = (e) => {
    if (!isDragging || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / canvas.width;
    const my = (e.clientY - rect.top) / canvas.height;

    const dx = mx - startX;
    const dy = my - startY;

    if (dragMode === 'move') {
      let newX = Math.max(0, Math.min(1 - origBox.w, origBox.x + dx));
      let newY = Math.max(0, Math.min(1 - origBox.h, origBox.y + dy));
      studioState.cropBox.x = newX;
      studioState.cropBox.y = newY;
      draw();
      updateCroppedOutput();
    }
  };

  window.onmouseup = () => {
    if (isDragging) {
      isDragging = false;
      updateCroppedOutput();
    }
  };
}

function updateCroppedOutput() {
  if (!studioState.originalImage) return;

  const img = studioState.originalImage;
  const { x, y, w, h } = studioState.cropBox;

  const cropPxX = Math.round(x * img.width);
  const cropPxY = Math.round(y * img.height);
  const cropPxW = Math.round(w * img.width);
  const cropPxH = Math.round(h * img.height);

  const scale = studioState.scalePct / 100;
  const baseW = Math.max(50, Math.round(cropPxW * scale));
  const baseH = Math.max(50, Math.round(cropPxH * scale));

  const isRotated90or270 = studioState.rotation === 90 || studioState.rotation === 270;
  const rotatedW = isRotated90or270 ? baseH : baseW;
  const rotatedH = isRotated90or270 ? baseW : baseH;

  // Step 1: Render transformed and filtered cropped image
  const contentCanvas = document.createElement('canvas');
  contentCanvas.width = rotatedW;
  contentCanvas.height = rotatedH;
  const contentCtx = contentCanvas.getContext('2d');

  // Build filter string
  const filterParts = [];
  if (studioState.brightness !== 100) filterParts.push(`brightness(${studioState.brightness}%)`);
  if (studioState.contrast !== 100) filterParts.push(`contrast(${studioState.contrast}%)`);
  if (studioState.saturation !== 100) filterParts.push(`saturate(${studioState.saturation}%)`);
  if (studioState.blur > 0) filterParts.push(`blur(${studioState.blur}px)`);
  contentCtx.filter = filterParts.length > 0 ? filterParts.join(' ') : 'none';

  // Apply rotation and flip
  contentCtx.save();
  contentCtx.translate(rotatedW / 2, rotatedH / 2);
  contentCtx.rotate((studioState.rotation * Math.PI) / 180);
  if (studioState.flipH) {
    contentCtx.scale(-1, 1);
  }
  contentCtx.drawImage(img, cropPxX, cropPxY, cropPxW, cropPxH, -baseW / 2, -baseH / 2, baseW, baseH);
  contentCtx.restore();

  // Step 2: Render Mockup Window Frame (if selected)
  let finalCanvas;
  if (studioState.mockupFrame === 'browser') {
    const titleBarH = 38;
    const borderR = 10;
    finalCanvas = document.createElement('canvas');
    finalCanvas.width = rotatedW;
    finalCanvas.height = rotatedH + titleBarH;
    const ctx = finalCanvas.getContext('2d');

    // Titlebar background
    ctx.fillStyle = '#1e1e24';
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(0, 0, finalCanvas.width, finalCanvas.height, borderR);
    } else {
      ctx.rect(0, 0, finalCanvas.width, finalCanvas.height);
    }
    ctx.fill();

    // macOS traffic lights
    const dotY = 19;
    ctx.fillStyle = '#ff5f56';
    ctx.beginPath(); ctx.arc(18, dotY, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffbd2e';
    ctx.beginPath(); ctx.arc(38, dotY, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#27c93f';
    ctx.beginPath(); ctx.arc(58, dotY, 6, 0, Math.PI * 2); ctx.fill();

    // Faux address bar
    const addrW = Math.min(320, Math.max(160, rotatedW - 140));
    const addrX = (rotatedW - addrW) / 2;
    ctx.fillStyle = '#2b2b36';
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(addrX, 8, addrW, 22, 6);
    } else {
      ctx.rect(addrX, 8, addrW, 22);
    }
    ctx.fill();

    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🔒 https://app.preview', addrX + addrW / 2, 19);

    // Draw content image
    ctx.drawImage(contentCanvas, 0, titleBarH);
  } else if (studioState.mockupFrame === 'terminal') {
    const titleBarH = 34;
    const borderR = 8;
    finalCanvas = document.createElement('canvas');
    finalCanvas.width = rotatedW;
    finalCanvas.height = rotatedH + titleBarH;
    const ctx = finalCanvas.getContext('2d');

    // Terminal header
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(0, 0, finalCanvas.width, finalCanvas.height, borderR);
    } else {
      ctx.rect(0, 0, finalCanvas.width, finalCanvas.height);
    }
    ctx.fill();

    // Traffic light dots
    const dotY = 17;
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(16, dotY, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#eab308';
    ctx.beginPath(); ctx.arc(32, dotY, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#22c55e';
    ctx.beginPath(); ctx.arc(48, dotY, 5, 0, Math.PI * 2); ctx.fill();

    // Terminal title
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('bash — 80×24', rotatedW / 2, 17);

    // Draw content image
    ctx.drawImage(contentCanvas, 0, titleBarH);
  } else {
    finalCanvas = contentCanvas;
  }

  studioState.targetWidth = finalCanvas.width;
  studioState.targetHeight = finalCanvas.height;

  const exportFormat = studioState.mockupFrame !== 'none' ? 'image/png' : studioState.outputFormat;
  const dataUrl = finalCanvas.toDataURL(exportFormat, studioState.outputQuality);
  studioState.exportDataUrl = dataUrl;

  // Update DOM elements if present
  const resImg = document.getElementById('studio-result-preview');
  if (resImg) resImg.src = dataUrl;
  const dimsBadge = document.getElementById('output-dims-badge');
  if (dimsBadge) dimsBadge.innerText = `${finalCanvas.width}×${finalCanvas.height} px`;
}

function applyImageToTarget(url, targetField, styleOptions = {}) {
  const { width = '100%', align = 'center', radius = '8px', linkUrl = '', caption = '' } = styleOptions;

  if (targetField === 'demo') {
    const demoSec = store.getState().sections.find(s => s.type === SECTION_TYPES.DEMO);
    if (demoSec) {
      store.updateSectionData(demoSec.id, {
        imageUrl: url,
        width,
        align,
        radius,
        liveUrl: linkUrl || demoSec.data?.liveUrl || '',
        linkUrl: linkUrl || demoSec.data?.linkUrl || '',
        caption: caption || demoSec.data?.caption || 'Project Preview'
      });
      store.toggleSection(demoSec.id, true);
    }
  } else {
    const heroSec = store.getState().sections.find(s => s.type === SECTION_TYPES.HERO);
    if (heroSec) {
      store.updateSectionData(heroSec.id, {
        logoUrl: url,
        showLogo: true,
        logoWidth: width,
        logoAlign: align,
        logoRadius: radius,
        logoLinkUrl: linkUrl || heroSec.data?.logoLinkUrl || ''
      });
    }
  }
}


/* ==================== MODULE: components/sectionLibrary.js ==================== */
/**
 * Readmify - Visual Section Library Catalog (shadcn/ui style)
 * Rich catalog of 16+ predefined modular section templates
 */



let catalogCategory = 'all';
let catalogSearchQuery = '';
const SECTION_CATALOG = [
  // --- CORE & INTRO ---
  {
    type: SECTION_TYPES.HERO,
    title: 'Header & Title',
    category: 'core',
    icon: '🏷️',
    desc: 'Project title, compelling tagline, custom banner/logo, and alignment.',
    tags: ['title', 'banner', 'hero', 'logo', 'header']
  },
  {
    type: SECTION_TYPES.BADGES,
    title: 'Repo Badges & Stats',
    category: 'core',
    icon: '🛡️',
    desc: 'Automated GitHub stars, forks, license, release, and CI passing status badges.',
    tags: ['badges', 'shields', 'stars', 'forks', 'license', 'ci']
  },
  {
    type: SECTION_TYPES.ABOUT,
    title: 'About The Project',
    category: 'core',
    icon: '📖',
    desc: 'Clear, engaging problem-solution overview explaining why your project exists.',
    tags: ['about', 'overview', 'summary', 'intro']
  },
  {
    type: SECTION_TYPES.TECH_STACK,
    title: 'Built With (Tech Stack)',
    category: 'core',
    icon: '🛠️',
    desc: 'Display languages, frameworks, databases, and tools with SkillIcons or Shields badges.',
    tags: ['tech', 'stack', 'languages', 'frameworks', 'icons']
  },

  // --- FEATURES & ARCHITECTURE ---
  {
    type: SECTION_TYPES.FEATURES,
    title: 'Key Features',
    category: 'features',
    icon: '✨',
    desc: 'Showcase your standout capabilities and core benefits with icons and descriptions.',
    tags: ['features', 'highlights', 'benefits', 'capabilities']
  },
  {
    type: SECTION_TYPES.PROJECT_STRUCTURE,
    title: 'Project Structure',
    category: 'features',
    icon: '📁',
    desc: 'Visual ASCII directory tree showing code architecture and key files.',
    tags: ['structure', 'tree', 'architecture', 'folders', 'files']
  },
  {
    type: SECTION_TYPES.DEMO,
    title: 'Preview & Screenshots',
    category: 'features',
    icon: '📸',
    desc: 'High-impact walkthrough GIF, application preview, or live demo link with custom sizing.',
    tags: ['demo', 'preview', 'screenshot', 'gif', 'image', 'video']
  },
  {
    type: SECTION_TYPES.BENCHMARKS,
    title: 'Benchmarks & Performance',
    category: 'features',
    icon: '⚡',
    desc: 'Metrics table comparing throughput, memory, or speed against competitors.',
    tags: ['benchmarks', 'performance', 'speed', 'metrics', 'comparison']
  },

  // --- SETUP & USAGE ---
  {
    type: SECTION_TYPES.INSTALLATION,
    title: 'Getting Started & Installation',
    category: 'setup',
    icon: '🚀',
    desc: 'System prerequisites and copy-paste terminal steps to clone, install, and run.',
    tags: ['install', 'setup', 'getting-started', 'npm', 'clone']
  },
  {
    type: SECTION_TYPES.ENV_VARS,
    title: 'Environment Variables',
    category: 'setup',
    icon: '⚙️',
    desc: 'Formatted table detailing required keys, descriptions, and default values.',
    tags: ['env', 'environment', 'variables', 'config', 'secrets']
  },
  {
    type: SECTION_TYPES.USAGE,
    title: 'Usage & Examples',
    category: 'setup',
    icon: '💻',
    desc: 'Code snippets, API calls, or CLI commands demonstrating how to use the project.',
    tags: ['usage', 'examples', 'code', 'snippet', 'cli']
  },
  {
    type: SECTION_TYPES.API_REFERENCE,
    title: 'API Reference',
    category: 'setup',
    icon: '🔌',
    desc: 'Clean REST or GraphQL endpoint table with methods, paths, and auth requirements.',
    tags: ['api', 'endpoints', 'rest', 'graphql', 'reference', 'routes']
  },

  // --- COMMUNITY & GOVERNANCE ---
  {
    type: SECTION_TYPES.FAQ,
    title: 'FAQ & Troubleshooting',
    category: 'community',
    icon: '💡',
    desc: 'Collapsible accordion question-and-answer pairs for common issues and questions.',
    tags: ['faq', 'questions', 'troubleshooting', 'help', 'details']
  },
  {
    type: SECTION_TYPES.ROADMAP,
    title: 'Roadmap',
    category: 'community',
    icon: '🗺️',
    desc: 'Interactive checklist of planned milestones, upcoming features, and current status.',
    tags: ['roadmap', 'todo', 'milestones', 'plans']
  },
  {
    type: SECTION_TYPES.CONTRIBUTING,
    title: 'Contributing Guide',
    category: 'community',
    icon: '🤝',
    desc: 'Fork-and-PR workflow instructions with automated contributor avatar wall.',
    tags: ['contributing', 'prs', 'fork', 'open-source', 'community']
  },
  {
    type: SECTION_TYPES.SPONSORS,
    title: 'Sponsors & Support',
    category: 'community',
    icon: '☕',
    desc: 'Support cards for Buy Me A Coffee, GitHub Sponsors, and Patreon.',
    tags: ['sponsors', 'donate', 'coffee', 'patreon', 'funding']
  },
  {
    type: SECTION_TYPES.CHANGELOG,
    title: 'Changelog',
    category: 'community',
    icon: '📝',
    desc: 'Version history, dates, and bullet points of new features, fixes, and changes.',
    tags: ['changelog', 'releases', 'versions', 'history', 'updates']
  },
  {
    type: SECTION_TYPES.LICENSE,
    title: 'License',
    category: 'community',
    icon: '📜',
    desc: 'Software distribution license notice (MIT, Apache, GPL, etc.) and copyright holder.',
    tags: ['license', 'mit', 'apache', 'copyright']
  },
  {
    type: SECTION_TYPES.AUTHOR,
    title: 'Author & Contact',
    category: 'community',
    icon: '👤',
    desc: 'Author bio, email, GitHub badge, Twitter/X, and LinkedIn social links.',
    tags: ['author', 'creator', 'contact', 'socials', 'email']
  },
  {
    type: SECTION_TYPES.CUSTOM,
    title: 'Custom Section',
    category: 'community',
    icon: '✍️',
    desc: 'A flexible, blank markdown canvas for architecture diagrams, notes, or anything else.',
    tags: ['custom', 'markdown', 'freeform', 'blank', 'notes']
  }
];
function openSectionLibrary() {
  let modal = document.getElementById('section-library-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'section-library-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs hidden';
    document.body.appendChild(modal);
  }

  catalogCategory = 'all';
  catalogSearchQuery = '';
  renderLibraryModal();
  modal.classList.remove('hidden');
}
function closeSectionLibrary() {
  const modal = document.getElementById('section-library-modal');
  if (modal) modal.classList.add('hidden');
}

function renderLibraryModal() {
  const modal = document.getElementById('section-library-modal');
  if (!modal) return;

  const currentSections = store.getState().sections;

  // Filter items
  const filtered = SECTION_CATALOG.filter(item => {
    const matchesCategory = catalogCategory === 'all' || item.category === catalogCategory;
    const q = catalogSearchQuery.toLowerCase();
    const matchesSearch = !q || 
      item.title.toLowerCase().includes(q) || 
      item.desc.toLowerCase().includes(q) || 
      item.tags.some(t => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  modal.innerHTML = `
    <div class="bg-card border border-border rounded-lg w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
      <!-- Modal Header -->
      <div class="px-5 py-3.5 border-b border-border flex items-center justify-between bg-card flex-shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-md bg-muted border border-border flex items-center justify-center text-foreground font-semibold text-sm">
            ➕
          </div>
          <div>
            <h3 class="text-sm font-semibold text-foreground">Section Library</h3>
            <p class="text-[11px] text-muted-foreground">Pick from 16+ curated section templates to add to your README</p>
          </div>
        </div>
        <button id="close-lib-btn" class="p-1 text-muted-foreground hover:text-foreground text-xs">✕</button>
      </div>

      <!-- Search & Category Filters -->
      <div class="px-5 py-3 border-b border-border bg-background/50 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between flex-shrink-0">
        <div class="relative flex-1">
          <span class="absolute left-2.5 top-2.5 text-muted-foreground text-xs pointer-events-none">🔍</span>
          <input 
            type="text" 
            id="lib-search-input" 
            value="${catalogSearchQuery}"
            placeholder="Search sections: FAQ, Benchmarks, API, Structure..." 
            class="form-input text-xs pl-7 pr-3 h-8 w-full" 
          />
        </div>

        <div class="flex items-center gap-1 overflow-x-auto pb-0.5 sm:pb-0">
          ${[
            { id: 'all', label: 'All' },
            { id: 'core', label: 'Core' },
            { id: 'features', label: 'Features' },
            { id: 'setup', label: 'Setup' },
            { id: 'community', label: 'Community' }
          ].map(c => `
            <button class="lib-cat-btn px-2.5 py-1 text-[11px] font-medium rounded-md transition ${
              catalogCategory === c.id 
                ? 'bg-primary text-primary-foreground font-semibold shadow-xs' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }" data-cat="${c.id}">
              ${c.label}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Section Cards Grid -->
      <div class="p-5 overflow-y-auto flex-1 bg-background">
        ${filtered.length === 0 ? `
          <div class="py-12 text-center text-muted-foreground text-xs space-y-1">
            <p class="text-lg">🔍</p>
            <p>No matching sections found for "${catalogSearchQuery}".</p>
            <button id="lib-clear-search-btn" class="text-xs text-foreground underline pt-1">Clear search filter</button>
          </div>
        ` : `
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${filtered.map(item => {
              const existingSec = currentSections.find(s => s.type === item.type);
              const isEnabled = existingSec && existingSec.enabled;
              const isMultiple = item.type === SECTION_TYPES.CUSTOM;

              return `
                <div class="group p-3.5 bg-card border border-border hover:border-foreground/40 rounded-lg flex flex-col justify-between transition space-y-3 select-none">
                  <div class="space-y-1.5">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="text-base">${item.icon}</span>
                        <h4 class="text-xs font-semibold text-foreground group-hover:text-foreground transition">${item.title}</h4>
                      </div>
                      ${isEnabled && !isMultiple ? `
                        <span class="text-[10px] px-1.5 py-0.5 rounded-full border border-border bg-muted/60 text-muted-foreground">In README</span>
                      ` : ''}
                    </div>
                    <p class="text-[11px] text-muted-foreground leading-relaxed">${item.desc}</p>
                  </div>

                  <div class="pt-1 flex items-center justify-between border-t border-border/50">
                    <span class="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">${item.category}</span>
                    ${isEnabled && !isMultiple ? `
                      <button class="lib-action-btn text-xs font-medium text-foreground hover:underline" data-type="${item.type}" data-title="${item.title}" data-mode="jump">
                        Edit Section →
                      </button>
                    ` : `
                      <button class="lib-action-btn btn-primary text-xs px-2.5 py-1 shadow-xs flex items-center gap-1" data-type="${item.type}" data-title="${item.title}" data-mode="add">
                        <span>+</span> Add to README
                      </button>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>

      <!-- Modal Footer -->
      <div class="px-5 py-3 border-t border-border bg-card flex items-center justify-between flex-shrink-0">
        <span class="text-[11px] text-muted-foreground">Tip: You can reorder, rename, or duplicate any section in your workspace.</span>
        <button id="close-lib-btn-2" class="btn-secondary text-xs px-3.5 py-1.5">
          Close
        </button>
      </div>
    </div>
  `;

  modal.querySelector('#close-lib-btn')?.addEventListener('click', closeSectionLibrary);
  modal.querySelector('#close-lib-btn-2')?.addEventListener('click', closeSectionLibrary);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSectionLibrary();
  });

  // Search input
  const searchInput = modal.querySelector('#lib-search-input');
  searchInput?.addEventListener('input', (e) => {
    catalogSearchQuery = e.target.value;
    renderLibraryModal();
    // Maintain focus
    const updatedInput = modal.querySelector('#lib-search-input');
    if (updatedInput) {
      updatedInput.focus();
      updatedInput.setSelectionRange(catalogSearchQuery.length, catalogSearchQuery.length);
    }
  });

  modal.querySelector('#lib-clear-search-btn')?.addEventListener('click', () => {
    catalogSearchQuery = '';
    renderLibraryModal();
  });

  // Categories
  modal.querySelectorAll('.lib-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      catalogCategory = btn.dataset.cat;
      renderLibraryModal();
    });
  });

  // Action buttons (Add or Jump)
  modal.querySelectorAll('.lib-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const title = btn.dataset.title;
      const mode = btn.dataset.mode;

      if (mode === 'jump') {
        const sec = store.getState().sections.find(s => s.type === type);
        if (sec) {
          store.setActiveSection(sec.id);
          closeSectionLibrary();
          showToast(`Jumped to "${sec.title}"`, 'info');
        }
      } else {
        const newId = store.addSectionFromType(type, title);
        closeSectionLibrary();
        fireConfetti();
        showToast(`Added "${title}" to your README!`, 'success');
      }
    });
  });
}


/* ==================== MODULE: components/techPicker.js ==================== */
/**
 * Readmify - Interactive Tech Stack Badge Picker Modal (shadcn/ui style)
 */
let currentCategory = 'all';
let searchQuery = '';function renderTechPickerModal() {
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
}function closeTechPicker() {
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


/* ==================== MODULE: components/sectionEditor.js ==================== */
/**
 * Readmify - Dynamic Section Form Editor (v3 with Image Studio, Section Library & Full Customizability)
 */
function renderSectionEditor(container) {
  if (!container) return;

  const state = store.getState();
  const section = state.sections.find(s => s.id === state.activeSectionId);

  if (!section) {
    container.innerHTML = `
      <div class="p-12 text-center text-muted-foreground text-xs space-y-3">
        <div class="text-2xl">📋</div>
        <div class="space-y-1">
          <p class="font-medium text-foreground">No Section Selected</p>
          <p>Select a section from the bar above, or add a new section from the library.</p>
        </div>
        <button id="empty-add-sec-btn" class="btn-primary text-xs px-3.5 py-1.5 shadow-sm">
          ➕ Open Section Library
        </button>
      </div>
    `;
    container.querySelector('#empty-add-sec-btn')?.addEventListener('click', openSectionLibrary);
    return;
  }

  const { type, data, title, id, enabled } = section;
  const currentIndex = state.sections.findIndex(s => s.id === id);
  const totalSections = state.sections.length;

  container.innerHTML = `
    <div class="p-5 max-w-3xl mx-auto space-y-5">
      <!-- Section Action Header Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-border">
        <!-- Title & Rename -->
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <input 
              type="text" 
              id="section-title-rename-input" 
              value="${title}" 
              class="text-sm font-semibold text-foreground bg-transparent hover:bg-card focus:bg-card border border-transparent hover:border-border focus:border-border rounded px-2 py-0.5 transition outline-none" 
              title="Click to rename this section"
            />
            <span class="px-2 py-0.5 text-[10px] font-medium rounded-full ${enabled ? 'bg-muted text-foreground border border-border' : 'bg-muted/40 text-muted-foreground'}">
              ${enabled ? 'Active' : 'Disabled'}
            </span>
          </div>
          <p class="text-[11px] text-muted-foreground">Customize options, markdown layout, and content</p>
        </div>

        <!-- Section Action Buttons Toolbar -->
        <div class="flex items-center gap-1.5 flex-wrap">
          <button id="sec-move-up-btn" class="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded text-xs transition ${currentIndex === 0 ? 'opacity-30 pointer-events-none' : ''}" title="Move Section Up">
            ▲
          </button>
          <button id="sec-move-down-btn" class="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded text-xs transition ${currentIndex === totalSections - 1 ? 'opacity-30 pointer-events-none' : ''}" title="Move Section Down">
            ▼
          </button>
          <button id="sec-duplicate-btn" class="px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded border border-border transition flex items-center gap-1" title="Duplicate this section">
            <span>📑</span> Duplicate
          </button>
          <label class="relative inline-flex items-center cursor-pointer ml-1" title="Toggle section visibility">
            <input type="checkbox" id="toggle-section-enabled" class="sr-only peer" ${enabled ? 'checked' : ''}>
            <div class="w-8 h-4 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-zinc-900 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-400 after:border-zinc-700 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-foreground peer-checked:after:bg-zinc-950"></div>
          </label>
          <button id="sec-delete-btn" class="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded transition ml-1" title="Delete section">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </div>

      <!-- Form Fields Body -->
      <div id="section-form-fields" class="space-y-4">
        ${renderFormFieldsByType(type, data, state)}
      </div>
    </div>
  `;

  // Rename Section Input
  const renameInput = container.querySelector('#section-title-rename-input');
  renameInput?.addEventListener('change', (e) => {
    store.renameSection(id, e.target.value);
    showToast(`Renamed section to "${e.target.value}"`, 'info');
  });

  // Toolbar Listeners
  container.querySelector('#sec-move-up-btn')?.addEventListener('click', () => {
    store.moveSection(id, 'up');
  });
  container.querySelector('#sec-move-down-btn')?.addEventListener('click', () => {
    store.moveSection(id, 'down');
  });
  container.querySelector('#sec-duplicate-btn')?.addEventListener('click', () => {
    const newId = store.duplicateSection(id);
    if (newId) showToast('Section duplicated!', 'success');
  });
  container.querySelector('#toggle-section-enabled')?.addEventListener('change', (e) => {
    store.toggleSection(id, e.target.checked);
  });
  container.querySelector('#sec-delete-btn')?.addEventListener('click', () => {
    if (confirm(`Delete the section "${title}"?`)) {
      store.removeSection(id);
      showToast(`Removed "${title}"`, 'info');
    }
  });

  attachFieldListeners(container, id, type, data);
}

function renderFormFieldsByType(type, data, state) {
  switch (type) {
    case SECTION_TYPES.HERO:
      return `
        <!-- GitHub Deep Repo Scanner Banner -->
        <div class="p-3.5 bg-card border border-border rounded-lg space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <span>⚡</span> Deep Repository Scanner
            </span>
            <span class="text-[10px] text-muted-foreground">Scans tree, manifests & environment</span>
          </div>
          <div class="flex gap-2">
            <input type="text" id="github-autodetect-input" value="${data.repoOwner && data.repoName ? data.repoOwner + '/' + data.repoName : ''}" placeholder="Paste repo URL or owner/repo (e.g. facebook/react)" class="form-input text-xs flex-1" />
            <button id="trigger-autodetect-btn" class="btn-primary text-xs px-3.5 py-1.5 whitespace-nowrap flex items-center gap-1">
              <span>⚡</span> Deep Scan
            </button>
          </div>
          <p class="text-[11px] text-muted-foreground">Deeply inspects file tree, dependencies, package managers, scripts, environment variables, and CI/CD pipelines to build your entire README.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Project Name</label>
            <input type="text" data-field="projectName" value="${data.projectName || ''}" class="form-input text-xs" placeholder="e.g. Readmify" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Alignment</label>
            <select data-field="align" class="form-input text-xs">
              <option value="center" ${data.align === 'center' ? 'selected' : ''}>Centered (Modern)</option>
              <option value="left" ${data.align === 'left' ? 'selected' : ''}>Left-aligned (Classic)</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Tagline / Short Description</label>
          <input type="text" data-field="tagline" value="${data.tagline || ''}" class="form-input text-xs" placeholder="e.g. Craft stunning READMEs in minutes" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">GitHub Owner / Org</label>
            <input type="text" data-field="repoOwner" value="${data.repoOwner || ''}" class="form-input text-xs" placeholder="e.g. yourusername" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Repository Name</label>
            <input type="text" data-field="repoName" value="${data.repoName || ''}" class="form-input text-xs" placeholder="e.g. your-repo" />
          </div>
        </div>

        <!-- Banner / Photo Section with Image Studio -->
        <div class="p-3.5 bg-card border border-border rounded-lg space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <span>🖼️</span> Project Banner & Logo
            </label>
            <button id="open-banner-hub-btn" class="btn-secondary text-xs px-2.5 py-1 flex items-center gap-1 shadow-xs">
              <span>✂️</span> Open Image Studio (Crop & Resize)
            </button>
          </div>

          <div class="flex items-center gap-2">
            <input type="checkbox" id="hero-show-logo-cb" data-field="showLogo" ${data.showLogo ? 'checked' : ''} class="rounded border-border text-foreground" />
            <label for="hero-show-logo-cb" class="text-xs text-foreground cursor-pointer">Display banner / logo in README</label>
          </div>

          <div>
            <label class="block text-[11px] text-muted-foreground mb-1">Image URL or Base64 Data</label>
            <input type="text" data-field="logoUrl" value="${data.logoUrl || ''}" placeholder="https://raw.githubusercontent.com/.../banner.png" class="form-input text-xs" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[11px] text-muted-foreground mb-1">Render Width</label>
              <select data-field="logoWidth" class="form-input text-xs">
                <option value="100%" ${data.logoWidth === '100%' ? 'selected' : ''}>100% (Full Width)</option>
                <option value="80%" ${data.logoWidth === '80%' ? 'selected' : ''}>80% (Medium Large)</option>
                <option value="600" ${data.logoWidth === '600' ? 'selected' : ''}>600px (Medium)</option>
                <option value="400" ${data.logoWidth === '400' ? 'selected' : ''}>400px (Compact)</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] text-muted-foreground mb-1">Corner Radius</label>
              <select data-field="logoRadius" class="form-input text-xs">
                <option value="8px" ${data.logoRadius === '8px' ? 'selected' : ''}>Rounded (8px)</option>
                <option value="16px" ${data.logoRadius === '16px' ? 'selected' : ''}>Pill / Soft (16px)</option>
                <option value="0px" ${data.logoRadius === '0px' ? 'selected' : ''}>Sharp (0px)</option>
              </select>
            </div>
          </div>
        </div>
      `;

    case SECTION_TYPES.DEMO:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Preview & Screenshots'}" class="form-input text-xs" />
        </div>

        <div class="p-3.5 bg-card border border-border rounded-lg space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <span>📸</span> Screenshot / Demo Preview
            </label>
            <button id="open-demo-studio-btn" class="btn-secondary text-xs px-2.5 py-1 flex items-center gap-1 shadow-xs">
              <span>✂️</span> Crop & Resize in Image Studio
            </button>
          </div>

          <div>
            <label class="block text-[11px] text-muted-foreground mb-1">Image or GIF URL</label>
            <input type="text" data-field="imageUrl" value="${data.imageUrl || ''}" class="form-input text-xs" placeholder="https://raw.githubusercontent.com/.../demo.gif" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-[11px] text-muted-foreground mb-1">Display Width</label>
              <select data-field="width" class="form-input text-xs">
                <option value="100%" ${data.width === '100%' ? 'selected' : ''}>100% (Full)</option>
                <option value="80%" ${data.width === '80%' ? 'selected' : ''}>80% (Medium)</option>
                <option value="600" ${data.width === '600' ? 'selected' : ''}>600px</option>
                <option value="400" ${data.width === '400' ? 'selected' : ''}>400px</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] text-muted-foreground mb-1">Alignment</label>
              <select data-field="align" class="form-input text-xs">
                <option value="center" ${data.align === 'center' ? 'selected' : ''}>Center</option>
                <option value="left" ${data.align === 'left' ? 'selected' : ''}>Left</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] text-muted-foreground mb-1">Corner Radius</label>
              <select data-field="radius" class="form-input text-xs">
                <option value="8px" ${data.radius === '8px' ? 'selected' : ''}>Rounded (8px)</option>
                <option value="16px" ${data.radius === '16px' ? 'selected' : ''}>Soft (16px)</option>
                <option value="0px" ${data.radius === '0px' ? 'selected' : ''}>Sharp (0px)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Caption</label>
            <input type="text" data-field="caption" value="${data.caption || ''}" class="form-input text-xs" placeholder="App Walkthrough Preview" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Live Demo URL</label>
            <input type="text" data-field="liveUrl" value="${data.liveUrl || ''}" class="form-input text-xs" placeholder="https://myapp.vercel.app" />
          </div>
        </div>
      `;

    case SECTION_TYPES.FAQ:
      const questions = data.questions || [];
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Frequently Asked Questions'}" class="form-input text-xs" />
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Questions & Answers (${questions.length})</label>
            <button id="add-faq-btn" class="btn-primary text-xs px-2.5 py-1">
              + Add Question
            </button>
          </div>

          <div id="faq-items-list" class="space-y-3">
            ${questions.map((item, idx) => `
              <div class="p-3 bg-card border border-border rounded-lg space-y-2 relative group" data-idx="${idx}">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono text-muted-foreground uppercase">Question #${idx + 1}</span>
                  <button class="delete-faq-btn text-rose-400 hover:text-rose-300 text-xs px-1" data-idx="${idx}" title="Delete Question">✕</button>
                </div>
                <input type="text" class="faq-q-input form-input text-xs font-medium" placeholder="Question..." value="${item.q || ''}" data-idx="${idx}" />
                <textarea class="faq-a-input form-input text-xs" rows="2" placeholder="Answer..." data-idx="${idx}">${item.a || ''}</textarea>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.BENCHMARKS:
      const rows = data.rows || [];
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Benchmarks'}" class="form-input text-xs" />
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Test Conditions / Subtitle</label>
          <input type="text" data-field="subtitle" value="${data.subtitle || ''}" placeholder="e.g. Tested on Apple M2, Node v20" class="form-input text-xs" />
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Benchmark Metric Rows (${rows.length})</label>
            <button id="add-benchmark-btn" class="btn-primary text-xs px-2.5 py-1">
              + Add Metric
            </button>
          </div>

          <div id="benchmark-items-list" class="space-y-2">
            ${rows.map((row, idx) => `
              <div class="p-2.5 bg-card border border-border rounded-lg grid grid-cols-4 gap-2 items-center text-xs relative" data-idx="${idx}">
                <input type="text" class="bench-task-input form-input text-xs" placeholder="Task Name" value="${row.task || ''}" data-idx="${idx}" />
                <input type="text" class="bench-base-input form-input text-xs" placeholder="Baseline" value="${row.baseline || ''}" data-idx="${idx}" />
                <input type="text" class="bench-curr-input form-input text-xs font-semibold" placeholder="Current / Project" value="${row.current || ''}" data-idx="${idx}" />
                <div class="flex items-center gap-1">
                  <input type="text" class="bench-diff-input form-input text-xs text-emerald-400" placeholder="Improvement" value="${row.diff || ''}" data-idx="${idx}" />
                  <button class="delete-bench-btn text-rose-400 hover:text-rose-300 text-xs px-1" data-idx="${idx}">✕</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.SPONSORS:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Support & Sponsors'}" class="form-input text-xs" />
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Support Message</label>
          <textarea data-field="message" rows="2" class="form-input text-xs">${data.message || ''}</textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Buy Me A Coffee Username</label>
            <input type="text" data-field="buyMeACoffee" value="${data.buyMeACoffee || ''}" class="form-input text-xs" placeholder="username" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">GitHub Sponsors Username</label>
            <input type="text" data-field="githubSponsor" value="${data.githubSponsor || ''}" class="form-input text-xs" placeholder="username" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Patreon Handle</label>
            <input type="text" data-field="patreon" value="${data.patreon || ''}" class="form-input text-xs" placeholder="handle" />
          </div>
        </div>
      `;

    case SECTION_TYPES.API_REFERENCE:
      const endpoints = data.endpoints || [];
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'API Reference'}" class="form-input text-xs" />
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">API Endpoints (${endpoints.length})</label>
            <button id="add-endpoint-btn" class="btn-primary text-xs px-2.5 py-1">
              + Add Endpoint
            </button>
          </div>

          <div id="api-endpoints-list" class="space-y-2">
            ${endpoints.map((ep, idx) => `
              <div class="p-2.5 bg-card border border-border rounded-lg grid grid-cols-1 sm:grid-cols-4 gap-2 items-center text-xs" data-idx="${idx}">
                <select class="ep-method-select form-input text-xs font-bold" data-idx="${idx}">
                  <option value="GET" ${ep.method === 'GET' ? 'selected' : ''}>GET</option>
                  <option value="POST" ${ep.method === 'POST' ? 'selected' : ''}>POST</option>
                  <option value="PUT" ${ep.method === 'PUT' ? 'selected' : ''}>PUT</option>
                  <option value="DELETE" ${ep.method === 'DELETE' ? 'selected' : ''}>DELETE</option>
                  <option value="PATCH" ${ep.method === 'PATCH' ? 'selected' : ''}>PATCH</option>
                </select>
                <input type="text" class="ep-path-input form-input text-xs font-mono" placeholder="/api/v1/resource" value="${ep.path || ''}" data-idx="${idx}" />
                <input type="text" class="ep-desc-input form-input text-xs" placeholder="Description" value="${ep.desc || ''}" data-idx="${idx}" />
                <div class="flex items-center gap-1">
                  <input type="text" class="ep-auth-input form-input text-xs" placeholder="Auth (e.g. Bearer)" value="${ep.auth || 'None'}" data-idx="${idx}" />
                  <button class="delete-ep-btn text-rose-400 hover:text-rose-300 text-xs px-1" data-idx="${idx}">✕</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.CHANGELOG:
      const releases = data.releases || [];
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Changelog'}" class="form-input text-xs" />
        </div>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Release Versions (${releases.length})</label>
            <button id="add-release-btn" class="btn-primary text-xs px-2.5 py-1">
              + Add Release
            </button>
          </div>

          <div id="releases-list" class="space-y-3">
            ${releases.map((rel, idx) => `
              <div class="p-3 bg-card border border-border rounded-lg space-y-2 relative" data-idx="${idx}">
                <div class="flex items-center justify-between">
                  <div class="flex gap-2 flex-1 mr-2">
                    <input type="text" class="rel-version-input form-input text-xs font-bold w-28" placeholder="v1.0.0" value="${rel.version || ''}" data-idx="${idx}" />
                    <input type="text" class="rel-date-input form-input text-xs w-36" placeholder="YYYY-MM-DD" value="${rel.date || ''}" data-idx="${idx}" />
                  </div>
                  <button class="delete-rel-btn text-rose-400 hover:text-rose-300 text-xs px-1" data-idx="${idx}">✕</button>
                </div>
                <textarea class="rel-changes-input form-input text-xs" rows="2" placeholder="List changes (one per line)..." data-idx="${idx}">${(rel.changes || []).join('\n')}</textarea>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.BADGES:
      const bStyle = data.style || 'for-the-badge';
      const bAlign = data.align || 'center';
      const bFormat = data.format || 'html';
      const heroSec = store.getState().sections.find(s => s.type === SECTION_TYPES.HERO);
      const defaultOwner = heroSec?.data?.repoOwner || '';
      const defaultRepo = heroSec?.data?.repoName || '';

      return `
        <!-- Repo Target Bar -->
        <div class="p-3 bg-card border border-border rounded-lg space-y-2">
          <label class="block text-xs font-semibold text-foreground">Target GitHub Repository</label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label class="block text-[11px] text-muted-foreground mb-0.5">Owner / User / Org</label>
              <input type="text" data-field="repoOwner" value="${data.repoOwner || defaultOwner}" class="form-input text-xs" placeholder="e.g. MinaSaadallah" />
            </div>
            <div>
              <label class="block text-[11px] text-muted-foreground mb-0.5">Repository Name</label>
              <input type="text" data-field="repoName" value="${data.repoName || defaultRepo}" class="form-input text-xs" placeholder="e.g. Coverage-Checker" />
            </div>
          </div>
        </div>

        <!-- Style, Alignment & Format Controls -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Badge Style</label>
            <select data-field="style" class="form-input text-xs">
              <option value="for-the-badge" ${bStyle === 'for-the-badge' ? 'selected' : ''}>for-the-badge (Bold)</option>
              <option value="flat" ${bStyle === 'flat' ? 'selected' : ''}>flat (Standard)</option>
              <option value="flat-square" ${bStyle === 'flat-square' ? 'selected' : ''}>flat-square (Minimal)</option>
              <option value="plastic" ${bStyle === 'plastic' ? 'selected' : ''}>plastic (Rounded)</option>
              <option value="social" ${bStyle === 'social' ? 'selected' : ''}>social (GitHub Style)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Alignment</label>
            <select data-field="align" class="form-input text-xs">
              <option value="center" ${bAlign === 'center' ? 'selected' : ''}>Center (Standard)</option>
              <option value="left" ${bAlign === 'left' ? 'selected' : ''}>Left</option>
              <option value="right" ${bAlign === 'right' ? 'selected' : ''}>Right</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Output Format</label>
            <select data-field="format" class="form-input text-xs">
              <option value="html" ${bFormat === 'html' ? 'selected' : ''}>HTML Tags &lt;a&gt;&lt;img&gt; (Reliable)</option>
              <option value="markdown" ${bFormat === 'markdown' ? 'selected' : ''}>Markdown Links [![alt](url)](link)</option>
            </select>
          </div>
        </div>

        <!-- 12 Dynamic GitHub Badges Toggles -->
        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-foreground">Dynamic GitHub Badges</label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-card border border-border rounded-lg text-xs">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showStars" ${data.showStars ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>⭐ GitHub Stars</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showForks" ${data.showForks ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>🍴 GitHub Forks</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showIssues" ${data.showIssues ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>🐛 Open Issues</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showPRs" ${data.showPRs ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>🔀 Pull Requests</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showLicense" ${data.showLicense ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>📜 License Badge</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showRelease" ${data.showRelease ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>🏷️ Latest Release</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showLastCommit" ${data.showLastCommit ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>🕒 Last Commit</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showCodeSize" ${data.showCodeSize ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>📦 Code Size</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showContributors" ${data.showContributors ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>👥 Contributors</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showActionsCI" ${data.showActionsCI ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>🟢 CI Workflow</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showTopLang" ${data.showTopLang ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>🌐 Top Language</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" data-field="showWatchers" ${data.showWatchers ? 'checked' : ''} class="rounded border-border text-foreground" />
              <span>👁️ Watchers</span>
            </label>
          </div>
        </div>

        ${data.showActionsCI ? `
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">GitHub Actions Workflow File</label>
            <input type="text" data-field="ciWorkflowFile" value="${data.ciWorkflowFile || 'ci.yml'}" class="form-input text-xs" placeholder="e.g. ci.yml or build.yml" />
          </div>
        ` : ''}
      `;

    case SECTION_TYPES.ABOUT:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'About The Project'}" class="form-input text-xs" />
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Project Overview / Description</label>
          <textarea data-field="content" rows="6" class="form-input font-sans text-xs leading-relaxed" placeholder="Describe your project...">${data.content || ''}</textarea>
        </div>
      `;

    case SECTION_TYPES.TECH_STACK:
      const selectedTechs = data.technologies || [];
      const curLayout = data.layout || 'categorized';
      const curSize = data.iconSize || 'medium';
      const curAlign = data.align || 'center';

      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Built With'}" class="form-input text-xs" />
        </div>

        <!-- Layout Engine Selector -->
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Display Layout Engine</label>
          <select data-field="layout" class="form-input text-xs">
            <option value="categorized" ${curLayout === 'categorized' ? 'selected' : ''}>🏢 Categorized Tech Stack Grid (Frontend, Backend, Database)</option>
            <option value="devicon-grid" ${curLayout === 'devicon-grid' ? 'selected' : ''}>⚡ Devicon / SimpleIcons Grid (with Clickable Doc Links)</option>
            <option value="skillicons" ${curLayout === 'skillicons' ? 'selected' : ''}>🎨 SkillIcons Modern Ribbon Strip</option>
            <option value="shields" ${curLayout === 'shields' ? 'selected' : ''}>🛡️ Shields.io Brand Badges</option>
            <option value="matrix-table" ${curLayout === 'matrix-table' ? 'selected' : ''}>📊 Architecture Comparison Table</option>
          </select>
        </div>

        <!-- Size, Placement & Alignment Controls -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Icon Size</label>
            <select data-field="iconSize" class="form-input text-xs">
              <option value="small" ${curSize === 'small' ? 'selected' : ''}>Small (28px)</option>
              <option value="medium" ${curSize === 'medium' ? 'selected' : ''}>Medium (40px)</option>
              <option value="large" ${curSize === 'large' ? 'selected' : ''}>Large (52px)</option>
              <option value="xlarge" ${curSize === 'xlarge' ? 'selected' : ''}>Extra Large (64px)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Alignment</label>
            <select data-field="align" class="form-input text-xs">
              <option value="center" ${curAlign === 'center' ? 'selected' : ''}>Center</option>
              <option value="left" ${curAlign === 'left' ? 'selected' : ''}>Left</option>
              <option value="right" ${curAlign === 'right' ? 'selected' : ''}>Right</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Badge Style</label>
            <select data-field="style" class="form-input text-xs">
              <option value="for-the-badge" ${data.style === 'for-the-badge' ? 'selected' : ''}>for-the-badge (Bold)</option>
              <option value="flat" ${data.style === 'flat' ? 'selected' : ''}>flat (Clean)</option>
              <option value="flat-square" ${data.style === 'flat-square' ? 'selected' : ''}>flat-square (Minimal)</option>
            </select>
          </div>
        </div>

        ${curLayout === 'skillicons' ? `
          <div class="grid grid-cols-2 gap-3 p-3 bg-card border border-border rounded-lg">
            <div>
              <label class="block text-[11px] text-muted-foreground mb-1">SkillIcons Theme</label>
              <select data-field="skilliconsTheme" class="form-input text-xs">
                <option value="dark" ${data.skilliconsTheme === 'dark' ? 'selected' : ''}>Dark Theme</option>
                <option value="light" ${data.skilliconsTheme === 'light' ? 'selected' : ''}>Light Theme</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] text-muted-foreground mb-1">Icons Per Line</label>
              <input type="number" data-field="skilliconsPerline" min="4" max="20" value="${data.skilliconsPerline || 10}" class="form-input text-xs" />
            </div>
          </div>
        ` : ''}

        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Selected Technologies (${selectedTechs.length})</label>
            <button id="open-tech-picker-btn" class="btn-primary text-xs px-2.5 py-1 flex items-center gap-1 shadow-xs">
              <span>⚡</span> Manage Tech Stack
            </button>
          </div>

          <div class="p-3 bg-card border border-border rounded-md flex flex-wrap gap-1.5 min-h-[60px]">
            ${selectedTechs.length === 0 ? `
              <span class="text-xs text-muted-foreground">No technologies selected. Click "Manage Tech Stack" to add badges.</span>
            ` : selectedTechs.map(id => {
              const item = TECH_CATALOG.find(t => t.id === id);
              return `
                <span class="text-[11px] px-2 py-0.5 rounded-full border border-border bg-muted text-foreground flex items-center gap-1 font-medium">
                  ${item?.name || id}
                  <button class="remove-tech-chip-btn text-muted-foreground hover:text-foreground ml-1" data-id="${id}">✕</button>
                </span>
              `;
            }).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.FEATURES:
      const items = data.items || [];
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Key Features'}" class="form-input text-xs" />
        </div>

        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Feature List (${items.length})</label>
            <button id="add-feature-btn" class="btn-primary text-xs px-2 py-1">
              + Add Feature
            </button>
          </div>

          <div id="feature-items-list" class="space-y-2">
            ${items.map((item, idx) => `
              <div class="p-2.5 bg-card border border-border rounded-lg space-y-2 relative" data-idx="${idx}">
                <div class="flex items-center gap-2">
                  <input type="text" class="feat-icon-input form-input text-xs w-12 text-center" value="${item.icon || '⚡'}" data-idx="${idx}" />
                  <input type="text" class="feat-title-input form-input text-xs font-medium flex-1" value="${item.title || ''}" placeholder="Feature title" data-idx="${idx}" />
                  <button class="delete-feature-btn text-rose-400 hover:text-rose-300 text-xs px-1" data-idx="${idx}">✕</button>
                </div>
                <textarea class="feat-desc-input form-input text-xs" rows="2" placeholder="Feature description..." data-idx="${idx}">${item.desc || ''}</textarea>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.INSTALLATION:
      const steps = data.steps || [];
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Getting Started'}" class="form-input text-xs" />
        </div>

        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Prerequisites</label>
          <input type="text" data-field="prerequisites" value="${data.prerequisites || ''}" placeholder="Node.js 18+ and Git installed" class="form-input text-xs" />
        </div>

        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Installation Steps (${steps.length})</label>
            <button id="add-install-step-btn" class="btn-primary text-xs px-2 py-1">
              + Add Step
            </button>
          </div>

          <div id="install-steps-list" class="space-y-2">
            ${steps.map((s, idx) => `
              <div class="p-2.5 bg-card border border-border rounded-lg space-y-2 relative" data-idx="${idx}">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono text-muted-foreground">Step ${idx + 1}</span>
                  <button class="delete-step-btn text-rose-400 hover:text-rose-300 text-xs px-1" data-idx="${idx}">✕</button>
                </div>
                <input type="text" class="step-title-input form-input text-xs font-medium" value="${s.title || ''}" placeholder="Step description" data-idx="${idx}" />
                <textarea class="step-cmd-input form-input font-mono text-xs" rows="2" placeholder="Terminal command..." data-idx="${idx}">${s.cmd || ''}</textarea>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.PROJECT_STRUCTURE:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Project Structure'}" class="form-input text-xs" />
        </div>
        <div>
          <div class="flex items-center justify-between mb-1">
            <label class="block text-xs font-medium text-foreground">Directory Tree (ASCII)</label>
            <span class="text-[10px] text-muted-foreground">Auto-generated via Deep Scan</span>
          </div>
          <textarea data-field="tree" rows="12" class="form-input font-mono text-xs leading-relaxed" placeholder=".\n├── src/\n│   └── index.ts\n└── README.md">${data.tree || ''}</textarea>
        </div>
      `;

    case SECTION_TYPES.ENV_VARS:
      const variables = data.variables || [];
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Environment Variables'}" class="form-input text-xs" />
        </div>

        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Variables (${variables.length})</label>
            <button id="add-env-var-btn" class="btn-primary text-xs px-2 py-1">
              + Add Variable
            </button>
          </div>

          <div id="env-vars-list" class="space-y-2">
            ${variables.map((v, idx) => `
              <div class="p-2.5 bg-card border border-border rounded-lg grid grid-cols-1 sm:grid-cols-4 gap-2 items-center text-xs" data-idx="${idx}">
                <input type="text" class="env-key-input form-input font-mono text-xs" placeholder="KEY_NAME" value="${v.key || ''}" data-idx="${idx}" />
                <input type="text" class="env-desc-input form-input text-xs sm:col-span-2" placeholder="Description" value="${v.desc || ''}" data-idx="${idx}" />
                <div class="flex items-center gap-1">
                  <input type="text" class="env-default-input form-input text-xs" placeholder="Default" value="${v.default || ''}" data-idx="${idx}" />
                  <button class="delete-env-btn text-rose-400 hover:text-rose-300 text-xs px-1" data-idx="${idx}">✕</button>
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
          <input type="text" data-field="heading" value="${data.heading || 'Usage'}" class="form-input text-xs" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Syntax Language</label>
            <input type="text" data-field="codeLang" value="${data.codeLang || 'bash'}" class="form-input text-xs" placeholder="bash, ts, python..." />
          </div>
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Example Code</label>
          <textarea data-field="code" rows="5" class="form-input font-mono text-xs leading-relaxed" placeholder="# Example usage command...">${data.code || ''}</textarea>
        </div>
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Important Note / Tip</label>
          <input type="text" data-field="note" value="${data.note || ''}" class="form-input text-xs" placeholder="Tip or note..." />
        </div>
      `;

    case SECTION_TYPES.ROADMAP:
      const tasks = data.tasks || [];
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Roadmap'}" class="form-input text-xs" />
        </div>

        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Roadmap Items (${tasks.length})</label>
            <button id="add-task-btn" class="btn-primary text-xs px-2 py-1">
              + Add Item
            </button>
          </div>

          <div id="tasks-list" class="space-y-1.5">
            ${tasks.map((t, idx) => `
              <div class="flex items-center gap-2 p-2 bg-card border border-border rounded-md text-xs" data-idx="${idx}">
                <input type="checkbox" class="task-check rounded border-border" ${t.completed ? 'checked' : ''} data-idx="${idx}" />
                <input type="text" class="task-text-input form-input text-xs flex-1" value="${t.text || ''}" placeholder="Task description..." data-idx="${idx}" />
                <button class="delete-task-btn text-rose-400 hover:text-rose-300 text-xs px-1" data-idx="${idx}">✕</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;

    case SECTION_TYPES.CONTRIBUTING:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Contributing'}" class="form-input text-xs" />
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

    case SECTION_TYPES.LICENSE: {
      const activeLic = getLicenseById(data.type || 'MIT');
      const curYear = data.year || new Date().getFullYear().toString();
      const curHolder = data.holder || 'Your Name';
      const curProj = data.projectName || '';
      const curPres = data.presentation || 'badge-minimal';
      const legalTextPreview = activeLic.generateText(curYear, curHolder, curProj);

      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'License'}" class="form-input text-xs" />
        </div>

        <!-- License Chooser Cards Grid -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <span>⚖️</span> Select License (${LICENSE_CATALOG.length} Legal Standards)
            </label>
            <span class="text-[10px] text-muted-foreground">Click to select legal license</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-h-[300px] overflow-y-auto p-1 border border-border rounded-lg bg-card/40">
            ${LICENSE_CATALOG.map(lic => {
              const isSelected = lic.id === activeLic.id;
              return `
                <div 
                  class="license-select-card p-3 rounded-md border text-left cursor-pointer transition flex flex-col justify-between select-none ${
                    isSelected 
                      ? 'border-foreground bg-accent shadow-xs ring-1 ring-foreground/20' 
                      : 'border-border bg-card hover:border-foreground/40 hover:bg-muted/40'
                  }"
                  data-license-id="${lic.id}"
                >
                  <div class="space-y-1">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold text-foreground font-mono">${lic.id}</span>
                      ${isSelected ? '<span class="text-[10px] font-semibold text-foreground">✓ Active</span>' : ''}
                    </div>
                    <p class="text-[11px] font-medium text-foreground line-clamp-1">${lic.name}</p>
                    <p class="text-[10px] text-muted-foreground line-clamp-2 leading-tight">${lic.shortDesc}</p>
                  </div>

                  <div class="mt-2.5 pt-2 border-t border-border/60 flex flex-wrap gap-1">
                    ${lic.permissions.slice(0, 2).map(p => `
                      <span class="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">✓ ${p}</span>
                    `).join('')}
                    ${lic.limitations.slice(0, 1).map(l => `
                      <span class="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium">✕ ${l}</span>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Selected License Details & Metadata -->
        <div class="p-3.5 bg-card border border-border rounded-lg space-y-3">
          <div class="flex items-center justify-between border-b border-border/60 pb-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-foreground">${activeLic.name} (${activeLic.spdxId})</span>
              <a href="${activeLic.url}" target="_blank" rel="noopener noreferrer" class="text-[10px] text-muted-foreground hover:text-foreground hover:underline">Official SPDX Spec ↗</a>
            </div>
            <img src="${activeLic.badgeUrl}" alt="${activeLic.id}" class="h-4" />
          </div>

          <!-- Permissions, Limitations & Conditions Matrix -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div class="p-2.5 rounded bg-background border border-border space-y-1">
              <span class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Permissions</span>
              <ul class="text-[11px] text-muted-foreground space-y-0.5">
                ${activeLic.permissions.map(p => `<li>✓ ${p}</li>`).join('')}
              </ul>
            </div>
            <div class="p-2.5 rounded bg-background border border-border space-y-1">
              <span class="text-[10px] font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">Limitations</span>
              <ul class="text-[11px] text-muted-foreground space-y-0.5">
                ${activeLic.limitations.map(l => `<li>✕ ${l}</li>`).join('')}
              </ul>
            </div>
            <div class="p-2.5 rounded bg-background border border-border space-y-1">
              <span class="text-[10px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">Conditions</span>
              <ul class="text-[11px] text-muted-foreground space-y-0.5">
                ${activeLic.conditions.length > 0 ? activeLic.conditions.map(c => `<li>ℹ ${c}</li>`).join('') : '<li class="text-zinc-500">None required</li>'}
              </ul>
            </div>
          </div>

          <!-- Metadata Fields -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div>
              <label class="block text-xs font-medium text-foreground mb-1">Copyright Year</label>
              <input type="text" data-field="year" value="${curYear}" class="form-input text-xs" placeholder="${new Date().getFullYear()}" />
            </div>
            <div>
              <label class="block text-xs font-medium text-foreground mb-1">Copyright Holder</label>
              <input type="text" data-field="holder" value="${curHolder}" class="form-input text-xs" placeholder="Full Name or Organization" />
            </div>
            <div>
              <label class="block text-xs font-medium text-foreground mb-1">Project Name (for header)</label>
              <input type="text" data-field="projectName" value="${curProj}" class="form-input text-xs" placeholder="Project Name" />
            </div>
          </div>

          <!-- Presentation Style Selector -->
          <div class="pt-1">
            <label class="block text-xs font-medium text-foreground mb-1">README Presentation Format</label>
            <select data-field="presentation" class="form-input text-xs">
              <option value="badge-minimal" ${curPres === 'badge-minimal' ? 'selected' : ''}>Minimal: Shields.io Badge & Link to LICENSE</option>
              <option value="collapsible-details" ${curPres === 'collapsible-details' ? 'selected' : ''}>Interactive: Badge + Collapsible Full Legal Text (&lt;details&gt;)</option>
              <option value="summary-table" ${curPres === 'summary-table' ? 'selected' : ''}>Comprehensive: Badge + Permissions &amp; Limitations Table</option>
            </select>
          </div>
        </div>

        <!-- 1-Click Download & Legal Text Actions -->
        <div class="p-3.5 bg-card border border-border rounded-lg space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span class="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <span>📄</span> Export Standalone Root LICENSE File
              </span>
              <p class="text-[11px] text-muted-foreground">Download the exact legal text file to place directly into your project's root folder</p>
            </div>
            <div class="flex items-center gap-2">
              <button id="copy-license-text-btn" class="btn-secondary text-xs px-3 py-1.5 whitespace-nowrap flex items-center gap-1">
                <span>📋</span> Copy Legal Text
              </button>
              <button id="download-license-file-btn" class="btn-primary text-xs px-3 py-1.5 whitespace-nowrap flex items-center gap-1">
                <span>💾</span> Download LICENSE File
              </button>
            </div>
          </div>

          <div>
            <label class="block text-[11px] text-muted-foreground mb-1">Live Generated Legal Agreement Preview:</label>
            <pre class="bg-background border border-border rounded p-3 font-mono text-[10.5px] leading-relaxed text-muted-foreground max-h-40 overflow-y-auto select-all whitespace-pre-wrap">${legalTextPreview}</pre>
          </div>
        </div>
      `;
    }

    case SECTION_TYPES.AUTHOR:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Author & Contact'}" class="form-input text-xs" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Author Name</label>
            <input type="text" data-field="name" value="${data.name || ''}" class="form-input text-xs" placeholder="Alex Developer" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">GitHub Username</label>
            <input type="text" data-field="github" value="${data.github || ''}" class="form-input text-xs" placeholder="alexdev" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Twitter / X Handle</label>
            <input type="text" data-field="twitter" value="${data.twitter || ''}" class="form-input text-xs" placeholder="alex_dev" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">LinkedIn Handle</label>
            <input type="text" data-field="linkedin" value="${data.linkedin || ''}" class="form-input text-xs" placeholder="alex-developer" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Email Address</label>
            <input type="email" data-field="email" value="${data.email || ''}" class="form-input text-xs" placeholder="alex@example.com" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Buy Me a Coffee</label>
            <input type="text" data-field="buyMeACoffee" value="${data.buyMeACoffee || ''}" class="form-input text-xs" placeholder="alexdev" />
          </div>
        </div>
      `;

    case SECTION_TYPES.CUSTOM:
      return `
        <div>
          <label class="block text-xs font-medium text-foreground mb-1">Section Heading</label>
          <input type="text" data-field="heading" value="${data.heading || 'Custom Section'}" class="form-input text-xs" />
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
  // Generic [data-field] inputs
  container.querySelectorAll('[data-field]').forEach(el => {
    const field = el.dataset.field;
    const isCheckbox = el.type === 'checkbox';

    el.addEventListener(isCheckbox ? 'change' : 'input', () => {
      const val = isCheckbox ? el.checked : el.value;
      store.updateSectionData(sectionId, { [field]: val });
    });
  });

  // Hero Deep Scan Trigger
  const triggerAutoDetectBtn = container.querySelector('#trigger-autodetect-btn');
  const autoDetectInput = container.querySelector('#github-autodetect-input');
  if (triggerAutoDetectBtn && autoDetectInput) {
    triggerAutoDetectBtn.addEventListener('click', async () => {
      const parsed = parseGitHubRepoInput(autoDetectInput.value);
      if (!parsed) {
        showToast('Please enter a valid repo (e.g. facebook/react or GitHub URL)', 'error');
        return;
      }

      triggerAutoDetectBtn.innerHTML = '<span>⏳</span> Scanning...';
      triggerAutoDetectBtn.disabled = true;

      try {
        const info = await fetchGitHubRepoFullDetails(parsed.owner, parsed.repo, progress => {
          triggerAutoDetectBtn.innerHTML = `<span>⏳</span> ${progress.message.slice(0, 18)}...`;
        });

        store.applyRepoAnalysis(info);
        fireConfetti();
        showToast(`Deep scan complete! ${info.repo} (${info.matchedTechIds.length} tech badges detected)`, 'success');
      } catch (err) {
        showToast(err.message || 'Failed to scan repository', 'error');
      } finally {
        triggerAutoDetectBtn.innerHTML = '<span>⚡</span> Deep Scan';
        triggerAutoDetectBtn.disabled = false;
      }
    });
  }

  // Banner / Image Studio triggers
  container.querySelector('#open-banner-hub-btn')?.addEventListener('click', () => {
    renderPhotoModal('hero');
  });
  container.querySelector('#open-demo-studio-btn')?.addEventListener('click', () => {
    renderPhotoModal('demo');
  });

  // Tech Picker trigger
  container.querySelector('#open-tech-picker-btn')?.addEventListener('click', () => {
    renderTechPickerModal();
  });

  // Remove single tech badge chip
  container.querySelectorAll('.remove-tech-chip-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const removeId = btn.dataset.id;
      const currentList = currentData.technologies || [];
      const updated = currentList.filter(id => id !== removeId);
      store.updateSectionData(sectionId, { technologies: updated });
    });
  });

  // Feature items handlers
  const featureList = container.querySelector('#feature-items-list');
  container.querySelector('#add-feature-btn')?.addEventListener('click', () => {
    const items = [...(currentData.items || [])];
    items.push({ icon: '✨', title: 'New Feature', desc: 'Description of your new feature.' });
    store.updateSectionData(sectionId, { items });
  });

  featureList?.addEventListener('input', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const items = [...(currentData.items || [])];
    if (!items[idx]) return;

    if (e.target.classList.contains('feat-icon-input')) items[idx].icon = e.target.value;
    if (e.target.classList.contains('feat-title-input')) items[idx].title = e.target.value;
    if (e.target.classList.contains('feat-desc-input')) items[idx].desc = e.target.value;

    store.updateSectionData(sectionId, { items });
  });

  featureList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-feature-btn');
    if (btn) {
      const idx = parseInt(btn.dataset.idx, 10);
      const items = (currentData.items || []).filter((_, i) => i !== idx);
      store.updateSectionData(sectionId, { items });
    }
  });

  // Installation steps handlers
  const stepsList = container.querySelector('#install-steps-list');
  container.querySelector('#add-install-step-btn')?.addEventListener('click', () => {
    const steps = [...(currentData.steps || [])];
    steps.push({ title: 'New step', cmd: 'echo "Step command"' });
    store.updateSectionData(sectionId, { steps });
  });

  stepsList?.addEventListener('input', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const steps = [...(currentData.steps || [])];
    if (!steps[idx]) return;

    if (e.target.classList.contains('step-title-input')) steps[idx].title = e.target.value;
    if (e.target.classList.contains('step-cmd-input')) steps[idx].cmd = e.target.value;

    store.updateSectionData(sectionId, { steps });
  });

  stepsList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-step-btn');
    if (btn) {
      const idx = parseInt(btn.dataset.idx, 10);
      const steps = (currentData.steps || []).filter((_, i) => i !== idx);
      store.updateSectionData(sectionId, { steps });
    }
  });

  // Environment variables handlers
  const envList = container.querySelector('#env-vars-list');
  container.querySelector('#add-env-var-btn')?.addEventListener('click', () => {
    const variables = [...(currentData.variables || [])];
    variables.push({ key: 'NEW_VAR', desc: 'Description of variable', default: '-', required: false });
    store.updateSectionData(sectionId, { variables });
  });

  envList?.addEventListener('input', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const variables = [...(currentData.variables || [])];
    if (!variables[idx]) return;

    if (e.target.classList.contains('env-key-input')) variables[idx].key = e.target.value;
    if (e.target.classList.contains('env-desc-input')) variables[idx].desc = e.target.value;
    if (e.target.classList.contains('env-default-input')) variables[idx].default = e.target.value;

    store.updateSectionData(sectionId, { variables });
  });

  envList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-env-btn');
    if (btn) {
      const idx = parseInt(btn.dataset.idx, 10);
      const variables = (currentData.variables || []).filter((_, i) => i !== idx);
      store.updateSectionData(sectionId, { variables });
    }
  });

  // Roadmap tasks handlers
  const tasksList = container.querySelector('#tasks-list');
  container.querySelector('#add-task-btn')?.addEventListener('click', () => {
    const tasks = [...(currentData.tasks || [])];
    tasks.push({ text: 'New milestone', completed: false });
    store.updateSectionData(sectionId, { tasks });
  });

  tasksList?.addEventListener('input', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const tasks = [...(currentData.tasks || [])];
    if (!tasks[idx]) return;

    if (e.target.classList.contains('task-text-input')) tasks[idx].text = e.target.value;
    store.updateSectionData(sectionId, { tasks });
  });

  tasksList?.addEventListener('change', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const tasks = [...(currentData.tasks || [])];
    if (!tasks[idx]) return;

    if (e.target.classList.contains('task-check')) tasks[idx].completed = e.target.checked;
    store.updateSectionData(sectionId, { tasks });
  });

  tasksList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-task-btn');
    if (btn) {
      const idx = parseInt(btn.dataset.idx, 10);
      const tasks = (currentData.tasks || []).filter((_, i) => i !== idx);
      store.updateSectionData(sectionId, { tasks });
    }
  });

  // FAQ Handlers
  const faqList = container.querySelector('#faq-items-list');
  container.querySelector('#add-faq-btn')?.addEventListener('click', () => {
    const questions = [...(currentData.questions || [])];
    questions.push({ q: 'New question?', a: 'Answer to the question.' });
    store.updateSectionData(sectionId, { questions });
  });

  faqList?.addEventListener('input', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const questions = [...(currentData.questions || [])];
    if (!questions[idx]) return;

    if (e.target.classList.contains('faq-q-input')) questions[idx].q = e.target.value;
    if (e.target.classList.contains('faq-a-input')) questions[idx].a = e.target.value;

    store.updateSectionData(sectionId, { questions });
  });

  faqList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-faq-btn');
    if (btn) {
      const idx = parseInt(btn.dataset.idx, 10);
      const questions = (currentData.questions || []).filter((_, i) => i !== idx);
      store.updateSectionData(sectionId, { questions });
    }
  });

  // Benchmarks Handlers
  const benchList = container.querySelector('#benchmark-items-list');
  container.querySelector('#add-benchmark-btn')?.addEventListener('click', () => {
    const rows = [...(currentData.rows || [])];
    rows.push({ task: 'Task Name', baseline: '100ms', current: '20ms', diff: '5x faster' });
    store.updateSectionData(sectionId, { rows });
  });

  benchList?.addEventListener('input', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const rows = [...(currentData.rows || [])];
    if (!rows[idx]) return;

    if (e.target.classList.contains('bench-task-input')) rows[idx].task = e.target.value;
    if (e.target.classList.contains('bench-base-input')) rows[idx].baseline = e.target.value;
    if (e.target.classList.contains('bench-curr-input')) rows[idx].current = e.target.value;
    if (e.target.classList.contains('bench-diff-input')) rows[idx].diff = e.target.value;

    store.updateSectionData(sectionId, { rows });
  });

  benchList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-bench-btn');
    if (btn) {
      const idx = parseInt(btn.dataset.idx, 10);
      const rows = (currentData.rows || []).filter((_, i) => i !== idx);
      store.updateSectionData(sectionId, { rows });
    }
  });

  // API Reference Handlers
  const apiList = container.querySelector('#api-endpoints-list');
  container.querySelector('#add-endpoint-btn')?.addEventListener('click', () => {
    const endpoints = [...(currentData.endpoints || [])];
    endpoints.push({ method: 'GET', path: '/api/v1/new', desc: 'Endpoint description', auth: 'None' });
    store.updateSectionData(sectionId, { endpoints });
  });

  apiList?.addEventListener('input', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const endpoints = [...(currentData.endpoints || [])];
    if (!endpoints[idx]) return;

    if (e.target.classList.contains('ep-path-input')) endpoints[idx].path = e.target.value;
    if (e.target.classList.contains('ep-desc-input')) endpoints[idx].desc = e.target.value;
    if (e.target.classList.contains('ep-auth-input')) endpoints[idx].auth = e.target.value;

    store.updateSectionData(sectionId, { endpoints });
  });

  apiList?.addEventListener('change', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const endpoints = [...(currentData.endpoints || [])];
    if (!endpoints[idx]) return;

    if (e.target.classList.contains('ep-method-select')) endpoints[idx].method = e.target.value;
    store.updateSectionData(sectionId, { endpoints });
  });

  apiList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-ep-btn');
    if (btn) {
      const idx = parseInt(btn.dataset.idx, 10);
      const endpoints = (currentData.endpoints || []).filter((_, i) => i !== idx);
      store.updateSectionData(sectionId, { endpoints });
    }
  });

  // Changelog Releases Handlers
  const relList = container.querySelector('#releases-list');
  container.querySelector('#add-release-btn')?.addEventListener('click', () => {
    const releases = [...(currentData.releases || [])];
    releases.push({ version: 'v1.1.0', date: new Date().toISOString().slice(0, 10), changes: ['New feature added'] });
    store.updateSectionData(sectionId, { releases });
  });

  relList?.addEventListener('input', (e) => {
    const idx = parseInt(e.target.dataset.idx, 10);
    const releases = [...(currentData.releases || [])];
    if (!releases[idx]) return;

    if (e.target.classList.contains('rel-version-input')) releases[idx].version = e.target.value;
    if (e.target.classList.contains('rel-date-input')) releases[idx].date = e.target.value;
    if (e.target.classList.contains('rel-changes-input')) {
      releases[idx].changes = e.target.value.split('\n').filter(c => c.trim().length > 0);
    }

    store.updateSectionData(sectionId, { releases });
  });

  relList?.addEventListener('click', (e) => {
    const btn = e.target.closest('.delete-rel-btn');
    if (btn) {
      const idx = parseInt(btn.dataset.idx, 10);
      const releases = (currentData.releases || []).filter((_, i) => i !== idx);
      store.updateSectionData(sectionId, { releases });
    }
  });

  // License Studio Handlers
  container.querySelectorAll('.license-select-card').forEach(card => {
    card.addEventListener('click', () => {
      const licId = card.dataset.licenseId;
      store.updateSectionData(sectionId, { type: licId });
    });
  });

  container.querySelector('#download-license-file-btn')?.addEventListener('click', () => {
    const sec = store.getState().sections.find(s => s.id === sectionId);
    const data = sec ? sec.data : currentData;
    const lic = getLicenseById(data.type || 'MIT');
    const year = data.year || new Date().getFullYear().toString();
    const holder = data.holder || 'Your Name';
    const proj = data.projectName || '';
    const text = lic.generateText(year, holder, proj);
    downloadReadmeFile(text, 'LICENSE');
    fireConfetti();
    showToast(`Downloaded LICENSE (${lic.id})! Place in your repo root.`, 'success');
  });

  container.querySelector('#copy-license-text-btn')?.addEventListener('click', () => {
    const sec = store.getState().sections.find(s => s.id === sectionId);
    const data = sec ? sec.data : currentData;
    const lic = getLicenseById(data.type || 'MIT');
    const year = data.year || new Date().getFullYear().toString();
    const holder = data.holder || 'Your Name';
    const proj = data.projectName || '';
    const text = lic.generateText(year, holder, proj);
    copyToClipboard(text, `Copied ${lic.name} agreement to clipboard!`);
  });
}


/* ==================== MODULE: components/wizard.js ==================== */
/**
 * Readmify - Easy Guide & Deep Repository Scanner Hub
 * Smart auto-detection, live scanning visualizer, and streamlined manual setup
 */





// Guide states: 'hub' | 'scanning' | 'report' | 'manual-step-1' | 'manual-step-2' | 'manual-step-3'
let guideView = 'hub';
let currentScanAnalysis = null;
let currentScanProgress = { step: 1, message: 'Initializing deep scan...' };
let currentRepoInput = '';

let manualData = {
  projectName: '',
  tagline: '',
  repoOwner: '',
  repoName: '',
  packageManager: 'npm',
  technologies: ['javascript', 'html5', 'css3', 'git']
};

const POPULAR_SAMPLE_REPOS = [
  { label: 'Express.js', repo: 'expressjs/express' },
  { label: 'FastAPI', repo: 'fastapi/fastapi' },
  { label: 'Tailwind CSS', repo: 'tailwindlabs/tailwindcss' },
  { label: 'React', repo: 'facebook/react' },
  { label: 'shadcn/ui', repo: 'shadcn-ui/ui' }
];
function openWizard(initialRepo = '', autoScan = false) {
  const state = store.getState();
  const hero = state.sections.find(s => s.type === SECTION_TYPES.HERO);

  if (initialRepo) {
    currentRepoInput = initialRepo;
  } else if (hero?.data?.repoOwner && hero?.data?.repoName && hero.data.repoName !== 'your-awesome-project') {
    currentRepoInput = `${hero.data.repoOwner}/${hero.data.repoName}`;
  } else {
    currentRepoInput = '';
  }

  if (hero?.data?.projectName && hero.data.projectName !== 'Readmify' && hero.data.projectName !== 'My Project') {
    manualData.projectName = hero.data.projectName;
    manualData.tagline = hero.data.tagline || '';
    manualData.repoOwner = hero.data.repoOwner || '';
    manualData.repoName = hero.data.repoName || '';
  }

  let modal = document.getElementById('quick-wizard-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'quick-wizard-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs';
    document.body.appendChild(modal);
  }

  modal.classList.remove('hidden');

  if (autoScan && currentRepoInput) {
    startDeepScan(currentRepoInput);
  } else {
    guideView = 'hub';
    renderGuideView();
  }
}
function closeWizard() {
  const modal = document.getElementById('quick-wizard-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function renderGuideView() {
  const modal = document.getElementById('quick-wizard-modal');
  if (!modal) return;

  modal.innerHTML = `
    <div class="bg-card border border-border rounded-lg w-full max-w-xl shadow-2xl flex flex-col overflow-hidden max-h-[88vh]">
      <!-- Header -->
      <div class="px-5 py-3.5 border-b border-border bg-card flex items-center justify-between flex-shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-md bg-muted border border-border flex items-center justify-center text-foreground font-semibold text-xs">
            📖
          </div>
          <div>
            <h3 class="text-xs font-semibold text-foreground">Readmify Easy Guide</h3>
            <p class="text-[11px] text-muted-foreground">${getGuideSubtitle()}</p>
          </div>
        </div>
        <button id="close-guide-btn" class="text-muted-foreground hover:text-foreground text-xs p-1">✕</button>
      </div>

      <!-- Main Body -->
      <div class="p-5 overflow-y-auto flex-1 space-y-4 bg-background">
        ${getGuideBodyHtml()}
      </div>

      <!-- Footer Navigation -->
      <div class="px-5 py-3 border-t border-border bg-card flex items-center justify-between flex-shrink-0">
        ${getGuideFooterHtml()}
      </div>
    </div>
  `;

  modal.querySelector('#close-guide-btn')?.addEventListener('click', closeWizard);
  attachGuideListeners(modal);
}

function getGuideSubtitle() {
  switch (guideView) {
    case 'hub':
      return 'The smartest way to generate a README from your repo';
    case 'scanning':
      return 'Deep scanning repository files, manifests & scripts...';
    case 'report':
      return 'Repository analyzed! Review insights before generating';
    case 'manual-step-1':
      return 'Manual Guide: Step 1 of 3 (Project Identity)';
    case 'manual-step-2':
      return 'Manual Guide: Step 2 of 3 (Tech Stack)';
    case 'manual-step-3':
      return 'Manual Guide: Step 3 of 3 (Run & Install)';
    default:
      return 'Create a stunning README';
  }
}

function getGuideBodyHtml() {
  switch (guideView) {
    case 'hub':
      return `
        <!-- Main Card: Auto-Detect with Repo Link -->
        <div class="p-4 bg-card border border-border rounded-lg space-y-3.5">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <h4 class="text-xs font-semibold text-foreground uppercase tracking-wider">Fastest: Scan Your GitHub Repo</h4>
          </div>
          <p class="text-xs text-muted-foreground leading-relaxed">
            Paste your repository link. Readmify will deeply inspect your file tree, <code class="text-[11px] px-1 py-0.5 rounded bg-muted text-foreground">package.json</code>, lockfiles, environment variables, and scripts to construct an entire tailored README.
          </p>

          <div class="space-y-2">
            <div class="flex gap-2">
              <div class="relative flex-1">
                <span class="absolute left-2.5 top-2.5 text-muted-foreground text-xs pointer-events-none">🐙</span>
                <input 
                  type="text" 
                  id="guide-repo-input" 
                  value="${currentRepoInput}"
                  placeholder="https://github.com/owner/repo or owner/repo..." 
                  class="form-input text-xs pl-7 pr-3 h-9" 
                />
              </div>
              <button id="guide-deep-scan-btn" class="btn-primary text-xs px-4 h-9 whitespace-nowrap flex items-center gap-1.5 shadow-sm">
                <span>⚡</span> Deep Scan & Generate
              </button>
            </div>

            <!-- Quick Example Chips -->
            <div class="flex flex-wrap items-center gap-1.5 pt-1">
              <span class="text-[10px] text-muted-foreground mr-1">Try sample:</span>
              ${POPULAR_SAMPLE_REPOS.map(sample => `
                <button class="sample-repo-chip text-[10px] px-2 py-0.5 rounded border border-border bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition" data-repo="${sample.repo}">
                  ${sample.label}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Alternative: Manual Setup -->
        <div class="p-4 rounded-lg border border-dashed border-border bg-card/30 flex items-center justify-between gap-3">
          <div class="space-y-0.5">
            <div class="text-xs font-medium text-foreground">Building locally without a GitHub link yet?</div>
            <p class="text-[11px] text-muted-foreground">Answer 3 simple questions to set up your project manually.</p>
          </div>
          <button id="guide-start-manual-btn" class="btn-secondary text-xs px-3 py-1.5 whitespace-nowrap">
            1-Min Manual Guide →
          </button>
        </div>
      `;

    case 'scanning':
      return `
        <div class="py-8 px-4 flex flex-col items-center justify-center text-center space-y-4">
          <div class="w-12 h-12 rounded-full border-2 border-border border-t-foreground animate-spin flex items-center justify-center text-xs">
            ⚡
          </div>
          <div class="space-y-1">
            <h4 class="text-xs font-semibold text-foreground">Analyzing Repository Architecture</h4>
            <p id="guide-live-status-text" class="text-xs text-muted-foreground">${currentScanProgress.message}</p>
          </div>

          <div class="w-full max-w-sm bg-muted/40 border border-border rounded-lg p-3 text-left space-y-2 text-[11px] font-mono text-muted-foreground">
            <div class="flex items-center gap-2 ${currentScanProgress.step >= 1 ? 'text-foreground font-medium' : 'opacity-40'}">
              <span>${currentScanProgress.step > 1 ? '✅' : '⏳'}</span> 1. Verify repository & metadata
            </div>
            <div class="flex items-center gap-2 ${currentScanProgress.step >= 2 ? 'text-foreground font-medium' : 'opacity-40'}">
              <span>${currentScanProgress.step > 2 ? '✅' : '⏳'}</span> 2. Scan recursive git file tree
            </div>
            <div class="flex items-center gap-2 ${currentScanProgress.step >= 3 ? 'text-foreground font-medium' : 'opacity-40'}">
              <span>${currentScanProgress.step > 3 ? '✅' : '⏳'}</span> 3. Inspect package manifests & lockfiles
            </div>
            <div class="flex items-center gap-2 ${currentScanProgress.step >= 4 ? 'text-foreground font-medium' : 'opacity-40'}">
              <span>${currentScanProgress.step > 4 ? '✅' : '⏳'}</span> 4. Extract dependencies & frameworks
            </div>
            <div class="flex items-center gap-2 ${currentScanProgress.step >= 5 ? 'text-foreground font-medium' : 'opacity-40'}">
              <span>${currentScanProgress.step > 5 ? '✅' : '⏳'}</span> 5. Parse environment variables (.env.example)
            </div>
            <div class="flex items-center gap-2 ${currentScanProgress.step >= 6 ? 'text-foreground font-medium' : 'opacity-40'}">
              <span>${currentScanProgress.step >= 6 ? '✅' : '⏳'}</span> 6. Map directory tree & synthesize features
            </div>
          </div>
        </div>
      `;

    case 'report':
      if (!currentScanAnalysis) return '<p class="text-xs text-muted-foreground">No analysis data available.</p>';
      const a = currentScanAnalysis;
      const langSummary = a.languages.slice(0, 3).map(l => `${l.name} (${l.percentage}%)`).join(', ');

      return `
        <div class="space-y-3.5">
          <!-- Summary Header Box -->
          <div class="p-3.5 bg-card border border-border rounded-lg flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-md bg-muted border border-border flex items-center justify-center text-sm font-semibold text-foreground">
                📦
              </div>
              <div>
                <h4 class="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <span>${a.owner} / ${a.repo}</span>
                  <span class="text-[10px] px-1.5 py-0.2 rounded border border-border bg-muted text-muted-foreground font-normal">${a.license}</span>
                </h4>
                <p class="text-[11px] text-muted-foreground truncate max-w-sm">${a.description || 'No description provided'}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 text-right">
              <span class="text-xs font-medium text-foreground">⭐ ${a.stars.toLocaleString()}</span>
              <span class="text-[11px] text-muted-foreground">🍴 ${a.forks.toLocaleString()}</span>
            </div>
          </div>

          <!-- Discovered Stats Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div class="p-2.5 bg-card border border-border rounded-md text-center">
              <div class="text-[10px] text-muted-foreground">Package Mgr</div>
              <div class="text-xs font-semibold text-foreground uppercase mt-0.5">${a.packageManager}</div>
            </div>
            <div class="p-2.5 bg-card border border-border rounded-md text-center">
              <div class="text-[10px] text-muted-foreground">Files Scanned</div>
              <div class="text-xs font-semibold text-foreground mt-0.5">${a.totalFiles || 'All'}</div>
            </div>
            <div class="p-2.5 bg-card border border-border rounded-md text-center">
              <div class="text-[10px] text-muted-foreground">Env Variables</div>
              <div class="text-xs font-semibold text-foreground mt-0.5">${a.envVars.length} found</div>
            </div>
            <div class="p-2.5 bg-card border border-border rounded-md text-center">
              <div class="text-[10px] text-muted-foreground">CI Workflows</div>
              <div class="text-xs font-semibold text-foreground mt-0.5">${a.workflowBadges.length} detected</div>
            </div>
          </div>

          <!-- Detected Tech Badges -->
          <div class="p-3 bg-card border border-border rounded-lg space-y-1.5">
            <div class="flex items-center justify-between text-xs">
              <span class="font-medium text-foreground">Discovered Tech Stack (${a.matchedTechIds.length})</span>
              <span class="text-[10px] text-muted-foreground">${langSummary}</span>
            </div>
            <div class="flex flex-wrap gap-1.5 pt-1">
              ${a.matchedTechIds.map(id => {
                const item = TECH_CATALOG.find(t => t.id === id);
                return `
                  <span class="text-[11px] px-2 py-0.5 rounded-full border border-border bg-muted text-foreground flex items-center gap-1 font-medium">
                    ${item?.name || id}
                  </span>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Synthesized Features Preview -->
          <div class="p-3 bg-card border border-border rounded-lg space-y-1.5">
            <span class="text-xs font-medium text-foreground">Synthesized Features (${a.features.length})</span>
            <div class="space-y-1 pt-1 text-[11px]">
              ${a.features.map(f => `
                <div class="flex items-start gap-1.5 text-muted-foreground">
                  <span>${f.icon}</span>
                  <div><strong class="text-foreground">${f.title}:</strong> ${f.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;

    case 'manual-step-1':
      return `
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Project Name</label>
            <input type="text" id="man-project-name" value="${manualData.projectName}" placeholder="e.g. MyAwesomeApp" class="form-input text-xs" />
          </div>
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Tagline / What does it do?</label>
            <input type="text" id="man-tagline" value="${manualData.tagline}" placeholder="e.g. Blazing-fast web app for managing data" class="form-input text-xs" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-foreground mb-1">GitHub Username / Org</label>
              <input type="text" id="man-repo-owner" value="${manualData.repoOwner}" placeholder="e.g. yourname" class="form-input text-xs" />
            </div>
            <div>
              <label class="block text-xs font-medium text-foreground mb-1">Repository Name</label>
              <input type="text" id="man-repo-name" value="${manualData.repoName}" placeholder="e.g. my-awesome-app" class="form-input text-xs" />
            </div>
          </div>
        </div>
      `;

    case 'manual-step-2':
      const popularTech = ['typescript', 'javascript', 'python', 'react', 'nextjs', 'vue', 'tailwind', 'nodejs', 'express', 'fastapi', 'postgres', 'docker', 'git'];
      return `
        <div class="space-y-3">
          <p class="text-xs text-muted-foreground">Click to select the primary technologies used in this project:</p>
          <div class="flex flex-wrap gap-2 max-h-56 overflow-y-auto p-1">
            ${popularTech.map(id => {
              const item = TECH_CATALOG.find(t => t.id === id);
              if (!item) return '';
              const selected = manualData.technologies.includes(id);
              return `
                <button type="button" class="man-tech-chip px-3 py-1.5 rounded-md border text-xs font-medium flex items-center gap-1.5 transition ${
                  selected 
                    ? 'border-foreground bg-foreground text-background shadow-xs font-semibold' 
                    : 'border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted'
                }" data-tech="${id}">
                  <span>${selected ? '✓' : '+'}</span>
                  <span>${item.name}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;

    case 'manual-step-3':
      return `
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-foreground mb-1">Package Manager / Toolchain</label>
            <select id="man-package-manager" class="form-input text-xs">
              <option value="npm" ${manualData.packageManager === 'npm' ? 'selected' : ''}>npm (Node.js)</option>
              <option value="pnpm" ${manualData.packageManager === 'pnpm' ? 'selected' : ''}>pnpm (Node.js)</option>
              <option value="yarn" ${manualData.packageManager === 'yarn' ? 'selected' : ''}>yarn (Node.js)</option>
              <option value="bun" ${manualData.packageManager === 'bun' ? 'selected' : ''}>bun (JavaScript/TypeScript)</option>
              <option value="pip" ${manualData.packageManager === 'pip' ? 'selected' : ''}>pip (Python)</option>
              <option value="cargo" ${manualData.packageManager === 'cargo' ? 'selected' : ''}>cargo (Rust)</option>
              <option value="go" ${manualData.packageManager === 'go' ? 'selected' : ''}>go (Go)</option>
            </select>
          </div>
          <p class="text-xs text-muted-foreground">Standard installation and running steps will be created automatically based on your choice.</p>
        </div>
      `;
  }
}

function getGuideFooterHtml() {
  switch (guideView) {
    case 'hub':
      return `
        <button id="guide-cancel-btn" class="btn-secondary text-xs px-3 py-1.5">
          Close
        </button>
        <div class="text-[10px] text-muted-foreground">
          Zero sign-up required • Free GitHub API
        </div>
      `;

    case 'scanning':
      return `
        <div class="text-xs text-muted-foreground">
          Please wait a moment...
        </div>
        <button id="guide-cancel-scan-btn" class="btn-secondary text-xs px-3 py-1.5">
          Cancel
        </button>
      `;

    case 'report':
      return `
        <button id="guide-back-to-hub-btn" class="btn-secondary text-xs px-3 py-1.5">
          ← Scan Another Repo
        </button>
        <button id="guide-apply-report-btn" class="btn-primary text-xs px-4 py-1.5 shadow-sm">
          ✨ Generate Full README
        </button>
      `;

    case 'manual-step-1':
      return `
        <button id="guide-back-to-hub-btn" class="btn-secondary text-xs px-3 py-1.5">
          ← Back
        </button>
        <button id="guide-manual-next-1-btn" class="btn-primary text-xs px-3.5 py-1.5">
          Next: Tech Stack →
        </button>
      `;

    case 'manual-step-2':
      return `
        <button id="guide-manual-prev-1-btn" class="btn-secondary text-xs px-3 py-1.5">
          ← Back
        </button>
        <button id="guide-manual-next-2-btn" class="btn-primary text-xs px-3.5 py-1.5">
          Next: Install & Run →
        </button>
      `;

    case 'manual-step-3':
      return `
        <button id="guide-manual-prev-2-btn" class="btn-secondary text-xs px-3 py-1.5">
          ← Back
        </button>
        <button id="guide-manual-finish-btn" class="btn-primary text-xs px-4 py-1.5 shadow-sm">
          ✨ Generate README
        </button>
      `;
  }
}

function attachGuideListeners(modal) {
  modal.querySelector('#guide-cancel-btn')?.addEventListener('click', closeWizard);
  modal.querySelector('#guide-cancel-scan-btn')?.addEventListener('click', () => {
    guideView = 'hub';
    renderGuideView();
  });

  // Hub Scan trigger
  const scanBtn = modal.querySelector('#guide-deep-scan-btn');
  const inputEl = modal.querySelector('#guide-repo-input');

  function triggerScan() {
    const val = inputEl?.value?.trim();
    if (!val) {
      showToast('Please enter a GitHub repository URL or owner/repo', 'error');
      return;
    }
    startDeepScan(val);
  }

  scanBtn?.addEventListener('click', triggerScan);
  inputEl?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      triggerScan();
    }
  });

  // Sample Chips
  modal.querySelectorAll('.sample-repo-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const repo = chip.dataset.repo;
      if (inputEl) inputEl.value = repo;
      startDeepScan(repo);
    });
  });

  // Start Manual Guide
  modal.querySelector('#guide-start-manual-btn')?.addEventListener('click', () => {
    guideView = 'manual-step-1';
    renderGuideView();
  });

  // Back to Hub
  modal.querySelector('#guide-back-to-hub-btn')?.addEventListener('click', () => {
    guideView = 'hub';
    renderGuideView();
  });

  // Apply Report
  modal.querySelector('#guide-apply-report-btn')?.addEventListener('click', () => {
    if (currentScanAnalysis) {
      store.applyRepoAnalysis(currentScanAnalysis);
      closeWizard();
      fireConfetti();
      showToast(`README created for ${currentScanAnalysis.repo}!`, 'success');
    }
  });

  // Manual Step 1 -> 2
  modal.querySelector('#guide-manual-next-1-btn')?.addEventListener('click', () => {
    const nameEl = modal.querySelector('#man-project-name');
    const tagEl = modal.querySelector('#man-tagline');
    const ownerEl = modal.querySelector('#man-repo-owner');
    const repoEl = modal.querySelector('#man-repo-name');

    manualData.projectName = nameEl?.value?.trim() || 'My Project';
    manualData.tagline = tagEl?.value?.trim() || 'An open-source application.';
    manualData.repoOwner = ownerEl?.value?.trim() || '';
    manualData.repoName = repoEl?.value?.trim() || (nameEl?.value ? nameEl.value.toLowerCase().replace(/\s+/g, '-') : 'project');

    guideView = 'manual-step-2';
    renderGuideView();
  });

  // Manual Step 2: Tech chips
  modal.querySelectorAll('.man-tech-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const techId = chip.dataset.tech;
      if (manualData.technologies.includes(techId)) {
        manualData.technologies = manualData.technologies.filter(t => t !== techId);
      } else {
        manualData.technologies.push(techId);
      }
      renderGuideView();
    });
  });

  modal.querySelector('#guide-manual-prev-1-btn')?.addEventListener('click', () => {
    guideView = 'manual-step-1';
    renderGuideView();
  });

  modal.querySelector('#guide-manual-next-2-btn')?.addEventListener('click', () => {
    guideView = 'manual-step-3';
    renderGuideView();
  });

  modal.querySelector('#guide-manual-prev-2-btn')?.addEventListener('click', () => {
    guideView = 'manual-step-2';
    renderGuideView();
  });

  // Manual Finish
  modal.querySelector('#guide-manual-finish-btn')?.addEventListener('click', () => {
    const pkgEl = modal.querySelector('#man-package-manager');
    manualData.packageManager = pkgEl?.value || 'npm';

    // Apply manual data to store
    store.batchUpdate(sections => {
      const hero = sections.find(s => s.type === SECTION_TYPES.HERO);
      if (hero) {
        hero.enabled = true;
        hero.data.projectName = manualData.projectName;
        hero.data.tagline = manualData.tagline;
        hero.data.repoOwner = manualData.repoOwner;
        hero.data.repoName = manualData.repoName;
      }

      const tech = sections.find(s => s.type === SECTION_TYPES.TECH_STACK);
      if (tech) {
        tech.enabled = true;
        tech.data.technologies = manualData.technologies;
      }

      const install = sections.find(s => s.type === SECTION_TYPES.INSTALLATION);
      if (install) {
        install.enabled = true;
        install.data.packageManager = manualData.packageManager;
        install.data.steps = [
          {
            title: 'Clone repository',
            cmd: manualData.repoOwner && manualData.repoName 
              ? `git clone https://github.com/${manualData.repoOwner}/${manualData.repoName}.git\ncd ${manualData.repoName}`
              : `git clone <your-repo-url>\ncd <project-folder>`
          },
          {
            title: 'Install dependencies',
            cmd: `${manualData.packageManager} install`
          },
          {
            title: 'Run application',
            cmd: `${manualData.packageManager} run dev`
          }
        ];
      }
    });

    closeWizard();
    fireConfetti();
    showToast('README generated successfully!', 'success');
  });
}

/**
 * Perform deep repository scanning with live progress updates
 */
async function startDeepScan(repoInput) {
  const parsed = parseGitHubRepoInput(repoInput);
  if (!parsed) {
    showToast('Please enter a valid repo (e.g. facebook/react or GitHub URL)', 'error');
    guideView = 'hub';
    renderGuideView();
    return;
  }

  currentRepoInput = `${parsed.owner}/${parsed.repo}`;
  guideView = 'scanning';
  currentScanProgress = { step: 1, message: `Connecting to GitHub API for ${parsed.owner}/${parsed.repo}...` };
  renderGuideView();

  try {
    const analysis = await fetchGitHubRepoFullDetails(parsed.owner, parsed.repo, progress => {
      currentScanProgress = progress;
      const statusEl = document.getElementById('guide-live-status-text');
      if (statusEl) statusEl.innerText = progress.message;
      renderGuideView();
    });

    currentScanAnalysis = analysis;
    guideView = 'report';
    renderGuideView();
  } catch (err) {
    showToast(err.message || 'Failed to scan repository', 'error');
    guideView = 'hub';
    renderGuideView();
  }
}


/* ==================== MODULE: app.js ==================== */
/**
 * Readmify - Main Application Controller (v2)
 * Coordinates store state, sidebar, editor forms, preview rendering, GitHub API, and export actions
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// DOM Elements
let sectionListContainer;
let sectionPillBar;
let sectionEditorContainer;
let previewBody;
let rawMarkdownTextarea;
let currentMarkdown = '';

function initApp() {
  sectionListContainer = document.getElementById('section-list-items');
  sectionPillBar = document.getElementById('section-pill-bar');
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

// --- 1. HORIZONTAL SECTION PILL BAR & DRAWER REORDERING ---
function renderSidebar(state) {
  const { sections, activeSectionId } = state;

  // 1A. Render Horizontal Pill Bar
  if (sectionPillBar) {
    sectionPillBar.innerHTML = sections.map((sec, idx) => {
      const isActive = sec.id === activeSectionId;
      const isHidden = !sec.enabled;
      return `
        <button 
          class="section-pill px-2.5 py-1 text-xs rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 border flex-shrink-0 cursor-pointer select-none ${
            isActive 
              ? 'bg-zinc-100 text-zinc-950 font-semibold border-zinc-100 shadow-sm' 
              : 'bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground border-border'
          } ${isHidden ? 'opacity-50 line-through' : ''}"
          data-section-id="${sec.id}"
          title="${escapeHtml(sec.title)} (${sec.enabled ? 'visible' : 'hidden'})"
        >
          <span class="text-[10px] opacity-70 font-mono">${idx + 1}</span>
          <span>${escapeHtml(sec.title)}</span>
          ${!sec.enabled ? '<span class="text-[9px] no-underline">👁️‍🗨️</span>' : ''}
        </button>
      `;
    }).join('');

    sectionPillBar.querySelectorAll('.section-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        store.setActiveSection(pill.dataset.sectionId);
      });
    });

    // Auto-scroll active pill into view
    const activePill = sectionPillBar.querySelector(`.section-pill[data-section-id="${activeSectionId}"]`);
    if (activePill) {
      activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }

  // 1B. Render Drawer List Items
  if (sectionListContainer) {
    sectionListContainer.innerHTML = sections.map((sec, idx) => {
      const isActive = sec.id === activeSectionId;
      return `
        <div 
          class="section-item group flex items-center justify-between px-2.5 py-1.5 rounded-md border cursor-pointer select-none transition-all ${
            isActive 
              ? 'active bg-muted border-border text-foreground font-medium shadow-xs' 
              : 'bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
          } ${!sec.enabled ? 'opacity-50' : ''}"
          data-section-id="${sec.id}"
          data-index="${idx}"
        >
          <div class="flex items-center gap-2 flex-1 min-w-0">
            <span class="text-zinc-500 text-[10px] font-mono w-3.5">${idx + 1}</span>
            <span class="text-xs truncate">${escapeHtml(sec.title)}</span>
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
  }

  // 1C. Pill Bar & Drawer Buttons (Bind once)
  const pillAddSecBtn = document.getElementById('pill-add-section-btn');
  if (pillAddSecBtn && !pillAddSecBtn.dataset.bound) {
    pillAddSecBtn.dataset.bound = 'true';
    pillAddSecBtn.addEventListener('click', () => openSectionLibrary());
  }

  const toggleDrawerBtn = document.getElementById('toggle-section-drawer-btn');
  const closeDrawerBtn = document.getElementById('close-section-drawer-btn');
  const drawerPanel = document.getElementById('section-drawer-panel');

  if (toggleDrawerBtn && drawerPanel && !toggleDrawerBtn.dataset.bound) {
    toggleDrawerBtn.dataset.bound = 'true';
    toggleDrawerBtn.addEventListener('click', () => {
      drawerPanel.classList.toggle('hidden');
    });
  }

  if (closeDrawerBtn && drawerPanel && !closeDrawerBtn.dataset.bound) {
    closeDrawerBtn.dataset.bound = 'true';
    closeDrawerBtn.addEventListener('click', () => {
      drawerPanel.classList.add('hidden');
    });
  }

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
  // GitHub Deep Scanner Bar
  const navGithubInput = document.getElementById('nav-github-input');
  const navGithubDetectBtn = document.getElementById('nav-github-detect-btn');

  function handleNavDeepScan() {
    const val = navGithubInput?.value?.trim() || '';
    if (!val) {
      openWizard('', false);
      return;
    }
    const parsed = parseGitHubRepoInput(val);
    if (!parsed) {
      showToast('Please enter a valid repo (e.g. facebook/react or GitHub URL)', 'error');
      return;
    }
    openWizard(val, true);
  }

  if (navGithubDetectBtn && navGithubInput) {
    navGithubDetectBtn.addEventListener('click', handleNavDeepScan);
    navGithubInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleNavDeepScan();
      }
    });
  }

  // Add Section Catalog Button in Navbar
  const navAddSecBtn = document.getElementById('nav-add-section-btn');
  if (navAddSecBtn) {
    navAddSecBtn.addEventListener('click', () => {
      openSectionLibrary();
    });
  }

  // Photo / Banner Hub Trigger
  const navPhotosBtn = document.getElementById('nav-photos-btn');
  if (navPhotosBtn) {
    navPhotosBtn.addEventListener('click', () => {
      renderPhotoModal('hero');
    });
  }

  // Easy Guide Launch Button
  const wizardBtn = document.getElementById('nav-wizard-btn');
  if (wizardBtn) {
    wizardBtn.addEventListener('click', () => openWizard(navGithubInput?.value?.trim() || '', false));
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

// --- 4. VIEW MODE SWITCHER (SPLIT / EDITOR / PREVIEW / RAW) ---
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
        leftPane.className = 'w-full lg:w-1/2 h-full flex flex-col border-r border-border bg-background overflow-hidden';
        rightPane.classList.remove('hidden');
        rightPane.className = 'w-full lg:w-1/2 h-full flex flex-col bg-background overflow-hidden';
        previewTab.classList.remove('hidden');
        rawTab.classList.add('hidden');
      } else if (mode === 'editor') {
        leftPane.classList.remove('hidden');
        leftPane.className = 'w-full flex-1 h-full flex flex-col bg-background overflow-hidden';
        rightPane.classList.add('hidden');
      } else if (mode === 'preview') {
        leftPane.classList.add('hidden');
        rightPane.classList.remove('hidden');
        rightPane.className = 'w-full flex-1 h-full overflow-hidden flex flex-col bg-background';
        previewTab.classList.remove('hidden');
        rawTab.classList.add('hidden');
      } else if (mode === 'raw') {
        leftPane.classList.add('hidden');
        rightPane.classList.remove('hidden');
        rightPane.className = 'w-full flex-1 h-full overflow-hidden flex flex-col bg-background';
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


// Robust DOM Ready execution
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

})();
