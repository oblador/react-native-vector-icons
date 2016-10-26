/**
 * Octicons icon set component.
 * Usage: <Octicons name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/Octicons.json';

export default createIconSet(glyphMap, 'octicons', 'Octicons.ttf');

