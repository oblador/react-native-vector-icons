/* eslint-disable react/jsx-pascal-case, no-console */

/**
 * FontAwesome5 icon set component.
 * Usage: <FontAwesome5 name="icon-name" size={20} color="#4F8EF7" />
 */
import React, { type FC } from 'react';

import { Platform, type TextStyle } from 'react-native';

import {
  DEFAULT_ICON_COLOR,
  DEFAULT_ICON_SIZE,
  type IconProps,
  createIconSet as commonCreateIconSet,
} from '@react-native-vector-icons/common';

import brandGM from '../glyphmaps/FontAwesome5_brand.json';
import regularGM from '../glyphmaps/FontAwesome5_regular.json';
import solidGM from '../glyphmaps/FontAwesome5_solid.json';

import metadata from '../glyphmaps/FontAwesome5_meta.json';

const glyphValidator = (glyph: string, iconType: keyof typeof metadata) => metadata[iconType]?.includes(glyph);

const fontStyle = (fontWeight: TextStyle['fontWeight']) =>
  Platform.select({
    ios: {
      fontWeight,
    },
    default: {},
  });

type brandIconProps = IconProps<keyof typeof brandGM>;
type regularIconProps = IconProps<keyof typeof regularGM>;
type solidIconProps = IconProps<keyof typeof solidGM>;
type Props =
  | ({ iconStyle?: 'brand' } & brandIconProps)
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
  regular: commonCreateIconSet(
    regularGM,
    'FontAwesome5-Regular',
    'FontAwesome5_Regular.ttf',
    fontStyle('400'),
  ),
  // biome-ignore format: We want these to be consistent adn we are fine with multiline for all
  solid: commonCreateIconSet(
    solidGM,
    'FontAwesome5-Solid',
    'FontAwesome5_Solid.ttf',
    fontStyle('900'),
  ),
  // biome-ignore format: We want these to be consistent adn we are fine with multiline for all
  brand: commonCreateIconSet(
    brandGM,
    'FontAwesome5Brands-Regular',
    'FontAwesome5_Brands.ttf',
    fontStyle('400'),
  ),
};

const Icon = ({ iconStyle, ...props }: Props) => {
  if (!iconStyle) {
    return <Icons.regular {...(props as regularIconProps)} />;
  }

  if (!glyphValidator(props.name as string, iconStyle)) {
    console.warn(
      `noSuchGlyph: glyph ${String(props.name)} does not exist for '${iconStyle}' icon type for FontAwesome6`,
    );

    return <Icons.regular {...(props as regularIconProps)} />;
  }

  switch (iconStyle) {
    case 'brand':
      return <Icons.brand {...props} />;
    case 'regular':
      return <Icons.regular {...props} />;
    case 'solid':
      return <Icons.solid {...props} />;
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome5`);
      return <Icons.regular {...(props as regularIconProps)} />;
  }
};

type GetImageSourceFunc = {
  (
    name: keyof typeof brandGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'brand',
  ): ReturnType<(typeof Icons.brand)['getImageSource']>;
  (
    name: keyof typeof regularGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'regular',
  ): ReturnType<(typeof Icons.regular)['getImageSource']>;
  (
    name: keyof typeof solidGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'solid',
  ): ReturnType<(typeof Icons.solid)['getImageSource']>;
  (
    name: keyof typeof regularGM,
    size: number,
    color: TextStyle['color'],
  ): ReturnType<(typeof Icons.regular)['getImageSource']>;
};
const getImageSource: GetImageSourceFunc = (
  name,
  size = DEFAULT_ICON_SIZE,
  color = DEFAULT_ICON_COLOR,
  iconStyle = 'regular',
) => {
  switch (iconStyle) {
    case 'brand':
      return Icons.brand.getImageSource(name as keyof typeof brandGM, size, color);
    case 'regular':
      return Icons.regular.getImageSource(name as keyof typeof regularGM, size, color);
    case 'solid':
      return Icons.solid.getImageSource(name as keyof typeof solidGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome5`);
      return Icons.regular.getImageSource(name as keyof typeof regularGM, size, color);
  }
};
Icon.getImageSource = getImageSource;

type GetImageSourceSyncFunc = {
  (
    name: keyof typeof brandGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'brand',
  ): ReturnType<(typeof Icons.brand)['getImageSourceSync']>;
  (
    name: keyof typeof regularGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'regular',
  ): ReturnType<(typeof Icons.regular)['getImageSourceSync']>;
  (
    name: keyof typeof solidGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'solid',
  ): ReturnType<(typeof Icons.solid)['getImageSourceSync']>;
  (
    name: keyof typeof regularGM,
    size: number,
    color: TextStyle['color'],
  ): ReturnType<(typeof Icons.regular)['getImageSourceSync']>;
};
const getImageSourceSync: GetImageSourceSyncFunc = (
  name,
  size = DEFAULT_ICON_SIZE,
  color = DEFAULT_ICON_COLOR,
  iconStyle = 'regular',
) => {
  switch (iconStyle) {
    case 'brand':
      return Icons.brand.getImageSourceSync(name as keyof typeof brandGM, size, color);
    case 'regular':
      return Icons.regular.getImageSourceSync(name as keyof typeof regularGM, size, color);
    case 'solid':
      return Icons.solid.getImageSourceSync(name as keyof typeof solidGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome5`);
      return Icons.regular.getImageSourceSync(name as keyof typeof regularGM, size, color);
  }
};
Icon.getImageSourceSync = getImageSourceSync;

export default Icon;
