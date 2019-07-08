import createIconSet from './create-icon-set';

export const glyphMap = {};

export default function createIconSetFromIcoMoon(
  config,
  fontFamilyArg,
  fontFile
) {
  config.icons.forEach(icon => {
    icon.properties.name.split(/\s*,\s*/g).forEach(name => {
      glyphMap[name] = icon.properties.code;
    });
  });

  const fontFamily =
    fontFamilyArg || config.preferences.fontPref.metadata.fontFamily;

  return createIconSet(glyphMap, fontFamily, fontFile || `${fontFamily}.ttf`);
}
