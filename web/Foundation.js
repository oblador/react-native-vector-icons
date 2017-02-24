Object.defineProperty(exports,"__esModule",{value:true});exports.getImageSource=exports.ToolbarAndroid=exports.TabBarItemIOS=exports.TabBarItem=exports.Button=undefined;




var _createIconSet=require('./lib/create-icon-set');var _createIconSet2=_interopRequireDefault(_createIconSet);
var _Foundation=require('./glyphmaps/Foundation.json');var _Foundation2=_interopRequireDefault(_Foundation);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var iconSet=(0,_createIconSet2.default)(_Foundation2.default,'fontcustom','Foundation.ttf');exports.default=

iconSet;

var Button=exports.Button=iconSet.Button;
var TabBarItem=exports.TabBarItem=iconSet.TabBarItem;
var TabBarItemIOS=exports.TabBarItemIOS=iconSet.TabBarItemIOS;
var ToolbarAndroid=exports.ToolbarAndroid=iconSet.ToolbarAndroid;
var getImageSource=exports.getImageSource=iconSet.getImageSource;