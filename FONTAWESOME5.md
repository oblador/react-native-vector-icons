# FontAwesome 5

FontAwesome 5 is split into three different font files which makes it somewhat
harder to use in some cases. The implemented solution should be fairly
straightforward to use after it has been setup.
Android and iOS handles fonts differently which is why it could be
easily implemented without any additional setup.

### Table of Content

- [`Usage`](#usage)
- [`Upgrading to Pro`](#upgrading-to-pro)

# Usage

Using the standard icons works just like the standard icons in this library.

```javascript
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const icon = <FontAwesome5 name={'comments'} />;
```

Something special about the FontAwesome5 class is that you can also pass props
to change the style of the icon:

```javascript
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const icon = <FontAwesome5 name={'comments'} solid />;
const icon = <FontAwesome5 name={'git'} brand />;
```

**Valid types**

| Type      | Description                                 |
| --------- | ------------------------------------------- |
| **brand** | Uses the Brands font                        |
| **light** | Uses the Light font (pro) or Regular (Free) |
| **solid** | Uses the Solid font                         |

No specified type indicates Regular font.

Button, TabBarItem etc. works the same way:

```javascript
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const regular_icon_btn = <FontAwesome5.Button name={'comments'} />;
const solid_icon_btn = <FontAwesome5.Button name={'comments'} solid />;
```

## getImageSource

`getImageSource` works a little different due to its native backend and how
the font is separated into different files. Therefore, the enum FA5Style is
defined to help setting the style of the font:

```javascript
const FA5Style = {
  regular: 0,
  light: 1,
  solid: 2,
  brand: 3,
};
```

Use this to select which style the generated image should have:

```javascript
import FontAwesome5, { FA5Style } from 'react-native-vector-icons/FontAwesome5';

FontAwesome5.getImageSource(
  'comments',
  30,
  '#000',
  FA5Style.solid
).then(source => this.setState({ image: source }));
```

Not passing a style will result in Regular style.

# Upgrading to Pro

You need your FontAwesome npm token which can be obtained by logging into your
account and then access the `Services` tab.

Run `./node_modules/.bin/fa5-upgrade` and enter the token when asked to in order to
upgrade to the Pro version.

## Manually

If the shell script does not work you can install the Pro version manually.
All you really need to do is adding the Pro fonts to your project, there is
instructions on how to do this in main README.md.

## Using the Pro version

Just as easy as using the Free icons, just include the icon set like this:

```javascript
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';

const icon = <FontAwesome5Pro name={'comments'} light />;
```
