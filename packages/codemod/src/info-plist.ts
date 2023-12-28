import fs from 'node:fs';
import { execSync } from 'node:child_process';
import plist from 'plist';

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
  const file = execSync('find ios -name Info.plist | grep -v Tests').toString().trim();
  const obj = plist.parse(fs.readFileSync(file, 'utf8')) as { UIAppFonts: string[] }

  // delete fonts that match list
  obj.UIAppFonts = obj.UIAppFonts.filter((font) => !fonts.includes(font));

  fs.writeFileSync(file, plist.build(obj));
};
