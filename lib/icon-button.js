import isString from 'lodash/isString';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import defaults from 'lodash/defaults';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, TouchableHighlight, View } from './react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 8,
  },
  touchable: {
    overflow: 'hidden',
    elevation: 5,
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
const ANDROID_BLUE = '#2196F3';

export default function createIconButtonComponent(Icon) {
  return class IconButton extends PureComponent {
    static propTypes = {
      backgroundColor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      borderRadius: PropTypes.number,
      color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      size: PropTypes.number,
      iconStyle: PropTypes.any, // eslint-disable-line react/forbid-prop-types
      style: PropTypes.any, // eslint-disable-line react/forbid-prop-types
      children: PropTypes.node,
    };

    static defaultProps = {
      backgroundColor: Platform.OS == 'android'? ANDROID_BLUE : IOS7_BLUE,
      borderRadius: Platform.OS == 'android'? 3 : 5,
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
      const defaultIconStyle = children? styles.icon : defaults({ marginRight: 0 }, styles.icon);
      iconProps.style = iconStyle ? [defaultIconStyle, iconStyle] : defaultIconStyle;

      const colorStyle = pick(this.props, 'color');
      const blockStyle = pick(this.props, 'backgroundColor', 'borderRadius');

      return (
        <TouchableHighlight
          style={[styles.touchable, blockStyle]}
          {...touchableProps}
        >
          <View style={[styles.container, blockStyle, style]} {...props}>
            <Icon {...iconProps} />
            {isString(children) ? (
              <Text style={[styles.text, colorStyle]}>
                {Platform.OS == 'android'? children.toUpperCase() : children}
              </Text>
            ) : (
              children
            )}
          </View>
        </TouchableHighlight>
      );
    }
  };
}
