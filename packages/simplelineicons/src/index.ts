/**
 * SimpleLineIcons icon set component.
 * Usage: <SimpleLineIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/SimpleLineIcons.json';

const Icon = createIconSet(glyphMap, 'simple-line-icons', 'SimpleLineIcons.ttf');

Icon.loadFont();

export default Icon;
export const { getImageSource, getImageSourceSync } = Icon;

