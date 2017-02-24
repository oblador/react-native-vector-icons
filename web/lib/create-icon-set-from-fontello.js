Object.defineProperty(exports,"__esModule",{value:true});exports.default=

createIconSetFromFontello;var _createIconSet=require('./create-icon-set');var _createIconSet2=_interopRequireDefault(_createIconSet);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function createIconSetFromFontello(config,fontFamilyArg,fontFile){
var glyphMap={};
config.glyphs.forEach(function(glyph){
glyphMap[glyph.css]=glyph.code;
});

var fontFamily=fontFamilyArg||config.name||'fontello';

return(0,_createIconSet2.default)(
glyphMap,
fontFamily,
fontFile||fontFamily+'.ttf');

}