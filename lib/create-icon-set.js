import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  NativeModules,
  Platform,
  PixelRatio,
  processColor,
  Text,
} from 'react-native';

import ensureNativeModuleAvailable from './ensure-native-module-available';
import createIconSourceCache from './create-icon-source-cache';
import createIconButtonComponent from './icon-button';

export const NativeIconAPI =
  NativeModules.RNVectorIconsManager || NativeModules.RNVectorIconsModule;

export const DEFAULT_ICON_SIZE = 12;
export const DEFAULT_ICON_COLOR = 'black';

export default function createIconSet(
  glyphMap,
  fontFamily,
  fontFile,
  fontStyle
) {
  // Android doesn't care about actual fontFamily name, it will only look in fonts folder.
  const fontBasename = fontFile
    ? fontFile.replace(/\.(otf|ttf)$/, '')
    : fontFamily;

  const fontReference = Platform.select({
    windows: `/Assets/${fontFile}#${fontFamily}`,
    android: fontBasename,
    web: fontBasename,
    default: fontFamily,
  });

  const IconNamePropType = PropTypes.oneOf(Object.keys(glyphMap));

  class Icon extends PureComponent {
    root = null;

    static propTypes = {
      allowFontScaling: PropTypes.bool,
      name: IconNamePropType,
      size: PropTypes.number,
      color: PropTypes.any, // eslint-disable-line react/forbid-prop-types
      children: PropTypes.node,
      style: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    };

    static defaultProps = {
      size: DEFAULT_ICON_SIZE,
      allowFontScaling: false,
    };

    setNativeProps(nativeProps) {
      if (this.root) {
        this.root.setNativeProps(nativeProps);
      }
    }

    handleRef = ref => {
      this.root = ref;
    };

    render() {
      const { name, size, color, style, children, ...props } = this.props;

      let glyph = name ? glyphMap[name] || '?' : '';
      if (typeof glyph === 'number') {
        glyph = String.fromCodePoint(glyph);
      }

      const styleDefaults = {
        fontSize: size,
        color,
      };

      const styleOverrides = {
        fontFamily: fontReference,
        fontWeight: 'normal',
        fontStyle: 'normal',
      };

      props.style = [styleDefaults, style, styleOverrides, fontStyle || {}];
      props.ref = this.handleRef;

      return (
        <Text {...props}>
          {glyph}
          {children}
        </Text>
      );
    }
  }

  const imageSourceCache = createIconSourceCache();

  function resolveGlyph(name) {
    const glyph = glyphMap[name] || '?';
    if (typeof glyph === 'number') {
      return String.fromCodePoint(glyph);
    }
    return glyph;
  }

  function getImageSourceSync(
    name,
    size = DEFAULT_ICON_SIZE,
    color = DEFAULT_ICON_COLOR
  ) {
    ensureNativeModuleAvailable();

    const glyph = resolveGlyph(name);
    const processedColor = processColor(color);
    const cacheKey = `${glyph}:${size}:${processedColor}`;

    if (imageSourceCache.has(cacheKey)) {
      return imageSourceCache.get(cacheKey);
    }
    try {
      const imagePath = NativeIconAPI.getImageForFontSync(
        fontReference,
        glyph,
        size,
        processedColor
      );
      const value = { uri: imagePath, scale: PixelRatio.get() };
      imageSourceCache.setValue(cacheKey, value);
      return value;
    } catch (error) {
      imageSourceCache.setError(cacheKey, error);
      throw error;
    }
  }

  async function getImageSource(
    name,
    size = DEFAULT_ICON_SIZE,
    color = DEFAULT_ICON_COLOR
  ) {
    ensureNativeModuleAvailable();

    const glyph = resolveGlyph(name);
    const processedColor = processColor(color);
    const cacheKey = `${glyph}:${size}:${processedColor}`;

    if (imageSourceCache.has(cacheKey)) {
      return imageSourceCache.get(cacheKey);
    }
    try {
      const imagePath = await NativeIconAPI.getImageForFont(
        fontReference,
        glyph,
        size,
        processedColor
      );
      const value = { uri: imagePath, scale: PixelRatio.get() };
      imageSourceCache.setValue(cacheKey, value);
      return value;
    } catch (error) {
      imageSourceCache.setError(cacheKey, error);
      throw error;
    }
  }

  async function loadFont(file = fontFile) {
    if (Platform.OS === 'ios') {
      ensureNativeModuleAvailable();
      if (!file) {
        throw new Error('Unable to load font, because no file was specified. ');
      }
      await NativeIconAPI.loadFontWithFileName(...file.split('.'));
    }
  }

  function hasIcon(name) {
    return Object.prototype.hasOwnProperty.call(glyphMap, name);
  }

  function getRawGlyphMap() {
    return glyphMap;
  }

  function getFontFamily() {
    return fontReference;
  }

  Icon.Button = createIconButtonComponent(Icon);
  Icon.getImageSource = getImageSource;
  Icon.getImageSourceSync = getImageSourceSync;
  Icon.loadFont = loadFont;
  Icon.hasIcon = hasIcon;
  Icon.getRawGlyphMap = getRawGlyphMap;
  Icon.getFontFamily = getFontFamily;

  return Icon;
}
