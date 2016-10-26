/**
 * FontAwesome icon set component.
 * Usage: <FontAwesome name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/FontAwesome.json';

export default createIconSet(glyphMap, 'FontAwesome', 'FontAwesome.ttf');

