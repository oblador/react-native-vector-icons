/**
 * Foundation icon set component.
 * Usage: <Foundation name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyph-maps/Foundation';
let Foundation = createIconSet(glyphMap, 'fontcustom', 'Foundation.ttf');

module.exports = Foundation;
module.exports.glyphMap = glyphMap;

