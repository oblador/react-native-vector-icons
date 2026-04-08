/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Make your changes in `generator-react-native-vector-icons` package instead.
 */

const { withInfoPlist } = require('@expo/config-plugins');
const fs = require('node:fs');
const path = require('node:path');

module.exports = (config) =>
  withInfoPlist(config, (c) => {
    const projectRoot = c.modRequest.projectRoot;
    const appPkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf-8'));
    const fontDirName = appPkg.reactNativeVectorIcons?.fontDir || 'rnvi-fonts';
    const fontsDir = path.join(projectRoot, fontDirName, 'fontawesome-pro-duotone-thin');
    if (!fs.existsSync(fontsDir)) {
      throw new Error(
        `Custom fonts directory not found at ${fontsDir}. See the package README for setup instructions.`,
      );
    }

    const fonts = fs.readdirSync(fontsDir).filter((f) => f.endsWith('.ttf'));
    if (fonts.length === 0) {
      throw new Error(`No .ttf fonts found in ${fontsDir}. See the package README for setup instructions.`);
    }

    c.modResults.UIAppFonts = [...new Set([...(c.modResults.UIAppFonts || []), ...fonts])];

    return c;
  });
