# Setup guide for Expo Apps

> If you use React Native without Expo, please follow [this guide](./SETUP-REACT-NATIVE.md) instead. This guide applies to Expo native apps only.

`react-native-vector-icons` works out of the box with Expo native apps. No additional configuration is required.

For web, see the [web setup guide](./SETUP-WEB.md).

## ⚠️ Important: Avoid Manual Font Duplication

> **Note:** For recent versions of `react-native-vector-icons`, you usually do **not** need to add the icon fonts manually via the `expo-font` config plugin. The library automatically handles bundling its fonts for native platforms.

Manually adding icon fonts via the `expo-font` plugin may lead to **duplicate font copies** and iOS build errors such as:

```
error: Multiple commands produce ... .ttf
```

This issue has been discussed in [issue #1746](https://github.com/oblador/react-native-vector-icons/issues/1746).

✅ **Only add your own custom fonts** (e.g., brand fonts you provide) in the `expo-font` plugin configuration — not fonts from this library.

### ✅ Example: Correct Usage with Custom Fonts Only

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
Avoiding this helps prevent build conflicts and ensures smooth integration with Expo and native builds.
