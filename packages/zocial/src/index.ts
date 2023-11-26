/**
 * Zocial icon set component.
 * Usage: <Zocial name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/Zocial.json';

const Icon = createIconSet(glyphMap, 'zocial', 'Zocial.ttf');

Icon.loadFont();

export default Icon;
export const { Button, getImageSource, getImageSourceSync } = Icon;

