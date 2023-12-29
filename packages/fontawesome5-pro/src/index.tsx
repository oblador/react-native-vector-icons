/**
 * FontAwesome5Pro icon set component.
 * Usage: <FontAwesome5Pro name="icon-name" size={20} color="#4F8EF7" />
 */
import React from 'react';

import { Platform, type TextStyle } from 'react-native';

import { createIconSet as commonCreateIconSet, type IconProps, DEFAULT_ICON_SIZE, DEFAULT_ICON_COLOR } from '@react-native-vector-icons/common';

import lightGM from '@react-native-vector-icons/fontawesome5-pro/glyphmaps/FontAwesome5Pro_light.json';
import regularGM from '@react-native-vector-icons/fontawesome5-pro/glyphmaps/FontAwesome5Pro_regular.json';
import solidGM from '@react-native-vector-icons/fontawesome5-pro/glyphmaps/FontAwesome5Pro_solid.json';
import brandGM from '@react-native-vector-icons/fontawesome5-pro/glyphmaps/FontAwesome5Pro_brand.json';
import duotoneGM from '@react-native-vector-icons/fontawesome5-pro/glyphmaps/FontAwesome5Pro_duotone.json';

import metadata from '@react-native-vector-icons/fontawesome5-pro/glyphmaps/FontAwesome5Pro_meta.json';

const glyphValidator = (glyph: string, iconType: keyof typeof metadata) => metadata[iconType]?.includes(glyph);

const fontStyle = (fontWeight: TextStyle['fontWeight']) =>
  Platform.select({
    ios: {
      fontWeight,
    },
    default: {},
  });

type lightIconProps = IconProps<keyof typeof lightGM>;
type regularIconProps = IconProps<keyof typeof regularGM>;
type solidIconProps = IconProps<keyof typeof solidGM>;
type brandIconProps = IconProps<keyof typeof brandGM>;
type duotoneIconProps = IconProps<keyof typeof duotoneGM>;
type Props =
  | ({ iconStyle?: 'light' } & lightIconProps)
  | ({ iconStyle?: 'regular' } & regularIconProps)
  | ({ iconStyle?: 'solid' } & solidIconProps)
  | ({ iconStyle?: 'brand' } & brandIconProps)
  | ({ iconStyle?: 'duotone' } & duotoneIconProps)
  | ({ iconStyle?: never } & regularIconProps);

const Icons = {
  light: commonCreateIconSet(lightGM, 'FontAwesome5Pro-Light', 'FontAwesome5_Pro_Light.ttf', fontStyle('300')),
  regular: commonCreateIconSet(regularGM, 'FontAwesome5Pro-Regular', 'FontAwesome5_Pro_Regular.ttf', fontStyle('400')),
  solid: commonCreateIconSet(solidGM, 'FontAwesome5Pro-Solid', 'FontAwesome5_Pro_Solid.ttf', fontStyle('900')),
  duotone: commonCreateIconSet(duotoneGM, 'FontAwesome5Duotone-Solid', 'FontAwesome5_Pro_Duotone.ttf', fontStyle('900')),
  brand: commonCreateIconSet(brandGM, 'FontAwesome5Brands-Regular', 'FontAwesome5_Pro_Brands.ttf', fontStyle('400')),
};

const Icon = (props: Props) => {
  if (!props.iconStyle) {
    return <Icons.regular {...(props as regularIconProps)} />;
  }

  if (!glyphValidator(props.name as string, props.iconStyle)) {
    console.warn(`noSuchGlyph: glyph ${String(props.name)} does not exist for '${props.iconStyle}' icon type for FontAwesome6`);

    return <Icons.regular {...(props as regularIconProps)} />;
  }

  switch (props.iconStyle) {
    case 'light':
      return <Icons.light {...props} />;
    case 'regular':
      return <Icons.regular {...props} />;
    case 'solid':
      return <Icons.solid {...props} />;
    case 'brand':
      return <Icons.brand {...props} />;
    case 'duotone':
      return <Icons.duotone {...props} />;
    default:
      console.warn(`noSuchIconTypeName: '${props.iconStyle}' icon type does not exist for FontAwesome5Pro`);
      return <Icons.regular {...(props as regularIconProps)} />;
  }
};

