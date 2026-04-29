# Setup guide for Expo Apps

> If you use React Native without Expo, please follow [this guide](./SETUP-REACT-NATIVE.md) instead. This guide applies to Expo apps only.

> [!NOTE]
> TL;DR: The default import bundles the `.ttf` into your JS bundle and registers it at runtime — works everywhere, including Expo Go. In a development build, the same `.ttf` is also copied into the native binary by autolinking, so it ends up shipping twice. The `/static` import is an optimization that skips the JS-bundle copy.

## Dynamic import (default)

```js
import { MaterialIcons } from "@react-native-vector-icons/material-icons";
```

The default entry imports the `.ttf`, so Metro bundles it as a JS asset. When the icon first renders, `expo-font` registers it with the native text system at runtime. No native configuration or config plugin needed — this is the only option that works with Expo Go, and it lets the font be updated via OTA.

## Static import (optimization for [Development Builds](https://docs.expo.dev/develop/development-builds/introduction/))

```js
import { MaterialIcons } from "@react-native-vector-icons/material-icons/static";
```

In a development build, autolinking picks up each package's `build.gradle` / `.podspec` and copies the `.ttf` into the native binary at build time. Using the dynamic import on top of that means the same font also ships as a JS asset — so it's bundled twice.

The `/static` entry skips the `.ttf` import on the JS side, so Metro doesn't bundle it. The font reaches the device through the native build only, and the package's Expo config plugin registers it with iOS by adding it to `UIAppFonts` in `Info.plist`. To do that, add the icon packages you use to the `plugins` array in your `app.json` or `app.config.js`. For example:

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

Then run `npx expo prebuild` to regenerate the native project. Because this approach relies on the native build, it does not work with Expo Go, and the embedded font cannot be swapped via OTA updates.

> [!TIP]
> If you want to keep the dynamic import in a development build but avoid the `.ttf` duplication, you can [exclude the package from autolinking](https://docs.expo.dev/modules/autolinking/#exclude) instead. That skips the `build.gradle` / `.podspec` so only the JS-bundled copy ships.

> [!WARNING]
> Avoid manual font config duplication: do not add fonts from `node_modules/@react-native-vector-icons/some-font` to `expo-font` config plugin configuration.

## About dynamic loading

Dynamic loading is the runtime mechanism behind the default (dynamic) import — `expo-font` registers the JS-bundled `.ttf` with the native text system the first time an icon renders, so no native build step or config plugin is needed.

Dynamic loading is supported on Expo SDK >= 52.

Dynamic loading is currently limited to fonts shipped within the provided packages — it doesn't work out of the box with Pro fonts (such as FontAwesome Pro). To dynamically load custom fonts, use `createIconSet` with a `fontSource` as described in [Custom Fonts](../README.md#custom-fonts).

### Controlling dynamic loading

`@react-native-vector-icons/common` exports the following functions:

- `isDynamicLoadingEnabled`: Returns whether dynamic loading is enabled.
- `isDynamicLoadingSupported`: Returns whether dynamic loading is supported by your runtime (checks that necessary Expo features are present).
- `setDynamicLoadingEnabled`: Enables or disables dynamic loading.
- `setDynamicLoadingErrorCallback`: Sets a callback that is called when an error occurs during dynamic loading (e.g. a misconfigured OTA update missing a font file).
