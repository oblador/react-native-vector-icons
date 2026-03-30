#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import path from 'node:path';

import { globSync } from 'glob';

// Read base path from astro config so font URLs work at any base
const configPath = path.join(import.meta.dirname, '..', 'astro.config.mjs');
const configText = readFileSync(configPath, 'utf-8');
const baseMatch = configText.match(/base:\s*['"]([^'"]*)['"]/);
const base = baseMatch ? baseMatch[1].replace(/\/$/, '') : '';

const fontFiles = globSync('public/fonts/*.ttf', {
  cwd: `${import.meta.dirname}/..`,
});

const styles = fontFiles
  .map((file) => path.basename(file))
  .map((file) => ({
    file,
    fontFamily: path.basename(file, '.ttf'),
  }))
  .map(
    ({ file, fontFamily }) => `
@font-face {
  font-family: '${fontFamily}';
  src: url('${base}/fonts/${file}') format('truetype');
  font-display: swap;
}
`,
  )
  .join('\n');

process.stdout.write(styles);
