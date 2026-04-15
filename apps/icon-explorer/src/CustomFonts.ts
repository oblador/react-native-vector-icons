import createFontelloIconSet from '@react-native-vector-icons/fontello';
import createIcoMoonIconSet from '@react-native-vector-icons/icomoon';
import FontelloConfig from '../rnvi-fonts/fontello/fontello.config.json';
import IcoMoonConfig from '../rnvi-fonts/icomoon/icomoon.config.json';

export const Fontello = createFontelloIconSet<'home'>(FontelloConfig);
export const FontelloGlyphs: Record<string, number> = {};
FontelloConfig.glyphs.forEach((glyph) => {
  FontelloGlyphs[glyph.css] = glyph.code;
});

export const IcoMoon = createIcoMoonIconSet<'house'>(IcoMoonConfig);
export const IcoMoonGlyphs: Record<string, number> = {};
IcoMoonConfig.glyphs.forEach((icon) => {
  icon.extras.name.split(/\s*,\s*/g).forEach((name) => {
    IcoMoonGlyphs[name] = icon.extras.codePoint;
  });
});
