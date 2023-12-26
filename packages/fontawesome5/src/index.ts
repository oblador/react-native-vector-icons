/**
 * FontAwesome5 icon set component.
 * Usage: <FontAwesome5 name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/fontawesome-common/fontawesome5';

import metadata from '../glyphmaps/FontAwesome5_meta.json';

const Icon = createIconSet(metadata);

export default Icon;
export const { getImageSource, getImageSourceSync } = Icon;
