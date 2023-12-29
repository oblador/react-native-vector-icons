/**
 * Octicons icon set component.
 * Usage: <Octicons name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/Octicons.json';

const Icon = createIconSet(glyphMap, 'Octicons', 'Octicons.ttf');

export default Icon;
