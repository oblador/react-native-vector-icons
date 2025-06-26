/* eslint-disable react/jsx-pascal-case, no-console */

/**
 * This is a generated file. If you modify it manually, your changes will be lost!
 * Instead, modify the template in `fontawesome-common/generator`.
 *
 * FontAwesome6Pro icon set component.
 * Usage: <FontAwesome6Pro name="icon-name" size={20} color="#4F8EF7" />
 */
import type { ComponentProps } from 'react';
import { Platform, type TextStyle } from 'react-native';

import { DEFAULT_ICON_COLOR, DEFAULT_ICON_SIZE, createIconSet } from '@react-native-vector-icons/common';

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

// biome-ignore format: We want these to be consistent and we are fine with single for all
const ThinIcon = createIconSet(thinGM, {
  postScriptName: 'FontAwesome6Pro-Thin',
  fontFileName: 'FontAwesome6_Pro_Thin.ttf',
  fontStyle: fontStyle('100')
});
export type FontAwesome6ProThinIconName = ComponentProps<typeof ThinIcon>['name'];
// biome-ignore format: We want these to be consistent and we are fine with single for all
const LightIcon = createIconSet(lightGM, {
  postScriptName: 'FontAwesome6Pro-Light',
  fontFileName: 'FontAwesome6_Pro_Light.ttf',
  fontStyle: fontStyle('300')
});
export type FontAwesome6ProLightIconName = ComponentProps<typeof LightIcon>['name'];
// biome-ignore format: We want these to be consistent and we are fine with single for all
const RegularIcon = createIconSet(regularGM, {
  postScriptName: 'FontAwesome6Pro-Regular',
  fontFileName: 'FontAwesome6_Pro_Regular.ttf',
  fontStyle: fontStyle('400')
});
export type FontAwesome6ProRegularIconName = ComponentProps<typeof RegularIcon>['name'];
// biome-ignore format: We want these to be consistent and we are fine with single for all
const SolidIcon = createIconSet(solidGM, {
  postScriptName: 'FontAwesome6Pro-Solid',
  fontFileName: 'FontAwesome6_Pro_Solid.ttf',
  fontStyle: fontStyle('900')
});
export type FontAwesome6ProSolidIconName = ComponentProps<typeof SolidIcon>['name'];
// biome-ignore format: We want these to be consistent and we are fine with single for all
const SharpThinIcon = createIconSet(sharpThinGM, {
  postScriptName: 'FontAwesome6Sharp-Thin',
  fontFileName: 'FontAwesome6_Pro_Sharp_Thin.ttf',
  fontStyle: fontStyle('100')
});
export type FontAwesome6ProSharpThinIconName = ComponentProps<typeof SharpThinIcon>['name'];
// biome-ignore format: We want these to be consistent and we are fine with single for all
const SharpLightIcon = createIconSet(sharpLightGM, {
  postScriptName: 'FontAwesome6Sharp-Light',
  fontFileName: 'FontAwesome6_Pro_Sharp_Light.ttf',
  fontStyle: fontStyle('300')
});
export type FontAwesome6ProSharpLightIconName = ComponentProps<typeof SharpLightIcon>['name'];
// biome-ignore format: We want these to be consistent and we are fine with single for all
const SharpIcon = createIconSet(sharpGM, {
  postScriptName: 'FontAwesome6Sharp-Regular',
  fontFileName: 'FontAwesome6_Pro_Sharp_Regular.ttf',
  fontStyle: fontStyle('400')
});
export type FontAwesome6ProSharpIconName = ComponentProps<typeof SharpIcon>['name'];
// biome-ignore format: We want these to be consistent and we are fine with single for all
const SharpSolidIcon = createIconSet(sharpSolidGM, {
  postScriptName: 'FontAwesome6Sharp-Solid',
  fontFileName: 'FontAwesome6_Pro_Sharp_Solid.ttf',
  fontStyle: fontStyle('900')
});
export type FontAwesome6ProSharpSolidIconName = ComponentProps<typeof SharpSolidIcon>['name'];
// biome-ignore format: We want these to be consistent and we are fine with single for all
const DuotoneIcon = createIconSet(duotoneGM, {
  postScriptName: 'FontAwesome6Duotone-Solid',
  fontFileName: 'FontAwesome6_Pro_Duotone.ttf',
  fontStyle: fontStyle('900')
});
export type FontAwesome6ProDuotoneIconName = ComponentProps<typeof DuotoneIcon>['name'];
// biome-ignore format: We want these to be consistent and we are fine with single for all
const BrandIcon = createIconSet(brandGM, {
  postScriptName: 'FontAwesome6Brands-Regular',
  fontFileName: 'FontAwesome6_Pro_Brands.ttf',
  fontStyle: fontStyle('400')
});
export type FontAwesome6ProBrandIconName = ComponentProps<typeof BrandIcon>['name'];

type Props =
  | ({ iconStyle: 'thin' } & ComponentProps<typeof ThinIcon>)
  | ({ iconStyle: 'light' } & ComponentProps<typeof LightIcon>)
  | ({ iconStyle: 'regular' } & ComponentProps<typeof RegularIcon>)
  | ({ iconStyle: 'solid' } & ComponentProps<typeof SolidIcon>)
  | ({ iconStyle: 'sharpThin' } & ComponentProps<typeof SharpThinIcon>)
  | ({ iconStyle: 'sharpLight' } & ComponentProps<typeof SharpLightIcon>)
  | ({ iconStyle: 'sharp' } & ComponentProps<typeof SharpIcon>)
  | ({ iconStyle: 'sharpSolid' } & ComponentProps<typeof SharpSolidIcon>)
  | ({ iconStyle: 'duotone' } & ComponentProps<typeof DuotoneIcon>)
  | ({ iconStyle: 'brand' } & ComponentProps<typeof BrandIcon>)
  | ({ iconStyle?: never } & ComponentProps<typeof RegularIcon>);

