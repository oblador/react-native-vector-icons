/**
 * FontAwesome icon set component.
 * Usage: <FontAwesome name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/FontAwesome.json';

const Icon = createIconSet(glyphMap, 'FontAwesome', 'FontAwesome.ttf');

export default Icon;
