#!/usr/bin/env node
/* eslint-disable no-console */

import fs from 'node:fs';
import * as path from 'node:path';
import pc from 'picocolors';
import * as plist from 'plist';

import { getFontPaths } from './common';

const getFontName = (fontPath: string) => path.basename(fontPath);

const packageJsonFilename = process.argv[2];
if (!packageJsonFilename) {
  throw new Error('Need the path to the root package.json as the first argument');
}

const infoPlistFilename = process.argv[3];
if (!infoPlistFilename) {
  throw new Error('Need the path to the Info.plist as the second argument');
}

const fonts = getFontPaths(packageJsonFilename);
console.log(`Found ${fonts.length} fonts`);

const infoPlistContent = fs.readFileSync(infoPlistFilename, 'utf8');
const infoPlist = plist.parse(infoPlistContent) as Record<string, string[]>;

const plistFonts = new Set(infoPlist.UIAppFonts || []);
const providedFonts = new Set(fonts.map(getFontName));

let hasChanges = false;

// Check for missing fonts and add them
providedFonts.forEach((font) => {
  if (!plistFonts.has(font)) {
    plistFonts.add(font);
    console.log(pc.green(`Added ${font}`));
    hasChanges = true;
  } else {
    console.log(`Existing ${font}`);
  }
});

// Check for extra fonts in Info.plist
plistFonts.forEach((font) => {
  if (!providedFonts.has(font)) {
    console.log(pc.red(`Extra ${font} (Please remove manually if not needed)`));
  }
});

// Update Info.plist if there were changes
if (hasChanges) {
  infoPlist.UIAppFonts = Array.from(plistFonts);
  const updatedInfoPlistContent = plist.build(infoPlist).replace(/^ {2}/gm, '').replace(/ {2}/gm, '\t');

  fs.writeFileSync(infoPlistFilename, updatedInfoPlistContent, 'utf8');
}
