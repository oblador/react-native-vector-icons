# Setup guide for Expo Apps

> If you use React Native without Expo, please follow [this guide](./SETUP-REACT-NATIVE.md) instead. This guide applies to Expo native apps only.

`react-native-vector-icons` supports Expo, and no further steps are required for native platforms, but you can optionally follow the steps below to set up the font config plugin. For web, see the [web setup guide](./SETUP-WEB.md).

## Set up font config plugin (Optional)

This is optional but recommended because through the config plugin, the icon font will be available in the app since build time, rather than being loaded at runtime – [see more](https://docs.expo.dev/develop/user-interface/fonts/#with-expo-font-config-plugin).

You need to use [`prebuild`](https://docs.expo.dev/workflow/prebuild/) to be able to use config plugins.

```js
module.exports = {
  expo: {
    plugins: [
      [
        "expo-font",
        {
          fonts: [
            "./node_modules/@react-native-vector-icons/<font-package>/fonts/<font-file>.ttf",
            // example:
            "./node_modules/@react-native-vector-icons/simple-line-icons/fonts/SimpleLineIcons.ttf"
          ]
        }
      ]
    ]
  }
}
```

1. Add the above to your `app.config.js` or `app.config.json`
2. Run `npx expo prebuild --clean`
3. Rebuild your app: `npx expo run:ios` or `npx expo run:android`

## ⚠️ Important: Avoid Manual Font Duplication

> **Note:** For recent versions of `react-native-vector-icons`, you usually do **not** need to add the icon fonts manually via the `expo-font` config plugin. The library automatically handles bundling its fonts for native platforms.

Manually adding vector icon fonts in the `expo-font` plugin section may lead to **duplicate font copies** and iOS build errors such as:

```
error: Multiple commands produce ... .ttf
```

This issue is commonly reported by [@4yki](https://github.com/4yki)—see [issue #1746](https://github.com/oblador/react-native-vector-icons/issues/1746) for details.

✅ **Only add your own fonts** (e.g., your custom or brand fonts) in the `expo-font` plugin configuration.

### ✅ Example: Only add your own fonts

```js
module.exports = {
  expo: {
    plugins: [
      [
        "expo-font",
        {
          fonts: [
            "./src/assets/fonts/YourCustomFont.ttf"
          ]
        }
      ]
    ]
  }
}
```

🚫 **Do not add fonts from `node_modules/@react-native-vector-icons/Fonts` unless you have a specific advanced use case.**
This helps avoid build conflicts and ensures smooth integration with Expo and native builds.
