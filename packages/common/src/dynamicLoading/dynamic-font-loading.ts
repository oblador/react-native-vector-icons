/*
 * The following imports are always present when react native is installed
 * in the future, more explicit apis will be exposed by the core, including typings
 * */
// @ts-expect-error missing types
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAssetByID } from '@react-native/assets-registry/registry';
import type { Image } from 'react-native';
// @ts-expect-error missing types
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import { getErrorCallback } from './dynamic-loading-setting';
import type { DynamicLoader, FontSource } from './types';

const loadPromises: { [fontSource: string]: Promise<void> } = {};

const loadFontAsync = async (fontFamily: string, fontSource: FontSource): Promise<void> => {
  const expoModules = globalThis?.expo?.modules;
  if (!expoModules) {
    throw new Error('Expo is not available. Dynamic font loading is not available.');
  }

  if (loadPromises[fontFamily]) {
    return loadPromises[fontFamily];
  }

  loadPromises[fontFamily] = (async function LoadFont() {
    try {
      const localUri = await (() => {
        if (typeof fontSource === 'string') {
          // a local filesystem uri
          return fontSource;
        }
        // a module id
        const { uri, type, hash } = getLocalFontUrl(fontSource, fontFamily);
        return expoModules.ExpoAsset.downloadAsync(uri, hash, type);
      })();

      await expoModules.ExpoFontLoader.loadAsync(fontFamily, localUri);
    } catch (error) {
      console.error(`Failed to load font ${fontFamily}`, error); // eslint-disable-line no-console

      getErrorCallback()?.({
        error: error as Error,
        fontFamily,
        fontSource,
      });
    } finally {
      delete loadPromises[fontFamily];
    }
  })();

  return loadPromises[fontFamily];
};

type AssetRegistryEntry = {
  name: string;
  httpServerLocation: string;
  hash: string;
  type: string; // file extension
};

const getLocalFontUrl = (fontModuleId: number, fontFamily: string) => {
  const assetMeta: AssetRegistryEntry = getAssetByID(fontModuleId);
  if (!assetMeta) {
    throw new Error(`no asset found for font family "${fontFamily}", moduleId: ${String(fontModuleId)}`);
  }

  const resolver: typeof Image.resolveAssetSource = resolveAssetSource;
  const assetSource = resolver(fontModuleId);

  return { ...assetMeta, ...assetSource };
};

const loadedFontsCache: { [name: string]: boolean } = {};

const isLoadedNative = (fontFamily: string) => {
  if (fontFamily in loadedFontsCache) {
    return true;
  }

  const { expo } = globalThis;
  if (!expo) {
    throw new Error('Expo is not available. Dynamic font loading is not available.');
  }

  const loadedNativeFonts = expo.modules.ExpoFontLoader.getLoadedFonts();
  loadedNativeFonts.forEach((font) => {
    loadedFontsCache[font] = true;
  });

  return fontFamily in loadedFontsCache;
};

export const dynamicLoader: DynamicLoader = {
  isLoaded: isLoadedNative,
  loadFontAsync,
};
