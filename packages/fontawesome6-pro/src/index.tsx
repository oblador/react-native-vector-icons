/**
 * FontAwesome6Pro icon set component.
 * Usage: <FontAwesome6Pro name="icon-name" size={20} color="#4F8EF7" />
 */
import React from 'react';

import { Platform, type TextStyle } from 'react-native';

import { createIconSet as commonCreateIconSet, type IconProps, DEFAULT_ICON_SIZE, DEFAULT_ICON_COLOR } from '@react-native-vector-icons/common';

import thinGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_thin.json';
import lightGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_light.json';
import regularGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_regular.json';
import solidGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_solid.json';
import sharpThinGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_sharpThin.json';
import sharpLightGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_sharpLight.json';
import sharpGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_sharp.json';
import sharpSolidGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_sharpSolid.json';
import duotoneGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_duotone.json';
import brandGM from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_brand.json';

import metadata from '@react-native-vector-icons/fontawesome6-pro/glyphmaps/FontAwesome6Pro_meta.json';

const glyphValidator = (glyph: string, iconType: keyof typeof metadata) => metadata[iconType]?.includes(glyph);

const fontStyle = (fontWeight: TextStyle['fontWeight']) =>
  Platform.select({
    ios: {
      fontWeight,
    },
    default: {},
  });

type thinIconProps = IconProps<keyof typeof thinGM>;
type lightIconProps = IconProps<keyof typeof lightGM>;
type regularIconProps = IconProps<keyof typeof regularGM>;
type solidIconProps = IconProps<keyof typeof solidGM>;
type sharpThinIconProps = IconProps<keyof typeof sharpThinGM>;
type sharpLightIconProps = IconProps<keyof typeof sharpLightGM>;
type sharpIconProps = IconProps<keyof typeof sharpGM>;
type sharpSolidIconProps = IconProps<keyof typeof sharpSolidGM>;
type duotoneIconProps = IconProps<keyof typeof duotoneGM>;
type brandIconProps = IconProps<keyof typeof brandGM>;
type Props =
  | ({ iconStyle?: 'thin' } & thinIconProps)
  | ({ iconStyle?: 'light' } & lightIconProps)
  | ({ iconStyle?: 'regular' } & regularIconProps)
  | ({ iconStyle?: 'solid' } & solidIconProps)
  | ({ iconStyle?: 'sharpThin' } & sharpThinIconProps)
  | ({ iconStyle?: 'sharpLight' } & sharpLightIconProps)
  | ({ iconStyle?: 'sharp' } & sharpIconProps)
  | ({ iconStyle?: 'sharpSolid' } & sharpSolidIconProps)
  | ({ iconStyle?: 'duotone' } & duotoneIconProps)
  | ({ iconStyle?: 'brand' } & brandIconProps)
  | ({ iconStyle?: never } & regularIconProps);

const Icons = {
  thin: commonCreateIconSet(thinGM, 'FontAwesome6Pro-Thin', 'FontAwesome6_Pro_Thin.ttf', fontStyle('100')),
  light: commonCreateIconSet(lightGM, 'FontAwesome6Pro-Light', 'FontAwesome6_Pro_Light.ttf', fontStyle('300')),
  regular: commonCreateIconSet(regularGM, 'FontAwesome6Pro-Regular', 'FontAwesome6_Pro_Regular.ttf', fontStyle('400')),
  solid: commonCreateIconSet(solidGM, 'FontAwesome6Pro-Solid', 'FontAwesome6_Pro_Solid.ttf', fontStyle('900')),
  sharpThin: commonCreateIconSet(sharpThinGM, 'FontAwesome6Sharp-Thin', 'FontAwesome6_Pro_Sharp_Thin.ttf', fontStyle('100')),
  sharpLight: commonCreateIconSet(sharpLightGM, 'FontAwesome6Sharp-Light', 'FontAwesome6_Pro_Sharp_Light.ttf', fontStyle('300')),
  sharp: commonCreateIconSet(sharpGM, 'FontAwesome6Sharp-Regular', 'FontAwesome6_Pro_Sharp_Regular.ttf', fontStyle('400')),
  sharpSolid: commonCreateIconSet(sharpSolidGM, 'FontAwesome6Sharp-Solid', 'FontAwesome6_Pro_Sharp_Solid.ttf', fontStyle('900')),
  duotone: commonCreateIconSet(duotoneGM, 'FontAwesome6Duotone-Solid', 'FontAwesome6_Pro_Duotone.ttf', fontStyle('900')),
  brand: commonCreateIconSet(brandGM, 'FontAwesome6Brands-Regular', 'FontAwesome6_Pro_Brands.ttf', fontStyle('400')),
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
      return <Icons.sharp {...props} />;
    case 'sharpSolid':
      return <Icons.sharpSolid {...props} />;
    case 'duotone':
      return <Icons.duotone {...props} />;
    case 'brand':
      return <Icons.brand {...props} />;
    default:
      console.warn(`noSuchIconTypeName: '${props.iconStyle}' icon type does not exist for FontAwesome6Pro`);
      return <Icons.regular {...(props as regularIconProps)} />;
  }
};

