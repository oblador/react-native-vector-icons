import React from 'react';

import { Platform, type TextStyle } from 'react-native';

import { createIconSet, type IconProps } from '@react-native-vector-icons/common';

import brandGM from '@react-native-vector-icons/fontawesome5/glyphmaps/FontAwesome5_brand.json';
import regularGM from '@react-native-vector-icons/fontawesome5/glyphmaps/FontAwesome5_regular.json';
import solidGM from '@react-native-vector-icons/fontawesome5/glyphmaps/FontAwesome5_solid.json';

type IconTypes = 'regular' | 'solid' | 'brand';

export const createFAIconSet = (metadata: Record<IconTypes, string[]>) => {
  const glyphValidator = (glyph: string, iconType: keyof typeof metadata) => metadata[iconType]?.includes(glyph);

  const fontStyle = (fontWeight: TextStyle['fontWeight']) =>
    Platform.select({
      ios: {
        fontWeight,
      },
      default: {},
    });

  type RegularIconProps = IconProps<keyof typeof regularGM>;
  type SolidIconProps = IconProps<keyof typeof solidGM>;
  type BrandIconProps = IconProps<keyof typeof brandGM>;
  type Props =
    | ({ iconStyle?: 'regular' } & RegularIconProps)
    | ({ iconStyle?: 'solid' } & SolidIconProps)
    | ({ iconStyle?: 'brand' } & BrandIconProps)
    | ({ iconStyle?: never } & RegularIconProps);

  const Icons = {
    regular: createIconSet(regularGM, 'FontAwesome5-Regular', 'FontAwesome5_Regular.ttf', fontStyle('400')),
    solid: createIconSet(solidGM, 'FontAwesome5-Solid', 'FontAwesome5_Solid.ttf', fontStyle('900')),
    brand: createIconSet(brandGM, 'FontAwesome5Brands-Regular', 'FontAwesome5_Brands.ttf', fontStyle('400')),
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
      case 'regular':
        return <Icons.regular {...props} />;
      case 'solid':
        return <Icons.solid {...props} />;
      case 'brand':
        return <Icons.brand {...props} />;
      default:
        console.warn(`noSuchIconTypeName: '${props.iconStyle}' icon type does not exist for FontAwesome6`);
        return <Icons.regular {...(props as RegularIconProps)} />;
    }
  };

  return Icon;
};
