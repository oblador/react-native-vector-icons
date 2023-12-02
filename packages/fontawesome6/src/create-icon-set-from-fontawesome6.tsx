import React from 'react';

import { Platform, type TextStyle } from 'react-native';

import { createIconSet, type IconProps } from '@react-native-vector-icons/common';

import thinGlyphMap from '../glyphmaps/FontAwesome6Pro_thin.json';
import lightGlyphMap from '../glyphmaps/FontAwesome6Pro.json';
import regularGlyphMap from '../glyphmaps/FontAwesome6Free_regular.json';
import solidGlyphMap from '../glyphmaps/FontAwesome6Free_solid.json';
import sharpThinGlyphMap from '../glyphmaps/FontAwesome6Pro_sharpThin.json';
import sharpLightGlyphMap from '../glyphmaps/FontAwesome6Pro_sharpLight.json';
import sharpGlyphMap from '../glyphmaps/FontAwesome6Pro_sharp.json';
import sharpSolidGlyphMap from '../glyphmaps/FontAwesome6Pro_sharpSolid.json';
import duotoneGlyphMap from '../glyphmaps/FontAwesome6Pro_duotone.json';
import brandGlyphMap from '../glyphmaps/FontAwesome6Free_brand.json';

export const createFA6iconSet = <
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
    family = `FontAwesome6${pro ? 'Pro' : 'Free'}`
  ) => {
    const fontFile = `FontAwesome6_${pro ? 'Pro_' : ''}${filePostfix}.ttf`;

    let familyPostfix = filePostfix;
    switch (familyPostfix) {
      case 'Duotone':
        familyPostfix = 'Solid';
        break;
      case 'Brands':
        familyPostfix = 'Regular';
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
  };

  const ThinIcon = createFontAwesomeStyle(thinGlyphMap, 'Thin', '100');
  const LightIcon = createFontAwesomeStyle(lightGlyphMap, 'Light', '300');
  const RegularIcon = createFontAwesomeStyle(regularGlyphMap, 'Regular', '400');
  const SolidIcon = createFontAwesomeStyle(solidGlyphMap, 'Solid', '900');

  const SharpThinIcon = createFontAwesomeStyle(
    sharpThinGlyphMap,
    'Sharp_Thin',
    '100',
    'FontAwesome6Sharp'
  );
  const SharpLightIcon = createFontAwesomeStyle(
    sharpLightGlyphMap,
    'Sharp_Light',
    '300',
    'FontAwesome6Sharp'
  );
  const SharpIcon = createFontAwesomeStyle(
    sharpGlyphMap,
    'Sharp_Regular',
    '400',
    'FontAwesome6Sharp'
  );
  const SharpSolidIcon = createFontAwesomeStyle(
    sharpSolidGlyphMap,
    'Sharp_Solid',
    '900',
    'FontAwesome6Sharp'
  );

  const DuotoneIcon = createFontAwesomeStyle(
    duotoneGlyphMap,
    'Duotone',
    '900',
    'FontAwesome6Duotone'
  );

  const BrandIcon = createFontAwesomeStyle(
    brandGlyphMap,
    'Brands',
    '400',
    'FontAwesome6Brands'
  );

  type Props =
    | ({ iconTypeName?: 'thin' } & IconProps<keyof typeof thinGlyphMap>)
    | ({ iconTypeName?: 'light' } & IconProps<keyof typeof lightGlyphMap>)
    | ({ iconTypeName?: 'regular' } & IconProps<keyof typeof regularGlyphMap>)
    | ({ iconTypeName?: 'solid' } & IconProps<keyof typeof solidGlyphMap>)
    | ({ iconTypeName?: 'sharpThin' } & IconProps<keyof typeof sharpThinGlyphMap>)
    | ({ iconTypeName?: 'sharpLight' } & IconProps<keyof typeof sharpLightGlyphMap>)
    | ({ iconTypeName?: 'sharp' } & IconProps<keyof typeof sharpGlyphMap>)
    | ({ iconTypeName?: 'sharpSolid' } & IconProps<keyof typeof sharpSolidGlyphMap>)
    | ({ iconTypeName?: 'duotone' } & IconProps<keyof typeof duotoneGlyphMap>)
    | ({ iconTypeName?: 'brand' } & IconProps<keyof typeof brandGlyphMap>)
    | ({ iconTypeName?: undefined } & IconProps<keyof typeof regularGlyphMap>);

  const Icon = ({
    iconTypeName,
    ...props
  }: Props) => {
    if (!iconTypeName) {
      return <SolidIcon {...props} />;
    }

    if (!glyphValidator(props.name as string, iconTypeName as T)) {
      console.warn(
        `noSuchGlyph: glyph ${String(props.name)} does not exist for '${iconTypeName}' icon type for FontAwesome6`
      );
      return <RegularIcon {...props} />;
    }

    switch (iconTypeName) {
      case 'thin':
        return <ThinIcon {...props} />;
      case 'light':
        return <LightIcon {...props} />;
      case 'regular':
        return <RegularIcon {...props} />;
      case 'solid':
        return <SolidIcon {...props} />;

      case 'sharpThin':
        return <SharpThinIcon {...props} />;
      case 'sharpLight':
        return <SharpLightIcon {...props} />;
      case 'sharp':
        return <SharpIcon {...props} />;
      case 'sharpSolid':
        return <SharpSolidIcon {...props} />;

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
      return SolidIcon.loadFont(file);
    }

    // TODO: Should we have an API here that allows for specific fonts to be loaded?
    // Maybe pass iconTypeName in or hace a loadAll?
    await Promise.all([
      ThinIcon.loadFont(),
      LightIcon.loadFont(),
      RegularIcon.loadFont(),
      SolidIcon.loadFont(),

      SharpThinIcon.loadFont(),
      SharpLightIcon.loadFont(),
      SharpIcon.loadFont(),
      SharpSolidIcon.loadFont(),

      BrandIcon.loadFont(),

      DuotoneIcon.loadFont(),
    ]);
  }

  return Icon;
};
