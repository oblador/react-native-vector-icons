![Vector Icons for React Native](https://cloud.githubusercontent.com/assets/378279/12009887/33f4ae1c-ac8d-11e5-8666-7a87458753ee.png)

[![Travis](https://img.shields.io/travis/oblador/react-native-vector-icons.svg)](https://travis-ci.org/oblador/react-native-vector-icons) [![npm](https://img.shields.io/npm/v/react-native-vector-icons.svg)](https://npmjs.com/package/react-native-vector-icons) [![npm](https://img.shields.io/npm/dm/react-native-vector-icons.svg)](https://npmjs.com/package/react-native-vector-icons) [![Issue Stats](https://img.shields.io/issuestats/i/github/oblador/react-native-vector-icons.svg)](http://github.com/oblador/react-native-vector-icons/issues)

Perfect for buttons, logos and nav/tab bars. Easy to extend, style and integrate into your project. 

## Bundled Icon Sets

[Browse all](https://oblador.github.io/react-native-vector-icons/).

* [`Entypo`](http://entypo.com) by Daniel Bruce (**411** icons) 
* [`EvilIcons`](http://evil-icons.io) by Alexander Madyankin & Roman Shamin (v1.8.0, **70** icons) 
* [`Feather`](http://feathericons.com) by Cole Bemis & Contributors (v3.2.2, **240** icons) 
* [`FontAwesome`](http://fortawesome.github.io/Font-Awesome/icons/) by Dave Gandy (v4.7.0, **675** icons) 
* [`Foundation`](http://zurb.com/playground/foundation-icon-fonts-3) by ZURB, Inc. (v3.0, **283** icons)
* [`Ionicons`](http://ionicframework.com/docs/v2/ionicons/) by Ben Sperry (v3.0.0, **859** icons)
* [`MaterialIcons`](https://www.google.com/design/icons/) by Google, Inc. (v3.0.1, **932** icons)
* [`MaterialCommunityIcons`](https://materialdesignicons.com/) by MaterialDesignIcons.com (v2.0.46, **2046** icons)
* [`Octicons`](http://octicons.github.com) by Github, Inc. (v6.0.1, **177** icons)
* [`Zocial`](http://zocial.smcllns.com/) by Sam Collins (v1.0, **100** icons)
* [`SimpleLineIcons`](http://simplelineicons.com/) by Sabbir & Contributors (v2.4.1, **189** icons)

## Installation

1. Run: `$ npm install react-native-vector-icons --save`
2. For each platform (iOS/Android/Windows) you plan to use, follow one of the options for the corresponding platform.

### iOS 

#### Option: Manually

If you want to use any of the bundled icons, you need to add the icon fonts to your Xcode project. Just follow these steps:

* Browse to `node_modules/react-native-vector-icons` and drag the folder `Fonts` (or just the ones you want) to your project in Xcode. **Make sure your app is checked under "Add to targets" and that "Create groups" is checked if you add the whole folder**.
* Edit `Info.plist` and add a property called **Fonts provided by application** (or `UIAppFonts` if Xcode won't autocomplete/not using Xcode) and type in the files you just added. It will look something like this:

![XCode screenshot](https://cloud.githubusercontent.com/assets/378279/12421498/2db1f93a-be88-11e5-89c8-2e563ba6251a.png)

*Note: you need to recompile your project after adding new fonts, also ensure that they also appear under __Copy Bundle Resources__ in __Build Phases__.*

If you want to use the TabBar/NavigatorIOS integration or use `getImageSource`, then you need to add `RNVectorIcons.xcodeproj` to **Libraries** and add `libRNVectorIcons.a` to **Link Binary With Libraries** under **Build Phases**. [More info and screenshots about how to do this is available in the React Native documentation](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#content).

#### Option: With [CocoaPods](https://cocoapods.org/)

Add the following to your `Podfile` and run `pod update`:

```
pod 'RNVectorIcons', :path => 'node_modules/react-native-vector-icons'
```

Edit `Info.plist` as described above. 

If you are using `use_frameworks!` in your `Podfile` you instead need to dynamically load the icon font by doing `Icon.loadFont()` when boostrapping your application.

#### Option: With `rnpm`

`$ react-native link`

*Note: Some users are having trouble using this method, try one of the others if you are too.*

### Android

#### Option: With Gradle (recommended)

This method has the advantage of fonts being copied from this module at build time so that the fonts and JS are always in sync, making upgrades painless.

Edit `android/app/build.gradle` ( NOT `android/build.gradle` ) and add the following:

```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

To customize the files being copied, add the following instead:

```gradle
project.ext.vectoricons = [
    iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ] // Name of the font files you want to copy
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

#### Option: Manually

* Copy the contents in the `Fonts` folder to `android/app/src/main/assets/fonts` (*note lowercase font folder*). 

##### Integrating library for `getImageSource` and `ToolbarAndroid` support

These steps are optional and only needed if you want to use the `Icon.getImageSource` function or using custom icons in the `Icon.ToolbarAndroid` component. 

* Edit `android/settings.gradle` to look like this (without the +):

  ```diff
  rootProject.name = 'MyApp'

  include ':app'

  + include ':react-native-vector-icons'
  + project(':react-native-vector-icons').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-vector-icons/android')
  ```

* Edit `android/app/build.gradle` (note: **app** folder) to look like this: 

  ```diff
  apply plugin: 'com.android.application'

  android {
    ...
  }

  dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile "com.android.support:appcompat-v7:23.0.1"
    compile "com.facebook.react:react-native:+"  // From node_modules
  + compile project(':react-native-vector-icons')
  }
  ```

* Edit your `MainApplication.java` (deep in `android/app/src/main/java/...`) to look like this (note **two** places to edit):

  ```diff
  package com.myapp;

  + import com.oblador.vectoricons.VectorIconsPackage;

  ....

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage()
  +   , new VectorIconsPackage()
      );
    }

  }
  ```

*Note: If you're using React Native (Android) <= 0.17, [follow this instructions](https://github.com/oblador/react-native-vector-icons/blob/2fe5b97afa849652215e3258189e8ca3ea775c53/README.md#integrating-library-for-getimagesource-support)*

#### Option: With `rnpm`

`$ react-native link`

*Note: Some users are having trouble using this method, try one of the others if you are too.*

### OSX via [`react-native-desktop`](https://github.com/ptmt/react-native-desktop)

* Browse to `node_modules/react-native-vector-icons` and drag the folder `Fonts` to your project in Xcode. **Make sure your app is checked under "Add to targets" and that "Create folder references" is checked**.
* Edit `Info.plist` and add a property called **Application fonts resource path** (or `ATSApplicationFontsPath` if Xcode won't autocomplete/not using Xcode) and type `Fonts` as the value.

*Note: you need to recompile your project after adding new fonts, also ensure that the `Fonts` folder also appear under __Copy Bundle Resources__ in __Build Phases__.*

### Windows via [`react-native-windows`](https://github.com/ReactWindows/react-native-windows)

* Open your solution in Visual Studio, right click the Assets folder in your solution, click **Add Existing**.
* Browse to the `node_modules\react-native-vector-icons\Fonts` folder, select the required font files
* Click the **Add** drop-down and select **Add as Link**.
* Set **Copy To Output Directory** property of each font file to **Copy if newer**

*Note: you need to recompile your project after adding new fonts.*

### Web (with [webpack](https://webpack.js.org/))

In your webpack configuration file, add a section to handle ttf files using url-loader (or file-loader)

```js
{
  test: /\.ttf$/,
  loader: "url-loader", // or directly file-loader
  include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
},
```

Then consume those files in your JavaScript entry point to get the bundled url and inject a style tag in your page:

```js
// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/dist/FontAwesome';

// Generate required css
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: FontAwesome;
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);
```

## `Icon` Component
You can either use one of the bundled icons above or roll your own custom font. 

```js
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="rocket" size={30} color="#900" />)
```

### Properties
Any [Text property](http://facebook.github.io/react-native/docs/text.html) and the following: 

| Prop | Description | Default |
|---|---|---|
|**`size`**|Size of the icon, can also be passed as `fontSize` in the style object. |`12`|
|**`name`**|What icon to show, see Icon Explorer app or one of the links above. |*None*|
|**`color`**|Color of the icon. |*Inherited*|

### Styling
Since `Icon` builds on top of the `Text` component, most [style properties](http://facebook.github.io/react-native/docs/style.html) will work as expected, you might find it useful to play around with these:

* `backgroundColor`
* `borderWidth`
* `borderColor`
* `borderRadius`
* `padding`
* `margin`
* `color`
* `fontSize`

NOTE: On android `Text` doesn't currently support `border*` styles, to circumvent this simply wrap your `Icon` with a `View`.  

By combining some of these you can create for example : 

![type](https://cloud.githubusercontent.com/assets/378279/7667570/33817554-fc0d-11e4-9ad7-4eb60139cfb7.png)
![star](https://cloud.githubusercontent.com/assets/378279/7667569/3010dd7e-fc0d-11e4-9696-cb721fe8e98d.png)

## `Icon.Button` Component
A convenience component for creating buttons with an icon on the left side. 

```js
import Icon from 'react-native-vector-icons/FontAwesome';
const myButton = (
  <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
    Login with Facebook
  </Icon.Button>
);

const customTextButton = (
  <Icon.Button name="facebook" backgroundColor="#3b5998">
    <Text style={{fontFamily: 'Arial', fontSize: 15}}>Login with Facebook</Text>
  </Icon.Button>
);
```

![buttons](https://cloud.githubusercontent.com/assets/378279/7667568/2e9021b2-fc0d-11e4-8e68-cf91c329a6f4.png)

### Properties
Any [`Text`](http://facebook.github.io/react-native/docs/text.html), [`TouchableHighlight`](http://facebook.github.io/react-native/docs/touchablehighlight.html) or [`TouchableWithoutFeedback`](http://facebook.github.io/react-native/docs/touchablewithoutfeedback.html) property in addition to these:

| Prop | Description | Default |
|---|---|---|
|**`color`**|Text and icon color, use `iconStyle` or nest a `Text` component if you need different colors.|`white`|
|**`size`**|Icon size.|`20`|
|**`iconStyle`**|Styles applied to the icon only, good for setting margins or a different color.|`{marginRight: 10}`|
|**`backgroundColor`**|Background color of the button.|`#007AFF`|
|**`borderRadius`**|Border radius of the button, set to `0` to disable. |`5`|
|**`onPress`**|A function called when the button is pressed. |*None*|

## Usage as PNG image/source object

Convenient way to plug this in into other components that rely on bitmap images rather than scalable vector icons. Takes the arguments `name`, `size` and `color` as described above.

```
Icon.getImageSource('user', 20, 'red').then((source) => this.setState({ userIcon: source }));
```

For a complete example check out the `TabBarExample` project. 

## Usage with [TabBarIOS](http://facebook.github.io/react-native/docs/tabbarios.html)

Simply use `Icon.TabBarItemIOS` instead of `TabBarIOS.Item`. This is an extended component that works exactly the same but with three additional properties: 

| Prop | Description | Default |
|---|---|---|
|**`iconName`**|Name of the default icon (similar to `TabBarIOS.Item` `icon`)|*None*|
|**`selectedIconName`**|Name of the selected icon (similar to `TabBarIOS.Item` `selectedIcon`). |*`iconName`*|
|**`iconSize`**|Size of the icon. |`30`|
|**`iconColor`**|Color of the icon. |*None*|
|**`selectedIconColor`**|Color of the selected icon. |*`iconColor`*|

For example usage see `Examples/TabBarExample` or the examples section below. Don't forget to import and link to this project as described above if you are going to use the TabBar integration. 

**Note:** using `iconColor` and `selectedIconColor` requires the attribute [renderAsOriginal](https://facebook.github.io/react-native/docs/tabbarios-item.html#renderasoriginal) to be set to `true` on `Icon.TabBarItemIOS`.

## Usage with [NavigatorIOS](http://facebook.github.io/react-native/docs/navigatorios.html)

Use `Icon.getImageSource` to get an image source object and pass it as you would with `backButtonIcon`, `leftButtonIcon` or `rightButtonIcon`. 

Note: Since [`NavigatorIOS` doesn't rerender with new state](https://github.com/facebook/react-native/issues/1403) and the async nature of `getImageSource` you must not use it with `initialRoute` until the icon is rendered, but any view added by `push` should be fine. Easiest way is to simple add an `if` statment at the beginning of you render method like this: 

```
  render() {
    if (!this.state.myIcon) {
      return false;
    }
    return (<NavigatorIOS ... />);
  }
```

[Facebook writes](http://facebook.github.io/react-native/docs/navigator-comparison.html#navigatorios): 
> Development belongs to open-source community - not used by the React Native team on their apps. A result of this is that there is currently a backlog of unresolved bugs, nobody who uses this has stepped up to take ownership for it yet.

You are probably better off with [`Navigator.NavigationBar`](http://facebook.github.io/react-native/docs/navigator.html) or [`react-native-navbar`](https://github.com/Kureev/react-native-navbar).

## Usage with [ToolbarAndroid](http://facebook.github.io/react-native/docs/toolbarandroid.html)

Simply use `Icon.ToolbarAndroid` instead of `React.ToolbarAndroid`, this is composition of the underlying `ToolbarAndroid` component that works the same but any `*icon` property also takes `*iconName`: 

| Prop | Description | Default |
|---|---|---|
|**`logoName`**|Name of the navigation logo icon (similar to `ToolbarAndroid` `logo`)|*None*|
|**`navIconName`**|Name of the navigation icon (similar to `ToolbarAndroid` `navIcon`)|*None*|
|**`overflowIconName`**|Name of the overflow icon (similar to `ToolbarAndroid` `overflowIcon`). |*none*|
|**`actions`**|Possible actions on the toolbar as part of the action menu, takes the additional arguments `iconName`, `iconColor` and `iconSize`. |*none*|
|**`iconSize`**|Size of the icons. |`24`|
|**`iconColor`**|Color of the icons. |`black`|

For example usage see `Examples/IconExplorer/index.android.js`or the examples section below. Don't forget to import and link to this project as described above if you are going to use the ToolbarAndroid integration. 

## Custom Fonts

### `createIconSet(glyphMap, fontFamily[, fontFile])`
Returns your own custom font based on the `glyphMap` where the key is the icon name and the value is either a UTF-8 character or it's character code. `fontFamily` is the name of the font **NOT** the filename. Open the font in Font Book.app or similar to learn the name. Optionally pass the third `fontFile` argument for android support, it should be a path to the font file in you asset folder. 

```js
import { createIconSet } from 'react-native-vector-icons';
const glyphMap = { 'icon-name': 1234, test: '∆' };
const Icon = createIconSet(glyphMap, 'FontName');
```

### `createIconSetFromFontello(config[, fontFamily[, fontFile]])`
Convenience method to create a custom font based on a [fontello](http://fontello.com) config file. Don't forget to import the font as described above and drop the `config.json` somewhere convenient in your project. 

```js
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from './config.json';
const Icon = createIconSetFromFontello(fontelloConfig);
```

### `createIconSetFromIcoMoon(config[, fontFamily[, fontFile]])`
```js
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './config.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig);
```

Make sure you're using the _Download_ option in IcoMoon, and use the `.json` file that's included in the `.zip` you've downloaded. You'll also need to import the `.ttf` font file into your project, following the instructions above.
#### iOS 
You have to manually make a reference of your `.ttf` on your xcodeproj `Resources` folder.

## Animation

React Native comes with an amazing animation library called [`Animated`](http://facebook.github.io/react-native/docs/animated.html). To use it with an icon, simply create an animated component with this line: `const AnimatedIcon = Animated.createAnimatedComponent(Icon)`. You can also use the higher level animation library [react-native-animatable](https://github.com/oblador/react-native-animatable).

## Examples

### IconExplorer
Try the `IconExplorer` project in `Examples/IconExplorer` folder, there you can also search for any icon. 

![Screenshot of IconExplorer](https://cloud.githubusercontent.com/assets/378279/8903470/a9fe6b46-3458-11e5-901f-98b7b676d0d3.png)


### Basic Example
```js
import Icon from 'react-native-vector-icons/Ionicons';

function ExampleView(props) {
  return (<Icon name="ios-person" size={30} color="#4F8EF7" />);
}
```

### TabBarIOS
Full example in `TabBarExample` project in `Examples/TabBarExample` folder. 

```js
import { View, Text, TabBarIOS } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function TabBarView(props) {
  return (
    <TabBarIOS>
      <Icon.TabBarItem
        title="Home"
        iconName="ios-home-outline"
        selectedIconName="ios-home"
        >
        <View style={styles.tabContent}><Text>Home Tab</Text></View>
      </Icon.TabBarItem>
    </TabBarIOS>
  );
}
```

### ToolbarAndroid

```js
import Icon from 'react-native-vector-icons/Ionicons';

function ToolbarView(props) {
  return (
    <Icon.ToolbarAndroid
      title="Home"
      titleColor="white"
      navIconName="md-arrow-back"
      onIconClicked={props.navigator.pop}
      actions={[
        { title: 'Settings', iconName: 'md-settings', iconSize: 30, show: 'always' },
        { title: 'Follow me on Twitter', iconName: 'logo-twitter', iconColor: "#4099FF", show: 'ifRoom' },
      ]}
      overflowIconName="md-more"
    />
  );
}
```

### Inline Icons
```js
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function ExampleView(props) {
  return (<Text>Lorem <Icon name="ios-book" color="#4F8EF7" /> Ipsum</Text>);
}
```

### Community examples

* [react-native-dribbble-app](https://github.com/catalinmiron/react-native-dribbble-app)
* [product-kitty](https://github.com/rkho/product-kitty) ([blog post](http://richardkho.com/persisting-tabbars-in-react-native/))
* [react-native-netflix](https://github.com/mariodev12/react-native-netflix)

## Generating your own icon set from a CSS file

If you already have a icon font with associated CSS file then you can easily generate a icon set with the `generate-icon` script. 

### Example usage: 

```
./node_modules/.bin/generate-icon path/to/styles.css --componentName=MyIcon --fontFamily=myicon > Components/MyIcon.js
```

### Options

Any flags not listed below, like `--componentName` and `--fontFamily`, will be passed on to the template. 

#### `-p`, `--prefix`
CSS selector prefix [default: ".icon-"]

#### `-t`, `--template`
Template in lodash format [default: "./template/iconSet.tpl"]

For default template please provide `--componentName` and `--fontFamily`.

#### `-o`, `--output`
Save output to file, defaults to STDOUT

## [Changelog](https://github.com/oblador/react-native-vector-icons/releases)

## Troubleshooting

#### The icons show up as a crossed out box on Android
* Make sure you've copied the font to `android/app/src/main/assets/fonts`.
* Delete the `android/app/build` folder. 
* Recompile the project.

#### Red screen with "Unrecognized font family" error on iOS
* Make sure you've added manually the reference of your `.ttf` on your xcodeproj `Resources` folder.
* Check that the font you are trying to use appears in `Info.plist`, if you've added the whole folder and it's blue in color, then you need to add it to the path. 
* Check that the font is copied in the *Copy Bundle Resources* in *Build Phases*.
* Recompile the project.

#### Android build fails on Windows for no good reason

Both npm and android file hierarchies tend to get very deep and even worse when you combine them. Since Windows file system has a max length, long file name addresses will result in numerous errors including `Execution failed for task ':react-native-vector-icons:processReleaseResources'`. So try to keep the path to your project folder as short as possible. 

## License

This project is licenced under the [MIT License](http://opensource.org/licenses/mit-license.html).

Any bundled fonts are copyright to their respective authors and mostly under MIT or [SIL OFL](http://scripts.sil.org/OFL).

