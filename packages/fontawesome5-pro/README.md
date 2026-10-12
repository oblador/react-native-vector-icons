# FontAwesome 5 Pro

## Installing the Pro Fonts

You need your FontAwesome npm token which can be obtained by logging into your
account and then access the `Services` tab.

Run `npx fa-upgrade5` and enter the token
when asked to in order to upgrade to the Pro version. It will install the fonts
in your repo in the `rnvi-fonts/fontawesome5-pro` directory. The top-level `rnvi-fonts` folder name can be customized by
setting it when executing the command: `npx fa-upgrade5 [destination]` and setting the `fontDir` in `package.json`.

### Manually

If the shell script does not work you can install the Pro version manually.
Copy the Pro fonts into `rnvi-fonts/fontawesome5-pro` and rename them exactly as
shown below. Android loads these fonts by filename, so keeping the original
Font Awesome npm filenames causes the icons to render incorrectly.

| Font Awesome npm filename | Required filename              |
| ------------------------- | ------------------------------ |
| `fa-brands-400.ttf`       | `FontAwesome5_Pro_Brands.ttf`  |
| `fa-duotone-900.ttf`      | `FontAwesome5_Pro_Duotone.ttf` |
| `fa-light-300.ttf`        | `FontAwesome5_Pro_Light.ttf`   |
| `fa-regular-400.ttf`      | `FontAwesome5_Pro_Regular.ttf` |
| `fa-solid-900.ttf`        | `FontAwesome5_Pro_Solid.ttf`   |

## Usage

Using the standard icons works just like the standard icons in this library.

```javascript
import { FontAwesome5Pro } from "@react-native-vector-icons/fontawesome5-pro";

const icon = <FontAwesome5Pro name="comments" />;
```

Something special about the FontAwesome5Pro class is that you can also pass props
to change the style of the icon:

```javascript
import { FontAwesome5Pro } from "@react-native-vector-icons/fontawesome5-pro";

const icon = <FontAwesome5Pro name="comments" iconStyle="solid" />;
const icon = <FontAwesome5Pro name="git" iconStyle="brand" />;
```

**Valid types**

| Type        | Description           |
| ----------- | --------------------- |
| **regular** | Uses the Regular font |
| **brand**   | Uses the Brands font  |
| **solid**   | Uses the Solid font   |
| **light**   | Uses the Light font   |
| **duotone** | Uses the Duotone font |

No specified type indicates Regular font.

### getImageSource

`getImageSource` works a little different due to its native backend and how the
font is separated into different files. An extra argument to specify the font
style is required.

Use this to select which style the generated image should have:

```javascript
import { FontAwesome5Pro } from "@react-native-vector-icons/fontawesome5-pro";

FontAwesome5Pro.getImageSource("solid", "comments", 30, "#000").then((source) =>
  this.setState({ image: source }),
);
```

### Expo Config Plugin

This package ships an [Expo config plugin](../../docs/SETUP-EXPO.md) to register the font with iOS. Add it to the `plugins` array in your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": ["@react-native-vector-icons/fontawesome5-pro"]
  }
}
```
