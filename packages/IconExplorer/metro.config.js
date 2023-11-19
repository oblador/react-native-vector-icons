const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require("path");

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
    path.resolve(__dirname, '../fontisto')
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
