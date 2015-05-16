'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var glyphMapDestination = path.join(__dirname, 'glyph-maps');
if(!fs.existsSync(glyphMapDestination)) {
  fs.mkdirSync(glyphMapDestination);
}

var fontDestination = path.join(__dirname, 'fonts');
if(!fs.existsSync(fontDestination)) {
  fs.mkdirSync(fontDestination);
}

function extractGlyphMapFromCss(files, selectorPattern, nameIndex) {
  var styleRulePattern = '(\\.[a-z0-9.:, \\n\\t-]+)\\{[^}]*content: ?"\\\\([a-f0-9]+)"[^}]*\\}';
  var allStyleRules = new RegExp(styleRulePattern, 'g');
  var singleStyleRules = new RegExp(styleRulePattern);
  var allSelectors = new RegExp(selectorPattern, 'g');
  var singleSelector = new RegExp(selectorPattern);

  var glyphMap = {};
  nameIndex = nameIndex || 1;
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
            var name = selector.match(singleSelector)[nameIndex];
            glyphMap[name] = String.fromCharCode(charCode);
          });
        }
      });
    }
  });
  return glyphMap;
};

function generateIconSet(componentName, cssFiles, fontFile, fontFamily, selectorPattern) {
  var glyphMap = extractGlyphMapFromCss(cssFiles, selectorPattern);
  // Save glypMap as JSON for use in the component
  fs.writeFileSync(
    path.join(glyphMapDestination, componentName + '.json'),
    JSON.stringify(glyphMap, null, '  ')
  );

  // Copy font file for easy access
  fs.createReadStream(fontFile)
    .pipe(fs.createWriteStream(path.join(fontDestination, componentName + '.ttf')));

  // Generate component from our simple template
  var template = fs.readFileSync('./iconSetTemplate.js', { encoding: 'utf8' });
  var component = template.replace(/\{componentName\}/g, componentName).replace(/\{fontFamily\}/g, fontFamily);
  fs.writeFileSync(path.join(__dirname, componentName + '.js'), component);
};

var sources = require('./build-sources.json');
sources.forEach(function(options) {
  generateIconSet(
    options.componentName,
    options.cssFiles,
    options.fontFile,
    options.fontFamily,
    options.selectorPattern
  );
});
