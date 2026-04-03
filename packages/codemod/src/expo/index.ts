import { run as jscodeshift } from 'jscodeshift/src/Runner';
import resolveFrom from 'resolve-from';

import { updatePackageJson } from './package-json';

async function shouldUseStaticImports(dir: string): Promise<boolean> {
  const hasExpoDevClient = resolveFrom.silent(dir, 'expo-dev-client/package.json') != null;

  if (hasExpoDevClient) {
    console.log(
      '\nDetected expo-dev-client. Defaulting to /static imports (e.g. @react-native-vector-icons/material-icons/static).',
    );
  } else {
    console.log(
      '\nNo expo-dev-client detected (assuming Expo Go). Using default imports (e.g. @react-native-vector-icons/material-icons).',
    );
  }
  return hasExpoDevClient;
}

export async function runExpoMigration(dir: string) {
  const transformPath = require.resolve('./import-transform');

  process.chdir(dir);
  console.log(`Running Expo codemod in directory: ${dir}`);

  const useStatic = await shouldUseStaticImports(dir);

  await jscodeshift(transformPath, ['.'], {
    verbose: process.env.VERBOSE === 'true' || process.env.VERBOSE === '1',
    extensions: 'js,jsx,ts,tsx',
    parser: 'tsx',
    ignorePattern: '**/node_modules/**',
    useStatic,
  });
  await updatePackageJson(dir);
}
