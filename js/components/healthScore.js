/**
 * README quality score + a regression guard: flags anything in the generated
 * markdown that GitHub's sanitizer would silently strip (inline style=,
 * <script>, <style>) so a future change can't quietly reintroduce a
 * fidelity bug.
 */
import { SECTION_TYPES } from '../data/defaultSections.js';

export function findGitHubUnsafeMarkup(markdownText) {
  if (!markdownText) return [];
  const issues = [];
  if (/\sstyle\s*=/i.test(markdownText)) issues.push('Contains inline style= attributes, which GitHub strips from README HTML.');
  if (/<script[\s>]/i.test(markdownText)) issues.push('Contains <script> tags, which GitHub never renders.');
  if (/<style[\s>]/i.test(markdownText)) issues.push('Contains <style> tags, which GitHub never renders.');
  return issues;
}

function countWords(text) {
  if (!text) return 0;
  const t = String(text).replace(/[#*`>\-[\]()!]/g, ' ').trim();
  return t ? t.split(/\s+/).length : 0;
}

export function calculateReadmeScore(sections, markdownText) {
  if (!sections || !Array.isArray(sections)) {
    return { score: 0, label: 'Empty', color: '#EF4444', tips: [] };
  }

  let score = 0;
  const tips = [];
  const enabled = new Set(sections.filter(s => s.enabled).map(s => s.type));

  const hero = sections.find(s => s.type === SECTION_TYPES.HERO && s.enabled);
  if (hero?.data?.projectName && hero.data.projectName !== 'Project Title' && hero.data.projectName !== 'My Project') {
    score += 15;
  } else {
    tips.push('Give your project a real name in the Header section.');
  }

  if (enabled.has(SECTION_TYPES.BADGES)) score += 10; else tips.push('Add a Badges section for quick social proof.');

  const about = sections.find(s => s.type === SECTION_TYPES.ABOUT && s.enabled);
  const aboutWords = countWords(about?.data?.content);
  if (aboutWords > 15) score += 15; else tips.push('Write a short About section explaining what your project does.');

  const tech = sections.find(s => s.type === SECTION_TYPES.TECH_STACK && s.enabled);
  if (tech?.data?.technologies?.length > 0) score += 10; else tips.push('List your tech stack.');

  const features = sections.find(s => s.type === SECTION_TYPES.FEATURES && s.enabled);
  if (features?.data?.items?.length >= 2) score += 10; else tips.push('List at least 2 key features.');

  const install = sections.find(s => s.type === SECTION_TYPES.INSTALLATION && s.enabled);
  if (install?.data?.steps?.length > 0) score += 15; else tips.push('Add step-by-step installation instructions.');

  if (enabled.has(SECTION_TYPES.LICENSE)) score += 10; else tips.push('Add a License section.');
  if (enabled.has(SECTION_TYPES.AUTHOR) || enabled.has(SECTION_TYPES.CONTRIBUTING)) score += 10; else tips.push('Add an Author or Contributing section.');

  const demo = sections.find(s => s.type === SECTION_TYPES.DEMO && s.enabled);
  if (demo?.data?.imageUrl || demo?.data?.liveUrl) score += 5;

  if (/(TODO|FIXME|XXX)/i.test(JSON.stringify(sections))) tips.push('Remove TODO/FIXME placeholders before publishing.');

  for (const issue of findGitHubUnsafeMarkup(markdownText)) tips.push(issue);

  let label = 'Needs Work', color = '#EF4444';
  if (score >= 90) { label = 'Outstanding'; color = '#10B981'; }
  else if (score >= 70) { label = 'Great'; color = '#06B6D4'; }
  else if (score >= 45) { label = 'Good'; color = '#F59E0B'; }

  return { score: Math.min(score, 100), label, color, tips };
}
