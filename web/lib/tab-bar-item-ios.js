Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();exports.default=











createTabBarItemIOSComponent;var _isEqual=require('lodash/isEqual');var _isEqual2=_interopRequireDefault(_isEqual);var _pick=require('lodash/pick');var _pick2=_interopRequireDefault(_pick);var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNative=require('./react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function createTabBarItemIOSComponent(IconNamePropType,getImageSource){var _class,_temp;
return _temp=_class=function(_Component){_inherits(TabBarItemIOS,_Component);function TabBarItemIOS(){_classCallCheck(this,TabBarItemIOS);return _possibleConstructorReturn(this,(TabBarItemIOS.__proto__||Object.getPrototypeOf(TabBarItemIOS)).apply(this,arguments));}_createClass(TabBarItemIOS,[{key:'updateIconSources',value:function updateIconSources(












props){var _this2=this;
if(props.iconName){
getImageSource(props.iconName,props.iconSize,props.iconColor).
then(function(icon){return _this2.setState({icon:icon});});
}
if(props.selectedIconName||props.selectedIconColor){
var selectedIconName=props.selectedIconName||props.iconName;
var selectedIconColor=props.selectedIconColor||props.iconColor;
getImageSource(selectedIconName,props.iconSize,selectedIconColor).
then(function(selectedIcon){return _this2.setState({selectedIcon:selectedIcon});});
}
}},{key:'componentWillMount',value:function componentWillMount()

{
this.updateIconSources(this.props);
}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nextProps){
var keys=Object.keys(TabBarItemIOS.propTypes);
if(!(0,_isEqual2.default)((0,_pick2.default)(nextProps,keys),(0,_pick2.default)(this.props,keys))){
this.updateIconSources(nextProps);
}
}},{key:'render',value:function render()

{
return _react2.default.createElement(_reactNative.TabBarIOS.Item,_extends({},this.props,this.state));
}}]);return TabBarItemIOS;}(_react.Component),_class.propTypes={iconName:IconNamePropType.isRequired,selectedIconName:IconNamePropType,iconSize:_react.PropTypes.number,iconColor:_react.PropTypes.string,selectedIconColor:_react.PropTypes.string},_class.defaultProps={iconSize:30},_temp;

}