/* eslint-disable react/jsx-pascal-case, no-console */

/**
 * FontAwesome6Pro icon set component.
 * Usage: <FontAwesome6Pro name="icon-name" size={20} color="#4F8EF7" />
 */
import React, { type FC } from 'react';

import { Platform, type TextStyle } from 'react-native';

import {
  DEFAULT_ICON_COLOR,
  DEFAULT_ICON_SIZE,
  type IconProps,
  createIconSet as commonCreateIconSet,
} from '@react-native-vector-icons/common';

import brandGM from '../glyphmaps/FontAwesome6Pro_brand.json';
import duotoneGM from '../glyphmaps/FontAwesome6Pro_duotone.json';
import lightGM from '../glyphmaps/FontAwesome6Pro_light.json';
import regularGM from '../glyphmaps/FontAwesome6Pro_regular.json';
import sharpGM from '../glyphmaps/FontAwesome6Pro_sharp.json';
import sharpLightGM from '../glyphmaps/FontAwesome6Pro_sharpLight.json';
import sharpSolidGM from '../glyphmaps/FontAwesome6Pro_sharpSolid.json';
import sharpThinGM from '../glyphmaps/FontAwesome6Pro_sharpThin.json';
import solidGM from '../glyphmaps/FontAwesome6Pro_solid.json';
import thinGM from '../glyphmaps/FontAwesome6Pro_thin.json';

import metadata from '../glyphmaps/FontAwesome6Pro_meta.json';

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
type sharpIconProps = IconProps<keyof typeof sharpGM>;
type sharpLightIconProps = IconProps<keyof typeof sharpLightGM>;
type sharpSolidIconProps = IconProps<keyof typeof sharpSolidGM>;
type sharpThinIconProps = IconProps<keyof typeof sharpThinGM>;
type solidIconProps = IconProps<keyof typeof solidGM>;
type thinIconProps = IconProps<keyof typeof thinGM>;
type Props =
  | ({ iconStyle?: 'brand' } & brandIconProps)
  | ({ iconStyle?: 'duotone' } & duotoneIconProps)
  | ({ iconStyle?: 'light' } & lightIconProps)
  | ({ iconStyle?: 'regular' } & regularIconProps)
  | ({ iconStyle?: 'sharp' } & sharpIconProps)
  | ({ iconStyle?: 'sharpLight' } & sharpLightIconProps)
  | ({ iconStyle?: 'sharpSolid' } & sharpSolidIconProps)
  | ({ iconStyle?: 'sharpThin' } & sharpThinIconProps)
  | ({ iconStyle?: 'solid' } & solidIconProps)
  | ({ iconStyle?: 'thin' } & thinIconProps)
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
  sharp: FC<sharpIconProps> & {
    getImageSource: GetImageSourceIconFunc<keyof typeof sharpGM>;
    getImageSourceSync: GetImageSourceSyncIconFunc<keyof typeof sharpGM>;
  };
  sharpLight: FC<sharpLightIconProps> & {
    getImageSource: GetImageSourceIconFunc<keyof typeof sharpLightGM>;
    getImageSourceSync: GetImageSourceSyncIconFunc<keyof typeof sharpLightGM>;
  };
  sharpSolid: FC<sharpSolidIconProps> & {
    getImageSource: GetImageSourceIconFunc<keyof typeof sharpSolidGM>;
    getImageSourceSync: GetImageSourceSyncIconFunc<keyof typeof sharpSolidGM>;
  };
  sharpThin: FC<sharpThinIconProps> & {
    getImageSource: GetImageSourceIconFunc<keyof typeof sharpThinGM>;
    getImageSourceSync: GetImageSourceSyncIconFunc<keyof typeof sharpThinGM>;
  };
  solid: FC<solidIconProps> & {
    getImageSource: GetImageSourceIconFunc<keyof typeof solidGM>;
    getImageSourceSync: GetImageSourceSyncIconFunc<keyof typeof solidGM>;
  };
  thin: FC<thinIconProps> & {
    getImageSource: GetImageSourceIconFunc<keyof typeof thinGM>;
    getImageSourceSync: GetImageSourceSyncIconFunc<keyof typeof thinGM>;
  };
};

