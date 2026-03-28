const { withInfoPlist } = require('@expo/config-plugins');

module.exports = (config) =>
  withInfoPlist(config, (c) => {
    const fonts = ['fa-brands-400.ttf'];

    c.ios.infoPlist.UIAppFonts = [...new Set([...(c.ios.infoPlist.UIAppFonts || []), ...fonts])];

    return c;
  });
