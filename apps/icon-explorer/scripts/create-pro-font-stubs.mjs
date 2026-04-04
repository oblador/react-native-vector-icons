/**
 * Pro fonts are behind a paid license so we create empty stub .ttf files
 * with the expected names. This satisfies the podspec/gradle validation
 * and lets the build compile without real font assets.
 * This is secure and works for forks too.
 *
 * To test with real pro fonts locally, use `pnpm fetch-pro-fonts` instead.
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));
const packagesDir = resolve(currentDir, '../../../packages');
const explorerDir = resolve(currentDir, '..');

for (const dir of ['fontawesome5-pro', 'fontawesome6-pro']) {
  const destDir = join(explorerDir, 'rnvi-fonts', dir);
  mkdirSync(destDir, { recursive: true });

  const yorc = join(packagesDir, dir, '.yo-rc.json');
  const yo = JSON.parse(readFileSync(yorc, 'utf8'));
  const styles = yo['generator-react-native-vector-icons'].meta.styles;

  for (const s of Object.values(styles)) {
    writeFileSync(join(destDir, s.name), '');
    console.log(`  Created stub: ${dir}/${s.name}`);
  }
}
