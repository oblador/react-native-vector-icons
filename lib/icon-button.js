import isString from 'lodash/isString';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableHighlight, View } from './react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 8,
  },
  touchable: {
    overflow: 'hidden',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
});

const IOS7_BLUE = '#007AFF';

export default function createIconButtonComponent(Icon) {
  return class IconButton extends Component {
    static propTypes = {
      backgroundColor: PropTypes.string,
      borderRadius: PropTypes.number,
      color: PropTypes.string,
      size: PropTypes.number,
      iconStyle: PropTypes.any, // eslint-disable-line react/forbid-prop-types
      style: PropTypes.any, // eslint-disable-line react/forbid-prop-types
      children: PropTypes.node,
    };

    static defaultProps = {
      backgroundColor: IOS7_BLUE,
      borderRadius: 5,
      color: 'white',
      size: 20,
    };

    render() {
      const { style, iconStyle, children, ...restProps } = this.props;

      const iconProps = pick(
        restProps,
        Object.keys(Text.propTypes),
        'style',
        'name',
        'size',
        'color'
      );
      const touchableProps = pick(
        restProps,
        Object.keys(TouchableHighlight.propTypes)
      );
      const props = omit(
        restProps,
        Object.keys(iconProps),
        Object.keys(touchableProps),
        'iconStyle',
        'borderRadius',
        'backgroundColor'
      );
      iconProps.style = iconStyle ? [styles.icon, iconStyle] : styles.icon;

      const colorStyle = pick(this.props, 'color');
      const blockStyle = pick(this.props, 'backgroundColor', 'borderRadius');

      return (
        <TouchableHighlight
          style={[styles.touchable, blockStyle]}
          {...touchableProps}
        >
          <View style={[styles.container, blockStyle, style]} {...props}>
            <Icon {...iconProps} />
            {isString(children)
              ? <Text style={[styles.text, colorStyle]}>{children}</Text>
              : children}
          </View>
        </TouchableHighlight>
      );
    }
  };
}
