![Vector Icons for React Native](https://cloud.githubusercontent.com/assets/378279/12009887/33f4ae1c-ac8d-11e5-8666-7a87458753ee.png)

[![npm](https://img.shields.io/npm/v/@react-native-vector-icons/common.svg)](https://npmjs.com/package/@react-native-vector-icons/common) [![npm](https://img.shields.io/npm/dm/@react-native-vector-icons/common.svg)](https://npmjs.com/package/@react-native-vector-icons/common)

> **AI/LLM users:** Complete documentation is available at [`llms-full.txt`](https://react-native-vector-icons.org/llms-full.txt). See [`llms.txt`](https://react-native-vector-icons.org/llms.txt) for a structured index.

# React Native Vector Icons

Elevate your React Native applications with the power of customizable vector
icons. Ideal for embellishing buttons, logos, and navigation or tab bars, these
icons seamlessly integrate into your projects. Their versatility makes
extension and styling effortless.

**[Browse all icons](https://react-native-vector-icons.org/directory) · [Full documentation](https://react-native-vector-icons.org)**

> [!TIP]
> If you are still using the old single package `react-native-vector-icons` visit <https://github.com/oblador/react-native-vector-icons/tree/10.x>. To migrate to the package-per-icon-set approach, see the [Migration Guide](https://react-native-vector-icons.org/migration).

## Available Icon Sets

### Actively maintained

- [`AntDesign`](https://ant.design/components/icon) from Ant Group (v4.4.2 with _449_ icons)
- [`Feather`](http://feathericons.com) created by Cole Bemis & Contributors (v4.29.2 featuring _287_ icons)
- [`FontAwesome`](https://fontawesome.com/search) designed by Fonticons, Inc. (v7.2.0 featuring _2,806_ free and _75,767_ pro icons)
- [`Foundation`](http://zurb.com/playground/foundation-icon-fonts-3) by ZURB, Inc. (v3.0 with _283_ icons)
- [`Ionicons`](https://ionic.io/ionicons) crafted by Ionic (v8.0.9 containing _1,357_ icons)
- [`MaterialDesignIcons`](https://pictogrammers.com/library/mdi/) from MaterialDesignIcons.com (v7.4.47 including _7448_ icons)
- [`Octicons`](https://primer.style/foundations/icons) designed by GitHub, Inc. (v19.22.0 with _369_ icons)
- [`Lucide`](https://lucide.dev/) designed by Lucide, (v0.576.0 with _1,950_ icons)

### No longer maintained upstream

- [`Entypo`](http://entypo.com) · [`EvilIcons`](http://evil-icons.io) · [`FontAwesome 4`](https://fontawesome.com/v4/icons) · [`FontAwesome 5`](https://fontawesome.com/v5/search) · [`FontAwesome 6`](https://fontawesome.com/search) · [`Fontisto`](https://github.com/kenangundogan/fontisto) · [`MaterialIcons`](https://fonts.google.com/icons?icon.set=Material+Icons) · [`SimpleLineIcons`](https://simplelineicons.github.io/) · [`Zocial`](https://smcllns.github.io/css-social-buttons)

You can also [search NPM](https://www.npmjs.com/search?q=keywords%3Areact-native-vector-icons-icon) for third-party icons.

## Quick Start

```sh
npm install @react-native-vector-icons/feather
```

```jsx
import { Feather } from "@react-native-vector-icons/feather/static";

<Feather name="heart" size={24} color="#06b6d4" />;
```

For detailed setup instructions, see the [Getting Started](https://react-native-vector-icons.org/getting-started) guide.

## Documentation

Visit **[react-native-vector-icons.org](https://react-native-vector-icons.org)** for the full documentation:

- [Getting Started](https://react-native-vector-icons.org/getting-started) — Installation and platform-specific setup
- [Usage](https://react-native-vector-icons.org/usage) — Icon component, props, styling, PNG images
- [Icon Directory](https://react-native-vector-icons.org/directory) — Browse and search all icons
- [Advanced](https://react-native-vector-icons.org/advanced) — Custom fonts, animation, dynamic loading
- [Testing](https://react-native-vector-icons.org/testing) — Jest configuration and mocking
- [Migration](https://react-native-vector-icons.org/migration) — Upgrading from older versions

## Sponsorship

Should you find this library beneficial, kindly contemplate the option of
[sponsoring](https://github.com/sponsors/oblador).

## [Changelog](https://github.com/oblador/react-native-vector-icons/releases)

## License

This project is licenced under the [MIT License](http://opensource.org/licenses/mit-license.html).

Any bundled fonts are copyright to their respective authors and mostly under MIT or [SIL OFL](http://scripts.sil.org/OFL).
