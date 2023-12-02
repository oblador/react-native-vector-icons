/**
 * Fontawesome icon set component.
 * Usage: <Fontawesome name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/FontAwesome.json';

const Icon = createIconSet(glyphMap, 'FontAwesome', 'FontAwesome.ttf');

Icon.loadFont();

export default Icon;
export const { getImageSource, getImageSourceSync } = Icon;