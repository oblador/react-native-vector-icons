/**
* @providesModule FontMapper
* @flow
*/
'use strict';

let React = require('react-native');
let {
  Platform
} = React


let FontMapper = React.createClass({
  propTypes: {
    size: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.object
          ]),
    iOSFont: React.PropTypes.func,
    androidFont: React.PropTypes.func,
    iOSToAndroidMap: React.PropTypes.object,
    androidToIOSMap: React.PropTypes.object,
  },

  getDefaultProps: function () {
    return {
      iOSToAndroidMap: {},
      androidToIOSMap: {}
    };
  },

  render() {
    let PlatformFont
    let {name, size, ...rest} = this.props

    if (Platform.OS === 'android') {
      PlatformFont = this.props.androidFont
      name = this.props.iOSToAndroidMap[this.props.name] || name
    } else if (Platform.OS === 'ios') {
      PlatformFont =  this.props.iOSFont
      name = this.props.androidToIOSMap[this.props.name] || name
    }

    if (typeof(size) == "object") {
      if (Platform.OS === 'android') {
        size = size.android || size
      } else if (Platform.OS === 'ios') {
        size= size.ios || size
      }
    }

    return (
      <PlatformFont
        name={name}
        size={size}
        {...rest} />
    )
  }
})

module.exports = FontMapper;
