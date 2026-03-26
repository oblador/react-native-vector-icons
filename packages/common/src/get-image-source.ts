import type { TextStyle } from 'react-native';

import type { createIconSourceCache } from './create-icon-source-cache';
import { DEFAULT_ICON_COLOR, DEFAULT_ICON_SIZE } from './defaults';
import { ensureGetImageAvailable } from './get-image-library';

export type GetImageSourceOptions = {
  size?: number;
  color?: TextStyle['color'];
  lineHeight?: number;
};

const resolveOptions = (
  imageSourceCache: ReturnType<typeof createIconSourceCache>,
  fontReference: string,
  glyph: string,
  { size = DEFAULT_ICON_SIZE, color = DEFAULT_ICON_COLOR, lineHeight }: GetImageSourceOptions = {},
) => {
  const cacheKey = `${glyph}:${size}:${String(color)}:${lineHeight ?? ''}`;
  const cached = imageSourceCache.get(cacheKey);
  const nativeOptions = {
    fontFamily: fontReference,
    size,
    color: color as string,
    lineHeight,
  };
  return { cacheKey, cached, nativeOptions };
};

export const getImageSourceSync = (
  imageSourceCache: ReturnType<typeof createIconSourceCache>,
  fontReference: string,
  glyph: string,
  options?: GetImageSourceOptions,
) => {
  const { cacheKey, cached, nativeOptions } = resolveOptions(imageSourceCache, fontReference, glyph, options);
  if (cached !== undefined) return cached;

  const value = ensureGetImageAvailable().getImageForFontSync(glyph, nativeOptions);
  imageSourceCache.setValue(cacheKey, value);
  return value;
};

export const getImageSource = async (
  imageSourceCache: ReturnType<typeof createIconSourceCache>,
  fontReference: string,
  glyph: string,
  options?: GetImageSourceOptions,
) => {
  const { cacheKey, cached, nativeOptions } = resolveOptions(imageSourceCache, fontReference, glyph, options);
  if (cached !== undefined) return cached;

  const value = await ensureGetImageAvailable().getImageForFont(glyph, nativeOptions);
  imageSourceCache.setValue(cacheKey, value);
  return value;
};
