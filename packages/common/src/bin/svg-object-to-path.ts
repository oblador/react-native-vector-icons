#!/usr/bin/env node

import { spawnSync } from 'node:child_process';

const args = [
  'run',
  '--rm',
  `--volume=${process.cwd()}:/app/`,
  '--workdir=/app',
  `--volume=${process.cwd()}/../../node_modules:/app/node_modules`,
  'minidocks/inkscape:1',
  '--actions="select-all;object-to-path;object-stroke-to-path;object-set-attribute:stroke-width,0;export-overwrite;export-plain-svg;export-do"',
  ...process.argv.slice(2),
];

const { stderr, stdout, status } = spawnSync('docker', args);

if (status !== null && status !== 0) {
  console.debug('# STDOUT');
  console.log(stdout.toString());
  console.debug('# STDERR');
  console.log(stderr.toString());
  process.exit(status);
}
