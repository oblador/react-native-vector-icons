/* eslint-disable react/jsx-pascal-case, no-console */

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Instead, modify the template in `fontawesome-common/generator`.
 *
 * FontAwesome5 icon set component.
 * Usage: <FontAwesome5 name="icon-name" size={20} color="#4F8EF7" />
 */
import type { ComponentProps } from 'react';
import { Platform, type TextStyle } from 'react-native';

import { DEFAULT_ICON_COLOR, DEFAULT_ICON_SIZE, createIconSet } from '@react-native-vector-icons/common';

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

// biome-ignore format: We want these to be consistent and we are fine with single for all
const RegularIcon = createIconSet(regularGM, {
  postScriptName: 'FontAwesome5Free-Regular',
  fontFileName: 'FontAwesome5_Regular.ttf',
  fontSource: require('../fonts/FontAwesome5_Regular.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
  fontStyle: fontStyle('400')
});
// biome-ignore format: We want these to be consistent and we are fine with single for all
const SolidIcon = createIconSet(solidGM, {
  postScriptName: 'FontAwesome5Free-Solid',
  fontFileName: 'FontAwesome5_Solid.ttf',
  fontSource: require('../fonts/FontAwesome5_Solid.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
  fontStyle: fontStyle('900')
});
// biome-ignore format: We want these to be consistent and we are fine with single for all
const BrandIcon = createIconSet(brandGM, {
  postScriptName: 'FontAwesome5Brands-Regular',
  fontFileName: 'FontAwesome5_Brands.ttf',
  fontSource: require('../fonts/FontAwesome5_Brands.ttf'), // eslint-disable-line @typescript-eslint/no-require-imports, global-require
  fontStyle: fontStyle('400')
});

type Props =
  | ({ iconStyle: 'regular' } & ComponentProps<typeof RegularIcon>)
  | ({ iconStyle: 'solid' } & ComponentProps<typeof SolidIcon>)
  | ({ iconStyle: 'brand' } & ComponentProps<typeof BrandIcon>)
  | ({ iconStyle?: never } & ComponentProps<typeof RegularIcon>);

const Icon = (props: Props) => {
  const { iconStyle, name } = props;
  if (!iconStyle) {
    if (!glyphValidator(name, 'regular')) {
      console.warn(`noSuchGlyph: glyph ${String(name)} does not exist for 'regular' icon type for FontAwesome5`);
    }
    return <RegularIcon {...props} />;
  }

  if (!glyphValidator(name, iconStyle)) {
    console.warn(`noSuchGlyph: glyph ${String(name)} does not exist for '${iconStyle}' icon type for FontAwesome5`);

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
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome5`);
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
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome5`);
      return RegularIcon.getImageSource(name as keyof typeof regularGM, size, color);
  }
};
Icon.getImageSource = getImageSource;

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
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome5`);
      return RegularIcon.getImageSourceSync(name as keyof typeof regularGM, size, color);
  }
};
Icon.getImageSourceSync = getImageSourceSync;

export default Icon;
