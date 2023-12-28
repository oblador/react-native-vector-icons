![Vector Icons for React Native](https://cloud.githubusercontent.com/assets/378279/12009887/33f4ae1c-ac8d-11e5-8666-7a87458753ee.png)

[![Travis](https://img.shields.io/travis/react-native-vector-icons/react-native-vector-icons.svg)](https://travis-ci.org/react-native-vector-icons/react-native-vector-icons) [![npm](https://img.shields.io/npm/v/react-native-vector-icons.svg)](https://npmjs.com/package/react-native-vector-icons) [![npm](https://img.shields.io/npm/dm/react-native-vector-icons.svg)](https://npmjs.com/package/react-native-vector-icons)

# React Native Vector Icons

Elevate your React Native applications with the power of customizable vector
icons. Ideal for embellishing buttons, logos, and navigation or tab bars, these
icons seamlessly integrate into your projects. Their versatility makes
extension and styling effortless.

For the integration of `.svg` files natively, you can explore [`react-native-vector-image`](https://github.com/oblador/react-native-vector-image).

## Table of Contents

- [Sponsorship](#sponsorship)
- [Available Icon Sets](#available-icon-sets)
- [Installation](#installation)
  - [iOS Setup](#ios-setup)
  - [macOS Setup](#macos-setup)
  - [Windows Setup](#windows-setup)
  - [Web Setup](#web-setup)
- [Icon Component](#icon-component)
- [Usage as PNG Image/Source Object](#usage-as-png-imagesource-object)
- [Multi-Style Fonts](#multi-style-fonts)
- [Custom Fonts](#custom-fonts)
- [Animation](#animation)
- [Usage Examples](#usage-examples)
- [Generating Your Own Icon Package](#generating-your-own-icon-package)
- [Changelog](https://github.com/react-native-vector-icons/react-native-vector-icons/releases)
- [License](#license)

## Sponsorship

Should you find this library beneficial, kindly contemplate the option of
[sponsoring](https://github.com/sponsors/oblador). Our envisioned endeavors
encompass the restructuring of the repository into a monorepo architecture.
This transition will empower independent versioning of icon sets, enhance
performance, reduce bundle size, and simplify community contributions. Your
sponsorship plays a pivotal role in materializing these advancements.

## Available Icon Sets

[Explore all icons](https://react-native-vector-icons.github.io/react-native-vector-icons/).

RNVI comes with the following supported icons. You can [search NPM](https://www.npmjs.com/search?q=keywords%3Areact-native-vector-icons-icon) for third party icons.

FIXME: update all of these
FIXME: update all of these
FIXME: update all of these
FIXME: update all of these

- [`AntDesign`](https://ant.design/) from AntFinance (_298_ icons)
- [`Entypo`](http://entypo.com) by Daniel Bruce (v1.0.1 with _411_ icons)
- [`EvilIcons`](http://evil-icons.io) designed by Alexander Madyankin & Roman Shamin (v1.10.1 with _70_ icons)
- [`Feather`](http://feathericons.com) created by Cole Bemis & Contributors (v4.28.0 featuring _286_ icons)
- [`FontAwesome`](http://fortawesome.github.io/Font-Awesome/icons/) by Dave Gandy (v4.7.0 containing _675_ icons)
- [`FontAwesome 5`](https://fontawesome.com/v5/icons/) from Fonticons, Inc. (v5.15.3 offering _1598_ free and _7848_ pro icons)
- [`FontAwesome 6`](https://fontawesome.com) designed by Fonticons, Inc. (v6.1.2 featuring _2016_ free and _16150_ pro icons)
- [`Fontisto`](https://github.com/kenangundogan/fontisto) created by Kenan Gündoğan (v3.0.4 featuring _615_ icons)
- [`Foundation`](http://zurb.com/playground/foundation-icon-fonts-3) by ZURB, Inc. (v3.0 with _283_ icons)
- [`Ionicons`](https://ionicons.com/) crafted by Ionic (v7.1.0 containing _1338_ icons)
- [`MaterialIcons`](https://fonts.google.com/icons/) by Google, Inc. (v4.0.0 featuring _2189_ icons)
- [`MaterialCommunityIcons`](https://materialdesignicons.com/) from MaterialDesignIcons.com (v6.5.95 including _6596_ icons)
- [`Octicons`](http://octicons.github.com) designed by Github, Inc. (v16.3.1 with _250_ icons)
- [`Zocial`](http://zocial.smcllns.com/) by Sam Collins (v1.4.0 with _100_ icons)
- [`SimpleLineIcons`](https://simplelineicons.github.io/) crafted by Sabbir & Contributors (v2.5.5 with _189_ icons)

## Installation

1. Install the packages for the icons you want use
   ```sh
   npm install --save @react-native-vector-icons/fontawesome6 @react-native-vector-icons/evilicons
   ```
2. Depending on the platform you're targeting (iOS/Android/Windows), follow the appropriate setup instructions.
3. If you're planning to use FontAwesome 5 or 6 icons, refer to these guides: [FontAwesome 5](packages/fontawesome5/README.md) | [FontAwesome 6](packages/fontawesome6/README.md)

### iOS Setup

To use the bundled icons on iOS, follow these steps:

1. Update your pods
  ```sh
  cd ios && pod update
  ```

### macOS Setup

TBA: It should just work???

### Windows Setup

TBA: It should just work???

### Web Setup

FIXME: Can we improve on this?

To integrate the library with your web project using [webpack](https://webpack.js.org/), follow these steps:

1.  In your webpack configuration file, add a section to handle TTF files using `url-loader` or `file-loader`:

    ```js
    {
      test: /\.ttf$/,
      loader: "url-loader", // or directly file-loader
      include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
    }
    ```

2.  In your JavaScript entry point, consume the font files and inject the necessary style tag:

        ```js
          import Icon from '@react-native-vector-icons/fontAwesome';

          // Generate the required CSS
          import iconFont from '@react-native-vector-icons/fontawesome/fonts/FontAwesome.ttf';
          const iconFontStyles = `@font-face {
            src: url(${iconFont});
            font-family: FontAwesome;
          }`;

          // Create a stylesheet
          const style = document.createElement('style');
          style.type = 'text/css';

          // Append the iconFontStyles to the stylesheet
          if (style.styleSheet) {
            style.styleSheet.cssText = iconFontStyles;
          } else {
            style.appendChild(document.createTextNode(iconFontStyles));
          }

          // Inject the stylesheet into the document head
          document.head.appendChild(style);
          ```

    By following these steps, you will seamlessly integrate the vector icons
    library into your web project using [webpack](https://webpack.js.org/),
    enabling you to effortlessly use the icons within your web application.

## `Icon` Component

You can either use one of the bundled icons above or roll your own custom font.

```js
import Icon from '@react-native-vector-icons/fontawesome';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
```

### Properties

Any [Text property](https://reactnative.dev/docs/text.html) and the following:

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

### `createIconSet(glyphMap, fontFamily[, fontFile])`

Returns your own custom font based on the `glyphMap` where the key is the icon
name and the value is either a UTF-8 character or it's character code.
`fontFamily` is the name of the font **NOT** the filename. Open the font in
Font Book.app or similar to learn the name. Optionally pass the third
`fontFile` argument for android support, it should be the custom font file
name.

```js
import { createIconSet } from 'react-native-vector-icons';
const glyphMap = { 'icon-name': 1234, test: '∆' };
const Icon = createIconSet(glyphMap, 'FontName', 'font-name.ttf');
```

### `createIconSetFromFontello(config[, fontFamily[, fontFile]])`

Convenience method to create a custom font based on a
[fontello](http://fontello.com) config file. Don't forget to import the font as
described above and drop the `config.json` somewhere convenient in your
project.

```js
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from './config.json';
const Icon = createIconSetFromFontello(fontelloConfig);
```

### `createIconSetFromIcoMoon(config[, fontFamily[, fontFile]])`

```js
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './selection.json';
const Icon = createIconSetFromIcoMoon(
  icoMoonConfig,
  'LineAwesome',
  'line-awesome.ttf'
);
```

Make sure you're using the _Download_ option in
[IcoMoon](https://icomoon.io/app), and use the `.json` file that's included in
the `.zip` you've downloaded. You'll also need to import the `.ttf` font file
into your project, following the instructions above.

### `createMultiStyleIconSet(styles [, options])`

```jsx
import { createMultiStyleIconSet } from 'react-native-vector-icons';

/*
 * This is just example code, you are free to
 * design your glyphmap and styles to your liking
 */

import glyphmap from './glyphmap.json';
/*
 * glyphmap = {
 *   "style1": [
 *     "hello",
 *     "world"
 *   ],
 *   "style2": [
 *     "foo",
 *     "bar"
 *   ]
 * }
 */

const glyphKeys = Object.keys(glyphmap); /* ["style1", "style2"] */
const options = {
  defaultStyle: 'style1',
  glyphValidator: (name, style) => glyphKeys.indexOf(name) !== -1,
  fallbackFamily: (name) => {
    for (let i = 0; i < glyphKeys.length; i++) {
      const style = glyphKeys[i];
      if (glyphmap[style].indexOf(name) !== -1) {
        return style;
      }
    }

    /* Always return some family */
    return glyphKeys[0];
  }
};

/*
 * The styles object consits of keys, which will be
 * used as the styles later, and objects which are
 * used as style objects for the font. The style
 * should have unique characteristics for each font
 * in order to ensure that the right one will be
 * chosen. FontAwesome 5 uses font weight since
 * 5.7.0 in order to diffirentiate the styles but
 * other properties (like fontFamily) can be used.
 * It's just a standard RN style object.
 */
const styles = {
  style1: {
    fontWeight: '700'
  },
  style2: {
    fontWeight: '100'
  }
};

const Icon = createMultiStyleIconSet(styles, options);

/* Uses default style (style1) */
<Icon name={'hello'} />
<Icon name={'world'} style1 />
/* Default style is style1 but this will fall back to style2 */
<Icon name={'foo'} />
/* This will also fall back to style2 */
<Icon name={'foo'} style1 />
/* Regular use of style2 */
<Icon name={'bar'} style2 />
```

| option         | Description                                                                                                                                                                                | default                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| defaultStyle   | The name of the style to be used if no style is supplied during rendering.                                                                                                                 | `Object.keys(styles)[0]`           |
| fallbackFamily | Function for selecting a family if a glyph is not available. The function should accept the `name` of the glyph as a parameter. Returns the name if the family.                            | `(name) => Object.keys(styles)[0]` |
| glyphValidator | Function for validating that a glyph is available for a chosen style. It has `name` and `style` as parameters, in that order. Returns `true` if the glyph is valid or `false` if it's not. | `(name, style) => true`            |

#### iOS

You have to manually make a reference of your `.ttf` on your xcodeproj `Resources` folder and in `Info.plist`.

## Animation

React Native comes with an amazing animation library called
[`Animated`](https://reactnative.dev/docs/animated.html). To use it with an
icon, simply create an animated component with this line: `const AnimatedIcon =
Animated.createAnimatedComponent(Icon)`. You can also use the higher level
animation library
[react-native-animatable](https://github.com/oblador/react-native-animatable).

## Usage Examples

### IconExplorer

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

## Generating Your Own Icon Package

See [CREATE_FONT_PACKAGE.md] to learn how to create your own font packages.

## [Changelog](https://github.com/react-native-vector-icons/react-native-vector-icons/releases)

## License

This project is licenced under the [MIT License](http://opensource.org/licenses/mit-license.html).

Any bundled fonts are copyright to their respective authors and mostly under MIT or [SIL OFL](http://scripts.sil.org/OFL).
