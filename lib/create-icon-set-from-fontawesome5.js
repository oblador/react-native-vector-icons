import { createMultiStyleIconSet } from './create-multi-style-icon-set';

const FA5Style = {
  regular: 0,
  light: 1,
  solid: 2,
  brand: 3,
};

function createFA5iconSet(glyphMap, metadata = {}, pro = false) {
  const fontFamily = `Font Awesome 5 ${pro ? 'Pro' : 'Free'}`;
  const metadataKeys = Object.keys(metadata);

  function fallbackFamily(glyph) {
    for (let i = 0; i < metadataKeys.length; i += 1) {
      const family = metadataKeys[i];
      if (metadata[family].indexOf(glyph) !== -1) return family;
    }

    return 'regular';
  }

  function glyphValidator(glyph, style) {
    const family = style === 'brand' ? 'brands' : style;
    if (metadataKeys.indexOf(family) === -1) return false;
    return metadata[family].indexOf(glyph) !== -1;
  }

  function createFontAwesomeStyle(styleName, fontWeight, family = fontFamily) {
    const fontFile =
      styleName === 'Brands'
        ? `FontAwesome5_${pro ? `Pro_${styleName}` : styleName}.ttf`
        : 'FontAwesome5_Brands.ttf';

    return {
      fontFamily: family,
      fontFile,
      fontStyle: {
        fontWeight,
      },
      glyphMap,
    };
  }

  const brandIcons = createFontAwesomeStyle(
    'Brands',
    '400',
    'Font Awesome 5 Brands'
  );

  const lightIcons = createFontAwesomeStyle('Light', '100');
  const regularIcons = createFontAwesomeStyle('Regular', '400');
  const solidIcons = createFontAwesomeStyle('Solid', '700');

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
