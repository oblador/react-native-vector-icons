import React from 'react';

import { Platform, type TextStyle } from 'react-native';

import { createIconSet as commonCreateIconSet, type IconProps } from '@react-native-vector-icons/common';

import thinGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_thin.json';
import lightGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro.json';
import regularGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_regular.json';
import solidGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_solid.json';
import duotoneGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_duotone.json';
import sharpThinGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_sharpThin.json';
import sharpLightGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_sharpLight.json';
import sharpRegularGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_sharp.json';
import sharpSolidGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_sharpSolid.json';
import brandGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_brand.json';


type IconTypesPro = 'thin' | 'light' | 'regular' | 'solid' | 'duotone' | 'sharpThin' | 'sharpLight' | 'sharp' | 'sharpSolid' | 'brand';

export const createIconSet = (metadata: Record<IconTypesPro, string[]>) => {
  const glyphValidator = (glyph: string, iconType: keyof typeof metadata) => metadata[iconType]?.includes(glyph);

  const fontStyle = (fontWeight: TextStyle['fontWeight']) =>
    Platform.select({
      ios: {
        fontWeight,
      },
      default: {},
    });

  type ThinIconProps = IconProps<keyof typeof thinGM>;
  type LightIconProps = IconProps<keyof typeof lightGM>;
  type RegularIconProps = IconProps<keyof typeof regularGM>;
  type SolidIconProps = IconProps<keyof typeof solidGM>;
  type DuotoneIconProps = IconProps<keyof typeof duotoneGM>;
  type SharpThinIconProps = IconProps<keyof typeof sharpThinGM>;
  type SharpLightIconProps = IconProps<keyof typeof sharpLightGM>;
  type SharpRegularIconProps = IconProps<keyof typeof sharpRegularGM>;
  type SharpSolidIconProps = IconProps<keyof typeof sharpSolidGM>;
  type BrandIconProps = IconProps<keyof typeof brandGM>;

  type Props =
    | ({ iconStyle?: 'thin' } & ThinIconProps)
    | ({ iconStyle?: 'light' } & LightIconProps)
    | ({ iconStyle?: 'regular' } & RegularIconProps)
    | ({ iconStyle?: 'solid' } & SolidIconProps)
    | ({ iconStyle?: 'duotone' } & DuotoneIconProps)
    | ({ iconStyle?: 'brand' } & BrandIconProps)
    | ({ iconStyle?: 'sharpThin' } & SharpThinIconProps)
    | ({ iconStyle?: 'sharpLight' } & SharpLightIconProps)
    | ({ iconStyle?: 'sharp' } & SharpRegularIconProps)
    | ({ iconStyle?: 'sharpSolid' } & SharpSolidIconProps)
    | ({ iconStyle?: never } & RegularIconProps);

  const Icons = {
    thin: commonCreateIconSet(thinGM, 'FontAwesome6Pro-Thin', 'FontAwesome6_Pro_Thin.ttf', fontStyle('100')),
    light: commonCreateIconSet(lightGM, 'FontAwesome6Pro-Light', 'FontAwesome6_Pro_Light.ttf', fontStyle('300')),
    regular: commonCreateIconSet(regularGM, 'FontAwesome6Pro-Regular', 'FontAwesome6_Pro_Regular.ttf', fontStyle('400')),
    solid: commonCreateIconSet(solidGM, 'FontAwesome6Pro-Solid', 'FontAwesome6_Pro_Solid.ttf', fontStyle('900')),
    sharpThin: commonCreateIconSet(sharpThinGM, 'FontAwesome6Pro-Thin', 'FontAwesome6_Pro_Sharp_Thin.ttf', fontStyle('100')),
    sharpLight: commonCreateIconSet(sharpLightGM, 'FontAwesome6Pro-Light', 'FontAwesome6_Pro_Sharp_Light.ttf', fontStyle('300')),
    sharpRegular: commonCreateIconSet(sharpRegularGM, 'FontAwesome6Pro-Regular', 'FontAwesome6_Pro_Sharp_Regular.ttf', fontStyle('400')),
    sharpSolid: commonCreateIconSet(sharpSolidGM, 'FontAwesome6Pro-Solid', 'FontAwesome6_Pro_Sharp_Solid.ttf', fontStyle('900')),
    duotone: commonCreateIconSet(duotoneGM, 'FontAwesome6Duotone-Solid', 'FontAwesome6_Pro_Duotone.ttf', fontStyle('900')),
    brand: commonCreateIconSet(brandGM, 'FontAwesome6Brands-Regular', 'FontAwesome6_Pro_Brands.ttf', fontStyle('400')),
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
      case 'thin':
        return <Icons.thin {...props} />;
      case 'light':
        return <Icons.light {...props} />;
      case 'regular':
        return <Icons.regular {...props} />;
      case 'solid':
        return <Icons.solid {...props} />;
      case 'sharpThin':
        return <Icons.sharpThin {...props} />;
      case 'sharpLight':
        return <Icons.sharpLight {...props} />;
      case 'sharp':
        return <Icons.sharpRegular {...props} />;
      case 'sharpSolid':
        return <Icons.sharpSolid {...props} />;
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
