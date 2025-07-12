import createIconSet from './create-icon-set';

/**
 * @deprecated react-native-vector-icons package has moved to a new model of per-icon-family packages. See the https://github.com/oblador/react-native-vector-icons/blob/master/MIGRATION.md on how to migrate
 */
export default function createIconSetFromFontello(
  config,
  fontFamilyArg,
  fontFile
) {
  const glyphMap = {};
  config.glyphs.forEach(glyph => {
    glyphMap[glyph.css] = glyph.code;
  });

  const fontFamily = fontFamilyArg || config.name || 'fontello';

  return createIconSet(glyphMap, fontFamily, fontFile || `${fontFamily}.ttf`);
}
