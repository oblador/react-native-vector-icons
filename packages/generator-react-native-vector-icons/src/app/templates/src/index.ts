/**
 * <%= className %> icon set component.
 * Usage: <<%= className %> name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/<%= shortName %>.json';

const Icon = createIconSet(glyphMap, '<%= fontName %>', '<%= fontName %>.ttf');

Icon.loadFont();

export default Icon;
export const { getImageSource, getImageSourceSync } = Icon;
