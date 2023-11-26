/**
 * ${componentName} icon set component.
 * Usage: <${componentName} name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/${componentName}.json';

const Icon = createIconSet(glyphMap, '${fontFamily}', '${componentName}.ttf');

Icon.loadFont();

export default Icon;
export const { getImageSource, getImageSourceSync } = Icon;
