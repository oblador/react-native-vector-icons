# Vector Icons for React Native

**Choose from 3000+ icons or use your own.**

Perfect for buttons, logos and nav/tab bars. Easy to extend, style and integrate into your project. 

## Main advantages over `react-native-icons`

* You can use your own custom icon sets. Supports SVG via [Fontello](http://fontello.com) or regular icon fonts. 
* You can use *native* `TabBarIOS`.
* You can use icons inline with `Text` components as emojis or to create buttons. 
* You can use the icon as an image if a native component requires it (such as `NavigatorIOS`). 
* Most common use cases is JavaScript only and thus enables wider possibilities of styling (and is easier to integrate with your project). 
* No need to define `width` and `height` styles.
* Presentational stuff like size and color can be defined in your stylesheet instead of via a property (if you want to).
* Icons scale with accessibility settings (unless disabled).

## Bundled Icon Sets

* [`Entypo`](http://entypo.com) by Daniel Bruce (**411** icons) 
* [`EvilIcons`](http://evil-icons.io) by Alexander Madyankin & Roman Shamin (v1.7.8, **70** icons) 
* [`FontAwesome`](http://fortawesome.github.io/Font-Awesome/icons/) by Dave Gandy (v4.4, **585** icons) 
* [`Foundation`](http://zurb.com/playground/foundation-icon-fonts-3) by ZURB, Inc. (v3.0, **283** icons)
* [`Ionicons`](http://ionicons.com/) by Ben Sperry (v2.0.1, **733** icons)
* [`MaterialIcons`](https://www.google.com/design/icons/) by Google, Inc. (v2.0, **796** icons)
* [`Octicons`](http://octicons.github.com) by Github, Inc. (v2.4.1, **178** icons)
* [`Zocial`](http://zocial.smcllns.com/) by Sam Collins (v1.0, **100** icons)

## Installation

`$ npm install react-native-vector-icons --save`

### iOS 

#### Option: Manually

If you want to use any of the bundled icons, you need to add the icon fonts to your XCode project. Just follow these steps:

* Right click on you project in XCode and select **Add files to "_NameOfYourProject_"**. 
* Browse to `node_modules/react-native-vector-icons` and select the folder `Fonts` (or just the ones you want). **Make sure your app is checked under "Add to targets" and that "Create groups" is checked if you add the whole folder**.
* Edit `Info.plist` and add a property called **Fonts provided by application** (if you haven't added one already) and type in the files you just added. It will look something like this:

![XCode screenshot](https://cloud.githubusercontent.com/assets/378279/7667535/0e1fd13a-fc0c-11e4-9220-18d5c095a7be.png)

*Note: you need to recompile your project after adding new fonts, also ensure that they also appear under __Copy Bundle Resources__ in __Build Phases__.*

If you want to use the TabBar integration, then you need to add `RNVectorIcons.xcodeproj` to **Libraries** and add `libRNVectorIcons.a` to **Link Binary With Libraries** under **Build Phases**. [More info and screenshots about how to do this is available in the React Native documentation](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#content).

#### Option: With [CocoaPods](https://cocoapods.org/)

Add the following to your `Podfile` and run `pod update`:

```
pod 'RNVectorIcons', :path => 'node_modules/react-native-vector-icons'
```

Edit `Info.plist` as described above. 

### Android

*Note: Android support requires React Native 0.16 or later, use [0.8.5](https://github.com/oblador/react-native-vector-icons/releases/tag/v0.8.5) for earlier versions*

* Copy the contents in the `Fonts` folder to `android/app/src/main/assets/fonts` (*note lowercase font folder*). 

#### Integrating library for `getImageSource` support

These steps are optional and only needed if you want to use the `Icon.getImageSource` function. 

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
    compile 'com.android.support:appcompat-v7:23.0.0'
    compile 'com.facebook.react:react-native:0.16.+'
  + compile project(':react-native-vector-icons')
  }
  ```

* Edit your `MainActivity.java` (deep in `android/app/src/main/java/...`) to look like this (note **two** places to edit):

  ```diff
  package com.myapp;

  + import com.oblador.vectoricons.VectorIconsPackage;

  ....

  public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {

    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      mReactRootView = new ReactRootView(this);

      mReactInstanceManager = ReactInstanceManager.builder()
        .setApplication(getApplication())
        .setBundleAssetName("index.android.bundle")
        .setJSMainModuleName("index.android")
        .addPackage(new MainReactPackage())
  +     .addPackage(new VectorIconsPackage())
        .setUseDeveloperSupport(BuildConfig.DEBUG)
        .setInitialLifecycleState(LifecycleState.RESUMED)
        .build();

      mReactRootView.startReactApplication(mReactInstanceManager, "MyApp", null);

      setContentView(mReactRootView);
    }
    ...
  }
  ```


## `Icon` Component
You can either use one of the bundled icons above or roll your own custom font. 

```js
var Icon = require('react-native-vector-icons/FontAwesome');
var myIcon = (<Icon name="rocket" size={30} color="#900" />)
```

### Properties
Any [Text property](http://facebook.github.io/react-native/docs/text.html) and the following: 

| Prop | Description | Default |
|---|---|---|
|**`size`**|Size of the icon, can also be passed as `fontSize` in the style object. |`12`|
|**`name`**|What icon to show, see Icon Explorer app or one of the links above. |*None*|
|**`color`**|Color of the icon. |*Inherited*|

### Styling
Since `Icon` builds on top of the `Text` component, most [style properties](http://facebook.github.io/react-native/docs/style.html) will work as expected, you might find it useful to play around with these:

* `backgroundColor`
* `borderWidth`
* `borderColor`
* `borderRadius`
* `padding`
* `margin`
* `color`
* `fontSize`

By combining some of these you can create for example: 

![type](https://cloud.githubusercontent.com/assets/378279/7667570/33817554-fc0d-11e4-9ad7-4eb60139cfb7.png)
![star](https://cloud.githubusercontent.com/assets/378279/7667569/3010dd7e-fc0d-11e4-9696-cb721fe8e98d.png)

## `Icon.Button` Component
A convenience component for creating buttons with an icon on the left side. 

```js
var Icon = require('react-native-vector-icons/FontAwesome')
var myButton = (
  <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
    Login with Facebook
  </Icon.Button>
);

var customTextButton = (
  <Icon.Button name="facebook" backgroundColor="#3b5998">
    <Text style={{fontFamily: 'Arial', fontSize: 15}}Login with Facebook</Text>
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

Simply use `Icon.TabBarItem` instead of `TabBarIOS.Item`. This is an extended component that works exactly the same but with three additional properties: 

| Prop | Description | Default |
|---|---|---|
|**`iconName`**|Name of the default icon (similar to `TabBarIOS.Item` `icon`)|*None*|
|**`selectedIconName`**|Name of the selected icon (similar to `TabBarIOS.Item` `selectedIcon`). |*`iconName`*|
|**`iconSize`**|Size of the icon. |`30`|

For example usage see `Examples/TabBarExample` or the examples section below. Don't forget to import and link to this project as described above if you are going to use the TabBar integration. 

## Usage with [NavigatorIOS](http://facebook.github.io/react-native/docs/navigatorios.html)

Use `Icon.getImageSource` to get an image source object and pass it as you would with `backButtonIcon`, `leftButtonIcon` or `rightButtonIcon`. 

Note: Since [`NavigatorIOS` doesn't rerender with new state](https://github.com/facebook/react-native/issues/1403) and the async nature of `getImageSource` you must not use it with `initialRoute` until the icon is rendered, but any view added by `push` should be fine. Easiest way is to simple add an `if` statment at the beginning of you render method like this: 

```
  render: function() {
    if(!this.state.myIcon) {
      return false;
    }
    return (<NavigatorIOS ... />);
  }
```

[Facebook writes](http://facebook.github.io/react-native/docs/navigator-comparison.html#navigatorios): 
> Development belongs to open-source community - not used by the React Native team on their apps. A result of this is that there is currently a backlog of unresolved bugs, nobody who uses this has stepped up to take ownership for it yet.

You are probably better off with [`Navigator.NavigationBar`](http://facebook.github.io/react-native/docs/navigator.html) or [`react-native-navbar`](https://github.com/Kureev/react-native-navbar).

## Custom Fonts

### `createIconSet(glyphMap, fontFamily[, fontFile])`
Returns your own custom font based on the `glyphMap` where the key is the icon name and the value is either a UTF-8 character or it's character code. `fontFamily` is the name of the font **NOT** the filename. Open the font in Font Book.app or similar to learn the name. Optionally pass the third `fontFile` argument for android support, it should be a path to the font file in you asset folder. 

```js
var { createIconSet } = require('react-native-vector-icons');
var glyphMap = { 'icon-name': 1234, test: '∆' };
var Icon = createIconSet(glyphMap, 'FontName');
```

### `createIconSetFromFontello(config[, fontFamily[, fontFile]])`
Convenience method to create a custom font based on a [fontello](http://fontello.com) config file. Don't forget to import the font as described above and drop the `config.json` somewhere convenient in your project. 

```js
var { createIconSetFromFontello } = require('react-native-vector-icons');
var fontelloConfig = require('./config.json');
var Icon = createIconSetFromFontello(fontelloConfig);
```

## Examples

### IconExplorer
Try the `IconExplorer` project in `Examples/IconExplorer` folder, there you can also search for any icon. 

![Screenshot of IconExplorer](https://cloud.githubusercontent.com/assets/378279/8903470/a9fe6b46-3458-11e5-901f-98b7b676d0d3.png)


### Basic Example
```js
var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var ExampleView = React.createClass({
  render: function() {
    return <Icon name="person" size={30} color="#4F8EF7" />;
  }
};
```

### TabBar
Full example in `TabBarExample` project in `Examples/TabBarExample` folder. 

```js
var React = require('react-native');
var {
  View, 
  Text, 
  TabBarIOS,
} = React;
var Icon = require('react-native-vector-icons/Ionicons');

var TabBarView = React.createClass({
  render: function() {
    return (
      <TabBarIOS>
        <Icon.TabBarItem
          title="Home"
          iconName="ios-home-outline"
          selectedIconName="ios-home"
          }}>
          <View style={styles.tabContent}><Text>Home Tab</Text></View>
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
};
```

### Inline Icons
```js
var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');

var ExampleView = React.createClass({
  render: function() {
    return (<Text>Lorem <Icon name="ios-book" color="#4F8EF7" /> Ipsum</Text>);
  }
};
```

### Community examples

* [react-native-dribbble-app](https://github.com/catalinmiron/react-native-dribbble-app)
* [voximplant react-native-demo](https://github.com/voximplant/react-native-demo)
* [product-kitty](https://github.com/rkho/product-kitty) ([blog post](http://richardkho.com/persisting-tabbars-in-react-native/))

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

## License

This project is licenced under the [MIT License](http://opensource.org/licenses/mit-license.html).

Any bundled fonts are copyright to their respective authors and mostly under MIT or [SIL OFL](http://scripts.sil.org/OFL).
