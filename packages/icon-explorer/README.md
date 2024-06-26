## Testing RN versions

To locally test a particular version

```sh
./set-rn-version.sh android stable|0.73|0.72...
yarn
yarn start
yarn test:android
git restore -p
```
