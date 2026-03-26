/* eslint-env node */
const { withInfoPlist } = require('@expo/config-plugins'); // eslint-disable-line import/no-extraneous-dependencies, @typescript-eslint/no-require-imports

module.exports = (config) =>
  withInfoPlist(config, (c) => {
    const fonts = ['AntDesign.ttf'];

    c.ios.infoPlist.UIAppFonts = [
      ...new Set([...(c.ios.infoPlist.UIAppFonts || []), ...fonts]),
    ];

    return c;
  });
