# Setup guide for Expo Apps

> If you use React Native without Expo, please follow [this guide](./SETUP-REACT-NATIVE.md) instead. This guide applies to Expo apps only.

## Direct import (recommended for Expo Go)

```js
import MaterialIcons from "@react-native-vector-icons/material-icons";
```

Works out of the box with Expo. Fonts are loaded dynamically at runtime — no native configuration needed.

## Static import (recommended for Development Builds)

```js
import MaterialIcons from "@react-native-vector-icons/material-icons/static";
```

The `/static` import skips dynamic font loading. The font must be registered natively and each icon package ships an Expo config plugin that handles this automatically (it adds the correct entry to `UIAppFonts` key in `Info.plist`). Add the icon packages you use to the `plugins` array in your `app.json` or `app.config.js`:

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

> [!INFO]
> Static import doesn't work on Expo Go. A font that's only imported statically is built-into the native app bundle and cannot be updated by OTA.

> [!WARNING]
> Avoid manual font duplication: do not add fonts from `node_modules/@react-native-vector-icons/some-font` to `expo-font` config plugin configuration.
