#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

import semver from 'semver';

import { checkGitStatus } from './checkGitStatus';
import { runExpoMigration } from './expo';
import { readPackageDeps } from './readPackageDeps';

function parseArgs(argv: string[]): { dir: string; useStatic: boolean | undefined } {
  let useStatic: boolean | undefined;
  const positionals: string[] = [];
  for (const arg of argv) {
    if (arg === '--static') useStatic = true;
    else if (arg === '--dynamic') useStatic = false;
    else if (arg.startsWith('--')) {
      console.error(`Unknown flag: ${arg}`);
      process.exit(1);
    } else positionals.push(arg);
  }
  return { dir: positionals[0] ?? process.cwd(), useStatic };
}

async function main() {
  const { dir: dirArg, useStatic } = parseArgs(process.argv.slice(2));
  const dir = path.resolve(dirArg);

  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    console.error(`Directory does not exist: ${dir}`);
    process.exit(1);
  }

  process.chdir(dir);

  checkGitStatus(dir);

  const { dependencies, error } = readPackageDeps(dir);

  if (error) {
    console.error(`Unable to read package.json in ${dir}: ${error.message}`);
    process.exit(1);
  }

  let version: string | undefined;

  const expoVectorIcons = dependencies['@expo/vector-icons'];

  if (expoVectorIcons) {
    await runExpoMigration(dir, { useStatic });
  } else {
    console.log('Running codemod in', dir);
    if (dependencies['react-native-vector-icons']) {
      version = '11.x';
      await import('./11.0');
    } else {
      const currentVersion = dependencies['@react-native-vector-icons/common'];

      if (currentVersion) {
        if (semver.satisfies(currentVersion, '12.x')) {
          version = '12.x';
          await import('./12.0');
        } else {
          console.error('Unsupported version of react-native-vector-icons');
          process.exit(1);
        }
      }
    }

    if (!version) {
      console.error(
        `Have not found anything to migrate. Do you have "react-native-vector-icons" or "@expo/vector-icons" in ${path.join(dir, 'package.json')}?`,
      );
      process.exit(1);
    }

    console.log(`
  Transform complete!
  
  Upgraded to version ${version}
  
  NOTE: You may need to run again to upgrade to the next version.
  NOTE: You may need to run 'npm install' to install new dependencies.
  
  Check https://github.com/oblador/react-native-vector-icons/blob/master/MIGRATION.md for any manual steps
  `);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
