/**
 * @providesModule TypefaceTextView
 */
'use strict';

// This component is a temporary workaround for android until RN core supports custom fonts

var {
  PropTypes,
  requireNativeComponent,
} = require('react-native');

var iface = {
  name: 'TypefaceTextView',
  propTypes: {
    fontFile: PropTypes.string,
    text: PropTypes.string,
    numberOfLines: PropTypes.number,
    scaleX: PropTypes.number,
    scaleY: PropTypes.number,
    translateX: PropTypes.number,
    translateY: PropTypes.number,
    rotation: PropTypes.number,
  },
};

module.exports = requireNativeComponent('RNTypefaceTextView', iface);
