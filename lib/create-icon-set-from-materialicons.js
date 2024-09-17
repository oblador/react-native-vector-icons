import { Platform } from 'react-native';
import createMultiStyleIconSet from './create-multi-style-icon-set';

const MIStyle = {
  regular: 'regular',
  outlined: 'outlined',
  round: 'round',
  sharp: 'sharp',
  twoTone: 'twoTone',
};

function createMIiconSet(glyphMap, metadata = {}) {
  const metadataKeys = Object.keys(metadata);
  const fontFamily = 'MaterialIcons';

  function fallbackFamily(glyph) {
    for (let i = 0; i < metadataKeys.length; i += 1) {
      const family = metadataKeys[i];
      if (metadata[family].indexOf(glyph) !== -1) {
        return family;
      }
    }

    return 'regular';
  }

  function glyphValidator(glyph, style) {
    if (metadataKeys.indexOf(style) === -1) return false;
    return metadata[style].indexOf(glyph) !== -1;
  }

  function createMaterialIconsStyle(style, fontWeight, family = fontFamily) {
    const styleName = style;

    /**
     * Only Material Icons Regular is available as .ttf file on GitHub.
     * The other styles are all .otf files.
     */
    const fontFileExtension = styleName === 'Regular' ? 'ttf' : 'otf';
    const fontFile = `MaterialIcons_${styleName}.${fontFileExtension}`;

    return {
      fontFamily: `${family}-${styleName}`,
      fontFile,
      fontStyle: Platform.select({
        ios: {
          fontWeight,
        },
        default: {},
      }),
      glyphMap: glyphMap[styleName.toLowerCase()],
    };
  }

  const regularIcons = createMaterialIconsStyle('Regular', '400');
  const outlinedIcons = createMaterialIconsStyle('Outlined', '400');
  const roundIcons = createMaterialIconsStyle('Round', '400');
  const sharpIcons = createMaterialIconsStyle('Sharp', '400');
  const twoToneIcons = createMaterialIconsStyle('TwoTone', '400');
  const Icon = createMultiStyleIconSet(
    {
      regular: regularIcons,
      outlined: outlinedIcons,
      round: roundIcons,
      sharp: sharpIcons,
      twoTone: twoToneIcons,
    },
    {
      defaultStyle: 'regular',
      fallbackFamily,
      glyphValidator,
    }
  );

  return Icon;
}

export { MIStyle, createMIiconSet };
