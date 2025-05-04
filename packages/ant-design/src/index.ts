// NOTE:This file was generated from packages/generator-react-native-vector-icons/src/app/templates
// If you're contributing to react-native-vector-icons, make the change there, otherwise it'll be lost

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Instead, modify the template in `generator-react-native-vector-icons`.
 *
 * AntDesign icon set component.
 * Usage: <AntDesign name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/AntDesign.json';

const Icon = createIconSet(glyphMap, {
  postScriptName: 'AntDesign',
  fontFileName: 'AntDesign.ttf',
  fontSource: require('../fonts/AntDesign.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
});

export default Icon;
