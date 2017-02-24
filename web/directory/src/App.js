Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
require('./App.css');
var _Entypo=require('../../glyphmaps/Entypo.json');var _Entypo2=_interopRequireDefault(_Entypo);
var _EvilIcons=require('../../glyphmaps/EvilIcons.json');var _EvilIcons2=_interopRequireDefault(_EvilIcons);
var _FontAwesome=require('../../glyphmaps/FontAwesome.json');var _FontAwesome2=_interopRequireDefault(_FontAwesome);
var _Foundation=require('../../glyphmaps/Foundation.json');var _Foundation2=_interopRequireDefault(_Foundation);
var _Ionicons=require('../../glyphmaps/Ionicons.json');var _Ionicons2=_interopRequireDefault(_Ionicons);
var _MaterialCommunityIcons=require('../../glyphmaps/MaterialCommunityIcons.json');var _MaterialCommunityIcons2=_interopRequireDefault(_MaterialCommunityIcons);
var _MaterialIcons=require('../../glyphmaps/MaterialIcons.json');var _MaterialIcons2=_interopRequireDefault(_MaterialIcons);
var _SimpleLineIcons=require('../../glyphmaps/SimpleLineIcons.json');var _SimpleLineIcons2=_interopRequireDefault(_SimpleLineIcons);
var _Octicons=require('../../glyphmaps/Octicons.json');var _Octicons2=_interopRequireDefault(_Octicons);
var _Zocial=require('../../glyphmaps/Zocial.json');var _Zocial2=_interopRequireDefault(_Zocial);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var IconFamilies={
Entypo:_Entypo2.default,
EvilIcons:_EvilIcons2.default,
FontAwesome:_FontAwesome2.default,
Foundation:_Foundation2.default,
Ionicons:_Ionicons2.default,
MaterialCommunityIcons:_MaterialCommunityIcons2.default,
MaterialIcons:_MaterialIcons2.default,
SimpleLineIcons:_SimpleLineIcons2.default,
Octicons:_Octicons2.default,
Zocial:_Zocial2.default};var


Icon=function(_Component){_inherits(Icon,_Component);function Icon(){_classCallCheck(this,Icon);return _possibleConstructorReturn(this,(Icon.__proto__||Object.getPrototypeOf(Icon)).apply(this,arguments));}_createClass(Icon,[{key:'render',value:function render()





{
return(
_react2.default.createElement('span',_extends({style:{fontFamily:this.props.family}},this.props),
String.fromCharCode(IconFamilies[this.props.family][this.props.name])));


}}]);return Icon;}(_react.Component);Icon.propTypes={family:_react.PropTypes.string.isRequired,name:_react.PropTypes.string.isRequired};


var HeaderBar=function HeaderBar(props){
return(
_react2.default.createElement('div',{className:'Header-Container'},
_react2.default.createElement('div',{className:'Header-Content'},
_react2.default.createElement('h1',{className:'Header-Title'},'react-native-vector-icons directory'))));





};var

SearchBar=function(_Component2){_inherits(SearchBar,_Component2);function SearchBar(){var _ref;var _temp,_this2,_ret;_classCallCheck(this,SearchBar);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this2=_possibleConstructorReturn(this,(_ref=SearchBar.__proto__||Object.getPrototypeOf(SearchBar)).call.apply(_ref,[this].concat(args))),_this2),_this2.
handleSubmit=function(e){
e.preventDefault();
_this2.props.onSubmit(_this2.inputRef.value);
},_temp),_possibleConstructorReturn(_this2,_ret);}_createClass(SearchBar,[{key:'render',value:function render()

{var _this3=this;
return(
_react2.default.createElement('div',{className:'Search-Container'},
_react2.default.createElement('div',{className:'Search-Content'},
_react2.default.createElement('form',{onSubmit:this.handleSubmit},
_react2.default.createElement(Icon,{family:'FontAwesome',name:'search',className:'Search-Icon'}),
_react2.default.createElement('input',{
ref:function ref(_ref2){return _this3.inputRef=_ref2;},
placeholder:'Search for an icon',
type:'text',
className:'Search-Input'})))));




}}]);return SearchBar;}(_react.Component);var


App=function(_Component3){_inherits(App,_Component3);
function App(){_classCallCheck(this,App);var _this4=_possibleConstructorReturn(this,(App.__proto__||Object.getPrototypeOf(App)).call(this));_this4.










handleSubmit=function(text){
var matches=[];
Object.keys(IconFamilies).forEach(function(family){
var icons=IconFamilies[family];
var names=Object.keys(icons);
var results=names.filter(function(name){return name.indexOf(text)>=0;});
if(results.length){
matches=[].concat(_toConsumableArray(matches),[{family:family,names:results}]);
}
});

_this4.setState({matches:matches});
};_this4.











renderMatch=function(match){var
family=match.family,names=match.names;
return(
_react2.default.createElement('div',{className:'Result-Row',key:family},
_react2.default.createElement('h2',{className:'Result-Title'},family),

_react2.default.createElement('div',{className:'Result-List'},
names.map(function(name){return _this4.renderIcon(family,name);}))));



};_this4.state={matches:[]};return _this4;}_createClass(App,[{key:'componentDidMount',value:function componentDidMount(){this.handleSubmit('');}},{key:'renderFamily',value:function renderFamily(familyName){return _react2.default.createElement('div',null,Object.keys(IconFamilies[familyName]).map(function(iconName){return _react2.default.createElement(Icon,{key:iconName+familyName,family:familyName,name:iconName});}));}},{key:'renderIcon',value:function renderIcon(

family,name){
return(
_react2.default.createElement('div',{className:'Result-Icon-Container',key:name},
_react2.default.createElement(Icon,{
family:family,
name:name,
className:'Result-Icon'}),

_react2.default.createElement('h4',{className:'Result-Icon-Name'},
name)));



}},{key:'render',value:function render()

{
return(
_react2.default.createElement('div',{className:'App'},
_react2.default.createElement(HeaderBar,null),
_react2.default.createElement(SearchBar,{onSubmit:this.handleSubmit}),
_react2.default.createElement('div',{className:'Container'},
this.state.matches.map(this.renderMatch))));



}}]);return App;}(_react.Component);exports.default=


App;