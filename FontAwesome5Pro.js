/**
 * FontAwesome5Pro icon set component.
 * Usage: <FontAwesome5Pro name="icon-name" size={20} color="#4F8EF7" />
 */

import { createFA5iconSet } from './lib/create-icon-set-from-fontawesome5';

import glyphMap from './glyphmaps/FontAwesome5Pro.json';
import metadata from './glyphmaps/FontAwesome5Pro_meta.json';

export { FA5Style } from './lib/create-icon-set-from-fontawesome5';

const iconSet = createFA5iconSet(glyphMap, metadata, true);

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;
