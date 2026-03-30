#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const packagesDir = path.resolve(import.meta.dirname, '../../../packages');
const outputDir = path.resolve(import.meta.dirname, '../src/data/generated');

// Combined multi-style FA packages — skip, represented by per-style packages
const excludedDirs = new Set(['fontawesome5', 'fontawesome5-pro', 'fontawesome6', 'fontawesome6-pro']);

const index: Record<string, Record<string, number>> = {};

for (const pkgName of fs.readdirSync(packagesDir)) {
  if (excludedDirs.has(pkgName)) continue;

  const glyphmapsDir = path.join(packagesDir, pkgName, 'glyphmaps');
  if (!fs.existsSync(glyphmapsDir)) continue;

  for (const file of fs.readdirSync(glyphmapsDir)) {
    if (!file.endsWith('.json')) continue;

    const name = path.basename(file, '.json');
    if (name.includes('_meta')) continue;

    const content = fs.readFileSync(path.join(glyphmapsDir, file), 'utf-8');
    index[name] = JSON.parse(content);
  }
}

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, 'glyphmapIndex.json'), JSON.stringify(index, null, 2));

const totalIcons = Object.values(index).reduce((sum, family) => sum + Object.keys(family).length, 0);
console.log(`Generated glyphmapIndex.json: ${Object.keys(index).length} families, ${totalIcons} icons`);
