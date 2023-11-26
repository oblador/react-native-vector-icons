/**
 * MaterialCommunityIcons icon set component.
 * Usage: <MaterialCommunityIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/MaterialCommunityIcons.json';

const Icon = createIconSet(glyphMap, 'Material Design Icons', 'MaterialCommunityIcons.ttf');

Icon.loadFont();

export default Icon;
export const { Button, getImageSource, getImageSourceSync } = Icon;

