/* eslint-disable react/jsx-pascal-case, no-console */

/**
 * FontAwesome5Pro icon set component.
 * Usage: <FontAwesome5Pro name="icon-name" size={20} color="#4F8EF7" />
 */
import React, { type FC } from 'react';

import { Platform, type TextStyle } from 'react-native';

import {
  DEFAULT_ICON_COLOR,
  DEFAULT_ICON_SIZE,
  type IconProps,
  createIconSet as commonCreateIconSet,
} from '@react-native-vector-icons/common';

import brandGM from '../glyphmaps/FontAwesome5Pro_brand.json';
import duotoneGM from '../glyphmaps/FontAwesome5Pro_duotone.json';
import lightGM from '../glyphmaps/FontAwesome5Pro_light.json';
import regularGM from '../glyphmaps/FontAwesome5Pro_regular.json';
import solidGM from '../glyphmaps/FontAwesome5Pro_solid.json';

import metadata from '../glyphmaps/FontAwesome5Pro_meta.json';

const glyphValidator = (glyph: string, iconType: keyof typeof metadata) => metadata[iconType]?.includes(glyph);

const fontStyle = (fontWeight: TextStyle['fontWeight']) =>
  Platform.select({
    ios: {
      fontWeight,
    },
    default: {},
  });

type brandIconProps = IconProps<keyof typeof brandGM>;
type duotoneIconProps = IconProps<keyof typeof duotoneGM>;
type lightIconProps = IconProps<keyof typeof lightGM>;
type regularIconProps = IconProps<keyof typeof regularGM>;
type solidIconProps = IconProps<keyof typeof solidGM>;
type Props =
  | ({ iconStyle?: 'brand' } & brandIconProps)
  | ({ iconStyle?: 'duotone' } & duotoneIconProps)
  | ({ iconStyle?: 'light' } & lightIconProps)
  | ({ iconStyle?: 'regular' } & regularIconProps)
  | ({ iconStyle?: 'solid' } & solidIconProps)
  | ({ iconStyle?: never } & regularIconProps);

type ValueData = { uri: string; scale: number };
type GetImageSourceSyncIconFunc<GM> = (name: GM, size?: number, color?: TextStyle['color']) => ValueData | undefined;
type GetImageSourceIconFunc<GM> = (
  name: GM,
  size?: number,
  color?: TextStyle['color'],
) => Promise<ValueData | undefined>;

type Icons = {
  brand: FC<brandIconProps> & {
    getImageSource: GetImageSourceIconFunc<keyof typeof brandGM>;
    getImageSourceSync: GetImageSourceSyncIconFunc<keyof typeof brandGM>;
  };
  duotone: FC<duotoneIconProps> & {
    getImageSource: GetImageSourceIconFunc<keyof typeof duotoneGM>;
    getImageSourceSync: GetImageSourceSyncIconFunc<keyof typeof duotoneGM>;
  };
  light: FC<lightIconProps> & {
    getImageSource: GetImageSourceIconFunc<keyof typeof lightGM>;
    getImageSourceSync: GetImageSourceSyncIconFunc<keyof typeof lightGM>;
  };
  regular: FC<regularIconProps> & {
    getImageSource: GetImageSourceIconFunc<keyof typeof regularGM>;
    getImageSourceSync: GetImageSourceSyncIconFunc<keyof typeof regularGM>;
  };
  solid: FC<solidIconProps> & {
    getImageSource: GetImageSourceIconFunc<keyof typeof solidGM>;
    getImageSourceSync: GetImageSourceSyncIconFunc<keyof typeof solidGM>;
  };
};

const Icons: Icons = {
  // biome-ignore format: We want these to be consistent adn we are fine with multiline for all
  light: commonCreateIconSet(
    lightGM,
    'FontAwesome5Pro-Light',
    'FontAwesome5_Pro_Light.ttf',
    fontStyle('300'),
  ),
  // biome-ignore format: We want these to be consistent adn we are fine with multiline for all
  regular: commonCreateIconSet(
    regularGM,
    'FontAwesome5Pro-Regular',
    'FontAwesome5_Pro_Regular.ttf',
    fontStyle('400'),
  ),
  // biome-ignore format: We want these to be consistent adn we are fine with multiline for all
  solid: commonCreateIconSet(
    solidGM,
    'FontAwesome5Pro-Solid',
    'FontAwesome5_Pro_Solid.ttf',
    fontStyle('900'),
  ),
  // biome-ignore format: We want these to be consistent adn we are fine with multiline for all
  duotone: commonCreateIconSet(
    duotoneGM,
    'FontAwesome5Duotone-Solid',
    'FontAwesome5_Pro_Duotone.ttf',
    fontStyle('900'),
  ),
  // biome-ignore format: We want these to be consistent adn we are fine with multiline for all
  brand: commonCreateIconSet(
    brandGM,
    'FontAwesome5Brands-Regular',
    'FontAwesome5_Pro_Brands.ttf',
    fontStyle('400'),
  ),
};

