/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Instead, modify the template in `generator-react-native-vector-icons`.
 *
 * Zocial icon set component.
 * Usage: <Zocial name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/Zocial.json';

const Icon = createIconSet(glyphMap, {
  postscriptName: 'zocial',
  fontFilename: 'Zocial.ttf',
  fontSource: require('../fonts/Zocial.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
});

export default Icon;
