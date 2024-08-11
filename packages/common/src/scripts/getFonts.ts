#!/usr/bin/env node

import { getFontPaths } from "./common";

const packageJsonFilename = process.argv[2];
if (!packageJsonFilename) {
  throw new Error('Need the path to the roo package.json as the first argument');
}

const fonts = getFontPaths(packageJsonFilename);
fonts.flatMap(console.log); // eslint-disable-line no-console
