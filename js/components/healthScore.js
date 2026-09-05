/**
 * Readmify - README Health & Quality Analyzer
 * Evaluates completeness and provides tips for open-source excellence
 */
import { SECTION_TYPES } from '../data/defaultSections.js';

export function calculateReadmeScore(sections) {
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
