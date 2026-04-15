# React Native Vector Icons - Fontello

React Native Vector Icons font package to support using custom fonts created with [Fontello](https://fontello.com)

See the [React Native Vector Icons README](../../README.md) for more details.

## Installation

```sh
npm install @react-native-vector-icons/fontello
```

## Usage

1. Add the config.json somewhere in your project to be imported
2. Add the ttf file into `rnvi-fonts/fontello`. You can customise this location as described in [react-native-vector-icons](../../README.md#custom-fonts)
3. Create the component in your project and use it

```js
import createIconSet from '@react-native-vector-icons/fontello';
import fontelloConfig from './config.json';
const Icon = createIconSet(fontelloConfig);

const icon = <Icon name="comments" />;
```

If you want to customise the font postscript name and filename you can pass extra arguments.

```js
import createIconSet from "@react-native-vector-icons/fontello";
import fontelloConfig from "./config.json";
const Icon = createIconSet(fontelloConfig, "Font Family", "FontFamily.ttf");
```

### Type-checked icon names

You can pass a union of icon names as a generic parameter to get type-checking and autocomplete on the `name` prop:

```tsx
import createIconSet from '@react-native-vector-icons/fontello';
import fontelloConfig from './config.json';
const Icon = createIconSet<'home' | 'settings' | 'user'>(fontelloConfig);

<Icon name="home" />     // ok
<Icon name="invalid" />  // type error
```

### Expo Config Plugin

This package ships an [Expo config plugin](../../docs/SETUP-EXPO.md) to register the font with iOS. Add it to the `plugins` array in your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": ["@react-native-vector-icons/fontello"]
  }
}
```

## Contributing

See the [contributing guide](../../CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
