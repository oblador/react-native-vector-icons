/**
 * EvilIcons icon set component.
 * Usage: <EvilIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/evil_icons.json';

const Icon = createIconSet(glyphMap, 'EvilIcons', 'EvilIcons.ttf');

Icon.loadFont();

export default Icon;
export const { getImageSource, getImageSourceSync } = Icon;

