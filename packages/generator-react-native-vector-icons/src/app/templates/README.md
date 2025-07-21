# React Native Vector Icons - <%= name %>

<%= name %> font for React Native Vector Icons

See the [React Native Vector Icons README](../../README.md) for more details.

## Installation

```sh
npm install @react-native-vector-icons/<%= packageName %>
```

## Usage

```jsx
import { <%= className %> } from '@react-native-vector-icons/<%= packageName %>';

// ...

<<%= className %> name="house" color="#ff0000" size={20} />
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
