'use strict';

var createIconSet = require('./').createIconSet;
var glyphMap = require('./glyph-maps/Ionicons.json');

var Ionicons = createIconSet(glyphMap, 'Ionicons');

module.exports = Ionicons;
