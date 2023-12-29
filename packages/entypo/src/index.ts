/**
 * Entypo icon set component.
 * Usage: <Entypo name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/Entypo.json';

const Icon = createIconSet(glyphMap, 'Entypo', 'Entypo.ttf');

export default Icon;
