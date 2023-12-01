/**
 * MaterialDesignIcons icon set component.
 * Usage: <MaterialDesignIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/material_design_icons.json';

const Icon = createIconSet(glyphMap, 'Material Design Icons', 'MaterialCommunityIcons.ttf');

Icon.loadFont();

export default Icon;
export const { getImageSource, getImageSourceSync } = Icon;

