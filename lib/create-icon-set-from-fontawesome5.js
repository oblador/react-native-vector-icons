import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import createIconSet from '../lib/create-icon-set';

export const FA5Type = {
  regular: 0,
  light: 1,
  solid: 2,
  brand: 3,
};

export function createFA5iconSet(glyphMap, proVersion = false) {
  const familyName = `Font Awesome 5 ${proVersion ? 'Pro' : 'Free'}`;

  function createFA5iconSubset(type, weight = '400', family = familyName) {
    let fontFileID = type;
    if (proVersion) fontFileID = `Pro_${type}`;

    return createIconSet(glyphMap, family, `FontAwesome_${fontFileID}.ttf`, {
      fontWeight: weight,
    });
  }

  const RegularSet = createFA5iconSubset('Regular');
  const SolidSet = createFA5iconSubset('Solid', '700');
  const LightSet = proVersion
    ? createFA5iconSubset('Light', '100')
    : RegularSet;
  const BrandsSet = createFA5iconSubset('Brands', 'Font Awesome 5 Brands');

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
