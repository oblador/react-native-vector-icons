/**
 * FontAwesome5 icon set component.
 * Usage: <FontAwesome5 name="icon-name" size={20} color="#4F8EF7" />
 */

import React, {PureComponent} from 'react';

import {Platform} from 'react-native';

import PropTypes from 'prop-types';

import createIconSet, {
  DEFAULT_ICON_COLOR,
  DEFAULT_ICON_SIZE
} from './lib/create-icon-set';

import glyphMap from './glyphmaps/FontAwesome5Free.json';

import createIconButtonComponent from './lib/icon-button';
import createTabBarItemIOSComponent from './lib/tab-bar-item-ios';
import createToolbarAndroidComponent from './lib/toolbar-android';

export const FA5Types = {
  regular: 0,
  light: -1,
  solid: 1,
  brand: 2
};

export function FA5iconSet(glyphMap, pro_version = false) {
  const version = pro_version ? 'Pro' : 'Free';
  const glyphs = pro_version ? glyphMap.pro : glyphMap.free;
  const familyName = 'Font Awesome 5 ' + version;

  const BrandsSet = createIconSet(
    glyphs,
    'Font Awesome 5 Brands',
    'FontAwesome5_Brands.ttf'
  );

  const RegularSet = createIconSet(
    glyphs,
    familyName,
    'FontAwesome5_Regular.ttf',
    {fontWeight: Platform.OS === 'ios' ? '400' : undefined}
  );

  const LightSet = pro_version
    ? createIconSet(
      glyphs,
      familyName,
      'FontAwesome5_Light.ttf',
      {fontWeight: Platform.OS === 'ios' ? '100' : undefined}
    )
    : RegularSet;

  const SolidSet = createIconSet(
    glyphs,
    familyName,
    'FontAwesome5_Solid.ttf',
    {fontWeight: Platform.OS === 'ios' ? '700' : undefined}
  );

  class FA5icon extends PureComponent {
    static propTypes = {
      brand: PropTypes.bool,
      light: PropTypes.bool,
      solid: PropTypes.bool,
      type: PropTypes.oneOf(Object.keys(FA5Types)),
      name: PropTypes.oneOf(Object.keys(glyphs)),
      size: PropTypes.number,
      color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      children: PropTypes.node,
      style: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    };

    static defaultProps = {
      size: DEFAULT_ICON_SIZE,
      allowFontScaling: false,
      color: DEFAULT_ICON_COLOR,
      type: FA5Types.regular,
      brand: false,
      light: false,
      solid: false
    };

    static Brands = BrandsSet;
    static Light = LightSet;
    static Regular = RegularSet;
    static Solid = SolidSet;

    render() {
      var IconSet;

      var type = this.props.type;

      const brand = this.props.brand;
      const light = this.props.light;
      const solid = this.props.solid;

      if (brand)
        type = FA5Types.brand
      else if (pro_version && light)
        type = FA5Types.light;
      else if (solid)
        type = FA5Types.solid;

      switch (type) {
        case FA5Types.brand:
          IconSet = BrandsSet;
          break;
        case FA5Types.light:
          IconSet = LightSet;
          break;
        case FA5Types.solid:
          IconSet = SolidSet;
          break;
        default:
          IconSet = RegularSet;
          break;
      }

      return (
        <IconSet {...this.props} />
      );
    }
  }

  return FA5icon;
}

const iconSet = FA5iconSet(glyphMap, false);
export default iconSet;
