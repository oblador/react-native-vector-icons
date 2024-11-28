# Setup guide for Expo Apps

> If you use React Native without Expo, please follow [this guide](./SETUP-REACT-NATIVE.md) instead. This guide applies to Expo native apps only.

`react-native-vector-icons` supports Expo, and no further steps are required for native platforms, but you can optionally follow the steps below to set up the font config plugin. For web, see the [web setup guide](./SETUP-WEB.md).

## Set up font config plugin

This is optional but recommended because through the config plugin, the icon font will be available in the app since build time, rather than being loaded at runtime - [see more](https://docs.expo.dev/develop/user-interface/fonts/#with-expo-font-config-plugin).

You need to use [`prebuild`](https://docs.expo.dev/workflow/prebuild/), to be able to use config plugins.

1. In your app.config.json / js, add the following:

```js
module.exports = {
  "expo": {
    "plugins": [
      [
        "expo-font",
        {
          "fonts": [
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

2. Run `npx expo prebuild --clean`.
3. Rebuild the app: `npx expo run:ios` or `npx expo run:android`.
