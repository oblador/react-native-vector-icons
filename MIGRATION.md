# Major version migration instructions

We provide a `codemod` to help migrate your code and settings between major versions.

> [!IMPORTANT]
> Make sure your code is committed to git or backed up before executing the codemod and review all changes before committing them.

```sh
npx @react-native-vector-icons/codemod
```

This will attempt to execute many of the manual steps. Thourogly check each upload section for any steps that aren't automatively handled.

> !NOTE
> The codemod is a best effort, read through all the manual steps to ensure they have been completed.

## 12.0

The library has been simplified even further and no longer requires the installation of the common package.

### package.json

Remove `@react-native-vector-icons/common` from your dependencies.

```sh
npm uninstall @react-native-vector-icons/common
```

NOTE: Unless you are using `createIconSet` directly with your own fonts.

### Move FontAwesome Pro, icomoon and fontello fonts

> !NWARNING
> Only FontAwesome Pro fonts are supported by the codemod

These fonts should be in `rnvi-fonts` or a folder you defined in `package.json`

They need to be moved to a subfolder of `rnvi-fonts` with the name of the font package.

* fontawesome5-pro
* fontawesome6-pro
* fontello
* icomoon

## 11.0 Migration from react-native-vector-icons to @react-native-vector-icons/*

@react-native-vector-icons requires close to no setup, so you will need to undo a couple of things when you migrate.

## Migration steps

### package.json

Remove `react-native-vector-icons` from your dependencies and replace with the fonts you intend to use, e.g. `@react-native-vector-icons/fontisto`.

### imports

Update your import statements to use the new library names

```js

// Old
import Fontisto from 'react-native-vector-icons';

// New
import Fontisto from '@react-native-vector-icons/fontisto';
```

### Move to new props for Fontawesome 5 and 6

The FontAwesome 5 and 6 fonts now take an `iconStlye` prop instead of a style name prop

```jsx
// Old
<FontAwesome5 name="house" solid />

// New
<FontAwesome5 name="house" iconType="solid" />
```

Note: The codemod assumes you used the naming from the old README for your component e.g. FontAwesome5 etc or Icon
If you have imported the component with another name you will need to modify the codemod or make the changes yourself.

### Remove unused fonts from Info.plist

You still need to add fonts here but should limit it to the fonts you have installed.

Check the [React Native Setup](./docs/SETUP-REACT-NATIVE.md) instructions for instructions on how update it with our included script.

### iOS

> !WARNING
> This is not supported by the codemod

If you aren't using any other fonts, remove the Fonts folder and any fonts you have added.

Select your project in the navigator, choose your app's target, go to the Build Phases tab, and under Copy Bundle Resources, remove any fonts.

Remove any entries in `react-native.config.js`

```js
react-native.config.js
module.exports = {
    dependencies: {
    // Remove any entries like this
      'react-native-vector-icons': {
        platforms: {
          ios: null,
        },
      },
    },
  };
```

### Android

> !WARNING
> This is not supported by the codemod

Remove the `fonts.gradle` import and any custmoisations from `android/app/build.gradle`

```gradle
// Delete this section if it exists
project.ext.vectoricons = [
    iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ] // Specify font files
]

// Delete this line
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

If you are using `getImageSource` or `getImageSourceSync` remove the lines in `android/settings.gradle`

```gradle
// Delete these
include ':react-native-vector-icons'
project(':react-native-vector-icons').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-vector-icons/android')
```

Do the same in `android/app/build.gradle`

```gradle
// Delete this line
implementation project(':react-native-vector-icons')
```

Remove the code from `MainApplication.java`

```java
// Delete this
import com.oblador.vectoricons.VectorIconsPackage;

// and this
, new VectorIconsPackage()
```
