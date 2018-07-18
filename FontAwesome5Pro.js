/**
 * FontAwesome5Pro icon set component.
 * Usage: <FontAwesome5Pro name="icon-name" size={20} color="#4F8EF7" />
 */

import { createFA5iconSet } from './lib/create-icon-set-from-fontawesome5';

import glyphMap from './glyphmaps/FontAwesome5Pro.json';

const iconSet = createFA5iconSet(glyphMap, true);
export default iconSet;
