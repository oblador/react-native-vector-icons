/**
 * AntDesign icon set component.
 * Usage: <AntDesign name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/AntDesign.json';

const Icon = createIconSet(glyphMap, 'AntDesign', 'AntDesign.ttf');

export default Icon;
