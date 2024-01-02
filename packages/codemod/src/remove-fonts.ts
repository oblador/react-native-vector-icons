import fs from 'node:fs';
import { execSync } from 'node:child_process';

const fonts = [
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
  console.log('Removing unused fonts');
  const files = execSync('find android/app/src/main/assets/fonts -name "*.ttf"').toString().split("\n").map((line)=> line.trim());

  const toDelete = files.filter((file) => fonts.includes(file.replace(/.*\//, '')));

  toDelete.forEach((file) => {
    console.log(` - Removing ${file}`);
    fs.rmSync(file);
  });
};
