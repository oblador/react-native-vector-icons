import { Platform } from 'react-native';
import createMultiStyleIconSet from './create-multi-style-icon-set';

/**
 * @deprecated react-native-vector-icons package has moved to a new model of per-icon-family packages. See the https://github.com/oblador/react-native-vector-icons/blob/master/MIGRATION.md on how to migrate
 */
const FA5Style = {
  regular: 'regular',
  light: 'light',
  solid: 'solid',
  brand: 'brand',
};

/**
 * @deprecated react-native-vector-icons package has moved to a new model of per-icon-family packages. See the https://github.com/oblador/react-native-vector-icons/blob/master/MIGRATION.md on how to migrate
 */
function createFA5iconSet(glyphMap, metadata = {}, pro = false) {
  const metadataKeys = Object.keys(metadata);
  const fontFamily = `FontAwesome5${pro ? 'Pro' : 'Free'}`;

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
    const family = style === 'brand' ? 'brands' : style;
    if (metadataKeys.indexOf(family) === -1) return false;
    return metadata[family].indexOf(glyph) !== -1;
  }

  function createFontAwesomeStyle(style, fontWeight, family = fontFamily) {
    let styleName = style;
    let fontFile = `FontAwesome5_${pro ? `Pro_${styleName}` : styleName}.ttf`;

    if (styleName === 'Brands') {
      styleName = 'Regular';
      fontFile = 'FontAwesome5_Brands.ttf';
    }

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
    'FontAwesome5Brands'
  );
  const lightIcons = createFontAwesomeStyle('Light', '300');
  const regularIcons = createFontAwesomeStyle('Regular', '400');
  const solidIcons = createFontAwesomeStyle('Solid', '900');
  const Icon = createMultiStyleIconSet(
    {
      brand: brandIcons,
      light: lightIcons,
      regular: regularIcons,
      solid: solidIcons,
    },
    {
      defaultStyle: 'regular',
      fallbackFamily,
      glyphValidator,
    }
  );

  return Icon;
}

export { createFA5iconSet, FA5Style };
