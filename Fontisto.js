/**
 * Fontisto icon set component.
 * Usage: <Fontisto name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/Fontisto.json';

const iconSet = createIconSet(glyphMap, 'Fontisto', 'Fontisto.ttf');

export default iconSet;
export const {
  Button,
  TabBarItem,
  TabBarItemIOS,
  getImageSource,
  getImageSourceSync,
} = iconSet;
