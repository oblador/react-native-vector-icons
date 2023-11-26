import React from 'react';

import { Platform, type TextStyle } from 'react-native';

import { createIconSet, type IconProps } from '@react-native-vector-icons/common';

import lightGlyphMap from '../glyphmaps/FontAwesome5Pro.json';
import regularGlyphMap from '../glyphmaps/FontAwesome5Free_regular.json';
import solidGlyphMap from '../glyphmaps/FontAwesome5Free_solid.json';
import brandGlyphMap from '../glyphmaps/FontAwesome5Free_brand.json';
import duotoneGlyphMap from '../glyphmaps/FontAwesome5Pro_duotone.json';

export const createFA5iconSet = <
  T extends string
>(
  metadata: Record<T, string[]>,
  pro = false
) => {
  const glyphValidator = (glyph: string, iconType: T) =>
    metadata[iconType]?.includes(glyph);

  const createFontAwesomeStyle = (
    glyphMap: Record<string, number>,
    filePostfix: string,
    fontWeight: TextStyle['fontWeight'],
    family = `FontAwesome5${pro ? 'Pro' : 'Free'}`
  ) => {
    const fontFile = `FontAwesome5_${pro ? 'Pro_' : ''}${filePostfix}.ttf`;

    let familyPostfix = filePostfix;
    switch (familyPostfix) {
      case 'Brands':
        familyPostfix = 'Regular';
        break;
      case 'Duotone':
        familyPostfix = 'Solid';
        break;
      default:
        familyPostfix = familyPostfix.replace('Sharp_', '');
    }

    const fontFamily = `${family}-${familyPostfix}`;
    const fontStyle = Platform.select({
      ios: {
        fontWeight,
      },
      default: {},
    });

    return createIconSet(glyphMap, fontFamily, fontFile, fontStyle);
  }

  const LightIcon = createFontAwesomeStyle(lightGlyphMap, 'Light', '300');
  const RegularIcon = createFontAwesomeStyle(regularGlyphMap, 'Regular', '400');
  const SolidIcon = createFontAwesomeStyle(solidGlyphMap, 'Solid', '900');

  const BrandIcon = createFontAwesomeStyle(
    brandGlyphMap,
    'Brands',
    '400',
    'FontAwesome5Brands'
  );
  const DuotoneIcon = createFontAwesomeStyle(
    duotoneGlyphMap,
    'Duotone',
    '900',
    'FontAwesome6Duotone'
  );

  type Props =
    | ({ iconTypeName?: 'light' } & IconProps<keyof typeof lightGlyphMap>)
    | ({ iconTypeName?: 'regular' } & IconProps<keyof typeof regularGlyphMap>)
    | ({ iconTypeName?: 'solid' } & IconProps<keyof typeof solidGlyphMap>)
    | ({ iconTypeName?: 'duotone' } & IconProps<keyof typeof duotoneGlyphMap>)
    | ({ iconTypeName?: 'brand' } & IconProps<keyof typeof brandGlyphMap>)
    | ({ iconTypeName?: undefined } & IconProps<keyof typeof regularGlyphMap>);

  const Icon = ({
    iconTypeName,
    ...props
  }: Props) => {
    if (!iconTypeName) {
      return <RegularIcon {...props} />;
    }

    if (!glyphValidator(props.name as string, iconTypeName as T)) {
      console.warn(
        `noSuchGlyph: glyph ${String(props.name)} does not exist for '${iconTypeName}' icon type for FontAwesome6`
      );
      return <RegularIcon {...props} />;
    }

    switch (iconTypeName) {
      case 'light':
        return <LightIcon {...props} />;
      case 'regular':
        return <RegularIcon {...props} />;
      case 'solid':
        return <SolidIcon {...props} />;

      case 'duotone':
        return <DuotoneIcon {...props} />;

      case 'brand':
        return <BrandIcon {...props} />;

      default:
        console.warn(
          `noSuchIconTypeName: '${iconTypeName}' icon type does not exist for FontAwesome6`
        );

        return <RegularIcon {...props} />;
    }
  };

  Icon.loadFont = async (file?: string) => {
    if (file) {
      return RegularIcon.loadFont(file);
    }

    // TODO: Should we have an API here that allows for specific fonts to be loaded?
    // Maybe pass iconTypeName in or hace a loadAll?
    await Promise.all([
      LightIcon.loadFont(),
      RegularIcon.loadFont(),
      SolidIcon.loadFont(),

      DuotoneIcon.loadFont(),

      BrandIcon.loadFont(),
    ]);
  }

  return Icon;
};
