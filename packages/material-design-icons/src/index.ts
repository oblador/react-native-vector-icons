/**
 * MaterialDesignIcons icon set component.
 * Usage: <MaterialDesignIcons name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/common';
import glyphMap from '../glyphmaps/MaterialDesignIcons.json';

const Icon = createIconSet(glyphMap, 'MaterialDesignIcons', 'MaterialDesignIcons.ttf');

export default Icon;
