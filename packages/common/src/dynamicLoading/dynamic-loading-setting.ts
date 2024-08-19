import type { FontSource } from './types';

declare global {
  interface ExpoGlobal {
    modules: {
      ExpoAsset: {
        downloadAsync: (uri: string, path: string, type: string) => Promise<string>;
      };
      ExpoFontLoader: {
        loadAsync: (fontFamilyAlias: string, fileUri: string) => Promise<void>;
        getLoadedFonts: () => string[];
      };
    };
  }

  // eslint-disable-next-line vars-on-top
  var expo: ExpoGlobal | undefined;
}

const hasNecessaryExpoModules = !!globalThis.expo?.modules?.ExpoAsset && !!globalThis.expo?.modules?.ExpoFontLoader;

const hasNecessaryExpoFeatures =
  hasNecessaryExpoModules && typeof globalThis.expo?.modules.ExpoFontLoader.getLoadedFonts === 'function';

let dynamicFontLoadingEnabled = hasNecessaryExpoFeatures;

export const isDynamicLoadingSupported = () => hasNecessaryExpoFeatures;

/**
 * Set whether dynamic loading of fonts is enabled.
 * Currently, the presence of Expo Asset and Font Loader modules is a prerequisite for enabling.
 * In the future, React Native core apis will be used for dynamic font loading.
 *
 * @param value - whether dynamic loading of fonts is enabled
 * @returns `true` if dynamic loading of fonts was successfully set. `false` otherwise.
 * */
export const setDynamicLoadingEnabled = (value: boolean): boolean => {
  dynamicFontLoadingEnabled = !!value;
  if (!hasNecessaryExpoFeatures) {
    // if expo features are not present, dynamic loading cannot work
    dynamicFontLoadingEnabled = false;

    if (process.env.NODE_ENV !== 'production' && !!value) {
      const message = hasNecessaryExpoModules
        ? 'Expo is installed, but does not support dynamic font loading. Make sure to use the latest version of Expo SDK.'
        : 'Necessary Expo modules not found. Dynamic font loading is not available on Web or when necessary Expo modules are not present.';
      console.error(message);
    }
  }
  return dynamicFontLoadingEnabled === value;
};

/**
 * Whether dynamic loading of fonts is enabled.
 * */
export const isDynamicLoadingEnabled = () => dynamicFontLoadingEnabled;

type ErrorCallback = (args: {
  error: Error;
  fontFamily: string;
  fontSource: FontSource;
}) => void;

let dynamicLoadingErrorCallback: undefined | ErrorCallback;

/**
 * Set a callback to be called when an error occurs during dynamic font loading.
 * */
export const setDynamicLoadingErrorCallback = (callback: ErrorCallback) => {
  dynamicLoadingErrorCallback = callback;
};

export const getErrorCallback = () => dynamicLoadingErrorCallback;
