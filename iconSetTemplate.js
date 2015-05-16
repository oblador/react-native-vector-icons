'use strict';

var createIconSet = require('./').createIconSet;
var glyphMap = require('./glyph-maps/{fontFamily}.json');

var {componentName} = createIconSet(glyphMap, '{fontFamily}');

module.exports = {componentName};
