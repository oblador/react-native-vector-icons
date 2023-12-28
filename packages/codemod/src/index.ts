#!/uar/bin/env node

import path from 'node:path';
import { execSync } from 'node:child_process';

const dir = process.argv[2] || '.';

const transformFilePath = path.join(__dirname, 'import-transform.js');
const cmd = `jscodeshift --extensions=js,ts,jsx,tsx --parser tsx -t ${transformFilePath} ${dir}`;
execSync(cmd, { stdio: 'inherit' });
