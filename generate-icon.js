#!/usr/bin/env node
'use strict';

var argv = require('yargs')
  .usage('Usage: $0 [options] path/to/styles.css \nFor default template please provide --componentName and --fontFamily')
  .demand(1)
  .default('p', '.icon-')
  .describe('p', 'CSS selector prefix')
  .alias('p', 'prefix')
  .default('t', __dirname + '/templates/bundled-icon-set.tpl')
  .describe('t', 'Template in lodash format')
  .alias('t', 'template')
  .describe('o', 'Save output to file, defaults to STDOUT')
  .alias('o', 'output')
  .describe('g', 'Save glyphmap JSON to file')
  .alias('g', 'glyphmap')
  .argv;

var _ = require('lodash');
var fs = require('fs');
var generateIconSetFromCss = require('./lib/generate-icon-set-from-css');

var template;
if(argv.template) {
  template = fs.readFileSync(argv.template, { encoding: 'utf8' });
}

var data = _.omit(argv, '_ $0 o output p prefix t template g glyphmap'.split(' '));


var content = generateIconSetFromCss(argv._, argv.prefix, template, data);
if(argv.output) {
  fs.writeFileSync(
    argv.output,
    content
  );
} else {
  console.log(content);
}

if (argv.glyphmap) {
  fs.writeFileSync(
    argv.glyphmap,
    generateIconSetFromCss(argv._, argv.prefix)
  );
}
