/**
 * Foundation icon set component.
 * Usage: <Foundation name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/Foundation.json';

const Icon = createIconSet(glyphMap, 'Foundation', 'Foundation.ttf');

export default Icon;
