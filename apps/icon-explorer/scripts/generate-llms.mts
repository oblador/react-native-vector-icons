#!/usr/bin/env node

/**
 * Generates llms.txt, llms-full.txt, and per-page .md files from source content modules.
 * Runs after `expo export --platform web` and writes to the dist/ directory.
 */

import fs from 'node:fs';
import path from 'node:path';

const contentDir = path.resolve(import.meta.dirname, '../src/content/docs');
const distDir = path.resolve(import.meta.dirname, '../dist');

const SITE_URL = 'https://react-native-vector-icons.org';

// Pages in navigation order
const PAGE_ORDER = ['getting-started', 'usage', 'icon-sets', 'advanced', 'testing', 'migration', 'custom-fonts'];

interface DocPage {
  slug: string;
  title: string;
  description: string;
  markdown: string;
}

async function main() {
  const pages: DocPage[] = [];

  for (const slug of PAGE_ORDER) {
    const modulePath = path.join(contentDir, `${slug}.ts`);
    if (!fs.existsSync(modulePath)) {
      console.warn(`Skipping ${slug}: file not found`);
      continue;
    }

    const mod = await import(modulePath);
    let markdown = mod.body || '';

    // Append tab content if present
    if (mod.tabs) {
      for (const [groupName, sections] of Object.entries(mod.tabs)) {
        markdown += `\n\n## ${groupName}\n`;
        for (const section of sections as Array<{ label: string; content: string }>) {
          markdown += `\n### ${section.label}\n\n${section.content}\n`;
        }
      }
    }

    pages.push({
      slug,
      title: mod.title || slug,
      description: mod.description || '',
      markdown,
    });
  }

  // Ensure dist directory exists
  fs.mkdirSync(distDir, { recursive: true });

  // Generate llms.txt (index)
  const indexLines = [
    '# React Native Vector Icons',
    '',
    '> The most complete icon library for React Native.',
    '',
    '## Documentation',
    '',
    ...pages.map((p) => `- [${p.title}](${SITE_URL}/${p.slug}): ${p.description}`),
    '',
    `## Full Documentation`,
    '',
    `For the complete documentation in a single file, see [llms-full.txt](${SITE_URL}/llms-full.txt).`,
  ];
  fs.writeFileSync(path.join(distDir, 'llms.txt'), indexLines.join('\n'));

  // Generate llms-full.txt (concatenated)
  const fullLines = [
    '# React Native Vector Icons — Full Documentation',
    '',
    ...pages.flatMap((p) => [`---`, ``, `# ${p.title}`, ``, p.markdown, ``]),
  ];
  fs.writeFileSync(path.join(distDir, 'llms-full.txt'), fullLines.join('\n'));

  // Generate per-page .md files
  for (const page of pages) {
    const content = [`# ${page.title}`, '', page.markdown].join('\n');
    fs.writeFileSync(path.join(distDir, `${page.slug}.md`), content);
  }

  console.log(`Generated llms.txt, llms-full.txt, and ${pages.length} .md files in dist/`);
}

main().catch((err) => {
  console.error('Error generating llms files:', err);
  process.exit(1);
});
