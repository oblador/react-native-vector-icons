import createIconSet from './create-icon-set';

export default function createIconSetFromFontello(config, fontFamilyArg, fontFile) {
  let glyphMap = {};
  config.glyphs.forEach(glyph => {
    glyphMap[glyph.css] = glyph.code;
  });

  const fontFamily = fontFamilyArg || config.name || 'fontello';

  return createIconSet(
    glyphMap,
    fontFamily,
    fontFile || fontFamily + '.ttf'
  );
}
