/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Instead, modify the template in `generator-react-native-vector-icons`.
 *
 * FontAwesome icon set component.
 * Usage: <FontAwesome name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/FontAwesome.json';

const Icon = createIconSet(glyphMap, {
  postScriptName: 'FontAwesome',
  fontFileName: 'FontAwesome.ttf',
  fontSource: require('../fonts/FontAwesome.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
});

export default Icon;
