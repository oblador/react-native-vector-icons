#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');

const json = fs.readFileSync('package.json', 'utf8');

const pack = JSON.parse(json);

if (!pack.rnpm) {
  pack.rnpm = {
    assets: [],
  };
} else if (!pack.rnpm.assets) {
  pack.rnpm.assets = [];
}

if (pack.rnpm.assets.indexOf('./assets/fonts') !== 0) process.exit();

pack.rnpm.assets.push('./assets/fonts');

fs.writeFileSync('package.json', JSON.stringify(pack, null, 2), 'utf8');
