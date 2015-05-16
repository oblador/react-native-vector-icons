'use strict';

var createIconSet = require('./').createIconSet;
var glyphMap = require('./glyph-maps/MaterialDesign.json');

var MaterialDesign = createIconSet(glyphMap, 'Material-Design-Iconic-Font');

module.exports = MaterialDesign;
