import createIconSet from './create-icon-set';

export default function createIconSetFromIcoMoon(config, fontFamily, fontFile) {
  let glyphMap = {};
  config.icons.forEach(icon => {
    glyphMap[icon.properties.name] = icon.properties.code;
  });

  return createIconSet(
    glyphMap,
    fontFamily || config.preferences.fontPref.metadata.fontFamily,
    fontFile || fontFamily + '.ttf'
  );
}