const Icon = (props: Props) => {
  const { iconStyle, name } = props;
  if (!iconStyle) {
    return <Icons.regular {...(props as regularIconProps)} />;
  }

  if (!glyphValidator(name as string, iconStyle)) {
    console.warn(
      `noSuchGlyph: glyph ${String(name)} does not exist for '${iconStyle}' icon type for FontAwesome6`,
    );

    return <Icons.regular {...(props as regularIconProps)} />;
  }

  switch (iconStyle) {
    case 'brand':
      return <Icons.brand {...props} />;
    case 'duotone':
      return <Icons.duotone {...props} />;
    case 'light':
      return <Icons.light {...props} />;
    case 'regular':
      return <Icons.regular {...props} />;
    case 'solid':
      return <Icons.solid {...props} />;
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome5Pro`);
      return <Icons.regular {...(props as regularIconProps)} />;
  }
};

type GetImageSourceFunc = {
  (
    iconStyle: 'brand',
    name: keyof typeof brandGM,
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof Icons.brand)['getImageSource']>;
  (
    iconStyle: 'duotone',
    name: keyof typeof duotoneGM,
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof Icons.duotone)['getImageSource']>;
  (
    iconStyle: 'light',
    name: keyof typeof lightGM,
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof Icons.light)['getImageSource']>;
  (
    iconStyle: 'regular',
    name: keyof typeof regularGM,
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof Icons.regular)['getImageSource']>;
  (
    iconStyle: 'solid',
    name: keyof typeof solidGM,
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof Icons.solid)['getImageSource']>;
};
const getImageSource: GetImageSourceFunc = (
  iconStyle,
  name,
  size = DEFAULT_ICON_SIZE,
  color = DEFAULT_ICON_COLOR,
) => {
  switch (iconStyle) {
    case 'brand':
      return Icons.brand.getImageSource(name as keyof typeof brandGM, size, color);
    case 'duotone':
      return Icons.duotone.getImageSource(name as keyof typeof duotoneGM, size, color);
    case 'light':
      return Icons.light.getImageSource(name as keyof typeof lightGM, size, color);
    case 'regular':
      return Icons.regular.getImageSource(name as keyof typeof regularGM, size, color);
    case 'solid':
      return Icons.solid.getImageSource(name as keyof typeof solidGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome5Pro`);
      return Icons.regular.getImageSource(name as keyof typeof regularGM, size, color);
  }
};
Icon.getImageSource = getImageSource;

type GetImageSourceSyncFunc = {
  (
    iconStyle: 'brand',
    name: keyof typeof brandGM,
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof Icons.brand)['getImageSourceSync']>;
  (
    iconStyle: 'duotone',
    name: keyof typeof duotoneGM,
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof Icons.duotone)['getImageSourceSync']>;
  (
    iconStyle: 'light',
    name: keyof typeof lightGM,
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof Icons.light)['getImageSourceSync']>;
  (
    iconStyle: 'regular',
    name: keyof typeof regularGM,
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof Icons.regular)['getImageSourceSync']>;
  (
    iconStyle: 'solid',
    name: keyof typeof solidGM,
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof Icons.solid)['getImageSourceSync']>;
};
const getImageSourceSync: GetImageSourceSyncFunc = (
  iconStyle,
  name,
  size = DEFAULT_ICON_SIZE,
  color = DEFAULT_ICON_COLOR,
) => {
  switch (iconStyle) {
    case 'brand':
      return Icons.brand.getImageSourceSync(name as keyof typeof brandGM, size, color);
    case 'duotone':
      return Icons.duotone.getImageSourceSync(name as keyof typeof duotoneGM, size, color);
    case 'light':
      return Icons.light.getImageSourceSync(name as keyof typeof lightGM, size, color);
    case 'regular':
      return Icons.regular.getImageSourceSync(name as keyof typeof regularGM, size, color);
    case 'solid':
      return Icons.solid.getImageSourceSync(name as keyof typeof solidGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome5Pro`);
      return Icons.regular.getImageSourceSync(name as keyof typeof regularGM, size, color);
  }
};
Icon.getImageSourceSync = getImageSourceSync;

export default Icon;
