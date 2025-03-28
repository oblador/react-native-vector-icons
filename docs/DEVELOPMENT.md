# Handy reminders for developers

Things we use

* nx - for building and releasing (all behind pnpm scripts)

## Font versioning

Font package versions are now independent of upstream font versions and we track the mapping in the README.md

## Publishing

This will auto detect which packages need to be published on NPM and ask which versions you want to set the packages to.

```sh
pnpm release --verbose
```

## Building

```sh
# Regenerate and update the font packages
pnpm run generate

# Build everything
pnpm run prepare
```

## Alpha release

```sh
# Remove --dry-run to actually publish
pnpm nx release prerelease --verbose --skip-publish --dry-run
pnpm nx release publish --verbose --tag alpha --dry-run

# A single package
pnpm nx release prerelease --verbose --skip-publish --package @react-native-vector-icons/lucide --dry-run
pnpm nx release publish --verbose --tag alpha --package @react-native-vector-icons/lucide --dry-run
```
