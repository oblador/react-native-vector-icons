/**
 * MaterialCommunityIcons icon set component.
 * Usage: <MaterialCommunityIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/MaterialCommunityIcons.json';

const iconSet = createIconSet(glyphMap, 'Material Design Icons', 'MaterialCommunityIcons.ttf');

export default iconSet;
export const {
  Button,
  TabBarItem,
  TabBarItemIOS,
  ToolbarAndroid,
  getImageSource,
  getImageSourceSync,
} = iconSet;
