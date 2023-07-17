# FontAwesome 6

FontAwesome 6 is split into multiple font files which makes it somewhat
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
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const icon = <FontAwesome6 name={'comments'} />;
```

Something special about the FontAwesome6 class is that you can also pass props
to change the style of the icon:

```javascript
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const icon = <FontAwesome6 name={'comments'} solid />;
const icon = <FontAwesome6 name={'git'} brand />;
```

**Valid types**

| Type           | Description                                       |
| -------------- | ------------------------------------------------- |
| **brand**      | Uses the Brands font                              |
| **solid**      | Uses the Solid font                               |
| **light**      | Uses the Light font (pro) or Regular (Free)       |
| **thin**       | Uses the Thin font (pro) or Regular (Free)        |
| **duotone**    | Uses the Duotone font (pro) or Regular (Free)     |
| **sharpSolid** | Uses the Sharp Solid font (pro) or Regular (Free) |

No specified type indicates Regular font.

Button works the same way:

```javascript
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const regular_icon_btn = <FontAwesome6.Button name={'comments'} />;
const solid_icon_btn = <FontAwesome6.Button name={'comments'} solid />;
```

## getImageSource

`getImageSource` works a little different due to its native backend and how
the font is separated into different files. Therefore, the enum FA6Style is
defined to help setting the style of the font:

```javascript
const FA6Style = {
  regular: 0,
  light: 1,
  solid: 2,
  brand: 3,
  light: 4,
  duotone: 5,
  sharpSolid: 6,
};
```

Use this to select which style the generated image should have:

```javascript
import FontAwesome6, { FA6Style } from 'react-native-vector-icons/FontAwesome6';

FontAwesome6.getImageSource(
  'comments',
  30,
  '#000',
  FA6Style.solid
).then(source => this.setState({ image: source }));
```

Not passing a style will result in Regular style.

# Upgrading to Pro

You need your FontAwesome npm token which can be obtained by logging into your
account and then access the `Services` tab.

Run `yarn fa6-upgrade` or `./node_modules/.bin/fa6-upgrade` and enter the token
when asked to in order to upgrade to the Pro version. It will install the fonts
in your repo in the `assets/fonts` directory but the folder can be customized by
setting it when executing the command: `yarn fa6-upgrade [destination]`.

## Manually

If the shell script does not work you can install the Pro version manually.
All you really need to do is adding the Pro fonts to your project, there is
instructions on how to do this in main README.md.

## Using the Pro version

Just as easy as using the Free icons, just include the icon set like this:

```javascript
import FontAwesome6Pro from 'react-native-vector-icons/FontAwesome6Pro';

const icon = <FontAwesome6Pro name={'comments'} light />;
```
