/**
 * FontAwesome5Pro icon set component.
 * Usage: <FontAwesome5Pro name="icon-name" size={20} color="#4F8EF7" />
 */

import { createFA5iconSet } from './create-icon-set-from-fontawesome5';

import metadata from '../glyphmaps/FontAwesome5Pro_meta.json';

const Icon = createFA5iconSet(metadata, true);

Icon.loadFont();

export default Icon;
