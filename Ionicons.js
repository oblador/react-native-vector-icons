/**
 * Ionicons icon set component.
 * Usage: <Ionicons name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyph-maps/ionicons';
let Ionicons = createIconSet(glyphMap, 'Ionicons', 'Ionicons.ttf');

module.exports = Ionicons;
module.exports.glyphMap = glyphMap;

