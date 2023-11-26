#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import os from 'node:os';

const { uid, gid } = os.userInfo();

const args = [
  'run',
  '--rm',
  `--volume=${process.cwd()}:/home/project`,
  `--volume=${process.cwd()}/../../node_modules:/home/project/node_modules`,
  `--user=${uid}:${gid}`,
  '--workdir=/home/project',
  'nfqlt/fontforge',
  'fontforge',
  ...process.argv.slice(2),
];

const { status } = spawnSync('docker', args, { stdio: 'inherit' });

process.exit(status || 0);
