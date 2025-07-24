/**
 * Fontello icon set component.
 * Usage: <Fontello name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';

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

export default function createIconSetFromIcoMoon(config: IcoMoonConfig, fontFamilyArg?: string, fontFile?: string) {
  const glyphMap: Record<string, number> = {};
  config.icons.forEach((icon) => {
    icon.properties.name.split(/\s*,\s*/g).forEach((name) => {
      glyphMap[name] = icon.properties.code;
    });
  });

  const fontFamily = fontFamilyArg || config.preferences.fontPref.metadata.fontFamily;

  return createIconSet(glyphMap, fontFamily, fontFile || `${fontFamily}.ttf`);
}
