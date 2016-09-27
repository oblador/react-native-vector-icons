/**
 * ${componentName} icon set component.
 * Usage: <${componentName} name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
import glyphMap from './glyph-maps/${componentName}';

let ${componentName} = createIconSet(glyphMap, '${fontFamily}', '${componentName}.ttf');

module.exports = ${componentName};
module.exports.glyphMap = glyphMap;
