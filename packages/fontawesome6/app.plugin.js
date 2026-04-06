const { withInfoPlist } = require('@expo/config-plugins');

module.exports = (config) =>
  withInfoPlist(config, (c) => {
    const fonts = ['FontAwesome6_Regular.ttf', 'FontAwesome6_Solid.ttf', 'FontAwesome6_Brands.ttf'];

    c.modResults.UIAppFonts = [...new Set([...(c.modResults.UIAppFonts || []), ...fonts])];

    return c;
  });
