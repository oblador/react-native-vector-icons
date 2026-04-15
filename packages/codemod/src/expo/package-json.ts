import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { getVersion } from '../getVersion';
import { getNewFontImports } from './newFontImports';

export async function updatePackageJson(dir: string, hasExpoDevClient: boolean) {
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
  const versions = await Promise.all(newFontImports.map((pkg) => getVersion(pkg)));

  newFontImports.forEach((pkg, i) => {
    packageJson.dependencies[pkg] = versions[i];
  });

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + os.EOL);

  console.log(
    `📦 \`@expo/vector-icons\` was removed from package.json. As a replacement, the following ${newFontImports.length} packages were added: ${newFontImports.join(', ')}.`,
  );

  console.log('\n👉 Run `npx expo install` to install the new dependencies.');

  if (hasExpoDevClient) {
    const pluginsList = newFontImports.map((name) => `    "${name}"`).join(',\n');
    console.warn(
      `\n⚠️  ACTION REQUIRED: Because you are using a development build, you have to enable each new package's Expo config plugin so the icon fonts are registered natively.\n` +
        `Add the following entries to the "plugins" array in your app config (app.json / app.config.js / app.config.ts):\n\n` +
        `  "plugins": [\n${pluginsList}\n  ]\n\n` +
        `Then rebuild your development build (\`npx expo prebuild --clean\` followed by \`npx expo run:ios\` / \`npx expo run:android\`, or rebuild via EAS).`,
    );
  }
}
