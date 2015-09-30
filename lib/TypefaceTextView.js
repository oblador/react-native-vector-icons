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
    numberOfLines: PropTypes.number,
  },
};

module.exports = requireNativeComponent('RNTypefaceTextView', iface);
