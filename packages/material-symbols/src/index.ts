/**
 * MaterialSymbols icon set component.
 * Usage: <MaterialSymbols name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/material_symbols.json';

const Icon = createIconSet(glyphMap, 'MaterialSymbols', 'MaterialSymbols.ttf');

Icon.loadFont();

export default Icon;
export const { getImageSource, getImageSourceSync } = Icon;

