/**
 * Entypo icon set component.
 * Usage: <Entypo name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/Entypo.json';

/**
 * @deprecated react-native-vector-icons package has moved to a new model of per-icon-family packages. See the https://github.com/oblador/react-native-vector-icons/blob/master/MIGRATION.md on how to migrate
 */
const iconSet = createIconSet(glyphMap, 'Entypo', 'Entypo.ttf');

export default iconSet;
export const {
  Button,
  getImageSource,
  getImageSourceSync,
} = iconSet;
