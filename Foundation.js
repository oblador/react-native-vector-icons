/**
 * Foundation icon set component.
 * Usage: <Foundation name="icon-name" size={20} color="#4F8EF7" />
 *
 * @providesModule Foundation
 */
'use strict';

var createIconSet = require('./').createIconSet;
var glyphMap = require('./glyph-maps/Foundation.json');

var Foundation = createIconSet(glyphMap, 'fontcustom');

module.exports = Foundation;
