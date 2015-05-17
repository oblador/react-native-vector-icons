#!/usr/bin/env node
'use strict';

var argv = require('yargs')
  .usage('Usage: $0 <command> [options] path/to/styles.css')
  .default('p', '.icon-')
  .describe('p', 'CSS selector prefix, defaults to .icon-')
  .alias('p', 'prefix')
  .default('t', './iconSet.tpl')
  .describe('t', 'Template in lodash format')
  .alias('t', 'template')
  .describe('o', 'Save output to file, defaults to STDOUT')
  .alias('o', 'output')
  .argv;

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

function extractGlyphMapFromCss(files, selectorPattern) {
  var styleRulePattern = '(\\.[a-z0-9.:, \\n\\t-]+)\\{[^}]*content: ?"\\\\([a-f0-9]+)"[^}]*\\}';
  var allStyleRules = new RegExp(styleRulePattern, 'g');
  var singleStyleRules = new RegExp(styleRulePattern);
  var allSelectors = new RegExp(selectorPattern, 'g');
  var singleSelector = new RegExp(selectorPattern);

  var glyphMap = {};
  if(typeof files === 'string') {
    files = [files];
  }

  files.forEach(function(fileName) {
    var contents = fs.readFileSync(fileName, { encoding: 'utf8' });
    var rules = contents.match(allStyleRules);
    if(rules) {
      rules.forEach(function(rule) {
        var ruleParts = rule.match(singleStyleRules);
        var charCode = parseInt(ruleParts[2], 16);
        var selectors = ruleParts[1].match(allSelectors);
        if(selectors) {
          selectors.forEach(function(selector) {
            var name = selector.match(singleSelector)[1];
            glyphMap[name] = charCode;
          });
        }
      });
    }
  });
  return glyphMap;
};

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function generateIconSetFromCss(cssFiles, selectorPrefix, template) {
  var glyphMap = extractGlyphMapFromCss(cssFiles, escapeRegExp(selectorPrefix) + '([a-z0-9-]+):before');
  var content = JSON.stringify(glyphMap, null, '  ');
  if(template) {
    var compiled = _.template(template);
    var data = _.omit(argv, '_ $0 o output p prefix t template'.split(' '));
    data.glyphMap = content;
    content = compiled(data);
  }
  return content;
};

var template;
if(argv.template) {
  template = fs.readFileSync('./iconSet.tpl', { encoding: 'utf8' });
}

var content = generateIconSetFromCss(argv._, argv.prefix, template);
if(argv.output) {
  fs.writeFileSync(
    outputFile,
    content
  );
} else {
  console.log(content);
}
