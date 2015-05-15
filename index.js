'use strict';

var _ = require('lodash');
var React = require('react-native');
var {
  View,
  Text,
  StyleSheet,
} = React;
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

  return React.createClass({
    propTypes:{
      name: React.PropTypes.oneOf(Object.keys(glyphMap)).isRequired,
      size: React.PropTypes.number,
      style: React.PropTypes.oneOfType([
        React.PropTypes.number, // References to style sheets are numbers
        React.PropTypes.object  // Inline style declaration
      ])
    },
    render: function() {

      var name = this.props.name;
      var glyph = glyphMap[name] || '?';

      var containerStyle = _.pick(flattenStyle([styles.container, this.props.style]), Object.keys(ViewStylePropTypes));

      var textStyle = _.pick(
        flattenStyle([this.props.style, styles.text]),
        Object.keys(TextStylePropTypes)
      );

      var size = this.props.size || textStyle.fontSize || 12;
      textStyle.fontSize    = size;
      textStyle.lineHeight  = size;
      textStyle.height      = size;

      return (
        <View {...this.props} style={[containerStyle]}>
          <Text style={textStyle}>{glyph}</Text>
          {this.props.children}
        </View>
      );
    }
  });
};

function createIconSetFromFontello(config, fontFamily) {
  var glyphMap = {};
  config.glyphs.forEach(function (glyph) {
    glyphMap[glyph.css] = String.fromCharCode(glyph.code);
  });
  return createIconSet(glyphMap, fontFamily || config.name)
};

module.exports = {
  createIconSet,
  createIconSetFromFontello,
};
