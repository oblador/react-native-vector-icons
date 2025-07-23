import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
import { getNewFontImports } from './newFontImports';
import { getVersion } from '../getVersion';

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
  const latestVersions = await Promise.all(newFontImports.map((font) => getVersion(font)));
  newFontImports.forEach((font, index) => {
    packageJson.dependencies[font] = latestVersions[index];
  });

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + os.EOL);

  console.log(
    `Removed @expo/vector-icons and added ${newFontImports.length} font packages: ${newFontImports.join(', ')}`,
  );
}
