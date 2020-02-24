/**
 * Zocial icon set component.
 * Usage: <Zocial name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/Zocial.json';

const iconSet = createIconSet(glyphMap, 'zocial', 'Zocial.ttf');

export default iconSet;
export const {
  Button,
  TabBarItem,
  TabBarItemIOS,
  ToolbarAndroid,
  getImageSource,
  getImageSourceSync,
} = iconSet;
