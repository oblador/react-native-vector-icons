/**
 * FontAwesome6 icon set component.
 * Usage: <FontAwesome6 name="icon-name" size={20} color="#4F8EF7" />
 */

import { createFA6iconSet } from './lib/create-icon-set-from-fontawesome6';

import glyphMap from './glyphmaps/FontAwesome6Free.json';
import metadata from './glyphmaps/FontAwesome6Free_meta.json';

export { FA6Style } from './lib/create-icon-set-from-fontawesome6';

const iconSet = createFA6iconSet(glyphMap, metadata, false);

export default iconSet;
export const {
  Button,
  getImageSource,
  getImageSourceSync,
} = iconSet;
