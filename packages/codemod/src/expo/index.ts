import { run as jscodeshift } from 'jscodeshift/src/Runner';
import { updatePackageJson } from './package-json';

export async function runExpoMigration(dir: string) {
  const transformPath = require.resolve('./import-transform');

  process.chdir(dir);
  console.log(`Running Expo codemod in directory: ${dir}`);

  await jscodeshift(transformPath, ['.'], {
    verbose: process.env.VERBOSE === 'true' || process.env.VERBOSE === '1',
    extensions: 'js,jsx,ts,tsx',
    parser: 'tsx',
    ignorePattern: '**/node_modules/**',
  });
  await updatePackageJson(dir);
}
