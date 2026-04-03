import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AstroConfig, AstroIntegration } from 'astro';

import { parseHTML } from 'linkedom';
import TurndownService from 'turndown';

interface DocPage {
  slug: string;
  title: string;
  description: string;
  markdown: string;
}

export default function llms(): AstroIntegration {
  let siteUrl: string;

  return {
    name: 'astro-llms',
    hooks: {
      'astro:config:done': ({ config }: { config: AstroConfig }) => {
        siteUrl = (config.site ?? '').replace(/\/$/, '');
      },
      'astro:build:done': async ({ dir, pages, logger }) => {
        const outDir = fileURLToPath(dir);
        const turndown = createTurndownService();

        const docPages: DocPage[] = [];
        let navOrder: string[] = [];

        for (const page of pages) {
          const slug = page.pathname.replace(/\/$/, '');
          if (!slug) continue;

          const htmlPath = path.join(outDir, page.pathname, 'index.html');
          let html: string;
          try {
            html = fs.readFileSync(htmlPath, 'utf-8');
          } catch {
            continue;
          }

          const { document } = parseHTML(html);

          // Only process pages with article.docs (skips index, directory, etc.)
          const article = document.querySelector('article.docs');
          if (!article) continue;

          if (navOrder.length === 0) {
            const extracted = extractNavOrder(document);
            if (extracted.length > 0) navOrder = extracted;
          }

          const title =
            document
              .querySelector('title')
              ?.textContent?.replace(/\s*—.*$/, '')
              .trim() || slug;
          const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

          // Pre-process DOM: convert tabs and callouts to simpler HTML
          // before passing to turndown
          preprocessTabs(article);
          preprocessCallouts(article);

          const markdown = turndown.turndown(article as unknown as HTMLElement);

          fs.writeFileSync(path.join(outDir, `${slug}.md`), `${markdown}\n`);
          docPages.push({ slug, title, description, markdown });
        }

        // Sort pages by their position in the nav
        docPages.sort((a, b) => {
          const ai = navOrder.indexOf(a.slug);
          const bi = navOrder.indexOf(b.slug);
          return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
        });

        fs.writeFileSync(path.join(outDir, 'llms.txt'), generateLlmsTxt(docPages, siteUrl));
        fs.writeFileSync(path.join(outDir, 'llms-full.txt'), generateLlmsFullTxt(docPages, siteUrl));

        logger.info(`Generated llms.txt, llms-full.txt, and ${docPages.length} page .md files`);
      },
    },
  };
}

/** Extract page slugs from the nav links to determine page ordering. */
function extractNavOrder(document: Document): string[] {
  const links = document.querySelectorAll('nav a[href]');
  return [...links]
    .map((a) => {
      const href = a.getAttribute('href') || '';
      return href.replace(/\/$/, '').split('/').pop() || '';
    })
    .filter((s) => s && s !== '/');
}

/**
 * Flatten tab containers into sequential sections with headings.
 * Tabs hide content behind a UI — for markdown we show all panels
 * with the tab label as an h4 heading.
 */
function preprocessTabs(article: Element): void {
  const containers = [...article.querySelectorAll('.tabs-container')];
  for (const container of containers) {
    const buttons = [...container.querySelectorAll('.tab-btn')];
    const panels = [...container.querySelectorAll('.tab-panel')];
    const labels = buttons.map((b) => b.textContent?.trim() || '');

    let replacement = '';
    panels.forEach((panel, i) => {
      const label = labels[i] || `Option ${i + 1}`;
      replacement += `<h4>${label}</h4>${panel.innerHTML}`;
    });

    container.outerHTML = replacement;
  }
}

/**
 * Convert callout elements (identified by data-callout attribute)
 * into blockquotes that turndown will convert to markdown blockquotes.
 */
function preprocessCallouts(article: Element): void {
  const callouts = [...article.querySelectorAll('[data-callout]')];
  for (const callout of callouts) {
    const titleEl = callout.querySelector('[data-callout-title]');
    const contentEl = callout.querySelector('[data-callout-content]');
    const title = titleEl?.textContent?.trim() || 'Note';
    const content = contentEl?.innerHTML || '';

    callout.outerHTML = `<blockquote><p><strong>${title}:</strong></p>${content}</blockquote>`;
  }
}

function createTurndownService(): TurndownService {
  const service = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
  });

  // Shiki code blocks → fenced code blocks with language
  service.addRule('shikiCodeBlock', {
    filter: (node: HTMLElement) =>
      node.nodeName === 'PRE' && (node.getAttribute?.('class') || '').includes('astro-code'),
    replacement: (_content: string, node: HTMLElement) => {
      const lang = node.getAttribute?.('data-language') || '';
      const codeEl = node.querySelector?.('code');
      if (!codeEl) return '';

      // Extract text from individual line spans for reliability
      // with minified HTML where whitespace between elements is stripped
      const lineSpans = codeEl.querySelectorAll('.line');
      let code: string;
      if (lineSpans.length) {
        code = [...lineSpans].map((s) => s.textContent || '').join('\n');
      } else {
        code = codeEl.textContent || '';
      }

      return `\n\`\`\`${lang}\n${code}\n\`\`\`\n`;
    },
  });

  // GFM-style markdown tables
  service.addRule('table', {
    filter: 'table',
    replacement: (_content: string, node: HTMLElement) => {
      const rows = [...node.querySelectorAll('tr')] as HTMLElement[];
      if (!rows.length) return _content;

      const result: string[] = [];
      let headerDone = false;

      for (const row of rows) {
        const cells = [...row.querySelectorAll('th, td')];
        const cellTexts = cells.map((c) => (c.textContent || '').trim().replace(/\n/g, ' ').replace(/\|/g, '\\|'));
        result.push(`| ${cellTexts.join(' | ')} |`);

        if (!headerDone && (row.querySelector('th') || row === rows[0])) {
          result.push(`| ${cellTexts.map(() => '---').join(' | ')} |`);
          headerDone = true;
        }
      }

      return `\n${result.join('\n')}\n`;
    },
  });

  service.remove(['script', 'style', 'noscript']);

  return service;
}

function generateLlmsTxt(pages: DocPage[], siteUrl: string): string {
  const lines = [
    '# React Native Vector Icons',
    '',
    '> Customisable vector icons for React Native. Thousands of icons across 34+ font families, with per-family npm packages. Supports Expo, React Native CLI, and web.',
    '',
    '## Docs',
    '',
  ];

  for (const page of pages) {
    lines.push(`- [${page.title}](${siteUrl}/${page.slug}.md): ${page.description}`);
  }

  lines.push(
    '',
    '## Optional',
    '',
    `- [Icon Directory](${siteUrl}/directory): Visual icon browser (interactive, not available as text)`,
    `- [Full Documentation](${siteUrl}/llms-full.txt): Complete documentation in a single markdown file`,
    '',
  );

  return lines.join('\n');
}

function generateLlmsFullTxt(pages: DocPage[], siteUrl: string): string {
  const header = `# React Native Vector Icons — Complete Documentation

> This file contains the complete documentation for React Native Vector Icons,
> generated from the source documentation at ${siteUrl}.
> For the structured index, see ${siteUrl}/llms.txt
`;

  return `${[header, ...pages.map((p) => p.markdown)].join('\n\n---\n\n')}\n`;
}
