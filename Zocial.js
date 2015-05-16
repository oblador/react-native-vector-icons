/**
 * Zocial icon set component.
 * Usage: <Zocial name="icon-name" size={20} color="#4F8EF7" />
 *
 * @providesModule Zocial
 */
'use strict';

var createIconSet = require('./').createIconSet;
var glyphMap = require('./glyph-maps/Zocial.json');

var Zocial = createIconSet(glyphMap, 'zocial');

module.exports = Zocial;
