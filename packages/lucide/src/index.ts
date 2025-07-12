// NOTE:This file was generated from packages/generator-react-native-vector-icons/src/app/templates
// If you're contributing to react-native-vector-icons, make the change there, otherwise it'll be lost

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Instead, modify the template in `generator-react-native-vector-icons`.
 *
 * Lucide icon set component.
 * Usage: <Lucide name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';

import glyphMap from '../glyphmaps/Lucide.json';

export const Lucide = createIconSet(glyphMap, {
  postScriptName: 'Lucide',
  fontFileName: 'Lucide.ttf',
  fontSource: require('../fonts/Lucide.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
});

export type LucideIconName = keyof typeof glyphMap;

export default Lucide;
