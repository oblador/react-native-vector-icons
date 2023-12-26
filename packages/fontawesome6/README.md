# FontAwesome 6

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
| **sharpThin**  | Uses the Sharp Thin font (pro) or Regular (Free) |
| **sharpLight** | Uses the Sharp Light font (pro) or Regular (Free) |
| **sharp**      | Uses the Sharp font (pro) or Regular (Free)       |

No specified type indicates Regular font.

## getImageSource

`getImageSource` works a little different due to its native backend and how
the font is separated into different files. Therefore, the enum FA6Style is
defined to help setting the style of the font:

```javascript
const FA6Style = {
  regular: 'regular',
  light: 'light',
  solid: 'solid',
  brand: 'brand',
  sharp: 'sharp',
  sharpThin: 'sharpThin',
  sharpLight: 'sharpLight',
  sharpSolif: 'sharpSolid',
  duotone: 'duotone',
  thin: 'thin',
};
```

Use this to select which style the generated image should have:

```javascript
import FontAwesome6, { FA6Style } from 'react-native-vector-icons/FontAwesome6';

FontAwesome6.getImageSource('comments', 30, '#000', FA6Style.solid).then(
  (source) => this.setState({ image: source })
);
```

Not passing a style will result in Regular style.

# Upgrading to Pro

Use the `@react-native-vector-icons/fontawesome6-pro` package instead.
