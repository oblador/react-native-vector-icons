import { Platform } from 'react-native';

import type { ExpoAssetModule, ExpoFontLoaderModule, ExpoFontUtilsModule } from './expo-global';
import type { FontSource } from './types';

export type { LoadAsyncAsset } from './expo-global';

// requiring `expo-font` on web calls registerWebModule, thanks to which `getIsDynamicLoadingSupported` can return true on web
if (Platform.OS === 'web' && globalThis.expo) {
  try {
    require('expo-font');
  } catch (_err) {}
}

type ExpoGlobalType = {
  modules: {
    ExpoAsset: ExpoAssetModule;
    ExpoFontLoader: ExpoFontLoaderModule;
  };
};

// biome-ignore lint/suspicious/noExplicitAny: this is used internally with globalThis
function getIsDynamicLoadingSupported(globalObj: any): globalObj is {
  expo: ExpoGlobalType;
} {
  const expoModules = globalObj?.expo?.modules;
  return (
    !!expoModules &&
    (Platform.OS === 'web' || typeof expoModules.ExpoAsset?.downloadAsync === 'function') &&
    typeof expoModules.ExpoFontLoader?.getLoadedFonts === 'function' &&
    typeof expoModules.ExpoFontLoader?.loadAsync === 'function'
  );
}

// biome-ignore lint/suspicious/noExplicitAny: this is used internally with globalThis
export function getIsRenderToImageSupported(globalObj: any): globalObj is {
  expo: {
    modules: {
      ExpoFontUtils: ExpoFontUtilsModule;
    };
  };
} {
  return typeof globalObj?.expo?.modules?.ExpoFontUtils?.renderToImageAsync === 'function';
}

export function assertExpoModulesPresent(globalObj: unknown): asserts globalObj is { expo: ExpoGlobalType } {
  if (!getIsDynamicLoadingSupported(globalObj)) {
    throw new Error('Dynamic font loading not supported. Upgrade to latest expo and expo-font.');
  }
}

// Detection of Expo modules is deferred to first use so that import order
// doesn't matter. By the time a component renders, all imports (including Expo)
// have been evaluated and globalThis.expo is available.

let dynamicFontLoadingOverride: boolean | null = null;

export const isDynamicLoadingSupported = () => getIsDynamicLoadingSupported(globalThis);

/**
 * Set whether dynamic loading of fonts is enabled.
 * Currently, the presence of Expo Asset and Font Loader modules is a prerequisite for enabling.
 * In the future, React Native core apis will be used for dynamic font loading.
 *
 * @param value - whether dynamic loading of fonts is enabled
 * @returns `true` if dynamic loading of fonts was successfully set. `false` otherwise.
 * */
export const setDynamicLoadingEnabled = (value: boolean): boolean => {
  if (!getIsDynamicLoadingSupported(globalThis)) {
    if (process.env.NODE_ENV !== 'production' && !!value) {
      const expoModules = globalThis.expo?.modules;
      const hasNecessaryExpoModules =
        (Platform.OS === 'web' || !!expoModules?.ExpoAsset) && !!expoModules?.ExpoFontLoader;
      const message = hasNecessaryExpoModules
        ? 'Expo is installed, but does not support dynamic font loading. Make sure to use Expo SDK 54 or newer.'
        : 'Necessary Expo modules not found. Dynamic font loading is not available when necessary Expo modules are not present.';
      console.error(message);
    }
    return false;
  }

  dynamicFontLoadingOverride = !!value;

  return true;
};

/**
 * Whether dynamic loading of fonts is enabled.
 * */
export const isDynamicLoadingEnabled = (): boolean =>
  dynamicFontLoadingOverride ?? getIsDynamicLoadingSupported(globalThis);

type ErrorCallback = (args: { error: Error; fontFamily: string; fontSource: FontSource }) => void;

let dynamicLoadingErrorCallback: undefined | ErrorCallback;

/**
 * Set a callback to be called when an error occurs during dynamic font loading.
 * */
export const setDynamicLoadingErrorCallback = (callback: ErrorCallback) => {
  dynamicLoadingErrorCallback = callback;
};

export const getErrorCallback = () => dynamicLoadingErrorCallback;
