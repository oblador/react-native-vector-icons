#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');
const yargs = require('yargs');

const { argv } = yargs
  .usage('Usage: $0 [icons...]')
  .help();

const icons = argv._;
for (let i = 0; i < icons.length; ++i) {
  const icon = icons[i];
  let mapFile = icon;
  if (mapFile === 'FontAwesome5') {
    mapFile = 'FontAwesome5Free'
  }

  const glyphmap = JSON.parse(fs.readFileSync(`glyphmaps/${mapFile}.json`, { encoding: 'utf8' }));
  const names = Object.keys(glyphmap).join("': number,\n  '");

  const glyphTypeDef = `/**
 * @flow strict
 */

export type ${icon}Glyphs = {|
  '${names}': number
|};
`;
  fs.writeFileSync(`glyphmaps/${mapFile}.js.flow`, glyphTypeDef);

  const iconClass = `/**
 * @flow strict
 */

import type { IconClass } from './index';
import type { ${icon}Glyphs } from './glyphmaps/${mapFile}';

type Icon = IconClass<${icon}Glyphs>;

declare export default Icon;
`;
  fs.writeFileSync(`${icon}.js.flow`, iconClass);
}
