/**
 * Zocial icon set component.
 * Usage: <Zocial name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyph-maps/zocial';
let Zocial = createIconSet(glyphMap, 'zocial', 'Zocial.ttf');

module.exports = Zocial;
module.exports.glyphMap = glyphMap;