type GetImageSourceFunc = {
  (name: keyof typeof lightGM, size: number, color: TextStyle['color'], iconStyle: 'light'): ReturnType<typeof Icons.light['getImageSource']>;
  (name: keyof typeof regularGM, size: number, color: TextStyle['color'], iconStyle: 'regular'): ReturnType<typeof Icons.regular['getImageSource']>;
  (name: keyof typeof solidGM, size: number, color: TextStyle['color'], iconStyle: 'solid'): ReturnType<typeof Icons.solid['getImageSource']>;
  (name: keyof typeof brandGM, size: number, color: TextStyle['color'], iconStyle: 'brand'): ReturnType<typeof Icons.brand['getImageSource']>;
  (name: keyof typeof duotoneGM, size: number, color: TextStyle['color'], iconStyle: 'duotone'): ReturnType<typeof Icons.duotone['getImageSource']>;
  (name: keyof typeof regularGM, size: number, color: TextStyle['color']): ReturnType<typeof Icons.regular['getImageSource']>;
};
const getImageSource: GetImageSourceFunc = (name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR, iconStyle = 'regular') => {
  switch (iconStyle) {
    case 'light':
      return Icons.light.getImageSource(name as keyof typeof lightGM, size, color);
    case 'regular':
      return Icons.regular.getImageSource(name as keyof typeof regularGM, size, color);
    case 'solid':
      return Icons.solid.getImageSource(name as keyof typeof solidGM, size, color);
    case 'brand':
      return Icons.brand.getImageSource(name as keyof typeof brandGM, size, color);
    case 'duotone':
      return Icons.duotone.getImageSource(name as keyof typeof duotoneGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome5Pro`);
      return Icons.regular.getImageSource(name as keyof typeof regularGM, size, color);
  }
};
Icon.getImageSource = getImageSource;

type GetImageSourceSyncFunc = {
  (name: keyof typeof lightGM, size: number, color: TextStyle['color'], iconStyle: 'light'): ReturnType<typeof Icons.light['getImageSourceSync']>;
  (name: keyof typeof regularGM, size: number, color: TextStyle['color'], iconStyle: 'regular'): ReturnType<typeof Icons.regular['getImageSourceSync']>;
  (name: keyof typeof solidGM, size: number, color: TextStyle['color'], iconStyle: 'solid'): ReturnType<typeof Icons.solid['getImageSourceSync']>;
  (name: keyof typeof brandGM, size: number, color: TextStyle['color'], iconStyle: 'brand'): ReturnType<typeof Icons.brand['getImageSourceSync']>;
  (name: keyof typeof duotoneGM, size: number, color: TextStyle['color'], iconStyle: 'duotone'): ReturnType<typeof Icons.duotone['getImageSourceSync']>;
  (name: keyof typeof regularGM, size: number, color: TextStyle['color']): ReturnType<typeof Icons.regular['getImageSourceSync']>;
};
const getImageSourceSync: GetImageSourceSyncFunc = (name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR, iconStyle = 'regular') => {
  switch (iconStyle) {
    case 'light':
      return Icons.light.getImageSourceSync(name as keyof typeof lightGM, size, color);
    case 'regular':
      return Icons.regular.getImageSourceSync(name as keyof typeof regularGM, size, color);
    case 'solid':
      return Icons.solid.getImageSourceSync(name as keyof typeof solidGM, size, color);
    case 'brand':
      return Icons.brand.getImageSourceSync(name as keyof typeof brandGM, size, color);
    case 'duotone':
      return Icons.duotone.getImageSourceSync(name as keyof typeof duotoneGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome5Pro`);
      return Icons.regular.getImageSourceSync(name as keyof typeof regularGM, size, color);
  }
};
Icon.getImageSourceSync = getImageSourceSync;

export default Icon;
