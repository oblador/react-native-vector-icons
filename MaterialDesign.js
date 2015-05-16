/**
 * MaterialDesign icon set component.
 * Usage: <MaterialDesign name="icon-name" size={20} color="#4F8EF7" />
 *
 * @providesModule MaterialDesign
 */
'use strict';

var createIconSet = require('./').createIconSet;
var glyphMap = require('./glyph-maps/MaterialDesign.json');

var MaterialDesign = createIconSet(glyphMap, 'Material-Design-Iconic-Font');

module.exports = MaterialDesign;
