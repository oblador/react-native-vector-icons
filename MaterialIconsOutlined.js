/**
 * MaterialIconsOutlined icon set component.
 * Usage: <MaterialIconsOutlined name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/MaterialIconsOutlined.json';

const iconSet = createIconSet(glyphMap, 'Material Icons Outlined', 'MaterialIconsOutlined.ttf');

export default iconSet;
export const {
  Button,
  getImageSource,
  getImageSourceSync,
} = iconSet;

