/**
 * Fontello icon set component.
 * Usage: <Fontello name="icon-name" size={20} color="#4F8EF7" />
 */

import { type CreateIconSetOptions, createIconSet, type IconComponent } from '@react-native-vector-icons/common';

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

type FontelloComponent = IconComponent<Record<string, number>>;

// entries are optional because they can be derived from the config
type Options = Partial<CreateIconSetOptions>;

export default function createIconSetFromFontello(
  config: FontelloConfig,
  postScriptName?: string,
  fontFileName?: string,
): FontelloComponent;
export default function createIconSetFromFontello(config: FontelloConfig, options: Options): FontelloComponent;
export default function createIconSetFromFontello(
  config: FontelloConfig,
  postScriptNameOrOptions?: string | Options,
  fontFileNameParam?: string,
): FontelloComponent {
  const { postScriptName, fontFileName, fontSource, fontStyle } =
    typeof postScriptNameOrOptions === 'object'
      ? postScriptNameOrOptions
      : {
          postScriptName: postScriptNameOrOptions,
          fontFileName: fontFileNameParam,
        };

  const glyphMap: Record<string, number> = {};
  config.glyphs.forEach((glyph) => {
    glyphMap[glyph.css] = glyph.code;
  });

  const fontFamily = postScriptName || config.name || 'fontello';

  return createIconSet(glyphMap, {
    postScriptName: fontFamily,
    fontFileName: fontFileName || `${fontFamily}.ttf`,
    fontSource,
    fontStyle,
  });
}
