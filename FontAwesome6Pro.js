/**
 * FontAwesome6Pro icon set component.
 * Usage: <FontAwesome6Pro name="icon-name" size={20} color="#4F8EF7" />
 */

import { createFA6iconSet } from './lib/create-icon-set-from-fontawesome6';

import glyphMap from './glyphmaps/FontAwesome6Pro.json';
import metadata from './glyphmaps/FontAwesome6Pro_meta.json';

export { FA6Style } from './lib/create-icon-set-from-fontawesome6';

const iconSet = createFA6iconSet(glyphMap, metadata, true);

export default iconSet;
export const {
  Button,
  getImageSource,
  getImageSourceSync,
} = iconSet;
