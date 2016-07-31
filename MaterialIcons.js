/**
 * MaterialIcons icon set component.
 * Usage: <MaterialIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyph-maps/MaterialIcons';
let MaterialIcons = createIconSet(glyphMap, 'Material Icons', 'MaterialIcons.ttf');

module.exports = MaterialIcons;
module.exports.glyphMap = glyphMap;

