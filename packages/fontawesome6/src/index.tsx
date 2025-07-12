/* eslint-disable react/jsx-pascal-case, no-console */

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Instead, modify the template in `fontawesome-common/generator`.
 *
 * FontAwesome6 icon set component.
 * Usage: <FontAwesome6 name="icon-name" size={20} color="#4F8EF7" />
 */

import type { ComponentProps } from 'react';
import { Platform, type TextStyle } from 'react-native';

import { createIconSet, DEFAULT_ICON_COLOR, DEFAULT_ICON_SIZE } from '@react-native-vector-icons/common';

import brandGM from '../glyphmaps/FontAwesome6_brand.json';
import regularGM from '../glyphmaps/FontAwesome6_regular.json';
import solidGM from '../glyphmaps/FontAwesome6_solid.json';

import metadata from '../glyphmaps/FontAwesome6_meta.json';

const glyphValidator = (glyph: string, iconType: keyof typeof metadata) => metadata[iconType]?.includes(glyph);

const fontStyle = (fontWeight: TextStyle['fontWeight']) =>
  Platform.select({
    ios: {
      fontWeight,
    },
    default: {},
  });

// biome-ignore format: We want these to be consistent and we are fine with single for all
const RegularIcon = createIconSet(regularGM, {
  postScriptName: 'FontAwesome6Free-Regular',
  fontFileName: 'FontAwesome6_Regular.ttf',
  fontSource: require('../fonts/FontAwesome6_Regular.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
  fontStyle: fontStyle('400')
});
export type FontAwesome6RegularIconName = keyof typeof regularGM;
// biome-ignore format: We want these to be consistent and we are fine with single for all
const SolidIcon = createIconSet(solidGM, {
  postScriptName: 'FontAwesome6Free-Solid',
  fontFileName: 'FontAwesome6_Solid.ttf',
  fontSource: require('../fonts/FontAwesome6_Solid.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
  fontStyle: fontStyle('900')
});
export type FontAwesome6SolidIconName = keyof typeof solidGM;
// biome-ignore format: We want these to be consistent and we are fine with single for all
const BrandIcon = createIconSet(brandGM, {
  postScriptName: 'FontAwesome6Brands-Regular',
  fontFileName: 'FontAwesome6_Brands.ttf',
  fontSource: require('../fonts/FontAwesome6_Brands.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
  fontStyle: fontStyle('400')
});
export type FontAwesome6BrandIconName = keyof typeof brandGM;
type Props =
  | ({ iconStyle: 'regular' } & ComponentProps<typeof RegularIcon>)
  | ({ iconStyle: 'solid' } & ComponentProps<typeof SolidIcon>)
  | ({ iconStyle: 'brand' } & ComponentProps<typeof BrandIcon>)
  | ({ iconStyle?: never } & ComponentProps<typeof RegularIcon>);

export const FontAwesome6 = (props: Props) => {
  const { iconStyle, name } = props;
  if (!iconStyle) {
    if (!glyphValidator(name, 'regular')) {
      console.warn(`noSuchGlyph: glyph ${String(name)} does not exist for 'regular' icon type for FontAwesome6`);
    }
    return <RegularIcon {...props} />;
  }

  if (!glyphValidator(name, iconStyle)) {
    console.warn(`noSuchGlyph: glyph ${String(name)} does not exist for '${iconStyle}' icon type for FontAwesome6`);

    return <RegularIcon {...(props as ComponentProps<typeof RegularIcon>)} />;
  }

  switch (iconStyle) {
    case 'brand':
      return <BrandIcon {...props} />;
    case 'regular':
      return <RegularIcon {...props} />;
    case 'solid':
      return <SolidIcon {...props} />;
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome6`);
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
    case 'regular':
      return RegularIcon.getImageSource(name as keyof typeof regularGM, size, color);
    case 'solid':
      return SolidIcon.getImageSource(name as keyof typeof solidGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome6`);
      return RegularIcon.getImageSource(name as keyof typeof regularGM, size, color);
  }
};
FontAwesome6.getImageSource = getImageSource;

type GetImageSourceSyncFunc = {
  (
    iconStyle: 'brand',
    name: ComponentProps<typeof BrandIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof BrandIcon)['getImageSourceSync']>;
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
    case 'regular':
      return RegularIcon.getImageSourceSync(name as keyof typeof regularGM, size, color);
    case 'solid':
      return SolidIcon.getImageSourceSync(name as keyof typeof solidGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome6`);
      return RegularIcon.getImageSourceSync(name as keyof typeof regularGM, size, color);
  }
};
FontAwesome6.getImageSourceSync = getImageSourceSync;

export type FontAwesome6IconName = ComponentProps<typeof FontAwesome6>['name'];

/** @alias */
export default FontAwesome6;
