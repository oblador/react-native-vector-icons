import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  type TextStyle,
  type ViewStyle,
  type TouchableHighlightProps,
  type TouchableNativeFeedbackProps,
} from 'react-native';
import { pick, omit } from './object-utils';
import type { IconProps } from './create-icon-set';

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

const TEXT_PROP_NAMES = [
  'ellipsizeMode',
  'numberOfLines',
  'textBreakStrategy',
  'selectable',
  'suppressHighlighting',
  'allowFontScaling',
  'adjustsFontSizeToFit',
  'minimumFontScale',
];

const TOUCHABLE_PROP_NAMES = [
  'accessible',
  'accessibilityLabel',
  'accessibilityHint',
  'accessibilityComponentType',
  'accessibilityRole',
  'accessibilityStates',
  'accessibilityTraits',
  'onFocus',
  'onBlur',
  'disabled',
  'onPress',
  'onPressIn',
  'onPressOut',
  'onLayout',
  'onLongPress',
  'nativeID',
  'testID',
  'delayPressIn',
  'delayPressOut',
  'delayLongPress',
  'activeOpacity',
  'underlayColor',
  'selectionColor',
  'onShowUnderlay',
  'onHideUnderlay',
  'hasTVPreferredFocus',
  'tvParallaxProperties',
];

export type IconButtonProps<T> = IconProps<T> &
  TouchableHighlightProps &
  TouchableNativeFeedbackProps & {
    color?: TextStyle['color'];
    borderRadius?: number;
    iconStyle?: TextStyle;
    style?: ViewStyle | TextStyle; // FIXME: should this be both
    backgroundColor?: ViewStyle['backgroundColor'];
    // size: PropTypes.number,
    // children: PropTypes.node,
  };

export const createIconButtonComponent =
  <T extends string>(Icon: (props: IconProps<T>) => JSX.Element) =>
  ({
    name,
    color = 'white',
    borderRadius = 5,
    iconStyle,
    style,
    backgroundColor = IOS7_BLUE,
    size = 20,
    children,
    ...restProps
  }: IconButtonProps<T>) => {
    const iconProps = {
      ...pick(restProps, ...TEXT_PROP_NAMES),
      style,
      name,
      size,
      color,
    };

    const touchableProps = pick(restProps, ...TOUCHABLE_PROP_NAMES);

    const props = omit(
      restProps,
      ...Object.keys(iconProps),
      ...Object.keys(touchableProps)
    );

    iconProps.style = iconStyle ? [styles.icon, iconStyle] : styles.icon;

    const colorStyle = { color };
    const blockStyle = { backgroundColor, borderRadius };

    return (
      <TouchableHighlight
        style={[styles.touchable, blockStyle]}
        {...touchableProps}
      >
        <View style={[styles.container, blockStyle, style]} {...props}>
          <Icon {...iconProps} />
          {typeof children === 'string' ? (
            <Text style={[styles.text, colorStyle]} selectable={false}>
              {children}
            </Text>
          ) : (
            children
          )}
        </View>
      </TouchableHighlight>
    );
  };

export default createIconButtonComponent;
