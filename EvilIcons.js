/**
 * EvilIcons icon set component.
 * Usage: <EvilIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/EvilIcons.json';

export default createIconSet(glyphMap, 'EvilIcons', 'EvilIcons.ttf');

