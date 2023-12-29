/**
 * Fontisto icon set component.
 * Usage: <Fontisto name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/Fontisto.json';

const Icon = createIconSet(glyphMap, 'Fontisto', 'Fontisto.ttf');

export default Icon;
