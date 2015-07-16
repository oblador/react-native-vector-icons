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
  NativeModules,
} = React;
var RNVectorIconsManager = NativeModules.RNVectorIconsManager;
var flattenStyle = require('react-native/Libraries/StyleSheet/flattenStyle');
var ViewStylePropTypes = require('react-native/Libraries/Components/View/ViewStylePropTypes');
var TextStylePropTypes = require('react-native/Libraries/Text/TextStylePropTypes');

var DEFAULT_ICON_SIZE = 12;
var TAB_BAR_ICON_SIZE = 30;
var DEFAULT_ICON_COLOR = 'black';

function createIconSet(glyphMap : Object, fontFamily : string) : Function {
  var styles = StyleSheet.create({
    container: {
      overflow:         'hidden',
      backgroundColor:  'transparent',
      flexDirection:    'row',
      justifyContent:   'flex-start',
      alignItems:       'center',
    },
    text: {
      fontFamily,
    }
  });

  var Icon = React.createClass({
    propTypes:{
      name: React.PropTypes.oneOf(Object.keys(glyphMap)).isRequired,
      size: React.PropTypes.number,
      color: React.PropTypes.string,
      style: React.PropTypes.oneOfType([
        React.PropTypes.number, // References to style sheets are numbers
        React.PropTypes.object, // Inline style declaration
        React.PropTypes.array,  // Multiple styles to be merged
      ])
    },

    setNativeProps(nativeProps) {
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
        flattenStyle([this.props.style, styles.text]),
        Object.keys(TextStylePropTypes)
      );

      var size = this.props.size || textStyle.fontSize || DEFAULT_ICON_SIZE;
      var color = this.props.color || textStyle.color || DEFAULT_ICON_COLOR;

      textStyle.fontSize    = size;
      textStyle.lineHeight  = size;
      textStyle.height      = size;
      textStyle.color       = color;

      return (
        <View ref={component => this._root = component} {...this.props} style={containerStyle}>
          <Text style={textStyle}>{glyph}</Text>
          {this.props.children}
        </View>
      );
    }
  });

  var imageSourceCache = {};

  var getImageSource = function(name : string, size? : number, color? : string) : Promise {
    if(!RNVectorIconsManager) {
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
      RNVectorIconsManager.getImageForFont(fontFamily, glyph, size, color, function(err, image) {
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
    componentDidMount: function() {
      var size = this.props.iconSize || TAB_BAR_ICON_SIZE;
      if(this.props.iconName) {
        getImageSource(this.props.iconName, size).then((image) => this.setState({ icon: image }));
      }
      if(this.props.selectedIconName) {
        getImageSource(this.props.selectedIconName, size).then((image) => this.setState({ selectedIcon: image }));
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
