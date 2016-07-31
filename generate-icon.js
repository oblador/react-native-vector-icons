#!/usr/bin/env node
'use strict';

var argv = require('yargs')
  .usage('Usage: $0 [options] path/to/styles.css \nFor default template please provide --componentName and --fontFamily')
  .demand(1)
  .default('p', '.icon-')
  .describe('p', 'CSS selector prefix')
  .alias('p', 'prefix')
  .default('t', __dirname + '/templates')
  .describe('t', 'Template path with iconSet.tpl and glyphMap.tpl in lodash format')
  .alias('t', 'templates')
  .describe('o', 'Save output to given path, defaults to STDOUT. Within path, files will be ${FontFamily}.js and glyph-maps/${FontFamily}.js')
  .alias('o', 'output')
  .argv;

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var generateIconSetFromCss = require('./lib/generate-icon-set-from-css');

let iconTemplate, glyphMapTemplate;
if (argv.templates) {
  const readTemplate = (name) => {
    let templatePath = path.resolve(argv.templates, name);
    return fs.readFileSync(templatePath, { encoding: 'utf8' });
  }

  iconTemplate = readTemplate('iconSet.tpl');
  glyphMapTemplate = readTemplate('glyphMap.tpl');
}

const data = _.omit(argv, '_ $0 o output p prefix t template'.split(' '));

const {
  iconComponent,
  glyphMap,
} = generateIconSetFromCss(argv._, argv.prefix, iconTemplate, glyphMapTemplate, data);

if (argv.output) {
  const glyphMapDir = path.resolve(argv.output, `glyph-maps`);
  const glyphMapPath = path.resolve(glyphMapDir, `${argv.fontFamily}.js`);
  const iconComponentPath = path.resolve(argv.output, `${argv.fontFamily}.js`);

  if (!fs.statSync(glyphMapDir)) {
    fs.mkdirSync(glyphMapDir);
  }

  fs.writeFileSync(
    glyphMapPath,
    glyphMap
  );

  fs.writeFileSync(
    iconComponentPath,
    iconComponent
  );
} else {
  console.log(iconComponent);
  console.log(glyphMap);
}
