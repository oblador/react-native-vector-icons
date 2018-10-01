import React, { PureComponent } from 'react';

import { PixelRatio, Platform, processColor } from 'react-native';

import PropTypes from 'prop-types';

import createIconSet, {
  DEFAULT_ICON_COLOR,
  DEFAULT_ICON_SIZE,
  NativeIconAPI,
} from './create-icon-set';

import ensureNativeModuleAvailable from './ensure-native-module-available';

export const FA5Style = {
  regular: 0,
  light: 1,
  solid: 2,
  brand: 3,
};

export function createFA5iconSet(glyphMap, metadata = {}, proVersion = false) {
  const familyName = `Font Awesome 5 ${proVersion ? 'Pro' : 'Free'}`;
  const metadataKeys = Object.keys(metadata);

  function createFA5iconSubset(type, weight = '400', family = familyName) {
    const fontFileID = proVersion ? `Pro_${type}` : type;

    return createIconSet(glyphMap, family, `FontAwesome5_${fontFileID}.ttf`, {
      fontWeight: Platform.OS === 'ios' ? weight : undefined,
    });
  }

  const RegularSet = createFA5iconSubset('Regular');
  const SolidSet = createFA5iconSubset('Solid', '700');
  const LightSet = proVersion
    ? createFA5iconSubset('Light', '100')
    : RegularSet;
  const BrandsSet = createFA5iconSubset(
    'Brands',
    '400',
    'Font Awesome 5 Brands'
  );

  function iconSetFromStyle(style) {
    switch (style) {
      case FA5Style.brand:
        return BrandsSet;
      case FA5Style.light:
        return LightSet;
      case FA5Style.solid:
        return SolidSet;
      default:
        return RegularSet;
    }
  }

  function iconSetFromFamily(family) {
    switch (family) {
      case 'brands':
        return BrandsSet;
      case 'regular':
        return LightSet;
      case 'solid':
        return SolidSet;
      default:
        return RegularSet;
    }
  }

  function styleFromProps(props) {
    const { light, solid } = props;

    if (light) return FA5Style.light;
    if (solid) return FA5Style.solid;
    return FA5Style.regular;
  }

  function styleToFamily(style) {
    switch (style) {
      case FA5Style.brand:
        return 'brands';
      case FA5Style.light:
        return 'light';
      case FA5Style.solid:
        return 'solid';
      default:
        return 'regular';
    }
  }

  function familyToStyle(family) {
    switch (family) {
      case 'brands':
        return FA5Style.brand;
      case 'light':
        return FA5Style.light;
      case 'solid':
        return FA5Style.solid;
      default:
        return FA5Style.regular;
    }
  }

  function fallbackForGlyph(glyph) {
    for (let i = 0; i < metadataKeys.length; i += 1) {
      const family = metadataKeys[i];
      if (metadata[family].indexOf(glyph) !== -1) return family;
    }

    return 'regular';
  }

  function hasIconForStyle(glyph, style) {
    const family = styleToFamily(style);

    if (metadataKeys.indexOf(family) === -1) return false;

    return metadata[family].indexOf(glyph) !== -1;
  }

  function getIconSetForProps(props) {
    const { name } = props;
    const style = styleFromProps(props);

    if (hasIconForStyle(name, style)) return iconSetFromStyle(style);

    const fallbackFamily = fallbackForGlyph(name);
    return iconSetFromFamily(fallbackFamily);
  }

  function createFA5iconClass(baseClass, selectClass = iconSet => iconSet) {
    class FA5iconClass extends PureComponent {
      static propTypes = {
        light: PropTypes.bool,
        solid: PropTypes.bool,
      };

      static defaultProps = {
        light: false,
        solid: false,
      };

      render() {
        const selectedIconSet = getIconSetForProps(this.props);
        const SelectedIconClass = selectClass(selectedIconSet);
        const { light, solid, ...restProps } = this.props;

        return <SelectedIconClass {...restProps} />;
      }
    }

    return FA5iconClass;
  }

  const Base = RegularSet;
  const FA5icon = createFA5iconClass(Base);

  FA5icon.Button = createFA5iconClass(Base.Button, iconSet => iconSet.Button);
  FA5icon.TabBarItem = createFA5iconClass(
    Base.TabBarItem,
    iconSet => iconSet.TabBarItem
  );
  FA5icon.TabBarItemIOS = createFA5iconClass(
    Base.TabBarItemIOS,
    iconSet => iconSet.TabBarItemIOS
  );
  FA5icon.ToolbarAndroid = createFA5iconClass(
    Base.ToolbarAndroid,
    iconSet => iconSet.ToolbarAndroid
  );

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

  FA5icon.getImageSource = getImageSource;

  return FA5icon;
}
