'use strict';

var createIconSet = require('./').createIconSet;
var glyphMap = require('./glyph-maps/FontAwesome.json');

var FontAwesome = createIconSet(glyphMap, 'FontAwesome');

module.exports = FontAwesome;
