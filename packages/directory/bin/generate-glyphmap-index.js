#!/usr/bin/env node

const path = require('node:path'); // eslint-disable-line @typescript-eslint/no-var-requires
const { globSync } = require('glob'); // eslint-disable-line @typescript-eslint/no-var-requires

const glyphMapFiles = globSync('../*/glyphmaps/*.json', { ignore: '../fontawesome[56]*/**' });

const fontAwesome5Glyphmap = require(path.join(__dirname, '../../fontawesome5/glyphmaps/', 'FontAwesome5.json')); // eslint-disable-line @typescript-eslint/no-var-requires,import/no-dynamic-require
const fontAwesome5Meta = require(path.join(__dirname, '../../fontawesome5/glyphmaps/', 'FontAwesome5_meta.json')); // eslint-disable-line @typescript-eslint/no-var-requires,import/no-dynamic-require

const fontAwesome6Glyphmap = require(path.join(__dirname, '../../fontawesome6/glyphmaps/', 'FontAwesome6.json')); // eslint-disable-line @typescript-eslint/no-var-requires,import/no-dynamic-require
const fontAwesome6Meta = require(path.join(__dirname, '../../fontawesome6/glyphmaps/', 'FontAwesome6_meta.json')); // eslint-disable-line @typescript-eslint/no-var-requires,import/no-dynamic-require

const pickGlyps = (glyps, glyphmap) =>
  glyps.reduce((acc, glyp) => {
    acc[glyp] = glyphmap[glyp];
    return acc;
  }, {});

const index = glyphMapFiles.reduce(
  (acc, file) => {
    const name = path.basename(file, '.json');
    acc[name] = require(path.join(__dirname, '..', file)); // eslint-disable-line @typescript-eslint/no-var-requires,import/no-dynamic-require,global-require
    return acc;
  },
  {
    FontAwesome5: pickGlyps(fontAwesome5Meta.solid, fontAwesome5Glyphmap),
    FontAwesome5Brands: pickGlyps(fontAwesome5Meta.brand, fontAwesome5Glyphmap),
    FontAwesome6: pickGlyps(fontAwesome6Meta.solid, fontAwesome6Glyphmap),
    FontAwesome6Brands: pickGlyps(fontAwesome6Meta.brand, fontAwesome6Glyphmap),
  },
);

process.stdout.write(JSON.stringify(index, null, 2));
