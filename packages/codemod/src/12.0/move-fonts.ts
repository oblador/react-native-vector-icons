/* eslint-disable no-console */

import fs, { mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';

const moveableFonts: Record<string, string> = {
  'FontAwesome5_Pro_Light.ttf': 'fontawesome5-pro',
  'FontAwesome5_Pro_Brands.ttf': 'fontawesome5-pro',
  'FontAwesome5Pro_Brands.ttf': 'fontawesome5-pro',
  'FontAwesome5_Pro_Regular.ttf': 'fontawesome5-pro',
  'FontAwesome5_Pro_Solid.ttf"': 'fontawesome5-pro',
  'FontAwesome6_Pro_Light.ttf': 'fontawesome5-pro',
  'FontAwesome6_Pro_Brands.ttf': 'fontawesome6-pro',
  'FontAwesome6_Pro_Regular.ttf': 'fontawesome6-pro',
  'FontAwesome6_Pro_Solid.ttf': 'fontawesome6-pro',
  'FontAwesome6_Pro_Duotone.ttf': 'fontawesome6-pro',
  'FontAwesome6_Pro_Thin.ttf': 'fontawesome6-pro',
  'FontAwesome6_Pro_Sharp_Solid.ttf': 'fontawesome6-pro',
  'FontAwesome6_Pro_Sharp_Light.ttf': 'fontawesome6-pro',
  'FontAwesome6_Pro_Sharp_Regular.ttf': 'fontawesome6-pro',
};

export default (rootDir: string) => {
  const packageJsonPath = path.join(rootDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  const rnviConfig = packageJson.reactNativeVectorIcons || { fontDir: 'rnvi-fonts' };
  const fontDir = rnviConfig.fontDir || 'rnvi-fonts';

  const files = readdirSync(fontDir);

  console.log('Moving Pro fonts');

  files.forEach((file) => {
    const fontPath = path.join(fontDir, file);
    const dir = moveableFonts[file];
    if (!dir) {
      console.log(` - Skipping ${file}`);

      return;
    }

    console.log(` - Moving ${file} to ${dir}`);
    mkdirSync(path.join(fontDir, dir), { recursive: true });
    fs.renameSync(fontPath, `${fontDir}/${dir}/${file}`);
  });
};
