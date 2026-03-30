#!/usr/bin/env node

import path from 'node:path';

import { globSync } from 'glob';

// Collect all per-style package glyphmaps (these map 1:1 to installable npm packages).
// Exclude the combined multi-style FA5/FA6 packages (fontawesome5, fontawesome6,
// fontawesome5-pro, fontawesome6-pro) since they bundle multiple styles internally
// and are represented by the individual per-style packages instead.
const glyphMapFiles = globSync('../../../packages/*/glyphmaps/*.json', {
  cwd: import.meta.dirname,
  ignore: [
    '../../../packages/fontawesome5/**',
    '../../../packages/fontawesome5-pro/**',
    '../../../packages/fontawesome6/**',
    '../../../packages/fontawesome6-pro/**',
  ],
});

const index: Record<string, Record<string, number>> = {};

for (const file of glyphMapFiles) {
  const name = path.basename(file, '.json');
  if (name.includes('_meta')) continue;

  const jsonModule = await import(path.join(import.meta.dirname, file), {
    with: { type: 'json' },
  });

  index[name] = jsonModule.default;
}

process.stdout.write(JSON.stringify(index, null, 2));
