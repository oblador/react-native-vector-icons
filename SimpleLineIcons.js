/**
 * SimpleLineIcons icon set component.
 * Usage: <SimpleLineIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/SimpleLineIcons.json';

export default createIconSet(glyphMap, 'simple-line-icons', 'SimpleLineIcons.ttf');

