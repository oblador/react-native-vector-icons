#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

/* eslint-disable import/no-dynamic-require */
const json = require(path.resolve('./package.json'));

if (!json.rnpm) {
  json.rnpm = {
    assets: [],
  };
} else if (!json.rnpm.assets) {
  json.rnpm.assets = [];
}

if (json.rnpm.assets.indexOf('./assets/fonts') !== -1) process.exit();

json.rnpm.assets.push('./assets/fonts');

fs.writeFileSync(
  './package.json',
  `${JSON.stringify(json, null, 2)}\r\n`,
  'utf8'
);
