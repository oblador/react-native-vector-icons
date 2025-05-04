# React Native Vector Icons - Fontello

React Native Vector Icons font package to support using custom fonts created with [Fontello](https://fontello.com)

See the [React Native Vector Icons README](../../README.md) for more details.

## Installation

```sh
npm install @react-native-vector-icons/fontello
```

## Usage

1. Add the config.json somewhere in your project to be imported
2. Add the ttf file into `rnvi-fonts`. You can customise this location as described in [react-native-vector-icons](../../README.md#custom-fonts)
3. Add this package to your project

```sh
pnpm install @react-native-vector-icons/fontello
```

4. Create the component in your project and use it

```js
import createIconSet from '@react-native-vector-icons/fontello';
import fontelloConfig from './config.json';
const Icon = createIconSet(fontelloConfig);

cont icon = <Icon name="comments" />;
```

If you want to customise the font postscript name and filename you can pass extra arguments.

```js
import createIconSet from '@react-native-vector-icons/fontello';
import fontelloConfig from './config.json';
const Icon = createIconSet(fontelloConfig, 'Font Family', 'FontFamily.ttf');
```

## Contributing

See the [contributing guide](../../CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
