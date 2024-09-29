const { withInfoPlist } = require('@expo/config-plugins'); // eslint-disable-line import/no-extraneous-dependencies, @typescript-eslint/no-require-imports

module.exports = (config) =>
  // Add all our fonts to the plist
  withInfoPlist(config, (c) => {
    c.ios ||= {};
    c.ios.infoPlist ||= {};

    c.ios.infoPlist.UIAppFonts ||= [];

    // TODO can we generatr this list?
    const fonts = [
      'AntDesign.ttf',
      'Entypo.ttf',
      'EvilIcons.ttf',
      'Feather.ttf',
      'FontAwesome.ttf',
      'FontAwesome5_Brands.ttf',
      'FontAwesome5_Regular.ttf',
      'FontAwesome5_Solid.ttf',
      'FontAwesome6_Brands.ttf',
      'FontAwesome6_Regular.ttf',
      'FontAwesome6_Solid.ttf',
      'Fontisto.ttf',
      'Foundation.ttf',
      'Ionicons.ttf',
      'MaterialDesignIcons.ttf',
      'MaterialIcons.ttf',
      'Octicons.ttf',
      'SimpleLineIcons.ttf',
      'Zocial.ttf',
      'fontello.ttf',
      'icomoon.ttf',
    ];

    fonts.forEach((font) => c.ios.infoPlist.UIAppFonts.push(font));

    return config;
  });
