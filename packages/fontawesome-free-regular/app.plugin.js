const { withInfoPlist } = require('@expo/config-plugins');

module.exports = (config) =>
  withInfoPlist(config, (c) => {
    const fonts = ['fa-regular-400.ttf'];

    c.modResults.UIAppFonts = [...new Set([...(c.modResults.UIAppFonts || []), ...fonts])];

    return c;
  });
