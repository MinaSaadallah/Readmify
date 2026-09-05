/**
 * The single source of truth: sections[] -> GitHub Flavored Markdown.
 * Every consumer (live preview, copy, download, raw view) calls generateMarkdown()
 * and nothing else — there is exactly one implementation of "what this looks like."
 *
 * GitHub-safe by construction: no inline style=, no <script>/<style>, sizing via
 * real width=/height= attributes, alignment via align= — nothing GitHub's own
 * README sanitizer would silently strip.
 */
import { SECTION_TYPES } from '../data/defaultSections.js';
import { techById, getBadgeUrl, getTechDocUrl } from '../data/techCatalog.js';
import { getLicenseById } from '../data/licenses.js';
import { npmBadgeUrls } from '../services/npmApi.js';

function githubSlug(heading) {
  return String(heading)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

function headingOf(section) {
  if (!section.enabled) return null;
  const skip = [SECTION_TYPES.HERO, SECTION_TYPES.BADGES, SECTION_TYPES.TOC];
  if (skip.includes(section.type)) return null;
  const heading = section.data?.heading;
  if (!heading) return null;
  return heading;
}

export function generateMarkdown(sections) {
  if (!sections || !Array.isArray(sections)) return '';

  const heroSection = sections.find(s => s.type === SECTION_TYPES.HERO && s.enabled);
  const context = {
    repoOwner: heroSection?.data?.repoOwner || 'yourusername',
    repoName: heroSection?.data?.repoName || 'your-repo',
    tocEntries: sections
      .map(s => headingOf(s))
      .filter(Boolean)
      .map(h => ({ heading: h, anchor: githubSlug(h) }))
  };

  const chunks = [];
  for (const section of sections) {
    if (!section.enabled) continue;
    const md = generateSectionMarkdown(section, context);
    if (md && md.trim()) chunks.push(md.trim());
  }
  return chunks.join('\n\n') + '\n';
}

function generateSectionMarkdown(section, ctx) {
  const { type, data } = section;
  const { repoOwner, repoName } = ctx;

  switch (type) {
    case SECTION_TYPES.HERO: {
      const align = data.align || 'center';
      const width = data.logoWidth || '100%';
      let logo = '';
      if (data.showLogo && data.logoUrl) {
        logo = `<img src="${data.logoUrl}" alt="${data.projectName || 'Project'} banner" width="${width}" />\n  <br/>`;
      }
      if (align === 'center') {
        return `<div align="center">\n  ${logo}\n  <h1>${data.projectName || 'Project Title'}</h1>\n  <p>${data.tagline || ''}</p>\n</div>`;
      }
      if (align === 'right') {
        return `<div align="right">\n  ${logo}\n  <h1>${data.projectName || 'Project Title'}</h1>\n  <p>${data.tagline || ''}</p>\n</div>`;
      }
      const logoMd = data.showLogo && data.logoUrl ? `![Banner](${data.logoUrl})\n\n` : '';
      return `${logoMd}# ${data.projectName || 'Project Title'}\n\n> ${data.tagline || ''}`;
    }

    case SECTION_TYPES.BADGES: {
      const style = data.style || 'for-the-badge';
      const align = data.align || 'center';
      const badges = [];

      // These get wrapped in a raw <p align="..."> block below, and GFM treats an HTML
      // block as opaque — markdown ![]()/[]() syntax inside it would render as literal
      // text, not an image — so badges here must be real <a>/<img> HTML, not markdown.
      const add = (label, imgUrl, linkUrl) => {
        const img = `<img src="${imgUrl}" alt="${label}" />`;
        badges.push(linkUrl ? `<a href="${linkUrl}">${img}</a>` : img);
      };

      if (data.showStars) add('GitHub Stars', `https://img.shields.io/github/stars/${repoOwner}/${repoName}?style=${style}`, `https://github.com/${repoOwner}/${repoName}/stargazers`);
      if (data.showForks) add('GitHub Forks', `https://img.shields.io/github/forks/${repoOwner}/${repoName}?style=${style}`, `https://github.com/${repoOwner}/${repoName}/network/members`);
      if (data.showIssues) add('GitHub Issues', `https://img.shields.io/github/issues/${repoOwner}/${repoName}?style=${style}`, `https://github.com/${repoOwner}/${repoName}/issues`);
      if (data.showLicense) add('License', `https://img.shields.io/github/license/${repoOwner}/${repoName}?style=${style}`, `https://github.com/${repoOwner}/${repoName}/blob/main/LICENSE`);
      if (data.showLastCommit) add('Last Commit', `https://img.shields.io/github/last-commit/${repoOwner}/${repoName}?style=${style}`);
      if (data.showRelease) add('Release', `https://img.shields.io/github/v/release/${repoOwner}/${repoName}?style=${style}`, `https://github.com/${repoOwner}/${repoName}/releases`);
      if (data.showContributors) add('Contributors', `https://img.shields.io/github/contributors/${repoOwner}/${repoName}?style=${style}`, `https://github.com/${repoOwner}/${repoName}/graphs/contributors`);
      if (data.showActionsCI) add('CI', `https://github.com/${repoOwner}/${repoName}/actions/workflows/ci.yml/badge.svg`, `https://github.com/${repoOwner}/${repoName}/actions`);

      if (data.npmPackageName && (data.showNpmVersion || data.showNpmDownloads)) {
        const npmUrls = npmBadgeUrls(data.npmPackageName, style);
        if (data.showNpmVersion) add('npm version', npmUrls.version, npmUrls.packageUrl);
        if (data.showNpmDownloads) add('npm downloads', npmUrls.downloads, npmUrls.packageUrl);
      }

      if (Array.isArray(data.customBadges)) {
        for (const cb of data.customBadges) {
          if (!cb.label || !cb.message) continue;
          const url = `https://img.shields.io/badge/${encodeURIComponent(cb.label)}-${encodeURIComponent(cb.message)}-${cb.color || 'blue'}?style=${style}`;
          add(cb.label, url, cb.link || '');
        }
      }

      if (badges.length === 0) return '';
      return `<p align="${align}">\n  ${badges.join('\n  ')}\n</p>`;
    }

    case SECTION_TYPES.ABOUT:
      return `## ${data.heading || 'About'}\n\n${data.content || ''}`;

    case SECTION_TYPES.TOC: {
      if (ctx.tocEntries.length === 0) return '';
      const items = ctx.tocEntries.map(e => `- [${e.heading}](#${e.anchor})`).join('\n');
      return `## ${data.heading || 'Table of Contents'}\n\n${items}`;
    }

    case SECTION_TYPES.TECH_STACK: {
      const style = data.style || 'for-the-badge';
      const align = data.align || 'center';
      const items = (data.technologies || []).map(id => techById(id)).filter(Boolean);
      if (items.length === 0) return `## ${data.heading || 'Built With'}\n\n*(No technologies selected yet)*`;

      if (data.layout === 'table') {
        const rows = items.map(item => `| **${item.name}** | [Docs](${getTechDocUrl(item)}) |`).join('\n');
        return `## ${data.heading || 'Built With'}\n\n| Technology | Docs |\n| :--- | :--- |\n${rows}`;
      }

      // Raw <a>/<img> HTML, not markdown ![]()/[]() syntax — this is wrapped in a raw
      // <p> block below, which GFM treats as opaque, so nested markdown wouldn't parse.
      const badges = items.map(item => `<a href="${getTechDocUrl(item)}"><img src="${getBadgeUrl(item, style)}" alt="${item.name}" /></a>`);
      return `## ${data.heading || 'Built With'}\n\n<p align="${align}">\n  ${badges.join('\n  ')}\n</p>`;
    }

    case SECTION_TYPES.FEATURES: {
      const items = data.items || [];
      if (items.length === 0) return '';
      const list = items.map(item => `- **${item.title || ''}**: ${item.desc || ''}`).join('\n');
      return `## ${data.heading || 'Key Features'}\n\n${list}`;
    }

    case SECTION_TYPES.DEMO: {
      const align = data.align || 'center';
      const width = data.width || '100%';
      let imageMd = '';
      if (data.imageUrl) {
        const rawImg = `<img src="${data.imageUrl}" alt="${data.caption || 'Preview'}" width="${width}" />`;
        imageMd = `<div align="${align}">\n  ${rawImg}\n</div>`;
      }
      const liveMd = data.liveUrl ? `\n\n**Live Demo**: [${data.liveUrl}](${data.liveUrl})` : '';
      return `## ${data.heading || 'Preview'}\n\n${imageMd}${liveMd}`;
    }

    case SECTION_TYPES.INSTALLATION: {
      const lines = [`## ${data.heading || 'Getting Started'}`];
      if (data.prerequisites) lines.push(`\n### Prerequisites\n\n${data.prerequisites}`);
      lines.push('\n### Installation\n');
      (data.steps || []).forEach((step, idx) => {
        lines.push(`${idx + 1}. **${step.title}**\n   \`\`\`bash\n   ${step.cmd}\n   \`\`\``);
      });
      return lines.join('\n');
    }

    case SECTION_TYPES.USAGE: {
      const lang = data.codeLang || 'bash';
      const code = data.code ? `\`\`\`${lang}\n${data.code}\n\`\`\`` : '';
      const note = data.note ? `\n\n> [!NOTE]\n> ${data.note}` : '';
      return `## ${data.heading || 'Usage'}\n\n${code}${note}`;
    }

    case SECTION_TYPES.ENV_VARS: {
      const vars = data.variables || [];
      if (vars.length === 0) return '';
      const rows = vars.map(v => `| \`${v.key}\` | ${v.desc || '-'} | \`${v.default || '-'}\` | ${v.required ? 'Yes' : 'No'} |`).join('\n');
      return `## ${data.heading || 'Environment Variables'}\n\n| Variable | Description | Default | Required |\n| :--- | :--- | :--- | :--- |\n${rows}`;
    }

    case SECTION_TYPES.API_REFERENCE: {
      const eps = data.endpoints || [];
      if (eps.length === 0) return '';
      const rows = eps.map(e => `| \`${e.method || 'GET'}\` | \`${e.path || '/'}\` | ${e.desc || '-'} |`).join('\n');
      return `## ${data.heading || 'API Reference'}\n\n| Method | Endpoint | Description |\n| :--- | :--- | :--- |\n${rows}`;
    }

    case SECTION_TYPES.MERMAID: {
      if (!data.diagram || !data.diagram.trim()) return '';
      return `## ${data.heading || 'Diagram'}\n\n\`\`\`mermaid\n${data.diagram.trim()}\n\`\`\``;
    }

    case SECTION_TYPES.FAQ: {
      const qs = data.questions || [];
      if (qs.length === 0) return '';
      const details = qs.map(q => `<details>\n<summary><strong>${q.q || 'Question'}</strong></summary>\n<br/>\n\n${q.a || ''}\n\n</details>`).join('\n\n');
      return `## ${data.heading || 'FAQ'}\n\n${details}`;
    }

    case SECTION_TYPES.ROADMAP: {
      const tasks = data.tasks || [];
      if (tasks.length === 0) return '';
      const list = tasks.map(t => `- [${t.completed ? 'x' : ' '}] ${t.text}`).join('\n');
      return `## ${data.heading || 'Roadmap'}\n\n${list}`;
    }

    case SECTION_TYPES.CONTRIBUTING:
      return `## ${data.heading || 'Contributing'}\n\n${data.guidelines || 'Contributions are welcome! Please open an issue or pull request.'}`;

    case SECTION_TYPES.LICENSE: {
      const lic = getLicenseById(data.type || 'MIT');
      const year = data.year || String(new Date().getFullYear());
      const holder = data.holder || 'Your Name';
      const badge = `<p align="center">\n  <a href="${lic.url}"><img src="${lic.badgeUrl}" alt="License: ${lic.id}" /></a>\n</p>`;
      return `## ${data.heading || 'License'}\n\n${badge}\n\nDistributed under the **${lic.name}**. See [\`LICENSE\`](LICENSE) for the full text.\n\nCopyright (c) ${year} ${holder}`;
    }

    case SECTION_TYPES.AUTHOR: {
      const badges = [];
      if (data.github) badges.push(`[![GitHub](https://img.shields.io/badge/GitHub-${encodeURIComponent(data.github)}-181717?style=flat&logo=github)](https://github.com/${data.github})`);
      if (data.twitter) badges.push(`[![Twitter](https://img.shields.io/badge/Twitter-${encodeURIComponent(data.twitter)}-1DA1F2?style=flat&logo=x)](https://twitter.com/${data.twitter})`);
      if (data.linkedin) badges.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-${encodeURIComponent(data.linkedin)}-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/${data.linkedin})`);
      const emailMd = data.email ? `\n\nEmail: [${data.email}](mailto:${data.email})` : '';
      const badgeMd = badges.length ? `\n\n${badges.join(' ')}` : '';
      return `## ${data.heading || 'Author'}\n\n**${data.name || 'Author'}**${emailMd}${badgeMd}`;
    }

    case SECTION_TYPES.STATS: {
      // Don't silently fall back to the Hero section's placeholder repo owner
      // ("username"/"yourusername") — that isn't a real GitHub account, so the
      // stats images would just fail to load. Require an explicit username.
      const placeholders = new Set(['', 'username', 'yourusername']);
      const candidate = (data.githubUser || repoOwner || '').trim();
      const user = placeholders.has(candidate.toLowerCase()) ? '' : candidate;
      if (!user) return `## ${data.heading || 'Stats'}\n\n*(Set a GitHub username in this section's settings to enable stats)*`;
      const theme = data.theme === 'light' ? 'default' : 'dark';
      // Raw <a>/<img> HTML — wrapped in a raw <p> block below, which GFM treats as
      // opaque, so nested markdown ![]()/[]() syntax wouldn't parse there.
      const imgs = [];
      if (data.showTopLangs) imgs.push(`<a href="https://github.com/${encodeURIComponent(user)}"><img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${encodeURIComponent(user)}&layout=compact&theme=${theme === 'dark' ? 'github_dark' : 'default'}" alt="Top Languages" /></a>`);
      if (data.showStreak) imgs.push(`<a href="https://github.com/${encodeURIComponent(user)}"><img src="https://streak-stats.demolab.com?user=${encodeURIComponent(user)}&theme=${theme}" alt="Streak" /></a>`);
      if (data.showStarHistory) imgs.push(`<a href="https://star-history.com/#${repoOwner}/${repoName}&Date"><img src="https://api.star-history.com/svg?repos=${repoOwner}/${repoName}&type=Date" alt="Star History" /></a>`);
      if (imgs.length === 0) return '';
      return `## ${data.heading || 'Stats'}\n\n<p align="center">\n  ${imgs.join('\n  <br/>\n  ')}\n</p>`;
    }

    case SECTION_TYPES.CUSTOM:
      return data.markdown ? `${data.heading ? `## ${data.heading}\n\n` : ''}${data.markdown}` : '';

    default:
      return '';
  }
}
