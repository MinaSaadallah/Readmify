/**
 * Readmify - Markdown Generator Engine
 * Converts the structured sections state into clean GitHub Flavored Markdown
 * Supports SkillIcons, Shields.io, GitHub Stats, Contributors, and Star History
 */
import { SECTION_TYPES } from '../data/defaultSections.js';
import { TECH_CATALOG, getBadgeUrl, getSkillIconsUrl } from '../data/techCatalog.js';

export function generateMarkdown(sections) {
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
