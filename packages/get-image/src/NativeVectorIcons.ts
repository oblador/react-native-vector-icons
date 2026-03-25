import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export type ImageResult = {
  /**
   * The file URI to the rendered image.
   */
  uri: string;
  /**
   * Image width in dp.
   */
  width: number;
  /**
   * Image height in dp.
   */
  height: number;
  /**
   * Scale factor of the image. Multiply the dp dimensions by this value to get the dimensions in pixels.
   */
  scale: number;
};

// TODO use this signature when moving to new-arch only
// export type NativeImageOptions = {
//   fontFamily: string;
//   size: number;
//   color: number;
//   lineHeight?: number;
// };

/* eslint-disable @typescript-eslint/no-wrapper-object-types */
export interface Spec extends TurboModule {
  // biome-ignore lint/complexity/noBannedTypes: using Object to be compatible with old architecture
  getImageForFont(glyph: string, options: Object): Promise<ImageResult>;

  // biome-ignore lint/complexity/noBannedTypes: using Object to be compatible with old architecture
  getImageForFontSync(glyph: string, options: Object): ImageResult;
}
/* eslint-enable @typescript-eslint/no-wrapper-object-types */

export default TurboModuleRegistry.getEnforcing<Spec>('VectorIcons');
