// this is a file:// uri on native, or an object with uri and display on web
export type LoadAsyncAsset = string | { uri: string; display: string };

export type ExpoAssetModule = {
  // definition from
  // https://github.com/expo/expo/blob/1f5a5991d14aad09282d1ce1612b44d30e7e7d3d/packages/expo-asset/ios/AssetModule.swift#L23
  downloadAsync: (uri: string, hash: string | undefined, type: string) => Promise<string>;
};

export type ExpoFontLoaderModule = {
  // definition from
  // https://github.com/expo/expo/blob/1f5a5991d14aad09282d1ce1612b44d30e7e7d3d/packages/expo-font/ios/FontLoaderModule.swift#L18
  getLoadedFonts: () => string[];
  loadAsync: (fontFamilyAlias: string, asset: LoadAsyncAsset) => Promise<void>;
};

// RenderToImageResult needs to be usable as the `source` prop for image,
// so it must stay compatible with ImageURISource type
type RenderToImageResult = {
  /**
   * The file uri to the image.
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
   * */
  scale: number;
};

export type ExpoFontUtilsModule = {
  renderToImageAsync: (
    glyph: string,
    options: {
      fontFamily: string;
      size?: number;
      lineHeight?: number;
      color?: number;
    },
  ) => Promise<RenderToImageResult>;
};

declare global {
  interface ExpoGlobal {
    modules: {
      ExpoAsset?: ExpoAssetModule;
      ExpoFontLoader?: ExpoFontLoaderModule;
      ExpoFontUtils?: ExpoFontUtilsModule;
    };
  }

  var expo: ExpoGlobal | undefined;
}
