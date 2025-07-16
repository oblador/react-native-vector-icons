/*
 * The following imports are always present when react native is installed
 * in the future, more explicit apis will be exposed by the core, including typings
 * */
import { Image, Platform } from 'react-native';

// @ts-expect-error missing types
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import { getAssetByID } from '@react-native/assets-registry/registry';

import { assertExpoModulesPresent, getErrorCallback, type LoadAsyncAsset } from './dynamic-loading-setting';
import type { DynamicLoader, FontSource } from './types';

const loadPromises: { [fontSource: string]: Promise<void> } = {};

const loadFontAsync = async (fontFamily: string, fontSource: FontSource): Promise<void> => {
  const globalRef = globalThis;
  assertExpoModulesPresent(globalRef);

  const expoModules = globalRef.expo.modules;

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

      const asset = Platform.select<LoadAsyncAsset>({
        web: { uri: localUri, display: 'auto' },
        default: localUri,
      });
      await expoModules.ExpoFontLoader.loadAsync(fontFamily, asset);
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

  const assetSource = Image.resolveAssetSource(fontModuleId);

  return { ...assetMeta, ...assetSource };
};

const loadedFontsCache: { [name: string]: boolean } = {};

const isLoadedNative = (fontFamily: string) => {
  if (fontFamily in loadedFontsCache) {
    return true;
  }
  const globalRef = globalThis;
  assertExpoModulesPresent(globalRef);

  const loadedNativeFonts = globalRef.expo.modules.ExpoFontLoader.getLoadedFonts();
  loadedNativeFonts.forEach((font) => {
    loadedFontsCache[font] = true;
  });

  return fontFamily in loadedFontsCache;
};

export const dynamicLoader: DynamicLoader = {
  isLoaded: isLoadedNative,
  loadFontAsync,
};
