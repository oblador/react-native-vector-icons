/**
 * IcoFont icon set component.
 * Usage: <IcoFont name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/IcoFont.json';

const iconSet = createIconSet(glyphMap, 'IcoFont', 'IcoFont.ttf');

export default iconSet;
export const {
  Button,
  TabBarItem,
  TabBarItemIOS,
  getImageSource,
  getImageSourceSync,
} = iconSet;
