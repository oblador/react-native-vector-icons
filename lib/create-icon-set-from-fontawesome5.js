import { Platform } from './react-native';
import createStackedIconSet from './create-stacked-icon-set';
import createIconSetWithStyle from './create-icon-set-with-style';
import createMultiStyleIconSet from './create-multi-style-icon-set';

const FA5Style = {
  regular: 'regular',
  light: 'light',
  solid: 'solid',
  brand: 'brand',
  duotone: 'duotone',
};

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

  function createFontAwesomeIconSet(inputOptions) {
    const { fontWeight, style, family, styleGlyphMap } = {
      styleGlyphMap: glyphMap,
      family: fontFamily,
      ...inputOptions,
    };

    let styleName = style;
    let fontFile = `FontAwesome5_${pro ? `Pro_${styleName}` : styleName}.ttf`;

    if (styleName === 'Brands') {
      styleName = 'Regular';
      fontFile = 'FontAwesome5_Brands.ttf';
    } else if (styleName === 'Duotone') {
      styleName = 'Solid';
      fontFile = 'FontAwesome5_Duotone.ttf';
    }

    return createIconSetWithStyle({
      fontFamily: `${family}-${styleName}`,
      fontFile,
      fontStyle: Platform.select({
        default: {},
        ios: { fontWeight },
      }),
      glyphMap: styleGlyphMap,
    });
  }

  const brandIcons = createFontAwesomeIconSet({
    style: 'Brands',
    fontWeight: '400',
    family: 'FontAwesome5Brands',
  });
  const lightIcons = createFontAwesomeIconSet({
    style: 'Light',
    fontWeight: '300',
  });
  const regularIcons = createFontAwesomeIconSet({
    style: 'Regular',
    fontWeight: '400',
  });
  const solidIcons = createFontAwesomeIconSet({
    style: 'Solid',
    fontWeight: '900',
  });

  const duotoneIcons = createStackedIconSet(
    createFontAwesomeIconSet({
      style: 'Duotone',
      fontWeight: '900',
      family: 'FontAwesome5Duotone',
    }),
    createFontAwesomeIconSet({
      style: 'Duotone',
      fontWeight: '900',
      family: 'FontAwesome5Duotone',
      styleGlyphMap: Object.keys(glyphMap).reduce((acc, key) => {
        acc[key] = glyphMap[key] + 0x100000;
        return acc;
      }, {}),
    })
  );

  const Icon = createMultiStyleIconSet(
    {
      brand: brandIcons,
      light: lightIcons,
      regular: regularIcons,
      duotone: duotoneIcons,
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
