/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Instead, modify the template in `generator-react-native-vector-icons`.
 *
 * SimpleLineIcons icon set component.
 * Usage: <SimpleLineIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/SimpleLineIcons.json';

const Icon = createIconSet(glyphMap, {
  postScriptName: 'simple-line-icons',
  fontFileName: 'SimpleLineIcons.ttf',
  fontSource: require('../fonts/SimpleLineIcons.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
});

export default Icon;
