/**
 * Ionicons icon set component.
 * Usage: <Ionicons name="icon-name" size={20} color="#4F8EF7" />
 *
 * @providesModule Ionicons
 */
'use strict';

var createIconSet = require('./').createIconSet;
var glyphMap = require('./glyph-maps/Ionicons.json');

var Ionicons = createIconSet(glyphMap, 'Ionicons');

module.exports = Ionicons;