export const FontAwesome6Pro = (props: Props) => {
  const { iconStyle, name } = props;
  if (!iconStyle) {
    if (!glyphValidator(name, 'regular')) {
      console.warn(`noSuchGlyph: glyph ${String(name)} does not exist for 'regular' icon type for FontAwesome6Pro`);
    }
    return <RegularIcon {...props} />;
  }

  if (!glyphValidator(name, iconStyle)) {
    console.warn(`noSuchGlyph: glyph ${String(name)} does not exist for '${iconStyle}' icon type for FontAwesome6Pro`);

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
    case 'sharp':
      return <SharpIcon {...props} />;
    case 'sharpLight':
      return <SharpLightIcon {...props} />;
    case 'sharpSolid':
      return <SharpSolidIcon {...props} />;
    case 'sharpThin':
      return <SharpThinIcon {...props} />;
    case 'solid':
      return <SolidIcon {...props} />;
    case 'thin':
      return <ThinIcon {...props} />;
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome6Pro`);
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
    iconStyle: 'sharp',
    name: ComponentProps<typeof SharpIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof SharpIcon)['getImageSource']>;
  (
    iconStyle: 'sharpLight',
    name: ComponentProps<typeof SharpLightIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof SharpLightIcon)['getImageSource']>;
  (
    iconStyle: 'sharpSolid',
    name: ComponentProps<typeof SharpSolidIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof SharpSolidIcon)['getImageSource']>;
  (
    iconStyle: 'sharpThin',
    name: ComponentProps<typeof SharpThinIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof SharpThinIcon)['getImageSource']>;
  (
    iconStyle: 'solid',
    name: ComponentProps<typeof SolidIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof SolidIcon)['getImageSource']>;
  (
    iconStyle: 'thin',
    name: ComponentProps<typeof ThinIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof ThinIcon)['getImageSource']>;
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
    case 'sharp':
      return SharpIcon.getImageSource(name as keyof typeof sharpGM, size, color);
    case 'sharpLight':
      return SharpLightIcon.getImageSource(name as keyof typeof sharpLightGM, size, color);
    case 'sharpSolid':
      return SharpSolidIcon.getImageSource(name as keyof typeof sharpSolidGM, size, color);
    case 'sharpThin':
      return SharpThinIcon.getImageSource(name as keyof typeof sharpThinGM, size, color);
    case 'solid':
      return SolidIcon.getImageSource(name as keyof typeof solidGM, size, color);
    case 'thin':
      return ThinIcon.getImageSource(name as keyof typeof thinGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome6Pro`);
      return RegularIcon.getImageSource(name as keyof typeof regularGM, size, color);
  }
};
FontAwesome6Pro.getImageSource = getImageSource;

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
    iconStyle: 'sharp',
    name: ComponentProps<typeof SharpIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof SharpIcon)['getImageSourceSync']>;
  (
    iconStyle: 'sharpLight',
    name: ComponentProps<typeof SharpLightIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof SharpLightIcon)['getImageSourceSync']>;
  (
    iconStyle: 'sharpSolid',
    name: ComponentProps<typeof SharpSolidIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof SharpSolidIcon)['getImageSourceSync']>;
  (
    iconStyle: 'sharpThin',
    name: ComponentProps<typeof SharpThinIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof SharpThinIcon)['getImageSourceSync']>;
  (
    iconStyle: 'solid',
    name: ComponentProps<typeof SolidIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof SolidIcon)['getImageSourceSync']>;
  (
    iconStyle: 'thin',
    name: ComponentProps<typeof ThinIcon>['name'],
    size?: number,
    color?: TextStyle['color'],
  ): ReturnType<(typeof ThinIcon)['getImageSourceSync']>;
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
    case 'sharp':
      return SharpIcon.getImageSourceSync(name as keyof typeof sharpGM, size, color);
    case 'sharpLight':
      return SharpLightIcon.getImageSourceSync(name as keyof typeof sharpLightGM, size, color);
    case 'sharpSolid':
      return SharpSolidIcon.getImageSourceSync(name as keyof typeof sharpSolidGM, size, color);
    case 'sharpThin':
      return SharpThinIcon.getImageSourceSync(name as keyof typeof sharpThinGM, size, color);
    case 'solid':
      return SolidIcon.getImageSourceSync(name as keyof typeof solidGM, size, color);
    case 'thin':
      return ThinIcon.getImageSourceSync(name as keyof typeof thinGM, size, color);
    default:
      console.warn(`noSuchIconTypeName: '${iconStyle}' icon type does not exist for FontAwesome6Pro`);
      return RegularIcon.getImageSourceSync(name as keyof typeof regularGM, size, color);
  }
};
FontAwesome6Pro.getImageSourceSync = getImageSourceSync;

export type FontAwesome6ProIconName = ComponentProps<typeof FontAwesome6Pro>['name'];

export default FontAwesome6Pro;
