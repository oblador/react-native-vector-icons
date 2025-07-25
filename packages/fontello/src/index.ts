/**
 * Fontello icon set component.
 * Usage: <Fontello name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';

type FontelloConfig = {
  name: string;
  css_prefix_text: string;
  css_use_suffix: boolean;
  hinting: boolean;
  units_per_em: number;
  ascent: number;
  glyphs: Array<{
    uid: string;
    css: string;
    code: number;
    src: string;
  }>;
};

export default function createIconSetFromFontello(config: FontelloConfig, fontFamilyArg?: string, fontFile?: string) {
  const glyphMap: Record<string, number> = {};
  config.glyphs.forEach((glyph) => {
    glyphMap[glyph.css] = glyph.code;
  });

  const fontFamily = fontFamilyArg || config.name || 'fontello';

  return createIconSet(glyphMap, fontFamily, fontFile || `${fontFamily}.ttf`);
}
