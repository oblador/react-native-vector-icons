import createIconSet from './create-icon-set';

function createIconSetFromIcoMoon(config, fontFamily, fontFile) {
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

module.exports = createIconSetFromIcoMoon;
