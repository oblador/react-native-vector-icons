#!/usr/bin/env node

/* eslint-disable no-console */

import { exec } from 'node:child_process';
import path from 'node:path';

import moveFonts from './move-fonts';
import packageJsonTransform from './package-json';

const dir = process.argv[2];
if (!dir) {
  console.error('Please specify a directory to transform');
  process.exit(1);
}

const transformFilePath = path.join(__dirname, 'transform.js');
const cmd = `jscodeshift --transform ${transformFilePath}  --extensions js,ts,jsx,tsx --parser tsx --ignore-pattern '**/node_modules/**' ${dir}`;

const proc = exec(cmd, { env: { ...process.env, FORCE_COLOR: 'true' } });

proc.stdout?.on('data', (data: string) => {
  console.log(data);
});

proc.stderr?.on('data', (data) => {
  console.error(data);
});

proc.on('exit', () => {
  packageJsonTransform();
  moveFonts(dir);
});
