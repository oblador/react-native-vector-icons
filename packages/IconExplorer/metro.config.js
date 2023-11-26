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

    path.resolve(__dirname, '../antdesign'),
    path.resolve(__dirname, '../entypo'),
    path.resolve(__dirname, '../evilicons'),
    path.resolve(__dirname, '../feather'),
    path.resolve(__dirname, '../fontawesome'),
    path.resolve(__dirname, '../fontawesome5'),
    path.resolve(__dirname, '../fontawesome6'),
    path.resolve(__dirname, '../fontello'),
    path.resolve(__dirname, '../fontisto'),
    path.resolve(__dirname, '../foundation'),
    path.resolve(__dirname, '../icomoon'),
    path.resolve(__dirname, '../ionicons'),
    path.resolve(__dirname, '../materialcommunityicons'),
    path.resolve(__dirname, '../materialicons'),
    path.resolve(__dirname, '../octicons'),
    path.resolve(__dirname, '../simplelineicons'),
    path.resolve(__dirname, '../zocial'),
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
