/**
 * MaterialIcons icon set component.
 * Usage: <MaterialIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/MaterialIcons.json';

export default createIconSet(glyphMap, 'Material Icons', 'MaterialIcons.ttf');

