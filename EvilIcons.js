/**
 * EvilIcons icon set component.
 * Usage: <EvilIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyph-maps/EvilIcons';

let EvilIcons = createIconSet(glyphMap, 'EvilIcons', 'EvilIcons.ttf');

module.exports = EvilIcons;
module.exports.glyphMap = glyphMap;

