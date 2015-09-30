/**
 * @providesModule createIconSet
 * @flow
 */
'use strict';

var _ = require('lodash');
var React = require('react-native');
var {
  View,
  Text,
  StyleSheet,
  TabBarIOS,
  requireNativeComponent,
  NativeModules,
  Platform,
  processColor,
} = React;

var NativeIconAPI = NativeModules.RNVectorIconsManager || NativeModules.RNVectorIconsModule;
var StyleSheetPropType = require('react-native/Libraries/StyleSheet/StyleSheetPropType');
var flattenStyle = require('react-native/Libraries/StyleSheet/flattenStyle');
var ViewStylePropTypes = require('react-native/Libraries/Components/View/ViewStylePropTypes');
var TextStylePropTypes = require('react-native/Libraries/Text/TextStylePropTypes');

var DEFAULT_ICON_SIZE = 12;
var TAB_BAR_ICON_SIZE = 30;
var DEFAULT_ICON_COLOR = 'black';

var TypefaceTextView;

if(Platform.OS === 'android') {
  TypefaceTextView = require('./TypefaceTextView');
}

function createIconSet(glyphMap : Object, fontFamily : string, fontFile : string) : Function {
  var styles = StyleSheet.create({
    container: {
      overflow:         'hidden',
      backgroundColor:  'transparent',
      flexDirection:    'row',
      justifyContent:   'flex-start',
      alignItems:       'center',
    },
  });

  var Icon = React.createClass({
    propTypes: {
      name: React.PropTypes.oneOf(Object.keys(glyphMap)).isRequired,
      size: React.PropTypes.number,
      color: React.PropTypes.string,
      style: StyleSheetPropType(TextStylePropTypes)
    },

    setNativeProps: function(nativeProps) {
      this._root.setNativeProps(nativeProps);
    },

    render: function() {

      var name = this.props.name;
      var glyph = glyphMap[name] || '?';
      if(typeof glyph === 'number') {
        glyph = String.fromCharCode(glyph);
      }

      var containerStyle = _.pick(flattenStyle([styles.container, this.props.style]), Object.keys(ViewStylePropTypes));

      var textStyle = _.pick(
        flattenStyle([this.props.style]),
        Object.keys(TextStylePropTypes)
      );

      var size = this.props.size || textStyle.fontSize || DEFAULT_ICON_SIZE;
      var color = this.props.color || textStyle.color || DEFAULT_ICON_COLOR;

      textStyle.fontSize    = size;
      textStyle.lineHeight  = size;
      textStyle.height      = size;
      textStyle.color       = color;

      var icon;
      // For android we have to use our own subclass of the TextView since it
      // doesn't yet support custom fonts
      if(Platform.OS === 'android') {
        if(!textStyle.width) {
          // FIXME: Temporary workaround until I can figure out how to automatically size icons
          textStyle.width = size;
        }
        icon = (<TypefaceTextView style={textStyle} fontFile={fontFile}>{glyph}</TypefaceTextView>);
      } else {
        textStyle.fontFamily = fontFamily;
        icon = (<Text style={textStyle}>{glyph}</Text>);
      }

      return (
        <View ref={component => this._root = component} {...this.props} style={containerStyle}>
          {icon}
          {this.props.children}
        </View>
      );
    }
  });

  var imageSourceCache = {};

  var getImageSource = function(name : string, size? : number, color? : string) : Promise {
    if(!NativeIconAPI) {
      if(Platform.OS === 'android') {
        throw new Error('RNVectorIconsModule not available, did you properly integrate the module?');
      }
      throw new Error('RNVectorIconsManager not available, did you add the library to your project and link with libRNVectorIcons.a?');
    }

    var glyph = glyphMap[name] || '?';
    if(typeof glyph === 'number') {
      glyph = String.fromCharCode(glyph);
    }
    size = size || DEFAULT_ICON_SIZE;
    color = color || DEFAULT_ICON_COLOR;

    var cacheKey = glyph + ':' + size + ':' + color;

    return new Promise((resolve, reject) => {
      var cached = imageSourceCache[cacheKey];
      if(typeof cached !== 'undefined') {
        if(!cached || cached instanceof Error ) { reject(cached); }
        return resolve({ uri: cached });
      }
      if(Platform.OS === 'android') {
        color = processColor(color);
      }
      NativeIconAPI.getImageForFont(Platform.OS === 'android' ? fontFile : fontFamily, glyph, size, color, function(err, image) {
        if(typeof err === 'string') {
          err = new Error(err);
        }
        imageSourceCache[cacheKey] = image || err || false;
        if(!err && image) {
          return resolve({ uri: image });
        }
        reject(err);
      });
    });
  };


  var TabBarItem = React.createClass({
    propTypes: {
      iconName: React.PropTypes.oneOf(Object.keys(glyphMap)).isRequired,
      selectedIconName: React.PropTypes.oneOf(Object.keys(glyphMap)),
      iconSize: React.PropTypes.number,
    },

    updateIconSources: function() {
      var size = this.props.iconSize || TAB_BAR_ICON_SIZE;
      if(this.props.iconName) {
        getImageSource(this.props.iconName, size).then(icon => this.setState({ icon }));
      }
      if(this.props.selectedIconName) {
        getImageSource(this.props.selectedIconName, size).then(selectedIcon => this.setState({ selectedIcon }));
      }
    },

    componentWillMount: function() {
      this.updateIconSources();
    },

    componentWillReceiveProps: function(nextProps) {
      var keys = Object.keys(TabBarItem.propTypes);
      if(!_.isEqual(_.pick(nextProps, keys), _.pick(this.props, keys))) {
        this.updateIconSources();
      }
    },

    render: function() {
      return <TabBarIOS.Item {...this.props} {...this.state} />;
    }
  });

  Icon.TabBarItem = TabBarItem;
  Icon.getImageSource = getImageSource;

  return Icon;
};

module.exports = createIconSet;
