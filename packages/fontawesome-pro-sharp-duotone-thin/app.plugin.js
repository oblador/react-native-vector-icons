/* eslint-env node */
const { withInfoPlist } = require('@expo/config-plugins'); // eslint-disable-line import/no-extraneous-dependencies, @typescript-eslint/no-require-imports
const fs = require('node:fs'); // eslint-disable-line @typescript-eslint/no-require-imports
const path = require('node:path'); // eslint-disable-line @typescript-eslint/no-require-imports

module.exports = (config) =>
  withInfoPlist(config, (c) => {
    const projectRoot = c.modRequest.projectRoot;
    const appPkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf-8'));
    const fontDirName = appPkg.reactNativeVectorIcons?.fontDir || 'rnvi-fonts';
    const fontsDir = path.join(projectRoot, fontDirName, 'fontawesome-pro-sharp-duotone-thin');
    if (!fs.existsSync(fontsDir)) {
      throw new Error(
        `Custom fonts directory not found at ${fontsDir}. ` +
        `See the package README for setup instructions.`
      );
    }

    const fonts = fs.readdirSync(fontsDir).filter((f) => f.endsWith('.ttf'));
    if (fonts.length === 0) {
      throw new Error(
        `No .ttf fonts found in ${fontsDir}. ` +
        `See the package README for setup instructions.`
      );
    }

    c.ios.infoPlist.UIAppFonts = [
      ...new Set([...(c.ios.infoPlist.UIAppFonts || []), ...fonts]),
    ];

    return c;
  });
