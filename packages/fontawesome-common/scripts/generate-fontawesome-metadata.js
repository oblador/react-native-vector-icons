#!/usr/bin/env node

// TODO: Rewrite this script in TypeScript

const fs = require('node:fs'); // eslint-disable-line @typescript-eslint/no-require-imports
const yargs = require('yargs'); // eslint-disable-line @typescript-eslint/no-require-imports,import/no-extraneous-dependencies

const { argv } = yargs
  .usage('')
  .option('path', {
    alias: 'p',
    string: true,
  })
  .option('output', {
    alias: 'o',
    string: true,
  })
  .demandOption('path')
  .demandOption('output');

const path = `${argv.path}/svgs/`;

const mapFamily = (family) => {
  switch (family) {
    case 'brands':
      return 'brand';
    case 'sharp-thin':
      return 'sharpThin';
    case 'sharp-light':
      return 'sharpLight';
    case 'sharp-regular':
      return 'sharp';
    case 'sharp-solid':
      return 'sharpSolid';
    default:
      return family;
  }
};

const generatedJSON = {};
fs.readdirSync(path)
  .filter((file) => fs.statSync(path + file).isDirectory())
  .forEach((file) => {
    const icons = fs.readdirSync(path + file);
    const name = mapFamily(file);

    generatedJSON[name] = icons.map((icon) => icon.split('.')[0]);
  });

fs.writeFileSync(argv.output, `${JSON.stringify(generatedJSON, null, 2)}\r\n`, 'utf8');

const glyphMaps = {};
const iconTypes = Object.keys(generatedJSON);
const mainMapFilename = argv.output.replace('_meta', '');
const mainMap = JSON.parse(fs.readFileSync(mainMapFilename, 'utf8'));

iconTypes.forEach((iconType) => {
  const glyphs = generatedJSON[iconType];
  glyphMaps[iconType] = {};
  glyphs.forEach((glyph) => {
    glyphMaps[iconType][glyph] = mainMap[glyph];
  });

  fs.writeFileSync(argv.output.replace('_meta', `_${iconType}`), JSON.stringify(glyphMaps[iconType]), 'utf8');
});
