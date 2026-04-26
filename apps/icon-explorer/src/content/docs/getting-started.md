---
title: Getting Started
description: Installation and setup guide for React Native Vector Icons
---

Install and configure React Native Vector Icons for your platform.

## Installation

Install the packages for the icon sets you want to use. Each icon family is published as its own package under the `@react-native-vector-icons` scope.

```sh
npm install @react-native-vector-icons/lucide @react-native-vector-icons/ionicons
```

Then follow the setup instructions for your target platform below.

## Platform Setup

::: tabs
::: tab Expo

> [!NOTE]
> **TL;DR:** Font files are always shipped with the app — the difference is **where** they live and **how** they get registered with the OS. With the default (dynamic) import, Metro bundles the font as a JS asset and `expo-font` registers it at runtime. With the `/static` import, the font is embedded into the native binary and available immediately at launch.

### Dynamic Import (default, works with Expo Go)

```js
import { MaterialIcons } from "@react-native-vector-icons/material-icons";
```

Metro bundles the font alongside your JS code. When the icon first renders, `expo-font` registers the font with the native text system automatically. No native configuration or config plugins are needed. Works with Expo Go and OTA updates.

### Static Import (recommended for [Development Builds](https://docs.expo.dev/develop/development-builds/introduction/))

```js
import { MaterialIcons } from "@react-native-vector-icons/material-icons/static";
```

With the `/static` import, Metro does not bundle the font. Instead, the font is embedded into the native binary at build time, and each icon package ships an Expo config plugin that registers the font with iOS (it adds the font to `UIAppFonts` in `Info.plist`). Add the icon packages you use to the `plugins` array in your `app.json` or `app.config.js`:

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
> Static imports do not work with Expo Go because there is no native build step. A font embedded this way also cannot be updated via OTA — it is part of the native binary.

> [!WARNING]
> **Don't ship the font twice:** if you use a development build, the font is already embedded in the native binary. Using the dynamic import in this case means Metro **also** bundles the font as a JS asset, so it ships twice — once in the native binary and once in the JS bundle. To avoid this, either:
> - Switch to the `/static` import and keep the config plugin, or
> - Remove the config plugin and [exclude the package from autolinking](https://docs.expo.dev/modules/autolinking/#exclude) so only Metro bundles the font.

> [!WARNING]
> **Avoid manual font duplication:** do not add fonts from `node_modules/@react-native-vector-icons/some-font` to the `expo-font` plugin configuration unless you have a specific advanced use case.

Dynamic loading is supported on Expo SDK ≥ 52. See [Advanced › Dynamic Font Loading](./advanced#dynamic-font-loading) for the API to enable, disable, or handle errors at runtime.

:::

::: tab React Native

### Android

Rebuild your app. No extra steps are needed for Android.

### iOS

> [!TIP]
> You will need to follow these instructions any time you add a new font.

1. Run the plist update script to register your icon fonts:

```sh
npx rnvi-update-plist package.json ios/AppName/Info.plist
```

2. Open `ios/Info.plist` and verify that **UIAppFonts** contains the expected entries:

```xml
<key>UIAppFonts</key>
<array>
  <string>Lucide.ttf</string>
  <string>Octicons.ttf</string>
</array>
```

3. Install CocoaPods and rebuild:

```sh
cd ios && pod install
```

4. Rebuild your app.

### macOS

macOS support needs more work. See details in [issue #1624](https://github.com/oblador/react-native-vector-icons/issues/1624).

### Windows

1. Copy the needed fonts from `node_modules/@react-native-vector-icons/*/fonts/*.ttf` to `windows/<Project>/Assets/*`.
2. Open your solution in Visual Studio, right-click on Assets, select Add Assets, then select your fonts, save and quit Visual Studio.
3. Rebuild your project.

:::

::: tab Web

To use icons on the web with `react-native-web`, make the icon fonts available via `@font-face` declarations. Add the font families you use to your CSS:

```css
@font-face {
  src: url(path/to/fonts/Lucide.ttf);
  font-family: "Lucide";
}

@font-face {
  src: url(path/to/fonts/Ionicons.ttf);
  font-family: "Ionicons";
}
```

> [!TIP]
> You can debug missing font families by checking the developer console in your browser.

### Bundler Configuration

::: tabs
::: tab Vite

Vite handles font file imports automatically — no extra configuration needed. Import the TTF file and inject it as a `@font-face` declaration:

```js
import iconFont from '@react-native-vector-icons/lucide/fonts/Lucide.ttf';

const style = document.createElement('style');
style.textContent = `@font-face {
  src: url(${iconFont});
  font-family: Lucide;
}`;
document.head.appendChild(style);
```

:::

::: tab Webpack 5

Webpack 5 handles font files natively via asset modules. Add a rule to your webpack config:

```js
{
  test: /\.ttf$/,
  type: 'asset/resource',
}
```

Then import the font file and inject it as a stylesheet:

```js
import iconFont from '@react-native-vector-icons/lucide/fonts/Lucide.ttf';

const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: Lucide;
}`;

const style = document.createElement('style');
style.appendChild(document.createTextNode(iconFontStyles));
document.head.appendChild(style);
```

:::
:::

:::
:::

## Font Location Customisation

For fonts like FontAwesome Pro, Fontello, and Icomoon where you provide the fonts yourself, the default location for font files is `rnvi-fonts` in the same directory as your `package.json`. This can be customised by setting the `fontDir` property:

```json
{
  "reactNativeVectorIcons": {
    "fontDir": "src/rnvi-fonts"
  }
}
```
