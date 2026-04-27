# Migration guide

We provide a codemod to migrate from `@expo/vector-icons` or the legacy `react-native-vector-icons` single-package setup to the new scoped `@react-native-vector-icons/*` packages. It updates imports, adjusts `package.json`, and depending on the migration path, fixes changed props and cleans up font files — but it does **not** change icon names (see [What the codemod does not do](#what-the-codemod-does-not-do)).

> [!IMPORTANT]
> Make sure your code is committed to git before running the codemod. Review all codemod changes before committing them.

```sh
npx @react-native-vector-icons/codemod .
```

The codemod auto-detects which migration to run based on the dependencies in your `package.json`.

## What the codemod does not do

The codemod does **not** rename or validate icon names. When you upgrade the underlying icon library (e.g. to a newer version of FontAwesome or MaterialCommunityIcons), some icons may have been renamed or removed upstream.

For example, an icon called `"arrow-right"` in one version may become `"arrow-forward"` or be dropped entirely. The codemod will not catch this — but **TypeScript will**. After running the codemod, check for type errors in your project to find any icon names that are no longer valid.

---

## Migrating from `@expo/vector-icons` (Expo projects)

The codemod rewrites all `@expo/vector-icons` imports to their `@react-native-vector-icons/*` equivalents and updates `package.json`.

It auto-detects whether you're using a development build (has `expo-dev-client`, or `android`/`ios` directories) and chooses the appropriate import style:

- **Development builds**: uses `/static` imports (fonts bundled at build time)
- **Expo Go**: uses default imports (fonts loaded at runtime)

### Import transforms

**Named (barrel) imports** are split into separate default imports:

```diff
-import { Ionicons, MaterialIcons } from '@expo/vector-icons';
+import Ionicons from "@react-native-vector-icons/ionicons";
+import MaterialIcons from "@react-native-vector-icons/material-icons";
```

**Default imports** from a specific family are rewritten:

```diff
-import Ionicons from '@expo/vector-icons/Ionicons';
+import Ionicons from "@react-native-vector-icons/ionicons";
```

**Legacy `/build/` imports** are handled too:

```diff
-import Ionicons from '@expo/vector-icons/build/Ionicons';
+import Ionicons from "@react-native-vector-icons/ionicons";
```

**`createIconSetFromIcoMoon` and `createIconSetFromFontello`** — both imports and call signatures are rewritten:

```diff
-import createIconSetFromFontello from '@expo/vector-icons/createIconSetFromFontello';
+import createIconSetFromFontello from '@react-native-vector-icons/fontello';

-createIconSetFromFontello(fontelloConfig, 'fontello', require('./fontello.ttf'));
+createIconSetFromFontello(fontelloConfig, {
+  fontSource: require('./fontello.ttf')
+});
```

### `package.json` updates

- Removes `@expo/vector-icons`
- Adds individual `@react-native-vector-icons/*` packages (only those your code actually imports)

If you're using a development build, the codemod will print instructions for adding Expo config plugins to your app config.

### Local import names are preserved

If you imported a component under a custom name, it stays:

```diff
-import MyIcons from '@expo/vector-icons/Entypo';
+import MyIcons from "@react-native-vector-icons/entypo";

-import { Entypo as MyIcons } from '@expo/vector-icons';
+import MyIcons from "@react-native-vector-icons/entypo";
```

---

## React Native CLI projects

## Migrating from `react-native-vector-icons` (v10 and earlier → v11+)

### Import transforms

Rewrites the old single-library-style imports to scoped package imports with `/static`:

```diff
-import Ionicons from 'react-native-vector-icons/Ionicons';
+import Ionicons from "@react-native-vector-icons/ionicons/static";

-import FontAwesome from 'react-native-vector-icons/FontAwesome';
+import FontAwesome from "@react-native-vector-icons/fontawesome/static";

-import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
+import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons/static";
```

### FontAwesome style prop transforms

Boolean style props on FontAwesome 5/6 components are converted to the `iconStyle` prop:

```diff
-<FontAwesome5 name="heart" solid />
+<FontAwesome5 name="heart" iconStyle="solid" />

-<FontAwesome6 name="github" brand />
+<FontAwesome6 name="github" iconStyle="brand" />

-<FontAwesome6Pro name="star" light />
+<FontAwesome6Pro name="star" iconStyle="light" />
```

All FontAwesome styles are handled: `solid`, `brand`, `light`, `thin`, `duotone`, `sharp`, `sharpSolid`, `sharpLight`.

> [!NOTE]
> The codemod matches components named `FontAwesome5`, `FontAwesome6`, `FontAwesome5Pro`, `FontAwesome6Pro`, or `Icon`. If you imported the component under a different name, you'll need to update the style props manually.

### `package.json` updates

- Removes `react-native-vector-icons`
- Adds `@react-native-vector-icons/common` and individual font packages that your code imports

### Manual steps (not covered by the codemod)

- **iOS Xcode project**: Remove the `Fonts` folder and any vector icon fonts from your target's Copy Bundle Resources build phase
- **`react-native.config.js`**: Remove any `react-native-vector-icons` entries:
  ```js
  // Remove entries like this:
  module.exports = {
    dependencies: {
      "react-native-vector-icons": {
        platforms: { ios: null },
      },
    },
  };
  ```

---

## Migrating from v11 → v12+

v12 simplifies setup — `@react-native-vector-icons/common` is no longer required as a direct dependency.

### What the codemod does

- Removes `@react-native-vector-icons/common` from `package.json`
- Moves FontAwesome Pro fonts from `rnvi-fonts/` into package-specific subfolders (e.g. `rnvi-fonts/fontawesome6-pro/`)

### Manual steps

**icomoon and fontello fonts** need to be moved manually into their subfolders:

- `rnvi-fonts/fontello/`
- `rnvi-fonts/icomoon/`
