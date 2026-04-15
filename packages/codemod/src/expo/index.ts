import fs from 'node:fs';
import path from 'node:path';

import { run as jscodeshift } from 'jscodeshift/src/Runner';
import resolveFrom from 'resolve-from';

import { updatePackageJson } from './package-json';

function detectDevClient(dir: string): boolean {
  const hasExpoDevClient = resolveFrom.silent(dir, 'expo-dev-client/package.json') != null;
  const hasAndroidDir = fs.existsSync(path.join(dir, 'android'));
  const hasIosDir = fs.existsSync(path.join(dir, 'ios'));
  const hasDevClient = hasExpoDevClient || hasAndroidDir || hasIosDir;

  if (hasDevClient) {
    console.log(
      '\n🔧 Detected Expo development build. Defaulting to `/static` imports (e.g. `@react-native-vector-icons/material-icons/static`).',
    );
  } else {
    console.log(
      '\n🔧 No Expo development build detected (assuming Expo Go). Using default imports (e.g. `@react-native-vector-icons/material-icons`).',
    );
  }
  return hasDevClient;
}

export async function runExpoMigration(dir: string) {
  const transformPath = require.resolve('./import-transform');

  process.chdir(dir);
  console.log(`🚀 Running Expo codemod in directory: ${path.resolve(dir)}`);

  const hasDevClient = detectDevClient(dir);

  await jscodeshift(transformPath, ['.'], {
    verbose: process.env.VERBOSE === 'true' || process.env.VERBOSE === '1',
    extensions: 'js,jsx,ts,tsx',
    parser: 'tsx',
    ignorePattern: '**/node_modules/**',
    useStatic: hasDevClient,
  });
  await updatePackageJson(dir, hasDevClient);
}
