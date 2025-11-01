import fs from 'node:fs';

import postcss from 'postcss';
import parser from 'postcss-selector-parser';

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

const extractGlyphMapFromCss = (fileName: string, selectorPrefix: string) => {
  const css = fs.readFileSync(fileName, 'utf-8');
  const glyphMap: Record<string, number> = {};

  const selectorPattern = `${escapeRegExp(selectorPrefix)}([A-Za-z0-9_-]+)::?before`;
  postcss.parse(css).walkRules((rule) => {
    const iconNames: string[] = [];
    const transform = (selectors: parser.Root) => {
      selectors.walk((selector) => {
        const md = selector.toString().match(selectorPattern);
        if (md?.[1]) {
          iconNames.push(md[1]);
        }
      });
    };

    parser(transform).processSync(rule.selector);

    const contents: string[] = [];
    rule.walkDecls('content', (decl) => {
      const content = decl.value.replace(/['"]/g, ''); // Remove quotes
      contents.push(content);
    });

    const content = contents[0];
    if (!content || content === 'var(--fa)') {
      return;
    }
    const codePoint = Number.parseInt(content.slice(1), 16);

    iconNames.forEach((iconName) => {
      glyphMap[iconName] = codePoint;
    });
  });

  // TODO: Quick hack for fontawesome - refactor this to be more general
  const selectorPatternFA = `${escapeRegExp(selectorPrefix)}([A-Za-z0-9_-]+)$`;
  postcss.parse(css).walkRules((rule) => {
    const iconNames: string[] = [];
    const transform = (selectors: parser.Root) => {
      selectors.walk((selector) => {
        const md = selector.toString().match(selectorPatternFA);
        if (md?.[1]) {
          iconNames.push(md[1]);
        }
      });
    };

    parser(transform).processSync(rule.selector);

    const contents: string[] = [];
    rule.walkDecls('--fa', (decl) => {
      const content = decl.value.replace(/^['"]/g, '').replace(/['"]$/g, ''); // Remove quotes
      if (content.length === 2 && content[0] === '\\') {
        contents.push(content.at(1) || '');
      } else {
        contents.push(content);
      }
    });

    const content = contents[0];
    if (!content) {
      return;
    }
    let codePoint = Number.parseInt(content.slice(1), 16);
    if (Number.isNaN(codePoint)) {
      codePoint = content.codePointAt(0) || 0;
    }

    iconNames.forEach((iconName) => {
      glyphMap[iconName] = codePoint;
    });
  });

  return glyphMap;
};

const escapeRegExp = (str: string) => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

export const generateGlyphmap = (mode: 'css' | 'codepoints', fileName: string, selectorPrefix = '.icon-') => {
  if (!fileName) {
    throw new Error('No files provided');
  }
  const glyphMap =
    mode === 'css' ? extractGlyphMapFromCss(fileName, selectorPrefix) : extractGlyphMapFromCodepoints(fileName);

  return JSON.stringify(glyphMap, null, '  ');
};
