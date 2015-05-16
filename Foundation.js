'use strict';

var createIconSet = require('./').createIconSet;
var glyphMap = require('./glyph-maps/Foundation.json');

var Foundation = createIconSet(glyphMap, 'fontcustom');

module.exports = Foundation;
