# Handy reminders for developers

Things we use

- nx - for building and releasing (all behind yarn scripts)

## Font versioning

Font package versions are now independent of upstream font versions and we track the mapping in the README.md

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
