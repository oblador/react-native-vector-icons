const { withInfoPlist } = require('@expo/config-plugins');

// Add all our fonts to the plist
// installing the library makes sure that the font resource is copied into the app bundle
// but we still need to add it to plist
module.exports = (config) =>
  withInfoPlist(config, (c) => {
    c.ios ||= {};
    c.ios.infoPlist ||= {};

    c.ios.infoPlist.UIAppFonts ||= [];

    // TODO can we generate this list?
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
      'Lucide.ttf',
      // FontAwesome 5 Pro (custom fonts from rnvi-fonts/fontawesome5-pro/)
      'FontAwesome5_Pro_Brands.ttf',
      'FontAwesome5_Pro_Duotone.ttf',
      'FontAwesome5_Pro_Light.ttf',
      'FontAwesome5_Pro_Regular.ttf',
      'FontAwesome5_Pro_Solid.ttf',
      // FontAwesome 6 Pro (custom fonts from rnvi-fonts/fontawesome6-pro/)
      'FontAwesome6_Pro_Brands.ttf',
      'FontAwesome6_Pro_Duotone.ttf',
      'FontAwesome6_Pro_Light.ttf',
      'FontAwesome6_Pro_Regular.ttf',
      'FontAwesome6_Pro_Sharp_Light.ttf',
      'FontAwesome6_Pro_Sharp_Regular.ttf',
      'FontAwesome6_Pro_Sharp_Solid.ttf',
      'FontAwesome6_Pro_Sharp_Thin.ttf',
      'FontAwesome6_Pro_Solid.ttf',
      'FontAwesome6_Pro_Thin.ttf',
    ];

    fonts.forEach((font) => {
      c.ios.infoPlist.UIAppFonts.push(font);
    });

    return c;
  });
