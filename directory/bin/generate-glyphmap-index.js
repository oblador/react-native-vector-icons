#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const glypmapDirectory = path.resolve(__dirname, '../../glyphmaps');
const glypmapExtension = '.json';

const fontAwesomeGlyphmap = require(path.join(
  glypmapDirectory,
  'FontAwesome5Free.json'
));
const fontAwesomeMeta = require(path.join(
  glypmapDirectory,
  'FontAwesome5Free_meta.json'
));
const pickGlyps = (glyps, glyphmap) =>
  glyps.reduce((acc, glyp) => {
    acc[glyp] = glyphmap[glyp];
    return acc;
  }, {});

const index = fs
  .readdirSync(glypmapDirectory)
  .filter(f => path.extname(f) === glypmapExtension)
  .filter(f => !f.startsWith('FontAwesome5'))
  .reduce(
    (acc, file) => {
      const name = path.basename(file, glypmapExtension);
      acc[name] = require(path.join(glypmapDirectory, file));
      return acc;
    },
    {
      FontAwesome5: pickGlyps(fontAwesomeMeta.solid, fontAwesomeGlyphmap),
      FontAwesome5Brands: pickGlyps(
        fontAwesomeMeta.brands,
        fontAwesomeGlyphmap
      ),
    }
  );

process.stdout.write(JSON.stringify(index, null, 2));
