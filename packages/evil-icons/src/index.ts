// NOTE:This file was generated from packages/generator-react-native-vector-icons/src/app/templates
// If you're contributing to react-native-vector-icons, make the change there, otherwise it'll be lost

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Instead, modify the template in `generator-react-native-vector-icons`.
 *
 * EvilIcons icon set component.
 * Usage: <EvilIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/EvilIcons.json';

const Icon = createIconSet(glyphMap, {
  postScriptName: 'EvilIcons',
  fontFileName: 'EvilIcons.ttf',
  fontSource: require('../fonts/EvilIcons.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
});

export default Icon;
