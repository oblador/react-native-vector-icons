import React from 'react'; // eslint-disable-line import/no-extraneous-dependencies

import { Platform, type TextStyle } from 'react-native';

import {
  createIconSet,
} from '@react-native-vector-icons/common';

import metadata from '../glyphmaps/FontAwesome6Free_meta.json';

import thinGlyphMap from '../glyphmaps/FontAwesome6Pro_thin.json';
import lightGlyphMap from '../glyphmaps/FontAwesome6Pro.json';
import regularGlyphMap from '../glyphmaps/FontAwesome6Free_regular.json';
import solidGlyphMap from '../glyphmaps/FontAwesome6Free_solid.json';
import sharpLightGlyphMap from '../glyphmaps/FontAwesome6Pro_sharpLight.json';
import sharpGlyphMap from '../glyphmaps/FontAwesome6Pro_sharp.json';
import sharpSolidGlyphMap from '../glyphmaps/FontAwesome6Pro_sharpSolid.json';
import brandGlyphMap from '../glyphmaps/FontAwesome6Free_brand.json';
import duotoneGlyphMap from '../glyphmaps/FontAwesome6Pro_duotone.json';

// export enum FA6Style {
//   regular = 'regular',
//   light = 'light',
//   solid = 'solid',
//   brand = 'brand',
//   sharp = 'sharp',
//   sharpLight = 'sharpLight',
//   sharpSolid = 'sharpSolid',
//   duotone = 'duotone',
//   thin = 'thin',
// }

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
  };

  const ThinIcon = createFontAwesomeStyle(thinGlyphMap, 'Thin', '100');
  const LightIcon = createFontAwesomeStyle(lightGlyphMap, 'Light', '300');
  const RegularIcon = createFontAwesomeStyle(regularGlyphMap, 'Regular', '400');
  const SolidIcon = createFontAwesomeStyle(solidGlyphMap, 'Solid', '900');

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

  const BrandIcon = createFontAwesomeStyle(
    brandGlyphMap,
    'Brands',
    '400',
    'FontAwesome6Brands'
  );
  const DuotoneIcon = createFontAwesomeStyle(
    duotoneGlyphMap,
    'Duotone',
    '900',
    'FontAwesome6Duotone'
  );

  type Props =
    | ({ iconTypeName: 'thin' } & Parameters<typeof ThinIcon>[0])
    | ({ iconTypeName: 'light' } & Parameters<typeof LightIcon>[0])
    | ({ iconTypeName: 'regular' } & Parameters<typeof RegularIcon>[0])
    | ({ iconTypeName: 'solid' } & Parameters<typeof SolidIcon>[0])
    | ({ iconTypeName: 'sharpLight' } & Parameters<typeof SharpLightIcon>[0])
    | ({ iconTypeName: 'sharp' } & Parameters<typeof SharpIcon>[0])
    | ({ iconTypeName: 'sharpSolid' } & Parameters<typeof SharpSolidIcon>[0])
    | ({ iconTypeName: 'brand' } & Parameters<typeof BrandIcon>[0])
    | ({ iconTypeName: 'duotone' } & Parameters<typeof DuotoneIcon>[0])
    | ({ iconTypeName: undefined } & Parameters<typeof SolidIcon>[0]);

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

  return Icon;
};

const Icon = createFA6iconSet(metadata, false);

export const foo = <Icon iconTypeName="solid" name="hou" />
export const foo2 = <Icon iconTypeName="brand" name="facebook" />
