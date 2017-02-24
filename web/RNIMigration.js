Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _FontAwesome=require('react-native-vector-icons/FontAwesome');var _FontAwesome2=_interopRequireDefault(_FontAwesome);
var _Foundation=require('react-native-vector-icons/Foundation');var _Foundation2=_interopRequireDefault(_Foundation);
var _Ionicons=require('react-native-vector-icons/Ionicons');var _Ionicons2=_interopRequireDefault(_Ionicons);
var _MaterialIcons=require('react-native-vector-icons/MaterialIcons');var _MaterialIcons2=_interopRequireDefault(_MaterialIcons);
var _Zocial=require('react-native-vector-icons/Zocial');var _Zocial2=_interopRequireDefault(_Zocial);
var _SimpleLineIcons=require('react-native-vector-icons/SimpleLineIcons');var _SimpleLineIcons2=_interopRequireDefault(_SimpleLineIcons);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var ICON_SET_MAP={
fontawesome:_FontAwesome2.default,
foundation:_Foundation2.default,
ion:_Ionicons2.default,
material:_MaterialIcons2.default,
zocial:_Zocial2.default,
simpleline:_SimpleLineIcons2.default};var




Icon=function(_React$Component){_inherits(Icon,_React$Component);function Icon(){var _ref;var _temp,_this,_ret;_classCallCheck(this,Icon);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=Icon.__proto__||Object.getPrototypeOf(Icon)).call.apply(_ref,[this].concat(args))),_this),_this.












iconRef=null,_this.

handleComponentRef=function(ref){
_this.iconRef=ref;
},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(Icon,[{key:'setNativeProps',value:function setNativeProps(nativeProps){if(this.iconRef){this.iconRef.setNativeProps(nativeProps);}}},{key:'render',value:function render()

{
var nameParts=this.props.name.split('|');
var setName=nameParts[0];
var name=nameParts[1];

var IconSet=ICON_SET_MAP[setName];
if(!IconSet){
throw new Error('Invalid icon set "'+setName+'"');
}

return(
_react2.default.createElement(IconSet,_extends({
allowFontScaling:false,
ref:this.handleComponentRef},
this.props,{
name:name})));


}}]);return Icon;}(_react2.default.Component);Icon.propTypes={name:_react2.default.PropTypes.string.isRequired,size:_react2.default.PropTypes.number,color:_react2.default.PropTypes.string};exports.default=Icon;