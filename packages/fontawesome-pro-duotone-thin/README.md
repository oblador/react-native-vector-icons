# React Native Vector Icons - Fontawesome Pro Duotone Thin

Fontawesome Pro Duotone Thin font for React Native Vector Icons

See the [React Native Vector Icons README](../../README.md) for more details.

> [!IMPORTANT]
> This package does not include the fonts. You must provide them yourself.

## Installation

```sh
npm install @react-native-vector-icons/fontawesome-pro-duotone-thin
```

## Custom Fonts

This package requires you to provide the font files. Place your `.ttf` font
file in the following location:

```
rnvi-fonts/fontawesome-pro-duotone-thin/fa-duotone-thin-100.ttf
```

The font will be automatically copied during the build process for both iOS and
Android.

## Usage

```jsx
import { FontAwesomeProDuotoneThin } from '@react-native-vector-icons/fontawesome-pro-duotone-thin';

// ...

<FontAwesomeProDuotoneThin name="house" color="#ff0000" size={20} />
```


### Expo Config Plugin

This package ships an [Expo config plugin](../../docs/SETUP-EXPO.md) to register the font with iOS. Add it to the `plugins` array in your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": ["@react-native-vector-icons/fontawesome-pro-duotone-thin"]
  }
}
```

## Versions

Prior to version 12, the version of this font package tracked the upstream version.

The table below tracks which font version is included in each package version.

| RNVI version | Upstream version |
| ------------ | ---------------- |
| &gt; 0.1.0 | 7.1.0 |
| &gt; 0.1.1 | 7.2.0 |

## Contributing

See the [contributing guide](../../CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
