// NOTE:This file was generated from packages/generator-react-native-vector-icons/src/app/templates
// If you're contributing to react-native-vector-icons, make the change there, otherwise it'll be lost

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Instead, modify the template in `generator-react-native-vector-icons`.
 *
 * Feather icon set component.
 * Usage: <Feather name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';

import glyphMap from '../glyphmaps/Feather.json';

export const Feather = createIconSet(glyphMap, {
  postScriptName: 'Feather',
  fontFileName: 'Feather.ttf',
  fontSource: require('../fonts/Feather.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
});

export type FeatherIconName = keyof typeof glyphMap;

export default Feather;
