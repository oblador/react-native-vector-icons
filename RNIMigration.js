import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const ICON_SET_MAP = {
  fontawesome: FontAwesome,
  foundation: Foundation,
  ion: Ionicons,
  material: MaterialIcons,
  zocial: Zocial,
  simpleline: SimpleLineIcons,
};

// This is a composition is a drop in replacement for users migrating from the
// react-native-icons module. Please don't use this component for new apps/views.
export default class Icon extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
  };

  setNativeProps(nativeProps) {
    if (this.iconRef) {
      this.iconRef.setNativeProps(nativeProps);
    }
  }

  iconRef = null;

  handleComponentRef = ref => {
    this.iconRef = ref;
  };

  render() {
    const nameParts = this.props.name.split('|');
    const setName = nameParts[0];
    const name = nameParts[1];

    const IconSet = ICON_SET_MAP[setName];
    if (!IconSet) {
      throw new Error(`Invalid icon set "${setName}"`);
    }

    return (
      <IconSet
        allowFontScaling={false}
        ref={this.handleComponentRef}
        {...this.props}
        name={name}
      />
    );
  }
}
