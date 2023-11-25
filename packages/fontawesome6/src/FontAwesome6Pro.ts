/**
 * FontAwesome6Pro icon set component.
 * Usage: <FontAwesome6Pro name="icon-name" size={20} color="#4F8EF7" />
 */

import { createFA6iconSet } from './create-icon-set-from-fontawesome6';

import metadata from '../glyphmaps/FontAwesome6Pro_meta.json';

const Icon = createFA6iconSet(metadata, true);

Icon.loadFont();

export default Icon;
