const { withInfoPlist } = require('@expo/config-plugins');

module.exports = (config) =>
  withInfoPlist(config, (c) => {
    const fonts = ['Lucide.ttf'];

    c.modResults.UIAppFonts = [...new Set([...(c.modResults.UIAppFonts || []), ...fonts])];

    return c;
  });
