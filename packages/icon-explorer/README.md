## Testing RN versions

To locally test a particular version

```sh
./set-rn-version.sh android stable|0.73|0.72...
pnpm install
pnpm run start
pnpm run test:android
git restore -p
```
