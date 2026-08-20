type PackagerAsset = {
  name: string;
  httpServerLocation: string;
  hash: string;
  type: string; // file extension
};

type GetAssetByID = (assetId: number) => PackagerAsset | undefined;

/*
 * React Native 0.87 moved the asset registry into core and stopped depending on
 * `@react-native/assets-registry`, so that package is no longer installed by default.
 * React Native 0.86 and older do not expose `AssetRegistry`, so the standalone package
 * stays as a fallback. Both lookups sit in a `try` block, which makes Metro treat them
 * as optional dependencies instead of failing the build when one is absent.
 * */
const resolveGetAssetByID = (): GetAssetByID | undefined => {
  try {
    // react-native >= 0.87. `AssetRegistry` is absent from the default typings.
    const { AssetRegistry } = require('react-native') as {
      AssetRegistry?: { getAssetByID: GetAssetByID };
    };
    if (AssetRegistry) {
      return AssetRegistry.getAssetByID;
    }
  } catch {}

  try {
    return require('@react-native/assets-registry/registry').getAssetByID;
  } catch {}

  return undefined;
};

const getAssetByIDImpl = resolveGetAssetByID();

export const getAssetByID: GetAssetByID = (assetId) => {
  if (!getAssetByIDImpl) {
    throw new Error(
      'No asset registry found. Upgrade to react-native 0.87 or newer, or install `@react-native/assets-registry`.',
    );
  }
  return getAssetByIDImpl(assetId);
};
