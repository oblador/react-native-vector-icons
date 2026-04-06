# React Native Vector Icons - <%= name %>

<%= name %> font for React Native Vector Icons

See the [React Native Vector Icons README](../../README.md) for more details.

<% if (copyCustomFonts) { -%>
> [!IMPORTANT]
> This package does not include the fonts. You must provide them yourself.

<% } -%>
## Installation

```sh
npm install @react-native-vector-icons/<%= packageName %>
```

<% if (copyCustomFonts) { -%>
## Custom Fonts

This package requires you to provide the font files. Place your `.ttf` font
file in the following location:

```
rnvi-fonts/<%= packageName %>/<%= fontFileName %>.ttf
```

The font will be automatically copied during the build process for both iOS and
Android.

<% } -%>
## Usage

```jsx
<% if (customSrc !== true && !copyCustomFonts) { -%>
import { <%= className %> } from '@react-native-vector-icons/<%= packageName %>/static';
// or with dynamic font loading (see the Expo setup guide for details)
<% } -%>
import { <%= className %> } from '@react-native-vector-icons/<%= packageName %>';

// ...

<<%= className %> name="house" color="#ff0000" size={20} />
```


### Expo Config Plugin

<% if (copyCustomFonts) { -%>
This package ships an [Expo config plugin](../../docs/SETUP-EXPO.md) to register the font with iOS. Add it to the `plugins` array in your `app.json` or `app.config.js`:
<% } else { -%>
This package ships an [Expo config plugin](../../docs/SETUP-EXPO.md). Add it to the `plugins` array in your `app.json` or `app.config.js` if you use static imports:
<% } -%>

```json
{
  "expo": {
    "plugins": ["@react-native-vector-icons/<%= packageName %>"]
  }
}
```

<% if (versionTable) { -%>
## Versions

Prior to version 12, the version of this font package tracked the upstream version.

The table below tracks which font version is included in each package version.

| RNVI version | Upstream version |
| ------------ | ---------------- |
<%= versionTable %>

<% } -%>
## Contributing

See the [contributing guide](../../CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
