/**
 * AntDesign icon set component.
 * Usage: <AntDesign name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/AntDesign.json';

const iconSet = createIconSet(glyphMap, 'anticon', 'AntDesign.ttf');

export default iconSet;
export const {
  Button,
  TabBarItem,
  TabBarItemIOS,
  getImageSource,
  getImageSourceSync,
} = iconSet;
