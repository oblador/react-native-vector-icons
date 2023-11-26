#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import os from 'node:os';

const { uid, gid } = os.userInfo();

const args = [
  'run',
  '--rm',
  `--volume=${process.cwd()}:/project`,
  `--volume=${process.cwd()}/../../node_modules:/project/node_modules`,
  `--user=${uid}:${gid}`,
  'karel3d/fontcustom',
  ...process.argv.slice(2),
];

const { status } = spawnSync('docker', args, { stdio: 'inherit' });

process.exit(status || 0);
