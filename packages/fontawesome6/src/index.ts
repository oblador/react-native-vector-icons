/**
 * FontAwesome6 icon set component.
 * Usage: <FontAwesome6 name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/fontawesome-common/fontawesome6';

import metadata from '../glyphmaps/FontAwesome6_meta.json';

const Icon = createIconSet(metadata);

export default Icon;
export const { getImageSource, getImageSourceSync } = Icon;
