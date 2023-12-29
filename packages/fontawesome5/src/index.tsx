/**
 * FontAwesome5 icon set component.
 * Usage: <FontAwesome5 name="icon-name" size={20} color="#4F8EF7" />
 */
import React from 'react';

import { Platform, type TextStyle } from 'react-native';

import { createIconSet as commonCreateIconSet, type IconProps, DEFAULT_ICON_SIZE, DEFAULT_ICON_COLOR } from '@react-native-vector-icons/common';

import regularGM from '@react-native-vector-icons/fontawesome5/glyphmaps/FontAwesome5_regular.json';
import solidGM from '@react-native-vector-icons/fontawesome5/glyphmaps/FontAwesome5_solid.json';
import brandGM from '@react-native-vector-icons/fontawesome5/glyphmaps/FontAwesome5_brand.json';

import metadata from '@react-native-vector-icons/fontawesome5/glyphmaps/FontAwesome5_meta.json';

const glyphValidator = (glyph: string, iconType: keyof typeof metadata) => metadata[iconType]?.includes(glyph);

const fontStyle = (fontWeight: TextStyle['fontWeight']) =>
  Platform.select({
    ios: {
      fontWeight,
    },
    default: {},
  });

type regularIconProps = IconProps<keyof typeof regularGM>;
type solidIconProps = IconProps<keyof typeof solidGM>;
type brandIconProps = IconProps<keyof typeof brandGM>;
type Props =
  | ({ iconStyle?: 'regular' } & regularIconProps)
  | ({ iconStyle?: 'solid' } & solidIconProps)
  | ({ iconStyle?: 'brand' } & brandIconProps)
  | ({ iconStyle?: never } & regularIconProps);

const Icons = {
  regular: commonCreateIconSet(regularGM, 'FontAwesome5-Regular', 'FontAwesome5_Regular.ttf', fontStyle('400')),
  solid: commonCreateIconSet(solidGM, 'FontAwesome5-Solid', 'FontAwesome5_Solid.ttf', fontStyle('900')),
  brand: commonCreateIconSet(brandGM, 'FontAwesome5Brands-Regular', 'FontAwesome5_Brands.ttf', fontStyle('400')),
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
    case 'regular':
      return <Icons.regular {...props} />;
    case 'solid':
      return <Icons.solid {...props} />;
    case 'brand':
      return <Icons.brand {...props} />;
    default:
      console.warn(`noSuchIconTypeName: '${props.iconStyle}' icon type does not exist for FontAwesome5`);
      return <Icons.regular {...(props as regularIconProps)} />;
  }
};

type GetImageSourceFunc = {
  (name: keyof typeof regularGM, size: number, color: TextStyle['color'], iconStyle: 'regular'): ReturnType<typeof Icons.regular['getImageSource']>;
  (name: keyof typeof solidGM, size: number, color: TextStyle['color'], iconStyle: 'solid'): ReturnType<typeof Icons.solid['getImageSource']>;
  (name: keyof typeof brandGM, size: number, color: TextStyle['color'], iconStyle: 'brand'): ReturnType<typeof Icons.brand['getImageSource']>;
  (name: keyof typeof regularGM, size: number, color: TextStyle['color']): ReturnType<typeof Icons.regular['getImageSource']>;
};
const getImageSource: GetImageSourceFunc = (name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR, iconStyle = 'regular') => {
  switch (iconStyle) {
    case 'regular':
      return Icons.regular.getImageSource(name as keyof typeof regularGM, size, color);
    case 'solid':
      return Icons.solid.getImageSource(name as keyof typeof solidGM, size, color);
    case 'brand':
      return Icons.brand.getImageSource(name as keyof typeof brandGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome5`);
      return Icons.regular.getImageSource(name as keyof typeof regularGM, size, color);
  }
};
Icon.getImageSource = getImageSource;

type GetImageSourceSyncFunc = {
  (name: keyof typeof regularGM, size: number, color: TextStyle['color'], iconStyle: 'regular'): ReturnType<typeof Icons.regular['getImageSourceSync']>;
  (name: keyof typeof solidGM, size: number, color: TextStyle['color'], iconStyle: 'solid'): ReturnType<typeof Icons.solid['getImageSourceSync']>;
  (name: keyof typeof brandGM, size: number, color: TextStyle['color'], iconStyle: 'brand'): ReturnType<typeof Icons.brand['getImageSourceSync']>;
  (name: keyof typeof regularGM, size: number, color: TextStyle['color']): ReturnType<typeof Icons.regular['getImageSourceSync']>;
};
const getImageSourceSync: GetImageSourceSyncFunc = (name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR, iconStyle = 'regular') => {
  switch (iconStyle) {
    case 'regular':
      return Icons.regular.getImageSourceSync(name as keyof typeof regularGM, size, color);
    case 'solid':
      return Icons.solid.getImageSourceSync(name as keyof typeof solidGM, size, color);
    case 'brand':
      return Icons.brand.getImageSourceSync(name as keyof typeof brandGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome5`);
      return Icons.regular.getImageSourceSync(name as keyof typeof regularGM, size, color);
  }
};
Icon.getImageSourceSync = getImageSourceSync;

export default Icon;
