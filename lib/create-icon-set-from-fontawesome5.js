import React, { PureComponent } from 'react';

import { Platform } from 'react-native';

import PropTypes from 'prop-types';

import createIconSet, {
  ensureNativeModuleAvailable,
  NativeIconAPI,
} from '../lib/create-icon-set';

export const FA5Type = {
  regular: 0,
  light: 1,
  solid: 2,
  brand: 3,
};

let setupFA5 = true;

export function createFA5iconSet(glyphMap, proVersion = false) {
  if (Platform.OS === 'ios' && setupFA5) {
    setupFA5 = false;
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
  const BrandsSet = createFA5iconSubset('Brands', '400', 'Font Awesome 5 Brands');

  function selectIconSet(props) {
    const { brand, light, solid } = props;

    if (brand) return BrandsSet;
    if (light) return LightSet;
    if (solid) return SolidSet;

    return RegularSet;
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
        const selectedIconSet = selectIconSet(this.props);
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

  return FA5icon;
}
