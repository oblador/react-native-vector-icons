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
type IcoMoonConfig = {
  icons: IcoMoonIcon[];
  preferences: {
    fontPref: {
      metadata: {
        fontFamily: string;
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
  config.icons.forEach((icon) => {
    icon.properties.name.split(/\s*,\s*/g).forEach((name) => {
      glyphMap[name] = icon.properties.code;
    });
  });

  const fontFamily = postScriptName || config.preferences.fontPref.metadata.fontFamily;

  return createIconSet(glyphMap, {
    postScriptName: fontFamily,
    fontFileName: fontFileName || `${fontFamily}.ttf`,
    fontSource,
    fontStyle,
  });
}
