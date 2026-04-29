import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';

import { run as jscodeshift } from 'jscodeshift/src/Runner';
import resolveFrom from 'resolve-from';

import { updatePackageJson } from './package-json';

function detectDevClient(dir: string): boolean {
  const hasExpoDevClient = resolveFrom.silent(dir, 'expo-dev-client/package.json') != null;
  const hasAndroidDir = fs.existsSync(path.join(dir, 'android'));
  const hasIosDir = fs.existsSync(path.join(dir, 'ios'));
  return hasExpoDevClient || hasAndroidDir || hasIosDir;
}

async function confirmStaticImports(): Promise<boolean> {
  if (!process.stdin.isTTY) {
    console.log('🔧 Non-interactive run, defaulting to `/static` imports. Pass `--dynamic` to override.');
    return true;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  try {
    const answer = await rl.question(
      '\nUse `/static` imports for smaller bundle size? Learn more at https://github.com/oblador/react-native-vector-icons/blob/master/docs/SETUP-EXPO.md. [Y/n] ',
    );
    const normalized = answer.trim().toLowerCase();
    return normalized === '' || normalized === 'y' || normalized === 'yes';
  } finally {
    rl.close();
  }
}

type RunOptions = {
  useStatic?: boolean;
};

export async function runExpoMigration(dir: string, { useStatic: useStaticOverride }: RunOptions = {}) {
  const transformPath = require.resolve('./import-transform');

  process.chdir(dir);
  console.log(`🚀 Running Expo codemod in directory: ${path.resolve(dir)}`);

  let useStatic: boolean;
  if (useStaticOverride !== undefined) {
    useStatic = useStaticOverride;
  } else {
    const hasDevClient = detectDevClient(dir);
    if (hasDevClient) {
      console.log('\n🔧 Detected Expo development build.');
      useStatic = await confirmStaticImports();
    } else {
      console.log('\n🔧 No Expo development build detected (assuming Expo Go).');
      useStatic = false;
    }
  }

  console.log(`🔧 Using ${useStatic ? '`/static`' : 'default'} imports.`);

  await jscodeshift(transformPath, ['.'], {
    verbose: process.env.VERBOSE === 'true' || process.env.VERBOSE === '1',
    extensions: 'js,jsx,ts,tsx',
    parser: 'tsx',
    ignorePattern: '**/node_modules/**',
    useStatic,
  });
  await updatePackageJson(dir, useStatic);
}
