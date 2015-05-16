/**
 * Entypo icon set component.
 * Usage: <Entypo name="icon-name" size={20} color="#4F8EF7" />
 *
 * @providesModule Entypo
 */
'use strict';

var createIconSet = require('./').createIconSet;
var glyphMap = require('./glyph-maps/Entypo.json');

var Entypo = createIconSet(glyphMap, 'Entypo');

module.exports = Entypo;
