# FontAwesome 5 Pro

## Installing the Pro Fonts

You need your FontAwesome npm token which can be obtained by logging into your
account and then access the `Services` tab.

Run `yarn fa5-upgrade` and enter the token
when asked to in order to upgrade to the Pro version. It will install the fonts
in your repo in the `rnvi-fonts` directory but the folder can be customized by
setting it when executing the command: `yarn fa5-upgrade [destination]`.

### Manually

If the shell script does not work you can install the Pro version manually.
All you really need to do is adding the Pro fonts to the `rnvi-fonts` directory.

## Usage

Using the standard icons works just like the standard icons in this library.

```javascript
import FontAwesome5Pro from '@react-native-vector-icons/fontawesome5-pro';

const icon = <FontAwesome5Pro name="comments" />;
```

Something special about the FontAwesome5Pro class is that you can also pass props
to change the style of the icon:

```javascript
import FontAwesome5Pro from '@react-native-vector-icons/fontawesome5-pro';

const icon = <FontAwesome5Pro name="comments" iconStyle="solid" />;
const icon = <FontAwesome5Pro name="git" iconStyle="brand" />;
```

**Valid types**

| Type         | Description               |
| ------------ | --------------------- |
| **regular**  | Uses the Regular font |
| **brand**    | Uses the Brands font  |
| **solid**    | Uses the Solid font   |
| **light**    | Uses the Light font   |
| **duotone**  | Uses the Duotone font |

No specified type indicates Regular font.

### getImageSource

`getImageSource` works a little different due to its native backend and how the
font is separated into different files. An extra argument to specify the font
style is required.

Use this to select which style the generated image should have:

```javascript
import FontAwesome5Pro from '@react-native-vector-icons/fontawesome5-pro';

FontAwesome5Pro.getImageSource('solid', 'comments', 30, '#000').then(
  (source) => this.setState({ image: source })
);
```
