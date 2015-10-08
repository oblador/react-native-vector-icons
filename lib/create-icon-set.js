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

var DEFAULT_ICON_SIZE = 12;
var TAB_BAR_ICON_SIZE = 30;
var DEFAULT_ICON_COLOR = 'black';

var TypefaceTextView;

if(Platform.OS === 'android') {
  TypefaceTextView = require('./TypefaceTextView');
}

function createIconSet(glyphMap : Object, fontFamily : string, fontFile : string) : Function {
  var Icon = React.createClass({
    propTypes: {
      name: React.PropTypes.oneOf(Object.keys(glyphMap)).isRequired,
      size: React.PropTypes.number,
      color: React.PropTypes.string,
    },

    setNativeProps: function(nativeProps) {
      this._root.setNativeProps(nativeProps);
    },

    render: function() {
      var { name, size, color, style, ...props } = this.props;

      var glyph = glyphMap[name] || '?';
      if(typeof glyph === 'number') {
        glyph = String.fromCharCode(glyph);
      }

      size = size || DEFAULT_ICON_SIZE;
      color = color || DEFAULT_ICON_COLOR;

      var styleDefaults = {
        fontSize: size,
        color,
      };

      props.style = [styleDefaults, style];
      props.ref = (component) => this._root = component;

      // For android we have to use our own subclass of the TextView since it
      // doesn't yet support custom fonts
      if(Platform.OS === 'android') {
        // FIXME: Temporary workaround until I can figure out how to automatically size icons
        styleDefaults.width = size;
        styleDefaults.height = size;
        styleDefaults.lineHeight = size;
        return (<TypefaceTextView {...props} fontFile={fontFile}>{glyph}</TypefaceTextView>);
      }

      styleDefaults.fontFamily = fontFamily;
      return (<Text {...props}>{glyph}</Text>);
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

    if(processColor) {
      color = processColor(color);
    }

    var cacheKey = glyph + ':' + size + ':' + color;

    return new Promise((resolve, reject) => {
      var cached = imageSourceCache[cacheKey];
      if(typeof cached !== 'undefined') {
        if(!cached || cached instanceof Error ) { reject(cached); }
        return resolve({ uri: cached });
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
