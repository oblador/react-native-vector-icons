/**
 * AntDesign icon set component.
 * Usage: <AntDesign name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from '@react-native-vector-icons/common/src/create-icon-set';
import glyphMap from './glyphmaps/AntDesign.json';

const iconSet = createIconSet(glyphMap, 'anticon', 'AntDesign.ttf');


console.debug(iconSet);
console.debug(iconSet.loadFont);
iconSet.loadFont().then(() => console.debug('ANT LOADED')).catch(() => console.debug('LOAD failed'));

export default iconSet;
export const {
  Button,
  getImageSource,
  getImageSourceSync,
} = iconSet;

