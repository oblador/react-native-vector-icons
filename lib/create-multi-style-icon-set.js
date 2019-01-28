import React, { PureComponent } from 'react';
import { PixelRatio, Platform, processColor } from 'react-native';
import PropTypes from 'prop-types';

import createIconSet, {
  DEFAULT_ICON_COLOR,
  DEFAULT_ICON_SIZE,
  NativeIconAPI,
} from './create-icon-set';

import ensureNativeModuleAvailable from './ensure-native-module-available';

export function createMultiStyleIconSet(styles, optionsInput = {}) {
  console.log(styles)
  const styleNames = Object.keys(styles);
  if (styleNames.length === 0) throw 'You need to add at least one style';

  const options = {
    defaultStyle: styleNames[0],
    fallbackFamily: () => styleNames[0],
    glyphValidator: () => true,
    ...optionsInput,
  };

  const iconSets = styleNames.reduce((acc, name) => {
    const style = styles[name];

    acc[name] = createIconSet(
      style.glyphMap || {},
      style.fontFamily || '',
      style.fontFile || '',
      style.fontStyle || {}
    );

    return acc;
  }, {});

  function styleFromProps(props) {
    return Object.keys(props).reduce((result, propName) => {
      if (styleNames.indexOf(propName) !== -1 && props[propName] === true) {
        return propName;
      }

      return result;
    }, options.defaultStyle);
  }

  function getIconSetForProps(props) {
    const { name } = props;
    const style = styleFromProps(props);

    if (options.glyphValidator(name, style)) return iconSets[style];

    return iconSets[options.fallbackFamily(name)];
  }

  function selectIconClass(iconSet, iconClass) {
    if (iconClass.length > 0) return iconSet[iconClass];

    return iconSet;
  }

  function reduceProps(props) {
    return Object.keys(props).reduce((acc, prop) => {
      if (styleNames.indexOf(prop) === -1) acc[prop] = props[prop];
      return acc;
    }, {});
  }

  function createStyledIconClass(selectClass = '') {
    class IconClass extends PureComponent {
      static propTypes = styleNames.reduce((acc, name) => {
        acc[name] = PropTypes.bool;
        return acc;
      }, {});

      static defaultProps = styleNames.reduce((acc, name) => {
        acc[name] = false;
        return acc;
      }, {});

      render() {
        const selectedIconSet = getIconSetForProps(this.props);
        const SelectedIconClass = selectIconClass(selectedIconSet, selectClass);
        const props = reduceProps(this.props);

        console.log(selectedIconSet)

        return <SelectedIconClass {...props} />;
      }
    }

    return IconClass;
  }

  const Icon = createStyledIconClass();
  Icon.Button = createStyledIconClass('Button');
  Icon.TabBarItem = createStyledIconClass('TabBarItem');
  Icon.TabBarItemIOS = createStyledIconClass('TabBarItemIOS');
  Icon.ToolbarAndroid = createStyledIconClass('ToolbarAndroid');

  const imageSourceCache = {};

  function getImageSource(
    name,
    size = DEFAULT_ICON_SIZE,
    color = DEFAULT_ICON_COLOR,
    type = FA5Style.regular
  ) {
    ensureNativeModuleAvailable();

    let style = type;
    if (!hasIconForStyle(name, style)) {
      const fallbackFamily = fallbackForGlyph(name);
      style = familyToStyle(fallbackFamily);
    }

    if (Platform.OS === 'ios' && style !== FA5Style.brand) {
      let glyph = glyphMap[name] || '?';
      if (typeof glyph === 'number') {
        glyph = String.fromCharCode(glyph);
      }

      const processedColor = processColor(color);
      const cacheKey = `${glyph}:${size}:${processedColor}:${type}`;
      const scale = PixelRatio.get();

      return new Promise((resolve, reject) => {
        const cached = imageSourceCache[cacheKey];
        if (typeof cached !== 'undefined') {
          if (!cached || cached instanceof Error) {
            reject(cached);
          } else {
            resolve({ uri: cached, scale });
          }
        } else {
          NativeIconAPI.getImageForFontAwesome5(
            familyName,
            glyph,
            size,
            style,
            processedColor,
            (err, image) => {
              const error = typeof err === 'string' ? new Error(err) : err;
              imageSourceCache[cacheKey] = image || error || false;
              if (!error && image) {
                resolve({ uri: image, scale });
              } else {
                reject(error);
              }
            }
          );
        }
      });
    }

    const iconSet = iconSetFromStyle(style);
    return iconSet.getImageSource(name, size, color);
  }

  Icon.getImageSource = getImageSource;

  return Icon;
}
