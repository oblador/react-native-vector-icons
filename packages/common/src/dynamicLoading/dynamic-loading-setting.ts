import { Platform } from 'react-native';

import type { FontSource } from './types';

type ExpoAssetModule = {
  // definition from
  // https://github.com/expo/expo/blob/1f5a5991d14aad09282d1ce1612b44d30e7e7d3d/packages/expo-asset/ios/AssetModule.swift#L23
  downloadAsync: (uri: string, hash: string | undefined, type: string) => Promise<string>;
};

// this is a file:// uri on native, or an object with uri and display on web
export type LoadAsyncAsset = string | { uri: string; display: string };

type ExpoFontLoaderModule = {
  // definition from
  // https://github.com/expo/expo/blob/1f5a5991d14aad09282d1ce1612b44d30e7e7d3d/packages/expo-font/ios/FontLoaderModule.swift#L18
  getLoadedFonts: () => string[];
  loadAsync: (fontFamilyAlias: string, asset: LoadAsyncAsset) => Promise<void>;
};

type ExpoFontUtilsModule = {
  renderToImageAsync: (
    glyph: string,
    options: {
      fontFamily?: string;
      size?: number;
      color?: number;
    },
  ) => Promise<string>;
};

declare global {
  interface ExpoGlobal {
    modules: {
      ExpoAsset?: ExpoAssetModule;
      ExpoFontLoader?: ExpoFontLoaderModule;
      ExpoFontUtils?: ExpoFontUtilsModule;
    };
  }

  // eslint-disable-next-line vars-on-top
  var expo: ExpoGlobal | undefined;
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
  return (
    globalObj?.expo &&
    (Platform.OS === 'web' || typeof globalObj.expo.modules?.ExpoAsset?.downloadAsync === 'function') &&
    typeof globalObj.expo.modules?.ExpoFontLoader?.getLoadedFonts === 'function' &&
    typeof globalObj.expo.modules?.ExpoFontLoader?.loadAsync === 'function'
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
  return globalObj?.expo && typeof globalObj.expo.modules?.ExpoFontUtils?.renderToImageAsync === 'function';
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
      const hasNecessaryExpoModules =
        (Platform.OS === 'web' || !!globalThis.expo?.modules?.ExpoAsset) && !!globalThis.expo?.modules?.ExpoFontLoader;
      const message = hasNecessaryExpoModules
        ? 'Expo is installed, but does not support dynamic font loading. Make sure to use Expo SDK 54 or newer.'
        : 'Necessary Expo modules not found. Dynamic font loading is not available when necessary Expo modules are not present.';
      console.error(message); // eslint-disable-line no-console
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
