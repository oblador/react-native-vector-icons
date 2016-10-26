#!/usr/bin/env node
'use strict';

var argv = require('yargs')
  .usage('Usage: $0 [options] path/to/codepoints \nFor default template please provide --componentName and --fontFamily')
  .demand(1)
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

var extractGlyphMapFromCodepoints = function(fileName) {
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

var template;
if(argv.template) {
  template = fs.readFileSync(argv.template, { encoding: 'utf8' });
}

var data = _.omit(argv, '_ $0 o output t template g glyphmap'.split(' '));
var glyphMap = extractGlyphMapFromCodepoints(argv._[0]);

var content = JSON.stringify(glyphMap, null, '  ');
if(template) {
  var compiled = _.template(template);
  data = data || {};
  data.glyphMap = content;
  content = compiled(data);
}

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
    JSON.stringify(glyphMap, null, '  ')
  );
}
