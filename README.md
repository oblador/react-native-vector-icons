![Vector Icons for React Native](https://cloud.githubusercontent.com/assets/378279/12009887/33f4ae1c-ac8d-11e5-8666-7a87458753ee.png)

[![npm](https://img.shields.io/npm/v/@react-native-vector-icons/common.svg)](https://npmjs.com/package/@react-native-vector-icons/common.svg) [![npm](https://img.shields.io/npm/dm/@react-native-vector-icons/common.svg)](https://npmjs.com/package/@react-native-vector-icons/common)

# React Native Vector Icons

Elevate your React Native applications with the power of customizable vector
icons. Ideal for embellishing buttons, logos, and navigation or tab bars, these
icons seamlessly integrate into your projects. Their versatility makes
extension and styling effortless.

For the integration of `.svg` files natively, you can explore [`react-native-vector-image`](https://github.com/oblador/react-native-vector-image).

> [!TIP]
> If you are still using the old single package `react-native-vector-icons` please visit https://github.com/oblador/react-native-vector-icons/tree/legacy

## Table of Contents

- [Sponsorship](#sponsorship)
- [Available Icon Sets](#available-icon-sets)
- [Installation](#installation)
- [Setup](#setup)
- [Icon Component](#icon-component)
- [Usage as PNG Image/Source Object](#usage-as-png-imagesource-object)
- [Multi-Style Fonts](#multi-style-fonts)
- [Custom Fonts](#custom-fonts)
- [Animation](#animation)
- [Dynamic icon font loading](#dynamic-icon-font-loading)
- [Usage Examples](#usage-examples)
- [Changelog](https://github.com/react-native-vector-icons/react-native-vector-icons/releases)
- [License](#license)

## Sponsorship

Should you find this library beneficial, kindly contemplate the option of
[sponsoring](https://github.com/sponsors/oblador).

## Available Icon Sets

[Explore all icons](https://react-native-vector-icons.github.io/react-native-vector-icons/).

RNVI comes with the following supported icons. You can [search NPM](https://www.npmjs.com/search?q=keywords%3Areact-native-vector-icons-icon) for third party icons.

### Actively maintained
- [`AntDesign`](https://ant.design/components/icon) from Ant Group (v4.4.2 with _449_ icons)
- [`Feather`](http://feathericons.com) created by Cole Bemis & Contributors (v4.29.2 featuring _287_ icons)
- [`FontAwesome 6`](https://fontawesome.com/search) designed by Fonticons, Inc. (v6.6.0 featuring _2050_ free and _30213_ pro icons)
- [`Foundation`](http://zurb.com/playground/foundation-icon-fonts-3) by ZURB, Inc. (v3.0 with _283_ icons)
- [`Ionicons`](https://ionic.io/ionicons) crafted by Ionic (v7.4.0 containing _1356_ icons)
- [`MaterialDesignIcons`](https://pictogrammers.com/library/mdi/) from MaterialDesignIcons.com (v7.4.47 including _7448_ icons)
- [`Octicons`](https://primer.style/foundations/icons) designed by GitHub, Inc. (v19.11.0 with _331_ icons)

### No longer maintained upstream
- [`Entypo`](http://entypo.com) by Daniel Bruce (v1.0.1 with _411_ icons)
- [`EvilIcons`](http://evil-icons.io) designed by Alexander Madyankin & Roman Shamin (v1.10.1 with _70_ icons)
- [`FontAwesome`](https://fontawesome.com/v4/icons) by Fonticons, Inc. (v4.7.0 containing _785_ icons)
- [`FontAwesome 5`](https://fontawesome.com/v5/search) from Fonticons, Inc. (v5.15.4 offering _1611_ free and _7869_ pro icons)
- [`Fontisto`](https://github.com/kenangundogan/fontisto) created by Kenan Gündoğan (v3.0.4 featuring _617_ icons)
- [`MaterialIcons`](https://fonts.google.com/icons?icon.set=Material+Icons) by Google, Inc. (v4.0.0 featuring _2234_ icons)
- [`SimpleLineIcons`](https://simplelineicons.github.io/) crafted by Sabbir & Contributors (v2.5.5 with _189_ icons)
- [`Zocial`](https://smcllns.github.io/css-social-buttons) by Sam Collins (v1.1.1 with _100_ icons)

## Migration

See [MIGRATION.md](MIGRATION.md) if you are migrating from `react-native-vector-icons` to the package-per-icon-set approach.

## Installation

1. Install the common package
   ```sh
   npm install --save @react-native-vector-icons/common
   ```
2. Install the packages for the icons you want use
   ```sh
   npm install --save @react-native-vector-icons/fontawesome6 @react-native-vector-icons/evilicons
   ```
3. Depending on the platform you're targeting (iOS/Android/Windows), follow the appropriate setup instructions below.
4. If you are using one of the following fonts refer to their guides for further instructions
  * [FontAwesome 6](packages/fontawesome6/README.md)
  * [FontAwesome 6 Pro](packages/fontawesome6-pro/README.md)
  * [FontAwesome 5](packages/fontawesome5/README.md)
  * [FontAwesome 5 Pro](packages/fontawesome5-pro/README.md)
  * [Fontello](packages/fontello/README.md)
  * [Icomoon](packages/icomoon/README.md)

## Setup

Please refer to the guide for [Expo](./docs/SETUP-EXPO.md), [React Native](./docs/SETUP-REACT-NATIVE.md) or [Web](./docs/SETUP-WEB.md) for further instructions.

## `Icon` Component

You can either use one of the bundled icons above or roll your own custom font.

```js
import Icon from '@react-native-vector-icons/fontawesome';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
```

### Props

Any [Text props](https://reactnative.dev/docs/text.html#props) and the following:

| Prop        | Description                                                             | Default     |
| ----------- | ----------------------------------------------------------------------- | ----------- |
| **`size`**  | Size of the icon, can also be passed as `fontSize` in the style object. | `12`        |
| **`name`**  | What icon to show, see Icon Explorer app or one of the links above.     | _None_      |
| **`color`** | Color of the icon.                                                      | _Inherited_ |

### Static Methods

| Prop                     | Description                                                                                                                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`getImageSource`**     | Returns a promise that resolving to the source of a bitmap version of the icon for use with `Image` component et al. Usage: `const source = await Icon.getImageSource(name, size, color)` |
| **`getImageSourceSync`** | Same as `getImageSource` but synchronous. Usage: `const source = Icon.getImageSourceSync(name, size, color)`                                                                              |

### Styling

Since `Icon` builds on top of the `Text` component, most [style properties](https://reactnative.dev/docs/style.html) will work as expected, you might find it useful to play around with these:

- `backgroundColor`
- `borderWidth`
- `borderColor`
- `borderRadius`
- `padding`
- `margin`
- `color`
- `fontSize`

By combining some of these you can create for example :

![type](https://cloud.githubusercontent.com/assets/378279/7667570/33817554-fc0d-11e4-9ad7-4eb60139cfb7.png)
![star](https://cloud.githubusercontent.com/assets/378279/7667569/3010dd7e-fc0d-11e4-9696-cb721fe8e98d.png)

## Usage as PNG Image/Source Object

Convenient way to plug this in into other components that rely on bitmap images rather than scalable vector icons. Takes the arguments `name`, `size` and `color` as described above.

```jsx
const source = Icon.getImageSourceSync('user', 20, 'red');
return <Image source={source} />;
);
```

Alternatively you may use the async method `Icon.getImageSource`.

Keep in mind that `Icon.getImageSourceSync` is blocking and might incur performance penalties. Subsequent calls will use cache however.

## Multi-Style Fonts

Some fonts today use multiple styles, FontAwesome 5 for example, which is supported by this library. The usage is pretty much the same as the standard `Icon` component:

```jsx
import Icon from '@react-native-vector-icons/fontawesome5';

const myIcon1 = <Icon name="comments" size={30} color="#900" />; // Defaults to solid
const myIcon2 = <Icon name="comments" size={30} color="#900" iconType="solid" />;
const myIcon3 = <Icon name="comments" size={30} color="#900" iconType="light" />; // Only in FA5 Pro
```

### Static methods

All static methods from `Icon` is supported by multi-styled fonts.

| Prop                     | Description                                                                                                                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`getImageSource`**     | Returns a promise that resolving to the source of a bitmap version of the icon for use with `Image` component et al. Usage: `const source = await Icon.getImageSource(name, size, color)` |
| **`getImageSourceSync`** | Same as `getImageSource` but synchronous. Usage: `const source = Icon.getImageSourceSync(name, size, color)`                                                                              |

## Custom Fonts

The best approach is to use our icon generator to create your own icon package.

See [CREATE_FONT_PACKAGE.md](./docs/CREATE_FONT_PACKAGE.md) to learn how to create your own font packages.

You can also use `createIconSet()` directly in your project. This
returns your own custom font based on the `glyphMap` where the key is the icon
name and the value is either a UTF-8 character or it's character code.
`postScriptName` is the name of the postscript font. Open the font in https://fontdrop.info/, 
Font Book.app or similar to learn the name. Also pass the `fontFileName` argument for Android support.

```js
import { createIconSet } from '@react-native-vector-icons/common';
const glyphMap = { 'icon-name': 1234, test: '∆' };

// use createIconSet() with object parameter
// or use positional parameters for compatibility with version <= 10: `createIconSet(glyphMap, fontFamily[, fontFile])`
const Icon = createIconSet(glyphMap, {
   postScriptName: 'FontName',
   fontFileName: 'font-name.ttf',
   fontSource: require('../fonts/font-name.ttf') // optional, for dynamic loading. Can also be a local file uri.
})
```

You should place the font ttf file into `rnvi-fonts`. You can customise this location by adding the following snippet to your package.json
```json
{
  "reactNativeVectorIcons": {
    "fontDir": "src/assets/fonts"
  }
}
  ```

## Animation

React Native comes with an amazing animation library called
[`Animated`](https://reactnative.dev/docs/animated.html). To use it with an
icon, simply create an animated component with this line: `const AnimatedIcon =
Animated.createAnimatedComponent(Icon)`. You can also use the higher level
animation library
[react-native-animatable](https://github.com/oblador/react-native-animatable).

## Dynamic icon font loading

> At the moment, dynamic loading is supported on native platforms (not on web) only if you use Expo. In the future, it should become available for all React Native projects via React Native core.

Fonts can be available in an app statically (since build time) or loaded dynamically at runtime. The latter can be useful e.g. for apps that use over-the-air updates and want to load new fonts with an update, or when you need to use a font from a remote location.

Dynamic loading in react-native-vector-icons is currently limited to those fonts that are bundled within the provided packages: it doesn't support Pro fonts (such as FontAwesome 5 Pro). However, loading of custom fonts is not difficult to implement: see any of the free font packages for reference.

By default, dynamic loading is enabled if supported by the version of Expo that you're using. It doesn't change the way you work with the package: If rendering an icon requires a font that is not known to the app, it will be loaded automatically and icon will render as expected.

`@react-native-vector-icons/common` exports several functions which you can use to control dynamic loading: 

- `isDynamicLoadingEnabled`: Returns whether dynamic loading is enabled.
- `isDynamicLoadingSupported`: Returns whether dynamic loading is supported by your runtime (checks that necessary Expo features are present).
- `setDynamicLoadingEnabled`: Enables or disables dynamic loading.
- `setDynamicLoadingErrorCallback`: Sets a callback that is called (in the unlikely case) when an error occurs during dynamic loading. An example of when an error might happen is loading a misconfigured OTA update which doesn't include a necessary font file.

## Usage Examples

### Icon Explorer

Try the `IconExplorer` project in `Examples/IconExplorer` folder, there you can also search for any icon.

![Screenshot of IconExplorer](https://cloud.githubusercontent.com/assets/378279/8903470/a9fe6b46-3458-11e5-901f-98b7b676d0d3.png)

### Basic Example

```js
import Icon from '@react-native-vector-icons/ionicons';

function ExampleView(props) {
  return <Icon name="ios-person" size={30} color="#4F8EF7" />;
}
```

### Inline Icons

```js
import { Text } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

function ExampleView(props) {
  return (
    <Text>
      Lorem <Icon name="ios-book" color="#4F8EF7" /> Ipsum
    </Text>
  );
}
```

## [Changelog](https://github.com/react-native-vector-icons/react-native-vector-icons/releases)

## License

This project is licenced under the [MIT License](http://opensource.org/licenses/mit-license.html).

Any bundled fonts are copyright to their respective authors and mostly under MIT or [SIL OFL](http://scripts.sil.org/OFL).
