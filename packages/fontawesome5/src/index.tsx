/* eslint-disable react/jsx-pascal-case, no-console */

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Instead, modify the template in `fontawesome-common/generator`.
 *
 * FontAwesome5 icon set component.
 * Usage: <FontAwesome5 name="icon-name" size={20} color="#4F8EF7" />
 */
import type { FC } from 'react';
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
  // biome-ignore format: We want these to be consistent and we are fine with multiline for all
  regular: commonCreateIconSet(
    regularGM,
    'FontAwesome5Free-Regular',
    'FontAwesome5_Regular.ttf',
    fontStyle('400'),
  ),
  // biome-ignore format: We want these to be consistent and we are fine with multiline for all
  solid: commonCreateIconSet(
    solidGM,
    'FontAwesome5Free-Solid',
    'FontAwesome5_Solid.ttf',
    fontStyle('900'),
  ),
  // biome-ignore format: We want these to be consistent and we are fine with multiline for all
  brand: commonCreateIconSet(
    brandGM,
    'FontAwesome5Brands-Regular',
    'FontAwesome5_Brands.ttf',
    fontStyle('400'),
  ),
};

const Icon = (props: Props) => {
  const { iconStyle, name } = props;
  if (!iconStyle) {
    return <Icons.regular {...(props as regularIconProps)} />;
  }

  if (!glyphValidator(name as string, iconStyle)) {
    console.warn(`noSuchGlyph: glyph ${String(name)} does not exist for '${iconStyle}' icon type for FontAwesome5`);

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
    iconStyle: 'brand',
    name: keyof typeof brandGM,
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof Icons.brand)['getImageSource']>;
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
// biome-ignore format: We want these to be consistent and we are fine with single for all
const getImageSource: GetImageSourceFunc = (iconStyle, name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR) => {
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
    iconStyle: 'brand',
    name: keyof typeof brandGM,
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof Icons.brand)['getImageSourceSync']>;
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
// biome-ignore format: We want these to be consistent and we are fine with single for all
const getImageSourceSync: GetImageSourceSyncFunc = (iconStyle, name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR) => {
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
