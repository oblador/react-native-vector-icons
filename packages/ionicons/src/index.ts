/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Instead, modify the template in `generator-react-native-vector-icons`.
 *
 * Ionicons icon set component.
 * Usage: <Ionicons name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/Ionicons.json';

const Icon = createIconSet(glyphMap, {
  postScriptName: 'Ionicons',
  fontFileName: 'Ionicons.ttf',
  fontSource: require('../fonts/Ionicons.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
});

export default Icon;
