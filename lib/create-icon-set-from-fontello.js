/**
 * @providesModule createIconSetFromFontello
 * @flow
 */
'use strict';

var createIconSet = require('./create-icon-set');

function createIconSetFromFontello(config : Object, fontFamily? : string) : Function {
  var glyphMap = {};
  config.glyphs.forEach(function (glyph) {
    glyphMap[glyph.css] = glyph.code;
  });
  return createIconSet(glyphMap, fontFamily || config.name)
};

module.exports = createIconSetFromFontello;
