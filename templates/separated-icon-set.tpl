/**
 * ${componentName} icon set component.
 * Usage: <${componentName} name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/${componentName}.json';

export default createIconSet(glyphMap, '${fontFamily}', '${componentName}.ttf');
