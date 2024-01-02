# FontAwesome 5

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

FontAwesome5.getImageSource('comments', 30, '#000', FA5Style.solid).then(
  (source) => this.setState({ image: source })
);
```

Not passing a style will result in Regular style.

# Upgrading to Pro

Use the `@react-native-vector-icons/fontawesome5-pro` package instead.
