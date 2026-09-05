/**
 * Readmify - README Health & Quality Analyzer v2
 * Weighted 0-100 + readability + SEO + missing-section one-click actions.
 * Tips can be strings (legacy) or { text, action, actionLabel }.
 */
import { SECTION_TYPES } from '../data/defaultSections.js';

function countWords(text) {
  if (!text) return 0;
  const t = String(text).replace(/[#*`>\-\[\]()!]/g, ' ').trim();
  return t ? t.split(/\s+/).length : 0;
}

function fleschScore(text) {
  if (!text || text.trim().length < 20) return null;
  const words = text.trim().split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length || 1;
  const syllables = words.reduce((a, w) => {
    const m = w.toLowerCase().replace(/[^a-z]/g, '').match(/[aeiouy]+/g);
    return a + (m ? m.length : 1);
  }, 0);
  const wps = words.length / sentences;
  const spw = syllables / Math.max(1, words.length);
  return Math.max(0, Math.min(100, Math.round(206.835 - 1.015 * wps - 84.6 * spw)));
}

export function calculateReadmeScore(sections) {
  if (!sections || !Array.isArray(sections)) {
    return { score: 0, label: 'Empty', color: '#EF4444', tips: ['Start by configuring your project basics'], readability: null };
  }

  let score = 0;
  const tips = [];
  const enabledTypes = new Set(sections.filter(s => s.enabled).map(s => s.type));

  // 1. Title & Tagline (15)
  const hero = sections.find(s => s.type === SECTION_TYPES.HERO && s.enabled);
  if (hero && hero.data?.projectName && hero.data?.projectName !== 'Project Title' && hero.data.projectName.trim().length > 1) {
    score += 12;
    const tag = (hero.data.tagline || '').trim();
    if (tag.length >= 20 && tag.length <= 140) score += 3;
    else if (tag.length < 10) tips.push('Add a concise tagline (20–120 chars) describing what your project does');
    else tips.push({ text: 'Keep tagline 20–120 chars for GitHub + SEO.', action: { type: 'view', mode: 'canvas' }, actionLabel: 'Edit hero' });
  } else {
    tips.push({ text: 'Add a clear project name in Header & Title', action: { type: 'enable', sectionType: SECTION_TYPES.HERO }, actionLabel: 'Enable hero' });
  }

  // 2. Badges (8)
  if (enabledTypes.has(SECTION_TYPES.BADGES)) score += 8;
  else tips.push({ text: 'Enable badges (Stars, License, Build) for social proof', action: { type: 'enable', sectionType: SECTION_TYPES.BADGES }, actionLabel: 'Enable badges' });

  // 3. About + readability (15)
  const about = sections.find(s => s.type === SECTION_TYPES.ABOUT && s.enabled);
  const aboutWords = countWords(about?.data?.content || '');
  if (about && aboutWords > 20) {
    score += 10;
    if (aboutWords >= 40) score += 5;
    else tips.push('Expand About to 40+ words: problem → solution → who it helps');
  } else {
    tips.push({ text: 'Add an About section explaining the problem your project solves', action: { type: 'enable', sectionType: SECTION_TYPES.ABOUT }, actionLabel: 'Enable about' });
  }

  // 4. Tech Stack (10)
  const tech = sections.find(s => s.type === SECTION_TYPES.TECH_STACK && s.enabled);
  if (tech && tech.data?.technologies?.length > 0) {
    score += 10;
    if (!tech.data.technologies.length || tech.data.technologies.length < 3) tips.push('Pick 3+ technologies so auto-scan + badges look credible');
  } else {
    tips.push({ text: 'Select technologies in "Built With" to showcase your tech stack', action: { type: 'enable', sectionType: SECTION_TYPES.TECH_STACK }, actionLabel: 'Pick tech' });
  }

  // 5. Features (10)
  const features = sections.find(s => s.type === SECTION_TYPES.FEATURES && s.enabled);
  if (features && features.data?.items?.length >= 2) score += 10;
  else tips.push({ text: 'Highlight 2+ key features to attract users', action: { type: 'enable', sectionType: SECTION_TYPES.FEATURES }, actionLabel: 'Add features' });

  // 6. Installation (12)
  const install = sections.find(s => s.type === SECTION_TYPES.INSTALLATION && s.enabled);
  if (install && install.data?.steps?.length > 0) {
    score += 12;
    const hasCode = (install.data.steps || []).some(st => (st.cmd || '').includes('\n') || (st.cmd || '').length > 8);
    if (!hasCode) tips.push('Make install steps copy-pasteable (clone → install → run)');
  } else {
    tips.push({ text: 'Provide step-by-step Installation instructions', action: { type: 'enable', sectionType: SECTION_TYPES.INSTALLATION }, actionLabel: 'Add install' });
  }

  // 7. Demo / preview bonus (5)
  const demo = sections.find(s => s.type === SECTION_TYPES.DEMO && s.enabled);
  if (demo && (demo.data?.imageUrl || demo.data?.liveUrl)) score += 5;
  else if (hero?.data?.repoOwner && hero.data.repoOwner !== 'username') tips.push('Add a demo screenshot or live link — repos with visuals get more stars');

  // 8. License (7)
  if (enabledTypes.has(SECTION_TYPES.LICENSE)) {
    score += 7;
    const lic = sections.find(s => s.type === SECTION_TYPES.LICENSE && s.enabled);
    if (lic && (!lic.data?.holder || lic.data.holder === 'Your Name')) tips.push('Set License holder to your name/org (not "Your Name")');
  } else {
    tips.push({ text: 'Add a License section to define open-source permissions', action: { type: 'enable', sectionType: SECTION_TYPES.LICENSE }, actionLabel: 'Add license' });
  }

  // 9. Author/Contributing (6)
  if (enabledTypes.has(SECTION_TYPES.AUTHOR) || enabledTypes.has(SECTION_TYPES.CONTRIBUTING)) score += 6;
  else tips.push('Add Author or Contributing so people know who built it');

  // 10. Env vars conditional (up to 2 bonus, no penalty)
  const env = sections.find(s => s.type === SECTION_TYPES.ENV_VARS && s.enabled);
  if (env && env.data?.variables?.length > 0) score += 2;

  // SEO hygiene (no extra points, just tips)
  const allText = sections.filter(s => s.enabled).map(s => JSON.stringify(s.data || '')).join(' ');
  if (/(TODO|FIXME|XXX)/i.test(allText)) tips.push('Remove TODO/FIXME placeholders before publishing');
  if (/localhost|127\.0\.0\.1/.test(allText)) tips.push('Replace localhost URLs with public links for GitHub readers');

  const readability = fleschScore(about?.data?.content || hero?.data?.tagline || '');
  if (readability !== null && readability < 40) tips.push('Simplify About sentences — aim for grade-8 readability');

  let label = 'Needs Work';
  let color = '#EF4444';
  if (score >= 90) { label = 'Outstanding'; color = '#10B981'; }
  else if (score >= 75) { label = 'Great'; color = '#06B6D4'; }
  else if (score >= 50) { label = 'Good'; color = '#F59E0B'; }

  return { score: Math.min(score, 100), label, color, tips, readability };
}
