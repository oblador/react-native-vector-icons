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
} = React;
var NativeModules = require('NativeModules');
var RNVectorIconsManager = NativeModules.RNVectorIconsManager;
var invariant = require('invariant');
var merge = require('merge');
var flattenStyle = require('flattenStyle');
var ViewStylePropTypes = require('ViewStylePropTypes');
var TextStylePropTypes = require('TextStylePropTypes');


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

      var size = this.props.size || textStyle.fontSize || 12;
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
  Icon.getImageSource = function(name, size, callback) {
    invariant(RNVectorIconsManager, 'RNVectorIconsManager not available, did you add the library to your project and link with libRNVectorIcons.a?');

    var glyph = glyphMap[name] || '?';
    if(typeof glyph === 'number') {
      glyph = String.fromCharCode(glyph);
    }

    return new Promise((resolve, reject) => {
      RNVectorIconsManager.getImageForFont(fontFamily, glyph, size || 12, function(err, image) {
        callback && callback(err, image);
        if (err) {
          reject(err);
        } else {
          resolve(image);
        }
      });
    });

  };

  return Icon;
};

module.exports = createIconSet;
