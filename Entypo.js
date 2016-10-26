/**
 * Entypo icon set component.
 * Usage: <Entypo name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/Entypo.json';

export default createIconSet(glyphMap, 'Entypo', 'Entypo.ttf');

