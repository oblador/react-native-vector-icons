# @react-native-vector-icons/phosphor

Phosphor icon set for [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons).

1530 icons from [Phosphor Icons](https://phosphoricons.com/) (regular style).

## Installation

```sh
npm install @react-native-vector-icons/phosphor
```

Follow the [setup guide](https://github.com/oblador/react-native-vector-icons#installation) for iOS and Android.

## Usage

```tsx
import Phosphor from '@react-native-vector-icons/phosphor';

// Dynamic font loading
<Phosphor name="airplane" size={24} color="#000" />

// Static font loading
import Phosphor from '@react-native-vector-icons/phosphor/static';
<Phosphor name="airplane" size={24} color="#000" />
```

### Expo

Add to your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": ["@react-native-vector-icons/phosphor"]
  }
}
```

## License

MIT — Icon designs by [Phosphor Icons](https://github.com/phosphor-icons/web) (MIT)
