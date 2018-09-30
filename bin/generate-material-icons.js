#!/usr/bin/env node
/* eslint-disable no-console */

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const { argv } = yargs
  .usage(
    'Usage: $0 [options] path/to/codepoints \nFor default template please provide --componentName and --fontFamily'
  )
  .demand(1)
  .default('t', path.resolve(__dirname, '..', 'templates/bundled-icon-set.tpl'))
  .describe('t', 'Template in lodash format')
  .alias('t', 'template')
  .describe('o', 'Save output to file, defaults to STDOUT')
  .alias('o', 'output')
  .describe('g', 'Save glyphmap JSON to file')
  .alias('g', 'glyphmap');

function extractGlyphMapFromCodepoints(fileName) {
  const codepoints = fs
    .readFileSync(fileName, { encoding: 'utf8' })
    .split('\n');
  const glyphMap = {};
  codepoints.forEach(point => {
    const parts = point.split(' ');
    if (parts.length === 2) {
      glyphMap[parts[0].replace(/_/g, '-')] = parseInt(parts[1], 16);
    }
  });

  return glyphMap;
}

let template;
if (argv.template) {
  template = fs.readFileSync(argv.template, { encoding: 'utf8' });
}

let data = _.omit(argv, '_ $0 o output t template g glyphmap'.split(' '));
const glyphMap = extractGlyphMapFromCodepoints(argv._[0]);

let content = JSON.stringify(glyphMap, null, '  ');
if (template) {
  const compiled = _.template(template);
  data = data || {};
  data.glyphMap = content;
  content = compiled(data);
}

if (argv.output) {
  fs.writeFileSync(argv.output, content);
} else {
  console.log(content);
}

if (argv.glyphmap) {
  fs.writeFileSync(argv.glyphmap, JSON.stringify(glyphMap, null, '  '));
}
