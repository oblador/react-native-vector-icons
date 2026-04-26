---
title: Migration
description: Migration guide for React Native Vector Icons between major versions
---

## 1. Run the Codemod

The recommended approach is to use the codemod, which automates most of the migration from `react-native-vector-icons` to the package-per-icon-set approach.

> [!WARNING]
> Make sure your code is committed to git or backed up before running the codemod. Review all changes before committing.

```sh
npx @react-native-vector-icons/codemod
```

The codemod handles import rewrites, dependency updates, and FontAwesome prop changes. Review the manual steps below to verify everything was covered.

Some steps may not be fully handled by the codemod. Check the manual steps for your setup:

## 2. Verify Manual Steps

::: tabs
::: tab Expo

If you use `createIconSetFromIcoMoon` or `createIconSetFromFontello`, the codemod may not fully handle the API changes. Update manually:

```diff
- import createIconSetFromFontello from '@expo/vector-icons/createIconSetFromFontello';
+ import createIconSetFromFontello from '@react-native-vector-icons/fontello';

- createIconSetFromFontello(fontelloConfig, 'fontello', require('path/to/fontello.ttf'));
+ createIconSetFromFontello(fontelloConfig, {
+     fontSource: require('path/to/fontello.ttf')
+ });
```

No other manual steps are required for Expo projects — the codemod handles everything else.

:::

::: tab React Native CLI

The codemod handles most steps automatically. Verify each of the following has been completed.

### Remove @react-native-vector-icons/common

Unless you use `createIconSet` directly with your own font, the common package is no longer needed:

```sh
npm uninstall @react-native-vector-icons/common
```

### Move FontAwesome Pro, Icomoon and Fontello Fonts

These fonts should be in `rnvi-fonts` (or a folder you defined in `package.json`). They need to be moved to a subfolder named after the font package:

- `rnvi-fonts/fontawesome5-pro/`
- `rnvi-fonts/fontawesome6-pro/`
- `rnvi-fonts/fontello/`
- `rnvi-fonts/icomoon/`

> [!WARNING]
> Only FontAwesome Pro fonts are supported by the codemod. Fontello and Icomoon fonts must be moved manually.

### Update Dependencies

Replace the monolithic package with individual font packages:

```sh
npm uninstall react-native-vector-icons
npm install @react-native-vector-icons/fontisto
```

### Update Imports

```diff
// Old
- import Fontisto from "react-native-vector-icons";

// New
+ import { Fontisto } from "@react-native-vector-icons/fontisto";
```

### FontAwesome 5 & 6 Prop Changes

The `solid`/`regular`/`brand` boolean props are replaced by `iconType`:

```diff
// Old
- <FontAwesome5 name="house" solid />

// New
+ <FontAwesome5 name="house" iconType="solid" />
```

The codemod assumes the component is named `FontAwesome5` or `Icon`. If you use a different name, update manually.

:::
:::

## 3. iOS Cleanup

These steps apply to **all iOS projects** (Expo and React Native CLI) and are not handled by the codemod.

Update your `Info.plist` to include only the fonts you have installed. See the [Getting Started](./getting-started) guide for instructions on using the included plist update script.

Then remove any leftover artefacts from the old setup:

1. If you are not using any other custom fonts, remove the **Fonts** folder and any fonts you have added.
2. Select your project in the navigator, choose your app's target, go to the **Build Phases** tab, and under **Copy Bundle Resources**, remove any old icon fonts.
3. Remove any entries in `react-native.config.js`:

```js
// react-native.config.js
module.exports = {
  dependencies: {
    // Remove entries like this:
    "react-native-vector-icons": {
      platforms: {
        ios: null,
      },
    },
  },
};
```
