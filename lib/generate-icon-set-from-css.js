/**
 * @providesModule generateIconSetFromCss
 */
'use strict';
var _ = require('lodash');
var fs = require('fs');

function extractGlyphMapFromCss(files, selectorPattern) {
  var styleRulePattern = '(\\.[A-Za-z0-9_.:, \\n\\t-]+)\\{[^}]*content: ?["\\\']\\\\([A-Fa-f0-9]+)["\\\'][^}]*\\}';
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

function generateIconSetFromCss(cssFiles, selectorPrefix, iconTemplate, glyphMapTemplate, data, extractGlyphMap = extractGlyphMapFromCss) {
  var glyphMap;
  if (extractGlyphMap === extractGlyphMapFromCss) {
    var glyphMap = extractGlyphMap(cssFiles, escapeRegExp(selectorPrefix) + '([A-Za-z0-9_-]+):before');
  } else {
    var glyphMap = extractGlyphMap(cssFiles[0]);
  }
  var compiledIconTemplate = _.template(iconTemplate);
  var compiledGlyphMapTemplate = _.template(glyphMapTemplate);

  data = data || {};
  data.glyphMap = JSON.stringify(glyphMap, null, '  ');

  return {
    iconComponent: compiledIconTemplate(data),
    glyphMap: compiledGlyphMapTemplate(data),
  };
};

module.exports = generateIconSetFromCss;
