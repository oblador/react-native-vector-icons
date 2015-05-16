/**
 * FontAwesome icon set component.
 * Usage: <FontAwesome name="icon-name" size={20} color="#4F8EF7" />
 *
 * @providesModule FontAwesome
 */
'use strict';

var createIconSet = require('./').createIconSet;
var glyphMap = require('./glyph-maps/FontAwesome.json');

var FontAwesome = createIconSet(glyphMap, 'FontAwesome');

module.exports = FontAwesome;
