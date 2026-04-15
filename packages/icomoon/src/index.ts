/**
 * Fontello icon set component.
 * Usage: <Fontello name="icon-name" size={20} color="#4F8EF7" />
 */

import { type CreateIconSetOptions, createIconSet, type IconComponent } from '@react-native-vector-icons/common';

type IcoMoonIcon = {
  properties: {
    name: string;
    code: number;
  };
};
type IcoMoonGlyph = {
  extras: {
    name: string;
    codePoint: number;
  };
};
type IcoMoonConfig =
  | {
      // Old IcoMoon app (https://icomoon.io/app)
      icons: IcoMoonIcon[];
      preferences?: {
        fontPref?: {
          metadata?: {
            fontFamily?: string;
          };
        };
      };
    }
  | {
      // New IcoMoon app (https://icomoon.io/new-app)
      glyphs: IcoMoonGlyph[];
      preferences?: {
        fontPref?: {
          metadata?: {
            fontFamily?: string;
          };
        };
      };
    };

type IcoMoonComponent = IconComponent<Record<string, number>>;

// entries are optional because they can be derived from the config
type Options = Partial<CreateIconSetOptions>;

export default function createIconSetFromIcoMoon(
  config: IcoMoonConfig,
  postScriptName?: string,
  fontFileName?: string,
): IcoMoonComponent;
export default function createIconSetFromIcoMoon(config: IcoMoonConfig, options: Options): IcoMoonComponent;
export default function createIconSetFromIcoMoon(
  config: IcoMoonConfig,
  postScriptNameOrOptions?: string | Options,
  fontFileNameParam?: string,
): IcoMoonComponent {
  const { postScriptName, fontFileName, fontSource, fontStyle } =
    typeof postScriptNameOrOptions === 'object'
      ? postScriptNameOrOptions
      : {
          postScriptName: postScriptNameOrOptions,
          fontFileName: fontFileNameParam,
        };

  const glyphMap: Record<string, number> = {};
  if ('icons' in config) {
    // Old IcoMoon app
    config.icons.forEach((icon) => {
      icon.properties.name.split(/\s*,\s*/g).forEach((name) => {
        glyphMap[name] = icon.properties.code;
      });
    });
  } else if ('glyphs' in config) {
    // New IcoMoon app
    config.glyphs.forEach((glyph) => {
      glyph.extras.name.split(/\s*,\s*/g).forEach((name) => {
        glyphMap[name] = glyph.extras.codePoint;
      });
    });
  } else {
    throw new Error('Invalid IcoMoon config: expected "icons" (old format) or "glyphs" (new format)');
  }

  const fontFamily = postScriptName || (config.preferences?.fontPref?.metadata?.fontFamily ?? 'icomoon');

  return createIconSet(glyphMap, {
    postScriptName: fontFamily,
    fontFileName: fontFileName || `${fontFamily}.ttf`,
    fontSource,
    fontStyle,
  });
}
