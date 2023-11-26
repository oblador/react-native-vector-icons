#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import os from 'node:os';

const { uid, gid } = os.userInfo();

const args = [
  'run',
  '--rm',
  '--volume',
  `${process.cwd()}:/app/project`,
  '--volume',
  `${process.cwd()}/../../node_modules:/app/node_modules`,
  '--user',
  `${uid}:${gid}`,
  'telor/fontcustom-worker',
  'fontcustom',
  ...process.argv.slice(2),
];

spawnSync('docker', args, { stdio: 'inherit' });
