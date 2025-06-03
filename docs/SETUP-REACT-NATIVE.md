# Setup guide for React Native Apps

> If you use Expo, please follow [this guide](./SETUP-EXPO.md) instead. This guide applies to vanilla React Native apps only.


### Android

1. Rebuild your app. No extra steps needed for Android.

### iOS

> [!TIP]
> You will need to follow these instructions any time you add a new font

1. To use the icon packages you previously installed on iOS, run:

```sh
npx rnvi-update-plist package.json ios/AppName/Info.plist
```

2. Open `ios/Info.plist` and verify that the property called **Fonts provided by application** (or **UIAppFonts** if opening the file in a text editor) is present and contains the expected entries. For example:

<details>
<summary>List of all available fonts that could be present in Info.plist</summary>

```xml
    <key>UIAppFonts</key>
    <array>
      <string>FontAwesome6_Brands.ttf</string>
      <string>FontAwesome6_Regular.ttf</string>
      <string>FontAwesome6_Solid.ttf</string>
      <string>Octicons.ttf</string>
    </array>
```
</details>


2. Run `pod install` in the ios directory
```sh
cd ios && pod install
```

3. Rebuild your app

### macOS

This needs more work, see details in [#1624](https://github.com/oblador/react-native-vector-icons/issues/1624)

### Windows

1. Copy the needed fonts from `node_modules/react-native-vector-icons/Fonts/*` to `windows/<Project>/Assets/*`
2. Open your solution on Visual Studio, right click on Assets, add Add Assets, then select your fonts, save and quit Visual Studio.
3. Rebuild your project