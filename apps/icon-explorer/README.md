## FontAwesome Pro fonts

To test FontAwesome Pro icons, you need to download the font files (they can't be checked in). Run:

```sh
pnpm fetch-pro-fonts
```

This requires a FontAwesome npm token. If one isn't configured, the script will prompt for it.

## Testing RN versions

To locally test a particular version

```sh
./set-rn-version.sh android stable|0.73|0.72...
pnpm install
pnpm run start
pnpm run test:android
git restore -p
```
