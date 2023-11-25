/**
 * FontAwesome6 icon set component.
 * Usage: <FontAwesome6 name="icon-name" size={20} color="#4F8EF7" />
 */

import { createFA6iconSet } from './create-icon-set-from-fontawesome6';

import metadata from '../glyphmaps/FontAwesome6Free_meta.json';

const Icon = createFA6iconSet(metadata, false);

export default Icon;
