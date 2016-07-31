#!/usr/bin/env node
'use strict';

// Example usage:
//
// node generate-material-icons.js \
//   --componentName=MaterialIcons \
//   --fontFamily='Material Icons' \
//   --output=.                    \
//   /Users/brent/coding/material-design-icons/iconfont/codepoints

var argv = require('yargs')
  .usage('Usage: $0 [options] path/to/codepoints \nFor default template please provide --componentName and --fontFamily')
  .demand(1)
  .default('t', __dirname + '/templates')
  .describe('t', 'Template path with iconSet.tpl and glyphMap.tpl in lodash format')
  .alias('t', 'templates')
  .describe('o', 'Save output to given path, defaults to STDOUT. Within path, files will be ${ComponentName}.js and glyph-maps/${ComponentName}.js')
  .alias('o', 'output')
  .argv;

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var generateIconSetFromCss = require('./lib/generate-icon-set-from-css');

function extractGlyphMapFromCodepoints(fileName) {
  var codepoints = fs.readFileSync(fileName, { encoding: 'utf8' }).split('\n');
  var glyphMap = {};
  codepoints.forEach(function(point) {
    var parts = point.split(' ');
    if(parts.length === 2) {
      glyphMap[parts[0].replace(/_/g, '-')] = parseInt(parts[1], 16);
    }
  });

  return glyphMap;
};

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
} = generateIconSetFromCss(argv._, argv.prefix, iconTemplate, glyphMapTemplate, data, extractGlyphMapFromCodepoints);

if (argv.output) {
  const glyphMapDir = path.resolve(argv.output, `glyph-maps`);
  const glyphMapPath = path.resolve(glyphMapDir, `${argv.componentName}.js`);
  const iconComponentPath = path.resolve(argv.output, `${argv.componentName}.js`);

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
