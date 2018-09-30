#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');
const yargs = require('yargs');

const { argv } = yargs
  .usage('')
  .option('path', {
    alias: 'p',
    string: true,
  })
  .option('output', {
    alias: 'o',
    string: true,
  })
  .demandOption('path')
  .demandOption('output');

const path = `${argv.path}/svgs/`;

const generatedJSON = {};
fs.readdirSync(path)
  .filter(file => fs.statSync(path + file).isDirectory())
  .forEach(file => {
    const icons = fs.readdirSync(path + file);
    generatedJSON[file] = icons.map(icon => icon.split('.')[0]);
  });

fs.writeFileSync(
  argv.output,
  `${JSON.stringify(generatedJSON, null, 2)}\r\n`,
  'utf8'
);
