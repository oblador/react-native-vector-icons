import { type ColorValue, Platform, processColor } from 'react-native';

import type { ImageResult, NativeImageOptions } from './NativeVectorIcons';

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
  color?: ColorValue;
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

function resolveArgs(
  firstArg: string,
  secondArg: string | ImageOptions,
  fontSize?: number,
  color?: number,
): { glyph: string; nativeOptions: NativeImageOptions } {
  if (typeof secondArg === 'object') {
    return {
      glyph: firstArg,
      nativeOptions: {
        fontFamily: secondArg.fontFamily,
        size: secondArg.size ?? 24,
        color: processColor(secondArg.color ?? 'black') as number,
        lineHeight: secondArg.lineHeight ?? -1, // ignored by native
      },
    };
  }
  return {
    glyph: secondArg,
    nativeOptions: {
      fontFamily: firstArg,
      size: fontSize ?? 24,
      color: color ?? 0,
      lineHeight: -1, // ignored by native
    },
  };
}

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
  color: number,
): Promise<ImageResult>;
export function getImageForFont(
  firstArg: string,
  secondArg: string | ImageOptions,
  fontSize?: number,
  color?: number,
): Promise<ImageResult> {
  const { glyph, nativeOptions } = resolveArgs(firstArg, secondArg, fontSize, color);
  return VectorIcons.getImageForFont(glyph, nativeOptions);
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
  const { glyph, nativeOptions } = resolveArgs(firstArg, secondArg, fontSize, color);
  return VectorIcons.getImageForFontSync(glyph, nativeOptions);
}