const Icons: Icons = {
  // biome-ignore format: We want these to be consistent adn we are fine with multiline for all
  thin: commonCreateIconSet(
    thinGM,
    'FontAwesome6Pro-Thin',
    'FontAwesome6_Pro_Thin.ttf',
    fontStyle('100'),
  ),
  // biome-ignore format: We want these to be consistent adn we are fine with multiline for all
  light: commonCreateIconSet(
    lightGM,
    'FontAwesome6Pro-Light',
    'FontAwesome6_Pro_Light.ttf',
    fontStyle('300'),
  ),
  // biome-ignore format: We want these to be consistent adn we are fine with multiline for all
  regular: commonCreateIconSet(
    regularGM,
    'FontAwesome6Pro-Regular',
    'FontAwesome6_Pro_Regular.ttf',
    fontStyle('400'),
  ),
  // biome-ignore format: We want these to be consistent adn we are fine with multiline for all
  solid: commonCreateIconSet(
    solidGM,
    'FontAwesome6Pro-Solid',
    'FontAwesome6_Pro_Solid.ttf',
    fontStyle('900'),
  ),
  // biome-ignore format: We want these to be consistent adn we are fine with multiline for all
  sharpThin: commonCreateIconSet(
    sharpThinGM,
    'FontAwesome6Sharp-Thin',
    'FontAwesome6_Pro_Sharp_Thin.ttf',
    fontStyle('100'),
  ),
  // biome-ignore format: We want these to be consistent adn we are fine with multiline for all
  sharpLight: commonCreateIconSet(
    sharpLightGM,
    'FontAwesome6Sharp-Light',
    'FontAwesome6_Pro_Sharp_Light.ttf',
    fontStyle('300'),
  ),
  // biome-ignore format: We want these to be consistent adn we are fine with multiline for all
  sharp: commonCreateIconSet(
    sharpGM,
    'FontAwesome6Sharp-Regular',
    'FontAwesome6_Pro_Sharp_Regular.ttf',
    fontStyle('400'),
  ),
  // biome-ignore format: We want these to be consistent adn we are fine with multiline for all
  sharpSolid: commonCreateIconSet(
    sharpSolidGM,
    'FontAwesome6Sharp-Solid',
    'FontAwesome6_Pro_Sharp_Solid.ttf',
    fontStyle('900'),
  ),
  // biome-ignore format: We want these to be consistent adn we are fine with multiline for all
  duotone: commonCreateIconSet(
    duotoneGM,
    'FontAwesome6Duotone-Solid',
    'FontAwesome6_Pro_Duotone.ttf',
    fontStyle('900'),
  ),
  // biome-ignore format: We want these to be consistent adn we are fine with multiline for all
  brand: commonCreateIconSet(
    brandGM,
    'FontAwesome6Brands-Regular',
    'FontAwesome6_Pro_Brands.ttf',
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
      `noSuchGlyph: glyph ${String(props.name)} does not exist for '${iconStyle}' icon type for FontAwesome6`,
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
    case 'sharp':
      return <Icons.sharp {...props} />;
    case 'sharpLight':
      return <Icons.sharpLight {...props} />;
    case 'sharpSolid':
      return <Icons.sharpSolid {...props} />;
    case 'sharpThin':
      return <Icons.sharpThin {...props} />;
    case 'solid':
      return <Icons.solid {...props} />;
    case 'thin':
      return <Icons.thin {...props} />;
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome6Pro`);
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
    name: keyof typeof duotoneGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'duotone',
  ): ReturnType<(typeof Icons.duotone)['getImageSource']>;
  (
    name: keyof typeof lightGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'light',
  ): ReturnType<(typeof Icons.light)['getImageSource']>;
  (
    name: keyof typeof regularGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'regular',
  ): ReturnType<(typeof Icons.regular)['getImageSource']>;
  (
    name: keyof typeof sharpGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'sharp',
  ): ReturnType<(typeof Icons.sharp)['getImageSource']>;
  (
    name: keyof typeof sharpLightGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'sharpLight',
  ): ReturnType<(typeof Icons.sharpLight)['getImageSource']>;
  (
    name: keyof typeof sharpSolidGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'sharpSolid',
  ): ReturnType<(typeof Icons.sharpSolid)['getImageSource']>;
  (
    name: keyof typeof sharpThinGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'sharpThin',
  ): ReturnType<(typeof Icons.sharpThin)['getImageSource']>;
  (
    name: keyof typeof solidGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'solid',
  ): ReturnType<(typeof Icons.solid)['getImageSource']>;
  (
    name: keyof typeof thinGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'thin',
  ): ReturnType<(typeof Icons.thin)['getImageSource']>;
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
    case 'duotone':
      return Icons.duotone.getImageSource(name as keyof typeof duotoneGM, size, color);
    case 'light':
      return Icons.light.getImageSource(name as keyof typeof lightGM, size, color);
    case 'regular':
      return Icons.regular.getImageSource(name as keyof typeof regularGM, size, color);
    case 'sharp':
      return Icons.sharp.getImageSource(name as keyof typeof sharpGM, size, color);
    case 'sharpLight':
      return Icons.sharpLight.getImageSource(name as keyof typeof sharpLightGM, size, color);
    case 'sharpSolid':
      return Icons.sharpSolid.getImageSource(name as keyof typeof sharpSolidGM, size, color);
    case 'sharpThin':
      return Icons.sharpThin.getImageSource(name as keyof typeof sharpThinGM, size, color);
    case 'solid':
      return Icons.solid.getImageSource(name as keyof typeof solidGM, size, color);
    case 'thin':
      return Icons.thin.getImageSource(name as keyof typeof thinGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome6Pro`);
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
    name: keyof typeof duotoneGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'duotone',
  ): ReturnType<(typeof Icons.duotone)['getImageSourceSync']>;
  (
    name: keyof typeof lightGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'light',
  ): ReturnType<(typeof Icons.light)['getImageSourceSync']>;
  (
    name: keyof typeof regularGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'regular',
  ): ReturnType<(typeof Icons.regular)['getImageSourceSync']>;
  (
    name: keyof typeof sharpGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'sharp',
  ): ReturnType<(typeof Icons.sharp)['getImageSourceSync']>;
  (
    name: keyof typeof sharpLightGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'sharpLight',
  ): ReturnType<(typeof Icons.sharpLight)['getImageSourceSync']>;
  (
    name: keyof typeof sharpSolidGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'sharpSolid',
  ): ReturnType<(typeof Icons.sharpSolid)['getImageSourceSync']>;
  (
    name: keyof typeof sharpThinGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'sharpThin',
  ): ReturnType<(typeof Icons.sharpThin)['getImageSourceSync']>;
  (
    name: keyof typeof solidGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'solid',
  ): ReturnType<(typeof Icons.solid)['getImageSourceSync']>;
  (
    name: keyof typeof thinGM,
    size: number,
    color: TextStyle['color'],
    iconStyle: 'thin',
  ): ReturnType<(typeof Icons.thin)['getImageSourceSync']>;
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
    case 'duotone':
      return Icons.duotone.getImageSourceSync(name as keyof typeof duotoneGM, size, color);
    case 'light':
      return Icons.light.getImageSourceSync(name as keyof typeof lightGM, size, color);
    case 'regular':
      return Icons.regular.getImageSourceSync(name as keyof typeof regularGM, size, color);
    case 'sharp':
      return Icons.sharp.getImageSourceSync(name as keyof typeof sharpGM, size, color);
    case 'sharpLight':
      return Icons.sharpLight.getImageSourceSync(name as keyof typeof sharpLightGM, size, color);
    case 'sharpSolid':
      return Icons.sharpSolid.getImageSourceSync(name as keyof typeof sharpSolidGM, size, color);
    case 'sharpThin':
      return Icons.sharpThin.getImageSourceSync(name as keyof typeof sharpThinGM, size, color);
    case 'solid':
      return Icons.solid.getImageSourceSync(name as keyof typeof solidGM, size, color);
    case 'thin':
      return Icons.thin.getImageSourceSync(name as keyof typeof thinGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome6Pro`);
      return Icons.regular.getImageSourceSync(name as keyof typeof regularGM, size, color);
  }
};
Icon.getImageSourceSync = getImageSourceSync;

export default Icon;
