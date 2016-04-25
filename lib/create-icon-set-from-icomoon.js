/**
* @providesModule createIconSetFromIcoMoon
* @flow
*/
'use strict';

let createIconSet = require('./create-icon-set');

function createIconSetFromIcoMoon(config : Object, fontFamily? : string, fontFile? : string) : Function {
  var glyphMap = {};
  config.iconSets.forEach(function(iconSet) {
    iconSet.selection.forEach(function (icon) {
      glyphMap[icon.name] = icon.code;
    });
  });
  fontFamily = fontFamily || config.preferences.fontPref.metadata.fontFamily;
  fontFile = fontFile || fontFamily + '.ttf';

  return createIconSet(glyphMap, fontFamily, fontFile);
};

module.exports = createIconSetFromIcoMoon;
