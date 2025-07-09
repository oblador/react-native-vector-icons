# Major version migration instructions

We provide a `codemod` to help migrate your code and settings between major versions.

> [!IMPORTANT]
> Make sure your code is committed to git or backed up before executing the codemod and review all changes before committing them.

```sh
npx @react-native-vector-icons/codemod
```

This will attempt to execute many of the manual steps. Thoroughly check each section below for any steps that aren't automatically handled.

> [!NOTE]
> The codemod is a best effort, read through all the manual steps to ensure they have been completed.

## Migration from react-native-vector-icons to @react-native-vector-icons/\* v12.0+

The library has been simplified to require very little setup and does not require the explicit installation of `@react-native-vector-icons/common` package.

### package.json

Unless you are using `createIconSet` directly with your own font, remove `@react-native-vector-icons/common` from your `package.json`. If it's not there, go to the next step.

```sh
npm uninstall @react-native-vector-icons/common
```

### Move FontAwesome Pro, icomoon and fontello fonts

> [!WARNING]
> Only FontAwesome Pro fonts are supported by the codemod

These fonts should be in `rnvi-fonts` or a folder you defined in `package.json`

They need to be moved to a subfolder of `rnvi-fonts` with the name of the font package.

- fontawesome5-pro
- fontawesome6-pro
- fontello
- icomoon

### package.json

Remove `react-native-vector-icons` from your dependencies and replace with the fonts you intend to use, e.g. `@react-native-vector-icons/fontisto`.

### imports

Update your import statements to use the new library names

```js
// Old
import Fontisto from "react-native-vector-icons";

// New
import Fontisto from "@react-native-vector-icons/fontisto";
```

### Move to new props for Fontawesome 5 and 6

The FontAwesome 5 and 6 fonts now take an `iconType` prop instead of a style name prop

```jsx
// Old
<FontAwesome5 name="house" solid />

// New
<FontAwesome5 name="house" iconType="solid" />
```

Note: The codemod assumes you used the naming from the old README for your component e.g. `FontAwesome5` or `Icon`
If you have imported the component with another name you will need to modify the codemod or make the changes yourself.

### Remove unused fonts from Info.plist

You still need to add fonts in `Info.plist` - but only those which you have installed.

Check the [React Native Setup](./docs/SETUP-REACT-NATIVE.md) instructions for instructions on how to update it with our included script.

### iOS

> [!WARNING]
> This is not supported by the codemod

If you aren't using any other fonts, remove the `Fonts` folder and any fonts you have added.

Select your project in the navigator, choose your app's target, go to the Build Phases tab, and under Copy Bundle Resources, remove any fonts.

Remove any entries in `react-native.config.js`:

```js
// react-native.config.js;
module.exports = {
  dependencies: {
    // Remove any entries like this
    "react-native-vector-icons": {
      platforms: {
        ios: null,
      },
    },
  },
};
```
