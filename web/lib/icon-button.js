Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();exports.default=




































createIconButtonComponent;var _isString=require('lodash/isString');var _isString2=_interopRequireDefault(_isString);var _omit=require('lodash/omit');var _omit2=_interopRequireDefault(_omit);var _pick=require('lodash/pick');var _pick2=_interopRequireDefault(_pick);var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNative=require('./react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var styles=_reactNative.StyleSheet.create({container:{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:8},touchable:{overflow:'hidden'},icon:{marginRight:10},text:{fontWeight:'600',backgroundColor:'transparent'}});var IOS7_BLUE='#007AFF';function createIconButtonComponent(Icon){var _class,_temp;
return _temp=_class=function(_Component){_inherits(IconButton,_Component);function IconButton(){_classCallCheck(this,IconButton);return _possibleConstructorReturn(this,(IconButton.__proto__||Object.getPrototypeOf(IconButton)).apply(this,arguments));}_createClass(IconButton,[{key:'render',value:function render()















{var _props=
this.props,style=_props.style,iconStyle=_props.iconStyle,children=_props.children,restProps=_objectWithoutProperties(_props,['style','iconStyle','children']);

var iconProps=(0,_pick2.default)(restProps,Object.keys(_reactNative.Text.propTypes),'style','name','size','color');
var touchableProps=(0,_pick2.default)(restProps,Object.keys(_reactNative.TouchableHighlight.propTypes));
var props=(0,_omit2.default)(
restProps,
Object.keys(iconProps),
Object.keys(touchableProps),
'iconStyle',
'borderRadius',
'backgroundColor');

iconProps.style=iconStyle?[styles.icon,iconStyle]:styles.icon;

var colorStyle=(0,_pick2.default)(this.props,'color');
var blockStyle=(0,_pick2.default)(this.props,'backgroundColor','borderRadius');

return(
_react2.default.createElement(_reactNative.TouchableHighlight,_extends({style:[styles.touchable,blockStyle]},touchableProps),
_react2.default.createElement(_reactNative.View,_extends({
style:[styles.container,blockStyle,style]},
props),

_react2.default.createElement(Icon,iconProps),
(0,_isString2.default)(children)?
_react2.default.createElement(_reactNative.Text,{style:[styles.text,colorStyle]},children):
children)));




}}]);return IconButton;}(_react.Component),_class.propTypes=_extends({},_reactNative.View.propTypes,{backgroundColor:_react.PropTypes.string,borderRadius:_react.PropTypes.number,color:_react.PropTypes.string,size:_react.PropTypes.number}),_class.defaultProps={backgroundColor:IOS7_BLUE,borderRadius:5,color:'white',size:20},_temp;

}