#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');
const yargs = require('yargs');

const { argv } = yargs.usage('Usage: $0 [icons...]').help();

const icons = argv._;
for (let i = 0; i < icons.length; i += 1) {
  const icon = icons[i];
  let mapFile = icon;
  if (mapFile === 'FontAwesome5') {
    mapFile = 'FontAwesome5Free';
  }

  const glyphmap = JSON.parse(
    fs.readFileSync(`glyphmaps/${mapFile}.json`, { encoding: 'utf8' })
  );
  const names = Object.keys(glyphmap).join("' | '");

  const iconClass = `/**
 * @flow strict
 */

import type { Icon } from './index';

export type ${icon}Glyphs = '${names}';

declare export default Class<Icon<${icon}Glyphs>>;
`;
  fs.writeFileSync(`${icon}.js.flow`, iconClass);
}
