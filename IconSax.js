/**
 * IconSax icon set component.
 * Usage: <IconSax name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/IconSax.json';

const iconSet = createIconSet(glyphMap, 'IconSax', 'IconSax.ttf');

export default iconSet;
export const {
  Button,
  getImageSource,
  getImageSourceSync,
} = iconSet;

