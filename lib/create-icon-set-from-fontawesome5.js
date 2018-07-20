import React, { PureComponent } from 'react';

import { PixelRatio, Platform, processColor } from 'react-native';

import PropTypes from 'prop-types';

import createIconSet, {
  DEFAULT_ICON_COLOR,
  DEFAULT_ICON_SIZE,
  NativeIconAPI,
} from '../lib/create-icon-set';

import ensureNativeModuleAvailable from './ensure-native-module-available';

export const FA5Style = {
  regular: 0,
  light: 1,
  solid: 2,
  brand: 3,
};

let shouldSetupFA5 = true;

export function createFA5iconSet(
  glyphMap,
  metadata = {},
  proVersion = false,
  fallback = true
) {
  if (Platform.OS === 'ios' && shouldSetupFA5) {
    shouldSetupFA5 = false;
    ensureNativeModuleAvailable();
    NativeIconAPI.setupFontAwesome5();
  }

  const familyName = `Font Awesome 5 ${proVersion ? 'Pro' : 'Free'}`;

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
    const { brand, light, solid } = props;

    if (brand) return FA5Style.brand;
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

  function fallbackForGlyph(glyph) {
    const families = metadata[glyph];

    return iconSetFromFamily(families[0]);
  }

  function hasIconForStyle(glyph, style) {
    if (fallback) {
      const family = styleToFamily(style);

      return metadata[glyph].indexOf(family) !== -1;
    }

    return true;
  }

  function getIconSetForProps(props) {
    const { name } = props;
    const style = styleFromProps(props);

    if (hasIconForStyle(name, style)) return iconSetFromStyle(style);

    return fallbackForGlyph(name);
  }

  function createFA5iconClass(baseClass, selectClass = iconSet => iconSet) {
    class FA5iconClass extends PureComponent {
      static propTypes = Object.create(baseClass.propTypes, {
        brand: PropTypes.bool,
        light: PropTypes.bool,
        solid: PropTypes.bool,
      });

      static defaultProps = {
        brand: false,
        light: false,
        solid: false,
      };

      render() {
        const selectedIconSet = getIconSetForProps(this.props);
        const SelectedIconClass = selectClass(selectedIconSet);

        return <SelectedIconClass {...this.props} />;
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
    if (Platform.OS === 'ios' && type !== FA5Style.brand) {
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
            type,
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

    switch (type) {
      case FA5Style.brand:
        return BrandsSet.getImageSource(name, size, color);
      case FA5Style.light:
        return LightSet.getImageSource(name, size, color);
      case FA5Style.solid:
        return SolidSet.getImageSource(name, size, color);
      default:
        return RegularSet.getImageSource(name, size, color);
    }
  }

  FA5icon.getImageSource = getImageSource;

  return FA5icon;
}
