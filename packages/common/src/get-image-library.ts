import { getIsRenderToImageSupported } from './dynamicLoading/dynamic-loading-setting';

// eslint-disable-next-line import/no-mutable-exports
let NativeIconAPI: typeof import('@react-native-vector-icons/get-image') | null = null;

try {
  // eslint-disable-next-line global-require,import/no-extraneous-dependencies,@typescript-eslint/no-require-imports
  NativeIconAPI = require('@react-native-vector-icons/get-image');
} catch {
  // if this fails, it's likely due to:
  // "Invariant Violation: TurboModuleRegistry.getEnforcing(...): 'VectorIcons' could not be found. ..."
  // No warning at this stage.
}

const globalRef = globalThis;
const hasExpoRenderToImage = getIsRenderToImageSupported(globalRef);

export const ensureGetImageAvailable = () => {
  if (NativeIconAPI) {
    NativeIconAPI.ensureNativeModuleAvailable();
    return NativeIconAPI;
  }
  if (hasExpoRenderToImage) {
    const { ExpoFontUtils } = globalRef.expo.modules;
    return {
      getImageForFont: async (fontReference: string, glyph: string, size: number, color: number) =>
        ExpoFontUtils.renderToImageAsync(glyph, {
          fontFamily: fontReference,
          size,
          color,
        }),
      getImageForFontSync: () => {
        throw new Error(
          'You attempted to call `getImageForFontSync`. Expo dev client with `@react-native-vector-icons/get-image` installed is required for this. Alternatively, call `getImageForFont` or generate the image yourself and bundle it with the app.',
        );
      },
    };
  }
  throw new Error(
    'Error in getImageSource / getImageSourceSync: You need to either (1) install `@react-native-vector-icons/get-image` or (2) use Expo SDK 53+ (Expo dev client or Expo Go). Check your setup and rebuild the app.',
  );
};
