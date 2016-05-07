/**
 * ${componentName} icon set component.
 * Usage: <${componentName} name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from './lib/create-icon-set';
const glyphMap = ${glyphMap};

let ${componentName} = createIconSet(glyphMap, '${fontFamily}', '${componentName}.ttf');

module.exports = ${componentName};
module.exports.glyphMap = glyphMap;
