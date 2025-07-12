import { Platform } from 'react-native';
import createMultiStyleIconSet from './create-multi-style-icon-set';

/**
 * @deprecated react-native-vector-icons package has moved to a new model of per-icon-family packages. See the https://github.com/oblador/react-native-vector-icons/blob/master/MIGRATION.md on how to migrate
 */
const FA6Style = {
  regular: 'regular',
  light: 'light',
  solid: 'solid',
  brand: 'brand',
  sharp: 'sharp',
  sharpLight: 'sharpLight',
  sharpSolid: 'sharpSolid',
  duotone: 'duotone',
  thin: 'thin',
};

/**
 * @deprecated react-native-vector-icons package has moved to a new model of per-icon-family packages. See the https://github.com/oblador/react-native-vector-icons/blob/master/MIGRATION.md on how to migrate
 */
function createFA6iconSet(glyphMap, metadata = {}, pro = false) {
  const metadataKeys = Object.keys(metadata);
  const fontFamily = `FontAwesome6${pro ? 'Pro' : 'Free'}`;

  function fallbackFamily(glyph) {
    for (let i = 0; i < metadataKeys.length; i += 1) {
      const family = metadataKeys[i];
      if (metadata[family].indexOf(glyph) !== -1) {
        return family === 'brands' ? 'brand' : family;
      }
    }

    return 'regular';
  }

  function glyphValidator(glyph, style) {
    let family = style === 'brand' ? 'brands' : style;
    family = style === 'sharpSolid' ? 'sharp-solid' : family;
    if (metadataKeys.indexOf(family) === -1) return false;
    return metadata[family].indexOf(glyph) !== -1;
  }

  function createFontAwesomeStyle(style, fontWeight, family = fontFamily) {
    let styleName = style;
    const fontFile = `FontAwesome6_${pro ? `Pro_${styleName}` : styleName}.ttf`;

    if (styleName === 'Brands') {
      styleName = 'Regular';
    }

    if (styleName === 'Duotone') {
      styleName = 'Solid';
    }

    styleName = styleName.replace('Sharp_', '');

    return {
      fontFamily: `${family}-${styleName}`,
      fontFile,
      fontStyle: Platform.select({
        ios: {
          fontWeight,
        },
        default: {},
      }),
      glyphMap,
    };
  }

  const brandIcons = createFontAwesomeStyle(
    'Brands',
    '400',
    'FontAwesome6Brands'
  );
  const lightIcons = createFontAwesomeStyle('Light', '300');
  const regularIcons = createFontAwesomeStyle('Regular', '400');
  const solidIcons = createFontAwesomeStyle('Solid', '900');
  const sharpLightIcons = createFontAwesomeStyle(
    'Sharp_Light',
    '300',
    'FontAwesome6Sharp'
  );
  const sharpIcons = createFontAwesomeStyle(
    'Sharp_Regular',
    '400',
    'FontAwesome6Sharp'
  );
  const sharpSolidIcons = createFontAwesomeStyle(
    'Sharp_Solid',
    '900',
    'FontAwesome6Sharp'
  );
  const duotoneIcons = createFontAwesomeStyle(
    'Duotone',
    '900',
    'FontAwesome6Duotone'
  );
  const thinIcons = createFontAwesomeStyle('Thin', '100');
  const Icon = createMultiStyleIconSet(
    {
      brand: brandIcons,
      light: lightIcons,
      regular: regularIcons,
      solid: solidIcons,
      sharp: sharpIcons,
      sharpLight: sharpLightIcons,
      sharpSolid: sharpSolidIcons,
      duotone: duotoneIcons,
      thin: thinIcons,
    },
    {
      defaultStyle: 'regular',
      fallbackFamily,
      glyphValidator,
    }
  );

  return Icon;
}

export { createFA6iconSet, FA6Style };
