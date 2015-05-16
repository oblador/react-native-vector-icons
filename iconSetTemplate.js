'use strict';

var createIconSet = require('./').createIconSet;
var glyphMap = require('./glyph-maps/{componentName}.json');

var {componentName} = createIconSet(glyphMap, '{fontFamily}');

module.exports = {componentName};
