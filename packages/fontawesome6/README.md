# FontAwesome 6

### Table of Content

- [`Usage`](#usage)
- [`Upgrading to Pro`](#upgrading-to-pro)

# Usage

Using the standard icons works just like the standard icons in this library.

```javascript
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6/static";
// or with dynamic font loading (see the Expo setup guide for details)
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";

const icon = <FontAwesome6 name="comments" />;
```

Something special about the FontAwesome6 class is that you can also pass props
to change the style of the icon:

```javascript
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";

const icon = <FontAwesome6 name="comments" iconStyle="solid" />;
const icon = <FontAwesome6 name="git" iconStyle="brand" />;
```

**Valid types**

| Type        | Description           |
| ----------- | --------------------- |
| **regular** | Uses the Regular font |
| **brand**   | Uses the Brands font  |
| **solid**   | Uses the Solid font   |

No specified type indicates Regular font.

## getImageSource

`getImageSource` works a little different due to its native backend and how the
font is separated into different files. An extra argument to specify the font
style is required.

Use this to select which style the generated image should have:

```javascript
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";

FontAwesome6.getImageSource("solid", "comments", 30, "#000").then((source) =>
  this.setState({ image: source }),
);
```

### Expo Config Plugin

This package ships an [Expo config plugin](../../docs/SETUP-EXPO.md). Add it to the `plugins` array in your `app.json` or `app.config.js` if you use static imports:

```json
{
  "expo": {
    "plugins": ["@react-native-vector-icons/fontawesome6"]
  }
}
```

# Upgrading to Pro

Use the `@react-native-vector-icons/fontawesome6-pro` package instead.
