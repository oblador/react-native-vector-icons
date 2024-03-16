/**
 * <%= className %> icon set component.
 * Usage: <<%= className %> name="icon-name" size={20} color="#4F8EF7" />
 */

import { createIconSet } from '@react-native-vector-icons/<%= commonPackage %>';
import glyphMap from '../glyphmaps/<%= fontFile %>.json';

const Icon = createIconSet(glyphMap, '<%= fontName %>', '<%= fontFile %>.ttf');

export default Icon;