/**
 * Readmify - Markdown Generator Engine
 * Converts the structured sections state into clean GitHub Flavored Markdown
 * Supports SkillIcons, Shields.io, GitHub Stats, Contributors, and Star History
 */
import { SECTION_TYPES } from '../data/defaultSections.js';
import { TECH_CATALOG, TECH_CATEGORIES, getBadgeUrl, getSkillIconsUrl, getTechDocUrl } from '../data/techCatalog.js';
import { getLicenseById } from '../data/licenses.js';

const techByIdCache = new Map();
function techById(id) {
  if (techByIdCache.has(id)) return techByIdCache.get(id);
  const found = TECH_CATALOG.find(t => t.id === id) || null;
  if (techByIdCache.size > 500) techByIdCache.clear();
  techByIdCache.set(id, found);
  return found;
}

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
      // Optional capsule-render banner (opt-in, online-only progressive enhancement)
      let capsuleTag = '';
      if (data.showCapsuleBanner) {
        const cType = data.capsuleType || 'wave';
        const cColor = data.capsuleColor || 'auto';
        const cText = encodeURIComponent(data.projectName || 'Project');
        const cDesc = encodeURIComponent(data.tagline || '');
        capsuleTag = `<img src="https://capsule-render.vercel.app/api?type=${cType}&color=${cColor}&height=220&section=header&text=${cText}&fontSize=60&desc=${cDesc}&descSize=16" alt="${data.projectName || 'Project'} banner" width="100%" />\n  <br/>`;
      }
      // Optional typing-SVG animated tagline (opt-in)
      let taglineTag = `<p>${data.tagline || ''}</p>`;
      if (data.animateTagline && data.tagline) {
        const lines = String(data.tagline).split(/[.;|\n]+/).map(s => s.trim()).filter(Boolean).slice(0, 3);
        if (lines.length > 0) {
          const q = encodeURIComponent(lines.join(';'));
          taglineTag = `<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&pause=1000&color=58A6FF&center=true&vCenter=true&width=600&lines=${q}" alt="${data.tagline}" /></a>`;
        }
      }

      if (isCentered) {
        return `<div align="center">
  ${capsuleTag}${logoTag}
  <h1>${data.projectName || 'Project Title'}</h1>
  ${taglineTag}
</div>`;
      } else if (align === 'right') {
        return `<div align="right">
  ${capsuleTag}${logoTag}
  <h1>${data.projectName || 'Project Title'}</h1>
  ${taglineTag}
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
      const items = techIds.map(id => techById(id)).filter(Boolean);

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
        const icon = item.icon ? `${item.icon} ` : '';
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
      const liveLinkMd = data.liveUrl && !linkUrl ? `\n\n**Live Demo**: [${data.liveUrl}](${data.liveUrl})` : '';
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
      const rows = vars.map(v => `| \`${v.key}\` | ${v.desc || '-'} | \`${v.default || '-'}\` | ${v.required ? 'Yes' : 'No'} |`).join('\n');
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
        const perms = lic.permissions.map(p => `[x] ${p}`).join('<br/>') || '-';
        const limits = lic.limitations.map(l => `[ ] ${l}`).join('<br/>') || '-';
        const conds = lic.conditions.map(c => `[!] ${c}`).join('<br/>') || '-';

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

    case SECTION_TYPES.STATS: {
      const user = (data.githubUser || repoOwner || '').trim();
      const repo = `${repoOwner}/${repoName}`;
      const theme = data.theme === 'light' ? 'default' : 'github_dark';
      const imgs = [];
      if (data.showActivityGraph && user) {
        imgs.push(`[![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=${encodeURIComponent(user)}&theme=github-compact)](https://github.com/${encodeURIComponent(user)})`);
      }
      if (data.showContributors) {
        imgs.push(`<a href="https://github.com/${repo}/graphs/contributors"><img src="https://contrib.rocks/image?repo=${repo}" alt="Contributors" /></a>`);
      }
      if (data.showStarHistory) {
        imgs.push(`[![Star History](https://api.star-history.com/svg?repos=${repo}&type=Date)](https://star-history.com/#${repo}&Date)`);
      }
      if (data.showTopLangs && user) {
        imgs.push(`[![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=${encodeURIComponent(user)}&layout=compact&theme=${theme})](https://github.com/${encodeURIComponent(user)})`);
      }
      if (data.showStreak && user) {
        imgs.push(`[![Streak](https://streak-stats.demolab.com?user=${encodeURIComponent(user)}&theme=${theme === 'default' ? 'default' : 'dark'})](https://github.com/${encodeURIComponent(user)})`);
      }
      if (data.showVisitors && user) {
        imgs.push(`![Visitors](https://komarev.com/ghpvc/?username=${encodeURIComponent(user)}&style=flat-square)`);
      }
      if (imgs.length === 0) return `## ${data.heading || 'Stats & Activity'}\n\n*(Enable visuals in section settings — all optional, online-only)*`;
      return `## ${data.heading || 'Stats & Activity'}\n\n<p align="center">\n  ${imgs.join('\n  <br/>\n  ')}\n</p>`;
    }

    case SECTION_TYPES.CUSTOM: {
      return `## ${data.heading || 'Custom Section'}\n\n${data.markdown || ''}`;
    }

    default:
      return '';
  }
}
