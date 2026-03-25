import { Platform, processColor } from 'react-native';

import type { ImageResult } from './NativeVectorIcons';

/**
 * Options for rendering a glyph to an image.
 * Matches the expo-font `renderToImageAsync` pattern.
 */
export type ImageOptions = {
  /** The font family name to use for rendering. */
  fontFamily: string;
  /** Font size in dp. Defaults to 24. */
  size?: number;
  /** CSS color string. Defaults to 'black'. */
  color?: string;
  /** Line height in dp. When set, the image height will be at least this value and the glyph will be vertically centered. */
  lineHeight?: number;
};

export { ensureNativeModuleAvailable } from './ensure-native-module-available';

const LINKING_ERROR = `
  The package '@react-native-vector-icons/get-image' doesn't seem to be linked. Make sure:
    ${Platform.select({ ios: "- You have run 'pod install'\n", default: '' })}
    - You rebuilt the app after installing the package\n'
    - You are not using Expo Go
  `;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const VectorIconsModule = require('./NativeVectorIcons').default;

const VectorIcons = VectorIconsModule
  ? VectorIconsModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      },
    );

/**
 * Render a font glyph to an image file asynchronously.
 *
 * @param glyph - The glyph character to render.
 * @param options - Rendering options including fontFamily, size, color, and lineHeight.
 */
export function getImageForFont(glyph: string, options: ImageOptions): Promise<ImageResult>;
/**
 * Render a font glyph to an image file asynchronously.
 *
 * @deprecated Use the options-object overload instead.
 */
export function getImageForFont(
  fontFamilyName: string,
  glyph: string,
  fontSize: number,
  color: string,
): Promise<ImageResult>;
export function getImageForFont(
  firstArg: string,
  secondArg: string | ImageOptions,
  fontSize?: number,
  color?: string,
): Promise<ImageResult> {
  if (typeof secondArg === 'object') {
    const opts = secondArg;
    const resolvedColor = processColor(opts.color ?? 'black') as number;
    return VectorIcons.getImageForFont(firstArg, {
      fontFamily: opts.fontFamily,
      size: opts.size ?? 24,
      color: resolvedColor,
      lineHeight: opts.lineHeight,
    });
  }
  const resolvedColor = processColor(color ?? 'black') as number;
  return VectorIcons.getImageForFont(secondArg, {
    fontFamily: firstArg,
    size: fontSize ?? 24,
    color: resolvedColor,
  });
}

/**
 * Render a font glyph to an image file synchronously.
 *
 * @param glyph - The glyph character to render.
 * @param options - Rendering options including fontFamily, size, color, and lineHeight.
 */
export function getImageForFontSync(glyph: string, options: ImageOptions): ImageResult;
/**
 * Render a font glyph to an image file synchronously.
 *
 * @deprecated Use the options-object overload instead.
 */
export function getImageForFontSync(
  fontFamilyName: string,
  glyph: string,
  fontSize: number,
  color: number,
): ImageResult;
export function getImageForFontSync(
  firstArg: string,
  secondArg: string | ImageOptions,
  fontSize?: number,
  color?: number,
): ImageResult {
  if (typeof secondArg === 'object') {
    const opts = secondArg;
    const resolvedColor = processColor(opts.color ?? 'black') as number;
    return VectorIcons.getImageForFontSync(firstArg, {
      fontFamily: opts.fontFamily,
      size: opts.size ?? 24,
      color: resolvedColor,
      lineHeight: opts.lineHeight,
    });
  }
  return VectorIcons.getImageForFontSync(secondArg, {
    fontFamily: firstArg,
    size: fontSize ?? 24,
    color: color ?? 0,
  });
}
