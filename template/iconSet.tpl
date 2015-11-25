/**
 * ${componentName} icon set component.
 * Usage: <${componentName} name="icon-name" size={20} color="#4F8EF7" />
 *
 * @providesModule ${componentName}
 */
'use strict';

var createIconSet = require('./lib/create-icon-set');
var glyphMap = ${glyphMap};

var ${componentName} = createIconSet(glyphMap, '${fontFamily}', '${componentName}.ttf');

module.exports = ${componentName};
module.exports.glyphMap = glyphMap;
