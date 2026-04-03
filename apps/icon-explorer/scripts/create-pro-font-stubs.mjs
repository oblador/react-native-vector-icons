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

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../../packages');

for (const dir of ['fontawesome5-pro', 'fontawesome6-pro']) {
  const destDir = join(root, 'rnvi-fonts', dir);
  mkdirSync(destDir, { recursive: true });

  const yorc = join(root, dir, '.yo-rc.json');
  const yo = JSON.parse(readFileSync(yorc, 'utf8'));
  const styles = yo['generator-react-native-vector-icons'].meta.styles;

  for (const s of Object.values(styles)) {
    writeFileSync(join(destDir, s.name), '');
    console.log(`  Created stub: ${dir}/${s.name}`);
  }
}
