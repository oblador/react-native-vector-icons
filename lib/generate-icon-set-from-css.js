const fs = require('fs');

function extractGlyphMapFromCss(files, selectorPattern) {
  const styleRulePattern =
    '(\\.[A-Za-z0-9_.:, \\n\\t-]+)\\{[^}]*content: ?["\\\'](?:\\\\([A-Fa-f0-9]+)|([^"\\\']+))["\\\'][^}]*\\}';
  const allStyleRules = new RegExp(styleRulePattern, 'g');
  const singleStyleRules = new RegExp(styleRulePattern);
  const allSelectors = new RegExp(selectorPattern, 'g');
  const singleSelector = new RegExp(selectorPattern);

  const extractGlyphFromRule = rule => {
    const ruleParts = rule.match(singleStyleRules);
    if (ruleParts[2]) {
      // Hex value in CSS
      return parseInt(ruleParts[2], 16);
    }
    if (ruleParts[3].length > 1) {
      // String value in CSS that we'll keep as a string because it's not a single character
      return ruleParts[3];
    }
    // String value in CSS that we'll convert to a charcode
    return ruleParts[3].charCodeAt();
  };

  const extractSelectorsFromRule = rule => {
    const ruleParts = rule.match(singleStyleRules);
    const selectors = ruleParts[1].match(allSelectors) || [];
    return selectors.map(selector => selector.match(singleSelector)[1]);
  };

  return (typeof files === 'string' ? [files] : files)
    .map(fileName => fs.readFileSync(fileName, { encoding: 'utf8' }))
    .map(contents => contents.match(allStyleRules) || [])
    .reduce((acc, rules) => acc.concat(rules), [])
    .map(rule => {
      const glyph = extractGlyphFromRule(rule);
      const selectors = extractSelectorsFromRule(rule);
      return selectors.map(selector => [selector, glyph]);
    })
    .reduce(
      (acc, glyphs) => Object.assign(acc, Object.fromEntries(glyphs)),
      {}
    );
}

function escapeRegExp(str) {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}

/**
 * @deprecated react-native-vector-icons package had moved to a new model of per-icon-family packages. See the https://github.com/oblador/react-native-vector-icons/blob/master/MIGRATION.md on how to migrate
 */
function generateIconSetFromCss(cssFiles, selectorPrefix, template, data = {}) {
  const glyphMap = extractGlyphMapFromCss(
    cssFiles,
    `${escapeRegExp(selectorPrefix)}([A-Za-z0-9_-]+)::?before`
  );
  const content = JSON.stringify(glyphMap, null, '  ');
  if (template) {
    const templateVariables = { glyphMap: content, ...data };
    return template.replace(/\${([^}]*)}/g, (_, key) => templateVariables[key]);
  }
  return content;
}

module.exports = generateIconSetFromCss;
