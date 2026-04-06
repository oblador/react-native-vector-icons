# React Native Vector Icons - Octicons

Octicons font for React Native Vector Icons

See the [React Native Vector Icons README](../../README.md) for more details.

## Installation

```sh
npm install @react-native-vector-icons/octicons
```

## Usage

```jsx
import { Octicons } from '@react-native-vector-icons/octicons/static';
// or with dynamic font loading (see the Expo setup guide for details)
import { Octicons } from '@react-native-vector-icons/octicons';

// ...

<Octicons name="house" color="#ff0000" size={20} />
```


### Expo Config Plugin

This package ships an [Expo config plugin](../../docs/SETUP-EXPO.md). Add it to the `plugins` array in your `app.json` or `app.config.js` if you use static imports:

```json
{
  "expo": {
    "plugins": ["@react-native-vector-icons/octicons"]
  }
}
```

## Versions

Prior to version 12, the version of this font package tracked the upstream version.

The table below tracks which font version is included in each package version.

| RNVI version | Upstream version |
| ------------ | ---------------- |
| &gt; 12.0.0 | 19.15.0 |
| &gt; 12.0.1 | 19.15.3 |
| &gt; 20.4.1 | 19.22.0 |
| &gt; 21.0.0 | 19.23.1 |

## Contributing

See the [contributing guide](../../CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
