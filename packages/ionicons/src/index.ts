/**
 * Ionicons icon set component.
 * Usage: <Ionicons name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/Ionicons.json';

const Icon = createIconSet(glyphMap, 'Ionicons', 'Ionicons.ttf');

export default Icon;
