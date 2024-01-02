# Handy reminders for developers

Things we use
* lerna - for building and releasing (all behind yarn scripts)
*

## Versioning

For fonts we track upstream versions. Ocassionally we'll need to make changes out of step with upstream for example updating the javascript.

| Upstream | Action               | Our Version           |
| -------- | -------------------- | --------------------- |
| 1.0.0    | Font update          | 1.0.0                 |
| 1.0.0    | Code change          | 1.0.1-really-1.0.0-v1 |
| 1.0.0    | Code change          | 1.0.1-really-1.0.0-v2 |
| 1.0.1    | Font and code update | 1.0.1                 |

## Building

```sh
# Build everything
yarn prepare
```
