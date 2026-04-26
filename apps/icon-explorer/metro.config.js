const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = withUniwindConfig(getDefaultConfig(__dirname), {
  cssEntryFile: './src/global.css',
  dtsFile: './src/uniwind-types.d.ts',
});

config.transformer.babelTransformerPath = require.resolve('./metro/markdown-transformer.js');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'md'];

module.exports = config;
