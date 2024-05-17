# FontAwesome 6 Pro

## Installing the Pro Fonts

You need your FontAwesome npm token which can be obtained by logging into your
account and then access the `Services` tab.

Run `yarn fa6-upgrade` and enter the token
when asked to in order to upgrade to the Pro version. It will install the fonts
in your repo in the `rnvi-fonts` directory but the folder can be customized by
setting it when executing the command: `yarn fa6-upgrade [destination]`.

### Manually

If the shell script does not work you can install the Pro version manually.
All you really need to do is adding the Pro fonts to the `rnvi-fonts` directory.

## Usage

Using the standard icons works just like the standard icons in this library.

```javascript
import FontAwesome6Pro from '@react-native-vector-icons/fontawesome6-pro';

const icon = <FontAwesome6Pro name="comments" />;
```

Something special about the FontAwesome6Pro class is that you can also pass props
to change the style of the icon:

```javascript
import FontAwesome6Pro from '@react-native-vector-icons/fontawesome6-pro';

const icon = <FontAwesome6Pro name="comments" iconStyle="solid" />;
const icon = <FontAwesome6Pro name="git" iconStyle="brand" />;
```

**Valid types**

| Type           | Description               |
| -------------- | ------------------------- |
| **brand**      | Uses the Brands font      |
| **solid**      | Uses the Solid font       |
| **light**      | Uses the Light font       |
| **thin**       | Uses the Thin font        |
| **duotone**    | Uses the Duotone font     |
| **sharpSolid** | Uses the Sharp Solid font |
| **sharpThin**  | Uses the Sharp Thin font  |
| **sharpLight** | Uses the Sharp Light font |
| **sharp**      | Uses the Sharp font       |

No specified type indicates Regular font.

### getImageSource

`getImageSource` works a little different due to its native backend and how the
font is separated into different files. An extra argument to specify the font
style is required.

```javascript
import FontAwesome6Pro from '@react-native-vector-icons/fontawesome6-pro';

FontAwesome6Pro.getImageSource('solid', 'comments', 30, '#000').then(
  (source) => this.setState({ image: source })
);
```
