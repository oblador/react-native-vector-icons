/* eslint-disable no-console */

import { execSync } from 'node:child_process';
import fs from 'node:fs';

const deletableFonts = [
  'AntDesign.ttf',
  'Entypo.ttf',
  'EvilIcons.ttf',
  'Feather.ttf',
  'FontAwesome5_Brands.ttf',
  'FontAwesome5_Regular.ttf',
  'FontAwesome5_Solid.ttf',
  'FontAwesome6_Brands.ttf',
  'FontAwesome6_Regular.ttf',
  'FontAwesome6_Solid.ttf',
  'FontAwesome.ttf',
  'Fontisto.ttf',
  'Foundation.ttf',
  'Ionicons.ttf',
  'MaterialCommunityIcons.ttf',
  'MaterialIcons.ttf',
  'Octicons.ttf',
  'SimpleLineIcons.ttf',
  'Zocial.ttf',
];

const moveableFonts = [
  'FontAwesome5_Pro_Light.ttf',
  'FontAwesome5_Pro_Brands.ttf',
  'FontAwesome5Pro_Brands.ttf',
  'FontAwesome5_Pro_Regular.ttf',
  'FontAwesome5_Pro_Solid.ttf"',
  'FontAwesome6_Pro_Light.ttf',
  'FontAwesome6_Pro_Brands.ttf',
  'FontAwesome6_Pro_Regular.ttf',
  'FontAwesome6_Pro_Solid.ttf',
  'FontAwesome6_Pro_Duotone.ttf',
  'FontAwesome6_Pro_Thin.ttf',
  'FontAwesome6_Pro_Sharp_Solid.ttf',
  'FontAwesome6_Pro_Sharp_Light.ttf',
  'FontAwesome6_Pro_Sharp_Regular.ttf',
];

export default () => {
  const files = execSync('find android/app/src/main/assets/fonts -name "*.ttf"')
    .toString()
    .split('\n')
    .map((line) => line.trim());

  console.log('Removing unused fonts');
  const toDelete = files.filter((file) => deletableFonts.includes(file.replace(/.*\//, '')));
  toDelete.forEach((file) => {
    console.log(` - Removing ${file}`);
    fs.rmSync(file);
  });

  console.log('Moving Pro fonts');

  const toMove = files.filter((file) => moveableFonts.includes(file.replace(/.*\//, '')));
  fs.mkdirSync('rnvi-fonts', { recursive: true });
  toMove.forEach((file) => {
    console.log(` - Removing ${file}`);
    fs.renameSync(file, `rnvi-fonts/${file.replace(/.*\//, '')}`);
  });
};
