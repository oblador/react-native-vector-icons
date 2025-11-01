# React Native Vector Icons - Fontawesome Pro Thin

Fontawesome Pro Thin font for React Native Vector Icons

See the [React Native Vector Icons README](../../README.md) for more details.

> [!IMPORTANT]
> This package does not include the fonts. You must provide them yourself.

## Installation

```sh
npm install @react-native-vector-icons/fontawesome-pro-thin
```

## Custom Fonts

This package requires you to provide the font files. Place your `.ttf` font
file in the following location:

```
rnvi-fonts/fontawesome-pro-thin/fa-thin-100.ttf
```

The font will be automatically copied during the build process for both iOS and
Android.

## Usage

```jsx
import { FontAwesomeProThin } from '@react-native-vector-icons/fontawesome-pro-thin';

// ...

<FontAwesomeProThin name="house" color="#ff0000" size={20} />
```

## Versions

Prior to version 12, the version of this font package tracked the upstream version.

The table below tracks which font version is included in each package version.

| RNVI version | Upstream version |
| ------------ | ---------------- |
| &gt; 1.0.0 | 7.1.0 |

## Contributing

See the [contributing guide](../../CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
