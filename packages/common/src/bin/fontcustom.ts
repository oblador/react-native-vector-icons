#!/usr/bin/env node

import { execSync } from 'node:child_process';

const cmd = `docker run --rm --interactive --tty \
   --volume $(pwd):/app/project \
   --user $(id -u):$(id -g) \
   telor/fontcustom-worker \
   fontcustom ${process.argv.slice(2).join(' ')}
`;

const stdout = execSync(cmd);
console.log(stdout.toString());
