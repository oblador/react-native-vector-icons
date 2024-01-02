#!/usr/bin/env node

import path from 'node:path';
import { exec } from 'node:child_process';
import packageJsonTransform from './package-json';
import infoPlistTransform from './info-plist';
import removeFonts from './remove-fonts';

const dir = process.argv[2];
if (!dir) {
  throw new Error('Please specify a directory to transform');
}

const transformFilePath = path.join(__dirname, 'transform.js');
const cmd = `jscodeshift --transform ${transformFilePath}  --extensions js,ts,jsx,tsx --parser tsx --ignore-pattern **/node_modules/** ${dir}`;

const proc = exec(cmd, { env: { ...process.env, FORCE_COLOR: 'true' } });

const pkgs = new Set<string>();
proc.stdout?.on('data', (data: string) => {
  console.log(data);

  const lines = data.split('\n');

  lines.forEach((line) => {
    if (line.match('DEP_FOUND: ')) {
      pkgs.add(line.replace(/.*DEP_FOUND: /, '').trim());
    }
  });
});

proc.stderr?.on('data', (data) => {
  console.error(data);
});

proc.on('exit', () => {
  packageJsonTransform(pkgs);
  infoPlistTransform();
  removeFonts();

  console.log(`
Transform complete! You may need to run 'yarn install' or 'npm install' to install new dependencies.

Please check https://github.com/react-native-vector-icons/react-native-vector-icons/blob/master/MIGRATION.md for any manual steps
  `);
});
