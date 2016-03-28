'use strict';

var React = require('react-native');
var FontAwesome = require('react-native-vector-icons/FontAwesome');
var Foundation = require('react-native-vector-icons/Foundation');
var Ionicons = require('react-native-vector-icons/Ionicons');
var MaterialIcons = require('react-native-vector-icons/MaterialIcons');
var Zocial = require('react-native-vector-icons/Zocial');

var iconSetMap = {
  fontawesome: FontAwesome,
  foundation: Foundation,
  ion: Ionicons,
  material: MaterialIcons,
  zocial: Zocial
};

// This is a composition is a drop in replacement for users migrating from the
// react-native-icons module. Please don't use this component for new apps/views.
var Icon = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    size: React.PropTypes.number,
    color: React.PropTypes.string,
  },
  _root: (null:?Object),

  setNativeProps: function(nativeProps) {
    if (this._root == null) {
      throw new Error("Ref must have been set before calling setNativeProps");
    }
    this._root.setNativeProps(nativeProps);
  },

  render: function() {
    var { name, ...props } = this.props;

    var nameParts = name.split('|');
    var setName = nameParts[0];
    props.name = nameParts[1];
    props.ref = (component) => this._root = component;

    var IconSet = iconSetMap[setName];
    if(!IconSet) {
      throw new Error('Invalid icon set "' + setName + '"');
    }
    return (<IconSet allowFontScaling={false} {...props} />);
  }
});

module.exports = Icon;
