#!/usr/bin/env node

// builder-bob doesn't support including something from the top level, so we need to fix the paths
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const files = [
  ['lib/commonjs', 'js', '../..'],
  ['lib/module', 'js', '../..'],
  ['lib/typescript/commonjs/src', 'd.ts', '../../../..'],
  ['lib/typescript/module/src', 'd.ts', '../../../..'],
];

for (const name of ['index', 'static']) {
  for (const [dir, ext, prefix] of files) {
    const file = `${dir}/${name}.${ext}`;
    if (!existsSync(file)) continue;
    let content = readFileSync(file, 'utf8');
    content = content.replace(/\.\.\/glyphmaps/g, `${prefix}/glyphmaps`);
    content = content.replace(/\.\.\/fonts/g, `${prefix}/fonts`);
    writeFileSync(file, content);
  }
}
