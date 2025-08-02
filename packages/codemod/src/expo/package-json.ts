/* eslint-disable no-console */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { getNewFontImports } from './newFontImports';

export async function updatePackageJson(dir: string) {
  const packageJsonPath = path.join(dir, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    console.error('package.json not found');
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  if (!packageJson) {
    console.error('package.json is not valid');
    return;
  }

  if (packageJson.dependencies?.['@expo/vector-icons']) {
    delete packageJson.dependencies['@expo/vector-icons'];
  }

  if (!packageJson.dependencies) {
    packageJson.dependencies = {};
  }

  const newFontImports = getNewFontImports();

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + os.EOL);

  execSync(`npx expo install ${newFontImports.join(' ')}`, {
    cwd: dir,
    stdio: 'inherit',
  });

  console.log(
    `@expo/vector-icons was removed from package.json. As a replacement, the following ${newFontImports.length} packages were added: ${newFontImports.join(', ')}.`,
  );
  console.log('If you need to, you can add @expo/vector-icons back by running `npx expo install @expo/vector-icons`');
}
