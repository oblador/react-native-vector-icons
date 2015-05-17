/**
 * @providesModule createIconSetFromFontello
 */
'use strict';

var createIconSet = require('createIconSet');

function createIconSetFromFontello(config, fontFamily) {
  var glyphMap = {};
  config.glyphs.forEach(function (glyph) {
    glyphMap[glyph.css] = glyph.code;
  });
  return createIconSet(glyphMap, fontFamily || config.name)
};

module.exports = createIconSetFromFontello;
