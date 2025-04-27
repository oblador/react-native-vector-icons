# Contributing

Contributions are always welcome, no matter how large or small!

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project. Before contributing, please read the [code of conduct](./CODE_OF_CONDUCT.md).

If you have found an issue or would like to request a new feature, simply create a new issue. Be sure to fill out as much information as possible.

## Reporting Bugs & Feature Requests

If you would like to submit a feature request or report a bug, we encourage you to first look through the [issues](https://github.com/oblador/react-native-vector-icons/issues) and [pull requests](https://github.com/oblador/react-native-vector-icons/pulls) before filing a new issue.

## Submitting a Pull Request

If you wish to submit a pull request for a new feature or issue, you should start by forking this repository first. This should get you setup on your local machine:

## Development workflow

This project is a monorepo managed using [pnpm workspaces](https://pnpm.io/workspaces). It contains the following packages:

- The library package in `packages/common`
- An example app in `packages/icon-explorer
- Fonts in `packages/fontname` e.g. `packages/fontawesome6`

To get started with the project, run `pnpm install` in the root directory to install the required dependencies for each package:

```sh
pnpm install
```

> Since the project relies on pnpm workspaces, you cannot use [`npm`](https://github.com/npm/cli) for development.

[IconExplorer](/packages/icon-explorer/) demonstrates usage of the library. You need to run it to test any changes you make.

It is configured to use the local version of the library, so any changes you make to the library's source code will be reflected in the example app. Changes to the library's JavaScript code will be reflected in the example app without a rebuild, but native code changes will require a rebuild of the example app.

If you want to use Android Studio or XCode to edit the native code, you can open the `packages/IconExplorer/android` or `packages/IconExplorer/ios` directories respectively in those editors. To edit the Objective-C or Swift files, open `packages/IconExplorer/ios/IconExplorer.xcworkspace` in XCode and find the source files at `Pods > Development Pods > @react-native-vector-icons/ant-design`.

To edit the Java or Kotlin files, open `packages/icon-explorer/android` in Android studio and find the source files at `react-native-vector-icons` under `Android`.

You can use various commands from the root directory to work with the project.

To start the packager:

```sh
pnpm run example start
```

To run the example app on Android:

```sh
pnpm run example android
```

To run the example app on iOS:

```sh
pnpm run example ios
```

By default, the example is configured to build with the old architecture. To run the example with the new architecture, you can do the following:

1. For Android, run:

   ```sh
   ORG_GRADLE_PROJECT_newArchEnabled=true pnpm run example android
   ```

2. For iOS, run:

   ```sh
   RCT_NEW_ARCH_ENABLED=1 pod install example/ios
   pnpm run example ios
   ```

If you are building for a different architecture than your previous build, make sure to remove the build folders first. You can run the following command to cleanup all build folders:

```sh
pnpm run clean
```

To confirm that the app is running with the new architecture, you can check the Metro logs for a message like this:

```sh
Running "IconExplorer" with {"fabric":true,"initialProps":{"concurrentRoot":true},"rootTag":1}
```

Note the `"fabric":true` and `"concurrentRoot":true` properties.

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
pnpm run typecheck
pnpm run lint
```

To fix formatting errors, run the following:

```sh
pnpm run lint --fix
```

Remember to add tests for your change if possible. Run the unit tests by:

```sh
pnpm run test
```

### Detox

TODO: Expand on detox here

To run the detox tests you should create an avd called test which is based on the Pixel 6 Pro profile. This is essential for the screenshot diffs to work

```sh
sdkmanager --install 'system-images;android-31;default;x86_64' --channel=0
avdmanager create avd --force -n test --abi 'default/x86_64' --package 'system-images;android-31;default;x86_64' --device 'pixel_6_pro'
```

You can then run the tests

```
cd packages/icon-explorer
pnpm run run test:android:build
pnpm run run test:android:run
pnpm run run test:ios:build
pnpm run run test:ios:run
```

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix crash due to deprecated method.
- `feat`: new features, e.g. add new method to the module.
- `refactor`: code refactor, e.g. migrate from class components to hooks.
- `docs`: changes into documentation, e.g. add usage example for the module..
- `test`: adding or updating tests, e.g. add integration tests using detox.
- `chore`: tooling changes, e.g. change CI config.

Our pre-commit hooks verify that your commit message matches this format when committing.

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

Our pre-commit hooks verify that the linter and tests pass when committing.

### Publishing to npm

We use [release-it](https://github.com/release-it/release-it) to make it easier to publish new versions. It handles common tasks like bumping version based on semver, creating tags and releases etc.

To publish new versions, run the following:

```sh
pnpm run release
```

### Scripts

The `package.json` file contains various scripts for common tasks:

- `pnpm i`: setup project by installing dependencies.
- `pnpm run typecheck`: type-check files with TypeScript.
- `pnpm run lint`: lint files with ESLint.
- `pnpm run test`: run unit tests with Jest.
- `pnpm run example start`: start the Metro server for the example app.
- `pnpm run example android`: run the example app on Android.
- `pnpm run example ios`: run the example app on iOS.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.
