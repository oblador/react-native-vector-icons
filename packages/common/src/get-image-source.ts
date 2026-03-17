import type { TextStyle } from 'react-native';
import { PixelRatio, processColor } from 'react-native';

import type { createIconSourceCache } from './create-icon-source-cache';
import { DEFAULT_ICON_COLOR, DEFAULT_ICON_SIZE } from './defaults';
import { ensureGetImageAvailable } from './get-image-library';

export const getImageSourceSync = (
  imageSourceCache: ReturnType<typeof createIconSourceCache>,
  fontReference: string,
  glyph: string,
  size = DEFAULT_ICON_SIZE,
  color: TextStyle['color'] = DEFAULT_ICON_COLOR,
) => {
  const NativeIconAPI = ensureGetImageAvailable();

  const processedColor = processColor(color);
  const cacheKey = `${glyph}:${size}:${String(processedColor)}`;

  const maybeCachedValue = imageSourceCache.get(cacheKey);
  if (maybeCachedValue !== undefined) {
    return maybeCachedValue;
  }

  const imagePath = NativeIconAPI.getImageForFontSync(
    fontReference,
    glyph,
    size,
    processedColor as number, // FIXME what if a non existent colour was passed in?,
  );
  const value = { uri: imagePath, scale: PixelRatio.get() };
  imageSourceCache.setValue(cacheKey, value);
  return value;
};

export const getImageSource = async (
  imageSourceCache: ReturnType<typeof createIconSourceCache>,
  fontReference: string,
  glyph: string,
  size = DEFAULT_ICON_SIZE,
  color: TextStyle['color'] = DEFAULT_ICON_COLOR,
) => {
  const NativeIconAPI = ensureGetImageAvailable();

  const processedColor = processColor(color);
  const cacheKey = `${glyph}:${size}:${String(processedColor)}`;

  const maybeCachedValue = imageSourceCache.get(cacheKey);
  if (maybeCachedValue !== undefined) {
    return maybeCachedValue;
  }

  const imagePath = await NativeIconAPI.getImageForFont(fontReference, glyph, size, processedColor as number);
  const value = { uri: imagePath, scale: PixelRatio.get() };
  imageSourceCache.setValue(cacheKey, value);
  return value;
};
