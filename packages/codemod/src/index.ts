#!/usr/bin/env node

/* eslint-disable no-console */

import path from 'node:path';

import semver from 'semver';

const dir = process.argv[2];
if (!dir) {
  console.error('Please specify a directory to transform');
  process.exit(1);
}

// eslint-disable-next-line import/no-dynamic-require,@typescript-eslint/no-require-imports
const projectPkgJson = require(path.join(dir, 'package.json'));

const { dependencies } = projectPkgJson;

let version: string;

if (dependencies['react-native-vector-icons']) {
  version = '11.x';
  await import('./11.0');
} else {
  const currentVersion = dependencies['@react-native-vector-icons/common'];

  if (semver.satisfies(currentVersion, '12.x')) {
    version = '12.x';
    await import('./12.0');
  } else {
    console.error('Unsupported version of react-native-vector-icons');
    process.exit(1);
  }
}

console.log(`
Transform complete!

Upgraded to version ${version}

NOTE: You may need to run again to upgrade to the next version.
NOTE: You may need to run 'yarn install' or 'npm install' to install new dependencies.

Please check https://github.com/react-native-vector-icons/react-native-vector-icons/blob/master/MIGRATION.md for any manual steps
`);
