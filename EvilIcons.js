/**
 * EvilIcons icon set component.
 * Usage: <EvilIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/EvilIcons.json';

const iconSet = createIconSet(glyphMap, 'EvilIcons', 'EvilIcons.ttf');

export default iconSet;
export const {
  Button,
  TabBarItem,
  TabBarItemIOS,
  getImageSource,
  getImageSourceSync,
} = iconSet;
