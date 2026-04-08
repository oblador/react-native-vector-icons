/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Make your changes in `generator-react-native-vector-icons` package instead.
 */

const { withInfoPlist } = require('@expo/config-plugins');

module.exports = (config) =>
  withInfoPlist(config, (c) => {
    const fonts = ['MaterialDesignIcons.ttf'];

    c.modResults.UIAppFonts = [...new Set([...(c.modResults.UIAppFonts || []), ...fonts])];

    return c;
  });
