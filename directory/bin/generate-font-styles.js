#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const customFontMap = {
  'FontAwesome5_Solid.ttf': 'FontAwesome5',
  'FontAwesome5_Brands.ttf': 'FontAwesome5Brands',
};

const fontDirectory = path.resolve(__dirname, '../../Fonts');
const fontExtension = '.ttf';
const styles = fs
  .readdirSync(fontDirectory)
  .filter(f => path.extname(f) === fontExtension)
  .map(file => ({
    file,
    fontFamily: customFontMap[file] || path.basename(file, fontExtension),
  }))
  .map(
    ({ file, fontFamily }) => `
@font-face {
  font-family: '${fontFamily}';
  src: url('./fonts/${file}') format('truetype');
}
`
  )
  .join('\n');

process.stdout.write(styles);
