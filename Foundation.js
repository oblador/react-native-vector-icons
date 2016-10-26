/**
 * Foundation icon set component.
 * Usage: <Foundation name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/Foundation.json';

export default createIconSet(glyphMap, 'fontcustom', 'Foundation.ttf');

