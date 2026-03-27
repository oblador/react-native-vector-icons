const { withInfoPlist } = require('@expo/config-plugins');

module.exports = (config) =>
  withInfoPlist(config, (c) => {
    const fonts = ['FontAwesome5_Regular.ttf', 'FontAwesome5_Solid.ttf', 'FontAwesome5_Brands.ttf'];

    c.ios.infoPlist.UIAppFonts = [...new Set([...(c.ios.infoPlist.UIAppFonts || []), ...fonts])];

    return c;
  });
