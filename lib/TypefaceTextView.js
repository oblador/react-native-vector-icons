/**
 * @providesModule TypefaceTextView
 */
'use strict';

// This component is a temporary workaround for android until RN core supports custom fonts

var React = require('react-native');
var {
  PropTypes,
  requireNativeComponent,
} = React;

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
var RNTypefaceTextView = requireNativeComponent('RNTypefaceTextView', iface);

var TypefaceTextView = React.createClass({

  getChildContext: function(): Object {
    return {isInAParentText: true};
  },

  childContextTypes: {
    isInAParentText: React.PropTypes.bool
  },
  render: function() {
    return <RNTypefaceTextView {...this.props} />;
  },
});

module.exports = TypefaceTextView;
