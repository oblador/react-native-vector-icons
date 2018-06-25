/**
 * AntDesign icon set component.
 * Usage: <AntDesign name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
import glyphMap from './glyphmaps/AntDesign.json';

const iconSet = createIconSet(glyphMap, 'Ant Design', 'AntDesign.ttf');

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;

