/**
* @providesModule createIconSetFromIcoMoon
* @flow
*/
'use strict';

let createIconSet = require('./create-icon-set');

function createIconSetFromIcoMoon(config : Object, fontFamily? : string, fontFile? : string) : Function {
  var glyphMap = {};
  config.icons.forEach(function (icon) {
    glyphMap[icon.properties.name] = icon.properties.code;
  });
  fontFamily = fontFamily || config.preferences.fontPref.metadata.fontFamily;
  fontFile = fontFile || fontFamily + '.ttf';

  return createIconSet(glyphMap, fontFamily, fontFile)
};

module.exports = createIconSetFromIcoMoon;
