'use strict';

var createIconSet = require('./').createIconSet;
var glyphMap = require('./glyph-maps/Zocial.json');

var Zocial = createIconSet(glyphMap, 'zocial');

module.exports = Zocial;
