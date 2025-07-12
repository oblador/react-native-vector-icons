#!/usr/bin/env -S node --experimental-strip-types --disable-warning=ExperimentalWarning

import path from 'node:path';

import { globSync } from 'glob';

const glyphMapFiles = globSync('../*/glyphmaps/*.json', { ignore: '../fontawesome[56]*/**' });

const fontAwesome5Glyphmap = (
  await import(path.join(import.meta.dirname, '../../fontawesome5/glyphmaps/', 'FontAwesome5.json'), {
    with: { type: 'json' },
  })
).default;
const fontAwesome5Meta = (
  await import(path.join(import.meta.dirname, '../../fontawesome5/glyphmaps/', 'FontAwesome5_meta.json'), {
    with: { type: 'json' },
  })
).default;

const fontAwesome6Glyphmap = (
  await import(path.join(import.meta.dirname, '../../fontawesome6/glyphmaps/', 'FontAwesome6.json'), {
    with: { type: 'json' },
  })
).default;
const fontAwesome6Meta = (
  await import(path.join(import.meta.dirname, '../../fontawesome6/glyphmaps/', 'FontAwesome6_meta.json'), {
    with: { type: 'json' },
  })
).default;

const pickGlyps = (glyps: string[], glyphmap: Record<string, string[]>) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  glyps.reduce((acc, glyp) => {
    acc[glyp] = glyphmap[glyp];
    return acc;
  }, {});

const index: Record<string, unknown> = {
  FontAwesome5: pickGlyps(fontAwesome5Meta.solid, fontAwesome5Glyphmap),
  FontAwesome5Brands: pickGlyps(fontAwesome5Meta.brand, fontAwesome5Glyphmap),
  FontAwesome6: pickGlyps(fontAwesome6Meta.solid, fontAwesome6Glyphmap),
  FontAwesome6Brands: pickGlyps(fontAwesome6Meta.brand, fontAwesome6Glyphmap),
};

// eslint-disable-next-line no-restricted-syntax
for (const file of glyphMapFiles) {
  const name = path.basename(file, '.json');
  // eslint-disable-next-line no-await-in-loop
  const jsonModule = await import(path.join(import.meta.dirname, '..', file), {
    with: { type: 'json' },
  });

  index[name] = jsonModule.default;
}

process.stdout.write(JSON.stringify(index, null, 2));
