Object.defineProperty(exports,"__esModule",{value:true});exports.getImageSource=exports.ToolbarAndroid=exports.TabBarItemIOS=exports.TabBarItem=exports.Button=undefined;




var _createIconSet=require('./lib/create-icon-set');var _createIconSet2=_interopRequireDefault(_createIconSet);
var _SimpleLineIcons=require('./glyphmaps/SimpleLineIcons.json');var _SimpleLineIcons2=_interopRequireDefault(_SimpleLineIcons);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var iconSet=(0,_createIconSet2.default)(_SimpleLineIcons2.default,'simple-line-icons','SimpleLineIcons.ttf');exports.default=

iconSet;

var Button=exports.Button=iconSet.Button;
var TabBarItem=exports.TabBarItem=iconSet.TabBarItem;
var TabBarItemIOS=exports.TabBarItemIOS=iconSet.TabBarItemIOS;
var ToolbarAndroid=exports.ToolbarAndroid=iconSet.ToolbarAndroid;
var getImageSource=exports.getImageSource=iconSet.getImageSource;