/**
 * FontAwesome6 icon set component.
 * Usage: <FontAwesome6 name="icon-name" size={20} color="#4F8EF7" />
 */

import { createFA6iconSet } from './lib/create-icon-set-from-fontawesome6';

import glyphMap from './glyphmaps/FontAwesome6Free.json';
import metadata from './glyphmaps/FontAwesome6Free_meta.json';

export { FA6Style } from './lib/create-icon-set-from-fontawesome6';

/**
 * @deprecated react-native-vector-icons package has moved to a new model of per-icon-family packages. See the https://github.com/oblador/react-native-vector-icons/blob/master/MIGRATION.md on how to migrate
 */
const iconSet = createFA6iconSet(glyphMap, metadata, false);

export default iconSet;
export const {
  Button,
  getImageSource,
  getImageSourceSync,
} = iconSet;
