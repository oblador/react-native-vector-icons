/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Instead, modify the template in `generator-react-native-vector-icons`.
 *
 * <%= className %> icon set component.
 * Usage: <<%= className %> name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/<%= commonPackage %>';
import glyphMap from '../glyphmaps/<%= fontFilename %>.json';

const Icon = createIconSet(glyphMap, {
  postscriptName: '<%= postscriptName %>',
  fontFilename: '<%= fontFilename %>.ttf',
  fontSource: require('../fonts/<%= fontFilename %>.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
});

export default Icon;
