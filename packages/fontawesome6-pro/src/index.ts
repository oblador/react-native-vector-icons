/**
 * FontAwesome6Pro icon set component.
 * Usage: <FontAwesome6Pro name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/fontawesome-common/fontawesome6-pro';

import metadata from '../glyphmaps/FontAwesome6Pro_meta.json';

const Icon = createIconSet(metadata);

export default Icon;
export const { getImageSource, getImageSourceSync } = Icon;
