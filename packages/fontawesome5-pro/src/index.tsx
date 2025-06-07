/* eslint-disable react/jsx-pascal-case, no-console */

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Instead, modify the template in `fontawesome-common/generator`.
 *
 * FontAwesome5Pro icon set component.
 * Usage: <FontAwesome5Pro name="icon-name" size={20} color="#4F8EF7" />
 */
import type { ComponentProps } from 'react';
import { Platform, type TextStyle } from 'react-native';

import { DEFAULT_ICON_COLOR, DEFAULT_ICON_SIZE, createIconSet } from '@react-native-vector-icons/common';

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

// biome-ignore format: We want these to be consistent and we are fine with single for all
const LightIcon = createIconSet(lightGM, 'FontAwesome5Pro-Light', 'FontAwesome5_Pro_Light.ttf', fontStyle('300'));
export type FontAwesome5ProLightIconName = ComponentProps<typeof LightIcon>['name'];

// biome-ignore format: We want these to be consistent and we are fine with single for all
const RegularIcon = createIconSet(regularGM, 'FontAwesome5Pro-Regular', 'FontAwesome5_Pro_Regular.ttf', fontStyle('400'));
export type FontAwesome5ProRegularIconName = ComponentProps<typeof RegularIcon>['name'];

// biome-ignore format: We want these to be consistent and we are fine with single for all
const SolidIcon = createIconSet(solidGM, 'FontAwesome5Pro-Solid', 'FontAwesome5_Pro_Solid.ttf', fontStyle('900'));
export type FontAwesome5ProSolidIconName = ComponentProps<typeof SolidIcon>['name'];

// biome-ignore format: We want these to be consistent and we are fine with single for all
const DuotoneIcon = createIconSet(duotoneGM, 'FontAwesome5Duotone-Solid', 'FontAwesome5_Pro_Duotone.ttf', fontStyle('900'));
export type FontAwesome5ProDuotoneIconName = ComponentProps<typeof DuotoneIcon>['name'];

// biome-ignore format: We want these to be consistent and we are fine with single for all
const BrandIcon = createIconSet(brandGM, 'FontAwesome5Brands-Regular', 'FontAwesome5_Pro_Brands.ttf', fontStyle('400'));
export type FontAwesome5ProBrandIconName = ComponentProps<typeof BrandIcon>['name'];

type Props =
  | ({ iconStyle: 'light' } & ComponentProps<typeof LightIcon>)
  | ({ iconStyle: 'regular' } & ComponentProps<typeof RegularIcon>)
  | ({ iconStyle: 'solid' } & ComponentProps<typeof SolidIcon>)
  | ({ iconStyle: 'duotone' } & ComponentProps<typeof DuotoneIcon>)
  | ({ iconStyle: 'brand' } & ComponentProps<typeof BrandIcon>)
  | ({ iconStyle?: never } & ComponentProps<typeof RegularIcon>);

export const FontAwesome5Pro = (props: Props) => {
  const { iconStyle, name } = props;
  if (!iconStyle) {
    return <RegularIcon {...props} />;
  }

  if (!glyphValidator(name, iconStyle)) {
    console.warn(`noSuchGlyph: glyph ${String(name)} does not exist for '${iconStyle}' icon type for FontAwesome5Pro`);

    return <RegularIcon {...(props as ComponentProps<typeof RegularIcon>)} />;
  }

  switch (iconStyle) {
    case 'brand':
      return <BrandIcon {...props} />;
    case 'duotone':
      return <DuotoneIcon {...props} />;
    case 'light':
      return <LightIcon {...props} />;
    case 'regular':
      return <RegularIcon {...props} />;
    case 'solid':
      return <SolidIcon {...props} />;
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome5Pro`);
      return <RegularIcon {...(props as ComponentProps<typeof RegularIcon>)} />;
  }
};

type GetImageSourceFunc = {
  (
    iconStyle: 'brand',
    name: ComponentProps<typeof BrandIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof BrandIcon)['getImageSource']>;
  (
    iconStyle: 'duotone',
    name: ComponentProps<typeof DuotoneIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof DuotoneIcon)['getImageSource']>;
  (
    iconStyle: 'light',
    name: ComponentProps<typeof LightIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof LightIcon)['getImageSource']>;
  (
    iconStyle: 'regular',
    name: ComponentProps<typeof RegularIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof RegularIcon)['getImageSource']>;
  (
    iconStyle: 'solid',
    name: ComponentProps<typeof SolidIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof SolidIcon)['getImageSource']>;
};
// biome-ignore format: We want these to be consistent and we are fine with single for all
const getImageSource: GetImageSourceFunc = (iconStyle, name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR) => {
  switch (iconStyle) {
    case 'brand':
      return BrandIcon.getImageSource(name as keyof typeof brandGM, size, color);
    case 'duotone':
      return DuotoneIcon.getImageSource(name as keyof typeof duotoneGM, size, color);
    case 'light':
      return LightIcon.getImageSource(name as keyof typeof lightGM, size, color);
    case 'regular':
      return RegularIcon.getImageSource(name as keyof typeof regularGM, size, color);
    case 'solid':
      return SolidIcon.getImageSource(name as keyof typeof solidGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome5Pro`);
      return RegularIcon.getImageSource(name as keyof typeof regularGM, size, color);
  }
};
FontAwesome5Pro.getImageSource = getImageSource;

type GetImageSourceSyncFunc = {
  (
    iconStyle: 'brand',
    name: ComponentProps<typeof BrandIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof BrandIcon)['getImageSourceSync']>;
  (
    iconStyle: 'duotone',
    name: ComponentProps<typeof DuotoneIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof DuotoneIcon)['getImageSourceSync']>;
  (
    iconStyle: 'light',
    name: ComponentProps<typeof LightIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof LightIcon)['getImageSourceSync']>;
  (
    iconStyle: 'regular',
    name: ComponentProps<typeof RegularIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof RegularIcon)['getImageSourceSync']>;
  (
    iconStyle: 'solid',
    name: ComponentProps<typeof SolidIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof SolidIcon)['getImageSourceSync']>;
};
// biome-ignore format: We want these to be consistent and we are fine with single for all
const getImageSourceSync: GetImageSourceSyncFunc = (iconStyle, name, size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR) => {
  switch (iconStyle) {
    case 'brand':
      return BrandIcon.getImageSourceSync(name as keyof typeof brandGM, size, color);
    case 'duotone':
      return DuotoneIcon.getImageSourceSync(name as keyof typeof duotoneGM, size, color);
    case 'light':
      return LightIcon.getImageSourceSync(name as keyof typeof lightGM, size, color);
    case 'regular':
      return RegularIcon.getImageSourceSync(name as keyof typeof regularGM, size, color);
    case 'solid':
      return SolidIcon.getImageSourceSync(name as keyof typeof solidGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome5Pro`);
      return RegularIcon.getImageSourceSync(name as keyof typeof regularGM, size, color);
  }
};
FontAwesome5Pro.getImageSourceSync = getImageSourceSync;

export type FontAwesome5ProIconName = ComponentProps<typeof FontAwesome5Pro>['name'];

export default FontAwesome5Pro;
