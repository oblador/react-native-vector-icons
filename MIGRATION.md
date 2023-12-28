# TODO
* Explore better android font loading
* Support fontello
* Support icomoon
* getImageSync for fontawesome 5/6
* Export types?
* Test the other targets
  * macOS
  * windows
  * web
Expo
* Has own font loading mechanism
* Need to see how this will work

# Notes for the migration announcement
* Native typescript support
* Deprecations
  * react-vector-icons compatibility
  * Icon.Button
  * getFontFamily
  * getRawGlyphMap
  * hasIcon
  * getStyledIconSet
* Major upgrade for all fonts
* materialcommunityicons now material-design-icons

# Migration from react-native-vector-icons

@react-native-vector-icons requires close to no setup, so you will need to undo a couple of things when you migrate.

We have created a codemod which will try to migrate your code and settings.

WARNING: Make sure your code is committed to git or backed up before executing the codemod and review all changes before committing them.

```
npx @react-native-vector-icons/codemod
```

This will attempt to execute many of the manual steps below. Jump to FIXME to implement the steps it doesn't support yet.
The codemod is a best effort, read through all the manual steps to ensure they have been completed.


## Migration steps

### package.json (supported by codemod)

Remove `react-native-vector-icons` from your dependencies and replace with the fonts you intend to use, e.g. `@react-native-vector-icons/fontisto`.

### imports (supported by codemod)

Update your import statements to use the new library names
```js

// Old
import Fontisto from 'react-native-vector-icons';

// New
import Fontisto from '@react-native-vector-icons/fontisto';
```

### Move to new props for Fontawesome 5 and 6 (supported by codemod)

The FontAwesome 5 and 6 fonts now take an `iconStlye` prop instead of a style name prop

```jsx
// Old
<FontAwesome5 name="house" solid />

// New
<FontAwesome5 name="house" iconType="solid" />
```

Note: The codemod assumes you used the naming from the old README for your component e.g. FontAwesome5 etc or Icon
If you have imported the component with another name you will need to modify the codemod or make the changes yourself.

### Remove fonts from Info.plist (supported by codemod)

Fonts are now automatically loaded on iOS, so you can remove any fonts you have listed in `Info.plist`


### iOS

If you aren't using any other fonts, remove the Fonts folder and any fonts you have added.

Select your project in the navigator, choose your app's target, go to the Build Phases tab, and under Copy Bundle Resources, remove any fonts.

Remove any entried in `react-native.config.js`

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
