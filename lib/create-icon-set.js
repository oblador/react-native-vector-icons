/**
 * @providesModule createIconSet
 */
'use strict';

var _ = require('lodash');
var React = require('react-native');
var {
  View,
  Text,
  StyleSheet,
  TabBarIOS,
} = React;
var NativeModules = require('NativeModules');
var RNVectorIconsManager = NativeModules.RNVectorIconsManager;
var invariant = require('invariant');
var merge = require('merge');
var flattenStyle = require('flattenStyle');
var ViewStylePropTypes = require('ViewStylePropTypes');
var TextStylePropTypes = require('TextStylePropTypes');

var DEFAULT_ICON_SIZE = 12;
var TAB_BAR_ICON_SIZE = 30;

function createIconSet(glyphMap, fontFamily) {
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
        React.PropTypes.object  // Inline style declaration
      ])
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
      textStyle.fontSize    = size;
      textStyle.lineHeight  = size;
      textStyle.height      = size;

      if(this.props.color) {
        textStyle.color = this.props.color;
      }

      return (
        <View {...this.props} style={[containerStyle]}>
          <Text style={textStyle}>{glyph}</Text>
          {this.props.children}
        </View>
      );
    }
  });

  var imageSourceCache = {};

  var getImageSource = function(name, size) {
    invariant(RNVectorIconsManager, 'RNVectorIconsManager not available, did you add the library to your project and link with libRNVectorIcons.a?');

    var glyph = glyphMap[name] || '?';
    if(typeof glyph === 'number') {
      glyph = String.fromCharCode(glyph);
    }
    size = size || DEFAULT_ICON_SIZE;

    var cacheKey = glyph + ':' + size;

    return new Promise((resolve, reject) => {
      var cached = imageSourceCache[cacheKey];
      if(typeof cached !== 'undefined') {
        if(!cached) { return reject(); }
        return resolve({ uri: cached });
      }
      RNVectorIconsManager.getImageForFont(fontFamily, glyph, size, function(err, image) {
        imageSourceCache[cacheKey] = image || false;
        if(!err && image) {
          return resolve({ uri: image });
        }
        reject();
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

  return Icon;
};

module.exports = createIconSet;
