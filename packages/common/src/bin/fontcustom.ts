#!/usr/bin/env node

import { spawn } from 'node:child_process';

const args = [
  'run',
  '--rm',
  '--volume',
  '$(pwd):/app/project',
  '--volume',
  '$(pwd)/../../node_modules:/app/node_modules',
  '--user',
  '$(id -u):$(id -g)',
  'telor/fontcustom-worker',
  'fontcustom',
  ...process.argv.slice(2),
];

spawn('docker', args);
