/**
 * FontAwesome icon set component.
 * Usage: <FontAwesome name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyph-maps/FontAwesome';
let FontAwesome = createIconSet(glyphMap, 'FontAwesome', 'FontAwesome.ttf');

module.exports = FontAwesome;
module.exports.glyphMap = glyphMap;

