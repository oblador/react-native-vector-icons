const path = require('path');

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  // For monorepo
  resolver: {
    unstable_enableSymlinks: true
  },
  watchFolders: [
    path.resolve(__dirname, '../../node_modules'),

    path.resolve(__dirname, '../common'),

    path.resolve(__dirname, '../ant-design'),
    path.resolve(__dirname, '../entypo'),
    path.resolve(__dirname, '../evil-icons'),
    path.resolve(__dirname, '../feather'),
    path.resolve(__dirname, '../fontawesome'),
    path.resolve(__dirname, '../fontawesome5'),
    path.resolve(__dirname, '../fontawesome6'),
    path.resolve(__dirname, '../fontello'),
    path.resolve(__dirname, '../fontisto'),
    path.resolve(__dirname, '../foundation'),
    path.resolve(__dirname, '../icomoon'),
    path.resolve(__dirname, '../ionicons'),
    path.resolve(__dirname, '../material-design-icons'),
    path.resolve(__dirname, '../material-symbols'),
    path.resolve(__dirname, '../octicons'),
    path.resolve(__dirname, '../simple-line-icons'),
    path.resolve(__dirname, '../zocial'),
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
