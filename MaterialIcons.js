/**
 * MaterialIcons icon set component.
 * Usage: <MaterialIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import { createMIiconSet } from './lib/create-icon-set-from-materialicons';

import glyphMap from './glyphmaps/MaterialIcons.json';
import metadata from './glyphmaps/MaterialIcons_meta.json';

export { MIStyle } from './lib/create-icon-set-from-materialicons';

const iconSet = createMIiconSet(glyphMap, metadata);

export default iconSet;
export const { Button, getImageSource, getImageSourceSync } = iconSet;
