# Handy reminders for developers

Things we use

- nx - for building and releasing (all behind yarn scripts)

## Versioning

For fonts we track upstream versions. Occasionally we'll need to make changes out of step with upstream for example updating the Javascript.

| Upstream | Action               | Our Version           |
| -------- | -------------------- | --------------------- |
| 1.0.0    | Font update          | 1.0.0                 |
| 1.0.0    | Code change          | 1.0.1-really-1.0.0-v1 |
| 1.0.0    | Code change          | 1.0.1-really-1.0.0-v2 |
| 1.0.1    | Font and code update | 1.0.1                 |

## Publishing

This will auto detect which packages need to be published on NPM and ask which versions you want to set the packages to.

```sh
yarn release --verbose
```

## Building

```sh
# Regenerate and update the font packages
yarn generate

# Build everything
yarn prepare
```

## Alpha release

```sh
# Remove --dry-run to actually publish
yarn nx release prerelease --verbose --skip-publish --dry-run
yarn nx release publish --verbose --tag alpha --dry-run

# A single package
yarn nx release prerelease --verbose --skip-publish --package @react-native-vector-icons/lucide --dry-run
yarn nx release publish --verbose --tag alpha --package @react-native-vector-icons/lucide --dry-run
```
