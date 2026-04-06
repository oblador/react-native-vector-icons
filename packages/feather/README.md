# React Native Vector Icons - Feather

Feather font for React Native Vector Icons

See the [React Native Vector Icons README](../../README.md) for more details.

## Installation

```sh
npm install @react-native-vector-icons/feather
```

## Usage

```jsx
import { Feather } from '@react-native-vector-icons/feather/static';
// or with dynamic font loading (see the Expo setup guide for details)
import { Feather } from '@react-native-vector-icons/feather';

// ...

<Feather name="house" color="#ff0000" size={20} />
```


### Expo Config Plugin

This package ships an [Expo config plugin](../../docs/SETUP-EXPO.md). Add it to the `plugins` array in your `app.json` or `app.config.js` if you use static imports:

```json
{
  "expo": {
    "plugins": ["@react-native-vector-icons/feather"]
  }
}
```

## Versions

Prior to version 12, the version of this font package tracked the upstream version.

The table below tracks which font version is included in each package version.

| RNVI version | Upstream version |
| ------------ | ---------------- |
| &gt; 12.0.0 | 4.29.2 |

## Contributing

See the [contributing guide](../../CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
