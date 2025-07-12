/**
 * FontAwesome5 icon set component.
 * Usage: <FontAwesome5 name="icon-name" size={20} color="#4F8EF7" />
 */

import { createFA5iconSet } from './lib/create-icon-set-from-fontawesome5';

import glyphMap from './glyphmaps/FontAwesome5Free.json';
import metadata from './glyphmaps/FontAwesome5Free_meta.json';

export { FA5Style } from './lib/create-icon-set-from-fontawesome5';

/**
 * @deprecated react-native-vector-icons package has moved to a new model of per-icon-family packages. See the https://github.com/oblador/react-native-vector-icons/blob/master/MIGRATION.md on how to migrate
 */
const iconSet = createFA5iconSet(glyphMap, metadata, false);

export default iconSet;
export const {
  Button,
  getImageSource,
  getImageSourceSync,
} = iconSet;
