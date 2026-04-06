# React Native Vector Icons - IcoMoon

React Native Vector Icons font package to support [IcoMoon fonts](https://icomoon.io/app)

See the [React Native Vector Icons README](../../README.md) for more details.

## Installation

```sh
npm install @react-native-vector-icons/icomoon
```

## Usage

1. Add the config.json somewhere in your project to be imported
1. Add the ttf file into `rnvi-fonts/icomoon`. You can customise this location as described in [react-native-vector-icons](../../README.md#custom-fonts)
1. Create the component in your project and use it

```js
import createIconSet from '@react-native-vector-icons/icomoon';
import icoMoonConfig from './IcoMoon-Free.json';
const Icon = createIconSet(icoMoonConfig);

const icon = <Icon name="comments" />;
```

If you want to customise the font postscript name and filename you can pass extra arguments.

```js
import createIconSet from "@react-native-vector-icons/icomoon";
import icoMoonConfig from "./IcoMoon-Free.json";
const Icon = createIconSet(icoMoonConfig, "Font Family", "FontFamily.ttf");
```

### Expo Config Plugin

This package ships an [Expo config plugin](../../docs/SETUP-EXPO.md) to register the font with iOS. Add it to the `plugins` array in your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": ["@react-native-vector-icons/icomoon"]
  }
}
```

## Contributing

See the [contributing guide](../../CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
