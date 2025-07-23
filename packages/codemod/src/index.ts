#!/usr/bin/env node

/* eslint-disable no-console */

import path from 'node:path';

import semver from 'semver';

import { runExpoMigration } from './expo';
import { readPackageDeps } from './readPackageDeps';

async function main() {
  const dir = process.argv[2];
  if (!dir) {
    console.error('Specify a directory in which to run the codemod');
    process.exit(1);
  }

  const { dependencies, error } = readPackageDeps(dir);

  if (error) {
    console.error(`Unable to read package.json in ${dir}: ${error.message}`);
    process.exit(1);
  }

  console.log('Running codemod in', dir);

  let version: string | undefined;

  const expoVectorIcons = dependencies['@expo/vector-icons'];

  if (expoVectorIcons) {
    await runExpoMigration(dir);
    console.log('Transform complete! Reinstall npm dependencies to use the new versions.');
  } else {
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
        `Have not found anything to migrate. Do you have "react-native-vector-icons" or "@expo/vector-icons" at ${path.join(dir, 'package.json')}?`,
      );
      process.exit(1);
    }

    console.log(`
  Transform complete!
  
  Upgraded to version ${version}
  
  NOTE: You may need to run again to upgrade to the next version.
  NOTE: You may need to run 'npm install' to install new dependencies.
  
  Check https://github.com/react-native-vector-icons/react-native-vector-icons/blob/master/MIGRATION.md for any manual steps
  `);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
