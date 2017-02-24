Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();exports.default=











createToolbarAndroidComponent;var _isEqual=require('lodash/isEqual');var _isEqual2=_interopRequireDefault(_isEqual);var _pick=require('lodash/pick');var _pick2=_interopRequireDefault(_pick);var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactNative=require('./react-native');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function createToolbarAndroidComponent(IconNamePropType,getImageSource){var _class,_temp;
return _temp=_class=function(_Component){_inherits(IconToolbarAndroid,_Component);function IconToolbarAndroid(){_classCallCheck(this,IconToolbarAndroid);return _possibleConstructorReturn(this,(IconToolbarAndroid.__proto__||Object.getPrototypeOf(IconToolbarAndroid)).apply(this,arguments));}_createClass(IconToolbarAndroid,[{key:'updateIconSources',value:function updateIconSources(




















props){var _this2=this;
var size=props.iconSize;
var color=props.iconColor||props.titleColor;
if(props.logoName){
getImageSource(props.logoName,size,color).
then(function(logo){return _this2.setState({logo:logo});});
}
if(props.navIconName){
getImageSource(props.navIconName,size,color).
then(function(navIcon){return _this2.setState({navIcon:navIcon});});
}
if(props.overflowIconName){
getImageSource(props.overflowIconName,size,color).
then(function(overflowIcon){return _this2.setState({overflowIcon:overflowIcon});});
}

Promise.all((props.actions||[]).map(function(action){
if(action.iconName){
return getImageSource(action.iconName,action.iconSize||size,action.iconColor||color).
then(function(icon){return _extends({},action,{icon:icon});});
}
return Promise.resolve(action);
})).then(function(actions){return _this2.setState({actions:actions});});
}},{key:'componentWillMount',value:function componentWillMount()

{
this.updateIconSources(this.props);
}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nextProps){var _this3=this;
var keys=Object.keys(IconToolbarAndroid.propTypes);
if(!(0,_isEqual2.default)((0,_pick2.default)(nextProps,keys),(0,_pick2.default)(this.props,keys))){
var stateToEvict={};
if(!nextProps.logoName){
stateToEvict.logo=undefined;
}
if(!nextProps.navIconName){
stateToEvict.navIcon=undefined;
}
if(!nextProps.overflowIconName){
stateToEvict.overflowIcon=undefined;
}
if(this.state&&Object.keys(stateToEvict).length){
this.setState(stateToEvict,function(){return _this3.updateIconSources(nextProps);});
}else{
this.updateIconSources(nextProps);
}
}
}},{key:'render',value:function render()

{
return _react2.default.createElement(_reactNative.ToolbarAndroid,_extends({},this.props,this.state));
}}]);return IconToolbarAndroid;}(_react.Component),_class.propTypes={logoIconName:IconNamePropType,navIconName:IconNamePropType,overflowIconName:IconNamePropType,actions:_react.PropTypes.arrayOf(_react.PropTypes.shape({title:_react.PropTypes.string.isRequired,iconName:IconNamePropType,iconSize:_react.PropTypes.number,iconColor:_react.PropTypes.string,show:_react.PropTypes.oneOf(['always','ifRoom','never']),showWithText:_react.PropTypes.bool})),iconSize:_react.PropTypes.number,iconColor:_react.PropTypes.string},_class.defaultProps={iconSize:24},_temp;

}