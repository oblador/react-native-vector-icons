/**
 * @providesModule createIconSetFromFontello
 * @flow
 */
'use strict';

var createIconSet = require('./create-icon-set');

function createIconSetFromFontello(config : Object, fontFamily? : string, fontFile? : string) : Function {
  var glyphMap = {};
  config.glyphs.forEach(function (glyph) {
    glyphMap[glyph.css] = glyph.code;
  });
  fontFamily = fontFamily || config.name || 'fontello';
  fontFile = fontFile || fontFamily + '.ttf';

  return createIconSet(glyphMap, fontFamily, fontFile)
};

module.exports = createIconSetFromFontello;
