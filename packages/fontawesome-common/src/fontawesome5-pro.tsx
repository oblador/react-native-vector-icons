import React from 'react';

import { Platform, type TextStyle } from 'react-native';

import { createIconSet, type IconProps } from '@react-native-vector-icons/common';

import lightGMPro from '@react-native-vector-icons/fontawesome5-pro/glyphmaps/FontAwesome5Pro.json';
import regularGMPro from '@react-native-vector-icons/fontawesome5-pro/glyphmaps/FontAwesome5Pro_regular.json';
import solidGMPro from '@react-native-vector-icons/fontawesome5-pro/glyphmaps/FontAwesome5Pro_solid.json';
import brandGMPro from '@react-native-vector-icons/fontawesome5-pro/glyphmaps/FontAwesome5Pro_brand.json';
import duotoneGMPro from '@react-native-vector-icons/fontawesome5-pro/glyphmaps/FontAwesome5Pro_duotone.json';

type IconTypesPro = 'light' | 'duotone' | 'regular' | 'solid' | 'brand';

export const createFAProIconSet = (metadata: Record<IconTypesPro, string[]>) => {
  const glyphValidator = (glyph: string, iconType: keyof typeof metadata) => metadata[iconType]?.includes(glyph);

  const fontStyle = (fontWeight: TextStyle['fontWeight']) =>
    Platform.select({
      ios: {
        fontWeight,
      },
      default: {},
    });

  type LightIconProps = IconProps<keyof typeof lightGMPro>;
  type DuotoneIconProps = IconProps<keyof typeof duotoneGMPro>;
  type RegularIconProps = IconProps<keyof typeof regularGMPro>;
  type SolidIconProps = IconProps<keyof typeof solidGMPro>;
  type BrandIconProps = IconProps<keyof typeof brandGMPro>;

  type Props =
    | ({ iconStyle?: 'light' } & LightIconProps)
    | ({ iconStyle?: 'duotone' } & DuotoneIconProps)
    | ({ iconStyle?: 'regular' } & RegularIconProps)
    | ({ iconStyle?: 'solid' } & SolidIconProps)
    | ({ iconStyle?: 'brand' } & BrandIconProps)
    | ({ iconStyle?: never } & RegularIconProps);

  const Icons = {
    regular: createIconSet(regularGMPro, 'FontAwesome5Pro-Regular', 'FontAwesome5_Pro_Regular.ttf', fontStyle('400')),
    solid: createIconSet(solidGMPro, 'FontAwesome5Pro-Solid', 'FontAwesome5_Pro_Solid.ttf', fontStyle('900')),
    brand: createIconSet(brandGMPro, 'FontAwesome5Brands-Regular', 'FontAwesome5_Pro_Brands.ttf', fontStyle('400')),
    light: createIconSet(lightGMPro, 'FontAwesome5$ro-Light', 'FontAwesome5_Pro_Light.ttf', fontStyle('300')),
    duotone: createIconSet(duotoneGMPro, 'FontAwesome5Duotone-Solid', 'FontAwesome5_Pro_Duotone.ttf', fontStyle('900')),
  };

  const Icon = (props: Props) => {
    if (!props.iconStyle) {
      return <Icons.regular {...(props as RegularIconProps)} />;
    }

    if (!glyphValidator(props.name as string, props.iconStyle)) {
      console.warn(`noSuchGlyph: glyph ${String(props.name)} does not exist for '${props.iconStyle}' icon type for FontAwesome6`);

      return <Icons.regular {...(props as RegularIconProps)} />;
    }

    switch (props.iconStyle) {
      case 'light':
        return <Icons.light {...props} />;
      case 'regular':
        return <Icons.regular {...props} />;
      case 'solid':
        return <Icons.solid {...props} />;
      case 'duotone':
        return <Icons.duotone {...props} />;
      case 'brand':
        return <Icons.brand {...props} />;
      default:
        console.warn(`noSuchIconTypeName: '${props.iconStyle}' icon type does not exist for FontAwesome6`);
        return <Icons.regular {...(props as RegularIconProps)} />;
    }
  };

  return Icon;
};
