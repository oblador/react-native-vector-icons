/**
 * Entypo icon set component.
 * Usage: <Entypo name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyph-maps/entypo';
let Entypo = createIconSet(glyphMap, 'Entypo', 'Entypo.ttf');

module.exports = Entypo;
module.exports.glyphMap = glyphMap;

