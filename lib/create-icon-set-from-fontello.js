import createIconSet from './create-icon-set';

export default function createIconSetFromFontello(config, fontFamily, fontFile) {
  let glyphMap = {};
  config.glyphs.forEach(glyph => {
    glyphMap[glyph.css] = glyph.code;
  });

  return createIconSet(
    glyphMap,
    fontFamily || config.name || 'fontello',
    fontFile || fontFamily + '.ttf'
  );
}
