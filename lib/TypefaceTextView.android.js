var {
  PropTypes,
  requireNativeComponent,
} = require('react-native');

var iface = {
  name: 'TypefaceTextView',
  propTypes: {
    fontFile: PropTypes.string,
    glyph: PropTypes.string,
    numberOfLines: PropTypes.number,
  },
};

module.exports = requireNativeComponent('RNTypefaceTextView', iface);