type GetImageSourceFunc = {
  (name: keyof typeof thinGM, size: number, color: TextStyle['color'], iconStyle: 'thin'): ReturnType<typeof Icons.thin['getImageSource']>;
  (name: keyof typeof lightGM, size: number, color: TextStyle['color'], iconStyle: 'light'): ReturnType<typeof Icons.light['getImageSource']>;
  (name: keyof typeof regularGM, size: number, color: TextStyle['color'], iconStyle: 'regular'): ReturnType<typeof Icons.regular['getImageSource']>;
  (name: keyof typeof solidGM, size: number, color: TextStyle['color'], iconStyle: 'solid'): ReturnType<typeof Icons.solid['getImageSource']>;
  (name: keyof typeof sharpThinGM, size: number, color: TextStyle['color'], iconStyle: 'sharpThin'): ReturnType<typeof Icons.sharpThin['getImageSource']>;
  (name: keyof typeof sharpLightGM, size: number, color: TextStyle['color'], iconStyle: 'sharpLight'): ReturnType<typeof Icons.sharpLight['getImageSource']>;
  (name: keyof typeof sharpGM, size: number, color: TextStyle['color'], iconStyle: 'sharp'): ReturnType<typeof Icons.sharp['getImageSource']>;
  (name: keyof typeof sharpSolidGM, size: number, color: TextStyle['color'], iconStyle: 'sharpSolid'): ReturnType<typeof Icons.sharpSolid['getImageSource']>;
  (name: keyof typeof duotoneGM, size: number, color: TextStyle['color'], iconStyle: 'duotone'): ReturnType<typeof Icons.duotone['getImageSource']>;
  (name: keyof typeof brandGM, size: number, color: TextStyle['color'], iconStyle: 'brand'): ReturnType<typeof Icons.brand['getImageSource']>;
  (name: keyof typeof regularGM, size: number, color: TextStyle['color']): ReturnType<typeof Icons.regular['getImageSource']>;
};
const getImageSource: GetImageSourceFunc = (name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR, iconStyle = 'regular') => {
  switch (iconStyle) {
    case 'thin':
      return Icons.thin.getImageSource(name as keyof typeof thinGM, size, color);
    case 'light':
      return Icons.light.getImageSource(name as keyof typeof lightGM, size, color);
    case 'regular':
      return Icons.regular.getImageSource(name as keyof typeof regularGM, size, color);
    case 'solid':
      return Icons.solid.getImageSource(name as keyof typeof solidGM, size, color);
    case 'sharpThin':
      return Icons.sharpThin.getImageSource(name as keyof typeof sharpThinGM, size, color);
    case 'sharpLight':
      return Icons.sharpLight.getImageSource(name as keyof typeof sharpLightGM, size, color);
    case 'sharp':
      return Icons.sharp.getImageSource(name as keyof typeof sharpGM, size, color);
    case 'sharpSolid':
      return Icons.sharpSolid.getImageSource(name as keyof typeof sharpSolidGM, size, color);
    case 'duotone':
      return Icons.duotone.getImageSource(name as keyof typeof duotoneGM, size, color);
    case 'brand':
      return Icons.brand.getImageSource(name as keyof typeof brandGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome6Pro`);
      return Icons.regular.getImageSource(name as keyof typeof regularGM, size, color);
  }
};
Icon.getImageSource = getImageSource;

type GetImageSourceSyncFunc = {
  (name: keyof typeof thinGM, size: number, color: TextStyle['color'], iconStyle: 'thin'): ReturnType<typeof Icons.thin['getImageSourceSync']>;
  (name: keyof typeof lightGM, size: number, color: TextStyle['color'], iconStyle: 'light'): ReturnType<typeof Icons.light['getImageSourceSync']>;
  (name: keyof typeof regularGM, size: number, color: TextStyle['color'], iconStyle: 'regular'): ReturnType<typeof Icons.regular['getImageSourceSync']>;
  (name: keyof typeof solidGM, size: number, color: TextStyle['color'], iconStyle: 'solid'): ReturnType<typeof Icons.solid['getImageSourceSync']>;
  (name: keyof typeof sharpThinGM, size: number, color: TextStyle['color'], iconStyle: 'sharpThin'): ReturnType<typeof Icons.sharpThin['getImageSourceSync']>;
  (name: keyof typeof sharpLightGM, size: number, color: TextStyle['color'], iconStyle: 'sharpLight'): ReturnType<typeof Icons.sharpLight['getImageSourceSync']>;
  (name: keyof typeof sharpGM, size: number, color: TextStyle['color'], iconStyle: 'sharp'): ReturnType<typeof Icons.sharp['getImageSourceSync']>;
  (name: keyof typeof sharpSolidGM, size: number, color: TextStyle['color'], iconStyle: 'sharpSolid'): ReturnType<typeof Icons.sharpSolid['getImageSourceSync']>;
  (name: keyof typeof duotoneGM, size: number, color: TextStyle['color'], iconStyle: 'duotone'): ReturnType<typeof Icons.duotone['getImageSourceSync']>;
  (name: keyof typeof brandGM, size: number, color: TextStyle['color'], iconStyle: 'brand'): ReturnType<typeof Icons.brand['getImageSourceSync']>;
  (name: keyof typeof regularGM, size: number, color: TextStyle['color']): ReturnType<typeof Icons.regular['getImageSourceSync']>;
};
const getImageSourceSync: GetImageSourceSyncFunc = (name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR, iconStyle = 'regular') => {
  switch (iconStyle) {
    case 'thin':
      return Icons.thin.getImageSourceSync(name as keyof typeof thinGM, size, color);
    case 'light':
      return Icons.light.getImageSourceSync(name as keyof typeof lightGM, size, color);
    case 'regular':
      return Icons.regular.getImageSourceSync(name as keyof typeof regularGM, size, color);
    case 'solid':
      return Icons.solid.getImageSourceSync(name as keyof typeof solidGM, size, color);
    case 'sharpThin':
      return Icons.sharpThin.getImageSourceSync(name as keyof typeof sharpThinGM, size, color);
    case 'sharpLight':
      return Icons.sharpLight.getImageSourceSync(name as keyof typeof sharpLightGM, size, color);
    case 'sharp':
      return Icons.sharp.getImageSourceSync(name as keyof typeof sharpGM, size, color);
    case 'sharpSolid':
      return Icons.sharpSolid.getImageSourceSync(name as keyof typeof sharpSolidGM, size, color);
    case 'duotone':
      return Icons.duotone.getImageSourceSync(name as keyof typeof duotoneGM, size, color);
    case 'brand':
      return Icons.brand.getImageSourceSync(name as keyof typeof brandGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome6Pro`);
      return Icons.regular.getImageSourceSync(name as keyof typeof regularGM, size, color);
  }
};
Icon.getImageSourceSync = getImageSourceSync;

export default Icon;
