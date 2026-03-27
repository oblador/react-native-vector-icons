const { withInfoPlist } = require('@expo/config-plugins');

module.exports = (config) =>
  withInfoPlist(config, (c) => {
    const fonts = ['FontAwesome.ttf'];

    c.ios.infoPlist.UIAppFonts = [...new Set([...(c.ios.infoPlist.UIAppFonts || []), ...fonts])];

    return c;
  });
