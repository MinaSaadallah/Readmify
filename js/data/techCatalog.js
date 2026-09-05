/**
 * Readmify - Tech Stack Badge Catalog
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
  { id: 'typescript', name: 'TypeScript', category: 'languages', color: '3178C6', logo: 'typescript', logoColor: 'white' },
  { id: 'javascript', name: 'JavaScript', category: 'languages', color: 'F7DF1E', logo: 'javascript', logoColor: 'black' },
  { id: 'python', name: 'Python', category: 'languages', color: '3776AB', logo: 'python', logoColor: 'white' },
  { id: 'rust', name: 'Rust', category: 'languages', color: '000000', logo: 'rust', logoColor: 'white' },
  { id: 'go', name: 'Go', category: 'languages', color: '00ADD8', logo: 'go', logoColor: 'white' },
  { id: 'java', name: 'Java', category: 'languages', color: 'ED8B00', logo: 'openjdk', logoColor: 'white' },
  { id: 'csharp', name: 'C#', category: 'languages', color: '239120', logo: 'csharp', logoColor: 'white' },
  { id: 'cpp', name: 'C++', category: 'languages', color: '00599C', logo: 'cplusplus', logoColor: 'white' },
  { id: 'c', name: 'C', category: 'languages', color: 'A8B9CC', logo: 'c', logoColor: 'black' },
  { id: 'php', name: 'PHP', category: 'languages', color: '777BB4', logo: 'php', logoColor: 'white' },
  { id: 'swift', name: 'Swift', category: 'languages', color: 'F05138', logo: 'swift', logoColor: 'white' },
  { id: 'kotlin', name: 'Kotlin', category: 'languages', color: '7F52FF', logo: 'kotlin', logoColor: 'white' },
  { id: 'dart', name: 'Dart', category: 'languages', color: '0175C2', logo: 'dart', logoColor: 'white' },
  { id: 'ruby', name: 'Ruby', category: 'languages', color: 'CC342D', logo: 'ruby', logoColor: 'white' },
  { id: 'html5', name: 'HTML5', category: 'languages', color: 'E34F26', logo: 'html5', logoColor: 'white' },
  { id: 'css3', name: 'CSS3', category: 'languages', color: '1572B6', logo: 'css3', logoColor: 'white' },
  { id: 'r', name: 'R', category: 'languages', color: '276DC3', logo: 'r', logoColor: 'white' },
  { id: 'scala', name: 'Scala', category: 'languages', color: 'DC322F', logo: 'scala', logoColor: 'white' },
  { id: 'elixir', name: 'Elixir', category: 'languages', color: '4B275F', logo: 'elixir', logoColor: 'white' },
  { id: 'lua', name: 'Lua', category: 'languages', color: '2C2D72', logo: 'lua', logoColor: 'white' },
  { id: 'shell', name: 'Bash / Shell', category: 'languages', color: '4EAA25', logo: 'gnubash', logoColor: 'white' },
  { id: 'solidity', name: 'Solidity', category: 'languages', color: '363636', logo: 'solidity', logoColor: 'white' },

  // --- FRONTEND & MOBILE ---
  { id: 'react', name: 'React', category: 'frontend', color: '20232A', logo: 'react', logoColor: '61DAFB' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', color: '000000', logo: 'nextdotjs', logoColor: 'white' },
  { id: 'vue', name: 'Vue.js', category: 'frontend', color: '4FC08D', logo: 'vuedotjs', logoColor: 'white' },
  { id: 'nuxtjs', name: 'Nuxt.js', category: 'frontend', color: '00DC82', logo: 'nuxtdotjs', logoColor: 'white' },
  { id: 'svelte', name: 'Svelte', category: 'frontend', color: 'FF3E00', logo: 'svelte', logoColor: 'white' },
  { id: 'angular', name: 'Angular', category: 'frontend', color: 'DD0031', logo: 'angular', logoColor: 'white' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', color: '38B2AC', logo: 'tailwind-css', logoColor: 'white' },
  { id: 'vite', name: 'Vite', category: 'frontend', color: '646CFF', logo: 'vite', logoColor: 'FFD62E' },
  { id: 'astro', name: 'Astro', category: 'frontend', color: 'BC52EE', logo: 'astro', logoColor: 'white' },
  { id: 'redux', name: 'Redux', category: 'frontend', color: '593D88', logo: 'redux', logoColor: 'white' },
  { id: 'flutter', name: 'Flutter', category: 'frontend', color: '02569B', logo: 'flutter', logoColor: 'white' },
  { id: 'reactnative', name: 'React Native', category: 'frontend', color: '20232A', logo: 'react', logoColor: '61DAFB' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'frontend', color: '563D7C', logo: 'bootstrap', logoColor: 'white' },
  { id: 'sass', name: 'Sass', category: 'frontend', color: 'CC6699', logo: 'sass', logoColor: 'white' },
  { id: 'shadcn', name: 'shadcn/ui', category: 'frontend', color: '000000', logo: 'shadcnui', logoColor: 'white' },
  { id: 'chakra', name: 'Chakra UI', category: 'frontend', color: '319795', logo: 'chakraui', logoColor: 'white' },
  { id: 'electron', name: 'Electron', category: 'frontend', color: '47848F', logo: 'electron', logoColor: 'white' },
  { id: 'tauri', name: 'Tauri', category: 'frontend', color: 'FFC131', logo: 'tauri', logoColor: 'black' },
  { id: 'threejs', name: 'Three.js', category: 'frontend', color: '000000', logo: 'threedotjs', logoColor: 'white' },

  // --- BACKEND & APIS ---
  { id: 'nodejs', name: 'Node.js', category: 'backend', color: '43853D', logo: 'nodedotjs', logoColor: 'white' },
  { id: 'express', name: 'Express.js', category: 'backend', color: '404D59', logo: 'express', logoColor: 'white' },
  { id: 'fastify', name: 'Fastify', category: 'backend', color: '000000', logo: 'fastify', logoColor: 'white' },
  { id: 'nestjs', name: 'NestJS', category: 'backend', color: 'E0234E', logo: 'nestjs', logoColor: 'white' },
  { id: 'django', name: 'Django', category: 'backend', color: '092E20', logo: 'django', logoColor: 'white' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', color: '009688', logo: 'fastapi', logoColor: 'white' },
  { id: 'flask', name: 'Flask', category: 'backend', color: '000000', logo: 'flask', logoColor: 'white' },
  { id: 'springboot', name: 'Spring Boot', category: 'backend', color: '6DB33F', logo: 'springboot', logoColor: 'white' },
  { id: 'rails', name: 'Ruby on Rails', category: 'backend', color: 'CC0000', logo: 'rubyonrails', logoColor: 'white' },
  { id: 'laravel', name: 'Laravel', category: 'backend', color: 'FF2D20', logo: 'laravel', logoColor: 'white' },
  { id: 'dotnet', name: '.NET', category: 'backend', color: '512BD4', logo: 'dotnet', logoColor: 'white' },
  { id: 'graphql', name: 'GraphQL', category: 'backend', color: 'E10098', logo: 'graphql', logoColor: 'white' },
  { id: 'trpc', name: 'tRPC', category: 'backend', color: '2596BE', logo: 'trpc', logoColor: 'white' },
  { id: 'apollo', name: 'Apollo GraphQL', category: 'backend', color: '311C87', logo: 'apollographql', logoColor: 'white' },
  { id: 'grpc', name: 'gRPC', category: 'backend', color: '244C5A', logo: 'grpc', logoColor: 'white' },
  { id: 'socketio', name: 'Socket.io', category: 'backend', color: '010101', logo: 'socketdotio', logoColor: 'white' },

  // --- DATABASES & STORAGE ---
  { id: 'postgres', name: 'PostgreSQL', category: 'database', color: '316192', logo: 'postgresql', logoColor: 'white' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', color: '4EA94B', logo: 'mongodb', logoColor: 'white' },
  { id: 'redis', name: 'Redis', category: 'database', color: 'DC382D', logo: 'redis', logoColor: 'white' },
  { id: 'mysql', name: 'MySQL', category: 'database', color: '005C84', logo: 'mysql', logoColor: 'white' },
  { id: 'sqlite', name: 'SQLite', category: 'database', color: '07405E', logo: 'sqlite', logoColor: 'white' },
  { id: 'supabase', name: 'Supabase', category: 'database', color: '3ECF8E', logo: 'supabase', logoColor: 'black' },
  { id: 'firebase', name: 'Firebase', category: 'database', color: 'FFCA28', logo: 'firebase', logoColor: 'black' },
  { id: 'prisma', name: 'Prisma', category: 'database', color: '2D3748', logo: 'prisma', logoColor: 'white' },
  { id: 'drizzle', name: 'Drizzle ORM', category: 'database', color: 'C5F74F', logo: 'drizzle', logoColor: 'black' },
  { id: 'cassandra', name: 'Cassandra', category: 'database', color: '1287B1', logo: 'apachecassandra', logoColor: 'white' },
  { id: 'elasticsearch', name: 'Elasticsearch', category: 'database', color: '005571', logo: 'elasticsearch', logoColor: 'white' },
  { id: 'neo4j', name: 'Neo4j', category: 'database', color: '008CC1', logo: 'neo4j', logoColor: 'white' },
  { id: 'dynamodb', name: 'DynamoDB', category: 'database', color: '4053D6', logo: 'amazondynamodb', logoColor: 'white' },

  // --- CLOUD & DEVOPS ---
  { id: 'docker', name: 'Docker', category: 'devops', color: '2496ED', logo: 'docker', logoColor: 'white' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops', color: '326CE5', logo: 'kubernetes', logoColor: 'white' },
  { id: 'aws', name: 'AWS', category: 'devops', color: '232F3E', logo: 'amazonaws', logoColor: 'FF9900' },
  { id: 'gcp', name: 'Google Cloud', category: 'devops', color: '4285F4', logo: 'googlecloud', logoColor: 'white' },
  { id: 'azure', name: 'Azure', category: 'devops', color: '0078D4', logo: 'microsoftazure', logoColor: 'white' },
  { id: 'vercel', name: 'Vercel', category: 'devops', color: '000000', logo: 'vercel', logoColor: 'white' },
  { id: 'netlify', name: 'Netlify', category: 'devops', color: '00C7B7', logo: 'netlify', logoColor: 'white' },
  { id: 'cloudflare', name: 'Cloudflare', category: 'devops', color: 'F38020', logo: 'cloudflare', logoColor: 'white' },
  { id: 'githubactions', name: 'GitHub Actions', category: 'devops', color: '2088FF', logo: 'githubactions', logoColor: 'white' },
  { id: 'terraform', name: 'Terraform', category: 'devops', color: '7B42BC', logo: 'terraform', logoColor: 'white' },
  { id: 'nginx', name: 'Nginx', category: 'devops', color: '009639', logo: 'nginx', logoColor: 'white' },
  { id: 'linux', name: 'Linux', category: 'devops', color: 'FCC624', logo: 'linux', logoColor: 'black' },
  { id: 'gitlab', name: 'GitLab CI', category: 'devops', color: 'FC6D26', logo: 'gitlab', logoColor: 'white' },

  // --- TOOLS, AI & TESTING ---
  { id: 'git', name: 'Git', category: 'tools', color: 'F05032', logo: 'git', logoColor: 'white' },
  { id: 'github', name: 'GitHub', category: 'tools', color: '181717', logo: 'github', logoColor: 'white' },
  { id: 'openai', name: 'OpenAI', category: 'tools', color: '412991', logo: 'openai', logoColor: 'white' },
  { id: 'huggingface', name: 'Hugging Face', category: 'tools', color: 'FFD21E', logo: 'huggingface', logoColor: 'black' },
  { id: 'pytorch', name: 'PyTorch', category: 'tools', color: 'EE4C2C', logo: 'pytorch', logoColor: 'white' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'tools', color: 'FF6F00', logo: 'tensorflow', logoColor: 'white' },
  { id: 'jest', name: 'Jest', category: 'tools', color: 'C21325', logo: 'jest', logoColor: 'white' },
  { id: 'vitest', name: 'Vitest', category: 'tools', color: '6E9F18', logo: 'vitest', logoColor: 'white' },
  { id: 'cypress', name: 'Cypress', category: 'tools', color: '17202C', logo: 'cypress', logoColor: 'white' },
  { id: 'playwright', name: 'Playwright', category: 'tools', color: '2EAD33', logo: 'playwright', logoColor: 'white' },
  { id: 'postman', name: 'Postman', category: 'tools', color: 'FF6C37', logo: 'postman', logoColor: 'white' },
  { id: 'figma', name: 'Figma', category: 'tools', color: 'F24E1E', logo: 'figma', logoColor: 'white' },
  { id: 'eslint', name: 'ESLint', category: 'tools', color: '4B32C3', logo: 'eslint', logoColor: 'white' },
  { id: 'prettier', name: 'Prettier', category: 'tools', color: 'F7B93E', logo: 'prettier', logoColor: 'black' },
  { id: 'npm', name: 'NPM', category: 'tools', color: 'CB3837', logo: 'npm', logoColor: 'white' },
  { id: 'pnpm', name: 'PNPM', category: 'tools', color: 'F69220', logo: 'pnpm', logoColor: 'white' },
  { id: 'yarn', name: 'Yarn', category: 'tools', color: '2C8EBB', logo: 'yarn', logoColor: 'white' },
  { id: 'bun', name: 'Bun', category: 'tools', color: 'FBF0DF', logo: 'bun', logoColor: 'black' }
];

/**
 * Builds a shields.io badge URL for a given tech item
 */
export function getBadgeUrl(item, style = 'for-the-badge') {
  const encodedName = encodeURIComponent(item.name.replace(/-/g, '--'));
  return `https://img.shields.io/badge/${encodedName}-${item.color}?style=${style}&logo=${item.logo}&logoColor=${item.logoColor}`;
}
