# React Native Vector Icons - Fontawesome Free Solid

Fontawesome Free Solid font for React Native Vector Icons

See the [React Native Vector Icons README](../../README.md) for more details.

## Installation

```sh
npm install @react-native-vector-icons/fontawesome-free-solid
```

## Usage

```jsx
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid/static';
// or with dynamic font loading (see the Expo setup guide for details)
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';

// ...

<FontAwesomeFreeSolid name="house" color="#ff0000" size={20} />
```


### Expo Config Plugin

This package ships an [Expo config plugin](../../docs/SETUP-EXPO.md). Add it to the `plugins` array in your `app.json` or `app.config.js` if you use static imports:

```json
{
  "expo": {
    "plugins": ["@react-native-vector-icons/fontawesome-free-solid"]
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
