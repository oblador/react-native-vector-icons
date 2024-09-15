/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Instead, modify the template in `generator-react-native-vector-icons`.
 *
 * <%= className %> icon set component.
 * Usage: <<%= className %> name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/<%= commonPackage %>';
import glyphMap from '../glyphmaps/<%= fontFile %>.json';

const Icon = createIconSet(glyphMap, {
  postScriptName: '<%= fontName %>',
  fontFileName: '<%= fontFile %>.ttf',
  fontSource: require('../fonts/<%= fontFile %>.ttf'),
});

export default Icon;
