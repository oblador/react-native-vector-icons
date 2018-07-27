#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');

const argv = require('yargs')
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
  .demandOption('output').argv;

const generatedJSON = {};

const path = `${argv.path}/svgs/`;
fs.readdirSync(path).forEach(file => {
  if (fs.statSync(path + file).isDirectory()) {
    generatedJSON[file] = []

    fs.readdirSync(path + file).forEach(icon => {
      const name = icon.split('.')[0];
      generatedJSON[file].push(name);
    });
  }
});

const sortedKeys = Object.keys(generatedJSON).sort();

const outputJSON = {};

sortedKeys.forEach(key => {
  outputJSON[key] = generatedJSON[key];
});

fs.writeFileSync(
  argv.output,
  `${JSON.stringify(outputJSON, null, 2)}\r\n`,
  'utf8'
);
