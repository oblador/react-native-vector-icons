#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const glypmapDirectory = path.resolve(__dirname, '../../glyphmaps');
const glypmapExtension = '.json';

const fontAwesome5Glyphmap = require(path.join(
  glypmapDirectory,
  'FontAwesome5Free.json'
));
const fontAwesome5Meta = require(path.join(
  glypmapDirectory,
  'FontAwesome5Free_meta.json'
));

const fontAwesome6Glyphmap = require(path.join(
  glypmapDirectory,
  'FontAwesome6Free.json'
));
const fontAwesome6Meta = require(path.join(
  glypmapDirectory,
  'FontAwesome6Free_meta.json'
));

const pickGlyps = (glyps, glyphmap) =>
  glyps.reduce((acc, glyp) => {
    acc[glyp] = glyphmap[glyp];
    return acc;
  }, {});

const index = fs
  .readdirSync(glypmapDirectory)
  .filter(
    f =>
      path.extname(f) === glypmapExtension &&
      !(f.startsWith('FontAwesome5') || f.startsWith('FontAwesome6'))
  )
  .reduce(
    (acc, file) => {
      const name = path.basename(file, glypmapExtension);
      acc[name] = require(path.join(glypmapDirectory, file));
      return acc;
    },
    {
      FontAwesome5: pickGlyps(fontAwesome5Meta.solid, fontAwesome5Glyphmap),
      FontAwesome5Brands: pickGlyps(
        fontAwesome5Meta.brands,
        fontAwesome5Glyphmap
      ),
      FontAwesome6: pickGlyps(fontAwesome6Meta.solid, fontAwesome6Glyphmap),
      FontAwesome6Brands: pickGlyps(
        fontAwesome6Meta.brands,
        fontAwesome6Glyphmap
      ),
    }
  );

process.stdout.write(JSON.stringify(index, null, 2));
