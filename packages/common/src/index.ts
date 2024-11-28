import { NativeModules, Platform } from 'react-native';

export { createIconSet, DEFAULT_ICON_SIZE, DEFAULT_ICON_COLOR } from './create-icon-set';
export type { IconProps, CreateIconSetOptions } from './create-icon-set';
export {
  setDynamicLoadingEnabled,
  isDynamicLoadingEnabled,
  isDynamicLoadingSupported,
  setDynamicLoadingErrorCallback,
} from './dynamicLoading/dynamic-loading-setting';

const LINKING_ERROR = `
  The package '@react-native-vector-icons/common' doesn't seem to be linked. Make sure:
    ${Platform.select({ ios: "- You have run 'pod install'\n", default: '' })}
    - You rebuilt the app after installing the package\n'
    - You are not using Expo Go
  `;

// @ts-expect-error : NativeModules type is incomplete
const isTurboModuleEnabled = global.__turboModuleProxy != null; // eslint-disable-line no-underscore-dangle

const VectorIconsModule = isTurboModuleEnabled
  ? require('./NativeVectorIcons').default // eslint-disable-line @typescript-eslint/no-require-imports
  : NativeModules.VectorIcons;

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

// TODO: Do we want to expose this as a public API?
export function getImageForFont(
  fontFamilyName: string,
  glyph: string,
  fontSize: number,
  color: number,
): Promise<string> {
  return VectorIcons.getImageForFont(fontFamilyName, glyph, fontSize, color);
}

export function getImageForFontSync(fontFamilyName: string, glyph: string, fontSize: number, color: number): string {
  return VectorIcons.getImageForFontSync(fontFamilyName, glyph, fontSize, color);
}
