#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const { omit, getMIStyleFromCodepointsFile } = require('../lib/object-utils');

const { argv } = yargs
  .usage(
    'Usage: $0 [options] path/to/codepoints \nFor default template please provide --componentName and --fontFamily'
  )
  .demand(1)
  .describe('a', 'Add another codepoints file')
  .alias('a', 'addCodepoints')
  .default('t', path.resolve(__dirname, '..', 'templates/bundled-icon-set.tpl'))
  .describe('t', 'Template in JS template string format')
  .alias('t', 'template')
  .describe('o', 'Save output to file, defaults to STDOUT')
  .alias('o', 'output')
  .describe('g', 'Save glyphmap JSON to file')
  .alias('g', 'glyphmap');

function extractGlyphMapFromCodepoints(files) {
  const glyphMap = {};

  files.forEach(filePath => {
    const codepoints = fs
      .readFileSync(filePath, { encoding: 'utf8' })
      .split('\n');

    const styleName = getMIStyleFromCodepointsFile(filePath);

    /**
     * For MaterialIcons, the glyphmap must have the codepoints for
     * each style. This is because some icons may exist in one style
     * and not exist in another. Another problem is that even if an
     * icon is present in all styles, the icon's codepoint changes
     * for each style.
     */
    for (let i = 0; i < codepoints.length; i += 1) {
      const parts = codepoints[i].split(' ');
      if (parts.length === 2) {
        const glyphKey = parts[0].replace(/_/g, '-');
        if (glyphMap[styleName] === undefined) {
          glyphMap[styleName] = {};
        }
        if (glyphMap[styleName][glyphKey] === undefined) {
          glyphMap[styleName][glyphKey] = parseInt(parts[1], 16);
        }
      }
    }
  });

  return glyphMap;
}

const addCodepoints = [argv._[0]];
if (argv.addCodepoints) {
  addCodepoints.push(...argv.addCodepoints);
}

let template;
if (argv.template) {
  template = fs.readFileSync(argv.template, { encoding: 'utf8' });
}

const data = omit(
  argv,
  '_ $0 a addCodepoints add-codepoints o output t template g glyphmap'.split(
    ' '
  )
);
const glyphMap = extractGlyphMapFromCodepoints(addCodepoints);

let content = JSON.stringify(glyphMap, null, '  ');
if (template) {
  const templateVariables = { glyphMap: content, ...data };
  content = template.replace(
    /\${([^}]*)}/g,
    (_, key) => templateVariables[key]
  );
}

if (argv.output) {
  fs.writeFileSync(argv.output, content);
} else {
  console.log(content);
}

if (argv.glyphmap) {
  fs.writeFileSync(argv.glyphmap, JSON.stringify(glyphMap, null, '  '));
}
