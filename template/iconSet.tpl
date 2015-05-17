/**
 * ${componentName} icon set component.
 * Usage: <${componentName} name="icon-name" size={20} color="#4F8EF7" />
 *
 * @providesModule ${componentName}
 */
'use strict';

var createIconSet = require('createIconSet');
var glyphMap = ${glyphMap};

var ${componentName} = createIconSet(glyphMap, '${fontFamily}');

module.exports = ${componentName};
module.exports.glyphMap = glyphMap;
