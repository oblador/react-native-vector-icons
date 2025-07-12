import createIconSet from './create-icon-set';

/**
 * @deprecated react-native-vector-icons package has moved to a new model of per-icon-family packages. See the https://github.com/oblador/react-native-vector-icons/blob/master/MIGRATION.md on how to migrate
 */
export default function createIconSetFromIcoMoon(
  config,
  fontFamilyArg,
  fontFile
) {
  const glyphMap = {};
  config.icons.forEach(icon => {
    icon.properties.name.split(/\s*,\s*/g).forEach(name => {
      glyphMap[name] = icon.properties.code;
    });
  });

  const fontFamily =
    fontFamilyArg || config.preferences.fontPref.metadata.fontFamily;

  return createIconSet(glyphMap, fontFamily, fontFile || `${fontFamily}.ttf`);
}
