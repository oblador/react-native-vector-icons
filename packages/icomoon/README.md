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
1. Add this package to your project

```sh
npm install @react-native-vector-icons/icomoon
```

4. Create the component in your project and use it

```js
import createIconSet from '@react-native-vector-icons/icomoon';
import icoMoonConfig from './IcoMoon-Free.json';
const Icon = createIconSet(icoMoonConfig);

cont icon = <Icon name="comments" />;
```

If you want to customise the font postscript name and filename you can pass extra arguments.

```js
import createIconSet from "@react-native-vector-icons/icomoon";
import icoMoonConfig from "./IcoMoon-Free.json";
const Icon = createIconSet(icoMoonConfig, "Font Family", "FontFamily.ttf");
```

## Contributing

See the [contributing guide](../../CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
