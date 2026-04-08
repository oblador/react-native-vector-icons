# Setup guide for Expo Apps

> If you use React Native without Expo, please follow [this guide](./SETUP-REACT-NATIVE.md) instead. This guide applies to Expo apps only.

> [!NOTE]
> TL;DR: Font files are always shipped with the app — the difference is **where** they live and **how** they get registered with the OS. With the default (dynamic) import, Metro bundles the font as a JS asset and `expo-font` registers it at runtime. With the `/static` import, the font is embedded into the native binary and available immediately at launch.

## Dynamic import (default, works with Expo Go)

```js
import { MaterialIcons } from "@react-native-vector-icons/material-icons";
```

Metro bundles the font alongside your JS code. When the icon first renders, `expo-font` registers the font with the native text system automatically. No native configuration or config plugins needed. Works with Expo Go and OTA updates.

## Static import (recommended for [Development Builds](https://docs.expo.dev/develop/development-builds/introduction/))

```js
import { MaterialIcons } from "@react-native-vector-icons/material-icons/static";
```

With the `/static` import, Metro does not bundle the font. Instead, we rely on it being embedded into the native binary at build time, and each icon package ships an Expo config plugin that handles registering the font with iOS (it adds the font to `UIAppFonts` in `Info.plist`). Add the icon packages you use to the `plugins` array in your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": [
      "@react-native-vector-icons/material-icons",
      "@react-native-vector-icons/ionicons"
    ]
  }
}
```

Then run `npx expo prebuild` to regenerate the native project.

> [!NOTE]
> Static import doesn't work with Expo Go because there is no native build step. A font embedded this way also cannot be updated by OTA — it is part of the native binary.

> [!WARNING]
> If you use a development build, the font is already embedded in the native binary. Using the dynamic import in this case means Metro **also** bundles the font as a JS asset, so it ships twice — once in the native binary and once in the JS bundle. To avoid this, either:
> - Switch to the [`/static` import](#static-import-recommended-for-development-builds) and keep config plugins, or
> - Remove the config plugins and [exclude the package from autolinking](https://docs.expo.dev/modules/autolinking/#exclude) so only Metro bundles the font.

> [!WARNING]
> Avoid manual font config duplication: do not add fonts from `node_modules/@react-native-vector-icons/some-font` to `expo-font` config plugin configuration.

## More info on dynamic loading

Dynamic loading is supported on Expo SDK >= 52.

Dynamic loading is currently limited to fonts shipped within the provided packages — it doesn't work out of the box with Pro fonts (such as FontAwesome Pro). To dynamically load custom fonts, use `createIconSet` with a `fontSource` as described in [Custom Fonts](../README.md#custom-fonts).

### Controlling dynamic loading

`@react-native-vector-icons/common` exports the following functions:

- `isDynamicLoadingEnabled`: Returns whether dynamic loading is enabled.
- `isDynamicLoadingSupported`: Returns whether dynamic loading is supported by your runtime (checks that necessary Expo features are present).
- `setDynamicLoadingEnabled`: Enables or disables dynamic loading.
- `setDynamicLoadingErrorCallback`: Sets a callback that is called when an error occurs during dynamic loading (e.g. a misconfigured OTA update missing a font file).
