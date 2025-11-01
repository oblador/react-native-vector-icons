#!/usr/bin/env node

import fs from 'node:fs';

const css = process.argv[2];
const svgDir = process.argv[3];

if (!css || !svgDir) {
  console.error('Usage: generate-fontawesome-glyphmap <css-glyphmap-filename> <svg-directory>');

  process.exit(1);
}

const icons = fs
  .readdirSync(svgDir)
  .filter((file) => file.endsWith('.svg'))
  .map((file) => file.replace('.svg', ''));

const mainMap = JSON.parse(fs.readFileSync(`glyphmaps/${css}`, 'utf8')) as Record<string, string>;

const glyphMap: Record<string, string> = {};

icons.forEach((icon) => {
  if (!mainMap[icon]) {
    console.log(`Icon "${icon}" not found in main glyphmap for "${css}"`);
    return;
  }
  glyphMap[icon] = mainMap[icon];
});

fs.writeFileSync(`glyphmaps/${css}`, JSON.stringify(glyphMap, null, 2), 'utf8');
