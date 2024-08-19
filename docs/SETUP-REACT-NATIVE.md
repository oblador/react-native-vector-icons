# Setup guide for React Native Apps

> If you use Expo, please follow [this guide](./SETUP-EXPO.md) instead. This guide applies to vanilla React Native apps only.

### Android

1. Rebuild your app. No extra steps needed for Android.

### iOS

1. To use the icon packages you previously installed on iOS, run:

```sh
npm run rnvi-update-plist packages.json ios/AppName/Info.plist
```

2. Open `ios/Info.plist` and verify that the property called **Fonts provided by application** (or **UIAppFonts** if opening the file in a text editor) is present and contains the expected entries. For example:

<details>
<summary>List of all available fonts that could be present in Info.plist</summary>

```xml
    <key>UIAppFonts</key>
    <array>
      <string>AntDesign.ttf</string>
      <string>Entypo.ttf</string>
      <string>EvilIcons.ttf</string>
      <string>Feather.ttf</string>
      <string>FontAwesome.ttf</string>
      <string>FontAwesome5_Brands.ttf</string>
      <string>FontAwesome5_Regular.ttf</string>
      <string>FontAwesome5_Solid.ttf</string>
      <string>FontAwesome6_Brands.ttf</string>
      <string>FontAwesome6_Regular.ttf</string>
      <string>FontAwesome6_Solid.ttf</string>
      <string>Fontisto.ttf</string>
      <string>Foundation.ttf</string>
      <string>Ionicons.ttf</string>
      <string>MaterialDesignIcons.ttf</string>
      <string>MaterialIcons.ttf</string>
      <string>Octicons.ttf</string>
      <string>SimpleLineIcons.ttf</string>
      <string>Zocial.ttf</string>
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

Windows support status is unknown. If you have information on this, please open a PR to update this document.
