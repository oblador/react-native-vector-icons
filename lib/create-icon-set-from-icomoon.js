import createIconSet from './create-icon-set';

export default function createIconSetFromIcoMoon(
  config,
  fontFamilyArg,
  fontFile
) {
  const glyphMap = {};
  config.icons.forEach(icon => {
    glyphMap[icon.properties.name] = icon.properties.code;
  });

  const fontFamily =
    fontFamilyArg || config.preferences.fontPref.metadata.fontFamily;

  return createIconSet(glyphMap, fontFamily, fontFile || `${fontFamily}.ttf`);
}
