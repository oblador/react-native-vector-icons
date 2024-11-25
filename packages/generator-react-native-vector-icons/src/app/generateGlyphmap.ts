import fs from 'node:fs';

const extractGlyphMapFromCodepoints = (fileName: string) => {
  const codepoints = fs.readFileSync(fileName, { encoding: 'utf8' }).split('\n');

  const glyphMap: Record<string, number> = {};

  codepoints.forEach((point) => {
    const parts = point.split(' ');
    if (parts[0] && parts[1]) {
      glyphMap[parts[0].replace(/_/g, '-')] = Number.parseInt(parts[1], 16);
    }
  });

  return glyphMap;
};

const extractGlyphMapFromCss = (files: string[], selectorPattern: string) => {
  const styleRulePattern =
    '(\\.[A-Za-z0-9_.:, \\n\\t-]+)\\{[^}]*(?:content|--fa): ?["\\\'](?:\\\\([A-Fa-f0-9]+)|([^"\\\']+))["\\\'][^}]*\\}';
  const allStyleRules = new RegExp(styleRulePattern, 'g');
  const singleStyleRules = new RegExp(styleRulePattern);
  const allSelectors = new RegExp(selectorPattern, 'g');
  const singleSelector = new RegExp(selectorPattern);

  const extractGlyphFromRule = (rule: string) => {
    const ruleParts = rule.match(singleStyleRules);
    if (!ruleParts) {
      throw new Error('WTF: unpossible');
    }

    if (ruleParts[2]) {
      // Hex value in CSS
      return Number.parseInt(ruleParts[2], 16);
    }

    if (!ruleParts[3]) {
      throw new Error('WTF: unpossible no ruleParts[3]');
    }

    if (ruleParts[3].length > 1) {
      // String value in CSS that we'll keep as a string because it's not a single character
      return ruleParts[3];
    }

    // String value in CSS that we'll convert to a charcode
    return ruleParts[3].charCodeAt(0);
  };

  const extractSelectorsFromRule = (rule: string) => {
    const ruleParts = rule.match(singleStyleRules);
    if (!ruleParts) {
      throw new Error('WTF: unpossible');
    }

    const selectors = ruleParts[1]?.match(allSelectors) || [];
    return selectors.map((selector) => selector.match(singleSelector)?.[1]);
  };

  return files
    .map((fileName) => fs.readFileSync(fileName, { encoding: 'utf8' }))
    .map((contents) => contents.match(allStyleRules) || [])
    .reduce((acc: string[], rules) => acc.concat(rules), [])
    .map((rule) => {
      const glyph = extractGlyphFromRule(rule);
      const selectors = extractSelectorsFromRule(rule);
      return selectors.map((selector) => [selector, glyph]);
    })
    .reduce((acc, glyphs) => Object.assign(acc, Object.fromEntries(glyphs)), {});
};

const escapeRegExp = (str: string) => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

export const generateGlyphmap = (mode: 'css' | 'codepoints', files: string[], selectorPrefix = '.icon-') => {
  if (!files[0]) {
    throw new Error('No files provided');
  }
  const selectorPattern = `${escapeRegExp(selectorPrefix)}([A-Za-z0-9_-]+)(?:::?before)?`;
  const glyphMap =
    mode === 'css' ? extractGlyphMapFromCss(files, selectorPattern) : extractGlyphMapFromCodepoints(files[0]);

  return JSON.stringify(glyphMap, null, '  ');
};
