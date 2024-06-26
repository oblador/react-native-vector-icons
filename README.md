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
  - [React-native-web Setup](#react-native-web-setup)
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
[sponsoring](https://github.com/sponsors/oblador).

## Available Icon Sets

[Explore all icons](https://react-native-vector-icons.github.io/react-native-vector-icons/).

RNVI comes with the following supported icons. You can [search NPM](https://www.npmjs.com/search?q=keywords%3Areact-native-vector-icons-icon) for third party icons.

### Actively maintained fonts
- [`AntDesign`](https://ant.design/components/icon) from Ant Group (v4.4.2 with _449_ icons)
- [`Feather`](http://feathericons.com) created by Cole Bemis & Contributors (v4.29.2 featuring _287_ icons)
- [`FontAwesome 6`](https://fontawesome.com/search) designed by Fonticons, Inc. (v6.5.2 featuring _2045_ free and _30199_ pro icons)
- [`Foundation`](http://zurb.com/playground/foundation-icon-fonts-3) by ZURB, Inc. (v3.0 with _283_ icons)
- [`Ionicons`](https://ionic.io/ionicons) crafted by Ionic (v7.4.0 containing _1356_ icons)
- [`MaterialDesignIcons`](https://pictogrammers.com/library/mdi/) from MaterialDesignIcons.com (v7.4.47 including _7448_ icons)
- [`Octicons`](https://primer.style/foundations/icons) designed by Github, Inc. (v19.19.0 with _326_ icons)

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

See [MIGRATION.md](MIGRATION.md) if you are migrating from `react-native-vector-icons`

## Installation

1. Install the common package
   ```sh
   npm install --save @react-native-vector-icons/common
   ```
1. Install the packages for the icons you want use
   ```sh
   npm install --save @react-native-vector-icons/fontawesome6 @react-native-vector-icons/evilicons
   ```
1. Depending on the platform you're targeting (iOS/Android/Windows), follow the appropriate setup instructions.
1. If you are using one of the following fonts refer to their guides for further instructions
  * [FontAwesome 5](packages/fontawesome5/README.md)
  * [FontAwesome 5 Pro](packages/fontawesome5-pro/README.md)
  * [FontAwesome 6](packages/fontawesome6/README.md)
  * [FontAwesome 6 Pro](packages/fontawesome6-pro/README.md)
  * [Fontello](packages/fontello/README.md)
  * [Icomoon](packages/icomoon/README.md)

### android

Nothing else needed.

### iOS

To use the bundled icons on iOS, follow these steps:

1. Update your pods
  ```sh
  cd ios && pod update
  ```

### macOS

This needs more work, see details in #1624

### Windows

TBA: It should just work???

### React-native-web Setup

To port a react-native mobile app to web using `react-native-web` you just need to ensure the fonts are known on the web-app side.

You will need add the font-family for each font you use to your css

You can debug missing font-families by looking in the Developer console in your web browser when debugging your web app.

NOTE: if you're using webpack or similar you *may* need to configure webpack to handle loading of ttf fonts, using url-loader or file-loader. See [Web Setup](#web-setup) for more details.

In your `App.css` or similar add the font-family specifications:

```css
@font-face {
  src: url(path/to/fonts/Ionicons.ttf);
  font-family: "Ionicons";
}

@font-face {
  src: url(path/to/fonts/FontAwesome.ttf);
  font-family: "FontAwesome";
}

@font-face {
  src: url(path/to/fonts/FontAwesome5_Brands.ttf);
  font-family: "FontAwesome5_Brands";
  font-weight: 400; /* Regular weight */
  font-style: normal;
}

@font-face {
  src: url(path/to/fonts/FontAwesome5_Regular.ttf);
  font-family: "FontAwesome5_Regular";
  font-weight: 400; /* Regular weight */
  font-style: normal;
}

@font-face {
  src: url(path/to/fonts/FontAwesome5_Solid.ttf);
  font-family: "FontAwesome5_Solid";
  font-weight: 900; /* Bold weight for solid */
  font-style: normal;
}

@font-face {
  src: url(path/to/fonts/MaterialIcons.ttf);
  font-family: "MaterialIcons";
}

@font-face {
  src: url(path/to/fonts/Feather.ttf);
  font-family: "Feather";
}

@font-face {
  src: url(path/to/fonts/MaterialCommunityIcons.ttf);
  font-family: "MaterialCommunityIcons";
}

/* TODO: Add other icons fonts here */
```

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

The best approach is to use our icon generator to create your own icon package.

See [CREATE_FONT_PACKAGE.md] to learn how to create your own font packages.

You can also use `createIconSet(glyphMap, fontFamily[, fontFile])` directly in your project. This
returns your own custom font based on the `glyphMap` where the key is the icon
name and the value is either a UTF-8 character or it's character code.
`fontFamily` is the name of the postscript font **NOT** the filename. Open the font in
Font Book.app or similar to learn the name. Optionally pass the third
`fontFile` argument for android support, it should be the custom font file
name.

```js
import { createIconSet } from '@react-native-vector-icons/common';
const glyphMap = { 'icon-name': 1234, test: '∆' };
const Icon = createIconSet(glyphMap, 'FontName', 'font-name.ttf');
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

## [Changelog](https://github.com/react-native-vector-icons/react-native-vector-icons/releases)

## License

This project is licenced under the [MIT License](http://opensource.org/licenses/mit-license.html).

Any bundled fonts are copyright to their respective authors and mostly under MIT or [SIL OFL](http://scripts.sil.org/OFL).
