#!/usr/bin/env node

const path = require('path');
const { globSync } = require('glob');

const customFontMap = {
  'FontAwesome5_Solid.ttf': 'FontAwesome5',
  'FontAwesome5_Brands.ttf': 'FontAwesome5Brands',
  'FontAwesome6_Solid.ttf': 'FontAwesome6',
  'FontAwesome6_Brands.ttf': 'FontAwesome6Brands',
};

const fontFiles = globSync('src/generated/fonts/*.ttf');

const styles = fontFiles
  .map((file) => path.basename(file))
  .map((file) => ({
    file,
    fontFamily: customFontMap[file] || path.basename(file, '.ttf'),
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
