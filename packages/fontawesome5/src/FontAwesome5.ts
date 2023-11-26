/**
 * FontAwesome5 icon set component.
 * Usage: <FontAwesome5 name="icon-name" size={20} color="#4F8EF7" />
 */

import { createFA5iconSet } from './create-icon-set-from-fontawesome5';

import metadata from '../glyphmaps/FontAwesome5Free_meta.json';

const Icon = createFA5iconSet(metadata, false);

Icon.loadFont();

export default Icon;
