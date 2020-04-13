import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View } from './react-native';

export default function createStackedIconSet(...iconSets) {
  function createStackedIconClass(selectClass = '') {
    const iconComponents = iconSets.map(iconSet =>
      selectClass.length > 0 ? iconSet[selectClass] : iconSet
    );

    class IconClass extends PureComponent {
      static propTypes = {
        ...iconSets.reduce(
          (acc, iconSet) => ({
            ...acc,
            ...iconSet.propTypes,
          }),
          {}
        ),
        colors: PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        ),
      };

      static defaultProps = {
        colors: [],
      };

      render() {
        const { colors, style, ...props } = this.props;

        return (
          <View>
            {iconComponents.map((IconComponent, i) => (
              <IconComponent
                key={i} // eslint-disable-line react/no-array-index-key
                color={colors[i] || 'black'}
                style={[style, i > 0 ? StyleSheet.absoluteFill : undefined]}
                {...props}
              />
            ))}
          </View>
        );
      }
    }

    return IconClass;
  }

  function getStackedIconSets() {
    return iconSets;
  }

  function getFontFamily() {
    return iconSets.map(iconSet => iconSet.getFontFamily());
  }

  function getRawGlyphMap(name) {
    return iconSets.map(iconSet => iconSet.getRawGlyphMap(name));
  }

  function hasIcon(name) {
    return iconSets.map(iconSet => iconSet.hasIcon(name));
  }

  function getImageSourceSync(name, size, color) {
    return iconSets.map(iconSet =>
      iconSet.getImageSourceSync(name, size, color)
    );
  }

  function getImageSource(name, size, color) {
    return Promise.all(
      iconSets.map(iconSet => iconSet.getImageSource(name, size, color))
    );
  }

  const Icon = createStackedIconClass();
  Icon.Button = createStackedIconClass('Button');
  Icon.TabBarItem = createStackedIconClass('TabBarItem');
  Icon.TabBarItemIOS = createStackedIconClass('TabBarItemIOS');
  Icon.ToolbarAndroid = createStackedIconClass('ToolbarAndroid');
  Icon.getStackedIconSets = getStackedIconSets;
  Icon.getFontFamily = getFontFamily;
  Icon.getRawGlyphMap = getRawGlyphMap;
  Icon.hasIcon = hasIcon;

  Icon.getImageSource = getImageSource;
  Icon.getImageSourceSync = getImageSourceSync;

  return Icon;
}
