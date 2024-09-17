#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');
const yargs = require('yargs');
const { getMIStyleFromCodepointsFile } = require('../lib/object-utils');

const { argv } = yargs
  .usage('')
  .option('path', {
    alias: 'p',
    string: true,
    array: true,
  })
  .option('output', {
    alias: 'o',
    string: true,
  })
  .demandOption('path')
  .demandOption('output');

const generatedJSON = {};
argv.path.forEach(file => {
  const codepoints = fs.readFileSync(file, { encoding: 'utf8' }).split('\n');
  const style = getMIStyleFromCodepointsFile(file);

  for (let i = 0; i < codepoints.length; i += 1) {
    const parts = codepoints[i].split(' ');
    if (parts.length === 2) {
      const glyphKey = parts[0].replace(/_/g, '-');
      if (generatedJSON[style] === undefined) {
        generatedJSON[style] = [];
      }
      if (!generatedJSON[style].includes(glyphKey)) {
        generatedJSON[style].push(glyphKey);
      }
    }
  }
});

fs.writeFileSync(
  argv.output,
  `${JSON.stringify(generatedJSON, null, 2)}\r\n`,
  'utf8'
);
