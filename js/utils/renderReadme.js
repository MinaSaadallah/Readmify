/**
 * THE single render pipeline. Every consumer — the live preview pane, Copy,
 * Download, and the read-only raw/code view — calls this exact function on
 * the exact same section state. There is no second implementation anywhere
 * that could show something different.
 */
import { generateMarkdown } from './markdownGenerator.js';

export function renderReadmeHtml(sections) {
  const markdown = generateMarkdown(sections);

  if (!window.marked) {
    return { markdown, html: `<pre>${markdown.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</pre>` };
  }

  window.marked.setOptions({ gfm: true, breaks: true });
  const rawHtml = window.marked.parse(markdown);
  const html = window.DOMPurify
    ? window.DOMPurify.sanitize(rawHtml, { FORBID_ATTR: ['style'], FORBID_TAGS: ['style', 'script'] })
    : rawHtml;

  return { markdown, html };
}
